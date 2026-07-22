# Plan Projektu – Strona WRSS (Samorząd WIT)

> **Legenda:**
>
> - `[DONE]` — zrobione i śmiga
> - `[PARTIAL]` — zaczęte, ale trzeba dokończyć (zazwyczaj brakuje nam zdjęć lub tekstów)
> - `[TODO]` — pomysły, do których jeszcze nie usiedliśmy

---

## 1. Rzeczy do dokończenia (`PARTIAL`)

- `[PARTIAL]` **Wydarzenia:** wizualnie gotowe (gradienty, tagi). Potrzebujemy prawdziwych opisów i zdjęć z imprez w `public/images/events/`. Nadal pobierane statycznie przy buildzie (`scripts/fetch-events.mjs`) — nie przeniesione do bazy jak Członkowie.

---

## 2. Nasza lista zadań (`TODO`)

- `[TODO]` **Koło Fortuny:** narazie skip
- `[TODO]` **Samorządowiec Miesiąca:** wyróżnienie jednej osoby, np. ręcznie ustawiane pole w panelu admina.
- `[TODO]` **Codzienny rebuild bannerów wydarzeń:** obecnie `fetch-events.mjs` odpala się tylko przy buildzie — nie ma jeszcze automatycznego, cyklicznego triggera (np. cron/GitHub Actions bijący w webhook deployu Coolify).

---

## 3. Zrobione i gotowe (`DONE`)

- `[DONE]` **Design (Figma 1:1):** Pełny Dark Mode, czerwone akcenty, nowoczesne gridy i font Montserrat. Wszystkie nagłówki sekcji zastąpiono dedykowanymi grafikami SVG (O Organizacji, Zarząd, Wydarzenia, Narzędzia).
- `[DONE]` **Responsywność:** Strona w pełni responsywna, posiada menu hamburgerowe i adaptacyjne nagłówki SVG.
- `[DONE]` **Nawigacja:** Płynne przewijanie do sekcji (Anchor Links) oraz animowane logo w Navbarze.
- `[DONE]` **Narzędzia:** Winietki, QR i Punkty spięte jako zewnętrzne aplikacje. Nagłówek sekcji z nakładającą się grafiką zębatki.
- `[DONE]` **Hero & Informator:** Nowa sekcja powitalna z tłem `nagłówek.svg` i szybkim przyciskiem pobierania PDF.
- `[DONE]` **Stopka (Footer):** Nowoczesny układ z profesjonalnymi ikonami Social Media oraz dedykowaną ikoną Gmail, wyśrodkowane kolumny, licznik odwiedzin na dole.
- `[DONE]` **Optymalizacja:** Usunięto martwy kod, zunifikowano style CSS i zintegrowano najnowsze assety z folderu Figma.
- `[DONE]` **"Dziś jest środa":** Easter-egg — modal z rozmytym tłem, pokazuje się raz na wejście gdy dzień tygodnia to środa, zamykany krzyżykiem lub kliknięciem w tło.
- `[DONE]` **Licznik odwiedzin:** zapisywany w Postgresie przez `server/`, inkrementowany przy każdym wejściu na stronę, wyświetlany w stopce.
- `[DONE]` **Członkowie — przeniesieni do bazy danych:** sekcje (obecny zarząd + dowolna liczba sekcji "przeszły zarząd") i osoby żyją w Postgresie zamiast w statycznych plikach TS. Obecny zarząd synchronizowany ręcznie z samorzad.pwr.edu.pl (panel admina, przycisk "Synchronizuj z PWr" — **nie** przy każdym buildzie). Przeszłe zarządy dodawane ręcznie w panelu, nigdy nie nadpisywane automatycznie.
- `[DONE]` **Panel administracyjny (`/admin`):** logowanie login+hasło, zarządzanie sekcjami i osobami (dodawanie/edycja/usuwanie/kolejność/przenoszenie między sekcjami), przycisk ręcznej synchronizacji z PWr.
- `[DONE]` **Hosting — Deploy na Coolify:** `Dockerfile` + `nginx.conf` dla strony (Vite build → nginx, fallback SPA), `server/` jako osobny serwis (Express + Postgres) z własnym Dockerfile. Wdrożone i działa.
- `[DONE]` **Historia WRSSu:** sekcje wspierają dowolne małe custom-sekcje (oś czasu / stare składy) — obsłużone przez istniejący mechanizm sekcji Członków.
