declare global {
  interface MediaAttributes {
    name: string;
    alternativeText: string;
    caption: string;
    ext: string;
    mime: string;
    url: string;
    hash: string;
    blurhash: string;
    width: number;
    height: number;
    size: number;
    formats?: {
      thumbnail: MediaAttributes;
      large: MediaAttributes;
      medium: MediaAttributes;
      small: MediaAttributes;
    };
  }
}
export {};
