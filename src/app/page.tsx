import { OperationsWorkspace } from "@/features/operations";
import { getInitialOperationsData } from "@/features/operations/data/get-initial-operations-data";
import { QueryProvider } from "@/components/providers/query-provider";

export default async function HomePage() {
  const initialData = await getInitialOperationsData();
  return (
    <QueryProvider>
      <OperationsWorkspace initialData={initialData} />
    </QueryProvider>
  );
}
