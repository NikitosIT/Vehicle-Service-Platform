import type { PaginationMeta } from '../model/types/pagination.types';

interface PaginationSummaryProps {
  itemLabel?: string;
  meta: PaginationMeta;
}

export function PaginationSummary({
  itemLabel = 'records',
  meta,
}: PaginationSummaryProps) {
  if (meta.totalItems === 0) {
    return <span>No {itemLabel} found</span>;
  }

  const start = (meta.page - 1) * meta.pageSize + 1;
  const end = Math.min(meta.page * meta.pageSize, meta.totalItems);

  return (
    <span>
      Showing {start}-{end} of {meta.totalItems} {itemLabel}
    </span>
  );
}
