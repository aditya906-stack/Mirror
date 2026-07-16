// Mirror — Character instrument.
//
// A SECOND set of questions, answered ONLY by feedback providers (friends,
// family, colleagues) — never by the subject themselves. The subject never
// sees these questions, never rates themselves on them. The friend does.
//
// Why? "Akhir dost hi bata dega." A friend sees the patterns you can't.
// These questions are designed to reveal character across the 20 traits:
// accountability, humility, empathy, regulation, honesty, openness,
// integrity, respect, confidence, narcissistic pattern, agreeableness,
// conscientiousness, dominance, assertiveness, trustworthiness,
// intellectual honesty, self-awareness, curiosity, emotional stability.
//
// From the aggregate of all friends' answers, we derive ONE archetype
// (a "term") — the dominant character pattern. That archetype maps to a
// philosopher whose words hold up the mirror: "aap aise ho."
// Below that, a solution: "aise normal ho sakte ho."
//
// The archetype is never a diagnosis. It is a reflection, in the words of
// someone who has watched human nature closely for two thousand years.

export type Locale = "en" | "hinglish";

// ── The 12 character questions ──────────────────────────────
// Scenario format: a situation prompt (with {name}) + 5 ordered options.
// Options are ordered 1 (concerning) → 5 (healthy) on a behavioral axis.
// The friend picks the option that best describes the subject.

export type CharacterQuestion = {
  id: string;
  trait: string;
  prompt: { en: string; hinglish: string };
  options: { en: string; hinglish: string }[];
  // How each option-index (0-4, i.e. rating 1-5) feeds archetype scores.
  // Low answers (1-2) feed "concerning" archetypes; high (4-5) feed "healthy" ones.
  scores: Record<number, Partial<Record<ArchetypeKey, number>>>;
};

