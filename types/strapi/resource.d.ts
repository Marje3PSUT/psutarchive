declare global {
  interface ResourceAttributes {
    files?: RelationMulti<MediaAttributes>;
    metadata?: MaterialMetadata;
    course?: RelationSingle<CourseAttributes>;
    createdBy?: {
      id: number;
      firstname: string;
      lastname: string;
    };
    material: MaterialSpecificAttributes<ExamAttributes | NoteAttributes>[];
  }
}
export {};

export enum ResourceTypes {
  Exam = "exam",
  Note = "note"
}
