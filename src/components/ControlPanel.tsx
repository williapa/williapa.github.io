import type { PortfolioItem, ResumeMeta } from '../types';

type ControlPanelProps = {
  ownerName: string;
  intro: string;
  items: PortfolioItem[];
  selectedId: string;
  resume: ResumeMeta;
  onSelect: (id: string) => void;
  onOpenProject: (item: PortfolioItem) => void;
  onResume: () => void;
};

export function ControlPanel({
  ownerName,
  intro,
  items,
  selectedId,
  resume,
  onSelect,
  onOpenProject,
  onResume,
}: ControlPanelProps) {
  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];

  if (!selectedItem) {
    return null;
  }

  return (
    <section className="panel-shell" aria-label="Portfolio details">
      <div className="eyebrow">Orbiting Projects</div>
      <h1>{ownerName}</h1>
      <p className="intro-copy">{intro}</p>

      <div className="project-switcher" role="tablist" aria-label="Projects">
        {items.map((item) => {
          const isActive = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              className={isActive ? 'project-pill is-active' : 'project-pill'}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(item.id)}
            >
              <span className="pill-dot" style={{ background: item.theme.surface }} />
              {item.title}
            </button>
          );
        })}
      </div>

      <article className="project-card" aria-live="polite">
        { /* <p className="project-kicker">Current selection</p> */ }
        <h2>{selectedItem.title}</h2>
        <p>{selectedItem.description}</p>
        <div className="action-row">
          <button
            type="button"
            className="primary-action"
            onClick={() => onOpenProject(selectedItem)}
          >
            Open project
          </button>
          <button type="button" className="secondary-action" onClick={onResume}>
            {resume.available ? 'Download resume' : 'Resume'}
          </button>
        </div>
      </article>
    </section>
  );
}
