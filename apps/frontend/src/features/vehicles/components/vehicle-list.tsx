import type { VehicleListItem } from '../model/types/vehicles.types';

import { VehicleCard } from './vehicle-card';

interface VehicleListProps {
  compact?: boolean;
  hideOwnerMeta?: boolean;
  showControls?: boolean;
  showOwnerLink?: boolean;
  vehicles: VehicleListItem[];
}

export function VehicleList({
  compact = false,
  hideOwnerMeta = false,
  showControls = true,
  showOwnerLink = false,
  vehicles,
}: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/80 p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-950">
          No linked vehicles
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Add the first vehicle to attach it to this user record.
        </p>
      </div>
    );
  }

  return (
    <div className={compact ? 'grid gap-3' : 'grid gap-4'}>
      {vehicles.map((vehicle) => (
        <VehicleCard
          compact={compact}
          key={vehicle.id}
          hideOwnerMeta={hideOwnerMeta}
          showControls={showControls}
          showOwnerLink={showOwnerLink}
          vehicle={vehicle}
        />
      ))}
    </div>
  );
}
