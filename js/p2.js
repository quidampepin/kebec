/* Kebec — Période II (1663–1760) : le Régime royal.
   Données (officiers, guerres, repères), état de départ (historique ou hérité), simulation annuelle. */

/* ---------- les trois têtes de la colonie ---------- */
/* like : ce que l'officier aime voir dans le budget (parts) et les orientations ; mod : ses effets ; feud : avec qui il se querelle */
const OFFICERS={
 gov:[
  {from:1663,name:'Augustin de Saffray de Mézy',trait:R("Soldat dévot, il se brouille vite avec l'évêque qui l'a choisi.","A devout soldier, he soon quarrels with the bishop who chose him."),like:{def:1},feud:['eve'],mod:{def:1.1}},
  {from:1665,name:'Daniel de Rémy de Courcelle',trait:R("Militaire énergique, il veut frapper les Agniers chez eux.","An energetic soldier, he wants to strike the Mohawk at home."),like:{def:1,all:'armee'},mod:{def:1.25}},
  {from:1672,name:'Louis de Buade de Frontenac',trait:R("Fier, dépensier, ami de la traite et des alliés ; ennemi des jésuites et des intendants.","Proud, a spender, a friend of the trade and the allies; an enemy of Jesuits and intendants."),like:{traite:1,pres:.6,eco:'traite',brandy:'toleree'},feud:['int','eve'],mod:{rel:1.3,def:1.1}},
  {from:1682,name:'Joseph-Antoine Le Febvre de La Barre',trait:R("Vieux marin qui fait de la traite pour son compte. Sa campagne de 1684 tourne à l'humiliation.","An old sailor who trades for his own account. His 1684 campaign ends in humiliation."),like:{traite:1},mod:{tre:.88,def:.85}},
  {from:1685,name:'Jacques-René de Brisay de Denonville',trait:R("Pieux et méthodique : il veut des forts, des paroisses, et la guerre aux Tsonnontouans.","Pious and methodical: he wants forts, parishes, and war on the Seneca."),like:{def:1,miss:.5,all:'armee',brandy:'interdite'},mod:{def:1.25}},
  {from:1689,name:'Louis de Buade de Frontenac',trait:R("Rappelé à 70 ans pour la guerre : raids sur la Nouvelle-Angleterre et « bouche de mes canons ».","Recalled at seventy for the war: raids on New England and 'the mouths of my cannon'."),like:{def:1,pres:.6,traite:.6,brandy:'toleree'},feud:['int','eve'],mod:{rel:1.3,def:1.25}},
  {from:1698,name:'Louis-Hector de Callière',trait:R("Diplomate patient : c'est lui qui réunit les nations à Montréal.","A patient diplomat: he is the one who gathers the nations at Montréal."),like:{pres:1,all:'mediation'},mod:{rel:1.45}},
  {from:1703,name:'Philippe de Rigaud de Vaudreuil',trait:R("Vingt-deux ans en poste : prudent, bien marié au pays, adepte de la petite guerre.","Twenty-two years in office: cautious, married into the country, a believer in the 'petite guerre'."),like:{def:.8,pres:.8},mod:{rel:1.15,def:1.15}},
  {from:1726,name:'Charles de Beauharnois de La Boische',trait:R("Il pousse vers l'Ouest : postes, La Vérendrye, et une guerre longue contre les Renards.","He pushes west: posts, La Vérendrye, and a long war against the Fox."),like:{traite:1,pres:.5,eco:'traite'},mod:{rel:1.1}},
  {from:1747,name:'Roland-Michel Barrin de La Galissonière',trait:R("Savant et stratège : il veut tenir l'Ohio pour protéger le Canada.","A scholar and strategist: he wants to hold the Ohio to protect Canada."),like:{def:1,traite:.6},mod:{def:1.2}},
  {from:1749,name:'Jacques-Pierre de Taffanel de La Jonquière',trait:R("Vieux marin âpre au gain ; la traite des postes l'intéresse de près.","An old sailor keen on profit; the trade of the posts interests him closely."),like:{traite:1},mod:{tre:.9}},
  {from:1752,name:'Michel-Ange Duquesne de Menneville',trait:R("Il bâtit une chaîne de forts jusqu'à l'Ohio : la guerre viendra de là.","He builds a chain of forts to the Ohio: the war will come from there."),like:{def:1,traite:.5},mod:{def:1.25}},
  {from:1755,name:'Pierre de Rigaud de Vaudreuil de Cavagnial',trait:R("Né à Québec, premier gouverneur canadien : il croit aux miliciens et aux alliés, pas aux généraux de France.","Born in Québec, the first Canadian-born governor: he trusts militiamen and allies, not the generals from France."),like:{pres:1,def:.8,all:'armee'},mod:{rel:1.25,def:1.1}}],
 int:[
  {from:1663,name:null},
  {from:1665,name:'Jean Talon',trait:R("Le grand intendant : recensement, mariages, brasserie, chantiers, défrichement. Il veut une vraie colonie.","The great intendant: census, marriages, brewery, shipyards, clearing. He wants a real colony."),like:{etab:1.2,eco:'colonie'},mod:{pop:1.4,clear:1.2,tre:1.05}},
  {from:1668,name:"Claude de Bouteroue d'Aubigny",trait:R("Intérim discret entre deux mandats de Talon.","A quiet interim between Talon's two terms."),like:{etab:.6},mod:{}},
  {from:1670,name:'Jean Talon',trait:R("De retour pour deux ans, avec de nouveaux colons et de grands projets.","Back for two years, with new settlers and big plans."),like:{etab:1.2,eco:'colonie'},mod:{pop:1.4,clear:1.2,tre:1.05}},
  {from:1673,name:null},
  {from:1675,name:'Jacques Duchesneau',trait:R("Juriste tatillon, il dénonce la traite illégale… et le gouverneur.","A fussy lawyer, he denounces illegal trade… and the governor."),like:{etab:.8,brandy:'interdite',cdb:'interdits'},feud:['gov'],mod:{tre:1.05}},
  {from:1682,name:'Jacques de Meulles',trait:R("Faute d'argent, il paie les soldats avec des cartes à jouer signées : la monnaie de carte.","Short of money, he pays the soldiers with signed playing cards: card money."),like:{etab:.5},mod:{tre:1.1}},
  {from:1686,name:'Jean Bochart de Champigny',trait:R("Intendant de guerre, économe et proche des jésuites.","A wartime intendant, thrifty and close to the Jesuits."),like:{def:.6,miss:.5},mod:{tre:1.05}},
  {from:1702,name:'François de Beauharnois',trait:R("Bref passage, surtout occupé des finances.","A brief stay, mostly busy with finances."),like:{},mod:{}},
  {from:1705,name:'Jacques Raudot',trait:R("Juriste réformateur : routes, seigneuries, justice… et l'ordonnance de 1709 sur l'esclavage.","A reforming jurist: roads, seigneuries, justice… and the 1709 ordinance on slavery."),like:{etab:1},mod:{clear:1.15}},
  {from:1712,name:'Michel Bégon',trait:R("Bon administrateur, meilleur marchand pour lui-même.","A good administrator, a better merchant for himself."),like:{traite:.5},mod:{tre:.95}},
  {from:1726,name:'Claude-Thomas Dupuy',trait:R("Cultivé et cassant, il se brouille avec le gouverneur et le chapitre.","Cultured and abrasive, he falls out with the governor and the chapter."),like:{etab:.5},feud:['gov','eve'],mod:{}},
  {from:1729,name:'Gilles Hocquart',trait:R("Vingt ans de développement : forges du Saint-Maurice, chantiers navals, chemin du Roy.","Twenty years of development: the Saint-Maurice ironworks, shipyards, the King's road."),like:{etab:1,eco:'colonie'},mod:{tre:1.15,clear:1.1,pop:1.1}},
  {from:1748,name:'François Bigot',trait:R("Habile et corrompu : la « Grande Société » s'enrichit pendant que la colonie a faim.","Able and corrupt: the 'Grande Société' grows rich while the colony goes hungry."),like:{traite:.6},mod:{tre:.72}}],
 eve:[
  {from:1659,name:'François de Laval',trait:R("Austère et inflexible : il fonde le Séminaire et fait la guerre à l'eau-de-vie.","Austere and unbending: he founds the Seminary and wages war on brandy."),like:{miss:1.2,brandy:'interdite',mis:'actives'},mod:{church:1.3}},
  {from:1688,name:'Jean-Baptiste de La Croix de Saint-Vallier',trait:R("Généreux et querelleur : il fonde l'Hôpital général et se brouille avec tout le monde, à commencer par le Séminaire.","Generous and quarrelsome: he founds the Hôpital général and falls out with everyone, starting with the Seminary."),like:{miss:1,brandy:'interdite'},feud:['gov','int'],mod:{church:1.15}},
  {from:1727,name:null},
  {from:1733,name:'Pierre-Herman Dosquet',trait:R("Souvent en France ; l'Église canadienne se gouverne un peu toute seule.","Often in France; the Canadian Church more or less governs itself."),like:{miss:.6},mod:{church:.95}},
  {from:1741,name:'Henri-Marie Dubreil de Pontbriand',trait:R("Doux, pauvre et zélé ; il mourra à Montréal quelques mois avant la capitulation.","Gentle, poor and zealous; he will die in Montréal a few months before the capitulation."),like:{miss:1},mod:{church:1.15}}]};
