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
