import type { SiteContent } from './types';

const radius = 3.0;
export const siteContent: SiteContent = {
  ownerName: 'Paul Williams',
  intro:
    'Software engineer based in Henderson, Nevada.',
  resume: {
    label: 'Resume',
    href: '/',
    available: false,
    placeholderMessage: '',
  },
  projects: [
    {
      id: 'ofc-poker',
      title: 'OFC Poker',
      url: 'https://williapa.github.io/ofc-poker',
      description:
        'Open Face Chinese Poker for 2–4 players. Play against AI opponents or start a real-time multiplayer table using a shareable link. Multiplayer features are powered by PlayroomKit.',
      theme: {
        surface: '#b76cff',
        atmosphere: '#edc7ff',
        accent: '#ffe8ff',
        emissive: '#591b88',
        size: 0.81,
        orbitRadius: radius,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.4, 0],
        tilt: [0.38, -0.42, 0.2],
      },
    },
    {
      id: 'glinski',
      title: 'Glinski',
      url: 'https://williapa.github.io/glinski',
      description:
        "Glinski is a hexagonal chess variant. Twitch-mode lets a streamer host a game against chat, who cast votes for their next move. Or, try solo-mode and face a custom AI opponent.",
      theme: {
        surface: '#4e90ff',
        atmosphere: '#b8d7ff',
        accent: '#dff1ff',
        emissive: '#163f8f',
        size: 0.76,
        orbitRadius: radius,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.25, 0],
        tilt: [0.45, 0.35, 0.15],
      },
    },
    {
      id: 'hostileHexagons',
      title: 'Hostile Hexagons',
      url: 'https://hostilehexagons.key-value.workers.dev/',
      description:
        'Hostile Hexagons is a turn-based strategy game on a hexagonal board inspired by Advanced Wars. Players can build custom maps, battle live opponents through websockets, and test maps in 1p mode.',
      theme: {
        surface: '#f58f43',
        atmosphere: '#ffd5a3',
        accent: '#fff2d6',
        emissive: '#7d2b16',
        size: 0.79,
        orbitRadius: radius,
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
        orbitRadius: radius,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.3, 0],
        tilt: [0.3, -0.15, 0.42],
      },
    },
    {
      id: 'equationrush',
      title: "Equation Rush",
      url: 'https://equation-rush.key-value.workers.dev/',
      description:
        "Equation Rush is a math puzzle game designed for community play via twitch chat as well as a solo in-browser experience. Features a retro-style frutiger aero UI design and CSS animations.",
      theme: {
        surface: '#d21f3c',
        atmosphere: '#b3ffdb',
        accent: '#fa8072',
        emissive: '#961019',
        size: 0.73,
        orbitRadius: radius,
        orbitSpeed: 0.095,
        labelOffset: [0, 1.3, 0],
        tilt: [0.3, -0.15, 0.42],
      },
    },
  ],
};
