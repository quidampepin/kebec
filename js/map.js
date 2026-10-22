/* Onontio — Carte vivante : papier, encre, lavis, saisons, icônes, animations. */
const svg=document.getElementById('map');
const RM=window.matchMedia('(prefers-reduced-motion: reduce)');
function placePops(s){
  const w={quebec:1,troisRivieres:.22,villeMarie:.3,orleans:.3,beauport:.25,lauzon:.35,beaupre:.4,kamouraska:.3,batiscan:.25,sorel:.2,laprairie:.3,boucherville:.25};
  const act=Object.keys(w).filter(k=>s.places[k]);const tot=act.reduce((a,k)=>a+w[k],0);
  const out={};for(const k of act)out[k]={pop:s.pop*w[k]/tot,cleared:s.cleared*w[k]/tot};return out;
}
const VIEWS={continent:[0,0,990,576],valley:[425,185,262,182]};const VK=.3;const VIEWS2={continent:[-150,-60,1390,810],valley:[425,172,285,198]};
const BASEMAP={continent:{src:'img/map/base-continent.jpg',x:-260,y:-980,w:1910,h:1760},valley:{src:'img/map/base-valley.jpg',x:230,y:40,w:630,h:400}};
function natTone(n){const v=S.rel[n.id];if(n.id==='wen'&&S.wenFallen&&S.year<1697)return 'ash';return v<=-60?'war':v<=-20?'foe':v<20?'wary':v<60?'partner':'friend';}
function natScale(n){if(n.id==='wen')return S.wenFallen?.35:.55+S.wenStr/220;return .7+((S.str&&S.str[n.id])||60)/200;}
const TONE_WORD={friend:R('alliés','allies'),partner:R('partenaires','partners'),wary:R('méfiants','wary'),foe:R('hostiles','hostile'),war:R('en guerre','at war'),ash:R('dispersés','dispersed')};

