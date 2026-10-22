/* Kebec — Période III (1760–1867) : la colonie britannique.
   Vous êtes la volonté politique des Canadiens : l'évêque et les seigneurs d'abord, puis le Parti canadien et les Patriotes à l'Assemblée,
   puis les Réformistes de LaFontaine. Le gouverneur britannique est une force extérieure, comme le Roi l'était. */

/* ---------- les trois têtes : le gouverneur, l'Église, et « l'autre camp » ---------- */
const OFFICERS3={
 gov:[
  {from:1760,name:'James Murray',trait:R("Militaire écossais, il méprise les marchands anglais et ménage les Canadiens. Londres le rappellera pour cela.","A Scottish soldier who despises the English merchants and humours the Canadiens. London will recall him for it."),like:{loyal:1,cour:'loyal'},mod:{fav:1.15}},
  {from:1766,name:'Guy Carleton',trait:R("Il mise sur le clergé et les seigneurs pour tenir le pays : c'est l'homme de l'Acte de Québec.","He bets on the clergy and the seigneurs to hold the country: the man of the Quebec Act."),like:{loyal:1,ecoles:.4,terre:'seigneurie'},mod:{fav:1.2}},
  {from:1778,name:'Frederick Haldimand',trait:R("Soldat suisse, autoritaire : en pleine guerre américaine, il emprisonne les suspects sans procès.","A Swiss soldier, authoritarian: in the middle of the American war he jails suspects without trial."),like:{loyal:1.4,cour:'loyal'},feud:['mar'],mod:{fav:.9}},
  {from:1786,name:'Lord Dorchester (Guy Carleton)',trait:R("Carleton revient, anobli. Il prépare la division du pays en deux Canadas.","Carleton returns, now a lord. He prepares the division of the country into two Canadas."),like:{loyal:1,terre:'seigneurie'},mod:{fav:1.1}},
  {from:1796,name:'Robert Prescott',trait:R("Vieux général, il se brouille avec le Conseil exécutif au sujet des terres.","An old general, he falls out with the Executive Council over land."),like:{loyal:.8},mod:{}},
  {from:1799,name:'Robert Shore Milnes',trait:R("Il veut une Église anglicane forte et des écoles royales pour angliciser les Canadiens.","He wants a strong Anglican Church and royal schools to anglicize the Canadiens."),like:{loyal:1,eglise:'liberal'},feud:['eve'],mod:{fav:.95}},
  {from:1807,name:'James Henry Craig',trait:R("Le « règne de la terreur » : il voit des traîtres partout, fait saisir Le Canadien et emprisonner ses rédacteurs.","The 'reign of terror': he sees traitors everywhere, has Le Canadien seized and its editors jailed."),like:{loyal:1.5,cour:'loyal'},feud:['eve'],mod:{fav:.75}},
  {from:1811,name:'George Prevost',trait:R("Conciliant : la guerre approche, il a besoin des Canadiens et nomme des francophones aux postes.","Conciliatory: war is coming, he needs the Canadiens and appoints francophones to office."),like:{loyal:.8},mod:{fav:1.25}},
  {from:1816,name:'John Coape Sherbrooke',trait:R("Il reconnaît l'évêque Plessis au Conseil législatif et cherche la paix avec l'Assemblée.","He seats Bishop Plessis on the Legislative Council and seeks peace with the Assembly."),like:{loyal:.6,ecoles:.4},mod:{fav:1.15}},
  {from:1820,name:'Lord Dalhousie',trait:R("Hautain, il refuse Papineau comme président de l'Assemblée et dépense sans son accord.","Haughty, he refuses Papineau as Speaker of the Assembly and spends without its consent."),like:{loyal:1.2,cour:'loyal'},mod:{fav:.8}},
  {from:1828,name:'James Kempt',trait:R("Envoyé pour calmer le jeu après le rapport Canada de Londres.","Sent to calm things down after London's Canada Committee report."),like:{loyal:.5},mod:{fav:1.15}},
  {from:1830,name:'Lord Aylmer',trait:R("Bien intentionné, vite dépassé : sous lui, la crise des subsides s'envenime.","Well-meaning, soon overwhelmed: under him the supply crisis festers."),like:{loyal:.8},mod:{fav:.95}},
  {from:1835,name:'Lord Gosford',trait:R("Commissaire-conciliateur, il cherche un compromis… que Londres lui retire.","A conciliating commissioner, he seeks a compromise… which London takes away from him."),like:{loyal:.5,cour:'reforme'},mod:{fav:1.05}},
  {from:1838,name:'John Colborne',trait:R("Le « Vieux Brûlot » : il écrase les rebelles et fait brûler les villages patriotes.","'Old Firebrand': he crushes the rebels and has patriote villages burned."),like:{loyal:1.6,cour:'loyal'},mod:{fav:.7}},
  {from:1839,name:'Charles Poulett Thomson (Lord Sydenham)',trait:R("Il est venu imposer l'Union : une seule assemblée, une majorité anglaise.","He came to impose the Union: one assembly, an English majority."),like:{loyal:1,terre:'franc'},mod:{fav:.8}},
  {from:1842,name:'Charles Bagot',trait:R("Il ouvre le gouvernement à LaFontaine : un choc pour les tories.","He opens the government to LaFontaine: a shock for the tories."),like:{cour:'reforme'},mod:{fav:1.3}},
  {from:1843,name:'Charles Metcalfe',trait:R("Il refuse le gouvernement responsable et gouverne avec les tories.","He refuses responsible government and governs with the tories."),like:{loyal:1,cour:'loyal'},mod:{fav:.85}},
  {from:1847,name:'Lord Elgin',trait:R("Il accepte de gouverner avec la majorité de l'Assemblée : le gouvernement responsable.","He agrees to govern with the Assembly's majority: responsible government."),like:{cour:'reforme',commerce:.5},mod:{fav:1.3}},
  {from:1854,name:'Edmund Walker Head',trait:R("Il pousse les chemins de fer et choisit Ottawa comme capitale.","He pushes the railways and picks Ottawa as the capital."),like:{commerce:1},mod:{fav:1.05}},
  {from:1861,name:'Lord Monck',trait:R("Il accompagne le projet de fédération de toutes les colonies.","He shepherds the plan to federate all the colonies."),like:{cour:'reforme',commerce:.5},mod:{fav:1.1}}],
 eve:[
  {from:1760,name:null},
  {from:1766,name:'Jean-Olivier Briand',trait:R("Sacré en France avec l'accord tacite de Londres, il prêche la loyauté au nouveau roi.","Consecrated in France with London's tacit consent, he preaches loyalty to the new king."),like:{ecoles:1,cour:'loyal'},mod:{church:1.2}},
  {from:1784,name:"Louis-Philippe Mariauchau d'Esgly",trait:R("Vieillard prudent, premier évêque né au Canada.","A cautious old man, the first bishop born in Canada."),like:{ecoles:.8},mod:{church:1}},
  {from:1788,name:'Jean-François Hubert',trait:R("Il s'oppose au projet d'université mixte : l'Église gardera ses écoles.","He opposes the plan for a mixed university: the Church will keep its schools."),like:{ecoles:1,eglise:'ultramontain'},mod:{church:1.1}},
  {from:1797,name:'Pierre Denaut',trait:R("Il parcourt le diocèse à cheval et défend les biens des jésuites.","He travels the diocese on horseback and defends the Jesuits' estates."),like:{ecoles:1},mod:{church:1.05}},
  {from:1806,name:'Joseph-Octave Plessis',trait:R("Habile et loyal : il obtient la reconnaissance de son titre et fonde des collèges.","Shrewd and loyal: he wins recognition of his title and founds colleges."),like:{ecoles:1.2,cour:'loyal'},mod:{church:1.25}},
  {from:1825,name:'Bernard-Claude Panet',trait:R("Discret, il laisse Lartigue s'imposer à Montréal.","Discreet, he lets Lartigue take charge in Montréal."),like:{ecoles:1},mod:{church:1}},
  {from:1833,name:'Joseph Signay',trait:R("Timide devant le pouvoir ; c'est Lartigue, à Montréal, qui condamne les Patriotes.","Timid before power; it is Lartigue, in Montréal, who condemns the Patriotes."),like:{ecoles:1,cour:'loyal'},mod:{church:1}},
  {from:1840,name:'Ignace Bourget (Montréal)',trait:R("Ultramontain intransigeant : communautés religieuses, journaux catholiques, guerre aux Rouges.","An unbending ultramontane: religious orders, Catholic newspapers, war on the Rouges."),like:{ecoles:1.4,eglise:'ultramontain'},feud:['mar'],mod:{church:1.4}}],
 mar:[
  {from:1760,name:'Les marchands anglais',trait:R("Une poignée de marchands venus avec l'armée : ils veulent une assemblée… réservée aux protestants.","A handful of merchants who came with the army: they want an assembly… for Protestants only."),like:{commerce:1,terre:'franc'},mod:{eco:1.05}},
  {from:1775,name:'Les marchands du Nord-Ouest',trait:R("Écossais de Montréal, ils reprennent la traite des fourrures avec des voyageurs canadiens.","Montréal Scots, they take over the fur trade with Canadien voyageurs."),like:{commerce:1,eco:'commerce'},mod:{eco:1.1}},
  {from:1792,name:'John Richardson',trait:R("Chef du « parti anglais » à l'Assemblée : il veut l'anglais seul et des cantons anglais.","Leader of the 'English party' in the Assembly: he wants English only and English townships."),like:{commerce:1,terre:'franc',cour:'loyal'},mod:{eco:1.05}},
  {from:1807,name:'Herman Witsius Ryland',trait:R("Secrétaire du gouverneur, il rêve d'angliciser le pays et de soumettre l'Église.","The governor's secretary, he dreams of anglicizing the country and subduing the Church."),like:{cour:'loyal',eglise:'liberal'},feud:['eve'],mod:{fav:.95}},
  {from:1820,name:'La « clique du Château »',trait:R("Conseillers nommés, marchands et fonctionnaires : ils tiennent le Conseil législatif et bloquent l'Assemblée.","Appointed councillors, merchants and officials: they hold the Legislative Council and block the Assembly."),like:{commerce:1,cour:'loyal'},mod:{eco:1.1}},
  {from:1834,name:'Adam Thom (Montreal Herald)',trait:R("Journaliste enragé : il réclame qu'on anglicise les Canadiens de force.","A rabid journalist: he demands the Canadiens be anglicized by force."),like:{cour:'loyal'},mod:{fav:.9}},
  {from:1841,name:'Robert Baldwin (Canada-Ouest)',trait:R("Réformiste du Haut-Canada : il veut le gouvernement responsable, avec les Canadiens comme alliés.","An Upper Canada reformer: he wants responsible government, with the Canadiens as allies."),like:{cour:'reforme',presse:.6},mod:{fav:1.15}},
  {from:1851,name:'Francis Hincks (Canada-Ouest)',trait:R("Financier des chemins de fer, il gouverne avec Morin.","A railway financier, he governs with Morin."),like:{commerce:1.2},mod:{eco:1.1}},
  {from:1856,name:'John A. Macdonald (Canada-Ouest)',trait:R("Conservateur pragmatique, il s'allie à Cartier : les « bleus » et les tories.","A pragmatic conservative, he allies with Cartier: the 'bleus' and the tories."),like:{commerce:1,eglise:'ultramontain'},mod:{eco:1.1}},
  {from:1858,name:'George Brown (Clear Grits)',trait:R("Il réclame la représentation selon la population et dénonce la « domination française » et l'Église.","He demands representation by population and denounces 'French domination' and the Church."),like:{eglise:'liberal',terre:'franc'},feud:['eve'],mod:{fav:.9}}]};
