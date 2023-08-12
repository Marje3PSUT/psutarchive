declare global {
  interface CourseAttributes {
    name: string;
    name_ar: string;
    course_id: string;
    recordings_url: string | null;
    related_courses?: RelationMulti<CourseAttributes>;
    category?: RelationSingle<CategoryAttributes>;
    resources?: RelationMulti<ResourceAttributes>;
    alt_names?: AltName[];
  }
}
export {};
interface AltName {
  id: number;
  name: string;
}