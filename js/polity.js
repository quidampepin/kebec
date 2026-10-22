/* Kebec — Les forces sociales (périodes III à V).
   Lecture matérialiste : la politique n'est pas un compteur qui monte avec le temps. Elle naît des groupes sociaux,
   de leur place dans l'économie, de ce que chaque décision leur donne ou leur enlève, et des coalitions qu'ils forment.
   - chaque groupe a un poids (électoral), une satisfaction (son sort matériel et ce que le pouvoir fait pour lui),
     et une position sur la question nationale ;
   - le nationalisme, l'appui à la souveraineté, les votes et les référendums sont des sommes de groupes ;
   - le capital investit ou se retire ; le centre (Londres, puis Ottawa et le Canada anglais) choisit une stratégie ;
   - chaque chiffre garde la trace de ses causes, pour qu'on puisse les montrer au joueur. */

const POL={};
const cmp=(k,l,v)=>({k,l,v});
const csum=a=>a.reduce((t,c)=>t+c.v,0);
const dk=(f,w,Y,y,tau)=>f?w*Math.exp(-Math.max(0,y-Y)/(tau||12)):0;
function polCfg(s){return s&&POL[s.period||1]||null;}
function polGroups(s){const c=polCfg(s);return c?c.groups.filter(g=>!g.from||s.year>=g.from):[];}
function polEnsure(s){if(!s.pol||s.pol.period!==(s.period||1))s.pol={period:s.period||1,g:{},gfx:{},loyal:{},why:{},cen:{op:50,strat:'neutre',threat:0},cap:50};return s.pol;}
/* un événement touche des groupes : l'effet s'estompe avec les années */
function polGfx(s,map){if(!map||!polCfg(s))return;const P=polEnsure(s);for(const k in map)P.gfx[k]=(P.gfx[k]||0)+map[k];}
/* un groupe rompt avec un parti : le réalignement dure */
function polRealign(s,g,party,v){const P=polEnsure(s);P.loyal[g]=P.loyal[g]||{};P.loyal[g][party]=(P.loyal[g][party]||0)+v;}
function polTick(s,dt){
  const c=polCfg(s);if(!c)return;const P=polEnsure(s);const O=s.orient||{};dt=dt||1;
  /* les décisions qui ont touché directement le nationalisme ou l'appui depuis l'an dernier deviennent des chocs, qui s'estompent */
  const hk=c.head||'patri';
  if(P.lastH!=null){const d=s[hk]-P.lastH;if(Math.abs(d)>.01)P.natShock=(P.natShock||0)+d;}
  const gk=s.period===4?govSide4(s):s.period===5?govParty5(s):'';
  if(P.lastSup!=null&&P.lastGov===gk){const d=s.support-P.lastSup;if(Math.abs(d)>.01)for(const g of polGroups(s))P.gfx[g.id]=(P.gfx[g.id]||0)+d*.8;}
  P.natShock=(P.natShock||0)*Math.pow(.78,dt);
  for(const k in P.gfx){P.gfx[k]*=Math.pow(.8,dt);if(Math.abs(P.gfx[k])<.4)delete P.gfx[k];}
  for(const g in P.loyal)for(const p in P.loyal[g])P.loyal[g][p]*=Math.pow(.93,dt);
  let tw=0;const gs=polGroups(s);
  for(const g of gs){const st=P.g[g.id]=P.g[g.id]||{w:0,sat:50,nat:g.nat0||20};st.w=Math.max(0,g.w(s));tw+=st.w;}
  for(const g of gs){const st=P.g[g.id];st.share=st.w/Math.max(1,tw);
    const comp=[];
    for(const k in (c.policy||{})){const t=c.policy[k][O[k]];if(t&&t[g.id])comp.push(cmp('o_'+k,T_OPT(k,O[k]),t[g.id]));}
    for(const k in (c.budget||{})){const co=c.budget[k][g.id];if(co){const v=co*((s.budget[k]||0)-20);if(Math.abs(v)>=.5)comp.push(cmp('b_'+k,R(`budget : ${k}`,`budget: ${k}`),v));}}
    if(g.econ)comp.push(...g.econ(s));
    if(g.cls&&s.cls&&s.cls[g.cls]){const v=-(s.cls[g.cls].grief-35)*.35;comp.push(cmp('cls',R('leur part de la richesse','their share of the wealth'),v));}
    if(P.gfx[g.id])comp.push(cmp('evt',R('décisions récentes','recent decisions'),P.gfx[g.id]));
    const tgt=clamp(50+csum(comp)*(c.satK||1),0,100);st.sat+=(tgt-st.sat)*(1-Math.pow(.68,dt));st.whySat=comp;
    /* les attentes s'ajustent : on juge un gouvernement sur ce qui change, plus que sur un malheur chronique */
    st.satAvg=st.satAvg==null?st.sat:st.satAvg+(st.sat-st.satAvg)*(1-Math.pow(.9,dt));
    const nc=g.nat(s);if(g.lang==='fr'&&Math.abs(P.natShock||0)>=.3)nc.push(cmp('shock',R('événements récents','recent events'),P.natShock));const nt=clamp(csum(nc),0,100);st.nat+=(nt-st.nat)*(1-Math.pow(.72,dt));st.whyNat=nc;}
  if(c.after)c.after(s,dt);
  P.lastH=s[hk];P.lastSup=s.support;P.lastGov=gk;
  if(typeof polQueue==='function')polQueue(s);
}
/* moyenne pondérée d'une grandeur sur des groupes (par défaut : les francophones) */
function polMean(s,key,filt){const P=s.pol;if(!P)return 0;let a=0,w=0;for(const g of polGroups(s)){if(filt&&!filt(g))continue;const st=P.g[g.id];if(!st)continue;a+=st[key]*st.share;w+=st.share;}return w?a/w:0;}
const isFr=g=>g.lang==='fr';
/* les causes d'une moyenne : chaque composante pondérée par le poids du groupe */
function polWhy(s,field,filt){const P=s.pol;if(!P)return [];const acc={};let w=0;
  for(const g of polGroups(s)){if(filt&&!filt(g))continue;const st=P.g[g.id];if(!st)continue;w+=st.share;
    for(const c of (field==='nat'?st.whyNat:st.whySat)||[]){const a=acc[c.k]=acc[c.k]||{l:c.l,v:0};a.v+=c.v*st.share;}}
  return Object.values(acc).map(a=>({l:a.l,v:a.v/Math.max(1e-9,w)})).filter(a=>Math.abs(a.v)>=.5).sort((a,b)=>Math.abs(b.v)-Math.abs(a.v));}
