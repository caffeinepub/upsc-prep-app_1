export interface PYQQuestion {
  id: number;
  year: number;
  subject: string;
  topic: string;
  question: string;
  options: [string, string, string, string];
  correct: number;
  explanation: string;
}

export const pyqTest5Extra: PYQQuestion[] = [
  // Legal Aptitude 5031-5075
  {
    id: 5031,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contracts",
    question:
      "Principle: A minor's agreement is void ab initio. Facts: Ramesh, aged 16, borrows Rs. 5000 from Suresh. Can Suresh recover the money?",
    options: [
      "Yes, because money was given",
      "No, because minor's contract is void",
      "Yes, with interest",
      "Depends on guardian's consent",
    ],
    correct: 1,
    explanation:
      "A minor's agreement is void from the beginning, so Suresh cannot recover the money.",
  },
  {
    id: 5032,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Every person has a right to reputation. Facts: A newspaper publishes a false story that a doctor is a criminal. The doctor suffers loss of patients. What is the doctor's remedy?",
    options: [
      "No remedy",
      "Sue for defamation",
      "File a criminal complaint only",
      "Sue for negligence",
    ],
    correct: 1,
    explanation:
      "Publishing a false statement damaging reputation is defamation and the doctor can sue for it.",
  },
  {
    id: 5033,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: An agreement without consideration is void. Facts: A promises to give B his car for free. B does nothing in return. Is this a valid contract?",
    options: [
      "Valid, it is a gift",
      "Invalid, no consideration",
      "Valid, oral contracts are enforceable",
      "Invalid, not registered",
    ],
    correct: 1,
    explanation:
      "An agreement without consideration is void unless it is a registered gift deed.",
  },
  {
    id: 5034,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Private defence is available only against an unlawful act. Facts: A is attacked by B with a knife. A shoots B in self-defence. Is A liable?",
    options: [
      "Yes, for causing grievous hurt",
      "No, it is private defence",
      "Yes, for exceeding private defence",
      "Depends on severity of injury",
    ],
    correct: 1,
    explanation:
      "A acted in private defence against an unlawful attack, so A is not liable.",
  },
  {
    id: 5035,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Property Law",
    question:
      "Principle: Possession is nine-tenths of the law. Facts: X finds a lost watch and keeps it. The original owner Y claims it back. Who is entitled?",
    options: [
      "X, as finder",
      "Y, as original owner",
      "Both equally",
      "Neither",
    ],
    correct: 1,
    explanation: "The original owner always has superior title over a finder.",
  },
  {
    id: 5036,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: A master is liable for the wrongful acts of his servant done in the course of employment. Facts: A bus driver, while on duty, hits a pedestrian. Who is liable?",
    options: [
      "Driver only",
      "Pedestrian",
      "Transport company",
      "Both driver and company",
    ],
    correct: 3,
    explanation:
      "Under vicarious liability, both the driver and the employer (transport company) are liable.",
  },
  {
    id: 5037,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Acceptance must be communicated to the offeror. Facts: A sends an offer to B by post. B accepts but keeps the letter without posting it. Is there a contract?",
    options: [
      "Yes, acceptance is complete",
      "No, acceptance not communicated",
      "Yes, if B intends to post",
      "Depends on offer terms",
    ],
    correct: 1,
    explanation:
      "Acceptance must be communicated; keeping the letter does not constitute valid acceptance.",
  },
  {
    id: 5038,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Mens rea (guilty mind) is essential for a crime. Facts: A doctor administers wrong medicine by mistake causing death. Is the doctor guilty of murder?",
    options: [
      "Yes, murder",
      "Yes, culpable homicide",
      "No, no guilty mind",
      "Yes, criminal negligence",
    ],
    correct: 2,
    explanation:
      "Without intent to kill, the doctor is not guilty of murder, though may be liable for negligence.",
  },
  {
    id: 5039,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Volenti non fit injuria — one who consents to a risk cannot claim damages. Facts: A spectator at a cricket match is hit by a ball. Can he claim damages?",
    options: [
      "Yes, always",
      "No, he assumed the risk",
      "Yes, if the ball was hit negligently",
      "Only if he did not know cricket",
    ],
    correct: 1,
    explanation:
      "By attending a cricket match, the spectator consents to the ordinary risks of the game.",
  },
  {
    id: 5040,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A contract of insurance requires utmost good faith. Facts: A hides his heart condition while buying life insurance. Later he dies of a heart attack. Can his family claim insurance?",
    options: [
      "Yes, full amount",
      "Yes, partial amount",
      "No, contract is voidable due to fraud",
      "Depends on policy terms",
    ],
    correct: 2,
    explanation:
      "Non-disclosure of a material fact in insurance is fraud, making the contract voidable.",
  },
  {
    id: 5041,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Abetment of a crime is punishable. Facts: X tells Y to commit theft and Y does so. Is X guilty?",
    options: [
      "No, X did not steal",
      "Yes, for abetment of theft",
      "Only Y is guilty",
      "No crime committed",
    ],
    correct: 1,
    explanation: "X is guilty of abetment as he instigated Y to commit theft.",
  },
  {
    id: 5042,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Equality before law is a fundamental right. Facts: The government provides reservation benefits to backward classes only. Is this valid?",
    options: [
      "No, violates equality",
      "Yes, reasonable classification is allowed",
      "Depends on court",
      "No, all are equal",
    ],
    correct: 1,
    explanation:
      "Article 14 allows reasonable classification; reservations for backward classes are constitutionally valid.",
  },
  {
    id: 5043,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Nuisance is an unreasonable interference with the use and enjoyment of property. Facts: A factory emits smoke that disturbs B's residence. Has B suffered a legal wrong?",
    options: [
      "No, factories need to operate",
      "Yes, actionable nuisance",
      "Depends on factory registration",
      "Only if smoke is toxic",
    ],
    correct: 1,
    explanation:
      "Unreasonable interference with enjoyment of property constitutes nuisance and B has a valid claim.",
  },
  {
    id: 5044,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A contract obtained by undue influence is voidable. Facts: A bank manager pressures an old lady to mortgage her house for her son's loan. Is the contract valid?",
    options: [
      "Valid, son needed money",
      "Voidable at the lady's option",
      "Void ab initio",
      "Valid if registered",
    ],
    correct: 1,
    explanation:
      "Undue influence makes a contract voidable at the option of the influenced party.",
  },
  {
    id: 5045,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: An act done in good faith for another's benefit without their consent is not an offence. Facts: A surgeon amputates an unconscious accident victim's leg to save his life. Is the surgeon liable?",
    options: [
      "Yes, no consent",
      "No, act done in good faith",
      "Yes, criminal negligence",
      "Depends on patient's family",
    ],
    correct: 1,
    explanation:
      "Section 92 IPC protects acts done in good faith for a person's benefit even without consent.",
  },
  {
    id: 5046,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Res ipsa loquitur — the thing speaks for itself. Facts: A barrel falls from a warehouse and injures a passerby. The warehouse owner claims no negligence. Is he liable?",
    options: [
      "No, accidents happen",
      "Yes, burden of proof shifts to defendant",
      "Only if negligence is proved",
      "No, act of God",
    ],
    correct: 1,
    explanation:
      "Under res ipsa loquitur, the accident itself is evidence of negligence and burden shifts to defendant.",
  },
  {
    id: 5047,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: An agreement in restraint of trade is void. Facts: An employer makes an employee sign a bond not to work in any company in India for 5 years after leaving. Is the bond valid?",
    options: [
      "Valid, employer's right",
      "Void, restraint of trade",
      "Valid for 2 years only",
      "Valid if compensation paid",
    ],
    correct: 1,
    explanation:
      "Agreements in restraint of trade are void under Section 27 of the Indian Contract Act.",
  },
  {
    id: 5048,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Theft requires dishonest intention. Facts: A takes B's umbrella in the rain intending to return it later. Has A committed theft?",
    options: [
      "Yes, taking without consent is theft",
      "No, no dishonest intention",
      "Yes, trespass to goods",
      "Depends on value",
    ],
    correct: 1,
    explanation:
      "Theft requires dishonest intention to permanently deprive. Temporary taking with intent to return may not be theft.",
  },
  {
    id: 5049,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Freedom of speech does not extend to obscenity. Facts: A person publishes obscene material claiming freedom of expression. Can the state restrict this?",
    options: [
      "No, freedom of speech is absolute",
      "Yes, it falls outside protection",
      "Depends on content",
      "Only if it harms someone",
    ],
    correct: 1,
    explanation:
      "Article 19(2) allows the state to impose reasonable restrictions on obscene speech.",
  },
  {
    id: 5050,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Impossibility of performance discharges a contract. Facts: A agrees to sell B a specific painting. Before delivery, the painting is destroyed by fire. Is A still liable?",
    options: [
      "Yes, must pay compensation",
      "No, contract discharged by impossibility",
      "Yes, must find another painting",
      "Depends on insurance",
    ],
    correct: 1,
    explanation:
      "Destruction of the subject matter without fault of either party discharges the contract.",
  },
  {
    id: 5051,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: A person is liable for damage caused by a dangerous thing that escapes from their land. Facts: X stores chemicals on his land. They leak and damage Y's crops. Is X liable?",
    options: [
      "No, natural use of land",
      "Yes, under strict liability (Rylands v Fletcher)",
      "Only if negligent",
      "Depends on chemical type",
    ],
    correct: 1,
    explanation:
      "Under strict liability, one who brings a dangerous thing on land is liable if it escapes and causes damage.",
  },
  {
    id: 5052,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Preparation is not punishable, but attempt is. Facts: A buys a knife to kill B but does nothing further. Has A committed any offence?",
    options: [
      "Yes, attempt to murder",
      "No, only preparation",
      "Yes, criminal conspiracy",
      "Depends on intent",
    ],
    correct: 1,
    explanation:
      "Merely buying a weapon is preparation and not a punishable attempt.",
  },
  {
    id: 5053,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Time is of the essence when stipulated in contract. Facts: A agrees to deliver goods to B by 1st March. A delivers on 5th March. B refuses to accept. Can B refuse?",
    options: [
      "No, small delay is acceptable",
      "Yes, if time was of essence",
      "Only if B suffered loss",
      "No, B must accept",
    ],
    correct: 1,
    explanation:
      "If time is of the essence of the contract, delay entitles B to refuse performance and claim damages.",
  },
  {
    id: 5054,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Contributory negligence reduces the claimant's damages. Facts: A cyclist without a helmet is hit by B's rash driving. A suffers head injury. Who bears what liability?",
    options: [
      "B bears full liability",
      "A bears full liability",
      "Liability is apportioned between A and B",
      "No one is liable",
    ],
    correct: 2,
    explanation:
      "Both B's rash driving and A's failure to wear a helmet contribute; liability is apportioned.",
  },
  {
    id: 5055,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A contract of guarantee is a promise to perform the obligation of another person if he defaults. Facts: A guarantees B's loan from a bank. B defaults. Can the bank sue A?",
    options: [
      "No, A is not the borrower",
      "Yes, A is a surety",
      "Only after suing B first",
      "Depends on guarantee terms",
    ],
    correct: 1,
    explanation:
      "A surety (guarantor) is liable to the creditor if the principal debtor defaults.",
  },
  {
    id: 5056,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Drunkenness is not a defence unless it is involuntary. Facts: A voluntarily gets drunk and commits assault. Can A claim drunkenness as a defence?",
    options: [
      "Yes, if very drunk",
      "No, voluntary drunkenness is no defence",
      "Partial defence only",
      "Yes, reduces sentence",
    ],
    correct: 1,
    explanation:
      "Voluntary intoxication is not a defence to criminal liability.",
  },
  {
    id: 5057,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Preventive detention must comply with constitutional safeguards. Facts: A person is detained for 4 months without being informed of grounds. Is the detention valid?",
    options: [
      "Valid if security risk",
      "Invalid, violates Article 22",
      "Valid for up to 6 months",
      "Valid with court approval",
    ],
    correct: 1,
    explanation:
      "Article 22 requires that a detenu be informed of grounds of detention; failure makes it invalid.",
  },
  {
    id: 5058,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: False imprisonment is total restraint of a person's freedom of movement. Facts: A security guard locks B in a room while investigating a theft. B was not charged. Has B been falsely imprisoned?",
    options: [
      "No, security has rights",
      "Yes, total restraint without legal justification",
      "Depends on duration",
      "No if theft occurred",
    ],
    correct: 1,
    explanation:
      "Locking B without legal authority constitutes false imprisonment even if brief.",
  },
  {
    id: 5059,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A voidable contract becomes void once rescinded. Facts: A enters a contract under misrepresentation by B. A rescinds it. What is the status of the contract?",
    options: [
      "Still valid",
      "Void from beginning",
      "Void from date of rescission",
      "Voidable still",
    ],
    correct: 2,
    explanation:
      "On rescission, a voidable contract becomes void from the date of rescission.",
  },
  {
    id: 5060,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: An act is not a crime if done under compulsion. Facts: A is forced at gunpoint to sign a fraudulent document. Is A guilty of fraud?",
    options: [
      "Yes, A signed it",
      "No, act done under duress",
      "Partially liable",
      "Depends on content",
    ],
    correct: 1,
    explanation: "An act done under duress (compulsion) is not a criminal act.",
  },
  {
    id: 5061,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Property",
    question:
      "Principle: A gift is complete only on acceptance. Facts: X sends a valuable watch as a gift to Y by post. Y does not respond. Is the gift complete?",
    options: [
      "Yes, sent is enough",
      "No, acceptance required",
      "Yes, if Y receives it",
      "Depends on value",
    ],
    correct: 1,
    explanation: "A gift requires acceptance by the donee to be complete.",
  },
  {
    id: 5062,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A wagering agreement is void. Facts: A bets Rs. 1000 with B on a cricket match result. B wins. Can B recover?",
    options: [
      "Yes, it is a game",
      "No, wagering agreements are void",
      "Yes, in civil court",
      "Depends on amount",
    ],
    correct: 1,
    explanation:
      "Section 30 of the Indian Contract Act makes wagering agreements void.",
  },
  {
    id: 5063,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Malicious prosecution is an abuse of legal process. Facts: A files a false criminal case against B knowing B is innocent, to harass him. B is acquitted. Can B sue A?",
    options: [
      "No, legal process was used",
      "Yes, for malicious prosecution",
      "Only for costs",
      "No, acquittal is enough",
    ],
    correct: 1,
    explanation:
      "Filing a false case with malice and without reasonable cause is malicious prosecution.",
  },
  {
    id: 5064,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Joint liability exists when persons share a common intention to commit an offence. Facts: A and B plan to rob a bank. During the robbery, A shoots a guard. Is B also liable for the shooting?",
    options: [
      "No, B did not shoot",
      "Yes, due to common intention",
      "Only if B knew A had a gun",
      "B is liable for robbery only",
    ],
    correct: 1,
    explanation:
      "Under Section 34 IPC, acts done in furtherance of common intention make all members jointly liable.",
  },
  {
    id: 5065,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Specific performance can be ordered when damages are not adequate remedy. Facts: A agrees to sell a rare painting to B. A refuses to sell. What remedy is best for B?",
    options: [
      "Damages only",
      "Specific performance",
      "Rescission",
      "Injunction",
    ],
    correct: 1,
    explanation:
      "For unique or rare items, damages are inadequate and courts may order specific performance.",
  },
  {
    id: 5066,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Nervous shock caused by negligence is compensable. Facts: A witnesses a car accident caused by B's negligence. A suffers psychiatric injury though not physically hurt. Can A claim?",
    options: [
      "No, not physically hurt",
      "Yes, if shock was reasonably foreseeable",
      "Only if close relative was hurt",
      "No, psychological harm not covered",
    ],
    correct: 1,
    explanation:
      "Psychiatric injury caused by witnessing negligence is compensable if it was reasonably foreseeable.",
  },
  {
    id: 5067,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Right against self-incrimination is a fundamental right. Facts: Police force A to give his blood sample in a murder case. Is this valid?",
    options: [
      "Yes, necessary for investigation",
      "No, violates Article 20(3)",
      "Yes, with magistrate's order",
      "Depends on crime severity",
    ],
    correct: 1,
    explanation:
      "Article 20(3) protects against compelled self-incrimination including forced extraction of bodily samples.",
  },
  {
    id: 5068,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: An offer lapses on death of the offeror before acceptance. Facts: A makes an offer to B. A dies before B accepts. B then sends acceptance. Is there a contract?",
    options: [
      "Yes, offer was valid",
      "No, offer lapsed on A's death",
      "Yes if B did not know of death",
      "Depends on nature of offer",
    ],
    correct: 1,
    explanation:
      "An offer lapses on the death of the offeror; no valid contract can arise on subsequent acceptance.",
  },
  {
    id: 5069,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Injunction can be granted to prevent a threatened wrong. Facts: B threatens to publish A's private photographs. A seeks an injunction. Can it be granted?",
    options: [
      "No, publication not done yet",
      "Yes, to prevent imminent wrong",
      "Only after publication",
      "Depends on photos",
    ],
    correct: 1,
    explanation:
      "Courts can grant injunctions to prevent threatened wrongs, including invasion of privacy.",
  },
  {
    id: 5070,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Cheating requires dishonest inducement. Facts: A sells B a car claiming it is new. The car is actually second-hand. B suffers loss. Has A cheated?",
    options: [
      "No, buyer should check",
      "Yes, dishonest inducement causing loss",
      "Only civil liability",
      "Depends on price difference",
    ],
    correct: 1,
    explanation:
      "Dishonestly inducing a person to deliver property by deception constitutes cheating under IPC.",
  },
  {
    id: 5071,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Novation replaces an old contract with a new one. Facts: A owes B money. With B's consent, C agrees to pay the debt instead. Is A discharged?",
    options: [
      "No, A still owes",
      "Yes, A is discharged by novation",
      "Depends on C's solvency",
      "Only partial discharge",
    ],
    correct: 1,
    explanation:
      "Novation discharges the original debtor when a new party assumes the obligation with creditor's consent.",
  },
  {
    id: 5072,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Negligence requires duty, breach, and damage. Facts: A doctor performs surgery carelessly. Patient suffers no harm. Is there actionable negligence?",
    options: [
      "Yes, careless conduct is enough",
      "No, no damage resulted",
      "Depends on procedure",
      "Yes, potential harm is enough",
    ],
    correct: 1,
    explanation:
      "For actionable negligence, actual damage must result from the breach of duty.",
  },
  {
    id: 5073,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Right to education is a fundamental right for children aged 6-14. Facts: A private school refuses admission to a child from a weaker section. Is this valid?",
    options: [
      "Yes, private schools are free",
      "No, violates Right to Education Act",
      "Yes if fees unpaid",
      "Depends on school policy",
    ],
    correct: 1,
    explanation:
      "The RTE Act mandates 25% reservation for economically weaker sections in private unaided schools.",
  },
  {
    id: 5074,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: A person has a right to self-defence of property. Facts: X breaks into Y's house at night. Y throws X out injuring him. Is Y liable?",
    options: [
      "Yes, should call police",
      "No, right to defend property",
      "Yes, excessive force",
      "Depends on injury",
    ],
    correct: 1,
    explanation:
      "The right to private defence extends to protecting one's property from unlawful entry.",
  },
  {
    id: 5075,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Promissory estoppel prevents a party from going back on a promise. Facts: A promises B not to enforce a debt for one year. B acts on this promise. Can A later enforce the debt immediately?",
    options: [
      "Yes, no consideration",
      "No, bound by promissory estoppel",
      "Yes, oral promise not binding",
      "Depends on amount",
    ],
    correct: 1,
    explanation:
      "Where a party acts on a promise to his detriment, the promisor is estopped from resiling from it.",
  },
  // General Knowledge 5076-5097
  {
    id: 5076,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "Who is known as the Father of the Indian Constitution?",
    options: [
      "Jawaharlal Nehru",
      "Sardar Patel",
      "B.R. Ambedkar",
      "Rajendra Prasad",
    ],
    correct: 2,
    explanation:
      "Dr. B.R. Ambedkar chaired the Drafting Committee of the Indian Constitution.",
  },
  {
    id: 5077,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "How many schedules does the Indian Constitution have?",
    options: ["8", "10", "12", "14"],
    correct: 2,
    explanation:
      "The Indian Constitution originally had 8 schedules; it now has 12.",
  },
  {
    id: 5078,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "The Preamble to the Indian Constitution begins with the words:",
    options: [
      "We the Parliament",
      "We the Judiciary",
      "We the People of India",
      "We the Citizens",
    ],
    correct: 2,
    explanation: "The Preamble begins with 'We, the People of India'.",
  },
  {
    id: 5079,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "The Indian Penal Code was enacted in the year:",
    options: ["1857", "1860", "1872", "1882"],
    correct: 1,
    explanation:
      "The Indian Penal Code was enacted in 1860 and came into force in 1862.",
  },
  {
    id: 5080,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "Telangana state was formed by bifurcation of:",
    options: ["Karnataka", "Maharashtra", "Andhra Pradesh", "Odisha"],
    correct: 2,
    explanation:
      "Telangana was carved out of Andhra Pradesh and became a separate state on 2 June 2014.",
  },
  {
    id: 5081,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "The Rajya Sabha is presided over by:",
    options: ["President", "Prime Minister", "Vice President", "Speaker"],
    correct: 2,
    explanation:
      "The Vice President of India is the ex-officio Chairman of the Rajya Sabha.",
  },
  {
    id: 5082,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question:
      "Which article of the Constitution deals with Right to Constitutional Remedies?",
    options: ["Article 12", "Article 19", "Article 32", "Article 226"],
    correct: 2,
    explanation:
      "Article 32 provides the right to approach the Supreme Court for enforcement of fundamental rights.",
  },
  {
    id: 5083,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Judiciary",
    question: "The Supreme Court of India has its seat in:",
    options: ["Mumbai", "Chennai", "Kolkata", "New Delhi"],
    correct: 3,
    explanation: "The Supreme Court of India is located in New Delhi.",
  },
  {
    id: 5084,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "The Code of Criminal Procedure (CrPC) was replaced by:",
    options: [
      "Indian Penal Code",
      "Bharatiya Nagarik Suraksha Sanhita",
      "Indian Evidence Act",
      "Civil Procedure Code",
    ],
    correct: 1,
    explanation:
      "CrPC 1973 was replaced by the Bharatiya Nagarik Suraksha Sanhita (BNSS) in 2023.",
  },
  {
    id: 5085,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question:
      "Which body recommends the appointment of the Chief Justice of India?",
    options: [
      "President alone",
      "Prime Minister",
      "Collegium system",
      "Law Commission",
    ],
    correct: 2,
    explanation:
      "The collegium system, led by the Chief Justice, recommends judicial appointments.",
  },
  {
    id: 5086,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question:
      "Fundamental Duties are included in which Part of the Constitution?",
    options: ["Part III", "Part IV", "Part IVA", "Part V"],
    correct: 2,
    explanation:
      "Fundamental Duties are in Part IVA (Article 51A), added by the 42nd Amendment.",
  },
  {
    id: 5087,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "The High Court of Telangana is located in:",
    options: ["Warangal", "Hyderabad", "Nizamabad", "Karimnagar"],
    correct: 1,
    explanation: "The Telangana High Court is located in Hyderabad.",
  },
  {
    id: 5088,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question:
      "The right of an arrested person to consult a legal practitioner is guaranteed under:",
    options: ["Article 20", "Article 21", "Article 22", "Article 19"],
    correct: 2,
    explanation:
      "Article 22 guarantees the right to be defended by a legal practitioner of one's choice.",
  },
  {
    id: 5089,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question:
      "Which constitutional amendment lowered the voting age from 21 to 18?",
    options: [
      "42nd Amendment",
      "44th Amendment",
      "61st Amendment",
      "73rd Amendment",
    ],
    correct: 2,
    explanation:
      "The 61st Constitutional Amendment (1988) reduced the voting age from 21 to 18.",
  },
  {
    id: 5090,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian History",
    question: "The Champaran Satyagraha (1917) was related to:",
    options: ["Salt tax", "Indigo farming", "Land revenue", "Silk weaving"],
    correct: 1,
    explanation:
      "The Champaran Satyagraha was Gandhi's first satyagraha in India, against oppressive indigo farming practices.",
  },
  {
    id: 5091,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "The Directive Principles of State Policy are contained in:",
    options: ["Part II", "Part III", "Part IV", "Part V"],
    correct: 2,
    explanation:
      "DPSPs are in Part IV (Articles 36-51) of the Indian Constitution.",
  },
  {
    id: 5092,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "Under which act is child labour prohibited in India?",
    options: [
      "Factories Act",
      "Child Labour (Prohibition and Regulation) Act",
      "Mines Act",
      "All of the above",
    ],
    correct: 3,
    explanation:
      "Multiple acts prohibit child labour including the Child Labour (Prohibition and Regulation) Act 1986.",
  },
  {
    id: 5093,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "A no-confidence motion can be moved against:",
    options: [
      "President",
      "Rajya Sabha",
      "Council of Ministers",
      "Supreme Court",
    ],
    correct: 2,
    explanation:
      "A no-confidence motion can be moved against the Council of Ministers in Lok Sabha.",
  },
  {
    id: 5094,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "Which river is called the lifeline of Telangana?",
    options: ["Krishna", "Tungabhadra", "Godavari", "Periyar"],
    correct: 2,
    explanation: "The Godavari river is considered the lifeline of Telangana.",
  },
  {
    id: 5095,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "The concept of Judicial Review in India is inspired by:",
    options: ["UK", "USA", "France", "Australia"],
    correct: 1,
    explanation:
      "India borrowed the concept of judicial review primarily from the United States Constitution.",
  },
  {
    id: 5096,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question:
      "The Protection of Women from Domestic Violence Act was enacted in:",
    options: ["2003", "2005", "2007", "2010"],
    correct: 1,
    explanation:
      "The Protection of Women from Domestic Violence Act was enacted in 2005.",
  },
  {
    id: 5097,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "The Finance Commission is constituted every:",
    options: ["3 years", "4 years", "5 years", "6 years"],
    correct: 2,
    explanation:
      "Article 280 provides for the constitution of a Finance Commission every five years.",
  },
  // Mental Ability 5098-5120
  {
    id: 5098,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "3, 7, 13, 21, 31, ?",
    options: ["41", "43", "45", "47"],
    correct: 1,
    explanation: "Differences are 4, 6, 8, 10, 12 — next term is 31 + 12 = 43.",
  },
  {
    id: 5099,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Pen : Writer :: Scalpel : ?",
    options: ["Artist", "Surgeon", "Nurse", "Carpenter"],
    correct: 1,
    explanation:
      "A pen is the tool of a writer; a scalpel is the tool of a surgeon.",
  },
  {
    id: 5100,
    year: 0,
    subject: "Mental Ability",
    topic: "Coding",
    question: "If BOOK = 2-15-15-11, what does 4-15-15-18 represent?",
    options: ["DEAR", "DOOR", "BORN", "CORE"],
    correct: 1,
    explanation: "4=D, 15=O, 15=O, 18=R → DOOR.",
  },
  {
    id: 5101,
    year: 0,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question: "A's mother is B's daughter. How is A related to B?",
    options: ["Son", "Grandfather", "Grandson", "Uncle"],
    correct: 2,
    explanation:
      "If A's mother is B's daughter, then A is B's grandchild → A is B's grandson (assuming male).",
  },
  {
    id: 5102,
    year: 0,
    subject: "Mental Ability",
    topic: "Directions",
    question:
      "A man walks 5 km North, then 3 km East. How far is he from the starting point?",
    options: ["√34 km", "8 km", "√32 km", "6 km"],
    correct: 0,
    explanation: "Distance = √(5² + 3²) = √(25+9) = √34 km.",
  },
  {
    id: 5103,
    year: 0,
    subject: "Mental Ability",
    topic: "Syllogism",
    question:
      "All cats are animals. All animals are mortal. Conclusion: All cats are mortal.",
    options: ["True", "False", "Uncertain", "Partially true"],
    correct: 0,
    explanation:
      "By universal syllogism: if all A are B and all B are C, then all A are C.",
  },
  {
    id: 5104,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "35"],
    correct: 1,
    explanation: "These are perfect squares: 1², 2², 3², 4², 5², 6² = 36.",
  },
  {
    id: 5105,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Court : Judge :: Hospital : ?",
    options: ["Patient", "Doctor", "Medicine", "Nurse"],
    correct: 1,
    explanation: "A judge presides in court; a doctor presides in a hospital.",
  },
  {
    id: 5106,
    year: 0,
    subject: "Mental Ability",
    topic: "Odd One Out",
    question: "Which is the odd one out: Rose, Lily, Tulip, Mango?",
    options: ["Rose", "Lily", "Tulip", "Mango"],
    correct: 3,
    explanation: "Rose, Lily, and Tulip are flowers; Mango is a fruit.",
  },
  {
    id: 5107,
    year: 0,
    subject: "Mental Ability",
    topic: "Coding",
    question: "If CAR = 3-1-18, what is BAT?",
    options: ["2-1-20", "2-2-19", "1-2-20", "2-1-19"],
    correct: 0,
    explanation: "B=2, A=1, T=20 → BAT = 2-1-20.",
  },
  {
    id: 5108,
    year: 0,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question:
      "Pointing to a woman, a man says 'Her mother is the wife of my father's son'. How is the woman related to the man?",
    options: ["Daughter", "Sister", "Aunt", "Niece"],
    correct: 0,
    explanation:
      "My father's son = me (if only child); wife of me = my wife; woman's mother = my wife; so woman is my daughter.",
  },
  {
    id: 5109,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "Z, X, V, T, R, ?",
    options: ["P", "Q", "S", "O"],
    correct: 0,
    explanation: "Skipping one letter each time: Z, X, V, T, R, P.",
  },
  {
    id: 5110,
    year: 0,
    subject: "Mental Ability",
    topic: "Directions",
    question:
      "If you face North and turn 90° clockwise, which direction do you face?",
    options: ["South", "West", "East", "North-East"],
    correct: 2,
    explanation: "90° clockwise from North is East.",
  },
  {
    id: 5111,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Doctor : Patient :: Teacher : ?",
    options: ["Book", "Classroom", "Student", "School"],
    correct: 2,
    explanation: "A doctor serves a patient; a teacher serves a student.",
  },
  {
    id: 5112,
    year: 0,
    subject: "Mental Ability",
    topic: "Syllogism",
    question:
      "Some birds can fly. Penguin is a bird. Conclusion: Penguin can fly.",
    options: ["True", "False", "Uncertain", "Partially true"],
    correct: 2,
    explanation:
      "Since only 'some' birds can fly, we cannot conclude that a specific bird (penguin) can fly.",
  },
  {
    id: 5113,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "2, 6, 18, 54, ?",
    options: ["108", "162", "216", "72"],
    correct: 1,
    explanation: "Each term is multiplied by 3: 54 × 3 = 162.",
  },
  {
    id: 5114,
    year: 0,
    subject: "Mental Ability",
    topic: "Coding",
    question: "If APPLE = 1-16-16-12-5, what is MANGO?",
    options: ["13-1-14-7-15", "13-1-13-7-14", "12-1-14-6-15", "14-1-14-7-15"],
    correct: 0,
    explanation: "M=13, A=1, N=14, G=7, O=15 → 13-1-14-7-15.",
  },
  {
    id: 5115,
    year: 0,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question: "A is B's sister. B is C's brother. How is A related to C?",
    options: ["Mother", "Aunt", "Sister", "Cousin"],
    correct: 2,
    explanation:
      "A is B's sister, B is C's brother, so A and C have the same parents — A is C's sister.",
  },
  {
    id: 5116,
    year: 0,
    subject: "Mental Ability",
    topic: "Odd One Out",
    question: "Which is the odd one out: January, March, June, August?",
    options: ["January", "March", "June", "August"],
    correct: 2,
    explanation: "January, March, and August have 31 days; June has 30 days.",
  },
  {
    id: 5117,
    year: 0,
    subject: "Mental Ability",
    topic: "Directions",
    question:
      "A man walks 4 km South, then 3 km West. What is the shortest distance from the starting point?",
    options: ["7 km", "5 km", "6 km", "4 km"],
    correct: 1,
    explanation: "Distance = √(4² + 3²) = √(16+9) = √25 = 5 km.",
  },
  {
    id: 5118,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Fish : Water :: Bird : ?",
    options: ["Tree", "Sky", "Air", "Nest"],
    correct: 2,
    explanation: "Fish lives in water; bird lives in air.",
  },
  {
    id: 5119,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "100, 96, 88, 76, 60, ?",
    options: ["48", "44", "40", "42"],
    correct: 2,
    explanation:
      "Differences are 4, 8, 12, 16, 20 — next term is 60 - 20 = 40.",
  },
  {
    id: 5120,
    year: 0,
    subject: "Mental Ability",
    topic: "Syllogism",
    question:
      "All lawyers are graduates. Ravi is a graduate. Conclusion: Ravi is a lawyer.",
    options: ["True", "False", "Uncertain", "Cannot be determined"],
    correct: 2,
    explanation:
      "Being a graduate is necessary but not sufficient to be a lawyer; conclusion is uncertain.",
  },
];

