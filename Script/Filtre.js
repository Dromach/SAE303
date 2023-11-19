document.getElementById('informations').addEventListener('change', function() {
    const selectedFiles = Array.from(this.selectedOptions).map(option => option.value);
    selectedFiles.forEach(file => {
        sexeGraph(file);
    });
});


var myPieChart = null;
var config = {options:{},type:'pie'}
async function sexeGraph(donnee) {
    const test = await fetch(donnee);
    const data = await test.json();
    const filtreH = _.filter(data, { sexe: 1 });
    const filtreF = _.filter(data, { sexe: 2 });
 var totalH = _.sumBy(filtreH, 'nombre'),
    totalF = _.sumBy(filtreF, 'nombre'),
    ctx = document.getElementById('sexe').getContext('2d');
                config.data = {
    labels: ["Hommes","Femmes"],
    datasets:
       [{
          data: [totalH,totalF]
       }]
 };
 if(myPieChart == null){
                    myPieChart = new Chart(ctx, config);
                }else{
                    myPieChart.update()
                }
}



// Ajoutez une écoute d'événement aux cases à cocher
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const selectedDepartments = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Vérifiez s'il y a des départements sélectionnés
        if (selectedDepartments.length > 0) {
            // Affichez le graphique des barres avec les départements sélectionnés
            departementsGraph(selectedDepartments);
        } else {
            // Si aucun département n'est sélectionné, masquez le graphique
            hideGraph();
        }
    });
});

let myBarChart = null;
let barConfig = { options: {}, type: 'bar' };

async function departementsGraph(selectedDepartments) {
    // Combinez les données de tous les départements sélectionnés
    const combinedData = await Promise.all(selectedDepartments.map(departement => fetch(departement).then(response => response.json())));

    // Calculez le total par sexe pour chaque département
    const totalsByDepartment = combinedData.map(data => {
        let total = _.sumBy(data, 'nombre');
        return total;
    });
// Préparez les données pour le graphique des barres
const labels = selectedDepartments.map(departement => departement.replace(/[^0-9a-zA-Z]/g, ''));
const data = {
    labels: labels,
    datasets: [{
        label: 'nombres de naissances',
        data: totalsByDepartment.map(total => total),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }]
};
    // Mettez à jour le graphique des barres
    const ctx = document.getElementById('dep').getContext('2d');
    barConfig.data = data;

    if (myBarChart === null) {
        myBarChart = new Chart(ctx, barConfig);
    } else {
        myBarChart.data = data;
        myBarChart.update();
    }
}

function hideGraph() {
    // Masquez le graphique si aucun département n'est sélectionné
    if (myBarChart !== null) {
        myBarChart.destroy();
        myBarChart = null;
    }
}



// Fonction pour charger les données depuis le fichier JSON
async function fetchData() {
    try {
        const response = await fetch('naissances-2004-60.json');
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
    const filteredResults = data.filter(function(item) {
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

// Ajoutez le gestionnaire d'événements pour le champ de recherche
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    displayResults(searchTerm);
    updateBarChart(searchTerm);
});

// Ajoutez le gestionnaire d'événements pour la fermeture du modal
document.getElementById('N-P').addEventListener('click', function(event) {
    if (event.target === this) {
        hideGraph(); // Masquer le graphique lorsque le modal est fermé
    }
});

// Gestionnaire d'événements pour le clic sur un résultat de recherche
document.getElementById('search-results').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'LI') {
        const selectedName = event.target.textContent.trim();
        searchInput.value = selectedName;
        hideGraph(); // Masquer le graphique lors de la sélection d'un résultat
        updateBarChart(selectedName);
    }
});