/* le vote : chaque groupe choisit entre les partis selon ses intérêts, son jugement sur le gouvernement et la question nationale */
function polVote(s,parties,opt){opt=opt||{};const c=polCfg(s),P=polEnsure(s);const res={v:{},byG:{},seats:{}};const seatW={};
  const noise={};for(const p of parties)noise[p.id]=opt.noise?(Math.random()-.5)*opt.noise:0;
  for(const g of polGroups(s)){const st=P.g[g.id];if(!st)continue;const base={};
    for(const p of parties){let x=c.aff(s,g.id,p.id)+((P.loyal[g.id]||{})[p.id]||0)+noise[p.id];
      if(p.gov)x+=((st.sat-(st.satAvg??st.sat))*.9+(st.sat-50)*.35)*c.kSat-(opt.fatigue!=null?opt.fatigue:(c.fatigue?c.fatigue(s):0));
      x+=(opt.bonus&&opt.bonus[p.id])||0;x+=((opt.gbonus||{})[g.id]||{})[p.id]||0;base[p.id]=x;}
    /* chaque groupe se divise : ceux qui veulent plus pour la nation, et les autres */
    const nf=clamp(st.nat/100,0,1);res.byG[g.id]={};
    for(const [wt,sgn] of [[nf,1],[1-nf,-1]]){if(wt<=0)continue;const u={};for(const p of parties)u[p.id]=base[p.id]+sgn*c.kNat*(p.stance-50)/10;
      const mx=Math.max(...Object.values(u));let z=0;const e={};for(const k in u){e[k]=Math.exp((u[k]-mx)/c.tau);z+=e[k];}
      for(const k in e){const sh=e[k]/z*wt;res.byG[g.id][k]=(res.byG[g.id][k]||0)+sh;res.v[k]=(res.v[k]||0)+sh*st.share;seatW[k]=(seatW[k]||0)+sh*st.share*(g.seatEff??1);}}}
  const tot=Object.values(seatW).reduce((a,b)=>a+b,0)||1;let z=0;const pw={};for(const k in seatW){pw[k]=Math.pow(seatW[k]/tot,c.seatExp||2.6);z+=pw[k];}
  for(const k in pw)res.seats[k]=pw[k]/z;
  return res;}
/* l'étiquette d'une orientation, pour expliquer les causes */
function T_OPT(k,v){return {fr:`${(T.fr&&T.fr[k])||k} : ${(T.fr&&T.fr[v])||v}`,en:`${(T.en&&T.en[k])||k}: ${(T.en&&T.en[v])||v}`};}

/* =====================================================================================
   PÉRIODE V (1960–2000) : la nouvelle classe moyenne, les syndiqués, le Québec inc., les anglophones et les allophones
   ===================================================================================== */
