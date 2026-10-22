/* Kebec — Période V (1960–2000) : le Québec moderne.
   Vous êtes le gouvernement du Québec : le parti au pouvoir (libéral, Union nationale, puis Parti québécois).
   Quatre chantiers : l'État et l'économie, la langue et l'immigration, la souveraineté et la Constitution, les nations autochtones et le Nord.
   En 2000, si le Québec n'a pas trouvé sa place (pays, statut particulier ou province), il est trop tard : l'histoire tranche. */

/* ---------- les partis et leurs chefs ---------- */
const PARTIES5={
 plq:{name:R('Parti libéral','Liberal Party'),short:R('libéral','Liberal'),
  lead:[[1958,'Jean Lesage','Lesage'],[1970,'Robert Bourassa','Bourassa'],[1977,'Gérard D. Levesque','Levesque'],[1978,'Claude Ryan','Ryan'],[1982,'Gérard D. Levesque','Levesque'],[1983,'Robert Bourassa','Bourassa'],[1994,'Daniel Johnson','Johnson'],[1998,'Jean Charest','Charest']]},
 un:{name:R('Union nationale','Union nationale'),short:R('Union nationale','Union nationale'),
  lead:[[1960,'Antonio Barrette','Barrette'],[1961,'Daniel Johnson','Johnson'],[1968,'Jean-Jacques Bertrand','Bertrand'],[1971,'Gabriel Loubier','Loubier'],[1976,'Rodrigue Biron','Biron'],[1981,'Roch La Salle','La Salle']]},
 pq:{name:R('Parti québécois','Parti Québécois'),short:R('péquiste','PQ'),
  lead:[[1968,'René Lévesque','Lévesque'],[1985,'Pierre Marc Johnson','Johnson'],[1988,'Jacques Parizeau','Parizeau'],[1996,'Lucien Bouchard','Bouchard']]}};
/* qui gouverne dans l'histoire, et qui gagne chaque élection */
const HISTGOV5=[[1960,'plq'],[1966.5,'un'],[1970.3,'plq'],[1976.9,'pq'],[1985.9,'plq'],[1994.7,'pq']];
const HISTWIN5={1962:'plq',1966:'un',1970:'plq',1973:'plq',1976:'pq',1981:'pq',1985:'plq',1989:'plq',1994:'pq',1998:'pq'};
const ELECT5=[1962,1966,1970,1973,1976,1981,1985,1989,1994,1998];
const histParty5=y=>{let p='plq';for(const[a,b]of HISTGOV5)if(y>=Math.floor(a))p=b;return p;};
function leader5(s,party){const L5=PARTIES5[party].lead;let o=L5[0];for(const x of L5)if(s.year>=x[0])o=x;return {name:o[1],sn:o[2],party:PARTIES5[party].short,pid:party};}
function govParty5(s){return s.party5||histParty5(s.year);}
function premier5(s){return leader5(s,govParty5(s));}
function histPremier5(y){return leader5({year:y},histParty5(y));}
/* l'adversaire principal : l'Union nationale jusqu'à l'arrivée du PQ, puis le PQ (s'il existe) */
function rival5(s){const g=govParty5(s),pq=s.flags.pq;if(g==='pq')return 'plq';if(g==='un')return pq&&s.year>=1976?'pq':'plq';return pq&&s.year>=1970?'pq':'un';}
function opposition5(s){return leader5(s,rival5(s));}
/* le programme de chaque parti, quand il arrive au pouvoir */
const PLATFORM5={plq:{ottawa5:'federalisme'},un:{ottawa5:'autonomie'},pq:{ottawa5:'souverainete',langue5:'charte'}};
function changeGov5(s,party,why){const before=premier5(s);s.party5=party;s.govSince=s.year;const p=premier5(s);
  Object.assign(s.orient,PLATFORM5[party]||{});
  s.off.gov=Math.round(s.off.gov*.5+(party==='pq'?-15:party==='plq'?8:-4));s.off.eve=Math.round(s.off.eve+(party==='pq'?10:-4));s.off.mar=Math.round(s.off.mar+(party==='pq'?-10:party==='plq'?6:0));
  s.support=52;s.mandat=.95;
  const tx={fr:`Changement de gouvernement : ${p.name} (${p.party.fr}) remplace ${before.name}. ${why?why.fr:''}`,en:`Change of government: ${p.name} (${p.party.en}) replaces ${before.name}. ${why?why.en:''}`};
  logIt(s,tx,'good');return tx;}
/* le nom du premier ministre de l'histoire, dans les textes, devient celui du vôtre */
function sub5(t){if(!S||S.period!==5||typeof t!=='string')return t;const h=histPremier5(S.year),c=premier5(S);if(h.name===c.name)return t;return t.split(h.name).join(c.name).split(h.sn+' ').join(c.sn+' ').split(h.sn+',').join(c.sn+',').split(h.sn+'.').join(c.sn+'.');}

/* ---------- avec qui il faut composer : Ottawa, les syndicats, le capital ---------- */
const OFFICERS5={
 gov:[
  {from:1957,name:'John Diefenbaker',trait:R("« Un seul Canada » : il ne voit pas venir la Révolution tranquille.","'One Canada': he does not see the Quiet Revolution coming."),like:{ottawa5:'federalisme'},mod:{fav:.9}},
  {from:1963,name:'Lester B. Pearson',trait:R("Le fédéralisme coopératif : il laisse le Québec se retirer de programmes fédéraux, avec compensation, et crée la commission sur le bilinguisme.","Cooperative federalism: he lets Quebec opt out of federal programs with compensation, and creates the commission on bilingualism."),like:{ottawa5:'autonomie'},mod:{fav:1.15}},
  {from:1968,name:'Pierre Elliott Trudeau',trait:R("Un Québécois contre le nationalisme québécois : bilinguisme d'un océan à l'autre, aucun statut particulier, une Charte des droits.","A Quebecer against Quebec nationalism: bilingualism from sea to sea, no special status, a Charter of Rights."),like:{ottawa5:'federalisme',langue5:'libre'},mod:{fav:.85}},
  {from:1979,name:'Joe Clark',trait:R("Une « communauté de communautés » : neuf mois au pouvoir, trop peu pour changer quoi que ce soit.","A 'community of communities': nine months in power, too little to change anything."),like:{ottawa5:'autonomie'},mod:{fav:1}},
  {from:1980,name:'Pierre Elliott Trudeau',trait:R("De retour pour gagner le référendum, puis rapatrier la Constitution, avec ou sans le Québec.","Back to win the referendum, then patriate the Constitution, with or without Quebec."),like:{ottawa5:'federalisme',langue5:'libre'},mod:{fav:.8}},
  {from:1984,name:'Brian Mulroney',trait:R("Le gars de Baie-Comeau veut ramener le Québec « dans l'honneur et l'enthousiasme ». Il tend la main aux nationalistes.","The boy from Baie-Comeau wants to bring Quebec back 'with honour and enthusiasm'. He reaches out to the nationalists."),like:{ottawa5:'autonomie'},mod:{fav:1.15}},
  {from:1993,name:'Jean Chrétien',trait:R("Le p'tit gars de Shawinigan n'aime ni les référendums ni les palabres constitutionnelles. Après 1995 : le « plan B » et la loi sur la clarté.","The little guy from Shawinigan dislikes referendums and constitutional talk. After 1995: 'Plan B' and the Clarity Act."),like:{ottawa5:'federalisme'},mod:{fav:.85}}],
 eve:[
  {from:1960,name:'Jean Marchand (CSN)',trait:R("Les syndicats catholiques se déconfessionnalisent : la CTCC devient la CSN. Ils veulent un État qui protège les travailleurs.","The Catholic unions drop their religious label: the CTCC becomes the CSN. They want a state that protects workers."),like:{travail5:'social'},mod:{paix:1}},
  {from:1965,name:'Marcel Pepin (CSN) et Louis Laberge (FTQ)',trait:R("Le droit de grève dans le secteur public, puis le Front commun : « Ne comptons que sur nos propres moyens ».","The right to strike in the public sector, then the Common Front: 'Let us count only on our own means'."),like:{travail5:'social',etat5:'interventionniste'},mod:{paix:.85}},
  {from:1976,name:'Norbert Rodrigue (CSN) et Louis Laberge (FTQ)',trait:R("Les centrales appuient le PQ… jusqu'à ce qu'il coupe les salaires de l'État en 1982.","The labour federations back the PQ… until it cuts public-sector pay in 1982."),like:{travail5:'social',langue5:'charte'},mod:{paix:.95}},
  {from:1983,name:'Gérald Larose (CSN) et Louis Laberge (FTQ)',trait:R("Après les décrets de 1982, la méfiance. Le Fonds de solidarité de la FTQ investit pourtant dans les entreprises d'ici.","After the 1982 decrees, mistrust. Yet the FTQ's Solidarity Fund invests in local firms."),like:{travail5:'concertation',finances5:'equilibre'},mod:{paix:1}},
  {from:1993,name:'Clément Godbout (FTQ) et Gérald Larose (CSN)',trait:R("Les syndicats militent pour la souveraineté, mais pas à n'importe quel prix pour le déficit zéro.","The unions campaign for sovereignty, but not at any price for the zero deficit."),like:{travail5:'concertation',ottawa5:'souverainete'},mod:{paix:1}}],
 mar:[
  {from:1960,name:'La rue Saint-Jacques',trait:R("La Banque de Montréal, la Sun Life, le Canadien Pacifique : le pouvoir économique parle anglais, et Montréal est encore la métropole du Canada.","The Bank of Montreal, Sun Life, Canadian Pacific: economic power speaks English, and Montreal is still Canada's metropolis."),like:{etat5:'liberal',langue5:'libre',ottawa5:'federalisme'},mod:{eco:1}},
  {from:1977,name:"L'exode des sièges sociaux",trait:R("La Sun Life part pour Toronto. Le capital anglo-canadien vote avec ses pieds ; une bourgeoisie francophone le remplace peu à peu.","Sun Life leaves for Toronto. Anglo-Canadian capital votes with its feet; a francophone bourgeoisie slowly replaces it."),like:{etat5:'liberal',ottawa5:'federalisme'},mod:{eco:.9}},
  {from:1984,name:'Le Québec inc.',trait:R("Bombardier, Desjardins, Cascades, Provigo, la Caisse de dépôt : des patrons francophones, qui veulent un État partenaire, pas propriétaire.","Bombardier, Desjardins, Cascades, Provigo, the Caisse de dépôt: francophone bosses who want the state as a partner, not an owner."),like:{etat5:'partenariat',finances5:'equilibre'},mod:{eco:1.1}},
  {from:1993,name:'La mondialisation',trait:R("Libre-échange, marchés financiers, cotes de crédit : Moody's décote le Québec et les investisseurs détestent l'incertitude.","Free trade, financial markets, credit ratings: Moody's downgrades Quebec and investors hate uncertainty."),like:{finances5:'austerite',etat5:'partenariat'},mod:{eco:1}}]};
