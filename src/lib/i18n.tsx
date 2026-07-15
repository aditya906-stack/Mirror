"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// Mirror i18n — English + Hinglish (conversational Roman Hindi).
//
// Hinglish is not formal Hindi. It is how people actually talk and text
// in India — a natural mix of Hindi and English in Roman script.
// "Aaina judge nahi karta" — not "दर्पण न्याय नहीं करता।"
//
// The locale is client-side only (no URL routing) because Mirror is a
// single-route app with view-state navigation. Persisted in localStorage.

export type Locale = "en" | "hinglish";

// ── Dictionaries ────────────────────────────────────────────
// Flat keys, dot-separated by view. Simple and fast.

const en: Record<string, string> = {
  // ── Header / nav ──
  "nav.select": "Select",
  "nav.self": "Self",
  "nav.invite": "Invite",
  "nav.report": "Report",
  "nav.signout": "Sign out",
  "nav.signoutConfirm": "Sign out? Your data remains. You can sign back in anytime.",
  "nav.lang": "EN",

  // ── Footer ──
  "footer.quote": "“The mirror does not judge. It reflects.”",
  "footer.pact": "Confidential · Observable · Without judgment",

  // ── Landing ──
  "landing.tagline1": "The mirror does not judge.",
  "landing.tagline2": "It reflects.",
  "landing.body":
    "Mirror is an instrument that measures the distance between how you see yourself and how the people around you experience you. It does not label you. It does not advise you. It shows you the gap — and lets you sit with it.",
  "landing.step1.t": "You rate yourself",
  "landing.step1.d":
    "On observable behaviors. How often do you interrupt? How often do you follow through? Frequency, not identity.",
  "landing.step2.t": "Your circles observe you",
  "landing.step2.d":
    "People from your Work, Family, and Friends circles answer the same questions — confidentially. We know the circle. We never reveal the individual.",
  "landing.step3.t": "Mirror shows the gap",
  "landing.step3.d":
    "The mathematical distance between self-perception and external reality. No red. No green. No verdict. Only what was observed.",
  "landing.not": "What this is not.",
  "landing.not1": "Not a personality test. No labels, no types, no diagnoses.",
  "landing.not2": "Not therapy. No advice, no healing, no “you should work on this.”",
  "landing.not3":
    "Not anonymous. It is confidential. We know which circle the feedback came from. We hide who said it.",
  "landing.begin": "Begin",
  "landing.beginSub": "Look into the mirror",
  "landing.time": "Takes about four minutes of your time",

  // ── Auth ──
  "auth.signup.tag": "Create your mirror",
  "auth.signin.tag": "Return to your mirror",
  "auth.signup.h": "Begin the reflection",
  "auth.signin.h": "Welcome back",
  "auth.signup.body":
    "Choose a username and password. Your name will appear on the invitations you send, so your circles know who they are observing.",
  "auth.signin.body": "Sign in with your username to continue where you left off.",
  "auth.name": "Your name",
  "auth.namePlaceholder": "As others know you",
  "auth.username": "Username",
  "auth.usernamePlaceholder": "How you'll sign in",
  "auth.password": "Password",
  "auth.passwordPlaceholderSignup": "At least 6 characters",
  "auth.passwordPlaceholderSignin": "••••••••",
  "auth.back": "← Back",
  "auth.signup.btn": "Create account",
  "auth.signin.btn": "Sign in",
  "auth.loading": "One moment…",
  "auth.signup.toggle": "Already have an account?",
  "auth.signin.toggle": "New to Mirror?",
  "auth.signup.toggleLink": "Sign in",
  "auth.signin.toggleLink": "Create one",
  "auth.errRequired": "Username and password are required.",
  "auth.errName":
    "Your name is needed — circles need to know who they're observing.",
  "auth.signupSuccess": "Account created.",
  "auth.signinSuccess": "Welcome back, {name}.",

  // ── Behaviors ──
  "behaviors.tag": "Step 02 — The instrument",
  "behaviors.h": "What should be observed?",
  "behaviors.body":
    "These are observable behaviors — things others can witness and count. Choose the ones you want reflected back to you. You will rate yourself on each, and so will your circles.",
  "behaviors.min": "Select at least {n}. Most people choose 8–12.",
  "behaviors.behaviors": "behaviors",
  "behaviors.selected": "selected",
  "behaviors.back": "← Back",
  "behaviors.continue": "Continue",
  "behaviors.saving": "Saving…",
  "behaviors.loading": "Loading the instrument…",
  "behaviors.errMin": "Select at least {n} behaviors.",
  "behaviors.errLoad": "Could not load the behavioral instrument.",
  "behaviors.errSave": "Could not save.",

  // ── Self-assessment ──
  "self.tag": "Step 03 — Self-perception",
  "self.h": "How do you see yourself?",
  "self.body":
    "Answer each question honestly. Some ask how often you do something, some ask you to react to a situation, some ask whether a statement fits. There are no right answers — only what you believe to be true of you.",
  "self.answered": "of {total} answered",
  "self.back": "← Back",
  "self.continue": "Continue",
  "self.saving": "Saving…",
  "self.loading": "Loading…",
  "self.errComplete": "Answer every question to continue.",
  "self.errSave": "Could not save.",
  "self.errLoad": "Could not load your assessment.",
  "self.empty": "You haven't selected any behaviors yet.",
  "self.emptyLink": "Choose behaviors →",
  "self.success": "Self-assessment recorded.",
  // Question formats
  "q.frequency.self": "How often does this describe you?",
  "q.frequency.other": "How often does {name} do this?",
  "q.agreement": "How much do you agree?",
  "q.scenario": "A scenario",

  // ── Invite ──
  "invite.tag": "Step 04 — External reality",
  "invite.h": "Invite your circles.",
  "invite.body":
    "Send a confidential link to people in your life. They will answer the same questions about you — but they will never see your self-assessment, and you will never see who said what.",
  "invite.confNote":
    "Confidential, not anonymous. Mirror records which circle each response came from — that context gives the data meaning. But the identity of each individual is hidden from you in the final report.",
  "invite.prepare": "Prepare an invitation",
  "invite.theirName": "Their name",
  "invite.namePlaceholder": "e.g. Maya, my manager",
  "invite.nameHint": "A label only you see. Helps you track who you invited.",
  "invite.circle": "Circle",
  "invite.prepareBtn": "Prepare invitation",
  "invite.work": "Work",
  "invite.workDesc": "Colleagues, managers, reports. People who see you under professional pressure.",
  "invite.family": "Family",
  "invite.familyDesc": "Partner, parents, siblings. People who have known you longest.",
  "invite.friends": "Friends",
  "invite.friendsDesc": "Close friends. People who see you when you are most yourself.",
  "invite.invitations": "Invitations",
  "invite.returned": "of {n} returned",
  "invite.loading": "Loading…",
  "invite.empty": "No invitations yet. Prepare one above.",
  "invite.copyLink": "Copy link",
  "invite.copied": "Copied",
  "invite.withdraw": "Withdraw",
  "invite.withdrawConfirm": "Withdraw this invitation? Any submitted feedback will be removed.",
  "invite.responses": "{n} responses",
  "invite.pending": "pending",
  "invite.responsesReceived": "responses received",
  "invite.back": "← Back",
  "invite.viewReport": "View report",
  "invite.continue": "Continue",
  "invite.errName": "Enter a name for this person.",
  "invite.errLoad": "Could not load invitations.",
  "invite.errAdd": "Could not add.",
  "invite.successPrepared": "Invitation prepared for {name}.",
  "invite.successCopied": "Link copied to clipboard.",
  "invite.errCopy": "Could not copy. Here is the link: {url}",
  "invite.successWithdrawn": "Invitation withdrawn.",
  "invite.errWithdraw": "Could not withdraw.",

  // ── Report ──
  "report.tag": "The Mirror Report",
  "report.meta": "{n} behaviors reflected · observed by {p} people across {c} circles.",
  "report.loading": "Preparing your reflection…",
  "report.errLoad": "Could not load your report.",
  "report.refresh": "Refresh",
  "report.invitations": "← Invitations",
  // Empty states
  "report.noSelf.h": "You haven't rated yourself yet.",
  "report.noSelf.d": "Complete your self-assessment to begin the reflection.",
  "report.noSelf.btn": "Rate yourself",
  "report.noFeedback.h": "Your circles have not yet responded.",
  "report.noFeedback.d":
    "Your self-perception is recorded. Once your circles return their observations, the gaps will appear here.",
  "report.noFeedback.btn": "Manage invitations",
  // Summary
  "report.reflection": "The reflection",
  "report.selfAvg": "How you see yourself",
  "report.extAvg": "How your circles see you",
  "report.onAverage": "on average",
  "report.dirAligned":
    "Across the behaviors you chose, your self-perception and what your circles observe are close — within {gap} points on average. {aligned} of your {total} behaviors are aligned.",
  "report.dirHigher":
    "On average, you see yourself {gap} points higher than your circles observe. {count} of your behaviors show this pattern — you rate yourself higher than what others experience.",
  "report.dirLower":
    "On average, your circles observe you {gap} points higher than you rate yourself. {count} of your behaviors show this pattern — others see more in you than you see in yourself.",
  "report.widest":
    "The widest distance is in {behavior}. You rated yourself {self}; your circles observed {ext}.",
  // Worth sitting with
  "report.worthSitting": "Worth sitting with",
  "report.worthLine":
    "You rated yourself {self}. Your circles observe {ext}. {nudge}",
  "report.nudgeHigher": "Your circles see more of this in you than you do in yourself.",
  "report.nudgeLower": "You see more of this in yourself than your circles observe.",
  "report.nudgeAligned": "This is close to aligned — the distance here is small.",
  // By category
  "report.whereDistance": "Where the distance lives",
  "report.behaviorsCount": "{n} behaviors",
  "report.behaviorCount": "{n} behavior",
  "report.categoryNote":
    "A positive number means your circles observe more of a behavior than you perceive. A negative number means they observe less.",
  // Books
  "report.books.h": "Readers whose reflections showed a similar pattern",
  "report.books.h2": " often sat with",
  "report.booksNote":
    "Not a prescription. Just what others in a similar place have found worth their time.",
  // Full reflection
  "report.seeFull": "See every behavior, one by one",
  "report.seeFullD":
    "The full reflection — {n} behaviors with self, observed, and the gap between.",
  "report.fullReflection": "The full reflection",
  "report.fullIntro":
    "Each behavior is shown with the distance between how you rated yourself and how your circles observed you. The largest distances come first.",
  // Behavior detail
  "report.detail.self": "Self",
  "report.detail.observed": "Observed",
  "report.detail.gap": "Gap",
  "report.detail.byCircle": "By circle",
  "report.detail.dirMore": "Observed more than you perceive",
  "report.detail.dirLess": "Observed less than you perceive",
  "report.detail.dirAligned": "Aligned with your self-perception",
  // By circle
  "report.byCircle": "By circle",
  "report.responded": "{completed} of {invited} responded",
  // Closing
  "report.closing":
    "This is what was observed. The mirror does not say what it means, or what you should do. That is yours to sit with.",

  // ── Feedback ──
  "feedback.tag": "Confidential observation",
  "feedback.h": "How do you experience {name}?",
  "feedback.body":
    "You have been invited to observe {name} as part of their {circle} circle. Answer honestly, based on what you have actually witnessed.",
  "feedback.confNote":
    "This is confidential. {name} will see that this feedback came from their {circle} circle, but will never see that it came from you specifically. Your honesty is protected.",
  "feedback.loading": "Opening the invitation…",
  "feedback.errH": "Link not found",
  "feedback.err": "This link could not be loaded.",
  "feedback.done.h": "Thank you.",
  "feedback.done.body":
    "Your observations of {name} have been recorded. They will appear in {name}'s Mirror report as part of the {circle} circle — confidentially. Your individual identity will not be shown.",
  "feedback.done.closing": "You have offered an honest reflection. That is a quiet gift.",
  "feedback.errComplete": "Please answer every question.",
  "feedback.submit": "Submit in confidence",
  "feedback.submitting": "Submitting…",
  "feedback.success": "Thank you. Your observations have been recorded.",
  "feedback.errSubmit": "Could not submit.",
  "feedback.ofTotal": "of {total} answered",
};

