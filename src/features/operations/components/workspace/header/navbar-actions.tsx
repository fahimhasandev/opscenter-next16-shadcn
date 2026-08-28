import { BookOpen, ChevronDown, History, Moon, Sun } from "lucide-react";

type Props = { dark: boolean; onToggleDark: () => void };

export function NavbarActions({ dark, onToggleDark }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Action icon={BookOpen} label="View Docs" />
      <Separator wideOnly />
      <Action icon={History} label="History" />
      <Separator wideOnly />
      <button type="button" onClick={onToggleDark} className="grid h-8 w-8 place-items-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Toggle color mode">
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <Separator />
      <button className="flex h-9 items-center gap-2 rounded-md px-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-900">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">AD</span>
        <span className="hidden lg:block"><span className="block text-sm font-semibold">Admin User</span><span className="block text-xs text-slate-500">Super Admin</span></span>
        <ChevronDown className="hidden h-4 w-4 text-slate-500 sm:block" />
      </button>
    </div>
  );
}

function Action({ icon: Icon, label }: { icon: typeof BookOpen; label: string }) {
  return <button className="hidden h-8 items-center gap-2 rounded-md px-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900 lg:flex"><Icon className="h-4 w-4" />{label}</button>;
}

function Separator({ wideOnly = false }: { wideOnly?: boolean }) {
  return <div className={`mx-1 h-4 w-px bg-slate-200 dark:bg-slate-800 ${wideOnly ? "hidden lg:block" : ""}`} />;
}
