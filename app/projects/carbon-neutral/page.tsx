import StaticRedirect from '@/components/StaticRedirect';
import { projectById, projectHref } from '@/data/projectCatalog';

export default function LegacyCarbonRoute() {
  return <StaticRedirect to={projectHref(projectById('personal-carbon-neutral'))} />;
}
