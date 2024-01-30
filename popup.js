browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    let tab = tabs[0];
    // wyciągamy z danych przeglądarki ciasteczka aktywnej strony internetowej
    browser.cookies.getAll({url: tab.url}).then((cookies) => {
        let cookiesTable = document.getElementById('cookies');
        for (let cookie of cookies) {
            let row = cookiesTable.insertRow(-1);
            let name_cell = row.insertCell(0);
            let value_cell = row.insertCell(1);
            let url_cell = row.insertCell(2);
            name_cell.textContent = cookie.name;
            value_cell.textContent = cookie.value;
            url_cell.textContent = cookie.domain;
        }
    });
});

var button = document.getElementById('exportButton');

button.addEventListener('click', function () {
    var csv = 'Name,Value,Domain\n';
    var rows = document.getElementById('cookies').rows;
    for (var i = 1; i < rows.length; i++) { // pomiń linijkę nagłówkową csv
        csv += rows[i].cells[0].textContent + ','; // name
        csv += rows[i].cells[1].textContent + ','; // value
        csv += rows[i].cells[2].textContent + '\n'; // domain
    }
    var blob = new Blob([csv], {type: 'text/csv'});
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = rows[1].cells[2].textContent + '_cookies.csv'; // nazwa pliku to domena_cookies.csv
    link.click(); // pobierz plik

    // od procesu w tle (main.js) pobieramy informacje o znalezionych otwartych adresach API
    browser.runtime.sendMessage("getAPIdata").then((apiData) => {
        var routes = apiData.routes;
        var csv = 'URL\n';
        for (let key in routes) {
            if (!key.includes("?")) { // ignoruj api proszące o dodatkowe argumenty http "?arg=____"
                csv += rows[1].cells[2].textContent + '/wp-json' + key + '\n';
            }
        }
        var blob = new Blob([csv], {type: 'text/csv'});
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = rows[1].cells[2].textContent + '_api.csv'; // domena_api.csv';
        link.click();
    });
});

// od procesu w tle (main.js) pobieramy informacje o adresach na które wykonanano requesty HTTP
browser.runtime.sendMessage("getRequests").then((requestURLs) => {
    var table = document.getElementById('requests');
    for (let url of requestURLs) {
        let row = table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.textContent = url;
    }
});
