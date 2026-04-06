import { useEffect, useMemo, useState } from 'react';
import { siteContent } from './content';
import { ControlPanel } from './components/ControlPanel';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { PortfolioScene } from './scene/PortfolioScene';
import type { PortfolioItem } from './types';

function App() {
  const [selectedId, setSelectedId] = useState(siteContent.projects[0]?.id ?? '');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const selectedProject = useMemo(
    () => siteContent.projects.find((project) => project.id === selectedId),
    [selectedId],
  );

  useEffect(() => {
    if (!selectedProject) {
      return;
    }
  }, [selectedProject]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleProjectOpen = (item: PortfolioItem) => {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const handleResume = () => {
    if (siteContent.resume.available) {
      window.open(siteContent.resume.href, '_blank', 'noopener,noreferrer');
      return;
    }
  };

  return (
    <main className="app-shell">
      <div className="workspace-grid">
        <div className="canvas-shell" aria-hidden="true">
          <PortfolioScene
            selectedId={selectedId}
            hoveredId={hoveredId}
            reducedMotion={prefersReducedMotion}
            onSelect={handleSelect}
            onHover={setHoveredId}
            onResumeActivate={handleResume}
          />
        </div>

        <ControlPanel
          ownerName={siteContent.ownerName}
          intro={siteContent.intro}
          items={siteContent.projects}
          selectedId={selectedId}
          resume={siteContent.resume}
          onSelect={handleSelect}
          onOpenProject={handleProjectOpen}
          onResume={handleResume}
        />
      </div>
    </main>
  );
}

export default App;
