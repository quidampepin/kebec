/* Onontio — Sauvegarde et démarrage. */
function save(){try{localStorage.setItem('onontio-save',JSON.stringify(Object.assign({},S,{outcome:S.outcome})));}catch(e){}}
function start(){
  try{lang=localStorage.getItem('onontio-lang')||lang;autoResume=localStorage.getItem('onontio-autores')!=='0';readRel=localStorage.getItem('kebec-readrel')!=='0';}catch(e){}
  let saved=null;try{saved=JSON.parse(localStorage.getItem('onontio-save')||'null');}catch(e){}
  if(saved&&saved.year){S=Object.assign(newState(),saved);}else{S=newState();enterSeason(S);logIt(S,R("3 juillet 1608 : Champlain fonde l'Habitation de Québec avec 28 hommes.","3 July 1608: Champlain founds the Habitation at Québec with 28 men."),'good');}
  S.shipAt=0;S.pending=(S.pending||[]).filter(id=>!String(id).startsWith('R:')||id==='R:rev');
  if(S.women==null){S.women=Math.round(S.pop*.1);S.girls=[];S.pendingWomen=0;}
  if(!S.ys)S.ys={y:S.year,start:S.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0};
  S.sysCount=S.sysCount||{};S.arcs=S.arcs||{};S.chron=S.chron||[];
  titleOpen=true;
  render();requestAnimationFrame(anim);
}
start();
if(location.hash==='#calibration'){titleOpen=false;render();setTimeout(()=>runCalibration(20),50);}
if(location.hash==='#calibration2'){titleOpen=false;render();setTimeout(()=>runCalibration2(20),50);}
if(location.hash==='#calibration3'){titleOpen=false;render();setTimeout(()=>runCalibration3(20),50);}
if(location.hash==='#calibration4'){titleOpen=false;render();setTimeout(()=>runCalibration4(20),50);}