export const CHARACTER_QUESTIONS: CharacterQuestion[] = [
  {
    id: "char-accountability",
    trait: "Accountability",
    prompt: {
      en: "When something goes wrong in a group effort, {name}:",
      hinglish: "Jab group me kuch galat ho jata hai, {name}:",
    },
    options: [
      { en: "Blames others first", hinglish: "Doosron ko blame karta hai turant" },
      { en: "Finds an excuse", hinglish: "Bahana dhoondhta hai" },
      { en: "Stays quiet about it", hinglish: "Kuch nahi kehta" },
      { en: "Owns their share", hinglish: "Apni hissa maanta hai" },
      { en: "Takes full responsibility, fixes it", hinglish: "Poori responsibility leta hai aur fix karta hai" },
    ],
    scores: {
      0: { performer: 2, drifter: 1 },
      1: { drifter: 2, performer: 1 },
      2: { drifter: 1 },
      3: { guardian: 1 },
      4: { guardian: 2 },
    },
  },
  {
    id: "char-humility",
    trait: "Humility",
    prompt: {
      en: "When {name} doesn't know something:",
      hinglish: "Jab {name} ko kuch nahi pata hota hai:",
    },
    options: [
      { en: "Guesses confidently, hides the gap", hinglish: "Guess maar deta hai, nahi pata chhupata hai" },
      { en: "Changes the topic", hinglish: "Topic change kar deta hai" },
      { en: "Pretends they know", hinglish: "Aise dikhata hai jaise pata ho" },
      { en: "Admits they don't know", hinglish: "Maan leta hai ki nahi pata" },
      { en: "Says 'I don't know — teach me?'", hinglish: "'Mujhe nahi pata, sikhaoge?' bol deta hai" },
    ],
    scores: {
      0: { performer: 2 },
      1: { performer: 1 },
      2: { performer: 1 },
      3: { sage: 1 },
      4: { sage: 2 },
    },
  },
  {
    id: "char-empathy",
    trait: "Empathy",
    prompt: {
      en: "When someone is visibly upset near {name}:",
      hinglish: "Jab koi {name} ke saamne visibly upset hota hai:",
    },
    options: [
      { en: "Ignores it, moves on", hinglish: "Ignore kar deta hai" },
      { en: "Tries to fix it quickly", hinglish: "Turant solution dene lagta hai" },
      { en: "Feels awkward, steps away", hinglish: "Awkward feel karta hai, door jaata hai" },
      { en: "Listens, stays beside them", hinglish: "Sunta hai, side me baithta hai" },
      { en: "Acknowledges the feeling, holds space", hinglish: "Feelings acknowledge karta hai, space deta hai" },
    ],
    scores: {
      0: { performer: 1 },
      1: { stoic: 1 },
      2: { performer: 1 },
      3: { empath: 1 },
      4: { empath: 2 },
    },
  },
  {
    id: "char-regulation",
    trait: "Emotional Regulation",
    prompt: {
      en: "When {name} is criticized:",
      hinglish: "Jab {name} ko criticize kiya jata hai:",
    },
    options: [
      { en: "Gets angry, lashes back", hinglish: "Gussa ho jata hai, counter-attack karta hai" },
      { en: "Gets defensive", hinglish: "Defensive ho jata hai" },
      { en: "Holds it in, stews silently", hinglish: "Andar hi andar ghussa rakhta hai" },
      { en: "Listens, thinks it over later", hinglish: "Sunta hai, baad me sochta hai" },
      { en: "Listens, tries to understand", hinglish: "Sunta hai, samajhne ki koshish karta hai" },
    ],
    scores: {
      0: { performer: 2 },
      1: { performer: 1 },
      2: { performer: 1 },
      3: { stoic: 1 },
      4: { stoic: 2, sage: 1 },
    },
  },
  {
    id: "char-honesty",
    trait: "Honesty",
    prompt: {
      en: "When {name} makes a mistake:",
      hinglish: "Jab {name} se koi galti ho jati hai:",
    },
    options: [
      { en: "Hides it", hinglish: "Chhupata hai" },
      { en: "Makes an excuse", hinglish: "Bahana banata hai" },
      { en: "Admits only when caught", hinglish: "Jab pakde jate hain tab maanta hai" },
      { en: "Says it themselves", hinglish: "Khud batata hai" },
      { en: "Says it and fixes it", hinglish: "Khud batata hai aur fix bhi karta hai" },
    ],
    scores: {
      0: { drifter: 2 },
      1: { drifter: 2 },
      2: { drifter: 1 },
      3: { guardian: 1 },
      4: { guardian: 2 },
    },
  },
  {
    id: "char-feedback",
    trait: "Openness to Feedback",
    prompt: {
      en: "When {name} is given feedback:",
      hinglish: "Jab {name} ko feedback diya jata hai:",
    },
    options: [
      { en: "Starts justifying immediately", hinglish: "Turant justify karna shuru kar deta hai" },
      { en: "Gets defensive", hinglish: "Defensive ho jata hai" },
      { en: "Listens but doesn't apply it", hinglish: "Sunta hai par apply nahi karta" },
      { en: "Thinks on it, ego resists a bit", hinglish: "Sochta hai par thodi ego aati hai" },
      { en: "Genuinely considers, follows up", hinglish: "Genuinely consider karta hai, follow up karta hai" },
    ],
    scores: {
      0: { performer: 2 },
      1: { performer: 2 },
      2: { performer: 1 },
      3: { sage: 1 },
      4: { sage: 2 },
    },
  },
  {
    id: "char-integrity",
    trait: "Integrity",
    prompt: {
      en: "When no one is watching {name}:",
      hinglish: "Jab koi {name} ko dekh nahi raha:",
    },
    options: [
      { en: "Takes shortcuts", hinglish: "Shortcuts leta hai" },
      { en: "Adjusts a little", hinglish: "Thoda adjust kar deta hai" },
      { en: "Depends on the situation", hinglish: "Situation hisaab se" },
      { en: "Does what feels right", hinglish: "Wahi karta hai jo sahi lagta hai" },
      { en: "Follows values even when hard", hinglish: "Hamesha values follow karta hai, chahe hard ho" },
    ],
    scores: {
      0: { drifter: 2 },
      1: { drifter: 1 },
      2: { drifter: 1 },
      3: { guardian: 1 },
      4: { guardian: 2 },
    },
  },
  {
    id: "char-respect",
    trait: "Respect",
    prompt: {
      en: "How {name} speaks to someone who can't help them (waiter, junior):",
      hinglish: "{name} kaise baat karta hai kisi aise insaan se jo unse 'niche' hai (waiter, junior):",
    },
    options: [
      { en: "Dismissive, ignores them", hinglish: "Ignore karta hai, alag treat karta hai" },
      { en: "A bit casual", hinglish: "Thoda casual" },
      { en: "Normal", hinglish: "Normal" },
      { en: "Respectful", hinglish: "Respectful" },
      { en: "Exactly like with anyone else", hinglish: "Bilkul waise hi jaise kisi aur se" },
    ],
    scores: {
      0: { performer: 1 },
      1: { performer: 1 },
      2: {},
      3: { empath: 1 },
      4: { empath: 1, guardian: 1 },
    },
  },
  {
    id: "char-dominance",
    trait: "Dominance / Narcissistic Pattern",
    prompt: {
      en: "In group conversations, {name}:",
      hinglish: "Group conversations me {name}:",
    },
    options: [
      { en: "Talks the most, doesn't let others in", hinglish: "Sabse zyada bolta hai, dusron ko bolne nahi deta" },
      { en: "Talks more than listens", hinglish: "Bolta zyada, sunta kam" },
      { en: "Holds their point firmly", hinglish: "Apna point firmly dalta hai" },
      { en: "Listens, speaks in between", hinglish: "Sunta hai, beech beech me bolta hai" },
      { en: "Lets others speak, listens", hinglish: "Dusron ko bolne deta hai, sunta hai" },
    ],
    scores: {
      0: { performer: 2 },
      1: { performer: 2 },
      2: { performer: 1 },
      3: { sage: 1 },
      4: { sage: 1, empath: 1 },
    },
  },
  {
    id: "char-assertiveness",
    trait: "Assertiveness",
    prompt: {
      en: "When {name} disagrees with someone:",
      hinglish: "Jab {name} disagree karta hai kisi se:",
    },
    options: [
      { en: "Stays silent, swallows it", hinglish: "Chup reh jata hai" },
      { en: "Drops an indirect hint", hinglish: "Indirect hint deta hai" },
      { en: "Complains about it later", hinglish: "Baad me complain karta hai" },
      { en: "Says it directly", hinglish: "Direct bol deta hai" },
      { en: "Says it directly + respectfully, discusses", hinglish: "Direct + respectful, discussion karta hai" },
    ],
    scores: {
      0: { empath: 1 },
      1: { empath: 1 },
      2: { empath: 1 },
      3: { guardian: 1 },
      4: { guardian: 2 },
    },
  },
  {
    id: "char-intellectual-honesty",
    trait: "Intellectual Honesty",
    prompt: {
      en: "When {name} is shown evidence they're wrong:",
      hinglish: "Jab {name} ko evidence milta hai ki wo galat hain:",
    },
    options: [
      { en: "Ignores it", hinglish: "Ignore kar deta hai" },
      { en: "Shifts the argument", hinglish: "Argument badal deta hai" },
      { en: "Goes silent", hinglish: "Silent ho jata hai" },
      { en: "Admits it inwardly", hinglish: "Andar hi andar maanta hai" },
      { en: "Says openly 'I was wrong'", hinglish: "Khule aam 'main galat tha' bol deta hai" },
    ],
    scores: {
      0: { performer: 2 },
      1: { performer: 2 },
      2: { performer: 1 },
      3: { sage: 1 },
      4: { sage: 2 },
    },
  },
  {
    id: "char-trustworthiness",
    trait: "Trustworthiness",
    prompt: {
      en: "When someone tells {name} something in confidence:",
      hinglish: "Jab koi {name} ko confidential baat batata hai:",
    },
    options: [
      { en: "Tells others", hinglish: "Doosron ko batata hai" },
      { en: "Tells one close friend", hinglish: "Ek close friend ko batata hai" },
      { en: "Drops hints", hinglish: "Hint deta hai" },
      { en: "Keeps it to themselves", hinglish: "Apne paas rakhta hai" },
      { en: "Never tells, ever", hinglish: "Kabhi nahi batata, bilkul secret" },
    ],
    scores: {
      0: { drifter: 2 },
      1: { drifter: 1 },
      2: { drifter: 1 },
      3: { guardian: 1 },
      4: { guardian: 2 },
    },
  },
];

