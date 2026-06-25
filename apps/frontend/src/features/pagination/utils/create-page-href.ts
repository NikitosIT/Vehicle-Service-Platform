import type { PaginationSearchParams } from '../model/types/pagination.types';

function appendSearchParam(
  params: URLSearchParams,
  key: string,
  value: string | string[],
) {
  if (Array.isArray(value)) {
    value.forEach((entry) => {
      params.append(key, entry);
    });

    return;
  }

  params.set(key, value);
}

export function createPageHref(
  pathname: string,
  page: number,
  searchParams?: PaginationSearchParams,
  pageSize?: number,
) {
  const params = new URLSearchParams();

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value === undefined || key === 'page' || key === 'pageSize') {
        return;
      }

      appendSearchParam(params, key, value);
    });
  }

  params.set('page', String(page));

  if (pageSize) {
    params.set('pageSize', String(pageSize));
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}
