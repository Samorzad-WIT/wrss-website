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

## Architektura danych

Strona ma dwa różne źródła danych — historycznie było to w 100% "Code as Data" (bez bazy), ale **Członkowie zostali przeniesione do Postgresa**, żeby dało się ręcznie zarządzać składem (w tym dodawać przeszłe zarządy) bez edytowania kodu i bez redeployu za każdym razem.

- **Wydarzenia** (`src/data/events.ts`) — nadal statyczny plik TS, edytowany ręcznie w repo. Banery z Facebooka pobierane przez `scripts/fetch-events.mjs`, uruchamiane automatycznie przy każdym `pnpm build` (`prebuild` hook).
- **Członkowie** — żyją w Postgresie, serwowani przez `server/` (małe API Express) pod `GET /api/members`. Strona pobiera je w czasie działania (`src/components/home/MembersSection.tsx`), nie przy buildzie. Zarządzanie odbywa się przez panel `/admin` (patrz niżej) — **nie edytuje się ich w kodzie**.

### Dlaczego Członkowie działają inaczej niż Wydarzenia

Skrobanie strony PWr nadpisywało ręczne poprawki zdjęć/ról przy każdym buildzie. Rozwiązanie: dane trzymane w bazie, synchronizacja z PWr uruchamiana **ręcznie** (przycisk w panelu admina), nigdy automatycznie — więc ręczna poprawka w panelu przeżywa kolejne synchronizacje, dopóki ktoś świadomie nie kliknie "Synchronizuj" ponownie. Przeszłe zarządy (sekcje, których PWr w ogóle nie ma na stronie) dodaje się w panelu ręcznie i nie są nigdy dotykane przez synchronizację.

## Panel administracyjny (`/admin`)

Pod `/admin` na stronie jest panel logowania (login + hasło) do zarządzania sekcjami i osobami:

- Dodawanie / usuwanie / zmiana kolejności sekcji (np. "Obecny Zarząd", "Zarząd 2023/2024").
- Rozmiar sekcji: `duża` (jak obecny zarząd) albo `mała` (kompaktowe kafelki, dla przeszłych składów).
- Dodawanie / edycja / usuwanie / zmiana kolejności / przenoszenie osób między sekcjami.
- Przycisk **"Synchronizuj z PWr"** — pobiera aktualny skład ze strony wydziału i aktualizuje sekcję `Obecny Zarząd` (dopasowanie po imieniu i nazwisku; nowe osoby dodaje, istniejące aktualizuje, nikogo nie usuwa automatycznie).

### Konfiguracja loginu (pierwsze uruchomienie)

Panel wymaga trzech zmiennych środowiskowych na `server/` (patrz [Zmienne środowiskowe](#zmienne-środowiskowe) niżej). Hasło nigdy nie jest trzymane w czystej postaci — generuje się hash:

```bash
cd server
node hash-password.mjs TwojeHaslo
```

Wynik (hash bcrypt) wklej jako `ADMIN_PASSWORD_HASH`.

## Uruchomienie API lokalnie (`server/`)

Panel admina i licznik odwiedzin potrzebują Postgresa i uruchomionego `server/`. Najszybciej lokalnie przez Docker:

```bash
docker run -d --name wrss-pg -e POSTGRES_PASSWORD=devpass -e POSTGRES_DB=wrss -p 5432:5432 postgres:16-alpine

cd server
pnpm install
DATABASE_URL=postgres://postgres:devpass@localhost:5432/wrss \
ADMIN_USERNAME=admin \
ADMIN_PASSWORD_HASH=<hash z hash-password.mjs> \
JWT_SECRET=$(openssl rand -hex 32) \
node index.js
```

Tabele (`sections`, `members`, `visit_counter`) tworzą się same przy starcie. Następnie w głównym katalogu repo, w pliku `.env` (gitignored):

```
VITE_API_URL=http://localhost:3000
```

i `pnpm dev`.

## Zmienne środowiskowe

**Root (`.env`, buduje się w Vite — patrz `.env.example`):**

| Zmienna | Znaczenie |
|---|---|
| `VITE_API_URL` | Adres `server/` API (licznik odwiedzin + członkowie) |
| `VITE_QR_LINK`, `VITE_WINIETKI_LINK`, `VITE_PUNKTY_LINK` | Linki do zewnętrznych narzędzi (opcjonalne, mają domyślne wartości) |

**`server/` (runtime, nie budowane):**

| Zmienna | Znaczenie |
|---|---|
| `DATABASE_URL` | Connection string do Postgresa |
| `CORS_ORIGIN` | Domena strony, z której wolno wołać API |
| `PORT` | Port API (domyślnie 3000) |
| `ADMIN_USERNAME` | Login do panelu `/admin` |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt hasła (generowany przez `node hash-password.mjs`) |
| `JWT_SECRET` | Losowy sekret do podpisywania tokenów sesji admina |

## Budowa na produkcję (Deployment)

Strona jest wdrażana jako dwa/trzy osobne zasoby na Coolify, w jednym repo:

1. **Postgres** — zasób bazodanowy Coolify, bez konfiguracji poza standardową.
2. **`server/`** — zasób Docker (Base Directory: `/server`), zmienne środowiskowe jak w tabeli wyżej.
3. **Strona** — zasób Docker (`deploy/Dockerfile`, multi-stage: build w Node → serwowanie przez nginx z fallbackiem SPA). `VITE_*` muszą być ustawione jako **Build Variables** w Coolify (Vite zaszywa je przy buildzie, nie da się ich zmienić po zbudowaniu obrazu).

Kolejność wdrażania ma znaczenie: Postgres → `server/` (potrzebuje `DATABASE_URL`) → Strona (potrzebuje `VITE_API_URL` gotowego adresu `server/`).

Do developmentu / testów lokalnie bez Coolify wystarczy zwykłe:

```bash
pnpm build
```

Zbudowane pliki statyczne (front, bez `server/`) pojawią się w folderze `dist/`.