const OFF_LAB3={gov:R('Gouverneur','Governor'),eve:R("L'Église",'The Church'),mar:R("L'autre camp",'The other side')};
const OFF_NONE3={eve:R("Pas d'évêque depuis la mort de Pontbriand : les vicaires généraux attendent que Londres tolère un successeur.","No bishop since Pontbriand died: the vicars general wait for London to tolerate a successor.")};
function officer3(s,k){let o=OFFICERS3[k][0];for(const x of OFFICERS3[k])if(s.year>=x.from)o=x;return o;}
function offEff3(s,k,m){const o=officer3(s,k);if(!o.name)return 1;const base=(o.mod&&o.mod[m])||1;return base*(1+(s.off[k]||0)/260);}

/* ---------- les crises et les régimes ---------- */
const WARS3=[{id:'amerique',a:1775,b:1783,name:R("Guerre d'indépendance américaine","American War of Independence")},{id:'w1812',a:1812,b:1815,name:R('Guerre de 1812','War of 1812')},{id:'rebellions',a:1837,b:1838,name:R('Rébellions','Rebellions')}];
const warAt3=y=>WARS3.find(w=>y>=w.a&&y<=w.b)||null;
function regime3(y){return y<1764?R('Régime militaire','Military rule'):y<1791?R('Province de Québec','Province of Quebec'):y<1841?R('Bas-Canada','Lower Canada'):R('Canada-Uni · Canada-Est','United Canada · Canada East');}
/* le rythme : un an par tour dans les moments décisifs, sinon une législature (environ trois ans) */
const CRISES3=[[1760,1765],[1774,1784],[1789,1792],[1807,1815],[1832,1841],[1847,1849],[1864,1867]];
function turnLen3(s){const y=s.year;if(CRISES3.some(([a,b])=>y>=a&&y<=b))return 1;if(y<1791)return 2;
  const n=CRISES3.find(([a])=>a>y);return clamp(n?Math.min(3,n[0]-y):3,1,3);}
