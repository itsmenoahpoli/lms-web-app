export type SharedFields = {
  id?: number;
  created_at?: string;
  updated_at?: string;
};

export type Lecture = {
  lecture_no: string;
  name: string;
  name_slug: string;
  description: string;
  file?: string;
} & SharedFields;

export type LectureQuizQuestion = {
  title: string;
  answer: string;
};

export type LectureQuiz = {
  lecture_id: string;
  title: string;
  title_slug?: string;
  description: string;
  questions: LectureQuizQuestion[];
  statue: "draft" | "published";
  lecture: Lecture;
} & SharedFields;
