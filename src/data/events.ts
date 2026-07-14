import type { Event } from '../types'
import cruiseSvg from '../assets/images/figma/cruise.svg'

export const events: Event[] = [
  {
    id: 1,
    name: 'Rajd',
    description:
      'Wyjazd weekendowy dla ok. 200-300 studentów. Obejmuje 3 dni integracji, wspólny nocleg i mnóstwo atrakcji we współpracy z innymi wydziałami.',
    date: 'Cyklicznie (co semestr)',
    status: 'upcoming',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/groups/931798366131952',
    imageUrl: '/images/events/cs-event-1.jpg',
  },
  {
    id: 2,
    name: 'Bal Inżyniera',
    description:
      'Całonocna impreza o charakterze formalnym dla studentów kończących 7 semestr. Obejmuje przemówienia, zabawę na parkiecie i wspólne świętowanie tytułu.',
    date: 'Cyklicznie',
    status: 'upcoming',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/24790088377360051',
    imageUrl: '/images/events/event1.svg',
  },
  {
    id: 3,
    name: 'Rejs',
    description:
      'Impreza na łódce pływającej po Odrze. Idealna forma odstresowania przed sesją z dobrą muzyką i jedzeniem.',
    date: 'Cyklicznie (lato)',
    status: 'upcoming',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/1714209906674784',
    imageUrl: cruiseSvg,
  },
  {
    id: 4,
    name: 'Volvo Tech Confluence',
    description:
      'Konferencja zorganizowana we współpracy z Volvo Group, obejmująca branżowe prelekcje i networking.',
    date: 'Cyklicznie',
    status: 'past',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/804444005384010',
    imageUrl: '/images/events/event1.svg',
  },
  {
    id: 5,
    name: 'WITKoN',
    description:
      'Konferencja Kół Naukowych W4. Miejsce na prelekcje, wymianę wiedzy zdobywanej poza salami wykładowymi oraz integrację działaczy.',
    date: 'Cyklicznie',
    status: 'past',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/890269670716733',
    imageUrl: '/images/events/event1.svg',
  },
  {
    id: 6,
    name: 'Wydziałówki',
    description:
      'Nocne imprezy w klubach o wymyślonej tematyce ze specjalnymi atrakcjami przygotowanymi przez Samorząd.',
    date: 'Cyklicznie',
    status: 'upcoming',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/4399665443687417',
    imageUrl: '/images/events/event1.svg',
  },
  {
    id: 7,
    name: 'Wyjazd Szkoleniowo-Integracyjny',
    description:
      'Wyjazd dla członków Samorządu skupiony na szkoleniach miękkich, integracji zespołu i wspólnym budowaniu wspomnień.',
    date: 'Cyklicznie',
    status: 'upcoming',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/',
    imageUrl: '/images/events/event1.svg',
  },
  {
    id: 8,
    name: 'KISS IT PWr',
    description:
      'Konferencja Informatyczna Samorządu Studenckiego. Spotkanie ze środowiskiem IT, warsztaty i prelekcje gromadzące setki uczestników.',
    date: 'Cyklicznie',
    status: 'upcoming',
    images: [],
    isCyclic: true,
    facebookUrl: 'https://www.facebook.com/events/',
    imageUrl: '/images/events/event1.svg',
  },
]
