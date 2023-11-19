const data = fetch('Données/naissances-2004-60.json');

const filtre = _.filter(data, {"sexe" : 1});
console.log(filtre);