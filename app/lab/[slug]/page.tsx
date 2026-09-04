import { notFound } from 'next/navigation';
import StaticRedirect from '@/components/StaticRedirect';
import { getLabItem, lab, labsHref } from '@/data/lab';

export const dynamicParams = false;
export function generateStaticParams() { return lab.map((item) => ({ slug: item.slug })); }

export default async function LegacyLabsStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getLabItem(slug)) notFound();
  return <StaticRedirect to={labsHref(slug)} />;
}
