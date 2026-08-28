"use client";

import { useState } from "react";
import { useServers } from "./use-operations";
import type { Server } from "@/features/operations/types";

export function useServerSelector(templateId?: string, environmentId?: string, allowed: ("windows" | "linux")[] = []) {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [mnemonicId, setMnemonicId] = useState("all");
  const query = useServers(templateId, environmentId, search);
  const servers = (query.data?.servers ?? []).filter((server) => {
    const serverPlatform = (server.os ?? "").toLowerCase();
    return allowed.includes(serverPlatform as "windows" | "linux") &&
      (platform === "all" || serverPlatform === platform) &&
      (mnemonicId === "all" || server.mnemonicId === mnemonicId);
  });

  return { search, platform, mnemonicId, query, servers, setSearch, setPlatform, setMnemonicId };
}

export function toggleServer(ids: string[], server: Server) {
  return ids.includes(server.id) ? ids.filter((id) => id !== server.id) : [...ids, server.id];
}

export function toggleVisibleServers(selectedIds: string[], servers: Server[]) {
  const visibleIds = servers.map((server) => server.id);
  const visibleSet = new Set(visibleIds);
  return visibleIds.every((id) => selectedIds.includes(id))
    ? selectedIds.filter((id) => !visibleSet.has(id))
    : Array.from(new Set([...selectedIds, ...visibleIds]));
}
