import type { NextRequest } from "next/server";
import { getServers } from "@/features/operations/data/operations-data";

export async function GET(request: NextRequest) {
  const environment = request.nextUrl.searchParams.get("environment");
  const search = request.nextUrl.searchParams.get("search") ?? "";
  return Response.json(await getServers(environment ?? undefined, search));
}
