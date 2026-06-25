export type PaginateParams = {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
};

export type PaginateMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginatedResult<TItem> = {
  items: TItem[];
  meta: PaginateMeta;
};

export type PaginateOptions = {
  defaultPage?: number;
  defaultPageSize?: number;
  maxPageSize?: number;
};

export type BuildPaginatedResultParams<TItem> = {
  items: TItem[];
  page: number;
  pageSize: number;
  totalItems: number;
};
