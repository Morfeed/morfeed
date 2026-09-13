"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Preview, Subsection } from "./section"

const sides = ["top", "right", "bottom", "left"] as const

function DrawerExample({ direction }: { direction: "down" | "right" }) {
  const [threshold, setThreshold] = React.useState(70)

  return (
    <Drawer swipeDirection={direction} showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        {direction === "down" ? "Down" : "Right"}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col">
          <DrawerHeader>
            <DrawerTitle>Toxicity threshold</DrawerTitle>
            <DrawerDescription>
              Lower values filter more aggressively.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-1 items-center justify-center gap-6 p-6">
            <Button
              variant="outline"
              size="icon"
              aria-label="Lower threshold"
              disabled={threshold <= 10}
              onClick={() => setThreshold((current) => current - 5)}
            >
              <MinusIcon />
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-6xl font-semibold tracking-tight tabular-nums">
                {threshold}
              </span>
              <span className="text-xs text-neutral-foreground uppercase">
                Score out of 100
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              aria-label="Raise threshold"
              disabled={threshold >= 95}
              onClick={() => setThreshold((current) => current + 5)}
            >
              <PlusIcon />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Apply</Button>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export function SheetShowcase() {
  return (
    <Subsection className="grid gap-4 md:grid-cols-2">
      <Preview>
        {sides.map((side) => (
          <Sheet key={side}>
            <SheetTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Mute author</SheetTitle>
                <SheetDescription>
                  Hide every post and reply from this account.
                </SheetDescription>
              </SheetHeader>
              <FieldGroup className="gap-4 px-6">
                <Field>
                  <FieldLabel htmlFor={`sheet-${side}-handle`}>
                    Handle
                  </FieldLabel>
                  <Input
                    id={`sheet-${side}-handle`}
                    defaultValue="@trendwave_ai"
                  />
                </Field>
              </FieldGroup>
              <SheetFooter>
                <Button>Mute author</Button>
                <SheetClose render={<Button variant="outline" />}>
                  Cancel
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </Preview>
      <Preview>
        <DrawerExample direction="down" />
        <DrawerExample direction="right" />
      </Preview>
    </Subsection>
  )
}
