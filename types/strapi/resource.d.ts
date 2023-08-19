declare global {
  interface ResourceAttributes {
    type: ResourceTypes
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
