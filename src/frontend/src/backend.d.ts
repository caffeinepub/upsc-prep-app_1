import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export enum RegisterUserResult {
    ok = "ok",
    emailTaken = "emailTaken"
}
export enum UpdateUserNameResult {
    ok = "ok",
    notFound = "notFound"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserByEmail(email: string): Promise<{
        name: string;
        passwordHash: string;
    } | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(name: string, email: string, passwordHash: string): Promise<RegisterUserResult>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateUserName(email: string, name: string): Promise<UpdateUserNameResult>;
}
