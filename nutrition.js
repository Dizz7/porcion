// Datos ilustrativos por 100 g cocidos, sin aceite. No son una base clínica validada.
export const foods = [
 {id:'rice', name:'Arroz', detail:'Blanco · cocido', icon:'🍚', kcal:130, protein:2.7, carbs:28.2, fat:0.3},
 {id:'chicken', name:'Pollo', detail:'Pechuga · cocida, sin piel', icon:'🍗', kcal:165, protein:31, carbs:0, fat:3.6},
 {id:'broccoli', name:'Brócoli', detail:'Cocido · sin aceite', icon:'🥦', kcal:35, protein:2.4, carbs:7.2, fat:0.4},
 {id:'potato', name:'Papa', detail:'Hervida · sin piel', icon:'🥔', kcal:87, protein:1.9, carbs:20.1, fat:0.1},
 {id:'carrot', name:'Zanahoria', detail:'Hervida · sin aceite', icon:'🥕', kcal:35, protein:0.8, carbs:8.2, fat:0.2}
];
export function validGrams(value){ const n=Number(value);return Number.isInteger(n)&&n>=1&&n<=500; }
export function totals(portions){return foods.reduce((t,f)=>{const g=portions[f.id]||0;for(const k of ['kcal','protein','carbs','fat']) t[k]+=f[k]*g/100;t.grams+=g;return t;},{kcal:0,protein:0,carbs:0,fat:0,grams:0});}
