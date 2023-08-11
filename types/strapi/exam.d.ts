declare global {
  interface ExamAttributes {
    // TODO: turn type into an enum
    type: "First" | "Second" | "Midterm" | "Final" | "Quiz";
    is_solved: boolean;
    course?: RelationSingle<CourseAttributes>;
    files?: RelationMulti<MediaAttributes>;
    metadata?: MaterialMetadata;
  }
}
export {};
