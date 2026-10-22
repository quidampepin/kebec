/* Kebec — Les territoires. Au départ, presque tout le pays appartient aux nations autochtones ;
   la colonie française (autour de ses établissements) et les colonies anglaises (depuis la côte) le grignotent avec le temps.
   Contours approximatifs, d'après les cartes de l'Atlas historique du Canada (vers 1600–1650). [lon, lat] */
const TERR_POLY={
 innu:[[-76,51.2],[-74,53.6],[-70,54.6],[-65,55.4],[-61,55.2],[-57.2,53.6],[-56.6,51.5],[-59.5,50.2],[-64,50.0],[-67,49.2],[-69.4,48.2],[-70.6,47.4],[-71.8,47.1],[-73.2,47.9],[-74.8,49.2]],
 alg:[[-81.5,48.9],[-79,49.6],[-76,50.4],[-74.6,49.0],[-73.2,47.7],[-72.6,46.7],[-73.4,45.9],[-74.6,45.4],[-76.6,44.9],[-78.6,45.2],[-80.0,45.8],[-81.0,46.7]],
 wen:[[-80.9,45.1],[-79.2,45.2],[-78.6,44.4],[-79.4,43.7],[-80.6,44.0]],
 agnier:[[-75.5,41.9],[-75.4,44.4],[-74.3,45.05],[-73.3,45.0],[-73.2,43.4],[-73.7,42.2]],
 onon:[[-79.8,41.7],[-79.4,43.25],[-77.6,43.35],[-76.2,43.95],[-75.5,44.4],[-75.6,41.9],[-77.6,41.4]],
 abenaki:[[-73.2,45.1],[-71.5,46.3],[-70.0,46.9],[-68.4,47.6],[-67.6,46.3],[-67.4,44.8],[-69.2,43.9],[-70.7,43.1],[-72.2,42.7],[-73.2,42.9]],
 ouest:[[-90,48.6],[-86,49.2],[-82,48.6],[-81.2,47.0],[-80.9,46.2],[-81.8,45.4],[-83.2,43.4],[-84.0,41.6],[-87.2,41.5],[-88.2,43.5],[-89.6,46.4]],
 renards:[[-89.6,45.2],[-87.6,45.4],[-86.6,44.2],[-87.3,42.4],[-89.6,42.3]],
 mikmaq:[[-66.8,49.2],[-64.2,49.2],[-64.0,47.9],[-61.4,46.6],[-59.6,46.1],[-61,45.0],[-64,43.5],[-66.2,44.1],[-66.6,45.4],[-67.5,47.2]]};
/* population des colonies anglaises et hollandaises avant 1663 (ordre de grandeur, Historical Statistics of the United States) */
function engPopAll(y){if(y>=1663)return engPop(y);const pts=[[1607,100],[1620,2300],[1630,4600],[1640,26600],[1650,50400],[1660,75000],[1663,90000]];
  for(let i=0;i<pts.length-1;i++){const[a,pa]=pts[i],[b,pb]=pts[i+1];if(y<=b)return pa*Math.pow(pb/pa,(y-a)/(b-a));}return 100;}
