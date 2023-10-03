declare global {
  interface MaterialMetadata {
    id: number;
    year: number;
    semester: Semesters | null;
    uploader?: MaterialUploader;
  }

  interface NoteAttributes {
    type: NoteTypes;
    title?: string | null;
    is_solved: never;
  }
  interface ExamAttributes {
    type: ExamTypes;
    is_solved: boolean;
    title?: string | null;
  }

  type MaterialSpecificAttributes<T extends NoteAttributes | ExamAttributes> = MaterialTypeAttributes & T 
}
export {};

interface MaterialUploader {
  id: number;
  name: string;
  email?: string | null;
}

interface MaterialTypeAttributes {
  id: number;
  __component: "material.exam-data" | "material.note-data";
}

export enum Semesters {
  Fall = "fall",
  Spring = "spring",
  Summer = "summer"
}
export enum NoteTypes {
  Summary = "summary",
  Slides = "slides",
  Assignment = "assignment",
  Project = "project",
  Other = "other",
}
export enum ExamTypes {
  First = "first",
  Second = "second",
  Midterm = "midterm",
  Final = "final",
  Quiz = "quiz",
}
