/* Kebec — Période II (1663–1760) : événements historiques, imprévus et arcs.
   Chaque événement historique a une probabilité (LIKELY) qui dépend de l'état ; s'il n'a pas lieu, l'histoire bifurque (DIVERGE). */
const P2E=[];var LIKELY_P2={};
const ev2=e=>{e.period=2;P2E.push(e);};
const hasFeud=s=>['gov','int','eve'].some(k=>s.off[k]<-40&&officer(s,k).name);

/* ================= 1663–1672 : la colonie royale, Talon ================= */
ev2({id:'royal1663b',place:'quebec',cond:s=>s.year>=1663,
 title:R("Le Roi reprend la colonie","The King takes over the colony"),
 text:R("Louis XIV dissout la Compagnie des Cent-Associés. Désormais, trois hommes gouvernent au nom du Roi : le gouverneur (la guerre et les nations), l'intendant (la justice, la police, les finances) et l'évêque (l'Église et les écoles). Votre volonté passe par eux : un officier qui vous approuve applique vos ordres à plein ; un officier fâché les freine. Colbert attend votre première lettre.",
        "Louis XIV dissolves the Hundred Associates. From now on three men govern in the King's name: the governor (war and the nations), the intendant (justice, police, finances) and the bishop (Church and schools). Your will goes through them: an officer who approves carries out your orders in full; an angry one drags his feet. Colbert awaits your first letter."),
 choices:[
  {label:R("Réclamer des troupes contre les Agniers","Ask for troops against the Mohawk"),hist:true,fx:s=>{s.flags.askTroops=true;s.off.gov+=8;s.compagnie+=2;return R("Colbert promet un régiment. À la cour, on parle enfin du Canada.","Colbert promises a regiment. At court, people are finally talking about Canada.");}},
  {label:R("Réclamer des familles avant tout","Ask for families above all"),fx:s=>{s.flags.askFamilies=true;s.recruitMod=1.12;s.off.eve+=4;return R("Colbert approuve : une colonie se bâtit avec des mariages. Il enverra aussi des soldats, à son heure.","Colbert approves: a colony is built with marriages. He will send soldiers too, in his own time.");}},
  {label:R("Proposer la paix aux Agniers plutôt que la guerre","Offer the Mohawk peace instead of war"),fx:s=>{s.flags.askPeace=true;relAdd(s,'agnier',18);relAdd(s,'onon',8);s.off.gov-=8;s.compagnie-=3;return R("Des colliers de porcelaine partent vers la vallée de la Mohawk. Le gouverneur trouve cela bien faible.","Wampum belts leave for the Mohawk valley. The governor finds this very weak.");}}]});

ev2({id:'fdr1663',place:'quebec',cond:s=>s.year>=1663,
 title:R("Les Filles du Roi","The King's Daughters"),
 text:R("Dans la colonie, on compte six hommes pour une femme à marier. Colbert propose d'envoyer chaque année des jeunes femmes, souvent orphelines, dotées par le Roi, recrutées à Paris, à Rouen et à La Rochelle. Il y en aura environ 800 en dix ans.",
        "In the colony there are six men for every marriageable woman. Colbert proposes to send young women every year, often orphans, with a royal dowry, recruited in Paris, Rouen and La Rochelle. About 800 will come in ten years."),
 choices:[
  {label:R("Accepter : des mariages, vite","Accept: marriages, quickly"),hist:true,fx:s=>{s.flags.fdr=true;s.off.int+=6;s.off.eve+=4;traitAdd(s,'ferveur',2);return R("Les premières arrivent avec les navires ; d'autres suivront chaque été, jusqu'en 1673. La plupart sont mariées en quelques semaines.","The first arrive with the ships. Most are married within weeks.");}},
  {label:R("Préférer la « francisation » : des mariages avec les filles des nations alliées","Prefer 'Frenchification': marriages with daughters of the allied nations"),fx:s=>{s.flags.francisation=true;s.women+=25;s.pop+=25;traitAdd(s,'alliance',10);traitAdd(s,'ouverture',6);relAdd(s,'innu',6);relAdd(s,'alg',6);s.off.eve-=8;return R("Quelques dizaines de mariages se font, surtout autour des missions. Les familles innues et algonquines ne veulent pas perdre leurs filles, et l'évêque s'inquiète.","A few dozen marriages take place, mostly around the missions. Innu and Algonquin families do not want to lose their daughters, and the bishop is uneasy.");}},
  {label:R("Demander plutôt des engagés : des bras pour défricher","Ask for indentured men instead: hands to clear land"),fx:s=>{s.recruitMod*=1.25;s.routine.cargo='engages';s.flags.engagesP2=true;return R("Les engagés arrivent nombreux. La plupart repartiront à la fin de leur contrat, faute d'épouse.","The indentured men come in numbers. Most will leave when their contract ends, for want of a wife.");}}]});

ev2({id:'conseil1664',place:'quebec',cond:s=>s.year>=1664,
 title:R("Querelle au Conseil souverain","A quarrel in the Sovereign Council"),
 text:R("Le gouverneur Mézy veut renvoyer des conseillers choisis par Mgr de Laval. L'évêque refuse. Le Conseil est paralysé, et les deux hommes écrivent à Versailles.",
        "Governor Mézy wants to dismiss councillors chosen by Bishop Laval. The bishop refuses. The Council is paralysed, and both men write to Versailles."),
 choices:[
  {label:R("Soutenir l'évêque","Back the bishop"),hist:true,fx:s=>{s.off.eve+=12;s.off.gov-=15;s.church+=4;return R("Versailles rappelle Mézy ; il meurt à Québec avant de partir, réconcilié avec Laval. L'Église sort renforcée.","Versailles recalls Mézy; he dies in Québec before leaving, reconciled with Laval. The Church comes out stronger.");}},
  {label:R("Soutenir le gouverneur","Back the governor"),fx:s=>{s.off.gov+=12;s.off.eve-=15;s.church-=5;s.autonomy+=3;return R("Le pouvoir civil l'emporte sur l'Église au Conseil. Laval ne l'oubliera pas.","Civil power prevails over the Church in the Council. Laval will not forget.");}},
  {label:R("Faire élire des syndics par les habitants","Have the inhabitants elect syndics"),fx:s=>{s.autonomy+=8;traitAdd(s,'roi',-4);traitAdd(s,'entraide',3);s.off.gov-=5;s.off.eve-=5;s.compagnie-=4;return R("Pendant quelques années, Québec aura ses représentants élus. Colbert n'aime pas ça : « il est bon que chacun parle pour soi ».","For a few years, Québec will have elected representatives. Colbert dislikes it: 'it is good that each speaks for himself'.");}}]});

ev2({id:'carignan1665',place:'quebec',cond:s=>s.year>=1665,
 title:R("Le régiment de Carignan-Salières","The Carignan-Salières regiment"),
 text:R("Environ 1 200 soldats débarquent avec le marquis de Tracy. Jamais la colonie n'a vu autant d'uniformes. Il faut les loger, les nourrir et décider où les mettre.",
        "About 1,200 soldiers land with the Marquis de Tracy. The colony has never seen so many uniforms. They must be housed, fed, and placed somewhere."),
 choices:[
  {label:R("Bâtir une chaîne de forts sur le Richelieu","Build a chain of forts on the Richelieu"),hist:true,fx:s=>{s.places.fortRichelieu=true;s.places.chambly=s.places.steTherese=s.places.stJean=s.places.steAnne=true;s.defense+=28;s.treasury-=1500;s.off.gov+=6;return R("Le capitaine de Saurel relève le vieux fort Richelieu ; Chambly bâtit le fort Saint-Louis, puis viennent Sainte-Thérèse, Saint-Jean et, sur le lac Champlain, Sainte-Anne. La route des Agniers vers le fleuve est barrée.","Captain de Saurel rebuilds old Fort Richelieu; Chambly builds Fort Saint-Louis, then come Sainte-Thérèse, Saint-Jean and, on Lake Champlain, Sainte-Anne. The Mohawk route to the river is barred.");}},
  {label:R("Les loger chez l'habitant, dans les seigneuries","Billet them with the inhabitants, in the seigneuries"),fx:s=>{s.defense+=20;s.food-=s.pop*.3;traitAdd(s,'entraide',3);s.cleared+=150;return R("Les soldats aident aux champs en échange du gîte. Beaucoup y trouveront une épouse.","The soldiers help in the fields in exchange for lodging. Many will find a wife there.");}}]});
Object.assign(LIKELY_P2,{carignan1665:s=>s.flags.askPeace&&s.rel.agnier>20?.5:1});

ev2({id:'tracy1666',place:'fortRichelieu',cond:s=>s.year>=1666,
 title:R("Marcher sur les Agniers","March on the Mohawk"),
 text:R("Tracy et Courcelle veulent porter la guerre au cœur du pays agnier, au-delà du lac Champlain, avant que les raids ne reprennent.",
        "Tracy and Courcelle want to carry the war into the heart of Mohawk country, beyond Lake Champlain, before the raids resume."),
 choices:[
  {label:R("Brûler les villages et les récoltes","Burn the villages and the harvest"),hist:true,fx:s=>{s.pop-=60;s.rel.agnier=Math.max(s.rel.agnier,-55);relAdd(s,'agnier',35);relAdd(s,'onon',22);s.flags.peace67=true;s.off.gov+=10;traitAdd(s,'roi',3);return R("Les villages sont vides : les Agniers ont fui. On brûle tout. Affamés, ils demandent la paix l'année suivante. Une paix de près de vingt ans commence.","The villages are empty: the Mohawk have fled. Everything is burned. Hungry, they ask for peace the next year. A peace of nearly twenty years begins.");}},
  {label:R("Montrer la force, puis négocier","Show force, then negotiate"),fx:s=>{relAdd(s,'agnier',30);relAdd(s,'onon',15);s.flags.peace67=true;s.off.gov-=8;s.treasury-=800;return R("L'armée se montre au lac Champlain, puis des ambassadeurs parlent. La paix vient, moins humiliante, et plus fragile aux yeux du gouverneur.","The army shows itself on Lake Champlain, then envoys talk. Peace comes, less humiliating, and more fragile in the governor's eyes.");}}]});

