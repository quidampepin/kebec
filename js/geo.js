/* Onontio — Géographie : projection, côtes, rivières, lieux, nations. */
/* ---------------- geography ---------------- */
const P=(lon,lat)=>[(lon+82)*55,(49.8-lat)*80];
const fx=a=>a[0].toFixed(1)+','+a[1].toFixed(1);
function smooth(pts,closed){
  const p=pts.map(a=>P(a[0],a[1])),n=p.length;
  const g=i=>closed?p[(i+n)%n]:p[clamp(i,0,n-1)];
  let d='M'+fx(p[0]);
  const last=closed?n:n-1;
  for(let i=0;i<last;i++){const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2);
    d+=`C${fx([p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6])} ${fx([p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6])} ${fx(p2)}`;}
  return d+(closed?'Z':'');
}
const GULF=[[-71.2,46.84],[-70.9,47.02],[-70.5,47.43],[-70.15,47.66],[-69.72,48.16],[-69.08,48.74],[-68.15,49.24],[-67.37,49.33],[-66.4,50.2],[-63.6,50.35],[-60.5,50.25],[-57,50.8],[-55.5,47.4],[-61,47.5],[-63.6,48.55],[-64.48,48.83],[-64.8,49.17],[-65.8,49.2],[-66.5,49.13],[-67.53,48.86],[-68.52,48.46],[-69.53,47.84],[-70.2,47.22],[-70.55,46.99],[-71.0,46.85]];
const ANTICOSTI=[[-64.5,49.85],[-63,49.78],[-61.7,49.15],[-62.6,49.06],[-64.2,49.5]];
const ONTARIO=[[-79.8,43.27],[-79.4,43.63],[-78.3,43.95],[-77.2,43.98],[-76.5,44.2],[-76.2,43.95],[-76.5,43.45],[-77.6,43.28],[-78.9,43.32]];
const ERIE=[[-78.9,42.88],[-80.0,42.8],[-81.0,42.65],[-82.3,42.2],[-82.3,41.6],[-80.5,41.9],[-79.0,42.5]];
const HURON=[[-82.3,46.25],[-81.5,46.05],[-80.6,45.95],[-80.03,45.34],[-79.85,44.87],[-79.93,44.72],[-80.22,44.5],[-80.94,44.6],[-81.25,44.98],[-81.66,45.25],[-81.5,44.95],[-81.4,44.6],[-81.5,44.2],[-81.72,43.74],[-82.3,43.0]];
const MANITOULIN=[[-82.3,45.95],[-81.75,45.97],[-81.65,45.78],[-82.0,45.6],[-82.3,45.58]];
const SL_UP=[[-76.48,44.22],[-75.9,44.42],[-75.4,44.75],[-74.73,45.02],[-74.3,45.2],[-73.9,45.38],[-73.55,45.52],[-73.3,45.8],[-73.1,46.04],[-72.85,46.2],[-72.55,46.34],[-72.1,46.52],[-71.6,46.68],[-71.2,46.81]];
const SL_MID=[[-71.2,46.81],[-70.9,46.97],[-70.5,47.22],[-70.05,47.55],[-69.72,47.95]];
const OTTAWA=[[-73.95,45.47],[-74.4,45.55],[-74.95,45.63],[-75.7,45.43],[-76.35,45.45],[-76.8,45.6],[-77.1,45.86],[-77.8,46.05],[-78.7,46.32]];
const MATTAWA=[[-78.7,46.32],[-79.2,46.33],[-79.6,46.28]];
const FRENCHR=[[-80.05,46.12],[-80.3,46.05],[-80.6,45.96]];
const RICHELIEU=[[-73.1,46.04],[-73.2,45.6],[-73.27,45.3],[-73.35,45.02]];
const LCHAMPLAIN=[[-73.35,45.02],[-73.3,44.7],[-73.3,44.3],[-73.42,43.85],[-73.4,43.6]];
const HUDSON=[[-73.6,43.45],[-73.68,43.1],[-73.75,42.6]];
const MOHAWK=[[-73.72,42.79],[-74.2,42.9],[-74.9,43.0],[-75.4,43.2]];
const SAGUENAY=[[-69.72,48.14],[-70.4,48.3],[-71.06,48.43],[-71.7,48.52]];
const STMAURICE=[[-72.55,46.35],[-72.68,46.8],[-72.85,47.3],[-73.1,47.7]];
const CANOE_FULL=[[-79.75,44.62],[-79.92,44.85],[-80.05,45.35],[-80.4,45.8],[-80.6,45.96],[-80.25,46.06],[-79.85,46.22],[-79.2,46.33],[-78.7,46.32],[-77.8,46.05],[-77.1,45.86],[-76.4,45.47],[-75.7,45.43],[-74.95,45.63],[-74.4,45.55],[-73.6,45.5],[-73.1,46.04],[-72.55,46.34],[-71.9,46.6],[-71.25,46.8]];
const CANOE_ALG=CANOE_FULL.slice(10);
const SHIP_PATH=[[-64.0,49.45],[-66.0,49.4],[-68.0,48.9],[-69.4,48.1],[-70.4,47.35],[-70.9,46.98],[-71.18,46.83]];
const PLACES={
 quebec:{ll:[-71.21,46.81],name:{fr:'Québec',en:'Québec'},dx:-9,dy:2,anchor:'end'},
 tadoussac:{ll:[-69.72,48.14],name:{fr:'Tadoussac',en:'Tadoussac'},dx:6,dy:-4,post:true},
 troisRivieres:{ll:[-72.55,46.35],name:{fr:'Trois-Rivières',en:'Trois-Rivières'},dx:-6,dy:-7,anchor:'end'},
 villeMarie:{ll:[-73.56,45.5],name:{fr:'Ville-Marie',en:'Ville-Marie'},dx:-6,dy:12,anchor:'end'},
 orleans:{ll:[-70.92,46.95],name:{fr:"Île d'Orléans",en:"Île d'Orléans"},dx:6,dy:12},
 refuge:{ll:[-71.3,46.9],name:{fr:'Wendats réfugiés',en:'Wendat refugees'},dx:-6,dy:-8,anchor:'end',post:true},
 huronia:{ll:[-79.85,44.66],name:{fr:'Sainte-Marie',en:'Sainte-Marie'},dx:6,dy:12,post:true},
 fortOrange:{ll:[-73.75,42.72],name:{fr:'Fort Orange (Hollandais)',en:'Fort Orange (Dutch)'},dx:6,dy:-4,foreign:true},
 beauport:{ll:[-71.08,46.88],name:{fr:'Beauport',en:'Beauport'},dx:8,dy:-6},
 allumette:{ll:[-77.1,45.88]}, west:{ll:[-81.6,46.15]}, gahoendoe:{ll:[-80.25,44.85]},
 fortRichelieu:{ll:[-73.12,46.06],name:{fr:'Fort Richelieu',en:'Fort Richelieu'},names:[[1665,{fr:'Fort Richelieu (de Saurel)',en:'Fort Richelieu (Saurel’s)'}]],hideIf:'sorel',dx:6,dy:12,post:true}, onondaga:{ll:[-76.1,43.05]},
 champlainLake:{ll:[-73.42,43.85]}, longSault:{ll:[-74.45,45.58]}, gulf:{ll:[-66.5,49.4]}
};
const NATIONS=[
 {id:'innu',ll:[-69.5,48.95],rx:90,ry:34,name:{fr:'Innus',en:'Innu'},sub:{fr:'« Montagnais »',en:'"Montagnais"'},rel:'rAlg'},
 {id:'alg',ll:[-76.6,46.25],rx:120,ry:42,name:{fr:'Algonquins',en:'Algonquins'},sub:{fr:'Anishinàbeg',en:'Anishinàbeg'},rel:'rAlg'},
 {id:'wen',ll:[-79.55,44.45],rx:46,ry:28,name:{fr:'Wendats',en:'Wendat'},sub:{fr:'« Hurons » — Wendake',en:'"Hurons" — Wendake'},rel:'rWen'},
 {id:'haud',ll:[-75.9,43.05],rx:120,ry:30,name:{fr:'Haudenosaunee',en:'Haudenosaunee'},sub:{fr:'les Cinq-Nations',en:'the Five Nations'},rel:'haud'}
];
function pip(pt,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a[1]>pt[1])!==(b[1]>pt[1]))&&(pt[0]<(b[0]-a[0])*(pt[1]-a[1])/(b[1]-a[1])+a[0]))c=!c;}return c;}
const WATERP=[GULF,ONTARIO,ERIE,HURON].map(poly=>poly.map(a=>P(a[0],a[1])));
function densify(pts,step){const p=pts.map(a=>P(a[0],a[1]));const out=[];for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1];const d=Math.hypot(b[0]-a[0],b[1]-a[1]);const n=Math.max(1,Math.round(d/step));for(let j=0;j<n;j++)out.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n]);}out.push(p[p.length-1]);return out;}
const RIVERLINE=densify(SL_UP.concat(SL_MID.slice(1)),2.2);

