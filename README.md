# Mirror

> The mirror does not judge. It reflects.

**Mirror** is an evidence-based behavioral reflection platform. It measures the
gap between how a person sees themselves and how their trusted circles actually
experience them — on specific, observable behaviors. It shows the distance
mathematically, and then holds the silence around it.

---

## What Mirror is

A person rates themselves on a set of observable behaviors. They invite a small
number of trusted respondents — grouped into **circles** (Work, Family, Friends)
— to rate them on the same behaviors, confidentially.

Mirror computes the difference. That difference is the product.

```
   self        observed
    │              ●
    │     ─────────
    │       the gap
    │
  1 ────── 2 ────── 3 ────── 4 ────── 5
```

## What Mirror is not

- **Not a personality test.** No labels, no types, no diagnoses.
- **Not therapy.** No interpretation, no advice, no "what this means."
- **Not an AI analyst.** The system computes math. It does not read between
  the lines.
- **Not a social app.** No feed, no likes, no sharing.

## Foundational principles

1. **The gap is the product.** Everything else exists to serve it.
2. **Observable behaviors only.** "How often do you interrupt?" — not
   "Are you a narcissist?" Behaviors must be seeable, not interpretive.
3. **Confidential, not anonymous.** The system knows *which circle* feedback
   came from, but never *which individual*. This distinction is foundational
   to trust.
4. **No judgment.** No red/green. No good/bad. The numbers sit in whitespace
   and the reader decides what they mean.
5. **The system refuses to interpret.** It will not tell you what the gap
   means or what to do about it. That is yours to sit with.

## The emotional journey

```
Shock  →  Clarity  →  Acceptance
```

Mirror is designed to be heavy, quiet, and deeply honest — the emotional
equivalent of a quiet room with an executive coach who asks one precise
question and then waits.

---

## Tech stack

| Layer       | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | Next.js 16 (App Router)                 |
| Language    | TypeScript 5                            |
| Styling     | Tailwind CSS 4 + shadcn/ui (New York)   |
| Database    | Prisma ORM + SQLite                     |
| State       | Zustand (client) + persist              |
| Typography  | Fraunces (display) + Inter (body)       |

## Getting started

```bash
# 1. Install dependencies
bun install

# 2. Configure the database
cp .env.example .env
bun run db:push        # creates the SQLite database

# 3. (Optional) seed the behavioral instrument
bun run db:seed        # if a seed script is wired

# 4. Run the dev server
bun run dev
```

The app runs on `http://localhost:3000`.

## How it works

```
Profile ─▶ Select behaviors ─▶ Self-assessment
                                        │
                                        ▼
              Confidential invitations ─▶ Feedback (per circle)
                                        │
                                        ▼
                              The Report — the gap
```

- **Behaviors** — a curated set of observable, non-judgmental statements
  across categories (Communication, Emotional Presence, Leadership,
  Relational, Reliability).
- **Self-assessment** — the subject rates themselves on a 5-point frequency
  scale (Never → Almost always).
- **Invitations** — the subject invites 5–10 trusted respondents, assigned to
  a circle. Each invitation is a tokenized link.
- **Feedback** — respondents rate the subject on the same behaviors. The
  system records which *circle* responded, but never *who* within it.
- **The Report** — for each behavior, Mirror shows the self-rating, the
  observed average, the gap, and a per-circle breakdown. Sorted by gap
  magnitude. No color judgment.

## Design philosophy

- **Whitespace does the heavy lifting.** The page breathes.
- **Typography, not color, carries meaning.** Fraunces serif for gravity;
  a monospace scale for the clinical numbers.
- **No judgment colors.** No red. No green. A single ink scale on warm paper.
- **The numbers are undeniable.** They sit, and the reader meets them.

## Project structure

```
prisma/
  schema.prisma        # data model — User, Behavior, Feedback, etc.
  seed.ts              # behavioral instrument seed
src/
  app/
    page.tsx           # single route, state-driven views
    api/               # backend routes (behaviors, report, feedback, ...)
  components/mirror/
    gap-bar.tsx        # THE visualization — self ↔ gap ↔ observed
    rating-scale.tsx   # the 5-point instrument
    views/             # landing, setup, behaviors, self, invite, report
  lib/
    db.ts              # Prisma client
    store.ts           # Zustand session store
    api.ts             # thin API client
```

## License

Private project. All rights reserved.