ev2({id:'soldiers1668',place:'fortRichelieu',cond:s=>s.year>=1668,
 title:R("Les soldats qui restent","The soldiers who stay"),
 text:R("Le régiment rentre en France. Plus de 400 soldats et officiers voudraient rester au Canada, si on leur donne des terres.",
        "The regiment returns to France. More than 400 soldiers and officers would like to stay in Canada, if they are given land."),
 choices:[
  {label:R("Leur offrir des terres et une dot pour se marier","Give them land and a dowry to marry"),hist:true,fx:s=>{s.pop+=410;s.cleared+=200;s.treasury-=1200;s.off.int+=6;return R("Les officiers deviennent seigneurs le long du Richelieu ; les soldats, leurs censitaires. Les Filles du Roi de l'année trouvent des maris.","The officers become seigneurs along the Richelieu; the soldiers, their tenants. This year's King's Daughters find husbands.");}},
  {label:R("Faire du Richelieu une frontière militaire","Make the Richelieu a military frontier"),fx:s=>{s.pop+=420;s.places.sorel=true;s.defense+=10;traitAdd(s,'aventure',3);s.treasury-=1500;return R("Des seigneuries de soldats gardent la porte du pays. Ils sont plus doués pour la guerre que pour le blé.","Soldiers' seigneuries guard the door of the country. They are better at war than at wheat.");}},
  {label:R("Les renvoyer en France","Send them home"),fx:s=>{s.defense-=12;s.treasury+=800;return R("Le régiment repart en entier. La colonie retrouve son calme, et sa faiblesse.","The whole regiment sails. The colony returns to its calm, and its weakness.");}}]});

ev2({id:'milice1669',place:'quebec',cond:s=>s.year>=1669,
 title:R("La milice","The militia"),
 text:R("Le Roi ordonne que tous les hommes de 16 à 60 ans soient organisés en compagnies de milice, une par paroisse, avec un capitaine choisi parmi les habitants.",
        "The King orders all men from 16 to 60 to be organized into militia companies, one per parish, with a captain chosen among the inhabitants."),
 choices:[
  {label:R("Appliquer l'ordre partout","Apply the order everywhere"),hist:true,fx:s=>{s.flags.milice=true;traitAdd(s,'entraide',3);traitAdd(s,'roi',2);s.off.gov+=5;return R("Le capitaine de milice devient un personnage de la paroisse, aussi important que le curé. Les Canadiens apprennent la guerre à l'indienne.","The militia captain becomes a figure of the parish, as important as the priest. Canadians learn to fight in the Indigenous way.");}},
  {label:R("Ne lever que des volontaires","Raise volunteers only"),fx:s=>{s.flags.milice=false;s.defense-=4;s.autonomy+=4;traitAdd(s,'roi',-2);return R("Les habitants restent aux champs. On se demande qui défendra le pays au prochain raid.","The inhabitants stay in the fields. People wonder who will defend the country at the next raid.");}}]});

ev2({id:'talon1670',place:'quebec',cond:s=>s.year>=1670&&officer(s,'int').name==='Jean Talon',
 title:R("Les projets de Talon","Talon's projects"),
 text:R("De retour, l'intendant veut une colonie qui produit : une brasserie, un chantier naval, du chanvre, des moulins, du commerce avec les Antilles. Il lui faut de l'argent.",
        "Back again, the intendant wants a colony that produces: a brewery, a shipyard, hemp, mills, trade with the West Indies. He needs money."),
 choices:[
  {label:R("Financer ses projets","Fund his projects"),hist:true,fx:s=>{s.treasury-=2500;s.flags.talonEco=true;s.off.int+=12;traitAdd(s,'entraide',2);return R("La brasserie de Talon fume, des navires sortent du chantier. Tout ne durera pas, mais la colonie apprend à faire autre chose que du castor.","Talon's brewery smokes, ships come off the slipway. Not all of it will last, but the colony learns to do more than beaver.");}},
  {label:R("Garder l'argent pour la traite et les alliés","Keep the money for the trade and the allies"),fx:s=>{s.off.int-=12;s.off.gov+=4;s.mods.fur*=1.15;return R("Le castor reste roi. Talon repart en France déçu.","Beaver stays king. Talon goes back to France disappointed.");}}]});

/* ================= 1672–1700 : Frontenac, l'Ouest, la guerre ================= */
ev2({id:'frontenac1673',place:'fortFrontenac',cond:s=>s.year>=1673,
 title:R("Un fort à Cataracoui","A fort at Cataraqui"),
 text:R("Frontenac veut bâtir un fort à l'entrée du lac Ontario, pour impressionner les Haudenosaunee et capter leur traite. Les marchands de Montréal crient au monopole du gouverneur.",
        "Frontenac wants to build a fort at the entrance to Lake Ontario, to impress the Haudenosaunee and capture their trade. Montréal merchants cry that it is the governor's monopoly."),
 choices:[
  {label:R("Bâtir le fort","Build the fort"),hist:true,fx:s=>{s.places.fortFrontenac=true;s.treasury-=1200;relAdd(s,'onon',6);s.off.gov+=12;s.off.int-=6;return R("En quelques semaines, le fort Frontenac est debout. L'Ouest s'ouvre, et la colonie s'étire.","In a few weeks Fort Frontenac stands. The West opens, and the colony stretches.");}},
  {label:R("Refuser : peupler le fleuve d'abord","Refuse: settle the river first"),fx:s=>{s.off.gov-=14;s.off.int+=6;s.cleared+=100;return R("Pas de poste à l'ouest. Les Haudenosaunee continuent de porter leurs fourrures à Albany.","No western post. The Haudenosaunee keep carrying their furs to Albany.");}}]});
LIKELY_P2.frontenac1673=s=>s.rel.onon>-70?1:.35;

ev2({id:'eaudevie1678',place:'quebec',cond:s=>s.year>=1678,
 title:R("L'assemblée de l'eau-de-vie","The brandy assembly"),
 text:R("Mgr de Laval excommunie ceux qui vendent de l'alcool aux nations ; les marchands disent que sans eau-de-vie, les fourrures iront aux Anglais. Le Roi réunit vingt notables pour trancher.",
        "Bishop Laval excommunicates those who sell alcohol to the nations; the merchants say that without brandy, the furs will go to the English. The King gathers twenty notables to decide."),
 choices:[
  {label:R("Permettre l'eau-de-vie dans la colonie, l'interdire dans les villages","Allow brandy in the colony, ban it in the villages"),hist:true,fx:s=>{s.orient.brandy='toleree';s.off.eve-=10;s.off.gov+=6;return R("Compromis boiteux : l'interdiction dans les villages ne sera jamais appliquée. Laval part en France protester.","A lame compromise: the ban in the villages will never be enforced. Laval goes to France to protest.");}},
  {label:R("L'interdire partout","Ban it everywhere"),fx:s=>{s.orient.brandy='interdite';s.off.eve+=15;s.off.gov-=12;s.mods.fur*=.85;relAdd(s,'ouest',-4);traitAdd(s,'ferveur',3);return R("L'interdiction est proclamée. Les contrebandiers s'en frottent les mains, et certains chefs, aussi, de voir leurs villages en paix.","The ban is proclaimed. Smugglers rub their hands, and some chiefs, too, at seeing their villages at peace.");}},
  {label:R("La laisser libre","Leave it free"),fx:s=>{s.orient.brandy='toleree';s.off.eve-=25;s.mods.fur*=1.15;relAdd(s,'ouest',4);traitAdd(s,'ferveur',-4);traitAdd(s,'alliance',-3);return R("L'eau-de-vie coule à la traite. Les missionnaires racontent des villages ravagés par l'ivresse.","Brandy flows at the trading. The missionaries tell of villages ravaged by drunkenness.");}}]});

ev2({id:'lasalle1682',place:'fortFrontenac',cond:s=>s.year>=1682,
 title:R("La Salle à l'embouchure du Mississippi","La Salle at the mouth of the Mississippi"),
 text:R("Cavelier de La Salle a descendu le Mississippi jusqu'au golfe du Mexique et pris possession du bassin au nom du Roi : la Louisiane. Il demande des moyens pour y fonder une colonie.",
        "Cavelier de La Salle has descended the Mississippi to the Gulf of Mexico and claimed the basin in the King's name: Louisiana. He asks for means to found a colony there."),
 choices:[
  {label:R("Laisser Versailles financer l'aventure","Let Versailles fund the venture"),hist:true,fx:s=>{s.flags.louisiane=1;s.compagnie+=2;traitAdd(s,'aventure',2);return R("La Salle part de France en 1684 ; il manque l'embouchure et meurt assassiné au Texas. La Louisiane attendra Iberville.","La Salle sails from France in 1684; he misses the river mouth and is murdered in Texas. Louisiana will wait for Iberville.");}},
  {label:R("Investir dans une route Canada–Louisiane","Invest in a Canada–Louisiana route"),fx:s=>{s.flags.louisiane=2;s.treasury-=2500;traitAdd(s,'aventure',4);relAdd(s,'ouest',4);return R("Des postes jalonnent la route de l'Illinois. Le Canada devient la porte d'un empire.","Posts mark the route to the Illinois. Canada becomes the gateway to an empire.");}},
  {label:R("Refuser : le Canada a assez de terres","Refuse: Canada has land enough"),fx:s=>{s.flags.louisiane=0;s.off.gov-=6;s.off.int+=4;return R("La Louisiane reste une ligne sur une carte.","Louisiana remains a line on a map.");}}]});

ev2({id:'carte1685',place:'quebec',cond:s=>s.year>=1685,
 title:R("La monnaie de carte","Card money"),
 text:R("Le navire du Trésor n'est pas arrivé. L'intendant de Meulles propose de payer les soldats avec des cartes à jouer découpées, signées de sa main, à rembourser quand l'argent viendra.",
        "The Treasury ship has not arrived. Intendant de Meulles proposes to pay the soldiers with cut playing cards, signed by him, to be redeemed when the money comes."),
 choices:[
  {label:R("Émettre la monnaie de carte","Issue card money"),hist:true,fx:s=>{s.treasury+=3500;s.flags.carte=true;s.off.int+=8;return R("Les cartes circulent. Pratique, d'abord ; plus tard, on en imprimera trop, et elles ne vaudront plus grand-chose.","The cards circulate. Handy, at first; later, too many will be printed, and they will be worth little.");}},
  {label:R("Attendre l'argent de France","Wait for money from France"),fx:s=>{s.defense-=8;s.compagnie+=2;return R("Les soldats impayés désertent ou travaillent chez l'habitant.","Unpaid soldiers desert or work for the inhabitants.");}}]});

