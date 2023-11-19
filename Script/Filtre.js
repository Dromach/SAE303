const data = fetch('Données/naissances-2004-60.json');

const filtre = _.filter(data, {sexe: '1'});
console.log(filtre);

const data2 = fetch('Données/naissances-2004-75.json');

const filtre2 = _.filter(data2, {sexe: '1'});
console.log(filtre2);