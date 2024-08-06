import httpClient from "@/api";
import { toast } from "react-toastify";

export const QuizsesService = {
  getQuizsesList: async function () {
    return await httpClient
      .get("/teacher/lecture-quizses?raw=true")
      .then((response) => response.data)
      .catch(() => toast.error("Failed to fetch quizses list"));
  },

  getQuiz: async function (id: number) {
    return await httpClient
      .get("/teacher/lecture-quizses/" + id)
      .then((response) => response.data)
      .catch(() => toast.error("Failed to fetch quiz"));
  },

  deleteQuiz: async function (id: number) {
    return await httpClient
      .delete("/teacher/lecture-quizses/" + id)
      .then((response) => {
        toast.success("Quiz successfully deleted");

        return response.data;
      })
      .catch(() => toast.error("Failed to delete quiz"));
  },

  updateQuiz: async function (id: number, data: any) {
    console.log("data", data);
    return await httpClient
      .patch("/teacher/lecture-quizses/" + id, data)
      .then((response) => {
        toast.success("Quiz successfully updated");

        return response.data;
      })
      .catch(() => toast.error("Failed to update quiz"));
  },

  createQuiz: async function (data: any) {
    let formData = new FormData();

    for (const d in data) {
      formData.append(d, data[d]);
    }

    return await httpClient
      .post("/teacher/lecture-quizses?raw=true", formData)
      .then((response) => {
        toast.success("Quiz successfully created");
        window.location.href = "/dashboard/teacher/lecture-quizses/manage";
      })
      .catch(() => toast.error("Failed to create Quizs"));
  },
};
