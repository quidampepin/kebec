/* Onontio — Récit : conséquences visibles, aperçu des choix, Relations annuelles, effets à l'écran. */

/* ---- what a decision changes ---- */
const EFFECT_KEYS=[
 ['pop',R('habitants','settlers'),1],['women',R('femmes','women'),1],['pendingSettlers',R('colons au printemps','settlers next spring'),1],
 ['food',R('vivres','provisions'),1],['treasury',R('livres','livres'),1],['defense',R('défense','defence'),1],
 ['wenStr',R('force wendate','Wendat strength'),1],['compagnie',R('Compagnie','Company'),1],
 ['church',R('Église','Church'),0],['autonomy',R('autonomie','autonomy'),0]];
const EFFECT_KEYS3=[['pop',R('habitants','inhabitants'),1],['ang',R('anglophones','English speakers'),0],['treasury',R('£','£'),1],['compagnie',R('faveur du gouverneur',"governor's favour"),1],
 ['patri',R('mouvement national','national movement'),0],['church',R('Église','Church'),0],['edu',R('instruction','schooling'),1],['eco',R('économie','economy'),1],['land',R('terres neuves','new land'),1],['autonomy',R('autonomie','self-rule'),1],['defense',R('milice','militia'),0]];
const EFFECT_KEYS4=[['pop',R('habitants','inhabitants'),1],['ang',R('non-francophones','non-francophones'),0],['treasury',R('$','$'),1],['support',R('appui électoral','electoral support'),1],
 ['patri',R('nationalisme','nationalism'),0],['church',R('Église','Church'),0],['edu',R('instruction','schooling'),1],['eco',R('économie','economy'),1],['foreign',R('propriété étrangère','foreign ownership'),-1],['colT',R('colonisation','settlement'),1],['autonomy',R('autonomie provinciale','provincial autonomy'),1]];
const EFFECT_KEYS5=[['pop',R('habitants','inhabitants'),1],['treasury',R('$','$'),1],['support',R('appui électoral','electoral support'),1],['patri',R('nationalisme','nationalism'),0],['souv',R('appui à la souveraineté','support for sovereignty'),0],
 ['eco',R('économie','economy'),1],['etat',R('État québécois','Quebec state'),0],['dette',R('dette','debt'),-1],['edu',R('scolarisation','schooling'),1],['autonomy',R('autonomie','autonomy'),1],['foreign',R('contrôle non francophone','non-francophone control'),-1],['nord',R('développement du Nord','northern development'),1]];