const ENG_COAST=[[-68.6,44.3],[-70.2,43.6],[-70.7,42.6],[-70.0,41.8],[-71.4,41.4],[-72.9,41.2],[-73.9,40.6],[-74.2,39.6],[-75.2,38.8],[-76.2,37.2]];
function engZone(s){
  const pop=s.eng||engPopAll(s.year);const d=clamp(.15+.55*Math.log10(Math.max(1,pop)/1500),0,1.8);
  if(s.year<1620)return null;
  const inland=ENG_COAST.map(([lo,la])=>[lo-d*.85,la+d*.55]).reverse();
  let poly=ENG_COAST.concat(inland);
  return {poly,pop,d};
}
function polyD(pts){return 'M'+pts.map(p=>{const q=P(p[0],p[1]);return q[0].toFixed(1)+','+q[1].toFixed(1);}).join('L')+'Z';}
function centroid(pts){let x=0,y=0;for(const p of pts){x+=p[0];y+=p[1];}return [x/pts.length,y/pts.length];}
function scalePoly(pts,f){const c=centroid(pts);return pts.map(p=>[c[0]+(p[0]-c[0])*f,c[1]+(p[1]-c[1])*f]);}
function territorySVG(k){
  const B=BASEMAP.continent;
  const pp=placePops(S);let holes='';
  for(const key in PLACES){const pl=PLACES[key];if(!S.places[key]||pl.foreign||(pl.until&&S.year>=pl.until))continue;const[x,y]=P(pl.ll[0],pl.ll[1]);
    const pop=pp[key]?pp[key].pop:0;const r=pl.post?6:6+Math.sqrt(pop)*.8;holes+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`;}
  const ez=engZone(S);if(ez)holes+=`<path d="${polyD(ez.poly)}"/>`;
  if(S.flags.albany||S.year>=1664)holes+=`<path d="${polyD([[-74.1,40.7],[-73.4,41.2],[-73.4,42.9],[-74.1,42.9],[-74.3,41.2]])}"/>`;
  let h=`<defs><mask id="natmask" maskUnits="userSpaceOnUse" x="-900" y="-1400" width="3200" height="3400"><image href="${B.src.replace('base-','land-').replace('.jpg','.png')}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" preserveAspectRatio="none"/><g fill="#000" filter="url(#soft)">${holes}</g></mask>
   <mask id="landonly" maskUnits="userSpaceOnUse" x="-900" y="-1400" width="3200" height="3400"><image href="${B.src.replace('base-','land-').replace('.jpg','.png')}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" preserveAspectRatio="none"/></mask>
   <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${(6*k).toFixed(1)}"/></filter></defs>`;
  h+=`<g mask="url(#natmask)"><g filter="url(#wash)">`;
  let edges='';for(const n of GG(S)){let pts=TERR_POLY[n.id];if(!pts)continue;const tone=natTone(n);
    const mv=natMove(n);
    if(n.id==='wen'&&S.wenFallen&&!mv)pts=scalePoly(pts,.35);
    if(mv){const c=centroid(pts),to=mv.ll,f=n.id==='abenaki'?.32:n.id==='wen'?.12:.18;pts=pts.map(p=>[to[0]+(p[0]-c[0])*f,to[1]+(p[1]-c[1])*f]);}
    let sc=Math.min(1,.86+((S.str&&S.str[n.id])||60)/450);
    if(S.period>=3){const f=clamp((S.year-1760)/107,0,1);sc*=['innu','alg'].includes(n.id)?1-.3*clamp((S.year-1830)/37,0,1):1-.5*f;}
    pts=scalePoly(pts,sc);
    h+=`<path d="${polyD(pts)}" class="terr ${tone}"/>`;edges+=`<path d="${polyD(pts)}" class="tedge ${tone}" stroke-width="${(1.2*k).toFixed(2)}" stroke-dasharray="${(5*k).toFixed(1)} ${(3*k).toFixed(1)}"/>`;}
  h+=`<path d="${polyD(TERR_POLY.mikmaq)}" class="terr other"/>`;
  h+=`</g>${edges}</g>`;
  if(ez)h+=`<g mask="url(#landonly)"><path d="${polyD(ez.poly)}" class="terr eng" filter="url(#wash)"/></g>`;
  if(ez&&k>.45){const[x,y]=P(-71.6,42.05);const usL=S.period>=3&&S.year>=1776;h+=`<text class="nlabel eng" x="${x}" y="${y}" font-size="${(usL?15:12)*k}" text-anchor="middle">${usL?(lang==='fr'?'États-Unis':'United States'):(lang==='fr'?'Nouvelle-Angleterre':'New England')}</text><text class="nsub" x="${x}" y="${y+12*k}" font-size="${9*k}" text-anchor="middle">${nf(Math.round(ez.pop/1000)*1000,lang)} ${S.period>=3&&S.year>=1776?(lang==='fr'?'habitants':'inhabitants'):(lang==='fr'?'colons':'settlers')}</text>`;}
  if(S.period>=3&&typeof settleLayer==='function')h+=settleLayer(k);
  if(S.period===3)h+=p3Layer(k);
  if(S.period>=4)h+=p4Layer(k);
  if(S.period===5&&typeof p5Layer==='function')h+=p5Layer(k);
  if(typeof acadLayer==='function')h+=acadLayer(k);
  {const[x,y]=P(-65.4,47.7);if(k>.45)h+=`<text class="nlabel" x="${x}" y="${y}" font-size="${16*k}" text-anchor="middle">Mi'kmaq</text><text class="nsub" x="${x}" y="${y+12*k}" font-size="${9*k}" text-anchor="middle">Mi'kma'ki</text>`;}
  return h;
}

/* ---- période III : frontières, Haut-Canada, cantons ---- */
const BORDER_US=[[-67.8,47.1],[-69.2,47.45],[-70.0,46.4],[-70.3,45.9],[-71.1,45.25],[-71.5,45.01],[-74.7,45.0],[-75.3,44.85],[-76.4,44.1],[-77.5,43.75],[-79.1,43.45],[-79.05,43.15],[-79.0,42.85],[-81,42.3],[-82.9,42.0],[-83.1,42.3],[-82.5,42.6],[-82.4,43.0],[-82.2,44.2],[-82.7,45.3],[-83.6,45.9],[-84.1,46.5]];
const BORDER_1763=[[-64.2,50.25],[-72.5,48.6],[-79.4,46.3],[-74.7,45.0],[-71.5,45.0],[-70.2,45.9],[-69.2,47.45],[-67.0,48.0],[-64.6,48.1]];
const BORDER_LCUC=[[-74.35,45.25],[-74.5,45.55],[-75.0,45.6],[-75.7,45.45],[-76.5,45.5],[-77.2,45.9],[-78.0,46.2],[-79.5,46.6],[-79.5,47.5],[-79.5,50]];
const UC_COAST=[[-74.6,45.05],[-75.6,44.7],[-76.4,44.25],[-77.6,44.0],[-79.4,43.68],[-79.8,43.3],[-79.2,42.9],[-80.4,42.6],[-81.8,42.3],[-82.9,42.05]];
const TOWNSHIPS=[[-72.9,45.03],[-71.5,45.03],[-70.9,45.5],[-71.2,46.1],[-72.3,46.2],[-72.95,45.7]];
function lineD(pts){return 'M'+pts.map(p=>{const q=P(p[0],p[1]);return q[0].toFixed(1)+','+q[1].toFixed(1);}).join('L');}
function p3Layer(k){
  const y=S.year,F=lang==='fr';let h='';
  const lab=(ll,txt,sz,cls)=>{const[x,yy]=P(ll[0],ll[1]);return `<text class="${cls||'plabel3'}" x="${x}" y="${yy}" font-size="${sz*k}" text-anchor="middle">${txt}</text>`;};
  /* Haut-Canada : une bande de colonisation anglophone qui s'élargit */
  if(S.uc>0&&S.uc<350000){const d=clamp(.1+.32*Math.log10(Math.max(1,S.uc)/5000),.08,1.1);const inland=UC_COAST.map(([lo,la])=>[lo-d*.2,la+d*.65]).reverse();
    h+=`<g mask="url(#landonly)"><path d="${polyD(UC_COAST.concat(inland))}" class="terr eng" filter="url(#wash)" opacity=".8"/></g>`;}
  /* les cantons de l'Est */
  if(y>=1792){
    if(curK<.9)h+=lab([-71.95,45.62],F?'Cantons de l’Est':'Eastern Townships',10,'nsub');}
  /* frontières */
  if(y<1775)h+=`<path d="${lineD(BORDER_1763)}" class="border b1763" stroke-width="${1.6*k}" stroke-dasharray="${6*k} ${4*k}"/>`;
  if(y>=1783)h+=`<path d="${lineD(BORDER_US)}" class="border bus" stroke-width="${1.8*k}" stroke-dasharray="${8*k} ${3*k} ${2*k} ${3*k}"/>`;
  if(y>=1791)h+=`<path d="${lineD(BORDER_LCUC)}" class="border blc" stroke-width="${1.4*k}" stroke-dasharray="${5*k} ${4*k}"/>`;
  /* noms des provinces */
  if(curK>.45){
    if(y<1791)h+=lab([-72.9,48.05],F?'Province de Québec':'Province of Quebec',15,'prov3');
    else if(y<1841){h+=lab([-73.0,48.0],F?'Bas-Canada':'Lower Canada',16,'prov3');h+=lab([-79.0,44.75],F?'Haut-Canada':'Upper Canada',14,'prov3 eng');}
    else{h+=lab([-73.0,48.0],F?'Canada-Est':'Canada East',16,'prov3');h+=lab([-79.0,44.75],F?'Canada-Ouest':'Canada West',14,'prov3 eng');}
    if(y>=1774&&y<1783)h+=lab([-82.5,41.6],F?'Pays d’en Haut annexé au Québec (1774)':'Interior annexed to Quebec (1774)',10,'nsub');
    if(S.uc>0&&curK<1.2)h+=lab([-78.6,44.45],`${nf(Math.round(S.uc/1000)*1000,lang)} ${F?'habitants':'inhabitants'}`,9,'nsub');}
  return h;
}
/* ---- période IV : la province, ses régions de colonisation, ses chemins de fer, ses barrages, sa diaspora ---- */
const BORDER_QNB=[[-67.8,47.1],[-67.6,47.6],[-66.9,47.95],[-66.3,48.0],[-65.2,48.05],[-64.6,48.1]];
const RAIL4=[
 {y:1856,pts:[[-73.56,45.5],[-74.7,45.03],[-75.9,44.6],[-76.48,44.23],[-79.38,43.65]]},          /* Grand Tronc, Montréal–Toronto */
 {y:1856,pts:[[-71.21,46.81],[-71.9,46.3],[-72.5,45.85],[-73.56,45.5]]},                          /* Lévis–Richmond–Montréal */
 {y:1856,pts:[[-73.0,45.55],[-71.89,45.4],[-71.0,45.0],[-70.25,43.66]]},                          /* vers Portland */
 {y:1876,pts:[[-71.21,46.81],[-70.4,47.1],[-69.53,47.83],[-68.52,48.45],[-67.6,48.55],[-67.15,48.45],[-66.6,48.05],[-65.8,47.6]]}, /* Intercolonial */
 {y:1876,pts:[[-73.56,45.5],[-74.0,45.78]]},                                                       /* chemin de fer du Nord */
 {y:1879,pts:[[-73.56,45.5],[-72.55,46.35],[-71.21,46.81]]},                                       /* rive nord */
 {y:1886,pts:[[-73.56,45.5],[-74.6,45.55],[-75.7,45.42],[-77.1,45.83],[-79.47,46.31],[-81.0,46.49],[-84.5,46.5]]}, /* Canadien Pacifique */
 {y:1888,pts:[[-71.21,46.81],[-71.8,47.6],[-72.0,48.2],[-72.23,48.52],[-71.65,48.55],[-71.06,48.43]]}, /* Québec–Lac-Saint-Jean */
 {y:1909,pts:[[-74.0,45.78],[-74.6,46.2],[-75.5,46.55]]},                                         /* jusqu'à Mont-Laurier */
 {y:1913,pts:[[-71.21,46.81],[-72.78,47.43],[-74.4,47.95],[-76.5,48.4],[-78.12,48.57],[-79.5,48.6]]}, /* Transcontinental */
 {y:1954,pts:[[-66.38,50.21],[-66.5,51.2],[-66.8,52.4]]}];                                       /* QNS&L vers le fer */
const DAMS4=[{y:1903,ll:[-72.77,46.53],n:'Shawinigan'},{y:1926,ll:[-71.65,48.6],n:'Isle-Maligne'},{y:1932,ll:[-73.92,45.3],n:'Beauharnois'},{y:1956,ll:[-69.1,49.15],n:'Bersimis'}];
const DIAS4={lowell:.22,manchesterNH:.18,fallRiver:.2,woonsocket:.14,lewiston:.1};
function p4Layer(k){
  const y=S.year,F=lang==='fr';let h='';
  const lab=(ll,txt,sz,cls,anchor)=>{const[x,yy]=P(ll[0],ll[1]);return `<text class="${cls||'nsub'}" x="${x}" y="${yy}" font-size="${sz*k}" text-anchor="${anchor||'middle'}">${txt}</text>`;};
  /* l'Ontario : une province anglaise qui se peuple */
  /* (l'Ontario et les zones de peuplement : settle.js) */
  if(curK<.9)h+=lab([-71.95,45.62],F?'Cantons de l’Est':'Eastern Townships',10,'nsub');
  /* les régions de colonisation ouvertes */
  for(const R4 of REGIONS4){if(!S.regions||!S.regions[R4.id])continue;h+=`<path d="${polyD(R4.pts)}" class="terr friend" filter="url(#wash)" opacity=".55"/>`;
    if(curK<.95)h+=lab(R4.lab,L(R4.name),9.5,'nsub');}
  if(!S.regions||!S.regions.abitibi){if(curK<.95&&y>=1898)h+=lab([-78.2,48.75],F?'Abitibi : terres à ouvrir':'Abitibi: land to open',9,'nsub');}
  /* les chemins de fer */
  for(const r of RAIL4)if(y>=r.y)h+=`<path d="${lineD(r.pts)}" class="rail4" stroke-width="${1.6*k}"/><path d="${lineD(r.pts)}" class="rail4t" stroke-width="${3.6*k}" stroke-dasharray="${.8*k} ${4*k}"/>`;
  /* les barrages */
  for(const d of DAMS4)if(y>=d.y){const[x,yy]=P(d.ll[0],d.ll[1]);h+=`<g class="dam4" transform="translate(${x},${yy}) scale(${k})"><path d="M-5,3 L0,-5 L5,3Z"/><path d="M-3,1 h6" class="z"/></g>`;if(curK<.7)h+=lab([d.ll[0]+.15,d.ll[1]-.12],d.n,8,'nsub','start');}
  /* frontières */
  h+=`<path d="${lineD(BORDER_US)}" class="border bus" stroke-width="${1.8*k}" stroke-dasharray="${8*k} ${3*k} ${2*k} ${3*k}"/>`;
  h+=`<path d="${lineD(BORDER_LCUC)}" class="border blc" stroke-width="${1.6*k}" stroke-dasharray="${5*k} ${4*k}"/>`;
  h+=`<path d="${lineD(BORDER_QNB)}" class="border blc" stroke-width="${1.4*k}" stroke-dasharray="${5*k} ${4*k}"/>`;
  /* le Nord : la province s'agrandit (1898, 1912) ; le Labrador est tranché en 1927 */
  {const dash=`stroke-dasharray="${5*k} ${4*k}"`;h+=`<path d="${lineD([[-79.52,47.6],[-79.52,51.4]])}" class="border blc" stroke-width="${1.4*k}" ${dash}/>`;
   if(y<1898)h+=`<path d="${lineD([[-79.52,51.4],[-75,50.9],[-71,50.6],[-66.5,50.6]])}" class="border blc" stroke-width="${1.4*k}" ${dash}/>`;
   else if(y<1912)h+=`<path d="${lineD([[-78.9,52.25],[-76,52.2],[-72.5,52.6],[-67.0,52.5],[-64.0,52.0]])}" class="border blc" stroke-width="${1.4*k}" ${dash}/>`;
   const LAB=y>=1927?[[-57.1,51.45],[-63.8,52.0],[-64.3,53.3],[-66.9,52.9],[-67.3,54.6],[-67.0,55.1],[-66.7,55.9],[-67.6,58.3],[-64.5,60.3]]:[[-57.1,51.45],[-60.5,52.3],[-61.8,54.2],[-63.3,56.3],[-64.5,60.3]];
   h+=`<path d="${lineD(LAB)}" class="border bus" stroke-width="${1.6*k}" stroke-dasharray="${y>=1927?`${8*k} ${3*k}`:`${2*k} ${4*k}`}"/>`;
   if(curK>.45){if(y>=1912)h+=lab([-72.5,57.0],F?'Nouveau-Québec (1912)':'New Quebec (1912)',13,'prov3');else if(y>=1898)h+=lab([-75.0,51.4],F?'District de l’Abitibi (1898)':'Abitibi district (1898)',10,'nsub');else h+=lab([-74.5,55.5],F?'Terre de Rupert — à Ottawa depuis 1870':'Rupert’s Land — Ottawa’s since 1870',11,'nsub');
    h+=lab([-61.5,53.2],y>=1927?(F?'Labrador (Terre-Neuve, 1927)':'Labrador (Newfoundland, 1927)'):(F?'Labrador — frontière contestée':'Labrador — disputed border'),10,'nsub');}}
  /* noms des provinces */
  if(curK>.45){h+=lab([-72.6,48.0],F?'Québec':'Quebec',17,'prov3');h+=lab([-79.0,44.75],'Ontario',14,'prov3 eng');h+=lab([-66.0,46.75],F?'Nouveau-Brunswick':'New Brunswick',10,'prov3 eng');}
  /* la diaspora */
  if(S.fram>50000){const tot=S.fram;for(const c in DIAS4){const pl=PLACES[c];if(!pl)continue;const[x,yy]=P(pl.ll[0],pl.ll[1]);const r=Math.sqrt(tot*DIAS4[c])/55*k;h+=`<circle class="dias4" cx="${x}" cy="${yy}" r="${r.toFixed(1)}"/>`;}
    if(curK>.45)h+=lab([-68.6,42.75],`${F?'Petits Canadas':'Little Canadas'} · ${nf(Math.round(tot/10000)*10000,lang)} ${F?'Franco-Américains':'Franco-Americans'}`,10,'nsub');}
  if(curK>.45&&S.minor){h+=lab([-65.4,46.35],F?'Acadie':'Acadia',11,'nsub');h+=lab([-80.4,46.95],F?'Franco-Ontariens':'Franco-Ontarians',9.5,'nsub');h+=lab([-83.4,49.35],F?'← Saint-Boniface, les Métis, l’Ouest':'← Saint-Boniface, the Métis, the West',9.5,'nsub','start');}
  return h;
}
