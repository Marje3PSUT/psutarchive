declare global {
  interface CategoryAttributes {
    name: string;
    name_ar: string;
    slug: string;
    courses?: RelationMulti<CourseAttributes>;
  }
}
export {};
