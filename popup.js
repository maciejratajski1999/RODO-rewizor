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

// function exportToCSV() {
//     var table = document.getElementById('cookies');
//     var csv = tableToCSV(table);
//     downloadCSV(csv, 'exported_data.csv');
// }

// function tableToCSV(table) {
//     var csv = [];
//     var rows = table.querySelectorAll('tr');
    
//     for (var i = 0; i < rows.length; i++) {
//         var row = [];
//         var cols = rows[i].querySelectorAll('td, th');
        
//         for (var j = 0; j < cols.length; j++) {
//             row.push(cols[j].innerText);
//         }
        
//         csv.push(row.join(','));
//     }
    
//     return csv.join('\n');
// }


// function downloadCSV(csv, filename) {
//     var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     var link = document.createElement('a');
    
//     if (link.download !== undefined) {
//         var url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', filename);
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
// }

