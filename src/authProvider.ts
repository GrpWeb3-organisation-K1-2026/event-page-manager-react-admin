import type { AuthProvider } from "react-admin";

const API_URL = "/api";

export const authProvider: AuthProvider = {
  async login({ username, password }) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    const auth = await response.json();
    localStorage.setItem("auth", JSON.stringify(auth));
  },

  async checkError(error) {
    const status = error?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      throw new Error("Session expired");
    }
    // Autres codes d'erreur (404, 500, etc.) : pas de déconnexion
  },

  async checkAuth() {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      throw new Error("Not authenticated");
    }

    // Optionnel : vérifier l'expiration du token JWT côté client
    try {
      const { token } = JSON.parse(auth);
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("auth");
          throw new Error("Token expired");
        }
      }
    } catch {
      // Si le token n'est pas un JWT valide, on laisse passer
    }
  },

  async logout() {
    localStorage.removeItem("auth");
  },

  async getIdentity() {
    const raw = localStorage.getItem("auth");

    if (!raw) {
      throw new Error("Not authenticated");
    }

    const auth = JSON.parse(raw);

    return {
      id: auth.id ?? auth.sub ?? "unknown",
      fullName: auth.fullName ?? auth.username ?? auth.email ?? "User",
      avatar: auth.avatar ?? undefined,
    };
  },

  async getPermissions() {
    const raw = localStorage.getItem("auth");

    if (!raw) return null;

    const auth = JSON.parse(raw);
    return auth.role ?? null;
  },
};