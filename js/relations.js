/* Kebec — Moteur de relations : une échelle allié-ennemi (−100 … +100) par nation. */
/* ---- relations: -100 (war) … +100 (alliance), one per nation ---- */
const GROUPS=[
 {id:'innu',name:R('Innus','Innu'),sub:R('« Montagnais »','"Montagnais"'),ll:[-69.4,48.95],rx:120,ry:46,raid:['tadoussac','quebec','beauport']},
 {id:'alg',name:R('Algonquins','Algonquins'),sub:R('Anishinàbeg','Anishinàbeg'),ll:[-76.6,46.3],rx:150,ry:52,raid:['villeMarie','troisRivieres']},
 {id:'wen',name:R('Wendats','Wendat'),sub:R('« Hurons » — Wendake','"Hurons" — Wendake'),ll:[-79.55,44.5],rx:58,ry:34,raid:['villeMarie','troisRivieres']},
 {id:'agnier',name:R('Agniers','Mohawk'),sub:R('Kanienʼkehá:ka','Kanienʼkehá:ka'),ll:[-73.95,43.3],rx:62,ry:30,raid:['troisRivieres','villeMarie','quebec','orleans','beauport']},
 {id:'onon',name:R('Onontagués','Onondaga'),sub:R('et nations de l\'ouest · Haudenosaunee','and western nations · Haudenosaunee'),ll:[-77.3,42.9],rx:110,ry:30,raid:['villeMarie','troisRivieres']},
 {id:'abenaki',name:R('Abénakis','Abenaki'),sub:R('Wabanaki','Wabanaki'),ll:[-70.2,45.55],rx:80,ry:40,raid:['quebec','beauport']}];
const GROUP=Object.fromEntries(GROUPS.map(g=>[g.id,g]));
const RAID_W={innu:.5,alg:.6,wen:.4,agnier:1,onon:.7,abenaki:.4};
function relAdd(s,g,d){if(!s.rel)return;s.rel[g]=clamp((s.rel[g]||0)+d,-100,100);}
function relWord(v){return v<=-60?R('en guerre','at war'):v<=-20?R('hostiles','hostile'):v<20?R('méfiants','wary'):v<60?R('partenaires','partners'):R('alliés','allies');}
/* Legacy views used by older events: rAlg/rWen (0–100) and haud (Haudenosaunee tension, 0–100). Setting them moves the real relations. */
function attachRel(s){
  if(!s.rel)s.rel={innu:45,alg:40,wen:10,agnier:-10,onon:0,abenaki:0};
  if(!s.str)s.str={innu:55,alg:60,agnier:60,onon:80,abenaki:40};
  const legacy={rAlg:s.rAlg,rWen:s.rWen,haud:s.haud};
  for(const k of ['rAlg','rWen','haud'])delete s[k];
  Object.defineProperty(s,'rAlg',{configurable:true,enumerable:false,get(){return ((s.rel.innu+s.rel.alg)/2+100)/2;},set(v){const d=(clamp(v,0,100)-this.rAlg)*1.3;relAdd(s,'innu',d);relAdd(s,'alg',d);}});
  Object.defineProperty(s,'rWen',{configurable:true,enumerable:false,get(){return (s.rel.wen+100)/2;},set(v){relAdd(s,'wen',(clamp(v,0,100)-this.rWen)*1.3);}});
  Object.defineProperty(s,'haud',{configurable:true,enumerable:false,get(){return (100-(s.rel.agnier+s.rel.onon)/2)/2;},set(v){const d=-(clamp(v,0,100)-this.haud)*1.3;relAdd(s,'agnier',d);relAdd(s,'onon',d);}});
  return s;
}

function relDrift(s){for(const g of GROUPS){const v=s.rel[g.id];if(v!=null)s.rel[g.id]=v*.975;}}