const OFF_LAB5={gov:R('Ottawa','Ottawa'),eve:R('Les syndicats','The unions'),mar:R('Le capital','Capital')};
function officer5(s,k){let o=OFFICERS5[k][0];for(const x of OFFICERS5[k])if(s.year>=x.from)o=x;return o;}
function offEff5(s,k,m){const o=officer5(s,k);const base=(o.mod&&o.mod[m])||1;return base*(1+(s.off[k]||0)/260);}
const FED5=[[1957,'pc'],[1963,'lib'],[1979,'pc'],[1980,'lib'],[1984,'pc'],[1993,'lib']];

/* ---------- le rythme : une législature par tour, un an dans les crises ---------- */
const CRISES5=[[1960,1960],[1968,1970],[1976,1977],[1980,1982],[1987,1990],[1994,1996]];
function turnLen5(s){const y=s.year;if(CRISES5.some(([a,b])=>y>=a&&y<=b))return 1;
  const ne=ELECT5.find(e=>e>y)||2001,nc=(CRISES5.find(([a])=>a>y)||[2001])[0];return clamp(Math.min(ne,nc)-y,1,3);}
function regime5(y){return y<1966?R('La Révolution tranquille','The Quiet Revolution'):y<1980?R('Le Québec moderne','Modern Quebec'):y<1990?R('Les années de l’après-référendum','The post-referendum years'):R('La fin du siècle','The end of the century');}
/* ce que perçoit le gouvernement du Québec, par habitant (dollars courants) */
const revRate5=y=>pw([[1960,130],[1965,260],[1970,560],[1975,1200],[1980,2200],[1985,3300],[1990,4300],[1995,5000],[2000,6400]],y);

/* ---------- les traits, avec les mots de l'époque ---------- */
const TRAITS5=[
 {id:'ferveur',name:R('Pratique religieuse','Religious practice'),lo:R('laïques','secular'),hi:R('pratiquants','churchgoing')},
 {id:'alliance',name:R('Liens avec les Premières Nations','Ties with the First Nations'),lo:R('méfiance','mistrust'),hi:R('de nation à nation','nation to nation')},
 {id:'aventure',name:R('Ouverture au monde','Openness to the world'),lo:R('casaniers','homebodies'),hi:R('citoyens du monde','world citizens')},
 {id:'roi',name:R('Attachement au Canada','Attachment to Canada'),lo:R('souverainistes','sovereigntists'),hi:R('fédéralistes','federalists')},
 {id:'entraide',name:R('Solidarité','Solidarity'),lo:R('chacun pour soi','each for themselves'),hi:R('social-démocrates','social democrats')},
 {id:'ouverture',name:R('Pluralisme','Pluralism'),lo:R('repli identitaire','identity withdrawal'),hi:R('société d’accueil','welcoming society')}];

/* ---------- les lieux de la période : le Nord, les barrages, les communautés ---------- */
Object.assign(PLACES,{
 baieComeau:{ll:[-68.15,49.22],name:R('Baie-Comeau','Baie-Comeau'),dx:6,dy:-4,p5:true},
 matagami:{ll:[-77.63,49.75],name:R('Matagami','Matagami'),dx:6,dy:12,p5:true},
 chibougamau:{ll:[-74.37,49.91],name:R('Chibougamau','Chibougamau'),dx:6,dy:12,p5:true},
 schefferville:{ll:[-66.83,54.8],name:R('Schefferville','Schefferville'),dx:6,dy:12,p5:true},
 fermont:{ll:[-67.09,52.79],name:R('Fermont','Fermont'),dx:6,dy:12,p5:true},
 radisson:{ll:[-77.62,53.79],name:R('Radisson','Radisson'),dx:6,dy:12,p5:true},
 laval5:{ll:[-73.72,45.6],name:R('Laval','Laval'),dx:-6,dy:-4,anchor:'end',p5:true},
 longueuil:{ll:[-73.5,45.53],name:R('Longueuil','Longueuil'),dx:6,dy:12,p5:true},
 gatineau5:{ll:[-75.65,45.48],name:R('Gatineau','Gatineau'),dx:6,dy:-4,p5:true}});
/* les barrages et les communautés du Nord : dessinés par la couche de la période */
const DAMS5=[{id:'manic5',ll:[-68.73,50.64],n:'Manic-5',f:'manic',y:1968},{id:'churchill',ll:[-64.3,53.55],n:'Churchill Falls',y:1971},{id:'lg2',ll:[-77.52,53.78],n:'LG-2',f:'baieJames',y:1979},{id:'lg3',ll:[-76.05,53.72],n:'LG-3',f:'baieJames',y:1982},{id:'lg4',ll:[-73.5,53.88],n:'LG-4',f:'baieJames',y:1984},{id:'gb',ll:[-77.0,55.25],n:'Grande-Baleine',f:'grandeBaleine',y:1992}];
const COMM5=[{n:'Chisasibi',ll:[-78.9,53.79],g:'cri',a:'end'},{n:'Waskaganish',ll:[-78.75,51.48],g:'cri',a:'end'},{n:'Mistissini',ll:[-73.87,50.42],g:'cri'},{n:'Wemindji',ll:[-78.82,53.01],g:'cri',a:'end'},{n:'Waswanipi',ll:[-75.96,49.69],g:'cri'},{n:'Nemaska',ll:[-76.23,51.69],g:'cri',from:1977},{n:'Oujé-Bougoumou',ll:[-74.82,49.93],g:'cri',from:1992},{n:'Whapmagoostui',ll:[-77.75,55.28],g:'cri',a:'end'},
 {n:'Kuujjuaq',ll:[-68.4,58.1],g:'inuit'},{n:'Puvirnituq',ll:[-77.28,60.03],g:'inuit'},{n:'Salluit',ll:[-75.64,62.2],g:'inuit'},{n:'Inukjuak',ll:[-78.1,58.45],g:'inuit',a:'end'},{n:'Kangiqsualujjuaq',ll:[-65.95,58.69],g:'inuit'},{n:'Kawawachikamach',ll:[-66.78,54.86],g:'naskapi',from:1983}];
/* les nations du Nord apparaissent dans les relations à partir de 1960 */
GROUPS.push({id:'cri',name:R('Cris','Cree'),sub:R('Eeyou Istchee','Eeyou Istchee'),ll:[-76.4,52.0],rx:150,ry:70,raid:[]},
            {id:'inuit',name:R('Inuit','Inuit'),sub:R('Nunavik','Nunavik'),ll:[-73.6,58.6],rx:170,ry:70,raid:[]});
if(typeof TERR_POLY!=='undefined'){
 TERR_POLY.cri=[[-79.4,49.6],[-79.0,51.4],[-79.4,53.4],[-78.9,55.1],[-77.0,55.4],[-73.0,55.2],[-70.6,53.5],[-71.4,51.2],[-73.6,49.8],[-76.8,49.4]];
 TERR_POLY.inuit=[[-78.6,55.4],[-77.6,58.4],[-78.0,60.4],[-77.4,62.4],[-72.0,62.2],[-69.5,61.2],[-65.0,60.2],[-64.4,59.4],[-66.8,57.4],[-70.4,55.6],[-74.0,55.4]];}

