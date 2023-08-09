declare global {
  interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
  interface StrapiItem<T extends Record<string, any>> {
    id: number;
    attributes: T & {
      createdAt: Date;
      updatedAt: Date;
      publishedAt?: Date;
    };
  }

  interface RelationSingle<T> {
    data: StrapiItem<T>;
  }
  interface RelationMulti<T> {
    data: StrapiItem<T>[];
  }
  interface StrapiResponse<T> {
    data: StrapiItem<T>[];
    meta: {
      pagination?: Pagination;
      // TODO: add SEO
    };
  }
  interface StrapiResponseSingle<T> {
    data: StrapiItem<T>;
    meta: {};
  }
}

export {};
