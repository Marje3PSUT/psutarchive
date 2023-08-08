declare global {
  interface MaterialMetadata {
    id: number;
    year: number;
    semester: "Fall" | "Spring" | "Summer";
    uploader?: MaterialUploader;
  }
  interface MaterialUploader {
    id: number;
    name: string;
    email?: string | null;
  }
}
export {};
