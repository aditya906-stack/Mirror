// Seed the behavioral instrument.
// Every behavior here is OBSERVABLE — it can be witnessed and counted.
// None are labels. None are diagnoses. None are inherently good or bad.
// They are simply things a person does, that others can see.

import { db } from "../src/lib/db"

const behaviors: { text: string; category: string }[] = [
  // Communication
  { category: "Communication", text: "Interrupts others while they are speaking" },
  { category: "Communication", text: "Makes eye contact during conversation" },
  { category: "Communication", text: "Explains complex ideas clearly" },
  { category: "Communication", text: "Listens without preparing a response while the other person speaks" },
  { category: "Communication", text: "Speaks loudly enough to be heard in a group" },

  // Leadership
  { category: "Leadership", text: "Takes responsibility when something goes wrong" },
  { category: "Leadership", text: "Gives credit to others for their work" },
  { category: "Leadership", text: "Makes decisions without consulting others affected" },
  { category: "Leadership", text: "Follows through on commitments they have made" },
  { category: "Leadership", text: "Delegates tasks rather than doing everything themselves" },

  // Emotional Presence
  { category: "Emotional Presence", text: "Remains calm under pressure" },
  { category: "Emotional Presence", text: "Expresses frustration indirectly rather than naming it" },
  { category: "Emotional Presence", text: "Acknowledges others' feelings when they express them" },
  { category: "Emotional Presence", text: "Apologizes when they are wrong" },
  { category: "Emotional Presence", text: "Shows emotion visibly during conversation" },

  // Relational
  { category: "Relational", text: "Dominates conversations" },
  { category: "Relational", text: "Asks questions about others' lives" },
  { category: "Relational", text: "Remembers details others have shared about themselves" },
  { category: "Relational", text: "Makes an effort to include others who are quiet" },
  { category: "Relational", text: "Reaches out to people without being prompted" },

  // Reliability
  { category: "Reliability", text: "Arrives on time to agreed meetings" },
  { category: "Reliability", text: "Responds to messages within a reasonable timeframe" },
  { category: "Reliability", text: "Keeps information shared in confidence private" },
  { category: "Reliability", text: "Adapts their plans when circumstances change" },
]

async function main() {
  for (const b of behaviors) {
    await db.behavior.upsert({
      where: { text: b.text },
      update: {},
      create: b,
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
