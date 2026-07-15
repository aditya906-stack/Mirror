// Mirror — behavior-specific reflection insights.
//
// This is the heart of the report. Each behavior gets its OWN insight,
// written for three gap directions:
//   higher  — self rated higher than circles observed (overestimate)
//   lower   — circles observed higher than self rated (underestimate)
//   aligned — self and circles are close
//
// The insights are psychologically specific to the behavior, not generic.
// They observe without judging. They name the pattern without prescribing
// a fix. They create the "haan, yeh sahi hai" moment — where the user
// sees themselves accurately and feels met, not diagnosed.
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
        "You may not notice the interruptions — from inside they can feel like enthusiasm or engagement. Your circles experience them as being cut off. The gap often lives in the half-second between their thought finishing and yours starting.",
      lower:
        "You hold back more than you realize. Your circles may be waiting for you to jump in, and reading your restraint as disengagement. Not every pause needs to be filled — but some doors open when you speak.",
      aligned:
        "You and your circles agree on how often this happens. Awareness of a habit is often the first thing that changes it.",
    },
    hinglish: {
      higher:
        "Aap shayad interruptions notice nahi karte — andar se yeh enthusiasm ya engagement lagta hai. Aapke circles ise 'cut off' experience karte hain. Gap aksar us half-second mein hota hai — unke khayam khatam hone aur aapke shuru hone ke beech.",
      lower:
        "Aap apne aap ko zyada rok rahe hain. Aapke circles shayad aapka wait kar rahe hain, aur aapki restraint ko disengagement samajh rahe hain. Har pause ko fill karna zaroori nahi — par kuch darwaaze tab khulte hain jab aap bolte hain.",
      aligned:
        "Aap aur aapke circles is baat par sehmat hain ki yeh kitna hota hai. Kisi aadat ki awareness aksar pehli cheez hoti hai jo use badalti hai.",
    },
  },

  "Makes eye contact during conversation": {
    en: {
      higher:
        "You may feel you're holding connection through your eyes. Your circles may be experiencing something else — a gaze that lands as intensity rather than warmth. Eye contact is presence, but it has a temperature.",
      lower:
        "You may not realize how much you look away. Your circles may read it as disinterest or discomfort, when it might simply be how you process. Eyes meeting, even briefly, is often received as 'I'm here with you.'",
      aligned:
        "Your sense of this matches what your circles experience. The way you hold gaze is landing as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap aankhon se connection bana rahe hain. Aapke circles shayad kuch aur experience kar rahe hain — ek gaze jo warmth ki jagah intensity lagti hai. Eye contact presence hai, par iski ek temperature hoti hai.",
      lower:
        "Aap shayad notice nahi karte kitna aap door dekhte hain. Aapke circles ise disinterest ya discomfort samajh sakte hain, jabki ye shayad sirf aapka process karne ka tareeqa hai. Aankhein milna, bhale hi briefly, aksar 'I'm here with you' jaise receive hota hai.",
      aligned:
        "Aapka hissa is baat se match karta hai jo aapke circles experience karte hain. Aapka gaze waisa hi land ho raha hai jaisa aap chahte hain.",
    },
  },

  "Explains complex ideas clearly": {
    en: {
      higher:
        "What feels clear inside your head may not land that way for others. The gap often lives in the steps you skip — the ones that feel obvious to you but aren't to the listener. Clarity is measured at the ear, not the mouth.",
      lower:
        "You may be clearer than you give yourself credit for. Your circles are receiving your explanations well — perhaps the inner critic is louder than the external evidence. Trust the landing more than the launch.",
      aligned:
        "Your self-assessment and your circles' experience match here. You explain as clearly as you think you do.",
    },
    hinglish: {
      higher:
        "Jo aapke dimaagh mein clear lagta hai woh dusron ke liye waisa land nahi karta. Gap aksar un steps mein hota hai jo aap skip karte hain — jo aapko obvious lagte hain par sunne wale ko nahi. Clarity ka measurement kaan par hota hai, mooh par nahi.",
      lower:
        "Aap shayad apne aap se zyada saaf bolte hain jitna aap khud ko credit dete hain. Aapke circles aapki explanations achhe se receive kar rahe hain — shayad inner critic external evidence se zyada loud hai. Launch pe zyada, landing pe bharosa karo.",
      aligned:
        "Aapki self-assessment aur circles ka experience yahan match karta hai. Aap utna hi clearly explain karte hain jitna aap sochte hain.",
    },
  },

  "Listens without preparing a response while the other person speaks": {
    en: {
      higher:
        "You may believe you're listening fully while quietly composing your reply. Your circles can often sense the difference — presence has a texture that half-attention doesn't. True listening means being willing to not know what you'll say.",
      lower:
        "You hold yourself back from responding, perhaps assuming you're not listening well. Your circles experience you as more present than you feel. The silence you offer is often received as care.",
      aligned:
        "Your circles experience your listening the way you experience it yourself. That congruence is rare.",
    },
    hinglish: {
      higher:
        "Aap shayad believe karte hain ki aap poora sun rahe hain jabki chupchaap apna reply compose kar rahe hain. Aapke circles aksar farak mehsoos kar lete hain — presence ki ek texture hoti hai jo half-attention mein nahi hoti. Asli sunne ka matlab hai yeh maanna ki aapko nahi pata aap kya kahenge.",
      lower:
        "Aap khud ko respond karne se rokte hain, shayad maante hain ki aap achhe se nahi sun rahe. Aapke circles aapko jitna present feel karte hain, usse zyada present experience karte hain. Aapki khamoshi aksar care ke roop mein receive hoti hai.",
      aligned:
        "Aapke circles aapki listening waisa hi experience karte hain jaisa aap khud karte hain. Yeh congruence rare hai.",
    },
  },

  "Speaks loudly enough to be heard in a group": {
    en: {
      higher:
        "What feels like audible participation to you may be landing below the threshold of the room. Your circles may be missing contributions you believe you're making. Volume isn't about being loud — it's about being reachable.",
      lower:
        "You may think you're too quiet, but your circles hear you clearly. The instinct to speak up more may not be serving you — you're already landing. Consider that your softness is not a deficit.",
      aligned:
        "Your sense of your own volume matches how your circles experience it. You're audible as you intend.",
    },
    hinglish: {
      higher:
        "Jo aapko audible participation lagta hai woh room ke threshold se neeche land ho raha ho sakta hai. Aapke circles shayad woh contributions miss kar rahe hain jo aap believe karte hain aap de rahe hain. Volume ke baare mein nahi hai — yeh reachable hone ke baare mein hai.",
      lower:
        "Aap shayad sochte hain ki aap bahut chup hain, par aapke circles aapko clearly sunte hain. Aur bolne ki instinct shayad aapki help nahi kar rahi — aap pehle se land kar rahe hain. Socho ki aapki softness koi kami nahi hai.",
      aligned:
        "Aapka apne volume ka hissa usse match karta hai jo aapke circles experience karte hain. Aap utne audible hain jitna chahte hain.",
    },
  },

  "Says what they mean, even when it is uncomfortable": {
    en: {
      higher:
        "You may feel you're being direct, but your circles may be experiencing a softened version. The gap often lives in the euphemisms that feel honest to you but dilute the message. Directness without cruelty is a practice, not a personality.",
      lower:
        "You hold back more than you realize. Your circles may be waiting for the real answer, and reading your restraint as agreement. Speaking the uncomfortable thing, once, often saves months of confusion.",
      aligned:
        "Your circles experience your directness the way you intend it. That alignment is a kind of trust.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap direct hain, par aapke circles shayad ek softened version experience kar rahe hain. Gap aksar un euphemisms mein hota hai jo aapko honest lagte hain par message ko dilute kar dete hain. Bina cruelty ke directness ek practice hai, personality nahi.",
      lower:
        "Aap apne aap ko zyada rokte hain. Aapke circles shayad asli answer ka wait kar rahe hain, aur aapki restraint ko agreement samajh rahe hain. Uncomfortable baat ek baar bolna aksar mahino ki confusion bacha deta hai.",
      aligned:
        "Aapke circles aapki directness waisa hi experience karte hain jaisa aap chahte hain. Woh alignment ek tarah ki trust hai.",
    },
  },

  "Reads the room before speaking": {
    en: {
      higher:
        "You may believe you're reading the room accurately, but your circles may be experiencing a different timing. The gap often lives between sensing and acting — you may feel the room but not adjust to it.",
      lower:
        "You may think you're missing cues your circles see you catching. The instinct to hold back may itself be the reading. Sometimes the most attuned person in the room is the quietest.",
      aligned:
        "Your sense of the room matches what your circles see in you. You read as well as you think you do.",
    },
    hinglish: {
      higher:
        "Aap shayad believe karte hain ki aap room accurately padh rahe hain, par aapke circles shayad alag timing experience kar rahe hain. Gap aksar sensing aur acting ke beech hota hai — aap room feel karte hain par adjust nahi karte.",
      lower:
        "Aap shayad sochte hain ki aap cues miss kar rahe hain jo aapke circles dekh rahe hain. Hold karne ki instinct khhi reading ho sakti hai. Kabhi-kabhi room mein sabse attuned person sabse chup wala hota hai.",
      aligned:
        "Aapka room ka hissa usse match karta hai jo aapke circles aapme dekhte hain. Aap utna hi achha padhte hain jitna sochte hain.",
    },
  },

  "Asks for clarification when they do not understand": {
    en: {
      higher:
        "You may feel you're asking enough, but your circles may be watching you nod through things you haven't grasped. The gap often lives in the fear of looking slow — but asking is usually received as engagement, not ignorance.",
      lower:
        "You may hold back from asking, assuming you should know. Your circles notice when you do ask — and often wish you would more. A question asked is almost always worth the moment it costs.",
      aligned:
        "Your circles experience your questioning the way you experience it. You ask as much as you think you do.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap enough poochte hain, par aapke circles shayad aapko un cheezon pe nod karte dekh rahe hain jo aap samajh nahi paaye. Gap aksar slow lagne ke darr mein hota hai — par poochna aksar engagement ke roop mein receive hota hai, ignorance nahi.",
      lower:
        "Aap shayad poochne se rokte hain, maante hain ki aapko pata hona chahiye. Aapke circles notice karte hain jab aap poochte hain — aur aksar chahte hain ki aap aur poochein. Ek sawaal poochna lagbhag hamesha us moment ke laayak hota hai jo woh leta hai.",
      aligned:
        "Aapke circles aapki questioning waisa hi experience karte hain jaisa aap karte hain. Aap utna hi poochte hain jitna sochte hain.",
    },
  },

  // ── Leadership ─────────────────────────────────────────────
  "Takes responsibility when something goes wrong": {
    en: {
      higher:
        "You may feel you own the failure, but your circles may be experiencing blame distributed elsewhere. The gap often lives in the language — 'we' when 'I' would land. Ownership is felt in the pronouns.",
      lower:
        "You may carry more guilt than your circles see. They may not realize how much you're holding, because you hold it silently. Naming what you carry can be the difference between responsibility and self-punishment.",
      aligned:
        "Your sense of ownership matches what your circles experience. You take responsibility as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap failure own karte hain, par aapke circles shayad blame kahin aur distribute hua experience kar rahe hain. Gap aksar language mein hota hai — 'hum' jab 'main' land karna chahiye. Ownership pronouns mein feel hota hai.",
      lower:
        "Aap shayad apne circles se zyada guilt le rahe hain. Woh shayad realize nahi karte kitna aap le rahe hain, kyunki aap chupke se lete hain. Jo aap le rahe hain uska naam lena responsibility aur self-punishment ke beech ka farak ho sakta hai.",
      aligned:
        "Aapka ownership ka hissa usse match karta hai jo aapke circles experience karte hain. Aap utni hi responsibility lete hain jitni chahte hain.",
    },
  },

  "Gives credit to others for their work": {
    en: {
      higher:
        "You may feel you're generous with credit, but your circles may be experiencing it land elsewhere — or not at all. The gap often lives in specificity: 'good work' vs. naming what, exactly, was good, and who, exactly, did it.",
      lower:
        "You may deflect credit more than you realize. Your circles may not know you see their work, because you keep the seeing to yourself. A name spoken aloud often does more than a private appreciation.",
      aligned:
        "Your circles experience your credit-giving the way you intend. They feel seen by you.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap credit mein generous hain, par aapke circles shayad ise kahin aur land hua experience kar rahe hain — ya bilkul nahi. Gap aksar specificity mein hota hai: 'good work' vs. yeh naam lena ki kya exactly achha tha, aur kisne exactly kiya.",
      lower:
        "Aap shayad apne se zyada credit deflect karte hain. Aapke circles shayad nahi jaante ki aap unka kaam dekhte hain, kyunki aap dekhna apne paas rakhte hain. Kisi ka naam zor se bolna aksar private appreciation se zyada karta hai.",
      aligned:
        "Aapke circles aapka credit dena waisa hi experience karte hain jaisa aap chahte hain. Woh aapse seen feel karte hain.",
    },
  },

  "Makes decisions without consulting those affected": {
    en: {
      higher:
        "You may feel your decisions are inclusive, but your circles may be experiencing them as unilateral. The gap often lives in the difference between 'I decided' and 'we decided' — and in who was in the room when it happened.",
      lower:
        "You may over-consult, believing you're not consulting enough. Your circles may experience the seeking as hesitation. Sometimes the most respectful decision is the one you make and own.",
      aligned:
        "Your decision-making process matches what your circles experience. The level of consultation lands as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aapke decisions inclusive hain, par aapke circles shayad unhe unilateral experience kar rahe hain. Gap aksar 'maine decide kiya' aur 'humne decide kiya' ke farak mein hota hai — aur yeh ki jab yeh hua toh kaun room mein tha.",
      lower:
        "Aap shayad zyada consult karte hain, maante hain ki aap enough consult nahi karte. Aapke circles seeking ko hesitation ke roop mein experience kar sakte hain. Kabhi-kabhi sabse respectful decision woh hota hai jo aap karte hain aur own karte hain.",
      aligned:
        "Aapka decision-making process usse match karta hai jo aapke circles experience karte hain. Consultation ka level waisa land karta hai jaisa aap chahte hain.",
    },
  },

  "Follows through on commitments they have made": {
    en: {
      higher:
        "You may feel you're reliable, but your circles may be experiencing a pattern of slips. The gap often lives in the small things — the ones that feel trivial to you but signal to others. Reliability is built in the tiny commitments.",
      lower:
        "You may judge yourself harshly for the misses. Your circles may see you as more reliable than you see yourself — they remember the hits. The inner critic often forgets what the external record holds.",
      aligned:
        "Your sense of your follow-through matches your circles' experience. You do what you say.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap reliable hain, par aapke circles shayad slips ka pattern experience kar rahe hain. Gap aksar chhoti cheezon mein hota hai — jo aapko trivial lagti hain par dusron ko signal deti hain. Reliability chhote commitments mein banti hai.",
      lower:
        "Aap shayad misses ke liye khud ko harshly judge karte hain. Aapke circles shayad aapko aapse zyada reliable dekhte hain — woh hits yaad rakhte hain. Inner critic aksar woh bhool jaata hai jo external record hold karta hai.",
      aligned:
        "Aapka follow-through ka hissa aapke circles ke experience se match karta hai. Aap wahi karte hain jo kehte hain.",
    },
  },

  "Delegates tasks rather than doing everything themselves": {
    en: {
      higher:
        "You may feel you're delegating, but your circles may be experiencing you holding the work. The gap often lives in the difference between handing off a task and handing off the decision. Delegation without trust is supervision.",
      lower:
        "You may think you're hoarding work, but your circles may experience your involvement as support. The question isn't always 'am I doing too much' — sometimes it's 'am I doing the right things.'",
      aligned:
        "Your delegation matches what your circles experience. The balance lands as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap delegate karte hain, par aapke circles shayad aapko kaam hold karte hue experience kar rahe hain. Gap aksar task hand off karne aur decision hand off karne ke farak mein hota hai. Bina trust ke delegation supervision hai.",
      lower:
        "Aap shayad sochte hain ki aap kaam hoard karte hain, par aapke circles aapki involvement ko support ke roop mein experience kar sakte hain. Sawaal hamesha 'kya main zyada kar raha hoon' nahi hota — kabhi-kabhi yeh hota hai 'kya main sahi cheezein kar raha hoon.'",
      aligned:
        "Aapka delegation usse match karta hai jo aapke circles experience karte hain. Balance waisa land karta hai jaisa aap chahte hain.",
    },
  },

  "Gives direct feedback when someone's work falls short": {
    en: {
      higher:
        "You may feel you're being direct, but your circles may be experiencing softness where you intended clarity. The gap often lives in the cushioning — the kind words that wrap the hard message until the message gets lost.",
      lower:
        "You may hold back, believing directness will wound. Your circles may be waiting for the real feedback, and reading its absence as either approval or contempt. Kindness without honesty is often experienced as abandonment.",
      aligned:
        "Your circles experience your feedback the way you intend. The directness lands.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap direct hain, par aapke circles shayad wahan softness experience kar rahe hain jahan aapne clarity chahi thi. Gap aksar cushioning mein hota hai — woh kind words jo hard message ko wrap karte hain jab tak message kho na jaaye.",
      lower:
        "Aap shayad rokte hain, maante hain ki directness wound karegi. Aapke circles shayad asli feedback ka wait kar rahe hain, aur iski ghair-maujoodgi ko approval ya contempt samajh rahe hain. Bina honesty ke kindness aksar abandonment ke roop mein experience hoti hai.",
      aligned:
        "Aapke circles aapka feedback waisa hi experience karte hain jaisa aap chahte hain. Directness land karta hai.",
    },
  },

  "Holds others accountable for their commitments": {
    en: {
      higher:
        "You may feel you're holding the line, but your circles may be experiencing the line move. The gap often lives in the follow-through — the conversation that doesn't happen, the consequence that never arrives.",
      lower:
        "You may think you're pushing too hard, but your circles may be experiencing your accountability as care. Holding someone to their word, when done with respect, is often received as belief in them.",
      aligned:
        "Your accountability matches what your circles experience. The standard lands as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap line hold karte hain, par aapke circles shayad line move karta hua experience kar rahe hain. Gap aksar follow-through mein hota hai — woh baat-cheet jo nahi hoti, woh consequence jo kabhi nahi aati.",
      lower:
        "Aap shayad sochte hain ki aap zyada push karte hain, par aapke circles shayad aapki accountability ko care ke roop mein experience kar rahe hain. Kisi ko uske shabd par hold karna, jab respect ke saath kiya jaaye, aksar un par belief ke roop mein receive hota hai.",
      aligned:
        "Aapki accountability usse match karti hai jo aapke circles experience karte hain. Standard waisa land karta hai jaisa aap chahte hain.",
    },
  },

  "Shares the reasoning behind their decisions": {
    en: {
      higher:
        "You may feel the reasoning is obvious, but your circles may be experiencing decisions as arbitrary. The gap often lives in the assumption that intent is visible — it almost never is. 'Here's why' is often the missing sentence.",
      lower:
        "You may over-explain, believing you're not sharing enough. Your circles may experience the reasoning as already clear. Trust that the 'why' has landed, and let the 'what' follow.",
      aligned:
        "Your circles experience your reasoning as shared. The 'why' lands as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki reasoning obvious hai, par aapke circles shayad decisions arbitrary ke roop mein experience kar rahe hain. Gap aksar is assumption mein hota hai ki intent visible hai — yeh lagbhag kabhi nahi hota. 'Yeh isliye' aksar missing vakya hota hai.",
      lower:
        "Aap shayad zyada explain karte hain, maante hain ki aap enough share nahi karte. Aapke circles shayad reasoning pehle se clear experience kar rahe hain. Bharosa karo ki 'kyun' land ho gaya hai, aur 'kya' ko follow karne do.",
      aligned:
        "Aapke circles aapki reasoning shared ke roop mein experience karte hain. 'Kyun' waisa land karta hai jaisa aap chahte hain.",
    },
  },

  // ── Emotional Presence ─────────────────────────────────────
  "Remains calm under pressure": {
    en: {
      higher:
        "You may feel calm inside, but your circles may be experiencing something else — a tightness in your voice, a pace change, a withdrawal. Calm is measured at the receiving end, not the feeling end.",
      lower:
        "You may feel you're losing composure, but your circles may be experiencing you as steady. The inner storm is often invisible — and the steadiness you don't feel may be the steadiness they rely on.",
      aligned:
        "Your sense of your composure matches what your circles experience. You are as calm as you feel.",
    },
    hinglish: {
      higher:
        "Aap andar se calm feel kar sakte hain, par aapke circles shayad kuch aur experience kar rahe hain — aawaaz mein tightness, pace change, ek withdrawal. Calm receiving end par measure hota hai, feeling end par nahi.",
      lower:
        "Aap shayad feel karte hain ki aap composure kho rahe hain, par aapke circles shayad aapko steady experience kar rahe hain. Inner storm aksar invisible hota hai — aur woh steadiness jo aap feel nahi karte, wohi steadiness ho sakti hai jis par woh rely karte hain.",
      aligned:
        "Aapka composure ka hissa usse match karta hai jo aapke circles experience karte hain. Aap utne hi calm hain jitna feel karte hain.",
    },
  },

  "Expresses frustration indirectly rather than naming it": {
    en: {
      higher:
        "You may feel you're naming it, but your circles may be experiencing the indirect version — the withdrawal, the sarcasm, the cold tone. The gap often lives in the belief that 'they know' — they usually don't.",
      lower:
        "You may think you're being indirect, but your circles may be experiencing you as direct. The softness you intend may not be the softness they receive. Naming frustration plainly is often gentler than the alternatives.",
      aligned:
        "Your circles experience your frustration the way you intend. The directness matches.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap naam le rahe hain, par aapke circles shayad indirect version experience kar rahe hain — withdrawal, sarcasm, cold tone. Gap aksar is belief mein hota hai ki 'unhe pata hai' — aksar unhe nahi pata.",
      lower:
        "Aap shayad sochte hain ki aap indirect hain, par aapke circles shayad aapko direct experience kar rahe hain. Jo softness aap chahte hain woh softness nahi ho sakti jo woh receive karte hain. Frustration saaf-saaf naam lena aksar alternatives se gentle hota hai.",
      aligned:
        "Aapke circles aapki frustration waisa hi experience karte hain jaisa aap chahte hain. Directness match karti hai.",
    },
  },

  "Acknowledges others' feelings when they express them": {
    en: {
      higher:
        "You may feel you're acknowledging, but your circles may be experiencing the acknowledgment as absent — a nod that doesn't land, a 'that's hard' that feels rote. The gap often lives in the specificity: naming the feeling, not just the situation.",
      lower:
        "You may hold back from naming what you see, perhaps assuming it's obvious. Your circles may be waiting for the acknowledgment — the sentence that says 'I see this in you.' Naming what someone feels, even imperfectly, is often received as care.",
      aligned:
        "Your circles experience your acknowledgment the way you intend. They feel met by you.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap acknowledge karte hain, par aapke circles shayad acknowledgment ko absent experience kar rahe hain — ek nod jo land nahi karta, ek 'that's hard' jo rote lagta hai. Gap aksar specificity mein hota hai: feeling ka naam lena, sirf situation ka nahi.",
      lower:
        "Aap shayad jo dekhte hain uska naam lene se rokte hain, shayad maante hain ki obvious hai. Aapke circles shayad acknowledgment ka wait kar rahe hain — us vakya ka jo kehta hai 'I see this in you.' Kisi ki feeling ka naam lena, bhale hi imperfectly, aksar care ke roop mein receive hota hai.",
      aligned:
        "Aapke circles aapka acknowledgment waisa hi experience karte hain jaisa aap chahte hain. Woh aapse met feel karte hain.",
    },
  },

  "Apologizes when they are wrong": {
    en: {
      higher:
        "You may feel you apologize, but your circles may be experiencing a defense dressed as one. The gap often lives in the 'but' — the explanation that follows the 'I'm sorry' and undoes it. A clean apology has no tail.",
      lower:
        "You may feel you should apologize more, but your circles may not be waiting for one. The inner pressure to atone may be louder than the external need. Sometimes the repair has already happened, and you're the last to know.",
      aligned:
        "Your sense of your apologies matches your circles' experience. You own your wrongs as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap apologize karte hain, par aapke circles shayad ek defense ko apology ke roop mein experience kar rahe hain. Gap aksar 'but' mein hota hai — woh explanation jo 'I'm sorry' ke baad aati hai aur use undo kar deti hai. Ek clean apology ki koi tail nahi hoti.",
      lower:
        "Aap shayad feel karte hain ki aapko aur apologize karna chahiye, par aapke circles shayad uska wait nahi kar rahe. Atone karne ka inner pressure external need se zyada loud ho sakta hai. Kabhi-kabhi repair pehle ho chuka hota hai, aur aap sabse aakhir mein jaante hain.",
      aligned:
        "Aapka apologies ka hissa aapke circles ke experience se match karta hai. Aap apni galtiyon ko utna hi own karte hain jitna chahte hain.",
    },
  },

  "Shows emotion visibly during conversation": {
    en: {
      higher:
        "You may feel you're showing emotion, but your circles may be experiencing a composed exterior. The gap often lives in the face — the micro-expressions you feel inside that don't reach the surface. What moves inside often needs help reaching outside.",
      lower:
        "You may think you're showing too much, but your circles may be experiencing you as guarded. The emotion you feel as overwhelming may be landing as subtle. Expressing more may be exactly what the moment needs.",
      aligned:
        "Your emotional expression matches what your circles experience. You show what you feel.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap emotion dikhate hain, par aapke circles shayad composed exterior experience kar rahe hain. Gap aksar face mein hota hai — woh micro-expressions jo aap andar feel karte hain par surface tak nahi pahunchti. Jo andar move karta hai use aksar bahar pahunchne mein help chahiye.",
      lower:
        "Aap shayad sochte hain ki aap zyada dikhate hain, par aapke circles shayad aapko guarded experience kar rahe hain. Jo emotion aap overwhelming feel karte hain woh subtle land ho sakti hai. Aur express karna hi woh ho sakta hai jo moment ko chahiye.",
      aligned:
        "Aapki emotional expression usse match karti hai jo aapke circles experience karte hain. Aap dikhate hain jo feel karte hain.",
    },
  },

  "Can sit with discomfort without rushing to fix it": {
    en: {
      higher:
        "You may feel you're sitting with it, but your circles may be experiencing you reach for solutions. The gap often lives in the reflex — the 'let's fix this' that arrives before the 'I'm with you in this.' Presence often means tolerating helplessness.",
      lower:
        "You may think you rush to fix, but your circles may be experiencing you as patient. The inner urgency may not be the external reality. Your stillness may be landing more than you feel.",
      aligned:
        "Your circles experience your presence the way you intend. You sit with discomfort as you mean to.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap uske saath baithe hain, par aapke circles shayad aapko solutions tak pahunchte hue experience kar rahe hain. Gap aksar reflex mein hota hai — 'let's fix this' jo 'I'm with you in this' se pehle aata hai. Presence ka matlab aksar helplessness tolerate karna hota hai.",
      lower:
        "Aap shayad sochte hain ki aap fix karne ki jaldi karte hain, par aapke circles shayad aapko patient experience kar rahe hain. Inner urgency external reality nahi ho sakti. Aapki stillness aapse zyada land kar sakti hai.",
      aligned:
        "Aapke circles aapki presence waisa hi experience karte hain jaisa aap chahte hain. Aap discomfort ke saath waise baithe hain jaise chahte hain.",
    },
  },

  "Notices when someone is upset before they say it": {
    en: {
      higher:
        "You may feel you notice, but your circles may be experiencing you miss it. The gap often lives in what you do with the noticing — sensing without responding can read as not sensing at all.",
      lower:
        "You may think you miss cues, but your circles may be experiencing you as attuned. The adjustments you make without thinking — the softer voice, the pause — may be landing more than you realize.",
      aligned:
        "Your sense of your attunement matches your circles' experience. You notice as you think you do.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap notice karte hain, par aapke circles shayad aapko miss karta hua experience kar rahe hain. Gap aksar isme hota hai ki aap noticing ke saath kya karte hain — sensing bina responding ke, not sensing at all lag sakta hai.",
      lower:
        "Aap shayad sochte hain ki aap cues miss karte hain, par aapke circles shayad aapko attuned experience kar rahe hain. Jo adjustments aap bina soche karte hain — softer voice, pause — aapse zyada land kar sakte hain.",
      aligned:
        "Aapka attunement ka hissa aapke circles ke experience se match karta hai. Aap utna hi notice karte hain jitna sochte hain.",
    },
  },

  "Stays present when someone is emotional with them": {
    en: {
      higher:
        "You may feel you're staying, but your circles may be experiencing you leave — not physically, but in the ways that matter: the subject change, the solution offered, the exit hatch. Presence is staying in the room the other person is in.",
      lower:
        "You may think you leave too soon, but your circles may be experiencing you as steady. The discomfort you feel inside may not be the discomfort they see. You may be more present than you give yourself credit for.",
      aligned:
        "Your circles experience your presence the way you intend. You stay as you mean to.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap ruke hain, par aapke circles shayad aapko jaata hua experience kar rahe hain — physically nahi, par un tarikon se jo matter karte hain: subject change, solution offer, exit hatch. Presence ka matlab us room mein rehna hai jisme doosra insaan hai.",
      lower:
        "Aap shayad sochte hain ki aap jaldi chalte hain, par aapke circles shayad aapko steady experience kar rahe hain. Jo discomfort aap andar feel karte hain woh discomfort nahi ho sakti jo woh dekhte hain. Aap apne hisse se zyada present ho sakte hain.",
      aligned:
        "Aapke circles aapki presence waisa hi experience karte hain jaisa aap chahte hain. Aap waise ruke hain jaise chahte hain.",
    },
  },

  // ── Relational ─────────────────────────────────────────────
  "Dominates conversations": {
    en: {
      higher:
        "You may feel you're sharing the air, but your circles may be experiencing you take more than your share. The gap often lives in the ratio — how much you speak vs. how much you ask. Contribution is measured in the space you leave.",
      lower:
        "You may think you dominate, but your circles may be experiencing you as reserved. The fear of taking too much may be keeping you from taking enough. Your voice may be more wanted than you feel.",
      aligned:
        "Your sense of your conversational footprint matches your circles' experience. You share the air as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap hawa share karte hain, par aapke circles shayad aapko apne se zyada lete hue experience kar rahe hain. Gap aksar ratio mein hota hai — aap kitna bolte hain vs. kitna poochte hain. Contribution us space mein measure hota hai jo aap chhodte hain.",
      lower:
        "Aap shayad sochte hain ki aap dominate karte hain, par aapke circles shayad aapko reserved experience kar rahe hain. Zyada lene ka darr aapko enough lene se rokh sakta hai. Aapki aawaaz aapse zyada wanted ho sakti hai.",
      aligned:
        "Aapka conversational footprint ka hissa aapke circles ke experience se match karta hai. Aap hawa waisa share karte hain jaisa chahte hain.",
    },
  },

  "Asks questions about others' lives": {
    en: {
      higher:
        "You may feel you ask enough, but your circles may be experiencing a one-way street. The gap often lives in the depth — 'how are you' vs. 'how is the thing you told me about.' Curiosity is felt in the specificity.",
      lower:
        "You may think you're prying, but your circles may be experiencing your questions as care. The hesitation to ask may itself be read as distance. A question is often the smallest unit of 'I see you.'",
      aligned:
        "Your sense of your curiosity matches your circles' experience. You ask as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap enough poochte hain, par aapke circles shayad one-way street experience kar rahe hain. Gap aksar depth mein hota hai — 'kaise ho' vs. 'woh kaisa chal raha hai jo tumne bataya tha.' Curiosity specificity mein feel hoti hai.",
      lower:
        "Aap shayad sochte hain ki aap prying karte hain, par aapke circles shayad aapke sawaalon ko care ke roop mein experience kar rahe hain. Poochne ki hesitation khud distance ke roop mein padh sakti hai. Ek sawaal aksar 'I see you' ka sabse chhota unit hota hai.",
      aligned:
        "Aapka curiosity ka hissa aapke circles ke experience se match karta hai. Aap utna hi poochte hain jitna chahte hain.",
    },
  },

  "Remembers details others have shared about themselves": {
    en: {
      higher:
        "You may feel you remember, but your circles may be experiencing you forget. The gap often lives in what you surface — remembering internally vs. mentioning it back. A remembered detail, spoken aloud, is often the proof.",
      lower:
        "You may think you forget, but your circles may be experiencing you as attentive. The details you recall — and return — may be landing more than you realize. Your memory may be kinder than your self-assessment.",
      aligned:
        "Your sense of your memory matches your circles' experience. You remember as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap yaad rakhte hain, par aapke circles shayad aapko bhulta hua experience kar rahe hain. Gap aksar isme hota hai ki aap surface karte hain — andar yaad karna vs. wapas mention karna. Ek yaad kiya detail, zor se bola, aksar proof hota hai.",
      lower:
        "Aap shayad sochte hain ki aap bhoolte hain, par aapke circles shayad aapko attentive experience kar rahe hain. Jo details aap recall karte hain — aur return karte hain — aapse zyada land kar sakte hain. Aapki memory aapki self-assessment se kinder ho sakti hai.",
      aligned:
        "Aapka memory ka hissa aapke circles ke experience se match karta hai. Aap utna hi yaad rakhte hain jitna chahte hain.",
    },
  },

  "Makes an effort to include others who are quiet": {
    en: {
      higher:
        "You may feel you include, but your circles may be experiencing the quiet ones stay quiet around you. The gap often lives in the invitation — 'what do you think' vs. waiting for them to offer it. Inclusion is an active verb.",
      lower:
        "You may think you don't do enough, but your circles may be experiencing your awareness as inclusion itself. Noticing who hasn't spoken — even silently — is often more than most do.",
      aligned:
        "Your sense of your inclusion matches your circles' experience. You draw people in as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap include karte hain, par aapke circles shayad chup log aapke aas-paas chup hi rehte hain experience kar rahe hain. Gap aksar invitation mein hota hai — 'kya sochte ho' vs. unka offer karne ka wait karna. Inclusion ek active verb hai.",
      lower:
        "Aap shayad sochte hain ki aap enough nahi karte, par aapke circles shayad aapki awareness ko inclusion hi experience kar rahe hain. Notice karna kisne bola nahi — chupchap bhi — aksar zyada hota hai jo zyada log karte hain.",
      aligned:
        "Aapka inclusion ka hissa aapke circles ke experience se match karta hai. Aap logon ko waise andar laate hain jaise chahte hain.",
    },
  },

  "Reaches out to people without being prompted": {
    en: {
      higher:
        "You may feel you reach out, but your circles may be experiencing silence where you feel effort. The gap often lives in the channel — thinking of someone vs. letting them know. The thought counts, but the message lands.",
      lower:
        "You may think you're not enough, but your circles may be experiencing your reach-outs as meaningful. The fear of bothering may be holding back care that would be received. A small message often does more than you think.",
      aligned:
        "Your sense of your reaching out matches your circles' experience. You connect as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap reach out karte hain, par aapke circles shayad khamoshi experience kar rahe hain jahan aap effort feel karte hain. Gap aksar channel mein hota hai — kisi ko sochna vs. unhe jaanne dena. Thought count karta hai, par message land karta hai.",
      lower:
        "Aap shayad sochte hain ki aap enough nahi hain, par aapke circles shayad aapke reach-outs ko meaningful experience kar rahe hain. Bother karne ka darr aise care ko rokh sakta hai jo receive ho jaati. Ek chhota message aksar aapse zyada karta hai.",
      aligned:
        "Aapka reaching out ka hissa aapke circles ke experience se match karta hai. Aap waise connect karte hain jaise chahte hain.",
    },
  },

  "Lets people in, rather than keeping them at a distance": {
    en: {
      higher:
        "You may feel you're open, but your circles may be experiencing a wall you don't feel. The gap often lives in what you share — the surface vs. the real. Letting people in means showing the rooms you usually keep closed.",
      lower:
        "You may think you're closed off, but your circles may be experiencing you as more open than you feel. The vulnerability you judge as insufficient may be landing as trust. You may be letting people in more than you realize.",
      aligned:
        "Your sense of your openness matches your circles' experience. You let people in as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap open hain, par aapke circles shayad ek deewar experience kar rahe hain jo aap feel nahi karte. Gap aksar isme hota hai ki aap kya share karte hain — surface vs. asli. Logon ko andar aane dena matlab woh kamre dikhana jo aap aksar band rakhte hain.",
      lower:
        "Aap shayad sochte hain ki aap closed off hain, par aapke circles shayad aapko aapse zyada open experience kar rahe hain. Jo vulnerability aap insufficient judge karte hain woh trust ke roop mein land ho sakti hai. Aap shayad aapse zyada logon ko andar le aa rahe hain.",
      aligned:
        "Aapka openness ka hissa aapke circles ke experience se match karta hai. Aap logon ko waise andar aane dete hain jaise chahte hain.",
    },
  },

  "Follows up on things people mentioned mattered to them": {
    en: {
      higher:
        "You may feel you follow up, but your circles may be experiencing you forget what mattered. The gap often lives in the return — the 'how did that go' that never comes. Follow-up is the proof that the hearing was real.",
      lower:
        "You may think you fall short, but your circles may be experiencing you as attentive. The follow-ups you do make may be landing more than you realize. The small check-ins often matter more than you feel.",
      aligned:
        "Your sense of your follow-up matches your circles' experience. You return to what mattered as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap follow up karte hain, par aapke circles shayad aapko matter karne wali cheezein bhulta hua experience kar rahe hain. Gap aksar return mein hota hai — 'woh kaisa hua' jo kabhi nahi aata. Follow-up iska proof hai ki sunna asli tha.",
      lower:
        "Aap shayad sochte hain ki aap short padhte hain, par aapke circles shayad aapko attentive experience kar rahe hain. Jo follow-ups aap karte hain woh aapse zyada land kar sakte hain. Chhote check-ins aksar aapse zyada matter karte hain.",
      aligned:
        "Aapka follow-up ka hissa aapke circles ke experience se match karta hai. Aap matter karne wali cheezon par waise wapas aate hain jaise chahte hain.",
    },
  },

  "Shares their own struggles honestly with others": {
    en: {
      higher:
        "You may feel you share, but your circles may be experiencing a polished version. The gap often lives in the editing — the struggles you mention vs. the ones you actually carry. Honesty is felt in the unedited version.",
      lower:
        "You may think you share too much, but your circles may be experiencing you as private. The fear of burdening may be keeping you from the connection you want. Your struggles, shared, often lighten both people.",
      aligned:
        "Your sense of your honesty matches your circles' experience. You share as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap share karte hain, par aapke circles shayad ek polished version experience kar rahe hain. Gap aksar editing mein hota hai — woh struggles jo aap mention karte hain vs. woh jo aap actually carry karte hain. Honesty unedited version mein feel hoti hai.",
      lower:
        "Aap shayad sochte hain ki aap zyada share karte hain, par aapke circles shayad aapko private experience kar rahe hain. Burden karne ka darr aapko us connection se rokh sakta hai jo aap chahte hain. Aapki struggles, shared, aksar dono logon ko halka karte hain.",
      aligned:
        "Aapka honesty ka hissa aapke circles ke experience se match karta hai. Aap utna hi share karte hain jitna chahte hain.",
    },
  },

  // ── Reliability ────────────────────────────────────────────
  "Arrives on time to agreed meetings": {
    en: {
      higher:
        "You may feel you're on time, but your circles may be experiencing you as late. The gap often lives in the definition — 'close enough' vs. 'when we said.' Punctuality is respect measured in minutes.",
      lower:
        "You may judge yourself for lateness your circles don't experience. The inner pressure to be perfect may be louder than the external record. You may be more punctual than you give yourself credit for.",
      aligned:
        "Your sense of your punctuality matches your circles' experience. You arrive as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap time par hain, par aapke circles shayad aapko late experience kar rahe hain. Gap aksar definition mein hota hai — 'close enough' vs. 'jab humne kaha.' Punctuality minutes mein measure kiya gaya respect hai.",
      lower:
        "Aap shayad us lateness ke liye khud ko judge karte hain jo aapke circles experience nahi karte. Perfect hone ka inner pressure external record se zyada loud ho sakta hai. Aap apne hisse se zyada punctual ho sakte hain.",
      aligned:
        "Aapka punctuality ka hissa aapke circles ke experience se match karta hai. Aap waise aate hain jaise chahte hain.",
    },
  },

  "Responds to messages within a reasonable timeframe": {
    en: {
      higher:
        "You may feel you respond, but your circles may be experiencing delays you don't notice. The gap often lives in the backlog — the messages you 'saw' but didn't answer. Responsiveness is measured by the sender, not the receiver.",
      lower:
        "You may think you're slow, but your circles may be experiencing you as responsive. The self-criticism about latency may not match the external experience. You may be more reachable than you feel.",
      aligned:
        "Your sense of your responsiveness matches your circles' experience. You reply as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap respond karte hain, par aapke circles shayad delays experience kar rahe hain jo aap notice nahi karte. Gap aksar backlog mein hota hai — woh messages jo aapne 'dekhe' par jawab nahi diya. Responsiveness sender se measure hota hai, receiver se nahi.",
      lower:
        "Aap shayad sochte hain ki aap slow hain, par aapke circles shayad aapko responsive experience kar rahe hain. Latency ke baare mein self-criticism external experience se match nahi karni chahiye. Aap aapse zyada reachable ho sakte hain.",
      aligned:
        "Aapka responsiveness ka hissa aapke circles ke experience se match karta hai. Aap utna hi reply karte hain jitna chahte hain.",
    },
  },

  "Keeps information shared in confidence private": {
    en: {
      higher:
        "You may feel you're discreet, but your circles may be experiencing leaks you don't intend. The gap often lives in the 'I thought you knew' — the small disclosures that feel harmless but aren't. Confidence is kept in the details.",
      lower:
        "You may think you slip, but your circles may be experiencing you as a vault. The anxiety about having shared too much may not match what others actually received. You may be more trusted than you feel.",
      aligned:
        "Your sense of your discretion matches your circles' experience. You keep confidence as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap discreet hain, par aapke circles shayad leaks experience kar rahe hain jo aap intend nahi karte. Gap aksar 'maine socha tumhe pata hai' mein hota hai — woh chhote disclosures jo harmless lagte hain par nahi hote. Confidence details mein rakha jaata hai.",
      lower:
        "Aap shayad sochte hain ki aap slip karte hain, par aapke circles shayad aapko vault experience kar rahe hain. Zyada share karne ki anxiety usse match nahi karni chahiye jo dusron ne actually receive kiya. Aap aapse zyada trusted ho sakte hain.",
      aligned:
        "Aapka discretion ka hissa aapke circles ke experience se match karta hai. Aap confidence waise rakhte hain jaise chahte hain.",
    },
  },

  "Adapts their plans when circumstances change": {
    en: {
      higher:
        "You may feel you adapt, but your circles may be experiencing you as rigid. The gap often lives in the speed — the adaptation that happens, but late. Flexibility is measured by when, not just whether.",
      lower:
        "You may think you're inflexible, but your circles may be experiencing you as adaptable. The self-criticism about stubbornness may not match the external record. You may bend more than you give yourself credit for.",
      aligned:
        "Your sense of your adaptability matches your circles' experience. You adjust as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap adapt karte hain, par aapke circles shayad aapko rigid experience kar rahe hain. Gap aksar speed mein hota hai — adaptation jo hoti hai, par late. Flexibility isse measure hoti hai ki kab, na ki sirf kya.",
      lower:
        "Aap shayad sochte hain ki aap inflexible hain, par aapke circles shayad aapko adaptable experience kar rahe hain. Stubbornness ke baare mein self-criticism external record se match nahi karni chahiye. Aap apne hisse se zyada bend karte hain.",
      aligned:
        "Aapka adaptability ka hissa aapke circles ke experience se match karta hai. Aap waise adjust karte hain jaise chahte hain.",
    },
  },

  "Does what they said they would do, by when they said they would": {
    en: {
      higher:
        "You may feel you deliver, but your circles may be experiencing slips you rationalize. The gap often lives in the renegotiation — the deadline that moved without the conversation. Delivery is measured by the original promise, not the revised one.",
      lower:
        "You may judge yourself harshly for misses your circles don't track. The inner accountant may be stricter than the external one. You may be delivering more reliably than you feel.",
      aligned:
        "Your sense of your delivery matches your circles' experience. You do what you say, when you say.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap deliver karte hain, par aapke circles shayad slips experience kar rahe hain jo aap rationalize karte hain. Gap aksar renegotiation mein hota hai — deadline jo bina baat-cheet ke move hui. Delivery original promise se measure hota hai, revised se nahi.",
      lower:
        "Aap shayad un misses ke liye khud ko harshly judge karte hain jo aapke circles track nahi karte. Inner accountant external se zyada strict ho sakta hai. Aap aapse zyada reliably deliver kar sakte hain.",
      aligned:
        "Aapka delivery ka hissa aapke circles ke experience se match karta hai. Aap wahi karte hain jo kehte hain, jab kehte hain.",
    },
  },

  "Can be counted on to follow through, even when it is hard": {
    en: {
      higher:
        "You may feel you follow through, but your circles may be experiencing you as reliable when it's easy. The gap often lives in the hard moments — the ones where the cost of following through makes you reconsider. Reliability is proven in the inconvenient.",
      lower:
        "You may think you fall short, but your circles may be experiencing you as dependable. The hard moments you beat yourself up for may be the ones they didn't notice. You may be more counted-on than you feel.",
      aligned:
        "Your sense of your follow-through matches your circles' experience. You can be counted on as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap follow through karte hain, par aapke circles shayad aapko easy hone par reliable experience kar rahe hain. Gap aksar hard moments mein hota hai — woh jahan follow through karne ki cost aapko reconsider karwa deti hai. Reliability inconvenient mein prove hoti hai.",
      lower:
        "Aap shayad sochte hain ki aap short padte hain, par aapke circles shayad aapko dependable experience kar rahe hain. Hard moments jinke liye aap khud ko maarte hain woh ho sakte hain jinhe unhone notice nahi kiya. Aap aapse zyada counted-on ho sakte hain.",
      aligned:
        "Aapka follow-through ka hissa aapke circles ke experience se match karta hai. Aap utne hi count-on ho sakte hain jitna chahte hain.",
    },
  },

  "Flags problems early rather than waiting": {
    en: {
      higher:
        "You may feel you flag, but your circles may be experiencing you raise things late. The gap often lives in the threshold — what feels 'worth mentioning' to you vs. to them. Early is a judgment call, and the thresholds differ.",
      lower:
        "You may think you're noisy, but your circles may be experiencing you as measured. The fear of crying wolf may be holding back signals that would help. An early flag, even a false one, often costs less than a late one.",
      aligned:
        "Your sense of your flagging matches your circles' experience. You raise problems as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap flag karte hain, par aapke circles shayad aapko late raise karta hua experience kar rahe hain. Gap aksar threshold mein hota hai — aapko jo 'mention karne layak' lagta hai vs. unhe. Early ek judgment call hai, aur thresholds alag hote hain.",
      lower:
        "Aap shayad sochte hain ki aap noisy hain, par aapke circles shayad aapko measured experience kar rahe hain. Crying wolf ka darr aise signals rokh sakta hai jo help karenge. Ek early flag, bhale hi false ho, aksar late flag se kam cost karta hai.",
      aligned:
        "Aapka flagging ka hissa aapke circles ke experience se match karta hai. Aap problems waise raise karte hain jaise chahte hain.",
    },
  },

  "Communicates proactively when overwhelmed": {
    en: {
      higher:
        "You may feel you communicate, but your circles may be experiencing you go quiet. The gap often lives in the 'I can handle it' — the private struggle that doesn't become a shared signal. Proactivity means before, not after.",
      lower:
        "You may think you over-communicate, but your circles may be experiencing you as private. The fear of seeming weak may be holding back context that would help. Saying 'I'm stretched' often prevents the stretch from becoming a break.",
      aligned:
        "Your sense of your communication matches your circles' experience. You speak up as you intend.",
    },
    hinglish: {
      higher:
        "Aap shayad feel karte hain ki aap communicate karte hain, par aapke circles shayad aapko chup ho jaata hua experience kar rahe hain. Gap aksar 'main handle kar lunga' mein hota hai — woh private struggle jo shared signal nahi banti. Proactivity ka matlab pehle hai, baad mein nahi.",
      lower:
        "Aap shayad sochte hain ki aap over-communicate karte hain, par aapke circles shayad aapko private experience kar rahe hain. Weak lagne ka darr aise context ko rokh sakta hai jo help karega. 'Main stretched hoon' kehna aksar stretch ko break hone se rok deta hai.",
      aligned:
        "Aapka communication ka hissa aapke circles ke experience se match karta hai. Aap waise bolte hain jaise chahte hain.",
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
