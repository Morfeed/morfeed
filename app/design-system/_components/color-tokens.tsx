"use client"

import * as React from "react"

import { Subsection } from "./section"

type TokenPair = {
  background: string
  foreground?: string
}

const paletteSteps = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
]

const interactiveGroup = (
  title: string,
  base: string,
  description: string,
  foreground = `${base}-foreground`
) => ({
  title,
  description,
  columns: "grid-cols-2 lg:grid-cols-3",
  pairs: [
    { background: base, foreground },
    { background: `${base}-hover`, foreground },
    { background: `${base}-active`, foreground },
  ],
})

const colorGroups: {
  title: string
  description: string
  columns: string
  pairs: TokenPair[]
}[] = [
  {
    title: "Surfaces",
    description:
      "Page, card and popover layers with their foreground pairs, plus the translucent modal overlay. Frosted surfaces use opacity modifiers like bg-popover/70 instead of dedicated tokens.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "background", foreground: "foreground" },
      { background: "card", foreground: "card-foreground" },
      { background: "popover", foreground: "popover-foreground" },
      { background: "overlay" },
    ],
  },
  {
    title: "Identity",
    description:
      "Static colors with no hover or active state. Brand is navy-900 oklch(0.379 0.138 258.4); neutral covers quiet surfaces and secondary text; accent is fill-only in light mode.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "brand", foreground: "brand-foreground" },
      { background: "neutral", foreground: "neutral-foreground" },
      { background: "accent", foreground: "accent-foreground" },
    ],
  },
  interactiveGroup(
    "Action",
    "action",
    "Primary buttons, links and checked controls. Hover and active keep action-foreground readable."
  ),
  interactiveGroup(
    "Neutral action",
    "action-neutral",
    "Outline and ghost button states plus toggle, menu, select and table highlights. Text stays foreground.",
    "foreground"
  ),
  interactiveGroup(
    "Destructive action",
    "action-destructive",
    "Soft red for destructive buttons and menu items. For error states use danger."
  ),
  {
    title: "Status",
    description:
      "Success, info, danger and warning. Warning is fill-only in light mode.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "success", foreground: "success-foreground" },
      { background: "info", foreground: "info-foreground" },
      { background: "danger", foreground: "danger-foreground" },
      { background: "warning", foreground: "warning-foreground" },
    ],
  },
  {
    title: "Lines",
    description: "Borders, focus rings and invalid rings.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "border" },
      { background: "ring" },
      { background: "halo" },
      { background: "danger-halo" },
    ],
  },
  {
    title: "Controls",
    description:
      "Field fill for inputs, textareas, selects, picker triggers, checkboxes and radios; slider and switch thumb; active tab pill.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "field", foreground: "foreground" },
      { background: "thumb" },
      { background: "tabs", foreground: "foreground" },
    ],
  },
  {
    title: "Tints",
    description:
      "Solid low-emphasis fills for badges, avatars and selected states. Pair each with its base color as text.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "brand-subtle", foreground: "brand" },
      { background: "action-subtle", foreground: "action" },
      { background: "neutral-subtle", foreground: "neutral-foreground" },
      { background: "success-subtle", foreground: "success" },
      { background: "info-subtle", foreground: "info" },
      { background: "danger-subtle", foreground: "danger" },
      { background: "warning-subtle", foreground: "foreground" },
    ],
  },
  {
    title: "Chart",
    description: "Sequential navy scale used by every chart.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "chart-1" },
      { background: "chart-2" },
      { background: "chart-3" },
      { background: "chart-4" },
      { background: "chart-5" },
    ],
  },
  {
    title: "Sidebar",
    description: "Sidebar tokens now point at brand and neutral.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [
      { background: "sidebar", foreground: "sidebar-foreground" },
      {
        background: "sidebar-primary",
        foreground: "sidebar-primary-foreground",
      },
      { background: "sidebar-accent", foreground: "sidebar-accent-foreground" },
      { background: "sidebar-border" },
      { background: "sidebar-ring" },
    ],
  },
  {
    title: "Navy palette",
    description:
      "Primitive scale behind brand and action. Every palette shares the same OKLCH lightness per step, so navy-600 and aqua-600 have matching contrast.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: paletteSteps.map((step) => ({ background: `color-navy-${step}` })),
  },
  {
    title: "Aqua palette",
    description:
      "Primitive scale behind accent, on the same lightness ladder as navy and graphite.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: paletteSteps.map((step) => ({ background: `color-aqua-${step}` })),
  },
  {
    title: "Graphite palette",
    description:
      "Achromatic scale on the shared lightness ladder, plus 925, 975 and 985 surface steps for VS Code–style charcoal dark mode.",
    columns: "grid-cols-2 lg:grid-cols-3",
    pairs: [...paletteSteps.slice(0, -1), "925", "950", "975", "985"].map(
      (step) => ({
        background: `color-graphite-${step}`,
      })
    ),
  },
]

