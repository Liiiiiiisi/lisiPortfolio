import StaticRedirect from '@/components/StaticRedirect';
import { projectById, projectHref } from '@/data/projectCatalog';

export default function LegacyWishRoute() {
  return <StaticRedirect to={projectHref(projectById('lets-make-a-wish'))} />;
}