/* ---------- état de départ ---------- */
const ENV5=['educ','sante','nord','langue','economie'];
function p5Defaults(s){
  s.period=5;s.season=1;s.turn=1;s.ending=null;s.pending=[];s.outcome=null;
  s.off={gov:0,eve:-5,mar:5};s.offName={};
  s.p5start={year:s.year,pop:s.pop};s.yearOut=[];s.chron=[];
  s.party5=s.party5||histParty5(s.year);s.govSince=s.govSince5||s.year;s.support=58;s.mandat=1.05;
  s.revT=Math.round(s.pop*revRate5(s.year));s.treasury=Math.round(s.revT*.8);
  s.urb=Math.max(s.urb||.74,.72);s.etat=s.etat||22;s.dette=s.dette||8;s.chom=s.chom||8.5;s.souv=s.souv||8;s.fed=s.fed||55;s.flq=0;s.nord=s.nord||4;
  s.fraFrac=s.fraFrac||.24;s.emig5=0;s.out5=0;
  if(s.allo==null){s.allo=Math.round((s.ang||0)*.29);s.ang=Math.round((s.ang||0)*.71);}
  s.rel.cri=s.rel.cri??25;s.rel.inuit=s.rel.inuit??25;if(s.rel.agnier==null)s.rel.agnier=0;
  for(const k of ['onon','ouest','renards'])if(k in s.rel)delete s.rel[k];
  s.war=null;s.warsSeen={};s.seenWorld=s.seenWorld||{};WORLD.forEach((w,i)=>{if(w.y<s.year)s.seenWorld[i]=true;});
  s.budget={educ:30,sante:25,nord:15,langue:5,economie:25};s.alloc={};
  s.orient={ottawa5:'autonomie',langue5:'libre',etat5:'interventionniste',nord5:'harnacher',finances5:'equilibre',travail5:'concertation'};s.cls=null;
  s.routine=s.routine||{};s.refs=[];s.lastRef=0;
  for(const k of ['gov','eve','mar'])s.offName[k]=officer5(s,k).name;s.premier=premier5(s).name;
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0,emig:0,deaths:0};
  s.lastReview=null;s.revSnap=null;s.sysCount=s.sysCount||{};s.sysLast=s.sysLast||{};s.str=s.str||{};
  setEnvFor(s);return s;
}
/* départ historique : juin 1960, « C'est le temps que ça change » */
function newState5(){
  const s=attachRel(newState());
  Object.assign(s,{year:1960,pop:5200000,ang:690000,allo:280000,women:1000000,cleared:0,food:0,treasury:0,furs:0,defense:20,compagnie:50,church:72,missions:30,autonomy:42,
    eco:48,edu:30,patri:30,land:0,wenFallen:true,wenStr:12,annedda:true,hospital:true,firstWinter:false,foreign:55,urb:.74,capital:.8});
  s.rel={innu:15,alg:10,agnier:-5,abenaki:20,wen:20,cri:25,inuit:25};
  s.places={quebec:true,tadoussac:true,troisRivieres:true,villeMarie:true,orleans:true,beauport:true,lauzon:true,beaupre:true,kamouraska:true,batiscan:true,sorel:true,laprairie:true,boucherville:true,kahnawake:true,lorette:true,
    stHyacinthe:true,stDenis:true,stEustache:true,rimouski:true,chicoutimi:true,sherbrooke:true,gaspe:true,kingston:true,york:true,bytown:true,
    stJerome:true,montLaurier:true,roberval:true,shawinigan:true,thetford:true,hull:true,temiscamingue:true,amos:true,rouyn:true,arvida:true,septIles:true,matapedia:true,
    baieComeau:true,schefferville:true,chibougamau:true,laval5:true,longueuil:true};
  s.flags={conquest:true,grandePaix:true,unionAct:true,responsable:true,finSeigneurie:true,chemins:true,confed:true,hydroQc:true,suffrage:true,ecoleObligatoire:true,ministereAboli:true,impotProv:true,fleurdelise:true};s.fired={};s.raided={};
  s.popHist=[[1960,5200000]];
  s.traits={ferveur:78,alliance:25,aventure:35,roi:52,entraide:55,ouverture:38};
  s.regions={laurentides:1868,saguenay:1871,matapedia:1881,temiscamingue:1886,abitibi:1912};
  s.log=[];logIt(s,R("22 juin 1960 : les libéraux de Jean Lesage battent l'Union nationale. « C'est le temps que ça change. »","22 June 1960: Jean Lesage's Liberals defeat the Union nationale. 'It's time for a change.'"),'good');
  return p5Defaults(s);
}
/* départ hérité : la province que le joueur a laissée en 1960 */
const P5_INHERIT=['revolutionTranquille','etatModerne','noirceur','minorite','tutelle'];
function inheritState5(p4){
  const s=attachRel(structuredClone(p4));const how=s.ending;
  s.year=1960;s.inherited=true;s.pending=[];s.outcome=null;s.flags=s.flags||{};
  s.party5=(s.side4==='bleu')?'un':'plq';
  const T={etatModerne:R("1960 : la province a déjà ses écoles, son électricité et son État. Il reste à décider ce qu'elle veut être.","1960: the province already has its schools, its electricity and its state. It remains to decide what it wants to be."),
   noirceur:R("1960 : l'Église tient tout, l'école est pauvre. Le rattrapage sera brutal.","1960: the Church holds everything, schools are poor. Catching up will be brutal."),
   minorite:R("1960 : les francophones ne sont plus qu'une courte majorité. La langue sera le combat de la période.","1960: francophones are only a narrow majority now. Language will be the fight of the period."),
   tutelle:R("1960 : Ottawa a tout centralisé. Le Québec doit reconquérir ses pouvoirs.","1960: Ottawa has centralized everything. Quebec must win back its powers.")};
  logIt(s,T[how]||R("1960 : « C'est le temps que ça change. »","1960: 'It's time for a change.'"),'good');
  p5Defaults(s);
  s.church=Math.max(s.church||60,40);s.edu=Math.max(s.edu||25,18);
  if(how==='etatModerne'){s.etat=34;s.edu=Math.max(s.edu,40);s.church=Math.min(s.church,58);}
  if(how==='noirceur'){s.etat=14;s.church=Math.max(s.church,80);}
  if(how==='tutelle'){s.autonomy=clamp((s.autonomy||30)-10,0,100);s.patri=clamp((s.patri||25)+6,0,100);}
  for(const k of ['stJerome','montLaurier','roberval','shawinigan','thetford','hull','amos','rouyn','arvida','septIles','baieComeau','schefferville','chibougamau','laval5','longueuil'])s.places[k]=true;
  s.popHist=[[1960,s.pop]];
  return s;
}
function startPeriod5(inherit){
  S=inherit?inheritState5(S):newState5();
  titleOpen=false;prologueOpen=true;dispatchMin=false;tab='colonie';view='continent';cam=null;staticCache.key='';
  enterYear5(S);save();render();
}

/* ---------- la démographie : repères (Institut de la statistique du Québec) ---------- */
const CBR5=[[1960,.0270],[1962,.0250],[1964,.0228],[1966,.0188],[1968,.0160],[1970,.0156],[1972,.0140],[1975,.0152],[1980,.0150],[1983,.0139],[1987,.0126],[1990,.0145],[1993,.0130],[1997,.0116],[2000,.0099]];
const CHURCH5=[[1960,80],[1966,62],[1971,42],[1981,32],[1991,22],[2000,14]];
/* ce qu'on fait dans l'histoire, pour juger des écarts */
const histLang5=y=>y<1974?'libre':y<1977?'incitation':'charte';
const CDR5=[[1960,.0067],[1970,.0066],[1980,.0067],[1990,.0071],[2000,.0076]];
const IMM5=[[1960,24000],[1964,24000],[1967,45000],[1970,23000],[1974,33000],[1976,30000],[1979,19000],[1983,16000],[1986,20000],[1989,34000],[1991,52000],[1993,44000],[1996,30000],[2000,32000]];
/* solde migratoire interprovincial (négatif : on part vers l'Ontario et l'Ouest) */
const INTERP5=[[1960,-8000],[1966,-12000],[1971,-14000],[1976,-22000],[1978,-30000],[1981,-22000],[1984,-12000],[1987,-5000],[1990,-4000],[1993,-8000],[1997,-13000],[2000,-12000]];
const URB5=[[1961,.74],[1971,.80],[1981,.78],[1991,.78],[2001,.80]];
/* la conjoncture nord-américaine */
const cyc5=y=>y<1962?-2:y<1967?5:y<1968?6:y<1971?0:y<1974?4:y<1976?-1:y<1980?2:y<1981?0:y<1983?-10:y<1990?4:y<1993?-7:y<1997?-1:5;

