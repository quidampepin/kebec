/* Kebec — Période I : quelques conséquences de plus. Chargé après p1-more.js, avant index.js. */
(()=>{
const add=e=>{e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;EVENTS.push(e);};

add({id:'cq1_sagard',place:'huronia',cond:s=>s.year>=1623&&s.year<1649&&!s.wenFallen&&s.missions>=20,
 because:s=>R("Vos missionnaires vivent chez les Wendats.","Your missionaries live among the Wendat."),
 title:R("Un dictionnaire de la langue huronne","A dictionary of the Huron language"),
 text:R("Le frère récollet Gabriel Sagard a noté des milliers de mots wendats. Il propose de faire imprimer un dictionnaire à Paris, pour que les Français apprennent la langue au lieu d'attendre que les Wendats apprennent la leur.","The Recollet brother Gabriel Sagard has noted thousands of Wendat words. He proposes printing a dictionary in Paris, so that the French learn the language instead of waiting for the Wendat to learn theirs."),
 choices:[
  {label:R("Le faire imprimer","Have it printed"),fx:s=>{s.treasury-=150;s.rWen+=5;s.missions+=3;return R("Le Grand Voyage du pays des Hurons et son dictionnaire paraissent en 1632. Les truchements ne sont plus les seuls à comprendre.","The Grand Voyage to the Huron Country and its dictionary appear in 1632. The interpreters are no longer the only ones who understand.");}},
  {label:R("Les truchements suffisent","The interpreters are enough"),fx:s=>R("La langue reste l'affaire de quelques hommes.","The language remains the business of a few men.")}]});

add({id:'cq1_hiver',place:'quebec',cond:s=>s.year>=1615&&s.year<1640&&s.rAlg>=60&&s.season===3,
 because:s=>R("Vos alliés innus vous font confiance.","Your Innu allies trust you."),
 title:R("Hiverner avec les Innus","Wintering with the Innu"),
 text:R("Un chef innu propose d'emmener de jeunes Français à la chasse d'hiver, en raquettes, comme le père Le Jeune en 1633. Ils apprendront le pays, et les Innus nourriront des bouches de moins à l'Habitation.","An Innu chief offers to take young Frenchmen on the winter hunt, on snowshoes, as Father Le Jeune went in 1633. They will learn the country, and the Habitation will have fewer mouths to feed."),
 choices:[
  {label:R("Les laisser partir","Let them go"),fx:s=>{s.food+=Math.round(s.pop*.15);s.rAlg+=4;s.pop-=1;return R("Ils reviennent au printemps, amaigris mais savants : raquettes, traîne, abris de neige. Un d'eux est mort de froid.","They return in spring, thin but wise: snowshoes, toboggans, snow shelters. One of them froze to death.");}},
  {label:R("Rester à l'abri de l'Habitation","Stay sheltered in the Habitation"),fx:s=>R("L'hiver se passe entre quatre murs, à compter les barils.","Winter passes within four walls, counting barrels.")}]});

add({id:'cq1_quebec_femmes',place:'quebec',cond:s=>s.year>=1635&&s.women<s.pop*.15&&s.compagnie>=40,
 because:s=>R("Les femmes sont rares, et la Compagnie vous écoute encore.","Women are scarce, and the Company still listens to you."),
 title:R("Des filles à marier","Marriageable girls"),
 text:R("Les engagés repartent faute d'épouses. Des religieuses proposent de recruter en France des orphelines et des filles pauvres, dotées par des dames pieuses, pour les marier au pays.","Indentured men leave for lack of wives. Nuns propose recruiting orphans and poor girls in France, dowered by pious ladies, to marry in the country."),
 choices:[
  {label:R("Organiser ce recrutement","Organize the recruitment"),fx:s=>{s.treasury-=300;s.pendingSettlers+=20;s.pendingWomen=(s.pendingWomen||0)+20;s.church+=2;return R("Une vingtaine de filles arriveront avec les prochains navires. Le modèle servira, trente ans plus tard, aux Filles du Roi.","Some twenty girls will arrive with the next ships. The model will serve, thirty years later, for the King's Daughters.");}},
  {label:R("Compter sur les familles","Rely on families"),fx:s=>R("On espère des familles entières, qui viennent rarement.","Whole families are hoped for, and rarely come.")}]});

add({id:'cq1_poudre',place:'troisRivieres',cond:s=>s.year>=1641&&s.haud>=60,
 because:s=>R("La tension avec les Haudenosaunee est à son comble.","Tension with the Haudenosaunee is at its peak."),
 title:R("Des fusils pour les alliés ?","Muskets for the allies?"),
 text:R("Les Hollandais vendent des fusils aux Agniers ; vous les réservez aux convertis. Les chefs algonquins non baptisés protestent : faut-il se convertir pour pouvoir se défendre ?","The Dutch sell muskets to the Mohawk; you reserve them for converts. Unbaptized Algonquin chiefs protest: must one convert in order to defend oneself?"),
 choices:[
  {label:R("Armer tous les alliés","Arm all the allies"),fx:s=>{s.rAlg+=8;s.rWen+=4;s.church-=4;s.treasury-=250;return R("Les jésuites s'indignent. Les alliés, eux, tiennent mieux les rivières.","The Jesuits are indignant. The allies hold the rivers better.");}},
  {label:R("Garder la règle des convertis","Keep the converts-only rule"),hist:true,fx:s=>{s.church+=2;s.rAlg-=4;return R("Les baptêmes se multiplient, pas toujours pour de bonnes raisons. Les autres restent sans armes.","Baptisms multiply, not always for good reasons. The others stay unarmed.");}}]});

add({id:'cq1_secours',place:'villeMarie',cond:s=>s.year>=1645&&s.places.villeMarie&&s.raided&&s.raided.villeMarie,
 because:s=>R("Ville-Marie vient d'être attaquée.","Ville-Marie has just been attacked."),
 title:R("Jeanne Mance et l'argent de l'hôpital","Jeanne Mance and the hospital money"),
 text:R("Jeanne Mance propose de détourner les fonds de son hôpital, donnés par une bienfaitrice, pour lever cent soldats en France. Sans eux, dit Maisonneuve, il faudra abandonner l'île.","Jeanne Mance proposes diverting her hospital's funds, given by a benefactress, to raise a hundred soldiers in France. Without them, Maisonneuve says, the island will have to be abandoned."),
 choices:[
  {label:R("Accepter","Accept"),fx:s=>{s.defense+=6;s.pendingSettlers+=40;return R("La recrue arrivera. L'hôpital attendra.","The recruits will come. The hospital will wait.");}},
  {label:R("Garder l'hôpital","Keep the hospital"),fx:s=>{s.church+=2;return R("Les blessés sont soignés ; les palissades restent minces.","The wounded are cared for; the palisades stay thin.");}}]});
})();
