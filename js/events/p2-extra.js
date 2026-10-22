/* Kebec — Période II : quelques événements de plus, réels ou plausibles. */
(()=>{
const hist=e=>{e.period=2;EVENTS.push(e);EV[e.id]=e;};
const cq=e=>{e.period=2;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||10;EVENTS.push(e);EV[e.id]=e;};

hist({id:'incendie1682',place:'quebec',cond:s=>s.year>=1682,
 title:R("La basse-ville brûle","The lower town burns"),
 text:R("Dans la nuit du 4 août 1682, un incendie détruit presque toute la basse-ville de Québec : magasins, maisons, entrepôts de fourrures.","On the night of 4 August 1682, a fire destroys almost all of Québec's lower town: shops, houses, fur warehouses."),
 choices:[
  {label:R("Rebâtir en pierre, autour d'une place","Rebuild in stone, around a square"),hist:true,fx:s=>{s.treasury-=1200;s.off.int+=4;return R("La place Royale naît des cendres, avec ses maisons de pierre et ses murs coupe-feu.","Place Royale rises from the ashes, with its stone houses and firewalls.");}},
  {label:R("Rebâtir vite, en bois","Rebuild quickly, in wood"),fx:s=>{s.treasury-=400;s.mods.fur*=.9;return R("La basse-ville renaît en quelques mois. Elle brûlera encore.","The lower town is back within months. It will burn again.");}}]});

cq({id:'cq_hopital',place:'quebec',cond:s=>s.year>=1690&&s.church>=60,w:s=>1+(s.church-55)/10,
 because:s=>R("L'Église est forte et les guerres ont fait des pauvres et des invalides.","The Church is strong and the wars have made paupers and invalids."),
 title:R("L'Hôpital général","The Hôpital général"),
 text:R("L'évêque Saint-Vallier veut fonder un Hôpital général pour les pauvres, les vieillards et les infirmes, dans l'ancien couvent des récollets.","Bishop Saint-Vallier wants to found an Hôpital général for the poor, the elderly and the infirm, in the old Recollet convent."),
 choices:[
  {label:R("L'aider","Help him"),hist:true,fx:s=>{s.treasury-=800;s.church+=4;traitAdd(s,'entraide',2);s.off.eve+=6;return R("L'Hôpital général ouvre en 1692. Il existe encore.","The Hôpital général opens in 1692. It still exists.");}},
  {label:R("Laisser les paroisses s'en charger","Leave it to the parishes"),fx:s=>{traitAdd(s,'entraide',1);return R("Les mendiants restent nombreux aux portes des églises.","Beggars remain numerous at church doors.");}}]});

cq({id:'cq_saintjoachim',place:'beaupre',cond:s=>s.year>=1668&&s.year<1700&&s.church>=55&&(s.budget.etab||0)>=25,w:s=>2,
 because:s=>R("Vous investissez dans le peuplement, et l'Église veut former des artisans.","You are investing in settlement, and the Church wants to train craftsmen."),
 title:R("L'école d'arts et métiers","The arts and crafts school"),
 text:R("Mgr de Laval ouvre à Saint-Joachim une école où de jeunes Canadiens apprennent la menuiserie, la sculpture, la maçonnerie et l'agriculture.","Bishop Laval opens a school at Saint-Joachim where young Canadiens learn joinery, sculpture, masonry and farming."),
 choices:[
  {label:R("La financer","Fund it"),fx:s=>{s.treasury-=600;s.cleared+=100;traitAdd(s,'ouverture',1);return R("Les sculpteurs de Saint-Joachim orneront les églises du pays pendant un siècle.","The Saint-Joachim sculptors will adorn the country's churches for a century.");}},
  {label:R("Les métiers s'apprennent chez le maître","Trades are learned from a master"),fx:s=>R("Les apprentis signent des contrats chez les notaires, comme en France.","Apprentices sign contracts before notaries, as in France.")}]});

cq({id:'cq_sarrazin',place:'quebec',cond:s=>s.year>=1700&&s.traits.ouverture>=35,w:s=>2,
 because:s=>R("Le pays s'ouvre aux idées et aux savants.","The country is opening up to ideas and scholars."),
 title:R("Le médecin du roi","The King's physician"),
 text:R("Michel Sarrazin, médecin et naturaliste, envoie à l'Académie des sciences de Paris des plantes, des castors disséqués et des observations. Il demande un jardin et un peu d'argent.","Michel Sarrazin, physician and naturalist, sends plants, dissected beavers and observations to the Paris Academy of Sciences. He asks for a garden and a little money."),
 choices:[
  {label:R("Lui donner son jardin","Give him his garden"),fx:s=>{s.treasury-=300;traitAdd(s,'ouverture',3);s.compagnie+=2;return R("La sarracénie, plante carnivore, portera son nom. Paris découvre la nature canadienne.","The pitcher plant Sarracenia will bear his name. Paris discovers Canadian nature.");}},
  {label:R("Il y a plus urgent","There are more urgent things"),fx:s=>R("Sarrazin continue, à ses frais.","Sarrazin carries on, at his own expense.")}]});

cq({id:'cq_petiteguerre',place:'villeMarie',cond:s=>!!s.war&&s.traits.aventure>=55,w:s=>1+(s.traits.aventure-50)/8,
 because:s=>R("Les jeunes Canadiens connaissent les bois, et c'est la guerre.","Young Canadiens know the woods, and it is wartime."),
 title:R("Des volontaires pour la petite guerre","Volunteers for the petite guerre"),
 text:R("De jeunes Canadiens, des coureurs de bois et des guerriers alliés demandent à partir en raid contre les établissements anglais de la frontière.","Young Canadiens, coureurs de bois and allied warriors ask to go raiding against the English border settlements."),
 choices:[
  {label:R("Les laisser partir","Let them go"),fx:s=>{s.defense+=4;traitAdd(s,'aventure',2);relAdd(s,'abenaki',4);s.pop-=20;return R("Les raids terrorisent la Nouvelle-Angleterre, qui jure de se venger.","The raids terrorize New England, which swears revenge.");}},
  {label:R("Les garder pour défendre la colonie","Keep them to defend the colony"),fx:s=>{s.defense+=6;return R("Ils montent la garde aux forts du Richelieu.","They stand guard at the Richelieu forts.");}}]});

cq({id:'cq_kalm',place:'quebec',cond:s=>s.year>=1749&&s.year<1755,w:s=>2,
 because:s=>R("La paix d'Aix-la-Chapelle permet aux savants de voyager.","The Peace of Aix-la-Chapelle lets scholars travel."),
 title:R("Le voyageur suédois","The Swedish traveller"),
 text:R("Le naturaliste Pehr Kalm, élève de Linné, visite le Canada. Il trouve les Canadiennes coquettes, les paysans polis, et s'étonne que tant de gens sachent prier en latin sans savoir lire.","The naturalist Pehr Kalm, Linnaeus's student, visits Canada. He finds Canadien women stylish, the farmers courteous, and is astonished that so many can pray in Latin without being able to read."),
 choices:[
  {label:R("Lui ouvrir toutes les portes","Open every door to him"),fx:s=>{traitAdd(s,'ouverture',2);s.compagnie+=1;return R("Son récit fera connaître le Canada à toute l'Europe savante.","His account will make Canada known to all of learned Europe.");}},
  {label:R("Se méfier d'un protestant","Distrust a Protestant"),fx:s=>{s.off.eve+=2;return R("Il voit moins, mais écrit quand même.","He sees less, but writes anyway.");}}]});

cq({id:'cq_brandywar',place:'michilimakinac',cond:s=>s.year>=1680&&s.orient.brandy==='toleree'&&s.rel.ouest>=0,w:s=>2,
 because:s=>R("L'eau-de-vie circule librement dans la traite.","Brandy flows freely in the trade."),
 title:R("Les ravages de l'eau-de-vie","The ravages of brandy"),
 text:R("Au poste de Michilimakinac, des chefs se plaignent : l'eau-de-vie tue leurs jeunes gens et ruine les familles. Ils demandent qu'on cesse d'en vendre, ou qu'on la réserve aux fêtes.","At the Michilimackinac post, chiefs complain: brandy is killing their young men and ruining families. They ask that its sale stop, or be kept for feasts."),
 choices:[
  {label:R("Interdire la vente au poste","Ban the sale at the post"),fx:s=>{relAdd(s,'ouest',6);s.mods.fur*=.9;s.off.eve+=6;traitAdd(s,'alliance',2);return R("Les chefs remercient Onontio. Les Anglais d'Albany, eux, en vendent toujours.","The chiefs thank Onontio. The English at Albany still sell it.");}},
  {label:R("C'est la traite","That is the trade"),fx:s=>{relAdd(s,'ouest',-5);traitAdd(s,'alliance',-2);return R("Les missionnaires dénoncent les traiteurs. Les familles se défont.","The missionaries denounce the traders. Families fall apart.");}}]});

cq({id:'cq_veuves',place:'troisRivieres',cond:s=>s.year>=1690&&!!s.war,w:s=>1.5,
 because:s=>R("La guerre fait des veuves dans toutes les paroisses.","The war is making widows in every parish."),
 title:R("Les veuves de guerre","The war widows"),
 text:R("Des dizaines de femmes ont perdu leur mari dans les raids et les campagnes. Certaines tiennent seules la ferme ; d'autres n'ont plus rien.","Dozens of women have lost their husbands in raids and campaigns. Some run the farm alone; others have nothing left."),
 choices:[
  {label:R("Une pension du Roi","A pension from the King"),fx:s=>{s.treasury-=700;traitAdd(s,'roi',2);s.women+=10;return R("Les veuves reçoivent une rente. Beaucoup se remarient avec des soldats démobilisés.","The widows receive an annuity. Many remarry demobilized soldiers.");}},
  {label:R("Que les paroisses les aident","Let the parishes help them"),fx:s=>{traitAdd(s,'entraide',3);return R("Les voisins font les récoltes, la fabrique paie le bois de chauffage.","Neighbours bring in the harvest, the fabrique pays for firewood.");}}]});
Object.assign(EVENT_IMG,{incendie1682:'quebec1760',cq_hopital:'marie',cq_saintjoachim:'habitant_farm',cq_sarrazin:'relations',cq_petiteguerre:'deerfield',cq_kalm:'quebec1760',cq_brandywar:'canoefog',cq_veuves:'winter'});
})();
