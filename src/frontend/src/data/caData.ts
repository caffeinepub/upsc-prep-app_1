export const CA_CATEGORIES = [
  {
    id: "legal_ca",
    title: "Legal Current Affairs",
    icon: "⚖️",
    color: "oklch(0.88 0.06 243)",
    topics: [
      "Supreme Court judgments",
      "New laws & amendments",
      "Constitutional updates",
    ],
  },
  {
    id: "national",
    title: "National",
    icon: "🇮🇳",
    color: "oklch(0.90 0.06 145)",
    topics: ["Government schemes", "Telangana news", "Policies"],
  },
  {
    id: "awards",
    title: "Awards & Appointments",
    icon: "🏆",
    color: "oklch(0.92 0.08 85)",
    topics: ["Awards (Nobel, Padma)", "Important appointments"],
  },
  {
    id: "international",
    title: "International",
    icon: "🌍",
    color: "oklch(0.89 0.06 220)",
    topics: ["Global events", "Organizations"],
  },
  {
    id: "sports",
    title: "Sports",
    icon: "🏅",
    color: "oklch(0.90 0.07 35)",
    topics: ["Major tournaments", "Winners"],
  },
  {
    id: "economy",
    title: "Economy",
    icon: "💰",
    color: "oklch(0.91 0.07 170)",
    topics: ["Budget", "RBI updates"],
  },
  {
    id: "science_tech",
    title: "Science & Tech",
    icon: "🚀",
    color: "oklch(0.88 0.07 290)",
    topics: ["ISRO", "AI developments"],
  },
] as const;

export const CA_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function caTopicKey(catId: string, topicIdx: number) {
  return `ca-${catId}-topic-${topicIdx}`;
}

export function caMonthKey(catId: string, monthIdx: number) {
  return `ca-${catId}-month-${monthIdx}`;
}
