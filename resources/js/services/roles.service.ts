import httpClient from "@/api";
import { toast } from "react-toastify";

export const RolesService = {
  getRolesList: async function () {
    return await httpClient
      .get("/admin/roles")
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);

        toast.error("Failed to load data");
      });
  },
};
