/* Kebec — Les Premières Nations sur la carte, au fil du temps.
   Les nations se déplacent, se dispersent, se regroupent : leurs noms, leurs lieux et leurs communautés changent avec les années.
   Repères : guerres iroquoises (dispersion des Wendats 1649, des Pétuns et Kichesipirinis 1650, des Neutres 1651,
   des Weskarinis 1652, des Ériés 1654–1656) ; missions et villages domiciliés (Kahnawake 1667, Wendake 1697,
   Odanak vers 1700, Wôlinak vers 1708, Kanesatake 1721, Akwesasne 1755) ; réfugiés loyalistes (Tyendinaga et
   rivière Grand, 1784) ; réserves du Bas-Canada et du Québec (loi de 1851 : Kitigan Zibi, Timiskaming ; Mashteuiatsh 1856,
   Pessamit 1861, Uashat 1906, Opitciwan 1944…). */

/* où vit désormais une nation, et sous quel nom on la désigne */
const NATMOVE={
 wen:[{from:1650,cond:s=>s.wenFallen,ll:[-70.75,47.1],sub:R("réfugiés à Québec et à l'île d'Orléans","refugees at Québec and Île d'Orléans")},
      {from:1668,cond:s=>s.wenFallen,ll:[-71.5,47.12],sub:R('Lorette, près de Québec','Lorette, near Québec')},
      {from:1697,cond:s=>s.wenFallen,ll:[-71.55,47.3],sub:R('Wendake (Jeune-Lorette)','Wendake (Jeune-Lorette)')}],
 agnier:[{from:1777,ll:[-74.75,44.9],sub:R('Kahnawake, Akwesasne, Kanesatake, Tyendinaga','Kahnawake, Akwesasne, Kanesatake, Tyendinaga')}],
 onon:[{from:1784,ll:[-80.15,43.1],sub:R('Six-Nations, rivière Grand','Six Nations, Grand River')}],
 abenaki:[{from:1763,ll:[-71.3,46.45],sub:R('Odanak, Wôlinak','Odanak, Wôlinak')}]};
if(typeof PLACES!=='undefined'&&PLACES.refuge)PLACES.refuge.until=1668;
function natMove(n){const st=NATMOVE[n.id];if(!st||!S)return null;let o=null;for(const x of st)if(S.year>=x.from&&(!x.cond||x.cond(S)))o=x;return o;}
function natName(n){const y=S?S.year:1608;
  if(n.id==='agnier'&&y>=1760)return R('Mohawks','Mohawks');
  if(n.id==='onon'&&y>=1760)return R('Haudenosaunee','Haudenosaunee');
  if(n.id==='wen'&&S&&S.wenFallen&&y>=1697)return R('Hurons-Wendats','Huron-Wendat');
  return n.name;}
function natSub(n){const y=S?S.year:1608,m=natMove(n);if(m)return m.sub;
  if(n.id==='wen'&&S&&S.wenFallen)return R('Huronie abandonnée, 1649','Huronia abandoned, 1649');
  if(n.id==='alg')return y<1650?R('Anishinàbeg · Kichesipirinis, Weskarinis, Onontchataronons','Anishinàbeg · Kichesipirini, Weskarini, Onontchataronon'):y<1851?R('Anishinàbeg · chasseurs de l’Outaouais et du Témiscamingue','Anishinàbeg · hunters of the Ottawa and Témiscamingue'):R('Anishinàbeg · Kitigan Zibi, Timiskaming','Anishinàbeg · Kitigan Zibi, Timiskaming');
  if(n.id==='innu')return y<1760?n.sub:y<1856?R('« Montagnais » · Côte-Nord, Lac-Saint-Jean','"Montagnais" · North Shore, Lac-Saint-Jean'):R('« Montagnais » · Mashteuiatsh, Pessamit, Uashat','"Montagnais" · Mashteuiatsh, Pessamit, Uashat');
  if(n.id==='onon'&&y>=1760)return R('Six-Nations, au sud des lacs','Six Nations, south of the lakes');
  if(n.id==='abenaki'&&y>=1700)return R('Wabanaki · et Odanak, Wôlinak','Wabanaki · and Odanak, Wôlinak');
  if(n.id==='ouest'&&y>=1701)return R('Outaouais, Ojibwés, Potawatomis, Wendats de Détroit','Odawa, Ojibwe, Potawatomi, Detroit Wyandot');
  return n.sub;}

