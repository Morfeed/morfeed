"use client"

import { useActionState, useId } from "react"
import { CircleCheckIcon, MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

import { joinWaitlist, type WaitlistState } from "../_lib/actions"

const initialState: WaitlistState = { status: "idle" }

type WaitlistFormProps = {
  className?: string
  classNames?: {
    group?: string
    icon?: string
    input?: string
    inputGroupButton?: string
    button?: string
    error?: string
    success?: string
  }
}

export function WaitlistForm({ className, classNames }: WaitlistFormProps) {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState
  )
  const inputId = useId()
  const errorId = `${inputId}-error`
  const invalid = state.status === "error"

  if (state.status === "success") {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center justify-center gap-2 text-sm",
          className,
          classNames?.success
        )}
      >
        <CircleCheckIcon aria-hidden="true" className="size-4 shrink-0" />
        You&apos;re on the list. We&apos;ll write to {state.email} when your
        invite is ready.
      </p>
    )
  }

  return (
    <form action={formAction} className={cn("w-full", className)}>
      <Field data-invalid={invalid || undefined} className="gap-2">
        <FieldLabel htmlFor={inputId} className="sr-only">
          Email address
        </FieldLabel>
        <InputGroup className={cn("h-12 pr-1", classNames?.group)}>
          <InputGroupAddon className={classNames?.icon}>
            <MailIcon />
          </InputGroupAddon>
          <InputGroupInput
            id={inputId}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={invalid ? state.email : undefined}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            className={cn("h-full md:text-base", classNames?.input)}
          />
          <InputGroupAddon
            align="inline-end"
            className={cn(classNames?.inputGroupButton)}
          >
            <InputGroupButton
              type="submit"
              variant="default"
              size="sm"
              disabled={pending}
              className={cn("h-10 px-5", classNames?.button)}
            >
              {pending && <Spinner aria-hidden="true" />}
              Join the waitlist
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {invalid && (
          <FieldError id={errorId} className={classNames?.error}>
            {state.message}
          </FieldError>
        )}
      </Field>
    </form>
  )
}
