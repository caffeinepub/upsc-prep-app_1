import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SubjectProgress {
    subject: Subject;
    completionPercentage: bigint;
}
export interface UserProfile {
    displayName: string;
    joinDate: Time;
    studyStreak: bigint;
}
export interface DailyTarget {
    id: bigint;
    isCompleted: boolean;
    description: string;
}
export enum Subject {
    scienceTech = "scienceTech",
    economy = "economy",
    history = "history",
    geography = "geography",
    currentAffairs = "currentAffairs",
    polity = "polity"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDailyTarget(description: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCompletedTargets(): Promise<void>;
    getCallerStudyProgress(): Promise<Array<SubjectProgress>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDailyTargets(): Promise<Array<DailyTarget>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    toggleTargetCompletion(targetId: bigint): Promise<void>;
    updateStudyProgress(subject: Subject, completionPercentage: bigint): Promise<void>;
}
