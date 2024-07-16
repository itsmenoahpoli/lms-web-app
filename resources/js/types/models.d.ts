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
