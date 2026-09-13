import { EyeOffIcon, FlagIcon, ShieldIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

import { Preview, Subsection } from "./section"

const toggleStyles = ["default", "outline"] as const
const toggleSizes = ["sm", "default", "lg"] as const

export function ToggleShowcase() {
  return (
    <Subsection className="grid gap-4 md:grid-cols-2">
      {toggleStyles.map((variant) => (
        <Preview key={variant}>
          {toggleSizes.map((size) => (
            <Toggle
              key={size}
              variant={variant}
              size={size}
              aria-label={`Toxicity detector (${size})`}
            >
              <ShieldIcon />
            </Toggle>
          ))}
          <Toggle
            variant={variant}
            defaultPressed
            aria-label="Hide flagged posts"
          >
            <EyeOffIcon />
            Hide
          </Toggle>
          <Toggle variant={variant} disabled aria-label="Report to platform">
            <FlagIcon />
            Report
          </Toggle>
        </Preview>
      ))}
    </Subsection>
  )
}