ev2({id:'denonville1687',place:'fortFrontenac',cond:s=>s.year>=1687,
 title:R("La campagne contre les Tsonnontouans","The campaign against the Seneca"),
 text:R("Les Tsonnontouans attaquent les alliés de l'Ouest et commercent avec les Anglais. Le gouverneur prépare une grande expédition. Au fort Frontenac, on a invité des chefs haudenosaunee à un festin.",
        "The Seneca attack the western allies and trade with the English. The governor prepares a great expedition. At Fort Frontenac, Haudenosaunee chiefs have been invited to a feast."),
 choices:[
  {label:R("Capturer les chefs invités et frapper","Seize the invited chiefs and strike"),hist:true,fx:s=>{relAdd(s,'onon',-45);relAdd(s,'agnier',-30);relAdd(s,'ouest',10);s.off.gov+=6;traitAdd(s,'alliance',-3);return R("Une quarantaine d'hommes, invités, sont enchaînés et envoyés aux galères. Les villages tsonnontouans brûlent. Les Haudenosaunee jurent vengeance.","About forty men, guests, are chained and sent to the galleys. The Seneca villages burn. The Haudenosaunee swear revenge.");}},
  {label:R("Frapper, mais respecter les invités","Strike, but respect the guests"),fx:s=>{relAdd(s,'onon',-22);relAdd(s,'agnier',-10);relAdd(s,'ouest',8);return R("Les villages brûlent, mais la parole donnée est tenue. Les Haudenosaunee sont furieux, sans plus.","The villages burn, but the word given is kept. The Haudenosaunee are angry, no more.");}},
  {label:R("Négocier avec les Tsonnontouans","Negotiate with the Seneca"),fx:s=>{relAdd(s,'onon',15);relAdd(s,'ouest',-12);s.off.gov-=10;return R("La paix est sauve, mais les nations de l'Ouest se demandent si Onontio est encore leur père.","Peace is saved, but the western nations wonder whether Onontio is still their father.");}}]});

ev2({id:'lachine1689',place:'villeMarie',cond:s=>s.year>=1689,
 title:R("Le massacre de Lachine","The Lachine massacre"),
 text:R("Dans la nuit du 5 août, 1 500 guerriers haudenosaunee tombent sur Lachine, près de Montréal, en pleine tempête de grêle. Des maisons brûlent, des dizaines d'habitants sont tués ou emmenés.",
        "On the night of 5 August, 1,500 Haudenosaunee warriors fall on Lachine, near Montréal, in a hailstorm. Houses burn, dozens of inhabitants are killed or carried off."),
 choices:[
  {label:R("Se retrancher dans les forts","Hold fast in the forts"),hist:true,fx:s=>{s.pop-=90;s.cleared-=120;s.defense+=6;s.raided.villeMarie=2;traitAdd(s,'roi',-2);return R("On ne sort pas des forts. Les guerriers ravagent l'île tout l'automne. Le souvenir de Lachine hantera la colonie pendant un siècle.","No one leaves the forts. The warriors ravage the island all autumn. The memory of Lachine will haunt the colony for a century.");}},
  {label:R("Lancer la milice à leur poursuite","Send the militia after them"),fx:s=>{s.pop-=70;relAdd(s,'onon',-8);s.defense-=6;return R("La poursuite tourne à l'embuscade au lac des Deux-Montagnes. On venge un peu, on enterre beaucoup.","The pursuit turns into an ambush at the Lake of Two Mountains. A little revenge, a great deal of burying.");}}]});
LIKELY_P2.lachine1689=s=>.15+.85*Math.max(hostP(s.rel.onon),hostP(s.rel.agnier));

ev2({id:'phips1690',place:'quebec',cond:s=>s.year>=1690&&s.war,
 title:R("Phips devant Québec","Phips before Québec"),
 text:R("Une flotte de Boston, 34 navires et 2 000 hommes, mouille devant Québec. L'amiral Phips envoie un officier exiger la reddition, montre en main : une heure pour répondre.",
        "A fleet from Boston, 34 ships and 2,000 men, anchors before Québec. Admiral Phips sends an officer to demand surrender, watch in hand: one hour to answer."),
 choices:[
  {label:R("« Je vous répondrai par la bouche de mes canons »","'I will answer you through the mouths of my cannon'"),hist:true,fx:s=>{if(s.defense+Math.random()*30>=22){s.pop-=30;traitAdd(s,'roi',5);s.compagnie+=6;s.off.gov+=10;s.flags.phipsRepelled=true;return R("Les miliciens de Beauport harcèlent les débarqués, les canons de la haute-ville tiennent. Phips repart avec le froid. On fonde l'église Notre-Dame-de-la-Victoire.","Beauport militiamen harry the landing party, the upper town guns hold. Phips sails off as the cold sets in. The church of Notre-Dame-de-la-Victoire is founded.");}
    s.pop-=200;s.treasury-=3000;s.compagnie-=10;return R("Québec tient à peine. La basse-ville brûle, et l'on paie cher le départ des Anglais.","Québec barely holds. The lower town burns, and the English departure is dearly paid for.");}},
  {label:R("Négocier une rançon","Negotiate a ransom"),fx:s=>{s.treasury-=4000;s.compagnie-=8;traitAdd(s,'roi',-3);s.off.gov-=10;return R("Phips accepte de l'argent et des prisonniers. À Versailles, on trouve la chose honteuse.","Phips accepts money and prisoners. At Versailles, it is thought shameful.");}}]});

ev2({id:'glut1696',place:'michilimakinac',cond:s=>s.year>=1696,
 title:R("Trop de castor","Too much beaver"),
 text:R("Les entrepôts de France débordent de peaux invendues. Le Roi révoque les congés de traite et ordonne d'abandonner les postes de l'Ouest.",
        "The French warehouses overflow with unsold pelts. The King revokes the trading licences and orders the western posts abandoned."),
 choices:[
  {label:R("Obéir : fermer les postes","Obey: close the posts"),hist:true,fx:s=>{s.flags.glut=true;s.flags.glutForced=true;s.orient.cdb='interdits';relAdd(s,'ouest',-10);s.off.int+=6;s.off.gov-=6;return R("Les coureurs de bois restent dans l'Ouest, hors-la-loi. Les alliés se sentent abandonnés.","The coureurs de bois stay in the West, outlaws. The allies feel abandoned.");}},
  {label:R("Garder quelques postes, aux frais de la colonie","Keep a few posts, at the colony's expense"),fx:s=>{s.flags.glut=true;s.treasury-=1800;s.compagnie-=6;relAdd(s,'ouest',4);return R("Michilimakinac reste ouvert. Versailles grince des dents.","Michilimackinac stays open. Versailles grinds its teeth.");}}]});

/* ================= 1700–1713 : la Grande Paix, l'Ouest, la guerre de Succession ================= */
ev2({id:'grandepaix1701',place:'villeMarie',cond:s=>s.year>=1700&&s.year>=1697,
 title:R("La Grande Paix de Montréal","The Great Peace of Montréal"),
 text:R("Après des années de guerre et d'épidémies, Callière invite toutes les nations à Montréal. 1 300 délégués de 39 nations campent près de la ville. Kondiaronk, le grand orateur wendat, parle pour la paix ; il mourra pendant les pourparlers.",
        "After years of war and epidemics, Callière invites every nation to Montréal. 1,300 delegates from 39 nations camp near the town. Kondiaronk, the great Wendat orator, speaks for peace; he will die during the talks."),
 choices:[
  {label:R("Signer avec toutes les nations, la France arbitre","Sign with every nation, France as arbiter"),hist:true,fx:s=>{s.flags.grandePaix=true;s.treasury-=2500;for(const k of ['agnier','onon'])s.rel[k]=Math.max(s.rel[k],15)+10;relAdd(s,'ouest',12);relAdd(s,'renards',8);traitAdd(s,'alliance',5);s.off.gov+=12;return R("Les Haudenosaunee promettent la neutralité entre Français et Anglais ; les différends seront portés à Onontio. Un siècle de guerres se termine par des colliers et des festins.","The Haudenosaunee promise neutrality between French and English; disputes will be brought to Onontio. A century of war ends with wampum and feasts.");}},
  {label:R("Paix séparée avec les Haudenosaunee seulement","A separate peace with the Haudenosaunee only"),fx:s=>{s.flags.grandePaix=true;relAdd(s,'agnier',25);relAdd(s,'onon',25);relAdd(s,'ouest',-18);s.treasury-=1200;return R("Les Haudenosaunee posent les armes. Les nations de l'Ouest, qui ont porté le poids de la guerre, se sentent trahies.","The Haudenosaunee lay down their arms. The western nations, who carried the weight of the war, feel betrayed.");}}]});
LIKELY_P2.grandepaix1701=s=>clamp(.8+((s.rel.agnier+s.rel.onon+s.rel.ouest)/3+40)/150+(s.off.gov/400),.08,.97);

ev2({id:'detroit1701',place:'detroit',cond:s=>s.year>=1701,
 title:R("Cadillac au Détroit","Cadillac at the Detroit"),
 text:R("Antoine Laumet de La Mothe Cadillac veut fonder un établissement sur le détroit entre le lac Huron et le lac Érié, et y attirer les nations alliées.",
        "Antoine Laumet de La Mothe Cadillac wants to found a settlement on the strait between Lake Huron and Lake Erie, and draw the allied nations there."),
 choices:[
  {label:R("Fonder le fort Pontchartrain du Détroit","Found Fort Pontchartrain du Détroit"),hist:true,fx:s=>{s.places.detroit=true;s.treasury-=1200;relAdd(s,'ouest',6);relAdd(s,'onon',-4);traitAdd(s,'aventure',2);return R("Une centaine de colons, des soldats, et bientôt des villages outaouais, wendats et potawatomis autour du fort.","A hundred settlers, soldiers, and soon Odawa, Wendat and Potawatomi villages around the fort.");}},
  {label:R("Non : tout pour le Saint-Laurent","No: everything for the St. Lawrence"),fx:s=>{s.cleared+=80;s.off.gov-=8;relAdd(s,'ouest',-4);return R("Le détroit reste sans fort. Les Anglais s'y intéressent.","The strait stays without a fort. The English take an interest.");}}]});

ev2({id:'variole1702',place:'quebec',cond:s=>s.year>=1702,
 title:R("La petite vérole","Smallpox"),
 text:R("Un navire apporte la variole. L'hiver 1702-1703, elle frappe Québec, puis les côtes. Les religieuses de l'Hôtel-Dieu ne suffisent plus.",
        "A ship brings smallpox. In the winter of 1702–1703 it strikes Québec, then the countryside. The nuns of the Hôtel-Dieu cannot cope."),
 choices:[
  {label:R("Isoler les malades, fermer le port","Isolate the sick, close the port"),fx:s=>{s.mods.epid=.03;s.treasury-=800;s.off.int+=4;return R("La quarantaine freine la maladie. Elle emporte quand même des centaines de personnes.","The quarantine slows the disease. It still carries off hundreds.");}},
  {label:R("Processions et prières à Notre-Dame","Processions and prayers to Our Lady"),hist:true,fx:s=>{s.mods.epid=.045;traitAdd(s,'ferveur',3);s.off.eve+=5;return R("On prie, on se rassemble, et la maladie passe de l'un à l'autre. Plus d'un millier de morts, dit-on, dont beaucoup chez les domiciliés.","People pray, gather, and the disease passes from one to the next. Over a thousand dead, it is said, many among the mission villages.");}}]});

