/* Kebec — Banc de calibration : joue N parties en faisant tous les choix historiques et compare à l'histoire.
   Ouvrir index.html#calibration */
function runCalibration(N=20){
  const CK=[1620,1628,1641,1650,1655,1660,1663];const res=[];const ev={fall:0,kirke:0,vm:0,tr:0};const keep=S;window.CALIB=true;
  for(let g=0;g<N;g++){S=newState();enterSeason(S);const pops={};let n=0;
    while(!S.ending&&n<400){n++;while(S.pending.length){const id=S.pending[0];const e=getEv(id);const ch=typeof e.choices==='function'?e.choices(S):e.choices;let i=ch.findIndex(c=>c.hist);if(i<0)i=0;choose(id,i);S.outcome=null;if(S.ending)break;}relOpen=null;if(S.ending)break;
      if(S.season===0&&CK.includes(S.year))pops[S.year]=S.pop;advance();}
    if(S.season===0)pops[S.year]=S.pop;res.push(pops);if(S.wenFallen)ev.fall++;if(S.fired.kirke1629)ev.kirke++;if(S.places.villeMarie)ev.vm++;if(S.places.troisRivieres)ev.tr++;}
  S=keep;window.CALIB=false;FXQ=[];TOASTS=[];TQ=[];
  const rows=CK.map(y=>{const v=res.map(p=>p[y]||0);const avg=v.reduce((a,b)=>a+b,0)/N,h=histPop(y),d=(avg/h-1)*100;const src=HIST_SOURCES.find(x=>x.y===y);return `<tr><td>${y}</td><td>${Math.round(avg)}</td><td>${Math.min(...v)}–${Math.max(...v)}</td><td>${Math.round(h)}</td><td class="${src?(Math.abs(d)<=10?'ok':'off'):'interp'}">${d>=0?'+':''}${d.toFixed(0)} %</td><td class="srcc">${src?src.src:'interpolé'}</td></tr>`;}).join('');
  const box=document.createElement('div');box.className='overlay';box.innerHTML=`<div class="letter help"><div class="body"><h2>Calibration</h2><p class="story">${N} parties jouées en faisant tous les choix historiques, avec les ordres par défaut. Objectif : rester à ±10 % des repères sourcés (Statistique Canada, Trudel), avec un peu de hasard. Les années « interpolées » n'ont pas de chiffre sourcé : elles servent d'indication.</p>
   <table class="ledger calib"><tr><th>Année</th><th>Moyenne</th><th>Écart</th><th>Histoire</th><th>Écart moyen</th><th>Repère</th></tr>${rows}</table>
   <p class="story">Huronie tombée : ${ev.fall}/${N} · Québec prise par les Kirke : ${ev.kirke}/${N} · Ville-Marie fondée : ${ev.vm}/${N} · Trois-Rivières fondée : ${ev.tr}/${N}</p>
   <div class="acts"><button class="cta" onclick="location.hash='';location.reload()">Fermer</button></div></div></div>`;
  document.body.appendChild(box);
}

/* Période II : index.html#calibration2 */
function runCalibration2(N=20){
  const CK=[1667,1675,1681,1688,1706,1713,1719,1724,1730,1739,1754,1760];const res=[];const ev={gp:0,lachine:0,conq:0,epi:0};const keep=S;window.CALIB=true;
  for(let g=0;g<N;g++){S=newState2();enterYear2(S);const pops={};let n=0;
    while(!S.ending&&n<200){n++;while(S.pending.length){const id=S.pending[0];const e=getEv(id);const ch=typeof e.choices==='function'?e.choices(S):e.choices;let i=ch.findIndex(c=>c.hist);if(i<0)i=0;choose(id,i);S.outcome=null;if(S.ending)break;}relOpen=null;if(S.ending)break;
      for(const y of CK)if(pops[y]==null&&S.year>=y)pops[y]=S.pop;advance2();}
    if(pops[1760]==null)pops[1760]=S.pop;res.push(pops);if(S.flags.grandePaix)ev.gp++;if(S.fired.lachine1689&&!(S.divergences||[]).some(d=>d.id==='lachine1689'))ev.lachine++;if(S.ending&&S.ending.startsWith('conquest'))ev.conq++;if(S.ending==='epilogue')ev.epi++;}
  S=keep;window.CALIB=false;FXQ=[];TOASTS=[];TQ=[];
  const rows=CK.map(y=>{const v=res.map(p=>p[y]||0);const avg=v.reduce((a,b)=>a+b,0)/N,h=histPop(y),d=(avg/h-1)*100;return `<tr><td>${y}</td><td>${Math.round(avg)}</td><td>${Math.min(...v)}–${Math.max(...v)}</td><td>${Math.round(h)}</td><td class="${Math.abs(d)<=10?'ok':'off'}">${d>=0?'+':''}${d.toFixed(0)} %</td><td class="srcc">Statistique Canada</td></tr>`;}).join('');
  const box=document.createElement('div');box.className='overlay';box.innerHTML=`<div class="letter help"><div class="body"><h2>Calibration · période II</h2><p class="story">${N} parties de 1663 à 1760 en faisant tous les choix historiques. Objectif : ±10 % des recensements.</p>
   <table class="ledger calib"><tr><th>Année</th><th>Moyenne</th><th>Écart</th><th>Histoire</th><th>Écart moyen</th><th>Repère</th></tr>${rows}</table>
   <p class="story">Grande Paix signée : ${ev.gp}/${N} · Lachine : ${ev.lachine}/${N} · Conquête : ${ev.conq}/${N} · Canada resté français : ${ev.epi}/${N}</p>
   <div class="acts"><button class="cta" onclick="location.hash='';location.reload()">Fermer</button></div></div></div>`;
  document.body.appendChild(box);
}

