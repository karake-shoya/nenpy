import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ROOT_DIR = process.cwd();
const ENV_EXAMPLE_PATH = path.join(ROOT_DIR, ".env.example");
const ENV_LOCAL_PATH = path.join(ROOT_DIR, ".env.local");
const README_PATH = path.join(ROOT_DIR, "README.md");
const LAYOUT_PATH = path.join(ROOT_DIR, "src/app/layout.tsx");
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
const DEFAULT_COMMIT_MESSAGE = "chore: initial setup";

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function normalizeLineEndings(content) {
  return content.replace(/\r\n/g, "\n");
}

function getEnvValue(content, key) {
  const match = content.match(new RegExp(`^${key}=(.*)$`, "m"));
  return match ? match[1] : "";
}

function upsertEnv(content, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");

  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }

  const separator = content.endsWith("\n") || content.length === 0 ? "" : "\n";
  return `${content}${separator}${line}\n`;
}

function slugifyForPackageName(value) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/['".]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "next-supabase-shadcn-template";
}

function replaceLayoutFallbackName(layoutContent, appName) {
  return layoutContent.replace(
    /const appName = process\.env\.NEXT_PUBLIC_APP_NAME \?\? ".*";/,
    `const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "${appName}";`,
  );
}

function replaceReadmeTitle(readmeContent, appName) {
  return readmeContent.replace(/^# .+$/m, `# ${appName}`);
}

function getGitStatusPorcelain() {
  return execSync("git status --porcelain", { encoding: "utf8" }).trim();
}

function hasChanges() {
  return getGitStatusPorcelain().length > 0;
}

function commitSetupChanges(commitMessage) {
  execSync("git add -A", { stdio: "inherit" });
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: "inherit" });
}

async function promptWithDefault(rl, label, defaultValue) {
  const suffix = defaultValue ? ` [${defaultValue}]` : "";
  const answer = await rl.question(`${label}${suffix}: `);

  if (answer.trim().length === 0) {
    return defaultValue;
  }

  return answer.trim();
}

async function main() {
  if (!fileExists(ENV_EXAMPLE_PATH)) {
    throw new Error(".env.example が見つかりません。");
  }

  const preRunClean = !hasChanges();

  const envExampleContent = normalizeLineEndings(readFile(ENV_EXAMPLE_PATH));
  const previousAppName =
    getEnvValue(envExampleContent, "NEXT_PUBLIC_APP_NAME") || "next-supabase-shadcn-template";

  if (!fileExists(ENV_LOCAL_PATH)) {
    writeFile(
      ENV_LOCAL_PATH,
      envExampleContent.endsWith("\n") ? envExampleContent : `${envExampleContent}\n`,
    );
    console.log("created: .env.local");
  }

  const envLocalContent = normalizeLineEndings(readFile(ENV_LOCAL_PATH));
  const previousSupabaseUrl = getEnvValue(envLocalContent, "NEXT_PUBLIC_SUPABASE_URL");
  const previousSupabaseAnonKey = getEnvValue(envLocalContent, "NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const previousLocalAppName = getEnvValue(envLocalContent, "NEXT_PUBLIC_APP_NAME");

  const rl = readline.createInterface({ input, output });

  try {
    const appName = await promptWithDefault(
      rl,
      "App name (display name)",
      previousLocalAppName || previousAppName,
    );
    const supabaseUrl = await promptWithDefault(
      rl,
      "Supabase URL (empty allowed)",
      previousSupabaseUrl,
    );
    const supabaseAnonKey = await promptWithDefault(
      rl,
      "Supabase anon key (empty allowed)",
      previousSupabaseAnonKey,
    );

    let nextEnvExample = envExampleContent;
    nextEnvExample = upsertEnv(nextEnvExample, "NEXT_PUBLIC_SUPABASE_URL", "");
    nextEnvExample = upsertEnv(nextEnvExample, "NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    nextEnvExample = upsertEnv(nextEnvExample, "NEXT_PUBLIC_APP_NAME", appName);
    writeFile(
      ENV_EXAMPLE_PATH,
      nextEnvExample.endsWith("\n") ? nextEnvExample : `${nextEnvExample}\n`,
    );

    let nextEnvLocal = envLocalContent;
    nextEnvLocal = upsertEnv(nextEnvLocal, "NEXT_PUBLIC_SUPABASE_URL", supabaseUrl);
    nextEnvLocal = upsertEnv(nextEnvLocal, "NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseAnonKey);
    nextEnvLocal = upsertEnv(nextEnvLocal, "NEXT_PUBLIC_APP_NAME", appName);
    writeFile(ENV_LOCAL_PATH, nextEnvLocal.endsWith("\n") ? nextEnvLocal : `${nextEnvLocal}\n`);

    const packageJson = JSON.parse(readFile(PACKAGE_JSON_PATH));
    packageJson.name = slugifyForPackageName(appName);
    writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, 2)}\n`);

    if (fileExists(README_PATH)) {
      const readme = readFile(README_PATH);
      writeFile(README_PATH, replaceReadmeTitle(readme, appName));
    }

    if (fileExists(LAYOUT_PATH)) {
      const layout = readFile(LAYOUT_PATH);
      writeFile(LAYOUT_PATH, replaceLayoutFallbackName(layout, appName));
    }

    if (preRunClean && hasChanges()) {
      commitSetupChanges(DEFAULT_COMMIT_MESSAGE);
      console.log(`committed: ${DEFAULT_COMMIT_MESSAGE}`);
    } else if (!preRunClean) {
      console.log("skip commit: working tree was not clean before init.");
    } else {
      console.log("skip commit: no changes detected.");
    }
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
