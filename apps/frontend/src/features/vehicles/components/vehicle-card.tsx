'use client';

import Link from 'next/link';

import { routes } from '@/model/constants/routes';

import type { VehicleListItem } from '../model/types/vehicles.types';

import { DeleteVehicleButton } from './delete-vehicle-button';
import { UpdateVehicleDialog } from './update-vehicle-dialog';

interface VehicleCardProps {
  compact?: boolean;
  hideOwnerMeta?: boolean;
  showControls?: boolean;
  showOwnerLink?: boolean;
  vehicle: VehicleListItem;
}

export function VehicleCard({
  compact = false,
  hideOwnerMeta = false,
  showControls = true,
  showOwnerLink = false,
  vehicle,
}: VehicleCardProps) {
  return (
    <article
      className={
        compact
          ? 'rounded-[1.4rem] border border-slate-200/80 bg-white/84 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_14px_28px_rgba(15,23,42,0.07)]'
          : 'rounded-[1.75rem] border border-slate-200/80 bg-white/84 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.04)] transition hover:border-slate-300 hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)]'
      }
    >
      <div className={compact ? 'flex flex-col gap-4' : 'flex flex-col gap-5'}>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p
              className={
                compact
                  ? 'text-xs font-medium uppercase tracking-[0.2em] text-slate-500'
                  : 'text-sm font-medium uppercase tracking-[0.22em] text-slate-500'
              }
            >
              Vehicle #{vehicle.id}
            </p>
            <h3
              className={
                compact
                  ? 'mt-1.5 text-xl font-semibold text-slate-950'
                  : 'mt-2 text-2xl font-semibold text-slate-950'
              }
            >
              {vehicle.make} {vehicle.model}
            </h3>
            <p className={compact ? 'mt-1.5 text-sm text-slate-600' : 'mt-2 text-sm text-slate-600'}>
              {vehicle.year
                ? `Production year: ${vehicle.year}`
                : 'Year not specified'}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            {!hideOwnerMeta ? (
              <div
                className={
                  compact
                    ? 'rounded-xl border border-slate-200 bg-slate-50/85 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500'
                    : 'rounded-2xl border border-slate-200 bg-slate-50/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'
                }
              >
                Owner ID: {vehicle.userId}
              </div>
            ) : null}

            {showOwnerLink ? (
              <Link
                className="text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                href={`${routes.appRoutes.users}/${vehicle.userId}`}
              >
                Open owner profile
              </Link>
            ) : null}
          </div>
        </div>

        {showControls ? (
          <div
            className={
              compact
                ? 'flex flex-col gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50/85 p-3 sm:flex-row sm:items-center sm:justify-between'
                : 'flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50/85 p-4 sm:flex-row sm:items-center sm:justify-between'
            }
          >
            <div>
              <p className={compact ? 'text-sm font-semibold text-slate-900' : 'text-sm font-semibold text-slate-900'}>
                Manage vehicle record
              </p>
              <p className={compact ? 'mt-0.5 text-sm text-slate-600' : 'mt-1 text-sm text-slate-600'}>
                Update the details or remove the record.
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-2">
              <UpdateVehicleDialog vehicle={vehicle} />
              <DeleteVehicleButton vehicle={vehicle} />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
