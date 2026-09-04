import StaticRedirect from '@/components/StaticRedirect';
import { projectById, projectHref } from '@/data/projectCatalog';

export default function LegacyMicroRoute() {
  return <StaticRedirect to={projectHref(projectById('the-micro-invasion'))} />;
}
