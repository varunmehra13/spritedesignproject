"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { Tone } from "@/lib/sprite"

/* ------------------------------------------------------------------ */
/* Tone helpers                                                        */
/* ------------------------------------------------------------------ */

const DOT: Record<Tone, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  gray: "bg-gray-400",
}

const PILL: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  red: "bg-red-50 text-red-600",
  gray: "bg-gray-100 text-gray-600",
}

const BANNER: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-800",
  blue: "bg-blue-50 text-blue-700",
  red: "bg-red-50 text-red-600",
  gray: "bg-gray-50 text-gray-600",
}

/* ------------------------------------------------------------------ */
/* Small inline icons (avoids icon-lib version drift)                  */
/* ------------------------------------------------------------------ */

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("h-3.5 w-3.5 transition-transform duration-150", open && "rotate-180")}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DocIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 2.5h5L12 5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 2.5V5.5h3M6 9h4M6 11h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3v18M3 12h18M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Pill                                                                */
/* ------------------------------------------------------------------ */

export function Pill({
  tone,
  children,
  dot = true,
  className,
}: {
  tone: Tone
  children: ReactNode
  dot?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-medium leading-none",
        PILL[tone],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", DOT[tone])} />}
      {children}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost"

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const base =
    "inline-flex w-full items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
  const variants: Record<ButtonVariant, string> = {
    primary:
      "h-12 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-400",
    secondary:
      "h-12 border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus-visible:ring-gray-400",
    ghost:
      "h-9 bg-transparent font-medium text-gray-500 hover:text-gray-800 focus-visible:ring-gray-300",
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* DecisionHeader                                                      */
/* ------------------------------------------------------------------ */

export function DecisionHeader({
  eyebrow,
  eyebrowTone,
  timestamp = "Just now",
  title,
  description,
}: {
  eyebrow: string
  eyebrowTone: Tone
  timestamp?: string
  title: ReactNode
  description?: ReactNode
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={cn("rounded px-2 py-1 text-[11px] font-bold uppercase tracking-wide", PILL[eyebrowTone])}>
          {eyebrow}
        </span>
        <span className="text-sm text-gray-400">{timestamp}</span>
      </div>
      <h2 className="mt-4 text-[26px] font-bold leading-tight text-gray-900">{title}</h2>
      {description && <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{description}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* SectionLabel                                                        */
/* ------------------------------------------------------------------ */

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">{children}</p>
}

/* ------------------------------------------------------------------ */
/* CheckRow                                                            */
/* ------------------------------------------------------------------ */

export function CheckRow({
  tone = "green",
  label,
  sub,
  variant = "dot",
}: {
  tone?: Tone
  label: ReactNode
  sub?: ReactNode
  variant?: "dot" | "check"
}) {
  return (
    <div className="flex items-start gap-3">
      {variant === "dot" ? (
        <span className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", DOT[tone])} />
      ) : (
        <span
          className={cn(
            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white",
            DOT[tone],
          )}
        >
          <CheckIcon className="h-3 w-3" />
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[15px] leading-snug text-gray-800">{label}</p>
        {sub && <p className="mt-0.5 text-[13px] leading-snug text-gray-400">{sub}</p>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* InformationCard                                                     */
/* ------------------------------------------------------------------ */

export function InformationCard({
  children,
  className,
  tone = "plain",
}: {
  children: ReactNode
  className?: string
  tone?: "plain" | "yellow" | "muted"
}) {
  const tones = {
    plain: "border border-gray-200 bg-white",
    yellow: "border border-amber-200 bg-amber-50",
    muted: "border border-gray-200 bg-gray-50",
  }
  return <div className={cn("rounded-xl p-4", tones[tone], className)}>{children}</div>
}

/* ------------------------------------------------------------------ */
/* RuleOption (radio card)                                             */
/* ------------------------------------------------------------------ */

export function RuleOption({
  label,
  selected,
  onSelect,
}: {
  label: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        selected ? "border-emerald-500 bg-emerald-50/40" : "border-gray-200 bg-white hover:border-gray-300",
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
          selected ? "border-emerald-500 bg-emerald-500" : "border-gray-300 bg-white",
        )}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <span className="text-[15px] font-medium leading-snug text-gray-800">{label}</span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* ScopeOption                                                         */
/* ------------------------------------------------------------------ */

export function ScopeOption({
  label,
  sub,
  selected,
  onSelect,
}: {
  label: string
  sub?: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border px-4 py-3.5 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
        selected ? "border-emerald-500 bg-emerald-50/40" : "border-gray-200 bg-white hover:border-gray-300",
      )}
    >
      <p className="text-[15px] font-semibold text-gray-800">{label}</p>
      {sub && <p className="mt-1 text-[13px] text-gray-500">{sub}</p>}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* DiffBlock                                                           */
/* ------------------------------------------------------------------ */

export function DiffBlock({
  label,
  before,
  after,
  strikeBefore,
}: {
  label?: string
  before: ReactNode
  after: ReactNode
  strikeBefore?: boolean
}) {
  return (
    <div>
      {label && <SectionLabel>{label}</SectionLabel>}
      <div className={cn(label && "mt-3", "space-y-3")}>
        <div className="flex gap-3">
          <span className="w-14 shrink-0 text-[13px] font-medium text-gray-400">Before</span>
          <span className={cn("text-[15px] leading-snug text-gray-400", strikeBefore && "line-through")}>{before}</span>
        </div>
        <div className="flex gap-3">
          <span className="w-14 shrink-0 text-[13px] font-medium text-emerald-600">After</span>
          <span className="text-[15px] font-semibold leading-snug text-gray-800">{after}</span>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* VersionItem                                                         */
/* ------------------------------------------------------------------ */

export function VersionItem({
  tone,
  name,
  sub,
}: {
  tone: Tone
  name: string
  sub: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full", DOT[tone])} />
      <div>
        <p className="text-[15px] font-medium text-gray-800">{name}</p>
        <p className="text-[13px] text-gray-400">{sub}</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* PolicyBanner (inline, in the article)                               */
/* ------------------------------------------------------------------ */

export function PolicyBanner({
  tone,
  label,
  right,
}: {
  tone: Tone
  label: string
  right: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-lg px-4 py-3.5 transition-colors duration-200",
        BANNER[tone],
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("h-4 w-4 shrink-0 rounded-[4px]", DOT[tone])} />
        <span className="text-[15px] font-medium leading-snug">{label}</span>
      </div>
      <span className="shrink-0 text-[14px] font-semibold">{right}</span>
    </div>
  )
}

export { DOT, PILL }
