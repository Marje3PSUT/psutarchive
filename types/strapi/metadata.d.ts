declare global {
  interface MaterialMetadata {
    id: number;
    year: number;
    // TODO: turn semester into an enum
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