/* populations voisines (ordre de grandeur) */
function usPop3(y){const p=[[1760,1600000],[1776,2500000],[1790,3930000],[1800,5300000],[1810,7240000],[1820,9640000],[1830,12870000],[1840,17070000],[1850,23190000],[1860,31440000],[1867,37000000]];for(let i=0;i<p.length-1;i++){const[a,pa]=p[i],[b,pb]=p[i+1];if(y<=b)return pa*Math.pow(pb/pa,clamp((y-a)/(b-a),0,1));}return 37000000;}
function ucPop3(y){if(y<1784)return 0;const p=[[1784,6000],[1791,14000],[1806,70000],[1824,150000],[1842,487000],[1851,952000],[1861,1396000],[1867,1530000]];for(let i=0;i<p.length-1;i++){const[a,pa]=p[i],[b,pb]=p[i+1];if(y<=b)return pa*Math.pow(pb/pa,clamp((y-a)/(b-a),0,1));}return 1530000;}

/* ---------- les traits, avec les mots de l'époque ---------- */
const TRAITS3=[
 {id:'ferveur',name:R('Ferveur','Fervour'),lo:R('libéraux','liberals'),hi:R('ultramontains','ultramontanes')},
 {id:'alliance',name:R('Liens avec les nations','Ties with the nations'),lo:R('séparation','apart'),hi:R('parenté','kinship')},
 {id:'aventure',name:R('Mobilité','Mobility'),lo:R('enracinés','rooted'),hi:R('voyageurs et forestiers','voyageurs and lumbermen')},
 {id:'roi',name:R('Loyauté à la Couronne','Loyalty to the Crown'),lo:R('patriotes','patriotes'),hi:R('loyaux sujets','loyal subjects')},
 {id:'entraide',name:R('Entraide','Mutual aid'),lo:R('chacun pour soi','each for himself'),hi:R('paroisse et coopération','parish and cooperation')},
 {id:'ouverture',name:R('Ouverture','Openness'),lo:R('repli','withdrawal'),hi:R('accueil','welcome')}];
const traitsFor=s=>(s&&s.period===5)?TRAITS5:(s&&s.period===4)?TRAITS4:(s&&s.period===3)?TRAITS3:TRAITS;

/* ---------- les lieux de la période ---------- */
Object.assign(PLACES,{
 stHyacinthe:{ll:[-72.95,45.63],name:R('Saint-Hyacinthe','Saint-Hyacinthe'),dx:6,dy:12,p3:true},
 stDenis:{ll:[-73.15,45.78],name:R('Saint-Denis','Saint-Denis'),dx:6,dy:-4,p3:true},
 stEustache:{ll:[-73.9,45.56],name:R('Saint-Eustache','Saint-Eustache'),dx:-6,dy:-4,anchor:'end',p3:true},
 rimouski:{ll:[-68.52,48.45],name:R('Rimouski','Rimouski'),dx:6,dy:12,p3:true},
 chicoutimi:{ll:[-71.06,48.43],name:R('Chicoutimi','Chicoutimi'),dx:6,dy:-4,p3:true},
 sherbrooke:{ll:[-71.89,45.4],name:R('Sherbrooke','Sherbrooke'),dx:6,dy:12,p3:true},
 gaspe:{ll:[-64.48,48.83],name:R('Gaspé','Gaspé'),dx:6,dy:12,p3:true},
 kingston:{ll:[-76.48,44.23],name:R('Kingston','Kingston'),dx:6,dy:12,foreign:true,p3:true},
 york:{ll:[-79.38,43.65],name:R('York (Toronto)','York (Toronto)'),dx:6,dy:12,foreign:true,p3:true},
 bytown:{ll:[-75.7,45.42],name:R('Bytown (Ottawa)','Bytown (Ottawa)'),dx:-6,dy:-4,anchor:'end',foreign:true,p3:true}});
