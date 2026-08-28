"use client";

import { CircleHelp, FileText, Gauge, History, Settings, ShieldCheck, Sparkles, Star } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const primary = [
  { title: "Dashboard", url: "#", icon: Gauge },
  { title: "Operations", url: "#", icon: FileText, active: true },
  { title: "History", url: "#", icon: History },
  { title: "Approvals", url: "#", icon: ShieldCheck },
  { title: "Favorites", url: "#", icon: Star },
];

const secondary = [
  { title: "Settings", url: "#", icon: Settings },
  { title: "Get Help", url: "#", icon: CircleHelp },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <span className="grid size-8 place-items-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"><Sparkles className="size-4" /></span>
                <span className="text-base font-semibold">Day2Ops</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={primary} />
        <div className="mt-auto"><NavSecondary items={secondary} /></div>
      </SidebarContent>
      <SidebarFooter><NavUser /></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
