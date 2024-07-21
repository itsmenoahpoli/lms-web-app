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

  deleteLecture: async function (id: number) {
    return await httpClient
      .delete("/teacher/lectures/" + id)
      .then((response) => {
        toast.success("Lecture successfully deleted");

        return response.data;
      })
      .catch(() => toast.error("Failed to delete lecture"));
  },

  updateLecture: async function (id: number, data: any) {
    console.log("data", data);
    return await httpClient
      .patch("/teacher/lectures/" + id, data)
      .then((response) => {
        toast.success("Lecture successfully updated");

        return response.data;
      })
      .catch(() => toast.error("Failed to update lecture"));
  },

  createLecture: async function (data: any) {
    let formData = new FormData();

    for (const d in data) {
      formData.append(d, data[d]);
    }

    return await httpClient
      .post("/teacher/lectures?raw=true", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Lecture successfully created");
      })
      .catch(() => toast.error("Failed to create lectures"));
  },
};
