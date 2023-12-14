# Przygotowanie środowiska
Do wykonania zadań potrzebny będzie **Node.js** (https://nodejs.org/en/download) zainstalowany lokalnie.

## Uruchomienie aplikacji

Przejdź do katalogu [backend](backend/), który zawiera kod źródłowy aplikacji i wykonaj polecenie
```shell
npm install
```
aby zainstalować potrzebne zależności.

Uruchom aplikację poleceniem
```shell
npm run dev
```
Jeśli wszystko przebiegło prawidłowo serwer HTTP powinien działać pod adresem http://localhost:9000.

Serwer jest automatycznie restartowany w momencie zapisania zmian wprowadzonych w plikach serwera **z wyjątkiem plików w katalogach [backend/src/public/](backend/src/public/) oraz [backend/src/views/](backend/src/views/)**. Jeśli zmiany są niewidoczne odśwież przeglądarkę skrótem Ctrl+F5.

# Zadania

Celem zadań będzie poprawienie luk w aplikacji, które pozwalają na atak typu XSS.

## Zad 1 - Stored XSS
Celem zadania jest zapobiegnięcie atakowi XSS typu Stored.

Zawartość przesyłanych przez klienta wiadomości nie jest w żaden sposób weryfikowana i sprawdzana po stronie serwera. Wiadomości są bezpośrednio zapisywane do bazy danych (w naszym przypadku została użyta zwykła lista zamiast bazy).

Aby zapobiec zapisywaniu zainfekowanych wiadomości do bazy danych wykonaj ich sanityzację. Zrób to w funkcji [sanitizeUserInput](backend/src/utils/sanitizeUserInput.ts), która znajduje się pod ścieżką [backend/src/utils/](backend/src/utils/sanitizeUserInput.ts). W tym celu możesz użyć biblioteki [sanitize-html](https://www.npmjs.com/package/sanitize-html) - jest już zainstalowana w projekcie.


Aby przetestować działanie sanityzacji po stronie serwera otwórz dwa okna przeglądarki z czatem.

Po wysłaniu na czacie wiadomości zawierającej HTML (np `<h1>hello</h1>`) powinniśmy widzieć niezinterpretowany przez przeglądarkę kod HTML **w drugim oknie** przeglądarki, czyli treść **otrzymanej** wiadomości powinna wyglądać tak: `<h1>hello</h1>`.

Jako dowód wykonania zadania prześlij kod funkcji [sanitizeUserInput](backend/src/utils/sanitizeUserInput.ts). Funkcja powinna zwracać tekst wiadomości, która po wyrenderowaniu na stronie nie będzie szkodliwa.


## Zad 2 - Reflected XSS
Celem zadania jest zapobiegnięcie atakowi XSS typu Reflected.

W projekcie używany jest silnik [EJS](https://ejs.co/), który pozwala renderować dynamiczną zawartość HTML po stronie serwera.

Wyświetlane w ten sposób parametry URL mogą być potencjalnym wektorem ataku na naszą aplikację.

Twoim zadaniem jest sanityzacja danych wyświetlanych za pomocą EJS. Dane są wyświetlane za pomocą charakterystycznego tagu EJS (`<%`) w kilku miejscach pliku [index.ejs](backend/src/views/index.ejs) znajdującego się w katalogu [backend/src/views/](backend/src/views/index.ejs). Linie, które należy edytować są oznaczone komentarzem o treści `escape string HERE`.

Aby przetestować działanie wpisz w pasek URL dowolny parametr żądania zawierający HTML (np `http://localhost:9000/?param1=<h1>hello</h1>`). W tabeli **po prawej stronie (rendered server-side)** powinien się wyświetlić tekst `<h1>hello</h1>` zamiast <h1 style="margin-top:-30px;">hello</h1>

Jako dowód wykonania zadania przyślij plik [index.ejs](backend/src/views/index.ejs), z poprawionym wyświetlaniem zmiennych w tagach EJS.

**Przydatny link**: https://stackoverflow.com/questions/16183748/how-to-escape-html-in-node-js-ejs-view


## Zad 3 - DOM-based XSS
Celem zadania jest zapobiegnięcie atakowi XSS typu DOM-based.

DOM-based XSS jest najczęściej spowodowany użyciem złej metody w JavaScript do wyświetlania danych na stronie. Powinno się unikać używania metody `innerHTML`, ponieważ jest ona niebezpieczna (o czym świadczy fakt, że w bibliotece React.js nie nazywa się ona `innerHTML` lecz `dangerouslySetInnerHtml`). 

Twoim zadaniem jest użycie innej metody JavaScript do wyświetlania tekstu w aplikacji, tak aby zawarty w zmiennej kod HTML nie został zinterpretowany przez przeglądarkę.

W tym celu zmodyfikuj pliki [app.js](backend/src/public/js/app.js) oraz [queryParams.js](backend/src/public/js/queryParams.js) znajdujące się pod ścieżką [backend/src/public/js/](backend/src/public/js/). Linie kodu, które należy poprawić są w obu plikach oznaczone komentarzem `do not use innerHTML`.

Aby przetestować działanie wpisz w pasek URL dowolny parametr żądania zawierający HTML (np `http://localhost:9000/?param1=<h1>hello</h1>`) w tabelce po lewej stronie powinien się wyświetlić tekst `<h1>hello</h1>` zamiast <h1 style="margin-top:-30px;">hello</h1>

Co więcej, od tej pory również w wysyłanych na czacie wiadomościach HTML powinien nie być interpretowany przez przeglądarkę lecz wyświetlany jako zwykły tekst.

Jako dowód wykonania zadania przyślij poprawione pliki [app.js](backend/src/public/js/app.js) oraz [queryParams.js](backend/src/public/js/queryParams.js).

**Przydatny link**: https://stackoverflow.com/questions/31466355/whats-the-use-of-textcontent-innertext-when-innerhtml-does-the-job-better
