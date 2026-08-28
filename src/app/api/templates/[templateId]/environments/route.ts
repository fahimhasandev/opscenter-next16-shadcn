import { getEnvironments } from "@/features/operations/data/operations-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ templateId: string }> }
) {
  const { templateId } = await params;
  const environments = await getEnvironments(templateId);
  if (!environments) {
    return Response.json({ message: "Template not found" }, { status: 404 });
  }

  return Response.json(environments);
}
