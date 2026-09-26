"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { DOT, PolicyBanner } from "./ui"
import { getArticleConfig, type Tone, type TrustState } from "@/lib/sprite"

const TITLE = "Why linen bedding feels better with every wash"

// State-aware inline highlight. A soft tonal background — not an underline —
// so the passage reads as annotated by Sprite rather than as a hyperlink.
const EMPHASIS_TONE: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-950",
  amber: "bg-amber-50 text-amber-950",
  blue: "bg-blue-50 text-blue-950",
  red: "bg-red-50 text-red-700",
  gray: "bg-gray-100 text-gray-900",
}

export function Article({ state }: { state: TrustState }) {
  const cfg = getArticleConfig(state)

  return (
    <article className="mx-auto w-full max-w-[820px] rounded-2xl border border-gray-200/80 bg-white px-12 py-11 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.08)]">
      <h1 className="max-w-[16ch] text-balance text-[42px] font-bold leading-[1.08] tracking-[-0.022em] text-gray-900">
        {TITLE}
      </h1>

      <div className="mt-5 flex items-center gap-3 text-[13.5px] text-gray-400">
        <span>{cfg.savedLine}</span>
        <span className="h-3.5 w-px bg-gray-200" aria-hidden="true" />
        <span>Reading time: 3 mins</span>
      </div>

      <hr className="mt-6 border-gray-100" />

      <div className="mt-7 overflow-hidden rounded-xl ring-1 ring-gray-200/60">
        <Image
          src="/images/linen-bed.png"
          alt="Crumpled beige linen bedding in soft morning light"
          width={840}
          height={360}
          className="h-[300px] w-full object-cover"
          priority
        />
      </div>

      <p className="mt-8 text-[18px] leading-[1.75] tracking-[-0.003em] text-gray-700">
        There is a common misconception that premium bedding is at its peak comfort the moment it leaves the retail
        package. While that might hold true for synthetic blends and standard cotton weaves, true Belgian flax linen
        plays by a completely different set of rules.
      </p>

      <div className="mt-7 flex items-center gap-2">
        <span className={cn("h-1.5 w-1.5 rounded-full", DOT[cfg.inlinePill.tone])} aria-hidden="true" />
        <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-gray-500">
          {cfg.inlinePill.label}
        </span>
      </div>

      <p className="mt-2.5 text-[18px] leading-[1.75] tracking-[-0.003em] text-gray-700">
        {cfg.passage.pre}
        <span
          className={cn(
            "box-decoration-clone rounded-[4px] px-1 py-0.5 font-medium transition-colors duration-200",
            EMPHASIS_TONE[cfg.passageTone],
          )}
        >
          {cfg.passage.emphasis}
        </span>
      </p>

      {cfg.banner && (
        <div className="mt-6">
          <PolicyBanner tone={cfg.banner.tone} label={cfg.banner.label} right={cfg.banner.right} />
        </div>
      )}

      <p className="mt-8 text-[18px] leading-[1.75] tracking-[-0.003em] text-gray-700">
        The secret lies in the structure of the flax fiber itself. Flax is inherently stronger and thicker than cotton,
        meaning its natural pectins require mechanical and thermal relaxation to unlock the deep, supple softness that
        linen connoisseurs crave. Regular laundering slowly dissolves these pectins, making the sheets progressively
        softer.
      </p>

      <p className="mt-6 text-[18px] leading-[1.75] tracking-[-0.003em] text-gray-700">
        Over time, this results in a fabric that behaves more like an heirloom piece than temporary linen. While most
        brands instruct clients to survive a break-in phase, our pre-washing approach short-circuits this timeline
        entirely.
      </p>
    </article>
  )
}
