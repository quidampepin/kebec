/* Kebec — La société : les groupes sociaux, ce que chacun tire du travail du pays, leurs griefs et leur organisation.
   Le moteur suit une lecture d'histoire sociale et matérialiste : la base économique (traite, seigneurie, capitalisme)
   fixe la part de chacun ; les inégalités produisent des griefs ; des griefs organisés produisent des crises ;
   et les mentalités (les traits) suivent, avec retard, les conditions matérielles. */
const CLASSES={
 1:[{id:'compagnie',name:R('La Compagnie et ses marchands','The Company and its merchants'),dom:true,fair:.25},
    {id:'clerge',name:R('Le clergé','The clergy'),dom:true,fair:.08},
    {id:'habitants',name:R('Les habitants','The habitants'),fair:.4},
    {id:'engages',name:R('Les engagés','The indentured men'),fair:.25}],
 2:[{id:'seigneurs',name:R('Les seigneurs','The seigneurs'),dom:true,fair:.06},
    {id:'clerge',name:R('Le clergé','The clergy'),dom:true,fair:.05},
    {id:'marchands',name:R('Les marchands','The merchants'),fair:.12},
    {id:'habitants',name:R('Les censitaires','The tenant farmers'),fair:.62},
    {id:'engages',name:R('Voyageurs et engagés','Voyageurs and hired men'),fair:.12}],
 3:[{id:'marchands',name:R('La bourgeoisie marchande','The merchant bourgeoisie'),dom:true,fair:.1},
    {id:'seigneurs',name:R('Les seigneurs','The seigneurs'),fair:.04},
    {id:'clerge',name:R('Le clergé','The clergy'),fair:.05},
    {id:'professions',name:R('Les professions libérales','The liberal professions'),fair:.06},
    {id:'habitants',name:R('Les habitants','The habitants'),fair:.6},
    {id:'ouvriers',name:R('Journaliers et ouvriers','Day labourers and workers'),fair:.15,from:1800}],
 4:[{id:'capital',name:R('La haute finance et les grandes compagnies','High finance and the big companies'),dom:true,fair:.07},
    {id:'clerge',name:R('Le clergé','The clergy'),dom:true,fair:.04},
    {id:'professions',name:R('La petite bourgeoisie canadienne-française','The French-Canadian petty bourgeoisie'),fair:.09},
    {id:'habitants',name:R('Cultivateurs et colons','Farmers and settlers'),fair:s=>Math.max(.08,(1-(s.urb||.25))*.8)},
    {id:'ouvriers',name:R('La classe ouvrière','The working class'),fair:s=>Math.max(.08,(s.urb||.25)*.8)}],
 5:[{id:'capital',name:R('Le grand capital anglo-canadien et étranger','Big Anglo-Canadian and foreign capital'),dom:true,fair:.06},
    {id:'quebecinc',name:R('Les gens d’affaires francophones (le « Québec inc. »)','Francophone business (“Quebec Inc.”)'),fair:.07},
    {id:'technocrates',name:R('La nouvelle classe moyenne : fonctionnaires, enseignants, professionnels','The new middle class: civil servants, teachers, professionals'),fair:.22},
    {id:'ouvriers',name:R('Les salariés syndiqués','Unionized workers'),fair:.45},
    {id:'precaires',name:R('Les exclus : chômeurs, assistés sociaux, régions','The left-behind: the unemployed, welfare recipients, the regions'),fair:.2}]};
const fairOf=(s,c)=>typeof c.fair==='function'?c.fair(s):c.fair;
const classList=s=>(CLASSES[s.period||1]||CLASSES[1]).filter(c=>!c.from||s.year>=c.from);
/* le mode de production : il change, qu'on le veuille ou non (comme les guerres d'empire) */
function capitalTarget(s){const y=s.year;let t=clamp((y-1790)/85,0,1)*(.7+(s.eco||30)/160);
  if(s.flags.chemins)t+=.1;if(s.flags.reciprocite)t+=.05;if(s.orient&&s.orient.eco3==='commerce')t+=.06;if(s.orient&&s.orient.eco3==='bois')t+=.03;return clamp(t,0,1);}
function capitalTarget4(s){const y=s.year,O=s.orient||{},F=s.flags||{};let t=.38+clamp((y-1867)/85,0,1)*.5*(.75+(s.eco||35)/140);
  if(O.eco4==='ressources')t+=.06;if(O.eco4==='agricole')t-=.05;if(F.hydroQc)t+=.03;if(F.crise)t-=.06;return clamp(t,0,1);}