ev2({id:'rougeole1687',place:'quebec',cond:s=>s.year>=1687,
 title:R("La rougeole","Measles"),
 text:R("La rougeole et la petite vérole arrivent avec les troupes de Denonville. Les enfants meurent par dizaines, et l'épidémie gagne les missions.","Measles and smallpox arrive with Denonville's troops. Children die by the dozen, and the epidemic reaches the missions."),
 choices:[
  {label:R("Ouvrir l'Hôtel-Dieu à tous","Open the Hôtel-Dieu to all"),hist:true,fx:s=>{s.mods.epid=.03;s.treasury-=500;s.off.eve+=4;return R("Les Hospitalières soignent jusqu'à l'épuisement. L'épidémie passe ; des centaines de familles portent le deuil.","The Hospitaller nuns nurse to exhaustion. The epidemic passes; hundreds of families are in mourning.");}},
  {label:R("Suspendre les rassemblements et les messes","Suspend gatherings and Masses"),fx:s=>{s.mods.epid=.02;s.off.eve-=10;traitAdd(s,'ferveur',-2);return R("Les églises fermées font scandale, mais la contagion ralentit.","Closed churches cause a scandal, but the contagion slows.");}}]});

ev2({id:'variole1733',place:'quebec',cond:s=>s.year>=1733,
 title:R("La grande variole de 1733","The great smallpox of 1733"),
 text:R("La petite vérole frappe de nouveau, plus fort qu'en 1703. À Québec, on enterre jusqu'à vingt personnes par jour.","Smallpox strikes again, harder than in 1703. In Québec, up to twenty people are buried a day."),
 choices:[
  {label:R("Prières publiques et quarantaine","Public prayers and quarantine"),hist:true,fx:s=>{s.mods.epid=.04;traitAdd(s,'ferveur',2);return R("Le fléau passe en quelques mois. Près de deux mille morts, dit-on.","The scourge passes within a few months. Nearly two thousand dead, it is said.");}},
  {label:R("Essayer l'inoculation, comme à Londres","Try inoculation, as in London"),fx:s=>{if(Math.random()<.6){s.mods.epid=.02;traitAdd(s,'ouverture',3);s.off.eve-=8;return R("Le chirurgien du Roi inocule des volontaires. Ils s'en tirent mieux que les autres ; l'évêque y voit un défi à la Providence.","The King's surgeon inoculates volunteers. They fare better than the others; the bishop sees it as defying Providence.");}s.mods.epid=.045;s.off.eve-=8;return R("Les inoculés tombent malades et la panique gagne les paroisses.","The inoculated fall ill and panic spreads through the parishes.");}}]});

ev2({id:'variole1755',place:'quebec',cond:s=>s.year>=1755&&s.war,
 title:R("Les troupes apportent la variole","The troops bring smallpox"),
 text:R("Les bataillons de France débarquent avec la variole et le typhus. Les hôpitaux sont pleins de soldats, de réfugiés acadiens et d'alliés.","The battalions from France land with smallpox and typhus. The hospitals are full of soldiers, Acadian refugees and allies."),
 choices:[
  {label:R("Soigner tout le monde à l'Hôtel-Dieu","Nurse everyone at the Hôtel-Dieu"),hist:true,fx:s=>{s.mods.epid=.035;s.off.eve+=3;return R("Les religieuses meurent à leur tour. L'épidémie dure jusqu'en 1757.","The nuns die in turn. The epidemic lasts until 1757.");}},
  {label:R("Isoler les troupes à la Pointe-Lévy","Isolate the troops at Pointe-Lévy"),fx:s=>{s.mods.epid=.02;s.defense-=4;return R("Les soldats grognent sous la tente ; les paroisses sont épargnées.","The soldiers grumble under canvas; the parishes are spared.");}}]});

ev2({id:'esclavage1709',place:'quebec',cond:s=>s.year>=1709,
 title:R("L'ordonnance sur l'esclavage","The ordinance on slavery"),
 text:R("L'intendant Raudot propose une ordonnance : les « Panis » (des captifs autochtones vendus par des nations alliées) et les Noirs achetés appartiendront en pleine propriété à ceux qui les ont acquis. Des marchands et des communautés religieuses en possèdent déjà. Note d'histoire : environ 4 000 personnes ont été réduites en esclavage en Nouvelle-France, aux deux tiers autochtones.",
        "Intendant Raudot proposes an ordinance: 'Panis' (Indigenous captives sold by allied nations) and purchased Black people will belong outright to those who acquired them. Merchants and religious communities already hold some. Historical note: about 4,000 people were enslaved in New France, two thirds of them Indigenous."),
 choices:[
  {label:R("Signer l'ordonnance","Sign the ordinance"),hist:true,fx:s=>{s.flags.slavery=true;s.off.int+=6;s.compagnie+=2;traitAdd(s,'ouverture',-4);traitAdd(s,'alliance',-3);relAdd(s,'renards',-6);return R("L'esclavage devient légal au Canada. Il le restera jusqu'en 1834, sous un autre drapeau.","Slavery becomes legal in Canada. It will remain so until 1834, under another flag.");}},
  {label:R("Refuser : nul ne sera esclave au Canada","Refuse: no one shall be a slave in Canada"),fx:s=>{s.flags.noSlavery=true;s.off.int-=12;s.compagnie-=3;traitAdd(s,'ouverture',5);traitAdd(s,'alliance',3);relAdd(s,'ouest',-3);return R("La traite des captifs ne trouve plus d'acheteurs légaux à Montréal. Des marchands protestent ; certains alliés aussi, pour qui les captifs sont une monnaie de guerre.","The captive trade finds no legal buyers in Montréal. Merchants protest; so do some allies, for whom captives are a currency of war.");}}]});

ev2({id:'walker1711',place:'gulf',cond:s=>s.year>=1711&&s.war,
 title:R("La flotte de Walker","Walker's fleet"),
 text:R("Une armada anglaise, 70 navires et plus de 7 000 hommes, remonte le Saint-Laurent pour prendre Québec. Une armée de terre marche en même temps sur Montréal.",
        "An English armada, 70 ships and more than 7,000 men, sails up the St. Lawrence to take Québec. A land army marches on Montréal at the same time."),
 choices:[
  {label:R("Rassembler toute la milice à Québec","Gather the whole militia at Québec"),hist:true,fx:s=>{s.defense+=6;s.food-=s.pop*.2;if(Math.random()<.88){traitAdd(s,'ferveur',3);traitAdd(s,'roi',3);s.flags.walker=true;return R("Dans le brouillard, huit navires se fracassent sur les récifs de l'île aux Œufs : près de 900 noyés. Walker fait demi-tour sans avoir vu Québec. On parle de miracle.","In the fog, eight ships are wrecked on the reefs of Île aux Œufs: nearly 900 drowned. Walker turns back without seeing Québec. People speak of a miracle.");}
    s.pop-=250;s.cleared-=200;s.compagnie-=8;return R("La flotte passe les récifs. Le siège est rude ; la ville tient, mais les côtes sont ravagées.","The fleet clears the reefs. The siege is hard; the town holds, but the countryside is ravaged.");}},
  {label:R("Défendre Montréal d'abord","Defend Montréal first"),fx:s=>{if(Math.random()<.8){s.flags.walker=true;return R("Walker s'échoue à l'île aux Œufs ; l'armée de terre fait demi-tour en l'apprenant.","Walker runs aground at Île aux Œufs; the land army turns back on hearing it.");}s.pop-=300;s.compagnie-=10;return R("Québec, mal gardée, subit un bombardement terrible.","Québec, poorly guarded, suffers a terrible bombardment.");}}]});

ev2({id:'renards1712',place:'detroit',cond:s=>s.year>=1712&&s.places.detroit,
 title:R("Les Renards au Détroit","The Fox at Detroit"),
 text:R("Des Mesquakies (« Renards ») installés près du Détroit sont en conflit avec les Outaouais et les Potawatomis. Les alliés exigent qu'Onontio prenne leur parti.",
        "Meskwaki ('Fox') settled near Detroit are in conflict with the Odawa and the Potawatomi. The allies demand that Onontio take their side."),
 choices:[
  {label:R("Soutenir les alliés contre les Renards","Back the allies against the Fox"),hist:true,fx:s=>{relAdd(s,'renards',-45);relAdd(s,'ouest',10);s.pop-=15;return R("Le siège du Détroit tourne au massacre des Renards. Une guerre de vingt-cinq ans commence à l'ouest.","The siege of Detroit turns into a massacre of the Fox. A twenty-five-year war begins in the west.");}},
  {label:R("Arbitrer, comme le veut la Grande Paix","Arbitrate, as the Great Peace requires"),fx:s=>{relAdd(s,'renards',15);relAdd(s,'ouest',-8);s.treasury-=800;s.off.gov+=s.flags.grandePaix?4:-4;return R("Onontio couvre les morts des deux côtés avec des présents. La paix tient, de justesse.","Onontio covers the dead on both sides with gifts. The peace holds, barely.");}}]});

ev2({id:'utrecht1713',must:true,place:'gulf',cond:s=>s.year>=1713,
 title:R("Le traité d'Utrecht","The Treaty of Utrecht"),
 text:R("La guerre d'Europe se termine. Pour garder l'Espagne à un Bourbon, Louis XIV cède à l'Angleterre l'Acadie, Terre-Neuve et la baie d'Hudson. Il garde l'île Royale (le Cap-Breton) et l'île Saint-Jean.",
        "The European war ends. To keep Spain for a Bourbon, Louis XIV cedes Acadia, Newfoundland and Hudson Bay to England. He keeps Île Royale (Cape Breton) and Île Saint-Jean."),
 choices:[
  {label:R("Fortifier l'île Royale","Fortify Île Royale"),hist:true,fx:s=>{s.flags.acadiaLost=true;s.flags.lbgPlan=true;s.compagnie+=3;return R("On choisit un havre sur la côte est du Cap-Breton : ce sera Louisbourg.","A harbour is chosen on the east coast of Cape Breton: it will be Louisbourg.");}},
  {label:R("Inviter les Acadiens à venir au Canada","Invite the Acadians to come to Canada"),fx:s=>{s.flags.acadiaLost=true;s.flags.acadInvite=true;s.pop+=350;s.women+=80;s.treasury-=1500;relAdd(s,'abenaki',3);return R("Quelques centaines d'Acadiens remontent le fleuve. La plupart, attachés à leurs aboiteaux, restent chez eux.","A few hundred Acadians come up the river. Most, attached to their dikelands, stay home.");}},
  {label:R("Tout miser sur le Canada","Put everything into Canada"),fx:s=>{s.flags.acadiaLost=true;s.cleared+=150;s.defense+=5;return R("Pas de forteresse à l'est. Les pêcheurs de l'île Royale se débrouilleront.","No fortress in the east. The fishermen of Île Royale will manage.");}}]});

