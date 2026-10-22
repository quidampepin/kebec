/* Kebec — Le peuplement sur la carte (périodes III et IV).
   Les terres occupées, francophones et anglophones, s'étendent avec les années :
   les basses terres du Saint-Laurent, puis la Beauce, les Bois-Francs, le Bas-Saint-Laurent, la Gaspésie, l'Outaouais, le Saguenay ;
   côté anglais, le Haut-Canada / l'Ontario, les cantons de l'Est, la vallée de la Châteauguay, Argenteuil, le Pontiac, les loyalistes de la Gaspésie,
   et les quartiers anglais de Montréal et de Québec.
   Repères : Courville, Séguin et Hardy, Atlas historique du Québec ; recensements de 1831, 1851, 1871, 1901. */

/* Ontario peuplé vers 1871 : tout le sud de la province, jusqu'au bord du Bouclier */
const ONT_1871=[[-74.45,45.25],[-74.7,45.02],[-75.6,44.7],[-76.4,44.25],[-77.6,44.0],[-79.4,43.68],[-79.8,43.3],[-79.2,42.9],[-80.4,42.6],[-81.8,42.3],[-82.9,42.05],[-82.45,42.95],[-81.75,43.75],[-81.3,44.45],[-80.95,44.62],[-80.1,44.55],[-79.6,44.8],[-78.8,44.6],[-78.2,44.7],[-77.4,44.62],[-76.6,44.8],[-76.25,45.1],[-76.5,45.45],[-77.15,45.85],[-76.3,45.6],[-75.6,45.48],[-74.6,45.6]];
/* au nord du lac Simcoe et le long des chemins de fer du Nord : Muskoka, Nipissing, Sudbury, la Ceinture d'argile */
const ONT_NORTH=[
 {from:1870,full:1900,w:22,pts:[[-79.6,44.8],[-79.35,45.3],[-79.45,46.3]]},
 {from:1883,full:1910,w:16,pts:[[-79.45,46.3],[-80.3,46.45],[-81.0,46.5],[-82.0,46.25]]},
 {from:1903,full:1925,w:18,pts:[[-79.7,47.3],[-79.85,47.95],[-80.6,48.4],[-81.35,48.47],[-81.4,49.4],[-82.4,49.42]]}];

/* basses terres du Saint-Laurent : les deux rives, de Vaudreuil à Rivière-du-Loup */
const FR_CORE=[[-74.35,45.3],[-74.3,45.5],[-74.0,45.8],[-73.45,46.1],[-72.75,46.55],[-71.95,46.95],[-71.3,47.12],[-70.85,47.3],[-70.45,47.55],[-70.1,47.75],[-69.75,47.55],[-69.4,47.85],[-69.15,47.75],[-69.75,47.35],[-70.4,46.9],[-71.0,46.62],[-71.75,46.4],[-72.5,46.0],[-72.75,45.55],[-73.2,45.15],[-73.75,45.15]];
/* zones : poly (surface) ou line+w (bande le long d'une côte ou d'une vallée). tone fr|en ; from → full : la zone s'épaissit */
const SETTLE=[
 {id:'core',tone:'fr',from:1700,full:1820,poly:FR_CORE},
 {id:'beauce',tone:'fr',from:1770,full:1860,poly:[[-71.15,46.62],[-70.55,46.3],[-70.45,45.9],[-70.85,45.85],[-71.35,46.3]],lab:[-70.85,46.15],n:R('Beauce','Beauce')},
 {id:'boisfrancs',tone:'fr',from:1825,full:1880,poly:[[-72.35,46.2],[-71.55,46.35],[-71.45,45.95],[-72.15,45.85]],lab:[-71.95,46.1],n:R('Bois-Francs','Bois-Francs')},
 {id:'bsl',tone:'fr',from:1780,full:1860,line:[[-69.45,47.85],[-68.95,48.15],[-68.5,48.45],[-67.95,48.7],[-67.45,48.85],[-66.6,49.1]],w:26,lab:[-68.6,48.15],n:R('Bas-Saint-Laurent','Lower St. Lawrence')},
 {id:'temisc',tone:'fr',from:1855,full:1900,line:[[-69.5,47.8],[-69.0,47.6],[-68.75,47.45],[-68.4,47.4]],w:18},
 {id:'gaspN',tone:'fr',from:1800,full:1880,line:[[-66.6,49.1],[-65.6,49.25],[-64.8,49.15],[-64.35,48.95]],w:12,lab:[-65.6,49.05],n:R('Gaspésie','Gaspé coast')},
 {id:'gaspS',tone:'fr',from:1760,full:1840,line:[[-64.35,48.62],[-64.55,48.4],[-65.0,48.22],[-65.5,48.15],[-66.1,48.17],[-66.7,48.12]],w:14,lab:[-65.45,48.25],n:R('Baie des Chaleurs — Acadiens, Loyalistes','Chaleur Bay — Acadians, Loyalists'),sz:8},
 {id:'charlevoix',tone:'fr',from:1700,full:1800,line:[[-70.85,47.3],[-70.45,47.5],[-70.1,47.75],[-69.8,47.95]],w:16},
 {id:'saguenay',tone:'fr',from:1838,full:1880,line:[[-69.75,48.15],[-70.4,48.33],[-70.9,48.35],[-71.1,48.42],[-71.6,48.48]],w:16,lab:[-70.8,48.55],n:R('Saguenay','Saguenay')},
 {id:'outaouais',tone:'fr',from:1805,full:1870,line:[[-74.55,45.63],[-74.95,45.6],[-75.25,45.58],[-75.45,45.55],[-75.7,45.45]],w:16,lab:[-75.55,45.82],n:R('Outaouais','Outaouais'),sz:8.5},
 {id:'gatineau',tone:'fr',from:1845,full:1900,line:[[-75.7,45.47],[-75.8,45.8],[-75.95,46.2],[-76.0,46.4]],w:12},
 {id:'hull',tone:'fr',from:1855,full:1890,circle:[-75.72,45.43],r:16},
 /* les anglophones du Québec */
 {id:'townships',tone:'en',from:1792,full:1840,fade:[1851,1911,.35],poly:[[-72.9,45.03],[-71.5,45.03],[-70.9,45.5],[-71.2,46.1],[-72.3,46.2],[-72.95,45.7]],frFrom:1840,frFull:1911},
 {id:'chateauguay',tone:'en',from:1800,full:1830,fade:[1870,1940,.4],poly:[[-74.45,45.05],[-73.85,45.0],[-73.75,45.25],[-74.15,45.32]]},
 {id:'argenteuil',tone:'en',from:1800,full:1830,fade:[1880,1950,.45],circle:[-74.35,45.68],r:13},
 {id:'pontiac',tone:'en',from:1820,full:1860,line:[[-75.85,45.42],[-76.2,45.5],[-76.5,45.55],[-76.9,45.8]],w:16,lab:[-76.45,45.75],n:R('Pontiac','Pontiac'),sz:8.5},
 {id:'wright',tone:'en',from:1800,full:1825,fade:[1850,1890,.3],circle:[-75.8,45.4],r:13},
 {id:'loyalG',tone:'en',from:1784,full:1810,circle:[-65.33,48.1],r:12},
 {id:'loyalG2',tone:'en',from:1784,full:1810,circle:[-64.45,48.8],r:11},
 {id:'mtlEn',tone:'en',from:1790,full:1840,fade:[1871,1931,.6],circle:[-73.6,45.5],r:13},
 {id:'qcEn',tone:'en',from:1790,full:1830,fade:[1861,1911,.25],circle:[-71.22,46.8],r:9}];

