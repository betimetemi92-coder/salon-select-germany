import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Role = "customer" | "stylist" | "admin";
export type Gender = "male" | "female" | "diverse";

// Seed a default admin account so the panel is accessible out of the box.
const ADMIN_SEED_KEY = "coiffure_admin_seeded";
const seedAdmin = () => {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(ADMIN_SEED_KEY)) return;
  try {
    const users = JSON.parse(localStorage.getItem("coiffure_users") || "[]");
    if (!users.some((u: any) => u.email === "admin@coiffure.de")) {
      users.push({
        id: crypto.randomUUID(),
        name: "Admin",
        email: "admin@coiffure.de",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("coiffure_users", JSON.stringify(users));
    }
    localStorage.setItem(ADMIN_SEED_KEY, "1");
  } catch {
    // ignore
  }
};
seedAdmin();
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  gender?: Gender;
  createdAt: string;
};

type StoredUser = User & { password: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<User>;
  register: (data: { name: string; email: string; password: string; role: Role; gender?: Gender }) => Promise<User>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

const USERS_KEY = "coiffure_users";
const SESSION_KEY = "coiffure_session";

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};
const writeUsers = (u: StoredUser[]) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session =
        sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (session) setUser(JSON.parse(session));
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const persist = (u: User, remember: boolean) => {
    const store = remember ? localStorage : sessionStorage;
    store.setItem(SESSION_KEY, JSON.stringify(u));
    // clear the other store
    (remember ? sessionStorage : localStorage).removeItem(SESSION_KEY);
  };

  const login: AuthCtx["login"] = async (email, password, remember) => {
    await new Promise((r) => setTimeout(r, 600));
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    );
    if (!found) throw new Error("Ungültige E-Mail oder Passwort.");
    const { password: _pw, ...safe } = found;
    setUser(safe);
    persist(safe, remember);
    return safe;
  };

  const register: AuthCtx["register"] = async ({ name, email, password, role, gender }) => {
    await new Promise((r) => setTimeout(r, 700));
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error("Diese E-Mail ist bereits registriert.");
    }
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      gender,
      createdAt: new Date().toISOString(),
    };
    writeUsers([...users, newUser]);
    const { password: _pw, ...safe } = newUser;
    setUser(safe);
    persist(safe, true);
    return safe;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  };

  const requestPasswordReset = async (email: string) => {
    await new Promise((r) => setTimeout(r, 800));
    // mock — always succeeds
    return;
  };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout, requestPasswordReset }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
};
