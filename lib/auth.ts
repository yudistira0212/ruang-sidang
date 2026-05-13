import type { UserAccount } from "@/types/booking";

const SESSION_KEY = "ruang_sidang_is_logged_in";
const SESSION_USER_KEY = "ruang_sidang_session_user";

export function setLoginSession(user: UserAccount) {
  if (typeof window === "undefined") return;

  localStorage.setItem(SESSION_KEY, "true");
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

export function logout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_USER_KEY);
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(SESSION_KEY) === "true";
}

export function getSessionUser(): UserAccount | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(SESSION_USER_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as UserAccount;
  } catch {
    return null;
  }
}
