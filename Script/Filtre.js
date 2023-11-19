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

