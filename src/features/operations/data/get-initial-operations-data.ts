import "server-only";

import { getTemplateCategories, getTemplates } from "./operations-data";

export async function getInitialOperationsData() {
  const [categories, templates] = await Promise.all([
    getTemplateCategories(),
    getTemplates(),
  ]);
  return { categories, templates };
}
