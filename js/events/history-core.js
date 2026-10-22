/* Onontio — Événements historiques de base (1608–1663). */
/* ---------------- events ---------------- */
const R=(fr,en)=>({fr,en});
const EVENTS=[
{id:'scurvy1608',place:'quebec',cond:s=>s.year===1608&&s.season===3,
 title:R("Le mal de terre","The land sickness"),
 text:R("Le premier hiver s'installe à l'Habitation. Les hommes ont les gencives enflées et les jambes noircies : c'est le scorbut. Du temps de Cartier, les gens de Stadaconé connaissaient un remède, l'annedda. Les Innus de Tadoussac s'en souviennent peut-être.",
        "The first winter settles on the Habitation. The men's gums are swollen and their legs blackened: scurvy. In Cartier's day the people of Stadacona knew a cure, annedda. The Innu at Tadoussac may remember it."),
 choices:[
  {label:R("Envoyer demander le remède aux Innus","Send to the Innu for the remedy"),fx:s=>{if(s.rAlg>=50){s.annedda=true;s.scurvyMod=.25;s.rAlg+=4;return R("Une tisane d'écorce et d'aiguilles de cèdre blanc remet les malades debout. Le savoir des Innus vient de sauver la colonie, et la recette restera.","A brew of white cedar bark and needles puts the sick back on their feet. Innu knowledge has just saved the colony, and the recipe will stay.");}s.scurvyMod=.85;return R("Les Innus, affamés eux aussi cet hiver-là, n'ont rien à offrir.","The Innu, starving themselves that winter, have nothing to offer.");}},
  {label:R("Tenir bon avec les provisions de France","Hold out on supplies from France"),hist:true,fx:s=>{s.scurvyMod=1;return R("On rationne le lard salé et le biscuit. Au printemps, il restera 8 hommes sur 28 dans l'histoire réelle.","Salt pork and biscuit are rationed. In real history, 8 of 28 men were left by spring.");}}
 ]},
{id:'alliance1609',place:'champlainLake',cond:s=>s.year===1609&&s.season===1,
 title:R("La guerre des alliés","The allies' war"),
 text:R("Les Innus, les Algonquins et les Wendats vous demandent de les accompagner contre les Agniers (Mohawks), au sud par la rivière des Iroquois. C'est le prix de l'alliance qui fait vivre la traite.",
        "The Innu, Algonquins and Wendat ask you to join them against the Mohawk, south along the River of the Iroquois. It is the price of the alliance that keeps the fur trade alive."),
 choices:[
  {label:R("Marcher avec eux, arquebuses en main","March with them, arquebuses in hand"),hist:true,fx:s=>{s.rAlg+=15;s.rWen+=15;s.haud+=30;s.orient.all='armee';return R("Au bord du lac qui portera votre nom, un coup d'arquebuse abat des chefs agniers. L'alliance est scellée, et une guerre de quatre-vingt-dix ans commence.","On the shore of the lake that will bear your name, an arquebus shot kills Mohawk chiefs. The alliance is sealed, and a ninety-year war begins.");}},
  {label:R("Envoyer des présents, pas des hommes","Send gifts, not men"),fx:s=>{s.rAlg-=8;s.rWen-=10;s.haud+=5;s.treasury-=200;return R("Les alliés prennent les cadeaux, mais retiennent que les Français ne se battent pas pour eux.","The allies take the gifts, but remember the French will not fight for them.");}},
  {label:R("Proposer une médiation entre les nations","Offer to mediate between the nations"),fx:s=>{s.rAlg-=18;s.rWen-=15;s.haud-=8;s.orient.all='mediation';s.flags.mediator=true;return R("On rit de vous dans les conseils : quel est cet allié qui veut parler à l'ennemi ? Mais chez les Agniers, on note votre nom.","They laugh at you in council: what ally talks to the enemy? But among the Mohawk, your name is noted.");}}
 ]},
{id:'recollets1615',place:'quebec',cond:s=>s.year===1615&&s.season===0,
 title:R("Les Récollets","The Recollects"),
 text:R("Quatre frères récollets débarquent. Le père Le Caron veut aller hiverner chez les Wendats, à la Mer Douce.",
        "Four Recollect friars arrive. Father Le Caron wants to winter among the Wendat, by the Freshwater Sea."),
 choices:[
  {label:R("Les envoyer jusqu'en Huronie","Send them on to Huronia"),hist:true,fx:s=>{s.missions+=15;s.church+=10;s.rWen+=3;s.orient.mis='actives';return R("Le Caron part avec les canots wendats. La mission en Huronie commence.","Le Caron leaves with the Wendat canoes. The Huronia mission begins.");}},
  {label:R("Les garder à Québec","Keep them at Québec"),fx:s=>{s.missions+=6;s.church+=5;return R("Les frères ouvrent une chapelle et tiennent les registres.","The friars open a chapel and keep the registers.");}}
 ]},
{id:'hebert1617',place:'quebec',cond:s=>s.year===1617&&s.season===1,
 title:R("Louis Hébert","Louis Hébert"),
 text:R("Louis Hébert, apothicaire de Paris, arrive avec Marie Rollet et leurs enfants. Il veut cultiver. Les marchands de la Compagnie, eux, veulent des commis, pas des paysans.",
        "Louis Hébert, a Paris apothecary, arrives with Marie Rollet and their children. He wants to farm. The Company's merchants want clerks, not farmers."),
 choices:[
  {label:R("Lui concéder une terre sur le cap","Grant him land on the heights"),hist:true,fx:s=>{s.families=true;s.pop+=5;s.women+=2;s.cleared+=4;s.compagnie-=5;return R("Hébert défriche à la bêche. La première famille de colons de la vallée est là pour de bon.","Hébert clears the land with a spade. The valley's first settler family is here to stay.");}},
  {label:R("En faire l'apothicaire de la Compagnie","Make him the Company's apothecary"),fx:s=>{s.scurvyMod=Math.min(s.scurvyMod,.85);s.compagnie+=3;return R("Ses remèdes soignent les hommes, mais personne ne s'enracine.","His remedies help the men, but no one puts down roots.");}}
 ]},
{id:'fortOrange1624',place:'fortOrange',cond:s=>s.year===1624&&s.season===1,
 title:R("Des marchands hollandais","Dutch traders"),
 text:R("La Compagnie des Indes occidentales fonde Fort Orange sur la rivière d'Hudson. Les Haudenosaunee ont désormais un partenaire de traite qui vend de tout, y compris des armes.",
        "The Dutch West India Company founds Fort Orange on the Hudson. The Haudenosaunee now have a trading partner who sells anything, guns included."),
 choices:[{label:R("Noter la menace","Note the threat"),fx:s=>{s.places.fortOrange=true;s.haud+=3;return R("Un nouveau joueur au sud.","A new player to the south.");}}]},
{id:'cent1627',place:'quebec',cond:s=>s.year===1627&&s.season===0,
 title:R("Les Cent-Associés","The Hundred Associates"),
 text:R("Richelieu crée la Compagnie de la Nouvelle-France : le monopole de la traite, en échange de 4 000 colons en quinze ans. Une condition : catholiques seulement. Or les marchands huguenots de La Rochelle sont les plus actifs vers l'Amérique.",
        "Richelieu creates the Company of New France: a fur monopoly in exchange for 4,000 settlers in fifteen years. One condition: Catholics only. Yet La Rochelle's Huguenot merchants are the most active in the Americas."),
 choices:[
  {label:R("Accepter : catholiques seulement","Accept: Catholics only"),hist:true,fx:s=>{s.flags.cent=true;s.compagnie+=15;s.church+=5;return R("La Compagnie est puissante et bien en cour. Le recrutement reste lent.","The Company is powerful and well connected at court. Recruitment stays slow.");}},
  {label:R("Plaider pour admettre les huguenots","Plead to admit Huguenots"),fx:s=>{s.flags.cent=true;s.flags.huguenots=true;s.compagnie-=15;s.recruitMod=1.5;s.church-=10;return R("Richelieu cède à moitié : des familles protestantes pourront venir, sans culte public. Le clergé est furieux, mais les navires se remplissent.","Richelieu half-yields: Protestant families may come, without public worship. The clergy are furious, but the ships fill up.");}}
 ]},
{id:'kirke1628',place:'tadoussac',cond:s=>s.year===1628&&s.season===1,
 title:R("Les frères Kirke","The Kirke brothers"),
 text:R("Des corsaires au service de l'Angleterre, menés par David Kirke, prennent Tadoussac et capturent la flotte de ravitaillement. Kirke vous somme de rendre Québec.",
        "Privateers in English service, led by David Kirke, take Tadoussac and capture the supply fleet. Kirke demands you surrender Québec."),
 choices:[
  {label:R("Répondre fièrement et refuser","Answer proudly and refuse"),hist:true,fx:s=>{s.flags.blockade=true;return R("Kirke, qui ignore à quel point l'Habitation a faim, se retire pour l'hiver. Il reviendra.","Kirke, unaware of how hungry the Habitation is, withdraws for the winter. He will be back.");}},
  {label:R("Gagner du temps, et envoyer chercher du maïs chez les Wendats","Stall, and send to the Wendat for corn"),fx:s=>{s.flags.blockade=true;if(s.rWen>=45&&s.wenStr>50){s.food+=35;s.rWen-=4;return R("Les Wendats descendent du maïs. Ce n'est pas un festin, mais on tiendra.","The Wendat bring corn down. It's no feast, but you'll hold.");}s.food+=6;return R("Les Wendats ont peu à partager cette année.","The Wendat have little to share this year.");}}
 ]},
{id:'kirke1629',place:'quebec',cond:s=>s.year===1629&&s.season===1&&kirkeStrength(s)<43,
 title:R("Kirke revient","Kirke returns"),
 text:R("Les navires anglais sont devant Québec. L'Habitation n'a presque plus de poudre ni de vivres.",
        "The English ships are before Québec. The Habitation has almost no powder or food left."),
 choices:[
  {label:R("Capituler avec les honneurs","Surrender with honour"),hist:true,fx:s=>{occupy(s,.25);return R("Le drapeau anglais flotte sur Québec. La plupart des Français sont renvoyés en Europe ; la famille Hébert reste.","The English flag flies over Québec. Most of the French are shipped back to Europe; the Hébert family stays.");}},
  {label:R("Résister jusqu'au bout","Resist to the end"),fx:s=>{if(kirkeStrength(s)+(s.rAlg>=65?20:0)+Math.random()*15>55){s.pop=Math.round(s.pop*.8);s.flags.blockade=false;s.flags.repelled=true;return R("Contre toute attente, avec l'aide des alliés, l'Habitation tient. Kirke lève l'ancre.","Against all odds, with the allies' help, the Habitation holds. Kirke weighs anchor.");}occupy(s,.15);return R("L'assaut est meurtrier. Québec tombe quand même.","The assault is bloody. Québec falls anyway.");}}
 ]},
{id:'kirke1629b',place:'quebec',cond:s=>s.year===1629&&s.season===1&&!s.fired.kirke1629&&kirkeStrength(s)>=43,
 title:R("Kirke renonce","Kirke gives up"),
 text:R("Les navires anglais remontent jusqu'à Québec, voient la palissade, les canons et les greniers pleins, et repartent. Dans l'histoire réelle, Québec a capitulé cet été-là.",
        "The English ships sail up to Québec, see the palisade, the cannon and the full granaries, and leave. In real history, Québec surrendered that summer."),
 choices:[{label:R("Rendre grâce","Give thanks"),fx:s=>{s.flags.blockade=false;s.flags.repelled=true;s.compagnie+=10;return R("La Nouvelle-France échappe à trois ans d'occupation.","New France escapes three years of occupation.");}}]},
{id:'stgermain1632',place:'gulf',cond:s=>s.year===1632&&s.season===0&&s.flags.occupied,
 title:R("Le traité de Saint-Germain-en-Laye","The Treaty of Saint-Germain-en-Laye"),
 text:R("En Europe, Charles Ier veut le reste de la dot d'Henriette-Marie. Louis XIII veut Québec. Les rois négocient sans vous. Ce que vaut la colonie aux yeux de la cour comptera.",
        "In Europe, Charles I wants the rest of Henrietta Maria's dowry. Louis XIII wants Québec. The kings negotiate without you. What the colony is worth to the court will count."),
 choices:[{label:R("Attendre la décision des rois","Await the kings' decision"),fx:s=>{const ch=.5+s.compagnie/200+(s.flags.cent?.1:0);if(Math.random()<ch){s.flags.occupied=false;s.flags.blockade=false;s.pop+=60;s.compagnie=Math.max(s.compagnie,45);s.food+=40;return R("Québec est rendue à la France. Champlain reviendra l'an prochain avec des colons.","Québec is returned to France. Champlain will return next year with settlers.");}s.ending='english';return R("La France renonce à Québec contre de meilleures conditions en Europe.","France gives up Québec for better terms in Europe.");}}]},
{id:'tr1634',place:'troisRivieres',cond:s=>s.year===1634&&s.season===0&&!s.flags.occupied,
 title:R("Un poste aux Trois-Rivières","A post at Trois-Rivières"),
 text:R("Laviolette propose un poste à l'embouchure du Saint-Maurice, là où les Algonquins descendent traiter. Plus près des fourrures, plus près des Agniers aussi.",
        "Laviolette proposes a post at the mouth of the Saint-Maurice, where the Algonquins come down to trade. Closer to the furs, and closer to the Mohawk."),
 choices:[
  {label:R("Fonder le poste (800 livres)","Found the post (800 livres)"),hist:true,fx:s=>{s.places.troisRivieres=true;s.treasury-=800;s.rAlg+=5;return R("Une palissade et quelques maisons au bord du fleuve.","A palisade and a few houses on the riverbank.");}},
  {label:R("Garder la colonie groupée autour de Québec","Keep the colony compact around Québec"),fx:s=>{s.defense+=4;return R("Prudence. Les Algonquins devront descendre plus loin.","Caution. The Algonquins will have to travel further.");}}
 ]},
{id:'pox1634',place:'huronia',cond:s=>s.year===1634&&s.season===2,
 title:R("L'épidémie","The epidemic"),
 text:R("La variole et d'autres maladies venues d'Europe frappent les villages wendats. Certains accusent les robes noires, qui vont de maison en maison.",
        "Smallpox and other European diseases strike the Wendat villages. Some blame the Black Robes, who go from house to house."),
 choices:[
  {label:R("Maintenir les missionnaires en Huronie","Keep the missionaries in Huronia"),hist:true,fx:s=>{s.wenStr-=30;s.rWen-=10;s.missions+=5;return R("Les Jésuites baptisent les mourants. Des conseils wendats parlent de les chasser.","The Jesuits baptise the dying. Wendat councils speak of driving them out.");}},
  {label:R("Rappeler les missionnaires pour quelques années","Recall the missionaries for a few years"),fx:s=>{s.wenStr-=20;s.rWen+=5;s.church-=8;s.missions-=5;return R("La maladie voyage quand même avec la traite, mais un peu moins vite.","The disease still travels with the trade, but a little more slowly.");}}
 ]},
{id:'champ1635',place:'quebec',cond:s=>s.year===1635&&s.season===3,
 title:R("Mort de Champlain","Champlain's death"),
 text:R("Samuel de Champlain meurt à Québec le jour de Noël 1635. La charge continue : un autre la portera.",
        "Samuel de Champlain dies at Québec on Christmas Day, 1635. The office goes on: someone else will carry it."),
 choices:[{label:R("Attendre le nouveau gouverneur","Await the new governor"),fx:s=>R("Les navires du printemps apporteront son successeur.","The spring ships will bring his successor.")}]},
{id:'pox1639',place:'huronia',cond:s=>s.year===1639&&s.season===0&&!s.wenFallen,
 title:R("Nouvelle vague de variole","A new wave of smallpox"),
 text:R("La variole revient en Huronie. En six ans, la moitié des Wendats a péri.",
        "Smallpox returns to Huronia. In six years, half the Wendat have died."),
 choices:[{label:R("Envoyer des secours","Send relief"),fx:s=>{s.wenStr-=(s.orient.mis==='actives'?20:14);s.rWen+=3;s.treasury-=200;return R("On envoie vivres et couvertures. C'est peu.","Food and blankets are sent. It's little.");}}]},
{id:'ursu1639',place:'quebec',cond:s=>s.year===1639&&s.season===1,
 title:R("Les Ursulines et les Augustines","The Ursulines and the Augustinians"),
 text:R("Marie de l'Incarnation et les Ursulines veulent ouvrir une école ; les Augustines, un hôtel-Dieu. Elles demandent votre appui.",
        "Marie de l'Incarnation and the Ursulines want to open a school; the Augustinian sisters, a hospital. They ask for your support."),
 choices:[
  {label:R("Les soutenir (600 livres)","Support them (600 livres)"),hist:true,fx:s=>{s.hospital=true;s.church+=8;s.treasury-=600;s.rAlg+=3;return R("L'Hôtel-Dieu de Québec ouvre. On meurt moins l'hiver.","The Hôtel-Dieu of Québec opens. Fewer die in winter.");}},
  {label:R("Les laisser se débrouiller","Let them fend for themselves"),fx:s=>{s.church+=2;return R("Elles s'installent tant bien que mal dans une petite maison de la basse-ville.","They settle as best they can in a small house in the lower town.");}}
 ]},
{id:'vm1641',place:'villeMarie',cond:s=>s.year===1641&&s.season===2&&!s.flags.occupied,
 title:R("Ville-Marie","Ville-Marie"),
 text:R("Maisonneuve et Jeanne Mance arrivent pour la Société Notre-Dame : ils veulent fonder une ville missionnaire sur l'île de Montréal, en pleine route des Agniers. Le gouverneur leur offre plutôt l'île d'Orléans. Maisonneuve répond qu'il ira « quand tous les arbres de l'île se changeraient en autant d'Iroquois ».",
        "Maisonneuve and Jeanne Mance arrive for the Société Notre-Dame: they want to found a mission town on the island of Montréal, right on the Mohawk war path. The governor offers them the Île d'Orléans instead. Maisonneuve replies he will go 'even if every tree on the island turned into an Iroquois'."),
 choices:[
  {label:R("Les laisser partir pour Montréal","Let them go to Montréal"),hist:true,fx:s=>{s.places.villeMarie=true;s.pop+=45;s.women+=6;s.flags.vm=true;return R("Le 17 mai 1642, on chante la messe à Ville-Marie. Un poste avancé, au bout du monde.","On 17 May 1642, Mass is sung at Ville-Marie. An outpost at the end of the world.");}},
  {label:R("Leur imposer l'île d'Orléans","Impose the Île d'Orléans"),fx:s=>{s.places.orleans=true;s.pop+=40;s.cleared+=15;s.flags.noVM=true;return R("Les colons de Maisonneuve défrichent l'île d'Orléans. Plus sûr, mais la route de l'Outaouais reste sans gardien.","Maisonneuve's settlers clear the Île d'Orléans. Safer, but the Outaouais route has no guard.");}}
 ]},
{id:'guns1641',place:'fortOrange',cond:s=>s.year===1641&&s.season===1,
 title:R("Les fusils hollandais","Dutch muskets"),
 text:R("Les Agniers achètent des centaines de fusils à Fort Orange. Vos alliés, eux, n'en ont presque pas : la politique française n'en vend qu'aux convertis.",
        "The Mohawk are buying hundreds of muskets at Fort Orange. Your allies have almost none: French policy sells them only to converts."),
 choices:[
  {label:R("N'armer que les alliés baptisés","Arm only baptised allies"),hist:true,fx:s=>{s.flags.gunsH=true;s.haud+=10;s.wenStr+=5;s.church+=4;return R("Quelques fusils pour quelques convertis. Les Jésuites approuvent.","A few muskets for a few converts. The Jesuits approve.");}},
  {label:R("Armer tous les alliés","Arm all the allies"),fx:s=>{s.flags.gunsH=true;s.haud+=14;s.wenStr+=20;s.rAlg+=10;s.rWen+=10;s.church-=10;s.treasury-=500;return R("Les canots remontent chargés de fusils. Les Jésuites protestent, les guerriers wendats sourient.","Canoes go upriver loaded with muskets. The Jesuits protest; Wendat warriors smile.");}},
  {label:R("Ne pas armer les alliés","Don't arm the allies"),fx:s=>{s.flags.gunsH=true;s.haud+=10;s.rAlg-=10;s.rWen-=10;return R("Vos alliés comprennent qu'ils sont seuls face aux fusils.","Your allies understand they face the muskets alone.");}}
 ]},
{id:'quota1643',place:'quebec',cond:s=>s.year===1643&&s.season===0&&s.flags.cent,
 title:R("Les promesses de la Compagnie","The Company's promises"),
 text:s=>({fr:`Quinze ans ont passé. La Compagnie avait promis 4 000 colons ; la colonie compte ${Math.round(s.pop)} habitants.`,en:`Fifteen years have passed. The Company promised 4,000 settlers; the colony has ${Math.round(s.pop)}.`}),
 choices:[{label:R("Écrire à la cour","Write to the court"),fx:s=>{s.compagnie-=10;s.autonomy+=5;return R("À Paris, on hausse les épaules. Les colons, eux, commencent à se dire qu'ils devront compter sur eux-mêmes.","In Paris, they shrug. The settlers begin to think they'll have to rely on themselves.");}}]},
{id:'hab1645',place:'quebec',cond:s=>s.year===1645&&s.season===0&&!s.flags.occupied,
 title:R("La Communauté des Habitants","The Community of Habitants"),
 text:R("Les notables de la colonie proposent de reprendre la traite des Cent-Associés, à condition de payer eux-mêmes les frais de la colonie.",
        "The colony's leading men offer to take over the fur trade from the Hundred Associates, provided they pay the colony's costs themselves."),
 choices:[
  {label:R("Accepter : la traite aux habitants","Accept: the trade goes to the habitants"),hist:true,fx:s=>{s.flags.habitants=true;s.autonomy+=20;s.compagnie-=10;return R("Pour la première fois, l'argent de la traite reste dans la colonie. Plus de subvention de la Compagnie.","For the first time, fur money stays in the colony. No more Company subsidy.");}},
  {label:R("Garder le monopole de la Compagnie","Keep the Company's monopoly"),fx:s=>{s.compagnie+=8;s.autonomy-=5;return R("La Compagnie vous remercie. Les habitants, moins.","The Company thanks you. The habitants, less so.");}}
 ]},
{id:'peace1645',place:'troisRivieres',cond:s=>s.year===1645&&s.season===1&&s.rel.agnier<60&&!s.flags.occupied,
 title:R("Kiotseaeton","Kiotseaeton"),
 text:R("L'orateur agnier Kiotseaeton vient parler de paix, colliers de porcelaine à la main. Mais quelle paix ? Les Agniers voudraient bien faire la paix avec les Français… et garder les mains libres contre les Wendats et les Algonquins.",
        "The Mohawk orator Kiotseaeton comes to speak of peace, wampum belts in hand. But what peace? The Mohawk would happily make peace with the French… and keep a free hand against the Wendat and Algonquins."),
 choices:[
  {label:R("Exiger une paix générale, alliés compris","Insist on a general peace, allies included"),hist:true,fx:s=>{s.flags.peace=true;relAdd(s,'agnier',55);relAdd(s,'onon',15);s.rAlg+=5;s.rWen+=5;return R("Les colliers sont échangés. La paix tiendra… un an.","The belts are exchanged. The peace will hold… for a year.");}},
  {label:R("Accepter une paix séparée avec les Français","Accept a separate peace for the French"),fx:s=>{s.flags.peace=true;s.flags.sepPeace=true;relAdd(s,'agnier',75);relAdd(s,'onon',20);s.rAlg-=15;s.rWen-=12;return R("Les raids contre vos établissements cessent. Vos alliés se sentent trahis.","Raids on your settlements stop. Your allies feel betrayed.");}},
  {label:R("Refuser : pas de paix avec les Agniers","Refuse: no peace with the Mohawk"),fx:s=>{relAdd(s,'agnier',-20);s.rAlg+=4;s.rWen+=4;return R("Kiotseaeton repart. La guerre continue.","Kiotseaeton leaves. The war goes on.");}}
 ]},
{id:'jogues1646',place:'champlainLake',cond:s=>s.year===1646&&s.season===2&&s.flags.peace,
 title:R("La paix se brise","The peace breaks"),
 text:R("Le père Isaac Jogues est tué en pays agnier. Les partis de guerre reprennent la route du fleuve.",
        "Father Isaac Jogues is killed in Mohawk country. War parties take to the river again."),
 choices:[{label:R("Doubler la garde","Double the guard"),fx:s=>{s.flags.peace=false;relAdd(s,'agnier',s.flags.sepPeace?-25:-50);relAdd(s,'onon',-10);s.defense+=3;return R("La paix n'aura été qu'une trêve.","The peace was only a truce.");}}]},
{id:'huronia1649',place:'huronia',cond:s=>s.year===1649&&s.season===0&&!s.wenFallen,
 title:R("L'assaut sur la Huronie","The assault on Huronia"),
 text:s=>huroniaFalls(s)
   ?R("En mars, un millier de guerriers haudenosaunee frappent Saint-Ignace et Saint-Louis. Brébeuf et Lalemant sont tués. Les Wendats, décimés par les épidémies et mal armés, brûlent leurs villages et se dispersent. Les Jésuites incendient Sainte-Marie.","In March, a thousand Haudenosaunee warriors strike Saint-Ignace and Saint-Louis. Brébeuf and Lalemant are killed. The Wendat, ravaged by epidemics and poorly armed, burn their villages and scatter. The Jesuits set fire to Sainte-Marie.")
   :R("En mars, les Haudenosaunee frappent Saint-Ignace. Mais les Wendats sont nombreux et armés : l'assaut est repoussé avec de lourdes pertes. Dans l'histoire réelle, la Huronie est tombée cette année-là.","In March, the Haudenosaunee strike Saint-Ignace. But the Wendat are numerous and armed: the assault is driven back with heavy losses. In real history, Huronia fell that year."),
 choices:s=>huroniaFalls(s)?[
  {label:R("Accueillir les réfugiés près de Québec","Take in the refugees near Québec"),hist:true,fx:s=>{fallHuronia(s);s.places.refuge=true;s.rWen=Math.min(100,s.rWen+15);s.food-=25;s.church+=4;return R("Quelques centaines de Wendats descendent jusqu'à Québec. Leurs descendants y vivent encore, à Wendake.","A few hundred Wendat come down to Québec. Their descendants still live there, at Wendake.");}},
  {label:R("Les laisser trouver refuge chez leurs voisins","Let them seek refuge with their neighbours"),fx:s=>{fallHuronia(s);s.rWen-=20;s.rAlg-=6;return R("Les Wendats se dispersent vers l'ouest et le sud. Vos alliés retiennent que vous n'avez rien fait.","The Wendat scatter west and south. Your allies remember you did nothing.");}}
 ]:[{label:R("Envoyer des félicitations et des présents","Send congratulations and gifts"),fx:s=>{s.wenStr=Math.min(100,s.wenStr+5);s.rWen+=10;s.haud+=5;s.compagnie+=5;s.flags.huroniaHeld=true;return R("La route des fourrures de la Mer Douce reste ouverte. L'histoire vient de bifurquer.","The fur route from the Freshwater Sea stays open. History has just forked.");}}]},
{id:'recrue1652',place:'villeMarie',cond:s=>s.year===1652&&s.season===2&&s.places.villeMarie,
 title:R("« Cent hommes, ou j'abandonne »","'A hundred men, or I abandon it'"),
 text:R("Ville-Marie est assiégée en permanence. Maisonneuve est en France : sans cent hommes, il ramène tout le monde à Québec.",
        "Ville-Marie is under constant siege. Maisonneuve is in France: without a hundred men, he'll bring everyone back to Québec."),
 choices:[
  {label:R("Financer la levée (1 500 livres)","Fund the levy (1,500 livres)"),hist:true,fx:s=>{s.pendingSettlers+=100;s.treasury-=1500;s.defense+=6;return R("La Grande Recrue s'embarquera au printemps : soldats, artisans, défricheurs.","The Great Levy will sail in spring: soldiers, craftsmen, land-clearers.");}},
  {label:R("Abandonner Ville-Marie","Abandon Ville-Marie"),fx:s=>{s.places.villeMarie=false;s.flags.vmAbandoned=true;s.rAlg-=8;return R("Les colons de Montréal redescendent à Québec. La route de l'Outaouais est sans gardien.","Montréal's settlers come back down to Québec. The Outaouais route is unguarded.");}}
 ]},
{id:'laval1659',place:'quebec',cond:s=>s.year===1659&&s.season===1,
 title:R("Monseigneur de Laval","Bishop Laval"),
 text:R("François de Laval arrive comme vicaire apostolique. Il veut interdire la vente d'eau-de-vie aux Autochtones sous peine d'excommunication. Les marchands disent que sans eau-de-vie, les fourrures iront aux Anglais et aux Hollandais.",
        "François de Laval arrives as vicar apostolic. He wants to forbid selling brandy to Indigenous people on pain of excommunication. The merchants say without brandy the furs will go to the English and Dutch."),
 choices:[
  {label:R("Appuyer l'évêque","Back the bishop"),hist:true,fx:s=>{s.flags.laval=true;s.church+=15;s.rAlg+=4;s.rWen+=4;return R("L'Église devient une puissance de la colonie, presque à l'égal du gouverneur.","The Church becomes a power in the colony, almost equal to the governor.");}},
  {label:R("Protéger la traite","Protect the trade"),fx:s=>{s.church-=10;s.compagnie+=6;s.autonomy+=4;return R("Laval écrit à Paris contre vous. Les marchands vous remercient.","Laval writes to Paris against you. The merchants thank you.");}}
 ]},
{id:'sault1660',place:'longSault',cond:s=>s.year===1660&&s.season===0&&s.places.villeMarie,
 title:R("Le Long-Sault","The Long Sault"),
 text:R("Adam Dollard des Ormeaux et seize jeunes Montréalais veulent tendre une embuscade aux guerriers haudenosaunee au Long-Sault, sur l'Outaouais. Quelques Wendats et Algonquins se joignent à eux.",
        "Adam Dollard des Ormeaux and sixteen young Montrealers want to ambush Haudenosaunee warriors at the Long Sault, on the Outaouais. A few Wendat and Algonquins join them."),
 choices:[
  {label:R("Les laisser partir","Let them go"),hist:true,fx:s=>{s.pop-=17;relAdd(s,'onon',-6);relAdd(s,'agnier',6);s.flags.dollard=true;return R("Ils tiennent un fortin pendant une semaine, puis sont tous tués. On dira qu'ils ont sauvé la colonie ; les historiens en débattent encore.","They hold a small fort for a week, then are all killed. It will be said they saved the colony; historians still argue about it.");}},
  {label:R("Les retenir à Ville-Marie","Keep them at Ville-Marie"),fx:s=>{s.defense+=3;s.haud+=4;return R("Ils restent derrière la palissade, la rage au cœur.","They stay behind the palisade, seething.");}}
 ]},
{id:'royal1663',place:'quebec',cond:s=>s.year===1663&&s.season===0,
 title:R("Le roi reprend la colonie","The King takes over the colony"),
 text:R("Louis XIV dissout la Compagnie des Cent-Associés. La Nouvelle-France devient une province royale, avec un gouverneur, un intendant et un Conseil souverain. Une autre ère commence.",
        "Louis XIV dissolves the Hundred Associates. New France becomes a royal province, with a governor, an intendant and a Sovereign Council. A new era begins."),
 choices:[{label:R("Voir le bilan","See the outcome"),fx:s=>{s.ending='royal';return R("Fin du prototype.","End of the prototype.");}}]}
];
