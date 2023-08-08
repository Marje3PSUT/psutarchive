declare global {
  interface ExamAttributes {
    type: "First" | "Second" | "Midterm" | "Final" | "Quiz";
    is_solved: boolean;
    course?: RelationSingle<CourseAttributes>;
    files?: RelationMulti<MediaAttributes>;
    metadata?: MaterialMetadata;
  }
}
export {};
