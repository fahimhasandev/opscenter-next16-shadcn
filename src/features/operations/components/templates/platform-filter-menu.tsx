import { Monitor, Server } from "lucide-react";
import type { PlatformFilter } from "./template-panel-types";

type Props = {
  selected: PlatformFilter;
  onChange: (value: PlatformFilter) => void;
};
const OPTIONS = [
  { value: "all", label: "ALL", icon: Server },
  { value: "windows", label: "Windows", icon: Monitor },
] as const;

export function PlatformFilterMenu({ selected, onChange }: Props) {
  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-2">
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <FilterButton
          key={value}
          active={selected === value}
          onClick={() => onChange(value)}
        >
          <Icon className="h-4 w-4" />
          {label}
        </FilterButton>
      ))}
      <FilterButton
        active={selected === "linux"}
        onClick={() => onChange("linux")}
      >
        <span className="grid h-4 w-4 place-items-center text-[10px] font-bold">
          L
        </span>
        Linux
      </FilterButton>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-white font-medium text-indigo-700 shadow-sm" : "text-slate-600 hover:bg-white"}`}
    >
      {children}
    </button>
  );
}
