export interface Question {
  id: string;
  subject: "polity" | "history" | "geography";
  topic: string;
  text: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
}

export const upscQuestions: Question[] = [
  // ── POLITY ──────────────────────────────────────────────────────────────────
  {
    id: "p01",
    subject: "polity",
    topic: "Basic Structure Doctrine",
    text: "The 'Basic Structure Doctrine' holds that certain features of the Constitution cannot be amended by Parliament. Which landmark case established this doctrine?",
    options: [
      "Golaknath v. State of Punjab",
      "Kesavananda Bharati v. State of Kerala",
      "Minerva Mills v. Union of India",
      "Shankari Prasad v. Union of India",
    ],
    correct: 1,
    explanation:
      "In Kesavananda Bharati (1973), a 13-judge bench held that Parliament's amending power under Article 368 cannot destroy the 'basic structure' of the Constitution. This overruled the absolute amending power implied in earlier cases.",
  },
  {
    id: "p02",
    subject: "polity",
    topic: "Money Bill Procedure",
    text: "If a bill is certified as a 'Money Bill' by the Speaker, the Rajya Sabha can at most:",
    options: [
      "Reject the bill outright",
      "Amend it and return it",
      "Recommend amendments within 14 days, which the Lok Sabha may accept or reject",
      "Hold the bill indefinitely",
    ],
    correct: 2,
    explanation:
      "Under Article 110, a Money Bill is sent to Rajya Sabha for recommendations only. Rajya Sabha has 14 days to suggest amendments, but the Lok Sabha is not bound to accept them. If not returned in 14 days, the bill is deemed passed.",
  },
  {
    id: "p03",
    subject: "polity",
    topic: "Article 201 Pocket Veto",
    text: "Which provision allows the President to withhold assent to a bill passed by a State Legislature, effectively using a 'pocket veto' at the Centre's discretion?",
    options: ["Article 200", "Article 201", "Article 254", "Article 356"],
    correct: 1,
    explanation:
      "Article 201 allows the Governor to reserve a State bill for the President's consideration. The President may withhold assent without any time limit, which functions as a pocket veto unlike the time-bound provisions for Central bills.",
  },
  {
    id: "p04",
    subject: "polity",
    topic: "Harmonious Construction",
    text: "The doctrine of 'Harmonious Construction' in constitutional interpretation means:",
    options: [
      "Courts must prefer the literal meaning of words",
      "Conflicting provisions must be read so each retains effect without nullifying the other",
      "Central law always prevails over State law",
      "Fundamental Rights override Directive Principles in all circumstances",
    ],
    correct: 1,
    explanation:
      "Harmonious construction requires courts to interpret seemingly conflicting provisions in a way that gives effect to both, avoiding the conclusion that one provision makes another redundant. This preserves the coherence of the constitutional scheme.",
  },
  {
    id: "p05",
    subject: "polity",
    topic: "Fundamental Duties Origin",
    text: "Fundamental Duties under Article 51A were inserted by which constitutional amendment and on the recommendation of which committee?",
    options: [
      "42nd Amendment, Swaran Singh Committee",
      "44th Amendment, Shah Commission",
      "42nd Amendment, Sarkaria Commission",
      "86th Amendment, National Commission to Review the Constitution",
    ],
    correct: 0,
    explanation:
      "The 42nd Constitutional Amendment (1976) inserted Fundamental Duties (Article 51A) on the recommendation of the Swaran Singh Committee. Originally 10 duties, an 11th was added by the 86th Amendment (2002).",
  },
  {
    id: "p06",
    subject: "polity",
    topic: "Colourable Legislation",
    text: "Under the doctrine of 'Colourable Legislation', a law is invalidated when:",
    options: [
      "The legislature enacts law on a subject it ostensibly has power over, but in substance encroaches on another's jurisdiction",
      "The law violates the basic structure of the Constitution",
      "The law discriminates on grounds of religion",
      "Parliament acts beyond its constituent power",
    ],
    correct: 0,
    explanation:
      "Colourable legislation ('what cannot be done directly cannot be done indirectly') strikes down laws that, while appearing within competence, are actually an indirect usurpation of another legislature's exclusive domain.",
  },
  {
    id: "p07",
    subject: "polity",
    topic: "Article 21 Due Process",
    text: "The phrase 'procedure established by law' in Article 21 was interpreted to include 'due process of law' standards (fairness, reasonableness) primarily in which case?",
    options: [
      "A.K. Gopalan v. State of Madras",
      "Maneka Gandhi v. Union of India",
      "R.C. Cooper v. Union of India",
      "S.P. Gupta v. Union of India",
    ],
    correct: 1,
    explanation:
      "In Maneka Gandhi (1978), the Supreme Court held that 'procedure established by law' must be right, just, and fair—not arbitrary or oppressive—effectively reading American-style due process into Article 21.",
  },
  {
    id: "p08",
    subject: "polity",
    topic: "Preventive Detention Grounds",
    text: "Which of the following is NOT a ground on which preventive detention can be ordered under Article 22?",
    options: [
      "Security of the State",
      "Maintenance of public order",
      "Maintenance of supplies and services essential to the community",
      "Punishment for a cognizable offence already committed",
    ],
    correct: 3,
    explanation:
      "Article 22 permits preventive detention (without trial) for security of the state, public order, and essential supplies. Detention as punishment for a past offence is ordinary criminal law, not preventive detention.",
  },
  {
    id: "p09",
    subject: "polity",
    topic: "Finance Commission Role",
    text: "A Finance Commission is constituted by the President under Article 280 primarily to:",
    options: [
      "Approve the Union Budget",
      "Distribute tax revenues and grants between the Centre and States",
      "Regulate the Reserve Bank of India",
      "Oversee Central Plan expenditure",
    ],
    correct: 1,
    explanation:
      "The Finance Commission (Article 280) recommends the distribution of tax proceeds between the Union and States, principles governing grants-in-aid to States, and measures to augment the Consolidated Fund of a State.",
  },
  {
    id: "p10",
    subject: "polity",
    topic: "Article 3 State Formation",
    text: "Which article gives Parliament the power to form new States and alter boundaries of existing States?",
    options: ["Article 1", "Article 3", "Article 4", "Article 368"],
    correct: 1,
    explanation:
      "Article 3 empowers Parliament (by simple majority) to form new States, alter boundaries, change names, or diminish territory of existing States. A bill for this purpose requires the President's recommendation and must be referred to affected State Legislatures for views.",
  },
  {
    id: "p11",
    subject: "polity",
    topic: "Judicial Activism Concept",
    text: "The concept of 'Judicial Activism' is most accurately described as:",
    options: [
      "Judges making policy decisions that belong to the executive",
      "Courts expanding their interpretive role to enforce constitutional rights, especially when other branches fail",
      "Parliament overriding judicial decisions by legislation",
      "Strict literal interpretation of statutory text",
    ],
    correct: 1,
    explanation:
      "Judicial activism refers to a proactive stance by courts—expanding rights, issuing public-interest remedies, and intervening when the legislature or executive neglects constitutional obligations. It contrasts with judicial restraint.",
  },
  {
    id: "p12",
    subject: "polity",
    topic: "National Emergency Approval",
    text: "Under Article 352 (National Emergency), if the Cabinet recommends an emergency proclamation, Parliament must approve it within:",
    options: ["7 days", "14 days", "30 days", "One month"],
    correct: 2,
    explanation:
      "The 44th Amendment requires a proclamation under Article 352 to be approved by both Houses within one month by a special majority (2/3 of members present and voting, and majority of total membership).",
  },
  {
    id: "p13",
    subject: "polity",
    topic: "Doctrine of Eclipse",
    text: "The 'Doctrine of Eclipse' in constitutional law means:",
    options: [
      "A law becomes void when it conflicts with a Fundamental Right, but revives if the Right is amended away",
      "A law is permanently void once declared unconstitutional",
      "Parliament eclipses State powers during emergency",
      "Judicial review overshadows legislative intent",
    ],
    correct: 0,
    explanation:
      "The Doctrine of Eclipse states that a pre-constitutional law inconsistent with Fundamental Rights becomes 'eclipsed' (not void but dormant) and is revived if the relevant Right is amended to remove the inconsistency.",
  },
  {
    id: "p14",
    subject: "polity",
    topic: "DPSPs Non-Justiciability",
    text: "Directive Principles of State Policy are 'non-justiciable' primarily because:",
    options: [
      "They are unimportant constitutional provisions",
      "Courts cannot enforce them directly; they guide state policy without creating enforceable individual rights",
      "They apply only to the Union, not States",
      "They can only be enforced after constitutional amendment",
    ],
    correct: 1,
    explanation:
      "Article 37 makes DPSPs 'fundamental in the governance of the country' but states they shall not be enforceable by any court. They set goals for policy-making rather than conferring judicially enforceable rights.",
  },
  {
    id: "p15",
    subject: "polity",
    topic: "Third Schedule Oaths",
    text: "Which schedule of the Constitution contains the oaths of office and secrecy for constitutional functionaries?",
    options: [
      "Second Schedule",
      "Third Schedule",
      "Fourth Schedule",
      "Fifth Schedule",
    ],
    correct: 1,
    explanation:
      "The Third Schedule contains the forms of oaths or affirmations for MPs, ministers, judges, and other constitutional office-holders including the President, Vice President, and Governors.",
  },
  {
    id: "p16",
    subject: "polity",
    topic: "Anti-Defection Law",
    text: "The Tenth Schedule (Anti-Defection Law) disqualifies an elected member if:",
    options: [
      "The member abstains from voting against party whip",
      "The member voluntarily gives up party membership or votes contrary to party direction without prior permission",
      "The member misses three consecutive sessions",
      "The member contests a by-election from a different constituency",
    ],
    correct: 1,
    explanation:
      "Under the Tenth Schedule (added by the 52nd Amendment, 1985), a member is disqualified if they voluntarily give up party membership or vote/abstain contrary to party whip without condoning permission within 15 days.",
  },
  {
    id: "p17",
    subject: "polity",
    topic: "CAG Audit Reports",
    text: "The Comptroller and Auditor General (CAG) submits audit reports to:",
    options: [
      "The Finance Minister",
      "The President (for Union accounts) and Governors (for State accounts)",
      "The Speaker of Lok Sabha",
      "The Cabinet Secretary",
    ],
    correct: 1,
    explanation:
      "Under Article 151, the CAG submits reports on Union accounts to the President, who lays them before Parliament. State reports are submitted to the Governor, who places them before the State Legislature.",
  },
  {
    id: "p18",
    subject: "polity",
    topic: "Right to Constitutional Remedies",
    text: "The 'Right to Constitutional Remedies' under Article 32 is considered the 'heart and soul' of the Constitution because:",
    options: [
      "It lists all Fundamental Rights in one place",
      "Without it, other Fundamental Rights would be unenforceable",
      "It grants the Supreme Court unlimited jurisdiction",
      "It allows Parliament to suspend all rights during emergencies",
    ],
    correct: 1,
    explanation:
      "Dr. Ambedkar called Article 32 the 'heart and soul' of the Constitution because it provides a guaranteed constitutional remedy before the Supreme Court for enforcement of Fundamental Rights, making those rights meaningful.",
  },
  {
    id: "p19",
    subject: "polity",
    topic: "Concurrent List Conflict",
    text: "Under the concurrent list, if there is a conflict between Central and State legislation, which prevails?",
    options: [
      "State law always prevails",
      "Central law prevails, unless State law received President's assent and Parliament has not passed a repugnant law later",
      "The Supreme Court decides case by case",
      "Whichever law was passed first prevails",
    ],
    correct: 1,
    explanation:
      "Article 254 states that Central law prevails over repugnant State law on a concurrent subject. However, a State law reserved for and assented to by the President prevails over an earlier Central law, but is overridden if Parliament subsequently legislates on the same matter.",
  },
  {
    id: "p20",
    subject: "polity",
    topic: "Public Interest Litigation",
    text: "Public Interest Litigation (PIL) differs from ordinary litigation primarily in that:",
    options: [
      "PIL is filed only by the government",
      "Any citizen can approach the court for redress of public grievances even without personal injury",
      "PIL bypasses High Courts and goes directly to the Supreme Court",
      "PIL is restricted to environmental matters",
    ],
    correct: 1,
    explanation:
      "PIL relaxes the rule of locus standi: any public-spirited person can bring an action on behalf of disadvantaged sections who cannot access courts. Courts have used PIL to enforce socioeconomic rights and issue structural remedies.",
  },
  {
    id: "p21",
    subject: "polity",
    topic: "Article 139A Case Transfer",
    text: "Which constitutional provision empowers the Supreme Court to transfer cases from one High Court to another?",
    options: ["Article 131", "Article 136", "Article 139A", "Article 142"],
    correct: 2,
    explanation:
      "Article 139A allows the Supreme Court to transfer cases involving the same or substantially the same questions of law from one High Court to another or to itself, ensuring uniform interpretation.",
  },
  {
    id: "p22",
    subject: "polity",
    topic: "Presidential Constitutional Discretion",
    text: "The President of India exercises 'constitutional discretion' (independent of Council of Ministers' advice) most clearly when:",
    options: [
      "Addressing a joint session of Parliament",
      "Appointing the Prime Minister when no party has a clear majority",
      "Granting pardons under Article 72",
      "Signing international treaties",
    ],
    correct: 1,
    explanation:
      "While the President is generally bound by Cabinet advice, appointment of the PM when there is a hung Parliament requires the President to exercise personal discretion to identify who commands majority support. Other acts like pardons and treaties follow ministerial advice.",
  },
  {
    id: "p23",
    subject: "polity",
    topic: "Cooperative Federalism",
    text: "The concept of 'Cooperative Federalism' is best illustrated by which constitutional mechanism?",
    options: [
      "Inter-State Council under Article 263",
      "Emergency provisions under Article 356",
      "Residuary powers with the Centre",
      "Governor's power of reservation",
    ],
    correct: 0,
    explanation:
      "The Inter-State Council (Article 263) facilitates discussion and coordination between the Centre and States on common policy matters, exemplifying cooperative federalism where both levels work together rather than in conflict.",
  },
  {
    id: "p24",
    subject: "polity",
    topic: "42nd Amendment Scope",
    text: "Which amendment introduced 'Fundamental Duties' and also curtailed Fundamental Rights by inserting Article 31C, shielding Directive Principles from judicial review?",
    options: [
      "25th Amendment",
      "42nd Amendment",
      "44th Amendment",
      "52nd Amendment",
    ],
    correct: 1,
    explanation:
      "The 42nd Amendment (1976, during Emergency) was the most sweeping, adding Fundamental Duties (Art 51A), expanding Art 31C to protect all DPSPs from FR challenges, and curtailing judicial review—many provisions were later reversed by the 44th Amendment.",
  },
  {
    id: "p25",
    subject: "polity",
    topic: "Indian Separation of Powers",
    text: "The doctrine of 'Separation of Powers' in India differs from the US model in that:",
    options: [
      "India has no independent judiciary",
      "Indian Constitution does not explicitly separate powers but creates checks and balances within a parliamentary system where executive derives from legislature",
      "India's President has more power than the US President",
      "Indian Parliament cannot override judicial decisions",
    ],
    correct: 1,
    explanation:
      "India does not have a strict separation like the US. The executive (Council of Ministers) is part of Parliament and accountable to it (parliamentary system). However, judicial independence and constitutional limitations create checks and balances.",
  },

  // ── HISTORY ─────────────────────────────────────────────────────────────────
  {
    id: "h01",
    subject: "history",
    topic: "Non-Cooperation Movement Withdrawal",
    text: "The Non-Cooperation Movement (1920-22) was withdrawn by Gandhi primarily because of:",
    options: [
      "British concessions under the Montagu-Chelmsford reforms",
      "The Chauri Chaura incident, where a mob burned a police station killing constables",
      "A split within the Indian National Congress",
      "The arrest of Bal Gangadhar Tilak",
    ],
    correct: 1,
    explanation:
      "Gandhi called off the movement in February 1922 after a crowd in Chauri Chaura (UP) burnt a police station, killing 22 constables. He believed the movement had not achieved the non-violent discipline necessary for mass civil disobedience.",
  },
  {
    id: "h02",
    subject: "history",
    topic: "Permanent Settlement 1793",
    text: "The 'Permanent Settlement' of 1793 introduced by Lord Cornwallis primarily benefited:",
    options: [
      "Peasant cultivators by fixing their land revenue",
      "Zamindars by converting them into private landowners with fixed revenue obligations to the state",
      "The Mughal court by regularizing tribute",
      "Artisans through protection of craft industries",
    ],
    correct: 1,
    explanation:
      "Permanent Settlement made zamindars hereditary proprietors of land if they paid fixed revenue to the Company. While it gave fiscal certainty to the Company, it turned zamindars into landlords and left peasants vulnerable to rack-renting.",
  },
  {
    id: "h03",
    subject: "history",
    topic: "Ryotwari Land Revenue System",
    text: "The Ryotwari system, introduced primarily in Madras and Bombay, differed from the Zamindari system in that:",
    options: [
      "The state collected revenue directly from individual peasant cultivators without an intermediary landlord",
      "Revenue was collected through village communities",
      "It was based on the profits of trade",
      "Zamindars paid a fixed share under Ryotwari too",
    ],
    correct: 0,
    explanation:
      "Under Ryotwari (Munro in Madras, Elphinstone in Bombay), the government settled directly with the ryot (peasant) who was recognised as the proprietor. This eliminated the zamindar intermediary but led to high assessments and peasant distress.",
  },
  {
    id: "h04",
    subject: "history",
    topic: "Civil Disobedience Women Participation",
    text: "Which aspect of the Civil Disobedience Movement (1930-34) represented a qualitative advance over earlier nationalist mobilisation?",
    options: [
      "For the first time industrialists supported the Congress",
      "Women participated on a large scale as a distinct social group for the first time in mass protests",
      "The movement had a clear demand for Dominion Status rather than complete independence",
      "The movement was led by a joint Hindu-Muslim leadership",
    ],
    correct: 1,
    explanation:
      "The CDM saw unprecedented participation by women—picketing liquor shops, marching in salt satyagraha, and courting arrest. This mass female mobilisation was qualitatively new in the freedom struggle and had lasting social significance.",
  },
  {
    id: "h05",
    subject: "history",
    topic: "Bhakti Movement Social Impact",
    text: "The Bhakti Movement's most significant social consequence in medieval India was:",
    options: [
      "Conversion of the majority of Hindus to Islam",
      "Challenging caste hierarchy by emphasising personal devotion to God accessible to all, regardless of birth",
      "Unifying Hinduism under a single theological doctrine",
      "Establishing temples as centres of political power",
    ],
    correct: 1,
    explanation:
      "Bhakti saints like Kabir, Ravidas, Mirabai, and Tukaram preached direct access to God through love and devotion, bypassing Brahmanical rituals and caste distinctions. This democratised religious life and challenged Brahmin authority.",
  },
  {
    id: "h06",
    subject: "history",
    topic: "Drain of Wealth Theory",
    text: "The 'Drain of Wealth' theory was most systematically articulated by:",
    options: [
      "Gopal Krishna Gokhale",
      "Dadabhai Naoroji in 'Poverty and Un-British Rule in India'",
      "Bal Gangadhar Tilak",
      "R.C. Dutt in his Economic History",
    ],
    correct: 1,
    explanation:
      "Dadabhai Naoroji's 'Poverty and Un-British Rule in India' (1901) calculated the economic drain quantitatively, arguing that India's poverty was structurally caused by tribute paid to Britain through trade surpluses and home charges.",
  },
  {
    id: "h07",
    subject: "history",
    topic: "Partition of Bengal 1905",
    text: "The Partition of Bengal in 1905 by Lord Curzon had the unintended consequence of:",
    options: [
      "Weakening the nationalist movement by dividing Hindus and Muslims permanently",
      "Galvanising mass nationalism and giving rise to the Swadeshi and Boycott movements",
      "Satisfying Bengali Muslim demands and consolidating British rule",
      "Leading directly to the formation of the Muslim League",
    ],
    correct: 1,
    explanation:
      "Partition was meant to divide nationalist Bengal, but it instead ignited mass protests, the Swadeshi (use of Indian goods) and Boycott (of British goods) movements, and a new phase of militant nationalism, forcing its annulment in 1911.",
  },
  {
    id: "h08",
    subject: "history",
    topic: "Third Battle of Panipat",
    text: "The Third Battle of Panipat (1761) was significant primarily because:",
    options: [
      "It ended Mughal rule in India",
      "The Maratha defeat halted their bid for pan-Indian dominance and created a power vacuum that the British ultimately filled",
      "It brought the Durrani empire to control all of northern India",
      "It marked the first use of artillery in Indian warfare",
    ],
    correct: 1,
    explanation:
      "The Marathas' catastrophic loss to Ahmad Shah Durrani shattered their military power and imperial ambitions. Their inability to fill the post-Mughal vacuum allowed the British to expand and eventually dominate the subcontinent.",
  },
  {
    id: "h09",
    subject: "history",
    topic: "Subsidiary Alliance System",
    text: "The 'Subsidiary Alliance' system, introduced by Wellesley, was fundamentally a means to:",
    options: [
      "Protect Indian states from foreign invasion at Indian states' own expense, while binding them to British political control",
      "Provide military training to Indian princely armies",
      "Allow Indian rulers to participate in British military campaigns",
      "Share revenue between the Company and Indian princes",
    ],
    correct: 0,
    explanation:
      "Under Subsidiary Alliance, Indian rulers agreed to maintain British troops at their own expense, exclude other Europeans, and surrender foreign policy control. This achieved British paramountcy without formal annexation while draining Indian state finances.",
  },
  {
    id: "h10",
    subject: "history",
    topic: "Revolt of 1857 Interpretation",
    text: "The Revolt of 1857 is interpreted as a 'Sepoy Mutiny' by some historians and a 'First War of Independence' by others. The strongest argument for the latter interpretation is:",
    options: [
      "It was started by civilians, not soldiers",
      "It spread beyond sepoys to include peasants, zamindars, and dispossessed rulers showing broader grievances against colonial rule",
      "It had a unified ideological programme",
      "It succeeded in expelling the British from Bengal",
    ],
    correct: 1,
    explanation:
      "While triggered by the greased cartridge episode, the revolt drew in diverse groups—Awadh taluqdars, Delhi artisans, peasants—reflecting broad socioeconomic and political discontents. This wider participation justifies viewing it as more than a mere military mutiny.",
  },
  {
    id: "h11",
    subject: "history",
    topic: "Satyagraha Philosophy",
    text: "Mahatma Gandhi's strategy of 'Satyagraha' was philosophically rooted in:",
    options: [
      "Marxist class struggle theory",
      "The Sermon on the Mount and Tolstoy's non-resistance, combined with the Indian concept of ahimsa (non-violence)",
      "Utilitarian philosophy of maximum happiness",
      "Social Darwinism applied to colonised peoples",
    ],
    correct: 1,
    explanation:
      "Satyagraha ('truth-force') drew from Tolstoy's passive resistance, the Bhagavad Gita's concept of selfless action, and Jain/Hindu ahimsa. Gandhi corresponded with Tolstoy and saw soul-force as the moral weapon of the weak against physical force.",
  },
  {
    id: "h12",
    subject: "history",
    topic: "Montagu-Chelmsford Dyarchy",
    text: "The Montagu-Chelmsford Reforms (1919) introduced 'dyarchy' in provincial governments, meaning:",
    options: [
      "Two separate legislative chambers in each province",
      "Division of provincial subjects into 'transferred' (under elected ministers) and 'reserved' (under the Governor's executive council)",
      "Joint governance by two provinces",
      "Equal power sharing between Hindus and Muslims in provincial cabinets",
    ],
    correct: 1,
    explanation:
      "Dyarchy split provincial administration: 'transferred' subjects (education, health, agriculture) went to ministers responsible to elected legislatures, while 'reserved' subjects (law and order, finance) remained with the Governor's appointed council—a limited experiment in self-governance.",
  },
  {
    id: "h13",
    subject: "history",
    topic: "Indus Valley Urban Planning",
    text: "The Indus Valley Civilisation's urban planning is most distinguished by:",
    options: [
      "Monumental temple architecture similar to Mesopotamia",
      "Grid-pattern streets, standardised brick sizes, and sophisticated drainage systems suggesting centralised civic administration",
      "Large palace complexes indicating absolute monarchy",
      "Fortified military outposts at regular intervals",
    ],
    correct: 1,
    explanation:
      "Harappan cities like Mohenjo-daro and Harappa show grid layouts, uniform burnt-brick sizes, and elaborate covered drains—evidence of sophisticated urban planning and possibly a form of collective civic governance, unlike contemporary river-valley civilisations.",
  },
  {
    id: "h14",
    subject: "history",
    topic: "Ashoka Kalinga Conversion",
    text: "Ashoka's conversion to Buddhism after Kalinga is significant in political history because it represents:",
    options: [
      "The first separation of church and state in India",
      "A ruler transforming the moral basis of statecraft from conquest (digvijaya) to welfare and non-violence (dhamma)",
      "The end of the Mauryan empire's expansion",
      "The beginning of persecution of non-Buddhist religions",
    ],
    correct: 1,
    explanation:
      "Ashoka's rock edicts show a shift from military expansion to dhamma—welfare of subjects, tolerance of all sects, and peaceful diplomacy. This redefinition of royal virtue through ethics rather than conquest was philosophically novel.",
  },
  {
    id: "h15",
    subject: "history",
    topic: "British Deindustrialisation",
    text: "The economic significance of the British Deindustrialisation of India was that it:",
    options: [
      "Was beneficial because it replaced inefficient cottage industry with modern factories",
      "Destroyed handicraft industries through free trade policies that flooded Indian markets with cheap British machine-made goods, displacing artisans",
      "Was limited to the textile sector and did not affect other crafts",
      "Was offset by the development of railways",
    ],
    correct: 1,
    explanation:
      "Manchester textiles undercut Indian handloom weavers who could not compete. India went from a net exporter of textiles to an importer. Millions of artisans were displaced without equivalent industrial employment being created, contributing to mass poverty.",
  },
  {
    id: "h16",
    subject: "history",
    topic: "Quit India Movement 1942",
    text: "The Quit India Movement (1942) differed from earlier movements in that:",
    options: [
      "It was led by Subhas Chandra Bose",
      "Gandhi gave a call for 'Do or Die,' making it the most uncompromising demand for immediate independence, and the Congress leadership was arrested, leading to spontaneous leaderless mass action",
      "It had active support from the British Labour Party",
      "It was confined to urban areas and did not involve peasants",
    ],
    correct: 1,
    explanation:
      "The August 1942 movement was distinctive: mass arrests of all Congress leaders on day one meant ordinary people had to act independently, creating widespread underground resistance, sabotage, and parallel governments in some areas—unprecedented in scale and character.",
  },
  {
    id: "h17",
    subject: "history",
    topic: "World War I Economic Impact India",
    text: "The economic impact of World War I on India was paradoxical in that:",
    options: [
      "India gained nothing from the war effort",
      "While India supplied men and resources at great cost, Indian industry temporarily grew as British goods supply was disrupted, boosting the 'Swadeshi' industrial movement",
      "Indian agriculture benefited from price controls",
      "The war strengthened the rupee against the pound",
    ],
    correct: 1,
    explanation:
      "WWI disrupted British exports to India, giving Indian textile mills and other industries a window to expand. At the same time, India contributed £146 million and a million soldiers. This combination of wartime sacrifice and economic awareness deepened nationalist sentiment.",
  },
  {
    id: "h18",
    subject: "history",
    topic: "Mughal Mansab System",
    text: "The concept of 'Mansab' in the Mughal administrative system essentially indicated:",
    options: [
      "Land grants given for military service",
      "A numerical rank that determined both the status and the salary of an officer in the Mughal nobility",
      "Hereditary titles passed through families",
      "Religious positions in the Mughal court",
    ],
    correct: 1,
    explanation:
      "The mansabdari system assigned numerical ranks (mansabs) to all imperial officials, indicating their position in the hierarchy and determining pay (in cash or equivalent jagir). Ranks were not hereditary and could be raised or lowered by the emperor.",
  },
  {
    id: "h19",
    subject: "history",
    topic: "Government of India Act 1935",
    text: "The significance of the Government of India Act, 1935 lies in the fact that:",
    options: [
      "It granted complete independence to India",
      "It provided the framework for a federal constitution with provincial autonomy that largely became the basis for independent India's Constitution",
      "It established the Constituent Assembly",
      "It gave voting rights to all Indian adults for the first time",
    ],
    correct: 1,
    explanation:
      "The 1935 Act introduced provincial autonomy, an all-India federation (never implemented), and detailed administrative machinery. Framers of the Indian Constitution borrowed heavily from it—federal structure, Governor's role, emergency provisions, and administrative services.",
  },
  {
    id: "h20",
    subject: "history",
    topic: "Lucknow Pact 1916",
    text: "The Lucknow Pact of 1916 was significant because it:",
    options: [
      "Ended the Morley-Minto reforms era",
      "Represented an agreement between the Congress and Muslim League on a common constitutional demand and separate electorates, briefly reuniting the nationalist front",
      "Established joint Hindu-Muslim governance of the princely states",
      "Created the basis for the Partition of India",
    ],
    correct: 1,
    explanation:
      "The Pact brought Tilak's Congress and Jinnah's Muslim League together: Congress accepted separate electorates for Muslims, while the League joined the demand for self-government. It represented rare Hindu-Muslim political unity, though it also institutionalised communal representation.",
  },
  {
    id: "h21",
    subject: "history",
    topic: "Forward Bloc Formation",
    text: "The 'Forward Bloc' was founded by Subhas Chandra Bose primarily because:",
    options: [
      "He was expelled from Congress for violence",
      "He disagreed with Gandhi's dominance and the Congress's hesitancy about immediate and total independence through more aggressive means",
      "He wanted to form an alliance with the British government",
      "He sought to represent Bengali interests alone",
    ],
    correct: 1,
    explanation:
      "After Bose resigned as Congress president (1939) following conflict with Gandhi's faction over his re-election, he formed the Forward Bloc to mobilise the left wing of the independence movement and advocate for more radical, immediate action.",
  },
  {
    id: "h22",
    subject: "history",
    topic: "Chola Period Civilisation",
    text: "The Chola period is considered a high point of South Indian civilisation primarily because of:",
    options: [
      "Its conquest of the entire subcontinent",
      "Its sophisticated local self-governance (sabhas, ur), maritime trade expansion, and outstanding temple architecture and bronze sculpture",
      "Introduction of Sanskrit as the court language",
      "Alliance with the Arab traders that brought Islam",
    ],
    correct: 1,
    explanation:
      "Chola inscriptions reveal remarkable village assemblies with committees managing irrigation, justice, and charity. Naval expeditions reached Southeast Asia. Temples like Brihadesvara and Nataraja bronzes represent artistic peaks that influenced Southeast Asian cultures.",
  },
  {
    id: "h23",
    subject: "history",
    topic: "Satyashodhak Samaj",
    text: "Jyotiba Phule's 'Satyashodhak Samaj' (1873) differed from contemporary upper-caste reform movements in that:",
    options: [
      "It sought only religious reform within Hinduism",
      "It challenged Brahmin priestly authority and sought to empower lower castes through education and rational critique of caste-based oppression",
      "It advocated conversion to Christianity as the solution to caste",
      "It was primarily concerned with women's rights rather than caste",
    ],
    correct: 1,
    explanation:
      "Phule's movement was radical in identifying Brahminism as the root of lower-caste oppression. He advocated education for backward castes and women, criticised Brahmin monopoly on religious knowledge, and laid ideological groundwork later built upon by Ambedkar.",
  },
  {
    id: "h24",
    subject: "history",
    topic: "Railways Colonial India",
    text: "The impact of railways on 19th-century India was double-edged primarily because:",
    options: [
      "Railways benefited all Indians equally",
      "While railways integrated markets and facilitated administrative control, they primarily served British commercial interests by draining raw materials to ports rather than promoting Indian industrial development",
      "Railways mainly served military purposes and had no economic effect",
      "Railways reduced famines by improving food distribution uniformly",
    ],
    correct: 1,
    explanation:
      "Railways were financed by guaranteed returns to British investors at Indian taxpayer risk. Lines ran from agricultural hinterlands to ports (Bombay, Calcutta, Madras) to export raw materials, not to connect manufacturing centres—structuring India's economy for colonial extraction.",
  },
  {
    id: "h25",
    subject: "history",
    topic: "Extremism vs Moderates INC",
    text: "The emergence of 'Extremism' in the Indian National Congress (Tilak, Lajpat Rai, Bipin Chandra Pal) was a response to:",
    options: [
      "A split over religious issues",
      "The perceived failure of the Moderate strategy of petitions and prayers to achieve meaningful constitutional reform, especially after the Partition of Bengal",
      "British encouragement of radical politics",
      "Marxist influence on Indian politics",
    ],
    correct: 1,
    explanation:
      "Moderates like Gokhale believed in gradualism and constitutional methods. The Extremists argued that 20 years of petitions had yielded little, and only mass agitation, Swadeshi, and self-reliance could pressure Britain. Partition of Bengal (1905) sharpened this divide.",
  },

  // ── GEOGRAPHY ───────────────────────────────────────────────────────────────
  {
    id: "g01",
    subject: "geography",
    topic: "Coromandel Coast Winter Rainfall",
    text: "The South-West Monsoon brings most of India's rainfall, but the Coromandel Coast (Tamil Nadu) receives rainfall mainly in winter. This is because:",
    options: [
      "Tamil Nadu is too far from the Arabian Sea branch",
      "The Western Ghats block the SW monsoon's Bay of Bengal branch, but the retreating NE monsoon picks up moisture over the Bay of Bengal in October-November",
      "Tamil Nadu faces the Indian Ocean directly and gets year-round rainfall",
      "Ocean currents cool the air over Tamil Nadu during summer",
    ],
    correct: 1,
    explanation:
      "The Eastern Ghats and the orientation of the coast mean Tamil Nadu lies in the rain-shadow of the SW monsoon. The retreating (NE) monsoon, after picking up moisture crossing the Bay of Bengal, brings the bulk of Tamil Nadu's annual rainfall.",
  },
  {
    id: "g02",
    subject: "geography",
    topic: "Western Ghats Rain Shadow",
    text: "The 'rain-shadow' effect of the Western Ghats explains why:",
    options: [
      "The Malabar Coast receives very little rainfall",
      "The Deccan Plateau is semi-arid despite being surrounded by oceans on three sides",
      "Mumbai gets more rainfall than Chennai",
      "The Eastern Ghats are higher than the Western Ghats",
    ],
    correct: 1,
    explanation:
      "Moisture-laden SW monsoon winds rise and drop most of their rainfall on the western windward slopes (heavy rainfall on Konkan and Malabar coast). On descending the leeward eastern side, the air warms and dries out, leaving the Deccan in a rain shadow.",
  },
  {
    id: "g03",
    subject: "geography",
    topic: "Himalayan Antecedent Rivers",
    text: "The Himalayan rivers (Indus, Ganga, Brahmaputra) are classified as 'antecedent rivers' primarily because:",
    options: [
      "They flow through ancient riverbeds",
      "They predate the uplift of the Himalayas and have maintained their courses by down-cutting as the mountains rose around them",
      "They originate from the same glacier",
      "Their direction of flow is opposite to tectonic movement",
    ],
    correct: 1,
    explanation:
      "Antecedent rivers existed before mountain uplift began. As the Himalayas rose through tectonic collision, these rivers kept pace by downcutting, creating spectacular gorges. This explains why the Brahmaputra's gorges are deeper than the mountains on either side.",
  },
  {
    id: "g04",
    subject: "geography",
    topic: "Black Cotton Soil Properties",
    text: "Black cotton soil (Regur) is uniquely suited for cotton cultivation primarily because:",
    options: [
      "It contains high levels of nitrogen",
      "Its high clay content gives it great moisture-retaining capacity, providing water to crops during dry periods",
      "It is found only in areas with high annual rainfall",
      "It is rich in phosphorus deposited by Himalayan rivers",
    ],
    correct: 1,
    explanation:
      "Regur (vertisol) soil, found in the Deccan lava trap region, has a high proportion of montmorillonite clay that swells when wet (retaining moisture) and cracks when dry. This self-mulching quality sustains cotton crops through dry spells without irrigation.",
  },
  {
    id: "g05",
    subject: "geography",
    topic: "ITCZ Monsoon Mechanism",
    text: "The 'Inter-Tropical Convergence Zone' (ITCZ) is important in understanding Indian monsoons because:",
    options: [
      "It is a permanent high-pressure belt that blocks rainfall",
      "The seasonal northward shift of the ITCZ over the Indian subcontinent in summer draws in moisture-laden SW winds, triggering the monsoon",
      "The ITCZ remains stationary over the equator throughout the year",
      "It brings cold polar air into the Indian subcontinent",
    ],
    correct: 1,
    explanation:
      "The ITCZ is where NE and SE trade winds converge. In summer, intense heating of the Indian landmass causes the ITCZ to shift north over India (to the Gangetic plain), creating a low-pressure area that draws in moist SW winds from the Indian Ocean—the monsoon.",
  },
  {
    id: "g06",
    subject: "geography",
    topic: "Ocean Current Patterns",
    text: "The warm Agulhas Current off South Africa's east coast and the cold Benguela Current off its west coast demonstrate the principle that:",
    options: [
      "All Southern Hemisphere ocean currents flow clockwise",
      "Eastern coasts of continents are washed by warm poleward-flowing currents, while western coasts are washed by cold equatorward-flowing currents in subtropical gyres",
      "Ocean currents depend entirely on wind direction",
      "Currents near Africa are unique because of the continent's shape",
    ],
    correct: 1,
    explanation:
      "Subtropical gyre circulation moves clockwise in the Southern Hemisphere (counterclockwise in Northern). This brings warm water to eastern coasts (poleward flow) and upwelling of cold water on western coasts (equatorward flow)—a global pattern visible in the Agulhas/Benguela contrast.",
  },
  {
    id: "g07",
    subject: "geography",
    topic: "Sundarbans Mangrove Ecosystem",
    text: "The Sundarbans mangrove ecosystem is ecologically significant primarily because:",
    options: [
      "It is the world's largest freshwater wetland",
      "Mangroves act as nurseries for marine fish, protect coastlines from storm surges and cyclones, and sequester carbon at rates higher than terrestrial forests",
      "It has the world's highest biodiversity of coral species",
      "It is the primary source of freshwater for West Bengal",
    ],
    correct: 1,
    explanation:
      "Sundarbans mangroves provide multiple ecosystem services: coastal protection from Bay of Bengal cyclones, breeding habitats for fish and crustaceans, carbon sequestration, and support for the Bengal tiger population. Their loss would increase cyclone vulnerability.",
  },
  {
    id: "g08",
    subject: "geography",
    topic: "Orographic Rainfall Process",
    text: "The phenomenon of 'orographic rainfall' occurs when:",
    options: [
      "Rainfall is triggered by frontal systems meeting at low pressure",
      "Moist air rises along mountain slopes, cools adiabatically, and condenses to produce rainfall on the windward side",
      "Ocean evaporation creates convective rainfall inland",
      "Cold Arctic air meets warm tropical air over plains",
    ],
    correct: 1,
    explanation:
      "Orographic (relief) rainfall happens when prevailing moist winds encounter a mountain barrier, rise, cool at the dry and saturated adiabatic lapse rates, and precipitate on the windward slope. Western Ghats and Meghalaya (Cherrapunji) are classic Indian examples.",
  },
  {
    id: "g09",
    subject: "geography",
    topic: "Deccan Traps Flood Basalts",
    text: "The Deccan Plateau is underlain by Deccan Traps (flood basalts) because:",
    options: [
      "It was part of a subduction zone 65 million years ago",
      "Massive volcanic eruptions related to the Réunion hotspot poured out basaltic lava as India crossed it around 65 million years ago",
      "The Himalayas pushed igneous rock southward across the subcontinent",
      "The Deccan was once below sea level, accumulating marine basalts",
    ],
    correct: 1,
    explanation:
      "As the Indian plate drifted northward over the Réunion mantle plume ~65 Ma, enormous volumes of basaltic lava were extruded, covering up to 500,000 km². This created the Deccan Trap topography and the parent material for black cotton soils.",
  },
  {
    id: "g10",
    subject: "geography",
    topic: "Eastern vs Western Ghats",
    text: "India's Eastern and Western Ghats differ in that:",
    options: [
      "Western Ghats are discontinuous while Eastern Ghats are a continuous chain",
      "Western Ghats are a continuous escarpment with steep western faces, while Eastern Ghats are a discontinuous and dissected range",
      "Eastern Ghats are higher and receive more rainfall",
      "Western Ghats run parallel to the Himalayan ranges",
    ],
    correct: 1,
    explanation:
      "Western Ghats form a nearly unbroken scarp running 1,600 km along the Arabian Sea coast, acting as a barrier to the monsoon. Eastern Ghats are fragmented and dissected by rivers like the Mahanadi and Krishna, forming isolated hill ranges.",
  },
  {
    id: "g11",
    subject: "geography",
    topic: "Delta vs Estuary Formation",
    text: "The formation of a 'delta' at a river mouth, rather than an estuary, depends primarily on:",
    options: [
      "The river having a high discharge volume",
      "Weak tidal and wave action relative to the river's sediment load, allowing deposition to outpace erosion",
      "The river flowing through hard bedrock",
      "The shape of the continental shelf",
    ],
    correct: 1,
    explanation:
      "Deltas form when a river deposits sediment faster than waves and tides can remove it. Strong tidal/wave energy creates estuaries. Rivers with high sediment load and sheltered, shallow coasts (like the Ganga-Brahmaputra into the Bay of Bengal) form massive deltas.",
  },
  {
    id: "g12",
    subject: "geography",
    topic: "India Latitudinal Extent Climate",
    text: "The latitudinal extent of India (8°N to 37°N) means that:",
    options: [
      "India is entirely in the tropical zone",
      "Southern India has longer days in summer than northern India",
      "Days and nights vary more in duration in northern India than in southern India through the year",
      "The entire country receives the same intensity of solar radiation",
    ],
    correct: 2,
    explanation:
      "The greater the latitude, the greater the seasonal variation in day length. At 8°N (Kanyakumari), day length varies little through the year. At 37°N (Kashmir), the variation is substantial—long summer days and short winter days—affecting temperature ranges significantly.",
  },
  {
    id: "g13",
    subject: "geography",
    topic: "El Nino Monsoon Impact",
    text: "El Niño events impact India's monsoon because:",
    options: [
      "El Niño brings cold currents to the Indian Ocean",
      "Warming of the Central-Eastern Pacific weakens the Walker Circulation, reducing the pressure gradient that drives the SW monsoon, typically causing below-normal rainfall",
      "El Niño diverts hurricanes into the Bay of Bengal",
      "Pacific warming increases evaporation over the Arabian Sea",
    ],
    correct: 1,
    explanation:
      "During El Niño, the Walker Circulation (east-west atmospheric circulation over the tropics) weakens. The normally strong pressure gradient that drives India's monsoon winds diminishes, often resulting in delayed onset, weak monsoon, and drought conditions.",
  },
  {
    id: "g14",
    subject: "geography",
    topic: "Watershed River Management",
    text: "The concept of 'watershed' is important in river management because:",
    options: [
      "It marks the deepest point of a river",
      "A watershed is the entire land area whose water drains into a particular river system, making it the logical unit for integrated water resource management",
      "Watersheds separate freshwater from saline water",
      "It identifies floodplain boundaries",
    ],
    correct: 1,
    explanation:
      "A watershed (catchment area) defines all land draining to a common outlet. Managing forests, agriculture, and settlements within a watershed determines downstream water quantity and quality. River basin management using watershed units is now standard for sustainable water governance.",
  },
  {
    id: "g15",
    subject: "geography",
    topic: "Western Ghats Biodiversity Hotspot",
    text: "India's Western Ghats are classified as a biodiversity hotspot because:",
    options: [
      "They have the highest forest cover in India",
      "They contain exceptional species richness and endemism combined with severe habitat loss exceeding 70% of original vegetation",
      "They have the greatest number of wildlife sanctuaries in India",
      "They support the highest density of human population relative to forest area",
    ],
    correct: 1,
    explanation:
      "Biodiversity hotspots require both high endemism/species richness AND significant threat (>70% primary vegetation lost). Western Ghats are one of 36 global hotspots: high endemism in amphibians, reptiles, and plants, but large areas converted to plantation and agriculture.",
  },
  {
    id: "g16",
    subject: "geography",
    topic: "Gangetic Plain Agricultural Productivity",
    text: "The Gangetic Plain is one of the world's most productive agricultural regions primarily because:",
    options: [
      "It has the world's largest irrigation canal network",
      "It is underlain by deep alluvial soil continuously replenished by Himalayan rivers, combined with flat topography and high water table favoring intensive cultivation",
      "Its tropical monsoon climate is the same as the Amazon basin",
      "The plain has volcanic soil similar to the Deccan Traps",
    ],
    correct: 1,
    explanation:
      "The Indo-Gangetic Plain's deep fertile alluvium (from Himalayan erosion), flat terrain facilitating mechanisation, high water table, and reliable monsoon create ideal conditions. The Green Revolution transformed this region into India's breadbasket.",
  },
  {
    id: "g17",
    subject: "geography",
    topic: "Tropical Deciduous Forest Seasonality",
    text: "Tropical deciduous forests in India shed their leaves in:",
    options: [
      "Monsoon season to avoid waterlogging",
      "Winter, as cold temperatures trigger leaf fall",
      "Summer (dry season), as drought stress causes leaf shedding to reduce water loss",
      "Spring, to allow new growth before the monsoon",
    ],
    correct: 2,
    explanation:
      "Tropical deciduous (monsoon) forests shed leaves during the dry summer season (March-May) to reduce transpiration and conserve water. This is the opposite of temperate deciduous forests, which shed in autumn. Sal, teak, and mahua are classic Indian examples.",
  },
  {
    id: "g18",
    subject: "geography",
    topic: "Himalayan Seismicity",
    text: "The Himalayan region experiences frequent earthquakes because:",
    options: [
      "Glacial melting destabilises rock",
      "The Indian tectonic plate continues to subduct under the Eurasian plate, generating compressional stress that releases as seismic energy",
      "Human deforestation has increased erosion and slope instability",
      "The high altitude causes unique pressure variations",
    ],
    correct: 1,
    explanation:
      "The Himalayas were formed and are still deforming as the Indian plate collides with the Eurasian plate at ~5 cm/year. This ongoing convergence builds up compressional stress along fault systems, periodically released as major earthquakes (e.g., 2015 Nepal earthquake).",
  },
  {
    id: "g19",
    subject: "geography",
    topic: "Urban Heat Island Effect",
    text: "The phenomenon of 'urban heat island' arises because:",
    options: [
      "Cities are located near industrial areas that emit heat",
      "Urban surfaces (concrete, asphalt) absorb and retain more heat than vegetation, reduced evapotranspiration lowers cooling, and waste heat from human activity raises temperatures",
      "Population density creates body heat",
      "Cities block wind currents, trapping warm air",
    ],
    correct: 1,
    explanation:
      "Urban areas replace vegetated surfaces with impervious materials that have low albedo and high heat capacity. Lack of vegetation reduces evaporative cooling. Combined with anthropogenic heat from traffic and industry, this creates cities several degrees warmer than surrounding rural areas.",
  },
  {
    id: "g20",
    subject: "geography",
    topic: "Brahmaputra River Characteristics",
    text: "The Brahmaputra enters India from Tibet through the Assam valley. Its characteristic feature compared to other peninsular rivers is:",
    options: [
      "It flows west to east throughout its course",
      "It is a braided river with shifting sand islands (chars) due to very high sediment load from Himalayan erosion and a low gradient in the valley",
      "It is the only Indian river that flows north",
      "It has no tributaries in India",
    ],
    correct: 1,
    explanation:
      "The Brahmaputra carries immense sediment from steep Himalayan catchments. Once it enters the flat Assam valley, reduced gradient causes the river to spread into multiple channels (braiding), depositing sand islands (chars). Seasonal flooding and channel migration are defining features.",
  },
  {
    id: "g21",
    subject: "geography",
    topic: "Weather vs Climate Distinction",
    text: "The difference between 'Weather' and 'Climate' is best described as:",
    options: [
      "Weather is caused by the sun while climate is caused by the ocean",
      "Weather refers to short-term atmospheric conditions at a specific location, while climate is the statistical average of weather over 30+ years",
      "Weather applies to tropical regions, climate to temperate regions",
      "Climate is the immediate state while weather is the long-term pattern",
    ],
    correct: 1,
    explanation:
      "Weather is the day-to-day or hour-to-hour state of the atmosphere (temperature, humidity, precipitation). Climate is the long-term pattern—typically the 30-year average (WMO standard). The distinction is crucial for separating natural variability from climate change.",
  },
  {
    id: "g22",
    subject: "geography",
    topic: "Laterite Soil Formation",
    text: "Laterite soil is associated with humid tropical regions because:",
    options: [
      "High rainfall leaches silica and bases, leaving behind iron and aluminium oxides in a reddish, often hardened layer",
      "Volcanic activity deposits iron-rich materials in humid zones",
      "Laterite forms only in river deltas near the coast",
      "Dense forest root activity concentrates iron in upper soil layers",
    ],
    correct: 0,
    explanation:
      "Under intense leaching in humid tropical climates, soluble minerals (silica, calcium, potassium) are washed away. Relatively insoluble iron and aluminium oxides concentrate in the residual soil, creating the characteristic red laterite. When exposed and dried, it hardens—used as building material in Kerala and Odisha.",
  },
  {
    id: "g23",
    subject: "geography",
    topic: "India Flood and Drought Vulnerability",
    text: "India is vulnerable to both drought and flood because:",
    options: [
      "India has no reservoir infrastructure",
      "Monsoon rainfall is highly variable in both time (concentrated in 4 months) and space (coefficient of variation is highest where rainfall is lowest), creating feast-or-famine conditions",
      "India's population requires more water than its rivers supply",
      "Climate change has recently made India's rainfall erratic",
    ],
    correct: 1,
    explanation:
      "Monsoon rainfall is uneven—75% arrives in 3-4 months, and variability is inversely correlated with average rainfall (driest regions like Rajasthan have the most variable rainfall). This temporal and spatial mismatch makes both drought (bad years) and flood (excess concentration) endemic.",
  },
  {
    id: "g24",
    subject: "geography",
    topic: "Continental Shelf Economic Importance",
    text: "The 'continental shelf' is important for India economically because:",
    options: [
      "It provides territory for naval bases",
      "Shallow sunlit continental shelf waters support rich fisheries, and the shelf contains oil and gas deposits including India's offshore reserves",
      "It acts as a buffer against tsunamis",
      "Continental shelves determine the extent of territorial waters",
    ],
    correct: 1,
    explanation:
      "Continental shelves are shallow extensions of landmasses under sea. Their productivity comes from sunlight penetrating shallow water, supporting phytoplankton and fisheries. India's shelves (off Mumbai and Kerala) contain significant oil/gas fields like the Bombay High.",
  },
  {
    id: "g25",
    subject: "geography",
    topic: "Tropic of Cancer India Significance",
    text: "The significance of the Tropic of Cancer passing through India is that:",
    options: [
      "India receives direct overhead sun year-round south of this line",
      "It marks the northernmost latitude where the sun is directly overhead (at summer solstice), dividing India into tropical (south) and subtropical (north) climatic zones",
      "The monsoon onset always begins along the Tropic of Cancer",
      "It determines the line of demarcation between peninsular and extra-peninsular India",
    ],
    correct: 1,
    explanation:
      "The Tropic of Cancer (23.5°N) passes through 8 Indian states. South of it lies tropical India (higher temperatures, less seasonal variation); north of it subtropical/temperate conditions prevail with marked seasonal differences in temperature and day length.",
  },
];

export const SUBJECTS = [
  {
    id: "polity" as const,
    label: "Polity",
    description: "Constitutional framework, governance, and political theory",
  },
  {
    id: "history" as const,
    label: "History",
    description:
      "Modern India, medieval period, ancient civilisations, and freedom struggle",
  },
  {
    id: "geography" as const,
    label: "Geography",
    description:
      "Physical, human, and economic geography of India and the world",
  },
];
