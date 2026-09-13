import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  FilterIcon,
  PlugIcon,
  PlusIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import { Preview, Subsection } from "./section"

const variants = ["default", "outline", "ghost", "destructive", "link"] as const

const sizes = ["xs", "sm", "default", "lg"] as const

const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

export function ButtonShowcase() {
  return (
    <>
      <Subsection className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-160 text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left font-mono text-xs font-normal text-neutral-foreground">
                variant
              </th>
              {sizes.map((size) => (
                <th
                  key={size}
                  className="px-4 py-3 text-left font-mono text-xs font-normal text-neutral-foreground"
                >
                  {size}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-mono text-xs font-normal text-neutral-foreground">
                icon sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant} className="border-b last:border-0">
                <td className="px-6 py-4 font-mono text-xs">{variant}</td>
                {sizes.map((size) => (
                  <td key={size} className="px-4 py-4">
                    <Button variant={variant} size={size}>
                      Add filter
                    </Button>
                  </td>
                ))}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {iconSizes.map((size) => (
                      <Button
                        key={size}
                        variant={variant}
                        size={size}
                        aria-label={`Add rule (${size})`}
                      >
                        <PlusIcon />
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Subsection>

      <Subsection className="grid gap-4 md:grid-cols-2">
        <Preview>
          <Button>
            <PlugIcon data-icon="inline-start" />
            Connect extension
          </Button>
          <Button variant="outline" size="sm">
            <FilterIcon data-icon="inline-start" />
            New rule
          </Button>
        </Preview>
        <Preview>
          <Button variant="outline">
            Review hidden posts
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <Button variant="ghost" size="sm">
            All platforms
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        </Preview>
      </Subsection>

      <Subsection className="grid gap-4 md:grid-cols-2">
        <Preview>
          <Button disabled>Auto-click off</Button>
          <Button variant="outline" disabled>
            Export
          </Button>
          <Button disabled>
            <Spinner data-icon="inline-start" />
            Scanning feed
          </Button>
        </Preview>
        <Preview>
          <Button variant="outline" aria-invalid>
            Test API key
          </Button>
          <Button variant="outline" aria-expanded>
            Detectors
          </Button>
          <Button variant="ghost" aria-expanded>
            Platforms
          </Button>
        </Preview>
        <Preview>
          <Button render={<a href="#buttons" />} nativeButton={false}>
            Install extension
          </Button>
          <Button
            variant="link"
            render={<a href="#buttons" />}
            nativeButton={false}
          >
            How filtering works
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </Preview>
        <Preview>
          <Button className="w-full">Clean up my feed</Button>
        </Preview>
      </Subsection>
    </>
  )
}