/* Période III : index.html#calibration3 */
function runCalibration3(N=20){
  const CK=[1765,1784,1822,1831,1844,1851,1861];const res=[],fr={};const ev={};const keep=S;window.CALIB=true;
  for(let g=0;g<N;g++){S=newState3();enterYear3(S);const pops={};let n=0;
    while(!S.ending&&n<200){n++;while(S.pending.length){const id=S.pending[0];const e=getEv(id);const ch=typeof e.choices==='function'?e.choices(S):e.choices;let i=ch.findIndex(c=>c.hist);if(i<0)i=0;choose(id,i);S.outcome=null;if(S.ending)break;}relOpen=null;if(S.ending)break;
      for(const y of CK)if(pops[y]==null&&S.year>=y){pops[y]=S.pop;(fr[y]=fr[y]||[]).push(1-S.ang/S.pop);}advance3();}
    res.push(pops);ev[S.ending||'none']=(ev[S.ending||'none']||0)+1;ev.emig=(ev.emig||0)+S.emig/N;}
  S=keep;window.CALIB=false;FXQ=[];TOASTS=[];TQ=[];setEnvFor(S);
  const rows=CK.map(y=>{const v=res.map(p=>p[y]).filter(x=>x>0);if(!v.length)v.push(0);const avg=v.reduce((a,b)=>a+b,0)/v.length,h=histPop(y),d=(avg/h-1)*100;const f=(fr[y]||[0]).reduce((a,b)=>a+b,0)/Math.max(1,(fr[y]||[]).length);return `<tr><td>${y}</td><td>${Math.round(avg)}</td><td>${Math.min(...v)}–${Math.max(...v)}</td><td>${Math.round(h)}</td><td class="${Math.abs(d)<=10?'ok':'off'}">${d>=0?'+':''}${d.toFixed(0)} %</td><td class="srcc">${Math.round(f*100)} % fr.</td></tr>`;}).join('');
  const box=document.createElement('div');box.className='overlay';box.innerHTML=`<div class="letter help"><div class="body"><h2>Calibration · période III</h2><p class="story">${N} parties de 1760 à 1867 en faisant tous les choix historiques. Objectif : ±10 % des recensements ; environ 75 % de Canadiens français en 1851.</p>
   <table class="ledger calib"><tr><th>Année</th><th>Moyenne</th><th>Écart</th><th>Histoire</th><th>Écart moyen</th><th>Part fr.</th></tr>${rows}</table>
   <p class="story">Fins : ${Object.entries(ev).filter(([k])=>k!=='emig').map(([k,v])=>k+' '+v).join(' · ')} · Émigrés (moyenne) : ${Math.round(ev.emig)}</p>
   <div class="acts"><button class="cta" onclick="location.hash='';location.reload()">Fermer</button></div></div></div>`;
  document.body.appendChild(box);
}

/* Période IV : index.html#calibration4 */
function runCalibration4(N=20){
  const CK=[1871,1881,1891,1901,1911,1921,1931,1941,1951];const res=[],fr={},em={};const ev={};const keep=S;window.CALIB=true;
  for(let g=0;g<N;g++){S=newState4();enterYear4(S);const pops={};let n=0;
    while(!S.ending&&n<200){n++;while(S.pending.length){const id=S.pending[0];const e=getEv(id);const ch=typeof e.choices==='function'?e.choices(S):e.choices;let i=ch.findIndex(c=>c.hist);if(i<0)i=0;choose(id,i);S.outcome=null;if(S.ending)break;}relOpen=null;if(S.ending)break;
      for(const y of CK)if(pops[y]==null&&S.year>=y){pops[y]=S.pop;(fr[y]=fr[y]||[]).push(1-S.ang/S.pop);(em[y]=em[y]||[]).push(S.emig4);}advance4();}
    res.push(pops);ev[S.ending||'none']=(ev[S.ending||'none']||0)+1;}
  S=keep;window.CALIB=false;FXQ=[];TOASTS=[];TQ=[];setEnvFor(S);
  const avg=a=>(a||[0]).reduce((x,y)=>x+y,0)/Math.max(1,(a||[]).length);
  const rows=CK.map(y=>{const v=res.map(p=>p[y]).filter(x=>x>0);if(!v.length)v.push(0);const a=avg(v),h=histPop(y),d=(a/h-1)*100;return `<tr><td>${y}</td><td>${Math.round(a)}</td><td>${Math.min(...v)}–${Math.max(...v)}</td><td>${Math.round(h)}</td><td class="${Math.abs(d)<=10?'ok':'off'}">${d>=0?'+':''}${d.toFixed(0)} %</td><td class="srcc">${Math.round(avg(fr[y])*100)} % fr. · ${Math.round(avg(em[y])/1000)} k émigrés</td></tr>`;}).join('');
  const box=document.createElement('div');box.className='overlay';box.innerHTML=`<div class="letter help"><div class="body"><h2>Calibration · période IV</h2><p class="story">${N} parties de 1867 à 1960 en faisant tous les choix historiques. Objectif : ±10 % des recensements ; environ 80 % de francophones.</p>
   <table class="ledger calib"><tr><th>Année</th><th>Moyenne</th><th>Écart</th><th>Histoire</th><th>Écart moyen</th><th>Notes</th></tr>${rows}</table>
   <p class="story">Fins : ${Object.entries(ev).map(([k,v])=>k+' '+v).join(' · ')}</p>
   <div class="acts"><button class="cta" onclick="location.hash='';location.reload()">Fermer</button></div></div></div>`;
  document.body.appendChild(box);
}