/* ---------- simulation ---------- */
function processYear5(s){
  const dt=s.turn||1,ys=s.ys,O=s.orient,F=s.flags,y=s.year;
  /* les finances : emprunter pour dépenser, ou équilibrer, ou couper */
  const fin={equilibre:1,emprunt:1.22,austerite:.86}[O.finances5]||1;
  const base=Math.max(0,s.treasury)*fin,a={};let tot=0;for(const k of ENV5){a[k]=Math.round(base*(s.budget[k]||0)/100);tot+=a[k];}s.alloc=a;s.treasury-=Math.min(s.treasury,tot);
  const ref=Math.max(1,(s.revT||1)*.1),ef=k=>Math.log1p((a[k]||0)/ref)*(s.mandat||1);
  const gE=m=>offEff5(s,'gov',m),uE=m=>offEff5(s,'eve',m),mE=m=>offEff5(s,'mar',m);
  const gov=govParty5(s);
  /* l'école, l'Église */
  {const tgt=clamp(28+11*ef('educ')+(F.rapportParent?8:0)+(F.ministereEduc?6:0)+(F.cegeps?6:0)+(F.uq?4:0)+Math.max(0,y-1960)*.55,0,98);s.edu+=(tgt-s.edu)*(1-Math.pow(.88,dt));}
  {const tgt=clamp(pw(CHURCH5,y)+(F.ministereEduc?-3:0)+(s.traits.ferveur-50)*.05,5,95);s.church+=(tgt-s.church)*(1-Math.pow(.8,dt));}
  /* l'État québécois : nationalisations, sociétés d'État, fonction publique */
  {const tgt=clamp(18+5*ef('economie')+3*ef('educ')+{interventionniste:16,partenariat:8,liberal:-8}[O.etat5]+(F.hydro2?10:0)+(F.caisse?6:0)+(F.sgf?3:0)+(F.assuranceMaladie?5:0)+(F.ministereEduc?4:0)+(F.regieRentes?3:0)+Math.min(20,Math.max(0,y-1960)*.6)-(O.finances5==='austerite'?4:0),0,100);s.etat+=(tgt-s.etat)*(1-Math.pow(.85,dt));}
  /* qui possède l'économie (part non francophone) */
  {const tgt=clamp(58-s.etat*.22-(F.hydro2?5:0)-(F.caisse?4:0)-(O.etat5==='partenariat'?6*clamp((y-1970)/15,0,1):0)-(O.langue5==='charte'?3:0)-(F.quebecInc?5:0)-ef('economie')*2,20,90);s.foreign+=(tgt-s.foreign)*(1-Math.pow(.9,dt));}
  /* l'incertitude politique : le capital déteste les référendums */
  const incert=(gov==='pq'&&O.ottawa5==='souverainete'?4:0)+(F.refSoon?3:0)+(F.octobre&&y<1972?3:0);
  {const tgt=clamp(40+cyc5(y)*1.2+5*ef('economie')*mE('eco')+2*ef('nord')+(s.etat-50)*.06+(s.edu-60)*.08-Math.max(0,s.dette-35)*.35-incert+(F.expo67&&y<1970?2:0)+(F.libreEchange?2:0)+(F.baieJames&&y>=1973&&y<1985?3:0)-(O.langue5==='charte'&&y<1985?2:0),0,100);s.eco+=(tgt-s.eco)*(1-Math.pow(.72,dt));}
  s.chom=clamp(8.5+(48-s.eco)*.2+pw([[1960,-1],[1966,-2.5],[1970,-.5],[1976,1],[1981,1.5],[1983,3.5],[1989,1.5],[1993,4],[1997,2],[2000,0]],y),3,20);
  /* la dette */
  {const d={equilibre:.25,emprunt:.75,austerite:-.7}[O.finances5]+Math.max(0,s.chom-8)*.15+(F.baieJames&&y>=1972&&y<1985?.35:0)+(F.olympiques&&y<1980?.3:0)+(F.deficitZero&&y>=1998?-.6:0);s.dette=clamp(s.dette+d*dt,0,90);}
  /* l'autonomie face à Ottawa */
  s.autonomy=clamp(s.autonomy+(({federalisme:-.25,autonomie:.45,souverainete:.35}[O.ottawa5])+(F.regieRentes&&y<1970?.4:0)+(F.rapatriement?-.2:0)+(F.societeDistincte?.4:0))*dt,0,100);
  /* le nationalisme */
  {const dk=(f,w,Y,tau)=>f?w*Math.exp(-Math.max(0,y-Y)/(tau||15)):0;
   const grief=dk(F.rapatriement,9,1982,20)+dk(F.meechDead,16,1990,8)+dk(F.charlottetownDead,4,1992)+dk(F.octobreMesures,5,1970,10)+dk(F.stLeonard,4,1968)+dk(F.loi63,4,1969)+(F.tutelle?6:0);
   /* l'identité nationale naît de conditions matérielles : l'école, l'État, la sécularisation, la ville */
   const mat=(s.edu-28)*.17+(s.etat-18)*.13+(62-s.church)*.07+(s.urb-.74)*30;s.patriMat=mat;
   const tgt=clamp(18+mat+{federalisme:-3,autonomie:3,souverainete:6}[O.ottawa5]+{libre:-2,incitation:1,charte:3}[O.langue5]+grief+(s.edu-40)*.08+(F.expo67?2:0)+(F.pq?2:0)-(s.traits.roi-50)*.1+supT(s,'patri')*.5,0,100);
   s.patri+=(tgt-s.patri)*(1-Math.pow(.82,dt));}
  /* la confiance envers le fédéralisme renouvelé */
  /* la langue : où vont les enfants des immigrants ? */
  {const tgt=clamp({libre:.22,incitation:.33,charte:.55}[O.langue5]+ef('langue')*.035+(F.selectionQc?.04:0)+(F.loi101?.04:0)-(F.loi178Annulee?.02:0),.1,.85);s.fraFrac+=(tgt-s.fraFrac)*(1-Math.pow(.9,dt));}
  /* naissances, décès, migrations, transferts linguistiques */
  {const nz=1+(Math.random()-.5)*.04,fran=s.pop-s.ang-s.allo;
   const cbr=pw(CBR5,y)*(F.allocNaiss?1.04:1)*(F.garderies?1.02:1)*(1+(s.church-pw(CHURCH5,y))*.002)*nz,cdr=pw(CDR5,y)*(1-(ef('sante')-.7)*.04)*(F.assuranceMaladie?.98:1);
   const bF=Math.round(fran*cbr*dt),bA=Math.round(s.ang*cbr*.75*dt),bO=Math.round(s.allo*cbr*1.15*dt);
   const dF=Math.round(fran*cdr*dt),dA=Math.round(s.ang*cdr*1.05*dt),dO=Math.round(s.allo*cdr*.8*dt);
   /* l'immigration internationale */
   const imm=Math.round(pw(IMM5,y)*.74*(s.eco>=45?1:.9)*(F.immigrationPlus?1.2:1)*dt);
   const frImm=clamp(.14+(F.selectionQc?.18:0)+ef('langue')*.04,.1,.55),enImm=clamp(.2-Math.max(0,y-1970)*.004,.07,.2);
   const iF=Math.round(imm*frImm),iA=Math.round(imm*enImm),iO=imm-iF-iA;
   /* les départs vers le reste du Canada : surtout des anglophones */
   const lf=k=>({libre:.9,incitation:1,charte:1.12}[k]||1);const tense=(1+(gov==='pq'?.12:0)-(histParty5(y)==='pq'?.12:0))*lf(O.langue5)/lf(histLang5(y))*(F.refSoon?1.08:1);
   const out=Math.round(-pw(INTERP5,y)*tense*(.9+Math.max(0,(s.chom-8))*.03)*dt);
   const outA=Math.round(out*clamp(.7+(O.langue5==='charte'?.1:0)+(gov==='pq'?.05:0),.3,.85)),outO=Math.round(out*.12),outF=out-outA-outO;
   const abroad=Math.round(s.pop*.0009*dt),abA=Math.round(abroad*s.ang/s.pop),abO=Math.round(abroad*s.allo/s.pop);
   /* les allophones adoptent une langue : le français ou l'anglais */
   const tr=Math.round(s.allo*.009*dt),trF=Math.round(tr*s.fraFrac),trA=tr-trF;
   const anglic=Math.round(fran*(O.langue5==='libre'?.0003:O.langue5==='incitation'?.00015:.00005)*dt);
   s.ang=Math.max(0,s.ang+bA-dA+iA-outA+trA+anglic-abA);s.allo=Math.max(0,s.allo+bO-dO+iO-outO-tr-abO);
   const nfran=fran+bF-dF+iF-outF+trF-anglic-(abroad-abA-abO);
   s.pop=Math.round(nfran+s.ang+s.allo);s.women=Math.round(s.pop*.5);
   ys.births+=bF+bA+bO;ys.deaths+=dF+dA+dO;ys.arr+=imm;ys.dep+=out+abroad;ys.emig+=out;s.out5+=out;}
  {const tgt=pw(URB5,y);s.urb+=(tgt-s.urb)*(1-Math.pow(.8,dt));}
  /* le Nord : barrages, routes, villes minières */
  {const tgt=clamp(5+9*ef('nord')+{harnacher:14,negocier:8,nation:6}[O.nord5]+(F.manic?10:0)+(F.baieJames?24:0)+(F.lg2?10:0)+(F.grandeBaleine?10:0)+Math.max(0,y-1960)*.3,0,100);s.nord+=(tgt-s.nord)*(1-Math.pow(.85,dt));}
  /* les nations du Nord réagissent : barrages sans entente, ou partenariat */
  {const st={harnacher:-1.2,negocier:.3,nation:1.1}[O.nord5];const big=F.baieJames&&!F.conventionBJ?-2.5:0;
   s.rel.cri=clamp(s.rel.cri+(st+big+(F.paixBraves?1:0))*dt,-100,100);s.rel.inuit=clamp(s.rel.inuit+(st*.8+(F.conventionBJ?.4:0)+big*.4)*dt,-100,100);
   s.rel.agnier=clamp(s.rel.agnier+((O.nord5==='nation'?.4:0)-(F.oka&&y<1995?.8:0))*dt,-100,100);
   s.rel.innu=clamp(s.rel.innu+(st*.6)*dt,-100,100);}
  /* le trésor : impôts, transferts fédéraux, Hydro */
  const rev=Math.round(s.pop*revRate5(y)*(.82+s.eco/280)*(.95+gE('fav')*.05)*(s.autonomy>=55?1.03:1)*(F.hydro2?1.03:1)*dt);
  s.treasury+=rev;s.revT=Math.round(rev/dt);
  /* l'appui électoral : il se calcule plus bas, groupe par groupe (polity.js) */
  if(F.scandale){polGfx(s,{technocrates:-5,ouvriers:-5,precaires:-4,quebecinc:-4,capital:-3,anglos:-3,allos:-3});F.scandale=false;}
  /* la radicalisation : le FLQ se nourrit du blocage */
  s.flq=clamp((s.flq||0)+((s.patri>32?1:-.5)*(F.pq?.5:1)+(y>=1963&&y<1971?1.2:-1)+(clsG(s,'ouvriers')>58?.8:0))*dt,0,100);
  /* les officiers */
  for(const k of ['gov','eve','mar']){const o=officer5(s,k);let al=0;
    for(const kk in o.like){const w=o.like[kk];if(typeof w==='number')al+=w*((s.budget[kk]||0)-20)/20;else al+=O[kk]===w?1:-.6;}
    s.off[k]=clamp(s.off[k]+clamp(al*3,-6,6)*dt-s.off[k]*.06*dt,-100,100);}
  if(O.ottawa5==='souverainete')s.off.gov=clamp(s.off.gov-2.5*dt,-100,100);
  classTick(s,dt);if(typeof acadTick==='function')acadTick(s,dt);
  polTick(s,dt);s.fed=clamp(100-s.souv-(s.patri-30)*.3,0,100);
  /* les traits */
  {const TG={
    ferveur:6+s.church*.85,
    alliance:22+['innu','alg','agnier','cri','inuit'].map(k=>Math.max(-20,s.rel[k]||0)).reduce((x,z)=>x+z,0)/5*.4+(F.reconnaissance85?6:0)+(F.paixBraves?6:0)-(F.oka?4:0),
    aventure:supT(s,'aventure')+25+(s.edu-30)*.4+(F.expo67?6:0)+(F.libreEchange?3:0),
    roi:supT(s,'roi')+62-s.souv*.45+{federalisme:5,autonomie:0,souverainete:-5}[O.ottawa5],
    entraide:supT(s,'entraide')+44+s.etat*.18+(O.travail5==='social'?4:0)-(O.etat5==='liberal'?5:0)+(F.frontCommun?3:0),
    ouverture:supT(s,'ouverture')+22+s.edu*.25+(F.expo67?5:0)+(F.chartesDroits?4:0)+(O.langue5==='charte'?-2:0)+(F.interculturel?4:0)};
   const r=1-Math.pow(.93,dt);for(const k in TG)s.traits[k]=clamp(s.traits[k]+(clamp(TG[k],0,100)-s.traits[k])*r,0,100);}
  /* les lieux qui naissent */
  if(y>=1966)s.places.matagami=true;if(y>=1974&&s.nord>25)s.places.fermont=true;if(F.baieJames)s.places.radisson=true;if(y>=1983)s.places.schefferville=false;
  if(y>=1965)s.places.laval5=true;if(y>=1975)s.places.gatineau5=true;
  for(let i=0;i<dt;i++)relDrift(s);
  for(const k of ['church','autonomy','eco','edu','patri','support','foreign','etat','souv','nord'])s[k]=clamp(s[k],0,100);
  s.pop=Math.max(0,Math.round(s.pop));s.furs=Math.round(s.eco);ys.furs=s.furs;
}
function enterYear5(s){
  setEnvFor(s);
  for(let yy=s.year;yy<s.year+(turnLen5(s)||1);yy++){const keep=s.year;s.year=yy;deliverWorld(s);s.year=keep;}
  for(const k in s.raided){s.raided[k]--;if(s.raided[k]<=0)delete s.raided[k];}
  for(const k of ['gov','eve','mar']){const o=officer5(s,k);if(o.name!==s.offName[k]){s.offName[k]=o.name;
    s.off[k]=Math.round(s.off[k]*.3);logIt(s,{fr:`${OFF_LAB5[k].fr} : ${o.name}.`,en:`${OFF_LAB5[k].en}: ${o.name}.`},'good');if(s===S&&!window.CALIB)toast({fr:`${OFF_LAB5[k].fr} : ${o.name}.`,en:`${OFF_LAB5[k].en}: ${o.name}.`},'gov',GOV_IMG[o.name]||null);}}
  {const p=premier5(s);if(p.name!==s.premier){s.premier=p.name;const tx={fr:`Premier ministre : ${p.name} (${p.party.fr}).`,en:`Premier: ${p.name} (${p.party.en}).`};logIt(s,tx,'good');if(s===S&&!window.CALIB)toast(tx,'gov',GOV_IMG[p.name]||null);}}
  s.govName=s.premier;s.war=null;s.flags.crise=false;s.eng=Math.round(pw([[1960,179.3e6],[1970,203.2e6],[1980,226.5e6],[1990,248.7e6],[2000,281.4e6]],s.year));s.us=s.eng;
  s.turn=turnLen5(s);
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0,emig:0,deaths:0};
  if(ELECT5.includes(s.year)&&s.lastElec!==s.year&&!s.ending)s.pending.push('E:elec5');
  /* les référendums : promis par le gouvernement, ou demandés par vous (onglet Ordres) */
  if(!s.ending&&s.flags.oui&&!s.flags.negoDone&&!s.pending.includes('V:nego'))s.pending.push('V:nego');
  let histN=0;
  for(const e of EVENTS){if(e.period!==5||e.sys||s.fired[e.id])continue;if(histN>=2&&!e.must){const nom=+((e.id.match(/\d{4}/)||[0])[0]);if(!(nom&&s.year-nom>=2))continue;}
    let ok=false;try{ok=e.cond(s);}catch(err){}if(!ok)continue;s.fired[e.id]=true;
    const p=LIKELY[e.id]?clamp(LIKELY[e.id](s),0,1):1;
    if(Math.random()<p){s.pending.push(e.id);histN++;}else diverge(s,e,p);}
  queueReview(s);
  if(!s.ending&&!s.pending.includes('V:ref')&&refAllowed5(s)&&(s.flags.refAsk||refHistDue5(s))){s.flags.refAsk=false;s.pending.push('V:ref');}
  if(!s.ending){
    const elig=EVENTS.filter(e=>{if(e.period!==5||!e.sys)return false;if((s.sysCount[e.id]||0)>=(e.max||2))return false;
      if((s.year-(s.sysLast[e.id]??-99))<e.cool)return false;try{return e.cond(s);}catch(err){return false;}});
    if(s.pending.length<3&&elig.length&&Math.random()<(s.pending.length?.35:.55)){const wt=e=>{let w=1;try{w=e.w?e.w(s):(e.conseq?3:1);}catch(err){}return Math.max(0,w);};
      const tot=elig.reduce((a,e)=>a+wt(e),0);let r=Math.random()*tot,e=elig[0];for(const x of elig){r-=wt(x);if(r<=0){e=x;break;}}
      s.sysLast[e.id]=s.year;s.sysCount[e.id]=(s.sysCount[e.id]||0)+1;s.pending.push(e.id);}
  }
}
function advance5(){
  if(S.pending.length||S.ending)return;
  S.prev=snap(S);const y0=S.year,dt=S.turn||1;
  processYear5(S);
  if(window.CALIB&&!window.CALIB_REL){S.yearOut=[];S.yearImg=null;S.yearWorld=[];}
  if(!window.CALIB||window.CALIB_REL){writeNews5(S,dt>1?`${y0}–${y0+dt-1}`:y0);if(!window.CALIB){const busy=S.chron[0]&&S.chron[0].dec&&S.chron[0].dec.length;if(readRel&&!busy)relOpen=0;else toast({fr:`${newsName5(y0).fr} : l'édition de ${y0} est parue.`,en:`${newsName5(y0).en}: the ${y0} edition is out.`},'relation',null,'relation');}}
  S.year+=dt;
  if(!S.ending&&S.year>2000){S.year=2000;S.ending=endingFor5(S);}
  if(!S.ending)enterYear5(S);
  S.popHist.push([S.year,S.pop]);
  if(!window.CALIB){save();render(true);}
}
/* l'an 2000 : si rien n'a tranché, l'état du Québec décide */
function frShare5(s){return (s.pop-s.ang-s.allo)/s.pop;}
function endingFor5(s){const f=frShare5(s),F=s.flags;
  if(F.independance)return 'independance';if(F.rupture)return 'rupture';
  if(F.societeDistincte||F.statutParticulier||F.confederation)return 'statut';
  if(f<.76)return 'minorite';
  if(s.souv>=38||(s.refs||[]).some(r=>r.yes>=40))return 'ajournee';
  return 'province';}

