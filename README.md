# Przygotowanie środowiska
Do wykonania zadań potrzebny będzie **Node.js** (https://nodejs.org/en/download) zainstalowany lokalnie.

## Uruchomienie serwera aplikacji

Przejdź do katalogu [backend](backend/), który zawiera kod źródłowy serwera aplikacji i wykonaj polecenie
```shell
npm install
```
aby zainstalować potrzebne zależności.

Uruchom serwer poleceniem
```shell
npm run dev
```
Jeśli wszystko przebiegło prawidłowo serwer powinien działać pod adresem http://localhost:9000.

Serwer jest automatycznie restartowany w momencie zapisania zmian wprowadzonych w plikach serwera.

##  Uruchomienie klienta aplikacji

Otwórz drugie okno terminala, a następnie przejdź do katalogu [frontend](frontend/), który zawiera pliki klienta aplikacji.

Wykonaj polecenie
```shell
npx live-server --port=80
```
które uruchamia serwer HTTP serwujący statyczne pliki z katalogu [frontend](frontend) na porcie 80 (http://localhost).

W momencie gdy wprowadzimy zmiany w plikach katalogu [frontend](frontend/) okno przeglądarki powinno się samo odświeżać.

**Wskazówka**: Jeśli zmiany będą niewidoczne odśwież kartę przeglądarki za pomocą skrótu Ctrl+F5.

# Zad 1
Celem zadania jest zapobiegnięcie atakowi XSS typu Stored.

Zawartość przesyłanych przez klienta wiadomości nie jest w żaden sposób weryfikowana i sprawdzana po stronie serwera. Wiadomości są bezpośrednio zapisywane do bazy danych (w naszym przypadku została użyta zwykła lista zamiast bazy).

Aby zapobiec zapisywaniu zainfekowanych wiadomości do bazy danych wykonaj ich sanityzację. Zrób to w funkcji [sanitizeMessage](backend/src/utils/sanitizeMessage.ts), która znajduje się pod ścieżką [backend/src/utils/](backend/src/utils/sanitizeMessage.ts). W tym celu możesz użyć biblioteki [sanitize-html](https://www.npmjs.com/package/sanitize-html) - jest już zainstalowana w projekcie.

Jako dowód wykonania zadania prześlij kod funkcji [sanitizeMessage](backend/src/utils/sanitizeMessage.ts). Funkcja powinna zwracać tekst wiadomości, która po wyrenderowaniu na stronie nie będzie szkodliwa.

# Zad 2


# Zad 3