POL[5]={head:'souv',satK:.7,
 groups:[
  {id:'technocrates',cls:'technocrates',lang:'fr',name:R('La nouvelle classe moyenne francophone','The new francophone middle class'),d:R("Enseignants, fonctionnaires, professionnels : l'État québécois est leur ascenseur.","Teachers, civil servants, professionals: the Quebec state is their ladder."),
   w:s=>(s.pop-s.ang-s.allo)*(.05+(s.etat||25)*.0012),econ:s=>[cmp('eco',R('économie','economy'),(s.eco-50)*.12)],nat0:15,
   nat:s=>natCommon5(s,[cmp('etat',R("l'État, leur ascenseur","the state, their ladder"),(s.etat-40)*.12),cmp('scol',R('une classe instruite','an educated class'),(s.edu-55)*.12),cmp('foreign',R('une économie aux mains des autres','an economy in others’ hands'),(s.foreign-35)*.15),cmp('classe',R('position de classe','class position'),8)],.6)},
  {id:'ouvriers',cls:'ouvriers',lang:'fr',name:R('Les salariés francophones','Francophone wage earners'),d:R("Ouvriers, employés, syndiqués de la CSN et de la FTQ.","Workers, clerks, CSN and FTQ members."),
   w:s=>(s.pop-s.ang-s.allo)*.55,econ:s=>[cmp('chom',R('chômage','unemployment'),-(s.chom-8)*2.2),cmp('eco',R('économie','economy'),(s.eco-50)*.1)],nat0:12,
   nat:s=>natCommon5(s,[cmp('unions',R('leurs syndicats','their unions'),(s.off.eve||0)*.04+(s.flags.frontCommun?2:0))],1.1)},
  {id:'precaires',cls:'precaires',lang:'fr',name:R('Les exclus et les régions','The left-behind and the regions'),d:R("Chômeurs, assistés sociaux, régions qui se vident.","The unemployed, welfare recipients, emptying regions."),
   w:s=>(s.pop-s.ang-s.allo)*clamp(.09+(s.chom-7)*.012,.05,.2),econ:s=>[cmp('chom',R('chômage','unemployment'),-(s.chom-8)*3)],nat0:10,
   nat:s=>natCommon5(s,[cmp('base',R('position de classe','class position'),-3)],1.9)},
  {id:'quebecinc',cls:'quebecinc',lang:'fr',name:R('Les gens d’affaires francophones','Francophone business'),d:R("PME, Desjardins, puis Bombardier et Cascades : le « Québec inc. ».","Small firms, Desjardins, then Bombardier and Cascades: 'Quebec Inc.'"),
   w:s=>(s.pop-s.ang-s.allo)*(.012+(100-s.foreign)*.00025),econ:s=>[cmp('eco',R('économie','economy'),(s.eco-50)*.3),cmp('dette',R('dette','debt'),-Math.max(0,s.dette-35)*.3)],nat0:6,
   nat:s=>natCommon5(s,[cmp('base',R('position de classe','class position'),-13),cmp('climat',R("l'incertitude pour les affaires","uncertainty for business"),-(s.flags.refSoon?4:0))],1.6)},
  {id:'capital',cls:'capital',lang:'en',seatEff:.45,name:R('Le grand capital','Big capital'),d:R("Banques, assureurs, multinationales : la rue Saint-Jacques, puis Bay Street.","Banks, insurers, multinationals: St. James Street, then Bay Street."),
   w:s=>(s.ang+s.allo)*.03+(s.pop-s.ang-s.allo)*.003,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-50)*.35),cmp('dette',R('dette','debt'),-Math.max(0,s.dette-35)*.3)],nat0:3,
   nat:s=>[cmp('base',R('position de classe','class position'),3)]},
  {id:'anglos',lang:'en',seatEff:.55,name:R('Les anglophones','Anglophones'),d:R("Westmount, l'Ouest de l'île, les Cantons, le Pontiac.","Westmount, the West Island, the Townships, the Pontiac."),
   w:s=>s.ang*.97,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-50)*.15)],nat0:3,
   nat:s=>[cmp('base',R('attachement au Canada','attachment to Canada'),3+(s.flags.loi101&&s.orient.langue5==='charte'?-1:0))]},
  {id:'allos',lang:'allo',seatEff:.65,name:R('Les allophones','Allophones'),d:R("Italiens, Grecs, Portugais, Haïtiens, Vietnamiens, Libanais…","Italians, Greeks, Portuguese, Haitians, Vietnamese, Lebanese…"),
   w:s=>s.allo,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-50)*.15)],nat0:5,
   nat:s=>[cmp('base',R("une économie qui parle anglais","an economy that speaks English"),3),cmp('fr',R("les enfants à l'école française","children in French school"),s.fraFrac*12)]}],
 policy:{
  ottawa5:{federalisme:{anglos:10,allos:8,capital:6,quebecinc:2,technocrates:-6,ouvriers:-2},autonomie:{technocrates:4,ouvriers:1,anglos:-2},souverainete:{technocrates:7,ouvriers:2,quebecinc:-5,capital:-12,anglos:-18,allos:-14,precaires:-2}},
  langue5:{libre:{anglos:6,allos:8,capital:5,technocrates:-8,ouvriers:-3},incitation:{anglos:-3,allos:-2,technocrates:1},charte:{anglos:-14,allos:-8,capital:-8,technocrates:8,ouvriers:4,quebecinc:1}},
  etat5:{interventionniste:{technocrates:8,ouvriers:3,precaires:3,capital:-8,quebecinc:-2},partenariat:{quebecinc:8,technocrates:2,capital:1},liberal:{capital:8,quebecinc:4,technocrates:-10,ouvriers:-6,precaires:-6}},
  nord5:{harnacher:{ouvriers:3,quebecinc:3,capital:2},negocier:{},nation:{technocrates:1,ouvriers:-1}},
  finances5:{equilibre:{},emprunt:{ouvriers:3,technocrates:4,precaires:3,capital:-3},austerite:{ouvriers:-9,technocrates:-10,precaires:-10,capital:6,quebecinc:4}},
  travail5:{concertation:{ouvriers:2,quebecinc:1},social:{ouvriers:8,precaires:3,capital:-8,quebecinc:-5},fermete:{ouvriers:-10,capital:6,quebecinc:3}}},
 budget:{educ:{technocrates:.12,ouvriers:.04},sante:{precaires:.12,ouvriers:.06,technocrates:.05},nord:{ouvriers:.05,quebecinc:.05},langue:{technocrates:.06,allos:.03},economie:{quebecinc:.1,capital:.05,precaires:.04}},
 kSat:.35,kNat:1.4,tau:10,seatExp:2.6,fatigue:s=>{const n=s.year-(s.govSince||1960);return n<3?-(3-n)*1.5:Math.min(5,Math.max(0,n-4)*1);},
 aff:(s,g,p)=>{const y=s.year;const A={capital:{plq:9,un:0,pq:-6},quebecinc:{plq:3,un:1,pq:-1},technocrates:{plq:1,un:-2,pq:2},ouvriers:{plq:0,un:1,pq:0},precaires:{plq:0,un:2.5,pq:-1},anglos:{plq:10,un:-1,pq:-8,egal:-5},allos:{plq:8,un:-2,pq:-6,egal:-4}};
   let v=(A[g]||{})[p]??(p==='egal'?-30:0);if(p==='un'&&['ouvriers','precaires','quebecinc'].includes(g))v+=4;/* la machine rurale de l'Union nationale */
   if(p==='pq'&&y>=1970&&(g==='technocrates'||g==='ouvriers'))v+=g==='technocrates'?4:2.5;/* le PQ, parti de la nouvelle classe moyenne et des syndiqués */
   if(p==='un'&&y>1968)v-=Math.min(16,(y-1968)*1.6);if(p==='un'&&g==='anglos'&&y>=1976&&y<1981&&s.orient.langue5!=='libre')v+=6;return v;},
 after:(s,dt)=>{const P=s.pol,y=s.year,F=s.flags;
  /* l'appui à la souveraineté : la moyenne des francophones */
  const sv=polMean(s,'nat',isFr);s.souv=clamp(sv,0,95);
  /* le centre : Ottawa et le Canada anglais */
  const cen=P.cen;const pm=officer5(s,'gov').name;const firm=/Trudeau|Chrétien|Diefenbaker/.test(pm);
  cen.threat=s.souv;
  const opT=clamp(56-(s.orient.langue5==='charte'?7:s.orient.langue5==='incitation'?2:0)-dk(F.loi178,12,1988,y,6)-(s.orient.ottawa5==='souverainete'?6:0)-(F.meechPlus?5:0)+(F.victoria||F.signe82||F.formuleSignee?6:0)-dk(F.oui,25,F.ouiY||y,y,4)+(F.okaNego?-2:0)+(F.loi178Annulee?4:0),0,100);
  cen.op+=(opT-cen.op)*(1-Math.pow(.75,dt));
  cen.strat=cen.threat>=50&&firm?'planB':firm?'fermete':'accommodement';
  if(cen.strat==='accommodement')s.autonomy=clamp(s.autonomy+.25*dt,0,100);
  /* le capital : il investit, ou il s'en va */
  const cl=clamp((P.g.capital?P.g.capital.sat:50)*.55+(P.g.quebecinc?P.g.quebecinc.sat:50)*.45-(F.refSoon?6:0)-(F.oui?20:0),0,100);
  P.cap+=(cl-P.cap)*(1-Math.pow(.7,dt));
  s.eco=clamp(s.eco+(P.cap-50)*.05*dt,0,100);
  s.mtl=clamp((s.mtl??58)-(.35+Math.max(0,50-P.cap)*.03)*dt+(P.g.quebecinc&&P.g.quebecinc.sat>60?.15*dt:0),15,80);
  /* l'appui au gouvernement : les intentions de vote */
  const r=polVote(s,parties5(s));const g=govParty5(s);s.support+=(clamp((r.v[g]||0)*100,0,100)-s.support)*(1-Math.pow(.6,dt));s.poll=r.v;}};