export const pyqTest6Extra: PYQQuestion[] = [
  // Legal Aptitude 6031-6075
  {
    id: 6031,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: An invitation to offer is not an offer. Facts: A shopkeeper displays goods with price tags. B says 'I accept'. Is there a contract?",
    options: [
      "Yes, display is an offer",
      "No, display is invitation to offer",
      "Yes, price tag is binding",
      "Depends on goods",
    ],
    correct: 1,
    explanation:
      "Display of goods with price tags is an invitation to offer, not an offer itself.",
  },
  {
    id: 6032,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: A person is not liable for acts of independent contractors. Facts: A hires B (independent contractor) to repair his roof. B's negligence injures C. Is A liable?",
    options: [
      "Yes, A hired B",
      "No, B is independent contractor",
      "Both equally liable",
      "Only if A supervised",
    ],
    correct: 1,
    explanation:
      "As a general rule, a principal is not liable for torts of an independent contractor.",
  },
  {
    id: 6033,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Confession made under inducement is not valid. Facts: Police promise lenient treatment if A confesses. A confesses. Is the confession valid?",
    options: [
      "Yes, A voluntarily confessed",
      "No, induced by promise",
      "Yes if witnessed",
      "Depends on crime",
    ],
    correct: 1,
    explanation:
      "A confession obtained by inducement, threat, or promise is inadmissible as evidence.",
  },
  {
    id: 6034,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Double jeopardy prohibits trying a person twice for the same offence. Facts: A is acquitted of murder. New evidence emerges. Can A be tried again for the same murder?",
    options: [
      "Yes, new evidence justifies",
      "No, violates Article 20(2)",
      "Yes, at High Court level",
      "Depends on evidence",
    ],
    correct: 1,
    explanation:
      "Article 20(2) prohibits prosecution twice for the same offence — protection against double jeopardy.",
  },
  {
    id: 6035,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A bailee must take care of goods as a person of ordinary prudence. Facts: A gives his car to B's garage for repair. The car is stolen due to B's negligence. Is B liable?",
    options: [
      "No, theft is unforeseeable",
      "Yes, B failed duty of care",
      "Depends on insurance",
      "Only partially",
    ],
    correct: 1,
    explanation:
      "A bailee must exercise care of an ordinary prudent person; negligence makes B liable.",
  },
  {
    id: 6036,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Occupier of premises owes duty to lawful visitors. Facts: A customer slips on a wet floor in a supermarket that had no warning sign. Who is liable?",
    options: [
      "Customer, should be careful",
      "Supermarket, owed duty to visitor",
      "Both equally",
      "No one",
    ],
    correct: 1,
    explanation:
      "An occupier owes a duty of care to lawful visitors; failure to warn of dangers is negligence.",
  },
  {
    id: 6037,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Conspiracy is agreement between two or more persons to commit an unlawful act. Facts: A and B plan to murder C but do nothing further. Are they guilty?",
    options: [
      "No, no act committed",
      "Yes, criminal conspiracy",
      "Only if C is harmed",
      "Depends on intent proof",
    ],
    correct: 1,
    explanation:
      "Criminal conspiracy is complete upon agreement to commit an unlawful act; no further act is needed.",
  },
  {
    id: 6038,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A principal is bound by acts of his authorized agent. Facts: A authorizes B to buy goods up to Rs. 10,000. B buys goods worth Rs. 12,000. Is A bound for Rs. 12,000?",
    options: [
      "Yes, entire amount",
      "No, only Rs. 10,000",
      "No, A not bound at all",
      "Depends on seller's knowledge",
    ],
    correct: 1,
    explanation:
      "A principal is bound only by acts within the agent's actual authority — Rs. 10,000 only.",
  },
  {
    id: 6039,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Assault is causing apprehension of immediate harmful contact. Facts: A raises his fist at B who is at a great distance. Has A committed assault on B?",
    options: [
      "Yes, threatening gesture",
      "No, B not in immediate apprehension",
      "Yes, intention matters",
      "Depends on reaction",
    ],
    correct: 1,
    explanation:
      "For assault, the apprehension of contact must be immediate; great distance negates this element.",
  },
  {
    id: 6040,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Right to privacy is part of right to life under Article 21. Facts: Government surveillance collects private citizens' personal data without consent. Is this valid?",
    options: [
      "Yes, national security",
      "No, violates right to privacy",
      "Yes if Parliament approves",
      "Depends on data type",
    ],
    correct: 1,
    explanation:
      "Right to privacy is a fundamental right; mass surveillance without legal basis violates Article 21.",
  },
  {
    id: 6041,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Fraud vitiates consent and makes a contract voidable. Facts: A sells a house to B claiming it has no termite problem. It actually does. Can B rescind the contract?",
    options: [
      "No, buyer beware",
      "Yes, fraudulent misrepresentation",
      "Only claim damages",
      "Depends on infestation severity",
    ],
    correct: 1,
    explanation:
      "Fraudulent misrepresentation makes the contract voidable at B's option; B can rescind or claim damages.",
  },
  {
    id: 6042,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Insanity is a complete defence if the accused did not know the nature of the act. Facts: A, suffering from severe psychosis, kills B believing him to be a demon. Is A guilty?",
    options: [
      "Yes, killing is murder",
      "No, defence of insanity",
      "Partially guilty",
      "Depends on medical report",
    ],
    correct: 1,
    explanation:
      "Section 84 IPC provides a complete defence of insanity if the accused did not understand the nature of the act.",
  },
  {
    id: 6043,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Damages in tort must not be too remote. Facts: A negligently causes a car accident. B, stuck in traffic due to the accident, misses a business meeting and loses a major contract. Can B claim that loss from A?",
    options: [
      "Yes, A caused everything",
      "No, loss is too remote",
      "Yes if deal was certain",
      "Partially",
    ],
    correct: 1,
    explanation:
      "The business loss is too remote a consequence of A's negligence; not recoverable.",
  },
  {
    id: 6044,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A contract for unlawful purpose is void. Facts: A hires B to illegally dispose of toxic waste for Rs. 50,000. A refuses to pay. Can B recover?",
    options: [
      "Yes, work was done",
      "No, illegal contract is void",
      "Yes, in civil court",
      "Depends on waste type",
    ],
    correct: 1,
    explanation:
      "Contracts with illegal objects are void; no court will enforce an illegal contract.",
  },
  {
    id: 6045,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Article 226 empowers High Courts to issue writs. Facts: A citizen's fundamental right is violated. Can they approach the High Court?",
    options: [
      "No, only Supreme Court",
      "Yes, under Article 226",
      "Only after lower court remedy",
      "Only if state is party",
    ],
    correct: 1,
    explanation:
      "Article 226 gives High Courts wide jurisdiction to issue writs for enforcement of fundamental rights.",
  },
  {
    id: 6046,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Battery is intentional harmful or offensive contact with a person. Facts: A pats B on the back without consent in an offensive manner. Has A committed battery?",
    options: [
      "No, minor contact",
      "Yes, unwanted offensive contact",
      "Depends on B's reaction",
      "Only if injury",
    ],
    correct: 1,
    explanation:
      "Battery includes any intentional offensive contact without consent, regardless of whether injury results.",
  },
  {
    id: 6047,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: An agent cannot delegate authority unless expressly or impliedly authorized. Facts: A authorizes B to sell his land. B delegates this to C without A's consent. Can C sell?",
    options: [
      "Yes, agent can delegate",
      "No, unauthorized delegation",
      "Yes if B remains responsible",
      "Depends on land value",
    ],
    correct: 1,
    explanation:
      "Delegatus non potest delegare — an agent cannot delegate without the principal's authority.",
  },
  {
    id: 6048,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Rape requires absence of consent. Facts: A has intercourse with B, his wife, without her consent. Has A committed rape under current Indian law?",
    options: [
      "No, married couples cannot",
      "Yes, marital rape is a crime",
      "Partially criminal",
      "Depends on state law",
    ],
    correct: 1,
    explanation:
      "Recent jurisprudence and amendments increasingly recognize marital rape; consent is the key element.",
  },
  {
    id: 6049,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Part performance of a contract can be enforced in equity. Facts: A pays part of the price and takes possession of land under an oral agreement. Can A enforce the agreement?",
    options: [
      "No, oral contract for land is void",
      "Yes, doctrine of part performance",
      "Depends on land value",
      "Only with witnesses",
    ],
    correct: 1,
    explanation:
      "The doctrine of part performance (Section 53A TPA) protects a party who acts on an oral agreement.",
  },
  {
    id: 6050,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: A rescuer who is harmed while helping a victim of negligence can claim damages from the original wrongdoer. Facts: B is injured in a fire caused by A's negligence. C rushes to save B and is injured. Can C sue A?",
    options: [
      "No, voluntary rescue",
      "Yes, A's negligence created the danger",
      "Only if C is professional rescuer",
      "No, A owes no duty to C",
    ],
    correct: 1,
    explanation:
      "The 'rescue doctrine' allows a rescuer harmed in a reasonable rescue attempt to claim from the wrongdoer.",
  },
  {
    id: 6051,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Reasonable restrictions on fundamental rights must be proportionate. Facts: A complete ban on political parties is imposed citing public order. Is this valid?",
    options: [
      "Yes, public order is paramount",
      "No, disproportionate restriction",
      "Yes if temporary",
      "Depends on court ruling",
    ],
    correct: 1,
    explanation:
      "Restrictions on fundamental rights must be proportionate; a complete ban is an excessive restriction.",
  },
  {
    id: 6052,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Anticipatory breach occurs when a party repudiates a contract before performance is due. Facts: A agrees to marry B in December. In October, A says he will not marry B. Can B sue in October?",
    options: [
      "No, must wait until December",
      "Yes, for anticipatory breach",
      "Only if B suffers loss",
      "Depends on type of contract",
    ],
    correct: 1,
    explanation:
      "B can sue immediately upon anticipatory breach without waiting for the date of performance.",
  },
  {
    id: 6053,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Dishonest misappropriation of property is criminal. Facts: A finds B's purse and, knowing who owns it, keeps it. Has A committed an offence?",
    options: [
      "No, finder's rights",
      "Yes, criminal misappropriation",
      "Only civil wrong",
      "Depends on purse value",
    ],
    correct: 1,
    explanation:
      "Dishonestly appropriating another's property constitutes criminal misappropriation under IPC.",
  },
  {
    id: 6054,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Trespass to land requires direct interference. Facts: A digs a trench that causes B's land to subside. Has A trespassed on B's land?",
    options: [
      "Yes, direct interference",
      "No, interference was indirect — it is nuisance",
      "Both trespass and nuisance",
      "No liability",
    ],
    correct: 1,
    explanation:
      "Indirect interference with land is nuisance, not trespass; trespass requires direct entry.",
  },
  {
    id: 6055,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Liquidated damages clause in a contract is enforceable if it is a genuine pre-estimate of loss. Facts: A contract says Rs. 50,000 per day for delay. The actual loss is Rs. 500 per day. Is the clause enforceable?",
    options: [
      "Yes, parties agreed",
      "No, it is a penalty clause",
      "Yes, but only for actual loss",
      "Depends on negotiation",
    ],
    correct: 1,
    explanation:
      "If the stipulated damages are extravagant compared to actual loss, courts treat it as an unenforceable penalty.",
  },
  {
    id: 6056,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Habeas Corpus is a writ that protects against illegal detention. Facts: A person is detained by police for 10 days without producing before a magistrate. What writ is appropriate?",
    options: ["Mandamus", "Certiorari", "Habeas Corpus", "Prohibition"],
    correct: 2,
    explanation:
      "Habeas Corpus literally means 'produce the body' and is used to challenge illegal detention.",
  },
  {
    id: 6057,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: A person who negligently causes a fire that spreads to a neighbor's property is liable. Facts: A burns dry leaves in his garden. Fire spreads to B's house. Is A liable?",
    options: [
      "No, natural hazard",
      "Yes, if he was negligent",
      "No, act of nature",
      "Only if A did not warn",
    ],
    correct: 1,
    explanation:
      "If A negligently allowed a fire to spread, he is liable for the resulting damage to B's property.",
  },
  {
    id: 6058,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: An indemnifier is liable only when the indemnity holder has actually suffered a loss. Facts: A indemnifies B against losses from C's acts. C threatens to sue B. Can B claim indemnity before actual loss?",
    options: [
      "Yes, threat is enough",
      "No, must suffer actual loss first",
      "Yes, anticipatory claim allowed",
      "Depends on indemnity terms",
    ],
    correct: 0,
    explanation:
      "Modern courts recognize that B can compel A to act once the liability becomes certain, even before actual loss.",
  },
  {
    id: 6059,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: A person can be convicted on circumstantial evidence alone if the chain of evidence is complete. Facts: A is found near a crime scene with blood on his hands and the murder weapon. No eyewitness. Can A be convicted?",
    options: [
      "No, no eyewitness",
      "Yes, if circumstantial chain is complete",
      "Insufficient evidence",
      "Acquittal mandatory",
    ],
    correct: 1,
    explanation:
      "Circumstantial evidence, if forming a complete chain pointing to guilt, is sufficient for conviction.",
  },
  {
    id: 6060,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: A person is strictly liable for damage caused by animals known to be dangerous. Facts: X keeps a lion as a pet. The lion escapes and injures Y. Is X strictly liable?",
    options: [
      "No if cage was secure",
      "Yes, dangerous animal — strict liability",
      "Only if negligent",
      "Depends on injury severity",
    ],
    correct: 1,
    explanation:
      "Keeping a wild/dangerous animal imposes strict liability on the keeper for any damage it causes.",
  },
  {
    id: 6061,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A contract of service is personal and cannot be assigned. Facts: A agrees to paint B's portrait. A delegates this to C. Is C's performance binding on B?",
    options: [
      "Yes, same work",
      "No, personal contract cannot be assigned",
      "Yes if quality is same",
      "Depends on B's choice",
    ],
    correct: 1,
    explanation:
      "Personal service contracts cannot be delegated without the other party's consent.",
  },
  {
    id: 6062,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: Public Interest Litigation can be filed by any citizen for enforcement of public rights. Facts: A lawyer files a PIL about poor prison conditions. Is this maintainable?",
    options: [
      "No, lawyer has no personal grievance",
      "Yes, PIL can be filed for public rights",
      "Only if prisoners file",
      "Only in High Court",
    ],
    correct: 1,
    explanation:
      "PIL allows any citizen to approach courts for enforcement of rights of persons unable to approach themselves.",
  },
  {
    id: 6063,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Robbery is theft combined with violence or fear. Facts: A snatches B's purse and runs away without any violence or threat. What offence has A committed?",
    options: ["Robbery", "Theft only", "Extortion", "Dacoity"],
    correct: 1,
    explanation:
      "Without use of force or fear of injury, the offence is merely theft, not robbery.",
  },
  {
    id: 6064,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: An employer owes a duty to provide a safe working environment. Facts: A factory worker is injured because the machinery lacks proper safety guards. Who is liable?",
    options: [
      "Worker, should be careful",
      "Employer, for breach of duty",
      "Machine manufacturer",
      "No one",
    ],
    correct: 1,
    explanation:
      "Employers have a non-delegable duty to provide safe premises, equipment, and working conditions.",
  },
  {
    id: 6065,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Consideration must move from the promisee. Facts: A promises to pay Rs. 5000 to B if C does some work. C does the work. Can C sue A for Rs. 5000?",
    options: [
      "Yes, C did the work",
      "No, consideration did not move from C",
      "Yes in equity",
      "Depends on work value",
    ],
    correct: 1,
    explanation:
      "Under Indian Contract Act, only a party who provides consideration (promisee) can sue on the contract.",
  },
  {
    id: 6066,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: An ordinance must be approved by Parliament within 6 weeks of its next session. Facts: The President promulgates an ordinance. Parliament is not convened for 8 months. What happens to the ordinance?",
    options: [
      "Remains valid indefinitely",
      "Lapses if not approved within 6 weeks of re-assembly",
      "Becomes permanent law",
      "Requires President's renewal",
    ],
    correct: 1,
    explanation:
      "Under Article 123, an ordinance lapses if not approved by Parliament within 6 weeks of its reassembly.",
  },
  {
    id: 6067,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: An employer is vicariously liable for employee's torts within the scope of employment. Facts: A company driver uses the company car for a personal trip and causes an accident. Is the company liable?",
    options: [
      "Yes, company car was used",
      "No, outside scope of employment",
      "Only if company knew",
      "Yes, driver is employee",
    ],
    correct: 1,
    explanation:
      "Personal use of a company vehicle is outside the scope of employment; the company is not liable.",
  },
  {
    id: 6068,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Lien gives a right to retain another's property until a debt is paid. Facts: A tailor refuses to return B's suit until the tailoring charges are paid. Is this valid?",
    options: [
      "No, must return immediately",
      "Yes, valid particular lien",
      "Only for large debts",
      "Depends on contract",
    ],
    correct: 1,
    explanation:
      "A tailor has a particular lien on the garments until the bill for tailoring those garments is paid.",
  },
  {
    id: 6069,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: Extortion requires putting a person in fear to dishonestly obtain property. Facts: A threatens to expose B's secrets unless B pays Rs. 10,000. Has A committed extortion?",
    options: [
      "No, not physical threat",
      "Yes, putting in fear to get property",
      "Only blackmail",
      "Depends on truth of secrets",
    ],
    correct: 1,
    explanation:
      "Putting a person in fear (including exposing secrets) to make them deliver property is extortion.",
  },
  {
    id: 6070,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Volenti non fit injuria requires actual knowledge and acceptance of risk. Facts: A worker in a factory is aware of general dangers but not a specific defect. He is injured by the defect. Can he claim damages?",
    options: [
      "No, assumed all risks",
      "Yes, did not know of specific defect",
      "Partially, assumed general risk",
      "No, employment = consent",
    ],
    correct: 1,
    explanation:
      "Volenti requires voluntary acceptance of a specific known risk; the worker did not accept this unknown defect.",
  },
  {
    id: 6071,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Constitutional Law",
    question:
      "Principle: A state cannot pass laws that are inconsistent with central laws on concurrent list subjects. Facts: A state law on labour conflicts with a central law on the same subject. Which prevails?",
    options: [
      "State law, local matters",
      "Central law prevails",
      "Both apply simultaneously",
      "Court decides each time",
    ],
    correct: 1,
    explanation:
      "Article 254 provides that in case of repugnancy between state and central laws on concurrent list, central law prevails.",
  },
  {
    id: 6072,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: A holder in due course takes a negotiable instrument free from defects. Facts: A buys a cheque from B, who stole it, without knowing of the theft. Can A enforce the cheque?",
    options: [
      "No, B had no title",
      "Yes, A is holder in due course",
      "Only partial value",
      "Depends on bank",
    ],
    correct: 1,
    explanation:
      "A holder in due course who takes a negotiable instrument for value and without notice of defect gets good title.",
  },
  {
    id: 6073,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Criminal Law",
    question:
      "Principle: A public servant who takes a bribe is guilty of corruption. Facts: A government officer demands Rs. 5000 from B to process his application. Has the officer committed an offence?",
    options: [
      "No, it is a private matter",
      "Yes, under Prevention of Corruption Act",
      "Only if proved in court",
      "Only for large amounts",
    ],
    correct: 1,
    explanation:
      "Demanding or accepting bribe by a public servant is an offence under the Prevention of Corruption Act.",
  },
  {
    id: 6074,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Tort",
    question:
      "Principle: Pure economic loss without physical damage is generally not recoverable in negligence. Facts: A negligently cuts a power cable, causing a factory to lose production. No physical damage. Can factory owners claim?",
    options: [
      "Yes, loss is real",
      "No, pure economic loss not recoverable",
      "Yes if loss is significant",
      "Depends on cable ownership",
    ],
    correct: 1,
    explanation:
      "Pure economic loss (without property damage or personal injury) is generally not recoverable in negligence.",
  },
  {
    id: 6075,
    year: 0,
    subject: "Legal Aptitude",
    topic: "Contract",
    question:
      "Principle: Frustration discharges both parties from future obligations. Facts: A hall is hired for a concert. The hall burns down before the concert. What happens to the contract?",
    options: [
      "A must provide alternative",
      "Both discharged, frustrated contract",
      "A must pay damages",
      "Depends on insurance",
    ],
    correct: 1,
    explanation:
      "The contract is frustrated by supervening impossibility; both parties are discharged from obligations.",
  },
  // General Knowledge 6076-6097
  {
    id: 6076,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "The Indian Constitution is the world's:",
    options: [
      "Shortest written constitution",
      "Oldest written constitution",
      "Longest written constitution",
      "First written constitution",
    ],
    correct: 2,
    explanation:
      "The Indian Constitution is the longest written constitution of any sovereign nation.",
  },
  {
    id: 6077,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "Who has the power to declare National Emergency in India?",
    options: [
      "Prime Minister",
      "Parliament",
      "President on advice of Cabinet",
      "Supreme Court",
    ],
    correct: 2,
    explanation:
      "The President declares National Emergency under Article 352 on the written advice of the Union Cabinet.",
  },
  {
    id: 6078,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "The Right to Information Act was enacted in:",
    options: ["2003", "2004", "2005", "2007"],
    correct: 2,
    explanation:
      "The Right to Information Act was enacted in 2005, empowering citizens to access government information.",
  },
  {
    id: 6079,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "The famous Charminar is located in:",
    options: ["Warangal", "Karimnagar", "Hyderabad", "Nizamabad"],
    correct: 2,
    explanation:
      "The Charminar is a monument in Hyderabad, Telangana, built in 1591 by Muhammad Quli Qutb Shah.",
  },
  {
    id: 6080,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "Which article abolishes untouchability?",
    options: ["Article 14", "Article 15", "Article 17", "Article 19"],
    correct: 2,
    explanation:
      "Article 17 abolishes untouchability and forbids its practice in any form.",
  },
  {
    id: 6081,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "The Lok Sabha Speaker is elected by:",
    options: [
      "President",
      "Prime Minister",
      "Members of Lok Sabha",
      "Both Houses",
    ],
    correct: 2,
    explanation:
      "The Speaker of the Lok Sabha is elected by the members of Lok Sabha from among themselves.",
  },
  {
    id: 6082,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian History",
    question:
      "The Indian Independence Act was passed by the British Parliament in:",
    options: ["1945", "1946", "1947", "1948"],
    correct: 2,
    explanation:
      "The Indian Independence Act 1947 led to the creation of India and Pakistan as independent nations.",
  },
  {
    id: 6083,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question:
      "The Consumer Protection Act 2019 provides for complaints to be resolved within:",
    options: ["30 days", "60 days", "90 days", "120 days"],
    correct: 2,
    explanation:
      "The Consumer Protection Act 2019 provides for disposal of complaints within 90 days generally.",
  },
  {
    id: 6084,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "The State Legislative Assembly is called:",
    options: ["Rajya Sabha", "Lok Sabha", "Vidhan Sabha", "Vidhan Parishad"],
    correct: 2,
    explanation:
      "The lower house of state legislature is called Vidhan Sabha (Legislative Assembly).",
  },
  {
    id: 6085,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "Money Bill can only be introduced in:",
    options: ["Rajya Sabha", "Lok Sabha", "Either House", "Joint Session"],
    correct: 1,
    explanation:
      "A Money Bill can only be introduced in the Lok Sabha, not the Rajya Sabha.",
  },
  {
    id: 6086,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "Telangana's official language is:",
    options: ["Hindi", "Urdu", "Telugu", "Both Telugu and Urdu"],
    correct: 3,
    explanation: "Telangana has two official languages: Telugu and Urdu.",
  },
  {
    id: 6087,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question:
      "Article 21A (Right to Education) was inserted by which amendment?",
    options: ["42nd", "44th", "86th", "91st"],
    correct: 2,
    explanation:
      "The 86th Constitutional Amendment (2002) inserted Article 21A, making education a fundamental right.",
  },
  {
    id: 6088,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "The National Human Rights Commission was established under:",
    options: [
      "Human Rights Act 1993",
      "Constitution",
      "Supreme Court Order",
      "UNO directive",
    ],
    correct: 0,
    explanation:
      "NHRC was established under the Protection of Human Rights Act, 1993.",
  },
  {
    id: 6089,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian History",
    question: "Who gave the slogan 'Do or Die' during Quit India Movement?",
    options: [
      "Subhas Chandra Bose",
      "Jawaharlal Nehru",
      "Mahatma Gandhi",
      "Bal Gangadhar Tilak",
    ],
    correct: 2,
    explanation:
      "Mahatma Gandhi gave the 'Do or Die' slogan during the Quit India Movement of 1942.",
  },
  {
    id: 6090,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question:
      "The concept of 'Basic Structure' of Constitution was propounded in:",
    options: [
      "Golaknath case",
      "Kesavananda Bharati case",
      "Maneka Gandhi case",
      "Minerva Mills case",
    ],
    correct: 1,
    explanation:
      "The Supreme Court in Kesavananda Bharati v. State of Kerala (1973) propounded the Basic Structure doctrine.",
  },
  {
    id: 6091,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Polity",
    question: "The Inter-State Council is established under which article?",
    options: ["Article 261", "Article 263", "Article 265", "Article 267"],
    correct: 1,
    explanation:
      "Article 263 empowers the President to establish an Inter-State Council for coordination between states.",
  },
  {
    id: 6092,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "The Negotiable Instruments Act deals with:",
    options: [
      "Land transactions",
      "Cheques, bills of exchange",
      "Criminal procedure",
      "Corporate law",
    ],
    correct: 1,
    explanation:
      "The Negotiable Instruments Act 1881 governs cheques, bills of exchange, and promissory notes.",
  },
  {
    id: 6093,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Telangana",
    question: "Which district of Telangana has the Nagarjuna Sagar dam?",
    options: ["Nalgonda", "Khammam", "Mahbubnagar", "Warangal"],
    correct: 0,
    explanation:
      "The Nagarjuna Sagar dam is located in Nalgonda district of Telangana.",
  },
  {
    id: 6094,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question: "The 73rd Constitutional Amendment created which bodies?",
    options: [
      "Municipal Corporations",
      "Panchayati Raj institutions",
      "State Legislatures",
      "District Courts",
    ],
    correct: 1,
    explanation:
      "The 73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions.",
  },
  {
    id: 6095,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian History",
    question: "The partition of Bengal (1905) was done by:",
    options: [
      "Lord Dalhousie",
      "Lord Curzon",
      "Lord Mountbatten",
      "Lord Ripon",
    ],
    correct: 1,
    explanation:
      "Lord Curzon partitioned Bengal in 1905, which led to the Swadeshi Movement.",
  },
  {
    id: 6096,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Law",
    question: "The Specific Relief Act was amended in:",
    options: ["2012", "2014", "2016", "2018"],
    correct: 3,
    explanation:
      "The Specific Relief (Amendment) Act 2018 made significant changes including making specific performance the rule rather than exception.",
  },
  {
    id: 6097,
    year: 0,
    subject: "GK & Current Affairs",
    topic: "Indian Constitution",
    question:
      "Which schedule of the Constitution lists anti-defection provisions?",
    options: ["8th Schedule", "9th Schedule", "10th Schedule", "11th Schedule"],
    correct: 2,
    explanation:
      "The 10th Schedule (added by 52nd Amendment 1985) contains provisions about disqualification on grounds of defection.",
  },
  // Mental Ability 6098-6120
  {
    id: 6098,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "11, 22, 44, 88, ?",
    options: ["144", "176", "132", "160"],
    correct: 1,
    explanation: "Each term doubles: 88 × 2 = 176.",
  },
  {
    id: 6099,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Microscope : Biologist :: Telescope : ?",
    options: ["Chemist", "Geologist", "Astronomer", "Physicist"],
    correct: 2,
    explanation:
      "A microscope is used by a biologist; a telescope is used by an astronomer.",
  },
  {
    id: 6100,
    year: 0,
    subject: "Mental Ability",
    topic: "Coding",
    question: "If KING = 11-9-14-7, what is LION?",
    options: ["12-9-15-14", "13-9-14-14", "12-10-15-14", "11-9-14-15"],
    correct: 0,
    explanation: "L=12, I=9, O=15, N=14 → 12-9-15-14.",
  },
  {
    id: 6101,
    year: 0,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question: "P's father is Q's son. M is P's brother. How is M related to Q?",
    options: ["Son", "Grandson", "Nephew", "Brother"],
    correct: 1,
    explanation:
      "Q's son is P's father. P's brother is M. So M and P are Q's grandchildren — M is Q's grandson.",
  },
  {
    id: 6102,
    year: 0,
    subject: "Mental Ability",
    topic: "Directions",
    question:
      "A man faces West. He turns 45° clockwise. Which direction is he facing?",
    options: ["North-West", "South-West", "North", "South"],
    correct: 1,
    explanation: "West + 45° clockwise = South-West.",
  },
  {
    id: 6103,
    year: 0,
    subject: "Mental Ability",
    topic: "Syllogism",
    question:
      "No students are lazy. All lazy are failures. Conclusion: No students are failures.",
    options: ["True", "False", "Uncertain", "Partially true"],
    correct: 0,
    explanation:
      "If no students are lazy, and only lazy people are failures, then no students are failures.",
  },
  {
    id: 6104,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "A, C, F, J, O, ?",
    options: ["T", "U", "V", "W"],
    correct: 1,
    explanation: "Gaps increase by 1: +2, +3, +4, +5, +6 → O + 6 = U.",
  },
  {
    id: 6105,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Ice : Cold :: Fire : ?",
    options: ["Wood", "Hot", "Smoke", "Flame"],
    correct: 1,
    explanation: "Ice causes cold; fire causes heat (hot).",
  },
  {
    id: 6106,
    year: 0,
    subject: "Mental Ability",
    topic: "Odd One Out",
    question: "Odd one out: Triangle, Circle, Square, Cylinder",
    options: ["Triangle", "Circle", "Square", "Cylinder"],
    correct: 3,
    explanation:
      "Triangle, Circle, and Square are 2D shapes; Cylinder is a 3D shape.",
  },
  {
    id: 6107,
    year: 0,
    subject: "Mental Ability",
    topic: "Coding",
    question: "If 3×4=24 and 5×6=90, then 2×7=?",
    options: ["28", "56", "42", "14"],
    correct: 1,
    explanation:
      "Pattern: a×b = a×b×(a+b)/something... Let's check: 3×4×2=24; 5×6×3=90; 2×7×4=56. Pattern: a×b×(a+1)=result? 3×4×2=24✓; 5×6×3=90✓; 2×7×4=56✓.",
  },
  {
    id: 6108,
    year: 0,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question:
      "If A + B means A is brother of B, A - B means A is sister of B, A × B means A is father of B, find the relation: P × Q + R",
    options: [
      "P is grandfather of R",
      "R is son of P",
      "R is nephew of P... wait: P is father of Q, Q is brother of R. So P is father of R too.",
      "R is cousin of P",
    ],
    correct: 1,
    explanation:
      "P × Q: P is father of Q. Q + R: Q is brother of R. So P is also father of R.",
  },
  {
    id: 6109,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "19", "20", "21"],
    correct: 3,
    explanation:
      "Fibonacci series: each term is sum of two preceding terms. 8+13=21.",
  },
  {
    id: 6110,
    year: 0,
    subject: "Mental Ability",
    topic: "Directions",
    question:
      "A starts from point X, walks 6 km North, then 8 km East. How far is A from X?",
    options: ["10 km", "14 km", "12 km", "7 km"],
    correct: 0,
    explanation: "Distance = √(6² + 8²) = √(36+64) = √100 = 10 km.",
  },
  {
    id: 6111,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Marathon : Running :: Regatta : ?",
    options: ["Swimming", "Cycling", "Rowing", "Boxing"],
    correct: 2,
    explanation:
      "A marathon is a running event; a regatta is a rowing/boat racing event.",
  },
  {
    id: 6112,
    year: 0,
    subject: "Mental Ability",
    topic: "Syllogism",
    question:
      "All politicians are humans. Some humans are honest. Conclusion: Some politicians are honest.",
    options: ["True", "False", "Uncertain", "Partially true"],
    correct: 2,
    explanation:
      "We cannot conclude that the honest humans overlap with the politicians; it is uncertain.",
  },
  {
    id: 6113,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "256, 64, 16, 4, ?",
    options: ["2", "1", "0.5", "3"],
    correct: 1,
    explanation: "Each term is divided by 4: 4 ÷ 4 = 1.",
  },
  {
    id: 6114,
    year: 0,
    subject: "Mental Ability",
    topic: "Coding",
    question: "If WHITE = 23-8-9-20-5, what is BLACK?",
    options: ["2-12-1-3-11", "2-11-1-3-12", "1-12-2-3-11", "2-12-2-3-11"],
    correct: 0,
    explanation: "B=2, L=12, A=1, C=3, K=11 → 2-12-1-3-11.",
  },
  {
    id: 6115,
    year: 0,
    subject: "Mental Ability",
    topic: "Odd One Out",
    question: "Odd one out: Lawyer, Judge, Doctor, Magistrate",
    options: ["Lawyer", "Judge", "Doctor", "Magistrate"],
    correct: 2,
    explanation:
      "Lawyer, Judge, and Magistrate belong to the legal profession; Doctor belongs to medicine.",
  },
  {
    id: 6116,
    year: 0,
    subject: "Mental Ability",
    topic: "Blood Relations",
    question:
      "X is Y's brother. Y is Z's mother. Z is W's sister. How is X related to W?",
    options: ["Father", "Uncle", "Brother", "Grandfather"],
    correct: 1,
    explanation:
      "X is Y's brother → X is W's uncle (since Y is W's mother through Z... Y is Z's mother, Z is W's sister, so Y is also W's mother). X is Y's brother = W's uncle.",
  },
  {
    id: 6117,
    year: 0,
    subject: "Mental Ability",
    topic: "Directions",
    question:
      "Facing South, I turned right and walked, then turned left. Which direction am I now facing?",
    options: ["North", "East", "West", "South"],
    correct: 3,
    explanation:
      "Facing South, turn right → West; turn left from West → South.",
  },
  {
    id: 6118,
    year: 0,
    subject: "Mental Ability",
    topic: "Series",
    question: "5, 10, 20, 40, ?",
    options: ["60", "70", "80", "90"],
    correct: 2,
    explanation: "Each term doubles: 40 × 2 = 80.",
  },
  {
    id: 6119,
    year: 0,
    subject: "Mental Ability",
    topic: "Analogy",
    question: "Thermometer : Temperature :: Barometer : ?",
    options: ["Wind", "Rainfall", "Pressure", "Humidity"],
    correct: 2,
    explanation:
      "A thermometer measures temperature; a barometer measures atmospheric pressure.",
  },
  {
    id: 6120,
    year: 0,
    subject: "Mental Ability",
    topic: "Syllogism",
    question:
      "All trees are plants. All plants need water. Conclusion: All trees need water.",
    options: ["True", "False", "Uncertain", "Cannot say"],
    correct: 0,
    explanation:
      "By universal syllogism: if all trees are plants and all plants need water, then all trees need water.",
  },
];