const OFF_LAB={gov:R('Gouverneur général','Governor General'),int:R('Intendant','Intendant'),eve:R('Évêque de Québec','Bishop of Québec')};
const OFF_NONE={int:R("Pas d'intendant en poste : le gouverneur et le Conseil souverain s'en chargent tant bien que mal.","No intendant in office: the governor and the Sovereign Council make do."),eve:R("Siège vacant ou évêque absent : les chanoines et les curés s'en arrangent.","See vacant or bishop absent: the canons and parish priests manage.")};
function officer(s,k){let o=OFFICERS[k][0];for(const x of OFFICERS[k])if(s.year>=x.from)o=x;return o;}
function offEff(s,k,m){const o=officer(s,k);if(!o.name)return 1;const base=(o.mod&&o.mod[m])||1;return base*(1+(s.off[k]||0)/260);}

/* ---------- les guerres d'empires (courants : elles arrivent quoi qu'on fasse) ---------- */
const WARS=[{id:'augsbourg',a:1689,b:1697,name:R("Guerre de la Ligue d'Augsbourg","Nine Years' War")},{id:'espagne',a:1702,b:1713,name:R("Guerre de Succession d'Espagne","War of the Spanish Succession")},
 {id:'autriche',a:1744,b:1748,name:R("Guerre de Succession d'Autriche","War of the Austrian Succession")},{id:'septans',a:1754,b:1760,name:R("Guerre de Sept Ans","Seven Years' War")}];
