/* Kebec — L'Acadie : un second peuple français sur l'Atlantique.
   Fondée à Port-Royal (1605), conquise et rendue plusieurs fois, cédée en 1713, déportée à partir de 1755,
   revenue par petits groupes après 1764, puis renaissante au XIXe siècle.
   Repères démographiques (approximatifs) : ~400 en 1671 (recensement de Port-Royal : 392), 1 134 en 1701,
   ~6 000 en 1731, ~10 000 en Nouvelle-Écosse en 1750 plus 3 000 à 4 000 dans les îles françaises,
   plus de 10 000 déportés (1755–1764), 8 442 Acadiens dans les Maritimes en 1771, ~87 000 en 1871,
   ~140 000 en 1901, ~285 000 en 1951 (origine française, Maritimes). Sources : Statistique Canada, CBC « The Acadians »,
   Université du Maine (Acadian deportation, migration and resettlement). */

/* états : none (pas encore), fr (française), occ (occupée par l'Angleterre), br (britannique, « Français neutres »),
   dep (déportation et exil), ret (retours et reconstruction), ren (renaissance acadienne) */
const ACAD_ST={none:R('—','—'),fr:R('colonie française','French colony'),occ:R('occupée par les Anglais','occupied by the English'),br:R('sujets britanniques, « Français neutres »','British subjects, "neutral French"'),dep:R('déportés et dispersés','deported and scattered'),ret:R('le retour','the return'),ren:R('la renaissance acadienne','the Acadian renaissance')};
/* l'Acadie historique au moment où commence chaque période */
function acadHist(s){const y=s.year,p=s.period||1;
  if(p===1)return {pop:0,st:'none',trust:50,mik:65,fr:0,exil:0,qc:0,cajun:0,deported:0,dead:0,ret:0,vit:60,oath:'none',dest:{}};
  if(p===2)return {pop:380,st:y<1670?'occ':'fr',trust:50,mik:65,fr:0,exil:0,qc:0,cajun:0,deported:0,dead:0,ret:0,vit:60,oath:'none',dest:{}};
  if(p===3)return {pop:3500,st:'dep',trust:30,mik:55,fr:0,exil:7500,qc:1800,cajun:0,deported:10500,dead:3500,ret:0,vit:45,oath:'refus',
    dest:{ma:900,ct:650,ny:250,pa:400,md:800,eng:900,sc:900,ga:350,fr:2300,qc:1800}};
  return {pop:82000,st:'ren',trust:50,mik:50,fr:0,exil:0,qc:6000,cajun:0,deported:10500,dead:3500,ret:6000,vit:55,oath:'refus',dest:{}};}
function acadEnsure(s){if(!s.acad)s.acad=acadHist(s);return s.acad;}
/* croissance naturelle : les Acadiens doublent en une génération, quand on les laisse en paix */
function acadRate(s){const y=s.year,A=s.acad;
  if(A.st==='none')return 0;
  if(y<1632)return .004;
  if(y<1670)return .018;
  if(y<1700)return .03;
  if(y<1755)return .049;
  if(y<1867)return .0235;
  return .0148;}
