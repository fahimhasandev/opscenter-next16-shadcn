"use client";

import { NavMain, type NavigationItem } from "./nav-main";

export function NavSecondary({ items }: { items: NavigationItem[] }) {
  return <NavMain items={items} />;
}