const SPREAD3=[['stHyacinthe',110000],['stDenis',90000],['stEustache',130000],['rimouski',230000],['gaspe',150000]];

/* ---------- état de départ ---------- */
const ENV3=['ecoles','terres','commerce','presse','loyal'];
function setEnvFor(s){const want=(s&&s.period===5)?ENV5:(s&&s.period===4)?ENV4:(s&&s.period===3)?ENV3:['etab','def','pres','traite','miss'];if(ENV.join()!==want.join())ENV.splice(0,ENV.length,...want);}
function p3Defaults(s){
  s.period=3;s.season=1;s.turn=1;s.ending=null;s.pending=[];s.outcome=null;
  s.off={gov:0,eve:0,mar:0};s.offName={};
  s.p3start={year:s.year,pop:s.pop};s.yearOut=[];s.chron=[];
  s.ang=s.ang||300;s.land=s.land||Math.round((s.pop-s.ang)*1.3);s.emig=0;s.eco=s.eco||35;s.edu=s.edu||12;s.patri=s.patri||10;
  s.us=usPop3(s.year);s.uc=0;s.eng=s.us;s.war=null;s.warsSeen={};
  s.budget={ecoles:30,terres:25,commerce:15,presse:10,loyal:20};s.alloc={};
  s.orient={cour:'loyal',eglise:'ultramontain',terre:'seigneurie',eco3:'agriculture',nations:'alliance',travail:'ordre'};s.cls=null;s.capital=.05;
  s.routine=s.routine||{};
  for(const k of ['gov','eve','mar'])s.offName[k]=officer3(s,k).name;
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0,emig:0};
  s.lastReview=null;s.revSnap=null;s.sysCount=s.sysCount||{};s.sysLast=s.sysLast||{};
  for(const g of ['ouest','renards'])if(s.rel[g]==null)s.rel[g]=g==='ouest'?40:0;
  delete s.rel.renards;
  s.str=s.str||{};
  setEnvFor(s);return s;
}
/* départ historique : septembre 1760, après la capitulation de Montréal */
function newState3(){
  const s=attachRel(newState());
  Object.assign(s,{year:1760,pop:70000,women:14000,cleared:62000,food:60000,treasury:3000,furs:0,defense:20,compagnie:45,church:55,missions:30,autonomy:20,
    wenFallen:true,wenStr:12,annedda:true,hospital:true,firstWinter:false});
  s.rel={innu:35,alg:35,wen:45,agnier:25,onon:-10,abenaki:45,ouest:45};
  s.places={quebec:true,tadoussac:true,troisRivieres:true,villeMarie:true,orleans:true,beauport:true,refuge:true,fortRichelieu:true,chambly:true,stJean:true,lauzon:true,beaupre:true,kamouraska:true,batiscan:true,sorel:true,laprairie:true,boucherville:true,kahnawake:true,lorette:true};
  s.flags={conquest:true,grandePaix:true};s.fired={};s.raided={};
  s.popHist=[[1760,70000]];
  s.traits={ferveur:66,alliance:48,aventure:52,roi:52,entraide:60,ouverture:30};
  s.log=[];logIt(s,R("Septembre 1760 : Montréal a capitulé. Les troupes françaises rembarquent ; 70 000 Canadiens restent, sous un drapeau qui n'est plus le leur.","September 1760: Montréal has capitulated. The French troops sail away; 70,000 Canadiens stay, under a flag that is no longer theirs."),'good');
  return p3Defaults(s);
}
/* départ hérité : le pays que le joueur a laissé à la fin de la période II */
function inheritState3(p2){
  const s=attachRel(structuredClone(p2));const how=s.ending;
  s.year=1760;s.inherited=true;s.pending=[];s.outcome=null;
  s.flags=s.flags||{};s.flags.conquest=true;
  if(how==='epilogue'){s.flags.cededAtPeace=true;}
  for(const k of ['detroit','michilimakinac','niagara','fortFrontenac','carillon','stFrederic','louisbourg','portRoyal'])s.places[k]=false;
  if(how==='conquestHard'){s.flags.conquestHard=true;}
  for(const k of ['ouest','abenaki','agnier','onon','innu','alg','wen'])if(s.rel[k]==null)s.rel[k]=0;
  logIt(s,how==='epilogue'?R("1763 : la colonie a tenu, mais à la table de la paix la France échange le Canada contre la Guadeloupe. Les Canadiens passent aux Anglais sans avoir été vaincus.","1763: the colony held, but at the peace table France trades Canada for Guadeloupe. The Canadiens pass to the British without having been defeated."):R("1760 : le pays que vous avez bâti passe sous la Couronne britannique.","1760: the country you built passes under the British Crown."),'good');
  p3Defaults(s);
  if(how==='epilogue'){s.compagnie=55;s.patri=18;traitAdd(s,'roi',4);}
  if(how==='conquestHard'){s.compagnie=32;traitAdd(s,'roi',-6);}
  s.popHist=[[1760,s.pop]];
  return s;
}
function startPeriod3(inherit){
  S=inherit?inheritState3(S):newState3();
  titleOpen=false;prologueOpen=true;dispatchMin=false;tab='colonie';view='continent';cam=null;staticCache.key='';
  enterYear3(S);save();render();
}

