# Przygotowanie środowiska
Do wykonania zadań potrzebne będzie narzędzie do konteneryzacji **docker-desktop** (https://www.docker.com/products/docker-desktop/) oraz **Node.js** (https://nodejs.org/en/download).

## Uruchomienie serwera aplikacji

Przejdź do katalogu [backend](backend/), który zawiera kod źródłowy serwera aplikacji i wykonaj polecenie `npm install`, aby zainstalować potrzebne zależności.

Serwer uruchamiany jest poleceniem `npm run dev`. Jeśli wszystko przebiegło prawidłowo serwer powinien działać pod adresem http://localhost:9000.

**Wskazówka**: Serwer jest automatycznie restartowany jeśli wprowadzisz zmiany w plikach serwera.

##  Uruchomienie klienta aplikacji
Należy uruchomić narzędzie docker-desktop lub na Linuxie wykonać polecenie `sudo systemctl start docker.service`

Przejdź do [głównego katalogu repozytorium](.) i wykonaj polecenie: `docker compose up`. Klient aplikacji powinien być dostępny pod adresem http://localhost/.

**Wskazówka**: Aby zauważyć wprowadzone zmiany należy odświeżyć kartę przeglądarki. Jeśli zmiany nadal będą niewidoczne odśwież kartę za pomocą skrótu Ctrl+F5.

# Zad 1
Celem zadania jest zapobiegnięcie atakowi XSS typu Stored.

Zawartość przesyłanych przez klienta wiadomości nie jest w żaden sposób weryfikowana i sprawdzana po stronie serwera. Wiadomości są bezpośrednio zapisywane do bazy danych (w naszym przypadku została użyta zwykła lista zamiast bazy).

Aby zapobiec zapisywaniu zainfekowanych wiadomości do bazy danych wykonaj ich sanityzację. Zrób to w funkcji [sanitizeMessage](backend/src/utils/sanitizeMessage.ts). W tym celu możesz użyć biblioteki [sanitize-html](https://www.npmjs.com/package/sanitize-html) - jest już zainstalowana w projekcie.

Jako dowód wykonania zadania prześlij kod funkcji [sanitizeMessage](backend/src/utils/sanitizeMessage.ts). Funkcja powinna zwracać tekst wiadomości, która po wyrenderowaniu na stronie nie będzie szkodliwa.

# Zad 2


# Zad 3


