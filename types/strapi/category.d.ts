declare global {
  interface CategoryAttributes {
    name: string;
    name_ar: string;
    abbreviation: string;
    courses: RelationSingle<CourseAttributes>;
  }
}
export {};