/* ================= 1713–1744 : la longue paix ================= */
ev2({id:'louisbourg1720',place:'louisbourg',cond:s=>s.year>=1719&&s.flags.lbgPlan,
 title:R("Les murs de Louisbourg","The walls of Louisbourg"),
 text:R("Versailles veut une forteresse à la Vauban à Louisbourg : bastions, casernes, phare. Le chantier durera vingt-cinq ans et coûtera une fortune.",
        "Versailles wants a Vauban-style fortress at Louisbourg: bastions, barracks, a lighthouse. The works will last twenty-five years and cost a fortune."),
 choices:[
  {label:R("Bâtir la grande forteresse","Build the great fortress"),hist:true,fx:s=>{s.places.louisbourg=true;s.flags.lbgStr=60;s.compagnie+=2;s.treasury-=1500;return R("Louisbourg devient la troisième ville de la Nouvelle-France, un port de pêche et de commerce avec les Antilles.","Louisbourg becomes the third town of New France, a port for fishing and West Indies trade.");}},
  {label:R("Un fort modeste, et l'argent pour Québec","A modest fort, and the money for Québec"),fx:s=>{s.places.louisbourg=true;s.flags.lbgStr=30;s.defense+=10;return R("Un fort de pêcheurs, pas une citadelle. Québec y gagne des canons.","A fishermen's fort, not a citadel. Québec gains cannon.");}}]});

ev2({id:'marly1711',place:'quebec',cond:s=>s.year>=1715,
 title:R("Les seigneuries qui dorment","Sleeping seigneuries"),
 text:R("Des seigneurs ne concèdent pas leurs terres, ou les vendent. Les arrêts de Marly permettent de reprendre les seigneuries non développées et obligent à concéder aux colons qui le demandent.",
        "Some seigneurs do not grant their land, or sell it. The Marly decrees allow undeveloped seigneuries to be taken back and require grants to settlers who ask."),
 choices:[
  {label:R("Appliquer les arrêts avec mesure","Apply the decrees with restraint"),hist:true,fx:s=>{s.cleared+=200;s.off.int+=5;return R("Quelques seigneuries sont réunies au domaine du Roi ; les autres se mettent à concéder.","A few seigneuries revert to the King's domain; the others start granting.");}},
  {label:R("Les appliquer durement","Apply them hard"),fx:s=>{s.cleared+=450;traitAdd(s,'entraide',3);s.off.int+=8;s.autonomy+=3;return R("Des censitaires obtiennent des terres partout. Les seigneurs grognent, les habitants s'enracinent.","Tenants get land everywhere. The seigneurs grumble, the habitants put down roots.");}},
  {label:R("Laisser les seigneurs faire","Let the seigneurs be"),fx:s=>{s.compagnie+=2;s.cleared-=50;return R("Rien ne change. Les fils d'habitants vont chercher fortune dans l'Ouest.","Nothing changes. Habitants' sons go to seek their fortune in the West.");}}]});

ev2({id:'renards1730',place:'detroit',cond:s=>s.year>=1728&&s.rel.renards<-20,
 title:R("La guerre des Renards","The Fox Wars"),
 text:R("Les Renards bloquent la route du Mississippi. Le gouverneur Beauharnois et les alliés veulent en finir ; certains parlent d'exterminer la nation entière.",
        "The Fox block the route to the Mississippi. Governor Beauharnois and the allies want to end it; some speak of destroying the whole nation."),
 choices:[
  {label:R("Les poursuivre jusqu'au bout","Pursue them to the end"),hist:true,fx:s=>{relAdd(s,'renards',-30);s.str.renards=12;relAdd(s,'ouest',6);traitAdd(s,'alliance',-3);return R("En 1730, des centaines de Renards sont tués en fuyant vers l'est. La nation survivra de justesse, réfugiée chez les Sauks.","In 1730, hundreds of Fox are killed while fleeing east. The nation will barely survive, sheltered by the Sauk.");}},
  {label:R("Offrir la paix et couvrir les morts","Offer peace and cover the dead"),fx:s=>{relAdd(s,'renards',45);relAdd(s,'ouest',-6);s.treasury-=1500;s.off.gov-=8;return R("Des présents, des colliers, des prisonniers rendus. La route du Mississippi se rouvre sans massacre.","Gifts, wampum belts, prisoners returned. The Mississippi route reopens without a massacre.");}}]});
LIKELY_P2.renards1730=s=>s.rel.renards<-30?1:.8;

ev2({id:'verendrye1731',place:'michilimakinac',cond:s=>s.year>=1731,
 title:R("La Vérendrye et la mer de l'Ouest","La Vérendrye and the Western Sea"),
 text:R("Pierre Gaultier de La Vérendrye, un Trifluvien, propose de chercher la mer de l'Ouest en bâtissant des postes jusqu'au lac Winnipeg. Il paiera avec la traite.",
        "Pierre Gaultier de La Vérendrye, from Trois-Rivières, proposes to seek the Western Sea by building posts as far as Lake Winnipeg. He will pay with the trade."),
 choices:[
  {label:R("Lui donner le monopole de la traite","Give him the trade monopoly"),hist:true,fx:s=>{s.flags.verendrye=true;relAdd(s,'ouest',5);traitAdd(s,'aventure',4);s.mods.fur*=1.1;return R("Lui et ses fils iront jusqu'aux Rocheuses, ou presque. La mer de l'Ouest, elle, restera introuvable.","He and his sons will go almost as far as the Rockies. The Western Sea will never be found.");}},
  {label:R("Financer l'expédition par le Roi","Have the King fund the expedition"),fx:s=>{s.flags.verendrye=true;s.treasury-=2000;relAdd(s,'ouest',8);traitAdd(s,'aventure',5);s.mods.fur*=1.2;return R("Bien financés, les postes de l'Ouest se multiplient : la traite des Cris et des Assiniboines descend à Montréal.","Well funded, the western posts multiply: the Cree and Assiniboine trade comes down to Montréal.");}},
  {label:R("Refuser : assez d'Ouest","Refuse: enough West"),fx:s=>{s.off.gov-=6;s.cleared+=60;return R("La Vérendrye retourne à son poste de Kaministiquia.","La Vérendrye returns to his post at Kaministiquia.");}}]});

ev2({id:'chemin1734',place:'troisRivieres',cond:s=>s.year>=1731,
 title:R("Le chemin du Roy","The King's road"),
 text:R("Le grand voyer propose une route carrossable de Québec à Montréal, sur la rive nord : 280 kilomètres, bâtis par corvées, chaque habitant entretenant le tronçon devant sa terre.",
        "The chief road officer proposes a carriage road from Québec to Montréal along the north shore: 280 kilometres, built by corvées, each habitant maintaining the stretch in front of his land."),
 choices:[
  {label:R("Le bâtir par corvées","Build it by corvée"),hist:true,fx:s=>{s.flags.chemin=true;traitAdd(s,'entraide',4);s.off.int+=6;s.treasury-=800;s.cleared+=150;return R("En 1737, on va de Québec à Montréal en quatre jours, avec une trentaine de relais. Le fleuve n'est plus la seule route.","By 1737 one travels from Québec to Montréal in four days, with some thirty relays. The river is no longer the only road.");}},
  {label:R("Le financer par le Trésor, sans corvée","Fund it from the treasury, without corvée"),fx:s=>{s.flags.chemin=true;s.treasury-=2500;s.off.int+=3;traitAdd(s,'roi',2);return R("Les habitants sont payés pour leurs journées. La route est plus lente à venir, mais personne ne grogne.","The habitants are paid for their days. The road comes more slowly, but no one grumbles.");}},
  {label:R("Garder le fleuve","Keep to the river"),fx:s=>{s.off.int-=6;return R("L'hiver, on ira toujours en carriole sur la glace.","In winter, people will go on sleighs over the ice, as always.");}}]});

ev2({id:'angelique1734',place:'villeMarie',cond:s=>s.year>=1734&&s.flags.slavery,
 title:R("L'incendie de Montréal","The Montréal fire"),
 text:R("Le 10 avril 1734, un incendie détruit 46 maisons et l'Hôtel-Dieu de Montréal. La rumeur accuse Marie-Josèphe Angélique, une femme noire esclave qui voulait fuir. Les preuves sont minces.",
        "On 10 April 1734 a fire destroys 46 houses and the Hôtel-Dieu of Montréal. Rumour accuses Marie-Josèphe Angélique, an enslaved Black woman who wanted to flee. The evidence is thin."),
 choices:[
  {label:R("Laisser la justice suivre son cours","Let justice take its course"),hist:true,fx:s=>{s.cleared-=40;s.treasury-=600;traitAdd(s,'ouverture',-3);return R("Torturée, Angélique avoue et est exécutée en juin. Son procès restera l'un des rares témoignages sur l'esclavage au Canada.","Tortured, Angélique confesses and is executed in June. Her trial will remain one of the rare records of slavery in Canada.");}},
  {label:R("Exiger des preuves avant toute condamnation","Demand proof before any sentence"),fx:s=>{s.cleared-=40;s.treasury-=600;traitAdd(s,'ouverture',4);s.off.int-=5;return R("Faute de preuves, la sentence est commuée. On rebâtit en pierre ; l'ordonnance exige désormais des murs coupe-feu.","For lack of proof, the sentence is commuted. The town is rebuilt in stone; an ordinance now requires firewalls.");}}]});

ev2({id:'forges1737',place:'troisRivieres',cond:s=>s.year>=1736&&officer(s,'int').name==='Gilles Hocquart',
 title:R("Les forges du Saint-Maurice","The Saint-Maurice ironworks"),
 text:R("Près de Trois-Rivières, on a trouvé du minerai de fer. Hocquart propose de bâtir des forges : la première industrie du pays.",
        "Near Trois-Rivières, bog iron has been found. Hocquart proposes building ironworks: the country's first industry."),
 choices:[
  {label:R("Les bâtir avec l'argent du Roi","Build them with the King's money"),hist:true,fx:s=>{s.flags.forges=true;s.treasury-=2000;s.off.int+=10;traitAdd(s,'entraide',1);return R("Les forges produisent poêles, marmites et boulets. Elles fumeront plus d'un siècle.","The ironworks make stoves, kettles and cannonballs. They will smoke for more than a century.");}},
  {label:R("Les laisser à des marchands canadiens","Leave them to Canadian merchants"),fx:s=>{s.flags.forges=true;s.autonomy+=4;traitAdd(s,'roi',-2);return R("Une société canadienne prend le risque. Elle fera faillite, puis la forge reprendra sous le Roi.","A Canadian company takes the risk. It will go bankrupt, then the forge will resume under the King.");}}]});