function modeOf(s){const p=s.period||1;
  if(p===5){const y=s.year;if(y<1982)return {id:'etatprov',name:R("L'État-providence et l'État-entrepreneur","The welfare state and the entrepreneurial state"),d:R("Écoles, hôpitaux, Hydro-Québec, Caisse de dépôt : l'État québécois devient le levier économique des francophones ; la fonction publique et les syndicats grossissent.","Schools, hospitals, Hydro-Québec, the Caisse de dépôt: the Quebec state becomes francophones' economic lever; the civil service and the unions grow.")};
   return {id:'mondial',name:R("Le libre-échange et l'économie du savoir","Free trade and the knowledge economy"),d:R("Les usines ferment ou s'automatisent, les services et la haute technologie prennent le relais ; les marchés financiers jugent la dette de l'État.","Factories close or automate, services and high technology take over; financial markets judge the state's debt.")};}
  if(p===4){const c=s.capital||0;
   if(c<.5)return {id:'rural',name:R('Une économie rurale qui se vide','A rural economy emptying out'),d:R("La terre ne suffit plus aux familles nombreuses : les fils partent pour les filatures de la Nouvelle-Angleterre ou pour Montréal, où l'industrie paie mal.","The land no longer feeds large families: sons leave for the New England mills or for Montréal, where industry pays poorly.")};
   if(c<.72)return {id:'ressources',name:R('Les ressources et le capital étranger','Resources and foreign capital'),d:R("Le bois, la pâte à papier, l'hydroélectricité et les mines attirent le capital anglo-canadien et américain ; les Canadiens français fournissent la main-d'œuvre.","Timber, pulp, hydroelectricity and mines draw Anglo-Canadian and American capital; French Canadians supply the labour.")};
   return {id:'industrie4',name:R('Capitalisme industriel et grandes compagnies','Industrial capitalism and big companies'),d:R("Usines, barrages et villes de compagnie : la majorité vit d'un salaire en ville ; les syndicats et l'État deviennent des acteurs.","Factories, dams and company towns: most people live on a wage in the city; unions and the state become players.")};}
  if(p===1)return {id:'traite',name:R('Comptoir de traite','Trading post economy'),d:R("Le profit vient des fourrures, chassées et préparées par les nations ; une compagnie à monopole le garde presque tout.","Profit comes from furs, hunted and prepared by the nations; a monopoly company keeps nearly all of it.")};
  if(p===2)return {id:'seigneurie',name:R('Seigneurie et traite des fourrures','Seigneury and fur trade'),d:R("Les censitaires produisent le blé et paient cens, rentes, banalités et dîme ; les marchands vivent de la traite et du crédit.","Tenants grow the wheat and pay dues, rents, mill fees and tithe; merchants live off the fur trade and credit.")};
  const c=s.capital||0;
  if(c<.25)return {id:'ble',name:R('Seigneurie et commerce du blé','Seigneury and wheat trade'),d:R("La terre et ses rentes dominent encore ; les marchands britanniques tiennent le commerce extérieur.","Land and its dues still dominate; British merchants hold foreign trade.")};
  if(c<.55)return {id:'bois',name:R('Commerce du bois, premiers salariés','Timber trade, first wage earners'),d:R("Chantiers, cages de bois, canaux : de plus en plus d'hommes vivent d'un salaire, l'hiver ou toute l'année.","Shanties, timber rafts, canals: more and more men live on a wage, in winter or all year.")};
  return {id:'industrie',name:R('Industrie, canaux et chemins de fer','Industry, canals and railways'),d:R("Usines de Montréal, chemins de fer, banques : le capital se concentre, les ouvriers se multiplient.","Montréal factories, railways, banks: capital concentrates, workers multiply.")};}
