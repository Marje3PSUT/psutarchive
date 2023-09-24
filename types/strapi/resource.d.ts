declare global {
  interface ResourceAttributes {
    files?: RelationMulti<MediaAttributes>;
    metadata?: MaterialMetadata;
    course?: RelationSingle<CourseAttributes>;
    material: MaterialSpecificAttributes<ExamAttributes | NoteAttributes>[]
  }
}
export {};

export enum ResourceTypes {
  Exam = "exam",
  Note = "note"
}