const effKeys=()=>S&&S.period===5?EFFECT_KEYS5:S&&S.period===4?EFFECT_KEYS4:S&&S.period===3?EFFECT_KEYS3:EFFECT_KEYS;
const SEEDS={fdr:R('≈ 800 Filles du Roi d’ici 1673','≈ 800 King’s Daughters by 1673'),francisation:R('Peu de mariages : les nations gardent leurs filles','Few marriages: the nations keep their daughters'),engagesP2:R('Plus d’engagés, mais peu restent','More hired men, but few stay'),
 milice:R('Milice : une défense qui dure','Militia: a lasting defence'),grandePaix:R('Paix durable avec les nations','Lasting peace with the nations'),talonEco:R('Revenus durables','Lasting revenue'),forges:R('Revenus durables','Lasting revenue'),chantier:R('Revenus durables','Lasting revenue'),
 rapatriement:R('Moins de départs aux États','Fewer departures to the States'),cantonsCanadiens:R('Des terres pour les Canadiens','Land for the Canadiens'),saguenay:R('Des terres pour les Canadiens','Land for the Canadiens'),colonisation:R('Des terres pour les Canadiens','Land for the Canadiens'),responsable:R('Gouvernement responsable','Responsible government'),
 caisses:R('Le crédit coopératif s’enracine','Co-operative credit takes root'),hydroQc:R('L’électricité aux Québécois','Electricity in Quebecers’ hands'),ecoleObligatoire:R('L’instruction progresse','Schooling improves'),assistance:R('Mortalité en baisse','Lower mortality'),hygiene:R('Mortalité en baisse','Lower mortality'),vautrin:R('Élan durable de la colonisation','Lasting settlement drive'),labelle:R('Élan durable de la colonisation','Lasting settlement drive'),embargo:R('Les moulins se bâtissent ici','Mills get built here'),impotProv:R('Revenus et autonomie','Revenue and autonomy'),creditAgricole:R('Les campagnes respirent','The countryside breathes'),hbcEnglish:R('Radisson chez les Anglais','Radisson with the English'),northFrench:R('Route du Nord française','French northern route'),huroniaHeld:R('La Huronie tient','Huronia holds'),gannKept:R('Colonie chez les Onontagués','Colony among the Onondaga'),huguenots:R('Huguenots admis','Huguenots admitted'),syndics:R('Syndics élus','Elected syndics'),lavalWins:R("L'Église l'emporte",'The Church prevails'),stateWins:R("L'État l'emporte",'The State prevails'),boucher:R('Le roi a entendu Boucher','The King heard Boucher'),annedda:R('Remède innu appris','Innu remedy learned'),repelled:R('Kirke repoussé','Kirke repelled'),covered:R('Morts couverts à la manière innue','Dead covered the Innu way'),couture:R('Couture chez les Agniers','Couture among the Mohawk'),college:R('Collège de Québec','Québec college'),bourgeoys:R('École de Ville-Marie','Ville-Marie school'),west:R("Route de l'Ouest ouverte",'Western route opened')};
