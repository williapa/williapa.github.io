export type PlanetTheme = {
  surface: string;
  atmosphere: string;
  accent: string;
  emissive: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  labelOffset: [number, number, number];
  tilt: [number, number, number];
};

export type PortfolioItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  theme: PlanetTheme;
};

export type ResumeMeta = {
  label: string;
  href: string;
  available: boolean;
  placeholderMessage: string;
};

export type SiteContent = {
  ownerName: string;
  intro: string;
  projects: PortfolioItem[];
  resume: ResumeMeta;
};
