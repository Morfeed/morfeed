import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs"
import { extname, join } from "node:path"

const utilityPrefixes = [
  "bg",
  "text",
  "border",
  "border-t",
  "border-r",
  "border-b",
  "border-l",
  "border-x",
  "border-y",
  "ring",
  "ring-offset",
  "outline",
  "fill",
  "stroke",
  "decoration",
  "caret",
  "shadow",
  "from",
  "via",
  "to",
  "divide",
  "placeholder",
]

const tokenRenames = [
  ["primary-foreground", "action-foreground"],
  ["primary", "action"],
  ["secondary-foreground", "neutral-foreground"],
  ["secondary", "neutral"],
  ["muted-foreground", "neutral-foreground"],
  ["muted", "neutral"],
  ["accent-foreground", "foreground"],
  ["accent", "action-neutral"],
  ["destructive", "danger"],
]

const prefixPattern = utilityPrefixes
  .sort((a, b) => b.length - a.length)
  .map((prefix) => prefix.replace("-", "\\-"))
  .join("|")

const boundary = "(?=[\\s\"'`/\\]\\)!:,;]|$)"

const rules = tokenRenames.flatMap(([from, to]) => [
  {
    pattern: new RegExp(`(?<![\\w-])(${prefixPattern})-${from}${boundary}`, "g"),
    replacement: `$1-${to}`,
  },
  {
    pattern: new RegExp(`var\\(--${from}\\)`, "g"),
    replacement: `var(--${to})`,
  },
])

function collectFiles(target) {
  if (statSync(target).isFile()) {
    return [target]
  }

  return readdirSync(target).flatMap((entry) => {
    if (entry === "node_modules" || entry.startsWith(".")) {
      return []
    }
    return collectFiles(join(target, entry))
  })
}

const targets = process.argv.slice(2)

if (targets.length === 0) {
  console.error("Usage: node scripts/migrate-tokens.mjs <file-or-directory> [...]")
  process.exit(1)
}

const files = targets
  .flatMap(collectFiles)
  .filter((file) => [".ts", ".tsx"].includes(extname(file)))

let changedFiles = 0

for (const file of files) {
  const original = readFileSync(file, "utf8")
  const updated = rules.reduce(
    (source, rule) => source.replace(rule.pattern, rule.replacement),
    original
  )

  if (updated !== original) {
    writeFileSync(file, updated)
    changedFiles++
    console.log(`updated ${file}`)
  }
}

console.log(`${changedFiles} file(s) updated`)