/* ---------- les élections ---------- */
function electionEvent5(s){
  const p=premier5(s),rv=rival5(s),o=opposition5(s),gov=govParty5(s),sup=Math.round(s.support);const F=fr();
  const hw=HISTWIN5[s.year];const hp=hw?leader5({year:s.year+1},hw):null;
  const pr=polVote(s,parties5(s));const pk=Object.keys(pr.v).sort((a,b)=>pr.v[b]-pr.v[a]);
  const pollTxt={fr:'Sondages : '+pk.map(k=>`${polPartyLab(s,k).fr} ${Math.round(pr.v[k]*100)} %`).join(', ')+'.',en:'Polls: '+pk.map(k=>`${polPartyLab(s,k).en} ${Math.round(pr.v[k]*100)}%`).join(', ')+'.'};
  const lead=(pr.v[gov]||0)-Math.max(...pk.filter(k=>k!==gov).map(k=>pr.v[k]));
  const mood=lead>.08?R("Les sondages sont bons.","The polls look good."):lead>-.03?R("La lutte sera serrée.","It will be a close race."):R("L'opposition mène dans les sondages.","The opposition leads in the polls.");
  /* le vote se fait groupe par groupe : intérêts, jugement sur le gouvernement, question nationale ; l'histoire ne pèse plus qu'un peu (±3) */
  const res=(s2,bonus,gb)=>{const fat=POL[5].fatigue(s2);const g0=govParty5(s2);
    const tide={};if(hw)tide[hw]=3;const bon=Object.assign({},tide);bon[g0]=(bon[g0]||0)+bonus*.5;
    const r=polVote(s2,parties5(s2),{bonus:bon,gbonus:gb||{},fatigue:fat,noise:3});s2.lastVote=r;s2.lastVote.y=s2.year;
    const T=s2.year<1966?95:s2.year<1973?108:s2.year<1981?110:s2.year<1989?122:125;
    const ks=Object.keys(r.seats).sort((a,b)=>r.seats[b]-r.seats[a]);const seatN={};let left=T;ks.forEach((k,i)=>{seatN[k]=i===ks.length-1?left:Math.round(r.seats[k]*T);left-=seatN[k];});
    const winner=ks[0];s2.lastElec=s2.year;const out=[];
    const pct=k=>`${L(polPartyLab(s2,k))} ${Math.round((r.v[k]||0)*100)} % (${seatN[k]} ${fr()?'sièges':'seats'})`;
    const line=ks.map(pct).join(' · ');
    if(winner===g0){const seats=seatN[g0];s2.mandat=clamp(.8+seats/T*.45,.8,1.2);
      out.push(F?`${premier5(s2).name} est reporté au pouvoir : ${seats>T*.7?'un balayage':'une majorité'}. ${line}.`:`${premier5(s2).name} is returned to power: ${seats>T*.7?'a sweep':'a majority'}. ${line}.`);}
    else{const loser=premier5(s2).name;changeGov5(s2,winner);const np=premier5(s2);
      out.push(F?`Défaite de ${loser}. ${line}. ${np.name} (${np.party.fr}) forme le gouvernement, avec son programme : vous gouvernez désormais par lui.`:`Defeat for ${loser}. ${line}. ${np.name} (${np.party.en}) forms the government, with its own program: you now govern through him.`);}
    if((r.v[winner]||0)<Math.max(...Object.values(r.v))-.001)out.push(F?"Le parti qui a le plus de voix n'a pas le plus de sièges : le vote des anglophones et des allophones s'entasse dans quelques circonscriptions.":"The party with the most votes doesn't have the most seats: anglophone and allophone votes are packed into a few ridings.");
    out.push(polVoteStory(s2,r));
    if(hw&&govParty5(s2)!==hw&&s2===S){S.divergences=S.divergences||[];S.divergences.push({y:s2.year,id:'elec'+s2.year,title:R(`Les élections de ${s2.year}`,`The ${s2.year} election`),
      text:{fr:`Élections de ${s2.year} : ${premier5(s2).name} gouverne. Dans l'histoire, c'est ${hp.name} qui l'emporte.`,en:`${s2.year} election: ${premier5(s2).name} governs. In history, ${hp.name} won.`}});}
    return {fr:out.join(' '),en:out.join(' ')};};
  const histLine=hw?(F?` Dans l'histoire, ${hp.name} (${PARTIES5[hw].short.fr}) gagne cette élection.`:` In history, ${hp.name} (${PARTIES5[hw].short.en}) wins this election.`):'';
  const ch=[
    {label:R("Le bilan : écoles, hôpitaux, routes","The record: schools, hospitals, roads"),desc:R("Parle à la classe moyenne et aux régions.","Speaks to the middle class and the regions."),fx:s2=>res(s2,2+Math.min(3,Math.max(0,(s2.eco-48)*.12)),{technocrates:{[govParty5(s2)]:2},precaires:{[govParty5(s2)]:2}})},
    {label:R("L'économie d'abord : « 100 000 emplois »","The economy first: '100,000 jobs'"),desc:R("Rassure les salariés et les gens d'affaires ; coûte cher.","Reassures wage earners and business; costly."),fx:s2=>{s2.treasury=Math.round(s2.treasury*.9);const g=govParty5(s2);return res(s2,s2.chom>9?4:2,{ouvriers:{[g]:2},quebecinc:{[g]:3},capital:{[g]:2}});}},
    {label:R('La nation : « Maîtres chez nous »','The nation: “Masters in our own house”'),desc:R("Mobilise les nationalistes ; effraie les anglophones, les allophones et le capital.","Mobilizes nationalists; frightens anglophones, allophones and capital."),fx:s2=>{s2.patri+=3;s2.off.gov-=6;const g=govParty5(s2);return res(s2,(s2.patri>=40?3:-2),{technocrates:{[g]:4},ouvriers:{[g]:2},anglos:{[g]:-6},allos:{[g]:-5},capital:{[g]:-4}});}}];
  if(gov==='pq')ch.push({label:R("Promettre de ne pas tenir de référendum ce mandat-ci","Promise no referendum this term"),desc:R("Rassure les fédéralistes mous ; déçoit les militants.","Reassures soft federalists; disappoints activists."),fx:s2=>{s2.flags.noRefPromise=s2.year;return res(s2,2,{quebecinc:{pq:4},ouvriers:{pq:3},precaires:{pq:3},allos:{pq:2},technocrates:{pq:-1}});}});
  else ch.push({label:R("La peur : « Le séparatisme vous coûtera cher »","Fear: 'Separatism will cost you'"),desc:R("Soude les anglophones, les allophones et les inquiets ; braque les nationalistes.","Rallies anglophones, allophones and the anxious; antagonizes nationalists."),fx:s2=>{s2.patri-=1;const g=govParty5(s2);return res(s2,1,{anglos:{[g]:4},allos:{[g]:4},precaires:{[g]:3},quebecinc:{[g]:2},technocrates:{[g]:-3}});}});
  return {id:'E:elec5',routine:true,elec:true,place:'quebec',title:R(`Les élections de ${s.year}`,`The ${s.year} election`),
   text:{fr:`${p.name} (${p.party.fr}) sollicite un mandat contre ${o.name} (${o.party.fr}). ${pollTxt.fr} ${mood.fr} Si vous perdez, c'est ${o.name} qui gouvernera, avec son programme. Sur quoi faire campagne ?${histLine}`,
         en:`${p.name} (${p.party.en}) seeks a mandate against ${o.name} (${o.party.en}). ${pollTxt.en} ${mood.en} If you lose, ${o.name} will govern, with his own program. What should the campaign be about?${histLine}`},choices:ch};
}