const warAt=y=>WARS.find(w=>y>=w.a&&y<=w.b)||null;
/* colonies anglaises : ordre de grandeur (environ 1 million en 1749, Musée canadien de la guerre) */
function engPop(y){const pts=[[1663,90000],[1700,250000],[1749,1000000],[1760,1600000]];for(let i=0;i<pts.length-1;i++){const[a,pa]=pts[i],[b,pb]=pts[i+1];if(y<=b)return pa*Math.pow(pb/pa,(y-a)/(b-a));}return 1600000;}

/* ---------- le rythme : un an par tour jusqu'en 1713, puis deux en paix ---------- */
function turnLen(s){if(s.year<1713)return 1;if(warAt(s.year)||warAt(s.year+1))return 1;if(s.year>=1752)return 1;return 2;}

/* ---------- les traits du peuple (0–100), noms d'époque ---------- */
const TRAITS=[
 {id:'ferveur',name:R('Ferveur','Fervour'),lo:R('libertés','free ways'),hi:R('dévotion','devotion')},
 {id:'alliance',name:R('Alliance avec les nations','Alliance with the nations'),lo:R('séparation','apart'),hi:R('métissage','intermixing')},
 {id:'aventure',name:R("Esprit d'aventure",'Spirit of adventure'),lo:R('habitants','settled farmers'),hi:R('voyageurs','voyageurs')},
 {id:'roi',name:R('Attachement au Roi','Loyalty to the King'),lo:R('« Canadiens » d’abord','“Canadiens” first'),hi:R('sujets du Roi','the King’s subjects')},
 {id:'entraide',name:R('Entraide','Mutual aid'),lo:R('chacun pour soi','each for himself'),hi:R('corvées et paroisse','corvées and parish')},
 {id:'ouverture',name:R('Ouverture','Openness'),lo:R('méfiance','mistrust'),hi:R('accueil','welcome')}];
function traitAdd(s,k,d){s.traits[k]=clamp((s.traits[k]||50)+d,0,100);}

/* ---------- nouveaux lieux ---------- */
Object.assign(PLACES,{
 fortFrontenac:{ll:[-76.48,44.23],name:R('Fort Frontenac','Fort Frontenac'),dx:6,dy:12,post:true,p2:true},
 niagara:{ll:[-79.06,43.26],name:R('Niagara','Niagara'),dx:6,dy:-4,post:true,p2:true},
 detroit:{ll:[-83.05,42.33],name:R('Détroit','Detroit'),dx:6,dy:12,post:true,p2:true},
 michilimakinac:{ll:[-84.73,45.78],name:R('Michilimakinac','Michilimackinac'),dx:6,dy:-4,post:true,p2:true},
 stFrederic:{ll:[-73.39,44.03],name:R('Fort Saint-Frédéric','Fort Saint-Frédéric'),dx:6,dy:4,post:true,p2:true},
 chambly:{ll:[-73.29,45.45],name:R('Fort Saint-Louis','Fort Saint-Louis'),names:[[1672,R('Fort Chambly','Fort Chambly')],[1711,R('Fort Chambly (de pierre)','Fort Chambly (stone)')]],n3:R('Fort Chambly','Fort Chambly'),fort:true,dx:6,dy:4,post:true,p2:true},
 steTherese:{ll:[-73.27,45.37],name:R('Fort Sainte-Thérèse','Fort Sainte-Thérèse'),show:[[1665,1700],[1747,1761]],fort:true,dx:6,dy:6,post:true,p2:true},
 stJean:{ll:[-73.25,45.3],name:R('Fort Saint-Jean','Fort Saint-Jean'),show:[[1666,1700],[1748,1900]],fort:true,dx:6,dy:12,post:true,p2:true},
 steAnne:{ll:[-73.34,44.87],name:R('Fort Sainte-Anne','Fort Sainte-Anne'),show:[[1666,1671]],fort:true,dx:6,dy:4,post:true,p2:true},
 carillon:{ll:[-73.39,43.84],name:R('Carillon','Carillon'),dx:6,dy:12,post:true,p2:true},
 louisbourg:{ll:[-59.99,45.89],name:R('Louisbourg','Louisbourg'),dx:-6,dy:-6,anchor:'end',post:true,p2:true},
 portRoyal:{ll:[-65.5,44.74],name:R('Port-Royal','Port-Royal'),dx:6,dy:12,post:true,p2:true},
 kahnawake:{ll:[-73.68,45.41],name:R('Kahnawake','Kahnawake'),dx:-6,dy:14,anchor:'end',post:true,p2:true},
 lauzon:{ll:[-71.17,46.8],name:R('Lauzon','Lauzon'),dx:6,dy:14,p2:true},
 beaupre:{ll:[-70.9,47.05],name:R('Côte-de-Beaupré','Côte-de-Beaupré'),dx:8,dy:-4,p2:true},
 kamouraska:{ll:[-69.87,47.56],name:R('Kamouraska','Kamouraska'),dx:6,dy:12,p2:true},
 batiscan:{ll:[-72.25,46.5],name:R('Batiscan','Batiscan'),dx:6,dy:-6,p2:true},
 sorel:{ll:[-73.12,46.04],name:R('Sorel','Sorel'),dx:6,dy:12,p2:true},
 laprairie:{ll:[-73.5,45.42],name:R('La Prairie','La Prairie'),dx:6,dy:14,p2:true},
 boucherville:{ll:[-73.44,45.6],name:R('Boucherville','Boucherville'),dx:6,dy:-6,p2:true}
});
/* les seigneuries s'ouvrent quand la colonie est assez grande (dans une partie historique, à peu près aux dates réelles) */
const SPREAD=[['lauzon',3500],['beaupre',4000],['batiscan',6000],['sorel',7000],['boucherville',7500],['laprairie',8500],['kamouraska',14000]];

