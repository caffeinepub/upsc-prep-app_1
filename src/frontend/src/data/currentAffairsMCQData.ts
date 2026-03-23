import type { Category } from "./currentAffairsData";

export interface AffairsMCQ {
  id: string;
  newsId: string; // links to the DailyAffairs NewsItem
  date: string; // YYYY-MM-DD
  question: string;
  options: [string, string, string, string];
  answer: string;
  explanation: string;
  category: Category;
}

// IMPORTANT: Static, permanent store. Never delete or modify existing entries.
// Always append new MCQs at the bottom. Never repeat question IDs.
export const currentAffairsMCQs: AffairsMCQ[] = [
  // ─── 22 March 2026 ───────────────────────────────────────────────
  {
    id: "mcq-2026-03-22-01a",
    newsId: "2026-03-22-01",
    date: "2026-03-22",
    question:
      "In its landmark 7-2 majority ruling on digital privacy, the Supreme Court held the right to digital privacy as fundamental under which Article of the Constitution?",
    options: ["Article 14", "Article 19", "Article 21", "Article 32"],
    answer: "Article 21",
    explanation:
      "The Supreme Court held that the right to digital privacy flows from Article 21, which guarantees the Right to Life and Personal Liberty. Privacy as a fundamental right was first recognised in the Puttaswamy judgment (2017).",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-22-01b",
    newsId: "2026-03-22-01",
    date: "2026-03-22",
    question:
      "The Supreme Court ruled that mass surveillance without _______ oversight violates the Constitution.",
    options: ["Parliamentary", "Executive", "Judicial", "Constitutional Court"],
    answer: "Judicial",
    explanation:
      "The Court held that mass surveillance is unconstitutional unless subject to independent judicial oversight, emphasising that the executive cannot self-authorise surveillance affecting fundamental rights.",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-22-02a",
    newsId: "2026-03-22-02",
    date: "2026-03-22",
    question:
      "ISRO's GSAT-25 satellite is primarily intended to provide high-speed broadband to how many gram panchayats not yet covered under BharatNet?",
    options: ["10,000", "25,000", "50,000", "1,00,000"],
    answer: "50,000",
    explanation:
      "GSAT-25 will serve over 50,000 gram panchayats currently outside BharatNet coverage, extending rural digital connectivity to the most remote areas.",
    category: "National",
  },
  {
    id: "mcq-2026-03-22-03a",
    newsId: "2026-03-22-03",
    date: "2026-03-22",
    question:
      "The RBI's Monetary Policy Committee kept the repo rate unchanged at which percentage in its March 2026 bi-monthly review?",
    options: ["5.75%", "6.00%", "6.25%", "6.50%"],
    answer: "6.25%",
    explanation:
      "The MPC voted unanimously to hold the repo rate at 6.25%, citing global inflationary pressures and a slowdown in export growth as primary concerns.",
    category: "Economy",
  },
  {
    id: "mcq-2026-03-22-04a",
    newsId: "2026-03-22-04",
    date: "2026-03-22",
    question:
      "The India-EU Free Trade Agreement was formally signed in which city after over a decade of negotiations?",
    options: ["Paris", "Berlin", "Brussels", "New Delhi"],
    answer: "Brussels",
    explanation:
      "The landmark India-EU FTA was signed in Brussels. The deal covers goods, services, investment, and intellectual property, targeting bilateral trade of $200 billion by 2030.",
    category: "International",
  },
  {
    id: "mcq-2026-03-22-05a",
    newsId: "2026-03-22-05",
    date: "2026-03-22",
    question:
      "P.V. Sindhu won the women's singles gold at the 2026 All England Badminton Championships by defeating which player in the final?",
    options: [
      "Carolina Marin",
      "Tai Tzu-ying",
      "Akane Yamaguchi",
      "Ratchanok Intanon",
    ],
    answer: "Akane Yamaguchi",
    explanation:
      "Sindhu defeated Japan's Akane Yamaguchi in a thrilling three-game final at the All England Championships in Birmingham, her first All England title.",
    category: "Awards/Sports",
  },
  {
    id: "mcq-2026-03-22-06a",
    newsId: "2026-03-22-06",
    date: "2026-03-22",
    question:
      "Under Telangana's Industrial Policy 2026–2031, Special Economic Zones will be developed in which three cities?",
    options: [
      "Warangal, Karimnagar, Nizamabad",
      "Hyderabad, Nalgonda, Khammam",
      "Adilabad, Mahbubnagar, Sangareddy",
      "Siddipet, Medchal, Vikarabad",
    ],
    answer: "Warangal, Karimnagar, Nizamabad",
    explanation:
      "Telangana's new industrial policy targets ₹5 lakh crore investment and 20 lakh jobs, with SEZs specifically announced for Warangal, Karimnagar, and Nizamabad.",
    category: "National",
  },
  {
    id: "mcq-2026-03-22-07a",
    newsId: "2026-03-22-07",
    date: "2026-03-22",
    question:
      "The GST Council approved a reduction of GST on electric vehicles and solar equipment from 12% to which rate, effective April 2026?",
    options: ["3%", "5%", "8%", "10%"],
    answer: "5%",
    explanation:
      "The GST rate on EVs and solar energy equipment was slashed from 12% to 5%, aimed at accelerating clean energy adoption and reducing fossil fuel dependence.",
    category: "Economy",
  },
  {
    id: "mcq-2026-03-22-08a",
    newsId: "2026-03-22-08",
    date: "2026-03-22",
    question:
      "How many total recipients were announced for the Padma Awards 2026?",
    options: ["100", "115", "128", "140"],
    answer: "128",
    explanation:
      "The 2026 Padma Awards had 128 recipients: 5 Padma Vibhushan, 17 Padma Bhushan, and 106 Padma Shri. This year had the highest number of women awardees in a decade.",
    category: "Awards/Sports",
  },
  {
    id: "mcq-2026-03-22-08b",
    newsId: "2026-03-22-08",
    date: "2026-03-22",
    question:
      "Which eminent jurist was posthumously honoured with a Padma Award in 2026?",
    options: [
      "Justice P. N. Bhagwati",
      "Justice Y. V. Chandrachud",
      "Justice V. R. Krishna Iyer",
      "Justice R. C. Lahoti",
    ],
    answer: "Justice Y. V. Chandrachud",
    explanation:
      "Retired Chief Justice Dr. Y. V. Chandrachud was posthumously honoured in the Padma Awards 2026, recognising his decades of contribution to Indian jurisprudence.",
    category: "Legal",
  },

  // ─── 21 March 2026 ───────────────────────────────────────────────
  {
    id: "mcq-2026-03-21-01a",
    newsId: "2026-03-21-01",
    date: "2026-03-21",
    question:
      "The Digital Courts Bill 2026 mandates electronic filing for all cases above district courts within how many years?",
    options: ["One year", "Two years", "Three years", "Five years"],
    answer: "Two years",
    explanation:
      "The Digital Courts Bill 2026 requires all courts above the district level to implement mandatory e-filing within two years of enactment, alongside AI-assisted case scheduling to tackle the 5-crore pending case backlog.",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-21-01b",
    newsId: "2026-03-21-01",
    date: "2026-03-21",
    question:
      "Approximately how many cases are currently pending across all courts in India, as cited in the context of the Digital Courts Bill 2026?",
    options: ["2 crore", "3 crore", "5 crore", "8 crore"],
    answer: "5 crore",
    explanation:
      "India currently has over 5 crore pending cases across all courts—a key factor behind the urgency to pass the Digital Courts Bill 2026 for judicial reform.",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-21-02a",
    newsId: "2026-03-21-02",
    date: "2026-03-21",
    question:
      "India's GDP growth rate for FY2025-26 was revised upward to which figure, making it the fastest-growing major economy globally for the third consecutive year?",
    options: ["6.8%", "7.0%", "7.2%", "7.5%"],
    answer: "7.2%",
    explanation:
      "The Central Statistics Office revised India's FY2025-26 GDP growth to 7.2%, with manufacturing, services, and infrastructure as the key drivers.",
    category: "Economy",
  },
  {
    id: "mcq-2026-03-21-03a",
    newsId: "2026-03-21-03",
    date: "2026-03-21",
    question:
      "India was elected as a non-permanent member of the UN Security Council for which term?",
    options: ["2025-26", "2026-27", "2027-28", "2028-29"],
    answer: "2027-28",
    explanation:
      "India won the UNSC non-permanent seat for the 2027-28 term with 179 votes. This is India's eighth time on the Security Council since independence.",
    category: "International",
  },
  {
    id: "mcq-2026-03-21-03b",
    newsId: "2026-03-21-03",
    date: "2026-03-21",
    question:
      "This is India's how many times as a non-permanent member of the UN Security Council since independence?",
    options: ["Fifth", "Sixth", "Seventh", "Eighth"],
    answer: "Eighth",
    explanation:
      "India's election to the UNSC for the 2027-28 term marks its eighth stint on the Security Council since 1947, underscoring its growing global diplomatic standing.",
    category: "International",
  },
  {
    id: "mcq-2026-03-21-04a",
    newsId: "2026-03-21-04",
    date: "2026-03-21",
    question:
      "Under the NEP 2025 amendments, law education will follow which structural format?",
    options: ["4+1 years", "3+2 years", "5+0 years", "2+3 years"],
    answer: "3+2 years",
    explanation:
      "The amendments establish a 3-year undergraduate law degree (LLB) followed by a specialised 2-year LLM, replacing the current integrated 5-year LLB for fresh graduates. Entrance tests like TS LAWCET must align by 2028.",
    category: "National",
  },
  {
    id: "mcq-2026-03-21-05a",
    newsId: "2026-03-21-05",
    date: "2026-03-21",
    question:
      "Neeraj Chopra broke the javelin world record at a Diamond League event in Doha with a throw of how many metres?",
    options: ["91.8 m", "92.5 m", "93.4 m", "94.1 m"],
    answer: "93.4 m",
    explanation:
      "Chopra's 93.4 m surpassed Jan Železný's long-standing world record of 92.72 m set in 1996, cementing his status as a strong favourite for the 2028 Los Angeles Olympics gold medal.",
    category: "Awards/Sports",
  },
  {
    id: "mcq-2026-03-21-06a",
    newsId: "2026-03-21-06",
    date: "2026-03-21",
    question:
      "The G20 Sherpa Summit AI governance communiqué was signed in which Indian city?",
    options: ["Mumbai", "Bengaluru", "New Delhi", "Hyderabad"],
    answer: "New Delhi",
    explanation:
      "The G20 Sherpa Summit in New Delhi concluded with member nations signing an AI governance communiqué, with India emphasising digital inclusion for developing nations.",
    category: "International",
  },
  {
    id: "mcq-2026-03-21-07a",
    newsId: "2026-03-21-07",
    date: "2026-03-21",
    question:
      "The PM VIKAS scheme was approved with an enhanced budget of how much to benefit 60 lakh traditional artisans from OBC communities?",
    options: [
      "₹8,000 crore",
      "₹12,000 crore",
      "₹18,000 crore",
      "₹25,000 crore",
    ],
    answer: "₹18,000 crore",
    explanation:
      "The Union Cabinet approved PM VIKAS (Vishwakarma Skill Development and Empowerment Scheme) with ₹18,000 crore, targeting 60 lakh artisans in sectors like pottery, blacksmithing, weaving, and carpentry.",
    category: "National",
  },

  // ─── 20 March 2026 ───────────────────────────────────────────────
  {
    id: "mcq-2026-03-20-01a",
    newsId: "2026-03-20-01",
    date: "2026-03-20",
    question:
      "The Telangana High Court's ruling restricting mechanical bail denial under UAPA relied on which Supreme Court judgments?",
    options: [
      "Maneka Gandhi and Bachan Singh",
      "Zubair and Sudha Bharadwaj",
      "Kesavananda Bharati and Minerva Mills",
      "ADM Jabalpur and Puttaswamy",
    ],
    answer: "Zubair and Sudha Bharadwaj",
    explanation:
      "The bench cited the SC's Zubair and Sudha Bharadwaj judgments to hold that courts must conduct independent judicial scrutiny before denying bail in UAPA cases.",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-20-01b",
    newsId: "2026-03-20-01",
    date: "2026-03-20",
    question: "UAPA stands for which of the following?",
    options: [
      "Unlawful Activities (Prevention) Act",
      "Uniform Anti-Protest Administration Act",
      "Unified Anti-Personnel Actions Act",
      "Unrestricted Armed Personnel Act",
    ],
    answer: "Unlawful Activities (Prevention) Act",
    explanation:
      "UAPA stands for the Unlawful Activities (Prevention) Act — India's primary anti-terrorism legislation, which has stringent bail provisions that have been subject to judicial scrutiny.",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-20-02a",
    newsId: "2026-03-20-02",
    date: "2026-03-20",
    question:
      "India crossed 100 GW of installed solar capacity, becoming the how many-th country in the world to achieve this milestone?",
    options: ["Second", "Third", "Fourth", "Fifth"],
    answer: "Fourth",
    explanation:
      "India became only the fourth country globally to install 100 GW of solar capacity, achieving the milestone three years ahead of the 2030 target.",
    category: "National",
  },
  {
    id: "mcq-2026-03-20-02b",
    newsId: "2026-03-20-02",
    date: "2026-03-20",
    question:
      "Which three Indian states are the top contributors to total installed solar output as of 2026?",
    options: [
      "Maharashtra, Odisha, Kerala",
      "Rajasthan, Gujarat, Andhra Pradesh",
      "Tamil Nadu, Madhya Pradesh, Karnataka",
      "Punjab, Haryana, Uttar Pradesh",
    ],
    answer: "Rajasthan, Gujarat, Andhra Pradesh",
    explanation:
      "Rajasthan, Gujarat, and Andhra Pradesh lead India's solar power generation due to high solar irradiation, large land availability, and favourable state policies.",
    category: "National",
  },
  {
    id: "mcq-2026-03-20-03a",
    newsId: "2026-03-20-03",
    date: "2026-03-20",
    question:
      "India's primary objection to CPEC Phase III projects is that they pass through which disputed region?",
    options: [
      "Aksai Chin",
      "Arunachal Pradesh",
      "Pakistan-occupied Kashmir",
      "Siachen Glacier",
    ],
    answer: "Pakistan-occupied Kashmir",
    explanation:
      "India objects to CPEC on the grounds that it passes through Pakistan-occupied Kashmir (PoK), which India considers its own sovereign territory. India has consistently protested these projects diplomatically.",
    category: "International",
  },
  {
    id: "mcq-2026-03-20-04a",
    newsId: "2026-03-20-04",
    date: "2026-03-20",
    question:
      "CPI-based retail inflation in February 2026 fell to 4.6%, which is the lowest level in how many months?",
    options: ["12 months", "15 months", "18 months", "24 months"],
    answer: "18 months",
    explanation:
      "The 4.6% CPI inflation in February 2026 was the lowest in 18 months, driven mainly by a correction in vegetable prices that had spiked sharply in previous months.",
    category: "Economy",
  },
  {
    id: "mcq-2026-03-20-05a",
    newsId: "2026-03-20-05",
    date: "2026-03-20",
    question:
      "Which chess grandmaster was among the 12 Arjuna Award recipients for 2026?",
    options: [
      "Viswanathan Anand",
      "R. Praggnanandhaa",
      "D. Gukesh",
      "Koneru Humpy",
    ],
    answer: "D. Gukesh",
    explanation:
      "Chess GM D. Gukesh received the Arjuna Award 2026 following his landmark performance at the World Chess Championship. Awards will be presented on National Sports Day, 29 August 2026.",
    category: "Awards/Sports",
  },
  {
    id: "mcq-2026-03-20-06a",
    newsId: "2026-03-20-06",
    date: "2026-03-20",
    question:
      "The India-UK Mutual Recognition of Professional Qualifications agreement allows Indian law degree holders from Bar Council-accredited institutions to practice in which jurisdiction?",
    options: [
      "Scotland",
      "Northern Ireland",
      "England and Wales",
      "The entire UK",
    ],
    answer: "England and Wales",
    explanation:
      "Under the MRPQ agreement, Indian lawyers from Bar Council-accredited institutions can practice in England and Wales, opening significant cross-border professional opportunities, effective from January 2027.",
    category: "International",
  },
  {
    id: "mcq-2026-03-20-07a",
    newsId: "2026-03-20-07",
    date: "2026-03-20",
    question:
      "The Cybercrime Prevention and Accountability Act 2026 prescribes a maximum imprisonment of how many years for online financial fraud exceeding ₹10 lakh?",
    options: ["5 years", "7 years", "10 years", "14 years"],
    answer: "10 years",
    explanation:
      "The 2026 Cybercrime Act imposes up to 10 years of imprisonment for online financial fraud above ₹10 lakh. It also guarantees victims a statutory right to compensation.",
    category: "Legal",
  },
  {
    id: "mcq-2026-03-20-07b",
    newsId: "2026-03-20-07",
    date: "2026-03-20",
    question:
      "The Cybercrime Prevention and Accountability Act 2026 establishes which new body under the Home Ministry?",
    options: [
      "National Digital Crime Bureau",
      "Central Cyber Monitoring Agency",
      "National Cyber Intelligence Unit",
      "Cyber Fraud Prevention Board",
    ],
    answer: "National Cyber Intelligence Unit",
    explanation:
      "The Act establishes a National Cyber Intelligence Unit under the Home Ministry, alongside mandating digital forensic capability in every state police cyber cell.",
    category: "Legal",
  },

  // ─── 8 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-08-01a",
    newsId: "2025-01-08-01",
    date: "2025-01-08",
    question:
      "The Supreme Court directed High Courts to conduct quarterly reviews for undertrial prisoners held beyond what fraction of their maximum sentence?",
    options: ["One-third", "Half", "Two-thirds", "Three-fourths"],
    answer: "Half",
    explanation:
      "The SC held that undertrials detained beyond half their maximum sentence must be reviewed quarterly by dedicated fast-track benches, as prolonged pretrial detention violates Article 21.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-08-02a",
    newsId: "2025-01-08-02",
    date: "2025-01-08",
    question: "The Vizhinjam International Seaport is located in which state?",
    options: ["Goa", "Tamil Nadu", "Kerala", "Karnataka"],
    answer: "Kerala",
    explanation:
      "Vizhinjam International Deepwater Multipurpose Seaport is in Thiruvananthapuram, Kerala. It is India's first semi-automated port built at ₹8,867 crore.",
    category: "National",
  },
  {
    id: "mcq-2025-01-08-03a",
    newsId: "2025-01-08-03",
    date: "2025-01-08",
    question:
      "As of January 2025, India held the _______ largest foreign exchange reserves globally.",
    options: ["Second", "Third", "Fourth", "Fifth"],
    answer: "Fourth",
    explanation:
      "India's forex reserves rose to $640 billion, placing it fourth globally after China, Japan, and Switzerland.",
    category: "Economy",
  },
  {
    id: "mcq-2025-01-08-04a",
    newsId: "2025-01-08-04",
    date: "2025-01-08",
    question:
      "The India-Japan defence co-production pact signed in January 2025 is built on which bilateral framework?",
    options: ["2+2 Ministerial Dialogue", "QUAD", "ASEAN+1", "SCO Framework"],
    answer: "2+2 Ministerial Dialogue",
    explanation:
      "The India-Japan defence cooperation agreement builds on the 2+2 Ministerial Dialogue framework, covering advanced radar systems and maritime patrol aircraft co-production.",
    category: "International",
  },
  {
    id: "mcq-2025-01-08-05a",
    newsId: "2025-01-08-05",
    date: "2025-01-08",
    question:
      "Manu Bhaker became the first Indian to win two Olympic medals at a single Games at which Olympics?",
    options: ["Tokyo 2020", "Paris 2024", "Rio 2016", "London 2012"],
    answer: "Paris 2024",
    explanation:
      "Manu Bhaker won two bronze medals in shooting at the Paris 2024 Olympics, becoming the first Indian shooter and first woman to achieve this feat at a single Games.",
    category: "Awards/Sports",
  },

  // ─── 7 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-07-01a",
    newsId: "2025-01-07-01",
    date: "2025-01-07",
    question:
      "The Telangana HC struck down a land acquisition ordinance for bypassing which key requirement under the Land Acquisition Act 2013?",
    options: [
      "Environmental clearance",
      "Consent and Social Impact Assessment",
      "District collector approval",
      "Revenue survey",
    ],
    answer: "Consent and Social Impact Assessment",
    explanation:
      "The Land Acquisition Act 2013 mandates consent of affected persons and a Social Impact Assessment before any acquisition. The Telangana ordinance bypassed these, making it unconstitutional.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-07-02a",
    newsId: "2025-01-07-02",
    date: "2025-01-07",
    question:
      "India's 500 GW non-fossil fuel capacity achievement fulfilled a pledge made at which international climate summit?",
    options: [
      "COP25 Madrid",
      "COP26 Glasgow",
      "COP27 Sharm el-Sheikh",
      "COP28 Dubai",
    ],
    answer: "COP26 Glasgow",
    explanation:
      "India pledged at COP26 in Glasgow (2021) to achieve 500 GW of non-fossil fuel electricity capacity by 2030. India achieved this milestone ahead of schedule in 2025.",
    category: "National",
  },
  {
    id: "mcq-2025-01-07-03a",
    newsId: "2025-01-07-03",
    date: "2025-01-07",
    question: "The 14th WTO Ministerial Conference was held in which city?",
    options: ["Geneva", "Nairobi", "Buenos Aires", "Abu Dhabi"],
    answer: "Abu Dhabi",
    explanation:
      "MC14, the 14th WTO Ministerial Conference, was held in Abu Dhabi, UAE. It ended without a final agreement on fisheries subsidies, with India defending the interests of artisanal fishermen.",
    category: "International",
  },
  {
    id: "mcq-2025-01-07-04a",
    newsId: "2025-01-07-04",
    date: "2025-01-07",
    question:
      "Under the PM Internship Scheme, interns receive a monthly stipend of how much?",
    options: ["₹3,000", "₹4,000", "₹5,000", "₹6,000"],
    answer: "₹5,000",
    explanation:
      "The PM Internship Scheme offers ₹5,000 per month stipend plus a one-time grant of ₹6,000 to 10 lakh graduates aged 21-24 from economically weaker backgrounds.",
    category: "National",
  },

  // ─── 6 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-06-01a",
    newsId: "2025-01-06-01",
    date: "2025-01-06",
    question:
      "The Supreme Court ruling on domestic violence protection for live-in relationships was based on which Act?",
    options: [
      "Indian Penal Code 1860",
      "Protection of Women from Domestic Violence Act 2005",
      "Hindu Marriage Act 1955",
      "Special Marriage Act 1954",
    ],
    answer: "Protection of Women from Domestic Violence Act 2005",
    explanation:
      "The SC held that the term 'relationship in the nature of marriage' under the DV Act 2005 covers stable live-in partnerships, entitling women in such relationships to its protections.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-06-02a",
    newsId: "2025-01-06-02",
    date: "2025-01-06",
    question:
      "ISRO's SpaDeX mission made India the _______ country to master space docking technology.",
    options: ["Second", "Third", "Fourth", "Fifth"],
    answer: "Fourth",
    explanation:
      "With the successful SpaDeX autonomous space docking, India joined the US, Russia, and China as only the fourth country in the world to possess this critical technology needed for future crewed space missions.",
    category: "National",
  },
  {
    id: "mcq-2025-01-06-03a",
    newsId: "2025-01-06-03",
    date: "2025-01-06",
    question:
      "The India-UAE CEPA expansion to include a Digital Trade Chapter comes after bilateral trade reached which level in 2024?",
    options: ["$60 billion", "$75 billion", "$85 billion", "$100 billion"],
    answer: "$85 billion",
    explanation:
      "India-UAE bilateral trade reached $85 billion in 2024. The Digital Trade Chapter addition to CEPA will further strengthen the UAE's position as India's third-largest trading partner.",
    category: "International",
  },
  {
    id: "mcq-2025-01-06-04a",
    newsId: "2025-01-06-04",
    date: "2025-01-06",
    question:
      "Piyush Goyal was appointed as India's Chief Trade Negotiator to fast-track FTA negotiations with which group of countries?",
    options: [
      "US, China, Canada",
      "EU, UK, Canada",
      "ASEAN, Japan, South Korea",
      "Russia, Brazil, South Africa",
    ],
    answer: "EU, UK, Canada",
    explanation:
      "Piyush Goyal was appointed to conclude FTAs with the EU, UK, and Canada. Negotiations with the EU had stalled over disagreements on automobile tariffs and data protection standards.",
    category: "Awards/Sports",
  },

  // ─── 5 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-05-01a",
    newsId: "2025-01-05-01",
    date: "2025-01-05",
    question:
      "The Allahabad HC ruling on 'bulldozer justice' held demolitions without due process violate which Articles of the Constitution?",
    options: [
      "Articles 12, 13, 32",
      "Articles 14, 19, 21",
      "Articles 25, 26, 29",
      "Articles 300A, 301, 302",
    ],
    answer: "Articles 14, 19, 21",
    explanation:
      "The court held that demolitions without following due process violate Article 14 (equality), Article 19 (freedom), and Article 21 (right to life and personal liberty), directing strict adherence to SC guidelines.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-05-02a",
    newsId: "2025-01-05-02",
    date: "2025-01-05",
    question:
      "According to PLFS data for 2024, India's unemployment rate fell to which level — the lowest since 2019?",
    options: ["2.8%", "3.2%", "3.8%", "4.2%"],
    answer: "3.2%",
    explanation:
      "India's unemployment rate fell to 3.2% in 2024 per PLFS data, the lowest since 2019, driven by growth in the MSME sector and construction boom.",
    category: "National",
  },
  {
    id: "mcq-2025-01-05-03a",
    newsId: "2025-01-05-03",
    date: "2025-01-05",
    question:
      "COP30 (2025 UN Climate Conference) is scheduled to be held in which city?",
    options: ["Nairobi", "Glasgow", "Belem", "Dubai"],
    answer: "Belem",
    explanation:
      "COP30 is scheduled in Belem, Brazil in November 2025. It is a critical year for implementing Paris Agreement pledges, with several nations announcing enhanced NDC targets.",
    category: "International",
  },
  {
    id: "mcq-2025-01-05-04a",
    newsId: "2025-01-05-04",
    date: "2025-01-05",
    question:
      "India won the inaugural Kho-Kho World Cup 2025, defeating which country in both men's and women's finals?",
    options: ["Pakistan", "Bangladesh", "Sri Lanka", "Nepal"],
    answer: "Nepal",
    explanation:
      "India won the inaugural Kho-Kho World Cup 2025 in New Delhi, defeating Nepal in both the men's and women's finals. 24 nations participated in the historic event.",
    category: "Awards/Sports",
  },

  // ─── 4 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-04-01a",
    newsId: "2025-01-04-01",
    date: "2025-01-04",
    question:
      "The Bharatiya Vayuyan Vidheyak 2024 replaced which old law governing India's civil aviation?",
    options: [
      "Aircraft Act 1934",
      "Airports Authority of India Act 1994",
      "Civil Aviation Act 1950",
      "DGCA Regulations Act 1972",
    ],
    answer: "Aircraft Act 1934",
    explanation:
      "The Bharatiya Vayuyan Vidheyak 2024 replaced the 90-year-old Aircraft Act 1934, modernising India's civil aviation regulatory framework in line with international ICAO standards.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-04-02a",
    newsId: "2025-01-04-02",
    date: "2025-01-04",
    question:
      "The National Industrial Corridor Programme approved in January 2025 aims to develop how many new industrial cities?",
    options: ["8", "10", "12", "15"],
    answer: "12",
    explanation:
      "The NICP with ₹1.08 lakh crore outlay aims to develop 12 greenfield industrial cities including Khurpia (Uttarakhand), Rajpura-Patiala (Punjab), and Dighi Port (Maharashtra).",
    category: "National",
  },
  {
    id: "mcq-2025-01-04-03a",
    newsId: "2025-01-04-03",
    date: "2025-01-04",
    question:
      "South Korean President Yoon Suk-yeol's declaration of martial law was reversed after which body voted against it?",
    options: ["Supreme Court", "Constitutional Court", "Parliament", "Cabinet"],
    answer: "Parliament",
    explanation:
      "The South Korean Parliament (National Assembly) voted to block Yoon's martial law declaration, forcing its reversal within hours. Constitutional Court proceedings for his impeachment subsequently began.",
    category: "International",
  },
  {
    id: "mcq-2025-01-04-04a",
    newsId: "2025-01-04-04",
    date: "2025-01-04",
    question:
      "Dr. Rohini Godbole was the first woman to receive which prestigious award from the Indian National Science Academy?",
    options: [
      "Shanti Swarup Bhatnagar Prize",
      "S.N. Bose Medal",
      "Jawaharlal Nehru Award",
      "INSA Medal",
    ],
    answer: "S.N. Bose Medal",
    explanation:
      "Dr. Rohini Godbole was the first woman to receive the S.N. Bose Medal from the Indian National Science Academy for her distinguished contributions to theoretical particle physics.",
    category: "Awards/Sports",
  },

  // ─── 3 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-03-01a",
    newsId: "2025-01-03-01",
    date: "2025-01-03",
    question:
      "Which section of PMLA contains the stringent bail conditions upheld by the Supreme Court Constitution Bench?",
    options: ["Section 3", "Section 19", "Section 45", "Section 50"],
    answer: "Section 45",
    explanation:
      "Section 45 of PMLA imposes a reverse burden and twin conditions for bail — the court must be satisfied that the accused is not guilty and will not commit any offence while on bail. The SC upheld this as constitutionally valid for economic offences.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-03-02a",
    newsId: "2025-01-03-02",
    date: "2025-01-03",
    question:
      "The National Testing Agency (NTA) restructuring in 2025 was triggered primarily by which controversy?",
    options: [
      "JEE Advanced 2024 irregularities",
      "NEET-UG 2024 paper leak",
      "UPSC CSE 2024 result delay",
      "CUET 2023 server failure",
    ],
    answer: "NEET-UG 2024 paper leak",
    explanation:
      "The NEET-UG 2024 question paper leak scandal led to widespread protests and a Supreme Court-monitored investigation, ultimately resulting in the comprehensive restructuring of NTA.",
    category: "National",
  },
  {
    id: "mcq-2025-01-03-03a",
    newsId: "2025-01-03-03",
    date: "2025-01-03",
    question:
      "India assumed the presidency of the Quad grouping for 2025. Which four countries form the Quad?",
    options: [
      "India, US, UK, France",
      "India, US, Australia, Japan",
      "India, US, Israel, UAE",
      "India, Japan, South Korea, Australia",
    ],
    answer: "India, US, Australia, Japan",
    explanation:
      "The Quad (Quadrilateral Security Dialogue) consists of India, the United States, Australia, and Japan. India assumed its presidency for 2025, with the summit scheduled to be hosted in India.",
    category: "International",
  },
  {
    id: "mcq-2025-01-03-04a",
    newsId: "2025-01-03-04",
    date: "2025-01-03",
    question: "The Saraswati Samman 2024 was awarded to Gulzar for which work?",
    options: ["Trishanku", "Rekhta", "Raat Pashmine Ki", "Pukhraj"],
    answer: "Rekhta",
    explanation:
      "Gulzar received the Saraswati Samman 2024 for his Urdu poetry collection 'Rekhta'. The award, given by the K.K. Birla Foundation, carries ₹15 lakh prize money.",
    category: "Awards/Sports",
  },

  // ─── 2 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-02-01a",
    newsId: "2025-01-02-01",
    date: "2025-01-02",
    question:
      "The Waqf Amendment Bill 2024 proposes changes to which existing Act?",
    options: [
      "Waqf Act 1954",
      "Waqf Act 1984",
      "Waqf Act 1995",
      "Waqf Act 2013",
    ],
    answer: "Waqf Act 1995",
    explanation:
      "The Waqf Amendment Bill 2024 proposes amendments to the Waqf Act 1995, including insertion of non-Muslim members in Waqf Boards and enhanced government oversight, raising minority rights concerns under Article 30.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-02-02a",
    newsId: "2025-01-02-02",
    date: "2025-01-02",
    question:
      "India's Manufacturing PMI in December 2024 hit 57.7 — the highest reading in how many years?",
    options: ["8 years", "12 years", "16 years", "20 years"],
    answer: "16 years",
    explanation:
      "India's Manufacturing PMI of 57.7 in December 2024 was the highest in 16 years, driven by strong domestic demand, export orders, and capacity expansion.",
    category: "Economy",
  },
  {
    id: "mcq-2025-01-02-03a",
    newsId: "2025-01-02-03",
    date: "2025-01-02",
    question:
      "South Africa assumed the G20 Presidency for 2025 from which country?",
    options: ["India", "Indonesia", "Brazil", "USA"],
    answer: "Brazil",
    explanation:
      "South Africa took over the G20 Presidency for 2025 from Brazil (which held it in 2024). The theme for South Africa's G20 Presidency is 'Solidarity, Equality, Sustainability'.",
    category: "International",
  },
  {
    id: "mcq-2025-01-02-04a",
    newsId: "2025-01-02-04",
    date: "2025-01-02",
    question:
      "Telangana's 'Indiramma Indlu' housing scheme provides how much to each beneficiary for construction?",
    options: ["₹2 lakh", "₹3 lakh", "₹4 lakh", "₹5 lakh"],
    answer: "₹5 lakh",
    explanation:
      "Under 'Indiramma Indlu', each eligible beneficiary receives ₹5 lakh for construction along with free land pattas in eligible cases, targeting 4 lakh EWS and BC families in rural areas.",
    category: "National",
  },

  // ─── 1 January 2025 ───────────────────────────────────────────────
  {
    id: "mcq-2025-01-01-01a",
    newsId: "2025-01-01-01",
    date: "2025-01-01",
    question:
      "The Bharatiya Nyaya Sanhita (BNS) 2023 replaced which colonial-era law?",
    options: [
      "Indian Evidence Act 1872",
      "Code of Criminal Procedure 1973",
      "Indian Penal Code 1860",
      "Transfer of Property Act 1882",
    ],
    answer: "Indian Penal Code 1860",
    explanation:
      "BNS replaced the IPC 1860. The BNSS replaced CrPC 1973, and BSA replaced the Indian Evidence Act 1872. All three came into full effect from 1 January 2025.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-01-01b",
    newsId: "2025-01-01-01",
    date: "2025-01-01",
    question:
      "The Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 replaced which law?",
    options: [
      "Indian Penal Code 1860",
      "Code of Criminal Procedure 1973",
      "Indian Evidence Act 1872",
      "Civil Procedure Code 1908",
    ],
    answer: "Code of Criminal Procedure 1973",
    explanation:
      "BNSS replaced the CrPC 1973. It introduces timelines for trials, provisions for organised crime, and expands electronic evidence provisions as part of India's criminal law overhaul.",
    category: "Legal",
  },
  {
    id: "mcq-2025-01-01-02a",
    newsId: "2025-01-01-02",
    date: "2025-01-01",
    question:
      "India surpassed which country to become the world's fourth-largest economy in 2025?",
    options: ["Germany", "France", "Japan", "United Kingdom"],
    answer: "Japan",
    explanation:
      "India's GDP crossed $4.3 trillion, overtaking Japan ($4.1 trillion) to become the 4th largest economy. India is projected to surpass Germany to become 3rd by 2027.",
    category: "National",
  },
  {
    id: "mcq-2025-01-01-03a",
    newsId: "2025-01-01-03",
    date: "2025-01-01",
    question: "What is the theme of South Africa's G20 Presidency for 2025?",
    options: [
      "Building a Just World and Sustainable Planet",
      "Solidarity, Equality, Sustainability",
      "Invest in People, Planet, Prosperity",
      "For the Earth, For the Future",
    ],
    answer: "Solidarity, Equality, Sustainability",
    explanation:
      "South Africa's G20 Presidency theme for 2025 is 'Solidarity, Equality, Sustainability', reflecting its focus on equitable global development and climate action.",
    category: "International",
  },
  {
    id: "mcq-2025-01-01-04a",
    newsId: "2025-01-01-04",
    date: "2025-01-01",
    question:
      "Justice Fali S. Nariman, posthumously awarded Bharat Ratna, was a Senior Advocate before the Supreme Court for over how many years?",
    options: ["40 years", "50 years", "60 years", "70 years"],
    answer: "60 years",
    explanation:
      "Fali S. Nariman practiced as a Senior Advocate before the Supreme Court for over 60 years and made landmark contributions to constitutional jurisprudence before his passing in February 2024.",
    category: "Awards/Sports",
  },
  {
    id: "mcq-2025-01-01-05a",
    newsId: "2025-01-01-05",
    date: "2025-01-01",
    question:
      "How many international appearances (caps) did Sunil Chhetri make for India in his football career?",
    options: ["121", "131", "141", "151"],
    answer: "151",
    explanation:
      "Sunil Chhetri played 151 international matches for India over 19 years, scoring 94 goals — making him the third-highest international goal scorer among active players globally after Ronaldo and Messi.",
    category: "Awards/Sports",
  },
];

// Helper: get MCQs for a specific date
export function getMCQsByDate(date: string): AffairsMCQ[] {
  return currentAffairsMCQs.filter((q) => q.date === date);
}

// Helper: get MCQs for a specific month (YYYY-MM)
export function getMCQsByMonth(month: string): AffairsMCQ[] {
  return currentAffairsMCQs.filter((q) => q.date.startsWith(month));
}

// Helper: get MCQs for a specific newsItem
export function getMCQsByNewsId(newsId: string): AffairsMCQ[] {
  return currentAffairsMCQs.filter((q) => q.newsId === newsId);
}

// Unique dates that have MCQs (newest first)
export function getMCQDates(): string[] {
  const seen = new Set<string>();
  const dates: string[] = [];
  for (const q of currentAffairsMCQs) {
    if (!seen.has(q.date)) {
      seen.add(q.date);
      dates.push(q.date);
    }
  }
  return dates.sort((a, b) => (a > b ? -1 : 1));
}