function acadCap(s){const y=s.year;return y<1760?95000:y<1867?240000:600000;}
function acadTick(s,dt){const A=acadEnsure(s);dt=dt||1;const y=s.year,O=s.orient||{},F=s.flags||{};if(s.period===2&&s.orient&&!s.orient.acadie)s.orient.acadie='soutien';
  if(A.st==='none')return;
  if(F.acadiaLost&&A.st==='fr'){A.st='br';A.oath=A.oath||'none';A.fr=Math.max(A.fr,.06);}
  if(F.acadInvite&&!A.inviteDone){A.inviteDone=true;A.pop=Math.max(0,A.pop-350);A.qc+=350;}
  /* naissances moins décès, freinés par la guerre et par la terre */
  const cap=acadCap(s);let r=acadRate(s)*(A.pop<cap/2?1:Math.max(0,2*(1-A.pop/cap)));
  if(s.war&&(A.st==='fr'||A.st==='br'))r-=.006;
  if(A.st==='occ')r-=.004;
  if(O.acadie==='soutien'&&A.st==='br')r+=.001;
  A.pop=Math.max(0,A.pop*(1+r*dt));
  /* la part des Acadiens qui vivent en terre française (île Royale, île Saint-Jean, rive nord de la baie Française) */
  if(A.st==='br'){const tgt=O.acadie==='soutien'?.32:.12;A.fr+=(tgt-A.fr)*(1-Math.pow(.95,dt));if(F.leloutreExode)A.fr=Math.max(A.fr,.3);}
  /* la confiance des Britanniques envers les « Français neutres » */
  if(A.st==='br'){const tgt=clamp(50+{full:25,neutral:8,refus:-18,none:0}[A.oath||'none']+(O.acadie==='neutres'?12:-10)-(F.guerilla?15:0)+(F.acadCalm?10:0)-(s.war?10:0)-(y>=1749?8:0),0,100);A.trust+=(tgt-A.trust)*(1-Math.pow(.85,dt));}
  /* l'exil : la mort d'abord, puis le retour */
  if(A.exil>0){const yrs=y-(A.depY||1755);const mort=yrs<4?.09:.02;const back=y>=1764?.08:0;
    const d=A.exil*mort*dt,b=A.exil*back*dt;A.exil=Math.max(0,A.exil-d-b+A.exil*.012*dt);A.dead+=d;A.pop+=b;A.ret+=b;
    if(A.exil<200){A.pop+=A.exil;A.ret+=A.exil;A.exil=0;}}
  if(A.cajun>0)A.cajun*=1+.026*dt;
  /* les étapes */
  if(A.st==='dep'&&y>=1764)A.st='ret';
  if(A.st==='ret'&&y>=1864)A.st='ren';
  /* la vitalité : écoles, prêtres, journaux, et les coups reçus */
  if(A.st==='ret'||A.st==='ren'){const tgt=clamp(40+(F.memramcook?8:0)+(F.convention1881?6:0)+(F.drapeauAcadien?4:0)+(F.evequeAcadien?6:0)+(F.nbSchools?-6:0)+(F.caraquet?3:0)+(O.minorites==='solidarite'?6:0)+(A.mik-50)*.05,0,100);A.vit+=(tgt-A.vit)*(1-Math.pow(.9,dt));}
  A.mik=clamp(A.mik+((A.st==='fr'||A.st==='br')?.1:-.05)*dt,0,100);
}
/* la probabilité de la déportation : elle dépend de la confiance que les Britanniques accordent aux neutres */
function acadDeportP(s){const A=acadEnsure(s);if(A.st!=='br')return 0;
  return clamp(.34+(60-A.trust)*.012+(s.flags.guerilla?.1:0)-(s.flags.acadCalm?.12:0)-(A.oath==='full'?.25:0)+(s.flags.acadInvite?-.05:0),.04,.97);}
/* le Grand Dérangement : qui part, où, et qui y échappe */
/* répartition des quelque 6 300 déportés de l'automne 1755 (Massachusetts ~870, Connecticut ~880, New York ~250, Pennsylvanie ~450, Maryland ~900,
   Virginie ~1 100, Caroline du Sud ~1 150, Géorgie ~400) ; ~3,5 % ne parviennent nulle part (un navire sombre, un autre est repris par ses passagers) */
const ACAD_DEST=[['ma',.145],['ct',.125],['ny',.04],['pa',.075],['md',.15],['va',.185],['sc',.18],['ga',.065]];
function acadDeport(s,resp){const A=acadEnsure(s);const P=A.pop,frP=P*A.fr,brP=P-frP;
  const k=resp==='resist'?.42:resp==='flee'?.35:.55;
  const dep=Math.round(brP*k),fled=Math.round(brP*(resp==='resist'?.33:.27));const toQc=resp==='resist'?Math.round(fled*.35):resp==='flee'?Math.round(fled*.8):Math.round(fled*.6);
  A.exil+=dep;A.deported+=dep;A.depY=s.year;A.pop=Math.max(0,P-dep-toQc);A.qc+=toQc;A.st='dep';A.dest=A.dest||{};
  for(const[k2,f]of ACAD_DEST)A.dest[k2]=(A.dest[k2]||0)+Math.round(dep*f);A.dest.qc=(A.dest.qc||0)+toQc;
  /* la Virginie refuse ses déportés : ils sont envoyés en Angleterre */
  A.dest.eng=(A.dest.eng||0)+Math.round((A.dest.va||0)*.9);A.dest.va=Math.round((A.dest.va||0)*.1);
  s.flags.grandDerangement=true;if(s===S&&!window.CALIB)s.showInset=true;
  return {dep,toQc};}
