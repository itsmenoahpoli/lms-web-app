import React from "react";
import type { LectureQuiz } from "@/types/models";

export const LectureQuizForm: React.FC<{
  type: "add" | "update";
  data?: LectureQuiz;
}> = (props) => {
  return <div>QuizForm</div>;
};
