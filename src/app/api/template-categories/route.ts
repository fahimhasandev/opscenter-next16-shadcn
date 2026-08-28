import { getTemplateCategories } from "@/features/operations/data/operations-data";

export async function GET() {
  return Response.json(await getTemplateCategories());
}