/* les partis en présence, et leur position sur la question nationale */
function parties5(s){const g=govParty5(s),y=s.year,F=s.flags;const st={federalisme:20,autonomie:45,souverainete:80};
  const L=[{id:'plq',stance:g==='plq'?st[s.orient.ottawa5]:22,gov:g==='plq'}];
  if(y<1986||g==='un')L.push({id:'un',stance:g==='un'?st[s.orient.ottawa5]:45,gov:g==='un'});
  if(F.loi178&&y>=1989&&y<1999)L.push({id:'egal',stance:15,gov:false});/* le Parti Égalité : les anglophones quittent les libéraux */
  if(F.pq||g==='pq')L.push({id:'pq',stance:g==='pq'?st[s.orient.ottawa5]:(F.beauRisque&&y<1988?60:78),gov:g==='pq'});
  return L;}
/* ce qui pousse les francophones vers la souveraineté, ou les en retient */
function natCommon5(s,extra,fearK){const y=s.year,F=s.flags,gov=govParty5(s);
  const lost=(s.refs||[]).reduce((t,r)=>t+(r.yes<50?Math.max(0,(r.yes-30))*.35*Math.exp(-(y-r.y)/6):0),0);
  const fatigue=(s.refs||[]).some(r=>r.yes>=45&&r.yes<50)?Math.max(0,y-(s.lastRef||y))*1.6:0;
  const leader=Math.min(3,(gov==='pq'&&['Lévesque','Bouchard'].includes(premier5(s).sn)?3:0)+(F.bouchard?3:0));
  const C=[
   cmp('socle',R('le socle','the baseline'),13),
   cmp('patri',R("l'identité nationale","national identity"),(s.patri-30)*1.0),
   cmp('vehicule',R("pas de parti souverainiste crédible","no credible sovereigntist party"),F.pq?0:-6),
   cmp('fear',R("la peur pour l'emploi","fear for jobs"),-Math.max(0,s.chom-8)*.9*fearK),
   cmp('offer',R("les offres du Canada","Canada's offers"),(F.societeDistincte?-14:0)+(F.statutParticulier?-10:0)+(F.beauRisque&&!F.meechDead?-3:0)),
   cmp('lost',R("la défaite référendaire","the referendum defeat"),-lost-fatigue),
   cmp('leader',R('les chefs souverainistes','sovereigntist leaders'),leader),
   cmp('meech',R("l'échec de Meech","the failure of Meech"),dk(F.meechDead,12,1990,y,7)),
   cmp('rapat',R("le rapatriement sans le Québec","patriation without Quebec"),dk(F.rapatriement,5,1982,y,12)),
   cmp('pqgov',R("un gouvernement qui fait campagne","a government campaigning for it"),s.orient.ottawa5==='souverainete'&&gov==='pq'?4:0),
   cmp('langue',R("la peur pour le français : les enfants d'immigrants vont à l'école anglaise","fear for French: immigrants' children go to English schools"),Math.max(0,.5-s.fraFrac)*25),
   cmp('edu',R("une jeunesse instruite","an educated youth"),(s.edu-50)*.1),
   cmp('roi',R("l'attachement au Canada","attachment to Canada"),-(s.traits.roi-50)*.2),
   cmp('cen',R("la stratégie d'Ottawa","Ottawa's strategy"),s.pol&&s.pol.cen.strat==='planB'?2:s.pol&&s.pol.cen.strat==='accommodement'?-2:0)];
  return C.concat(extra||[]);}

/* =====================================================================================
   PÉRIODE IV (1867–1960) : le capital étranger, le clergé, la petite bourgeoisie, les cultivateurs, les ouvriers
   ===================================================================================== */
