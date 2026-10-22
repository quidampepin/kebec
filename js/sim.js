/* Onontio — Simulation : saisons, population, traite, raids, temps continu. */
/* ---------------- simulation ---------------- */
function logIt(s,text,kind){s.log.unshift({y:s.year,se:s.season,text,kind:kind||'info'});if(s.log.length>80)s.log.length=80;}
function baseRecruit(s){if(s.year<1615)return 5;if(s.year<1627)return 1;if(s.year<1645)return s.flags.cent?5:3;if(s.year<1655)return 33;return 115;}
function raid(s){
  if(s.flags.occupied)return;
  const def=1-Math.min(s.defense,100)/150;
  for(const g of GG(s)){
    const r=s.rel[g.id];if(r>-30)continue;
    if(g.id==='wen'&&s.wenFallen)continue;
    let p=(-r-30)/220*RAID_W[g.id]*def*((s.str[g.id]||60)/60);
    if((g.id==='agnier'||g.id==='onon')&&s.flags.gunsH)p*=1.5;
    if(s.flags.peace&&(g.id==='agnier'||g.id==='onon'))p*=s.flags.sepPeace?.05:.2;
    if(Math.random()>=Math.min(p,.6))continue;
    const opts=g.raid.filter(k=>s.places[k]);if(!opts.length)continue;
    const tgt=opts[Math.floor(Math.random()*opts.length)];
    const d=Math.min(s.pop-1,1+Math.round(s.pop*.02*Math.random()+Math.random()*2));
    s.pop-=d;s.cleared=Math.max(0,s.cleared-3);s.raided[tgt]=2;s.defense=Math.max(0,s.defense-2);
    s.ys.raidsBy=s.ys.raidsBy||{};s.ys.raidsBy[g.id]=(s.ys.raidsBy[g.id]||0)+1;
        if(s===S){pushFx(tgt,'−'+d,'bad');toast({fr:`Raid ${g.name.fr} près de ${PLACES[tgt].name.fr} : ${d} mort${d>1?'s':''}.`,en:`${g.name.en} raid near ${PLACES[tgt].name.en}: ${d} killed.`},'bad');}
    logIt(s,{fr:`Raid (${g.name.fr}) près de ${PLACES[tgt].name.fr} : ${d} mort${d>1?'s':''}, des champs brûlés.`,en:`Raid (${g.name.en}) near ${PLACES[tgt].name.en}: ${d} killed, fields burned.`},'bad');
  }
}
function processSeason(s){
  const g=gov(s),occ=s.flags.occupied,eco=s.orient.eco;
  s.food-=s.pop*.25*(s.season===3&&s.routine.ration==='strict'?.7:1);
  if(s.season===0&&typeof classTick==='function')classTick(s,1);
  if(s.season===0&&typeof acadTick==='function')acadTick(s,1);
  if(s.season===0&&!occ){
    const base=Math.max(0,s.treasury),a={};let tot=0;
    for(const k of ENV){a[k]=Math.round(base*s.budget[k]/100);tot+=a[k];}
    s.alloc=a;s.treasury-=tot;
    s.defense+=a.def/150*(g.def||1);
    s.missions+=a.miss/100;s.church+=a.miss/200;
    logIt(s,{fr:`Budget engagé : ${tot.toLocaleString('fr-CA')} livres.`,en:`Budget committed: ${tot.toLocaleString('en-CA')} livres.`});
  }
  if(s.season===1){
    if(occ){s.furs=0;logIt(s,R("Les fourrures descendent… vers les navires anglais.","The furs come down… to the English ships."),'bad');}
    else{
      let f=(s.rAlg*.25+(s.wenFallen?0:s.rWen*.45*s.wenStr/100))*.65;
      f*={traite:1.4,equilibre:1,colonie:.8}[eco];
      f*=1+(s.alloc.traite||0)/1500;
      if(s.places.troisRivieres)f*=1.1; if(s.places.villeMarie)f*=1.1;
      f*=1-s.haud/250; if(s.flags.laval)f*=.92;
      f*=s.mods.fur;s.mods.fur=1;
      if(s.truchYear===s.year-1)f*=1.12;
      const tr=s.routine.trade;f*={wait:.8,upriver:1.15,truch:1}[tr]||1;
      if(tr==='truch'&&s.pop>15){s.pop-=3;s.rAlg+=3;if(!s.wenFallen)s.rWen+=3;s.truchYear=s.year;logIt(s,R("Trois jeunes hommes partent hiverner chez les alliés, comme Étienne Brûlé.","Three young men leave to winter with the allies, like Étienne Brûlé."));}
      if(tr==='upriver'&&s.haud>45&&Math.random()<(s.haud-40)/150){const d=2+Math.round(Math.random()*4);s.pop-=d;f*=.7;logIt(s,{fr:`Embuscade sur le fleuve pendant la traite : ${d} morts, des paquets perdus.`,en:`Ambush on the river during the trade: ${d} dead, packs lost.`},'bad');}
      s.furs=Math.max(0,Math.round(f));s.ys.furs=s.furs;if(s===S)pushFx('troisRivieres','+'+s.furs+(lang==='fr'?' paquets':' packs'),'fur');
      logIt(s,{fr:`Traite d'été : ${s.furs} paquets de castor.`,en:`Summer trade: ${s.furs} packs of beaver.`},s.furs>=30?'good':'info');
      const expected=150+s.furs*8,pres=s.alloc.pres||0;
      let gift=clamp((pres-expected)/100,-6,4);if(gift>0)gift*=(g.rel||1);const dim=v=>gift>0?gift*(1-v/105):gift;
      if(pres<expected*.6)logIt(s,R("Les alliés s'étonnent de la maigreur des présents. Pour eux, un allié qui ne donne pas n'est pas un allié.","The allies are surprised at the meagre gifts. To them, an ally who doesn't give is no ally."),'bad');
      s.rAlg+=dim(s.rAlg)-.8;s.rWen+=(s.wenFallen?dim(s.rWen)/3:dim(s.rWen))-.8;
      relAdd(s,'abenaki',gift*.8-.5+(s.year>=1640&&s.orient.mis==='actives'?2:0));
    }
    if(s.orient.all==='armee'){s.haud+=.8;s.rAlg+=1;s.rWen+=1;}else{s.haud-=2.5;s.rAlg-=1;s.rWen-=1;}
    if(s.orient.mis==='actives'){s.missions+=3;s.church+=2;s.rWen-=1;}
    s.cleared+=s.pop*{traite:.3,equilibre:.5,colonie:.7}[eco]*.22+(s.alloc.etab||0)/800;
    raid(s);
  }
  if(s.season===2){
    const h=s.cleared*.8*s.mods.harvest+(!s.wenFallen&&s.rWen>50&&!occ?10:0);
    s.food+=h;s.mods.harvest=1;s.ys.harvest=Math.round(h);
    if(!occ){
      const inc=Math.round(s.furs*45*(s.flags.habitants?1.2:1)*(g.tre||1))+(s.flags.habitants?0:Math.round(200+s.compagnie*6));
      s.treasury+=inc;
      s.compagnie+=clamp((s.furs-25)/12,-4,5); if(eco==='colonie')s.compagnie-=1; if(s.treasury<0)s.compagnie-=5;
      let rec=(s.alloc.etab||0)/250*{traite:.6,equilibre:1,colonie:1.5}[eco]*(.5+s.compagnie/100)+baseRecruit(s)*s.recruitMod;
      if(s.places.villeMarie)rec+=10;
      rec*={engages:1.5,colons:1,soldats:.6,vivres:.7,traite:.8}[s.routine.cargo]||1;s.cargo=s.routine.cargo;
      if(s.flags.blockade)rec*=.3;
      s.pendingSettlers+=Math.max(0,Math.round(rec));
      {const singles=Math.max(0,s.pop-s.women*3.2);const lv=Math.round(singles*{traite:.07,equilibre:.05,colonie:.03}[eco]*(s.year<1615?.4:1));
       if(lv>0){s.pop-=lv;s.ys.dep+=lv;if(s===S)pushFx('gulf','−'+lv+(lang==='fr'?' engagés':' leave'),'bad');logIt(s,{fr:`${lv} engagé${lv>1?'s':''} célibataire${lv>1?'s':''} rentre${lv>1?'nt':''} en France à la fin de leur contrat.`,en:`${lv} single indentured m${lv>1?'e':'a'}n go${lv>1?'':'es'} home to France at the end of their contract.`});}}
      logIt(s,{fr:`Récolte : ${Math.round(h)} mesures. Les navires repartent : ${inc.toLocaleString('fr-CA')} livres au trésor.`,en:`Harvest: ${Math.round(h)} measures. The ships sail: ${inc.toLocaleString('en-CA')} livres to the treasury.`});
    } else logIt(s,{fr:`Récolte : ${Math.round(h)} mesures.`,en:`Harvest: ${Math.round(h)} measures.`});
    raid(s);
  }
  if(s.season===3){
    const rate=s.firstWinter?.65*s.scurvyMod:Math.max(.004,.05-(s.year-1608)*.001-Math.min(.02,s.cleared/Math.max(1,s.pop)*.03)-(s.hospital?.015:0))*(s.annedda?.4:1)*(s.routine.ration==='strict'?1.35:1)*s.mods.scurvy;s.mods.scurvy=1;
    const d=Math.round(s.pop*rate);
    if(d>0){s.women=Math.max(0,s.women-d*(s.women/Math.max(1,s.pop))*.5);s.pop-=d;logIt(s,{fr:`Le scorbut emporte ${d} personne${d>1?'s':''} cet hiver.`,en:`Scurvy kills ${d} ${d>1?'people':'person'} this winter.`},'bad');}
    s.firstWinter=false;
    if(s.routine.ration==='share'){if(s.food>s.pop*.6){s.food-=s.pop*.3;s.rAlg+=5;if(!s.wenFallen)s.rWen+=2;logIt(s,R("Des familles innues et algonquines passent l'hiver près de l'Habitation, nourries par la colonie.","Innu and Algonquin families winter near the Habitation, fed by the colony."),'good');}else logIt(s,R("Trop peu de vivres pour partager avec les alliés cet hiver.","Too little food to share with the allies this winter."));}
    s.girls=s.girls.filter(g=>{if(g[0]<=s.year){s.women+=g[1];return false;}return true;});
    const fert=.3*(s.routine.ration==='strict'?.85:1);
    s.birthAcc+=s.women*fert;const b=Math.floor(s.birthAcc);s.birthAcc-=b;s.pop+=b;s.ys.births+=b;
    if(b>0)s.girls.push([s.year+15,b*.5*.72]);
    if(b>0)logIt(s,{fr:`${b} naissance${b>1?'s':''} dans la colonie.`,en:`${b} birth${b>1?'s':''} in the colony.`},'good');
    s.defense*=.85;
    relDrift(s);
    if(s.food>0)s.food*=.75;
  }
  if(s.food<0){const d=Math.min(s.pop,Math.round(-s.food*.15));s.women=Math.max(0,s.women-d*(s.women/Math.max(1,s.pop)));s.pop-=d;s.food=0;if(d>0)logIt(s,{fr:`Disette : ${d} mort${d>1?'s':''} de faim.`,en:`Famine: ${d} starved.`},'bad');}
  for(const k of ['rAlg','rWen','haud','compagnie','defense','wenStr','church','missions','autonomy'])s[k]=clamp(s[k],0,100);
  s.pop=Math.max(0,Math.round(s.pop));
}
function enterSeason(s){
  for(const k in s.raided){s.raided[k]--;if(s.raided[k]<=0)delete s.raided[k];}
  if(s.season===0)deliverWorld(s);
  /* le fort Richelieu, mal placé et coûteux, est abandonné en 1646 à la faveur de la paix ; les Agniers le brûlent l'année suivante */
  if(s.year>=1646&&s.season===2&&s.places.fortRichelieu&&!s.flags.fortRichAband){s.flags.fortRichAband=true;s.places.fortRichelieu=false;const t=R("On abandonne le fort Richelieu : trop loin, trop cher à garder. Les Agniers brûleront ce qu'il en reste.","Fort Richelieu is abandoned: too far, too costly to hold. The Mohawk will burn what is left of it.");logIt(s,t,'info');if(s===S&&!window.CALIB)toast(t,'info');}
  if(s.season===0){
    {const y=s.ys;const end=s.pop;const deaths=Math.max(0,y.start+y.births+y.ev-y.dep-end);
     const txt={fr:`Population ${nf(y.start-y.arr,'fr')} → ${nf(end,'fr')} (dont ${Math.round(s.women)} femmes). Arrivées ${y.arr} · naissances ${y.births} · départs ${y.dep} · morts ${deaths}. Fourrures ${y.furs} paquets · récolte ${y.harvest} mesures.`,
                en:`Population ${nf(y.start-y.arr,'en')} → ${nf(end,'en')} (${Math.round(s.women)} women). Arrivals ${y.arr} · births ${y.births} · departures ${y.dep} · deaths ${deaths}. Furs ${y.furs} packs · harvest ${y.harvest} measures.`};
     logIt(s,txt,'info');if(s===S){writeRelation(s,y.y);if(readRel)relOpen=0;else toast({fr:`La Relation de ${y.y} est rédigée.`,en:`The Relation of ${y.y} is written.`},'relation',null,'relation');}}
    const g=gov(s);
    if(g.name!==s.govName){s.govName=g.name;logIt(s,{fr:`Nouvel Onontio : ${g.name}.`,en:`New Onontio: ${g.name}.`},'good');if(s===S)toast({fr:`Un nouvel Onontio débarque : ${g.name}.`,en:`A new Onontio lands: ${g.name}.`},'gov',GOV_IMG[g.name]||null);}
    if(s.flags.occupied){s.lastArrivals=0;logIt(s,R("Aucun navire français cette année.","No French ships this year."),'bad');}
    else if(s.flags.blockade&&s.year<=1629){s.lastArrivals=0;s.lastWomen=0;logIt(s,R("Les Anglais tiennent le golfe : aucun navire ne passe.","The English hold the gulf: no ship gets through."),'bad');s.pendingSettlers=0;}
    else{
      const n=s.pendingSettlers;const pw=Math.min(n,s.pendingWomen||0);
      const fw={engages:.04,colons:.38,soldats:.02,vivres:.08,traite:.05}[s.cargo]+({colonie:.08,equilibre:.03,traite:0}[s.orient.eco])+(s.year>=1650?.12:s.year>=1640?.06:0);
      const wn=Math.round((n-pw)*fw)+pw;s.women+=wn;s.pendingWomen=0;s.lastWomen=wn;s.pop+=n;s.food+=Math.round(15+n*2+s.pop*.3*s.compagnie/50);s.pendingSettlers=0;s.shipAt=performance.now();s.lastArrivals=n;
      const cg=s.cargo;if(cg==='soldats')s.defense=clamp(s.defense+8,0,100);if(cg==='vivres'){s.food+=Math.round(s.pop*.5);s.cleared+=5;}if(cg==='engages')s.cleared+=n*.4;if(cg==='traite')s.mods.fur*=1.2;
      if(s.flags.pardon&&s.year===1609){s.flags.pardon=false;s.pop-=3;logIt(s,R("Les conjurés graciés ont déserté avec un navire basque.","The pardoned plotters deserted on a Basque ship."),'bad');}
      if(s===S&&n>0){pushFx('quebec','+'+n,'good');if(typeof sfx==='function')sfx('ship');}
      logIt(s,{fr:`Les navires sont arrivés : ${n} nouveau${n>1?'x':''} colon${n>1?'s':''}, dont ${s.lastWomen} femme${s.lastWomen>1?'s':''}.`,en:`The ships have arrived: ${n} new settler${n>1?'s':''}, ${s.lastWomen} of them women.`},'good');
    }
  }
  if(s.season===0)s.ys={y:s.year,start:s.pop,arr:s.lastArrivals||0,births:0,dep:0,furs:0,harvest:0,ev:0};
  for(const e of EVENTS){if(e.sys||s.fired[e.id]||e.period>=2)continue;let ok=false;try{ok=e.cond(s);}catch(err){}if(!ok)continue;s.fired[e.id]=true;
    const p=LIKELY[e.id]?clamp(LIKELY[e.id](s),0,1):1;
    if(Math.random()<p)s.pending.push(e.id);else diverge(s,e,p);}
  queueReview(s);
  if(!s.flags.occupied&&!s.ending&&s.year<1663){
    s.sysCount=s.sysCount||{};
    const elig=EVENTS.filter(e=>{if(!e.sys||e.period>=2)return false;if((s.sysCount[e.id]||0)>=(e.max||2))return false;
      if(e.arc){const a=arc(s,e.arc);if(a.stage!==e.stage||s.year-a.last<e.gap)return false;}
      else if((s.year-(s.sysLast[e.id]??-99))<e.cool)return false;
      try{return e.cond(s);}catch(err){return false;}});
    const arcReady=elig.filter(e=>e.arc);
    if(s.pending.length<2&&elig.length&&Math.random()<(s.pending.length?.25:.45)){const pool=arcReady.length&&Math.random()<.6?arcReady:elig;const e=pool[Math.floor(Math.random()*pool.length)];s.sysLast[e.id]=s.year;s.sysCount[e.id]=(s.sysCount[e.id]||0)+1;s.pending.push(e.id);}
  }
}
function snap(s){return{pop:s.pop,food:s.food,treasury:s.treasury,furs:s.furs,defense:s.defense,compagnie:s.compagnie,rAlg:s.rAlg,rWen:s.rWen,haud:s.haud};}
function advance(){
  if(S.period===5)return advance5();
  if(S.period===4)return advance4();
  if(S.period===3)return advance3();
  if(S.period===2)return advance2();
  if(S.pending.length||S.ending)return;
  S.prev=snap(S);
  processSeason(S);
  S.season++;if(S.season>3){S.season=0;S.year++;}
  if(S.pop<=3){S.ending='abandon';}
  else{enterSeason(S);}
  S.popHist.push([S.year+S.season/4,S.pop]);
  if(!window.CALIB){save();render(true);}
}
let running=false,timer=null,speed=1,springPause=false,resumeAfter=false,autoResume=true,relOpen=null,readRel=true;
try{speed=+(localStorage.getItem('onontio-speed')||1);springPause=localStorage.getItem('onontio-spring')==='1';}catch(e){}
const SPEEDS=[4200,2600,1400];
function alertSnap(){const o={food:S.period>=3?false:S.period===2?S.pop&&S.food<S.pop*.05&&S.ys&&S.ys.famine>0:S.pop&&S.food<S.pop*.25*1.5,tre:S.treasury<0};for(const g of GG(S)){if(g.id==='wen'&&S.wenFallen)continue;o['war_'+g.id]=S.rel[g.id]<=-60;}return o;}
const ALERTS={food:R("Les vivres ne tiendront pas deux saisons.","Provisions won't last two seasons."),tre:R("Le trésor est dans le rouge : la Compagnie s'inquiète.","The treasury is in the red: the Company is worried."),alg:R("L'alliance algonquine et innue vacille.","The Algonquin and Innu alliance is faltering."),wen:R("Les Wendats s'éloignent de vous.","The Wendat are drifting away from you."),haud:R("La tension haudenosaunee est à son comble : attendez-vous à des raids.","Haudenosaunee tension is at its peak: expect raids.")};
function checkAlerts(before){const now=alertSnap();const hits=Object.keys(now).filter(k=>now[k]&&!before[k]);
  hits.forEach(k=>{if(k.startsWith('war_')){const g=GROUP[k.slice(4)];toast({fr:`Les ${g.name.fr} sont désormais en guerre contre vous.`,en:`The ${g.name.en} are now at war with you.`},'alert');}else toast(ALERTS[k],'alert');});return hits.length>0;}
