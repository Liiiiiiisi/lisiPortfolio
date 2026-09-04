import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { lab, getLabItem } from '@/data/lab';
import LabDetailPage from '@/components/LabDetailPage';

export const dynamicParams = false;
export function generateStaticParams() { return lab.map((item) => ({ slug: item.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getLabItem(slug);
  return { title: item ? `${item.title} — Labs — Lisi Xie` : 'Labs — Lisi Xie', description: item?.intro };
}

export default async function LabsStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getLabItem(slug)) notFound();
  return <main id="main"><LabDetailPage slug={slug} /></main>;
}