/* ---------- nouvelles nations (n'apparaissent qu'en période II) ---------- */
GROUPS.push({id:'ouest',name:R('Nations des Grands Lacs','Great Lakes nations'),sub:R('Outaouais, Ojibwés, Potawatomis','Odawa, Ojibwe, Potawatomi'),ll:[-83.7,46.4],rx:120,ry:42,raid:['michilimakinac','detroit']},
 {id:'renards',name:R('Mesquakies','Meskwaki'),sub:R('« Renards »','"Fox"'),ll:[-85.6,43.3],rx:46,ry:30,raid:['detroit']});
GROUP.ouest=GROUPS.find(g=>g.id==='ouest');GROUP.renards=GROUPS.find(g=>g.id==='renards');
Object.assign(RAID_W,{ouest:.5,renards:.6});
const GG=s=>GROUPS.filter(g=>s.rel&&s.rel[g.id]!=null);

/* ---------- état de départ ---------- */
function p2Defaults(s){
  s.period=2;s.season=1;s.turn=1;
  s.off=s.off||{gov:0,int:0,eve:0};s.offName=s.offName||{};
  s.rel.ouest=s.rel.ouest??15;s.rel.renards=s.rel.renards??0;s.str.ouest=s.str.ouest??70;s.str.renards=s.str.renards??40;
  s.orient.brandy=s.orient.brandy||'toleree';s.orient.seig=s.orient.seig||'seigneurs';s.orient.cdb=s.orient.cdb||'conges';
  s.routine.cargo=s.routine.cargo||'colons';
  s.eng=s.eng||engPop(s.year);s.war=null;s.warsSeen=s.warsSeen||{};
  s.p2start=s.p2start||{year:s.year,pop:s.pop};
  s.chron=s.chron||[];s.divergences=s.divergences||[];s.yearOut=[];
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0};
  for(const k of ['gov','int','eve'])s.offName[k]=officer(s,k).name;
  s.budget={etab:30,def:20,pres:20,traite:15,miss:10};
  return s;
}
/* départ historique : la colonie telle qu'elle était au printemps 1663 (3 035 âmes selon Trudel) */
function newState2(){
  const s=attachRel(newState());
  Object.assign(s,{year:1663,pop:3035,women:560,cleared:2900,food:3000,treasury:4000,furs:60,defense:22,compagnie:55,church:65,missions:40,autonomy:30,
    wenFallen:true,wenStr:12,annedda:true,hospital:true,firstWinter:false,govName:OFFICERS.gov[0].name});
  s.rel={innu:40,alg:35,wen:30,agnier:-75,onon:-35,abenaki:25};
  s.places={quebec:true,tadoussac:true,troisRivieres:true,villeMarie:true,orleans:true,beauport:true,refuge:true,fortRichelieu:false};
  s.flags={dollard:true};s.fired={};
  s.girls=[];for(let y=1664;y<=1678;y++)s.girls.push([y,30+(y-1664)*2.6]);
  s.popHist=[[1663,3035]];
  s.traits={ferveur:72,alliance:40,aventure:45,roi:75,entraide:55,ouverture:25};
  s.log=[];logIt(s,R("1663 : Louis XIV reprend la Nouvelle-France à la Compagnie des Cent-Associés. La colonie compte un peu plus de 3 000 âmes.","1663: Louis XIV takes New France back from the Hundred Associates. The colony counts just over 3,000 souls."),'good');
  s.orient={eco:'equilibre',all:'armee',mis:'actives',brandy:'toleree',cdb:'conges'};
  return p2Defaults(s);
}
/* départ hérité : la colonie que le joueur a laissée en 1663 */
function inheritState(p1){
  const s=attachRel(structuredClone(p1));
  s.ending=null;s.pending=[];s.outcome=null;s.year=1663;s.inherited=true;
  const ally=['innu','alg','wen','abenaki'].map(k=>s.rel[k]).reduce((a,b)=>a+b,0)/4;
  s.traits={ferveur:clamp(40+s.church*.4,0,100),alliance:clamp(40+ally*.35+(s.flags.covered?5:0),0,100),aventure:clamp(40+(s.orient.eco==='traite'?12:0)+(s.truchYear?5:0),0,100),
    roi:clamp(80-s.autonomy*.4,0,100),entraide:clamp(50+(s.flags.syndics?10:0)+(s.orient.eco==='colonie'?6:0),0,100),ouverture:clamp(25+(s.flags.huguenots?25:0),0,100)};
  /* les choix de la période I laissent des traces */
  const F=s.flags,ta=(k,d)=>traitAdd(s,k,d);
  if(F.truchChef)ta('aventure',5);if(F.mariageMixte)ta('alliance',6);if(F.reduction){ta('ferveur',4);ta('alliance',-2);}
  if(F.wendatVillage){ta('alliance',3);s.rel.wen=clamp(s.rel.wen+6,-100,100);}
  if(F.laRochelle){s.autonomy=clamp(s.autonomy+5,0,100);ta('roi',-3);}
  if(F.bostonTrade)ta('ouverture',3);if(F.gannStrong)s.rel.onon=clamp(s.rel.onon+8,-100,100);
  if(F.college)ta('ouverture',2);if(F.jesuits||F.foi)ta('ferveur',2);
  s.compagnie=50+(F.boucher?5:0);s.treasury=Math.max(s.treasury,2500);
  logIt(s,R("1663 : le Roi reprend la colonie telle que vous l'avez bâtie.","1663: the King takes over the colony as you built it."),'good');
  return p2Defaults(s);
}
function startPeriod2(inherit){
  S=inherit?inheritState(S):newState2();
  titleOpen=false;prologueOpen=true;dispatchMin=false;tab='colonie';view='continent';cam=null;staticCache.key='';
  enterYear2(S);save();render();
}

