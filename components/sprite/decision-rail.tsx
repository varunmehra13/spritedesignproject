"use client"

import { cn } from "@/lib/utils"
import {
  Button,
  CheckRow,
  ChevronIcon,
  DecisionHeader,
  DiffBlock,
  InformationCard,
  RuleOption,
  ScopeOption,
  SectionLabel,
  SparkIcon,
  VersionItem,
} from "./ui"
import {
  RULES,
  SCOPES,
  SOURCES,
  scopeShortLabel,
  type RuleId,
  type ScopeId,
  type Tone,
  type TrustState,
} from "@/lib/sprite"

export type RailProps = {
  state: TrustState
  rule: RuleId
  setRule: (r: RuleId) => void
  scope: ScopeId
  setScope: (s: ScopeId) => void
  sourcesOpen: boolean
  toggleSources: () => void
  valPhase: number
  onSetRule: () => void
  onAllowComparison: () => void
  onApplyRule: () => void
  onCancelGuidance: () => void
  onPublish: () => void
  onEditAgain: () => void
  onRemoveUnsupported: () => void
  onKeepDraft: () => void
  onViewArticle: () => void
}

export function DecisionRail(props: RailProps) {
  return (
    <div className="w-[380px] shrink-0 overflow-y-auto border-l border-gray-200 bg-white">
      <StageTracker state={props.state} />
      <div key={props.state} className="animate-[fadeIn_200ms_ease-out] px-6 pb-8 pt-5">
        {props.state === "exception" && <ExceptionPanel {...props} />}
        {props.state === "guidance" && <GuidancePanel {...props} />}
        {props.state === "validating" && <ValidatingPanel {...props} />}
        {props.state === "ready" && <ReadyPanel {...props} />}
        {props.state === "blocked" && <BlockedPanel {...props} />}
        {props.state === "published" && <PublishedPanel {...props} />}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stage tracker (Exception · Guidance · Validation · Approval)        */
/* ------------------------------------------------------------------ */

const STAGES: { id: string; label: string; states: TrustState[] }[] = [
  { id: "exception", label: "Exception", states: ["exception"] },
  { id: "guidance", label: "Guidance", states: ["guidance"] },
  { id: "validation", label: "Validation", states: ["validating", "blocked"] },
  { id: "approval", label: "Approval", states: ["ready", "published"] },
]

const ACTIVE_TONE: Record<string, Tone> = {
  exception: "amber",
  guidance: "green",
  validation: "blue",
  approval: "green",
}

function StageTracker({ state }: { state: TrustState }) {
  const activeIndex = STAGES.findIndex((s) => s.states.includes(state))
  const blocked = state === "blocked"
  return (
    <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-3.5">
      {STAGES.map((stage, i) => {
        const active = i === activeIndex
        const tone: Tone = blocked && stage.id === "validation" ? "red" : ACTIVE_TONE[stage.id]
        return (
          <div key={stage.id} className="flex items-center gap-2">
            {i > 0 && <span className="h-px w-3 bg-gray-200" />}
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  active
                    ? {
                        green: "bg-emerald-500",
                        amber: "bg-amber-500",
                        blue: "bg-blue-500",
                        red: "bg-red-500",
                        gray: "bg-gray-300",
                      }[tone]
                    : "bg-gray-300",
                )}
              />
              <span
                className={cn(
                  "text-[13px]",
                  active
                    ? {
                        green: "font-semibold text-emerald-600",
                        amber: "font-semibold text-amber-600",
                        blue: "font-semibold text-blue-600",
                        red: "font-semibold text-red-600",
                        gray: "text-gray-400",
                      }[tone]
                    : "text-gray-400",
                )}
              >
                {stage.label}
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sources (shared, collapsible)                                       */
/* ------------------------------------------------------------------ */

function SourcesBlock({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-2 text-left text-[14px] font-medium text-gray-500 hover:text-gray-700 focus-visible:outline-none"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 text-transparent">
          <span className="h-2 w-2 rounded-[2px] bg-gray-300" />
        </span>
        {SOURCES.length} sources reviewed
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {SOURCES.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-4 w-4 items-center justify-center rounded border border-gray-300">
                  <span className="h-2 w-2 rounded-[2px] bg-gray-200" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-gray-800">{s.name}</p>
                  <p className="text-[12px] text-gray-400">{s.type}</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[13px] font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Verified
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* State 1 — EXCEPTION                                                 */
/* ------------------------------------------------------------------ */

function ExceptionPanel(p: RailProps) {
  return (
    <div className="space-y-6">
      <DecisionHeader
        eyebrow="Policy Pause"
        eyebrowTone="amber"
        title="One decision needs your judgment"
        description="This claim is supported by the available evidence, but direct competitor naming is not established in Aster Home's current brand model."
      />

      <div className="h-px bg-gray-100" />

      <div className="space-y-4">
        <SectionLabel>Why Sprite wrote this</SectionLabel>
        <FieldLine label="Goal" value="Explain Aster Home's pre-washing process clearly" />
        <FieldLine
          label="Evidence"
          value="Aster Home product specification confirms the linen is garment-washed twice before sale and positioned as pre-softened for immediate use."
        />
        <FieldLine
          label="Comparison source"
          value="Harbor & Thread care guidance recommends several wash cycles to achieve the intended softened feel."
        />
        <FieldLine label="Intent" value="Make the product benefit concrete" />
      </div>

      <div className="space-y-3">
        <SectionLabel>What passed</SectionLabel>
        <CheckRow label="Claim supported" />
        <CheckRow label="Product facts verified" />
        <CheckRow label="Source citations valid" />
        <CheckRow label="Existing tone patterns matched" />
      </div>

      <InformationCard tone="yellow">
        <SectionLabel>Why I paused</SectionLabel>
        <p className="mt-3 text-[15px] leading-relaxed text-amber-900">
          {
            '"I can verify the comparison, but I found no Aster Home rule or published precedent that establishes direct competitor naming as an approved brand behavior. I won\'t turn an absence of guidance into a permanent brand rule."'
          }
        </p>
      </InformationCard>

      <InformationCard tone="muted">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-gray-900">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500 text-white">
            <SparkIcon className="h-3 w-3" />
          </span>
          Aster Home Brand Model
        </div>
        <p className="mt-2 text-[14px] text-gray-600">
          Tone: <span className="font-semibold text-gray-800">Premium · Calm · Tactile</span>
        </p>
        <p className="mt-1 text-[13px] text-gray-400">38 learned brand patterns</p>
      </InformationCard>

      <SourcesBlock open={p.sourcesOpen} onToggle={p.toggleSources} />

      <div className="space-y-3 pt-1">
        <Button onClick={p.onSetRule}>Set the brand rule</Button>
        <Button variant="secondary" onClick={p.onAllowComparison}>
          Allow this comparison
        </Button>
        <Button variant="ghost" onClick={p.onKeepDraft}>
          Keep as draft
        </Button>
      </div>
    </div>
  )
}

function FieldLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[13px] text-gray-400">{label}</p>
      <p className="mt-0.5 text-[15px] leading-snug text-gray-700">{value}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* State 2 — GUIDANCE                                                  */
/* ------------------------------------------------------------------ */

function GuidancePanel(p: RailProps) {
  return (
    <div className="space-y-6">
      <DecisionHeader
        eyebrow="Brand Guidance"
        eyebrowTone="green"
        timestamp="Step 2 of 2"
        title="How should Sprite handle this?"
        description="Correct the assumption instead of rewriting the article manually."
      />

      <div>
        <SectionLabel>Current assumption</SectionLabel>
        <InformationCard tone="muted" className="mt-3">
          <p className="text-[15px] leading-relaxed text-gray-600">
            {
              '"No explicit Aster Home rule covers direct competitor naming. Sprite allowed the supported comparison into the draft, but paused before treating that behavior as publishable precedent."'
            }
          </p>
        </InformationCard>
      </div>

      <div>
        <SectionLabel>Select brand rule</SectionLabel>
        <div role="radiogroup" aria-label="Brand rule" className="mt-3 space-y-2.5">
          {RULES.map((r) => (
            <RuleOption key={r.id} label={r.label} selected={p.rule === r.id} onSelect={() => p.setRule(r.id)} />
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Preview the rule</SectionLabel>
        <p className="mt-2 text-[13px] leading-snug text-gray-400">
          See how this brand rule changes the flagged passage before applying it.
        </p>
        <InformationCard tone="muted" className="mt-3 space-y-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-600">Before</p>
            <p className="mt-2 text-[15px] leading-snug text-gray-600">
              {"'Unlike Harbor & Thread, that process gives the fabric a softer first-night feel...'"}
            </p>
          </div>
          <div className="h-px bg-gray-200" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">After</p>
            <p className="mt-2 text-[15px] leading-snug text-gray-800">
              {
                "'Aster Home's double garment-washing process gives the fabric a softer first-night feel without waiting through multiple wash cycles.'"
              }
            </p>
          </div>
        </InformationCard>
      </div>

      <div>
        <SectionLabel>Use this rule for</SectionLabel>
        <div role="radiogroup" aria-label="Rule scope" className="mt-3 space-y-2.5">
          {SCOPES.map((s) => (
            <ScopeOption
              key={s.id}
              label={s.label}
              sub={s.sub}
              selected={p.scope === s.id}
              onSelect={() => p.setScope(s.id)}
            />
          ))}
        </div>
        <p className="mt-3 text-[13px] leading-snug text-gray-400">
          Broader scopes update Sprite's brand guidance for future work.
        </p>
      </div>

      <div className="space-y-3 pt-1">
        <Button onClick={p.onApplyRule}>Apply rule &amp; re-check</Button>
        <Button variant="secondary" onClick={p.onCancelGuidance}>
          Cancel
        </Button>
      </div>
      <p className="text-center text-[13px] text-gray-400">
        Article remains unpublished while this change is validated.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* State 3 — VALIDATING                                                */
/* ------------------------------------------------------------------ */

const VAL_STEPS = [
  { label: "Rewrite affected passage", sub: "Preserved the original product benefit" },
  { label: "Re-run claim verification", sub: "Product claim remains supported" },
  { label: "Validate source coverage", sub: "Required sources still support the revised wording" },
  { label: "Re-run Brand Reflection", sub: "Checking the revised passage against Aster Home's brand patterns" },
  { label: "Final publication check", sub: "Waiting for Brand Reflection" },
]

function stepTone(index: number, phase: number): Tone {
  if (index <= 2) return "green"
  if (index === 3) return phase >= 1 ? "green" : "blue"
  return phase >= 2 ? "green" : phase >= 1 ? "blue" : "gray"
}

function ValidatingPanel(p: RailProps) {
  return (
    <div className="space-y-6">
      <DecisionHeader
        eyebrow="Validating Revision"
        eyebrowTone="blue"
        title="Validating the revised draft"
        description="Your rule has been applied. The article remains unpublished until the revised draft passes the same factual and brand checks."
      />

      <div>
        <SectionLabel>Progress checklist</SectionLabel>
        <div className="mt-4 space-y-4">
          {VAL_STEPS.map((step, i) => {
            const tone = stepTone(i, p.valPhase)
            return (
              <CheckRow
                key={step.label}
                tone={tone}
                label={<span className={tone === "gray" ? "text-gray-400" : "text-gray-800"}>{step.label}</span>}
                sub={step.sub}
              />
            )
          })}
        </div>
      </div>

      <InformationCard tone="muted">
        <SectionLabel>Rule applied</SectionLabel>
        <p className="mt-3 text-[15px] font-bold text-gray-900">{"'" + RULES.find((r) => r.id === p.rule)?.label + "'"}</p>
        <p className="mt-1 text-[13px] text-gray-400">Scope: {scopeShortLabel(p.scope)}</p>
      </InformationCard>

      <div>
        <SectionLabel>Version history</SectionLabel>
        <div className="mt-3 space-y-3">
          <VersionItem tone="amber" name="Draft V1" sub="Original flagged comparison" />
          <VersionItem tone="blue" name="Draft V2" sub="Revised claim under validation (Active)" />
        </div>
      </div>

      <Button disabled>Publish</Button>
      <p className="text-center text-[13px] text-gray-400">Publication unavailable while validation is running.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* State 4 — READY                                                     */
/* ------------------------------------------------------------------ */

function ReadyPanel(p: RailProps) {
  return (
    <div className="space-y-6">
      <DecisionHeader
        eyebrow="Ready to Launch"
        eyebrowTone="green"
        title="Ready to publish"
        description="Your correction has been applied and the revised article passed Sprite's checks. This revision contains the brand decision you just made, so approval applies specifically to Draft V2."
      />

      <div>
        <SectionLabel>What changed</SectionLabel>
        <InformationCard tone="muted" className="mt-3 space-y-4">
          <DiffBlock
            label="Brand Behavior"
            before="Direct competitor comparison"
            after="Category-level product explanation"
            strikeBefore
          />
          <div className="h-px bg-gray-200" />
          <DiffBlock
            label="Claim Shift"
            before={'"Unlike Harbor & Thread, that process gives..."'}
            after={"\"Aster Home's double garment-washing process...\""}
          />
          <div className="h-px bg-gray-200" />
          <div>
            <SectionLabel>Meaning preserved</SectionLabel>
            <div className="mt-3 space-y-2.5">
              <CheckRow variant="check" label="Product benefit unchanged" />
              <CheckRow variant="check" label="Supporting evidence unchanged" />
            </div>
          </div>
        </InformationCard>
      </div>

      <div>
        <SectionLabel>Verification suite</SectionLabel>
        <div className="mt-3 space-y-3">
          <CheckRow label="Claims verified" />
          <CheckRow label="Sources valid" />
          <CheckRow label="Brand Reflection passed" />
          <CheckRow label="Publishing requirements passed" />
        </div>
      </div>

      <InformationCard tone="muted">
        <SectionLabel>What Sprite learned</SectionLabel>
        <p className="mt-3 text-[15px] font-bold text-gray-900">{"'" + RULES.find((r) => r.id === p.rule)?.label + "'"}</p>
        <p className="mt-1 flex items-center gap-2 text-[13px] text-gray-400">
          Scope: {scopeShortLabel(p.scope)}
          <button
            type="button"
            onClick={p.onEditAgain}
            className="font-medium text-blue-600 hover:underline focus-visible:outline-none"
          >
            Change scope
          </button>
        </p>
      </InformationCard>

      <div>
        <SectionLabel>Active version</SectionLabel>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md border border-emerald-500 px-3 py-1.5 text-[13px] font-semibold text-emerald-700">
            Draft V2
          </span>
          <span className="rounded-md border border-gray-200 px-3 py-1.5 text-[13px] font-medium text-gray-500">
            Current
          </span>
        </div>
        <p className="mt-2 text-[13px] text-gray-400">Revised content</p>
        <p className="mt-1 text-[13px] text-gray-400">Approval of Draft V1 cannot publish Draft V2.</p>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-3">
        <p className="text-[17px] font-bold uppercase tracking-wide text-emerald-700">Publish this revision?</p>
        <p className="text-[15px] text-gray-600">This publishes Draft V2 to the connected site.</p>
        <Button onClick={p.onPublish}>Approve &amp; publish Draft V2</Button>
        <Button variant="secondary" onClick={p.onEditAgain}>
          Edit again
        </Button>
      </div>
      <div>
        <p className="text-[14px] font-medium text-gray-500">Keep as draft</p>
        <p className="mt-1 text-[13px] text-gray-400">
          After this exception is resolved, Autopilot continues for routine content.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* State 5 — BLOCKED                                                   */
/* ------------------------------------------------------------------ */

function BlockedPanel(p: RailProps) {
  return (
    <div className="space-y-6">
      <DecisionHeader
        eyebrow="Evidence Reqd"
        eyebrowTone="red"
        title="One revised claim needs attention"
        description="The brand correction was applied, but the new wording introduced a claim the current sources do not support."
      />

      <div>
        <SectionLabel>Unsupported phrase</SectionLabel>
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] font-medium text-red-600">
          {'"than standard linen bedding"'}
        </div>
      </div>

      <div>
        <SectionLabel>What I can verify</SectionLabel>
        <div className="mt-3 space-y-2.5">
          <CheckRow tone="green" label="Aster Home garment-washes the linen twice" />
          <CheckRow tone="green" label="The process is intended to soften fabric before sale" />
        </div>
      </div>

      <div>
        <SectionLabel>What I cannot verify</SectionLabel>
        <div className="mt-3">
          <CheckRow tone="red" label="That it is softer than 'standard linen bedding' as a category" />
        </div>
      </div>

      <InformationCard tone="muted">
        <SectionLabel>Platform state</SectionLabel>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
          The article remains unpublished. Draft V1 was not restored automatically. Draft V2 will not publish until this
          claim is resolved.
        </p>
      </InformationCard>

      <div className="space-y-3 pt-1">
        <Button onClick={p.onRemoveUnsupported}>Remove unsupported phrase</Button>
        <Button variant="secondary" onClick={p.onKeepDraft}>
          Review evidence
        </Button>
        <Button variant="ghost" onClick={p.onKeepDraft}>
          Keep as draft
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Published micro-state                                               */
/* ------------------------------------------------------------------ */

function PublishedPanel(p: RailProps) {
  return (
    <div className="space-y-6">
      <DecisionHeader
        eyebrow="Published"
        eyebrowTone="green"
        title="Draft V2 is live"
        description="Autopilot resumed for routine content."
      />
      <InformationCard tone="muted">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
            <SparkIcon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[15px] font-semibold text-gray-900">Revision published</p>
            <p className="text-[13px] text-gray-400">Draft V2 · {scopeShortLabel(p.scope)}</p>
          </div>
        </div>
      </InformationCard>

      <div>
        <SectionLabel>Verification suite</SectionLabel>
        <div className="mt-3 space-y-3">
          <CheckRow label="Claims verified" />
          <CheckRow label="Sources valid" />
          <CheckRow label="Brand Reflection passed" />
          <CheckRow label="Publishing requirements passed" />
        </div>
      </div>

      <Button onClick={p.onViewArticle}>View article</Button>
    </div>
  )
}