/* qui reçoit quoi : poids relatifs, normalisés en parts */
function classWeights(s){const p=s.period||1,O=s.orient||{},F=s.flags||{},B=s.budget||{};const w={};
  if(p===1){w.compagnie=F.occupied?2:50*({traite:1.3,equilibre:1,colonie:.8}[O.eco]||1)*(F.habitants?.5:1);
    w.clerge=8+(B.miss||0)*.6+(F.laval?6:0);w.habitants=10+(O.eco==='colonie'?10:0)+(F.habitants?25:0);w.engages=10+(s.routine&&s.routine.cargo==='engages'?4:0);}
  else if(p===2){w.seigneurs=14+(O.seig==='censitaires'?-5:6);w.clerge=7+(B.miss||0)*.35+(F.dime13?4:0);
    w.marchands=8+(s.furs||0)/15+({traite:10,equilibre:4,colonie:0}[O.eco]||0)+({interdits:0,conges:3,libres:6}[O.cdb]||0)+(F.compagnieColonie?5:0);
    w.habitants=50+(O.eco==='colonie'?8:0)+(O.seig==='censitaires'?6:0)-(s.war?6:0);w.engages=6+(O.cdb==='libres'?4:0);}
  else if(p===4){const c=s.capital||0,u=s.urb||.25,fo=(s.foreign||60)/100;
    w.capital=8+c*40+fo*10+({ressources:8,national:-4,agricole:0}[O.eco4]||0)-(O.travail4==='syndicats'?4:0)+(F.cadenas?2:0);
    w.clerge=4+(s.church||50)*.07+(B.ecoles||0)*.08+(O.eglise4==='concordat'?3:-1);
    w.professions=5+(s.edu||20)*.1+(O.eco4==='national'?4:0)+(F.caisses?2:0)+(F.hec?1:0);
    w.habitants=Math.max(6,(1-u)*44+(B.colon||0)*.08+(O.eco4==='agricole'?4:0)-(F.crise?6:0)+(F.ucc?2:0));
    w.ouvriers=Math.max(3,u*26+({syndicats:6,catholiques:2,ordre:-2}[O.travail4]||0)+(F.assistance?2:0)+(F.pensions?2:0)-(F.crise?4:0));}
  else if(p===5){const fo=(s.foreign||50)/100,O5=O,ch=s.chom||8;
    w.capital=6+fo*30+({liberal:6,partenariat:2,interventionniste:-3}[O5.etat5]||0)+(O5.finances5==='austerite'?2:0);
    w.quebecinc=2+(1-fo)*12+(O5.etat5==='partenariat'?5:0)+(F.caisse?2:0)+(F.quebecInc?3:0);
    w.technocrates=6+(s.etat||20)*.22+(s.edu||30)*.06+(B.educ||0)*.05;
    w.ouvriers=Math.max(8,22+({social:4,concertation:2,fermete:-4}[O5.travail5]||0)+(F.frontCommun?2:0)-Math.max(0,ch-8)*.8-(O5.finances5==='austerite'?3:0));
    w.precaires=Math.max(2,3+(B.sante||0)*.06+(F.aideSociale?2:0)-(O5.finances5==='austerite'?2:0));}
  else{const c=s.capital||0,pr=s.press||0;w.seigneurs=F.finSeigneurie?2:(O.terre==='seigneurie'?8+pr*40:4);
    w.clerge=6+(B.ecoles||0)*.2+(O.eglise==='ultramontain'?3:0)+(s.year>=1840?3:0);
    w.marchands=10+c*40+({agriculture:0,bois:5,commerce:8}[O.eco3]||0)+(O.terre==='franc'?4:0);
    w.professions=4+(B.presse||0)*.12+(F.assemblee?3:0)+(F.responsable?6:0);
    w.habitants=Math.max(15,48-pr*45-c*10+(O.travail==='secours'?2:0));
    if(s.year>=1800)w.ouvriers=2+c*16+(O.travail==='secours'?3:0);}
  return w;}