/* l'île Saint-Jean et l'île Royale, après la chute de Louisbourg */
function acadDeportIsles(s,mild){const A=acadEnsure(s);const isl=Math.round(A.pop*Math.min(.6,A.fr+.15));const dep=Math.round(isl*(mild?.45:.75));const dead=Math.round(dep*(mild?.25:.5));
  A.pop-=dep;A.exil+=dep-dead;A.dead+=dead;A.deported+=dep;A.dest=A.dest||{};A.dest.fr=(A.dest.fr||0)+dep-dead;A.depY=A.depY||s.year;A.st='dep';if(s===S&&!window.CALIB)s.showInset=true;
  return {dep,dead};}

/* ---------- l'Acadie sur la carte ---------- */
const ACAD_PL=[
 {id:'portRoyalA',ll:[-65.52,44.74],fr:'Port-Royal',en:'Port-Royal',from:1605,to:1755,major:true,skipPlace:'portRoyal'},
 {id:'laHeve',ll:[-64.35,44.27],fr:'La Hève',en:'La Hève',from:1632,to:1640},
 {id:'beaubassin',ll:[-64.28,45.84],fr:'Beaubassin',en:'Beaubassin',from:1672,to:1750,major:true},
 {id:'grandPre',ll:[-64.31,45.1],fr:'Grand-Pré',en:'Grand-Pré',from:1682,to:1755,major:true},
 {id:'pisiquid',ll:[-64.13,44.98],fr:'Pigiguit',en:'Pisiquid',from:1690,to:1755},
 {id:'cobequid',ll:[-63.55,45.37],fr:'Cobequid',en:'Cobequid',from:1700,to:1755},
 {id:'chipoudy',ll:[-64.72,45.8],fr:'Chipoudy',en:'Chipoudy',from:1700,to:1758},
 {id:'portLaJoye',ll:[-63.15,46.2],fr:'Port-La-Joye (île Saint-Jean)',en:'Port-La-Joye (Île Saint-Jean)',from:1720,to:1758,major:true},
 {id:'beausejour',ll:[-64.29,45.86],fr:'Fort Beauséjour',en:'Fort Beauséjour',from:1751,to:1755,fort:true},
 {id:'annapolis',ll:[-65.52,44.74],fr:'Annapolis Royal',en:'Annapolis Royal',from:1710,to:2001,eng:true,major:true},
 {id:'halifax',ll:[-63.58,44.65],fr:'Halifax',en:'Halifax',from:1749,to:2001,eng:true,major:true},
 {id:'stPierreM',ll:[-56.18,46.78],fr:'Saint-Pierre-et-Miquelon',en:'Saint-Pierre and Miquelon',from:1763,to:2001},
 {id:'caraquet',ll:[-64.95,47.79],fr:'Caraquet',en:'Caraquet',from:1760,to:2001,ret:true,major:true},
 {id:'memramcook',ll:[-64.55,46.0],fr:'Memramcook',en:'Memramcook',from:1766,to:2001,ret:true,major:true},
 {id:'baieSteMarie',ll:[-66.1,44.3],fr:'Baie Sainte-Marie',en:'St. Mary’s Bay',from:1768,to:2001,ret:true},
 {id:'madeleine',ll:[-61.8,47.4],fr:'Îles-de-la-Madeleine',en:'Magdalen Islands',from:1765,to:2001,ret:true},
 {id:'bonaventure',ll:[-65.49,48.05],fr:'Bonaventure',en:'Bonaventure',from:1760,to:2001,ret:true},
 {id:'cheticamp',ll:[-61.0,46.64],fr:'Chéticamp',en:'Chéticamp',from:1782,to:2001,ret:true},
 {id:'madawaska',ll:[-68.33,47.37],fr:'Madawaska',en:'Madawaska',from:1785,to:2001,ret:true,major:true},
 {id:'shediac',ll:[-64.53,46.22],fr:'Shédiac',en:'Shediac',from:1785,to:2001,ret:true},
 {id:'tignish',ll:[-64.03,46.95],fr:'Tignish',en:'Tignish',from:1799,to:2001,ret:true},
 {id:'moncton',ll:[-64.78,46.09],fr:'Moncton',en:'Moncton',from:1855,to:2001,ret:true,major:true},
 {id:'lacadie',ll:[-73.33,45.3],fr:'L’Acadie (paroisse)',en:'L’Acadie (parish)',from:1768,to:2001,qc:true},
 {id:'stJacques',ll:[-73.57,45.95],fr:'Saint-Jacques-de-l’Achigan',en:'Saint-Jacques-de-l’Achigan',from:1772,to:2001,qc:true}];
