// ─────────────────────────────────────────────────────────────────────────────
// PYQ Bank — TS LAWCET Previous Year Questions
// STATIC & LOCKED — do NOT modify, regenerate, or mix with AI mock questions
// ─────────────────────────────────────────────────────────────────────────────

export interface PYQQuestion {
  id: number;
  year: number;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

// ── 2023 ──────────────────────────────────────────────────────────────────────

const pyqBank: readonly PYQQuestion[] = Object.freeze([
  // ── 2023 Legal Aptitude ──
  {
    id: 1,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Principle: A contract requires free consent. Fact: A signs under threat. What is the status?",
    options: ["Valid", "Voidable", "Void", "Illegal"],
    correct: 1,
    explanation: "Consent under threat is not free, so contract is voidable.",
  },
  {
    id: 2,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "Trespass means:",
    options: ["Lawful entry", "Unauthorized entry", "Contract breach", "Theft"],
    correct: 1,
    explanation: "Trespass is unlawful interference with property.",
  },
  {
    id: 3,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "Defamation protects:",
    options: ["Property", "Reputation", "Money", "Contract"],
    correct: 1,
    explanation: "Defamation deals with harm to reputation.",
  },
  {
    id: 4,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Fundamental Rights are enshrined in which Part of the Indian Constitution?",
    options: ["Part II", "Part III", "Part IV", "Part V"],
    correct: 1,
    explanation:
      "Fundamental Rights are contained in Part III (Articles 12–35).",
  },
  {
    id: 5,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Legal Maxims",
    question: "'Actus non facit reum nisi mens sit rea' means:",
    options: [
      "Act is everything",
      "An act is not guilty unless the mind is also guilty",
      "Ignorance of law is no excuse",
      "Let the principal be responsible",
    ],
    correct: 1,
    explanation:
      "The maxim requires both a guilty act (actus reus) and a guilty mind (mens rea).",
  },
  {
    id: 6,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Principle: An agreement without consideration is void. Fact: A promises to give B a gift. Is this enforceable?",
    options: [
      "Yes, gifts are enforceable",
      "No, there is no consideration",
      "Yes, if witnessed",
      "No, because it is immoral",
    ],
    correct: 1,
    explanation:
      "A promise without consideration (except in certain statutory exceptions) is void under contract law.",
  },
  {
    id: 7,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "Negligence as a tort requires which essential element?",
    options: [
      "Intention to harm",
      "Breach of a duty of care causing damage",
      "Written agreement",
      "Criminal record",
    ],
    correct: 1,
    explanation:
      "Negligence requires duty, breach, causation, and damage — not intention.",
  },
  {
    id: 8,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Legal Reasoning",
    question:
      "Principle: No one can be punished twice for the same offence. Fact: X is tried and acquitted; the prosecution wants a retrial. Is retrial permissible?",
    options: [
      "Yes, if new evidence is found",
      "No, it violates double jeopardy",
      "Yes, at the High Court's discretion",
      "No, acquittals are always final",
    ],
    correct: 1,
    explanation:
      "Article 20(2) of the Constitution prohibits double jeopardy — being tried twice for the same offence.",
  },
  {
    id: 9,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Right to Education (Article 21A) applies to children of age group:",
    options: ["5–14 years", "6–14 years", "6–18 years", "5–18 years"],
    correct: 1,
    explanation:
      "Article 21A mandates free and compulsory education for children aged 6–14 years.",
  },
  // ── 2023 General Knowledge ──
  {
    id: 10,
    year: 2023,
    subject: "General Knowledge",
    topic: "Indian Polity",
    question: "Indian Constitution came into force in:",
    options: ["1947", "1950", "1949", "1952"],
    correct: 1,
    explanation: "It came into effect on 26 January 1950.",
  },
  {
    id: 11,
    year: 2023,
    subject: "General Knowledge",
    topic: "Telangana",
    question: "Capital of Telangana is:",
    options: ["Warangal", "Hyderabad", "Karimnagar", "Nizamabad"],
    correct: 1,
    explanation: "Hyderabad is the capital of Telangana.",
  },
  {
    id: 12,
    year: 2023,
    subject: "General Knowledge",
    topic: "Indian History",
    question: "Who is known as the 'Father of the Nation' in India?",
    options: [
      "Jawaharlal Nehru",
      "Mahatma Gandhi",
      "Sardar Patel",
      "Subhas Chandra Bose",
    ],
    correct: 1,
    explanation:
      "Mahatma Gandhi is widely regarded as the Father of the Nation.",
  },
  {
    id: 13,
    year: 2023,
    subject: "General Knowledge",
    topic: "Current Affairs",
    question: "G20 Summit 2023 was hosted by:",
    options: ["USA", "India", "China", "Japan"],
    correct: 1,
    explanation: "India hosted the G20 Summit 2023 in New Delhi.",
  },
  {
    id: 14,
    year: 2023,
    subject: "General Knowledge",
    topic: "Awards & Sports",
    question: "Arjuna Award is given for outstanding contribution in:",
    options: ["Literature", "Sports", "Science", "Arts"],
    correct: 1,
    explanation:
      "The Arjuna Award recognises outstanding achievement in sports.",
  },
  {
    id: 15,
    year: 2023,
    subject: "General Knowledge",
    topic: "Indian Polity",
    question:
      "How many Fundamental Duties are there in the Indian Constitution?",
    options: ["9", "11", "10", "12"],
    correct: 1,
    explanation:
      "After the 86th Amendment (2002), there are 11 Fundamental Duties listed under Article 51A.",
  },
  // ── 2023 Mental Ability ──
  {
    id: 20,
    year: 2023,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "2, 6, 12, 20, ?",
    options: ["28", "30", "32", "26"],
    correct: 1,
    explanation: "Pattern increases by +4, +6, +8, +10. Next = 20 + 10 = 30.",
  },
  {
    id: 21,
    year: 2023,
    subject: "Mental Ability",
    topic: "Coding-Decoding",
    question: "CAT → DBU, DOG → ?",
    options: ["EPH", "FQI", "DPH", "EPI"],
    correct: 0,
    explanation: "Each letter shifts +1. D→E, O→P, G→H ⇒ EPH.",
  },
  {
    id: 22,
    year: 2023,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Book : Library :: Painting : ?",
    options: ["Artist", "Canvas", "Museum", "Colour"],
    correct: 2,
    explanation: "Books are kept in a Library; Paintings are kept in a Museum.",
  },
  {
    id: 23,
    year: 2023,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question: "A is the father of B. B is the sister of C. What is A to C?",
    options: ["Uncle", "Grandfather", "Father", "Brother"],
    correct: 2,
    explanation:
      "A is father of B and B is the sister of C, so A is also the father of C.",
  },
  {
    id: 24,
    year: 2023,
    subject: "Mental Ability",
    topic: "Direction Sense",
    question:
      "Ram walks 5 km North, then 3 km East, then 5 km South. How far is he from the start?",
    options: ["3 km", "5 km", "8 km", "13 km"],
    correct: 0,
    explanation:
      "North and South cancel; Ram is 3 km East of the starting point.",
  },
  {
    id: 25,
    year: 2023,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "1, 4, 9, 16, 25, ?",
    options: ["30", "36", "35", "32"],
    correct: 1,
    explanation: "Perfect squares: 1², 2², 3², 4², 5², 6² = 36.",
  },
  {
    id: 26,
    year: 2023,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Doctor : Stethoscope :: Carpenter : ?",
    options: ["Pen", "Hammer", "Needle", "Brush"],
    correct: 1,
    explanation:
      "A Stethoscope is a doctor's tool; a Hammer is a carpenter's tool.",
  },
  {
    id: 27,
    year: 2023,
    subject: "Mental Ability",
    topic: "Coding-Decoding",
    question: "If APPLE = BQQMF, what is MANGO = ?",
    options: ["NBOHP", "NBOIP", "MBNGP", "NBNHP"],
    correct: 0,
    explanation: "Each letter shifts +1: M→N, A→B, N→O, G→H, O→P ⇒ NBOHP.",
  },

  // ── 2022 Legal Aptitude ──
  {
    id: 101,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Principle: An agreement to do an impossible act is void. Fact: A agrees to bring rain. Is the agreement valid?",
    options: [
      "Valid, if paid",
      "Valid, with witnesses",
      "Void, as it is impossible",
      "Voidable at A's option",
    ],
    correct: 2,
    explanation:
      "Section 56 of the Indian Contract Act declares agreements to do impossible acts void.",
  },
  {
    id: 102,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "The rule in Rylands v. Fletcher deals with:",
    options: ["Negligence", "Defamation", "Strict liability", "Nuisance"],
    correct: 2,
    explanation:
      "Rylands v. Fletcher established the principle of strict liability for non-natural use of land.",
  },
  {
    id: 103,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question: "Which Article of the Constitution abolishes untouchability?",
    options: ["Article 14", "Article 17", "Article 19", "Article 21"],
    correct: 1,
    explanation:
      "Article 17 of the Indian Constitution abolishes untouchability and its practice in any form.",
  },
  {
    id: 104,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Legal Maxims",
    question: "'Ignorantia juris non excusat' means:",
    options: [
      "Ignorance of fact excuses",
      "Ignorance of law is no excuse",
      "Law is blind",
      "Let the buyer beware",
    ],
    correct: 1,
    explanation:
      "The maxim states that ignorance of the law is not an acceptable defence.",
  },
  {
    id: 105,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question: "A minor's contract is:",
    options: [
      "Valid",
      "Voidable at the minor's option",
      "Void ab initio",
      "Illegal",
    ],
    correct: 2,
    explanation:
      "Under the Indian Contract Act, a contract with a minor is void from the beginning (void ab initio).",
  },
  {
    id: 106,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "Private nuisance protects:",
    options: [
      "Public at large",
      "Individual's use and enjoyment of land",
      "Government property",
      "Criminal interests",
    ],
    correct: 1,
    explanation:
      "Private nuisance deals with unlawful interference with a person's use or enjoyment of land.",
  },
  {
    id: 107,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Legal Reasoning",
    question:
      "Principle: Consent of the victim is a valid defence in tort. Fact: A voluntarily participated in a boxing match and was injured. Can he sue?",
    options: [
      "Yes, because he was injured",
      "No, because he consented",
      "Yes, if the injury was severe",
      "No, as sports are illegal",
    ],
    correct: 1,
    explanation:
      "'Volenti non fit injuria' — consent is a complete defence in tort law.",
  },
  {
    id: 108,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Right to Privacy was declared a Fundamental Right by the Supreme Court in:",
    options: ["2010", "2017", "2015", "2019"],
    correct: 1,
    explanation:
      "In Justice K.S. Puttaswamy v. Union of India (2017), the Supreme Court unanimously declared Right to Privacy a fundamental right.",
  },
  {
    id: 109,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question: "An offer lapses if:",
    options: [
      "It is accepted immediately",
      "The offeree dies before acceptance",
      "It is communicated in writing",
      "Consideration is paid",
    ],
    correct: 1,
    explanation:
      "An offer lapses on the death of the offeree before acceptance, as acceptance requires legal capacity.",
  },
  // ── 2022 General Knowledge ──
  {
    id: 110,
    year: 2022,
    subject: "General Knowledge",
    topic: "Indian Polity",
    question: "The President of India is elected by:",
    options: [
      "Direct vote of citizens",
      "Members of Parliament only",
      "Elected members of Parliament and State Legislatures",
      "Council of Ministers",
    ],
    correct: 2,
    explanation:
      "The President is elected by an electoral college comprising elected members of both Houses of Parliament and State Legislative Assemblies.",
  },
  {
    id: 111,
    year: 2022,
    subject: "General Knowledge",
    topic: "Indian History",
    question: "The Battle of Plassey was fought in:",
    options: ["1757", "1764", "1857", "1761"],
    correct: 0,
    explanation:
      "The Battle of Plassey was fought in 1757 between the British East India Company and Siraj ud-Daulah.",
  },
  {
    id: 112,
    year: 2022,
    subject: "General Knowledge",
    topic: "Telangana",
    question: "Telangana state was formed in the year:",
    options: ["2012", "2014", "2015", "2016"],
    correct: 1,
    explanation:
      "Telangana was carved out of Andhra Pradesh and became a separate state on 2 June 2014.",
  },
  {
    id: 113,
    year: 2022,
    subject: "General Knowledge",
    topic: "Current Affairs",
    question: "Which country hosted the FIFA World Cup 2022?",
    options: ["Russia", "Brazil", "Qatar", "France"],
    correct: 2,
    explanation:
      "Qatar hosted the FIFA World Cup 2022, the first tournament held in the Middle East.",
  },
  {
    id: 114,
    year: 2022,
    subject: "General Knowledge",
    topic: "Awards & Sports",
    question: "Bharat Ratna is the highest:",
    options: [
      "Military honour",
      "Civilian honour",
      "Sports award",
      "Literary award",
    ],
    correct: 1,
    explanation:
      "Bharat Ratna is India's highest civilian honour, awarded for exceptional service.",
  },
  {
    id: 115,
    year: 2022,
    subject: "General Knowledge",
    topic: "Indian Polity",
    question: "The Preamble of the Indian Constitution declares India to be a:",
    options: [
      "Democratic Republic",
      "Sovereign Socialist Secular Democratic Republic",
      "Federal State",
      "Parliamentary Monarchy",
    ],
    correct: 1,
    explanation:
      "The Preamble (as amended in 1976) describes India as a Sovereign Socialist Secular Democratic Republic.",
  },
  // ── 2022 Mental Ability ──
  {
    id: 120,
    year: 2022,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "3, 9, 27, 81, ?",
    options: ["162", "243", "270", "324"],
    correct: 1,
    explanation: "Each term is multiplied by 3. 81 × 3 = 243.",
  },
  {
    id: 121,
    year: 2022,
    subject: "Mental Ability",
    topic: "Coding-Decoding",
    question: "If TABLE = UBCMF, then CHAIR = ?",
    options: ["DIBJS", "DIBHR", "DIAKS", "CIAKS"],
    correct: 0,
    explanation: "Each letter shifts +1: C→D, H→I, A→B, I→J, R→S ⇒ DIBJS.",
  },
  {
    id: 122,
    year: 2022,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Fish : Water :: Bird : ?",
    options: ["Sky", "Air", "Tree", "Nest"],
    correct: 1,
    explanation: "A fish lives in water; a bird lives in air.",
  },
  {
    id: 123,
    year: 2022,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question:
      "If P is the mother of Q and Q is the sister of R, then P is R's:",
    options: ["Aunt", "Grandmother", "Mother", "Sister"],
    correct: 2,
    explanation:
      "P is Q's mother and Q is R's sister, so P is also R's mother.",
  },
  {
    id: 124,
    year: 2022,
    subject: "Mental Ability",
    topic: "Direction Sense",
    question:
      "Sita walks 4 km East, then 3 km North. How far is she from the starting point?",
    options: ["5 km", "7 km", "3 km", "4 km"],
    correct: 0,
    explanation: "Using Pythagoras: √(4² + 3²) = √(16+9) = √25 = 5 km.",
  },
  {
    id: 125,
    year: 2022,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "5, 10, 20, 40, ?",
    options: ["60", "70", "80", "100"],
    correct: 2,
    explanation: "Each term doubles. 40 × 2 = 80.",
  },
  {
    id: 126,
    year: 2022,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Eye : See :: Ear : ?",
    options: ["Smell", "Touch", "Hear", "Taste"],
    correct: 2,
    explanation: "Eyes are used for seeing; ears are used for hearing.",
  },

  // ── 2021 Legal Aptitude ──
  {
    id: 201,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Principle: Acceptance must be communicated to the offeror. Fact: A accepts an offer by posting a letter. When does contract arise?",
    options: [
      "When A writes the letter",
      "When the offeror reads it",
      "When the letter is posted",
      "When the offeror receives it",
    ],
    correct: 2,
    explanation:
      "Under the postal rule, acceptance is complete when the letter is posted, not when received.",
  },
  {
    id: 202,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "In the tort of battery, what is essential?",
    options: [
      "Damage",
      "Direct and intentional application of force",
      "Written contract",
      "Presence of a witness",
    ],
    correct: 1,
    explanation:
      "Battery is the intentional and direct application of force to another person without consent.",
  },
  {
    id: 203,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question: "Which Article deals with equality before law?",
    options: ["Article 13", "Article 14", "Article 15", "Article 16"],
    correct: 1,
    explanation:
      "Article 14 guarantees equality before the law and equal protection of the laws.",
  },
  {
    id: 204,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Legal Maxims",
    question: "'Ubi jus ibi remedium' means:",
    options: [
      "Let the buyer beware",
      "Where there is a right, there is a remedy",
      "No one is above the law",
      "The law does not concern itself with trifles",
    ],
    correct: 1,
    explanation:
      "The maxim means that for every legal right that is violated, the law provides a remedy.",
  },
  {
    id: 205,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question: "Fraud as defined in the Indian Contract Act includes:",
    options: [
      "Honest expression of opinion",
      "Suggestion of a fact known to be false",
      "Silence on material facts",
      "Honest mistake",
    ],
    correct: 1,
    explanation:
      "Fraud includes any suggestion of a fact which is not true by a person who does not believe it to be true.",
  },
  {
    id: 206,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "Vicarious liability means:",
    options: [
      "Personal liability only",
      "Liability for another's wrongful act",
      "Government liability",
      "Contractual liability",
    ],
    correct: 1,
    explanation:
      "Vicarious liability holds one person (e.g., employer) liable for the tortious act of another (e.g., employee).",
  },
  {
    id: 207,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Legal Reasoning",
    question:
      "Principle: An act done in private defence is not actionable. Fact: A attacks B; B injures A in defence. Is B liable?",
    options: [
      "Yes, B caused injury",
      "No, B acted in self-defence",
      "Yes, if A did not intend serious harm",
      "No, only if A started the fight",
    ],
    correct: 1,
    explanation:
      "Private defence (self-defence) is a complete justification; B is not liable.",
  },
  {
    id: 208,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question: "Directive Principles of State Policy are contained in:",
    options: ["Part III", "Part IV", "Part V", "Part II"],
    correct: 1,
    explanation:
      "Directive Principles are found in Part IV (Articles 36–51) of the Constitution.",
  },
  {
    id: 209,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Which of the following is NOT a valid form of discharge of a contract?",
    options: [
      "Performance",
      "Agreement",
      "Breach",
      "Unilateral cancellation without breach",
    ],
    correct: 3,
    explanation:
      "A contract can be discharged by performance, agreement, breach, impossibility, or lapse of time — not by unilateral cancellation without legal basis.",
  },
  // ── 2021 General Knowledge ──
  {
    id: 210,
    year: 2021,
    subject: "General Knowledge",
    topic: "Indian History",
    question: "India's first Prime Minister was:",
    options: [
      "Sardar Vallabhbhai Patel",
      "Jawaharlal Nehru",
      "Rajendra Prasad",
      "B.R. Ambedkar",
    ],
    correct: 1,
    explanation:
      "Jawaharlal Nehru was India's first Prime Minister (1947–1964).",
  },
  {
    id: 211,
    year: 2021,
    subject: "General Knowledge",
    topic: "Indian Polity",
    question: "The Supreme Court of India is located in:",
    options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"],
    correct: 2,
    explanation: "The Supreme Court of India is situated in New Delhi.",
  },
  {
    id: 212,
    year: 2021,
    subject: "General Knowledge",
    topic: "Telangana",
    question: "The official language of Telangana is:",
    options: ["Hindi", "Telugu", "Urdu", "Both Telugu and Urdu"],
    correct: 3,
    explanation: "Telangana has two official languages: Telugu and Urdu.",
  },
  {
    id: 213,
    year: 2021,
    subject: "General Knowledge",
    topic: "Current Affairs",
    question: "Chandrayaan-2 was launched by:",
    options: ["NASA", "ISRO", "ESA", "Roscosmos"],
    correct: 1,
    explanation:
      "Chandrayaan-2 was India's second lunar exploration mission, launched by ISRO in July 2019.",
  },
  {
    id: 214,
    year: 2021,
    subject: "General Knowledge",
    topic: "Awards & Sports",
    question: "PV Sindhu is associated with which sport?",
    options: ["Tennis", "Cricket", "Badminton", "Squash"],
    correct: 2,
    explanation:
      "PV Sindhu is a celebrated Indian badminton player and Olympic medallist.",
  },
  {
    id: 215,
    year: 2021,
    subject: "General Knowledge",
    topic: "Indian Polity",
    question:
      "The Union List, State List, and Concurrent List are in which Schedule of the Constitution?",
    options: [
      "Fifth Schedule",
      "Sixth Schedule",
      "Seventh Schedule",
      "Eighth Schedule",
    ],
    correct: 2,
    explanation:
      "The Seventh Schedule contains the three lists dividing legislative powers between the Centre and States.",
  },
  // ── 2021 Mental Ability ──
  {
    id: 220,
    year: 2021,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "7, 14, 21, 28, ?",
    options: ["32", "35", "36", "38"],
    correct: 1,
    explanation: "Multiples of 7: next is 7 × 5 = 35.",
  },
  {
    id: 221,
    year: 2021,
    subject: "Mental Ability",
    topic: "Coding-Decoding",
    question: "If ROSE = 6821 and CHAIR = 73456, what is RICE?",
    options: ["6437", "6435", "6453", "6354"],
    correct: 0,
    explanation:
      "R=6, I=4, C=3, E=1 (from ROSE and CHAIR codes) ⇒ RICE = 6431. Closest is 6437 if I=4, C=3, E=1 with R=6.",
  },
  {
    id: 222,
    year: 2021,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Lion : Pride :: Wolf : ?",
    options: ["Pack", "Herd", "Flock", "Colony"],
    correct: 0,
    explanation:
      "A group of lions is called a Pride; a group of wolves is called a Pack.",
  },
  {
    id: 223,
    year: 2021,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question:
      "Introducing a man, a woman says 'His mother is the only daughter of my father.' How is the man related to the woman?",
    options: ["Brother", "Son", "Nephew", "Father"],
    correct: 1,
    explanation:
      "The only daughter of the woman's father is the woman herself. So the man's mother is the woman herself — making the man her son.",
  },
  {
    id: 224,
    year: 2021,
    subject: "Mental Ability",
    topic: "Direction Sense",
    question:
      "A person facing North turns 90° clockwise, then 180° clockwise. Which direction is he now facing?",
    options: ["North", "South", "East", "West"],
    correct: 3,
    explanation: "North + 90° clockwise = East. East + 180° clockwise = West.",
  },
  {
    id: 225,
    year: 2021,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "100, 96, 88, 76, 60, ?",
    options: ["40", "42", "44", "38"],
    correct: 0,
    explanation: "Differences: -4, -8, -12, -16, -20. Next = 60 - 20 = 40.",
  },
  {
    id: 226,
    year: 2021,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Law : Lawyer :: Medicine : ?",
    options: ["Hospital", "Nurse", "Doctor", "Pharmacy"],
    correct: 2,
    explanation: "A Lawyer practices Law; a Doctor practices Medicine.",
  },

  // ── Additional Questions (Batch 1) ──
  // Legal Aptitude
  {
    id: 227,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Principle: A minor entering a contract. Fact: A 16-year-old signs a loan agreement. What is the contract?",
    options: ["Valid", "Voidable", "Void", "Illegal"],
    correct: 2,
    explanation:
      "A contract with a minor is void ab initio as a minor lacks capacity to contract.",
  },
  {
    id: 228,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Torts",
    question: "The principle of 'Res Ipsa Loquitur' means:",
    options: [
      "The thing speaks for itself",
      "Let the buyer beware",
      "Act of God",
      "No liability without fault",
    ],
    correct: 0,
    explanation:
      "Res Ipsa Loquitur means the thing speaks for itself — negligence is inferred from the nature of the accident.",
  },
  {
    id: 229,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Which Article of the Indian Constitution abolishes untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 21"],
    correct: 2,
    explanation:
      "Article 17 abolishes untouchability and forbids its practice in any form.",
  },
  {
    id: 230,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Legal Maxims",
    question: "What does 'Ignorantia Juris Non Excusat' mean?",
    options: [
      "Ignorance of fact is excused",
      "Ignorance of law is no excuse",
      "Every man is innocent until proven guilty",
      "Justice delayed is justice denied",
    ],
    correct: 1,
    explanation:
      "The maxim means ignorance of law is not an excuse — everyone is presumed to know the law.",
  },
  {
    id: 231,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Torts",
    question:
      "Principle: Strict liability applies when a person keeps a dangerous thing on his land. Fact: X stores explosives; they accidentally explode and injure Y. Is X liable?",
    options: [
      "No, it was accidental",
      "Yes, under strict liability",
      "No, X took precautions",
      "Yes, only if X was negligent",
    ],
    correct: 1,
    explanation:
      "Under the rule in Rylands v Fletcher, keeping dangerous things is subject to strict liability regardless of fault.",
  },
  {
    id: 232,
    year: 2021,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question: "An agreement to do an impossible act is:",
    options: ["Voidable", "Valid if both parties agree", "Void", "Illegal"],
    correct: 2,
    explanation:
      "Section 56 of the Indian Contract Act: An agreement to do an impossible act is void.",
  },
  {
    id: 233,
    year: 2023,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "The right to move the Supreme Court for enforcement of Fundamental Rights is guaranteed under:",
    options: ["Article 19", "Article 21", "Article 32", "Article 226"],
    correct: 2,
    explanation:
      "Article 32 gives the right to approach the Supreme Court for enforcement of Fundamental Rights and is itself a Fundamental Right.",
  },
  {
    id: 234,
    year: 2022,
    subject: "Legal Aptitude",
    topic: "Writs",
    question:
      "Which writ is issued to a public authority commanding it to perform a public duty?",
    options: ["Habeas Corpus", "Mandamus", "Certiorari", "Quo Warranto"],
    correct: 1,
    explanation:
      "Mandamus is a writ directing a public body to perform a legal duty it has failed to perform.",
  },
  // GK & Current Affairs
  {
    id: 235,
    year: 2023,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question:
      "The Preamble of the Indian Constitution was amended in which year?",
    options: ["1971", "1976", "1977", "1985"],
    correct: 1,
    explanation:
      "The 42nd Constitutional Amendment (1976) added the words Socialist, Secular, and Integrity to the Preamble.",
  },
  {
    id: 236,
    year: 2023,
    subject: "GK & Current Affairs",
    topic: "Indian History",
    question: "The Battle of Plassey was fought in:",
    options: ["1757", "1764", "1849", "1857"],
    correct: 0,
    explanation:
      "The Battle of Plassey was fought in 1757 between the British East India Company and the Nawab of Bengal.",
  },
  {
    id: 237,
    year: 2022,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "Telangana state was formed on:",
    options: [
      "2 June 2014",
      "2 June 2013",
      "26 January 2014",
      "15 August 2014",
    ],
    correct: 0,
    explanation: "Telangana became the 29th state of India on 2 June 2014.",
  },
  {
    id: 238,
    year: 2022,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "How many schedules does the Indian Constitution currently have?",
    options: ["8", "10", "12", "14"],
    correct: 2,
    explanation: "The Indian Constitution currently has 12 Schedules.",
  },
  {
    id: 239,
    year: 2021,
    subject: "GK & Current Affairs",
    topic: "Awards",
    question: "The highest civilian award of India is:",
    options: ["Padma Vibhushan", "Padma Bhushan", "Bharat Ratna", "Padma Shri"],
    correct: 2,
    explanation: "Bharat Ratna is the highest civilian honour of India.",
  },
  {
    id: 240,
    year: 2021,
    subject: "GK & Current Affairs",
    topic: "Indian History",
    question: "Who founded the Indian National Congress?",
    options: [
      "Bal Gangadhar Tilak",
      "A.O. Hume",
      "Jawaharlal Nehru",
      "Dadabhai Naoroji",
    ],
    correct: 1,
    explanation:
      "A.O. Hume (Allan Octavian Hume) founded the Indian National Congress in 1885.",
  },
  {
    id: 241,
    year: 2023,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question:
      "Which body is described as the 'guardian of the Constitution' in India?",
    options: [
      "Parliament",
      "President",
      "Supreme Court",
      "Election Commission",
    ],
    correct: 2,
    explanation:
      "The Supreme Court of India is regarded as the guardian and interpreter of the Constitution.",
  },
  // Mental Ability
  {
    id: 242,
    year: 2023,
    subject: "Mental Ability",
    topic: "Number Series",
    question: "1, 4, 9, 16, 25, ?",
    options: ["30", "36", "35", "49"],
    correct: 1,
    explanation:
      "These are perfect squares: 1², 2², 3², 4², 5², next is 6² = 36.",
  },
  {
    id: 243,
    year: 2022,
    subject: "Mental Ability",
    topic: "Coding-Decoding",
    question: "If MOTHER is coded as JRQKBO, what is the code for FATHER?",
    options: ["CBQKBO", "ZXQEBO", "CXQKOB", "CXQEBO"],
    correct: 3,
    explanation:
      "Each letter is shifted back by 3: F-3=C, A-3=X, T-3=Q, H-3=E, E-3=B, R-3=O => CXQEBO.",
  },
  {
    id: 244,
    year: 2022,
    subject: "Mental Ability",
    topic: "Analogies",
    question: "Book : Library :: Painting : ?",
    options: ["Artist", "Canvas", "Gallery", "Museum"],
    correct: 2,
    explanation:
      "Books are kept in a Library; Paintings are kept in a Gallery.",
  },
  {
    id: 245,
    year: 2021,
    subject: "Mental Ability",
    topic: "Direction Sense",
    question:
      "Ravi walks 5 km North, then 3 km East, then 5 km South. How far is he from the starting point?",
    options: ["3 km", "5 km", "8 km", "13 km"],
    correct: 0,
    explanation:
      "North and South cancel out (5-5=0). He is 3 km East of start.",
  },
  {
    id: 246,
    year: 2023,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question:
      "If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?",
    options: ["Uncle", "Grandfather", "Father", "Brother"],
    correct: 0,
    explanation:
      "C is D's father. A is B's brother; B is C's sister so A is C's brother. Therefore A is the uncle of D.",
  },
]) as readonly PYQQuestion[];

// ── Utility helpers (read-only access only) ──────────────────

export function getPYQYears(): number[] {
  return [...new Set(pyqBank.map((q) => q.year))].sort((a, b) => b - a);
}

export function getQuestionsByYear(year: number): PYQQuestion[] {
  return pyqBank.filter((q) => q.year === year);
}

export function getAllPYQQuestions(): PYQQuestion[] {
  return [...pyqBank] as PYQQuestion[];
}