POL[4]={
 groups:[
  {id:'professions',cls:'professions',lang:'fr',name:R('La petite bourgeoisie canadienne-française','The French-Canadian petty bourgeoisie'),d:R("Avocats, notaires, médecins, journalistes : les cadres du nationalisme.","Lawyers, notaries, doctors, journalists: the cadres of nationalism."),
   w:s=>(s.pop-s.ang)*.06,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-45)*.1)],nat0:30,
   nat:s=>natCommon4(s,[cmp('foreign',R('une économie aux mains des autres','an economy in others’ hands'),Math.max(0,s.foreign-45)*.45),cmp('edu',R('instruction','schooling'),(s.edu-20)*.15),cmp('base',R('position de classe','class position'),8)],1)},
  {id:'clerge',cls:'clerge',lang:'fr',name:R('Le clergé','The clergy'),d:R("Évêques, curés, communautés : ils tiennent l'école, l'hôpital et la chaire.","Bishops, priests, orders: they hold the school, the hospital and the pulpit."),
   w:s=>(s.pop-s.ang)*.006,econ:s=>[],nat0:25,
   nat:s=>natCommon4(s,[cmp('ecoles',R("les écoles françaises et catholiques","French Catholic schools"),(s.flags.manitoba?4:0)+(s.flags.reglement17&&!s.flags.reg17Abroge?6:0)+(s.flags.nbSchools?2:0)),cmp('etat',R("l'État qui empiète","the encroaching state"),s.orient.eglise4==='etat'?-8:0),cmp('base',R('position de classe','class position'),2)],.8)},
  {id:'habitants',cls:'habitants',lang:'fr',seatEff:1.5,name:R('Les cultivateurs et les colons','Farmers and settlers'),d:R("La campagne, les paroisses, les régions de colonisation.","The countryside, the parishes, the colonization regions."),
   w:s=>(s.pop-s.ang)*(1-s.urb)*.9,econ:s=>[cmp('press',R('le manque de terres','land shortage'),-(s.press||0)*45),cmp('crise',R('la Crise','the Depression'),s.flags.crise?-8:0)],nat0:18,
   nat:s=>natCommon4(s,[cmp('press',R('le manque de terres','land shortage'),(s.press||0)*30),cmp('eglise',R("la parole du curé","the priest's word"),(s.church-60)*.08),cmp('base',R('position de classe','class position'),-2)],1.1)},
  {id:'ouvriers',cls:'ouvriers',lang:'fr',seatEff:.8,name:R('Les ouvriers canadiens-français','French-Canadian workers'),d:R("Filatures, chantiers, usines de Montréal et des villes de compagnie.","Mills, lumber camps, factories of Montreal and the company towns."),
   w:s=>(s.pop-s.ang)*s.urb*.85,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-45)*.25),cmp('crise',R('la Crise','the Depression'),s.flags.crise?-12:0)],nat0:14,
   nat:s=>natCommon4(s,[cmp('foreign',R("le patron parle anglais","the boss speaks English"),Math.max(0,s.foreign-50)*.15),cmp('base',R('position de classe','class position'),-5)],.8)},
  {id:'capital',cls:'capital',lang:'en',seatEff:.4,name:R('La haute finance et les grandes compagnies','High finance and the big companies'),d:R("La Banque de Montréal, le Canadien Pacifique, les papetières américaines.","The Bank of Montreal, Canadian Pacific, the American paper companies."),
   w:s=>s.ang*.05,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-45)*.35)],nat0:3,nat:s=>[cmp('base',R('position de classe','class position'),3)]},
  {id:'anglos',lang:'en',seatEff:.6,name:R('Les anglophones','Anglophones'),d:R("Montréal anglais, les Cantons de l'Est, l'Outaouais, la Gaspésie loyaliste.","English Montreal, the Eastern Townships, the Outaouais, Loyalist Gaspé."),
   w:s=>s.ang*.95,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-45)*.15)],nat0:2,nat:s=>[cmp('base',R("loyauté à l'Empire","loyalty to the Empire"),2)]}],
 policy:{
  eglise4:{concordat:{clerge:15,habitants:3,professions:-2,ouvriers:-1},etat:{clerge:-18,professions:6,ouvriers:3,anglos:2,habitants:-4}},
  eco4:{agricole:{habitants:8,clerge:4,capital:-6,ouvriers:-3},ressources:{capital:12,ouvriers:2,habitants:-4,professions:-4},national:{professions:8,habitants:3,ouvriers:2,capital:-12,anglos:-4}},
  ottawa:{cooperation:{anglos:6,capital:5,professions:-5},autonomie:{professions:3,clerge:3,habitants:1},affirmation:{professions:6,clerge:2,anglos:-10,capital:-8}},
  travail4:{ordre:{capital:8,clerge:2,ouvriers:-10},catholiques:{clerge:6,ouvriers:2,capital:-2},syndicats:{ouvriers:10,capital:-10,clerge:-6}},
  minorites:{solidarite:{professions:4,clerge:4,anglos:-3},prudence:{}}},
 budget:{colon:{habitants:.15,clerge:.05},ecoles:{professions:.08,clerge:.04},sante:{ouvriers:.08,habitants:.03},routes:{habitants:.08,capital:.04,professions:.03,ouvriers:.03},industrie:{capital:.1,ouvriers:.06}},
 kSat:.35,kNat:1.4,tau:9,seatExp:2.6,satK:.7,fatigue:s=>{const n=s.year-(s.govSince||1867);return n<3?-(3-n)*1.5:Math.min(6,Math.max(0,n-10)*.5);},
 aff:(s,g,p)=>{const y=s.year,F=s.flags;let v=0;const fr=g!=='capital'&&g!=='anglos';
   if(g==='clerge')v=p==='bleu'?Math.max(4,12-Math.max(0,y-1896)*.12):0;
   else if(g==='habitants')v=p==='bleu'?2:0;
   else if(g==='ouvriers')v=p==='rouge'?2:0;
   else if(g==='professions')v=p==='rouge'?(y>=1935?-2:1.5):(y>=1935?2:0);
   else if(g==='capital')v=(y<1897||y>=1944)?(p==='bleu'?6:0):(p==='rouge'?6:0);
   else if(g==='anglos')v=y<1897?(p==='bleu'?5:0):(p==='rouge'?(y<1936?7:11):0);
   if(fr){/* le Canada anglais blesse, et le parti allié d'Ottawa paie : Riel, les conscriptions */
     const fp=(f,Y,w,tau)=>f&&p===fedSide4(Y)?-w*Math.exp(-Math.max(0,y-Y)/tau):0;
     v+=fp(F.riel,1885,9,5)+fp(F.conscription,1917,9,22)+fp(F.conscription44,1944,8,8);
     if(p==='rouge'&&y>=1896&&y<1911)v+=3;/* Laurier, premier Canadien français à Ottawa */}
   return v;},
 after:(s,dt)=>{const P=s.pol,y=s.year,F=s.flags;
  /* le nationalisme : la moyenne des Canadiens français */
  s.patri=clamp(polMean(s,'nat',isFr),0,100);
  /* le centre : Ottawa et le Canada anglais */
  const cen=P.cen;cen.threat=s.patri;
  const opT=clamp(55-(s.orient.ottawa==='affirmation'?8:0)-(s.orient.minorites==='solidarite'?3:0)-dk(F.jesuites,6,1888,y,10)-dk(F.partiNational,6,1886,y,10)-(F.conscription&&s.orient.ottawa!=='cooperation'?6:0)+(s.orient.ottawa==='cooperation'?5:0),0,100);
  cen.op+=(opT-cen.op)*(1-Math.pow(.8,dt));cen.strat=cen.op<40?'centralisation':cen.op>58?'bonne entente':'neutre';
  /* le capital : il investit dans les ressources, ou il se retire */
  const cl=clamp((P.g.capital?P.g.capital.sat:50),0,100);P.cap+=(cl-P.cap)*(1-Math.pow(.7,dt));
  s.eco=clamp(s.eco+(P.cap-50)*.03*dt,0,100);s.foreign=clamp(s.foreign+(P.cap-50)*.01*dt,10,95);
  /* l'appui au gouvernement : les intentions de vote */
  const r=polVote(s,parties4(s));const g=govSide4(s);s.support+=(clamp((r.v[g]||0)*100,0,100)-s.support)*(1-Math.pow(.6,dt));s.poll=r.v;}};
function parties4(s){const g=govSide4(s),y=s.year,F=s.flags;const st={cooperation:25,autonomie:42,affirmation:62};
  const bleuSt=y>=1936?55:40,rougeSt=(y>=1886&&y<1892)?60:28;
  return [{id:'bleu',stance:g==='bleu'?st[s.orient.ottawa]:bleuSt,gov:g==='bleu'},{id:'rouge',stance:g==='rouge'?st[s.orient.ottawa]:rougeSt,gov:g==='rouge'}];}
