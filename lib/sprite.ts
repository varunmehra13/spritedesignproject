export type TrustState =
  | "exception"
  | "guidance"
  | "validating"
  | "ready"
  | "blocked"
  | "published"

export type Tone = "green" | "amber" | "blue" | "red" | "gray"

export type RuleId = "avoid" | "allow" | "ask"
export type ScopeId = "article" | "cluster" | "all"
export type DemoMode = "pass" | "fail"

export const RULES: { id: RuleId; label: string }[] = [
  { id: "avoid", label: "Avoid naming competitors directly" },
  { id: "allow", label: "Allow competitor names when the comparison is neutral and sourced" },
  { id: "ask", label: "Ask me whenever a competitor is named" },
]

export const SCOPES: { id: ScopeId; label: string; sub?: string }[] = [
  { id: "article", label: "This article only" },
  { id: "cluster", label: "This content cluster" },
  { id: "all", label: "All future Aster Home content", sub: "Updates persistent brand guidance." },
]

export function scopeShortLabel(id: ScopeId): string {
  switch (id) {
    case "article":
      return "This article only"
    case "cluster":
      return "This content cluster"
    case "all":
      return "All future Aster Home content"
  }
}

export const SOURCES = [
  { name: "Aster Home", type: "Product specification" },
  { name: "Harbor & Thread", type: "Care guide" },
]

// Article passage shown inline. `pre` is normal text, `emphasis` is the
// bold + underlined flagged/changed portion.
type Passage = { pre: string; emphasis: string }

const ORIGINAL: Passage = {
  pre: "Aster Home's linen is garment-washed twice before it reaches your bed. ",
  emphasis:
    "Unlike Harbor & Thread, that process gives the fabric a softer first-night feel without waiting through multiple wash cycles.",
}

const REVISED: Passage = {
  pre: "Aster Home's linen is garment-washed twice before it reaches your bed. ",
  emphasis:
    "Aster Home's double garment-washing process gives the fabric a softer first-night feel without waiting through multiple wash cycles.",
}

const BLOCKED_PASSAGE: Passage = {
  pre: "Aster Home's process makes linen softer from the very first night ",
  emphasis: "than standard linen bedding.",
}

export type ArticleConfig = {
  draftLabel: string
  statusSuffix?: string
  savedLine: string
  passage: Passage
  inlinePill: { label: string; tone: Tone }
  banner: { label: string; right: string; tone: Tone } | null
  passageTone: Tone
}

export function getArticleConfig(state: TrustState): ArticleConfig {
  switch (state) {
    case "exception":
      return {
        draftLabel: "Draft V1",
        savedLine: "Written by Sprite AI · Last saved 2 mins ago",
        passage: ORIGINAL,
        inlinePill: { label: "Brand judgment", tone: "amber" },
        banner: {
          label: "Brand policy exception: Competitor comparison ('Harbor & Thread') needs human judgment",
          right: "Judgment required",
          tone: "amber",
        },
        passageTone: "amber",
      }
    case "guidance":
      return {
        draftLabel: "Draft V1",
        savedLine: "Written by Sprite AI · Last saved 2 mins ago",
        passage: ORIGINAL,
        inlinePill: { label: "Rule being defined", tone: "amber" },
        banner: {
          label: "Brand policy exception: Competitor comparison ('Harbor & Thread') needs human judgment",
          right: "Judgment required",
          tone: "amber",
        },
        passageTone: "amber",
      }
    case "validating":
      return {
        draftLabel: "Draft V2",
        statusSuffix: "Validating",
        savedLine: "Written by Sprite AI · Re-running brand reflection…",
        passage: REVISED,
        inlinePill: { label: "Re-validating", tone: "blue" },
        banner: {
          label: "Re-evaluating: Applying updated 'Avoid Naming Competitors' rule to flagged passage",
          right: "Updating",
          tone: "blue",
        },
        passageTone: "blue",
      }
    case "ready":
      return {
        draftLabel: "Draft V2",
        statusSuffix: "Ready",
        savedLine: "Written by Sprite AI · Last saved 1 min ago",
        passage: REVISED,
        inlinePill: { label: "Verified", tone: "green" },
        banner: {
          label: "Brand policy check passed: Competitor references removed per new rule",
          right: "Verified",
          tone: "green",
        },
        passageTone: "green",
      }
    case "blocked":
      return {
        draftLabel: "Draft V2",
        statusSuffix: "Blocked",
        savedLine: "Written by Sprite AI · Last saved just now",
        passage: BLOCKED_PASSAGE,
        inlinePill: { label: "Evidence gap", tone: "red" },
        banner: {
          label: "Verification error: Unsupported broad claim detected in revised passage",
          right: "Blocked",
          tone: "red",
        },
        passageTone: "red",
      }
    case "published":
      return {
        draftLabel: "Draft V2",
        statusSuffix: "Live",
        savedLine: "Written by Sprite AI · Published just now",
        passage: REVISED,
        inlinePill: { label: "Published", tone: "green" },
        banner: {
          label: "Brand policy check passed: Competitor references removed per new rule",
          right: "Verified",
          tone: "green",
        },
        passageTone: "green",
      }
  }
}

export function getTopStatus(state: TrustState): { label: string; tone: Tone } {
  switch (state) {
    case "exception":
    case "guidance":
      return { label: "Paused for one decision", tone: "amber" }
    case "validating":
      return { label: "Validation in progress", tone: "blue" }
    case "ready":
      return { label: "Ready after correction", tone: "green" }
    case "blocked":
      return { label: "Blocked — evidence required", tone: "red" }
    case "published":
      return { label: "Published", tone: "green" }
  }
}

export const PROGRESS_KEY: TrustState = "validating"