function classTick(s,dt){
  dt=dt||1;const list=classList(s),w=classWeights(s);let tot=0;for(const c of list)tot+=w[c.id]||0;
  s.cls=s.cls||{};const p=s.period||1,F=s.flags||{},O=s.orient||{};
  if(p===3)s.capital=(s.capital||0)+(capitalTarget(s)-(s.capital||0))*(1-Math.pow(.88,dt));
  if(p===4)s.capital=(s.capital||0)+(capitalTarget4(s)-(s.capital||0))*(1-Math.pow(.88,dt));
  const c3=s.capital||0,pr=s.press||0;
  for(const c of list){const st=s.cls[c.id]=s.cls[c.id]||{share:0,grief:25,org:20};
    st.share=(w[c.id]||0)/Math.max(1,tot);
    const gap=(fairOf(s,c)-st.share);let g=25+gap*120;
    if(c.id==='habitants'){g+=pr*60+(s.war?6:0)+(p===2&&O.seig==='seigneurs'?6:0)+((s.ys&&s.ys.famine)?10:0);}
    if(c.id==='engages'||c.id==='ouvriers'){g=30+gap*160+c3*15+(O.travail==='ordre'?6:0);}
    if(c.id==='professions'){g=22+(s.year>=1795&&!F.responsable?18:0)+(F.unionAct&&!F.responsable?12:0)+(F.craig?5:0)+(F.dalhousie?5:0)+(s.press||0)*25-(F.responsable?12:0);}
    if(c.id==='marchands'){g=22+(O.terre==='seigneurie'&&c3>.35?30*c3:0)+(O.cour==='patriote'?10:0)+(p===2&&O.cdb==='interdits'?12:0)-st.share*20;}
    if(c.id==='seigneurs'){g=18+(O.terre==='franc'?15:0)+(F.finSeigneurie?25:0)+(p===2&&O.seig==='censitaires'?14:0);}
    if(c.id==='clerge'){g=15+(O.eglise==='liberal'?25:0)+(F.institut?8:0)+(F.sansEveque?20:0);}
    if(c.id==='compagnie'){g=15+(F.habitants?22:0)+(O.eco==='colonie'?10:0)+(F.laRochelle?10:0);}
    if(p===4){const fo=(s.foreign||60);
      if(c.id==='ouvriers')g=28+gap*150+c3*12+({ordre:8,catholiques:2,syndicats:-4}[O.travail4]||0)+(F.crise?18:0)+(s.war?5:0)-(F.assistance?4:0)-(F.pensions?3:0);
      if(c.id==='habitants')g=24+gap*90+(s.press||0)*50+(F.crise?14:0)+(F.conscription?6:0)-(F.ucc?3:0)-(F.creditAgricole?4:0);
      if(c.id==='professions')g=18+Math.max(0,fo-45)*.45+(O.ottawa==='cooperation'?6:0)+(F.conscription?8:0)-(O.eco4==='national'?8:0)-(F.hydroQc?5:0);
      if(c.id==='capital')g=12+(O.eco4==='national'?20:0)+(O.travail4==='syndicats'?14:0)+(F.hydroQc?10:0)+(O.ottawa==='affirmation'?8:0);
      if(c.id==='clerge')g=12+(O.eglise4==='etat'?24:0)+(F.suffrage?6:0)+(F.ecoleObligatoire?6:0)+(F.assistance?3:0);}
    if(p===5){const ch=s.chom||8;
      if(c.id==='ouvriers')g=24+gap*140+({fermete:12,concertation:0,social:-5}[O.travail5]||0)+(O.finances5==='austerite'?14:0)+(F.decrets82?10:0)-(F.antiBriseurs?5:0);
      if(c.id==='precaires')g=26+gap*90+Math.max(0,ch-7)*3.2+(O.finances5==='austerite'?8:0);
      if(c.id==='technocrates')g=18+(O.langue5==='libre'?10:0)+Math.max(0,(s.foreign||50)-40)*.3+(O.etat5==='liberal'?12:0)+(O.finances5==='austerite'?6:0)+(F.rapatriement?4:0)+(F.meechDead?6:0);
      if(c.id==='quebecinc')g=16+(O.etat5==='interventionniste'?6:0)+Math.max(0,(s.dette||0)-35)*.4+(F.refSoon?4:0);
      if(c.id==='capital')g=12+({interventionniste:14,partenariat:4,liberal:-4}[O.etat5]||0)+(O.langue5==='charte'?12:O.langue5==='incitation'?5:0)+(govParty5(s)==='pq'?8:0)+(F.oui?20:0);}
    g=clamp(g,0,100);const before=st.grief;st.grief+=(g-st.grief)*(1-Math.pow(.75,dt));
    let o=20;
    if(c.id==='habitants')o=12+(s.traits?s.traits.entraide*.22:12)+(s.edu||0)*.2+(F.ssjb?5:0)+(F.caisses?5:0);
    else if(c.id==='engages')o=8+(s.traits?s.traits.aventure*.1:4);
    else if(c.id==='ouvriers'&&p===4)o=6+(s.urb||.25)*30+({syndicats:16,catholiques:9,ordre:-4}[O.travail4]||0)+(F.ctcc?6:0)+(F.cio?6:0)+(F.amiante?8:0)-(F.cadenas?5:0);
    else if(c.id==='habitants'&&p===4)o=12+(s.traits?s.traits.entraide*.2:12)+(F.ucc?10:0)+(F.caisses?6:0)+(F.cooperatives?4:0);
    else if(c.id==='professions'&&p===4)o=24+(s.edu||20)*.4+(F.devoir?6:0)+(F.actionNationale?6:0);
    else if(c.id==='ouvriers'&&p===5)o=30+(s.traits?s.traits.entraide*.3:15)+(F.frontCommun?10:0)+(O.travail5==='social'?6:0)-(O.travail5==='fermete'?6:0);
    else if(c.id==='precaires')o=12+(F.frap?6:0);else if(c.id==='technocrates')o=40+(s.edu||30)*.3;else if(c.id==='quebecinc')o=45+(F.quebecInc?10:0);
    else if(c.id==='capital')o=70;
    else if(c.id==='ouvriers')o=4+c3*30+(F.typo?8:0)+(F.secoursMutuel?8:0)+(O.travail==='secours'?10:-4)-(F.repression?6:0);
    else if(c.id==='professions')o=18+(s.edu||0)*.5+((s.budget&&s.budget.presse)||0)*.35+(F.leCanadien?6:0);
    else if(c.id==='marchands')o=40+st.share*40;else if(c.id==='seigneurs')o=35;else if(c.id==='clerge')o=45+(s.church||0)*.3;else if(c.id==='compagnie')o=60;
    st.org+=(clamp(o,0,100)-st.org)*(1-Math.pow(.8,dt));
    /* un seuil franchi s'entend dans le pays */
    if(before<60&&st.grief>=60&&!c.dom&&s.year>(s.clsWarn||0)+3){s.clsWarn=s.year;const tx={fr:`${c.name.fr} grondent : ils estiment ne pas recevoir leur juste part.`,en:`${c.name.en} are grumbling: they feel they are not getting their fair share.`};logIt(s,tx,'bad');}}
  /* les contradictions : griefs organisés des classes dominées, plus l'écart entre la base et les institutions */
  let k=0,wsum=0;for(const c of list){if(c.dom)continue;const st=s.cls[c.id];const wt=fairOf(s,c);k+=st.grief*(.4+st.org/120)*wt;wsum+=wt;}
  let gapBS=0;if(p===3&&O.terre==='seigneurie'&&!F.finSeigneurie)gapBS+=18*c3;if(p===3&&F.unionAct&&!F.responsable)gapBS+=6;if(p===1&&s.pop>800&&!F.habitants)gapBS+=8;if(p===2&&O.cdb==='interdits'&&s.year>1680)gapBS+=4;
  if(p===4){gapBS+=Math.max(0,(s.foreign||60)-60)*.25;if(O.travail4==='ordre'&&c3>.6)gapBS+=5;if(O.eglise4==='concordat'&&(s.urb||0)>.55)gapBS+=4;}
  if(p===5){gapBS+=Math.max(0,(s.foreign||50)-50)*.25+Math.max(0,(s.chom||8)-10)*1.2;if(O.travail5==='fermete')gapBS+=4;}
  s.contra=clamp(k/Math.max(.01,wsum)+gapBS,0,100);
}
const clsG=(s,id)=>(s.cls&&s.cls[id])?s.cls[id].grief:25;
const clsS=(s,id)=>(s.cls&&s.cls[id])?s.cls[id].share:0;
/* les mentalités suivent les conditions matérielles : correctifs ajoutés aux cibles des traits */
function supT(s,k){if(!s.cls)return 0;const p=s.period||1,c3=s.capital||0;
  switch(k){
   case 'ferveur':return clsS(s,'clerge')*45-(p===3?c3*8:0)-(p===4?Math.max(0,c3-.6)*20+(s.cls.ouvriers?s.cls.ouvriers.org*.05:0):0)-Math.max(0,clsG(s,'habitants')-65)*.1;
   case 'roi':return -Math.max(0,clsG(s,'habitants')-40)*.12-(p>=3?Math.max(0,clsG(s,'professions')-40)*.15:0)+(p===2?clsS(s,'seigneurs')*20:0);
   case 'entraide':return Math.max(0,clsG(s,'habitants')-45)*.15+(s.cls.habitants?s.cls.habitants.org*.04:0)+(p>=3&&s.cls.ouvriers?s.cls.ouvriers.org*.04:0);
   case 'ouverture':return clsS(s,'marchands')*30+(p===3?c3*8:0)+(p===4?(c3-.5)*14+clsS(s,'ouvriers')*8:0)-clsS(s,'seigneurs')*25;
   case 'aventure':return p===2?clsS(s,'engages')*45:p>=3?clsS(s,'ouvriers')*30+c3*5:0;
   case 'patri':return p>=3?Math.max(0,clsG(s,'professions')-35)*.18+Math.max(0,clsG(s,'habitants')-40)*.12-4:0;
  }return 0;}
