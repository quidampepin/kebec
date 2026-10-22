/* Onontio — Vignettes historiques uniques, arcs narratifs, limites des imprévus. */
/* ===== v4: unique historical vignettes, arcs, futures ===== */
const arc=(s,n)=>(s.arcs&&s.arcs[n])||{stage:0,path:null,last:-99};
function setArc(s,n,path){s.arcs=s.arcs||{};const a=arc(s,n);s.arcs[n]={stage:a.stage+1,path,last:s.year};}
const pick=(s,n,map,def)=>map[arc(s,n).path]||def;
EVENTS.push(
/* --- Champlain years --- */
{id:'brule1610',place:'allumette',cond:s=>s.year===1610&&s.season===2,
 title:R("L'échange de jeunes gens","The exchange of young men"),
 text:R("Le chef algonquin Iroquet propose un échange : un jeune Français passera l'hiver chez les Algonquins et les Wendats pour apprendre leur langue, et un jeune Wendat, Savignon, partira voir la France.",
        "The Algonquin chief Iroquet proposes an exchange: a young Frenchman will winter with the Algonquins and Wendat to learn their language, and a young Wendat, Savignon, will go to see France."),
 choices:[
  {label:R("Envoyer le jeune Étienne Brûlé","Send young Étienne Brûlé"),hist:true,fx:s=>{s.flags.brule=true;s.rAlg+=5;s.rWen+=5;s.truchYear=s.year;return R("Brûlé part en canot. Il deviendra le premier truchement, et un homme libre de toute loi.","Brûlé leaves by canoe. He will become the first interpreter, and a man free of all law.");}},
  {label:R("Refuser : trop risqué","Refuse: too risky"),fx:s=>{s.rAlg-=4;s.rWen-=4;return R("Iroquet repart déçu. Il faudra se contenter d'interprètes de fortune.","Iroquet leaves disappointed. You'll have to make do with makeshift interpreters.");}}
 ]},
{id:'ludovica1618',place:'quebec',cond:s=>s.year===1618&&s.season===0,
 title:R("Le grand projet","The grand plan"),
 text:R("Vous pourriez présenter au roi et à la Chambre de commerce un plan ambitieux : 300 familles et 300 soldats, une ville nommée Ludovica sur la rivière Saint-Charles, des douanes sur le fleuve. Les marchands de la Compagnie n'en veulent pas : ça coûte cher et ça ne rapporte pas de castor.",
        "You could present the King and the Chamber of Commerce with an ambitious plan: 300 families and 300 soldiers, a city called Ludovica on the Saint-Charles river, customs posts on the river. The Company's merchants want none of it: it's expensive and yields no beaver."),
 choices:[
  {label:R("Plaider le projet à la cour","Plead the plan at court"),hist:true,fx:s=>{if(Math.random()<.3){s.pendingSettlers+=40;s.pendingWomen+=12;s.compagnie-=8;return R("Contre toute attente, le roi impose une partie du plan à la Compagnie. Des familles s'embarqueront.","Against all odds, the King imposes part of the plan on the Company. Families will sail.");}s.compagnie-=4;return R("On vous applaudit, on vous approuve, et rien ne se passe. Comme dans l'histoire réelle.","They applaud you, approve you, and nothing happens. Just as in real history.");}},
  {label:R("Ménager la Compagnie","Humour the Company"),fx:s=>{s.compagnie+=6;return R("Les marchands apprécient votre sens des réalités.","The merchants appreciate your realism.");}}
 ]},
{id:'boulle1620',place:'quebec',cond:s=>s.year===1620&&s.season===1,
 title:R("Hélène Boullé","Hélène Boullé"),
 text:R("Votre jeune épouse, Hélène Boullé, débarque à Québec. Elle apprend vite l'algonquin et veut instruire les enfants innus.",
        "Your young wife, Hélène Boullé, lands at Québec. She learns Algonquin quickly and wants to teach Innu children."),
 choices:[
  {label:R("L'encourager","Encourage her"),hist:true,fx:s=>{s.rAlg+=4;s.church+=2;return R("Les femmes innues viennent la voir. On dit qu'elle porte un petit miroir à la ceinture, où les enfants se voient « dans son cœur ».","Innu women come to see her. They say she wears a small mirror at her belt, where children see themselves 'in her heart'.");}},
  {label:R("La garder à l'Habitation","Keep her at the Habitation"),fx:s=>R("Elle s'ennuie, et rentrera en France dans quatre ans.","She's bored, and will go back to France in four years.")}
 ]},
{id:'peace1624',place:'troisRivieres',cond:s=>s.year===1624&&s.season===1,
 title:R("Une paix aux Trois-Rivières","A peace at Trois-Rivières"),
 text:R("Des Agniers viennent aux Trois-Rivières négocier avec les Innus et les Algonquins. Vos alliés vous demandent d'être témoin, et garant.",
        "Mohawk envoys come to Trois-Rivières to negotiate with the Innu and Algonquins. Your allies ask you to be witness and guarantor."),
 choices:[
  {label:R("Se porter garant de la paix","Stand guarantor of the peace"),hist:true,fx:s=>{relAdd(s,'agnier',35);relAdd(s,'onon',10);s.haudTalk=(s.haudTalk||0)+1;s.flags.peace1624=true;return R("Les colliers sont échangés. La paix tiendra trois ans.","Belts are exchanged. The peace will hold three years.");}},
  {label:R("Rester à l'écart","Stay out of it"),fx:s=>{relAdd(s,'agnier',10);s.rAlg-=3;return R("La paix se fait sans vous, et vous en profitez à peine.","The peace is made without you, and you barely benefit.");}}
 ]},
{id:'jesuits1625',place:'quebec',cond:s=>s.year===1625&&s.season===1,
 title:R("Les Jésuites","The Jesuits"),
 text:R("Trois Jésuites débarquent : Charles Lalemant, Énemond Massé et Jean de Brébeuf. Ils sont mieux financés, mieux formés et plus ambitieux que les Récollets.",
        "Three Jesuits land: Charles Lalemant, Énemond Massé and Jean de Brébeuf. They are better funded, better trained and more ambitious than the Recollects."),
 choices:[
  {label:R("Les accueillir et leur ouvrir la Huronie","Welcome them and open Huronia to them"),hist:true,fx:s=>{s.church+=10;s.missions+=10;s.flags.jesuits=true;return R("Brébeuf apprendra le wendat mieux qu'aucun Français. Les Jésuites deviennent une puissance.","Brébeuf will learn Wendat better than any Frenchman. The Jesuits become a power.");}},
  {label:R("Les loger, mais garder la main","House them, but keep control"),fx:s=>{s.church+=4;s.missions+=4;return R("Ils s'installent à Notre-Dame-des-Anges, et écrivent beaucoup.","They settle at Notre-Dame-des-Anges, and write a great deal.");}}
 ]},
{id:'tourmente1627',place:'quebec',cond:s=>s.year===1627&&s.season===2,
 title:R("Deux morts au cap Tourmente","Two dead at Cap Tourmente"),
 text:R("Deux Français sont tués près du cap Tourmente. Selon la coutume innue, la famille du meurtrier offre des présents pour « couvrir les morts ». Selon la justice française, il faut livrer le coupable.",
        "Two Frenchmen are killed near Cap Tourmente. By Innu custom, the killer's family offers gifts to 'cover the dead'. By French justice, the guilty man must be handed over."),
 choices:[
  {label:R("Exiger le coupable","Demand the guilty man"),hist:true,fx:s=>{s.rAlg-=6;s.flags.foi=true;return R("Les Innus refusent. Après des mois de tension, ils confient trois jeunes filles à votre garde en gage. Vous les nommez Foi, Espérance et Charité.","The Innu refuse. After months of tension, they entrust three young girls to your care as a pledge. You name them Faith, Hope and Charity.");}},
  {label:R("Accepter les présents, à la manière innue","Accept the gifts, the Innu way"),fx:s=>{s.rAlg+=6;s.church-=3;s.flags.covered=true;return R("Les morts sont couverts. Les Innus retiennent que vous avez compris leur loi ; les Jésuites, que vous avez plié.","The dead are covered. The Innu remember that you understood their law; the Jesuits, that you bent.");}}
 ]},
{id:'brulekirke1629',place:'tadoussac',cond:s=>s.year===1629&&s.season===0&&s.flags.brule,
 title:R("Le traître","The traitor"),
 text:R("On apprend qu'Étienne Brûlé et Nicolas Marsolet, vos propres truchements, guident les navires des Kirke sur le fleuve. Ils connaissent chaque haut-fond.",
        "Word comes that Étienne Brûlé and Nicolas Marsolet, your own interpreters, are piloting the Kirkes' ships up the river. They know every shoal."),
 choices:[{label:R("Le maudire","Curse him"),fx:s=>{s.defense-=4;s.flags.bruleTraitor=true;return R("Le premier coureur des bois a choisi son camp.","The first coureur des bois has chosen his side.");}}]},
{id:'brule1633',place:'huronia',cond:s=>s.year===1633&&s.season===1&&s.flags.brule&&!s.flags.occupied&&!s.wenFallen,
 title:R("La mort de Brûlé","Brûlé's death"),
 text:R("Étienne Brûlé a été tué et mangé à Toanché, en Huronie. Les Wendats craignent votre colère et n'osent plus descendre traiter.",
        "Étienne Brûlé has been killed and eaten at Toanché, in Huronia. The Wendat fear your anger and no longer dare come down to trade."),
 choices:[
  {label:R("Les rassurer : c'était un traître","Reassure them: he was a traitor"),hist:true,fx:s=>{s.rWen+=6;return R("Vous déclarez que Brûlé n'était plus français. Les flottilles reprennent la route.","You declare that Brûlé was no longer French. The fleets take to the river again.");}},
  {label:R("Exiger réparation","Demand reparation"),fx:s=>{s.rWen-=10;s.treasury+=200;return R("Les Wendats paient des présents, et se souviennent.","The Wendat pay gifts, and remember.");}}
 ]},
{id:'nicolet1634',place:'west',cond:s=>s.year===1634&&s.season===1&&!s.flags.occupied,
 title:R("Jean Nicolet vers la mer de l'Ouest","Jean Nicolet towards the Western Sea"),
 text:R("Le truchement Jean Nicolet veut aller au-delà de la Mer Douce, chez les « Gens de mer » dont parlent les Wendats. Il emporte une robe de damas chinois, au cas où il arriverait en Asie.",
        "The interpreter Jean Nicolet wants to go beyond the Freshwater Sea, to the 'People of the Sea' the Wendat speak of. He packs a Chinese damask robe, in case he reaches Asia."),
 choices:[
  {label:R("Financer l'expédition (400 livres)","Fund the expedition (400 livres)"),hist:true,fx:s=>{s.treasury-=400;s.flags.west=(s.flags.west||0)+1;return R("Nicolet débarque à la baie des Puants en tirant deux pistolets, vêtu de soie. Les Ho-Chunk n'ont jamais vu ça. Pas d'Asie, mais un continent.","Nicolet lands at Green Bay firing two pistols, dressed in silk. The Ho-Chunk have never seen anything like it. No Asia, but a continent.");}},
  {label:R("Garder l'argent pour la colonie","Keep the money for the colony"),fx:s=>{s.treasury+=0;return R("L'Ouest attendra.","The West will wait.");}}
 ]},
{id:'college1635',place:'quebec',cond:s=>s.year===1635&&s.season===1&&!s.flags.occupied,
 title:R("Un collège à Québec","A college at Québec"),
 text:R("Les Jésuites veulent ouvrir un collège, un an avant Harvard. Des fils de colons et quelques jeunes autochtones y apprendraient le latin et les mathématiques.",
        "The Jesuits want to open a college, a year before Harvard. Settlers' sons and a few Indigenous youths would learn Latin and mathematics there."),
 choices:[
  {label:R("Donner un terrain","Grant land"),hist:true,fx:s=>{s.church+=5;s.autonomy+=2;s.flags.college=true;return R("Le collège de Québec ouvre ses portes. La colonie formera ses propres arpenteurs, ses notaires, ses prêtres.","The Québec college opens. The colony will train its own surveyors, notaries and priests.");}},
  {label:R("Ce n'est pas le moment","Not now"),fx:s=>R("Les fils de colons apprendront à lire au presbytère, ou pas du tout.","Settlers' sons will learn to read at the rectory, or not at all.")}
 ]},
{id:'stemarie1639',place:'huronia',cond:s=>s.year===1639&&s.season===2&&!s.wenFallen,
 title:R("Sainte-Marie-au-pays-des-Hurons","Sainte-Marie among the Hurons"),
 text:R("Le père Jérôme Lalemant veut bâtir une mission fortifiée au cœur de la Huronie : chapelle, forge, hôpital, et des donnés français pour la défendre.",
        "Father Jérôme Lalemant wants to build a fortified mission in the heart of Huronia: chapel, forge, hospital, and French lay helpers to defend it."),
 choices:[
  {label:R("Y envoyer des ouvriers et des armes (500 livres)","Send workers and arms (500 livres)"),hist:true,fx:s=>{s.treasury-=500;s.pop-=10;s.wenStr+=4;s.missions+=6;return R("Une palissade de pierre et de pieux s'élève sur la rivière Wye. Un bout de France au pays wendat.","A palisade of stone and stakes rises on the Wye river. A piece of France in Wendat country.");}},
  {label:R("Les Jésuites se débrouilleront","The Jesuits will manage"),fx:s=>{s.church-=3;return R("La mission reste modeste.","The mission stays modest.");}}
 ]},
{id:'talks1641',place:'troisRivieres',cond:s=>s.year===1641&&s.season===2&&!s.flags.occupied,
 title:R("Pourparlers aux Trois-Rivières","Talks at Trois-Rivières"),
 text:s=>({fr:`Des Agniers ramènent deux Français captifs, Marguerie et Godefroy, et proposent de parler. Ils veulent des fusils, et une paix qui exclut vos alliés algonquins.${(s.haudTalk||0)>=2?' Vos gestes passés leur font croire que vous êtes sincère.':''}`,en:`Mohawk envoys bring back two French captives, Marguerie and Godefroy, and offer to talk. They want guns, and a peace that leaves out your Algonquin allies.${(s.haudTalk||0)>=2?' Your past gestures make them believe you are sincere.':''}`}),
 choices:[
  {label:R("Refuser de leur vendre des armes","Refuse to sell them arms"),hist:true,fx:s=>{relAdd(s,'agnier',-12);s.rAlg+=3;return R("Les pourparlers échouent. Les fusils viendront de Fort Orange.","The talks fail. The muskets will come from Fort Orange.");}},
  {label:R("Proposer des présents, sans armes","Offer gifts, no arms"),fx:s=>{s.treasury-=300;if((s.haudTalk||0)>=2||Math.random()<.3){relAdd(s,'agnier',30);s.haudTalk=(s.haudTalk||0)+1;return R("Les Agniers acceptent une trêve. Vos gestes passés ont compté.","The Mohawk accept a truce. Your past gestures counted.");}relAdd(s,'agnier',-4);return R("Ils prennent les présents et repartent.","They take the gifts and leave.");}}
 ]},
{id:'jogues1642',place:'champlainLake',cond:s=>s.year===1642&&s.season===2&&!s.flags.occupied,
 title:R("Jogues, Goupil et Couture","Jogues, Goupil and Couture"),
 text:R("Le père Isaac Jogues, le chirurgien René Goupil et le jeune Guillaume Couture sont capturés par les Agniers sur le lac Saint-Pierre. Goupil est tué. Les Hollandais de Fort Orange offrent de racheter Jogues.",
        "Father Isaac Jogues, the surgeon René Goupil and young Guillaume Couture are captured by the Mohawk on Lac Saint-Pierre. Goupil is killed. The Dutch at Fort Orange offer to ransom Jogues."),
 choices:[
  {label:R("Accepter l'aide hollandaise","Accept Dutch help"),hist:true,fx:s=>{s.church+=4;s.flags.couture=true;return R("Jogues s'évade sur un navire hollandais. Couture, lui, est adopté par une famille agnière ; il en apprendra la langue et les usages.","Jogues escapes on a Dutch ship. Couture is adopted by a Mohawk family; he'll learn their language and ways.");}},
  {label:R("Envoyer un parti les délivrer","Send a party to rescue them"),fx:s=>{s.pop-=6;relAdd(s,'agnier',-18);return R("Le parti se perd dans les montagnes. Six hommes ne reviennent pas.","The party gets lost in the mountains. Six men don't come back.");}}
 ]},
{id:'fortRich1642',place:'fortRichelieu',cond:s=>s.year===1642&&s.season===1&&!s.flags.occupied,
 title:R("Un fort à l'embouchure","A fort at the river mouth"),
 text:R("Le gouverneur veut bâtir un fort à l'embouchure de la rivière des Iroquois, pour fermer la route des partis de guerre vers le fleuve.",
        "The governor wants to build a fort at the mouth of the River of the Iroquois, to close the war parties' route to the St. Lawrence."),
 choices:[
  {label:R("Bâtir le fort Richelieu (800 livres)","Build Fort Richelieu (800 livres)"),hist:true,fx:s=>{s.treasury-=800;s.places.fortRichelieu=true;s.defense+=10;return R("Les Agniers l'attaquent avant même qu'il soit fini, et sont repoussés.","The Mohawk attack it before it's even finished, and are driven back.");}},
  {label:R("Renforcer plutôt les établissements","Reinforce the settlements instead"),fx:s=>{s.treasury-=300;s.defense+=4;return R("Des palissades plus hautes, partout un peu.","Taller palisades, a bit everywhere.");}}
 ]},
{id:'pieskaret1643',place:'allumette',cond:s=>s.year===1643&&s.season===1&&s.rAlg>=40,
 title:R("Pieskaret","Pieskaret"),
 text:R("Pieskaret, chef de guerre algonquin, est devenu une légende : on dit qu'il entre seul dans les villages ennemis, la nuit. Il vous demande des armes pour une grande expédition.",
        "Pieskaret, the Algonquin war chief, has become a legend: it is said he walks alone into enemy villages at night. He asks you for arms for a great expedition."),
 choices:[
  {label:R("Lui donner des fusils","Give him muskets"),fx:s=>{s.rAlg+=8;relAdd(s,'agnier',-12);relAdd(s,'onon',-6);s.church-=3;return R("Pieskaret revient avec des scalps et des captifs. Les Agniers le craignent plus que vos soldats.","Pieskaret returns with scalps and captives. The Mohawk fear him more than your soldiers.");}},
  {label:R("Lui offrir le baptême et des présents","Offer him baptism and gifts"),hist:true,fx:s=>{s.rAlg+=4;s.church+=4;return R("Il est baptisé Simon. Il reste chef de guerre, et chrétien.","He is baptised Simon. He remains a war chief, and a Christian.");}}
 ]},
{id:'dauversiere1644',place:'villeMarie',cond:s=>s.year===1644&&s.season===0&&s.places.villeMarie,
 title:R("La place d'Armes","Place d'Armes"),
 text:R("Deux cents Agniers attaquent Ville-Marie. Maisonneuve sort à la tête de trente hommes, recule pied à pied, et abat lui-même le chef ennemi.",
        "Two hundred Mohawk attack Ville-Marie. Maisonneuve sallies out at the head of thirty men, falls back step by step, and kills the enemy chief himself."),
 choices:[{label:R("Célébrer le gouverneur de Montréal","Celebrate the governor of Montréal"),fx:s=>{s.defense+=4;s.autonomy+=2;return R("Ville-Marie tient. On donnera son nom à la place.","Ville-Marie holds. The square will bear the name.");}}]},
{id:'conseil1647',place:'quebec',cond:s=>s.year===1647&&s.season===0&&!s.flags.occupied,
 title:R("Le Conseil de Québec","The Council of Québec"),
 text:R("Un Conseil va gouverner la colonie : le gouverneur, le supérieur des Jésuites, le gouverneur de Montréal. Les habitants demandent d'y avoir des représentants élus, des syndics.",
        "A Council will govern the colony: the governor, the Jesuit superior, the governor of Montréal. The habitants ask to have elected representatives, syndics, on it."),
 choices:[
  {label:R("Admettre des syndics élus","Admit elected syndics"),hist:true,fx:s=>{s.autonomy+=12;s.church-=3;s.flags.syndics=true;return R("En 1648, des habitants élus siègent au Conseil. Une première, timide, en Amérique française.","In 1648, elected habitants sit on the Council. A first, timid, in French America.");}},
  {label:R("Un conseil de notables seulement","A council of notables only"),fx:s=>{s.autonomy-=5;s.church+=4;return R("Le pouvoir reste entre le gouverneur et les robes noires.","Power stays between the governor and the Black Robes.");}}
 ]},
{id:'teanaostaie1648',place:'huronia',cond:s=>s.year===1648&&s.season===1&&!s.wenFallen,
 title:R("Teanaostaiaé","Teanaostaiaé"),
 text:R("Le village wendat de Teanaostaiaé (Saint-Joseph) est détruit pendant que ses guerriers sont partis traiter. Le père Antoine Daniel est tué. Les Wendats vous demandent des soldats pour l'hiver.",
        "The Wendat village of Teanaostaiaé (Saint-Joseph) is destroyed while its warriors are away trading. Father Antoine Daniel is killed. The Wendat ask you for soldiers for the winter."),
 choices:[
  {label:R("Envoyer vingt soldats en Huronie","Send twenty soldiers to Huronia"),fx:s=>{s.pop-=20;s.wenStr+=12;s.rWen+=6;return R("Vingt arquebusiers remontent avec la flottille. Cela suffira-t-il ?","Twenty arquebusiers go up with the fleet. Will it be enough?");}},
  {label:R("Envoyer des présents et des prières","Send gifts and prayers"),hist:true,fx:s=>{s.treasury-=200;s.rWen+=2;return R("Les Wendats repartent seuls vers le pays qui brûle.","The Wendat go back alone to a country that is burning.");}}
 ]},
{id:'gahoendoe1650',place:'gahoendoe',cond:s=>s.year===1650&&s.season===0&&s.wenFallen,
 title:R("L'hiver de Gahoendoe","The winter on Gahoendoe"),
 text:R("Les Wendats réfugiés sur l'île de Gahoendoe ont passé un hiver de famine : des milliers sont morts. Les Jésuites proposent de ramener les survivants jusqu'à Québec.",
        "The Wendat refugees on Gahoendoe island have endured a winter of famine: thousands have died. The Jesuits propose to bring the survivors down to Québec."),
 choices:[
  {label:R("Les accueillir près de Québec","Take them in near Québec"),hist:true,fx:s=>{s.places.refuge=true;s.food-=40;s.rWen+=10;return R("Trois cents Wendats descendent le fleuve. Ils fonderont, après bien des haltes, la Jeune-Lorette : Wendake.","Three hundred Wendat come down the river. After many stops they'll found Jeune-Lorette: Wendake.");}},
  {label:R("Leur conseiller de rejoindre les Pétuns","Advise them to join the Petun"),fx:s=>{s.rWen-=10;return R("Ils partent vers l'ouest. Leurs descendants seront les Wyandots de l'Ohio.","They head west. Their descendants will be the Wyandot of Ohio.");}}
 ]},
{id:'kerbodot1652',place:'troisRivieres',cond:s=>s.year===1652&&s.season===1&&s.places.troisRivieres&&s.rel.agnier<-20,
 title:R("Le gouverneur des Trois-Rivières","The governor of Trois-Rivières"),
 text:R("Duplessis-Kerbodot, gouverneur des Trois-Rivières, veut poursuivre un parti agnier avec quarante hommes. Les vétérans disent que c'est un piège.",
        "Duplessis-Kerbodot, governor of Trois-Rivières, wants to pursue a Mohawk party with forty men. The veterans say it's a trap."),
 choices:[
  {label:R("Le laisser sortir","Let him go"),hist:true,fx:s=>{s.pop-=22;s.defense-=6;return R("C'était un piège. Kerbodot et une vingtaine d'hommes sont tués dans les marais.","It was a trap. Kerbodot and some twenty men are killed in the marshes.");}},
  {label:R("Lui ordonner de rester derrière la palissade","Order him to stay behind the palisade"),fx:s=>{relAdd(s,'agnier',-4);return R("Il obéit en maugréant. Les Agniers brûlent quelques granges.","He obeys, grumbling. The Mohawk burn a few barns.");}}
 ]},
{id:'peace1653',place:'onondaga',cond:s=>s.year===1653&&s.season===2&&(s.rel.agnier<20||s.rel.onon<20)&&!s.flags.occupied,
 title:R("La paix de 1653","The peace of 1653"),
 text:R("Les Onontagués puis les Agniers proposent la paix. Ils ont leurs propres guerres à l'ouest et au sud. Guillaume Couture, l'ancien captif, peut servir d'interprète.",
        "First the Onondaga, then the Mohawk, offer peace. They have their own wars to the west and south. Guillaume Couture, the former captive, can interpret."),
 choices:[
  {label:R("Accepter la paix","Accept the peace"),hist:true,fx:s=>{relAdd(s,'onon',45);relAdd(s,'agnier',s.flags.couture?40:25);s.flags.peace=true;s.haudTalk=(s.haudTalk||0)+1;return R("Pour la première fois depuis des années, on laboure sans fusil à l'épaule.","For the first time in years, people plough without a musket on their shoulder.");}},
  {label:R("Exiger d'abord la libération des Wendats captifs","First demand the release of Wendat captives"),fx:s=>{if(Math.random()<.4){relAdd(s,'onon',40);relAdd(s,'agnier',20);s.rWen+=10;s.flags.peace=true;return R("Les Onontagués cèdent. Des familles wendates sont réunies.","The Onondaga yield. Wendat families are reunited.");}relAdd(s,'onon',-10);return R("Les négociations échouent.","The talks fail.");}}
 ]},
{id:'peaceEnd1655',place:'champlainLake',cond:s=>s.year===1655&&s.season===2&&s.flags.peace,
 title:R("La paix s'effrite","The peace frays"),
 text:R("Les Agniers reprennent les raids, jaloux de la faveur accordée aux Onontagués.","The Mohawk resume raids, jealous of the favour shown to the Onondaga."),
 choices:[{label:R("Se préparer","Get ready"),fx:s=>{s.flags.peace=false;relAdd(s,'agnier',-40);return R("La paix aura duré deux ans.","The peace lasted two years.");}}]},
{id:'orleans1656',place:'orleans',cond:s=>s.year===1656&&s.season===0&&(s.places.refuge||s.places.orleans),
 title:R("Massacre à l'île d'Orléans","Massacre on the Île d'Orléans"),
 text:R("Trois cents Agniers descendent le fleuve et attaquent les Wendats réfugiés à l'île d'Orléans, sous les canons de Québec. Les Wendats regardent vers vous.",
        "Three hundred Mohawk come down the river and attack the Wendat refugees on the Île d'Orléans, under the guns of Québec. The Wendat look to you."),
 choices:[
  {label:R("Ne pas intervenir : la paix est fragile","Don't intervene: the peace is fragile"),hist:true,fx:s=>{s.rWen-=25;s.rAlg-=8;return R("Les Agniers repartent avec quatre-vingts captifs, en passant devant Québec. Les Wendats n'oublieront jamais.","The Mohawk leave with eighty captives, paddling past Québec. The Wendat will never forget.");}},
  {label:R("Faire tirer les canons","Open fire"),fx:s=>{relAdd(s,'agnier',-45);s.rWen+=12;s.rAlg+=6;s.flags.peace=false;return R("Les canons de Québec tonnent. La paix est rompue, mais vos alliés savent que vous les défendez.","Québec's guns roar. The peace is broken, but your allies know you defend them.");}}
 ]},
{id:'bourgeoys1658',place:'villeMarie',cond:s=>s.year===1658&&s.season===0&&s.places.villeMarie,
 title:R("L'école dans l'étable","The school in the stable"),
 text:R("Marguerite Bourgeoys, arrivée avec la Grande Recrue, veut ouvrir une école pour les filles de Ville-Marie, dans une étable de pierre.",
        "Marguerite Bourgeoys, who came with the Great Levy, wants to open a school for the girls of Ville-Marie, in a stone stable."),
 choices:[
  {label:R("Lui donner l'étable","Give her the stable"),hist:true,fx:s=>{s.church+=3;s.autonomy+=3;s.flags.bourgeoys=true;return R("La première école de Montréal ouvre. Les filles du pays sauront lire, souvent mieux que leurs maris.","Montréal's first school opens. The colony's girls will read, often better than their husbands.");}},
  {label:R("Pas d'argent pour ça","No money for that"),fx:s=>R("Elle enseignera quand même, ailleurs.","She'll teach anyway, elsewhere.")}
 ]},
{id:'radisson1660',place:'villeMarie',cond:s=>s.year===1660&&s.season===2&&!s.flags.occupied,
 title:R("Radisson et Des Groseilliers","Radisson and Des Groseilliers"),
 text:s=>{const p=arc(s,'coureurs').path;const extra={tolerate:R(" Ce sont vos coureurs : ceux que vous avez laissé faire depuis des années."," These are your coureurs: the ones you've let roam for years."),license:R(" Ils sont partis sans congé, malgré votre système de permis."," They left without a licence, despite your permit system."),punish:R(" Ils sont partis malgré vos punitions, et le savent."," They left despite your punishments, and know it.")}[p]||R('','');
  return {fr:`Pierre-Esprit Radisson et son beau-frère Médard Chouart des Groseilliers descendent du lac Supérieur avec soixante canots chargés de castor, la plus grosse cargaison jamais vue. Ils ont traité sans permission. Ils parlent d'une mer au nord, la baie d'Hudson, accessible par la terre.${extra.fr}`,en:`Pierre-Esprit Radisson and his brother-in-law Médard Chouart des Groseilliers come down from Lake Superior with sixty canoes of beaver, the largest cargo ever seen. They traded without permission. They speak of a sea to the north, Hudson Bay, reachable overland.${extra.en}`};},
 choices:[
  {label:R("Saisir les fourrures et leur imposer une amende","Seize the furs and fine them"),hist:true,fx:s=>{s.treasury+=1500;s.compagnie+=4;s.flags.hbcEnglish=true;return R("Ils repartent ruinés et furieux… vers Boston, puis Londres. Dans dix ans, ils fonderont pour les Anglais la Compagnie de la baie d'Hudson.","They leave ruined and furious… for Boston, then London. In ten years they'll found the Hudson's Bay Company for the English.");}},
  {label:R("Les récompenser et financer leur route du Nord","Reward them and fund their northern route"),fx:s=>{s.treasury-=500;s.compagnie-=6;s.mods.fur*=1.3;s.flags.northFrench=true;return R("Vous les nommez explorateurs du roi. La baie d'Hudson pourrait être française avant d'être anglaise.","You name them the King's explorers. Hudson Bay could be French before it is English.");}},
  {label:R("Couper la poire en deux","Split the difference"),fx:s=>{s.treasury+=600;if(Math.random()<.5){s.flags.hbcEnglish=true;return R("Ils acceptent, puis partent quand même chez les Anglais.","They accept, then leave for the English anyway.");}s.flags.northFrench=true;return R("Ils acceptent. Ils repartiront pour vous.","They accept. They'll go north for you.");}}
 ]},
{id:'boucher1661',place:'quebec',cond:s=>s.year===1661&&s.season===2&&!s.flags.occupied,
 title:R("Pierre Boucher à Versailles","Pierre Boucher at Versailles"),
 text:s=>({fr:`La colonie compte ${nf(s.pop,'fr')} habitants et vit sous la menace des raids. Pierre Boucher, gouverneur des Trois-Rivières, peut aller plaider la cause de la Nouvelle-France devant le jeune Louis XIV.`,en:`The colony has ${nf(s.pop,'en')} settlers and lives under the threat of raids. Pierre Boucher, governor of Trois-Rivières, could go and plead New France's cause before the young Louis XIV.`}),
 choices:[
  {label:R("Envoyer Boucher","Send Boucher"),hist:true,fx:s=>{s.flags.boucher=true;s.pendingSettlers+=100;s.pendingWomen+=10;s.compagnie-=5;return R("Louis XIV l'écoute. Il promet des soldats et des colons, et décide de reprendre la colonie en main.","Louis XIV listens. He promises soldiers and settlers, and decides to take the colony in hand.");}},
  {label:R("Laisser la Compagnie parler pour la colonie","Let the Company speak for the colony"),fx:s=>{s.compagnie+=5;return R("La Compagnie demande plus de monopoles. Le roi soupire.","The Company asks for more monopolies. The King sighs.");}}
 ]},
{id:'brandy1662',place:'quebec',cond:s=>s.year===1662&&s.season===1,
 title:R("La crise de l'eau-de-vie","The brandy crisis"),
 text:s=>{const p=arc(s,'brandy').path;return {fr:`Le gouverneur Davaugour autorise la traite de l'eau-de-vie ; Laval excommunie les vendeurs.${p==='allow'?' Votre tolérance passée a fait de l\'eau-de-vie une monnaie courante.':p==='ban'?' Vous l\'aviez interdite ; les marchands n\'ont jamais accepté.':''} La colonie se déchire.`,en:`Governor Davaugour allows the brandy trade; Laval excommunicates the sellers.${p==='allow'?' Your past tolerance has made brandy common currency.':p==='ban'?' You had banned it; the merchants never accepted that.':''} The colony is tearing itself apart.`};},
 choices:[
  {label:R("Laisser Laval obtenir le rappel du gouverneur","Let Laval have the governor recalled"),hist:true,fx:s=>{s.church+=10;s.autonomy-=4;s.flags.lavalWins=true;return R("Laval part pour la France et revient vainqueur. L'Église sort de la crise plus forte que l'État.","Laval sails for France and returns victorious. The Church comes out of the crisis stronger than the State.");}},
  {label:R("Soutenir le gouverneur contre l'évêque","Back the governor against the bishop"),fx:s=>{s.church-=12;s.mods.fur*=1.15;s.flags.stateWins=true;return R("L'eau-de-vie coule, l'évêque fulmine. Le roi devra trancher.","Brandy flows, the bishop thunders. The King will have to decide.");}}
 ]},
/* --- arcs: second steps (drawn like unplanned events, but only after step one) --- */
{id:'arc_coureurs2',sys:true,arc:'coureurs',stage:1,gap:6,max:1,place:'west',cond:s=>s.year<1659,
 title:s=>pick(s,'coureurs',{tolerate:R("Les coureurs ont fait leur réseau","The coureurs have built their network"),punish:R("Les coureurs passés aux Hollandais","The coureurs gone over to the Dutch"),license:R("Le marché des congés","The licence market")},R('','')),
 text:s=>pick(s,'coureurs',{
  tolerate:R("Les jeunes que vous avez laissés partir connaissent maintenant les rivières jusqu'aux Grands Lacs. Ils ont des épouses et des enfants chez les Anishinaabeg. L'un d'eux propose de guider des marchands vers l'ouest.","The young men you let go now know the rivers as far as the Great Lakes. They have wives and children among the Anishinaabeg. One of them offers to guide merchants west."),
  punish:R("Les coureurs que vous avez punis sont passés chez les Hollandais de Fort Orange, avec leurs langues et leurs routes. Ils détournent des canots vers le sud.","The coureurs you punished have gone over to the Dutch at Fort Orange, with their languages and their routes. They are steering canoes south."),
  license:R("Vos congés de traite rapportent, mais ils se revendent à prix d'or. Quelques notables tiennent tout le commerce des bois.","Your trading licences pay, but they're resold at a premium. A few notables control the whole woods trade.")},R('','')),
 choices:s=>pick(s,'coureurs',{
  tolerate:[{label:R("Financer une expédition vers l'ouest (400 livres)","Fund an expedition west (400 livres)"),fx:s=>{s.treasury-=400;s.flags.west=(s.flags.west||0)+1;s.mods.fur*=1.2;setArc(s,'coureurs','tolerate');return R("Les Pays d'en haut s'ouvrent. Le castor de l'Ouest descendra par l'Outaouais.","The upper country opens. Western beaver will come down the Outaouais.");}},
            {label:R("Les ramener dans la colonie","Bring them back into the colony"),fx:s=>{s.pop+=6;s.rAlg-=3;setArc(s,'coureurs','tolerate');return R("Certains reviennent, avec leurs familles métisses. D'autres restent dans les bois.","Some come back, with their mixed families. Others stay in the woods.");}}],
  punish:[{label:R("Offrir une amnistie","Offer an amnesty"),fx:s=>{s.pop+=6;s.autonomy+=3;s.mods.fur*=1.1;setArc(s,'coureurs','tolerate');return R("Une partie revient. Ils ramènent leurs routes.","Some come back. They bring their routes with them.");}},
          {label:R("Les déclarer hors-la-loi","Declare them outlaws"),fx:s=>{s.mods.fur*=.85;s.rAlg-=4;setArc(s,'coureurs','punish');return R("Ils ne reviendront pas. Les Hollandais les accueillent.","They won't be back. The Dutch welcome them.");}}],
  license:[{label:R("Plafonner le nombre de congés","Cap the number of licences"),fx:s=>{s.autonomy-=3;s.church+=2;setArc(s,'coureurs','license');return R("Le commerce se resserre, les notables grognent.","The trade tightens, the notables grumble.");}},
           {label:R("Laisser le marché faire","Let the market run"),fx:s=>{s.treasury+=400;s.church-=3;s.autonomy+=3;setArc(s,'coureurs','license');return R("Une élite marchande naît dans la colonie.","A merchant elite is born in the colony.");}}]
 },[])},
{id:'arc_brandy2',sys:true,arc:'brandy',stage:1,gap:5,max:1,place:'tadoussac',cond:s=>s.year<1659,
 title:s=>pick(s,'brandy',{allow:R("Le prix de l'eau-de-vie","The price of brandy"),ban:R("L'eau-de-vie des autres","Other people's brandy")},R('','')),
 text:s=>pick(s,'brandy',{
  allow:R("À Tadoussac, un chasseur innu ivre a tué un Français. Les chefs innus vous demandent eux-mêmes de cesser la vente d'eau-de-vie dans leurs campements.","At Tadoussac, a drunken Innu hunter has killed a Frenchman. The Innu chiefs themselves ask you to stop selling brandy in their camps."),
  ban:R("Les interlopes basques et les Hollandais vendent l'eau-de-vie que vous refusez. Une partie des chasseurs va traiter chez eux.","Basque interlopers and the Dutch sell the brandy you refuse. Some hunters go to trade with them.")},R('','')),
 choices:s=>pick(s,'brandy',{
  allow:[{label:R("Interdire la vente dans les campements","Ban sales in the camps"),fx:s=>{s.rAlg+=6;s.church+=4;s.mods.fur*=.9;setArc(s,'brandy','ban');return R("Les chefs vous remercient. Les marchands, moins.","The chiefs thank you. The merchants, less so.");}},
         {label:R("Continuer : c'est le commerce","Carry on: that's trade"),fx:s=>{s.rAlg-=8;s.church-=5;s.mods.fur*=1.1;setArc(s,'brandy','allow');return R("L'eau-de-vie devient la première monnaie de la traite.","Brandy becomes the fur trade's main currency.");}}],
  ban:[{label:R("Chasser les interlopes","Drive off the interlopers"),fx:s=>{s.defense-=3;s.compagnie+=4;setArc(s,'brandy','ban');return R("Une barque armée patrouille le bas du fleuve.","An armed boat patrols the lower river.");}},
       {label:R("Céder : l'autoriser, avec mesure","Give in: allow it, in moderation"),fx:s=>{s.church-=6;s.mods.fur*=1.1;setArc(s,'brandy','allow');return R("« Avec mesure. » Personne n'y croit.","'In moderation.' No one believes it.");}}]
 },[])}
);
/* make step-one events open their arcs */
(()=>{const map={sys_coureurs:['coureurs',['punish','tolerate','license']],sys_brandy:['brandy',['allow','ban']],sys_captives:['haud',null],sys_quarrel:['church',null]};
 for(const e of EVENTS){if(!map[e.id])continue;const[n,paths]=map[e.id];e.arc0=n;e.choices.forEach((c,i)=>{const f=c.fx;c.fx=s=>{const r=f(s);if(arc(s,n).stage===0)setArc(s,n,paths?paths[i]:'x');if(n==='haud'&&i===0)s.haudTalk=(s.haudTalk||0)+1;return r;};});}
 const lim={sys_brandy:1,sys_coureurs:1,sys_feast:2,sys_fire:1,sys_harvest:3,sys_pursuit:2,sys_captives:2,sys_relations:2,sys_shipfever:2,sys_women:2,sys_dutch:2,sys_inspector:2,sys_seigneur:3,sys_quarrel:2,sys_hostages:1,sys_secret:1,sys_winter:2,sys_basques:2};
 for(const e of EVENTS)if(lim[e.id]){e.max=lim[e.id];e.cool=Math.max(e.cool,8);}
 const c=EVENTS.find(e=>e.id==='sys_coureurs');if(c)c.cond=s=>s.pop>60&&s.year>=1630&&s.year<1652;
})();

