import { Injectable } from '@nestjs/common';

import type {
  BuildPaginatedResultParams,
  PaginatedResult,
  PaginateMeta,
  PaginateOptions,
  PaginateParams,
} from './paginate.types.js';

@Injectable()
export class PaginateService {
  private readonly defaultPage = 1;
  private readonly defaultPageSize = 10;
  private readonly maxPageSize = 100;

  resolve({
    page,
    pageSize,
    options,
  }: {
    page?: number;
    pageSize?: number;
    options?: PaginateOptions;
  }): PaginateParams {
    const resolvedPage = this.normalizePage(page, options);
    const resolvedPageSize = this.normalizePageSize(pageSize, options);

    return {
      page: resolvedPage,
      pageSize: resolvedPageSize,
      skip: (resolvedPage - 1) * resolvedPageSize,
      take: resolvedPageSize,
    };
  }

  normalizePage(page?: number, options?: PaginateOptions) {
    const defaultPage = options?.defaultPage ?? this.defaultPage;

    if (page === undefined || Number.isNaN(page)) {
      return defaultPage;
    }

    return Math.max(page, 1);
  }

  normalizePageSize(pageSize?: number, options?: PaginateOptions) {
    const defaultPageSize = options?.defaultPageSize ?? this.defaultPageSize;
    const maxPageSize = options?.maxPageSize ?? this.maxPageSize;

    if (pageSize === undefined || Number.isNaN(pageSize)) {
      return defaultPageSize;
    }

    return Math.min(Math.max(pageSize, 1), maxPageSize);
  }

  buildMeta({
    page,
    pageSize,
    totalItems,
  }: Omit<BuildPaginatedResultParams<never>, 'items'>): PaginateMeta {
    const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);

    return {
      page,
      pageSize,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  }

  buildPaginatedResult<TItem>({
    items,
    page,
    pageSize,
    totalItems,
  }: BuildPaginatedResultParams<TItem>): PaginatedResult<TItem> {
    return {
      items,
      meta: this.buildMeta({
        page,
        pageSize,
        totalItems,
      }),
    };
  }
}
