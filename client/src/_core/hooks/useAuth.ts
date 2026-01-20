import { useCallback, useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

// 模拟用户数据（纯前端应用不需要真实认证）
const MOCK_USER = {
  id: "1",
  name: "访客",
  email: "guest@example.com",
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/" } = options ?? {};
  const [user, setUser] = useState<typeof MOCK_USER | null>(MOCK_USER);
  const [loading, setLoading] = useState(false);

  // 从 localStorage 读取用户信息（如果有）
  useEffect(() => {
    const stored = localStorage.getItem("manus-runtime-user-info");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed) setUser(parsed);
      } catch {
        // 忽略解析错误
      }
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem("manus-runtime-user-info");
  }, []);

  const state = useMemo(() => {
    if (user) {
      localStorage.setItem("manus-runtime-user-info", JSON.stringify(user));
    }
    return {
      user,
      loading,
      error: null,
      isAuthenticated: Boolean(user),
    };
  }, [user, loading]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (loading) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath;
  }, [redirectOnUnauthenticated, redirectPath, loading, state.user]);

  return {
    ...state,
    refresh: () => {
      // 刷新用户信息（纯前端应用不需要）
    },
    logout,
  };
}