/* nations, communautés et lieux de mémoire, nommés quand on zoome. gone = nation dispersée (souvenir) */
const INDIG=[
 {ll:[-73.75,45.35],fr:"Pays d'Hochelaga — déserté avant 1600",en:'Land of Hochelaga — deserted before 1600',from:1600,to:1642,gone:true},
 {ll:[-71.6,46.62],fr:'Stadaconé — Iroquoiens du Saint-Laurent, disparus',en:'Stadacona — St. Lawrence Iroquoians, vanished',from:1600,to:1630,gone:true},
 {ll:[-75.05,45.86],fr:'Weskarinis — la Petite Nation',en:'Weskarini — the "Petite Nation"',from:1600,to:1652},
 {ll:[-75.05,45.86],fr:'Petite-Nation — désertée en 1652',en:'Petite-Nation — deserted in 1652',from:1652,to:1674,gone:true},
 {ll:[-75.05,45.86],fr:'Seigneurie de la Petite-Nation',en:'Petite-Nation seigneury',from:1674,to:1900},
 {ll:[-77.5,45.72],fr:'Kichesipirinis — île aux Allumettes',en:'Kichesipirini — Allumette Island',from:1600,to:1650},
 {ll:[-77.5,45.72],fr:'île aux Allumettes — désertée vers 1650',en:'Allumette Island — deserted about 1650',from:1650,to:1700,gone:true},
 {ll:[-74.9,45.0],fr:'Onontchataronons',en:'Onontchataronon',from:1600,to:1650},
 {ll:[-79.7,46.25],fr:'Nipissingues',en:'Nipissing',from:1600,to:1650},
 {ll:[-79.7,46.25],fr:'Nipissingues — réfugiés au nord, puis revenus',en:'Nipissing — fled north, later returned',from:1650,to:1667,gone:true},
 {ll:[-79.7,46.25],fr:'Nipissingues',en:'Nipissing',from:1667,to:1900},
 {ll:[-80.55,44.45],fr:'Tionontatis — « Pétuns »',en:'Tionontati — "Petun"',from:1600,to:1650},
 {ll:[-80.55,44.45],fr:'Pétuns — dispersés en 1650',en:'Petun — dispersed in 1650',from:1650,to:1680,gone:true},
 {ll:[-80.6,43.15],fr:'Attiwandarons — « Neutres »',en:'Attiwandaron — "Neutrals"',from:1600,to:1651},
 {ll:[-80.6,43.15],fr:'Neutres — dispersés en 1651',en:'Neutrals — dispersed in 1651',from:1651,to:1680,gone:true},
 {ll:[-79.6,42.35],fr:'Ériés — « nation du Chat »',en:'Erie — "Cat Nation"',from:1600,to:1656},
 {ll:[-79.6,42.35],fr:'Ériés — détruits, 1654–1656',en:'Erie — destroyed, 1654–1656',from:1656,to:1690,gone:true},
 {ll:[-73.8,47.6],fr:'Atikamekw — « Attikamègues »',en:'Atikamekw — "Attikamègues"',from:1600,to:1895},
 {ll:[-73.8,47.6],fr:'Atikamekw — Wemotaci, Manawan, Opitciwan',en:'Atikamekw — Wemotaci, Manawan, Opitciwan',from:1895,to:2001},
 {ll:[-67.7,47.05],fr:'Wolastoqiyik — « Malécites »',en:'Wolastoqiyik — "Maliseet"',from:1600,to:2001},
 {ll:[-73.73,45.38],fr:'Kahnawake',en:'Kahnawake',from:1667,to:1760,minor:true,place:'kahnawake'},
 {ll:[-74.16,45.47],fr:'Kanesatake — Mohawks, Algonquins, Nipissingues',en:'Kanesatake — Mohawk, Algonquin, Nipissing',from:1721,to:2001,minor:true,anchor:'end'},
 {ll:[-74.65,45.0],fr:'Akwesasne',en:'Akwesasne',from:1755,to:2001,minor:true},
 {ll:[-72.82,46.07],fr:'Odanak',en:'Odanak',from:1700,to:1763,minor:true},
 {ll:[-72.42,46.33],fr:'Wôlinak',en:'Wôlinak',from:1708,to:1763,minor:true},
 {ll:[-71.36,46.86],fr:'Wendake',en:'Wendake',from:1697,to:1760,minor:true,place:'lorette'},
 {ll:[-83.05,42.25],fr:'Wendats de Détroit (Wyandots)',en:'Detroit Wyandot',from:1701,to:1843,minor:true},
 {ll:[-77.15,44.2],fr:'Tyendinaga — Mohawks loyalistes',en:'Tyendinaga — Loyalist Mohawks',from:1784,to:2001,minor:true},
 {ll:[-75.85,46.2],fr:'Kitigan Zibi',en:'Kitigan Zibi',from:1851,to:2001,minor:true},
 {ll:[-79.2,47.6],fr:'Timiskaming',en:'Timiskaming',from:1851,to:2001,minor:true},
 {ll:[-72.0,48.62],fr:'Mashteuiatsh (Pointe-Bleue)',en:'Mashteuiatsh (Pointe-Bleue)',from:1856,to:2001,minor:true},
 {ll:[-68.75,48.98],fr:'Pessamit (Betsiamites)',en:'Pessamit (Betsiamites)',from:1861,to:2001,minor:true},
 {ll:[-66.7,48.05],fr:'Listuguj (Restigouche)',en:'Listuguj (Restigouche)',from:1853,to:2001,minor:true},
 {ll:[-65.9,48.22],fr:'Gesgapegiag',en:'Gesgapegiag',from:1853,to:2001,minor:true},
 {ll:[-69.5,47.92],fr:'Cacouna — Wolastoqiyik',en:'Cacouna — Wolastoqiyik',from:1891,to:2001,minor:true},
 {ll:[-66.55,50.3],fr:'Uashat',en:'Uashat',from:1906,to:2001,minor:true},
 {ll:[-74.0,48.65],fr:'Opitciwan',en:'Opitciwan',from:1944,to:2001,minor:true}];
function indigLabels(k){const y=S.year;let h='';
  for(const e of INDIG){if(y<e.from||y>=e.to||(e.place&&S.places[e.place]))continue;if(e.minor?k>=.62:k>=.75)continue;
    const[x,yy]=P(e.ll[0],e.ll[1]);h+=`<text class="nsub${e.gone?' ngone':''}" x="${x}" y="${yy}" font-size="${(e.minor?7.5:8.5)*k}" text-anchor="${e.anchor||'middle'}">${lang==='fr'?e.fr:e.en}</text>`;}
  return h;}
