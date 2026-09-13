"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Preview, Subsection } from "./section"

const sides = ["top", "right", "bottom", "left"] as const

export function TooltipShowcase() {
  return (
    <Subsection className="grid gap-4 md:grid-cols-2">
      <Preview>
        {sides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>Hidden: toxicity 0.87</TooltipContent>
          </Tooltip>
        ))}
      </Preview>
      <Preview>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Detection thresholds
          </PopoverTrigger>
          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Thresholds</PopoverTitle>
              <PopoverDescription>
                Posts scoring above these values are filtered.
              </PopoverDescription>
            </PopoverHeader>
            <FieldGroup className="gap-3">
              <Field orientation="horizontal">
                <FieldLabel htmlFor="popover-toxicity" className="w-24">
                  Toxicity
                </FieldLabel>
                <Input id="popover-toxicity" defaultValue="0.70" />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="popover-bot" className="w-24">
                  Bot score
                </FieldLabel>
                <Input id="popover-bot" defaultValue="0.85" />
              </Field>
            </FieldGroup>
          </PopoverContent>
        </Popover>
      </Preview>
    </Subsection>
  )
}