function subscribeToRoot(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
  })
  return () => observer.disconnect()
}

type ThemeDeclarations = {
  light: Map<string, string>
  dark: Map<string, string>
}

let declarationCache: {
  sheetCount: number
  declarations: ThemeDeclarations
} | null = null

function collectRules(rules: CSSRuleList, declarations: ThemeDeclarations) {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      const selectors = rule.selectorText
        .split(",")
        .map((selector) => selector.trim())
      const target = selectors.includes(".dark")
        ? declarations.dark
        : selectors.includes(":root")
          ? declarations.light
          : null
      if (!target) {
        continue
      }
      for (const property of Array.from(rule.style)) {
        if (property.startsWith("--")) {
          target.set(property, rule.style.getPropertyValue(property).trim())
        }
      }
    } else if ("cssRules" in rule) {
      collectRules((rule as CSSGroupingRule).cssRules, declarations)
    }
  }
}

function getThemeDeclarations() {
  const sheets = Array.from(document.styleSheets)
  if (declarationCache?.sheetCount === sheets.length) {
    return declarationCache.declarations
  }

  const declarations: ThemeDeclarations = { light: new Map(), dark: new Map() }
  for (const sheet of sheets) {
    try {
      collectRules(sheet.cssRules, declarations)
    } catch {
      continue
    }
  }
  declarationCache = { sheetCount: sheets.length, declarations }
  return declarations
}

function referencedToken(value: string) {
  return value.match(/^var\((--[\w-]+)\)$/)?.[1] ?? ""
}

function useTokenSource(name: string) {
  return React.useSyncExternalStore(
    subscribeToRoot,
    () => {
      const { light, dark } = getThemeDeclarations()
      const isDark = document.documentElement.classList.contains("dark")
      const value =
        (isDark ? dark.get(`--${name}`) : undefined) ?? light.get(`--${name}`)
      return value ? referencedToken(value) : ""
    },
    () => ""
  )
}

function TokenValue({ name }: { name: string }) {
  const value = useTokenSource(name)

  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <code className="truncate font-mono text-xs font-medium">--{name}</code>
      {value ? (
        <span className="truncate font-mono text-xs text-neutral-foreground">
          {value}
        </span>
      ) : null}
    </div>
  )
}

function TokenCard({ background, foreground }: TokenPair) {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border">
      <div
        className="flex h-24 items-end p-4"
        style={{
          backgroundColor: `var(--${background})`,
          color: foreground ? `var(--${foreground})` : undefined,
        }}
      >
        {foreground ? (
          <span className="font-heading text-2xl font-medium">Aa</span>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 border-t p-4">
        <TokenValue name={background} />
        {foreground ? <TokenValue name={foreground} /> : null}
      </div>
    </div>
  )
}

export function ColorTokens() {
  return colorGroups.map((group) => (
    <Subsection
      key={group.title}
      title={group.title}
      className={`grid gap-4 ${group.columns}`}
    >
      {group.pairs.map((pair) => (
        <TokenCard
          key={`${pair.background}-${pair.foreground ?? ""}`}
          {...pair}
        />
      ))}
    </Subsection>
  ))
}
