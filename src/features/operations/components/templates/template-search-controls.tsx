import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { PlatformFilter, TemplateTab } from "./template-panel-types";

type Props = { tab: TemplateTab; platform: PlatformFilter; search: string; total: number; onTabChange: (tab: TemplateTab) => void; onSearchChange: (value: string) => void };

export function TemplateSearchControls({ tab, platform, search, total, onTabChange, onSearchChange }: Props) {
  return (
    <>
      {search && <div className="mb-3 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">Showing {total} result{total === 1 ? "" : "s"} for &quot;{search}&quot;{platform !== "all" && <span> — platform: {platform.toUpperCase()}</span>}</div>}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <Input className="pl-9" placeholder="Search templates..." value={search} onChange={(event) => onSearchChange(event.target.value)} />
        {search && <button onClick={() => onSearchChange("")} className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600" aria-label="Clear search"><X className="h-3 w-3" /></button>}
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        {(["categories", "platforms"] as const).map((option) => <button key={option} onClick={() => onTabChange(option)} className={`rounded-lg px-3 py-2 text-sm font-medium ${tab === option ? "bg-indigo-50 text-indigo-700" : "border border-slate-200 bg-white text-slate-600"}`}>{option === "categories" ? "Categories" : "Platforms"}</button>)}
      </div>
    </>
  );
}
