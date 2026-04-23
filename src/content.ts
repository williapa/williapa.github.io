import type { SiteContent } from './types';

export const siteContent: SiteContent = {
  ownerName: 'Paul Williams',
  intro:
    'Frontend-focused software engineer based in Henderson, Nevada.',
  resume: {
    label: 'Resume',
    href: '/Paul_Williams_Resume.pdf',
    available: true,
    placeholderMessage: '',
  },
  projects: [
    {
      id: 'glinski',
      title: 'Glinski',
      url: 'https://williapa.github.io/glinski',
      description:
        "Glinski's chess is the most popular hexagonal chess variant. This app leans into a Twitch Plays Chess style experience, letting a streamer host a game where chat votes on moves, with optional AI support for either side.",
      theme: {
        surface: '#4e90ff',
        atmosphere: '#b8d7ff',
        accent: '#dff1ff',
        emissive: '#163f8f',
        size: 0.76,
        orbitRadius: 3.0,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.25, 0],
        tilt: [0.45, 0.35, 0.15],
      },
    },
    {
      id: 'medalversus',
      title: 'MedalVersus',
      url: 'https://github.com/williapa/TBS',
      description:
        'MedalVersus is a turn-based strategy game on a hexagonal board inspired by Advanced Wars. Players can build custom maps, battle live opponents through websockets, and track results across their match history.',
      theme: {
        surface: '#f58f43',
        atmosphere: '#ffd5a3',
        accent: '#fff2d6',
        emissive: '#7d2b16',
        size: 0.79,
        orbitRadius: 3.0,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.4, 0],
        tilt: [0.2, 0.6, -0.18],
      },
    },
    {
      id: 'jsholdem',
      title: "JS Hold'em",
      url: 'https://williapa.github.io/jsholdem',
      description:
        "A heads-up Texas Hold'em app built with AngularJS and no supporting poker or CSS libraries. It focuses on hand logic, AI play, and a handcrafted presentation built from first principles.",
      theme: {
        surface: '#4cc98f',
        atmosphere: '#b3ffdb',
        accent: '#e8fff5',
        emissive: '#15573b',
        size: 0.73,
        orbitRadius: 3.0,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.3, 0],
        tilt: [0.3, -0.15, 0.42],
      },
    },
  ],
};
