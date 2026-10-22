/* Kebec — Période I : conséquences de vos choix et deux événements réels de plus (Druillettes, Gannentaha).
   Chargé après les événements de base, avant index.js. */
(()=>{
const add=e=>{if(e.sys){e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;}EVENTS.push(e);};
const div=(s,id)=>(s.divergences||[]).some(d=>d.id===id);

add({id:'cq1_truchement',sys:true,place:'huronia',cond:s=>s.year>=1615&&s.year<1645&&s.truchYear>0&&!s.wenFallen&&s.rel.wen>=20,
 because:s=>R("Vous envoyez de jeunes Français hiverner chez les Wendats ; certains n'en reviennent plus vraiment.","You send young Frenchmen to winter among the Wendat; some never really come back."),
 title:R("Un truchement devient chef de guerre","An interpreter becomes a war chief"),
 text:R("Un de vos truchements, adopté par un clan wendat, parle la langue mieux que le français. Il veut mener un parti de guerre contre les Onontagués, peint et coiffé à la wendate. Les jésuites sont scandalisés.","One of your interpreters, adopted by a Wendat clan, speaks the language better than French. He wants to lead a war party against the Onondaga, painted and dressed as a Wendat. The Jesuits are scandalised."),
 choices:[
  {label:R("Le laisser faire : il est des leurs","Let him: he is one of them"),fx:s=>{relAdd(s,'wen',8);relAdd(s,'onon',-6);s.church-=3;s.flags.truchChef=true;return R("Il revient avec des captifs et un nom wendat. Pour les jeunes Français, il devient un modèle.","He returns with captives and a Wendat name. For young Frenchmen he becomes a model.");}},
  {label:R("Le rappeler à Québec","Call him back to Québec"),fx:s=>{relAdd(s,'wen',-4);s.church+=2;return R("Il obéit, à contrecœur. Ses frères wendats se demandent ce que vaut la parole des Français.","He obeys, reluctantly. His Wendat brothers wonder what the French word is worth.");}}]});

add({id:'cq1_mariage',sys:true,place:'quebec',cond:s=>s.year>=1633&&s.year<1660&&s.rAlg>=65&&s.women<s.pop*.22,
 because:s=>R("L'alliance avec les Innus et les Algonquins est solide, et les femmes françaises sont rares.","The alliance with the Innu and the Algonquins is strong, and French women are scarce."),
 title:R("« Nos fils épouseront vos filles »","'Our sons will marry your daughters'"),
 text:R("Champlain l'a promis aux chefs en 1633 : « Nos garçons se marieront à vos filles, et nous ne serons plus qu'un peuple. » Un jeune colon et une Algonquine de Sillery demandent à se marier.","Champlain promised the chiefs in 1633: 'Our young men will marry your daughters, and we shall be one people.' A young settler and an Algonquin woman from Sillery ask to marry."),
 choices:[
  {label:R("Célébrer ce mariage et l'encourager","Celebrate this marriage and encourage others"),fx:s=>{s.women+=5;s.pop+=5;s.rAlg+=5;s.flags.mariageMixte=true;return R("La noce réunit les deux peuples. D'autres suivent, quelques-unes chaque année.","The wedding brings both peoples together. Others follow, a few each year.");}},
  {label:R("Seulement après baptême et instruction","Only after baptism and instruction"),fx:s=>{s.women+=4;s.pop+=4;s.church+=3;return R("Les jésuites préparent les fiancées pendant un an. Peu de couples attendent si longtemps.","The Jesuits prepare the brides for a year. Few couples wait that long.");}},
  {label:R("Décourager ces unions","Discourage these unions"),fx:s=>{s.rAlg-=6;return R("Les familles algonquines y voient une insulte. La promesse de Champlain reste lettre morte.","The Algonquin families see it as an insult. Champlain's promise remains a dead letter.");}}]});

add({id:'cq1_reduction',sys:true,place:'quebec',cond:s=>s.year>=1638&&s.year<1656&&s.orient.mis==='actives'&&s.church>=50,
 because:s=>R("Vos missions sont actives et l'Église est forte.","Your missions are active and the Church is strong."),
 title:R("Une réduction à la paraguayenne ?","A Paraguay-style reduction?"),
 text:R("Les jésuites admirent leurs confrères du Paraguay, qui ont bâti des villages de convertis loin des colons. Ils voudraient faire de Sillery et des missions des « réductions » où les Français n'entrent pas.","The Jesuits admire their brothers in Paraguay, who built villages of converts far from the settlers. They want to make Sillery and the missions into 'reductions' that Frenchmen may not enter."),
 choices:[
  {label:R("Accorder des villages séparés","Grant separate villages"),fx:s=>{s.church+=6;s.missions+=5;s.rAlg+=2;s.flags.reduction=true;return R("Sillery devient un village chrétien fermé, gouverné par ses chefs et ses pères. Les traiteurs en sont exclus.","Sillery becomes a closed Christian village, governed by its chiefs and its priests. Traders are kept out.");}},
  {label:R("Garder les missions ouvertes","Keep the missions open"),fx:s=>{s.rAlg+=3;s.church-=3;return R("Colons, traiteurs et convertis continuent de se côtoyer, pour le meilleur et pour le pire.","Settlers, traders and converts keep rubbing shoulders, for better and for worse.");}}]});

add({id:'druillettes1650',place:'quebec',cond:s=>s.year===1650&&s.season===2&&!s.flags.occupied,
 title:R("Druillettes à Boston","Druillettes in Boston"),
 text:R("Le jésuite Gabriel Druillettes part pour Boston avec une offre : une alliance contre les Haudenosaunee, et la liberté de commerce entre les deux colonies. Les puritains l'écoutent poliment.","The Jesuit Gabriel Druillettes leaves for Boston with an offer: an alliance against the Haudenosaunee, and free trade between the two colonies. The Puritans listen politely."),
 choices:[
  {label:R("Proposer l'alliance contre les Haudenosaunee","Propose the alliance against the Haudenosaunee"),hist:true,fx:s=>{s.flags.bostonTalks=true;s.compagnie-=2;return R("Boston refuse d'entrer en guerre : les Haudenosaunee ne la menacent pas. Mais on s'est parlé.","Boston refuses to go to war: the Haudenosaunee do not threaten it. But words have been exchanged.");}},
  {label:R("Ne proposer que le commerce","Propose trade only"),fx:s=>{s.flags.bostonTrade=true;s.treasury+=400;s.compagnie-=6;return R("Des navires de Boston viendront vendre farine et morue à Québec. La Compagnie crie à la trahison.","Boston ships will come to sell flour and cod in Québec. The Company cries treason.");}},
  {label:R("Ne pas l'envoyer","Don't send him"),fx:s=>R("Les deux colonies continuent de s'ignorer.","The two colonies go on ignoring each other.")}]});

add({id:'cq1_orleans',sys:true,place:'orleans',cond:s=>s.year>=1657&&(s.places.refuge||s.places.orleans)&&div(s,'orleans1656'),
 because:s=>R("Le massacre de l'île d'Orléans n'a pas eu lieu : le village wendat a survécu.","The Île d'Orléans massacre did not happen: the Wendat village survived."),
 title:R("Le village wendat de l'île d'Orléans","The Wendat village on the Île d'Orléans"),
 text:R("Les réfugiés wendats ont défriché, bâti des maisons longues et une chapelle. Ils demandent que ces terres leur appartiennent.","The Wendat refugees have cleared land, built longhouses and a chapel. They ask that the land be theirs."),
 choices:[
  {label:R("Leur concéder une seigneurie","Grant them a seigneury"),fx:s=>{relAdd(s,'wen',10);s.defense+=3;s.flags.wendatVillage=true;return R("Pour la première fois, une nation autochtone tient une seigneurie près de Québec. Ses guerriers gardent l'île.","For the first time, an Indigenous nation holds a seigneury near Québec. Its warriors guard the island.");}},
  {label:R("En faire une mission jésuite","Make it a Jesuit mission"),fx:s=>{relAdd(s,'wen',3);s.church+=3;return R("Les pères administrent la terre au nom des Wendats.","The Fathers manage the land on the Wendat's behalf.");}}]});

add({id:'cq1_larochelle',sys:true,place:'quebec',cond:s=>s.year>=1646&&s.flags.habitants&&s.autonomy>=40,
 because:s=>R("La Communauté des Habitants tient la traite, et les habitants ont pris de l'assurance.","The Community of Habitants holds the trade, and the habitants have grown confident."),
 title:R("Commercer seuls avec La Rochelle","Trading alone with La Rochelle"),
 text:R("Les marchands de la Communauté des Habitants veulent vendre leurs fourrures directement aux armateurs de La Rochelle, sans passer par les Cent-Associés.","The merchants of the Community of Habitants want to sell their furs directly to La Rochelle shipowners, bypassing the Hundred Associates."),
 choices:[
  {label:R("Les laisser faire","Let them"),fx:s=>{s.autonomy+=8;s.compagnie-=8;s.treasury+=400;s.flags.laRochelle=true;return R("Le profit reste au pays. À Paris, les Cent-Associés parlent de rébellion.","The profit stays in the country. In Paris, the Hundred Associates speak of rebellion.");}},
  {label:R("Maintenir le monopole","Keep the monopoly"),fx:s=>{s.compagnie+=4;s.autonomy-=3;return R("Les fourrures continuent de passer par les Cent-Associés.","The furs keep going through the Hundred Associates.");}}]});

add({id:'cq1_gannentaha',sys:true,place:'onondaga',cond:s=>s.year>=1658&&s.flags.gannKept,
 because:s=>R("Vous avez gardé la colonie française chez les Onontagués.","You kept the French colony among the Onondaga."),
 title:R("Sainte-Marie-de-Gannentaha survit","Sainte-Marie-de-Gannentaha survives"),
 text:R("La petite colonie au bord du lac Onontaga a passé l'hiver. Les Onontagués proposent d'y faire venir des familles, et de faire de leurs chefs les arbitres entre Français et Agniers.","The little colony on Onondaga Lake has made it through the winter. The Onondaga propose bringing families there, and making their chiefs the arbiters between the French and the Mohawk."),
 choices:[
  {label:R("Y envoyer des familles","Send families there"),fx:s=>{s.pop-=20;relAdd(s,'onon',12);relAdd(s,'agnier',-4);s.flags.gannStrong=true;return R("Vingt colons s'installent au cœur du pays haudenosaunee. Une autre histoire devient possible.","Twenty settlers settle in the heart of Haudenosaunee country. A different history becomes possible.");}},
  {label:R("La garder modeste","Keep it modest"),fx:s=>{relAdd(s,'onon',4);return R("Quelques jésuites et soldats, pas plus. Le poste vit au rythme des humeurs du conseil.","A few Jesuits and soldiers, no more. The post lives by the moods of the council.");}}]});
})();