const PLACE_GAIN={troisRivieres:R('Trois-Rivières fondée','Trois-Rivières founded'),villeMarie:R('Ville-Marie fondée','Ville-Marie founded'),orleans:R("Île d'Orléans peuplée","Île d'Orléans settled"),beauport:R('Seigneurie de Beauport','Beauport seigneury'),fortRichelieu:R('Fort Richelieu bâti','Fort Richelieu built'),refuge:R('Wendats accueillis','Wendat taken in')};
function snapFull(s){const o={};for(const[k]of EFFECT_KEYS.concat(EFFECT_KEYS3,EFFECT_KEYS4,EFFECT_KEYS5))o[k]=+(s[k]||0);o.rel=Object.assign({},s.rel);o.fur=s.mods?s.mods.fur:1;o.places=Object.assign({},s.places);o.flags=Object.assign({},s.flags);o.annedda=s.annedda;o.hospital=s.hospital;o.ending=s.ending;if(s.off)o.off=Object.assign({},s.off);if(s.traits)o.traits=Object.assign({},s.traits);return o;}
function diffSnap(a,b){
  const out=[];
  for(const[k,lab,sign]of effKeys()){let d=b[k]-a[k];if(k==='land'&&Math.abs(d)<200)continue;if(k==='food'||k==='treasury')d=Math.round(d);else d=Math.round(d);if(!d)continue;
    if(k==='women'&&Math.abs(d)<1)continue;
    const good=sign===0?null:(sign*d>0);out.push({k,lab,d,good});}
  for(const g of GROUPS){if(b.rel[g.id]==null)continue;const d=Math.round((b.rel[g.id]||0)-(a.rel[g.id]||0));if(d)out.push({k:'rel_'+g.id,lab:g.name,d,good:d>0});}
  if(Math.abs(b.fur-a.fur)>.01){const p=Math.round((b.fur/a.fur-1)*100);out.push({k:'fur',lab:R('fourrures cet été','furs this summer'),d:p,pct:true,good:p>0});}
  for(const p in PLACE_GAIN)if(b.places[p]&&!a.places[p])out.push({k:'place',lab:PLACE_GAIN[p],seed:true,good:true});
  if(b.hospital&&!a.hospital)out.push({k:'place',lab:R('Hôtel-Dieu ouvert','Hospital opened'),seed:true,good:true});
  for(const f in SEEDS){const was=f==='annedda'?a.annedda:a.flags[f],now=f==='annedda'?b.annedda:b.flags[f];if(now&&!was)out.push({k:'seed',lab:SEEDS[f],seed:true});}
  {const P3=S&&S.period>=3;if(a.off&&b.off)for(const k of (P3?['gov','eve','mar']:['gov','int','eve'])){const d=Math.round((b.off[k]||0)-(a.off[k]||0));if(d)out.push({k:'off_'+k,lab:(S.period===5?OFF_LAB5:S.period===4?OFF_LAB4:P3?OFF_LAB3:OFF_LAB)[k],d,good:d>0});}}
  if(a.traits&&b.traits)for(const tr of traitsFor(S)){const d=Math.round(b.traits[tr.id]-a.traits[tr.id]);if(d)out.push({k:'tr_'+tr.id,lab:tr.name,d,good:null});}
  if(b.ending&&!a.ending)out.push({k:'end',lab:R('fin de partie','game over'),good:false});
  return out;
}
function withRandom(v,fn){const r=Math.random;Math.random=()=>v;try{return fn();}finally{Math.random=r;}}
function runOnClone(e,i,rv){
  const c=attachRel(structuredClone(S));const saved=S;S=c;
  try{return withRandom(rv,()=>{const before=snapFull(c);const chs=typeof e.choices==='function'?e.choices(c):e.choices;const res=chs[i].fx(c)||R('','');
    for(const k of ['rAlg','rWen','haud','compagnie','defense','wenStr','church','missions','autonomy'])c[k]=clamp(c[k],0,100);c.pop=Math.max(0,Math.round(c.pop));
    return {res,eff:diffSnap(before,snapFull(c))};});}
  catch(err){console.warn(err);return {res:R('',''),eff:[]};}finally{S=saved;}
}
function previewChoice(e,i){
  const mid=runOnClone(e,i,.5),lo=runOnClone(e,i,.02),hi=runOnClone(e,i,.98);
  const sig=x=>x.eff.map(f=>f.k+f.d).join('|')+L(x.res);
  return {eff:mid.eff,uncertain:sig(lo)!==sig(hi)};
}
function chipHTML(f){
  const cls=f.seed?'seed':f.good===null?'neutral':f.good?'good':'bad';
  const val=f.seed||f.k==='end'?'':(f.d>0?'+':'−')+Math.abs(f.d).toLocaleString(lang==='fr'?'fr-CA':'en-CA')+(f.pct?' %':'');
  return `<span class="chip ${cls}">${f.seed?'<i class="ico seed"></i>':''}${val?`<b>${val}</b> `:''}${L(f.lab)}</span>`;
}

/* ---- transient effects: map floaters + toasts ---- */
let FXQ=[],TOASTS=[];
function pushFx(place,text,kind){FXQ.push({place,text,kind:kind||'good',t:performance.now()});}
/* Les messages attendent qu'aucune fenêtre ne soit ouverte, puis arrivent un à un.
   Les nouvelles du monde passent AVANT la décision du tour : la décision s'ouvre une fois qu'elles ont défilé. */
let TQ=[],tqTimer=null;
function modalOpen(){return titleOpen||prologueOpen||helpOpen||relOpen!==null||!!(S&&(S.outcome||(S.pending.length&&!dispatchMin&&Date.now()>=nextUntil)));}
function toast(text,kind,img,onclick){kind=kind||'info';if(typeof sfx==='function'&&!window.CALIB){const k=String(kind);setTimeout(()=>sfx(k.startsWith('world')?'world':k==='alert'?'drum':k==='bad'?'down':k==='gov'?'fanfare':k==='diverge'?'bell':k==='relation'?'tick':'tick'),k.startsWith('world')?1500:0);}const w=String(kind).startsWith('world');
  TQ.push({id:Math.random().toString(36).slice(2),text,kind,img,onclick,bonus:kind==='diverge'?8000:w?(kind.includes('big')?12000:8000):0});
  pumpToasts();}
