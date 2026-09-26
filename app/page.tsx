"use client"

import { useCallback, useEffect, useState } from "react"
import { Sidebar } from "@/components/sprite/sidebar"
import { TopBar } from "@/components/sprite/top-bar"
import { Article } from "@/components/sprite/article"
import { DecisionRail } from "@/components/sprite/decision-rail"
import type { DemoMode, RuleId, ScopeId, TrustState } from "@/lib/sprite"

export default function Page() {
  const [state, setState] = useState<TrustState>("exception")
  const [rule, setRule] = useState<RuleId>("avoid")
  const [scope, setScope] = useState<ScopeId>("article")
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [valPhase, setValPhase] = useState(0)
  const [demoMode, setDemoMode] = useState<DemoMode>("pass")
  const [currentDraftId, setCurrentDraftId] = useState("draft-v1")
  const [validationTarget, setValidationTarget] = useState<TrustState>("ready")

  // Deterministic validation animation while in the "validating" state.
  useEffect(() => {
    if (state !== "validating") return
    setValPhase(0)
    const t1 = setTimeout(() => setValPhase(1), 900)
    const t2 = setTimeout(() => setValPhase(2), 1600)
    const t3 = setTimeout(() => setState(validationTarget), 2000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [state, validationTarget])

  // Version safety: only publish the draft currently displayed.
  const publishDraft = useCallback(
    (draftId: string) => {
      if (draftId !== currentDraftId) return
      setState("published")
    },
    [currentDraftId],
  )

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f6f7f8] text-gray-900">
      <Sidebar demoMode={demoMode} onDemoModeChange={setDemoMode} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar state={state} />

        <div className="flex min-h-0 flex-1">
          <main className="flex-1 overflow-y-auto px-8 py-8">
            <Article state={state} />
          </main>

          <DecisionRail
            state={state}
            rule={rule}
            setRule={setRule}
            scope={scope}
            setScope={setScope}
            sourcesOpen={sourcesOpen}
            toggleSources={() => setSourcesOpen((v) => !v)}
            valPhase={valPhase}
            onSetRule={() => setState("guidance")}
            onAllowComparison={() => {}}
            onApplyRule={() => {
              setCurrentDraftId("draft-v2")
              setValidationTarget(demoMode === "fail" ? "blocked" : "ready")
              setState("validating")
            }}
            onCancelGuidance={() => setState("exception")}
            onPublish={() => publishDraft("draft-v2")}
            onEditAgain={() => setState("guidance")}
            onRemoveUnsupported={() => {
              setValidationTarget("ready")
              setState("validating")
            }}
            onKeepDraft={() => {}}
            onViewArticle={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