let staticCache={key:'',html:''};
function mapStatic(k,vb){
  const CL=cartLabel(S);const key=view+lang+vb.map(Math.round).join(',')+CL.join('|');if(staticCache.key===key)return staticCache.html;
  let h=`<defs>
   <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .28  0 0 0 0 .2  0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
   <filter id="wash" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="22"/><feGaussianBlur stdDeviation="5"/></filter><filter id="washl" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/><feGaussianBlur stdDeviation="2.2"/></filter>
   <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3"/></filter>
   <radialGradient id="vign" cx="50%" cy="50%" r="75%"><stop offset="60%" stop-color="#3b2c18" stop-opacity="0"/><stop offset="100%" stop-color="#3b2c18" stop-opacity=".35"/></radialGradient>
   <pattern id="waves" width="26" height="12" patternUnits="userSpaceOnUse"><path d="M0 8 q3.2 -3 6.5 0 t6.5 0" fill="none" stroke="var(--water-ink)" stroke-width=".6" opacity=".45"/></pattern>
  </defs>`;
  h+=`<rect x="-900" y="-1400" width="3200" height="3400" class="land"/>`;
  // painted base map (Natural Earth 10m + relief, rendered by geo/paint.py in the game projection)
  {const B=BASEMAP.continent;h+=`<image href="${B.src}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" preserveAspectRatio="none" class="basemap"/>`;}
  if(view==='valley'){const B=BASEMAP.valley;h+=`<mask id="valfade" maskUnits="userSpaceOnUse" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}"><filter id="vfb" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter><rect x="${B.x+36}" y="${B.y+36}" width="${B.w-72}" height="${B.h-72}" fill="#fff" filter="url(#vfb)"/></mask><image href="${B.src}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" preserveAspectRatio="none" class="basemap" mask="url(#valfade)"/>`;}
  for(let lat=40;lat<=62;lat++){const y=(49.8-lat)*80;h+=`<line x1="-700" x2="1700" y1="${y}" y2="${y}" class="grat" stroke-width="${.5*k}"/>`;}
  for(let lon=-91;lon<=-51;lon+=2){const x=(lon+82)*55;h+=`<line y1="-700" y2="1300" x1="${x}" x2="${x}" class="grat" stroke-width="${.5*k}"/>`;}
  const wl=(ll,txt,size,rot)=>{const[x,y]=P(ll[0],ll[1]);return `<text class="wlabel" x="${x}" y="${y}" font-size="${size*k}" text-anchor="middle" ${rot?`transform="rotate(${rot} ${x} ${y})"`:''}>${L(txt)}</text>`;};
  h+=wl([-82.5,58.2],R('Baie d’Hudson','Hudson Bay'),20,0)+wl([-80.6,53.2],R('Baie James','James Bay'),12,0)+wl([-55.5,55.5],R('Mer du Labrador','Labrador Sea'),17,0)+wl([-55.5,45.2],R('Océan Atlantique','Atlantic Ocean'),20,0)+wl([-56.2,48.9],R('Terre-Neuve','Newfoundland'),13,0)+wl([-62.5,53.6],R('Labrador','Labrador'),14,0)+wl([-71.5,57.2],R('Ungava','Ungava'),15,0)+wl([-66.6,49.62],R('Golfe Saint-Laurent','Gulf of St. Lawrence'),15,-6)+wl([-70.15,47.72],R('Fleuve Saint-Laurent','St. Lawrence River'),12,-38)+wl([-78.1,43.62],R('Lac Ontario','Lake Ontario'),13,-4)
    +wl([-81.0,45.55],R('Mer Douce','Freshwater Sea'),14,0)+wl([-76.6,45.36],R('Rivière des Outaouais','Ottawa River'),10,-8)+wl([-73.0,44.6],R('Rivière des Iroquois','River of the Iroquois'),9,-84)+wl([-80.4,42.7],R('Lac Érié','Lake Erie'),11,-10)+wl([-71.4,48.75],R('Saguenay','Saguenay'),9,-12);
  h+=`<g id="maphud">`;
  // compass rose + cartouche (continent view only)
  if(k>.6){
    const cx=vb[0]+vb[2]-70,cy=vb[1]+vb[3]-80;let rose=`<g class="rose" transform="translate(${cx},${cy})">`;
    for(let i=0;i<8;i++){const a=i*45,l=i%2?16:30;rose+=`<path d="M0,${-l} L4,0 L0,4 L-4,0Z" transform="rotate(${a})" class="${i%2?'rp2':'rp1'}"/>`;}
    rose+=`<circle r="5" class="rc"/><text y="-36" text-anchor="middle" class="rn">N</text><path d="M0,-46 l-3,-5 h6z M-3,-47 q3,-6 6,0" class="fleur"/></g>`;h+=rose;
    const cw=Math.max(230,CL[0].length*13.2+30,CL[1].length*5.9+30);
    h+=`<g class="cart" transform="translate(${vb[0]+22},${vb[1]+vb[3]-96})"><rect x="0" y="0" width="${cw}" height="58" rx="3"/><rect x="4" y="4" width="${cw-8}" height="50" rx="2" class="in"/><text x="${cw/2}" y="26" text-anchor="middle" class="ct">${CL[0]}</text><text x="${cw/2}" y="44" text-anchor="middle" class="cs">${CL[1]}</text></g>`;
  }
  {const px=222*80/111*(view==='valley'?.4:1);const x0=vb[0]+vb[2]-px-(view==='valley'?10:70)*k,y0=vb[1]+vb[3]-14*k;
   h+=`<g class="scale"><line x1="${x0}" x2="${x0+px}" y1="${y0}" y2="${y0}" stroke-width="${1.4*k}"/>${[0,.5,1].map(f=>`<line x1="${x0+px*f}" x2="${x0+px*f}" y1="${y0-3*k}" y2="${y0+3*k}" stroke-width="${k}"/>`).join('')}<text x="${x0+px/2}" y="${y0-6*k}" font-size="${9*k}" text-anchor="middle">${view==='valley'?20:50} ${lang==='fr'?'lieues':'leagues'}</text></g>`;}
  h+=`</g>`;
  staticCache={key,html:h};return h;
}
function settlementIcon(type,x,y,sz){
  const s=sz;
  if(type==='town')return `<g class="icon town" transform="translate(${x},${y}) scale(${s})"><rect x="-7" y="-3" width="14" height="8" class="wall"/><path d="M-7,-3 l3.5,-4 l3.5,4 M0,-3 l3.5,-4 l3.5,4" class="roof"/><path d="M-1,-7 v-8" class="pole"/><path d="M-1,-15 h6 l-2,2 l2,2 h-6z" class="flag"/><rect x="-9" y="5" width="18" height="1.6" class="ground"/></g>`;
  if(type==='village')return `<g class="icon village" transform="translate(${x},${y}) scale(${s})"><rect x="-6" y="-2" width="5" height="5" class="wall"/><path d="M-6.6,-2 l3.1,-3.4 l3.1,3.4" class="roof"/><rect x="1" y="-1" width="5" height="4" class="wall"/><path d="M.4,-1 l3.1,-3 l3.1,3" class="roof"/></g>`;
  if(type==='fort')return `<g class="icon fort" transform="translate(${x},${y}) scale(${s})"><path d="M-6,-4 L0,-7 L6,-4 L6,4 L0,7 L-6,4Z" class="wall"/><path d="M0,-7 v-6 h5 l-1.5,1.5 l1.5,1.5 h-5" class="flag"/></g>`;
  if(type==='mission')return `<g class="icon mission" transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="-2" width="8" height="6" class="wall"/><path d="M-4.6,-2 l4.6,-4 l4.6,4" class="roof"/><path d="M0,-6 v-6 M-2.2,-10 h4.4" class="cross"/></g>`;
  if(type==='refuge')return `<g class="icon refuge" transform="translate(${x},${y}) scale(${s})"><path d="M-6,3 q6,-12 12,0z" class="lodge"/><path d="M-3,3 v-2 h2 v2" class="door"/></g>`;
  return `<g class="icon post" transform="translate(${x},${y}) scale(${s})"><rect x="-4" y="-4" width="8" height="8" class="wall"/><path d="M-4,-4 l-1,-2 M4,-4 l1,-2 M-4,4 l-1,2 M4,4 l1,2" class="pole"/></g>`;
}
function shipGlyph(x,y,k,enemy){return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${k})" class="ship${enemy?' enemy':''}"><path d="M-9,0 L9,0 L6,4 L-6,4Z" class="hull"/><path d="M-1,0 V-14 M4,0 V-10" class="mast"/><path d="M-1,-13 Q4,-9 -1,-4Z M4,-9 Q8,-6 4,-2Z" class="sail"/><path d="M-1,-14 h-4 l1,1.5 l-1,1.5 h4" class="pennant"/></g>`;}
/* ---- caméra : on peut déplacer et zoomer la carte. Le zoom révèle les détails (niveaux de détail). ---- */
let cam=null; /* [x,y,w,h] demandé ; null = vue préréglée */
const WORLD_B=[-260,-980,1910,1760];
function presetCam(){const P2V=S.period>=2;return (P2V?VIEWS2:VIEWS)[view].slice();}
function camRef(){return S.period>=2?1030:990;}
function fitVB(c){const vb=c.slice();const box=svg.parentElement.getBoundingClientRect();const A=box.width/Math.max(1,box.height);
  if(A>vb[2]/vb[3]){const w=vb[3]*A;vb[0]-=(w-vb[2])/2;vb[2]=w;}else{const hh=vb[2]/A;const extra=hh-vb[3];vb[1]-=extra*.35;vb[3]=hh;}return vb;}