function natCommon4(s,extra,gk){const y=s.year,F=s.flags;
  const grief=dk(F.riel,9,1885,y,30)+dk(F.manitoba,4,1890,y,30)+(F.reglement17&&!F.reg17Abroge?6:dk(F.reglement17,4,1927,y,30))+dk(F.conscription,14,1917,y,30)+dk(F.conscription44,9,1944,y,30)+dk(F.labrador,3,1927,y,30)+dk(F.richard,3,1955,y,30)+(F.tutelle?8:0);
  const C=[cmp('socle',R('le socle','the baseline'),15),
   cmp('grief',R("les blessures infligées par le Canada anglais","wounds inflicted by English Canada"),grief*gk),
   cmp('lead',R("l'attitude du gouvernement face à Ottawa","the government's stance towards Ottawa"),{cooperation:-4,autonomie:6,affirmation:16}[s.orient.ottawa]),
   cmp('minor',R("la solidarité avec les minorités","solidarity with the minorities"),s.orient.minorites==='solidarite'?4:0),
   cmp('presse',R("la presse et les mouvements nationalistes","nationalist press and movements"),(F.devoir?3:0)+(F.actionNationale?4:0)+(F.fleurdelise?3:0)),
   cmp('cen',R("l'attitude du Canada anglais","English Canada's attitude"),s.pol&&s.pol.cen.op<40?4:s.pol&&s.pol.cen.op>58?-2:0)];
  return C.concat(extra||[]);}

/* =====================================================================================
   PÉRIODE III (1760–1867) : les marchands britanniques, les seigneurs, le clergé, les professions, les habitants
   ===================================================================================== */
const LINE3={loyal:20,reforme:50,patriote:80};
POL[3]={
 groups:[
  {id:'professions',cls:'professions',lang:'fr',name:R('Les professions libérales','The liberal professions'),d:R("Avocats, notaires, médecins, journalistes : le Parti canadien, puis les Patriotes.","Lawyers, notaries, doctors, journalists: the Parti canadien, then the Patriotes."),
   w:s=>(s.pop-s.ang)*.03,econ:s=>[cmp('places',R("les places réservées aux Anglais","offices reserved for the English"),s.flags.responsable?4:s.year>=1792?-6:-2)],nat0:20,
   nat:s=>natCommon3(s,[cmp('places',R("les places et le pouvoir refusés","offices and power denied"),(s.year>=1792?10:0)+(s.flags.unionAct&&!s.flags.responsable?12:0)-(s.flags.responsable?14:0)),cmp('edu',R('instruction','schooling'),(s.edu-12)*.4),cmp('presse',R('leurs journaux','their newspapers'),Math.log1p((s.alloc.presse||0)/(300*Math.max(1,s.pop/70000)))*4)],1)},
  {id:'habitants',cls:'habitants',lang:'fr',name:R('Les habitants','The habitants'),d:R("Les censitaires des seigneuries, la grande majorité du peuple.","The seigneurial tenants, the great majority of the people."),
   w:s=>(s.pop-s.ang)*(.95-ouv3(s)),econ:s=>[cmp('press',R('le manque de terres','land shortage'),-(s.press||0)*60),cmp('ble',R('la crise du blé','the wheat crisis'),s.year>=1833&&s.year<=1838?-8:0)],nat0:12,
   nat:s=>natCommon3(s,[cmp('press',R('le manque de terres','land shortage'),(s.press||0)*70),cmp('ble',R('la crise du blé','the wheat crisis'),s.year>=1833&&s.year<=1838?8:0),cmp('eglise',R("le curé prêche la soumission","the priest preaches submission"),-(s.church-40)*(s.orient.cour==='patriote'&&s.orient.eglise==='ultramontain'?.15:.05))],1)},
  {id:'ouvriers',cls:'ouvriers',lang:'fr',from:1800,name:R('Journaliers et ouvriers','Day labourers and workers'),d:R("Charretiers, débardeurs, ouvriers des chantiers et des canaux.","Carters, dockers, workers in the shipyards and on the canals."),
   w:s=>(s.pop-s.ang)*ouv3(s),econ:s=>[cmp('eco',R('économie','economy'),(s.eco-35)*.3)],nat0:12,
   nat:s=>natCommon3(s,[cmp('immig',R("la concurrence des immigrants","competition from immigrants"),s.year>=1831&&s.year<=1836?6:0),cmp('base',R('position de classe','class position'),2)],.7)},
  {id:'seigneurs',cls:'seigneurs',lang:'fr',name:R('Les seigneurs','The seigneurs'),d:R("La vieille noblesse et les nouveaux seigneurs : la terre et ses rentes.","The old nobility and the new seigneurs: the land and its dues."),
   w:s=>(s.pop-s.ang)*.008,econ:s=>[],nat0:8,
   nat:s=>natCommon3(s,[cmp('base',R('position de classe','class position'),-8),cmp('terre',R("la tenure seigneuriale menacée","seigneurial tenure under threat"),s.orient.terre==='franc'?-6:0)],.25)},
  {id:'clerge',cls:'clerge',lang:'fr',name:R('Le clergé','The clergy'),d:R("L'évêque et les curés : la survivance par la foi, et la loyauté au roi.","The bishop and the priests: survival through faith, and loyalty to the King."),
   w:s=>(s.pop-s.ang)*.004,econ:s=>[],nat0:8,
   nat:s=>natCommon3(s,[cmp('base',R('position de classe','class position'),-10),cmp('libre',R("les idées libérales","liberal ideas"),s.orient.eglise==='liberal'?-5:0),cmp('ultra',R("le nationalisme catholique","Catholic nationalism"),s.year>=1840?5:0)],.3)},
  {id:'marchands',cls:'marchands',lang:'en',seatEff:.5,name:R('Les marchands britanniques','The British merchants'),d:R("Montréal et Québec : la fourrure, le bois, le blé, puis les banques et les canaux.","Montréal and Québec: furs, timber, wheat, then banks and canals."),
   w:s=>s.ang*.08,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-35)*.4)],nat0:2,nat:s=>[cmp('base',R('position de classe','class position'),2)]},
  {id:'anglos',lang:'en',seatEff:.7,name:R('Les colons anglophones','English-speaking settlers'),d:R("Loyalistes, Cantons de l'Est, Irlandais de Québec et de Montréal.","Loyalists, Eastern Townships, the Irish of Québec and Montréal."),
   w:s=>s.ang*.92,econ:s=>[cmp('eco',R('économie','economy'),(s.eco-35)*.15)],nat0:3,nat:s=>[cmp('base',R('position de classe','class position'),3)]}],
 policy:{
  cour:{loyal:{seigneurs:8,clerge:6,marchands:6,anglos:4,professions:-8,habitants:-3},reforme:{professions:4,habitants:2},patriote:{professions:8,habitants:4,seigneurs:-10,clerge:-10,marchands:-12,anglos:-10}},
  eglise:{ultramontain:{clerge:10,habitants:2,professions:-3},liberal:{clerge:-12,professions:5}},
  terre:{seigneurie:{seigneurs:10,habitants:-4,marchands:-6},franc:{seigneurs:-12,habitants:3,marchands:6,anglos:4}},
  eco3:{agriculture:{habitants:4,marchands:-4},bois:{ouvriers:5,marchands:4,habitants:1},commerce:{marchands:8,ouvriers:3,habitants:-2}},
  travail:{ordre:{marchands:3,ouvriers:-6},secours:{ouvriers:6,marchands:-3}}},
 budget:{ecoles:{clerge:.1,professions:.06},terres:{habitants:.15},commerce:{marchands:.1,ouvriers:.05},presse:{professions:.12},loyal:{seigneurs:.08,marchands:.05,clerge:.03}},
 kSat:.35,kNat:1.4,tau:6,seatExp:2.6,
 aff:(s,g,p)=>{const A={habitants:{canadien:6,anglais:-10,rouges:-1},professions:{canadien:4,anglais:-10,rouges:2},seigneurs:{canadien:2,anglais:2,rouges:-6},clerge:{canadien:4,anglais:-2,rouges:-10},ouvriers:{canadien:3,anglais:-8,rouges:1},marchands:{canadien:-8,anglais:10,rouges:-6},anglos:{canadien:-10,anglais:10,rouges:-2}};return (A[g]||{})[p]||0;},
 after:(s,dt)=>{const P=s.pol,y=s.year,F=s.flags;
  /* le mouvement national : la moyenne des Canadiens */
  s.patri=clamp(polMean(s,'nat',isFr),0,100);
  /* la légitimité de votre ligne : êtes-vous en phase avec le peuple ? */
  const line=LINE3[s.orient.cour]||50;s.legit=clamp(100-polMean(s,'nat',isFr)*0+(-Math.abs(polMean(s,'nat',isFr)-line))*1.4,0,100);s.gap3=polMean(s,'nat',isFr)-line;
  /* le centre : Londres et le gouverneur */
  const cen=P.cen;cen.threat=s.patri;const war=warAt3(y);
  const opT=clamp(50+(s.orient.cour==='loyal'?10:s.orient.cour==='patriote'?-14:0)+(war&&war.id!=='rebellions'?10:0)-Math.max(0,50-(P.g.marchands?P.g.marchands.sat:50))*.4-(F.rebFail?12:0)+(F.lafontaine?6:0),0,100);
  cen.op+=(opT-cen.op)*(1-Math.pow(.75,dt));
  cen.strat=cen.op>=55||(war&&war.id!=='rebellions')?'conciliation':cen.op<35&&cen.threat>35?'coercition':'statu quo';
  if(cen.strat==='conciliation')s.autonomy=clamp(s.autonomy+.3*dt,0,100);
  if(cen.strat==='coercition'){s.autonomy=clamp(s.autonomy-.3*dt,0,100);F.coercition=y;}
  /* le capital marchand : il prête, investit, ou fait pression sur Londres */
  const cl=clamp(P.g.marchands?P.g.marchands.sat:50,0,100);P.cap+=(cl-P.cap)*(1-Math.pow(.7,dt));
  s.eco=clamp(s.eco+(P.cap-50)*.03*dt,0,100);}};