/* ---------- simulation ---------- */
/* immigration britannique vers le Bas-Canada (ceux qui restent), par an */
function angImmig3(y){if(y<1775)return 60;if(y<1784)return 20;if(y<1815)return 420;if(y<1831)return 3300;if(y<1836)return 4800;if(y<1846)return 2200;if(y<1851)return 3400;return 1500;}
/* la « fièvre des États » : l'attrait des filatures de la Nouvelle-Angleterre */
function usPull3(y){return clamp((y-1815)/25,0,1);}
function processYear3(s){
  const dt=s.turn||1,ys=s.ys,war=warAt3(s.year);const sc=Math.max(1,s.pop/70000),lg=(v,r)=>Math.log1p(Math.max(0,v)/(r*sc));
  const base=Math.max(0,s.treasury),a={};let tot=0;for(const k of ENV3){a[k]=Math.round(base*(s.budget[k]||0)/100);tot+=a[k];}s.alloc=a;s.treasury-=tot;
  const O=s.orient,gE=m=>offEff3(s,'gov',m),eE=m=>offEff3(s,'eve',m),mE=m=>offEff3(s,'mar',m);
  /* l'Église et les écoles */
  {const tgt=clamp(32+18*lg(a.ecoles,1200)*eE('church')+(O.eglise==='ultramontain'?6:-4)+(s.year>=1840?6:0),0,100);s.church+=(tgt-s.church)*(1-Math.pow(.85,dt));}
  {const tgt=clamp(10+9*lg(a.ecoles,1500)+(s.flags.fabriques?6:0)+(s.flags.syndics?6:0)+(s.flags.colleges?3:0)+(O.eglise==='liberal'?3:0)+Math.max(0,s.year-1800)*.12,0,90);s.edu+=(tgt-s.edu)*(1-Math.pow(.93,dt));}
  /* l'économie : blé, puis bois, puis commerce et chemins de fer */
  const cyc=s.year<1800?0:s.year<1815?6:s.year<1830?2:s.year<1838?-8:s.year<1850?0:s.year<1857?8:2;
  {const tgt=clamp(28+14*lg(a.commerce,1500)*mE('eco')+{agriculture:-2,bois:5,commerce:6}[O.eco3]+cyc+(s.flags.reciprocite?6:0)+(s.flags.chemins?5:0),0,100);s.eco+=(tgt-s.eco)*(1-Math.pow(.8,dt));}
  /* la terre : les seigneuries se remplissent ; il faut ouvrir de nouvelles terres */
  {const fp=s.pop-s.ang;let g=0;
   g+=(s.year<1800?.018:s.year<1815?.013:s.year<1835?.009:.013)*s.land;               /* concessions dans les seigneuries existantes */
   g+=1800*lg(a.terres,1500);                                            /* chemins et paroisses de colonisation */
   if(O.terre==='franc')g+=600;if(s.flags.cantonsCanadiens)g+=2600;if(s.flags.saguenay)g+=1500;if(s.flags.colonisation)g+=1800;
   if(O.eco3==='bois')g+=400;
   s.land+=g*dt;
   const press=Math.max(0,(fp-s.land)/Math.max(1,fp));s.press=press;
   /* naissances, décès, départs */
   const nz=1+(Math.random()-.5)*.08;const births=Math.round(fp*.0545*(1-press*.5)*nz*dt);
   const ep=s.mods.epid||0;s.mods.epid=0;
   const deaths=Math.round(fp*(.0232+(s.year<1765?.024:s.year<1784?.005:s.year>=1833&&s.year<=1838?.005:0)+(war&&war.id!=='rebellions'?.002:0)+ep)*dt);
   const em=Math.round(fp*press*.04*usPull3(s.year)*(O.eco3==='bois'?.75:1)*(s.flags.rapatriement?.85:1)*dt);
   s.emig+=em;ys.emig+=em;ys.births+=births;
   /* les anglophones */
   const ai=Math.round(angImmig3(s.year)*(O.terre==='franc'?1.15:1)*(s.flags.cantonsCanadiens?.85:1)*s.recruitMod*dt);
   const ag=Math.round(s.ang*(.021-ep*.5)*dt);
   s.ang+=ai+ag;ys.arr+=ai;
   s.pop+=births-deaths-em+ai+ag;ys.dep+=em;
   s.women=Math.round(s.pop*.2);}
  /* le trésor des Canadiens : fabriques, souscriptions, puis les subsides votés par l'Assemblée */
  /* une Chambre où le Parti canadien est majoritaire vote les subsides à son peuple */
  const asm=s.year>=1792?(s.year>=1831&&!s.flags.unionAct?1.5:s.flags.unionAct?1.3:1.15)*(.8+(s.pc3??.65)*.3):1;
  s.treasury+=Math.round((s.pop-s.ang)*.035*(.6+s.eco/90)*asm*dt);
  /* la faveur du gouverneur et de Londres */
  {const tgt=clamp(40+8*lg(a.loyal,1200)*gE('fav')+{loyal:12,reforme:0,patriote:-16}[O.cour]-(s.patri-30)*.25+(war?4:0),0,100);s.compagnie+=(tgt-s.compagnie)*(1-Math.pow(.8,dt));}
  /* le mouvement national se calcule groupe par groupe (polity.js) : chaque classe a ses raisons */
  s.autonomy+=((s.year>=1792?.6:.1)+(s.flags.quebecAct?.3:0)+(s.flags.responsable?1.2:0)-(s.flags.unionAct&&!s.flags.responsable?.8:0))*dt;
  /* la milice */
  s.defense=clamp(s.defense*Math.pow(.9,dt)+5*lg(a.loyal,1500)*dt+(war?2:0),0,100);
  /* les nations */
  for(const k of ['innu','alg','abenaki','agnier','wen','ouest']){if(s.rel[k]==null)continue;relAdd(s,k,(O.nations==='alliance'?.5:-.7)*dt-(s.rel[k]>40?.3:0)*dt);}
  /* officiers */
  for(const k of ['gov','eve','mar']){const o=officer3(s,k);if(!o.name)continue;let al=0;
    for(const kk in o.like){const w=o.like[kk];if(typeof w==='number')al+=w*((s.budget[kk]||0)-20)/20;else al+=O[kk]===w?1:-.6;}
    s.off[k]=clamp(s.off[k]+clamp(al*3,-6,6)*dt-s.off[k]*.06*dt,-100,100);
    for(const f of (o.feud||[])){if(officer3(s,f).name)s.off[f]=clamp(s.off[f]-1.2*dt,-100,100);}}
  classTick(s,dt);if(typeof acadTick==='function')acadTick(s,dt);polTick(s,dt);
  /* traits */
  {const fr=1-s.ang/s.pop;const TG={
    ferveur:supT(s,'ferveur')+28+s.church*.55+(O.eglise==='ultramontain'?8:-8)+(s.year>=1840?6:0)+(s.flags.temperance?4:0),
    alliance:22+['innu','alg','abenaki','agnier','wen'].map(k=>Math.max(0,s.rel[k]||0)).reduce((x,y)=>x+y,0)/5*.35+(O.nations==='alliance'?6:-6)+(s.flags.metisRR?5:0),
    aventure:supT(s,'aventure')+32+{agriculture:-4,bois:14,commerce:6}[O.eco3]+(s.flags.nordouest?8:0)+s.press*20+(s.year>=1840?usPull3(s.year)*6:0),
    roi:supT(s,'roi')+30+s.compagnie*.45+{loyal:10,reforme:0,patriote:-14}[O.cour]-(s.flags.repression?8:0)+(s.flags.chateauguay?5:0),
    entraide:supT(s,'entraide')+40+s.church*.12+(O.terre==='seigneurie'?6:-4)+(s.flags.caisses?6:0)+(s.flags.orphelins?3:0),
    ouverture:supT(s,'ouverture')+20+(O.eglise==='liberal'?10:0)+(s.flags.institut?6:0)+s.edu*.15+(fr<.7?4:0)+(s.flags.orphelins?3:0)};
   const r=1-Math.pow(.965,dt);for(const k in TG)s.traits[k]=clamp(s.traits[k]+(clamp(TG[k],0,100)-s.traits[k])*r,0,100);}
  /* nouvelles paroisses */
  for(const[k,n]of SPREAD3)if(!s.places[k]&&s.pop>=n*(.9+Math.random()*.2)){s.places[k]=true;logIt(s,{fr:`Nouvelle paroisse : ${PLACES[k].name.fr}.`,en:`New parish: ${PLACES[k].name.en}.`},'good');}
  if(!s.places.sherbrooke&&(s.ang>40000||s.flags.cantonsCanadiens)&&s.year>=1800)s.places.sherbrooke=true;
  for(let i=0;i<dt;i++)relDrift(s);
  for(const k of ['compagnie','defense','church','missions','autonomy','eco','edu','patri'])s[k]=clamp(s[k],0,100);
  s.pop=Math.max(0,Math.round(s.pop));s.ang=Math.round(s.ang);
  s.furs=Math.round(s.eco);ys.furs=s.furs;
}
function enterYear3(s){
  setEnvFor(s);
  for(let yy=s.year;yy<s.year+(turnLen3(s)||1);yy++){const keep=s.year;s.year=yy;deliverWorld(s);s.year=keep;}
  for(const k in s.raided){s.raided[k]--;if(s.raided[k]<=0)delete s.raided[k];}
  for(const k of ['gov','eve','mar']){const o=officer3(s,k);if(o.name!==s.offName[k]){s.offName[k]=o.name;
    if(o.name){s.off[k]=Math.round(s.off[k]*.3);logIt(s,{fr:`${OFF_LAB3[k].fr} : ${o.name}.`,en:`${OFF_LAB3[k].en}: ${o.name}.`},'good');if(s===S&&!window.CALIB)toast({fr:`${OFF_LAB3[k].fr} : ${o.name}.`,en:`${OFF_LAB3[k].en}: ${o.name}.`},'gov',GOV_IMG[o.name]||null);}}}
  s.govName=officer3(s,'gov').name;
  const w=warAt3(s.year);
  if(w&&!s.warsSeen[w.id]){s.warsSeen[w.id]=true;logIt(s,{fr:`${w.name.fr}.`,en:`${w.name.en}.`},'bad');}
  s.war=w?w.id:null;s.us=usPop3(s.year);s.eng=s.us;s.uc=ucPop3(s.year);
  for(const p of ['kingston','york'])if(s.year>=1784)s.places[p]=true;if(s.year>=1827)s.places.bytown=true;
  s.turn=turnLen3(s);
  if(ELECT3.some(e=>e>=s.year&&e<s.year+s.turn)&&s.lastElec3!==s.year&&!s.ending&&!s.pending.includes('E:elec3'))s.pending.push('E:elec3');
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0,emig:0};
  let histN=0;
  for(const e of EVENTS){if(e.period!==3||e.sys||s.fired[e.id])continue;if(histN>=2&&!e.must){const nom=+((e.id.match(/\d{4}/)||[0])[0]);if(!(nom&&s.year-nom>=2))continue;}
    let ok=false;try{ok=e.cond(s);}catch(err){}if(!ok)continue;s.fired[e.id]=true;
    const p=LIKELY[e.id]?clamp(LIKELY[e.id](s),0,1):1;
    if(Math.random()<p){s.pending.push(e.id);histN++;}else diverge(s,e,p);}
  queueReview(s);
  if(!s.ending){
    const elig=EVENTS.filter(e=>{if(e.period!==3||!e.sys)return false;if((s.sysCount[e.id]||0)>=(e.max||2))return false;
      if((s.year-(s.sysLast[e.id]??-99))<e.cool)return false;try{return e.cond(s);}catch(err){return false;}});
    if(s.pending.length<2&&elig.length&&Math.random()<(s.pending.length?.3:.5)){const wt=e=>{let w=1;try{w=e.w?e.w(s):(e.conseq?3:1);}catch(err){}return Math.max(0,w);};
      const tot=elig.reduce((a,e)=>a+wt(e),0);let r=Math.random()*tot,e=elig[0];for(const x of elig){r-=wt(x);if(r<=0){e=x;break;}}
      s.sysLast[e.id]=s.year;s.sysCount[e.id]=(s.sysCount[e.id]||0)+1;s.pending.push(e.id);}
  }
}
function advance3(){
  if(S.pending.length||S.ending)return;
  S.prev=snap(S);const y0=S.year,dt=S.turn||1;
  processYear3(S);
  if(window.CALIB&&!window.CALIB_REL){S.yearOut=[];S.yearImg=null;}
  if(!window.CALIB||window.CALIB_REL){writeGazette(S,dt>1?`${y0}–${y0+dt-1}`:y0);if(!window.CALIB){const busy=S.chron[0]&&S.chron[0].dec&&S.chron[0].dec.length;if(readRel&&!busy)relOpen=0;else toast({fr:`${gazName(y0).fr} : le numéro de ${y0} est paru.`,en:`${gazName(y0).en}: the ${y0} issue is out.`},'relation',null,'relation');}}
  S.year+=dt;
  if(!S.ending&&S.year>1867)S.ending=endingFor3(S);
  if(!S.ending)enterYear3(S);
  S.popHist.push([S.year,S.pop]);
  if(!window.CALIB){save();render(true);}
}
/* fin de période : si aucun événement n'a tranché, l'état du pays décide */
function endingFor3(s){const fr=1-s.ang/s.pop;if(fr<.6)return 'assimilation';return s.flags.confedFaible?'confedFaible':'confederation';}