/* ---------- simulation annuelle ---------- */
function baseRecruit2(y){if(y<1674)return 70;if(y<1689)return 55;if(y<1714)return 75;if(y<1744)return 70;return 110;}
function raid2(s,dt){
  const def=1-Math.min(s.defense,100)/140;
  for(const g of GG(s)){
    const r=s.rel[g.id];if(r>-30)continue;if(g.id==='wen'&&s.wenFallen)continue;
    let p=(-r-30)/150*RAID_W[g.id]*def*((s.str[g.id]||60)/60)*dt;
    if((g.id==='agnier'||g.id==='onon')&&s.flags.grandePaix)p*=.15;
    for(let n=0;n<2;n++){if(Math.random()>=Math.min(p,.7))continue;
      const opts=g.raid.filter(k=>s.places[k]);if(!opts.length)continue;
      const tgt=opts[Math.floor(Math.random()*opts.length)];
      const d=Math.round(3+Math.random()*10+s.pop*.0015*Math.random());
      s.pop-=d;s.ys.ev-=0;s.ys.raidDead=(s.ys.raidDead||0)+d;s.cleared=Math.max(0,s.cleared-d*2);s.raided[tgt]=1;
      s.ys.raidsBy=s.ys.raidsBy||{};s.ys.raidsBy[g.id]=(s.ys.raidsBy[g.id]||0)+1;
      if(s===S&&!window.CALIB){pushFx(tgt,'−'+d,'bad');toast({fr:`Raid ${g.name.fr} près de ${PLACES[tgt].name.fr} : ${d} morts.`,en:`${g.name.en} raid near ${PLACES[tgt].name.en}: ${d} killed.`},'bad');}
      logIt(s,{fr:`Raid (${g.name.fr}) près de ${PLACES[tgt].name.fr} : ${d} morts, des fermes brûlées.`,en:`Raid (${g.name.en}) near ${PLACES[tgt].name.en}: ${d} killed, farms burned.`},'bad');}
  }
}
function processYear2(s){
  const dt=s.turn||1,war=warAt(s.year),eco=s.orient.eco,ys=s.ys;
  /* budget : la subvention royale et la traite remplissent le trésor ; vous le répartissez */
  const base=Math.max(0,s.treasury),a={};let tot=0;
  for(const k of ENV){a[k]=Math.round(base*s.budget[k]/100);tot+=a[k];}
  s.alloc=a;s.treasury-=tot;
  const gE=k=>offEff(s,'gov',k),iE=k=>offEff(s,'int',k),eE=k=>offEff(s,'eve',k);
  /* défense : milice (1669) + troupes payées */
  const lg=(v,r)=>Math.log1p(Math.max(0,v)/r);
  s.defense=s.defense*Math.pow(.86,dt)+6*lg(a.def,2000)*gE('def')*dt;
  const militia=s.flags.milice?Math.min(40,6+s.pop/2200):0;s.defense=Math.max(s.defense,militia);
  /* Église */
  {const tgt=clamp(30+20*lg(a.miss,1000)*eE('church'),0,100);s.church+=(tgt-s.church)*(1-Math.pow(.85,dt));}s.missions+=a.miss/700;
  /* traite */
  let f=(30+Math.max(0,s.rel.ouest)*1.1+Math.max(0,s.rel.alg)*.35+Math.max(0,s.rel.innu)*.15+(s.wenFallen?0:Math.max(0,s.rel.wen)*.4));
  f*={traite:1.35,equilibre:1,colonie:.75}[eco];f*=1+.35*lg(a.traite,2500);f*={interdits:.8,conges:1,libres:1.25}[s.orient.cdb];
  if(s.orient.brandy==='toleree')f*=1.1;if(war)f*=.85;
  const posts=['fortFrontenac','niagara','detroit','michilimakinac'].filter(k=>s.places[k]).length;f*=1+posts*.06;
  if(s.flags.glut&&s.year<1715)f*=.6;
  f*=s.mods.fur;s.mods.fur=1;
  s.furs=Math.max(0,Math.round(f));ys.furs=s.furs;
  /* présents et diplomatie */
  const expected=350+s.furs*7;let gift=clamp(2.2*Math.log((a.pres+200)/(expected+200)),-5,4);if(gift>0)gift*=gE('rel');
  for(const k of ['innu','alg','abenaki','ouest'])relAdd(s,k,(gift-.6)*dt*(1-Math.max(0,s.rel[k])/130));
  if(!s.wenFallen)relAdd(s,'wen',(gift-.6)*dt);
  const gp=s.flags.grandePaix?.2:1;
  if(s.orient.all==='armee'){relAdd(s,'alg',.8*dt);relAdd(s,'ouest',.6*dt);relAdd(s,'agnier',-1.4*dt*gp);relAdd(s,'onon',-1.2*dt*gp);}
  else{relAdd(s,'agnier',1.6*dt);relAdd(s,'onon',1.6*dt);relAdd(s,'alg',-.6*dt);relAdd(s,'ouest',-.5*dt);}
  if(s.orient.brandy==='toleree'){relAdd(s,'ouest',.6*dt);s.off.eve-=1*dt;}else{s.off.eve+=1*dt;}
  if(s.orient.cdb==='libres'){relAdd(s,'ouest',.8*dt);s.off.int-=1*dt;}
  else if(s.orient.cdb==='interdits'){relAdd(s,'ouest',-.6*dt);}
  if(s.orient.mis==='actives'){s.church+=1*dt;}
  if(s.flags.glutForced&&s.year>=1716){s.flags.glutForced=false;s.flags.glut=false;s.orient.cdb='conges';logIt(s,R("1716 : le Roi rétablit les congés de traite.","1716: the King restores the trading licences."),'good');}
  /* terres et vivres */
  {const tgt=s.pop*1.15*{traite:.9,equilibre:1,colonie:1.1}[eco]*iE('clear')+300*lg(a.etab,2000);s.cleared+=Math.max(0,tgt-s.cleared)*(1-Math.pow(.8,dt));}
  const prod=s.cleared*1.12*s.mods.harvest*(war?.95:1);s.mods.harvest=1;ys.harvest=Math.round(prod);
  s.food+=(prod-s.pop)*dt;
  if(s.food<0){const d=Math.min(Math.round(s.pop*.04),Math.round(-s.food*.08));s.pop-=d;s.women=Math.max(0,s.women-d*.25);ys.famine=(ys.famine||0)+d;s.food=0;if(d>0)logIt(s,{fr:`Disette : ${d} morts de faim.`,en:`Famine: ${d} starved.`},'bad');}
  s.food=Math.min(s.food*.75,s.pop*1.5);
  /* population : immigration, naissances, morts, départs */
  const fav=.55+s.compagnie/110;
  let rec=baseRecruit2(s.year)*fav*iE('pop')+22*lg(a.etab,2000)*iE('pop');
  rec*={engages:1.35,colons:1,soldats:.75,vivres:.7,traite:.8}[s.routine.cargo]||1;
  if(war&&s.year>=1755)rec+=320;
  rec=Math.round(rec*dt*s.recruitMod);
  const fw={engages:.03,colons:.3,soldats:.02,vivres:.06,traite:.04}[s.routine.cargo]+(eco==='colonie'?.05:0);
  let wn=Math.round(rec*fw);
  if(s.flags.fdr&&s.year<=1673){const n=Math.round(70*fav*Math.sqrt(iE('pop')));wn+=n;rec+=n;ys.fdr=n;}
  const dep=Math.round((rec-wn)*.32);
  s.pop+=rec-dep;s.women+=wn;ys.arr+=rec;ys.dep+=dep;
  s.girls=s.girls.filter(g=>{if(g[0]<=s.year+dt-1){s.women+=g[1];return false;}return true;});
  const births=Math.round(s.women*.25*dt);
  s.pop+=births;ys.births+=births;s.girls.push([s.year+15,births*.5*.74]);
  const neutral=war&&s.flags.neutralite===war.id;
  const mort=(.0235+(war?(neutral?.002:.0065):0)+(s.mods.epid||0))*dt;s.mods.epid=0;
  const deaths=Math.round(s.pop*mort);s.pop-=deaths;s.women=Math.max(0,s.women*(1-.026*dt)-deaths*.08);
  s.women=Math.min(s.women,s.pop*.3);
  /* raids */
  raid2(s,dt);
  /* trésor : la subvention royale et les fourrures */
  const grant=(s.year<1673?9000:s.year<1689?5000:war?7000:4500)*(.6+s.compagnie/125);
  s.treasury+=Math.round((grant+s.furs*45*iE('tre')*gE('tre')+(s.flags.talonEco?250:0)+(s.flags.forges?500:0)+(s.flags.chantier?400:0))*dt);
  /* faveur de Versailles */
  s.compagnie+=((s.treasury>0?.4:-3)+(s.furs-150)/120+(s.pop>s.ys.start*1.03?.8:0)-(['gov','int','eve'].some(k=>s.off[k]<-50)?2:0)-(s.compagnie-50)*.05)*dt;
  /* officiers : alignement de la politique sur ce que chacun aime */
  const share=k=>(s.budget[k]||0);
  for(const k of ['gov','int','eve']){const o=officer(s,k);if(!o.name)continue;let al=0;
    for(const kk in o.like){const w=o.like[kk];if(typeof w==='number')al+=w*(share(kk)-20)/20;else al+=s.orient[kk]===w?1:-.6;}
    s.off[k]=clamp(s.off[k]+clamp(al*3,-6,6)*dt-s.off[k]*.06*dt,-100,100);
    for(const f of (o.feud||[])){if(officer(s,f).name){s.off[f]=clamp(s.off[f]-1.2*dt,-100,100);}}}
  classTick(s,dt);if(typeof acadTick==='function')acadTick(s,dt);
  if(s.orient.seig==='censitaires'){s.off.int=clamp(s.off.int+.8*dt,-100,100);s.cleared+=s.pop*.02*dt;}else{s.off.int=clamp(s.off.int-.3*dt,-100,100);}
  /* traits : chacun tend vers ce que la politique et la situation favorisent */
  {const allies=['innu','alg','abenaki','ouest'].map(k=>s.rel[k]).reduce((x,y)=>x+y,0)/4;
   const TG={ferveur:supT(s,'ferveur')+25+s.church*.6+(s.orient.brandy==='interdite'?5:0)+(s.flags.ecoles?4:0),
     alliance:30+allies*.35+(s.orient.cdb==='libres'?10:0)+(s.orient.mis==='actives'?3:0)+(s.places.kahnawake?4:0)+(s.flags.metis?5:0)+(s.flags.conseilNations?8:0)+(s.flags.wendakeConseil?4:0)+(s.flags.kahnawakeLois?4:0)+(s.flags.abenakiArmed?2:0),
     aventure:supT(s,'aventure')+25+{interdits:0,conges:14,libres:32}[s.orient.cdb]+{traite:14,equilibre:5,colonie:-6}[eco]+posts*3+(s.flags.verendrye?5:0)+(s.flags.paysdenhaut?6:0)+(s.flags.illinois?3:0),
     roi:supT(s,'roi')+35+s.compagnie*.4+(war?-6:0)+(s.flags.milice?4:0)+(s.flags.phipsRepelled?3:0)+(s.flags.walker?3:0)-(s.flags.elitesCanadiennes?3:0)-(s.flags.canadiens?8:0)-(s.flags.assemblee?5:0)-(s.flags.conseilNations?3:0),
     entraide:supT(s,'entraide')+38+{traite:-6,equilibre:4,colonie:14}[eco]+s.church*.12+(s.flags.milice?5:0)+(s.flags.chemin?3:0),
     ouverture:supT(s,'ouverture')+22+(s.flags.universite?6:0)+(s.flags.ecolesFilles?3:0)+(s.flags.huguenotsP2?12:0)+(s.flags.noSlavery?5:0)+(s.flags.francisation?6:0)+(s.flags.tolerance?6:0)+(s.flags.asile?3:0)+(s.flags.imprimerie?(s.flags.presseOfficielle?2:8):0)};
   const r=1-Math.pow(.965,dt);for(const k in TG)s.traits[k]=clamp(s.traits[k]+(clamp(TG[k],0,100)-s.traits[k])*r,0,100);}
  /* nouvelles seigneuries */
  for(const[k,n]of SPREAD)if(!s.places[k]&&s.pop>=n*(.9+Math.random()*.2)){s.places[k]=true;logIt(s,{fr:`Nouvelles concessions : la seigneurie de ${PLACES[k].name.fr} se peuple.`,en:`New grants: the seigneury of ${PLACES[k].name.en} fills with settlers.`},'good');}
  for(let i=0;i<dt;i++)relDrift(s);
  for(const k of ['compagnie','defense','church','missions','autonomy','wenStr'])s[k]=clamp(s[k],0,100);
  s.pop=Math.max(0,Math.round(s.pop));
}
function enterYear2(s){
  for(let yy=s.year;yy<s.year+(turnLen(s)||1);yy++){const keep=s.year;s.year=yy;deliverWorld(s);s.year=keep;}
  for(const k in s.raided){s.raided[k]--;if(s.raided[k]<=0)delete s.raided[k];}
  /* nouveaux officiers */
  for(const k of ['gov','int','eve']){const o=officer(s,k);if(o.name!==s.offName[k]){s.offName[k]=o.name;
    if(o.name){s.off[k]=Math.round(s.off[k]*.3);logIt(s,{fr:`${OFF_LAB[k].fr} : ${o.name}.`,en:`${OFF_LAB[k].en}: ${o.name}.`},'good');if(s===S&&!window.CALIB)toast({fr:`Nouveau ${OFF_LAB[k].fr.toLowerCase()} : ${o.name}.`,en:`New ${OFF_LAB[k].en.toLowerCase()}: ${o.name}.`},'gov',GOV_IMG[o.name]||null);}}}
  s.govName=officer(s,'gov').name;
  /* guerres */
  const w=warAt(s.year);
  if(w&&!s.warsSeen[w.id]){s.warsSeen[w.id]=true;logIt(s,{fr:`${w.name.fr} : la guerre d'Europe gagne l'Amérique.`,en:`${w.name.en}: the European war reaches America.`},'bad');if(s===S&&!window.CALIB)toast({fr:`${w.name.fr} : la France et l'Angleterre sont en guerre.`,en:`${w.name.en}: France and England are at war.`},'alert');}
  s.war=w?w.id:null;s.eng=engPop(s.year);
  s.turn=turnLen(s);
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0};
  /* événements historiques de la période */
  let histN=0;
  for(const e of EVENTS){if(e.period!==2||e.sys||s.fired[e.id])continue;if(histN>=2&&!e.must){const nom=+((e.id.match(/\d{4}/)||[0])[0]);if(!(nom&&s.year-nom>=2))continue;}let ok=false;try{ok=e.cond(s);}catch(err){}if(!ok)continue;s.fired[e.id]=true;
    const p=LIKELY[e.id]?clamp(LIKELY[e.id](s),0,1):1;
    if(Math.random()<p){s.pending.push(e.id);histN++;}else diverge(s,e,p);}
  queueReview(s);
  /* imprévus et arcs */
  if(!s.ending){
    const elig=EVENTS.filter(e=>{if(e.period!==2||!e.sys)return false;if((s.sysCount[e.id]||0)>=(e.max||2))return false;
      if(e.arc){const a=arc(s,e.arc);if(a.stage!==e.stage||s.year-a.last<e.gap)return false;}
      else if((s.year-(s.sysLast[e.id]??-99))<e.cool)return false;
      try{return e.cond(s);}catch(err){return false;}});
    /* jusqu'à trois affaires par tour (deux historiques + un imprévu) ; entre deux, une transition montre l'effet du choix */
    if(s.pending.length<2&&elig.length&&Math.random()<(s.pending.length?.3:(s.turn>1?.45:.3))){const wt=e=>{let w=1;try{w=e.w?e.w(s):(e.conseq?3:1);}catch(err){}return Math.max(0,w);};
      const tot=elig.reduce((a,e)=>a+wt(e),0);let r=Math.random()*tot,e=elig[0];for(const x of elig){r-=wt(x);if(r<=0){e=x;break;}}
      s.sysLast[e.id]=s.year;s.sysCount[e.id]=(s.sysCount[e.id]||0)+1;s.pending.push(e.id);}
  }
}
function advance2(){
  if(S.pending.length||S.ending)return;
  S.prev=snap(S);const y0=S.year,dt=S.turn||1;
  processYear2(S);
  if(window.CALIB&&!window.CALIB_REL){S.yearOut=[];S.yearImg=null;}
  if(!window.CALIB||window.CALIB_REL){writeRelation(S,dt>1?`${y0}–${y0+dt-1}`:y0);if(!window.CALIB){const busy=S.chron[0]&&S.chron[0].dec&&S.chron[0].dec.length;if(readRel&&!busy)relOpen=0;else toast({fr:`La Relation de ${y0} est rédigée.`,en:`The Relation of ${y0} is written.`},'relation',null,'relation');}}
  S.year+=dt;
  if(S.pop<=50)S.ending='abandon';
  else if(S.year>1760&&!S.ending)S.ending='epilogue';
  else enterYear2(S);
  S.popHist.push([S.year,S.pop]);
  if(!window.CALIB){save();render(true);}
}

/* ---------- repères de population (Statistique Canada, lignes « Nouvelle-France » seulement) ---------- */
HIST_POP.push([1667,3918],[1675,7832],[1681,9677],[1688,11562],[1706,16417],[1713,18119],[1716,20531],[1719,22530],[1724,26710],[1730,33682],[1734,37716],[1739,42817],[1754,55009],[1760,70000]);
HIST_SOURCES.push(...[[1667,3918],[1675,7832],[1681,9677],[1688,11562],[1706,16417],[1713,18119],[1716,20531],[1719,22530],[1724,26710],[1730,33682],[1734,37716],[1739,42817],[1754,55009],[1760,70000]].map(([y,v])=>({y,v,src:'Statistique Canada'})));
GOVS.push(...OFFICERS.gov.map(o=>({from:o.from,name:o.name,trait:o.trait})));
GOVS.sort((a,b)=>a.from-b.from);