/* nombre d'anglophones dans la province, d'après les recensements (pour moduler les zones anglaises) */
const HIST_ANG=[[1765,600],[1791,12000],[1831,105000],[1851,190000],[1871,270000],[1901,340000],[1931,620000],[1961,1000000]];
function histAng(y){for(let i=0;i<HIST_ANG.length-1;i++){const[a,pa]=HIST_ANG[i],[b,pb]=HIST_ANG[i+1];if(y>=a&&y<=b)return pa+(pb-pa)*(y-a)/(b-a);}return y<1765?600:1000000;}
const ramp=(y,a,b)=>clamp((y-a)/Math.max(1,b-a),0,1);

function settleLayer(k){
  if(S.period<3)return '';
  const y=S.year,F=lang==='fr';let h='',labs='';
  const frRatio=clamp(S.pop/Math.max(1,histPop(y)),.4,1.4),enRatio=clamp((S.ang||0)/Math.max(1,histAng(y)),.3,1.6);
  const canad=S.flags&&S.flags.cantonsCanadiens;
  const draw=(z,tone,op)=>{if(op<.02)return;const cls=tone==='fr'?'friend':'eng';const st=`style="opacity:${op.toFixed(2)}"`;
    if(z.poly)h+=`<path d="${polyD(z.poly)}" class="terr ${cls}" filter="url(#wash)" ${st}/>`;
    else if(z.line)h+=`<path d="${lineD(z.line)}" class="settle ${cls}" fill="none" stroke-width="${(z.w*1.7*k).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" filter="url(#washl)" ${st}/>`;
    else if(z.circle){const[x,yy]=P(z.circle[0],z.circle[1]);h+=`<circle cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" r="${(z.r*k).toFixed(1)}" class="terr ${cls}" filter="url(#washl)" ${st}/>`;}};
  /* l'Ontario */
  const ucN=S.period===3?(S.uc||0):1600000+Math.max(0,y-1871)*28000;
  if(ucN>=350000){h+=`<path d="${polyD(ONT_1871)}" class="terr eng" filter="url(#wash)" style="opacity:${(.18+.2*ramp(ucN,350000,1600000)).toFixed(2)}"/>`;
    for(const z of ONT_NORTH){const g=ramp(y,z.from,z.full);if(g>0)h+=`<path d="${lineD(z.pts)}" class="settle eng" fill="none" stroke-width="${(z.w*k*(.4+.6*g)).toFixed(1)}" stroke-linecap="round" filter="url(#wash)" style="opacity:${(.3*g).toFixed(2)}"/>`;}}
  /* les zones du Québec */
  for(const z of SETTLE){if(y<z.from)continue;let g=ramp(y,z.from,z.full);
    if(z.tone==='fr'){draw(z,'fr',(z.line?1.5:1)*(.12+.2*g)*Math.min(1,frRatio));}
    else{let op=(.1+.22*g)*enRatio;if(z.fade)op*=1-(1-z.fade[2])*ramp(y,z.fade[0],z.fade[1]);
      if(z.id==='townships'&&canad)op*=.4;draw(z,'en',op);
      if(z.frFrom&&y>=z.frFrom)draw(z,'fr',(.06+.2*ramp(y,z.frFrom,z.frFull)+(canad?.12:0))*Math.min(1,frRatio));}
    if(z.n&&curK<.8&&curK>.3&&g>.3)labs+=(()=>{const[x,yy]=P(z.lab[0],z.lab[1]);return `<text class="nsub settlel ${z.tone}" x="${x}" y="${yy}" font-size="${(z.sz||9)*k}" text-anchor="middle">${L(z.n)}</text>`;})();}
  return `<g mask="url(#landonly)">${h}</g>${labs}`;
}