/* ---------- la gazette : le résumé de l'époque change de forme ---------- */
function gazName(y){y=parseInt(y);return y<1806?R('La Gazette de Québec','The Quebec Gazette'):y<1827?R('Le Canadien','Le Canadien'):y<1842?R('La Minerve','La Minerve'):R('La Minerve','La Minerve');}
function writeGazette(s,y){
  const yn=parseInt(y),ys=s.ys,items=[];const N=n=>nf(n,'fr'),NE=n=>nf(n,'en');
  const add=(h,f,e)=>items.push({h,fr:f,en:e});
  for(const x of (s.yearOut||[]).filter(x=>L(x.r)).slice(0,3))add(x.t,x.r.fr,x.r.en);
  const fp=s.pop-s.ang,fr=fp/s.pop;
  add(R('Population','Population'),`La province compte ${N(s.pop)} âmes, dont ${Math.round(fr*100)} % de Canadiens. ${ys.births?`On a baptisé ${N(ys.births)} enfants${dtTxt(s)}.`:''}`,`The province counts ${NE(s.pop)} souls, ${Math.round(fr*100)}% of them Canadiens. ${ys.births?`${NE(ys.births)} children were baptised${dtTxtE(s)}.`:''}`);
  if(ys.arr>200)add(R('Arrivées','Arrivals'),`${N(ys.arr)} immigrants britanniques se sont établis dans la province.`,`${NE(ys.arr)} British immigrants settled in the province.`);
  if(ys.emig>100)add(R('Départs','Departures'),`${N(ys.emig)} Canadiens sont partis pour les États-Unis, faute de terres.`,`${NE(ys.emig)} Canadiens left for the United States, for lack of land.`);
  if(s.cls){if(clsG(s,'habitants')>=55)add(R('Les campagnes','The countryside'),'Les cultivateurs se plaignent des rentes, des mauvaises récoltes et du prix des terres.','Farmers complain about rents, poor harvests and the price of land.');
    if(s.cls.ouvriers&&clsG(s,'ouvriers')>=55)add(R('Les faubourgs','The working districts'),'Dans les faubourgs, on parle de salaires de misère et de journées de douze heures.','In the working districts, people talk of starvation wages and twelve-hour days.');
    if(clsG(s,'marchands')>=50)add(R('Le commerce','Trade'),'Les marchands de Montréal accusent la Chambre d’entraver le progrès.','Montréal merchants accuse the House of blocking progress.');}
  if(s.press>.05&&Math.random()<.6)add(R('Les terres','Land'),`Les vieilles paroisses débordent : les fils ne trouvent plus de terre à leur portée.`,`The old parishes are overflowing: sons can no longer find land within reach.`);
  const wl=(s.yearWorld||[]).map(i=>WORLD[i]).filter(Boolean);for(const w of wl.slice(0,2))add(w.t,w.x.fr,w.x.en);
  s.chron=s.chron||[];
  s.chron.unshift({y,p3:true,gaz:gazName(y),items,fr:items.map(i=>i.fr).join(' '),en:items.map(i=>i.en).join(' '),pop:s.pop,ang:s.ang,emig:ys.emig,arr:ys.arr,births:ys.births,hist:Math.round(histPop(yn+.99)),gov:officer3(s,'gov').name,img:s.yearImg||'relations',world:(s.yearWorld||[]).slice(),rel:Object.assign({},s.rel),dec:(s.yearOut||[]).map(x=>x.t)});
  s.yearImg=null;s.yearOut=[];s.yearWorld=[];if(s.chron.length>60)s.chron.length=60;
}
const dtTxt=s=>(s.turn||1)>1?` en ${s.turn} ans`:'',dtTxtE=s=>(s.turn||1)>1?` over ${s.turn} years`:'';

