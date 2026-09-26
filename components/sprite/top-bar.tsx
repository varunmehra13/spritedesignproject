"use client"

import { Pill } from "./ui"
import { getArticleConfig, getTopStatus, type TrustState } from "@/lib/sprite"

const TITLE = "Why linen bedding feels better with every wash"

export function TopBar({ state }: { state: TrustState }) {
  const cfg = getArticleConfig(state)
  const status = getTopStatus(state)
  const sub = ["Article", "Product education", cfg.draftLabel, cfg.statusSuffix]
    .filter(Boolean)
    .join(" · ")

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-md border border-gray-200 px-2.5 py-1 text-[12px] font-medium text-gray-500">
          Article
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-gray-900">{TITLE}</p>
          <p className="truncate text-[12px] text-gray-400">{sub}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Pill tone="green">Autopilot ON</Pill>
        <Pill tone={status.tone}>{status.label}</Pill>
      </div>
    </header>
  )
}
