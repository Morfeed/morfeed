"use client"

import * as React from "react"
import * as chrono from "chrono-node"
import { addDays, format } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Preview, Subsection } from "./section"

const referenceDate = new Date(2026, 8, 12)

function formatInputDate(date: Date | undefined) {
  return date ? format(date, "MMMM dd, yyyy") : ""
}

function formatRange(range: DateRange | undefined) {
  if (!range?.from) {
    return "Pick a date range"
  }
  if (!range.to) {
    return format(range.from, "LLL dd, y")
  }
  return `${format(range.from, "LLL dd, y")} – ${format(range.to, "LLL dd, y")}`
}

function isValidDate(date: Date) {
  return !Number.isNaN(date.getTime())
}

function BasicDatePicker() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="date-picker-basic">Pause filtering until</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id="date-picker-basic"
              variant="field"
              data-empty={!date}
              className="justify-start data-[empty=true]:text-neutral-foreground"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {date ? format(date, "PPP") : "Pick a date"}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={referenceDate}
            onSelect={(selected) => {
              setDate(selected)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

function RangeDatePicker() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: referenceDate,
    to: addDays(referenceDate, 6),
  })

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="date-picker-range">Report window</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              id="date-picker-range"
              variant="field"
              data-empty={!range?.from}
              className="justify-start data-[empty=true]:text-neutral-foreground"
            />
          }
        >
          <CalendarIcon data-icon="inline-start" />
          {formatRange(range)}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={range}
            onSelect={setRange}
            defaultMonth={range?.from}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

function DropdownDatePicker() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="date-picker-dropdown">
        Hide accounts created after
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id="date-picker-dropdown"
              variant="field"
              data-empty={!date}
              className="justify-between data-[empty=true]:text-neutral-foreground"
            />
          }
        >
          {date ? format(date, "PPP") : "Select date"}
          <ChevronDownIcon data-icon="inline-end" />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            defaultMonth={date ?? referenceDate}
            onSelect={(selected) => {
              setDate(selected)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

function InputDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(referenceDate)
  const [month, setMonth] = React.useState<Date | undefined>(referenceDate)
  const [value, setValue] = React.useState(formatInputDate(referenceDate))

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="date-picker-input">Collect data until</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-picker-input"
          value={value}
          placeholder="September 12, 2026"
          onChange={(event) => {
            const next = new Date(event.target.value)
            setValue(event.target.value)
            if (isValidDate(next)) {
              setDate(next)
              setMonth(next)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton size="icon-xs" aria-label="Select date" />
              }
            >
              <CalendarIcon />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(selected) => {
                  setDate(selected)
                  setValue(formatInputDate(selected))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}

function TimeDatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(referenceDate)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex w-full max-w-xs gap-3">
      <Field>
        <FieldLabel htmlFor="date-picker-time-date">Rescan on</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                id="date-picker-time-date"
                variant="field"
                data-empty={!date}
                className="justify-between data-[empty=true]:text-neutral-foreground"
              />
            }
          >
            {date ? format(date, "MMM d, y") : "Select date"}
            <ChevronDownIcon data-icon="inline-end" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={date}
              defaultMonth={date ?? referenceDate}
              onSelect={(selected) => {
                setDate(selected)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32 shrink-0">
        <FieldLabel htmlFor="date-picker-time-time">At</FieldLabel>
        <Input
          id="date-picker-time-time"
          type="time"
          step="1"
          defaultValue="10:30:00"
          className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </div>
  )
}

function NaturalLanguageDatePicker() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("In 2 days")
  const [date, setDate] = React.useState<Date | undefined>(
    () => chrono.parseDate("In 2 days", referenceDate) ?? undefined
  )
  const [month, setMonth] = React.useState<Date | undefined>(date)

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="date-picker-natural">
        Snooze muted authors until
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-picker-natural"
          value={value}
          placeholder="Tomorrow or next week"
          onChange={(event) => {
            const next = chrono.parseDate(event.target.value, referenceDate)
            setValue(event.target.value)
            if (next) {
              setDate(next)
              setMonth(next)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton size="icon-xs" aria-label="Select date" />
              }
            >
              <CalendarIcon />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(selected) => {
                  setDate(selected)
                  setValue(formatInputDate(selected))
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>
        {date ? (
          <>
            Muted authors come back on{" "}
            <span className="font-medium text-foreground">
              {formatInputDate(date)}
            </span>
            .
          </>
        ) : (
          "Try “next friday” or “in 3 weeks”."
        )}
      </FieldDescription>
    </Field>
  )
}

export function DatePickerShowcase() {
  return (
    <Subsection className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Preview>
        <BasicDatePicker />
      </Preview>
      <Preview>
        <RangeDatePicker />
      </Preview>
      <Preview>
        <DropdownDatePicker />
      </Preview>
      <Preview>
        <InputDatePicker />
      </Preview>
      <Preview>
        <TimeDatePicker />
      </Preview>
      <Preview>
        <NaturalLanguageDatePicker />
      </Preview>
    </Subsection>
  )
}
