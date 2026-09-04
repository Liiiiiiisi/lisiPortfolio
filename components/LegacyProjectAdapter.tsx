import type { ComponentType } from 'react';
import VREducationProjectPage from '@/components/project/VREducationProjectPage';
import CanopyOfEchoProjectPage from '@/components/project/CanopyOfEchoProjectPage';
import MicroInvasionProjectPage from '@/components/project/MicroInvasionProjectPage';
import DatnieProjectPage from '@/components/project/DatnieProjectPage';
import PrayForBlessingProjectPage from '@/components/project/PrayForBlessingProjectPage';
import CarbonNeutralProjectPage from '@/components/project/CarbonNeutralProjectPage';
import ProjectSequenceNav from '@/components/ProjectSequenceNav';
import CaseStudyStartAnchor from '@/components/CaseStudyStartAnchor';
import type { ProjectCatalogEntry } from '@/types/project';

/**
 * Phase 1 compatibility bridge only. It deliberately calls the six existing
 * project components directly and creates no intermediate content model.
 */
const legacyComponents: Readonly<Record<string, ComponentType>> = {
  'guardian-guide': VREducationProjectPage,
  'canopy-of-echo': CanopyOfEchoProjectPage,
  'the-micro-invasion': MicroInvasionProjectPage,
  datnie: DatnieProjectPage,
  'lets-make-a-wish': PrayForBlessingProjectPage,
  'personal-carbon-neutral': CarbonNeutralProjectPage,
};

export default function LegacyProjectAdapter({ project }: { project: ProjectCatalogEntry }) {
  const LegacyComponent = legacyComponents[project.id];
  if (!LegacyComponent) return null;
  return (
    <div className="min-h-screen bg-black">
      <CaseStudyStartAnchor key={project.id} />
      <ProjectSequenceNav
        currentIndex={project.order - 1}
        mode={project.id === 'canopy-of-echo' || project.id === 'guardian-guide' || project.id === 'the-micro-invasion' || project.id === 'datnie' || project.id === 'lets-make-a-wish' || project.id === 'personal-carbon-neutral' ? 'case-header' : 'floating'}
        descriptor={project.id === 'canopy-of-echo'
          ? 'Kinetic Installation / Spatial Interaction / Heritage Storytelling'
          : project.id === 'guardian-guide'
            ? 'Virtual Reality / Caregiver Training / Autism Support'
            : project.id === 'the-micro-invasion'
              ? 'Augmented Reality / Body Tracking / Spatial Interaction'
              : project.id === 'datnie'
                ? 'Mixed Reality / UI·UX / Motion & Interaction'
                : project.id === 'lets-make-a-wish'
                  ? 'XR Cultural Experience / Unity / Interaction Design'
                  : project.id === 'personal-carbon-neutral'
                    ? 'AR Game / System Design / Unity'
            : undefined}
      />
      <LegacyComponent />
    </div>
  );
}