/* ================= 1744–1760 : les dernières guerres ================= */
ev2({id:'disette1743',place:'quebec',cond:s=>s.year>=1742,
 title:R("Les années de disette","The years of dearth"),
 text:R("Trois récoltes manquées de suite : sécheresse, chenilles, gel. Le blé manque dans les campagnes, et la fièvre suit la faim.","Three failed harvests in a row: drought, caterpillars, frost. Wheat runs short in the countryside, and fever follows hunger."),
 choices:[
  {label:R("Interdire l'exportation du blé et répartir les réserves","Ban wheat exports and share out the stores"),hist:true,fx:s=>{s.mods.harvest=.65;s.mods.epid=.015;s.off.int+=4;traitAdd(s,'entraide',2);return R("Les marchands crient à la ruine ; les pauvres mangent, à peine. On enterre plus que d'habitude.","Merchants cry ruin; the poor eat, barely. More are buried than usual.");}},
  {label:R("Acheter du blé aux Antilles et en France","Buy wheat from the West Indies and France"),fx:s=>{s.treasury-=Math.round(s.pop*.12);s.mods.harvest=.8;s.mods.epid=.008;return R("Les navires de blé arrivent à l'automne. Le Trésor s'en ressent.","The grain ships arrive in autumn. The treasury feels it.");}}]});

ev2({id:'louisbourg1745',place:'louisbourg',cond:s=>s.year>=1745&&s.places.louisbourg,
 title:R("Louisbourg assiégée","Louisbourg besieged"),
 text:R("Des miliciens de Nouvelle-Angleterre, soutenus par la marine anglaise, débarquent près de Louisbourg. La garnison est mal payée et mutine.",
        "New England militiamen, backed by the Royal Navy, land near Louisbourg. The garrison is badly paid and mutinous."),
 choices:[
  {label:R("Laisser la garnison se défendre seule","Let the garrison defend itself"),hist:true,fx:s=>{if(Math.random()<(s.flags.lbgStr||40)/200){return R("Contre toute attente, la forteresse tient jusqu'à l'automne. Les Bostonnais rembarquent.","Against all odds, the fortress holds until autumn. The Bostonians re-embark.");}s.places.louisbourg=false;s.flags.lbgFell=true;s.compagnie-=6;return R("Après 47 jours, Louisbourg capitule. Boston sonne les cloches.","After 47 days, Louisbourg capitulates. Boston rings its bells.");}},
  {label:R("Envoyer des renforts canadiens","Send Canadian reinforcements"),fx:s=>{s.treasury-=2500;s.defense-=8;if(Math.random()<.5){traitAdd(s,'roi',3);return R("Les miliciens canadiens et les Mi'kmaq harcèlent les assiégeants. La forteresse tient.","Canadian militiamen and the Mi'kmaq harry the besiegers. The fortress holds.");}s.places.louisbourg=false;s.flags.lbgFell=true;return R("Les renforts arrivent trop tard. Louisbourg est tombée.","The reinforcements arrive too late. Louisbourg has fallen.");}}]});
LIKELY_P2.louisbourg1745=s=>clamp(.95-Math.max(0,s.defense-60)/250,.5,.95);

ev2({id:'aix1748',place:'louisbourg',cond:s=>s.year>=1748&&s.flags.lbgFell,
 title:R("La paix d'Aix-la-Chapelle","The Peace of Aix-la-Chapelle"),
 text:R("À la table des négociations, la France échange ses conquêtes des Pays-Bas contre Louisbourg. Boston enrage.",
        "At the negotiating table, France trades its conquests in the Low Countries for Louisbourg. Boston is furious."),
 choices:[{label:R("Reprendre Louisbourg","Take Louisbourg back"),hist:true,fx:s=>{s.places.louisbourg=true;s.flags.lbgFell=false;return R("Les couleurs françaises flottent de nouveau sur l'île Royale. Les Anglais fondent Halifax en réponse.","French colours fly again over Île Royale. The English found Halifax in reply.");}}]});

ev2({id:'ohio1754',place:'niagara',cond:s=>s.year>=1753,
 title:R("La vallée de l'Ohio","The Ohio valley"),
 text:R("Le gouverneur fait bâtir des forts entre le lac Érié et l'Ohio, jusqu'au fort Duquesne. La Virginie y envoie un jeune officier, George Washington.",
        "The governor builds forts between Lake Erie and the Ohio, down to Fort Duquesne. Virginia sends a young officer there, George Washington."),
 choices:[
  {label:R("Tenir l'Ohio coûte que coûte","Hold the Ohio at all costs"),hist:true,fx:s=>{s.places.niagara=true;s.treasury-=2500;s.defense+=6;s.off.gov+=8;return R("À Jumonville, Washington tue un officier français venu parlementer. La guerre commence dans les bois, deux ans avant l'Europe.","At Jumonville, Washington kills a French officer sent to parley. The war begins in the woods, two years before Europe.");}},
  {label:R("Négocier une frontière","Negotiate a border"),fx:s=>{s.off.gov-=10;relAdd(s,'ouest',-6);return R("Les Anglais refusent toute frontière à l'ouest des Alleghanys. La guerre viendra quand même, plus tard et plus près.","The English refuse any border west of the Alleghenies. The war will come anyway, later and closer.");}}]});

ev2({id:'acadie1755',place:'portRoyal',cond:s=>s.year>=1755&&s.flags.acadiaLost,
 title:R("Le Grand Dérangement","The Great Upheaval"),
 text:R("Les Acadiens refusent un serment d'allégeance sans réserve. Le gouverneur Lawrence ordonne de les déporter : les maisons de Grand-Pré brûlent, les familles sont séparées sur les navires.",
        "The Acadians refuse an unconditional oath of allegiance. Governor Lawrence orders their deportation: the houses of Grand-Pré burn, families are separated on the ships."),
 choices:[
  {label:R("Accueillir les réfugiés au Canada","Take in the refugees in Canada"),hist:true,fx:s=>{s.pop+=1800;s.women+=400;s.food-=1800;s.mods.epid=(s.mods.epid||0)+.008;traitAdd(s,'ouverture',3);return R("Près de 2 000 Acadiens arrivent à Québec, affamés et malades. La variole les suit.","Nearly 2,000 Acadians reach Québec, starving and sick. Smallpox follows them.");}},
  {label:R("Soutenir la résistance acadienne et mi'kmaq","Support the Acadian and Mi'kmaq resistance"),fx:s=>{s.pop+=900;s.treasury-=2000;s.defense-=4;relAdd(s,'abenaki',8);traitAdd(s,'alliance',3);return R("Boishébert mène la guérilla avec les Mi'kmaq. Quelques communautés échappent aux navires.","Boishébert leads the guerrilla with the Mi'kmaq. Some communities escape the ships.");}}]});
LIKELY_P2.acadie1755=s=>s.flags.acadInvite?.7:.9;

ev2({id:'monongahela1755',place:'niagara',cond:s=>s.year>=1755&&s.war,
 title:R("La Monongahela","The Monongahela"),
 text:R("Le général Braddock marche sur le fort Duquesne avec 2 000 hommes. Le fort n'a que quelques centaines de Canadiens et 600 guerriers alliés.",
        "General Braddock marches on Fort Duquesne with 2,000 men. The fort has only a few hundred Canadians and 600 allied warriors."),
 choices:[
  {label:R("Tendre une embuscade dans les bois","Lay an ambush in the woods"),hist:true,fx:s=>{if(s.rel.ouest>0||Math.random()<.4){relAdd(s,'ouest',6);traitAdd(s,'aventure',2);traitAdd(s,'roi',2);s.defense+=4;return R("Braddock est tué, son armée mise en déroute. Les alliés de l'Ouest rentrent chargés de butin.","Braddock is killed, his army routed. The western allies return home laden with plunder.");}s.places.niagara=false;return R("Sans assez d'alliés, l'embuscade échoue. Le fort Duquesne est abandonné.","Without enough allies, the ambush fails. Fort Duquesne is abandoned.");}},
  {label:R("Évacuer le fort","Evacuate the fort"),fx:s=>{relAdd(s,'ouest',-10);s.off.gov-=8;return R("L'Ohio est perdu sans combat. Les alliés de l'Ouest en tirent leurs conclusions.","The Ohio is lost without a fight. The western allies draw their conclusions.");}}]});

ev2({id:'william1757',place:'carillon',cond:s=>s.year>=1757&&s.war,
 title:R("Le fort William Henry","Fort William Henry"),
 text:R("Montcalm prend le fort William Henry. Les capitulés doivent partir avec les honneurs, mais les guerriers alliés, à qui l'on avait promis du butin, se sentent volés.",
        "Montcalm takes Fort William Henry. The garrison is to leave with honours, but the allied warriors, who were promised plunder, feel robbed."),
 choices:[
  {label:R("Laisser faire les alliés","Let the allies be"),hist:true,fx:s=>{relAdd(s,'ouest',4);traitAdd(s,'alliance',-2);s.compagnie-=3;return R("Des prisonniers anglais sont tués ou emmenés. Les colonies anglaises jurent vengeance ; beaucoup d'alliés rapportent aussi la variole chez eux.","English prisoners are killed or carried off. The English colonies swear revenge; many allies also carry smallpox home.");}},
  {label:R("Protéger les prisonniers, payer les alliés autrement","Protect the prisoners, pay the allies otherwise"),fx:s=>{relAdd(s,'ouest',-6);s.treasury-=2000;traitAdd(s,'roi',2);return R("La capitulation est respectée. Les guerriers repartent fâchés, avec des présents.","The capitulation is respected. The warriors leave angry, with gifts.");}}]});

ev2({id:'famine1757',place:'quebec',cond:s=>s.year>=1757&&s.war,
 title:R("Le pays a faim","The country is hungry"),
 text:R("Deux mauvaises récoltes, les hommes à l'armée, la flotte anglaise dans le golfe : le pain manque. L'intendant Bigot et ses associés vendent les vivres du Roi à prix d'or.",
        "Two bad harvests, the men in the army, the English fleet in the gulf: bread runs short. Intendant Bigot and his associates sell the King's provisions at a premium."),
 choices:[
  {label:R("Rationner : pain et viande de cheval","Ration: bread and horsemeat"),hist:true,fx:s=>{s.food+=s.pop*.3;s.pop-=Math.round(s.pop*.008);traitAdd(s,'roi',-4);s.off.int+=4;return R("On mange du cheval à Québec. Les Canadiens grondent contre la « Friponne », le magasin de Bigot.","Horsemeat is eaten in Québec. Canadians grumble at the 'Friponne', Bigot's warehouse.");}},
  {label:R("Faire saisir les magasins de la Grande Société","Seize the Grande Société's warehouses"),fx:s=>{s.food+=s.pop*.5;s.off.int-=25;traitAdd(s,'roi',2);s.autonomy+=4;return R("Les greniers secrets sont ouverts. Bigot écrit à Versailles que le pays est en révolte.","The secret granaries are opened. Bigot writes to Versailles that the country is in revolt.");}}]});