function tick(){
  if(!running)return;
  if(S.pending.length||S.ending||S.outcome){running=false;render();return;}
  const before=alertSnap();advance();const al=checkAlerts(before);
  if(S.pending.length||S.ending||al||relOpen!==null||(springPause&&S.season===0)){running=false;if((S.pending.length||relOpen!==null)&&!al)resumeAfter=true;}
  render();if(running)timer=setTimeout(tick,RM.matches?Math.max(400,SPEEDS[speed]):SPEEDS[speed]);
}
/* wait=true : on reprend après un temps de pause, pour laisser voir les effets (le bouton Pause reste disponible) */
function setRunning(v,wait){running=v&&!S.pending.length&&!S.ending&&!S.outcome&&relOpen===null;clearTimeout(timer);resuming=!!(running&&wait);if(running)timer=setTimeout(()=>{resuming=false;tick();},wait?Math.max(3000,SPEEDS[speed]*1.2):120);render();}
let resuming=false;
function choose(id,i){
  const e=getEv(id);if(!e)return;
  const ch=(typeof e.choices==='function'?e.choices(S):e.choices)[i];
  const chs=typeof e.choices==='function'?e.choices(S):e.choices;const hi=chs.findIndex(c=>c.hist);
  const histRes=(hi>=0&&hi!==i)?runOnClone(e,hi,.5).res:null;
  const before=snapFull(S);const p0=S.pop;const side0=S.period===5?S.party5:S.side4;const gmap=ch.g?(typeof ch.g==='function'?ch.g(S):ch.g):null;if(gmap&&typeof polGfx==='function')polGfx(S,gmap);const res=ch.fx(S)||R('','');
  for(const k of ['rAlg','rWen','haud','compagnie','defense','wenStr','church','missions','autonomy'])S[k]=clamp(S[k],0,100);for(const k of ['patri','eco','edu','support','foreign','colT'])if(S[k]!=null)S[k]=clamp(S[k],0,100);if(S.ang!=null)S.ang=Math.max(0,Math.round(S.ang));
  S.pop=Math.max(0,Math.round(S.pop));S.women=Math.min(S.women,S.pop*.5);if(S.ys)S.ys.ev+=S.pop-p0;
  S.pending=S.pending.filter(x=>x!==id);
  if(EVENT_IMG[id])S.yearImg=EVENT_IMG[id];
  S.yearOut=S.yearOut||[];S.yearOut.push({t:e.title,r:res});
  if(!window.CALIB&&typeof sfx==='function'){sfx('quill');const ef=diffSnap(before,snapFull(S));const g=ef.filter(f=>f.good===true).length,b=ef.filter(f=>f.good===false).length;setTimeout(()=>sfx(g>b?'good':b>g?'bad':'mixed'),450);}
  S.outcome={id,title:e.title,label:ch.label,res,eff:diffSnap(before,snapFull(S)),wasHist:!!ch.hist,histLabel:hi>=0&&hi!==i?chs[hi].label:null,histRes,img:evImg(id,e),kind:evKind(e),grp:gmap&&typeof polGroups==='function'?polGroups(S).filter(g=>gmap[g.id]).map(g=>({n:g.name,v:gmap[g.id]})):null};
  if((S.period===4&&S.side4!==side0)||(S.period===5&&S.party5!==side0))S.outcome.eff=S.outcome.eff.filter(f=>f.k!=='support');
  if(hi>=0&&hi!==i&&!e.review&&evKind(e)==='hist'){S.divergences=S.divergences||[];const tt=typeof e.title==='function'?e.title(S):e.title;S.divergences.push({y:S.year,id:'c:'+id,choice:true,title:tt,text:{fr:`${tt.fr} : vous avez choisi « ${ch.label.fr} ». Dans l'histoire : « ${chs[hi].label.fr} ».`,en:`${tt.en}: you chose “${ch.label.en}”. In history: “${chs[hi].label.en}”.`}});}
  logIt(S,{fr:`${e.title.fr} — ${ch.label.fr}.`,en:`${e.title.en} — ${ch.label.en}.`},'decision');
  if(S.pop<=3&&!S.ending)S.ending='abandon';
  if(!window.CALIB){save();render();}
}