/* ---------- les référendums ---------- */
function refAllowed5(s){return s.year-(s.lastRef||0)>=5&&!ELECT5.includes(s.year)&&!s.flags.oui&&s.year<=2000;}
/* dans l'histoire : le PQ tient son référendum promis, en 1980 puis en 1995 */
function refHistDue5(s){const g=govParty5(s);if(g!=='pq'||s.flags.noRefPromise===s.lastElec)return false;
  return (s.year>=1980&&s.year<1984&&!(s.refs||[]).length)||(s.year>=1995&&s.year<1998&&!(s.refs||[]).some(r=>r.y>=1990));}
/* le Oui chez les francophones, puis dans tout l'électorat */
/* le Oui : la somme, groupe par groupe, des positions sur la question nationale ; la question et la campagne jouent surtout chez les francophones « mous » */
function refYes5(s,q,camp,noNoise){if(!s.pol||!s.pol.g||!s.pol.g.ouvriers){const f=frShare5(s),a=s.ang/s.pop,o=s.allo/s.pop;
    const yF=clamp(s.souv+q+camp+(noNoise?0:(Math.random()-.5)*5),3,97);const yO=clamp(4+s.fraFrac*14+(s.souv-45)*.12,1,40);return Math.round((f*yF+a*3+o*yO)*10)/10;}
  const nz=noNoise?0:(Math.random()-.5)*5;let y=0,w=0;
  for(const g of polGroups(s)){const st=s.pol.g[g.id];if(!st)continue;const soft=g.lang==='fr'?1:.25;y+=st.share*clamp(st.nat+(q+camp+nz)*soft,1,97);w+=st.share;}
  return Math.round(y/Math.max(1e-9,w)*10)/10;}
