export async function POST(request: Request) {
  const payload = await request.json();

  if (
    !payload?.templateId ||
    !payload?.environmentId ||
    !Array.isArray(payload?.serverIds) ||
    payload.serverIds.length === 0
  ) {
    return Response.json(
      { message: "Template, environment, and at least one server are required." },
      { status: 400 }
    );
  }

  return Response.json(
    {
      id: `op_${Date.now()}`,
      status: "queued",
      message: "Mock operation queued successfully.",
      submittedAt: new Date().toISOString(),
      payload
    },
    { status: 202 }
  );
}