// ── The 7 archetypes ────────────────────────────────────────
// Each archetype is a "term" — a dominant character pattern derived from
// the aggregate of friends' answers. It is not a diagnosis. It is a mirror
// held up by a philosopher who has watched humans closely.

export type ArchetypeKey =
  | "performer"
  | "stoic"
  | "sage"
  | "empath"
  | "drifter"
  | "guardian"
  | "balanced";

export type Archetype = {
  key: ArchetypeKey;
  philosopher: { en: string; hinglish: string };
  label: { en: string; hinglish: string };
  // "Aap aise ho" — what the pattern looks like, told directly.
  description: { en: string; hinglish: string };
  // 3 quotes from the philosopher, in original English (universal).
  quotes: string[];
  // "Aise normal ho sakte ho" — the path back to balance.
  solution: { en: string; hinglish: string };
};

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  performer: {
    key: "performer",
    philosopher: {
      en: "Friedrich Nietzsche",
      hinglish: "Friedrich Nietzsche",
    },
    label: { en: "The Performer", hinglish: "The Performer" },
    description: {
      en: "You believe you are better than most. You direct conversations, seek admiration, and run from criticism. You argue to be right, not to learn. When shown you're wrong, you shift the argument. The mirror your friends hold up says: the confidence is real, but it has closed the door on growth.",
      hinglish: "Aapko lagta hai aap baaki se behtar hain. Aap conversations direct karte ho, admiration chahte ho, criticism se bhaagte ho. Aap 'right' hone ke liye argue karte ho, seekhne ke liye nahi. Jab galat hone ka evidence milta hai, argument badal dete ho. Doston ka aaina kehta hai: confidence sach hai, par usne growth ka darwaaza band kar diya hai.",
    },
    quotes: [
      '"The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions." — Nietzsche',
      '"Whoever fights monsters should see to it that in the process he does not become a monster." — Nietzsche',
      '"And those who were seen dancing were thought to be insane by those who could not hear the music." — Nietzsche',
    ],
    solution: {
      en: "Say 'I don't know' once a day, out loud. In one conversation today, listen for ten minutes without responding. Give someone else the credit — publicly. The strength you already have will not shrink from honesty. It will finally have room to grow.",
      hinglish: "Roz ek baar 'mujhe nahi pata' bolo, zor se. Aaj ek conversation me 10 minute sirf suno, jawab mat do. Kisi ko unka credit do — publicly. Jo strength aap me hai wo honesty se chhoti nahi hogi. Use grow hone ki jagah milegi.",
    },
  },
  stoic: {
    key: "stoic",
    philosopher: {
      en: "Marcus Aurelius",
      hinglish: "Marcus Aurelius",
    },
    label: { en: "The Stoic", hinglish: "The Stoic" },
    description: {
      en: "You are calm, dependable, self-controlled. Under pressure you do not break. People count on you. But you control your emotions so tightly that sometimes you seem disconnected — from others, and from yourself. You hold it together so well that no one, including you, knows what you actually feel.",
      hinglish: "Aap shant ho, dependable, self-controlled. Pressure me aap nahi toote. Log aap pe bharosa karte hain. Par aap apne emotions ko itna control karte ho ki kabhi kabhi aap disconnected lagte ho — dusron se, aur khud se bhi. Aap sab itne sahi sambhal lete ho ki kisi ko, including aap khud ko, nahi pata ki aap actually kya feel karte ho.",
    },
    quotes: [
      '"You have power over your mind — not outside events. Realize this, and you will find strength." — Marcus Aurelius',
      '"Waste no more time arguing about what a good man should be. Be one." — Marcus Aurelius',
      '"The happiness of your life depends upon the quality of your thoughts." — Marcus Aurelius',
    ],
    solution: {
      en: "Practice saying what you feel — without fixing it. Tell one person one true thing you're carrying, with no solution attached. Vulnerability is not the opposite of strength. For you, it is the next edge of it.",
      hinglish: "Apne feelings bolne ki practice karo — bina fix kiye. Kisi ek insaan ko ek sachchi baat batao jo aap carry kar rahe ho, bina kisi solution ke. Vulnerability strength ka opposite nahi hai. Aapke liye, ye uski next boundary hai.",
    },
  },
  sage: {
    key: "sage",
    philosopher: {
      en: "Socrates",
      hinglish: "Socrates",
    },
    label: { en: "The Sage", hinglish: "The Sage" },
    description: {
      en: "You live to learn. You are not afraid of being wrong — you see it as information. You listen, you update your view when the evidence asks. You have real self-awareness. But sometimes you think so long that you don't act. Wisdom that never moves is just theory.",
      hinglish: "Aap seekhne ke liye jeete ho. Aap galat hone se nahi darte — use information samajhte ho. Aap sunte ho, evidence dekhkar opinion badalte ho. Aap me real self-awareness hai. Par kabhi kabhi aap itna sochte ho ki act nahi paate. Jo wisdom kabhi move nahi hoti wo bas theory hai.",
    },
    quotes: [
      '"The only true wisdom is in knowing you know nothing." — Socrates',
      '"An unexamined life is not worth living." — Socrates',
      '"I cannot teach anybody anything. I can only make them think." — Socrates',
    ],
    solution: {
      en: "Decide first, refine later. Your judgment has been trained by all that listening — trust it enough to act. One decision this week, made without waiting for certainty. Perfect is the enemy of done. Yours.",
      hinglish: "Pehle decision lo, baad me perfect karo. Aapne itna sunne se judgment train ho gaya hai — uspe trust karo aur act karo. Is hafte ek decision, bina certainty ka intezaar kiye. Perfect, done ka dushman hai. Aur ye dushman aapka hai.",
    },
  },
  empath: {
    key: "empath",
    philosopher: {
      en: "Confucius",
      hinglish: "Confucius",
    },
    label: { en: "The Empath", hinglish: "The Empath" },
    description: {
      en: "You feel what others feel. You are kind, respectful, inclusive — people come to you because you listen. But you ignore your own needs, you fear direct feedback, you cannot set boundaries. Your kindness has become a way to disappear. The mirror says: you have made room for everyone except yourself.",
      hinglish: "Aap dusron ki feelings feel karte ho. Aap kind ho, respectful, inclusive — log aapke paas aate hain kyunki aap sunte ho. Par aap apni needs ko ignore karte ho, direct feedback se darte ho, boundaries set nahi kar paate. Aapki kindness disappear hone ka tareeqa ban gayi hai. Aaina kehta hai: aapne sabke liye jagah banayi, bas khud ke liye nahi.",
    },
    quotes: [
      '"Before you embark on a journey of revenge, dig two graves." — Confucius',
      '"When you see a good person, think of becoming like them. When you see someone not so good, reflect on your own weak points." — Confucius',
      '"The man who moves a mountain begins by carrying away small stones." — Confucius',
    ],
    solution: {
      en: "Say 'no' once today — without softening it. Give one piece of direct feedback, without a cushion. Put your need first, one time. Kindness with a spine is the kindest thing there is. The version of you that has boundaries is the version people actually need.",
      hinglish: "Aaj ek baar 'no' bolo — bina soft kiye. Ek direct feedback do, bina cushion ke. Ek baar apni need pehle rakho. Jis kindness me ridge ho wo sabse kind cheez hai. Jis version me aapki boundaries hain, wahi version logon ko sach me chahiye.",
    },
  },
  drifter: {
    key: "drifter",
    philosopher: {
      en: "Søren Kierkegaard",
      hinglish: "Søren Kierkegaard",
    },
    label: { en: "The Drifter", hinglish: "The Drifter" },
    description: {
      en: "You miss commitments, you make excuses, deadlines slip past you. There is a gap between your words and your actions — you say 'I'll do it tomorrow' and tomorrow doesn't come. You are not careless; you are caught. The mirror says: you are slowly disappearing from your own promises.",
      hinglish: "Aap commitments miss karte ho, bahane banate ho, deadlines slip ho jaati hain. Aapke words aur actions me gap hai — aap bolte ho 'kal karunga' aur kal nahi aata. Aap careless nahi ho; aap phanse hue ho. Aaina kehta hai: aap apne hi vaadon se dheere dheere gayab ho rahe ho.",
    },
    quotes: [
      '"The most common form of despair is not being who you are." — Kierkegaard',
      '"Life can only be understood backwards; but it must be lived forwards." — Kierkegaard',
      '"To dare is to lose one\'s footing momentarily. To not dare is to lose oneself." — Kierkegaard',
    ],
    solution: {
      en: "Keep one small promise — to yourself, today. Just one. Do it before anything else. Not a grand plan, not a life overhaul. One small kept promise, repeated, rebuilds the self you've been drifting from. Consistency is how identity comes back.",
      hinglish: "Ek chhoti promise rakho — khud se, aaj. Bas ek. Kuch bhi karne se pehle. Bada plan nahi, life overhaul nahi. Ek chhoti promise jo poori hui, usko repeat karo — se wo self wapas aayega jisse aap drift kar rahe the. Consistency se identity wapas aati hai.",
    },
  },
  guardian: {
    key: "guardian",
    philosopher: {
      en: "Aristotle",
      hinglish: "Aristotle",
    },
    label: { en: "The Guardian", hinglish: "The Guardian" },
    description: {
      en: "You are principled, consistent, trustworthy. You do what you say. Your values are strong and they hold — under pressure, in private, in public. But sometimes you become so rigid that nuance gets lost, and people start to feel they must be careful around you. The mirror says: your principles are real, but they have started to guard the door against the world.",
      hinglish: "Aap principled ho, consistent, trustworthy. Aap jo bolte ho wo karte ho. Aapke values strong hain — pressure me, akele me, public me, wo hold karte hain. Par kabhi kabhi aap itne rigid ho jaate ho ki nuance miss ho jata hai, aur log khud ko aapke around careful rakhne lagte hain. Aaina kehta hai: aapke principles sach hain, par unhone darwaaze pe guard khada kar diya hai duniya ke khilaf.",
    },
    quotes: [
      '"We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle',
      '"It is the mark of an educated mind to be able to entertain a thought without accepting it." — Aristotle',
      '"Knowing yourself is the beginning of all wisdom." — Aristotle',
    ],
    solution: {
      en: "Accept one grey area this week, without correcting it. Forgive one mistake without the lesson. Let a relationship matter more than the rule — once. Principles that cannot bend are not strength; they are armor that has forgotten what it protects.",
      hinglish: "Is hafte ek grey area accept karo — bina correct kiye. Ek mistake maaf karo, bina lesson diye. Ek baar relationship ko rule se zyada priority do. Jo principles jhuk nahi sakte wo strength nahi hai; wo armor hai jo bhool gaya hai wo kya protect kar raha tha.",
    },
  },
  balanced: {
    key: "balanced",
    philosopher: {
      en: "Laozi",
      hinglish: "Laozi",
    },
    label: { en: "The Balanced", hinglish: "The Balanced" },
    description: {
      en: "You hold the middle. You listen and you speak. You feel and you control. You are not extreme in any direction — and that is rare. The mirror your friends hold up shows someone who is, more than most, already whole. This is not the end of the work. It is the proof that the work has been done.",
      hinglish: "Aap beech ka rakh ho. Aap sunte ho aur bolte ho. Aap feel karte ho aur control karte ho. Aap kisi bhi direction me extreme nahi ho — aur ye rare hai. Doston ka aaina ek aise insaan ko dikhata hai jo, baaki se zyada, pehle se hi poora hai. Ye kaam ka end nahi hai. Ye saboot hai ki kaam ho raha hai.",
    },
    quotes: [
      '"Knowing others is intelligence; knowing yourself is true wisdom." — Laozi',
      '"When I let go of what I am, I become what I might be." — Laozi',
      '"Nature does not hurry, yet everything is accomplished." — Laozi',
    ],
    solution: {
      en: "Keep reflecting. Keep the people around you who will tell you the truth. Balance is not a destination you arrive at — it is a practice you keep. You already know this. This is just a reminder.",
      hinglish: "Reflect karte raho. Apne aas paas aise log rakho jo aapko sach bolte hain. Balance koi destination nahi hai jahan pahunch ke ruk jaate ho — ye ek practice hai jo rakhti ho. Aapko ye pehle se pata hai. Ye bas ek reminder hai.",
    },
  },
};