ev2({id:'louisbourg1758',place:'louisbourg',cond:s=>s.year>=1758&&s.war&&s.places.louisbourg,
 title:R("Louisbourg, deuxième siège","Louisbourg, second siege"),
 text:R("Amherst et Wolfe débarquent avec 13 000 hommes et 150 navires. La porte du Saint-Laurent est en jeu.",
        "Amherst and Wolfe land with 13,000 men and 150 ships. The gateway to the St. Lawrence is at stake."),
 choices:[
  {label:R("Tenir le plus longtemps possible","Hold out as long as possible"),hist:true,fx:s=>{s.places.louisbourg=false;s.flags.lbg58=true;s.defense+=3;return R("Louisbourg tient sept semaines, assez pour retarder Québec d'un an. Puis elle capitule ; ses murs seront rasés.","Louisbourg holds seven weeks, enough to delay Québec by a year. Then it capitulates; its walls will be razed.");}},
  {label:R("Évacuer la garnison vers Québec","Evacuate the garrison to Québec"),fx:s=>{s.places.louisbourg=false;s.flags.lbg58=true;s.defense+=10;s.flags.early59=true;return R("Québec gagne des soldats ; les Anglais gagnent un an.","Québec gains soldiers; the English gain a year.");}}]});

ev2({id:'carillon1758',place:'carillon',cond:s=>s.year>=1758&&s.war,
 title:R("Carillon","Carillon"),
 text:R("Abercromby attaque le fort Carillon avec 15 000 hommes. Montcalm n'en a que 3 600, derrière un abattis d'arbres.",
        "Abercromby attacks Fort Carillon with 15,000 men. Montcalm has only 3,600, behind a barrier of felled trees."),
 choices:[{label:R("Tenir l'abattis","Hold the abatis"),hist:true,fx:s=>{s.places.carillon=true;traitAdd(s,'roi',3);s.defense+=4;return R("Les vagues d'assaut se brisent sur les branches. C'est la dernière grande victoire française en Amérique.","The waves of assault break on the branches. It is the last great French victory in America.");}}]});

/* force de la colonie face à l'invasion */
function colonyPower(s){const allies=['innu','alg','abenaki','ouest'].map(k=>Math.max(0,s.rel[k])).reduce((a,b)=>a+b,0)/4;
  return Math.min(s.defense,60)+s.pop/2500+allies/4+s.traits.roi/8+(s.flags.milice?6:0)+(s.flags.lbg58&&!s.flags.early59?4:0)+(s.compagnie-50)/5;}
function quebecFallP(s){return clamp(.97-(colonyPower(s)-120)/200,.45,.98);}
ev2({id:'quebec1759',must:true,place:'quebec',cond:s=>s.year>=1759,
 title:R("Le siège de Québec","The siege of Québec"),
 text:s=>({fr:`Wolfe remonte le fleuve avec 9 000 soldats et 200 navires. Québec est bombardée tout l'été. Le 13 septembre, ses troupes escaladent la falaise de l'Anse-au-Foulon et se rangent sur les plaines d'Abraham. Montcalm doit choisir. (Force de la colonie : ${Math.round(colonyPower(s))} ; colonies anglaises : ${nf(s.eng,'fr')} habitants.)`,
                 en:`Wolfe comes up the river with 9,000 soldiers and 200 ships. Québec is shelled all summer. On 13 September his troops scale the cliff at the Anse-au-Foulon and form up on the Plains of Abraham. Montcalm must choose. (Colony strength: ${Math.round(colonyPower(s))}; English colonies: ${nf(s.eng,'en')} inhabitants.)`}),
 choices:[
  {label:R("Sortir livrer bataille sur les plaines","Go out to fight on the Plains"),hist:true,fx:s=>{if(Math.random()<quebecFallP(s)){s.flags.quebecFell=true;s.pop-=600;s.cleared-=600;s.defense*=.5;traitAdd(s,'roi',-6);return R("La bataille dure moins d'une demi-heure. Wolfe et Montcalm sont mortellement blessés. Québec capitule cinq jours plus tard.","The battle lasts less than half an hour. Wolfe and Montcalm are both mortally wounded. Québec capitulates five days later.");}
    s.flags.quebecHeld=true;traitAdd(s,'roi',4);return R("La ligne anglaise plie sous le feu des miliciens embusqués. Wolfe meurt, son armée rembarque avant les glaces.","The English line bends under the fire of militiamen in cover. Wolfe dies, his army re-embarks before the ice.");}},
  {label:R("Tenir les murs et attendre l'hiver","Hold the walls and wait for winter"),fx:s=>{if(Math.random()<quebecFallP(s)-.05){s.flags.quebecFell=true;s.pop-=400;s.cleared-=500;traitAdd(s,'roi',-4);return R("Affamée et bombardée, la ville se rend avant que les glaces ne chassent la flotte.","Starving and shelled, the town surrenders before the ice can drive off the fleet.");}s.flags.quebecHeld=true;return R("Wolfe attend Montcalm qui ne sort pas. Les glaces approchent : la flotte doit partir.","Wolfe waits for Montcalm, who does not come out. The ice is coming: the fleet must leave.");}},
  {label:R("La petite guerre : harceler avec la milice et les alliés","The 'petite guerre': harry with the militia and allies"),fx:s=>{const p=quebecFallP(s)-(s.rel.ouest>30?.06:.02)-(s.traits.aventure-50)/800;if(Math.random()<p){s.flags.quebecFell=true;s.pop-=500;s.cleared-=500;return R("Les miliciens font payer chaque pas aux Anglais, mais la ville tombe quand même.","The militiamen make the English pay for every step, but the town falls all the same.");}s.flags.quebecHeld=true;traitAdd(s,'aventure',3);return R("Harcelés, malades, les Anglais ne tiennent pas l'hiver : ils rembarquent.","Harried and sick, the English cannot last the winter: they re-embark.");}}]});

ev2({id:'montreal1760',must:true,place:'villeMarie',cond:s=>s.year>=1760&&s.flags.quebecFell,
 title:R("La capitulation de Montréal","The capitulation of Montréal"),
 text:R("Lévis a gagné la bataille de Sainte-Foy au printemps, mais c'est une flotte anglaise qui est arrivée la première. Trois armées convergent sur Montréal : 17 000 hommes contre 2 000. Vaudreuil négocie.",
        "Lévis won the battle of Sainte-Foy in the spring, but it was an English fleet that arrived first. Three armies converge on Montréal: 17,000 men against 2,000. Vaudreuil negotiates."),
 choices:[
  {label:R("Capituler en protégeant les Canadiens","Capitulate while protecting the Canadians"),hist:true,fx:s=>{s.ending='conquest';return R("Les 55 articles garantissent les biens, la religion catholique et les communautés religieuses. Les troupes rentrent en France ; les Canadiens restent.","The 55 articles guarantee property, the Catholic religion and the religious communities. The troops go home to France; the Canadians stay.");}},
  {label:R("Exiger les honneurs de la guerre, comme le veut Lévis","Demand the honours of war, as Lévis wishes"),fx:s=>{s.ending='conquest';traitAdd(s,'roi',3);s.compagnie-=5;return R("Amherst refuse. Lévis brûle ses drapeaux sur l'île Sainte-Hélène plutôt que de les rendre. La capitulation est signée quand même.","Amherst refuses. Lévis burns his colours on Île Sainte-Hélène rather than surrender them. The capitulation is signed anyway.");}},
  {label:R("Se battre jusqu'au bout","Fight to the end"),fx:s=>{s.ending='conquestHard';s.pop-=1500;s.cleared-=2000;traitAdd(s,'roi',-5);return R("Montréal est prise d'assaut. Les conditions seront celles du vainqueur.","Montréal is taken by storm. The terms will be the victor's.");}}]});
LIKELY_P2.montreal1760=s=>.95;

ev2({id:'paix1760',must:true,place:'quebec',cond:s=>s.year>=1760&&s.flags.quebecHeld,
 title:R("Le Canada tient","Canada holds"),
 text:R("Québec n'est pas tombée. Les armées anglaises s'épuisent sur les frontières, et en Europe on commence à parler de paix. La colonie a survécu à la guerre qui devait l'emporter.",
        "Québec did not fall. The English armies wear themselves out on the frontiers, and in Europe there is talk of peace. The colony has survived the war that was meant to sweep it away."),
 choices:[{label:R("Attendre la paix","Await the peace"),hist:true,fx:s=>{s.ending='epilogue';return R("Le Canada reste français, pour un temps. L'histoire, ici, prend un autre chemin.","Canada stays French, for a time. History, here, takes another road.");}}]});

/* ================= imprévus et arcs (période II) ================= */
ev2({id:'p2_epid',sys:true,cool:12,max:4,place:'quebec',cond:s=>s.pop>4000,
 title:R("Fièvre au port","Fever at the port"),
 text:R("Un navire du Roi arrive avec des soldats malades : typhus ou petite vérole, on ne sait pas encore.","A King's ship arrives with sick soldiers: typhus or smallpox, no one knows yet."),
 choices:[
  {label:R("Quarantaine à la Pointe-Lévy","Quarantine at Pointe-Lévy"),fx:s=>{s.mods.epid=.006;s.treasury-=600;return R("La quarantaine coûte, mais la maladie reste confinée.","The quarantine is costly, but the disease stays confined.");}},
  {label:R("Débarquer tout le monde : on a besoin de bras","Land everyone: hands are needed"),fx:s=>{s.mods.epid=.018;s.pop+=40;return R("Les soldats aident aux récoltes, et la fièvre se répand dans les paroisses.","The soldiers help with the harvest, and the fever spreads through the parishes.");}}]});

