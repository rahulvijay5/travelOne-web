"use client";

import { HotelRules as HotelRulesType } from "@/types";
import {
  Baby,
  Car,
  Check,
  Clock,
  Dog,
  Info,
  Martini,
  PartyPopper,
  Waves,
  Cigarette,
  Utensils,
  X,
} from "lucide-react";

interface HotelRulesProps {
  rules: HotelRulesType;
}

interface RuleItemProps {
  icon: React.ReactNode;
  label: string;
  value: boolean | string | number;
  type?: "boolean" | "time" | "number";
}

function RuleItem({ icon, label, value, type = "boolean" }: RuleItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
      {icon}
      <div className="flex-1">
        <p className="font-medium">{label}</p>
        {type === "boolean" ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {value ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span>Allowed</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-red-500" />
                <span>Not Allowed</span>
              </>
            )}
          </div>
        ) : type === "time" ? (
          <p className="text-sm text-muted-foreground">{value}</p>
        ) : (
          <p className="text-sm text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  );
}

export function HotelRules({ rules }: HotelRulesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Hotel Rules & Policies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RuleItem
          icon={<Dog className="w-5 h-5 text-muted-foreground" />}
          label="Pets"
          value={rules.petsAllowed}
        />
        <RuleItem
          icon={<Info className="w-5 h-5 text-muted-foreground" />}
          label="Maximum Occupancy"
          value={`${rules.maxPeopleInOneRoom} people per room`}
          type="number"
        />
        <RuleItem
          icon={<Car className="w-5 h-5 text-muted-foreground" />}
          label="Parking"
          value={rules.parking}
        />
        <RuleItem
          icon={<Waves className="w-5 h-5 text-muted-foreground" />}
          label="Swimming Pool"
          value={rules.swimmingPool}
        />
        {rules.swimmingPool && rules.swimmingPoolTimings && (
          <RuleItem
            icon={<Clock className="w-5 h-5 text-muted-foreground" />}
            label="Pool Timings"
            value={rules.swimmingPoolTimings}
            type="time"
          />
        )}
        <RuleItem
          icon={<Utensils className="w-5 h-5 text-muted-foreground" />}
          label="Restaurant"
          value={rules.ownRestaurant}
        />
        <RuleItem
          icon={<Cigarette className="w-5 h-5 text-muted-foreground" />}
          label="Smoking"
          value={rules.smokingAllowed}
        />
        <RuleItem
          icon={<Martini className="w-5 h-5 text-muted-foreground" />}
          label="Alcohol"
          value={rules.alcoholAllowed}
        />
        <RuleItem
          icon={<PartyPopper className="w-5 h-5 text-muted-foreground" />}
          label="Events"
          value={rules.eventsAllowed}
        />
        <RuleItem
          icon={<Baby className="w-5 h-5 text-muted-foreground" />}
          label="Minimum Age"
          value={`${rules.minimumAgeForCheckIn}+ years old`}
          type="number"
        />
      </div>
    </div>
  );
} 