function clampCam(c){const maxW=WORLD_B[2]*.98;let[x,y,w,h]=c;const r=h/w;w=clamp(w,140,maxW);h=w*r;
  x=clamp(x,WORLD_B[0],WORLD_B[0]+WORLD_B[2]-w);y=clamp(y,WORLD_B[1],WORLD_B[1]+WORLD_B[3]-h);return[x,y,w,h];}
let curK=1,curVB=[0,0,990,576];
function zoomLevel(){return curK;} /* < .6 : détails ; > 1.1 : vue d'ensemble */
/* période III : où vivent désormais les nations proches de la vallée */
const NAT3={wen:{from:1760,ll:[-71.55,47.3],sub:R('Wendake (Lorette)','Wendake (Lorette)')},agnier:{from:1760,ll:[-74.75,44.9],sub:R('Kahnawake, Akwesasne, Kanesatake','Kahnawake, Akwesasne, Kanesatake')},
 onon:{from:1784,ll:[-80.15,43.1],sub:R('Six-Nations, rivière Grand','Six Nations, Grand River')},abenaki:{from:1800,ll:[-71.3,46.45],sub:R('Odanak, Wôlinak','Odanak, Wôlinak')}};
const plName=pl=>{if(pl.names){let n=pl.name;for(const[y,x]of pl.names)if(S.year>=y)n=x;return n;}return (S.period>=4&&pl.n4)?pl.n4:(S.period>=3&&pl.n3)?pl.n3:pl.name;};
/* un lieu peut n'exister que par périodes (fort abandonné puis rebâti) ou céder la place à la ville née autour de lui */
const plHidden=(key,pl)=>(pl.until&&S.year>=pl.until)||(pl.show&&!pl.show.some(([a,b])=>S.year>=a&&S.year<b))||(pl.hideIf&&S.places[pl.hideIf]);
function natLL(n){const o=natMove(n);return o?o.ll:n.ll;}
const MAJOR=new Set(['quebec','troisRivieres','villeMarie','tadoussac','fortFrontenac','detroit','michilimakinac','louisbourg','niagara','huronia','portRoyal']);
function drawMap(){
  const c=cam||presetCam();const k=clamp(c[2]/camRef(),.22,1.5);curK=k;
  view=k<.5?'valley':'continent';
  const vb=fitVB(c);curVB=vb;
  svg.setAttribute('viewBox',vb.map(v=>v.toFixed(1)).join(' '));svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  let h=mapStatic(k,vb);
  // nations as watercolour washes
  h+=territorySVG(k);
  for(const n of GG(S)){const ll=natLL(n);const[x,y]=P(ll[0],ll[1]);const tone=natTone(n);let sub=L(n.sub);
    sub=L(natSub(n));
    const det=k<.85; /* sous-titre (nom propre de la nation) seulement quand on zoome */
    const rel3=!!natMove(n);
    if(rel3&&k>.75)continue; /* communautés proches de la vallée : nommées seulement quand on zoome */
    h+=`<text class="nlabel" x="${x}" y="${y}" font-size="${(rel3?12:16)*k}" text-anchor="middle">${L(natName(n))}</text><text class="nsub" x="${x}" y="${y+15*k}" font-size="${11*k}" text-anchor="middle">${det?sub+' · ':''}<tspan class="tone ${tone}">${L(TONE_WORD[tone])}</tspan></text>`;}
  h+=indigLabels(k);
  // routes
  const route=S.wenFallen?CANOE_ALG:CANOE_FULL;
  if(S.period>=4)h+=`<path id="canoePath" d="${smooth(route)}" fill="none" stroke="none"/>`;else h+=`<path id="canoePath" class="route${S.haud>60?' danger':''}" d="${smooth(route)}" stroke-width="${1.8*k}"/>`;
  h+=`<path id="shipPath" d="${smooth(SHIP_PATH)}" fill="none" stroke="none"/>`;
  const nC=S.flags.occupied||S.period>=4?0:clamp(Math.round(S.furs/5),0,14);
  for(let i=0;i<nC;i++)h+=`<g class="canoe" data-i="${i}" data-n="${nC}"><path d="M-4,0 q4,2.2 8,0 q-4,1 -8,0z" transform="scale(${k*1.1})"/></g>`;
  // terroir: seigneuries en rangs le long des rives
  const pp=placePops(S);
  h+=terroirSVG(S,k);
  // settlements
  for(const key in PLACES){const pl=PLACES[key];if(!pl.name||!S.places[key]||plHidden(key,pl))continue;const[x,y]=P(pl.ll[0],pl.ll[1]);
    const pop=pp[key]?pp[key].pop:0;
    if(pl.foreign){h+=settlementIcon('post',x,y,.8*k)+`<text class="pforeign" x="${x+pl.dx*k}" y="${y+pl.dy*k}" font-size="${9*k}">${L(plName(pl))}</text>`;continue;}
    const type=pl.type||(key==='louisbourg'?'fort':key==='quebec'?'town':key==='fortRichelieu'||pl.fort?'fort':key==='huronia'?'mission':key==='refuge'?'refuge':pl.post?'post':'village');
    const small=!MAJOR.has(key)&&k>=.62;
    const sz=(small?.72:1)*(type==='town'?clamp(.9+Math.sqrt(pop)*.035,1,2.1):type==='village'?clamp(.8+Math.sqrt(pop)*.04,.9,1.8):1)*k;
    h+=`<g class="place" data-place="${key}"><title>${L(plName(pl))}${pop?' — '+Math.round(pop):''}</title>${settlementIcon(type,x,y,sz)}</g>`;
    const rank=MAJOR.has(key)?1:2;const showL=rank===1||k<.62,showC=k<.62||(rank===1&&k<.95&&key==='quebec');
    if(showL)h+=`<text class="plabel" x="${x+pl.dx*k}" y="${y+pl.dy*k}" font-size="${13*k}" text-anchor="${pl.anchor||'start'}">${L(plName(pl))}</text>`;
    if(pop>=1&&showC)h+=`<text class="pcount" x="${x+pl.dx*k}" y="${y+pl.dy*k+11*k}" font-size="${9.5*k}" text-anchor="${pl.anchor||'start'}">${Math.round(pop)} ${lang==='fr'?'âmes':'souls'}</text>`;
    if(S.raided[key])h+=`<g class="smoke" transform="translate(${x+6*k},${y-6*k}) scale(${k})"><circle r="4" cy="0"/><circle r="5" cy="-7" cx="2"/><circle r="6" cy="-15" cx="-1"/></g><path class="flame" d="M${x+3*k},${y} q${-3*k},${-5*k} ${1*k},${-10*k} q${1*k},${4*k} ${4*k},${5*k} q${1*k},${4*k} ${-5*k},${5*k}z"/>`;}
  if(S.wenFallen){const[x,y]=P(-79.85,44.66);h+=`<path class="ruin" d="M${x-5*k},${y+3*k}l${2*k},${-6*k}l${2*k},${3*k}l${2*k},${-5*k}l${2*k},${8*k}z"/>`;}
  if(S.flags.blockade||S.flags.occupied){const[x,y]=P(S.flags.occupied?-71.05:-69.6,S.flags.occupied?46.86:48.05);h+=shipGlyph(x,y,k*1.3,true)+`<text class="pforeign enemy" x="${x+10*k}" y="${y+4*k}" font-size="${9.5*k}">Kirke</text>`;}
  // season wash
  if(S.season===3)h+=`<rect x="-900" y="-1400" width="3200" height="3400" class="winter"/>`;
  if(S.season===2)h+=`<rect x="-900" y="-1400" width="3200" height="3400" class="autumn"/>`;
  h+=`<rect x="-900" y="-1400" width="3200" height="3400" filter="url(#grain)" class="grainrect"/><rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="url(#vign)" pointer-events="none"/>`;
  h+=`<g id="shipLayer"></g><g id="fxLayer"></g>`;
  // pins
  S.pending.forEach((id,i)=>{const e=getEv(id);const pl=PLACES[e.place]||PLACES.quebec;const[x,y]=P(pl.ll[0],pl.ll[1]);
    h+=`<g class="pin" data-act="openev" data-id="${id}" tabindex="0" role="button" aria-label="${L(e.title)}" transform="translate(${x},${y-16*k}) scale(${k})"><circle class="ring" r="11"/><circle class="seal" r="9"/><circle class="seal-in" r="6.5"/><text y="3.5" text-anchor="middle">${i+1}</text></g>`;});
  svg.innerHTML=h;
}
function anim(now){
  const path=svg.querySelector('#canoePath');
  if(path){const len=path.getTotalLength();svg.querySelectorAll('.canoe').forEach(c=>{const i=+c.dataset.i,n=+c.dataset.n;const tt=RM.matches?0:now/70000;const f=((tt+i/n)%1);const p=path.getPointAtLength(len*f),q=path.getPointAtLength(Math.min(len,len*f+2));const a=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI;c.setAttribute('transform',`translate(${p.x.toFixed(1)},${p.y.toFixed(1)}) rotate(${a.toFixed(0)})`);});}
  const sp=svg.querySelector('#shipPath'),layer=svg.querySelector('#shipLayer');
  if(sp&&layer){const k=curK;const age=(now-S.shipAt)/5000;
    if(S.season===0&&S.shipAt&&!S.flags.occupied&&!(S.flags.blockade&&S.year<=1629)){const f=RM.matches?1:Math.min(1,Math.max(0,age));const len=sp.getTotalLength();const p=sp.getPointAtLength(len*f);layer.innerHTML=shipGlyph(p.x,p.y,k*1.3,false);}
    else layer.innerHTML='';}
  const fl=svg.querySelector('#fxLayer');
  if(fl){FXQ=FXQ.filter(f=>now-f.t<2600);const k=curK;
    fl.innerHTML=FXQ.map(f=>{const pl=PLACES[f.place]||PLACES.quebec;const[x,y]=P(pl.ll[0],pl.ll[1]);const a=(now-f.t)/2600;return `<text class="floater ${f.kind}" x="${x+8*k}" y="${y-14*k-a*26*k}" font-size="${15*k}" opacity="${(1-a*a).toFixed(2)}">${f.text}</text>`;}).join('');}
  requestAnimationFrame(anim);
}