const REFQ5={
 mandat:{l:R("Un mandat de négocier la souveraineté-association","A mandate to negotiate sovereignty-association"),b:3,d:R("Rien ne changera sans un second référendum : la question rassure.","Nothing will change without a second referendum: the question reassures.")},
 partenariat:{l:R("La souveraineté, avec une offre de partenariat au Canada","Sovereignty, with an offer of partnership to Canada"),b:1,d:R("Si le Canada refuse de négocier, l'Assemblée pourra proclamer la souveraineté.","If Canada refuses to negotiate, the Assembly may proclaim sovereignty.")},
 independance:{l:R("L'indépendance, sans détour","Independence, plain and simple"),b:-6,d:R("Une question claire, que personne ne pourra contester… mais qui fait peur.","A clear question no one can dispute… but a frightening one.")},
 confederation:{l:R("Une nouvelle entente : une confédération d'États égaux","A new deal: a confederation of equal states"),b:6,d:R("Le Québec et le Canada, deux États associés. Populaire, mais Ottawa n'est pas tenu de dire oui.","Quebec and Canada, two associated states. Popular, but Ottawa is not bound to say yes.")}};
function refEvent5(s){const F=fr(),y=s.year;const P=premier5(s);
  const histQ=y<1990?'mandat':'partenariat';
  const camp=()=>{let c=0;const fedPM=officer5(s,'gov').name;if(/Trudeau/.test(fedPM))c-=3;if(/Chrétien/.test(fedPM))c-=1;if(s.flags.bouchard||P.sn==='Bouchard')c+=3;
    c+=clamp((s.rel.cri+s.rel.inuit)/2,-40,40)*.03;c-=Math.max(0,s.dette-40)*.08;return c;};
  const ch=Object.keys(REFQ5).map(k=>({label:REFQ5[k].l,desc:REFQ5[k].d,hist:k===histQ,fx:s2=>{
    const yes=refYes5(s2,REFQ5[k].b,camp());s2.lastRef=s2.year;s2.refs=s2.refs||[];s2.refs.push({y:s2.year,q:k,yes});s2.flags.refSoon=false;
    const win=yes>50;const tx=[];
    if(win){s2.flags.oui=true;s2.flags.ouiQ=k;s2.flags.ouiY=s2.year;s2.flags.ouiPct=yes;s2.patri+=4;s2.support+=6;
      tx.push(F?`Le Oui l'emporte : ${String(yes).replace('.',',')} %. La nuit est longue à Montréal ; à Ottawa, le Cabinet se réunit d'urgence. Il faut maintenant négocier.`:`Yes wins: ${yes}%. A long night in Montreal; in Ottawa, the Cabinet meets in emergency session. Now comes the negotiation.`);
      if(s2===S){S.divergences=S.divergences||[];S.divergences.push({y:s2.year,id:'ref'+s2.year,title:R('Le référendum','The referendum'),text:{fr:`Référendum de ${s2.year} : le Oui gagne (${yes} %). Dans l'histoire, le Non l'emporte en 1980 (59,6 %) et en 1995 (50,6 %).`,en:`${s2.year} referendum: Yes wins (${yes}%). In history, No won in 1980 (59.6%) and 1995 (50.6%).`}});}}
    else{s2.souv=Math.max(0,s2.souv-(yes>45?3:7));s2.support-=yes>45?2:6;s2.off.gov+=8;
      tx.push(F?`Le Non l'emporte : le Oui obtient ${String(yes).replace('.',',')} %. ${yes>=48?"« On a été battus, au fond, par quoi ? Par l'argent et des votes ethniques… » La blessure est profonde, et le pays, divisé en deux moitiés.":yes>=40?"« Si je vous ai bien compris, vous êtes en train de me dire : à la prochaine fois. »":"La défaite est nette ; la souveraineté s'éloigne pour une génération."}`:`No wins: Yes takes ${yes}%. ${yes>=48?"The wound is deep, and the country split down the middle.":yes>=40?"'If I understand you correctly, you're saying: until next time.'":"A clear defeat; sovereignty recedes for a generation."}`);}
    return {fr:tx.join(' '),en:tx.join(' ')};}}));
  ch.push({label:R("Reporter : les conditions gagnantes ne sont pas réunies","Postpone: the winning conditions aren't there"),desc:R("Rien ne se passe ; on attendra.","Nothing happens; we'll wait."),fx:s2=>{s2.lastRef=s2.year-3;s2.support-=1;s2.souv-=1;return R("Le référendum attendra. Les militants rongent leur frein.","The referendum will wait. The activists chafe.");}});
  const poll=Math.round(refYes5(s,0,0,true));
  return {id:'V:ref',routine:true,vote:'ref',place:'quebec',title:R(`Le référendum de ${y}`,`The ${y} referendum`),
   text:{fr:`${P.name} annonce un référendum. Chez les francophones, l'appui à la souveraineté tourne autour de ${Math.round(s.souv)} % ; dans l'ensemble, les sondages donnent environ ${poll} % au Oui. Les anglophones et la plupart des allophones voteront Non ; les Cris et les Inuit tiendront leur propre consultation. Quelle question poser ?`,
         en:`${P.name} announces a referendum. Among francophones, support for sovereignty hovers around ${Math.round(s.souv)}%; overall, polls give Yes about ${poll}%. Anglophones and most allophones will vote No; the Cree and Inuit will hold their own consultation. What question should be asked?`},choices:ch};
}
/* après un Oui : la négociation, ou la rupture */
function negoP5(s){const m=(s.flags.ouiPct||50)-50;const P=s.pol||{cen:{op:50},cap:50};return clamp(.3+m*.03+(s.off.gov||0)/250+(P.cen.op-50)*.006+(P.cap-40)*.004-(P.cen.strat==='planB'?.08:0)+(s.eco-50)*.008+((s.rel.cri||0)+(s.rel.inuit||0))/500+(s.flags.franceAppui?.12:0)-Math.max(0,s.dette-40)*.006-(1-frShare5(s)-.18)*.8,.05,.9);}
function negoEvent5(s){const F=fr(),q=s.flags.ouiQ||'partenariat',p=negoP5(s);
  const pct=Math.round(p*100);
  const finish=(s2,how,txt)=>{s2.flags.negoDone=true;if(how==='independance')s2.flags.independance=true;if(how==='rupture')s2.flags.rupture=true;if(how==='statut')s2.flags.confederation=true;
    if(how!=='non'){s2.ending=how;}return txt;};
  const ch=[];
  if(q==='confederation')ch.push({label:R("Négocier la confédération avec Ottawa et les provinces","Negotiate the confederation with Ottawa and the provinces"),hist:false,fx:s2=>Math.random()<p+.1?finish(s2,'statut',R("Après dix-huit mois de pourparlers, une nouvelle constitution fait du Québec un État associé au Canada : sa langue, sa culture, ses impôts, sa place à l'international.","After eighteen months of talks, a new constitution makes Quebec a state associated with Canada: its language, its culture, its taxes, its place in the world.")):(s2.flags.negoFail=true,s2.patri+=6,s2.souv+=8,finish(s2,'non',R("Ottawa et les provinces refusent. Le Québec a dit oui à une entente qui n'existe pas ; la colère monte.","Ottawa and the provinces refuse. Quebec has said yes to a deal that does not exist; anger rises."))) });
  else ch.push({label:R("Négocier la séparation et le partenariat","Negotiate separation and partnership"),fx:s2=>Math.random()<p?finish(s2,'independance',R("Après un an de négociations, un traité règle la dette, la monnaie, les frontières et la circulation des personnes. Le Québec devient un pays ; la France le reconnaît la première.","After a year of negotiations, a treaty settles debt, currency, borders and free movement. Quebec becomes a country; France is the first to recognize it.")):(s2.flags.negoFail=true,finish(s2,'non',R("Ottawa refuse de négocier tant que la question n'est pas « claire ». Les marchés s'affolent, les Cris réclament de rester au Canada avec leur territoire.","Ottawa refuses to negotiate as long as the question is not 'clear'. Markets panic; the Cree demand to stay in Canada with their territory.")))});
  ch.push({label:R("Proclamer la souveraineté sans attendre","Proclaim sovereignty without waiting"),fx:s2=>Math.random()<p*.8?finish(s2,'independance',R("L'Assemblée nationale proclame la souveraineté. Après des mois de tension, la France, puis les États-Unis, reconnaissent le nouvel État.","The National Assembly proclaims sovereignty. After months of tension, France, then the United States, recognize the new state.")):finish(s2,'rupture',R("La déclaration unilatérale est votée. Ottawa ne la reconnaît pas ; les Cris, les Inuit et l'Ouest de Montréal réclament la partition. Le Québec est indépendant de fait, mais seul, et divisé.","The unilateral declaration is passed. Ottawa does not recognize it; the Cree, the Inuit and Montreal's West Island demand partition. Quebec is independent in fact, but alone, and divided."))});
  ch.push({label:R("Accepter l'offre de dernière heure d'Ottawa : un statut particulier","Accept Ottawa's last-minute offer: special status"),fx:s2=>{s2.flags.statutParticulier=true;s2.souv-=10;return finish(s2,'statut',R("Ottawa promet tout : société distincte, droit de veto, pouvoirs en immigration et en culture. Le Québec reste, à ses conditions.","Ottawa promises everything: distinct society, a veto, powers over immigration and culture. Quebec stays, on its own terms."));}});
  return {id:'V:nego',routine:true,vote:'nego',place:'quebec',title:R('Le lendemain du Oui','The day after Yes'),
   text:{fr:`Le Oui l'a emporté avec ${String(s.flags.ouiPct).replace('.',',')} %. Ottawa hésite, les marchés tremblent, Washington se tait, Paris laisse entendre qu'il reconnaîtra le résultat. Les chances d'une négociation réussie sont d'environ ${pct} % (elles dépendent de la marge, de l'économie, de l'humeur du Canada anglais, de la fuite des capitaux, de vos relations avec Ottawa et avec les nations du Nord).`,
         en:`Yes won with ${s.flags.ouiPct}%. Ottawa hesitates, markets tremble, Washington stays silent, Paris hints it will recognize the result. The chances of a successful negotiation are about ${pct}% (they depend on the margin, the economy, English Canada's mood, capital flight, your relations with Ottawa and with the northern nations).`},choices:ch};
}

