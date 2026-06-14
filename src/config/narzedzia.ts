export interface NarzedziaNavItem {
  id: number
  name: string
  link: string
}

export const narzedziaNavItems: NarzedziaNavItem[] = [
  {
    id: 1,
    name: 'Generator winietek',
    link: import.meta.env.VITE_WINIETKI_LINK || 'https://winietki.pwrnow.pl',
  },
  {
    id: 2,
    name: 'Aplikacja punktowa',
    link: import.meta.env.VITE_PUNKTY_LINK || 'https://punkty-wit.solvro.pl/dashboard',
  },
  {
    id: 3,
    name: 'Generator kodów QR',
    link: import.meta.env.VITE_QR_LINK || 'https://foxjustfox.github.io/qrcode_gen_web/',
  },
]