/* ---- déplacer (glisser), zoomer (molette, pincer, double-clic, boutons) ---- */
(function(){
  const ptrs=new Map();let start=null,moved=false,redrawT=null;
  const toSvg=(cx,cy,vb)=>{const r=svg.getBoundingClientRect();const s=Math.max(vb[2]/r.width,vb[3]/r.height);
    const ox=(r.width-vb[2]/s)/2,oy=(r.height-vb[3]/s)/2;return[vb[0]+(cx-r.left-ox)*s,vb[1]+(cy-r.top-oy)*s,s];};
  function live(c){ /* mise à jour rapide pendant le geste ; redessin complet un peu après */
    const ovb=curVB;cam=clampCam(c);const nvb=fitVB(cam);svg.setAttribute('viewBox',nvb.map(v=>v.toFixed(1)).join(' '));
    const hud=svg.querySelector('#maphud');if(hud){const s=nvb[2]/ovb[2];hud.setAttribute('transform',`translate(${nvb[0]},${nvb[1]}) scale(${s}) translate(${-ovb[0]},${-ovb[1]})`);}
    clearTimeout(redrawT);redrawT=setTimeout(()=>{staticCache.key='';drawMap();if(typeof renderHUDView==='function')renderHUDView();},160);}
  function zoomAt(cx,cy,f){const c=cam||presetCam();const vb=curVB;const[px,py]=toSvg(cx,cy,vb);
    const w=clamp(c[2]*f,140,WORLD_B[2]*.98),h=w*c[3]/c[2];const fx=(px-c[0])/c[2],fy=(py-c[1])/c[3];live([px-fx*w,py-fy*h,w,h]);}
  svg.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.clientX,e.clientY,Math.exp(e.deltaY*.0015));},{passive:false});
  svg.addEventListener('dblclick',e=>{if(e.target.closest('.pin,.place'))return;zoomAt(e.clientX,e.clientY,.6);});
  svg.addEventListener('pointerdown',e=>{if(e.button!==0&&e.pointerType==='mouse')return;ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    start={cam:(cam||presetCam()).slice(),pts:[...ptrs.values()].map(p=>({...p})),vb:curVB.slice()};moved=false;});
  window.addEventListener('pointermove',e=>{if(!ptrs.has(e.pointerId)||!start)return;ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    const pts=[...ptrs.values()];const r=svg.getBoundingClientRect();const s=Math.max(start.vb[2]/r.width,start.vb[3]/r.height);
    if(pts.length===1&&start.pts.length===1){const dx=pts[0].x-start.pts[0].x,dy=pts[0].y-start.pts[0].y;if(!moved&&Math.hypot(dx,dy)<5)return;
      if(!moved){moved=true;svg.classList.add('dragging');try{svg.setPointerCapture(e.pointerId);}catch(_){}}
      const c=start.cam;live([c[0]-dx*s,c[1]-dy*s,c[2],c[3]]);}
    else if(pts.length===2&&start.pts.length===2){moved=true;const d0=Math.hypot(start.pts[0].x-start.pts[1].x,start.pts[0].y-start.pts[1].y),d1=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
      const f=d0/Math.max(1,d1);const c=start.cam;const m0=[(start.pts[0].x+start.pts[1].x)/2,(start.pts[0].y+start.pts[1].y)/2],m1=[(pts[0].x+pts[1].x)/2,(pts[0].y+pts[1].y)/2];
      const[px,py]=toSvg(m0[0],m0[1],start.vb);const w=clamp(c[2]*f,140,WORLD_B[2]*.98),h=w*c[3]/c[2];const fx=(px-c[0])/c[2],fy=(py-c[1])/c[3];
      const ss=s*w/c[2];live([px-fx*w-(m1[0]-m0[0])*ss,py-fy*h-(m1[1]-m0[1])*ss,w,h]);}});
  const end=e=>{if(!ptrs.has(e.pointerId))return;ptrs.delete(e.pointerId);svg.classList.remove('dragging');
    if(ptrs.size){start={cam:(cam||presetCam()).slice(),pts:[...ptrs.values()].map(p=>({...p})),vb:curVB.slice()};}else start=null;};
  window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  /* un glisser ne doit pas déclencher de clic sur un repère */
  svg.addEventListener('click',e=>{if(moved){e.stopPropagation();e.preventDefault();moved=false;}},true);
  window.mapZoom=f=>{const r=svg.getBoundingClientRect();zoomAt(r.left+r.width/2,r.top+r.height/2,f);};
  window.mapReset=v=>{cam=null;if(v)view=v;staticCache.key='';drawMap();if(typeof renderHUDView==='function')renderHUDView();};
})();