const ACAD_POLY=[[-66.0,44.55],[-65.2,45.05],[-64.6,45.35],[-64.0,45.95],[-64.8,46.0],[-65.0,45.6],[-63.4,45.45],[-63.3,45.25],[-64.0,44.95],[-65.0,44.6],[-65.8,44.3]];
const ACAD_NB=[[-64.5,45.9],[-64.2,46.5],[-64.6,47.2],[-64.6,47.9],[-65.3,47.95],[-65.7,47.3],[-65.0,46.4],[-64.9,45.95]];
function acadLayer(k){const A=S.acad;if(!A||A.st==='none')return '';const y=S.year,F=lang==='fr';let h='';
  /* le pays acadien : les marais endigués du fond de la baie Française, puis la côte du Nouveau-Brunswick */
  if(A.st==='fr'||A.st==='br'||A.st==='occ'){const op=clamp(.2+Math.sqrt(A.pop)/180,.2,.7);h+=`<g mask="url(#landonly)"><path d="${polyD(ACAD_POLY)}" class="terr acad" filter="url(#wash)" opacity="${op.toFixed(2)}"/></g>`;}
  if(A.st==='ret'||A.st==='ren'){const op=clamp(.18+Math.sqrt(A.pop)/700,.18,.65);h+=`<g mask="url(#landonly)"><path d="${polyD(ACAD_NB)}" class="terr acad" filter="url(#wash)" opacity="${op.toFixed(2)}"/></g>`;}
  const after=A.deported>0;
  for(const v of ACAD_PL){if(y<v.from||y>=v.to)continue;if(v.ret&&!(A.st==='ret'||A.st==='ren'))continue;if(v.eng&&y<v.from)continue;
    if(v.skipPlace&&S.places[v.skipPlace])continue;if(v.id==='portRoyalA'&&y>=1710)continue;if(v.qc&&!(A.qc>500))continue;
    const[x,yy]=P(v.ll[0],v.ll[1]);const burnt=!v.eng&&!v.ret&&!v.qc&&after&&y>=v.to-1;
    h+=v.fort?settlementIcon('fort',x,yy,.75*k):v.eng?settlementIcon('post',x,yy,.7*k):`<g class="${burnt?'acadruin':'acadv'}">${settlementIcon('village',x,yy,.75*k)}</g>`;
    if(k<(v.major?.95:.62))h+=`<text class="${v.eng?'pforeign':'plabel acadl'}" x="${x+6*k}" y="${yy+11*k}" font-size="${(v.major?10.5:8.5)*k}">${F?v.fr:v.en}</text>`;}
  /* villages brûlés après la déportation */
  if(after&&(A.st==='dep'||A.st==='ret')&&y<1800)for(const v of ACAD_PL){if(!(v.to===1755||v.to===1758||v.to===1750)||v.eng)continue;const[x,yy]=P(v.ll[0],v.ll[1]);
    h+=`<path class="ruin" d="M${x-5*k},${yy+3*k}l${2*k},${-6*k}l${2*k},${3*k}l${2*k},${-5*k}l${2*k},${8*k}z"/>`;if(k<.62)h+=`<text class="nsub ngone" x="${x+6*k}" y="${yy+11*k}" font-size="${8*k}">${F?v.fr+' (brûlé)':v.en+' (burned)'}</text>`;}
  if(curK>.45){const[x,yy]=P(-65.2,45.55);const lab=A.st==='dep'?(F?'Acadie — le Grand Dérangement':'Acadia — the Great Upheaval'):F?'Acadie':'Acadia';
    h+=`<text class="nlabel acadn" x="${x}" y="${yy}" font-size="${14*k}" text-anchor="middle">${lab}</text><text class="nsub" x="${x}" y="${yy+12*k}" font-size="${9*k}" text-anchor="middle">${nf(Math.round(A.pop/50)*50,lang)} ${F?'Acadiens':'Acadians'}</text>`;}
  return h;}

