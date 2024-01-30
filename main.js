var requestURLs = [];

browser.webRequest.onCompleted.addListener(
    (details) => {
        requestURLs.push(details.url);      // jeśli strona wysyła zapytania HTTP, to zapisujemy url rządania do taabeli
    },
    {urls: ["<all_urls>"]}
);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getRequests") {
        sendResponse(requestURLs);
    }
});

browser.tabs.onUpdated.addListener(
    (details) => {
        requestURLs = []; //wykasuj tabelę requestów po odświeżeniu strony
    }
)

var apiData = [];

function checkWordPressAPI(url, sendResponse) {
    apiData = [];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + "wp-json", true); // sprawdzamy typowy dla stron Wordpressowych adres API
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            apiData = JSON.parse(xhr.responseText); // przerób string odpowiedzi na obiekt javascriptu
            sendResponse(apiData);
        }
    }
    xhr.send();
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getAPIdata") {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            let url = tabs[0].url;
            checkWordPressAPI(url, sendResponse);
        });
        return true; // teraz czeka na załadowanie requestu do API
    }
});

