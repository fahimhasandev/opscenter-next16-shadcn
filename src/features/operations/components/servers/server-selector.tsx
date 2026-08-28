"use client";

import { ServerFilterBar } from "./server-filter-bar";
import { ServerList } from "./server-list";
import { toggleServer, toggleVisibleServers, useServerSelector } from "@/features/operations/hooks/use-server-selector";

type Props = {
  templateId?: string;
  environmentId?: string;
  selectedServerIds: string[];
  onChange: (ids: string[]) => void;
  allowedPlatforms: ("windows" | "linux")[];
};

export function ServerSelector({
  templateId,
  environmentId,
  selectedServerIds,
  onChange,
  allowedPlatforms,
}: Props) {
  const selector = useServerSelector(templateId, environmentId, allowedPlatforms);

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <h3 className="font-semibold">Select Server(s)</h3>
        <button type="button" onClick={() => onChange(toggleVisibleServers(selectedServerIds, selector.servers))} className="text-sm font-medium text-indigo-600">
          Select Visible
        </button>
      </div>
      <ServerFilterBar
        search={selector.search}
        platform={selector.platform}
        mnemonicId={selector.mnemonicId}
        allowedPlatforms={allowedPlatforms}
        visibleCount={selector.servers.length}
        onSearchChange={selector.setSearch}
        onPlatformChange={selector.setPlatform}
        onMnemonicChange={selector.setMnemonicId}
      />
      <ServerList
        servers={selector.servers}
        selectedIds={selectedServerIds}
        loading={selector.query.isLoading}
        error={selector.query.isError}
        onToggle={(server) => onChange(toggleServer(selectedServerIds, server))}
      />
      <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
        {selectedServerIds.length} selected
      </div>
    </div>
  );
}
