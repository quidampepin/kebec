/* Onontio — Repères historiques : population réelle, gouverneurs. */
/* ---------------- history ---------------- */
/* Repères sourcés : Statistique Canada, « Recensements du Canada 1665-1871 » (1608, 1620, 1628, 1629, 1641, 1665) ;
   Champlain (8 survivants au printemps 1609) ; Encyclopédie canadienne / Trudel (un peu plus de 3 000 en 1663, 3 035 selon Trudel).
   1629-1632 : après la capitulation, une vingtaine de personnes restent (estimation, peu documentée).
   Écarté : 2 000 en 1653 (série ancienne de Statistique Canada, incompatible avec les autres repères).
   Entre deux repères, interpolation géométrique (croissance en pourcentage). */
const HIST_POP=[[1608,28],[1608.9,28],[1609.1,8],[1620,60],[1628,76],[1629.4,117],[1629.6,20],[1632.3,20],[1641,240],[1663,3035],[1665,3215]];
const HIST_SOURCES=[{y:1608,v:28,src:'Statistique Canada'},{y:1609,v:8,src:'Champlain'},{y:1620,v:60,src:'Statistique Canada'},{y:1628,v:76,src:'Statistique Canada'},{y:1629,v:117,src:'Statistique Canada'},{y:1641,v:240,src:'Statistique Canada'},{y:1663,v:3035,src:'Trudel'},{y:1665,v:3215,src:'Statistique Canada'}];
function histPop(y){for(let i=0;i<HIST_POP.length-1;i++){const[a,pa]=HIST_POP[i],[b,pb]=HIST_POP[i+1];if(y>=a&&y<=b){const f=(y-a)/(b-a);return pa*Math.pow(pb/pa,f);}}return y<1608?28:HIST_POP[HIST_POP.length-1][1];}
const GOVS=[
 {from:1608,name:'Samuel de Champlain',trait:{fr:"Explorateur et diplomate : les présents aux alliés portent plus loin.",en:"Explorer and diplomat: gifts to allies go further."},rel:1.35},
 {from:1636,name:'Charles Huault de Montmagny',trait:{fr:"Chevalier de Malte, il fortifie. Son nom, traduit « Grande Montagne », devient Onontio, titre de tous les gouverneurs.",en:"Knight of Malta, he fortifies. His name, rendered as 'Great Mountain', becomes Onontio, the title of every governor after him."},def:1.3},
 {from:1648,name:"Louis d'Ailleboust de Coulonge",trait:{fr:"Prudent et pieux : un peu meilleur en tout, excellent en rien.",en:"Prudent and pious: a bit better at everything, excellent at nothing."},rel:1.1,def:1.1},
 {from:1651,name:'Jean de Lauson',trait:{fr:"Homme de la Compagnie : une partie du produit de la traite reste dans sa famille.",en:"A Company man: part of the fur revenue stays in his family."},tre:0.85},
 {from:1657,name:"Louis d'Ailleboust (intérim)",trait:{fr:"Intérim : il gère les affaires courantes.",en:"Interim: he keeps things running."},rel:1.1},
 {from:1658,name:"Pierre de Voyer d'Argenson",trait:{fr:"Austère, harcelé par les raids : il mise sur la défense.",en:"Austere and harried by raids: he leans on defence."},def:1.2},
 {from:1661,name:'Pierre Dubois Davaugour',trait:{fr:"Soldat : fortifie, et se brouille avec l'évêque sur l'eau-de-vie.",en:"A soldier: he fortifies, and clashes with the bishop over brandy."},def:1.4}
];
const gov=s=>{let g=GOVS[0];for(const x of GOVS)if(s.year>=x.from)g=x;return g;};

