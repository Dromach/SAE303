var searchInput = document.getElementById('search-input60');
var searchResults = document.getElementById('search-results60');

// Écoutez les événements de saisie dans la barre de recherche
searchInput.addEventListener('input', function() {
  var searchTerm = searchInput.value.toLowerCase();
  displayResults(searchTerm);
});



  

// Fonction pour afficher la chart correspondante au prénom
function afficherChart(preusuel) {
    // Votre logique pour afficher la chart en fonction du prénom
    // Par exemple, vous pourriez utiliser une bibliothèque de graphiques comme Chart.js
    // ou manipuler directement le DOM pour afficher la chart
    console.log('Afficher la chart pour le prénom :', preusuel);
}


// Fonction pour charger les données depuis le fichier JSON
async function fetchData() {
  try {
    const response = await fetch('Donnees/naissances-2004-60.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  }
}

async function displayResults(searchTerm) {
    // Réinitialiser la liste des résultats à chaque saisie
    searchResults.innerHTML = '';
  
    // Charger les données depuis le fichier JSON
    const data = await fetchData();
  
    // Filtrer les résultats en fonction du terme de recherche
    var filteredResults = data.filter(function(item) {
      return (
        item.preusuel.toLowerCase().includes(searchTerm)
        // Ajoutez d'autres propriétés selon vos besoins
      );
    });
  
    // Afficher les résultats filtrés
    filteredResults.forEach(function(item) {
      var resultItem = document.createElement('li');
      resultItem.className = 'result-item';
      resultItem.textContent = `${item.preusuel} `;
      searchResults.appendChild(resultItem);
    });
  
    // Afficher la liste des résultats
    if (filteredResults.length > 0) {
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'none';
    }
  }