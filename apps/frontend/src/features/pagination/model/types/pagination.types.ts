export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PaginatedResponse<TItem> {
  items: TItem[];
  meta: PaginationMeta;
}

export type PaginationSearchParams = Record<
  string,
  string | string[] | undefined
>;

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export type PaginationItem =
  | {
      type: 'page';
      page: number;
      isActive: boolean;
    }
  | {
      type: 'ellipsis';
      key: string;
    };
