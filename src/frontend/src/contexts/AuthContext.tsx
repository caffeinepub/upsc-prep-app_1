import type {
  RegisterUserResult,
  UpdateUserNameResult,
  backendInterface,
} from "@/backend";
import { createActorWithConfig } from "@/config";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SESSION_KEY = "tslawcet_session";
const SIGNUP_DATE_KEY = "tslawcet_signup_date";

interface User {
  name: string;
  email: string;
}

interface StoredSession extends User {
  userKey: string;
}

interface AuthContextValue {
  user: User | null;
  userKey: string | null;
  isInitializing: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateName: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function hashPassword(password: string): string {
  return btoa(encodeURIComponent(password));
}

function computeUserKey(email: string): string {
  return btoa(email.toLowerCase().trim());
}

let _actor: backendInterface | null = null;
async function getActor(): Promise<backendInterface> {
  if (!_actor) {
    _actor = await createActorWithConfig();
  }
  return _actor;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userKey, setUserKey] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw) as StoredSession;
        if (session.email && session.name) {
          setUser({ name: session.name, email: session.email });
          setUserKey(session.userKey ?? computeUserKey(session.email));
        }
      }
    } catch {
      // ignore
    }
    setIsInitializing(false);
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const actor = await getActor();
        const result = await actor.getUserByEmail(email.toLowerCase().trim());
        if (!result) {
          return { success: false, error: "No account found with this email." };
        }
        const fetched = result as { name: string; passwordHash: string };
        if (fetched.passwordHash !== hashPassword(password)) {
          return {
            success: false,
            error: "Incorrect password. Please try again.",
          };
        }
        const normalizedEmail = email.toLowerCase().trim();
        const key = computeUserKey(normalizedEmail);
        const session: StoredSession = {
          name: fetched.name,
          email: normalizedEmail,
          userKey: key,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        setUser({ name: fetched.name, email: normalizedEmail });
        setUserKey(key);
        return { success: true };
      } catch {
        return { success: false, error: "Login failed. Please try again." };
      }
    },
    [],
  );

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const actor = await getActor();
        const result: RegisterUserResult = await actor.registerUser(
          name.trim(),
          email.toLowerCase().trim(),
          hashPassword(password),
        );
        if (result === "emailTaken") {
          return {
            success: false,
            error: "An account with this email already exists.",
          };
        }
        const normalizedEmail = email.toLowerCase().trim();
        const key = computeUserKey(normalizedEmail);
        const session: StoredSession = {
          name: name.trim(),
          email: normalizedEmail,
          userKey: key,
        };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        if (!localStorage.getItem(SIGNUP_DATE_KEY)) {
          localStorage.setItem(SIGNUP_DATE_KEY, new Date().toISOString());
        }
        setUser({ name: name.trim(), email: normalizedEmail });
        setUserKey(key);
        return { success: true };
      } catch {
        return { success: false, error: "Signup failed. Please try again." };
      }
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setUserKey(null);
  }, []);

  const updateName = useCallback(
    async (name: string): Promise<void> => {
      if (!user) return;
      const trimmed = name.trim();
      if (!trimmed) return;
      try {
        const actor = await getActor();
        const result: UpdateUserNameResult = await actor.updateUserName(
          user.email,
          trimmed,
        );
        // result is "ok" or "notFound" — proceed regardless
        void result;
      } catch {
        // best-effort; still update session locally
      }
      const key = userKey ?? computeUserKey(user.email);
      const session: StoredSession = {
        name: trimmed,
        email: user.email,
        userKey: key,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser({ name: trimmed, email: user.email });
    },
    [user, userKey],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        userKey,
        isInitializing,
        login,
        signup,
        logout,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