ev2({id:'p2_harvest',sys:true,cool:6,max:6,place:'quebec',cond:s=>true,
 title:R("Les blés gèlent","The wheat freezes"),
 text:R("Un gel précoce en août a ruiné une partie des blés.","An early frost in August has ruined part of the wheat."),
 choices:[
  {label:R("Acheter du blé en France","Buy wheat from France"),fx:s=>{s.treasury-=Math.round(s.pop*.25);s.food+=s.pop*.25;return R("Le blé arrive tard, et cher.","The wheat arrives late, and dear.");}},
  {label:R("Fixer le prix du pain","Fix the price of bread"),fx:s=>{s.mods.harvest=.8;s.off.int+=3;traitAdd(s,'entraide',1);return R("L'intendant taxe le pain. Les boulangers grognent, personne ne meurt de faim.","The intendant fixes the bread price. Bakers grumble, no one starves.");}},
  {label:R("Laisser le marché faire","Let the market be"),fx:s=>{s.mods.harvest=.72;s.compagnie+=1;return R("Le prix du pain double. Les pauvres de Québec font la queue à l'Hôpital général.","The price of bread doubles. The poor of Québec queue at the Hôpital général.");}}]});

ev2({id:'p2_cdb',sys:true,cool:8,max:4,place:'villeMarie',cond:s=>s.year>=1675,
 title:R("Les coureurs de bois","The coureurs de bois"),
 text:R("Des centaines de jeunes hommes sont partis dans l'Ouest sans congé. Ils reviennent chargés de fourrures, ou ne reviennent pas.","Hundreds of young men have gone west without licence. They come back laden with furs, or not at all."),
 choices:[
  {label:R("Une amnistie : qu'ils rentrent","An amnesty: let them come home"),fx:s=>{s.pop+=80;s.mods.fur*=1.1;traitAdd(s,'aventure',1);s.off.int-=4;return R("Ils rentrent avec leurs ballots. Certains épousent des femmes de l'Ouest et y retourneront.","They come home with their bundles. Some have married women of the West and will go back.");}},
  {label:R("Les punir pour l'exemple","Punish them as an example"),fx:s=>{s.mods.fur*=.9;traitAdd(s,'aventure',-2);s.off.int+=5;relAdd(s,'ouest',-3);return R("Quelques-uns aux galères. Les autres restent dans l'Ouest, pour de bon.","A few to the galleys. The others stay in the West, for good.");}}]});

ev2({id:'p2_quarrel',sys:true,cool:5,max:6,place:'quebec',cond:s=>hasFeud(s),
 title:R("Querelle de préséance","A quarrel of precedence"),
 text:s=>{const k=['gov','int','eve'].sort((a,b)=>s.off[a]-s.off[b])[0];const o=officer(s,k);return {fr:`${o.name} (${OFF_LAB[k].fr.toLowerCase()}) vous accuse de le contrarier et menace d'écrire au ministre.`,en:`${o.name} (${OFF_LAB[k].en.toLowerCase()}) accuses you of thwarting him and threatens to write to the minister.`};},
 choices:[
  {label:R("Le ménager : une concession","Humour him: a concession"),fx:s=>{const k=['gov','int','eve'].sort((a,b)=>s.off[a]-s.off[b])[0];s.off[k]+=25;s.treasury-=800;return R("Une lettre aimable, un présent, une place au banc d'honneur. La querelle s'apaise.","A friendly letter, a gift, a seat on the bench of honour. The quarrel subsides.");}},
  {label:R("Laisser Versailles trancher","Let Versailles decide"),fx:s=>{const k=['gov','int','eve'].sort((a,b)=>s.off[a]-s.off[b])[0];s.compagnie-=5;s.off[k]+=8;return R("Les lettres traversent l'océan. Versailles blâme tout le monde.","The letters cross the ocean. Versailles blames everyone.");}}]});

ev2({id:'p2_captifs',sys:true,cool:10,max:3,place:'villeMarie',cond:s=>!!s.war,
 title:R("Les captifs de Nouvelle-Angleterre","Captives from New England"),
 text:R("Des partis canadiens et abénakis ramènent des captifs anglais, dont des enfants. Certaines familles veulent les adopter ; Boston offre une rançon.","Canadian and Abenaki raiding parties bring back English captives, children among them. Some families want to adopt them; Boston offers a ransom."),
 choices:[
  {label:R("Permettre les adoptions et les baptêmes","Allow adoptions and baptisms"),fx:s=>{s.pop+=40;traitAdd(s,'ouverture',3);traitAdd(s,'ferveur',1);return R("Des enfants de Deerfield grandiront canadiens et catholiques. Certains ne voudront jamais repartir.","Children from Deerfield will grow up Canadian and Catholic. Some will never want to leave.");}},
  {label:R("Les échanger contre rançon","Exchange them for ransom"),fx:s=>{s.treasury+=1200;relAdd(s,'abenaki',-3);return R("Les captifs repartent vers Boston. Les Abénakis trouvent qu'on a vendu leur part.","The captives go back to Boston. The Abenaki feel their share was sold.");}}]});

ev2({id:'p2_domicilies',sys:true,cool:20,max:1,place:'kahnawake',cond:s=>s.year>=1668&&s.rel.agnier>-20,
 title:R("Kahnawake","Kahnawake"),
 text:R("Des familles agnières converties s'installent près de Montréal, au Sault-Saint-Louis, avec des jésuites. On les appelle les « domiciliés ».","Converted Mohawk families settle near Montréal, at the Sault-Saint-Louis, with Jesuits. They are called the 'domiciliés'."),
 choices:[
  {label:R("Leur donner une seigneurie","Grant them a seigneury"),fx:s=>{s.places.kahnawake=true;relAdd(s,'agnier',8);traitAdd(s,'alliance',3);s.defense+=4;return R("Kahnawake devient un allié précieux… et une plaque tournante de la contrebande avec Albany.","Kahnawake becomes a precious ally… and a hub of smuggling with Albany.");}},
  {label:R("Les envoyer dans une mission éloignée","Send them to a distant mission"),fx:s=>{relAdd(s,'agnier',-4);s.off.eve+=4;return R("Ils partent, et beaucoup retournent dans la vallée de la Mohawk.","They leave, and many return to the Mohawk valley.");}}]});

ev2({id:'p2_huguenots',sys:true,cool:30,max:1,place:'quebec',cond:s=>s.year>=1685,
 title:R("Des marchands protestants","Protestant merchants"),
 text:R("Depuis la révocation de l'édit de Nantes, des marchands huguenots de La Rochelle cherchent où aller. Certains demandent à s'établir à Québec.","Since the revocation of the Edict of Nantes, Huguenot merchants from La Rochelle are looking for somewhere to go. Some ask to settle in Québec."),
 choices:[
  {label:R("Les accueillir discrètement","Welcome them quietly"),fx:s=>{s.pop+=120;s.treasury+=1500;s.flags.huguenotsP2=true;traitAdd(s,'ouverture',8);s.off.eve-=18;return R("Ils prospèrent, commercent avec les Antilles, et ne vont pas à la messe. L'évêque se plaint chaque année.","They prosper, trade with the West Indies, and skip Mass. The bishop complains every year.");}},
  {label:R("Refuser, comme le veut la loi","Refuse, as the law requires"),fx:s=>{s.off.eve+=6;traitAdd(s,'ouverture',-2);return R("Ils partent pour New York ou Charleston, avec leurs capitaux.","They leave for New York or Charleston, with their capital.");}}]});

ev2({id:'p2_seminaire',sys:true,cool:30,max:1,place:'quebec',cond:s=>s.year>=1663,
 title:R("Le Séminaire et les écoles","The Seminary and the schools"),
 text:R("L'évêque veut former un clergé né au pays et ouvrir des petites écoles dans les paroisses.","The bishop wants to train a Canadian-born clergy and open little schools in the parishes."),
 choices:[
  {label:R("Financer les écoles de paroisse","Fund the parish schools"),fx:s=>{s.treasury-=1500;s.church+=6;s.off.eve+=10;traitAdd(s,'ferveur',2);s.flags.ecoles=true;return R("Les Sœurs de la Congrégation de Marguerite Bourgeoys enseignent jusque dans les côtes.","The sisters of Marguerite Bourgeoys's Congregation teach even in the countryside.");}},
  {label:R("Un séminaire à Québec, sans plus","A seminary in Québec, no more"),fx:s=>{s.church+=3;s.off.eve+=4;return R("Le Séminaire forme des prêtres ; les campagnes restent sans école.","The Seminary trains priests; the countryside stays without schools.");}}]});

EVENTS.push(...P2E);for(const e of P2E)EV[e.id]=e;
Object.assign(LIKELY,LIKELY_P2);
Object.assign(DIVERGE,{
 carignan1665:R("Dans l'histoire, le régiment de Carignan-Salières arrive en 1665 pour combattre les Agniers. Ici, la paix rend son envoi inutile.","In history, the Carignan-Salières regiment arrived in 1665 to fight the Mohawk. Here, peace makes it unnecessary."),
 tracy1666:R("Dans l'histoire, Tracy brûle les villages agniers en 1666. Ici, vous êtes déjà en paix avec les Agniers.","In history, Tracy burned the Mohawk villages in 1666. Here, you are already at peace with the Mohawk."),
 frontenac1673:R("Dans l'histoire, Frontenac bâtit un fort à Cataracoui en 1673. Ici, la guerre avec les Haudenosaunee le rend impossible.","In history, Frontenac built a fort at Cataraqui in 1673. Here, the war with the Haudenosaunee makes it impossible."),
 lachine1689:R("Dans l'histoire, les Haudenosaunee frappent Lachine en 1689. Ici, la paix tient : il n'y a pas de massacre.","In history, the Haudenosaunee struck Lachine in 1689. Here, the peace holds: there is no massacre."),
 grandepaix1701:R("Dans l'histoire, 39 nations signent la Grande Paix à Montréal en 1701. Ici, les rancunes sont trop vives : la guerre continue à l'ouest.","In history, 39 nations signed the Great Peace at Montréal in 1701. Here, the grudges run too deep: war goes on in the west."),
 renards1730:R("Dans l'histoire, les Renards sont presque exterminés en 1730. Ici, la guerre s'éteint d'elle-même.","In history, the Fox were nearly destroyed in 1730. Here, the war dies out on its own."),
 louisbourg1745:R("Dans l'histoire, Louisbourg tombe en 1745. Ici, les Bostonnais n'osent pas attaquer une place si bien gardée.","In history, Louisbourg fell in 1745. Here, the Bostonians dare not attack so well-guarded a place."),
 acadie1755:R("Dans l'histoire, les Acadiens sont déportés en 1755. Ici, Lawrence recule devant l'ordre.","In history, the Acadians were deported in 1755. Here, Lawrence backs away from the order."),
 montreal1760:R("Dans l'histoire, Montréal capitule en 1760. Ici, les armées anglaises tardent : la colonie tient un an de plus.","In history, Montréal capitulated in 1760. Here, the English armies are slow: the colony holds another year.")});