// ── Scoring ─────────────────────────────────────────────────
// Takes a map of questionId → array of ratings (one per friend who answered).
// Averages per question, rounds to nearest option index, accumulates archetype
// scores, and returns the dominant archetype. If no archetype crosses a
// minimum threshold, returns "balanced".

export type ArchetypeResult = {
  key: ArchetypeKey;
  scores: Record<ArchetypeKey, number>;
  responderCount: number;
  questionCount: number;
};

export function scoreArchetype(
  responses: Record<string, number[]>
): ArchetypeResult {
  const scores: Record<ArchetypeKey, number> = {
    performer: 0,
    stoic: 0,
    sage: 0,
    empath: 0,
    drifter: 0,
    guardian: 0,
    balanced: 0,
  };

  let totalResponders = 0;
  let answeredQuestions = 0;

  for (const q of CHARACTER_QUESTIONS) {
    const ratings = responses[q.id];
    if (!ratings || ratings.length === 0) continue;
    answeredQuestions++;

    if (totalResponders < ratings.length) {
      totalResponders = ratings.length;
    }

    // Average the friends' ratings for this question, round to option index (0-4).
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    const idx = Math.max(0, Math.min(4, Math.round(avg) - 1));

    const contribution = q.scores[idx];
    if (contribution) {
      for (const [k, v] of Object.entries(contribution)) {
        scores[k as ArchetypeKey] += v as number;
      }
    }
  }

  // Find the dominant archetype.
  let maxKey: ArchetypeKey = "balanced";
  let maxVal = 0;
  for (const k of Object.keys(scores) as ArchetypeKey[]) {
    if (k === "balanced") continue;
    if (scores[k] > maxVal) {
      maxVal = scores[k];
      maxKey = k;
    }
  }

  // If no archetype accumulated enough signal, the person is balanced.
  // Threshold: at least 2 scoring points from the questions answered.
  const key: ArchetypeKey = maxVal >= 2 ? maxKey : "balanced";

  return {
    key,
    scores,
    responderCount: totalResponders,
    questionCount: answeredQuestions,
  };
}

export function getArchetype(key: ArchetypeKey): Archetype {
  return ARCHETYPES[key];
}

export function getCharacterQuestions(locale: Locale) {
  return CHARACTER_QUESTIONS.map((q) => ({
    id: q.id,
    trait: q.trait,
    prompt: q.prompt[locale].replace(/\{name\}/g, "{subject}"),
    options: q.options.map((o) => o[locale]),
  }));
}
