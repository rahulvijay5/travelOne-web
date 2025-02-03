"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Home, Users, Calendar, Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { superAdminEmail } from "@/lib/constants";
import HotelsDropdown from "./hotels-dropdown";
import { ModeToggle } from "../ModeToggle";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-4 w-4 flex items-center justify-center">
    {children}
  </div>
);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { user } = useUser();
  const isSuperAdmin = user?.emailAddresses[0]?.emailAddress === superAdminEmail;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <IconWrapper>
            <Home />
          </IconWrapper>
          <ModeToggle />
        </div>
        <HotelsDropdown />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  onClick={() => router.push('/dashboard')}
                >
                  <button className="w-full flex items-center gap-2">
                    <IconWrapper>
                      <Home />
                    </IconWrapper>
                    Dashboard
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isSuperAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    onClick={() => router.push('/users')}
                  >
                    <button className="w-full flex items-center gap-2">
                      <IconWrapper>
                        <Users />
                      </IconWrapper>
                      User Management
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  onClick={() => router.push('/bookings')}
                >
                  <button className="w-full flex items-center gap-2">
                    <IconWrapper>
                      <Calendar />
                    </IconWrapper>
                    Bookings
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  onClick={() => router.push('/settings')}
                >
                  <button className="w-full flex items-center gap-2">
                    <IconWrapper>
                      <Settings />
                    </IconWrapper>
                    Settings
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
