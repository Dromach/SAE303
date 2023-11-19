var data = [
    { "name": "John Doe", "age": 25, "city": "New York" },
    { "name": "Jane Smith", "age": 30, "city": "San Francisco" },
    // Ajoutez d'autres données selon vos besoins
  ];
var searchInput = document.getElementById('search-input');
var searchResults = document.getElementById('search-results');

// Écoutez les événements de saisie dans la barre de recherche
searchInput.addEventListener('input', function() {
  var searchTerm = searchInput.value.toLowerCase();
  displayResults(searchTerm);
});

// Fonction pour afficher les résultats de recherche
function displayResults(searchTerm) {
  // Réinitialiser la liste des résultats à chaque saisie
  searchResults.innerHTML = '';

  // Filtrer les résultats en fonction du terme de recherche
  var filteredResults = data.filter(function(item) {
    return item.name.toLowerCase().includes(searchTerm) ||
           item.city.toLowerCase().includes(searchTerm);
    // Vous pouvez étendre la recherche à d'autres propriétés selon vos besoins
  });

  // Afficher les résultats filtrés
  filteredResults.forEach(function(item) {
    var resultItem = document.createElement('li');
    resultItem.className = 'result-item';
    resultItem.textContent = item.name + ' - ' + item.city;
    searchResults.appendChild(resultItem);
  });

  // Afficher la liste des résultats
  if (filteredResults.length > 0) {
    searchResults.style.display = 'block';
  } else {
    searchResults.style.display = 'none';
  }
}