function ouv3(s){return s.year<1800?0:clamp(.02+(s.capital||0)*.25,.02,.2);}
function natCommon3(s,extra,gk){const y=s.year,F=s.flags;
  const grief=(F.craig?6:0)+(F.dalhousie?5:0)+(F.russell?12:0)+(F.durham?3:0)+(F.unionAct&&!F.responsable?6:0)+(F.coercition&&y-F.coercition<4?5:0);
  const C=[cmp('socle',R('le socle','the baseline'),6+(y>=1792?6:0)),
   cmp('grief',R("les affronts du pouvoir britannique","affronts from British power"),grief*gk),
   cmp('lead',R("la ligne des chefs canadiens","the Canadien leaders' line"),{loyal:-5,reforme:5,patriote:14}[s.orient.cour]),
   cmp('peur',R("la répression","repression"),F.repression?-12:0)];
  return C.concat(extra||[]);}

/* =====================================================================================
   L'interface : « Les forces sociales » — qui veut quoi, et pourquoi
   ===================================================================================== */
const CEN_LAB={
 3:{who:R('Londres et le gouverneur','London and the Governor'),op:R("Humeur de Londres","London's mood"),
    st:{conciliation:R('conciliation : on achète la paix avec des places et des concessions','conciliation: buying peace with offices and concessions'),'statu quo':R("statu quo : on gouverne avec la clique du Château","status quo: governing with the Château clique"),coercition:R('coercition : on suspend, on arrête, on envoie des troupes','coercion: suspensions, arrests, troops')}},
 4:{who:R('Ottawa et le Canada anglais','Ottawa and English Canada'),op:R("Humeur du Canada anglais","English Canada's mood"),
    st:{'bonne entente':R("bonne entente : on ménage le Québec","bonne entente: Quebec is handled with care"),neutre:R("indifférence : le Québec est une province parmi d'autres","indifference: Quebec is one province among others"),centralisation:R("centralisation : Ottawa et l'Ontario imposent leur vision","centralization: Ottawa and Ontario impose their vision")}},
 5:{who:R('Ottawa et le Canada anglais','Ottawa and English Canada'),op:R("Ouverture du Canada anglais","English Canada's openness"),
    st:{accommodement:R("accommodement : on cherche une entente, on offre des pouvoirs","accommodation: seeking a deal, offering powers"),fermete:R("fermeté : une seule nation, une Charte, pas de statut particulier","firmness: one nation, one Charter, no special status"),planB:R("plan B : la loi sur la clarté, la partition, la peur","Plan B: the clarity act, partition, fear")}}};