const hinglish: Record<string, string> = {
  // ── Header / nav ──
  "nav.select": "Chuno",
  "nav.self": "Khud",
  "nav.invite": "Bulao",
  "nav.report": "Report",
  "nav.signout": "Sign out",
  "nav.signoutConfirm": "Sign out karu? Data rehta hai. Kabhi bhi wapas login kar sakte ho.",
  "nav.lang": "Hinglish",

  // ── Footer ──
  "footer.quote": "“Aaina judge nahi karta. Woh reflect karta hai.”",
  "footer.pact": "Confidential · Observable · Bina judgment ke",

  // ── Landing ──
  "landing.tagline1": "Aaina judge nahi karta.",
  "landing.tagline2": "Woh reflect karta hai.",
  "landing.body":
    "Mirror ek aisa instrument hai jo napta hai ki aap khud ko jaise dekhte ho aur log aapko jaise experience karte hain — uske beech ka distance. Yeh aapko label nahi karta. Advice nahi deta. Bas gap dikhata hai — aur aapko uske saath baithne deta hai.",
  "landing.step1.t": "Aap khud ko rate karte ho",
  "landing.step1.d":
    "Observable behaviors pe. Aap kitni baar interrupt karte ho? Kitni baar follow through karte ho? Frequency, identity nahi.",
  "landing.step2.t": "Aapke circles aapko observe karte hain",
  "landing.step2.d":
    "Aapke Work, Family, aur Friends circle ke log same sawaalon ke jawab dete hain — confidentially. Circle pata hai. Individual kabhi reveal nahi hota.",
  "landing.step3.t": "Mirror gap dikhata hai",
  "landing.step3.d":
    "Self-perception aur external reality ke beech ka mathematical distance. Na red. Na green. Na verdict. Bas jo observe hua.",
  "landing.not": "Yeh kya nahi hai.",
  "landing.not1": "Personality test nahi. Koi labels nahi, koi types nahi, koi diagnosis nahi.",
  "landing.not2": "Therapy nahi. Koi advice nahi, koi healing nahi, koi “yeh work karo” nahi.",
  "landing.not3":
    "Anonymous nahi. Confidential hai. Pata hai feedback kis circle se aaya. Kaun bola, chhupa hai.",
  "landing.begin": "Shuru karein",
  "landing.beginSub": "Aaine mein dekho",
  "landing.time": "Bas chaar minute lagte hain",

  // ── Auth ──
  "auth.signup.tag": "Apna mirror banao",
  "auth.signin.tag": "Apne mirror par wapas",
  "auth.signup.h": "Reflection shuru karo",
  "auth.signin.h": "Wapas aagaye",
  "auth.signup.body":
    "Username aur password chuno. Aapka naam invitations pe dikhaga, taaki circles ko pata chale ki unhe kisko observe karna hai.",
  "auth.signin.body": "Username se sign in karo, jahan chhoda tha wahan se.",
  "auth.name": "Aapka naam",
  "auth.namePlaceholder": "Jaise log aapko jaante hain",
  "auth.username": "Username",
  "auth.usernamePlaceholder": "Jaise sign in karoge",
  "auth.password": "Password",
  "auth.passwordPlaceholderSignup": "Kam se kam 6 characters",
  "auth.passwordPlaceholderSignin": "••••••••",
  "auth.back": "← Wapas",
  "auth.signup.btn": "Account banao",
  "auth.signin.btn": "Sign in",
  "auth.loading": "Ek minute…",
  "auth.signup.toggle": "Pehle se account hai?",
  "auth.signin.toggle": "Mirror pe naye ho?",
  "auth.signup.toggleLink": "Sign in",
  "auth.signin.toggleLink": "Banao",
  "auth.errRequired": "Username aur password dono chahiye.",
  "auth.errName":
    "Naam chahiye — circles ko pata hona chahiye ki kisko observe kar rahe hain.",
  "auth.signupSuccess": "Account ban gaya.",
  "auth.signinSuccess": "Wapas aagaye, {name}.",

  // ── Behaviors ──
  "behaviors.tag": "Step 02 — Instrument",
  "behaviors.h": "Kya observe kiya jaye?",
  "behaviors.body":
    "Yeh observable behaviors hain — cheezein jo log dekh aur gin sakte hain. Jo behaviors aap reflect karwana chahte ho chuno. Har ek pe aap khud ko rate karoge, aur aapke circles bhi.",
  "behaviors.min": "Kam se kam {n} chuno. Log aamtaur par 8–12 chunte hain.",
  "behaviors.behaviors": "behaviors",
  "behaviors.selected": "chune hue",
  "behaviors.back": "← Wapas",
  "behaviors.continue": "Aage badho",
  "behaviors.saving": "Save ho raha hai…",
  "behaviors.loading": "Instrument load ho raha hai…",
  "behaviors.errMin": "Kam se kam {n} behaviors chuno.",
  "behaviors.errLoad": "Behavioral instrument load nahi hua.",
  "behaviors.errSave": "Save nahi hua.",

  // ── Self-assessment ──
  "self.tag": "Step 03 — Self-perception",
  "self.h": "Khud ko kaise dekhte ho?",
  "self.body":
    "Har sawaal ka imandaari se jawab do. Kuch poochte hain kitni baar kuch karte ho, kuch ek situation pe react karne ko kehte hain, kuch poochte hain ek statement aap pe fit baithti ya nahi. Koi sahi jawab nahi hai — bas jo aapko apne baare mein sacha lagta hai.",
  "self.answered": "{total} mein se",
  "self.back": "← Wapas",
  "self.continue": "Aage badho",
  "self.saving": "Save ho raha hai…",
  "self.loading": "Load ho raha hai…",
  "self.errComplete": "Aage badhne ke liye har sawaal ka jawab do.",
  "self.errSave": "Save nahi hua.",
  "self.errLoad": "Assessment load nahi hua.",
  "self.empty": "Abhi tak koi behavior select nahi kiya.",
  "self.emptyLink": "Behaviors chuno →",
  "self.success": "Self-assessment record ho gaya.",
  // Question formats
  "q.frequency.self": "Yeh aapko kitni baar describe karta hai?",
  "q.frequency.other": "{name} yeh kitni baar karte hain?",
  "q.agreement": "Kitna agree karte ho?",
  "q.scenario": "Ek situation",

  // ── Invite ──
  "invite.tag": "Step 04 — External reality",
  "invite.h": "Apne circles bulao.",
  "invite.body":
    "Apni life ke logon ko ek confidential link bhejo. Woh aapke baare mein same sawaalon ke jawab denge — par unhe aapki self-assessment kabhi nahi dikhegi, aur aapko kabhi pata nahi chalega ki kise ne kya kaha.",
  "invite.confNote":
    "Confidential, anonymous nahi. Mirror record karta hai ki feedback kis circle se aaya — yeh context data ko meaning deta hai. Par individual ki identity aapse chhupi rehti hai final report mein.",
  "invite.prepare": "Invitation taiyaar karo",
  "invite.theirName": "Unka naam",
  "invite.namePlaceholder": "jaise Maya, meri manager",
  "invite.nameHint": "Sirf aapko dikhta hai. Track karne mein madad karta hai.",
  "invite.circle": "Circle",
  "invite.prepareBtn": "Invitation taiyaar karo",
  "invite.work": "Work",
  "invite.workDesc": "Colleagues, managers, reports. Log jo professional pressure mein aapko dekhte hain.",
  "invite.family": "Family",
  "invite.familyDesc": "Partner, parents, siblings. Log jo aapko sabse lambe se jaante hain.",
  "invite.friends": "Friends",
  "invite.friendsDesc": "Close friends. Log jo aapko dekhte hain jab aap sabse khud hote ho.",
  "invite.invitations": "Invitations",
  "invite.returned": "{n} mein se wapas aaye",
  "invite.loading": "Load ho raha hai…",
  "invite.empty": "Abhi koi invitation nahi. Upar ek taiyaar karo.",
  "invite.copyLink": "Link copy karo",
  "invite.copied": "Copy ho gaya",
  "invite.withdraw": "Wapas lo",
  "invite.withdrawConfirm": "Yeh invitation wapas lu? Jo feedback aaya hai woh bhi hatega.",
  "invite.responses": "{n} responses",
  "invite.pending": "pending",
  "invite.responsesReceived": "responses aa gaye",
  "invite.back": "← Wapas",
  "invite.viewReport": "Report dekho",
  "invite.continue": "Aage badho",
  "invite.errName": "Is insaan ke liye ek naam likho.",
  "invite.errLoad": "Invitations load nahi hue.",
  "invite.errAdd": "Add nahi hua.",
  "invite.successPrepared": "{name} ke liye invitation taiyaar.",
  "invite.successCopied": "Link clipboard pe copy ho gaya.",
  "invite.errCopy": "Copy nahi hua. Yeh raha link: {url}",
  "invite.successWithdrawn": "Invitation wapas le liya.",
  "invite.errWithdraw": "Wapas nahi le paaye.",

  // ── Report ──
  "report.tag": "Mirror Report",
  "report.meta": "{n} behaviors reflect hue · {p} logon ne observe kiya {c} circles mein.",
  "report.loading": "Reflection taiyaar ho rahi hai…",
  "report.errLoad": "Report load nahi hua.",
  "report.refresh": "Refresh",
  "report.invitations": "← Invitations",
  // Empty states
  "report.noSelf.h": "Abhi tak khud ko rate nahi kiya.",
  "report.noSelf.d": "Reflection shuru karne ke lipe self-assessment complete karo.",
  "report.noSelf.btn": "Khud ko rate karo",
  "report.noFeedback.h": "Aapke circles ka abhi tak response nahi aaya.",
  "report.noFeedback.d":
    "Self-perception record ho gayi hai. Jab circles apni observations bhejenge, tab gaps yahan dikhenge.",
  "report.noFeedback.btn": "Invitations manage karo",
  // Summary
  "report.reflection": "Reflection",
  "report.selfAvg": "Aap khud ko jaise dekhte ho",
  "report.extAvg": "Aapke circles aapko jaise dekhte hain",
  "report.onAverage": "average mein",
  "report.dirAligned":
    "Jo behaviors aapne chune, usme aapki self-perception aur circles jo observe karte hain — kareeb hain, average mein {gap} points ke andar. Aapke {total} behaviors mein se {aligned} aligned hain.",
  "report.dirHigher":
    "Average mein, aap khud ko {gap} points zyada dekhte ho compare mein circles ke. Aapke {count} behaviors mein yeh pattern hai — aap khud ko zyada rate karte ho jo log experience karte hain usse.",
  "report.dirLower":
    "Average mein, aapke circles aapko {gap} points zyada dekhte hain jo aap khud ko rate karte ho usse. Aapke {count} behaviors mein yeh pattern hai — log aapme zyada dekhte hain jo aap khud mein dekhte ho.",
  "report.widest":
    "Sabse zyada distance {behavior} mein hai. Aapne khud ko {self} rate kiya; circles ne {ext} observe kiya.",
  // Worth sitting with
  "report.worthSitting": "Sochne layak",
  "report.worthLine":
    "Aapne khud ko {self} rate kiya. Circles ne {ext} observe kiya. {nudge}",
  "report.nudgeHigher": "Circles aapme yeh aapse zyada dekhte hain jo aap khud mein dekhte ho.",
  "report.nudgeLower": "Aap aapme yeh zyada dekhte ho jo circles observe karte hain usse.",
  "report.nudgeAligned": "Yeh kareeb aligned hai — distance yahan chhota hai.",
  // By category
  "report.whereDistance": "Distance kahan hai",
  "report.behaviorsCount": "{n} behaviors",
  "report.behaviorCount": "{n} behavior",
  "report.categoryNote":
    "Positive number ka matlab circles aapme behavior zyada observe karte hain jo aap perceive karte ho usse. Negative ka matlab woh kam observe karte hain.",
  // Books
  "report.books.h": "Jin readers ki reflection mein similar pattern tha",
  "report.books.h2": " woh aksar inke saath baithe",
  "report.booksNote":
    "Prescription nahi. Bas jo log similar jagah pe the unka time isme worth tha.",
  // Full reflection
  "report.seeFull": "Har behavior, ek-ek karke dekho",
  "report.seeFullD":
    "Full reflection — {n} behaviors, self, observed, aur beech ka gap.",
  "report.fullReflection": "Full reflection",
  "report.fullIntro":
    "Har behavior dikhaya gaya hai — aapne khud ko jaise rate kiya aur circles ne jaise observe kiya, uske beech ka distance. Sabse bade distance pehle.",
  // Behavior detail
  "report.detail.self": "Self",
  "report.detail.observed": "Observed",
  "report.detail.gap": "Gap",
  "report.detail.byCircle": "Circle ke hisaab se",
  "report.detail.dirMore": "Aapke perceive karne se zyada observe hua",
  "report.detail.dirLess": "Aapke perceive karne se kam observe hua",
  "report.detail.dirAligned": "Self-perception ke saath aligned",
  // By circle
  "report.byCircle": "Circle ke hisaab se",
  "report.responded": "{invited} mein se {completed} ne respond kiya",
  // Closing
  "report.closing":
    "Yeh jo observe hua. Aaina nahi kehta iska kya matlab hai, ya aapko kya karna chahiye. Woh aapke baithne ke liye hai.",

  // ── Feedback ──
  "feedback.tag": "Confidential observation",
  "feedback.h": "Aap {name} ko kaise experience karte ho?",
  "feedback.body":
    "Aapko {name} ko observe karne ke liye bulaya gaya hai, unke {circle} circle ke hisse mein. Imandaari se jawab do, jo aapne sach mein dekha hai uske basis pe.",
  "feedback.confNote":
    "Yeh confidential hai. {name} ko pata chalega ki yeh feedback unke {circle} circle se aaya, par kabhi pata nahi chalega ki kisi se aaya. Aapki honesty protected hai.",
  "feedback.loading": "Invitation khul raha hai…",
  "feedback.errH": "Link nahi mila",
  "feedback.err": "Yeh link load nahi hua.",
  "feedback.done.h": "Thank you.",
  "feedback.done.body":
    "{name} ke baare mein aapki observations record ho gayi. Yeh {name} ki Mirror report mein {circle} circle ke hisse mein aayegi — confidentially. Aapki individual identity nahi dikhegi.",
  "feedback.done.closing": "Aapne ek imandaar reflection di. Yeh ek chuppa tohfa hai.",
  "feedback.errComplete": "Har sawaal ka jawab do please.",
  "feedback.submit": "Confidentially submit karo",
  "feedback.submitting": "Submit ho raha hai…",
  "feedback.success": "Thank you. Aapki observations record ho gayi.",
  "feedback.errSubmit": "Submit nahi hua.",
  "feedback.ofTotal": "{total} mein se",
};

const dicts: Record<Locale, Record<string, string>> = { en, hinglish };

// ── Context ─────────────────────────────────────────────────

type I18nContext = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const Ctx = createContext<I18nContext | null>(null);

const STORAGE_KEY = "mirror:locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "hinglish" ? "hinglish" : "en";
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const dict = dicts[locale];
      let str = dict[key] ?? dicts.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return str;
    },
    [locale]
  );

  return (
    <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>
  );
}

export function useI18n(): I18nContext {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}

// Convenience hook — just the `t` function.
export function useT() {
  return useI18n().t;
}
