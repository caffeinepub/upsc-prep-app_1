// Local types that were removed from backend after regeneration

export interface DailyTarget {
  id: bigint;
  description: string;
  isCompleted: boolean;
}

export interface SubjectProgress {
  subject: Subject;
  completionPercentage: bigint;
}

export enum Subject {
  history = "history",
  geography = "geography",
  polity = "polity",
  economy = "economy",
  scienceTech = "scienceTech",
  currentAffairs = "currentAffairs",
}
