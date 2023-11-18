//1 = boug 2 = meuf

/*const data = fetch('Données/naissances-2004-60.json');

const filtre = _.filter(data, {"sexe" : 1});
console.log(filtre);*/

const data = fetch('Données/test.json');

const filtre = _.filter(data, {name: 'John'});
console.log(filtre);


//console.log(filter(test, {"sexe" : 1}));
