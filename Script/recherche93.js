document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search-input93');
  var searchResults = document.getElementById('search-results93');

  // Écoutez les événements de saisie dans la barre de recherche
  searchInput.addEventListener('input', function() {
    var searchTerm = searchInput.value.toLowerCase();
    displayResults(searchTerm);
  });

  searchResults.addEventListener('click', function(event) {
    // Assurez-vous que l'élément cliqué est un élément de résultat
    if (event.target.classList.contains('result-item')) {
      // Obtenez le texte de l'élément cliqué
      const selectedText = event.target.textContent;
      
      // Divisez le texte pour obtenir le prénom
      const selectedPreusuel = selectedText.trim();

      // Appelez la fonction pour afficher le graphique correspondant au prénom
      afficherChart(selectedPreusuel);
    }
  });

  // Fonction pour créer un graphique à barres
  function createBarChart(departements, nombreNaissances) {
    // Utilisez la bibliothèque de graphiques de votre choix (par exemple, Chart.js)
    // Assurez-vous d'inclure la bibliothèque dans votre projet
    
    // Exemple avec Chart.js
    var ctx = document.getElementById('barChart93').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: departements,
        datasets: [{
          label: 'Nombre de naissances',
          data: nombreNaissances,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Fonction pour afficher la chart correspondante au prénom
  function afficherChart(preusuel) {
    // Chargez les données depuis le fichier JSON
    fetchData().then(function(data) {
      // Filtrer les résultats pour le prénom sélectionné
      const selectedData = data.filter(function(item) {
        return item.preusuel.toLowerCase() === preusuel.toLowerCase();
      });

      // Créez un tableau de départements et un tableau de nombres de naissances correspondants
      const departements = selectedData.map(item => item.dpt);
      const nombreNaissances = selectedData.map(item => item.nombre);

      // Appelez une fonction pour créer le graphique à barres
      createBarChart(departements, nombreNaissances);
    });
  }

  // Fonction pour charger les données depuis le fichier JSON
  async function fetchData() {
    try {
      const response = await fetch('Donnees/naissances-2004-93.json');
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
});