/* ---------- la carte de l'exil (médaillon) ---------- */
const AT_PROJ=(lon,lat)=>[(lon+97)/102*600,(58-lat)/41*300];
const AT_DEST={ma:[-71.06,42.36,R('Massachusetts','Massachusetts')],ct:[-72.7,41.5,R('Connecticut','Connecticut')],ny:[-74.0,40.7,R('New York','New York')],pa:[-75.16,39.95,R('Pennsylvanie','Pennsylvania')],
 md:[-76.6,39.0,R('Maryland','Maryland')],va:[-76.3,37.0,R('Virginie','Virginia')],sc:[-79.93,32.78,R('Caroline du Sud','South Carolina')],ga:[-81.1,32.1,R('Géorgie','Georgia')],
 eng:[-2.6,51.45,R('Angleterre','England')],fr:[-2.0,48.65,R('France (Saint-Malo, Belle-Île, Poitou)','France (Saint-Malo, Belle-Île, Poitou)')],qc:[-71.2,46.81,R('Québec','Québec')],
 la:[-91.8,30.2,R('Louisiane','Louisiana')],spm:[-56.18,46.78,R('Saint-Pierre','Saint-Pierre')]};
function insetHTML(){const A=S.acad;if(!A)return '';const F=fr();const o=AT_PROJ(-64.5,45.2);const D=A.dest||{};
  const items=[];for(const k in AT_DEST){const n=D[k]||0;if(n<50)continue;const[lo,la,nm]=AT_DEST[k];items.push({k,n,nm,t:AT_PROJ(lo,la)});}
  const col=items.filter(x=>['ma','ct','ny','pa','md','va','sc','ga'].includes(x.k)).sort((a,b)=>a.t[1]-b.t[1]);
  let y0=Math.max(120,o[1]+30);for(const x of col){x.ly=y0;y0+=15;}
  let arrows='',labs='';
  for(const x of items){const src=x.k==='la'&&D.fr?AT_PROJ(-2.0,48.65):o;const t=x.t;
    const mx=(src[0]+t[0])/2,my=(src[1]+t[1])/2-(x.k==='eng'||x.k==='fr'?70:x.k==='la'?40:10);const w=clamp(Math.sqrt(x.n)/9,1,6);
    arrows+=`<path d="M${src[0].toFixed(1)},${src[1].toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${t[0].toFixed(1)},${t[1].toFixed(1)}" class="atarrow" stroke-width="${w.toFixed(1)}" marker-end="url(#ath)"/><circle cx="${t[0].toFixed(1)}" cy="${t[1].toFixed(1)}" r="2.4" class="atdot"/>`;
    const txt=`${L(x.nm)} · ${nf(Math.round(x.n/50)*50,lang)}`;
    if(x.ly!=null){const lx=250;labs+=`<path d="M${t[0].toFixed(1)},${t[1].toFixed(1)} L${lx-3},${x.ly-3}" class="atlead"/><text x="${lx}" y="${x.ly}" class="atlab">${txt}</text>`;}
    else if(x.k==='eng'||x.k==='fr')labs+=`<text x="${(t[0]-5).toFixed(1)}" y="${(t[1]+(x.k==='fr'?14:-6)).toFixed(1)}" class="atlab" text-anchor="end">${txt}</text>`;
    else if(x.k==='qc')labs+=`<text x="${(t[0]-6).toFixed(1)}" y="${(t[1]-6).toFixed(1)}" class="atlab" text-anchor="end">${txt}</text>`;
    else labs+=`<text x="${(t[0]+5).toFixed(1)}" y="${(t[1]+13).toFixed(1)}" class="atlab">${txt}</text>`;}
  return `<div class="inset" role="dialog" aria-label="${F?"La carte de l'exil":'Map of the exile'}"><div class="inhead"><b>${F?'Le Grand Dérangement':'The Great Upheaval'}</b><span>${F?`${nf(Math.round(A.deported/100)*100,lang)} déportés · ${nf(Math.round(A.dead/100)*100,lang)} morts en exil`:`${nf(Math.round(A.deported/100)*100,lang)} deported · ${nf(Math.round(A.dead/100)*100,lang)} died in exile`}</span><button class="linkbtn" data-act="closeinset" aria-label="${F?'Fermer':'Close'}">✕</button></div>
    <svg viewBox="0 0 600 300"><defs><marker id="ath" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L8,4 L0,8z" class="athead"/></marker></defs><image href="img/map/atlantic.jpg" x="0" y="0" width="600" height="300"/>
    ${arrows}<circle cx="${o[0].toFixed(1)}" cy="${o[1].toFixed(1)}" r="4.5" class="atsrc"/><text x="${(o[0]+7).toFixed(1)}" y="${(o[1]-6).toFixed(1)}" class="atlab b">${F?'Acadie':'Acadia'}</text>${labs}</svg>
    <p>${F?'Les chiffres sont arrondis : les registres de l’époque sont incomplets. La plupart des exilés ne reverront jamais l’Acadie ; d’autres reviendront à pied, des années plus tard.':'Figures are rounded: the records of the time are incomplete. Most exiles never saw Acadia again; others walked back, years later.'}</p></div>`;}
