// Seed the behavioral instrument.
//
// Every behavior here is OBSERVABLE — it can be witnessed and counted.
// None are labels. None are diagnoses. None are inherently good or bad.
// They are simply things a person does, that others can see.
//
// FORMAT VARIETY (keeps engagement high without breaking the gap):
//   frequency — behavior text + Never→Almost always (1-5)
//   agreement — behavior text + Strongly disagree→Strongly agree (1-5)
//   scenario  — a situation prompt ({subject}→you/name) + 5 ordered options (1-5)
//
// The stored rating is ALWAYS 1-5, so self-vs-external gaps stay
// mathematically sound no matter which format the question used.
//
// Scenario options are ordered from LEAST of the behavior (rating 1)
// to MOST of the behavior (rating 5). This keeps the direction
// consistent across all formats.

import { db } from "../src/lib/db"

type BehaviorSeed = {
  text: string
  category: string
  format: "frequency" | "agreement" | "scenario"
  prompt?: string        // scenario only — contains {subject}
  options?: string[]     // scenario only — 5 strings, index 0 = rating 1
}

const behaviors: BehaviorSeed[] = [
  // ── Communication ──────────────────────────────────────────
  {
    category: "Communication",
    text: "Interrupts others while they are speaking",
    format: "frequency",
  },
  {
    category: "Communication",
    text: "Makes eye contact during conversation",
    format: "frequency",
  },
  {
    category: "Communication",
    text: "Explains complex ideas clearly",
    format: "frequency",
  },
  {
    category: "Communication",
    text: "Listens without preparing a response while the other person speaks",
    format: "scenario",
    prompt: "When someone is telling {subject} something important, {subject}:",
    options: [
      "Plans what to say next while they talk",
      "Half-listens, half-thinks about a reply",
      "Tries to listen but drifts sometimes",
      "Gives full attention and responds after",
      "Stays completely present, lets silence do the work",
    ],
  },
  {
    category: "Communication",
    text: "Speaks loudly enough to be heard in a group",
    format: "frequency",
  },
  {
    category: "Communication",
    text: "Says what they mean, even when it is uncomfortable",
    format: "agreement",
  },
  {
    category: "Communication",
    text: "Reads the room before speaking",
    format: "scenario",
    prompt: "In a group where {subject} is unsure of the dynamics, {subject}:",
    options: [
      "Jumps in without reading the room",
      "Speaks up fairly quickly",
      "Waits a bit to sense the tone",
      "Observes quietly before contributing",
      "Stays mostly quiet, speaks only when certain",
    ],
  },
  {
    category: "Communication",
    text: "Asks for clarification when they do not understand",
    format: "frequency",
  },

  // ── Leadership ─────────────────────────────────────────────
  {
    category: "Leadership",
    text: "Takes responsibility when something goes wrong",
    format: "frequency",
  },
  {
    category: "Leadership",
    text: "Gives credit to others for their work",
    format: "frequency",
  },
  {
    category: "Leadership",
    text: "Makes decisions without consulting those affected",
    format: "scenario",
    prompt: "When a decision affects the whole group, {subject}:",
    options: [
      "Decides alone and announces it",
      "Decides quickly with minimal input",
      "Asks a couple of people, then decides",
      "Consults the group, then decides",
      "Seeks full consensus before moving",
    ],
  },
  {
    category: "Leadership",
    text: "Follows through on commitments they have made",
    format: "frequency",
  },
  {
    category: "Leadership",
    text: "Delegates tasks rather than doing everything themselves",
    format: "frequency",
  },
  {
    category: "Leadership",
    text: "Gives direct feedback when someone's work falls short",
    format: "agreement",
  },
  {
    category: "Leadership",
    text: "Holds others accountable for their commitments",
    format: "scenario",
    prompt: "When a teammate repeatedly misses expectations, {subject}:",
    options: [
      "Avoids addressing it",
      "Hints at it indirectly",
      "Mentions it once and drops it",
      "Has a direct conversation",
      "Addresses it firmly and follows up",
    ],
  },
  {
    category: "Leadership",
    text: "Shares the reasoning behind their decisions",
    format: "frequency",
  },

  // ── Emotional Presence ─────────────────────────────────────
  {
    category: "Emotional Presence",
    text: "Remains calm under pressure",
    format: "frequency",
  },
  {
    category: "Emotional Presence",
    text: "Expresses frustration indirectly rather than naming it",
    format: "scenario",
    prompt: "When {subject} is frustrated with someone, {subject}:",
    options: [
      "Says it directly in the moment",
      "Mentions it soon after",
      "Stays quiet but lets it show",
      "Withdraws and goes quiet",
      "Lets it build up without saying anything",
    ],
  },
  {
    category: "Emotional Presence",
    text: "Acknowledges others' feelings when they express them",
    format: "frequency",
  },
  {
    category: "Emotional Presence",
    text: "Apologizes when they are wrong",
    format: "frequency",
  },
  {
    category: "Emotional Presence",
    text: "Shows emotion visibly during conversation",
    format: "scenario",
    prompt: "When something affects {subject} emotionally in conversation, {subject}:",
    options: [
      "Keeps a neutral face throughout",
      "Stays mostly composed",
      "Lets a little show through",
      "Shows it on their face clearly",
      "Expresses it openly and fully",
    ],
  },
  {
    category: "Emotional Presence",
    text: "Can sit with discomfort without rushing to fix it",
    format: "agreement",
  },
  {
    category: "Emotional Presence",
    text: "Notices when someone is upset before they say it",
    format: "frequency",
  },
  {
    category: "Emotional Presence",
    text: "Stays present when someone is emotional with them",
    format: "scenario",
    prompt: "When someone starts getting visibly upset with {subject}, {subject}:",
    options: [
      "Tries to fix the situation quickly",
      "Offers solutions to calm them down",
      "Stays and acknowledges it",
      "Sits with them without rushing",
      "Stays fully present and holds space",
    ],
  },

  // ── Relational ─────────────────────────────────────────────
  {
    category: "Relational",
    text: "Dominates conversations",
    format: "frequency",
  },
  {
    category: "Relational",
    text: "Asks questions about others' lives",
    format: "frequency",
  },
  {
    category: "Relational",
    text: "Remembers details others have shared about themselves",
    format: "frequency",
  },
  {
    category: "Relational",
    text: "Makes an effort to include others who are quiet",
    format: "scenario",
    prompt: "In a group, when someone has not spoken in a while, {subject}:",
    options: [
      "Does not notice or address it",
      "Notices but does not act",
      "Occasionally draws them in",
      "Actively invites them in",
      "Makes it a point to bring them in",
    ],
  },
  {
    category: "Relational",
    text: "Reaches out to people without being prompted",
    format: "frequency",
  },
  {
    category: "Relational",
    text: "Lets people in, rather than keeping them at a distance",
    format: "agreement",
  },
  {
    category: "Relational",
    text: "Follows up on things people mentioned mattered to them",
    format: "scenario",
    prompt: "When someone tells {subject} about something important coming up, {subject}:",
    options: [
      "Rarely remembers to follow up",
      "Sometimes remembers",
      "Usually asks about it",
      "Makes a point to check in",
      "Always follows up and remembers",
    ],
  },
  {
    category: "Relational",
    text: "Shares their own struggles honestly with others",
    format: "frequency",
  },

  // ── Reliability ────────────────────────────────────────────
  {
    category: "Reliability",
    text: "Arrives on time to agreed meetings",
    format: "frequency",
  },
  {
    category: "Reliability",
    text: "Responds to messages within a reasonable timeframe",
    format: "frequency",
  },
  {
    category: "Reliability",
    text: "Keeps information shared in confidence private",
    format: "frequency",
  },
  {
    category: "Reliability",
    text: "Adapts their plans when circumstances change",
    format: "frequency",
  },
  {
    category: "Reliability",
    text: "Does what they said they would do, by when they said they would",
    format: "scenario",
    prompt: "When {subject} commits to something by a deadline, {subject}:",
    options: [
      "Often misses or delays it",
      "Sometimes needs reminders",
      "Usually delivers on time",
      "Almost always delivers",
      "Always delivers, early if possible",
    ],
  },
  {
    category: "Reliability",
    text: "Can be counted on to follow through, even when it is hard",
    format: "agreement",
  },
  {
    category: "Reliability",
    text: "Flags problems early rather than waiting",
    format: "frequency",
  },
  {
    category: "Reliability",
    text: "Communicates proactively when overwhelmed",
    format: "scenario",
    prompt: "When multiple people are counting on {subject} and {subject} is overwhelmed, {subject}:",
    options: [
      "Goes quiet and hopes to catch up",
      "Pushes through silently",
      "Mentions being stretched",
      "Asks for help or renegotiates",
      "Communicates proactively and adjusts",
    ],
  },
]

async function main() {
  for (const b of behaviors) {
    await db.behavior.upsert({
      where: { text: b.text },
      update: {
        format: b.format,
        prompt: b.prompt ?? null,
        options: b.options ? JSON.stringify(b.options) : null,
      },
      create: {
        text: b.text,
        category: b.category,
        format: b.format,
        prompt: b.prompt ?? null,
        options: b.options ? JSON.stringify(b.options) : null,
      },
    })
  }
  const count = await db.behavior.count()
  console.log(`Seeded ${count} observable behaviors.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
