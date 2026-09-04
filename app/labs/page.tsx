import type { Metadata } from 'next';
import LabGrid from '@/components/LabGrid';

export const metadata: Metadata = { title: 'Labs — Lisi Xie' };

export default function LabsPage() {
  return <main id="main"><LabGrid /></main>;
}
