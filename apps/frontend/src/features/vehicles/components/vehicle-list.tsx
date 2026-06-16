import type { VehicleListItem } from '../model/types/vehicles.types';

import { VehicleCard } from './vehicle-card';

interface VehicleListProps {
  showControls?: boolean;
  showOwnerLink?: boolean;
  vehicles: VehicleListItem[];
}

export function VehicleList({
  showControls = true,
  showOwnerLink = false,
  vehicles,
}: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-4xl border border-dashed border-slate-300 bg-white/70 p-8 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-950">
          No vehicles registered yet
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Once a transport vehicle is linked to a user, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          showControls={showControls}
          showOwnerLink={showOwnerLink}
          vehicle={vehicle}
        />
      ))}
    </div>
  );
}