/* ---------- interface : « La société » ---------- */
const moodWord=g=>g>=65?[R('en colère','angry'),'foe']:g>=45?[R('mécontents','discontented'),'wary']:g>=28?[R('résignés','resigned'),'partner']:[R('satisfaits','content'),'friend'];
function societyHTML(s){if(!s.cls)return '';const F=fr(),m=modeOf(s);
  let h=`<section class="society"><h4>${F?'La société':'Society'}</h4><p class="mode"><b>${L(m.name)}</b> — ${L(m.d)}</p>`;
  for(const c of classList(s)){const st=s.cls[c.id];if(!st)continue;const [mw,tone]=moodWord(st.grief);const pct=Math.round(st.share*100);
    h+=`<div class="cls"><div class="ml"><span>${L(c.name)}</span><b class="${tone}">${L(mw)}</b></div><div class="clsbar"><i style="width:${clamp(pct,1,100)}%"></i><em>${pct} % ${F?'des richesses':'of the wealth'}</em></div><div class="org" title="${F?'Organisation':'Organization'}">${'●'.repeat(Math.round(st.org/20))}${'○'.repeat(5-Math.round(st.org/20))}<small>${F?'organisation':'organization'}</small></div></div>`;}
  h+=meter(s.contra||0,true,F?'Tensions sociales':'Social tensions');
  h+=`<p class="quiet" style="margin:6px 0 0">${F?"Qui profite du travail du pays ? Une part injuste nourrit les griefs ; des griefs organisés finissent par éclater.":"Who benefits from the country's labour? An unfair share feeds grievances; organized grievances end up boiling over."}</p></section>`;
  return h;}
