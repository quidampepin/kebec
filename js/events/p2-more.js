/* Kebec — Période II : événements ajoutés après l'atlas (réels et plausibles). Chargé après p2-consequences.js. */
(()=>{
const hist=e=>{e.period=2;EVENTS.push(e);EV[e.id]=e;};
const cqx=e=>{e.period=2;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||10;EVENTS.push(e);EV[e.id]=e;};
Object.assign(PLACES,{lorette:{ll:[-71.36,46.86],name:R('Jeune-Lorette','Jeune-Lorette'),dx:-6,dy:-8,anchor:'end',post:true,p2:true}});

/* ---------- réels, datés ---------- */
hist({id:'recollets1673',place:'quebec',cond:s=>s.year>=1673&&officer(s,'gov').name==='Louis de Buade de Frontenac',
 title:R("Frontenac contre les jésuites","Frontenac against the Jesuits"),
 text:R("Frontenac accuse les jésuites de vouloir gouverner le Canada. Il fait revenir les récollets et voudrait leur confier les missions de l'Ouest.","Frontenac accuses the Jesuits of wanting to govern Canada. He brings back the Recollets and wants to give them the western missions."),
 choices:[
  {label:R("Confier une partie des missions aux récollets","Give part of the missions to the Recollets"),hist:true,fx:s=>{s.off.gov+=8;s.off.eve-=12;s.flags.recollets=true;return R("Récollets et jésuites se disputent les âmes de l'Ouest ; les nations regardent ces robes noires et grises se quereller.","Recollets and Jesuits compete for the souls of the West; the nations watch the black and grey robes quarrel.");}},
  {label:R("Laisser les missions aux jésuites","Leave the missions to the Jesuits"),fx:s=>{s.off.eve+=6;s.off.gov-=10;return R("Le gouverneur fulmine. Les jésuites gardent leurs missions et leurs informateurs.","The governor fumes. The Jesuits keep their missions and their informants.");}}]});

hist({id:'revocation1685',place:'quebec',cond:s=>s.year>=1685&&(s.flags.huguenots||s.flags.huguenotsP2),
 title:R("La révocation atteint le Canada","The revocation reaches Canada"),
 text:R("L'édit de Fontainebleau interdit le culte protestant dans tout le royaume. Les huguenots que vous avez accueillis doivent se convertir ou partir.","The Edict of Fontainebleau bans Protestant worship throughout the kingdom. The Huguenots you took in must convert or leave."),
 choices:[
  {label:R("Les protéger discrètement","Protect them quietly"),fx:s=>{traitAdd(s,'ouverture',6);s.off.eve-=15;s.compagnie-=6;s.flags.tolerance=true;return R("On ferme les yeux sur des familles qui ne vont pas à la messe. Versailles finit par le savoir.","Eyes are closed to families who skip Mass. Versailles eventually finds out.");}},
  {label:R("Exiger des abjurations","Demand abjurations"),hist:true,fx:s=>{traitAdd(s,'ferveur',2);traitAdd(s,'ouverture',-3);s.pop-=30;s.off.eve+=6;return R("La plupart abjurent, du bout des lèvres. Quelques familles partent pour New York.","Most abjure, half-heartedly. A few families leave for New York.");}},
  {label:R("Les expulser","Expel them"),fx:s=>{s.pop-=100;s.treasury-=1200;traitAdd(s,'ouverture',-5);s.off.eve+=10;return R("Les marchands protestants partent avec leurs navires et leurs crédits.","The Protestant merchants leave with their ships and their credit.");}}]});

hist({id:'iberville1686',place:'michilimakinac',cond:s=>s.year>=1686,
 title:R("Iberville à la baie d'Hudson","Iberville on Hudson Bay"),
 text:R("Le chevalier de Troyes et les frères Le Moyne, dont Pierre d'Iberville, proposent de traverser les bois jusqu'à la baie d'Hudson et de prendre les forts anglais.","The Chevalier de Troyes and the Le Moyne brothers, among them Pierre d'Iberville, propose to cross the woods to Hudson Bay and seize the English forts."),
 choices:[
  {label:R("Financer l'expédition","Fund the expedition"),hist:true,fx:s=>{s.treasury-=1500;s.mods.fur*=1.15;s.compagnie+=4;traitAdd(s,'aventure',3);s.flags.baieFrancaise=true;return R("Trois forts tombent. Pendant dix ans, Iberville se battra dans la baie, sur terre et sur mer.","Three forts fall. For ten years Iberville will fight in the bay, on land and at sea.");}},
  {label:R("Laisser la baie aux Anglais","Leave the bay to the English"),fx:s=>{s.mods.fur*=.95;return R("Les Cris continuent de porter leurs fourrures aux Anglais de la baie.","The Cree keep taking their furs to the English on the bay.");}}]});
Object.assign(LIKELY,{iberville1686:s=>(s.flags.hbc||s.flags.hbcEnglish)?1:.6});

hist({id:'lorette1697',place:'lorette',cond:s=>s.year>=1697&&s.places.refuge,
 title:R("Les Wendats à la Jeune-Lorette","The Wendat at Jeune-Lorette"),
 text:R("Les Wendats réfugiés près de Québec depuis 1650 ont changé de village plusieurs fois. Ils veulent s'établir pour de bon à la Jeune-Lorette, sur la rivière Saint-Charles.","The Wendat, refugees near Québec since 1650, have moved village several times. They want to settle for good at Jeune-Lorette, on the Saint-Charles River."),
 choices:[
  {label:R("Leur garantir ces terres","Guarantee them the land"),hist:true,fx:s=>{s.places.lorette=true;relAdd(s,'wen',8);traitAdd(s,'alliance',3);return R("Wendake renaît au nord de Québec. Le village existe toujours.","Wendake is reborn north of Québec. The village still exists.");}},
  {label:R("Laisser les jésuites décider","Let the Jesuits decide"),fx:s=>{s.places.lorette=true;s.off.eve+=4;return R("Les pères installent la mission ; la terre reste à eux.","The Fathers set up the mission; the land remains theirs.");}}]});

hist({id:'deerfield1704',place:'villeMarie',cond:s=>s.year>=1704&&s.war&&s.rel.abenaki>=0,
 title:R("Le raid de Deerfield","The Deerfield raid"),
 text:R("Hertel de Rouville propose de mener 250 Canadiens, Abénakis et Kanien'kehá:ka de Kahnawake contre le village de Deerfield, au Massachusetts, en plein hiver.","Hertel de Rouville proposes to lead 250 Canadians, Abenaki and Kanien'kehá:ka from Kahnawake against the village of Deerfield, Massachusetts, in the dead of winter."),
 choices:[
  {label:R("Lancer le raid","Launch the raid"),hist:true,fx:s=>{relAdd(s,'abenaki',6);s.compagnie+=3;s.pop+=40;s.flags.deerfield=true;traitAdd(s,'ouverture',2);return R("Une cinquantaine de colons sont tués, 112 emmenés captifs vers le Canada. Beaucoup ne reviendront jamais, adoptés à Kahnawake ou à Montréal. La Nouvelle-Angleterre ne l'oubliera pas.","About fifty settlers are killed and 112 taken captive to Canada. Many will never return, adopted at Kahnawake or in Montréal. New England will not forget.");}},
  {label:R("L'interdire","Forbid it"),fx:s=>{relAdd(s,'abenaki',-8);s.compagnie-=3;return R("Les Abénakis partent seuls, ou ne partent pas. Ils se demandent si Onontio tient vraiment à la guerre.","The Abenaki go alone, or not at all. They wonder whether Onontio really wants the war.");}}]});
Object.assign(LIKELY,{deerfield1704:s=>s.flags.abenakiArmed?.95:s.rel.abenaki>=30?.75:.35});

hist({id:'fauxsauniers1730',place:'quebec',cond:s=>s.year>=1730,
 title:R("Les faux-sauniers","The salt smugglers"),
 text:R("Le Roi propose d'envoyer au Canada des contrebandiers de sel condamnés, plutôt qu'aux galères. Ce sont souvent de jeunes paysans robustes.","The King proposes to send convicted salt smugglers to Canada rather than to the galleys. They are often sturdy young peasants."),
 choices:[
  {label:R("Les accepter comme colons","Accept them as settlers"),hist:true,fx:s=>{s.pop+=160;traitAdd(s,'roi',-1);s.off.int+=4;return R("Quelques centaines arriveront en vingt ans. La plupart se marient et défrichent comme les autres.","A few hundred will arrive over twenty years. Most marry and clear land like everyone else.");}},
  {label:R("Refuser des condamnés","Refuse convicts"),fx:s=>{s.off.eve+=3;return R("Le Canada reste une terre d'engagés et de soldats.","Canada remains a land of indentured men and soldiers.");}}]});

hist({id:'leloutre1749',place:'portRoyal',cond:s=>s.year>=1749&&s.flags.acadiaLost&&s.rel.abenaki>=10,
 title:R("L'abbé Le Loutre et la guérilla","Abbé Le Loutre and the guerrilla"),
 text:R("Le missionnaire Jean-Louis Le Loutre pousse les Mi'kmaq et les Acadiens à harceler les Britanniques, qui viennent de fonder Halifax. Il demande de l'argent et des armes.","The missionary Jean-Louis Le Loutre urges the Mi'kmaq and the Acadians to harry the British, who have just founded Halifax. He asks for money and arms."),
 choices:[
  {label:R("Le soutenir","Support him"),hist:true,fx:s=>{relAdd(s,'abenaki',8);s.treasury-=1000;s.flags.guerilla=true;return R("Raids, incendies, primes pour les scalps : l'Acadie devient une zone de guerre. Lawrence en tirera prétexte.","Raids, fires, scalp bounties: Acadia becomes a war zone. Lawrence will use it as a pretext.");}},
  {label:R("Le modérer","Restrain him"),fx:s=>{relAdd(s,'abenaki',-5);s.flags.acadCalm=true;return R("La frontière reste tendue, mais calme. Les Acadiens espèrent qu'on les laissera neutres.","The border stays tense, but quiet. The Acadians hope they will be left neutral.");}}]});

hist({id:'emeute1757',place:'villeMarie',cond:s=>s.year>=1757&&s.war,
 title:R("L'émeute des femmes de Montréal","The Montréal women's riot"),
 text:R("Des femmes de Montréal jettent la viande de cheval qu'on leur distribue aux pieds du gouverneur : « Nous ne mangerons pas nos chevaux ! »","Women of Montréal throw the horsemeat they are rationed at the governor's feet: 'We will not eat our horses!'"),
 choices:[
  {label:R("Les menacer de prison, puis distribuer du bœuf","Threaten them with prison, then hand out beef"),hist:true,fx:s=>{s.food-=s.pop*.05;traitAdd(s,'roi',-2);s.off.int+=3;return R("Lévis menace, puis cède un peu. On s'en souviendra dans les cuisines de Montréal.","Lévis threatens, then gives way a little. It will be remembered in Montréal's kitchens.");}},
  {label:R("Les écouter et ouvrir les magasins du Roi","Hear them and open the King's stores"),fx:s=>{s.food-=s.pop*.12;s.autonomy+=4;traitAdd(s,'entraide',2);s.off.int-=8;return R("Les femmes rentrent chez elles avec du pain. Bigot enrage.","The women go home with bread. Bigot is furious.");}}]});

hist({id:'montcalm1758',place:'quebec',cond:s=>s.year>=1758&&s.war,must:true,
 title:R("Montcalm contre Vaudreuil","Montcalm against Vaudreuil"),
 text:R("Le général français veut concentrer les troupes autour de Québec et de Montréal, à l'européenne. Le gouverneur canadien veut la petite guerre : raids, alliés, embuscades. Versailles attend votre avis.","The French general wants to concentrate the troops around Québec and Montréal, European-style. The Canadian governor wants the 'petite guerre': raids, allies, ambushes. Versailles awaits your opinion."),
 choices:[
  {label:R("Donner raison à Montcalm","Side with Montcalm"),hist:true,fx:s=>{s.flags.strat='montcalm';s.defense+=6;s.off.gov-=8;traitAdd(s,'roi',2);return R("Le Roi confie la conduite de la guerre à Montcalm. Les miliciens sont versés dans les bataillons.","The King gives Montcalm command of the war. The militiamen are folded into the battalions.");}},
  {label:R("Donner raison à Vaudreuil","Side with Vaudreuil"),fx:s=>{s.flags.strat='vaudreuil';relAdd(s,'ouest',5);traitAdd(s,'aventure',3);s.off.gov+=8;return R("Les partis de guerre canadiens et alliés harcèlent les frontières. Montcalm écrit que la colonie est perdue.","Canadian and allied war parties harry the frontiers. Montcalm writes that the colony is lost.");}}]});

/* ---------- conséquences ---------- */
cqx({id:'cq_abenakis',place:'quebec',cond:s=>!!s.war&&s.rel.abenaki>=20&&s.year>=1689,w:s=>2+s.rel.abenaki/30,
 because:s=>R("Les Abénakis sont vos alliés, et la guerre a repris avec la Nouvelle-Angleterre.","The Abenaki are your allies, and war has resumed with New England."),
 title:R("Des fusils pour les Abénakis","Muskets for the Abenaki"),
 text:R("Les Abénakis, chassés vers le nord par les colons anglais, demandent des fusils, de la poudre et des présents pour reprendre leurs terres.","The Abenaki, driven north by English settlers, ask for muskets, powder and gifts to take back their lands."),
 choices:[
  {label:R("Les armer","Arm them"),fx:s=>{relAdd(s,'abenaki',10);s.treasury-=800;s.flags.abenakiArmed=true;return R("La frontière de la Nouvelle-Angleterre s'embrase. Les Abénakis deviennent le bouclier du Canada.","The New England frontier goes up in flames. The Abenaki become Canada's shield.");}},
  {label:R("Refuser : la guerre est assez chère","Refuse: the war is costly enough"),fx:s=>{relAdd(s,'abenaki',-6);return R("Ils repartent les mains vides, et vexés.","They leave empty-handed, and offended.");}}]});

cqx({id:'cq_officier',place:'quebec',cond:s=>s.year>=1715&&s.year<1755&&s.traits.roi<=66,w:s=>1+(66-s.traits.roi)/10,
 because:s=>R("Une génération d'officiers est née au Canada, et l'attachement au Roi n'est plus aveugle.","A generation of officers was born in Canada, and loyalty to the King is no longer blind."),
 title:R("Un Canadien refusé","A Canadian turned down"),
 text:R("Le fils d'un seigneur canadien, officier des troupes de la Marine, demande un brevet dans la marine royale. Le ministre répond que les Canadiens sont « trop indisciplinés ».","The son of a Canadian seigneur, an officer of the Troupes de la Marine, asks for a commission in the royal navy. The minister replies that Canadians are 'too undisciplined'."),
 choices:[
  {label:R("Protester auprès du ministre","Protest to the minister"),fx:s=>{traitAdd(s,'roi',-3);s.compagnie-=3;s.flags.elitesCanadiennes=true;return R("Le ministre ne change pas d'avis. À Québec, la lettre circule de salon en salon.","The minister does not change his mind. In Québec, the letter goes from salon to salon.");}},
  {label:R("Laisser passer","Let it go"),fx:s=>{traitAdd(s,'roi',-1);return R("Le jeune homme retourne dans l'Ouest commander un poste.","The young man goes back west to command a post.");}}]});

cqx({id:'cq_ecolesfilles',place:'quebec',cond:s=>s.year>=1690&&(s.flags.ecoles||s.church>=60||s.flags.bourgeoys),w:s=>1+(s.flags.bourgeoys?2:0)+(s.flags.ecoles?1:0),
 because:s=>R("Les Ursulines et la Congrégation de Marguerite Bourgeoys enseignent depuis longtemps ; l'Église est forte.","The Ursulines and Marguerite Bourgeoys's Congregation have long been teaching; the Church is strong."),
 title:R("Des écoles de filles dans les côtes","Girls' schools in the countryside"),
 text:R("Les sœurs de la Congrégation proposent d'ouvrir des écoles de filles dans les paroisses rurales. On dit que les Canadiennes lisent déjà mieux que leurs maris.","The Congregation sisters propose opening girls' schools in the rural parishes. It is said Canadian women already read better than their husbands."),
 choices:[
  {label:R("Les financer","Fund them"),fx:s=>{s.treasury-=1000;traitAdd(s,'ouverture',3);traitAdd(s,'ferveur',2);s.flags.ecolesFilles=true;return R("Des « petites écoles » ouvrent de Lachine à Château-Richer. Une génération de mères saura lire.","'Little schools' open from Lachine to Château-Richer. A generation of mothers will be able to read.");}},
  {label:R("Laisser faire les sœurs à leurs frais","Let the sisters do it at their own cost"),fx:s=>{traitAdd(s,'ferveur',1);return R("Quelques écoles ouvrent, là où les paroisses peuvent payer.","A few schools open, where parishes can pay.");}}]});

cqx({id:'cq_universite',place:'quebec',cond:s=>s.year>=1735&&(s.flags.ecoles||s.flags.ecolesFilles||s.flags.college)&&(s.flags.imprimerie||s.traits.ouverture>=50),w:s=>2,
 because:s=>R("Le pays a des écoles, et des esprits ouverts.","The country has schools, and open minds."),
 title:R("Une université à Québec ?","A university in Québec?"),
 text:R("Le collège des jésuites forme prêtres et arpenteurs. Des notables demandent une université, avec une faculté de droit et de médecine, pour ne plus envoyer leurs fils à Paris.","The Jesuit college trains priests and surveyors. Notables ask for a university, with faculties of law and medicine, so they need no longer send their sons to Paris."),
 choices:[
  {label:R("Fonder l'université","Found the university"),fx:s=>{s.treasury-=3000;traitAdd(s,'ouverture',6);s.autonomy+=4;s.off.eve-=6;s.flags.universite=true;return R("La première université d'Amérique du Nord française ouvre ses portes. Elle formera les avocats et les médecins de demain.","The first university of French North America opens its doors. It will train tomorrow's lawyers and doctors.");}},
  {label:R("Garder le collège des jésuites","Keep the Jesuit college"),fx:s=>{s.off.eve+=4;return R("Il n'y aura pas d'université au Québec avant 1852.","There will be no university in Québec until 1852.");}}]});

cqx({id:'cq_ohio',place:'villeMarie',cond:s=>s.year>=1754&&s.year<1759&&!!s.war&&s.traits.roi<=58,w:s=>1+(58-s.traits.roi)/6,
 because:s=>R("L'attachement au Roi s'est relâché, et la guerre se fait loin des paroisses.","Loyalty to the King has slackened, and the war is being fought far from the parishes."),
 title:R("Les miliciens refusent l'Ohio","The militia refuse the Ohio"),
 text:R("Des compagnies de milice refusent de partir pour l'Ohio : qui fera les récoltes ? Qui gardera les paroisses si les Anglais remontent le fleuve ?","Militia companies refuse to leave for the Ohio: who will bring in the harvest? Who will guard the parishes if the English come up the river?"),
 choices:[
  {label:R("Les y contraindre","Compel them"),fx:s=>{s.defense+=3;traitAdd(s,'roi',-4);return R("Ils partent, la rage au cœur. Les désertions se multiplient.","They go, seething. Desertions multiply.");}},
  {label:R("Les laisser garder les paroisses","Let them guard the parishes"),fx:s=>{s.defense-=4;traitAdd(s,'entraide',2);return R("L'Ohio se défendra avec les troupes et les alliés.","The Ohio will be defended by the troops and the allies.");}}]});

cqx({id:'cq_kahnawake',place:'kahnawake',cond:s=>s.places.kahnawake&&s.traits.alliance>=55&&s.year>=1700,w:s=>2,
 because:s=>R("Kahnawake est devenue un allié essentiel, et l'alliance avec les nations est forte.","Kahnawake has become an essential ally, and the alliance with the nations is strong."),
 title:R("Kahnawake veut ses propres lois","Kahnawake wants its own laws"),
 text:R("Les chefs de Kahnawake demandent que les leurs soient jugés par leur conseil, et non par les tribunaux de Montréal.","The chiefs of Kahnawake ask that their people be judged by their own council, not by the Montréal courts."),
 choices:[
  {label:R("Le leur accorder","Grant it"),fx:s=>{relAdd(s,'agnier',8);traitAdd(s,'alliance',4);s.off.gov-=4;s.flags.kahnawakeLois=true;return R("Kahnawake se gouverne elle-même, alliée et non sujette. Un précédent pour les siècles à venir.","Kahnawake governs itself, an ally and not a subject. A precedent for centuries to come.");}},
  {label:R("Refuser","Refuse"),fx:s=>{relAdd(s,'agnier',-5);return R("Les tribunaux de Montréal gardent la main. La contrebande, elle, continue.","The Montréal courts keep their grip. The smuggling goes on.");}}]});

cqx({id:'cq_seigneuresse',place:'troisRivieres',cond:s=>s.year>=1700&&s.traits.entraide>=50,w:s=>1+(s.traits.entraide-48)/8,
 because:s=>R("Les guerres ont fait beaucoup de veuves, et les paroisses s'entraident.","The wars have made many widows, and the parishes help one another."),
 title:R("Une seigneuresse","A seigneuress"),
 text:R("Comme Madeleine de Verchères ou Agathe de Saint-Père, une veuve tient seule sa seigneurie : elle concède des terres, bâtit un moulin et plaide au Conseil contre les héritiers de son mari.","Like Madeleine de Verchères or Agathe de Saint-Père, a widow runs her seigneury alone: she grants land, builds a mill and pleads before the Council against her husband's heirs."),
 choices:[
  {label:R("Lui donner raison","Rule in her favour"),fx:s=>{s.cleared+=120;s.autonomy+=2;traitAdd(s,'ouverture',2);return R("Le moulin tourne, les censitaires arrivent. Elle signera ses actes de sa propre main.","The mill turns, tenants arrive. She will sign her deeds with her own hand.");}},
  {label:R("Confier la seigneurie à un héritier","Hand the seigneury to an heir"),fx:s=>R("Le neveu la vend à un marchand de Québec, qui ne concède rien.","The nephew sells it to a Québec merchant, who grants nothing.")}]});

cqx({id:'cq_grandslacs',place:'michilimakinac',cond:s=>s.year>=1755&&s.rel.ouest>=30,w:s=>3,
 because:s=>R("Les nations des Grands Lacs sont vos alliées, et la défaite se dessine.","The Great Lakes nations are your allies, and defeat is looming."),
 title:R("Que vaudront les Anglais ?","What will the English be worth?"),
 text:R("Au conseil de Michilimakinac, des chefs outaouais demandent : si les Français partent, les Anglais donneront-ils des présents ? Respecteront-ils nos terres ?","At the Michilimackinac council, Odawa chiefs ask: if the French leave, will the English give gifts? Will they respect our lands?"),
 choices:[
  {label:R("Promettre que le Roi reviendra","Promise that the King will return"),fx:s=>{relAdd(s,'ouest',4);s.flags.pontiacSeed=2;return R("Ils retiennent la promesse. Quand les Anglais refuseront les présents, ils s'en souviendront.","They hold on to the promise. When the English refuse gifts, they will remember.");}},
  {label:R("Leur dire la vérité","Tell them the truth"),fx:s=>{relAdd(s,'ouest',-4);s.flags.pontiacSeed=1;return R("Ils repartent graves. Certains parlent déjà de s'unir entre nations.","They leave gravely. Some already speak of the nations uniting.");}}]});

cqx({id:'cq_donroi',place:'quebec',cond:s=>s.year>=1690&&s.traits.roi>=70,w:s=>1+(s.traits.roi-68)/5,
 because:s=>R("Les Canadiens sont très attachés au Roi.","Canadians are deeply attached to the King."),
 title:R("Un don pour le Roi","A gift for the King"),
 text:R("Des capitaines de milice proposent que chaque paroisse fournisse des hommes et du blé pour les forts, sans solde, « pour le service du Roi ».","Militia captains propose that each parish provide men and wheat for the forts, unpaid, 'for the King's service'."),
 choices:[
  {label:R("Accepter avec reconnaissance","Accept gratefully"),fx:s=>{s.defense+=6;s.compagnie+=4;traitAdd(s,'roi',2);s.food-=s.pop*.05;return R("Les paroisses envoient hommes et sacs de blé. Versailles cite le Canada en exemple.","The parishes send men and sacks of wheat. Versailles holds Canada up as an example.");}},
  {label:R("Refuser : les habitants ont assez donné","Decline: the habitants have given enough"),fx:s=>{traitAdd(s,'entraide',2);return R("On remercie. Les récoltes restent dans les granges.","Thanks are given. The harvests stay in the barns.");}}]});

cqx({id:'cq_eglisepierre',place:'beaupre',cond:s=>s.year>=1690&&s.traits.entraide>=60,w:s=>1+(s.traits.entraide-58)/5,
 because:s=>R("Les paroisses ont pris l'habitude des corvées et de l'entraide.","The parishes have grown used to corvées and mutual aid."),
 title:R("Une église de pierre","A stone church"),
 text:R("Les habitants d'une paroisse de la côte de Beaupré veulent remplacer leur chapelle de bois par une église de pierre, bâtie par corvées. Ils demandent un peu d'aide pour la charpente et les cloches.","The habitants of a Côte-de-Beaupré parish want to replace their wooden chapel with a stone church, built by corvée. They ask for a little help with the timber frame and the bells."),
 choices:[
  {label:R("Les aider","Help them"),fx:s=>{s.treasury-=500;s.church+=4;traitAdd(s,'entraide',2);traitAdd(s,'ferveur',1);return R("L'église est bénie trois ans plus tard. Chaque famille y a mis sa pierre.","The church is blessed three years later. Every family laid a stone.");}},
  {label:R("Les laisser faire seuls","Let them do it alone"),fx:s=>{traitAdd(s,'entraide',1);return R("Ça prendra dix ans, mais elle sera debout.","It will take ten years, but it will stand.");}}]});
/* ---------- les drapeaux restés sans suite trouvent leur effet ---------- */
{const L=LIKELY.lachine1689,G=LIKELY.grandepaix1701;
 if(L)LIKELY.lachine1689=s=>L(s)*(s.flags.gannStrong?.65:s.flags.gannKept?.85:1);
 if(G)LIKELY.grandepaix1701=s=>clamp(G(s)+(s.flags.gannStrong?.08:s.flags.gannKept?.04:0),.08,.98);
 const c=EV.carignan1665;if(c)for(const ch of c.choices){const f=ch.fx;ch.fx=s=>{const r=f(s);if(s.flags.askTroops)s.defense+=5;return r;};}}
 {const A=LIKELY.acadie1755;LIKELY.acadie1755=s=>clamp((A?A(s):1)+(s.flags.guerilla?.1:0)-(s.flags.acadCalm?.15:0),.05,1);}
 const CP=colonyPower;colonyPower=s=>CP(s)+(s.flags.strat==='montcalm'?5:s.flags.strat==='vaudreuil'?(s.rel.ouest>=30?6:-2):0)+(s.flags.abenakiArmed?2:0);
})();
