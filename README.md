# Sprite — Handoff of Trust

Coded prototype for the Sprite Design Engineer exercise.

## Interaction

This prototype explores one moment in an autonomous AI content workflow:

Sprite has generated and verified an article, but detects a novel brand-policy decision before publication. Instead of silently deciding on behalf of the marketer, it escalates that specific judgment.

Flow:

1. Exception detected
2. Human defines the brand rule
3. Sprite revises and re-validates the article
4. Human approves the current revision
5. Optional blocked state if the revised claim cannot be verified

## Design principles

- Routine work remains autonomous
- Human intervention is exception-driven
- Pushback teaches the system rather than restarting the workflow
- Learning scope is explicit
- Revised content must be re-validated
- Approval is bound to the current draft version

## Prototype architecture

The interaction uses a deterministic client-side state model:

`exception → guidance → validating → ready → published`

Optional failure path:

`validating → blocked`

No real AI, CMS, or backend is required for this prototype.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- v0
- Vercel

## Design

Figma: https://www.figma.com/design/RG8iiMTP4Pat1y9fxAjAwJ/Sprite-Design-Project?m=auto&t=Fhgy78Qs0OYEKFwZ-6

## Live prototype
https://spritedesignproject.vercel.app/