/* ---------- repères de population (recensements ; Bas-Canada seulement après 1791) ---------- */
HIST_POP.push([1765,69810],[1784,113012],[1822,427465],[1825,479288],[1831,553134],[1844,697084],[1851,890261],[1861,1111566],[1867,1180000]);
HIST_SOURCES.push(...[[1765,69810],[1784,113012],[1822,427465],[1825,479288],[1831,553134],[1844,697084],[1851,890261],[1861,1111566]].map(([y,v])=>({y,v,src:'Recensements (Statistique Canada)'})));
HIST_POP.sort((a,b)=>a[0]-b[0]);

/* ---------- les élections à la Chambre d'assemblée (1792–1867) ---------- */
const ELECT3=[1792,1796,1800,1804,1808,1810,1814,1816,1820,1824,1827,1830,1834,1841,1844,1848,1851,1854,1858,1861,1863];
function seats3(y){return y<1830?50:y<1841?88:y<1854?42:65;}
function parties3(s){const y=s.year,line=LINE3[s.orient.cour]||50;
  const L=[{id:'canadien',stance:line,gov:false},{id:'anglais',stance:5,gov:false}];
  if(y>=1848)L.push({id:'rouges',stance:88,gov:false});return L;}
function electionEvent3(s){const F=fr(),y=s.year,T=seats3(y),un=!!s.flags.unionAct;
  const pr=polVote(s,parties3(s));const pc=Math.round((pr.v.canadien||0)*100);
  const res=(s2,gb)=>{const r=polVote(s2,parties3(s2),{gbonus:gb||{},noise:4});s2.lastVote=r;r.y=s2.year;s2.lastElec3=s2.year;
    const n={};let left=T;const ks=Object.keys(r.seats).sort((a,b)=>r.seats[b]-r.seats[a]);ks.forEach((k,i)=>{n[k]=i===ks.length-1?left:Math.round(r.seats[k]*T);left-=n[k];});
    s2.pc3=(n.canadien||0)/T;const out=[];
    const nm={canadien:un?R('réformistes canadiens','Canadien reformers'):R('Parti canadien','Parti canadien'),anglais:un?R('tories','Tories'):R('parti des bureaucrates','bureaucrats’ party'),rouges:R('rouges','Rouges')};
    out.push(ks.map(k=>`${L(nm[k])} ${n[k]}`).join(' · ')+(F?` (sur ${T} sièges${un?' du Canada-Est':''}).`:` (of ${T} seats${un?' in Canada East':''}).`));
    if(s2.pc3>=.6)out.push(F?"La Chambre est canadienne : elle votera les subsides à ses conditions.":"The House is Canadien: it will vote supply on its own terms.");
    else if(s2.pc3>=.45)out.push(F?"Une Chambre divisée : chaque vote se négocie.":"A divided House: every vote must be bargained for.");
    else out.push(F?"Les Canadiens ont perdu la Chambre : le parti anglais et les modérés font la loi.":"The Canadiens have lost the House: the English party and the moderates make the law.");
    if((n.rouges||0)>T*.15)out.push(F?"Les rouges de Papineau et de l'Institut canadien vous débordent sur la gauche.":"Papineau's Rouges and the Institut canadien outflank you on the left.");
    out.push(polVoteStory(s2,r));return {fr:out.join(' '),en:out.join(' ')};};
  const ch=[
   {label:R("Les griefs : la Chambre doit contrôler les subsides","Grievances: the House must control supply"),desc:R("Mobilise les professions et les habitants ; inquiète le clergé, les seigneurs et le Château.","Mobilizes the professions and the habitants; worries the clergy, the seigneurs and the Château."),
    fx:s2=>{s2.compagnie-=4;return res(s2,{professions:{canadien:5},habitants:{canadien:3},clerge:{canadien:-3},seigneurs:{canadien:-3}});}},
   {label:R("La modération : des réformes, avec le gouverneur","Moderation: reforms, with the Governor"),desc:R("Rassure le clergé et les seigneurs ; les jeunes avocats s'impatientent.","Reassures the clergy and the seigneurs; the young lawyers grow impatient.") ,
    fx:s2=>{s2.compagnie+=2;return res(s2,{clerge:{canadien:4},seigneurs:{canadien:4},professions:{canadien:-3,rouges:2}});}},
   {label:R("Les places et les faveurs du Château","Offices and favours from the Château"),desc:R("Le patronage achète des comtés, mais déconsidère le parti.","Patronage buys ridings, but discredits the party."),
    fx:s2=>{s2.treasury=Math.round(s2.treasury*.85);s2.compagnie+=5;return res(s2,{habitants:{canadien:2},seigneurs:{canadien:3},professions:{canadien:-4,rouges:3}});}}];
  const hist=y<1810?1:y<1841?0:1;ch[hist].hist=true;
  return {id:'E:elec3',routine:true,elec:true,place:'quebec',title:R(`Les élections de ${y}`,`The ${y} election`),
   text:{fr:`${un?"Élections au Parlement du Canada-Uni : le Canada-Est élit la moitié des députés.":"Élections à la Chambre d'assemblée du Bas-Canada."} On estime que ${pc} % des électeurs voteront pour ${un?'les réformistes canadiens':'le Parti canadien'}. Votre ligne compte : trop prudente, elle perd les professions ; trop radicale, elle effraie le clergé et les seigneurs. Sur quoi faire campagne ?`,
         en:`${un?"Elections to the Parliament of the Province of Canada: Canada East elects half the members.":"Elections to the House of Assembly of Lower Canada."} An estimated ${pc}% of voters will back ${un?'the Canadien reformers':'the Parti canadien'}. Your line matters: too cautious and you lose the professions; too radical and you frighten the clergy and the seigneurs. What should the campaign be about?`},choices:ch};}