function renderInset(){let el=document.getElementById('inset');const wrap=svg.parentElement;
  if(!S||!S.showInset||!S.acad||titleOpen||S.ending){if(el)el.remove();return;}
  if(!el){el=document.createElement('div');el.id='inset';wrap.appendChild(el);}el.innerHTML=insetHTML();}

/* ---------- le panneau ---------- */
function acadHTML(s){const A=s.acad;if(!A||A.st==='none')return '';const F=fr();
  let h=`<section class="acad"><h4>${F?"L'Acadie":'Acadia'} · ${L(ACAD_ST[A.st])}</h4><div class="stats"><div>${ico('pop')}<b>${fmt(A.pop)}</b><small>${F?'Acadiens au pays':'Acadians at home'}</small></div>`;
  if(A.exil>50)h+=`<div>${ico('globe')}<b>${fmt(A.exil)}</b><small>${F?'en exil':'in exile'}</small></div>`;
  if(A.qc>50)h+=`<div>${ico('flag')}<b>${fmt(A.qc)}</b><small>${F?'réfugiés au Québec':'refugees in Quebec'}</small></div>`;
  if(A.cajun>50)h+=`<div>${ico('flag')}<b>${fmt(A.cajun)}</b><small>${F?'Cadiens de Louisiane':'Louisiana Cajuns'}</small></div>`;
  h+=`</div>`;
  if(A.st==='br')h+=meter(A.trust,false,F?'Confiance des Britanniques':'British trust')+`<p class="quiet">${F?`Serment : ${{none:'aucun',neutral:'avec réserve de neutralité',full:'sans réserve',refus:'refusé'}[A.oath||'none']}. ${Math.round(A.fr*100)} % vivent en terre française.`:`Oath: ${{none:'none',neutral:'with a neutrality clause',full:'unconditional',refus:'refused'}[A.oath||'none']}. ${Math.round(A.fr*100)}% live on French soil.`}</p>`;
  if(A.st==='fr'||A.st==='br'||A.st==='occ')h+=meter(A.mik,false,F?'Liens avec les Mi’kmaq':'Ties with the Mi’kmaq');
  if(A.st==='ret'||A.st==='ren')h+=meter(A.vit,false,F?'Vitalité acadienne':'Acadian vitality');
  if(A.deported>0)h+=`<p class="quiet">${F?`${fmt(A.deported)} déportés depuis 1755 ; ${fmt(A.dead)} sont morts en exil.`:`${fmt(A.deported)} deported since 1755; ${fmt(A.dead)} died in exile.`} <button class="linkbtn" data-act="openinset">${F?"Carte de l'exil":'Map of the exile'}</button></p>`;
  return h+`</section>`;}
