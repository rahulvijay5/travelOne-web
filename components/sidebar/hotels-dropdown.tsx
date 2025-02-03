"use client";

import { getHotelDetails, getHotelsByOwnerId } from "@/actions/HotelActions";
import { useHotelStore } from "@/store/hotelStore";
import { useAuth, useUser } from "@clerk/nextjs";
import { Home, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getUserIdByClerkId } from "@/actions/Users";
import { superAdminEmail } from "@/lib/constants";
import * as React from "react";
import { useUserStore } from "@/store/userStore";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-4 w-4 flex items-center justify-center">
    {children}
  </div>
);

interface Hotel {
  id: string;
  code: string;
  hotelName: string;
}

type UserRole = "SUPERADMIN" | "OWNER" | "MANAGER";

export default function HotelsDropdown() {
  const { userId, getToken } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [ownedHotels, setOwnedHotels] = React.useState<Hotel[]>([]);
  const [managerHotelCode, setManagerHotelCode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useUser();
  const [mounted, setMounted] = React.useState(false);
  
  // Determine effective role
  const [effectiveRole, setEffectiveRole] = React.useState<UserRole | null>(null);

  const selectedHotel = useHotelStore((state) => state.selectedHotel);
  const setSelectedHotel = useHotelStore((state) => state.setSelectedHotel);
  const setUserId = useUserStore((state) => state.setUserId);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine role only once when user data is available
  React.useEffect(() => {
    if (user) {
      const email = user.emailAddresses[0]?.emailAddress;
      if (email === superAdminEmail) {
        setEffectiveRole("SUPERADMIN");
      } else {
        setEffectiveRole(user.publicMetadata?.role as UserRole || null);
      }
    }
  }, [user]);

  // Fetch owned hotels for OWNER role
  const fetchOwnedHotels = React.useCallback(async () => {
    if (!userId || effectiveRole !== "OWNER") return;

    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) throw new Error("Authentication required");

      const userIdInDB = await getUserIdByClerkId(userId, token);
      setUserId(userIdInDB);

      const hotels = await getHotelsByOwnerId(userIdInDB, token);
      setOwnedHotels(hotels);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch hotels");
      console.error("Error fetching owned hotels:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, getToken, setUserId, effectiveRole]);

  // Fetch hotel by code for MANAGER role
  const fetchHotelByCode = async () => {
    if (!managerHotelCode) return;

    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) throw new Error("Authentication required");

      const response = await getHotelDetails(managerHotelCode);
      if (response) {
        setSelectedHotel({
          name: response.hotelName,
          code: response.code,
          id: response.id
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch hotel");
      console.error("Error fetching hotel:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load owned hotels on mount for OWNER role
  React.useEffect(() => {
    if (userId && effectiveRole === "OWNER") {
      fetchOwnedHotels();
    }
  }, [userId, fetchOwnedHotels, effectiveRole]);

  if (!mounted || !effectiveRole) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="border dark:border-gray-600 w-full flex items-center justify-center rounded-md p-6">
        Loading...
      </div>
    );
  }

  if (effectiveRole === "SUPERADMIN") {
    return (
      <div className="border dark:border-gray-600 w-full flex items-center justify-center rounded-md p-6">
        Super Admin
      </div>
    );
  }

  // Owner View - Dropdown of owned hotels
  if (effectiveRole === "OWNER" && ownedHotels.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex items-center justify-between p-6"
          >
            <div className="flex items-center gap-2">
              <IconWrapper>
                <Home />
              </IconWrapper>
              <span>{selectedHotel ? selectedHotel.name : "Select Hotel"}</span>
            </div>
            <IconWrapper>
              <ChevronDown />
            </IconWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
          {ownedHotels.map((hotel) => (
            <DropdownMenuItem
              key={hotel.id}
              onClick={() => setSelectedHotel({
                id: hotel.id,
                code: hotel.code,
                name: hotel.hotelName
              })}
            >
              {hotel.hotelName} ({hotel.code})
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Manager View - Hotel code input
  return (
    <div className="space-y-2 w-full">
      {selectedHotel ? (
        <div className="border dark:border-gray-600 w-full flex items-center gap-2 rounded-md p-4">
          <IconWrapper>
            <Home />
          </IconWrapper>
          <div className="flex flex-col">
            <span className="text-sm">{selectedHotel.name}</span>
            <span className="text-xs">{selectedHotel.code}</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Enter Hotel Code"
            value={managerHotelCode}
            onChange={(e) => setManagerHotelCode(e.target.value)}
          />
          <Button onClick={fetchHotelByCode}>Load</Button>
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
