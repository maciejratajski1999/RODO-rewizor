browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    let tab = tabs[0];
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

button.addEventListener('click', function() {
    var csv = 'Name,Value,Domain\n';
    var rows = document.getElementById('cookies').rows;
    for (var i = 1; i < rows.length; i++) { // pomiń linijkę nagłówkową csv
        csv += rows[i].cells[0].textContent + ','; // name
        csv += rows[i].cells[1].textContent + ','; // value
        csv += rows[i].cells[2].textContent + '\n'; // domain
    }
    var blob = new Blob([csv], { type: 'text/csv' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = rows[1].cells[2].textContent + '_cookies.csv'; // nazwa pliku to domena_cookies.csv
    link.click(); // pobierz plik
});
browser.runtime.sendMessage("getRequests").then((requestURLs) => {
    var table = document.getElementById('requests');
    for (let url of requestURLs) {
        let row = table.insertRow(-1);
        let cell = row.insertCell(0);
        cell.textContent = url;
    }
});

