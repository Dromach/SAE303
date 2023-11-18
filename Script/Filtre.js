//1 = boug 2 = meuf

/*const data = [{"preusuel":"AARON","sexe":1,"dpt":"60","annais":"2004","nombre":4},
{"preusuel":"ABIGAIL","sexe":2,"dpt":"60","annais":"2004","nombre":3},
{"preusuel":"ADAM","sexe":1,"dpt":"60","annais":"2004","nombre":12},
{"preusuel":"ADEL","sexe":1,"dpt":"60","annais":"2004","nombre":3},
{"preusuel":"ADELE","sexe":2,"dpt":"60","annais":"2004","nombre":3},
{"preusuel":"ADELINE","sexe":2,"dpt":"60","annais":"2004","nombre":3},
{"preusuel":"ADRIEN","sexe":1,"dpt":"60","annais":"2004","nombre":30},
{"preusuel":"AGATHE","sexe":2,"dpt":"60","annais":"2004","nombre":15},
{"preusuel":"AHMET","sexe":1,"dpt":"60","annais":"2004","nombre":3},
{"preusuel":"AICHA","sexe":2,"dpt":"60","annais":"2004","nombre":5},
{"preusuel":"ALAIN","sexe":1,"dpt":"60","annais":"2004","nombre":4},
{"preusuel":"ALAN","sexe":1,"dpt":"60","annais":"2004","nombre":11},
{"preusuel":"ALBAN","sexe":1,"dpt":"60","annais":"2004","nombre":10},
{"preusuel":"ALBANE","sexe":2,"dpt":"60","annais":"2004","nombre":4},
{"preusuel":"ALEX","sexe":1,"dpt":"60","annais":"2004","nombre":5},
{"preusuel":"ALEXANDRA","sexe":2,"dpt":"60","annais":"2004","nombre":7},
{"preusuel":"ALEXANDRE","sexe":1,"dpt":"60","annais":"2004","nombre":42}];*/

const data = fetch('Données/naissances-2004-60.json');

const filtre = _.filter(data, {"sexe" : 1});
console.log(filtre);


//console.log(filter(test, {"sexe" : 1}));
