var button = document.getElementById('copyButton');
button.addEventListener('click', function() {
  // Pobierz element tabeli i przekonwertuj go na ciąg znaków CSV
  var table = document.getElementById('table');
  var csv = tableToCSV(table);
  // Utwórz obiekt Blob z ciągiem znaków CSV i ustaw jego typ na text/csv
  var blob = new Blob([csv], { type: 'text/csv' });
  // Utwórz element a i ustaw jego atrybuty href i download na odpowiednie wartości
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'table_data.csv';
  // Dodaj element a do ciała dokumentu, symuluj kliknięcie na nim i usuń go z ciała dokumentu
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Funkcja pomocnicza, która konwertuje element tabeli na ciąg znaków CSV
function tableToCSV(table) {
  var csv = [];
  var rows = table.querySelectorAll('tr');
  for (var i = 0; i < rows.length; i++) {
    var row = [];
    var cols = rows[i].querySelectorAll('td, th');
    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }
    csv.push(row.join(','));
  }
  return csv.join('\n');
}