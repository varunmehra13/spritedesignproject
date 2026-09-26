"use client"

import { cn } from "@/lib/utils"
import { SparkIcon } from "./ui"
import type { DemoMode } from "@/lib/sprite"

const NAV = ["Home", "Content", "Articles", "Brand", "Analytics"]

function SidebarItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "w-full rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300",
        active ? "bg-gray-100 font-semibold text-gray-900" : "font-medium text-gray-600 hover:bg-gray-50",
      )}
    >
      {label}
    </button>
  )
}

export function Sidebar({
  demoMode,
  onDemoModeChange,
}: {
  demoMode: DemoMode
  onDemoModeChange: (m: DemoMode) => void
}) {
  return (
    <aside className="flex w-[200px] shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <SparkIcon className="h-4 w-4" />
        </span>
        <span className="text-[17px] font-bold tracking-tight text-gray-900">Sprite AI</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-2">
        {NAV.map((item) => (
          <SidebarItem key={item} label={item} active={item === "Articles"} />
        ))}
      </nav>

      <div className="mt-auto px-3 pb-3">
        {/* Discreet demo-only control */}
        <div className="mb-3 flex items-center gap-1.5 px-2 text-[11px] text-gray-300">
          <span>Demo validation:</span>
          {(["pass", "fail"] as DemoMode[]).map((m, i) => (
            <span key={m} className="flex items-center gap-1.5">
              {i === 1 && <span aria-hidden="true">|</span>}
              <button
                type="button"
                onClick={() => onDemoModeChange(m)}
                className={cn(
                  "capitalize transition-colors hover:text-gray-500 focus-visible:outline-none",
                  demoMode === m ? "font-semibold text-gray-500" : "text-gray-300",
                )}
              >
                {m}
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[12px] font-semibold text-gray-600">
            AH
          </span>
          <div>
            <p className="text-[14px] font-semibold text-gray-900">Aster Home</p>
            <p className="text-[12px] text-gray-400">Premium Linen</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
