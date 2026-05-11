# Plan Projektu – Strona WRSS (Samorząd WIT)

> **Legenda:**
> - `[DONE]` — zrobione i śmiga
> - `[PARTIAL]` — zaczęte, ale trzeba dokończyć (zazwyczaj brakuje nam zdjęć lub tekstów)
> - `[TODO]` — pomysły, do których jeszcze nie usiedliśmy

---

## 1. Rzeczy do dokończenia (`PARTIAL`)

Szkielet tych sekcji jest już w kodzie, ale żeby wyglądały w 100% dobrze, musicie podesłać swoje materiały albo musimy doklepać drobne poprawki.

- `[PARTIAL]` **Nawigacja (Navbar):** Menu działa na komputerach, ale musimy dorobić rozwijane menu (tzw. "hamburger") na telefony komórkowe, żeby łatwo się klikało palcem.
- `[PARTIAL]` **Członkowie:** Układ i kafelki są gotowe, ale trzeba podmienić wymyślone dane w pliku `src/data/members.ts` na prawdziwe imiona zarządu i wrzucić fotki do `public/images/`.
- `[PARTIAL]` **Wydarzenia:** Karty z wydarzeniami są zrobione, ale znów – potrzebujemy prawdziwych opisów i zdjęć z Waszych imprez czy rajdów.
- `[PARTIAL]` **Kalendarz Google:** Moduł jest wpięty, ale jest w nim puste miejsce na ID. Ktoś musi założyć samorządowy kalendarz i dać mi z niego klucz, żebym go podmienił.
- `[PARTIAL]` **Góra strony (Hero):** Musimy tam wrzucić wasze oficjalne logo i fajny tekst powitalny zamiast tego domyślnego.

---

## 2. Nasza lista zadań (`TODO`)

To są rzeczy wyciągnięte z pliku z notatkami, za które będziemy się brać po kolei.

- `[TODO]` **Koło Fortuny:** Aplikacja do losowania na spotkaniach integracyjnych (link już jest w narzędziach).
- `[TODO]` **Historia WRSSu:** Fajna oś czasu ze zdjęciami starych składów i przewodniczących.
- `[TODO]` **"Dziś jest środa":** Wyskakujące zdjęcie/mem – taki easter-egg działający tylko we środy.
- `[TODO]` **Licznik odwiedzin:** Prosty licznik na dole strony pokazujący, ile osób u nas było.
- `[TODO]` **Samorządowiec Miesiąca:** Nagroda/wyróżnienie wyświetlane na stronie.

---

## 3. Zrobione i gotowe (`DONE`)

Te rzeczy są już odhaczone, działają i nie trzeba przy nich dłubać.

- `[DONE]` **Silnik strony (React + TypeScript):** Architektura postawiona poprawnie. Strona wczytuje się w ułamek sekundy i nie ma żadnych błędów w kodzie.
- `[DONE]` **Wygląd i kolory:** Przełożyliśmy design z pliku z makiety wizualizacji. Są ładne kafelki, a kolory trzymają się wydziałowej czerwieni WIT.
- `[DONE]` **Narzędzia samorządowe:** Winietki, Generator QR i Punkty są ładnie spięte w jednej zakładce.
- `[DONE]` **Informator w PDF:** Wpięliśmy wasz PDF bezpośrednio na stronę, można go wygodnie przewijać bez pobierania.
- `[DONE]` **Kontakt:** Zrobiliśmy sekcję na samym dole z adresem, mailem i przyciskami do Insta/FB.
- `[DONE]` **Github i bezpieczeństwo:** Dobrze ustawiony plik `.gitignore` (więc tajne rzeczy nie wyciekną na GitHuba) i krótka instrukcja dla nowych w `README.md`.
