declare global {
  interface NoteAttributes {
    course?: RelationSingle<CourseAttributes>;
    files?: RelationMulti<MediaAttributes>;
    metadata?: MaterialMetadata;
  }
}
export {};
