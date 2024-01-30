# RODO Rewizor

RODO Rewizor to wtyczka do przeglądarki Firefox, która wspomaga audyt RODO strony internetowej.

## Wstęp i wyjaśnienie

Nasza aplikacja działa z poziomu przeglądarki, ponieważ zdecydowaliśmy, że tak w jak najbardziej przystępny sposób będzie ona realizowała swoje zadanie.
Jeśli chcemy przebadać swoją stronę internetową, kiedy otworzymy ją w przeglądarce Firefox, klikamy w ikonę naszej wtyczki.
Wspomaga ona audyt RODO, wskazując potencjalne wektory wycieku danych, poprzez ujawnianie na jakie strony wysyłane są zapytania HTTP z badanej witryny.
Ponadto dla typowych stron Wordpress sprawdzamy, jakie adresy API pozostają publicznie widoczne.

## Funkcje

1. **Pobieranie ciasteczek**: Wtyczka pobiera wszystkie ciasteczka związane z aktualnie otwartą stroną i wyświetla je w tabeli. Każde ciasteczko jest reprezentowane przez trzy wartości: nazwę, wartość i domenę.

2. **Pobieranie adresów URL żądań HTTP**: Wtyczka śledzi wszystkie żądania HTTP wysyłane przez stronę i zapisuje ich adresy URL. Adresy URL są następnie wyświetlane w tabeli. Podgląd adresów następuje w czasie rzeczywistym z poziomu popupu (po naciśnięciu ikony wtyczki).

3. **Sprawdzanie API WordPressa**: Wtyczka sprawdza, czy strona korzysta z typowego dla WordPressa adresu API (`wp-json`). Jeśli tak, wtyczka pobiera dane z API i umożliwia ich eksport do pliku CSV.

4. **Eksport do CSV**: Użytkownik ma możliwość eksportowania danych o ciasteczkach do pliku CSV. Po kliknięciu przycisku "Eksportuj do CSV", wtyczka generuje plik CSV zawierający wszystkie ciasteczka i automatycznie go pobiera.

## Pliki

Wtyczka składa się z kilku plików:

- `manifest.json`: Plik konfiguracyjny wtyczki, zawierający informacje takie jak nazwa, wersja, ikony, uprawnienia itp.
- `popup.html`: Strona HTML wyświetlana, gdy użytkownik kliknie ikonę wtyczki.
- `styles.css`: Arkusz stylów CSS dla `popup.html`.
- `popup.js`: Skrypt JavaScript, który obsługuje interakcje na stronie `popup.html`, takie jak pobieranie ciasteczek, eksport danych do CSV itp.
- `main.js`: Skrypt JavaScript działający w tle, który obsługuje funkcje takie jak śledzenie żądań HTTP i sprawdzanie API WordPressa.


## Instalacja

Aby zainstalować wtyczkę w przeglądarce Firefox, należy pobrać wszytkie pliki do katalogu i otworzyć plik `manifest.json` według instrukcji na stronie:

<https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing>
## Jak używać

Po zainstalowaniu i uruchomieniu wtyczki w przeglądarce Firefox, wejdź na stronę, którą chcesz zbadać i kliknij w ikonę wtyczki, any otworzyć okienko popup.
Przycisk `Eksportuj do CSV` służy do generowania raportów o aktywnych na stronie plikach cookies oraz otwartych API, jeśli witryna stoi na Wordpressie.
Do tego użytkownik ma w czasie rzeczywistym podgląd na zapytania HTTP wysyłane przez stronę.