/* ---------- la presse : Le Devoir, puis le Téléjournal ---------- */
function newsName5(y){y=parseInt(y);return y<1980?R('Le Devoir','Le Devoir'):y<1990?R('La Presse','La Presse'):R('Le Téléjournal','Le Téléjournal');}
function writeNews5(s,y){
  const yn=parseInt(y),ys=s.ys,items=[];const N=n=>nf(n,'fr'),NE=n=>nf(n,'en');
  const add=(h,f,e)=>items.push({h,fr:f,en:e});
  for(const x of (s.yearOut||[]).filter(x=>L(x.r)).slice(0,3))add(x.t,x.r.fr,x.r.en);
  const f=frShare5(s);
  add(R('La population','Population'),`Le Québec compte ${N(s.pop)} habitants : ${Math.round(f*100)} % de langue maternelle française, ${Math.round(s.ang/s.pop*100)} % anglaise, ${Math.round(s.allo/s.pop*100)} % d'autres langues.`,`Quebec has ${NE(s.pop)} people: ${Math.round(f*100)}% French mother tongue, ${Math.round(s.ang/s.pop*100)}% English, ${Math.round(s.allo/s.pop*100)}% other languages.`);
  if(s.chom>=10)add(R("L'emploi","Jobs"),`Le chômage atteint ${String(s.chom.toFixed(1)).replace('.',',')} %. Les régions se vident vers Montréal.`,`Unemployment reaches ${s.chom.toFixed(1)}%. The regions empty out towards Montreal.`);
  if(ys.emig>15000)add(R('Les départs','Departures'),`${N(ys.emig)} personnes sont parties pour l'Ontario et l'Ouest, surtout des anglophones.`,`${NE(ys.emig)} people left for Ontario and the West, mostly anglophones.`);
  if(s.cls&&clsG(s,'ouvriers')>=58)add(R('Les syndicats','The unions'),"Grèves dans les hôpitaux, les écoles, la fonction publique : le Front commun hausse le ton.","Strikes in hospitals, schools, the civil service: the Common Front raises its voice.");
  if(s.souv>=45)add(R('Le sondage','The poll'),`${Math.round(s.souv)} % des francophones se disent favorables à la souveraineté.`,`${Math.round(s.souv)}% of francophones say they favour sovereignty.`);
  const wl=(s.yearWorld||[]).map(i=>WORLD[i]).filter(Boolean);for(const w of wl.slice(0,2))add(w.t,w.x.fr,w.x.en);
  s.chron=s.chron||[];
  s.chron.unshift({y,p3:true,p4:true,p5:true,gaz:newsName5(y),items,fr:items.map(i=>i.fr).join(' '),en:items.map(i=>i.en).join(' '),pop:s.pop,ang:s.ang,allo:s.allo,emig:ys.emig,arr:ys.arr,births:ys.births,deaths:ys.deaths,chom:s.chom,souv:s.souv,hist:Math.round(histPop(yn+.99)),gov:s.premier,img:s.yearImg||'relations',world:(s.yearWorld||[]).slice()});
  s.yearImg=null;s.yearOut=[];s.yearWorld=[];if(s.chron.length>60)s.chron.length=60;
}

/* ---------- repères de population (recensements du Québec) ---------- */
HIST_POP.push([1966,5780845],[1971,6027764],[1976,6234445],[1981,6438403],[1986,6532461],[1991,6895963],[1996,7138795],[2001,7237479]);
HIST_SOURCES.push(...[[1966,5780845],[1971,6027764],[1976,6234445],[1981,6438403],[1986,6532461],[1991,6895963],[1996,7138795],[2001,7237479]].map(([y,v])=>({y,v,src:'Recensements du Canada (Statistique Canada)'})));
HIST_POP.sort((a,b)=>a[0]-b[0]);
/* langue maternelle, en % (recensements) : français / anglais / autres */
const HIST_LANG5=[[1961,81.2,13.3,5.5],[1971,80.7,13.1,6.2],[1981,82.4,11.0,6.6],[1991,82.0,9.6,8.4],[2001,81.4,8.3,10.3]];

/* ---------- la carte : le Nord, les barrages, les routes, les communautés ---------- */
const ROADS5=[{y:1974,f:'baieJames',pts:[[-77.63,49.75],[-77.6,51.0],[-77.7,52.3],[-77.62,53.79]]},{y:1987,pts:[[-68.15,49.22],[-68.6,50.5],[-67.8,51.6],[-67.09,52.79]]},{y:1960,pts:[[-66.38,50.21],[-66.5,51.2],[-66.8,52.4],[-66.83,54.8]],rail:true}];
const RESERV5=[{f:'manic',y:1968,ll:[-68.7,51.4],rx:16,ry:16},{f:'baieJames',y:1979,ll:[-77.0,53.6],rx:26,ry:9},{f:'baieJames',y:1982,ll:[-75.6,53.65],rx:20,ry:10},{f:'baieJames',y:1984,ll:[-72.6,53.95],rx:24,ry:12},{f:'baieJames',y:1984,ll:[-71.0,54.4],rx:22,ry:14},{f:'grandeBaleine',y:1994,ll:[-76.0,55.2],rx:18,ry:7}];
function p5Layer(k){
  const y=S.year,F=lang==='fr',fl=S.flags;let h='';
  const lab=(ll,txt,sz,cls,anchor)=>{const[x,yy]=P(ll[0],ll[1]);return `<text class="${cls||'nsub'}" x="${x}" y="${yy}" font-size="${sz*k}" text-anchor="${anchor||'middle'}">${txt}</text>`;};
  for(const r of RESERV5){if(y<r.y||(r.f&&!fl[r.f]))continue;const[x,yy]=P(r.ll[0],r.ll[1]);h+=`<ellipse class="reserv5" cx="${x}" cy="${yy}" rx="${r.rx*k*2.4}" ry="${r.ry*k*2.4}"/>`;}
  for(const r of ROADS5){if(y<r.y||(r.f&&!fl[r.f]))continue;h+=r.rail?`<path d="${lineD(r.pts)}" class="rail4" stroke-width="${1.6*k}"/><path d="${lineD(r.pts)}" class="rail4t" stroke-width="${3.6*k}" stroke-dasharray="${.8*k} ${4*k}"/>`:`<path d="${lineD(r.pts)}" class="road5" stroke-width="${1.8*k}"/>`;}
  for(const d of DAMS5){if(y<d.y||(d.f&&!fl[d.f]))continue;const[x,yy]=P(d.ll[0],d.ll[1]);h+=`<g class="dam4" transform="translate(${x},${yy}) scale(${k*1.2})"><path d="M-5,3 L0,-5 L5,3Z"/><path d="M-3,1 h6" class="z"/></g>`;if(curK<.9)h+=lab([d.ll[0]+.25,d.ll[1]-.15],d.n,8,'nsub','start');}
  for(const c of COMM5){if(c.from&&y<c.from)continue;const[x,yy]=P(c.ll[0],c.ll[1]);const g=S.rel[c.g];const tone=g==null?'partner':g<=-40?'foe':g<=-10?'wary':g<30?'partner':'friend';
    h+=`<circle class="comm5 ${tone}" cx="${x}" cy="${yy}" r="${2.6*k}"/>`;if(curK<.7)h+=lab([c.ll[0]+(c.a==='end'?-.2:.2),c.ll[1]-.1],c.n,7.5,'nsub',c.a==='end'?'end':'start');}
  if(curK>.45){h+=lab([-76.0,52.2],F?'Eeyou Istchee — Baie-James':'Eeyou Istchee — James Bay',10,'nsub');h+=lab([-72.5,59.4],'Nunavik',12,'prov3');
    if(fl.independance||fl.rupture)h+=lab([-72.6,48.6],F?'République du Québec':'Republic of Quebec',13,'prov3');}
  return h;}
