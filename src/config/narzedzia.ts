import iconWinietki from '../assets/icons/tools/winietki.svg'
import iconPunkty from '../assets/icons/tools/punkty.svg'
import iconQr from '../assets/icons/tools/qr.svg'

export interface NarzedziaNavItem {
  id: number
  name: string
  link: string
  icon?: string
}

export const narzedziaNavItems: NarzedziaNavItem[] = [
  {
    id: 1,
    name: 'Generator winietek',
    link: import.meta.env.VITE_WINIETKI_LINK || 'https://winietki.pwrnow.pl',
    icon: iconWinietki,
  },
  {
    id: 2,
    name: 'Aplikacja punktowa',
    link: import.meta.env.VITE_PUNKTY_LINK || 'https://punkty-wit.solvro.pl/dashboard',
    icon: iconPunkty,
  },
  {
    id: 3,
    name: 'Generator kodów QR',
    link: import.meta.env.VITE_QR_LINK || 'https://foxjustfox.github.io/qrcode_gen_web/',
    icon: iconQr,
  },
]
