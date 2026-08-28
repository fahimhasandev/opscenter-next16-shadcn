import { Search } from "lucide-react";
import { ServerFilterSelects } from "./server-filter-selects";
import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  platform: string;
  mnemonicId: string;
  allowedPlatforms: ("windows" | "linux")[];
  visibleCount: number;
  onSearchChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onMnemonicChange: (value: string) => void;
};

export function ServerFilterBar({
  search,
  platform,
  mnemonicId,
  allowedPlatforms,
  visibleCount,
  onSearchChange,
  onPlatformChange,
  onMnemonicChange,
}: Props) {
  return (
    <div className="p-4">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(180px,1fr)_150px_190px]">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            className="pl-9"
            placeholder="Search servers..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <ServerFilterSelects platform={platform} mnemonicId={mnemonicId} allowedPlatforms={allowedPlatforms} onPlatformChange={onPlatformChange} onMnemonicChange={onMnemonicChange} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{visibleCount} visible servers</span>
        <span className="hidden text-right sm:block">
          Platform support is automatic; mnemonics remain a local filter.
        </span>
      </div>
    </div>
  );
}
