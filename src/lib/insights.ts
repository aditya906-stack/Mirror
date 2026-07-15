// Mirror — behavior-specific reflection insights.
//
// DIRECT. HONEST. NO HEDGING.
//
// Each behavior gets its OWN insight, written for three gap directions:
//   higher  — self rated higher than circles observed (overestimate)
//   lower   — circles observed higher than self rated (underestimate)
//   aligned — self and circles are close
//
// The insights tell the user directly what the gap means. No "you may
// feel", no "the gap often lives in", no hedging. Direct observation.
// "You do X. Your circles see Y. This is what it means."
//
// Written in English + Hinglish (conversational Roman Hindi).

export type GapDirection = "higher" | "lower" | "aligned";

export type Insight = {
  higher: string;
  lower: string;
  aligned: string;
};

// The key is the exact behavior text from the seed file.
export const INSIGHTS: Record<string, { en: Insight; hinglish: Insight }> = {
  // ── Communication ──────────────────────────────────────────
  "Interrupts others while they are speaking": {
    en: {
      higher:
        "You think you let people finish. You don't. You cut in before they complete their thought. To you it feels like engagement. To them it feels like being talked over.",
      lower:
        "You hold back more than you realize. Your circles are waiting for you to speak. Your silence reads as disengagement, not respect.",
      aligned:
        "You and your circles agree on how often this happens. You're aware of the pattern — and awareness is usually what starts to change it.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap logon ko bolne dete hain. Nahi dete. Aap unke khayam khatam hone se pehle bolna shuru kar dete hain. Aapko engagement lagta hai. Unhe lagta hai aap unhe baat karne nahi de rahe.",
      lower:
        "Aap apne aap ko zyada rokte ho. Aapke circles aapka wait kar rahe hain. Aapki khamoshi disengagement lagti hai, respect nahi.",
      aligned:
        "Aap aur aapke circles sehmat hain. Aapko pattern ki awareness hai — aur awareness hi badlav ki shuruwat hai.",
    },
  },

  "Makes eye contact during conversation": {
    en: {
      higher:
        "You think you hold eye contact. Your circles experience your gaze as intensity, not warmth. There's a difference between looking at someone and looking into them.",
      lower:
        "You look away more than you realize. Your circles read it as disinterest. Eyes meeting — even briefly — is how people know you're present.",
      aligned:
        "Your sense of this matches what your circles experience. You hold gaze as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap eye contact rakhte hain. Aapke circles aapki gaze ko warmth nahi, intensity ke roop mein experience karte hain. Kisi ko dekhna aur kisi mein dekhna — alag hai.",
      lower:
        "Aap apne se zyada door dekhte hain. Aapke circles ise disinterest samajhte hain. Aankhein milna — bhale hi briefly — wahi hai jisse log jaante hain aap present hain.",
      aligned:
        "Aapka hissa circles ke experience se match karta hai. Aap waisa hi gaze rakhte hain jaise chahte hain.",
    },
  },

  "Explains complex ideas clearly": {
    en: {
      higher:
        "You think you explain clearly. You skip steps that feel obvious to you but aren't to the listener. What's clear in your head lands muddled in their ears. Clarity is measured at the ear, not the mouth.",
      lower:
        "You're clearer than you give yourself credit for. Your inner critic is louder than the evidence. Trust the landing more than the launch.",
      aligned:
        "Your self-assessment and your circles' experience match. You explain as clearly as you think you do.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap clearly explain karte hain. Aap woh steps skip karte hain jo aapko obvious lagte hain par sunne wale ko nahi. Jo aapke dimaagh mein clear hai woh unke kaanon mein uljha land karta hai. Clarity kaan par measure hoti hai, mooh par nahi.",
      lower:
        "Aap apne hisse se zyada clear hain. Aapka inner critic evidence se zyada loud hai. Launch pe nahi, landing pe bharosa karo.",
      aligned:
        "Aapki self-assessment aur circles ka experience match karta hai. Aap utna hi clear hain jitna sochte hain.",
    },
  },

  "Listens without preparing a response while the other person speaks": {
    en: {
      higher:
        "You think you're listening. You're actually composing your reply while they talk. Presence has a texture that half-attention doesn't — and your circles can feel the difference.",
      lower:
        "You hold yourself back, assuming you're not listening well. Your circles experience you as more present than you feel. The silence you offer is received as care.",
      aligned:
        "Your circles experience your listening the way you experience it yourself. That congruence is rare.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap sun rahe hain. Aap actually unke bolte waqt apna reply compose kar rahe hote ho. Presence ki ek texture hoti hai jo half-attention mein nahi hoti — aur aapke circles yeh farak mehsoos kar lete hain.",
      lower:
        "Aap khud ko rokte hain, maante hain aap achhe se nahi sun rahe. Aapke circles aapko aapse zyada present experience karte hain. Aapki khamoshi care ke roop mein receive hoti hai.",
      aligned:
        "Aapke circles aapki listening waisa hi experience karte hain jaisa aap khud karte hain. Yeh congruence rare hai.",
    },
  },

  "Speaks loudly enough to be heard in a group": {
    en: {
      higher:
        "You think you're audible. Your circles are missing contributions you believe you're making. What feels like participation to you lands below the room's threshold.",
      lower:
        "You think you're too quiet. Your circles hear you clearly. The instinct to speak up more isn't serving you — you're already landing. Your softness is not a deficit.",
      aligned:
        "Your sense of your own volume matches how your circles experience it. You're audible as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap audible hain. Aapke circles woh contributions miss kar rahe hain jo aap believe karte hain aap de rahe hain. Jo aapko participation lagta hai woh room ke threshold se neeche land hota hai.",
      lower:
        "Aapko lagta hai aap bahut chup hain. Aapke circles aapko clearly sunte hain. Aur bolne ki instinct aapki help nahi kar rahi — aap pehle se land kar rahe hain. Aapki softness koi kami nahi hai.",
      aligned:
        "Aapka apne volume ka hissa usse match karta hai jo circles experience karte hain. Aap utne audible hain jitna chahte hain.",
    },
  },

  "Says what they mean, even when it is uncomfortable": {
    en: {
      higher:
        "You think you're direct. You're actually softening the message until it gets lost. The euphemisms feel honest to you but dilute the truth. Directness without cruelty is a practice, not a personality.",
      lower:
        "You hold back more than you realize. Your circles are waiting for the real answer. Speaking the uncomfortable thing — once — saves months of confusion. Kindness without honesty is experienced as abandonment.",
      aligned:
        "Your circles experience your directness the way you intend it. That alignment is a kind of trust.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap direct hain. Aap actually message ko itna soften karte hain ki woh kho jaata hai. Euphemisms aapko honest lagte hain par sach ko dilute kar dete hain. Bina cruelty ke directness ek practice hai, personality nahi.",
      lower:
        "Aap apne se zyada rokte hain. Aapke circles asli answer ka wait kar rahe hain. Uncomfortable baat — ek baar — bolna mahino ki confusion bacha deta hai. Bina honesty ke kindness abandonment lagti hai.",
      aligned:
        "Aapke circles aapki directness waisa hi experience karte hain jaisa aap chahte hain. Yeh alignment ek tarah ki trust hai.",
    },
  },

  "Reads the room before speaking": {
    en: {
      higher:
        "You think you read the room. You sense the mood but don't adjust to it. Reading without adjusting isn't reading — it's noticing. The gap lives between sensing and acting.",
      lower:
        "You think you miss cues. Your circles see you catching them. The adjustments you make without thinking — the softer voice, the pause — are landing more than you realize.",
      aligned:
        "Your sense of the room matches what your circles see in you. You read as well as you think you do.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap room padhte hain. Aap mood sense karte hain par adjust nahi karte. Bina adjust kiye reading nahi — noticing hai. Gap sensing aur acting ke beech hai.",
      lower:
        "Aapko lagta hai aap cues miss karte hain. Aapke circles aapko unhe catch karta hua dekhte hain. Jo adjustments aap bina soche karte hain — softer voice, pause — aapse zyada land kar rahe hain.",
      aligned:
        "Aapka room ka hissa usse match karta hai jo circles aapme dekhte hain. Aap utna hi achha padhte hain jitna sochte hain.",
    },
  },

  "Asks for clarification when they do not understand": {
    en: {
      higher:
        "You think you ask enough. You nod through things you haven't grasped. Your circles watch you do this. Asking is received as engagement, not ignorance. The fear of looking slow is costing you understanding.",
      lower:
        "You hold back from asking, assuming you should know. Your circles notice when you do ask — and wish you would more. A question asked is almost always worth the moment it costs.",
      aligned:
        "Your circles experience your questioning the way you experience it. You ask as much as you think you do.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap enough poochte hain. Aap un cheezon pe nod karte hain jo samajh nahi aayi. Aapke circles aapko yeh karte dekhte hain. Poochna engagement hai, ignorance nahi. Slow lagne ka darr aapki understanding cheen raha hai.",
      lower:
        "Aap poochne se rokte hain, maante hain aapko pata hona chahiye. Aapke circles notice karte hain jab aap poochte hain — aur chahte hain aap aur poochein. Ek sawaal poochna us moment ke laayak hota hai jo woh leta hai.",
      aligned:
        "Aapke circles aapki questioning waisa hi experience karte hain jaisa aap karte hain. Aap utna hi poochte hain jitna sochte hain.",
    },
  },

  // ── Leadership ─────────────────────────────────────────────
  "Takes responsibility when something goes wrong": {
    en: {
      higher:
        "You think you own failures. You distribute blame elsewhere. Your circles hear 'we' when 'I' would land. Ownership is felt in the pronouns — and yours point away from yourself.",
      lower:
        "You carry more guilt than your circles see. They don't know how much you're holding because you hold it silently. Naming what you carry is the difference between responsibility and self-punishment.",
      aligned:
        "Your sense of ownership matches what your circles experience. You take responsibility as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap failures own karte hain. Aap blame kahin aur distribute karte hain. Aapke circles 'hum' sunte hain jab 'main' land karna chahiye. Ownership pronouns mein feel hoti hai — aur aapke apne se door point karte hain.",
      lower:
        "Aap apne circles se zyada guilt le rahe hain. Woh nahi jaante kitna aap le rahe hain kyunki aap chupke se lete hain. Jo aap le rahe hain uska naam lena responsibility aur self-punishment ka farak hai.",
      aligned:
        "Aapka ownership ka hissa circles ke experience se match karta hai. Aap utni hi responsibility lete hain jitna chahte hain.",
    },
  },

  "Gives credit to others for their work": {
    en: {
      higher:
        "You think you give credit. You give general praise, not specific acknowledgment. 'Good work' doesn't land. Naming what exactly was good, and who exactly did it — that's credit. Yours is too vague to be felt.",
      lower:
        "You deflect credit more than you realize. Your circles don't know you see their work because you keep the seeing to yourself. A name spoken aloud does more than a private appreciation.",
      aligned:
        "Your circles experience your credit-giving the way you intend. They feel seen by you.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap credit dete hain. Aap general praise dete hain, specific acknowledgment nahi. 'Good work' land nahi hota. Yeh naam lena ki kya exactly achha tha, aur kisne exactly kiya — wahi credit hai. Aapka itna vague hai ki feel nahi hota.",
      lower:
        "Aap apne se zyada credit deflect karte hain. Aapke circles nahi jaante aap unka kaam dekhte hain kyunki aap dekhna apne paas rakhte hain. Kisi ka naam zor se bolna private appreciation se zyada karta hai.",
      aligned:
        "Aapke circles aapka credit dena waisa hi experience karte hain jaisa aap chahte hain. Woh aapse seen feel karte hain.",
    },
  },

  "Makes decisions without consulting those affected": {
    en: {
      higher:
        "You think your decisions are inclusive. Your circles experience them as unilateral. The gap lives in who was in the room when it happened. 'I decided' and 'we decided' are different sentences — and yours is the first one.",
      lower:
        "You over-consult, believing you're not consulting enough. Your circles experience the seeking as hesitation. Sometimes the most respectful decision is the one you make and own.",
      aligned:
        "Your decision-making process matches what your circles experience. The level of consultation lands as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aapke decisions inclusive hain. Aapke circles unhe unilateral experience karte hain. Gap isme hai ki jab yeh hua toh kaun room mein tha. 'Maine decide kiya' aur 'humne decide kiya' alag vakya hain — aur aapka pehla wala hai.",
      lower:
        "Aap zyada consult karte hain, maante hain aap enough consult nahi karte. Aapke circles seeking ko hesitation ke roop mein experience karte hain. Kabhi-kabhi sabse respectful decision woh hota hai jo aap karte hain aur own karte hain.",
      aligned:
        "Aapka decision-making process circles ke experience se match karta hai. Consultation ka level waisa land karta hai jaisa aap chahte hain.",
    },
  },

  "Follows through on commitments they have made": {
    en: {
      higher:
        "You think you're reliable. Your circles see a pattern of slips. The small things you let slide feel trivial to you but signal to others. Reliability is built in the tiny commitments — and yours are slipping.",
      lower:
        "You judge yourself harshly for the misses. Your circles see you as more reliable than you see yourself. They remember the hits. Your inner critic forgets what the external record holds.",
      aligned:
        "Your sense of your follow-through matches your circles' experience. You do what you say.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap reliable hain. Aapke circles slips ka pattern dekhte hain. Chhoti cheezein jo aap slide karte hain aapko trivial lagti hain par dusron ko signal deti hain. Reliability chhote commitments mein banti hai — aur aapke slip ho rahe hain.",
      lower:
        "Aap misses ke liye khud ko harshly judge karte hain. Aapke circles aapko aapse zyada reliable dekhte hain. Woh hits yaad rakhte hain. Aapka inner critic woh bhool jaata hai jo external record hold karta hai.",
      aligned:
        "Aapka follow-through ka hissa circles ke experience se match karta hai. Aap wahi karte hain jo kehte hain.",
    },
  },

  "Delegates tasks rather than doing everything themselves": {
    en: {
      higher:
        "You think you delegate. You hold the work. The gap lives in the difference between handing off a task and handing off the decision. Delegation without trust is supervision — and you're supervising, not delegating.",
      lower:
        "You think you hoard work. Your circles experience your involvement as support. The question isn't always 'am I doing too much' — sometimes it's 'am I doing the right things.'",
      aligned:
        "Your delegation matches what your circles experience. The balance lands as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap delegate karte hain. Aap kaam hold karte hain. Gap task hand off karne aur decision hand off karne ke beech hai. Bina trust ke delegation supervision hai — aur aap supervise karte hain, delegate nahi.",
      lower:
        "Aapko lagta hai aap kaam hoard karte hain. Aapke circles aapki involvement ko support ke roop mein experience karte hain. Sawaal hamesha 'kya main zyada kar raha hoon' nahi hota — kabhi-kabhi 'kya main sahi cheezein kar raha hoon' hota hai.",
      aligned:
        "Aapka delegation circles ke experience se match karta hai. Balance waisa land karta hai jaisa aap chahte hain.",
    },
  },

  "Gives direct feedback when someone's work falls short": {
    en: {
      higher:
        "You think you're direct. You wrap the hard message in kind words until the message gets lost. Your circles receive the cushion, not the content. Directness means the hard thing lands — yours doesn't.",
      lower:
        "You hold back, believing directness will wound. Your circles are waiting for the real feedback. Its absence reads as either approval or contempt. Kindness without honesty is abandonment.",
      aligned:
        "Your circles experience your feedback the way you intend. The directness lands.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap direct hain. Aap hard message ko kind words mein wrap karte hain jab tak message kho na jaaye. Aapke circles cushion receive karte hain, content nahi. Directness ka matlab hai hard cheez land ho — aapka nahi hota.",
      lower:
        "Aap rokte hain, maante hain directness wound karegi. Aapke circles asli feedback ka wait kar rahe hain. Iski ghair-maujoodgi approval ya contempt lagti hai. Bina honesty ke kindness abandonment hai.",
      aligned:
        "Aapke circles aapka feedback waisa hi experience karte hain jaisa aap chahte hain. Directness land karti hai.",
    },
  },

  "Holds others accountable for their commitments": {
    en: {
      higher:
        "You think you hold the line. Your circles watch the line move. The gap lives in the follow-through — the conversation that doesn't happen, the consequence that never arrives. You set standards but don't enforce them.",
      lower:
        "You think you push too hard. Your circles experience your accountability as care. Holding someone to their word, with respect, is received as belief in them.",
      aligned:
        "Your accountability matches what your circles experience. The standard lands as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap line hold karte hain. Aapke circles line move karta hua dekhte hain. Gap follow-through mein hai — woh baat-cheet jo nahi hoti, woh consequence jo kabhi nahi aati. Aap standards set karte hain par enforce nahi karte.",
      lower:
        "Aapko lagta hai aap zyada push karte hain. Aapke circles aapki accountability ko care ke roop mein experience karte hain. Kisi ko uske shabd par hold karna, respect ke saath, un par belief ke roop mein receive hota hai.",
      aligned:
        "Aapki accountability circles ke experience se match karta hai. Standard waisa land karta hai jaisa aap chahte hain.",
    },
  },

  "Shares the reasoning behind their decisions": {
    en: {
      higher:
        "You think the reasoning is obvious. It isn't. Your circles experience your decisions as arbitrary. Intent is almost never visible. 'Here's why' is the missing sentence — and its absence makes your decisions feel imposed.",
      lower:
        "You over-explain, believing you're not sharing enough. Your circles experience the reasoning as already clear. Trust that the 'why' has landed and let the 'what' follow.",
      aligned:
        "Your circles experience your reasoning as shared. The 'why' lands as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai reasoning obvious hai. Nahi hai. Aapke circles aapke decisions arbitrary ke roop mein experience karte hain. Intent lagbhag kabhi visible nahi hota. 'Yeh isliye' missing vakya hai — aur iski ghair-maujoodgi aapke decisions ko imposed lagti hai.",
      lower:
        "Aap zyada explain karte hain, maante hain aap enough share nahi karte. Aapke circles reasoning pehle se clear experience karte hain. Bharosa karo 'kyun' land ho gaya hai aur 'kya' ko follow karne do.",
      aligned:
        "Aapke circles aapki reasoning shared ke roop mein experience karte hain. 'Kyun' waisa land karta hai jaisa aap chahte hain.",
    },
  },

  // ── Emotional Presence ─────────────────────────────────────
  "Remains calm under pressure": {
    en: {
      higher:
        "You feel calm inside. Your circles experience something else — a tightness in your voice, a pace change, a withdrawal. Calm is measured at the receiving end, not the feeling end. You're not as calm as you feel.",
      lower:
        "You feel you're losing composure. Your circles experience you as steady. The inner storm is invisible — and the steadiness you don't feel is the steadiness they rely on.",
      aligned:
        "Your sense of your composure matches what your circles experience. You are as calm as you feel.",
    },
    hinglish: {
      higher:
        "Aap andar se calm feel karte hain. Aapke circles kuch aur experience karte hain — aawaaz mein tightness, pace change, withdrawal. Calm receiving end par measure hota hai, feeling end par nahi. Aap utne calm nahi hain jitna feel karte hain.",
      lower:
        "Aapko lagta hai aap composure kho rahe hain. Aapke circles aapko steady experience karte hain. Inner storm invisible hota hai — aur woh steadiness jo aap feel nahi karte wohi hai jis par woh rely karte hain.",
      aligned:
        "Aapka composure ka hissa circles ke experience se match karta hai. Aap utne hi calm hain jitna feel karte hain.",
    },
  },

  "Expresses frustration indirectly rather than naming it": {
    en: {
      higher:
        "You think you name frustration. You express it indirectly — the withdrawal, the sarcasm, the cold tone. You believe 'they know.' They don't. Indirect frustration reads as moodiness, not message.",
      lower:
        "You think you're being indirect. Your circles experience you as direct. The softness you intend isn't the softness they receive. Naming frustration plainly is gentler than the alternatives.",
      aligned:
        "Your circles experience your frustration the way you intend. The directness matches.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap frustration naam lete hain. Aap indirectly express karte hain — withdrawal, sarcasm, cold tone. Aap maante hain 'unhe pata hai.' Unhe nahi pata. Indirect frustration moodiness lagti hai, message nahi.",
      lower:
        "Aapko lagta hai aap indirect hain. Aapke circles aapko direct experience karte hain. Jo softness aap chahte hain woh softness nahi hai jo woh receive karte hain. Frustration saaf-saaf naam lena alternatives se gentle hota hai.",
      aligned:
        "Aapke circles aapki frustration waisa hi experience karte hain jaisa aap chahte hain. Directness match karti hai.",
    },
  },

  "Acknowledges others' feelings when they express them": {
    en: {
      higher:
        "You think you acknowledge feelings. You don't. A nod isn't acknowledgment. 'That's hard' isn't acknowledgment. Naming what they actually feel — that's acknowledgment. You're doing the motion, not the thing.",
      lower:
        "You hold back from naming what you see, assuming it's obvious. Your circles are waiting for the sentence that says 'I see this in you.' Naming what someone feels — even imperfectly — is received as care.",
      aligned:
        "Your circles experience your acknowledgment the way you intend. They feel met by you.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap feelings acknowledge karte hain. Nahi karte. Ek nod acknowledgment nahi hai. 'That's hard' acknowledgment nahi hai. Unki feeling ka sahi naam lena — wahi acknowledgment hai. Aap motion kar rahe hain, cheez nahi.",
      lower:
        "Aap jo dekhte hain uska naam lene se rokte hain, maante hain obvious hai. Aapke circles us vakya ka wait kar rahe hain jo kahe 'I see this in you.' Kisi ki feeling ka naam lena — bhale hi imperfectly — care ke roop mein receive hota hai.",
      aligned:
        "Aapke circles aapka acknowledgment waisa hi experience karte hain jaisa aap chahte hain. Woh aapse met feel karte hain.",
    },
  },

  "Apologizes when they are wrong": {
    en: {
      higher:
        "You think you apologize. You offer a defense dressed as one. The 'but' that follows 'I'm sorry' undoes the apology. A clean apology has no tail — yours always does.",
      lower:
        "You feel you should apologize more. Your circles aren't waiting for one. The inner pressure to atone is louder than the external need. The repair may have already happened — and you're the last to know.",
      aligned:
        "Your sense of your apologies matches your circles' experience. You own your wrongs as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap apologize karte hain. Aap defense ko apology ke roop mein offer karte hain. 'I'm sorry' ke baad jo 'but' aata hai woh apology ko undo kar deta hai. Clean apology ki koi tail nahi hoti — aapki hamesha hoti hai.",
      lower:
        "Aapko lagta hai aapko aur apologize karna chahiye. Aapke circles uska wait nahi kar rahe. Atone karne ka inner pressure external need se zyada loud hai. Repair pehle ho chuka ho sakta hai — aur aap sabse aakhir mein jaante hain.",
      aligned:
        "Aapka apologies ka hissa circles ke experience se match karta hai. Aap apni galtiyon ko utna hi own karte hain jitna chahte hain.",
    },
  },

  "Shows emotion visibly during conversation": {
    en: {
      higher:
        "You feel you're showing emotion. Your circles see a composed exterior. The micro-expressions you feel inside don't reach your face. What moves inside needs help reaching outside — and yours isn't arriving.",
      lower:
        "You think you show too much. Your circles experience you as guarded. The emotion that feels overwhelming to you lands as subtle. Expressing more may be exactly what the moment needs.",
      aligned:
        "Your emotional expression matches what your circles experience. You show what you feel.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap emotion dikhate hain. Aapke circles composed exterior dekhte hain. Jo micro-expressions aap andar feel karte hain woh face tak nahi pahunchti. Jo andar move karta hai use bahar pahunchne mein help chahiye — aur aapka nahi pahunch raha.",
      lower:
        "Aapko lagta hai aap zyada dikhate hain. Aapke circles aapko guarded experience karte hain. Jo emotion aapko overwhelming lagti hai woh subtle land hoti hai. Aur express karna hi woh ho sakta hai jo moment ko chahiye.",
      aligned:
        "Aapki emotional expression circles ke experience se match karta hai. Aap dikhate hain jo feel karte hain.",
    },
  },

  "Can sit with discomfort without rushing to fix it": {
    en: {
      higher:
        "You think you sit with discomfort. You reach for solutions. 'Let's fix this' arrives before 'I'm with you in this.' Presence means tolerating helplessness — and you can't tolerate it.",
      lower:
        "You think you rush to fix. Your circles experience you as patient. The inner urgency isn't the external reality. Your stillness is landing more than you feel.",
      aligned:
        "Your circles experience your presence the way you intend. You sit with discomfort as you mean to.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap discomfort ke saath baithe hain. Aap solutions tak pahunchte hain. 'Let's fix this' 'I'm with you in this' se pehle aata hai. Presence ka matlab helplessness tolerate karna hai — aur aap tolerate nahi kar paate.",
      lower:
        "Aapko lagta hai aap fix karne ki jaldi karte hain. Aapke circles aapko patient experience karte hain. Inner urgency external reality nahi hai. Aapki stillness aapse zyada land kar rahi hai.",
      aligned:
        "Aapke circles aapki presence waisa hi experience karte hain jaisa aap chahte hain. Aap discomfort ke saath waise baithe hain jaise chahte hain.",
    },
  },

  "Notices when someone is upset before they say it": {
    en: {
      higher:
        "You think you notice. You sense but don't respond. Sensing without responding reads as not sensing at all. Your circles don't experience your awareness — because you don't act on it.",
      lower:
        "You think you miss cues. Your circles see you catching them. The adjustments you make without thinking — the softer voice, the pause — are landing more than you realize.",
      aligned:
        "Your sense of your attunement matches your circles' experience. You notice as you think you do.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap notice karte hain. Aap sense karte hain par respond nahi karte. Bina responding ke sensing, not sensing at all lagti hai. Aapke circles aapki awareness experience nahi karte — kyunki aap uspe act nahi karte.",
      lower:
        "Aapko lagta hai aap cues miss karte hain. Aapke circles aapko unhe catch karta hua dekhte hain. Jo adjustments aap bina soche karte hain — softer voice, pause — aapse zyada land kar rahe hain.",
      aligned:
        "Aapka attunement ka hissa circles ke experience se match karta hai. Aap utna hi notice karte hain jitna sochte hain.",
    },
  },

  "Stays present when someone is emotional with them": {
    en: {
      higher:
        "You think you stay. You leave — not physically, but in the ways that matter: the subject change, the solution offered, the exit hatch. Presence means staying in the room the other person is in. You leave the room.",
      lower:
        "You think you leave too soon. Your circles experience you as steady. The discomfort you feel inside isn't the discomfort they see. You're more present than you give yourself credit for.",
      aligned:
        "Your circles experience your presence the way you intend. You stay as you mean to.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap ruke hain. Aap chale jaate hain — physically nahi, par un tarikon se jo matter karte hain: subject change, solution offer, exit hatch. Presence ka matlab us room mein rehna hai jisme doosra insaan hai. Aap room chhod dete hain.",
      lower:
        "Aapko lagta hai aap jaldi chale jaate hain. Aapke circles aapko steady experience karte hain. Jo discomfort aap andar feel karte hain woh discomfort nahi hai jo woh dekhte hain. Aap apne hisse se zyada present hain.",
      aligned:
        "Aapke circles aapki presence waisa hi experience karte hain jaisa aap chahte hain. Aap waise ruke hain jaise chahte hain.",
    },
  },

  // ── Relational ─────────────────────────────────────────────
  "Dominates conversations": {
    en: {
      higher:
        "You think you share the air. You take more than your share. Your circles experience a one-way street. The gap lives in the ratio — how much you speak vs. how much you ask. You speak. You don't ask.",
      lower:
        "You think you dominate. Your circles experience you as reserved. The fear of taking too much is keeping you from taking enough. Your voice is more wanted than you feel.",
      aligned:
        "Your sense of your conversational footprint matches your circles' experience. You share the air as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap hawa share karte hain. Aap apne hisse se zyada lete hain. Aapke circles one-way street experience karte hain. Gap ratio mein hai — aap kitna bolte hain vs. kitna poochte hain. Aap bolte hain. Aap nahi poochte.",
      lower:
        "Aapko lagta hai aap dominate karte hain. Aapke circles aapko reserved experience karte hain. Zyada lene ka darr aapko enough lene se rokh raha hai. Aapki aawaaz aapse zyada wanted hai.",
      aligned:
        "Aapka conversational footprint ka hissa circles ke experience se match karta hai. Aap hawa waisa share karte hain jaise chahte hain.",
    },
  },

  "Asks questions about others' lives": {
    en: {
      higher:
        "You think you ask enough. Your circles experience a one-way street. 'How are you' isn't curiosity. 'How is the thing you told me about' is. Curiosity is felt in the specificity — and yours is too general to be felt.",
      lower:
        "You think you're prying. Your circles experience your questions as care. The hesitation to ask reads as distance. A question is the smallest unit of 'I see you' — and you're withholding it.",
      aligned:
        "Your sense of your curiosity matches your circles' experience. You ask as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap enough poochte hain. Aapke circles one-way street experience karte hain. 'Kaise ho' curiosity nahi hai. 'Woh kaisa chal raha hai jo tumne bataya tha' curiosity hai. Curiosity specificity mein feel hoti hai — aur aapka itna general hai ki feel nahi hota.",
      lower:
        "Aapko lagta hai aap prying karte hain. Aapke circles aapke sawaalon ko care ke roop mein experience karte hain. Poochne ki hesitation distance lagti hai. Sawaal 'I see you' ka sabse chhota unit hai — aur aap use rok rahe hain.",
      aligned:
        "Aapka curiosity ka hissa circles ke experience se match karta hai. Aap utna hi poochte hain jitna chahte hain.",
    },
  },

  "Remembers details others have shared about themselves": {
    en: {
      higher:
        "You think you remember. Your circles experience you forget. Remembering internally isn't enough — you have to mention it back. A remembered detail, spoken aloud, is the proof. Yours stays inside.",
      lower:
        "You think you forget. Your circles experience you as attentive. The details you recall and return land more than you realize. Your memory is kinder than your self-assessment.",
      aligned:
        "Your sense of your memory matches your circles' experience. You remember as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap yaad rakhte hain. Aapke circles aapko bhulta hua experience karte hain. Andar yaad karna enough nahi hai — aapko wapas mention karna padta hai. Ek yaad kiya detail, zor se bola, proof hota hai. Aapka andar hi rehta hai.",
      lower:
        "Aapko lagta hai aap bhoolte hain. Aapke circles aapko attentive experience karte hain. Jo details aap recall aur return karte hain woh aapse zyada land karte hain. Aapki memory aapki self-assessment se kinder hai.",
      aligned:
        "Aapka memory ka hissa circles ke experience se match karta hai. Aap utna hi yaad rakhte hain jitna chahte hain.",
    },
  },

  "Makes an effort to include others who are quiet": {
    en: {
      higher:
        "You think you include. The quiet ones stay quiet around you. The gap lives in the invitation — 'what do you think' vs. waiting for them to offer it. Inclusion is an active verb. You're not doing it.",
      lower:
        "You think you don't do enough. Your circles experience your awareness as inclusion itself. Noticing who hasn't spoken — even silently — is more than most do.",
      aligned:
        "Your sense of your inclusion matches your circles' experience. You draw people in as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap include karte hain. Chup log aapke aas-paas chup hi rehte hain. Gap invitation mein hai — 'kya sochte ho' vs. unka offer karne ka wait karna. Inclusion ek active verb hai. Aap nahi kar rahe.",
      lower:
        "Aapko lagta hai aap enough nahi karte. Aapke circles aapki awareness ko inclusion hi experience karte hain. Notice karna kisne bola nahi — chupchap bhi — zyada hai jo zyada log karte hain.",
      aligned:
        "Aapka inclusion ka hissa circles ke experience se match karta hai. Aap logon ko waise andar laate hain jaise chahte hain.",
    },
  },

  "Reaches out to people without being prompted": {
    en: {
      higher:
        "You think you reach out. Your circles experience silence where you feel effort. Thinking of someone isn't reaching out — letting them know is. The thought counts, but the message lands. Yours doesn't land.",
      lower:
        "You think you're not enough. Your circles experience your reach-outs as meaningful. The fear of bothering is holding back care that would be received. A small message does more than you think.",
      aligned:
        "Your sense of your reaching out matches your circles' experience. You connect as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap reach out karte hain. Aapke circles khamoshi experience karte hain jahan aap effort feel karte hain. Kisi ko sochna reach out nahi hai — unhe jaanna hai. Thought count karta hai, par message land karta hai. Aapka land nahi hota.",
      lower:
        "Aapko lagta hai aap enough nahi hain. Aapke circles aapke reach-outs ko meaningful experience karte hain. Bother karne ka darr aise care ko rokh raha hai jo receive ho jaati. Ek chhota message aapse zyada karta hai.",
      aligned:
        "Aapka reaching out ka hissa circles ke experience se match karta hai. Aap waise connect karte hain jaise chahte hain.",
    },
  },

  "Lets people in, rather than keeping them at a distance": {
    en: {
      higher:
        "You think you're open. Your circles experience a wall you don't feel. The gap lives in what you share — the surface vs. the real. Letting people in means showing the rooms you keep closed. You show the hallway.",
      lower:
        "You think you're closed off. Your circles experience you as more open than you feel. The vulnerability you judge as insufficient is landing as trust. You're letting people in more than you realize.",
      aligned:
        "Your sense of your openness matches your circles' experience. You let people in as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap open hain. Aapke circles ek deewar experience karte hain jo aap feel nahi karte. Gap isme hai ki aap kya share karte hain — surface vs. asli. Logon ko andar aane dena matlab woh kamre dikhana jo aap band rakhte hain. Aap hallway dikhate hain.",
      lower:
        "Aapko lagta hai aap closed off hain. Aapke circles aapko aapse zyada open experience karte hain. Jo vulnerability aap insufficient judge karte hain woh trust ke roop mein land ho rahi hai. Aap aapse zyada logon ko andar le aa rahe hain.",
      aligned:
        "Aapka openness ka hissa circles ke experience se match karta hai. Aap logon ko waise andar aane dete hain jaise chahte hain.",
    },
  },

  "Follows up on things people mentioned mattered to them": {
    en: {
      higher:
        "You think you follow up. Your circles experience you forget what mattered. The 'how did that go' never comes. Follow-up is the proof that the hearing was real — and yours is missing.",
      lower:
        "You think you fall short. Your circles experience you as attentive. The follow-ups you do make land more than you realize. The small check-ins matter more than you feel.",
      aligned:
        "Your sense of your follow-up matches your circles' experience. You return to what mattered as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap follow up karte hain. Aapke circles aapko bhulta hua experience karte hain. 'Woh kaisa hua' kabhi nahi aata. Follow-up iska proof hai ki sunna asli tha — aur aapka missing hai.",
      lower:
        "Aapko lagta hai aap short padte hain. Aapke circles aapko attentive experience karte hain. Jo follow-ups aap karte hain woh aapse zyada land karte hain. Chhote check-ins aapse zyada matter karte hain.",
      aligned:
        "Aapka follow-up ka hissa circles ke experience se match karta hai. Aap matter karne wali cheezon par waise wapas aate hain jaise chahte hain.",
    },
  },

  "Shares their own struggles honestly with others": {
    en: {
      higher:
        "You think you share. You share a polished version. The struggles you mention aren't the ones you carry. Honesty is felt in the unedited version — and yours is always edited.",
      lower:
        "You think you share too much. Your circles experience you as private. The fear of burdening keeps you from the connection you want. Your struggles, shared, lighten both people.",
      aligned:
        "Your sense of your honesty matches your circles' experience. You share as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap share karte hain. Aap polished version share karte hain. Jo struggles aap mention karte hain woh woh nahi hain jo aap carry karte hain. Honesty unedited version mein feel hoti hai — aur aapka hamesha edited hota hai.",
      lower:
        "Aapko lagta hai aap zyada share karte hain. Aapke circles aapko private experience karte hain. Burden karne ka darr aapko us connection se rokh raha hai jo aap chahte hain. Aapki struggles, shared, dono logon ko halka karte hain.",
      aligned:
        "Aapka honesty ka hissa circles ke experience se match karta hai. Aap utna hi share karte hain jitna chahte hain.",
    },
  },

  // ── Reliability ────────────────────────────────────────────
  "Arrives on time to agreed meetings": {
    en: {
      higher:
        "You think you're on time. Your circles experience you as late. 'Close enough' isn't on time. Punctuality is respect measured in minutes — and yours is measured in excuses.",
      lower:
        "You judge yourself for lateness your circles don't experience. The inner pressure to be perfect is louder than the external record. You're more punctual than you give yourself credit for.",
      aligned:
        "Your sense of your punctuality matches your circles' experience. You arrive as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap time par hain. Aapke circles aapko late experience karte hain. 'Close enough' time par nahi hai. Punctuality minutes mein measure kiya gaya respect hai — aur aapka excuses mein measure hota hai.",
      lower:
        "Aap us lateness ke liye khud ko judge karte hain jo circles experience nahi karte. Perfect hone ka inner pressure external record se zyada loud hai. Aap apne hisse se zyada punctual hain.",
      aligned:
        "Aapka punctuality ka hissa circles ke experience se match karta hai. Aap waise aate hain jaise chahte hain.",
    },
  },

  "Responds to messages within a reasonable timeframe": {
    en: {
      higher:
        "You think you respond. Your circles experience delays you don't notice. The messages you 'saw' but didn't answer are the backlog. Responsiveness is measured by the sender, not the receiver — and the sender is waiting.",
      lower:
        "You think you're slow. Your circles experience you as responsive. The self-criticism about latency doesn't match the external experience. You're more reachable than you feel.",
      aligned:
        "Your sense of your responsiveness matches your circles' experience. You reply as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap respond karte hain. Aapke circles delays experience karte hain jo aap notice nahi karte. Woh messages jo aapne 'dekhe' par jawab nahi diya — woh backlog hai. Responsiveness sender se measure hoti hai, receiver se nahi — aur sender wait kar raha hai.",
      lower:
        "Aapko lagta hai aap slow hain. Aapke circles aapko responsive experience karte hain. Latency ke baare mein self-criticism external experience se match nahi karti. Aap aapse zyada reachable hain.",
      aligned:
        "Aapka responsiveness ka hissa circles ke experience se match karta hai. Aap utna hi reply karte hain jitna chahte hain.",
    },
  },

  "Keeps information shared in confidence private": {
    en: {
      higher:
        "You think you're discreet. Your circles experience leaks you don't intend. 'I thought you knew' is the small disclosure that feels harmless but isn't. Confidence is kept in the details — and yours slip.",
      lower:
        "You think you slip. Your circles experience you as a vault. The anxiety about having shared too much doesn't match what others actually received. You're more trusted than you feel.",
      aligned:
        "Your sense of your discretion matches your circles' experience. You keep confidence as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap discreet hain. Aapke circles leaks experience karte hain jo aap intend nahi karte. 'Maine socha tumhe pata hai' woh chhota disclosure hai jo harmless lagta hai par nahi hai. Confidence details mein rakha jaata hai — aur aapka slip hota hai.",
      lower:
        "Aapko lagta hai aap slip karte hain. Aapke circles aapko vault experience karte hain. Zyada share karne ki anxiety usse match nahi karti jo dusron ne actually receive kiya. Aap aapse zyada trusted hain.",
      aligned:
        "Aapka discretion ka hissa circles ke experience se match karta hai. Aap confidence waise rakhte hain jaise chahte hain.",
    },
  },

  "Adapts their plans when circumstances change": {
    en: {
      higher:
        "You think you adapt. Your circles experience you as rigid. The adaptation happens — but late. Flexibility is measured by when, not just whether. Yours arrives after the damage.",
      lower:
        "You think you're inflexible. Your circles experience you as adaptable. The self-criticism about stubbornness doesn't match the external record. You bend more than you give yourself credit for.",
      aligned:
        "Your sense of your adaptability matches your circles' experience. You adjust as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap adapt karte hain. Aapke circles aapko rigid experience karte hain. Adaptation hoti hai — par late. Flexibility isse measure hoti hai ki kab, na ki sirf kya. Aapka damage ke baad aata hai.",
      lower:
        "Aapko lagta hai aap inflexible hain. Aapke circles aapko adaptable experience karte hain. Stubbornness ke baare mein self-criticism external record se match nahi karti. Aap apne hisse se zyada bend karte hain.",
      aligned:
        "Aapka adaptability ka hissa circles ke experience se match karta hai. Aap waise adjust karte hain jaise chahte hain.",
    },
  },

  "Does what they said they would do, by when they said they would": {
    en: {
      higher:
        "You think you deliver. Your circles experience slips you rationalize. The deadline that moved without the conversation isn't flexibility — it's a broken promise. Delivery is measured by the original promise, not the revised one.",
      lower:
        "You judge yourself for misses your circles don't track. The inner accountant is stricter than the external one. You're delivering more reliably than you feel.",
      aligned:
        "Your sense of your delivery matches your circles' experience. You do what you say, when you say.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap deliver karte hain. Aapke circles slips experience karte hain jo aap rationalize karte hain. Deadline jo bina baat-cheet ke move hui woh flexibility nahi hai — broken promise hai. Delivery original promise se measure hota hai, revised se nahi.",
      lower:
        "Aap un misses ke liye khud ko judge karte hain jo circles track nahi karte. Inner accountant external se zyada strict hai. Aap aapse zyada reliably deliver kar rahe hain.",
      aligned:
        "Aapka delivery ka hissa circles ke experience se match karta hai. Aap wahi karte hain jo kehte hain, jab kehte hain.",
    },
  },

  "Can be counted on to follow through, even when it is hard": {
    en: {
      higher:
        "You think you follow through. Your circles experience you as reliable when it's easy. The hard moments are where you reconsider. Reliability is proven in the inconvenient — and the inconvenient is where you step back.",
      lower:
        "You think you fall short. Your circles experience you as dependable. The hard moments you beat yourself up for are the ones they didn't notice. You're more counted-on than you feel.",
      aligned:
        "Your sense of your follow-through matches your circles' experience. You can be counted on as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap follow through karte hain. Aapke circles aapko easy hone par reliable experience karte hain. Hard moments wahan hain jahan aap reconsider karte hain. Reliability inconvenient mein prove hoti hai — aur inconvenient wahan hai jahan aap piche hatte hain.",
      lower:
        "Aapko lagta hai aap short padte hain. Aapke circles aapko dependable experience karte hain. Hard moments jinke liye aap khud ko maarte hain woh hain jinhe unhone notice nahi kiya. Aap aapse zyada counted-on hain.",
      aligned:
        "Aapka follow-through ka hissa circles ke experience se match karta hai. Aap utne hi count-on ho sakte hain jitna chahte hain.",
    },
  },

  "Flags problems early rather than waiting": {
    en: {
      higher:
        "You think you flag. Your circles experience you raise things late. 'Worth mentioning' to you isn't 'worth mentioning' to them. Early is a judgment call — and your threshold is set too high.",
      lower:
        "You think you're noisy. Your circles experience you as measured. The fear of crying wolf is holding back signals that would help. An early flag, even a false one, costs less than a late one.",
      aligned:
        "Your sense of your flagging matches your circles' experience. You raise problems as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap flag karte hain. Aapke circles aapko late raise karta hua experience karte hain. Aapko 'mention karne layak' jo lagta hai woh unhe nahi lagta. Early ek judgment call hai — aur aapka threshold bahut high set hai.",
      lower:
        "Aapko lagta hai aap noisy hain. Aapke circles aapko measured experience karte hain. Crying wolf ka darr aise signals rokh raha hai jo help karenge. Ek early flag, bhale hi false ho, late flag se kam cost karta hai.",
      aligned:
        "Aapka flagging ka hissa circles ke experience se match karta hai. Aap problems waise raise karte hain jaise chahte hain.",
    },
  },

  "Communicates proactively when overwhelmed": {
    en: {
      higher:
        "You think you communicate. Your circles experience you go quiet. 'I can handle it' is the private struggle that doesn't become a shared signal. Proactivity means before, not after — and yours is always after.",
      lower:
        "You think you over-communicate. Your circles experience you as private. The fear of seeming weak holds back context that would help. Saying 'I'm stretched' prevents the stretch from becoming a break.",
      aligned:
        "Your sense of your communication matches your circles' experience. You speak up as you intend.",
    },
    hinglish: {
      higher:
        "Aapko lagta hai aap communicate karte hain. Aapke circles aapko chup ho jaata hua experience karte hain. 'Main handle kar lunga' woh private struggle hai jo shared signal nahi banti. Proactivity ka matlab pehle hai, baad mein nahi — aur aapka hamesha baad mein hota hai.",
      lower:
        "Aapko lagta hai aap over-communicate karte hain. Aapke circles aapko private experience karte hain. Weak lagne ka darr aise context ko rokh raha hai jo help karega. 'Main stretched hoon' kehna stretch ko break hone se rok deta hai.",
      aligned:
        "Aapka communication ka hissa circles ke experience se match karta hai. Aap waise bolte hain jaise chahte hain.",
    },
  },
};

// ── Helper: get the insight for a behavior + gap direction ──
export function getInsight(
  behaviorText: string,
  selfRating: number,
  externalAverage: number,
  locale: "en" | "hinglish"
): string | null {
  const entry = INSIGHTS[behaviorText];
  if (!entry) return null;

  const gap = externalAverage - selfRating;
  let direction: GapDirection;
  if (gap > 0.5) {
    direction = "lower"; // external sees higher → underestimate
  } else if (gap < -0.5) {
    direction = "higher"; // external sees lower → overestimate
  } else {
    direction = "aligned";
  }

  return entry[locale][direction];
}

// ── Helper: get direction label for a behavior ──
export function getDirection(
  selfRating: number,
  externalAverage: number
): GapDirection {
  const gap = externalAverage - selfRating;
  if (gap > 0.5) return "lower";
  if (gap < -0.5) return "higher";
  return "aligned";
}
