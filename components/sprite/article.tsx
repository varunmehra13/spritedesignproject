"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Pill, PolicyBanner } from "./ui"
import { getArticleConfig, type Tone, type TrustState } from "@/lib/sprite"

const TITLE = "Why linen bedding feels better with every wash"

const EMPHASIS_TONE: Record<Tone, string> = {
  green: "decoration-emerald-500 text-gray-900",
  amber: "decoration-amber-500 text-gray-900",
  blue: "decoration-blue-500 text-gray-900",
  red: "decoration-red-500 text-gray-900",
  gray: "decoration-gray-400 text-gray-900",
}

export function Article({ state }: { state: TrustState }) {
  const cfg = getArticleConfig(state)

  return (
    <article className="mx-auto w-full max-w-[840px] rounded-2xl border border-gray-200 bg-white px-10 py-9 shadow-sm">
      <h1 className="text-[40px] font-bold leading-[1.1] tracking-tight text-gray-900">{TITLE}</h1>

      <div className="mt-4 flex items-center gap-4 text-[14px] text-gray-400">
        <span>{cfg.savedLine}</span>
        <span className="text-gray-200">|</span>
        <span>Reading time: 3 mins</span>
      </div>

      <hr className="mt-5 border-gray-200" />

      <div className="mt-6 overflow-hidden rounded-xl">
        <Image
          src="/images/linen-bed.png"
          alt="Crumpled beige linen bedding in soft morning light"
          width={840}
          height={360}
          className="h-[300px] w-full object-cover"
          priority
        />
      </div>

      <p className="mt-6 text-[18px] leading-relaxed text-gray-700">
        There is a common misconception that premium bedding is at its peak comfort the moment it leaves the retail
        package. While that might hold true for synthetic blends and standard cotton weaves, true Belgian flax linen
        plays by a completely different set of rules.
      </p>

      <div className="mt-6">
        <Pill tone={cfg.inlinePill.tone} className="text-[13px]">
          {cfg.inlinePill.label}
        </Pill>
      </div>

      <p className="mt-3 text-[18px] leading-relaxed text-gray-700">
        {cfg.passage.pre}
        <span
          className={cn("font-bold underline underline-offset-4 transition-colors duration-200", EMPHASIS_TONE[cfg.passageTone])}
        >
          {cfg.passage.emphasis}
        </span>
      </p>

      {cfg.banner && (
        <div className="mt-5">
          <PolicyBanner tone={cfg.banner.tone} label={cfg.banner.label} right={cfg.banner.right} />
        </div>
      )}

      <p className="mt-6 text-[18px] leading-relaxed text-gray-700">
        The secret lies in the structure of the flax fiber itself. Flax is inherently stronger and thicker than cotton,
        meaning its natural pectins require mechanical and thermal relaxation to unlock the deep, supple softness that
        linen connoisseurs crave. Regular laundering slowly dissolves these pectins, making the sheets progressively
        softer.
      </p>

      <p className="mt-6 text-[18px] leading-relaxed text-gray-700">
        Over time, this results in a fabric that behaves more like an heirloom piece than temporary linen. While most
        brands instruct clients to survive a break-in phase, our pre-washing approach short-circuits this timeline
        entirely.
      </p>
    </article>
  )
}
