# WRSS W4N Website

Oficjalna strona internetowa Wydziałowej Rady Samorządu Studentów (WRSS) Wydziału Informatyki i Telekomunikacji (W4N) Politechniki Wrocławskiej.

## Technologie

Aplikacja została zbudowana w oparciu o nowoczesny stos technologiczny SPA (Single Page Application):

- **React 18** – framework UI
- **TypeScript** – bezpieczeństwo kodu i statyczne typowanie
- **Vite** – błyskawiczne narzędzie budujące (bundler)
- **React Router DOM v6** – zarządzanie routingiem

## Uruchomienie lokalne

> Projekt korzysta z menedżera pakietów **pnpm**. Jeśli nie masz go zainstalowanego, włącz go przez `corepack enable` lub zainstaluj globalnie: `npm install -g pnpm`.

1. Zainstaluj wymagane paczki:
   ```bash
   pnpm install
   ```
2. Uruchom serwer deweloperski:
   ```bash
   pnpm dev
   ```

## Architektura i modyfikacja danych

Aplikacja wykorzystuje paradygmat "Code as Data". Nie ma oddzielnego serwera z bazą danych SQL — dzięki czemu hosting jest w 100% darmowy, a ryzyko ataków sprowadzone do zera.

Dane zaciągane są wprost z plików TypeScript. Aby zaktualizować stronę:

- Otwórz `src/data/events.ts` aby dodać lub usunąć wydarzenie.
- Otwórz `src/data/members.ts` aby zarządzać członkami samorządu.
- Umieszczaj wszystkie zdjęcia w folderze `public/images/`.

Aby ręcznie odświeżyć dane pobierane automatycznie:

```bash
pnpm update-members   # aktualizuje zdjęcia i skład z samorzad.pwr.edu.pl
pnpm update-events    # pobiera banery wydarzeń z Facebooka
```

Obie komendy uruchamiają się też automatycznie przed każdym `pnpm build`.

## Budowa na produkcję (Deployment)

Aby wygenerować minifikowane pliki statyczne gotowe do wrzucenia na dowolny hosting (np. GitHub Pages, Vercel, Netlify):

```bash
pnpm build
```

Zbudowane pliki pojawią się w ukrytym folderze `dist/`.
