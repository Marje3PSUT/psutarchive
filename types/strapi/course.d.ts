declare global {
  interface CourseAttributes {
    name: string;
    name_ar: string;
    course_id: string;
    recordings_url: string | null;
    related_courses?: RelationMulti<CourseAttributes>;
    category?: RelationSingle<CategoryAttributes>;
    exams?: RelationMulti<ExamAttributes>;
    notes?: RelationMulti<NoteAttributes>;
    alt_names?: AltName[];
  }
  interface AltName {
    id: number;
    name: string;
  }
}
export {};
