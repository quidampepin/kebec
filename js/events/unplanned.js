/* Onontio — Imprévus : tirés selon l'état de la colonie, rares. */
/* ---- systemic events: drawn by the colony's state, can recur ---- */
EVENTS.push(
{id:'sys_brandy',sys:true,cool:4,place:'tadoussac',cond:s=>s.year>=1615&&!s.flags.laval,
 title:R("L'eau-de-vie","Brandy"),
 text:R("Un marchand propose de payer les fourrures en eau-de-vie. Les chasseurs en redemandent ; les missionnaires parlent de rixes et de morts dans les campements.",
        "A merchant offers to pay for furs in brandy. The hunters want more; the missionaries speak of brawls and deaths in the camps."),
 choices:[
  {label:R("Laisser faire","Allow it"),desc:R("plus de fourrures, alliés et Église mécontents","more furs, allies and Church unhappy"),fx:s=>{s.mods.fur*=1.2;s.rAlg-=3;s.church-=6;return R("Les barils montent, les paquets descendent.","Kegs go up, packs come down.");}},
  {label:R("Interdire la traite de l'eau-de-vie","Ban the brandy trade"),fx:s=>{s.church+=3;s.compagnie-=2;return R("Les marchands grognent et trouvent d'autres chemins.","The merchants grumble and find other routes.");}}
 ]},
{id:'sys_basques',sys:true,cool:3,place:'tadoussac',cond:s=>s.year<1645,
 title:R("Des interlopes à Tadoussac","Interlopers at Tadoussac"),
 text:R("Des navires basques et rochelais traitent sans permission à Tadoussac. Ils paient mieux que la Compagnie, et vendent des armes.",
        "Basque and La Rochelle ships are trading without permission at Tadoussac. They pay better than the Company, and sell weapons."),
 choices:[
  {label:R("Les chasser","Drive them off"),desc:R("la Compagnie apprécie, quelques hommes mobilisés","the Company approves, a few men tied up"),fx:s=>{s.compagnie+=5;s.defense-=3;return R("Une barque armée descend à Tadoussac. Les interlopes lèvent l'ancre.","An armed boat goes down to Tadoussac. The interlopers weigh anchor.");}},
  {label:R("Leur imposer une taxe","Make them pay a tax"),desc:R("+250 livres, la Compagnie grince","+250 livres, the Company grumbles"),fx:s=>{s.treasury+=250;s.compagnie-=4;return R("Ils paient, et reviendront.","They pay, and they'll be back.");}},
  {label:R("Fermer les yeux","Look the other way"),desc:R("les Innus y gagnent","the Innu benefit"),fx:s=>{s.rAlg+=3;s.mods.fur*=.9;return R("Les Innus vendent au plus offrant.","The Innu sell to the highest bidder.");}}
 ]},
{id:'sys_coureurs',sys:true,cool:5,place:'villeMarie',cond:s=>s.pop>60,
 title:R("Les coureurs des bois","The coureurs des bois"),
 text:R("Des jeunes hommes partent sans permis traiter dans les bois. Ils reviennent riches, ou pas du tout.",
        "Young men slip away without a licence to trade in the woods. They come back rich, or not at all."),
 choices:[
  {label:R("Les punir pour l'exemple","Punish them as an example"),desc:R("la colonie garde ses bras","the colony keeps its hands"),fx:s=>{s.autonomy-=3;return R("Deux coureurs au carcan. Les autres se font plus discrets.","Two coureurs in the stocks. The others get more discreet.");}},
  {label:R("Fermer les yeux","Look the other way"),desc:R("moins d'habitants, plus de fourrures et de liens","fewer settlers, more furs and ties"),fx:s=>{s.pop-=Math.max(2,Math.round(s.pop*.02));s.mods.fur*=1.1;s.rAlg+=2;return R("Ils apprennent les langues et les rivières. Certains ne reviendront jamais.","They learn the languages and the rivers. Some will never come back.");}},
  {label:R("Vendre des congés de traite","Sell trading licences"),desc:R("+300 livres, la Compagnie n'aime pas","+300 livres, the Company dislikes it"),fx:s=>{s.treasury+=300;s.autonomy+=3;s.compagnie-=4;s.pop-=1;return R("Le commerce sauvage devient un revenu.","Wild trade becomes revenue.");}}
 ]},
{id:'sys_feast',sys:true,cool:8,place:'huronia',cond:s=>s.year>=1615&&!s.wenFallen,
 title:R("La fête des Morts","The Feast of the Dead"),
 text:R("Les Wendats célèbrent la fête des Morts : les ossements des défunts sont réunis dans une fosse commune, avec des présents. Vous êtes invité.",
        "The Wendat are holding the Feast of the Dead: the bones of the departed are gathered in a common pit, with gifts. You are invited."),
 choices:[
  {label:R("Y aller avec de riches présents (300 livres)","Attend with rich gifts (300 livres)"),fx:s=>{s.treasury-=300;s.rWen+=8;return R("Vos présents descendent dans la fosse avec les morts. Les Wendats vous comptent parmi les leurs.","Your gifts go into the pit with the dead. The Wendat count you as one of their own.");}},
  {label:R("Envoyer un missionnaire","Send a missionary"),fx:s=>{s.rWen+=1;s.church+=3;return R("Le père observe, prend des notes pour les Relations, et désapprouve.","The priest watches, takes notes for the Relations, and disapproves.");}},
  {label:R("Décliner","Decline"),fx:s=>{s.rWen-=5;return R("Votre absence est remarquée.","Your absence is noticed.");}}
 ]},
{id:'sys_fire',sys:true,cool:10,place:'quebec',cond:s=>s.pop>40,
 title:R("Incendie à la basse-ville","Fire in the lower town"),
 text:R("Un feu de cheminée a gagné les magasins. Une partie des marchandises et des vivres est perdue.",
        "A chimney fire has spread to the storehouses. Part of the goods and provisions are lost."),
 choices:[
  {label:R("Rebâtir en pierre (700 livres)","Rebuild in stone (700 livres)"),fx:s=>{s.food*=.85;s.treasury-=700;s.defense+=4;return R("Des murs de pierre, enfin. Ils tiendront aussi contre les flèches.","Stone walls at last. They'll stand against arrows too.");}},
  {label:R("Rebâtir en bois (200 livres)","Rebuild in wood (200 livres)"),fx:s=>{s.food*=.85;s.treasury-=200;return R("On rebâtit vite, et pareil.","Rebuilt quickly, and just the same.");}}
 ]},
{id:'sys_harvest',sys:true,cool:5,place:'quebec',cond:s=>s.season===1&&s.cleared>8,
 title:R("Mauvaise saison","A bad season"),
 text:R("Gel tardif, puis des chenilles dans les blés. La récolte d'automne s'annonce maigre.",
        "A late frost, then caterpillars in the wheat. The autumn harvest looks thin."),
 choices:[
  {label:R("Acheter du grain aux navires (400 livres)","Buy grain from the ships (400 livres)"),fx:s=>{s.treasury-=400;s.mods.harvest*=.8;return R("Les capitaines vendent cher, mais ils vendent.","The captains sell dear, but they sell.");}},
  {label:R("Demander du maïs aux Wendats","Ask the Wendat for corn"),fx:s=>{s.mods.harvest*=.55;if(!s.wenFallen&&s.rWen>=50){s.food+=s.pop*.3;s.rWen-=3;return R("Des sacs de maïs descendent avec les canots.","Sacks of corn come down with the canoes.");}return R("Les Wendats n'ont rien à donner cette année.","The Wendat have nothing to spare this year.");}},
  {label:R("Se serrer la ceinture","Tighten belts"),fx:s=>{s.mods.harvest*=.55;return R("Il faudra tenir.","You will have to hold out.");}}
 ]},
{id:'sys_pursuit',sys:true,cool:3,place:'troisRivieres',cond:s=>s.haud>50&&!s.flags.peace&&s.pop>30,
 title:R("Poursuivre le parti de guerre","Pursue the war party"),
 text:R("Un chef algonquin vous demande des soldats pour rattraper un parti haudenosaunee qui a enlevé des femmes près des Trois-Rivières.",
        "An Algonquin chief asks for soldiers to catch a Haudenosaunee party that carried off women near Trois-Rivières."),
 choices:[
  {label:R("Envoyer des hommes","Send men"),fx:s=>{s.rAlg+=6;s.haud+=3;if(Math.random()<.35){const d=2+Math.round(Math.random()*3);s.pop-=d;return {fr:`Embuscade dans les rapides : ${d} morts. Mais les alliés ont vu que vous veniez.`,en:`Ambush in the rapids: ${d} dead. But the allies saw that you came.`};}return R("Les captives sont ramenées. On vous chante dans les campements.","The captives are brought back. Your name is sung in the camps.");}},
  {label:R("Garder les hommes derrière les palissades","Keep the men behind the palisades"),fx:s=>{s.rAlg-=6;return R("Le chef repart seul, en silence.","The chief leaves alone, in silence.");}}
 ]},
{id:'sys_captives',sys:true,cool:6,place:'quebec',cond:s=>s.haud>40&&s.orient.all==='armee',
 title:R("Les prisonniers","The prisoners"),
 text:R("Vos alliés reviennent de guerre avec des prisonniers haudenosaunee, qu'ils comptent adopter ou supplicier selon leurs coutumes.",
        "Your allies return from war with Haudenosaunee prisoners, whom they intend to adopt or torture according to their customs."),
 choices:[
  {label:R("Racheter les prisonniers (250 livres)","Ransom the prisoners (250 livres)"),desc:R("une porte vers la paix","a door towards peace"),fx:s=>{s.treasury-=250;s.haud-=6;s.rAlg-=3;return R("Vous renvoyez les prisonniers chez eux. Un geste qui sera rappelé dans les conseils, des deux côtés.","You send the prisoners home. A gesture that will be recalled in councils on both sides.");}},
  {label:R("Ne pas s'en mêler","Stay out of it"),fx:s=>{s.haud+=3;return R("Ce sont leurs guerres, et leurs lois.","Their wars, their laws.");}}
 ]},
{id:'sys_relations',sys:true,cool:6,place:'quebec',cond:s=>s.year>=1632&&s.missions>=15,
 title:R("Les Relations des Jésuites","The Jesuit Relations"),
 text:R("Les Relations publiées à Paris émeuvent les dévots. Des dons arrivent avec les navires.",
        "The Relations published in Paris move pious readers. Donations arrive with the ships."),
 choices:[
  {label:R("Financer des familles de colons","Fund settler families"),fx:s=>{s.pendingSettlers+=14;s.pendingWomen+=6;s.families=true;return R("Des familles pieuses s'embarqueront au printemps.","Devout families will sail in spring.");}},
  {label:R("Financer les missions","Fund the missions"),fx:s=>{s.missions+=8;s.church+=5;return R("Les robes noires repartent vers les Pays d'en haut.","The Black Robes head back to the upper country.");}},
  {label:R("Verser au trésor","Put it in the treasury"),fx:s=>{s.treasury+=500;s.church-=3;return R("Les donateurs n'apprécieraient pas de le savoir.","The donors wouldn't like to know.");}}
 ]},
{id:'sys_shipfever',sys:true,cool:6,place:'quebec',cond:s=>s.season===0&&s.lastArrivals>=12,
 title:R("La fièvre des navires","Ship fever"),
 text:s=>({fr:`Parmi les ${s.lastArrivals} arrivants, plusieurs brûlent de fièvre. Le typhus des entreponts.`,en:`Among the ${s.lastArrivals} newcomers, several are burning with fever. Steerage typhus.`}),
 choices:[
  {label:R("Quarantaine sur une île","Quarantine on an island"),fx:s=>{s.pop-=Math.round(s.lastArrivals*.15);return R("On perd des malades, mais la fièvre ne gagne pas la ville.","Some of the sick die, but the fever doesn't reach the town.");}},
  {label:R("Les soigner à l'hôtel-Dieu","Treat them at the hospital"),fx:s=>{if(s.hospital){s.pop-=Math.round(s.lastArrivals*.05);return R("Les Augustines sauvent presque tout le monde.","The Augustinian sisters save almost everyone.");}s.pop-=Math.round(s.pop*.05);s.rAlg-=3;return R("Sans hôpital, la fièvre se répand dans la colonie, puis dans les campements.","Without a hospital, the fever spreads through the colony, then the camps.");}}
 ]},
{id:'sys_women',sys:true,cool:7,place:'quebec',cond:s=>s.year>=1634&&s.pop>50,
 title:R("Trop d'hommes seuls","Too many single men"),
 text:R("On compte six hommes pour une femme. Les célibataires repartent en France à la fin de leur engagement, ou filent dans les bois.",
        "There are six men for every woman. Bachelors go back to France when their contracts end, or slip off into the woods."),
 choices:[
  {label:R("Payer le passage de filles à marier (500 livres)","Pay passage for marriageable girls (500 livres)"),fx:s=>{s.treasury-=500;s.pendingSettlers+=15;s.pendingWomen+=15;s.families=true;return R("Les premières « filles à marier » arriveront au printemps. Les registres de mariage vont se remplir.","The first 'marriageable girls' will arrive in spring. The marriage registers will fill up.");}},
  {label:R("Laisser faire","Let it be"),fx:s=>{s.pop-=Math.round(s.pop*.02);return R("Quelques engagés de plus rembarquent.","A few more indentured men sail home.");}}
 ]},
{id:'sys_dutch',sys:true,cool:5,place:'fortOrange',cond:s=>s.places.fortOrange&&s.year>=1630,
 title:R("Des marchandises moins chères","Cheaper goods"),
 text:R("Des agents hollandais et anglais courtisent vos alliés : leurs chaudrons et leurs draps coûtent moitié moins.",
        "Dutch and English agents are courting your allies: their kettles and cloth cost half as much."),
 choices:[
  {label:R("S'aligner sur les prix (400 livres)","Match their prices (400 livres)"),fx:s=>{s.treasury-=400;s.rAlg+=2;return R("Vos marges fondent, mais les canots restent fidèles.","Your margins melt, but the canoes stay loyal.");}},
  {label:R("Ignorer","Ignore it"),fx:s=>{s.rAlg-=6;s.mods.fur*=.85;return R("Une partie des fourrures prend le chemin du sud.","Part of the furs heads south.");}}
 ]},
{id:'sys_inspector',sys:true,cool:6,place:'quebec',cond:s=>s.flags.cent&&!s.flags.habitants&&s.season===2,
 title:R("L'inspecteur de la Compagnie","The Company inspector"),
 text:s=>({fr:`Un commis des Cent-Associés vérifie les comptes. Cette année : ${s.furs} paquets.`,en:`A Hundred Associates clerk is auditing the books. This year: ${s.furs} packs.`}),
 choices:[
  {label:R("Ouvrir les livres","Open the books"),fx:s=>{if(s.furs>=30){s.compagnie+=8;return R("Il repart satisfait.","He leaves satisfied.");}s.compagnie-=6;return R("Il repart avec une longue liste de reproches.","He leaves with a long list of complaints.");}},
  {label:R("L'acheter (300 livres)","Buy him off (300 livres)"),fx:s=>{s.treasury-=300;s.compagnie+=5;return R("Son rapport est élogieux.","His report is glowing.");}}
 ]},
{id:'sys_seigneur',sys:true,cool:6,place:'orleans',cond:s=>s.year>=1626&&s.pop>40&&!s.flags.occupied,
 title:R("Une demande de seigneurie","A request for a seigneury"),
 text:R("Un gentilhomme demande une seigneurie sur la côte. Il fera venir des censitaires à ses frais, mais voudra des droits.",
        "A gentleman asks for a seigneury on the shore. He will bring tenant farmers at his own cost, but he'll want rights."),
 choices:[
  {label:R("Concéder la seigneurie","Grant the seigneury"),fx:s=>{s.pendingSettlers+=10;s.cleared+=6;s.autonomy+=2;return R("Une nouvelle ligne de rangs sur la carte, l'an prochain.","A new line of rangs on the map next year.");}},
  {label:R("Refuser","Refuse"),fx:s=>{s.compagnie+=2;return R("La terre reste en bois debout.","The land stays forest.");}}
 ]},
{id:'sys_quarrel',sys:true,cool:6,place:'quebec',cond:s=>s.church>=45,
 title:R("Querelle de préséance","A quarrel over precedence"),
 text:R("À la messe, le gouverneur et le supérieur des Jésuites se disputent la première place à la procession. Toute la colonie en parle.",
        "At Mass, the governor and the Jesuit superior quarrel over who walks first in the procession. The whole colony talks about it."),
 choices:[
  {label:R("Céder à l'Église","Yield to the Church"),fx:s=>{s.church+=5;s.autonomy-=2;return R("L'Église marche devant.","The Church walks first.");}},
  {label:R("Tenir le rang du roi","Hold the King's rank"),fx:s=>{s.church-=5;s.compagnie+=2;return R("Le gouverneur marche devant, et les sermons deviennent pointus.","The governor walks first, and the sermons get pointed.");}}
 ]},
{id:'sys_hostages',sys:true,cool:7,place:'huronia',cond:s=>!s.wenFallen&&s.rWen>=40&&s.pop>40,
 title:R("Des Français en Huronie","French men in Huronia"),
 text:R("Les Wendats demandent que des Français vivent dans leurs villages, armés : un gage d'alliance contre les Haudenosaunee.",
        "The Wendat ask for armed French men to live in their villages: a pledge of alliance against the Haudenosaunee."),
 choices:[
  {label:R("Envoyer huit soldats","Send eight soldiers"),fx:s=>{s.pop-=8;s.rWen+=8;s.wenStr+=4;return R("Huit arquebusiers montent avec les canots.","Eight arquebusiers go up with the canoes.");}},
  {label:R("Refuser","Refuse"),fx:s=>{s.rWen-=5;return R("Les Wendats notent que les Français envoient des prêtres, pas des soldats.","The Wendat note that the French send priests, not soldiers.");}}
 ]},
{id:'sys_secret',sys:true,cool:8,place:'onondaga',cond:s=>s.rel.onon<-10&&s.orient.all==='mediation',
 title:R("Une ouverture discrète","A quiet overture"),
 text:R("Un émissaire onontagué propose en secret d'ouvrir la traite avec les Français, à condition que vos alliés n'en sachent rien.",
        "An Onondaga envoy secretly offers to open trade with the French, provided your allies know nothing of it."),
 choices:[
  {label:R("Accepter en secret","Accept in secret"),fx:s=>{relAdd(s,'onon',28);s.mods.fur*=1.1;if(Math.random()<.4){s.rAlg-=12;s.rWen-=10;return R("Le secret ne tient pas. Vos alliés savent.","The secret doesn't hold. Your allies know.");}return R("Personne n'en sait rien. Pour l'instant.","No one knows. For now.");}},
  {label:R("Refuser et prévenir vos alliés","Refuse and warn your allies"),fx:s=>{s.rAlg+=5;s.rWen+=5;relAdd(s,'onon',-8);return R("Vos alliés apprécient la confiance.","Your allies appreciate the trust.");}}
 ]},
{id:'sys_winter',sys:true,cool:4,place:'quebec',cond:s=>s.season===3,
 title:R("L'hiver s'annonce dur","A hard winter ahead"),
 text:R("Les Innus annoncent un hiver de grands froids : les orignaux sont descendus tôt.",
        "The Innu predict a bitter winter: the moose came down early."),
 choices:[
  {label:R("Acheter des peaux et du bois (200 livres)","Buy hides and firewood (200 livres)"),fx:s=>{s.treasury-=200;return R("On calfeutre les maisons.","The houses are caulked.");}},
  {label:R("Prendre le risque","Take the risk"),fx:s=>{s.mods.scurvy*=1.5;return R("On verra au printemps.","We'll see in spring.");}}
 ]}
);