function holdForNews(){if(!S||!S.pending.length||S.outcome||dispatchMin||window.CALIB||titleOpen||prologueOpen)return;
  const nW=TQ.filter(x=>String(x.kind).startsWith('world')).length;if(!nW)return;const until=Date.now()+Math.min(10000,1500+nW*2300);
  if(until>nextUntil){nextUntil=until;setTimeout(()=>{if(Date.now()>=nextUntil-50){nextUntil=0;renderDispatch();}},until-Date.now()+20);}}
function pumpToasts(){if(tqTimer)return;const step=()=>{tqTimer=null;if(!TQ.length)return;
  if(typeof renderDispatch!=='function'||modalOpen()){tqTimer=setTimeout(step,400);return;}
  const x=TQ.shift();x.t=Date.now()+x.bonus;TOASTS.push(x);if(TOASTS.length>4)TOASTS.shift();renderToasts();
  if(TQ.length)tqTimer=setTimeout(step,1800);};tqTimer=setTimeout(step,0);}

/* ---- the yearly Relation, in the voice of the period ---- */
/* pick one variant; avoid repeating the variant used last year for the same slot */
function pv(s,slot,arr){s.relLast=s.relLast||{};let k=Math.floor(Math.random()*arr.length);if(arr.length>1&&k===s.relLast[slot])k=(k+1)%arr.length;s.relLast[slot]=k;return arr[k];}
function writeRelation(s,y){
  const F=[],E=[];const add=(f,e)=>{F.push(f);E.push(e);};
  const ys=s.ys,g=gov(s),prev=(s.chron&&s.chron[0])||null;
  const rb=ys.raidsBy||{};const raids=Object.values(rb).reduce((x,z)=>x+z,0);const rlist=Object.keys(rb).map(k=>({g:GROUP[k],n:rb[k]}));
  const end=s.pop,startPop=ys.start-ys.arr,deaths=Math.max(0,ys.start+ys.births+ys.ev-ys.dep-end),grow=end-startPop;
  const outs=(s.yearOut||[]).slice();
  const N=n=>nf(n,'fr'),NE=n=>nf(n,'en');
  /* opening: varies with the year's mood */
  const mood=raids>=2||deaths>end*.06?'hard':grow>end*.08?'good':'plain';
  const op={
   hard:[[`L'année ${y} fut rude pour la Nouvelle-France.`,`The year ${y} was a hard one for New France.`],[`Il faut dire d'abord que l'année ${y} nous a éprouvés.`,`It must be said at once that the year ${y} has tried us.`],[`Nous écrivons cette Relation de ${y} le cœur lourd.`,`We write this Relation of ${y} with a heavy heart.`]],
   good:[[`L'année ${y} a été bénie : la colonie s'est fortifiée.`,`The year ${y} was blessed: the colony grew stronger.`],[`Jamais encore le pays n'avait tant promis qu'en ${y}.`,`Never yet had the country promised so much as in ${y}.`],[`Nous avons de bonnes nouvelles à donner de l'année ${y}.`,`We have good news to give of the year ${y}.`]],
   plain:[[`Voici ce qui s'est passé en l'année ${y}.`,`Here is what took place in the year ${y}.`],[`L'année ${y} s'est écoulée sans grand fracas.`,`The year ${y} went by without great upheaval.`],[`Peu de choses à dire de ${y}, mais il faut tout dire.`,`Little to say of ${y}, but everything must be told.`]]};
  const o=pv(s,'op'+mood,op[mood]);add(o[0],o[1]);
  /* the year's major decisions, told with their outcome */
  const major=outs.filter(x=>L(x.r)).slice(0,2);
  major.forEach((x,i)=>{const t=pv(s,'dec'+i,[[`Pour ce qui est de l'affaire « ${x.t.fr} », ${lc(x.r.fr)}`,`As for the matter of “${x.t.en}”, ${lc(x.r.en)}`],[`On retiendra surtout « ${x.t.fr} » : ${lc(x.r.fr)}`,`Above all we will remember “${x.t.en}”: ${lc(x.r.en)}`],[`« ${x.t.fr} » : ${x.r.fr}`,`“${x.t.en}”: ${x.r.en}`]]);add(t[0],t[1]);});
  /* news from the wider world, brought by the ships */
  const wl=(s.yearWorld||[]).map(i=>WORLD[i]).filter(Boolean);
  if(wl.length){const t=pv(s,'world',[[`Les navires apportent aussi des nouvelles du monde : ${wl.map(w=>lc(w.t.fr)).join(' ; ')}.`,`The ships also bring news of the wider world: ${wl.map(w=>w.t.en).join('; ')}.`],[`On apprend par les capitaines : ${wl.map(w=>lc(w.t.fr)).join(' ; ')}.`,`From the ship captains we learn: ${wl.map(w=>w.t.en).join('; ')}.`]]);add(t[0],t[1]);}
  /* ships */
  if(ys.arr>=40){const t=pv(s,'arrBig',[[`Les navires du printemps ont débarqué ${ys.arr} personnes, plus qu'on n'en avait vu depuis longtemps.`,`The spring ships landed ${ys.arr} people, more than had been seen in a long while.`],[`On a compté ${ys.arr} passagers à la descente des navires, et il a fallu les loger tous.`,`${ys.arr} passengers came off the ships, and all had to be housed.`]]);add(t[0],t[1]);}
  else if(ys.arr>0&&(!prev||Math.abs(ys.arr-(prev.arr||0))>=5||Math.random()<.35)){const t=pv(s,'arr',[[`Les navires ont apporté ${ys.arr} nouveaux venus.`,`The ships brought ${ys.arr} newcomers.`],[`${ys.arr} âmes nous sont venues de France avec les navires.`,`${ys.arr} souls came to us from France with the ships.`],[`Le printemps a amené ${ys.arr} colons, engagés et soldats.`,`Spring brought ${ys.arr} settlers, indentured men and soldiers.`]]);add(t[0],t[1]);}
  else if(ys.arr===0){const t=pv(s,'arr0',[[`Aucun navire de France n'a porté de colons cette année.`,`No ship from France brought settlers this year.`],[`On a guetté le fleuve tout le printemps : personne n'est venu de France.`,`We watched the river all spring: no one came from France.`]]);add(t[0],t[1]);}
  /* trade, compared with last year */
  const pf=prev?prev.furs:null;
  if(pf!=null&&ys.furs>=pf*1.3&&ys.furs>15){const t=pv(s,'furUp',[[`La traite s'est relevée : ${ys.furs} paquets de castor, contre ${pf} l'an dernier.`,`The trade recovered: ${ys.furs} packs of beaver, against ${pf} last year.`],[`Les canots sont descendus chargés : ${ys.furs} paquets, et les marchands se frottent les mains.`,`The canoes came down laden: ${ys.furs} packs, and the merchants rub their hands.`]]);add(t[0],t[1]);}
  else if(pf!=null&&ys.furs<=pf*.7){const t=pv(s,'furDown',[[`La traite a fléchi : ${ys.furs} paquets seulement, quand on en espérait ${pf}.`,`The trade fell off: only ${ys.furs} packs, when ${pf} were hoped for.`],[`Les flottilles se sont faites rares, et le castor aussi : ${ys.furs} paquets.`,`The fleets were few, and so was the beaver: ${ys.furs} packs.`]]);add(t[0],t[1]);}
  else if(!prev||Math.random()<.3){const t=pv(s,'fur',[[`La traite a donné ${ys.furs} paquets de castor.`,`The trade yielded ${ys.furs} packs of beaver.`],[`On a envoyé en France ${ys.furs} paquets de castor.`,`${ys.furs} packs of beaver were shipped to France.`]]);add(t[0],t[1]);}
  /* raids, per nation */
  if(raids){rlist.forEach(x=>{const t=pv(s,'raid',[[`Les ${x.g.name.fr} sont venus ${x.n===1?'une fois':x.n+' fois'} brûler nos champs.`,`The ${x.g.name.en} came ${x.n===1?'once':x.n+' times'} to burn our fields.`],[`Les ${x.g.name.fr} ont frappé ${x.n===1?'une fois':x.n+' fois'} ; on ne sort plus aux champs sans fusil.`,`The ${x.g.name.en} struck ${x.n===1?'once':x.n+' times'}; no one goes to the fields without a musket now.`],[`On a vu les partis ${x.g.name.fr.toLowerCase()} rôder près des habitations, et ils ont tué.`,`${x.g.name.en} war parties were seen prowling near the settlements, and they killed.`]]);add(t[0],t[1]);});}
  else if(prev&&prev.raids>0){const t=pv(s,'peace',[[`Grâce à Dieu, aucun raid cette année : on a pu labourer en paix.`,`Thank God, no raids this year: the fields could be ploughed in peace.`],[`L'ennemi ne s'est pas montré, et chacun a respiré.`,`The enemy did not show itself, and everyone breathed again.`]]);add(t[0],t[1]);}
  /* nations: only what changed */
  if(prev&&prev.rel){for(const gr of GROUPS){const a=prev.rel[gr.id],b=s.rel[gr.id];if(a==null)continue;const wa=L(relWord(a)),wb=L(relWord(b));if(wa===wb)continue;
    if(b>a){const t=pv(s,'relUp',[[`Les ${gr.name.fr} nous témoignent plus d'amitié qu'avant : on les dit maintenant ${relWord(b).fr}.`,`The ${gr.name.en} show us more friendship than before: they are now said to be ${relWord(b).en}.`],[`Les choses se sont arrangées avec les ${gr.name.fr}, désormais ${relWord(b).fr}.`,`Things have mended with the ${gr.name.en}, now ${relWord(b).en}.`]]);add(t[0],t[1]);}
    else{const t=pv(s,'relDown',[[`Les ${gr.name.fr} se sont refroidis à notre égard ; ils sont désormais ${relWord(b).fr}.`,`The ${gr.name.en} have cooled towards us; they are now ${relWord(b).en}.`],[`Il faut se méfier des ${gr.name.fr}, devenus ${relWord(b).fr}.`,`We must beware of the ${gr.name.en}, who have become ${relWord(b).en}.`]]);add(t[0],t[1]);}}}
  /* people: births, deaths, departures, women */
  if(ys.births>=Math.max(5,(prev?prev.births:0)*1.25)){const t=pv(s,'birth',[[`On a baptisé ${ys.births} enfants nés au pays : les familles s'enracinent.`,`${ys.births} children born in the country were baptised: families are taking root.`],[`Les registres comptent ${ys.births} baptêmes, du jamais vu.`,`The registers count ${ys.births} baptisms, a record.`]]);add(t[0],t[1]);}
  else if(ys.births>0&&Math.random()<.4){add(`${ys.births} baptême${ys.births>1?'s':''} cette année.`,`${ys.births} baptism${ys.births>1?'s':''} this year.`);}
  if(deaths>=Math.max(4,end*.04)){const t=pv(s,'death',[[`Nous avons enterré ${deaths} des nôtres.`,`We buried ${deaths} of our own.`],[`Le cimetière s'est agrandi de ${deaths} croix.`,`The graveyard grew by ${deaths} crosses.`],[`${deaths} des nôtres ne verront pas le printemps prochain.`,`${deaths} of our own will not see next spring.`]]);add(t[0],t[1]);}
  if(ys.dep>=5){const t=pv(s,'dep',[[`${ys.dep} engagés sans femme ont repris la mer à la fin de leur contrat. Sans épouses, le pays ne les retient pas.`,`${ys.dep} unmarried indentured men sailed home at the end of their contracts. Without wives, the country cannot keep them.`],[`Encore ${ys.dep} célibataires repartis pour la France : il nous faudrait des filles à marier.`,`Another ${ys.dep} bachelors gone back to France: we need marriageable girls.`]]);add(t[0],t[1]);}
  /* la société : ce qui gronde */
  if(s.cls&&(s.period||1)>=1){const hg=clsG(s,'habitants'),eg=clsG(s,'engages');
    if(hg>=55&&Math.random()<.6){const t=pv(s,'socH',[[`Les habitants murmurent : ${s.period===2?'cens, rentes et dîme pèsent lourd sur des terres neuves':'la Compagnie garde tout le profit de la traite'}.`,`The habitants grumble: ${s.period===2?'dues, rents and tithe weigh heavily on new land':'the Company keeps all the profit of the trade'}.`],[`On entend des plaintes dans les côtes contre ${s.period===2?'les seigneurs qui ne bâtissent pas leurs moulins':'les commis de la Compagnie'}.`,`Complaints are heard along the shores against ${s.period===2?'seigneurs who do not build their mills':'the Company clerks'}.`]]);add(t[0],t[1]);}
    if(eg>=55&&Math.random()<.4)add(`Les ${s.period===2?'voyageurs':'engagés'} se plaignent de leurs gages.`,`The ${s.period===2?'voyageurs':'indentured men'} complain about their wages.`);}
  /* milestones */
  for(const m of [100,250,500,1000,2000,3000,5000,10000,20000,30000,50000]){if(startPop<m&&end>=m){add(`La colonie a franchi le cap des ${N(m)} âmes.`,`The colony passed the mark of ${NE(m)} souls.`);break;}}
  const yn=parseInt(y);const ratio=end/Math.max(1,histPop(yn+.99));
  if(ratio>=1.25&&Math.random()<.5)add(`On murmure en France que la colonie croît plus vite qu'on ne l'espérait.`,`It is murmured in France that the colony is growing faster than anyone hoped.`);
  if(ratio<=.75&&Math.random()<.5)add(`À la cour, on se demande si la colonie survivra.`,`At court, people wonder whether the colony will survive.`);
  /* closing */
  const cl=grow>0&&!raids?pv(s,'clG',[[`Dieu soit loué.`,`God be praised.`],[`Le pays prend racine.`,`The country is taking root.`],[`Que la Providence continue de veiller sur nous.`,`May Providence keep watching over us.`]]):grow<0?pv(s,'clB',[[`Prions pour que l'an prochain soit plus clément.`,`Let us pray next year is kinder.`],[`Il faudra du courage pour l'année qui vient.`,`The coming year will need courage.`]]):null;
  if(cl)add(cl[0],cl[1]);
  s.chron=s.chron||[];s.chron.unshift({y,fr:F.join(' '),en:E.join(' '),pop:end,furs:ys.furs,raids,women:Math.round(s.women||0),arr:ys.arr,births:ys.births,deaths,dep:ys.dep,hist:Math.round(histPop(yn+.99)),gov:g.name,img:s.yearImg||'relations',rel:Object.assign({},s.rel),dec:outs.map(x=>x.t),world:(s.yearWorld||[]).slice()});s.yearWorld=[];
  s.yearImg=null;s.yearOut=[];
  if(s.chron.length>60)s.chron.length=60;
}
function lc(t){if(!t)return '';const w=t.split(/[\s']/)[0];return /^(Le|La|Les|L|Un|Une|Des|On|Il|Ils|Elle|Elles|Vos|Votre|Ce|Cette|Ces|Personne|Rien|The|A|An|Your|You|They|It|He|She|We|No|Some|Several|Most|Few)$/.test(w)?t.charAt(0).toLowerCase()+t.slice(1):t;}
