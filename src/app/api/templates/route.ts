import type { NextRequest } from "next/server";
import { getTemplates } from "@/features/operations/data/operations-data";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  return Response.json(await getTemplates(category ?? undefined));
}