const cap1=x=>x?x[0].toUpperCase()+x.slice(1):x;
const PARTY_LAB={plq:R('PLQ','PLQ'),un:R('Union nationale','Union nationale'),pq:R('PQ','PQ'),bleu:R('Bleus','Bleus'),rouge:R('Rouges','Rouges'),egal:R('Égalité','Equality'),canadien:R('Parti canadien','Parti canadien'),anglais:R('Parti des bureaucrates','Bureaucrats’ party'),rouges:R('Rouges','Rouges')};
function polPartyLab(s,id){if(s.period===4&&typeof partyLabel4==='function'){try{return partyLabel4(s,id);}catch(e){}}return PARTY_LAB[id]||(s.period===5&&typeof PARTIES5!=='undefined'&&PARTIES5[id]?PARTIES5[id].short:R(id,id));}
function satWord(v){return v>=65?[R('satisfaits','satisfied'),'good']:v>=50?[R('partagés','divided'),'']:v>=38?[R('mécontents','unhappy'),'warn']:[R('en colère','angry'),'bad'];}
function whyList(arr,n){const F=fr();return '<ul class="why">'+arr.filter(c=>Math.abs(c.v)>=.5).slice(0,n||6).map(c=>`<li><span>${L(c.l)}</span><b class="${c.v>0?'up':'down'}">${c.v>0?'+':'−'}${Math.abs(c.v).toFixed(c.v>-1&&c.v<1?1:0)}</b></li>`).join('')+'</ul>';}
function polityHTML(s){const c=polCfg(s);if(!c||!s.pol||!s.pol.g)return '';const F=fr(),P=s.pol,p=s.period;
  const head=p===5?R("Appui à la souveraineté (francophones)","Support for sovereignty (francophones)"):p===4?R('Nationalisme canadien-français','French-Canadian nationalism'):R('Le mouvement national','The national movement');
  const hv=p===5?s.souv:s.patri;
  let h=`<section class="polity"><h4>${F?'Les forces sociales':'Social forces'}</h4><p class="quiet" style="margin:0 0 6px">${F?"Chaque groupe juge le pouvoir selon ce qu'il en reçoit. Les votes, le nationalisme et la révolte sont la somme de ces jugements.":"Each group judges power by what it gets from it. Votes, nationalism and revolt are the sum of those judgments."}</p>`;
  h+=`<details class="whyBox"><summary><b>${L(head)} : ${Math.round(hv)} %</b> <span class="quiet">${F?'— pourquoi ?':'— why?'}</span></summary>${whyList(polWhy(s,'nat',isFr),8)}</details>`;
  if(s.poll){const ks=Object.keys(s.poll).sort((a,b)=>s.poll[b]-s.poll[a]);h+=`<p class="poll">${F?'Intentions de vote':'Voting intentions'} : ${ks.map(k=>`<b>${L(polPartyLab(s,k))}</b> ${Math.round(s.poll[k]*100)} %`).join(' · ')}</p>`;}
  for(const g of polGroups(s)){const st=P.g[g.id];if(!st)continue;const [w,tone]=satWord(st.sat);
    let vote='';if(s.lastVote&&s.lastVote.byG&&s.lastVote.byG[g.id]){const b=s.lastVote.byG[g.id];const k=Object.keys(b).sort((x,y)=>b[y]-b[x])[0];vote=` · ${F?'vote':'votes'} ${L(polPartyLab(s,k))} ${Math.round(b[k]*100)} %`;}
    h+=`<details class="grp"><summary><span class="gn">${L(g.name)}</span> <b class="${tone}">${L(w)}</b><em>${Math.round(st.share*100)} % ${F?'des voix':'of voters'}${vote}</em><i class="natbar"><i style="width:${clamp(st.nat,0,100)}%"></i></i></summary>
      <p class="quiet">${L(g.d)}</p><div class="whycols"><div><h5>${F?'Leur satisfaction':'Their satisfaction'} (${Math.round(st.sat)})</h5>${whyList(st.whySat||[],5)}</div><div><h5>${F?'Leur nationalisme':'Their nationalism'} (${Math.round(st.nat)})</h5>${whyList(st.whyNat||[],5)}</div></div></details>`;}
  const CL=CEN_LAB[p];if(CL){h+=`<p class="cen"><b>${L(CL.who)}</b> — ${L(CL.st[P.cen.strat]||R(P.cen.strat,P.cen.strat))}. <span class="quiet">${L(CL.op)} : ${Math.round(P.cen.op)}/100</span></p>`;}
  const capW=P.cap>=60?R('le capital investit','capital is investing'):P.cap>=45?R('le capital attend','capital is waiting'):P.cap>=32?R("le capital hésite et se retire","capital hesitates and pulls back"):R("grève du capital : les sièges sociaux partent","capital strike: head offices are leaving");
  h+=`<p class="cap"><b>${F?"Le climat d'investissement":'Investment climate'}</b> — ${L(capW)} (${Math.round(P.cap)}/100)${p===5&&s.mtl!=null?` · ${F?'Montréal face à Toronto':'Montreal vs Toronto'} : ${Math.round(s.mtl)}/100`:''}${p===3&&s.legit!=null?` · ${F?'Votre ligne face au peuple':'Your line vs the people'} : ${s.gap3>12?(F?'trop prudente':'too cautious'):s.gap3<-12?(F?'trop radicale':'too radical'):(F?'en phase':'in step')}`:''}</p>`;
  return h+'</section>';}
/* raconter un vote : quels groupes ont basculé, quelle coalition gouverne */
function polVoteStory(s,r){const F=fr(),prev=s.prevByG||{};const sw=[];
  for(const g of polGroups(s)){const b=r.byG[g.id],a=prev[g.id];if(!b)continue;const k=Object.keys(b).sort((x,y)=>b[y]-b[x])[0];
    if(a){const d=(b[k]||0)-(a[k]||0);if(d>.1)sw.push({g,k,d,v:b[k]});}}
  s.prevByG=JSON.parse(JSON.stringify(r.byG));
  const win=Object.keys(r.seats).sort((a,b)=>r.seats[b]-r.seats[a])[0];
  const core=polGroups(s).filter(g=>r.byG[g.id]&&r.byG[g.id][win]>=.5&&s.pol.g[g.id].share>=.03).map(g=>L(g.name).toLowerCase());
  let t='';
  if(sw.length){sw.sort((a,b)=>b.d-a.d);const by={};for(const x of sw.slice(0,3))(by[x.k]=by[x.k]||[]).push(x);
    t+=Object.keys(by).map(k=>F?`Gains pour ${cap1(L(polPartyLab(s,k)))} : ${by[k].map(x=>`${L(x.g.name).toLowerCase()} (${Math.round(x.v*100)} %)`).join(', ')}.`:`Gains for ${cap1(L(polPartyLab(s,k)))}: ${by[k].map(x=>`${L(x.g.name).toLowerCase()} (${Math.round(x.v*100)}%)`).join(', ')}.`).join(' ');}
  if(core.length)t+=F?` La coalition gagnante : ${core.join(', ')}.`:` The winning coalition: ${core.join(', ')}.`;
  return t.trim();}
/* un parti se discrédite auprès de tous (scandale, trahison) */
function polPunish(s,party,v,only){if(!polCfg(s))return;for(const g of polGroups(s)){if(only&&!only.includes(g.id))continue;polRealign(s,g.id,party,v);}}
