import StaticRedirect from '@/components/StaticRedirect';
import { projectById, projectHref } from '@/data/projectCatalog';

export default function LegacyGuardianRoute() {
  return <StaticRedirect to={projectHref(projectById('guardian-guide'))} />;
}
