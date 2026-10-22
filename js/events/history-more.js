/* Onontio — Événements historiques supplémentaires. */
/* ---- more historical events ---- */
const nf=(n,l)=>Math.round(n).toLocaleString(l==='fr'?'fr-CA':'en-CA');
EVENTS.push(
{id:'duval1608',place:'quebec',cond:s=>s.year===1608&&s.season===1,
 title:R("Le complot de Duval","Duval's plot"),
 text:R("Le serrurier Jean Duval et trois complices veulent vous assassiner et livrer l'Habitation à des marchands basques. Un des conjurés vient de tout avouer au pilote.",
        "The locksmith Jean Duval and three accomplices plan to murder you and hand the Habitation to Basque traders. One of the plotters has just confessed everything to the pilot."),
 choices:[
  {label:R("Faire pendre Duval, renvoyer les complices en France","Hang Duval, send the accomplices to France"),hist:true,fx:s=>{s.pop-=4;s.compagnie+=3;return R("La tête de Duval est exposée au bout d'une pique. Plus personne ne complote.","Duval's head is displayed on a pike. No one plots again.");}},
  {label:R("Les renvoyer tous en France","Send them all back to France"),fx:s=>{s.pop-=4;return R("Justice sans sang. Les hommes vous jugent un peu mou.","Justice without blood. The men think you a little soft.");}},
  {label:R("Pardonner : chaque bras compte","Pardon them: every pair of hands counts"),fx:s=>{s.flags.pardon=true;s.compagnie-=4;return R("Les conjurés jurent fidélité. Vous gardez vos 28 hommes… et un doute.","The plotters swear loyalty. You keep your 28 men… and a doubt.");}}
 ]},
{id:'sorel1610',place:'troisRivieres',cond:s=>s.year===1610&&s.season===1&&s.orient.all==='armee',
 title:R("Bataille à l'embouchure","Battle at the river mouth"),
 text:R("Un parti agnier s'est retranché près de l'embouchure de la rivière des Iroquois. Vos alliés attaquent et vous appellent.",
        "A Mohawk party has dug in near the mouth of the River of the Iroquois. Your allies attack and call for you."),
 choices:[
  {label:R("Mener l'assaut","Lead the assault"),hist:true,fx:s=>{s.haud+=8;s.rAlg+=6;s.rWen+=4;s.pop-=1;return R("Une flèche vous fend l'oreille et le cou, mais le retranchement tombe.","An arrow splits your ear and neck, but the barricade falls.");}},
  {label:R("Rester en soutien, à distance","Stay in support, at a distance"),fx:s=>{s.rAlg-=5;s.rWen-=3;return R("Vos alliés gagnent sans vous et le font savoir.","Your allies win without you and say so.");}}
 ]},
{id:'tessouat1613',place:'allumette',cond:s=>s.year===1613&&s.season===1,
 title:R("Tessouat, à l'île aux Allumettes","Tessouat, at Allumette Island"),
 text:R("Vous remontez la rivière des Outaouais, passé la rivière de la Petite-Nation, chez les Weskarinis. À l'île aux Allumettes, le chef kichesipirini Tessouat contrôle le passage : rien ne monte ni ne descend sans péage. Il refuse que vous alliez traiter directement avec les nations plus loin.",
        "You paddle up the Ottawa River, past the Petite-Nation river, home of the Weskarini. At Allumette Island, the Kichesipirini chief Tessouat controls the passage: nothing goes up or down without a toll. He refuses to let you trade directly with the nations beyond."),
 choices:[
  {label:R("Respecter son droit de passage","Respect his right of passage"),hist:true,fx:s=>{s.rAlg+=8;return R("Tessouat vous fête. Les Algonquins resteront les gardiens de la route.","Tessouat feasts you. The Algonquins will remain the keepers of the route.");}},
  {label:R("Forcer le passage pour traiter en amont","Force the passage to trade upriver"),fx:s=>{s.rAlg-=12;s.rWen+=6;s.mods.fur*=1.15;return R("Vous passez. Les Wendats apprécient ; Tessouat ne l'oubliera pas.","You get through. The Wendat approve; Tessouat will not forget.");}}
 ]},
{id:'onondaga1615',place:'onondaga',cond:s=>s.year===1615&&s.season===2,
 title:R("L'expédition de 1615","The 1615 expedition"),
 text:R("Les Wendats vous ont reçu en Huronie tout l'été. Ils préparent maintenant une attaque contre un village fortifié onontagué, au sud du lac Ontario, et comptent sur vos arquebuses.",
        "The Wendat hosted you in Huronia all summer. Now they are preparing an attack on a fortified Onondaga village south of Lake Ontario, and they are counting on your arquebuses."),
 choices:[
  {label:R("Les accompagner","Go with them"),hist:true,fx:s=>{s.rWen+=6;relAdd(s,'onon',-35);s.pop-=1;return R("L'assaut échoue. Blessé au genou, vous êtes porté dans un panier et passez l'hiver chez les Wendats. Vous en revenez avec une connaissance intime de leur pays.","The assault fails. Wounded in the knee, you are carried in a basket and winter among the Wendat. You come back knowing their country intimately.");}},
  {label:R("Décliner, et rentrer avant les glaces","Decline, and go home before the ice"),fx:s=>{s.rWen-=10;return R("Les Wendats partent seuls. Ils se demandent à quoi sert un allié qui ne se bat pas.","The Wendat go alone. They wonder what use an ally is who won't fight.");}}
 ]},
{id:'giffard1634',place:'beauport',cond:s=>s.year===1634&&s.season===0&&!s.flags.occupied,
 title:R("Robert Giffard et les Percherons","Robert Giffard and the Percherons"),
 text:R("Le médecin Robert Giffard demande la seigneurie de Beauport. Il promet d'y amener à ses frais des familles du Perche, des artisans et des laboureurs.",
        "The physician Robert Giffard asks for the seigneury of Beauport. He promises to bring families from the Perche at his own cost: craftsmen and ploughmen."),
 choices:[
  {label:R("Concéder la seigneurie","Grant the seigneury"),hist:true,fx:s=>{s.places.beauport=true;s.pop+=40;s.women+=12;s.families=true;s.cleared+=10;s.compagnie-=2;return R("Les Juchereau, les Cloutier, les Guyon arrivent. Leurs noms seront partout en Amérique trois siècles plus tard.","The Juchereaus, Cloutiers and Guyons arrive. Their names will be everywhere in America three centuries later.");}},
  {label:R("Refuser : la terre reste à la Compagnie","Refuse: the land stays with the Company"),fx:s=>{s.compagnie+=4;return R("Giffard repart. Le Perche restera au Perche.","Giffard leaves. The Perche stays in the Perche.");}}
 ]},
{id:'sillery1637',place:'quebec',cond:s=>s.year===1637&&s.season===1&&!s.flags.occupied,
 title:R("Sillery","Sillery"),
 text:R("Les Jésuites veulent installer des familles innues et algonquines converties à Sillery, près de Québec, pour qu'elles y cultivent la terre « à la française ».",
        "The Jesuits want to settle converted Innu and Algonquin families at Sillery, near Québec, to farm the land 'the French way'."),
 choices:[
  {label:R("Soutenir le projet","Support the project"),hist:true,fx:s=>{s.church+=6;s.missions+=5;s.rAlg+=2;s.treasury-=200;return R("Une réduction s'élève à Sillery. Certains s'y installent ; beaucoup repartent vers leurs territoires de chasse.","A mission settlement rises at Sillery. Some stay; many go back to their hunting grounds.");}},
  {label:R("Laisser les alliés vivre selon leurs usages","Let the allies live by their own ways"),fx:s=>{s.church-=4;s.rAlg+=4;return R("Les Jésuites écrivent à Paris que le gouverneur manque de zèle.","The Jesuits write to Paris that the governor lacks zeal.");}}
 ]},
{id:'gann1656',place:'onondaga',cond:s=>s.year===1656&&s.season===0&&!s.flags.occupied&&s.pop>150,
 title:R("L'invitation des Onontagués","The Onondaga invitation"),
 text:R("Les Onontagués, en guerre contre d'autres nations, proposent la paix et invitent les Français à fonder une mission chez eux, au lac Gannentaha. Otages ou alliés ? Personne ne le sait.",
        "The Onondaga, at war with other nations, offer peace and invite the French to found a mission in their country, on Lake Gannentaha. Hostages or allies? No one knows."),
 choices:[
  {label:R("Envoyer une cinquantaine de Français","Send about fifty French"),hist:true,fx:s=>{s.pop-=50;s.flags.gann=true;relAdd(s,'onon',45);relAdd(s,'agnier',-8);return R("Une petite colonie française s'installe au cœur du pays haudenosaunee.","A small French colony settles in the heart of Haudenosaunee country.");}},
  {label:R("Décliner poliment","Decline politely"),fx:s=>{relAdd(s,'onon',-12);return R("Les Onontagués rentrent offensés.","The Onondaga go home offended.");}}
 ]},
{id:'gann1658',place:'onondaga',cond:s=>s.year===1658&&s.season===0&&s.flags.gann,
 title:R("Le festin à tout manger","The eat-all feast"),
 text:R("Des Onontagués préviennent que la mission sera massacrée. Les Français ont construit des bateaux en secret. Il faudrait offrir un grand festin, faire manger et dormir les hôtes, et fuir dans la nuit.",
        "Onondaga friends warn that the mission will be massacred. The French have secretly built boats. One could offer a great feast, let the hosts eat until they sleep, and slip away in the night."),
 choices:[
  {label:R("Fuir après le festin","Flee after the feast"),hist:true,fx:s=>{s.pop+=48;relAdd(s,'onon',-40);return R("Au matin, le village se réveille dans une mission vide. Les Français sont déjà sur la rivière.","In the morning, the village wakes to an empty mission. The French are already on the river.");}},
  {label:R("Rester et négocier","Stay and negotiate"),fx:s=>{if(Math.random()<.45){relAdd(s,'onon',25);s.flags.gannKept=true;return R("Le pari réussit : les Onontagués gardent la paix. Une colonie française survit au lac Gannentaha.","The gamble pays off: the Onondaga keep the peace. A French colony survives on Lake Gannentaha.");}relAdd(s,'onon',-50);return R("Le massacre a lieu. Personne ne revient.","The massacre happens. No one returns.");}}
 ]},
{id:'quake1663',place:'quebec',cond:s=>s.year===1662&&s.season===3,
 title:R("La terre tremble","The earth shakes"),
 text:R("Le 5 février, un tremblement de terre secoue la vallée pendant des jours. Des pans de rive glissent dans le fleuve. Laval y voit un avertissement divin contre l'eau-de-vie.",
        "On 5 February, an earthquake shakes the valley for days. Whole riverbanks slide into the river. Laval sees it as a divine warning against brandy."),
 choices:[{label:R("Ordonner des prières publiques","Order public prayers"),fx:s=>{s.church+=6;return R("Les églises sont pleines. Pour un temps.","The churches are full. For a while.");}}]}
);
