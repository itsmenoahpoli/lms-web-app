import httpClient from "@/api";
import { useAuthStore } from "@/store";
import type { Credentials } from "@/types/auth";

export const AuthService = {
  authenticate: async function (
    credentials: Credentials,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    return await httpClient
      .post("/auth/login", credentials)
      .then((response) => {
        const { SET_TOKEN, SET_USER } = useAuthStore.getState();
        const { user, token } = response.data;

        SET_TOKEN(token);
        SET_USER(user);

        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  },
};
