import { cn } from "@/lib/utils"

import { sections, type SectionId } from "./nav"

export function Section({
  id,
  children,
}: {
  id: SectionId
  children: React.ReactNode
}) {
  const { title } = sections[id]

  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-8">
      <h2 className="font-heading text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function Subsection({
  title,
  className,
  children,
}: {
  title?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      {title ? (
        <h3 className="font-heading text-lg font-medium">{title}</h3>
      ) : null}
      <div className={className}>{children}</div>
    </div>
  )
}

export function Preview({
  label,
  className,
  children,
}: {
  label?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div
        className={cn(
          "flex min-h-24 flex-wrap items-center gap-3 rounded-3xl border p-6",
          className
        )}
      >
        {children}
      </div>
      {label ? (
        <span className="font-mono text-xs text-neutral-foreground">
          {label}
        </span>
      ) : null}
    </div>
  )
}
