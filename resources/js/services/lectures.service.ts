import httpClient from "@/api";
import { toast } from "react-toastify";

export const LecturesService = {
  getLecturesList: async function () {
    return await httpClient
      .get("/teacher/lectures?raw=true")
      .then((response) => response.data)
      .catch(() => toast.error("Failed to fetch lectures list"));
  },

  getLecture: async function (id: number) {
    return await httpClient
      .get("/teacher/lectures/" + id)
      .then((response) => response.data)
      .catch(() => toast.error("Failed to fetch lecture"));
  },

  createLecture: async function (data: any) {
    let formData = new FormData();

    for (const d in data) {
      console.log(d);
    }

    return await httpClient
      .post("/teacher/lectures?raw=true", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Lecture successfully created");
      })
      .catch(() => toast.error("Failed to create lectures"));
  },
};
