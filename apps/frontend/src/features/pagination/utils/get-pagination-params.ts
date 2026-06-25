import type {
  PaginationParams,
  PaginationSearchParams,
} from '../model/types/pagination.types';

interface GetPaginationParamsOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  maxPageSize?: number;
}

function getFirstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInt(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return undefined;
  }

  return parsed;
}

export function getPaginationParams(
  searchParams?: PaginationSearchParams,
  options?: GetPaginationParamsOptions,
): PaginationParams {
  const defaultPage = options?.defaultPage ?? 1;
  const defaultPageSize = options?.defaultPageSize ?? 10;
  const maxPageSize = options?.maxPageSize ?? 100;

  const parsedPage = parsePositiveInt(getFirstValue(searchParams?.page));
  const parsedPageSize = parsePositiveInt(
    getFirstValue(searchParams?.pageSize),
  );

  return {
    page: parsedPage ?? defaultPage,
    pageSize: Math.min(parsedPageSize ?? defaultPageSize, maxPageSize),
  };
}
