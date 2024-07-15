import { useAuthStore } from "@/store";

export const useAuth = () => {
  const { user, token, CLEAR_AUTH } = useAuthStore();

  const extractUserRole = () => {
    if (user) {
      // @ts-ignore
      return user.user_role.name;
    }
  };

  const logoutSession = () => {
    CLEAR_AUTH();

    window.location.pathname = "/auth/signin";
  };

  return {
    user,
    token,
    logoutSession,
    user_role: extractUserRole(),
    isAuthenticated: !!token,
  };
};
