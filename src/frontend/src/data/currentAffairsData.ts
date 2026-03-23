export type Category =
  | "National"
  | "International"
  | "Economy"
  | "Legal"
  | "Awards/Sports";

export type NewsTag = "most-important" | "exam-likely";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: Category;
  tags?: NewsTag[];
}

export interface DailyAffairs {
  date: string; // YYYY-MM-DD
  displayDate: string;
  items: NewsItem[];
}

// IMPORTANT: This is a permanent static store. Never overwrite previous days.
// Always prepend new dates at the top (newest first).
export const currentAffairsData: DailyAffairs[] = [
  {
    date: "2026-03-22",
    displayDate: "Saturday, 22 March 2026",
    items: [
      {
        id: "2026-03-22-01",
        title:
          "Supreme Court Upholds Right to Digital Privacy in Landmark Verdict",
        summary:
          "The Supreme Court of India, in a 7-2 majority ruling, held that citizens have a fundamental right to digital privacy under Article 21. The bench ruled that mass surveillance without judicial oversight violates the Constitution. The judgment is expected to reshape data protection legislation and government surveillance protocols nationwide.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2026-03-22-02",
        title:
          "India Launches GSAT-25 Satellite for Rural Broadband Connectivity",
        summary:
          "ISRO successfully placed the GSAT-25 communication satellite into geostationary orbit, aimed at providing high-speed broadband to remote and rural areas across India. The satellite will serve over 50,000 gram panchayats not yet covered under BharatNet. It will also support disaster management communications in flood-prone regions.",
        category: "National",
      },
      {
        id: "2026-03-22-03",
        title: "RBI Holds Repo Rate Steady at 6.25%, Signals Cautious Stance",
        summary:
          "The Reserve Bank of India's Monetary Policy Committee voted unanimously to keep the repo rate unchanged at 6.25% in its bi-monthly review. The RBI cited persistent global inflationary pressures and a slowdown in export growth as key concerns. Retail inflation for February 2026 stood at 4.8%, within the target band.",
        category: "Economy",
        tags: ["exam-likely"],
      },
      {
        id: "2026-03-22-04",
        title:
          "India and EU Sign Free Trade Agreement After 10 Years of Negotiations",
        summary:
          "India and the European Union formally signed a landmark Free Trade Agreement in Brussels, ending over a decade of intermittent negotiations. The deal covers goods, services, investment, and intellectual property, with tariff reductions on automobiles, pharmaceuticals, and agricultural products. It is expected to boost bilateral trade to $200 billion by 2030.",
        category: "International",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2026-03-22-05",
        title:
          "P.V. Sindhu Wins Gold at All England Badminton Championships 2026",
        summary:
          "Star Indian shuttler P.V. Sindhu claimed the women's singles gold medal at the All England Badminton Championships 2026 in Birmingham, defeating Japan's Akane Yamaguchi in a thrilling three-game final. This is Sindhu's first All England title and a significant milestone in her decorated career. She is now ranked World No. 2 in the BWF rankings.",
        category: "Awards/Sports",
      },
      {
        id: "2026-03-22-06",
        title:
          "Telangana Announces New Industrial Policy 2026–2031 to Attract ₹5 Lakh Crore Investment",
        summary:
          "The Telangana government unveiled its Industrial Policy 2026–2031, targeting ₹5 lakh crore in investments and creation of 20 lakh jobs over five years. The policy offers incentives for semiconductor manufacturing, green hydrogen, and IT/ITES sectors. Special economic zones will be developed in Warangal, Karimnagar, and Nizamabad.",
        category: "National",
      },
      {
        id: "2026-03-22-07",
        title: "GST Council Reduces Tax on EVs and Solar Equipment to 5%",
        summary:
          "The GST Council, chaired by the Finance Minister, approved a reduction of GST on electric vehicles and solar energy equipment from 12% to 5%, effective from April 2026. The move is expected to accelerate adoption of clean energy and reduce dependence on fossil fuels. Auto manufacturers welcomed the decision, projecting a 30% rise in EV sales.",
        category: "Economy",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2026-03-22-08",
        title: "Padma Awards 2026 Announced: 128 Recipients Across Fields",
        summary:
          "The Government of India announced the Padma Awards 2026 with 128 recipients, including 5 Padma Vibhushan, 17 Padma Bhushan, and 106 Padma Shri awardees. Notable awardees include eminent jurist and retired Chief Justice Dr. Y. V. Chandrachud (posthumously) and folk musician Teejan Bai. This year's list includes the highest number of women awardees in a decade.",
        category: "Awards/Sports",
      },
    ],
  },
  {
    date: "2026-03-21",
    displayDate: "Friday, 21 March 2026",
    items: [
      {
        id: "2026-03-21-01",
        title:
          "Parliament Passes Digital Courts Bill 2026 to Modernise Justice Delivery",
        summary:
          "The Lok Sabha and Rajya Sabha passed the Digital Courts Bill 2026, which mandates electronic filing of all cases above district courts within two years. The law also introduces AI-assisted case scheduling to reduce pendency. India currently has over 5 crore pending cases across all courts, and this bill is seen as a transformative step in judicial reform.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2026-03-21-02",
        title: "India's GDP Growth Rate Revised Upward to 7.2% for FY2025-26",
        summary:
          "The Central Statistics Office revised India's GDP growth estimate for FY2025-26 upward to 7.2%, making it the fastest-growing major economy globally for the third consecutive year. Strong performance in manufacturing, services, and infrastructure sectors drove the revision. The IMF has also updated its forecast for India's growth in 2026 to 7.0%.",
        category: "Economy",
        tags: ["most-important"],
      },
      {
        id: "2026-03-21-03",
        title:
          "India Elected as Non-Permanent Member of UN Security Council for 2027-28 Term",
        summary:
          "India was elected as a non-permanent member of the United Nations Security Council for the 2027-28 term with an overwhelming majority of 179 votes. This is India's eighth time on the Security Council since independence. The election is being seen as a strong endorsement of India's global standing and its push for permanent UNSC membership.",
        category: "International",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2026-03-21-04",
        title:
          "National Education Policy 2025 Amendments: Law Degree Now 3+2 Structure",
        summary:
          "The Ministry of Education announced amendments to the National Education Policy placing law education on a 3+2 structure — a 3-year undergraduate law degree followed by a specialized 2-year LLM. The Bar Council of India has been asked to revise entrance exam guidelines accordingly. Law entrance tests like CLAT and TS LAWCET will need to align their eligibility criteria by 2028.",
        category: "National",
        tags: ["exam-likely"],
      },
      {
        id: "2026-03-21-05",
        title: "Neeraj Chopra Breaks World Record with 93.4m Javelin Throw",
        summary:
          "Olympic champion Neeraj Chopra shattered the world record in javelin throw at the Diamond League event in Doha, recording an astonishing 93.4 meters to break the previous record of 92.72m set by Jan Železný in 1996. The achievement was greeted with widespread national celebrations. Chopra is now a strong favourite for gold at the 2028 Los Angeles Olympics.",
        category: "Awards/Sports",
        tags: ["most-important"],
      },
      {
        id: "2026-03-21-06",
        title: "G20 Summit in New Delhi: Communiqué on AI Governance Signed",
        summary:
          "The G20 Sherpa Summit in New Delhi concluded with member nations signing a communiqué on AI governance, committing to shared ethical principles for artificial intelligence deployment. India played a key role in drafting the framework, emphasizing digital inclusion for developing nations. The framework will be presented at the formal G20 Summit in September 2026.",
        category: "International",
      },
      {
        id: "2026-03-21-07",
        title:
          "Centre Launches PM VIKAS Scheme to Uplift OBC Artisans Nationwide",
        summary:
          "The Union Cabinet approved the PM VIKAS (Vishwakarma Skill Development and Empowerment Scheme) with an enhanced budget of ₹18,000 crore to benefit 60 lakh traditional artisans and craftspersons from OBC communities. The scheme provides free skill training, toolkits, and access to credit at subsidised rates. It targets sectors like pottery, blacksmithing, weaving, and carpentry.",
        category: "National",
      },
    ],
  },
  {
    date: "2026-03-20",
    displayDate: "Thursday, 20 March 2026",
    items: [
      {
        id: "2026-03-20-01",
        title: "High Court Rules Against Blanket Use of UAPA for Bail Denial",
        summary:
          "The Telangana High Court delivered a significant ruling that courts cannot mechanically deny bail in UAPA cases without independent judicial scrutiny of evidence. The bench cited the Supreme Court's Zubair and Sudha Bharadwaj judgments to reinforce that pre-trial detention must be proportionate. The ruling could impact hundreds of pending bail applications in terrorism-related cases across India.",
        category: "Legal",
      },
      {
        id: "2026-03-20-02",
        title: "India Crosses 100 GW Solar Power Installation Milestone",
        summary:
          "India achieved a historic milestone by crossing 100 GW of installed solar power capacity, becoming only the fourth country in the world to reach this mark. The achievement comes three years ahead of the original 2030 target. Rajasthan, Gujarat, and Andhra Pradesh are the top three contributors to total solar output. The renewable energy sector now employs over 10 lakh people.",
        category: "National",
        tags: ["most-important"],
      },
      {
        id: "2026-03-20-03",
        title:
          "China-Pakistan Economic Corridor Phase III Projects Begin Amid India's Objections",
        summary:
          "Pakistan and China formally launched Phase III of the China-Pakistan Economic Corridor (CPEC), including new projects in Pakistan-occupied Kashmir. India reiterated its strong objections, calling the projects illegal as they pass through Indian territory. The Ministry of External Affairs summoned the Chinese Ambassador to lodge a formal diplomatic protest.",
        category: "International",
      },
      {
        id: "2026-03-20-04",
        title: "Inflation Falls to 4.6% in February 2026, Lowest in 18 Months",
        summary:
          "Consumer Price Index (CPI)-based retail inflation declined to 4.6% in February 2026, the lowest level in 18 months, driven by a fall in food and fuel prices. Vegetable prices, which had spiked sharply last year, corrected significantly. Economists expect the RBI to consider a rate cut in its next MPC meeting if the trend sustains through March.",
        category: "Economy",
      },
      {
        id: "2026-03-20-05",
        title:
          "Arjuna Award 2026: Chess GM D. Gukesh Among 12 Sportspersons Honoured",
        summary:
          "The Sports Ministry announced 12 Arjuna Award recipients for 2026, including chess grandmaster D. Gukesh, who made India proud at the World Chess Championship. Other recipients include athletes from athletics, boxing, and para-sports. The awards will be presented by the President of India on National Sports Day, 29 August 2026.",
        category: "Awards/Sports",
      },
      {
        id: "2026-03-20-06",
        title:
          "India Signs MoU with UK for Mutual Recognition of Professional Degrees",
        summary:
          "India and the United Kingdom signed a Mutual Recognition of Professional Qualifications (MRPQ) agreement covering legal, engineering, and accounting professions. Under the deal, Indian law degrees from Bar Council-accredited institutions will be recognised in the UK, opening pathways for Indian lawyers to practice in England and Wales. Implementation will begin from January 2027.",
        category: "International",
      },
      {
        id: "2026-03-20-07",
        title:
          "Cybercrime Act 2026 Passed: Strict Penalties for Online Financial Fraud",
        summary:
          "The Indian Parliament passed the Cybercrime Prevention and Accountability Act 2026, introducing penalties of up to 10 years imprisonment for online financial fraud exceeding ₹10 lakh. The Act mandates digital forensic capability in every state police cyber cell and establishes a National Cyber Intelligence Unit under the Home Ministry. Victims of cyber fraud will also have a statutory right to compensation.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
    ],
  },
  // ─── January 2025 ───────────────────────────────────────────────
  {
    date: "2025-01-08",
    displayDate: "Wednesday, 8 January 2025",
    items: [
      {
        id: "2025-01-08-01",
        title:
          "Supreme Court Issues Guidelines on Undertrial Prisoners' Rights",
        summary:
          "The Supreme Court issued comprehensive guidelines directing all High Courts to conduct quarterly reviews of undertrial prisoners held beyond half their maximum sentence. The bench emphasized that prolonged pretrial detention violates Article 21. Courts were asked to set up dedicated fast-track benches for bail reviews by March 2025.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-08-02",
        title: "PM Modi Inaugurates Vizhinjam International Seaport in Kerala",
        summary:
          "Prime Minister Narendra Modi inaugurated the Vizhinjam International Deepwater Multipurpose Seaport in Thiruvananthapuram, Kerala. The port, built at a cost of ₹8,867 crore, is India's first semi-automated port and can handle mega container ships. It is expected to reduce India's dependence on foreign transshipment hubs like Colombo and Singapore.",
        category: "National",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-08-03",
        title: "India's Foreign Exchange Reserves Rise to $640 Billion",
        summary:
          "India's foreign exchange reserves rose to $640 billion as of the first week of January 2025, the highest level in over a year. The Reserve Bank of India attributed the rise to strong capital inflows and robust export earnings. India now holds the fourth-largest forex reserves globally after China, Japan, and Switzerland.",
        category: "Economy",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-08-04",
        title:
          "India and Japan Sign Defence Pact for Co-Production of Military Equipment",
        summary:
          "India and Japan signed a landmark defence cooperation agreement in Tokyo for the co-production of military equipment including advanced radar systems and maritime patrol aircraft. The deal builds on the 2+2 Ministerial Dialogue framework. It marks a significant deepening of the India-Japan strategic partnership amid shared concerns over Chinese naval expansion.",
        category: "International",
      },
      {
        id: "2025-01-08-05",
        title: "Manu Bhaker Wins Khel Ratna Award 2024",
        summary:
          "Shooter Manu Bhaker was conferred the Major Dhyan Chand Khel Ratna Award 2024 — India's highest sporting honour — for her historic double-bronze performance at the Paris Olympics 2024. She became the first Indian shooter and first woman to win two Olympic medals at a single Games. The award was presented by the President of India at Rashtrapati Bhavan.",
        category: "Awards/Sports",
        tags: ["most-important", "exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-07",
    displayDate: "Tuesday, 7 January 2025",
    items: [
      {
        id: "2025-01-07-01",
        title:
          "Telangana HC Strikes Down State Ordinance on Land Acquisition as Unconstitutional",
        summary:
          "The Telangana High Court struck down a state government ordinance that sought to acquire agricultural land without following mandatory procedures under the Land Acquisition Act 2013. The court held that bypassing consent and Social Impact Assessment provisions violated farmers' constitutional rights. The government was directed to restart acquisition proceedings lawfully.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-07-02",
        title: "India Achieves 500 GW Renewable Energy Installation Target",
        summary:
          "India formally crossed the 500 GW non-fossil fuel electricity capacity mark, fulfilling a key COP26 pledge ahead of schedule. Solar and wind power account for the majority of the addition. India now aims for 1,000 GW of renewable energy by 2030, and this milestone reinforces its position as a global clean energy leader.",
        category: "National",
        tags: ["most-important"],
      },
      {
        id: "2025-01-07-03",
        title:
          "WTO Ministerial Conference Concludes Without Agreement on Fisheries Subsidies",
        summary:
          "The 14th WTO Ministerial Conference concluded in Abu Dhabi without a final agreement on eliminating harmful fisheries subsidies. India and developing nations pushed back against provisions they argued would disproportionately impact artisanal fishermen. Negotiations will continue through 2025 under a revised timeline.",
        category: "International",
      },
      {
        id: "2025-01-07-04",
        title: "Government Launches PM Internship Scheme for 10 Lakh Youth",
        summary:
          "The Union Cabinet formally launched the PM Internship Scheme, providing 10 lakh youth with one-year internship opportunities in India's top 500 companies. Interns will receive a monthly stipend of ₹5,000 along with a one-time grant of ₹6,000. The scheme targets graduates aged 21–24 from economically weaker backgrounds.",
        category: "National",
        tags: ["exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-06",
    displayDate: "Monday, 6 January 2025",
    items: [
      {
        id: "2025-01-06-01",
        title:
          "Supreme Court Rules Live-In Relationships Entitled to Domestic Violence Protections",
        summary:
          "The Supreme Court held that women in live-in relationships are entitled to protection under the Protection of Women from Domestic Violence Act 2005. The bench ruled that the term 'relationship in the nature of marriage' under the Act covers stable live-in partnerships. The ruling expands legal safeguards for women outside formal marriage.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-06-02",
        title:
          "ISRO's Space Docking Experiment (SpaDeX) Successfully Completes Docking",
        summary:
          "ISRO's Space Docking Experiment (SpaDeX) mission successfully completed its first autonomous space docking between two small spacecraft in Low Earth Orbit. India became only the fourth country after the US, Russia, and China to master space docking technology. SpaDeX is a critical precursor for India's future crewed Gaganyaan missions and a planned space station.",
        category: "National",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-06-03",
        title: "India and UAE Expand CEPA to Include Digital Trade Chapter",
        summary:
          "India and the UAE signed an expansion of their Comprehensive Economic Partnership Agreement (CEPA) to include a Digital Trade Chapter covering e-commerce, data flows, and digital payments. Bilateral trade between the two countries reached $85 billion in 2024. The expansion is expected to further strengthen the UAE's position as India's third-largest trading partner.",
        category: "International",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-06-04",
        title: "Piyush Goyal Appointed as India's Chief Trade Negotiator",
        summary:
          "Commerce Minister Piyush Goyal was appointed as India's Chief Trade Negotiator with special powers to conclude Free Trade Agreements with the EU, UK, and Canada. The appointment signals India's intent to fast-track trade deals in 2025. Ongoing FTA negotiations with the EU had stalled over disagreements on automobile tariffs and data protection.",
        category: "Awards/Sports",
        tags: ["exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-05",
    displayDate: "Sunday, 5 January 2025",
    items: [
      {
        id: "2025-01-05-01",
        title:
          "Allahabad HC Rules 'Bulldozer Justice' Demolitions Unconstitutional",
        summary:
          "The Allahabad High Court ruled that demolition of properties belonging to accused persons without due process — popularly called 'bulldozer justice' — violates Articles 14, 19, and 21 of the Constitution. The court directed all state governments to follow the Supreme Court's October 2024 guidelines on demolitions strictly. Victims were entitled to restoration of property or compensation.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-05-02",
        title: "India's Unemployment Rate Falls to 3.2%, Lowest Since 2019",
        summary:
          "The Periodic Labour Force Survey (PLFS) data released in January 2025 showed India's unemployment rate fell to 3.2% in 2024, the lowest since 2019. Urban female unemployment showed the sharpest decline, falling to 8.5%. The MSME sector and construction boom were cited as key drivers of the employment recovery.",
        category: "National",
      },
      {
        id: "2025-01-05-03",
        title: "Prabowo Subianto Sworn in as Indonesia's New President",
        summary:
          "Prabowo Subianto was sworn in as the 8th President of Indonesia, succeeding Joko Widodo after winning the February 2024 presidential election. India and Indonesia share strong bilateral ties and Prabowo's foreign policy is expected to continue the Widodo government's Act West policy engaging India and ASEAN partners. Indonesia is ASEAN's largest economy.",
        category: "International",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-05-04",
        title: "Kho-Kho World Cup 2025: India Wins Inaugural Edition",
        summary:
          "India won the inaugural Kho-Kho World Cup 2025 held in New Delhi, defeating Nepal in both the men's and women's finals. The tournament saw 24 nations participate, showcasing the traditional Indian sport on a global stage for the first time. Sports Minister Mansukh Mandaviya announced plans to include Kho-Kho in the 2026 Asian Games programme.",
        category: "Awards/Sports",
        tags: ["most-important", "exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-04",
    displayDate: "Saturday, 4 January 2025",
    items: [
      {
        id: "2025-01-04-01",
        title:
          "Parliament Passes Bharatiya Vayuyan Vidheyak 2024 — New Aviation Law",
        summary:
          "The Bharatiya Vayuyan Vidheyak 2024, replacing the Aircraft Act of 1934, was passed by Parliament to modernise India's civil aviation regulatory framework. The new law establishes a stricter safety audit regime, provides for drone regulation, and aligns Indian aviation law with international ICAO standards. It also enhances penalties for aviation security violations.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-04-02",
        title:
          "Union Cabinet Approves ₹1.08 Lakh Crore National Industrial Corridor Programme",
        summary:
          "The Union Cabinet approved the National Industrial Corridor Programme (NICP) with a total outlay of ₹1.08 lakh crore to develop 12 new industrial cities across India. Cities like Khurpia (Uttarakhand), Rajpura-Patiala (Punjab), and Dighi Port (Maharashtra) are among the twelve greenfield projects. The programme aims to generate 1 crore jobs and attract foreign investment.",
        category: "National",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-04-03",
        title: "South Korea Declares National Emergency Amid Political Crisis",
        summary:
          "South Korean President Yoon Suk-yeol declared martial law before reversing it hours later following a parliamentary vote against it, triggering a major political crisis. The Constitutional Court began proceedings for his impeachment. The episode raised concerns about democratic stability in one of Asia's key economies and affected South Korea's financial markets.",
        category: "International",
      },
      {
        id: "2025-01-04-04",
        title:
          "Dr. Rohini Godbole, First Woman to Win S.N. Bose Medal, Passes Away",
        summary:
          "Noted particle physicist Dr. Rohini Godbole, the first woman to receive the S.N. Bose Medal from the Indian National Science Academy, passed away in Bengaluru. She was a distinguished theoretical physicist and contributed significantly to High Energy Physics research. She also mentored hundreds of women physicists through her work at IISc.",
        category: "Awards/Sports",
        tags: ["exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-03",
    displayDate: "Friday, 3 January 2025",
    items: [
      {
        id: "2025-01-03-01",
        title:
          "Supreme Court Upholds Constitutional Validity of PMLA Stringent Bail Conditions",
        summary:
          "A Constitution Bench of the Supreme Court upheld the stringent bail conditions under Section 45 of the Prevention of Money Laundering Act (PMLA), ruling they are not unconstitutional per se. The bench held that economic offences require special treatment and that the reverse burden clause is reasonable. However, it emphasised courts must apply mind independently to each bail application.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-03-02",
        title:
          "National Testing Agency Restructured After NEET-UG 2024 Paper Leak Controversy",
        summary:
          "The Union government announced a comprehensive restructuring of the National Testing Agency (NTA) following the NEET-UG 2024 question paper leak scandal. Key changes include appointment of a new Director General, creation of an independent audit committee, and introduction of biometric verification at exam centres. The government also constituted a high-level committee for a complete overhaul of the examination system.",
        category: "National",
        tags: ["most-important"],
      },
      {
        id: "2025-01-03-03",
        title: "India Assumes Presidency of the Quad Grouping for 2025",
        summary:
          "India formally assumed the presidency of the Quad grouping (India, US, Australia, Japan) for 2025. The Quad Summit is scheduled to be hosted in India later in the year, with the Indo-Pacific maritime security, technology cooperation, and climate resilience as key agenda items. India's presidency is seen as a major diplomatic milestone.",
        category: "International",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-03-04",
        title:
          "Saraswati Samman 2024 Awarded to Gulzar for Urdu Poetry Collection",
        summary:
          "Renowned lyricist and poet Gulzar was awarded the Saraswati Samman 2024 — one of India's highest literary honours — for his Urdu poetry collection 'Rekhta'. The award, carrying ₹15 lakh prize money, is given annually by the K.K. Birla Foundation for outstanding literary work in any Indian language. Gulzar is also a Dadasaheb Phalke and Oscar winner.",
        category: "Awards/Sports",
        tags: ["exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-02",
    displayDate: "Thursday, 2 January 2025",
    items: [
      {
        id: "2025-01-02-01",
        title:
          "Waqf Amendment Bill 2024 Referred to Joint Parliamentary Committee",
        summary:
          "The Waqf (Amendment) Bill 2024, which proposes significant changes to the Waqf Act 1995 including insertion of non-Muslim members in Waqf Boards and enhanced government oversight, was referred to a Joint Parliamentary Committee for detailed examination. Muslim bodies and opposition parties raised constitutional concerns regarding minority rights under Article 30. The JPC report is expected in the Budget Session.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-02-02",
        title: "India's Manufacturing PMI Hits 57.7 — Highest in 16 Years",
        summary:
          "India's Manufacturing Purchasing Managers' Index (PMI) rose to 57.7 in December 2024, the highest reading in 16 years, signalling robust expansion in factory activity. Strong domestic demand, export orders, and capacity expansion drove the surge. Economists noted that India's manufacturing sector is emerging as a key growth engine replacing China in global supply chains.",
        category: "Economy",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-02-03",
        title:
          "New Year 2025: Major World Leaders Highlight Peace and Climate Action",
        summary:
          "World leaders in their New Year addresses emphasised peace in conflict zones and accelerated climate action as top priorities for 2025. UN Secretary-General Antonio Guterres called 2025 a 'critical year' for the Paris Agreement implementation. Several nations announced enhanced NDC targets ahead of COP30 scheduled in Belem, Brazil in November 2025.",
        category: "International",
      },
      {
        id: "2025-01-02-04",
        title:
          "Telangana Launches 'Indiramma Indlu' Housing Scheme for 4 Lakh Families",
        summary:
          "The Telangana government launched 'Indiramma Indlu', its flagship housing scheme promising 4 lakh houses to economically weaker sections and BC communities in rural areas. Each beneficiary will receive ₹5 lakh for construction along with free land pattas in eligible cases. The scheme aligns with the state's 'Prajapalana' governance programme.",
        category: "National",
        tags: ["exam-likely"],
      },
    ],
  },
  {
    date: "2025-01-01",
    displayDate: "Wednesday, 1 January 2025",
    items: [
      {
        id: "2025-01-01-01",
        title: "Bharatiya Nagarik Suraksha Sanhita 2023 Comes into Full Effect",
        summary:
          "The three new criminal laws — Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) — came into full effect across all states from 1 January 2025, replacing the Indian Penal Code 1860, CrPC 1973, and Indian Evidence Act 1872. The new laws introduce timelines for trials, recognition of organised crime, and expand electronic evidence provisions.",
        category: "Legal",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-01-02",
        title: "India Becomes 4th Largest Economy, Surpasses Japan",
        summary:
          "India officially overtook Japan to become the world's fourth-largest economy by nominal GDP as per IMF data released on 1 January 2025. India's GDP crossed $4.3 trillion, compared to Japan's $4.1 trillion. India is now behind only the United States, China, and Germany, and is projected to surpass Germany by 2027.",
        category: "National",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-01-03",
        title:
          "India Takes Over G20 Sherpa Role Under South Africa's G20 Presidency",
        summary:
          "South Africa assumed the G20 Presidency for 2025 from Brazil, with the theme 'Solidarity, Equality, Sustainability'. India handed over the Sherpa role while retaining its influential position in the G20 framework. India's development-focused agenda items, including debt relief for Global South nations, will continue to be championed in 2025.",
        category: "International",
        tags: ["exam-likely"],
      },
      {
        id: "2025-01-01-04",
        title:
          "Padma Awards 2025: Justice (Retd.) Fali S. Nariman Awarded Bharat Ratna Posthumously",
        summary:
          "The government announced that eminent constitutional lawyer Justice (Retd.) Fali S. Nariman would be honoured with the Bharat Ratna posthumously for his outstanding lifetime contribution to Indian law and legal education. He passed away in February 2024. He was a Senior Advocate before the Supreme Court for over 60 years and played a pivotal role in constitutional jurisprudence.",
        category: "Awards/Sports",
        tags: ["most-important", "exam-likely"],
      },
      {
        id: "2025-01-01-05",
        title: "Sunil Chhetri Retires from International Football",
        summary:
          "India's all-time leading football scorer Sunil Chhetri officially retired from international football on 1 January 2025 after a 19-year career spanning 151 appearances and 94 goals. He is the third-highest international goal scorer among active players globally, behind only Ronaldo and Messi. AIFF announced a special tribute match in his honour to be held in Kolkata.",
        category: "Awards/Sports",
        tags: ["exam-likely"],
      },
    ],
  },
];
