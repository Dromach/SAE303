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