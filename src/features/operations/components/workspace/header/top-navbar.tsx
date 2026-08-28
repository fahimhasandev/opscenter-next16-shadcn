"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { NavbarActions } from "./navbar-actions";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { OperationTemplate } from "@/features/operations/types";

type Props = {
  template?: OperationTemplate;
};

export function TopNavbar({ template }: Props) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />

        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-base font-semibold">
            {template?.categoryName ?? "Operations"}
          </span>

          <span className="hidden text-slate-300 sm:inline">/</span>

          <span className="hidden truncate text-sm font-medium text-slate-500 sm:inline">
            {template?.name ?? "Select a template"}
          </span>

          {template && (
            <button
              type="button"
              className="grid h-8 w-8 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Favorite template"
            >
              <Star className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <NavbarActions dark={dark} onToggleDark={() => setDark((value) => !value)} />
    </header>
  );
}
