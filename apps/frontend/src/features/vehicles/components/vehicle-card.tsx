'use client';

import Link from 'next/link';

import { routes } from '@/model/constants/routes';

import type { VehicleListItem } from '../model/types/vehicles.types';

import { DeleteVehicleButton } from './delete-vehicle-button';
import { UpdateVehicleDialog } from './update-vehicle-dialog';

interface VehicleCardProps {
  showControls?: boolean;
  showOwnerLink?: boolean;
  vehicle: VehicleListItem;
}

export function VehicleCard({
  showControls = true,
  showOwnerLink = false,
  vehicle,
}: VehicleCardProps) {
  return (
    <article className="rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
              Vehicle #{vehicle.id}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {vehicle.year
                ? `Production year: ${vehicle.year}`
                : 'Year not specified'}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Owner ID: {vehicle.userId}
            </div>

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
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Manage vehicle record
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Update the transport details or remove the vehicle from the
                registry.
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