/* ---------- bilan pour les écrans de fin ---------- */
function societySummary(s){if(!s.cls)return '';const F=fr(),list=classList(s);const m=modeOf(s);
  const top=list.slice().sort((a,b)=>s.cls[b.id].share-s.cls[a.id].share)[0];const angry=list.filter(c=>s.cls[c.id].grief>=55&&!c.dom);
  const gini=(()=>{let g=0;for(const c of list){g+=Math.abs(s.cls[c.id].share-fairOf(s,c));}return Math.round(g*50);})();
  let txt=F?`${L(m.name)}. Ce sont ${L(top.name).toLowerCase()} qui tirent le plus de la richesse du pays (${Math.round(s.cls[top.id].share*100)} %).`:`${L(m.name)}. It is ${L(top.name).toLowerCase()} who draw the most from the country's wealth (${Math.round(s.cls[top.id].share*100)}%).`;
  if(angry.length)txt+=F?` Toujours mécontents : ${angry.map(c=>L(c.name).toLowerCase()).join(', ')}. La période suivante devra s'en occuper.`:` Still discontented: ${angry.map(c=>L(c.name).toLowerCase()).join(', ')}. The next period will have to deal with it.`;
  else txt+=F?' Aucun groupe n’est au bord de la révolte.':' No group is on the brink of revolt.';
  if((s.period||1)===3&&s.capital>.45)txt+=F?' Le chemin de fer, les canaux et les banques pèsent plus lourd que les seigneuries : la Confédération sera d’abord leur affaire.':' Railways, canals and banks now outweigh the seigneuries: Confederation will be their business first.';
  if((s.period||1)===4&&(s.foreign||0)>55)txt+=F?` Les grandes entreprises appartiennent surtout à des capitaux anglo-canadiens et américains (${Math.round(s.foreign)} %) : les Canadiens français travaillent, d'autres possèdent.`:` Big business belongs mostly to Anglo-Canadian and American capital (${Math.round(s.foreign)}%): French Canadians work, others own.`;
  return `<h3>${F?'La société':'Society'}</h3><p class="story">${txt}</p><ul class="futures">${list.map(c=>`<li><b>${L(c.name)}</b> · ${Math.round(s.cls[c.id].share*100)} % ${F?'des richesses':'of the wealth'} — ${L(moodWord(s.cls[c.id].grief)[0])}</li>`).join('')}</ul><p class="quiet">${F?'Écart à une juste répartition':'Distance from a fair distribution'} : ${gini}/100 · ${F?'tensions sociales':'social tensions'} : ${Math.round(s.contra||0)}/100</p>`;}