EVENTS.push({id:'sys_rupture',sys:true,cool:6,max:3,place:'quebec',
 cond:s=>['innu','alg','abenaki','wen'].some(g=>s.rel[g]<=-25&&!(g==='wen'&&s.wenFallen)),
 title:s=>{const g=worstAlly(s);return {fr:`Le sang entre nous et les ${g.name.fr}`,en:`Blood between us and the ${g.name.en}`};},
 text:s=>{const g=worstAlly(s);return {fr:`Deux colons ont été tués par des ${g.name.fr}, las des promesses non tenues et des présents qui ne viennent plus. Leurs chefs attendent votre réponse : selon leur loi, les morts peuvent être « couverts » ; selon la vôtre, il faut des coupables.`,en:`Two settlers have been killed by ${g.name.en}, weary of broken promises and gifts that no longer come. Their chiefs await your answer: by their law, the dead can be 'covered'; by yours, there must be culprits.`};},
 choices:s=>{const g=worstAlly(s);return [
  {label:R('Couvrir les morts par des présents (400 livres)','Cover the dead with gifts (400 livres)'),fx:s=>{s.treasury-=400;relAdd(s,g.id,30);return {fr:`Les ${g.name.fr} acceptent les présents. La relation se répare, lentement.`,en:`The ${g.name.en} accept the gifts. The relationship slowly mends.`};}},
  {label:R('Exiger que les coupables soient livrés','Demand the culprits be handed over'),fx:s=>{relAdd(s,g.id,-18);s.compagnie+=2;return {fr:`Les ${g.name.fr} refusent. On se regarde désormais par-dessus les palissades.`,en:`The ${g.name.en} refuse. From now on you eye each other over the palisades.`};}},
  {label:R('Rompre et prendre les armes','Break off and take up arms'),fx:s=>{relAdd(s,g.id,-45);s.defense+=5;return {fr:`C'est la guerre avec les ${g.name.fr}. Les canots de traite ne viendront plus de chez eux.`,en:`It is war with the ${g.name.en}. No more trade canoes will come from them.`};}}];}});
function worstAlly(s){let best=null;for(const id of ['innu','alg','abenaki','wen']){if(id==='wen'&&s.wenFallen)continue;if(!best||s.rel[id]<s.rel[best])best=id;}return GROUP[best];}
