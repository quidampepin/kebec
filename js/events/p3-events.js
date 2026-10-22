/* Kebec — Période III (1760–1867) : événements historiques datés, conséquences et imprévus.
   Vous parlez au nom des Canadiens ; le gouverneur, Londres et les Américains sont des forces extérieures. */
(()=>{
const P3E=[];
const ev3=e=>{e.period=3;P3E.push(e);};
const cq3=e=>{e.period=3;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;P3E.push(e);};
const sy3=e=>{e.period=3;e.sys=true;e.max=e.max||2;e.cool=e.cool||10;P3E.push(e);};
const T=traitAdd,ra=relAdd;
const fp=s=>s.pop-s.ang;
const L3={};

/* ===================== 1760–1774 : le régime militaire et la Proclamation ===================== */
ev3({id:'regime1760',place:'quebec',cond:s=>s.year>=1760,must:true,
 title:R("Le régime militaire","Military rule"),
 text:R("Amherst laisse trois gouvernements militaires à Québec, Trois-Rivières et Montréal. Les capitaines de milice canadiens rendent la justice au nom du roi George. Les élites hésitent : partir pour la France avec les officiers, ou rester avec le peuple ?","Amherst leaves three military governments at Québec, Trois-Rivières and Montréal. Canadien militia captains administer justice in King George's name. The elite hesitates: leave for France with the officers, or stay with the people?"),
 choices:[
  {label:R("Rester et collaborer avec Murray","Stay and work with Murray"),hist:true,fx:s=>{s.compagnie+=6;T(s,'roi',2);s.autonomy+=2;return R("Les capitaines de milice gardent leur rôle. Murray écrit à Londres que les Canadiens sont « le peuple le plus brave et le meilleur du globe ».","The militia captains keep their role. Murray writes to London that the Canadiens are 'perhaps the bravest and best race upon the globe'.");}},
  {label:R("Que les élites rentrent en France","Let the elite go back to France"),fx:s=>{s.pop-=2200;s.treasury-=1500;s.compagnie+=2;T(s,'entraide',4);T(s,'ouverture',-2);return R("Plusieurs centaines de nobles, d'officiers et de marchands partent. Le peuple reste avec ses curés.","Several hundred nobles, officers and merchants leave. The people remain with their priests.");}},
  {label:R("Résister en silence","Resist in silence"),fx:s=>{s.compagnie-=8;s.patri+=6;T(s,'roi',-4);return R("On obéit du bout des lèvres. Murray se méfie.","People obey grudgingly. Murray grows wary.");}}]});

ev3({id:'paris1763',place:'quebec',cond:s=>s.year>=1763,must:true,
 title:R("Le traité de Paris","The Treaty of Paris"),
 text:s=>s.flags.cededAtPeace?R("La colonie a tenu, mais Louis XV préfère la Guadeloupe et son sucre. Le Canada est cédé à la Grande-Bretagne. Les Canadiens ont dix-huit mois pour vendre leurs biens et partir.","The colony held, but Louis XV prefers Guadeloupe and its sugar. Canada is ceded to Great Britain. The Canadiens have eighteen months to sell their property and leave."):R("La France cède le Canada à la Grande-Bretagne. Voltaire ironise sur « quelques arpents de neige ». Les Canadiens ont dix-huit mois pour vendre leurs biens et partir.","France cedes Canada to Great Britain. Voltaire jokes about 'a few acres of snow'. The Canadiens have eighteen months to sell their property and leave."),
 choices:[
  {label:R("Rester : c'est notre pays","Stay: this is our country"),hist:true,fx:s=>{T(s,'entraide',2);s.patri+=2;return R("Moins de 2 % des Canadiens partent. Le peuple a choisi le pays plutôt que le roi.","Fewer than 2% of the Canadiens leave. The people have chosen the country over the king.");}},
  {label:R("Encourager les départs","Encourage departures"),fx:s=>{s.pop-=4000;T(s,'roi',3);return R("Quelques milliers partent pour la France ou la Louisiane. Ceux qui restent sont plus seuls.","A few thousand leave for France or Louisiana. Those who remain are lonelier.");}}]});

ev3({id:'pontiac1763',place:'detroit',cond:s=>s.year>=1763,
 title:R("La guerre de Pontiac","Pontiac's War"),
 text:R("Le chef outaouais Pontiac soulève les nations des Grands Lacs : les Anglais refusent les présents et traitent les alliés en vaincus. Des émissaires demandent si les Canadiens se joindront à eux, comme au temps d'Onontio.","The Odawa chief Pontiac raises the Great Lakes nations: the British refuse gifts and treat the allies as conquered. Envoys ask whether the Canadiens will join them, as in Onontio's day."),
 choices:[
  {label:R("Rester neutres","Stay neutral"),hist:true,fx:s=>{ra(s,'ouest',-6);return R("Les Canadiens ne bougent pas. Pontiac assiège Détroit pendant des mois, puis signe la paix. Londres en tire une leçon : la Proclamation royale.","The Canadiens do not move. Pontiac besieges Detroit for months, then makes peace. London learns a lesson: the Royal Proclamation.");}},
  {label:R("Les aider en secret","Help them in secret"),fx:s=>{ra(s,'ouest',12);s.compagnie-=10;T(s,'alliance',4);s.flags.pontiacAide=true;return R("Poudre et nouvelles passent par les voyageurs. Les Anglais soupçonnent les Canadiens de Détroit.","Powder and news pass through the voyageurs. The British suspect the Canadiens of Detroit.");}},
  {label:R("Fournir des miliciens aux Anglais","Provide militiamen to the British"),fx:s=>{ra(s,'ouest',-14);s.compagnie+=8;T(s,'roi',3);return R("Trois cents Canadiens accompagnent Bradstreet sur les lacs. Les nations se souviennent.","Three hundred Canadiens go with Bradstreet on the lakes. The nations remember.");}}]});

ev3({id:'proclamation1763',place:'quebec',cond:s=>s.year>=1763&&s.fired.paris1763,
 title:R("La Proclamation royale","The Royal Proclamation"),
 text:R("Londres réduit la « Province of Quebec » à la vallée du Saint-Laurent, promet une assemblée et les lois anglaises, et exige le serment du Test : aucun catholique ne peut occuper de charge. À l'ouest, un vaste territoire est réservé aux nations.","London shrinks the 'Province of Quebec' to the St. Lawrence valley, promises an assembly and English law, and requires the Test Oath: no Catholic may hold office. In the west, a vast territory is reserved to the nations."),
 choices:[
  {label:R("Pétitionner pour garder nos lois","Petition to keep our laws"),hist:true,fx:s=>{s.patri+=4;s.autonomy+=2;T(s,'entraide',1);return R("Les seigneurs et les marchands canadiens signent pétition sur pétition. Murray, lui-même, laisse appliquer la coutume de Paris en douce.","The seigneurs and Canadien merchants sign petition after petition. Murray himself quietly lets the Custom of Paris apply.");}},
  {label:R("Accepter et prêter serment","Accept and take the oath"),fx:s=>{s.compagnie+=8;T(s,'ferveur',-6);s.off.eve-=20;T(s,'roi',4);return R("Quelques-uns renient leur foi pour une charge. Les curés les dénoncent en chaire.","A few renounce their faith for an office. The priests denounce them from the pulpit.");}},
  {label:R("Défendre aussi les terres des nations","Also defend the nations' lands"),fx:s=>{T(s,'alliance',5);ra(s,'ouest',6);ra(s,'abenaki',4);s.compagnie-=3;return R("Les Canadiens rappellent que les nations étaient leurs alliées. Les Odanak et Kahnawake s'en souviendront.","The Canadiens recall that the nations were their allies. Odanak and Kahnawake will remember.");}}]});

ev3({id:'gazette1764',place:'quebec',cond:s=>s.year>=1764,
 title:R("La Gazette de Québec","The Quebec Gazette"),
 text:R("Deux imprimeurs de Philadelphie lancent un journal bilingue, le premier du pays. Ils cherchent des abonnés et des textes en français.","Two printers from Philadelphia launch a bilingual newspaper, the first in the country. They need subscribers and articles in French."),
 choices:[
  {label:R("S'abonner et y écrire","Subscribe and write for it"),hist:true,fx:s=>{s.edu+=2;T(s,'ouverture',2);s.flags.gazette=true;return R("Chaque jeudi, la Gazette donne les nouvelles d'Europe et les ordonnances, en deux colonnes. C'est elle qui résumera vos années.","Every Thursday the Gazette brings news from Europe and the ordinances, in two columns. It will summarize your years.");}},
  {label:R("Laisser ce journal aux Anglais","Leave the paper to the English"),fx:s=>{T(s,'ouverture',-2);s.flags.gazette=true;return R("La Gazette paraît quand même, surtout en anglais.","The Gazette appears anyway, mostly in English.");}}]});

ev3({id:'briand1766',place:'quebec',cond:s=>s.year>=1766,must:true,
 title:R("Un évêque pour Québec","A bishop for Québec"),
 text:R("Le siège est vide depuis 1760. Sans évêque, plus d'ordinations : en vingt ans, il n'y aurait plus de prêtres. Londres tolérerait un « surintendant », sacré discrètement en France, s'il prêche la loyauté.","The see has been empty since 1760. Without a bishop there are no ordinations: in twenty years there would be no priests. London would tolerate a 'superintendent', quietly consecrated in France, if he preaches loyalty."),
 choices:[
  {label:R("Accepter le compromis : Briand","Accept the compromise: Briand"),hist:true,fx:s=>{s.church+=10;T(s,'ferveur',3);T(s,'roi',3);s.compagnie+=4;return R("Jean-Olivier Briand revient sacré en 1766. L'Église devient l'alliée du nouveau pouvoir.","Jean-Olivier Briand returns consecrated in 1766. The Church becomes the new power's ally.");}},
  {label:R("Exiger un évêque nommé par Rome, sans condition","Demand a bishop named by Rome, no conditions"),fx:s=>{s.patri+=5;s.compagnie-=10;s.church-=6;s.flags.sansEveque=true;return R("Londres refuse. Les paroisses manquent de prêtres ; des laïcs tiennent les fabriques.","London refuses. Parishes run short of priests; lay people run the fabriques.");}},
  {label:R("Se passer d'évêque","Do without a bishop"),fx:s=>{s.church-=15;T(s,'ferveur',-10);T(s,'ouverture',5);s.flags.sansEveque=true;return R("Les curés vieillissent et ne sont pas remplacés. Le pays devient moins dévot, et plus vulnérable aux pasteurs.","The priests grow old and are not replaced. The country becomes less devout, and more exposed to ministers.");}}]});
LIKELY.briand1766=s=>1;

/* ===================== 1774–1784 : l'Acte de Québec et la révolution américaine ===================== */
ev3({id:'quebecact1774',place:'quebec',cond:s=>s.year>=1774,must:true,
 title:R("L'Acte de Québec","The Quebec Act"),
 text:R("Pour s'assurer des Canadiens alors que les Treize Colonies grondent, Londres rétablit les lois civiles françaises, la dîme et le régime seigneurial, abolit le serment du Test et étend la province jusqu'à l'Ohio. Pas d'assemblée : un conseil nommé.","To secure the Canadiens while the Thirteen Colonies rumble, London restores French civil law, the tithe and the seigneurial system, abolishes the Test Oath and extends the province to the Ohio. No assembly: an appointed council."),
 choices:[
  {label:R("Remercier le roi","Thank the King"),hist:true,fx:s=>{s.flags.quebecAct=true;s.church+=6;s.compagnie+=8;T(s,'roi',4);s.off.eve+=10;return R("Le clergé et les seigneurs chantent le Te Deum. Les habitants, eux, retrouvent la dîme… et les corvées.","The clergy and the seigneurs sing the Te Deum. The habitants get back the tithe… and the corvées.");}},
  {label:R("Réclamer aussi une assemblée où siègent des Canadiens","Also demand an assembly with Canadiens"),fx:s=>{s.flags.quebecAct=true;s.patri+=8;s.autonomy+=5;s.compagnie-=4;return R("Londres refuse, pour l'instant. L'idée est lancée.","London refuses, for now. The idea is out.");}}]});

ev3({id:'congres1774',place:'villeMarie',cond:s=>s.year>=1774&&s.fired.quebecact1774,
 title:R("La lettre du Congrès","The letter from Congress"),
 text:R("Le Congrès continental de Philadelphie adresse une lettre « aux habitants de la province de Québec » : joignez-vous à nous, élisez des délégués. Le même Congrès vient de dénoncer à Londres le « papisme » de l'Acte de Québec.","The Continental Congress in Philadelphia writes 'to the inhabitants of the Province of Quebec': join us, elect delegates. The same Congress has just denounced the Quebec Act's 'popery' to London."),
 choices:[
  {label:R("Ne pas répondre","Do not answer"),hist:true,fx:s=>R("La lettre circule à Montréal. Les curés rappellent ce que les Bostonnais disent des catholiques.","The letter circulates in Montréal. The priests recall what the Bostonians say about Catholics.")},
  {label:R("Envoyer des délégués à Philadelphie","Send delegates to Philadelphia"),fx:s=>{s.flags.delegues=true;s.patri+=8;s.compagnie-=12;T(s,'roi',-5);return R("Deux Canadiens partent pour Philadelphie. Carleton fait surveiller leurs familles.","Two Canadiens leave for Philadelphia. Carleton has their families watched.");}}]});

ev3({id:'invasion1775',place:'fortRichelieu',cond:s=>s.year>=1775,must:true,
 title:R("Les Américains envahissent la province","The Americans invade the province"),
 text:R("Montgomery descend le Richelieu et prend Montréal ; Arnold traverse les forêts du Maine vers Québec. Carleton appelle la milice. Beaucoup d'habitants hésitent : ce n'est pas leur guerre.","Montgomery comes down the Richelieu and takes Montréal; Arnold crosses the Maine woods toward Québec. Carleton calls out the militia. Many habitants hesitate: this is not their war."),
 choices:[
  {label:R("Rester neutres, vendre du blé aux deux camps","Stay neutral, sell wheat to both sides"),hist:true,fx:s=>{s.treasury+=1500;s.flags.neutre1775=true;return R("La plupart des habitants restent chez eux. Quelques centaines suivent les Américains, quelques centaines défendent Québec.","Most habitants stay home. A few hundred follow the Americans, a few hundred defend Québec.");}},
  {label:R("Défendre Québec avec les Britanniques","Defend Québec with the British"),fx:s=>{s.defense+=15;s.compagnie+=10;T(s,'roi',5);s.flags.defend1775=true;return R("Les compagnies de milice entrent dans Québec. Carleton n'avait pas tant espéré.","The militia companies enter Québec. Carleton had not hoped for so much.");}},
  {label:R("Se joindre aux Américains","Join the Americans"),fx:s=>{s.flags.joinUS=true;s.patri+=12;s.compagnie-=18;T(s,'roi',-8);s.off.eve-=25;return R("Des régiments canadiens se forment sous Livingston. Briand excommunie ceux qui ont pris les armes contre le roi.","Canadien regiments form under Livingston. Briand excommunicates those who took up arms against the King.");}}]});

ev3({id:'siege1775',place:'quebec',cond:s=>s.year>=1775&&s.fired.invasion1775,must:true,
 title:R("L'assaut du 31 décembre","The assault of 31 December"),
 text:R("Dans une tempête de neige, Montgomery et Arnold attaquent la basse-ville de Québec. Le sort de la province se joue cette nuit.","In a snowstorm, Montgomery and Arnold attack Québec's lower town. The province's fate is decided tonight."),
 choices:s=>{const pFall=clamp(.01+(s.flags.joinUS?.4:0)+(s.flags.neutre1775?.02:0)-(s.flags.defend1775?.03:0)+Math.max(0,s.patri-50)/600,.005,.6);
  return [{label:R("Attendre l'issue","Await the outcome"),hist:true,fx:s2=>{if(Math.random()<pFall){s2.flags.quebecUS=true;return R("Montgomery survit à l'assaut et Québec tombe. Au printemps, la province envoie des délégués au Congrès : le Québec sera la quatorzième colonie.","Montgomery survives the assault and Québec falls. In spring the province sends delegates to Congress: Quebec will be the fourteenth colony.");}
    s2.flags.siegeHeld=true;return R("Montgomery est tué dès la première barricade ; Arnold est blessé. Au printemps, une flotte britannique force les Américains à la retraite.","Montgomery is killed at the first barricade; Arnold is wounded. In spring a British fleet forces the Americans to retreat.");}}];}});

ev3({id:'etat1776',place:'quebec',cond:s=>s.flags.quebecUS,must:true,
 title:R("La quatorzième colonie","The fourteenth colony"),
 text:R("Le Congrès accueille le Québec dans l'Union. Les délégués canadiens exigent des garanties : la religion, les lois civiles, la langue.","Congress welcomes Quebec into the Union. The Canadien delegates demand guarantees: religion, civil law, language."),
 choices:[{label:R("Signer les articles de la Confédération","Sign the Articles of Confederation"),fx:s=>{s.ending='etat14';return R("Le Québec devient un État américain. L'histoire des Canadiens se jouera désormais à l'intérieur des États-Unis.","Quebec becomes an American state. The Canadiens' history will now play out inside the United States.");}}]});

ev3({id:'mesplet1776',place:'villeMarie',cond:s=>s.year>=1776,
 title:R("L'imprimeur de Franklin","Franklin's printer"),
 text:R("Benjamin Franklin est venu à Montréal convaincre les Canadiens, en vain. Il laisse derrière lui un imprimeur lyonnais, Fleury Mesplet, qui veut fonder un journal en français.","Benjamin Franklin came to Montréal to win over the Canadiens, in vain. He leaves behind a printer from Lyon, Fleury Mesplet, who wants to start a French-language paper."),
 choices:[
  {label:R("L'aider à s'installer","Help him set up"),hist:true,fx:s=>{s.edu+=3;T(s,'ouverture',3);s.patri+=3;s.flags.mesplet=true;return R("La Gazette littéraire de Montréal paraît en 1778 : Voltaire, la tolérance, la raison. Haldimand jettera Mesplet en prison.","The Gazette littéraire de Montréal appears in 1778: Voltaire, tolerance, reason. Haldimand will throw Mesplet in jail.");}},
  {label:R("Le laisser à son sort","Leave him to his fate"),fx:s=>{s.off.eve+=4;return R("Mesplet survit en imprimant des livres de prières.","Mesplet survives by printing prayer books.");}}]});

ev3({id:'estaing1778',place:'quebec',cond:s=>s.year>=1778,
 title:R("La France revient… sur le papier","France returns… on paper"),
 text:R("La France s'allie aux Américains. L'amiral d'Estaing fait passer une proclamation aux Canadiens : « Vous êtes nés Français, vous n'avez pu cesser de l'être. » On rêve d'une flotte française devant Québec.","France allies with the Americans. Admiral d'Estaing smuggles in a proclamation to the Canadiens: 'You were born French; you cannot have ceased to be so.' People dream of a French fleet off Québec."),
 choices:[
  {label:R("Garder la tête froide","Keep a cool head"),hist:true,fx:s=>{T(s,'roi',1);return R("La flotte ne vient pas. Washington ne veut pas d'un Canada redevenu français à sa frontière.","The fleet does not come. Washington does not want a Canada turned French again on his border.");}},
  {label:R("Préparer un soulèvement si la flotte vient","Prepare a rising if the fleet comes"),fx:s=>{s.patri+=10;s.compagnie-=12;s.flags.complot1778=true;return R("Des listes circulent dans les paroisses. Haldimand en trouve une.","Lists circulate in the parishes. Haldimand finds one.");}}]});

ev3({id:'haldimand1779',place:'quebec',cond:s=>s.year>=1779&&(s.flags.complot1778||s.flags.mesplet||s.patri>=25),
 title:R("Les prisons de Haldimand","Haldimand's prisons"),
 text:R("Le gouverneur fait arrêter Pierre Du Calvet, Fleury Mesplet et des dizaines de « suspects », sans procès. Du Calvet réclame l'habeas corpus.","The governor has Pierre Du Calvet, Fleury Mesplet and dozens of 'suspects' arrested without trial. Du Calvet demands habeas corpus."),
 choices:[
  {label:R("Faire profil bas","Keep a low profile"),hist:true,fx:s=>{s.patri-=4;return R("Les prisonniers sortent en 1783. Du Calvet ira plaider à Londres et publiera son Appel à la justice de l'État.","The prisoners are released in 1783. Du Calvet will plead in London and publish his Appeal to the Justice of the State.");}},
  {label:R("Réclamer publiquement l'habeas corpus","Publicly demand habeas corpus"),fx:s=>{s.patri+=6;s.autonomy+=3;s.compagnie-=8;s.flags.habeas=true;return R("La pétition fait scandale. En 1784, l'habeas corpus est accordé à la province.","The petition causes a scandal. In 1784, habeas corpus is granted to the province.");}}]});

ev3({id:'loyalistes1784',place:'sorel',cond:s=>s.year>=1784,must:true,
 title:R("Les Loyalistes","The Loyalists"),
 text:R("Des milliers de réfugiés fidèles au roi arrivent des États-Unis. Ils ne veulent ni seigneurs ni lois françaises. Où les établir ?","Thousands of refugees loyal to the King arrive from the United States. They want neither seigneurs nor French law. Where should they settle?"),
 choices:[
  {label:R("Vers l'ouest, au-delà de l'Outaouais","West, beyond the Ottawa"),hist:true,fx:s=>{s.ang+=2000;s.pop+=2000;s.flags.loyWest=true;return R("La plupart s'établissent sur le lac Ontario : le futur Haut-Canada. Quelques-uns restent à Sorel et en Gaspésie.","Most settle on Lake Ontario: the future Upper Canada. A few stay at Sorel and in the Gaspé.");}},
  {label:R("Dans les seigneuries, parmi nous","In the seigneuries, among us"),fx:s=>{s.ang+=6000;s.pop+=6000;T(s,'ouverture',4);s.land-=4000;s.flags.loyMixed=true;return R("Des fermes loyalistes s'intercalent entre les rangs canadiens. Certains finiront par parler français.","Loyalist farms slip in between Canadien ranges. Some will end up speaking French.");}},
  {label:R("Dans les terres au sud du fleuve, à la frontière","On the lands south of the river, at the border"),fx:s=>{s.ang+=4000;s.pop+=4000;s.flags.loyCantons=true;return R("Les premiers cantons anglais naissent près du lac Memphrémagog.","The first English townships appear near Lake Memphremagog.");}}]});

/* ===================== 1784–1806 : l'Assemblée ===================== */
ev3({id:'assemblee1784',place:'quebec',cond:s=>s.year>=1784&&s.year<1791,
 title:R("Une assemblée ? Pour qui ?","An assembly? For whom?"),
 text:R("Les marchands britanniques et les Loyalistes réclament une chambre élue. Les seigneurs canadiens s'y opposent : une assemblée, c'est des taxes. Une partie de la bourgeoisie canadienne, elle, y voit une chance.","The British merchants and Loyalists demand an elected house. The Canadien seigneurs oppose it: an assembly means taxes. Part of the Canadien bourgeoisie sees a chance in it."),
 choices:[
  {label:R("Réclamer une assemblée ouverte aux catholiques","Demand an assembly open to Catholics"),hist:true,fx:s=>{s.patri+=6;s.autonomy+=4;s.flags.pourAssemblee=true;return R("Les réformistes canadiens signent avec les marchands anglais. Londres écoute.","The Canadien reformers sign with the English merchants. London listens.");}},
  {label:R("Défendre le statu quo avec les seigneurs","Defend the status quo with the seigneurs"),fx:s=>{s.compagnie+=4;T(s,'roi',2);s.patri-=3;return R("L'Assemblée viendra quand même, en 1791, mais sans que vous l'ayez demandée.","The Assembly will come anyway, in 1791, but without your having asked.");}}]});

ev3({id:'revolution1789',place:'quebec',cond:s=>s.year>=1790,
 title:R("La Révolution française","The French Revolution"),
 text:R("La Bastille est tombée. Puis le roi est guillotiné, l'Église persécutée. Des prêtres réfractaires fuient la France et demandent asile au Canada.","The Bastille has fallen. Then the king is guillotined and the Church persecuted. Refractory priests flee France and ask for asylum in Canada."),
 choices:[
  {label:R("Accueillir les prêtres émigrés","Take in the émigré priests"),hist:true,fx:s=>{s.church+=6;T(s,'ferveur',3);T(s,'roi',2);s.flags.pretresEmigres=true;return R("Une cinquantaine de prêtres français arrivent. Ils prêchent que la Révolution est un châtiment, et que la Conquête fut une grâce.","Some fifty French priests arrive. They preach that the Revolution is a punishment, and that the Conquest was a blessing.");}},
  {label:R("Saluer les droits de l'homme","Hail the rights of man"),fx:s=>{T(s,'ouverture',5);s.patri+=6;s.off.eve-=20;s.compagnie-=8;s.flags.jacobins=true;return R("On chante la Marseillaise dans quelques auberges de Montréal. Le clergé s'alarme ; Londres aussi.","The Marseillaise is sung in a few Montréal taverns. The clergy is alarmed, and so is London.");}}]});

ev3({id:'acte1791',place:'quebec',cond:s=>s.year>=1791,must:true,
 title:R("L'Acte constitutionnel","The Constitutional Act"),
 text:R("Londres coupe la province en deux : le Haut-Canada anglais, le Bas-Canada à majorité canadienne. Une Assemblée élue, mais un Conseil législatif nommé et un gouverneur qui garde le dernier mot. Presque tout propriétaire peut voter, même les femmes propriétaires.","London cuts the province in two: English Upper Canada, and Lower Canada with a Canadien majority. An elected Assembly, but an appointed Legislative Council and a governor who keeps the last word. Almost any property owner may vote, even women who own property."),
 choices:[
  {label:R("Jouer le jeu parlementaire","Play the parliamentary game"),hist:true,fx:s=>{s.flags.assemblee=true;s.autonomy+=8;s.patri+=4;return R("Aux premières élections de 1792, les Canadiens gagnent 34 sièges sur 50.","In the first elections of 1792, the Canadiens win 34 seats out of 50.");}},
  {label:R("Réclamer un seul Canada, avec une majorité canadienne","Demand a single Canada, with a Canadien majority"),fx:s=>{s.flags.assemblee=true;s.patri+=6;s.compagnie-=6;return R("Londres refuse ; la division est faite. Mais l'idée d'un pays canadien fait son chemin.","London refuses; the division is done. But the idea of a Canadien country gains ground.");}}]});

ev3({id:'langues1793',place:'quebec',cond:s=>s.year>=1793&&s.flags.assemblee,
 title:R("Le débat sur les langues","The language debate"),
 text:R("Janvier 1793 : le parti anglais veut que les lois soient adoptées en anglais seulement, « langue du souverain ». Chartier de Lotbinière répond que la langue de la majorité doit avoir sa place.","January 1793: the English party wants laws passed in English only, 'the sovereign's language'. Chartier de Lotbinière answers that the majority's language must have its place."),
 choices:[
  {label:R("Les deux langues, le texte français pour les lois civiles","Both languages, the French text for civil law"),hist:true,fx:s=>{s.flags.bilingue=true;s.patri+=3;s.off.mar-=10;return R("L'Assemblée travaillera dans les deux langues. Londres exigera que le texte officiel soit anglais.","The Assembly will work in both languages. London will require the official text to be English.");}},
  {label:R("Le français seulement","French only"),fx:s=>{s.patri+=8;s.compagnie-=10;s.off.mar-=20;s.flags.francaisSeul=true;return R("Le gouverneur refuse de sanctionner. La querelle empoisonnera la législature.","The governor refuses assent. The quarrel poisons the legislature.");}},
  {label:R("Céder : l'anglais seulement","Give in: English only"),fx:s=>{s.compagnie+=6;s.patri-=6;T(s,'ouverture',2);s.flags.anglaisSeul=true;return R("Les députés canadiens votent des lois qu'une partie de leurs électeurs ne peut pas lire.","The Canadien members pass laws that some of their voters cannot read.");}}]});

ev3({id:'cantons1795',place:'sherbrooke',cond:s=>s.year>=1795,
 title:R("Les cantons","The townships"),
 text:R("Londres ouvre les terres au sud du fleuve en « cantons » de franc et commun soccage, sans seigneurs. On les donne surtout à des Britanniques et à des Américains. Les fils d'habitants, eux, manquent déjà de terre.","London opens the lands south of the river as 'townships' in free and common socage, without seigneurs. They go mostly to British and American settlers. Habitants' sons are already short of land."),
 choices:[
  {label:R("Laisser les cantons aux anglophones","Leave the townships to English speakers"),hist:true,fx:s=>{s.flags.cantonsAnglais=true;return R("Les cantons de l'Est seront anglais pour deux générations.","The Eastern Townships will be English for two generations.");}},
  {label:R("Y envoyer des familles canadiennes","Send Canadien families there"),fx:s=>{s.flags.cantonsCanadiens=true;s.treasury-=1200;T(s,'aventure',3);s.off.mar-=8;return R("Des fils d'habitants obtiennent des lots, malgré les spéculateurs. Le français remonte la Saint-François.","Habitants' sons obtain lots, despite the speculators. French moves up the Saint-François.");}}]});

ev3({id:'institution1801',place:'quebec',cond:s=>s.year>=1801,
 title:R("L'Institution royale","The Royal Institution"),
 text:R("Le gouvernement crée des écoles publiques gratuites, dirigées par l'évêque anglican. L'évêque catholique interdit d'y envoyer les enfants.","The government creates free public schools, run by the Anglican bishop. The Catholic bishop forbids sending children there."),
 choices:[
  {label:R("Les boycotter","Boycott them"),hist:true,fx:s=>{s.off.eve+=10;T(s,'ferveur',2);s.edu-=1;return R("Une quarantaine d'écoles seulement ouvriront, presque toutes anglaises.","Only about forty schools will open, almost all English.");}},
  {label:R("Les accepter, en exigeant des maîtres catholiques","Accept them, demanding Catholic teachers"),fx:s=>{s.edu+=5;T(s,'ouverture',3);s.off.eve-=15;s.flags.ecolesRoyales=true;return R("Des maîtres canadiens enseignent dans des écoles publiques. L'évêque fulmine, les parents s'en réjouissent.","Canadien schoolmasters teach in public schools. The bishop fumes, the parents rejoice.");}}]});

ev3({id:'canadien1806',place:'quebec',cond:s=>s.year>=1806&&s.flags.assemblee,
 title:R("« Le Canadien »","'Le Canadien'"),
 text:R("Pierre Bédard et ses amis du Parti canadien lancent un journal : « Notre langue, nos institutions et nos lois ». Ils veulent que le gouverneur gouverne avec la majorité de l'Assemblée.","Pierre Bédard and his friends of the Parti canadien launch a newspaper: 'Our language, our institutions and our laws'. They want the governor to govern with the Assembly's majority."),
 choices:[
  {label:R("Le soutenir","Support it"),hist:true,fx:s=>{s.patri+=8;s.edu+=2;s.flags.leCanadien=true;s.off.mar-=8;return R("Le journal se vend dans toutes les paroisses où l'on sait lire, et se lit à voix haute dans les autres.","The paper sells in every parish where people can read, and is read aloud in the others.");}},
  {label:R("Le juger trop provocateur","Find it too provocative"),fx:s=>{s.compagnie+=4;s.patri-=3;return R("Le Canadien paraît quand même. Il se passera de vous.","Le Canadien appears anyway. It will do without you.");}}]});

ev3({id:'craig1810',place:'quebec',cond:s=>s.year>=1810&&(s.flags.leCanadien||s.patri>=30),
 title:R("Le « règne de la terreur »","The 'reign of terror'"),
 text:R("Le gouverneur Craig fait saisir les presses du Canadien et jeter Bédard en prison sans procès. Il dissout l'Assemblée. Les curés lisent en chaire sa proclamation.","Governor Craig has Le Canadien's presses seized and Bédard thrown in jail without trial. He dissolves the Assembly. The priests read his proclamation from the pulpit."),
 choices:[
  {label:R("Réélire les mêmes députés","Re-elect the same members"),hist:true,fx:s=>{s.flags.craig=true;s.patri+=6;s.autonomy+=2;return R("Les électeurs renvoient la même majorité. Bédard refuse de sortir de prison sans procès ; Craig finit par le libérer.","The voters send back the same majority. Bédard refuses to leave prison without a trial; Craig ends up releasing him.");}},
  {label:R("Manifester dans la rue","Protest in the streets"),fx:s=>{s.flags.craig=true;s.patri+=10;s.compagnie-=10;s.flags.repression=true;return R("La troupe charge la foule à Québec. Craig écrit que les Canadiens sont des traîtres en puissance.","Troops charge the crowd in Québec. Craig writes that the Canadiens are potential traitors.");}},
  {label:R("Se soumettre","Submit"),fx:s=>{s.compagnie+=6;s.patri-=8;T(s,'roi',3);return R("Le Parti canadien rentre dans le rang. Pour un temps.","The Parti canadien falls into line. For a while.");}}]});

/* ===================== 1812–1815 : la guerre ===================== */
ev3({id:'guerre1812',place:'villeMarie',cond:s=>s.year>=1812,must:true,
 title:R("La guerre de 1812","The War of 1812"),
 text:R("Les États-Unis déclarent la guerre à la Grande-Bretagne et visent le Canada. Prevost lève les Voltigeurs canadiens sous Charles de Salaberry. À Lachine, des conscrits se sont mutinés contre la milice.","The United States declares war on Britain and aims at Canada. Prevost raises the Canadian Voltigeurs under Charles de Salaberry. At Lachine, conscripts have mutinied against the militia."),
 choices:[
  {label:R("Défendre le pays","Defend the country"),hist:true,fx:s=>{s.defense+=15;s.compagnie+=8;T(s,'roi',4);s.flags.defend1812=true;return R("Les Voltigeurs s'entraînent tout l'été. On ne se bat pas pour le roi George : on se bat pour ne pas devenir américains.","The Voltigeurs drill all summer. They are not fighting for King George: they are fighting not to become American.");}},
  {label:R("Neutralité : ce n'est pas notre guerre","Neutrality: not our war"),fx:s=>{s.compagnie-=10;s.patri+=4;s.flags.neutre1812=true;return R("Les paroisses envoient le minimum. Prevost doit compter sur ses troupes régulières.","The parishes send the bare minimum. Prevost must rely on his regulars.");}}]});

ev3({id:'chateauguay1813',place:'laprairie',cond:s=>s.year>=1813&&s.fired.guerre1812,
 title:R("Châteauguay","Châteauguay"),
 text:R("Une armée américaine de 3 000 hommes marche sur Montréal par la rivière Châteauguay. De Salaberry a 300 Voltigeurs et miliciens, des guerriers de Kahnawake, et un abattis dans la forêt.","An American army of 3,000 marches on Montréal along the Châteauguay River. De Salaberry has 300 Voltigeurs and militiamen, warriors from Kahnawake, and a barricade of felled trees in the forest."),
 choices:s=>{const pWin=clamp(.75+(s.flags.defend1812?.15:-.25)+(s.rel.agnier>20?.05:0),.2,.97);return [
  {label:R("Tenir l'abattis","Hold the barricade"),hist:true,fx:s2=>{if(Math.random()<pWin){s2.flags.chateauguay=true;T(s2,'roi',3);s2.patri+=4;ra(s2,'agnier',4);return R("Clairons dans les bois, cris de tous côtés : les Américains croient affronter une armée et reculent. De Salaberry devient un héros.","Bugles in the woods, shouts on every side: the Americans think they face an army and fall back. De Salaberry becomes a hero.");}
    s2.pop-=1500;s2.compagnie-=6;s2.flags.montrealPrise=true;return R("L'abattis cède. Les Américains occupent Montréal pour l'hiver avant d'être repoussés au printemps.","The barricade gives way. The Americans hold Montréal for the winter before being driven back in spring.");}}];}});

ev3({id:'gand1815',place:'quebec',cond:s=>s.year>=1815&&s.fired.guerre1812,must:true,
 title:R("La paix de Gand","The Peace of Ghent"),
 text:R("La guerre finit sans vainqueur. La frontière ne bouge pas. Les nations alliées de Tecumseh, elles, ont tout perdu.","The war ends with no victor. The border does not move. Tecumseh's allied nations have lost everything."),
 choices:[
  {label:R("Rendre hommage aux alliés autochtones","Pay tribute to the Indigenous allies"),hist:false,fx:s=>{T(s,'alliance',3);ra(s,'ouest',5);ra(s,'agnier',4);return R("À l'Assemblée, on rappelle que Kahnawake était à Châteauguay.","In the Assembly, members recall that Kahnawake was at Châteauguay.");}},
  {label:R("Tourner la page","Turn the page"),hist:true,fx:s=>{T(s,'roi',1);return R("Les miliciens rentrent à la ferme. Les nations de l'Ouest sont abandonnées à la diplomatie américaine.","The militiamen go back to their farms. The western nations are left to American diplomacy.");}}]});

/* ===================== 1815–1837 : la lutte parlementaire ===================== */
ev3({id:'papineau1815',place:'quebec',cond:s=>s.year>=1815&&s.flags.assemblee,
 title:R("Louis-Joseph Papineau","Louis-Joseph Papineau"),
 text:R("Le jeune avocat de Montréal est élu président de l'Assemblée. Orateur superbe, seigneur de la Petite-Nation, il veut que l'Assemblée contrôle tout le budget, y compris le salaire des fonctionnaires.","The young Montréal lawyer is elected Speaker of the Assembly. A superb orator, seigneur of the Petite-Nation, he wants the Assembly to control the whole budget, including officials' salaries."),
 choices:[
  {label:R("Le suivre","Follow him"),hist:true,fx:s=>{s.patri+=6;s.flags.papineau=true;s.off.gov-=6;return R("Papineau devient la voix des Canadiens pendant vingt ans.","Papineau becomes the voice of the Canadiens for twenty years.");}},
  {label:R("Préférer un chef plus conciliant","Prefer a more conciliatory leader"),fx:s=>{s.compagnie+=5;s.patri-=4;return R("Papineau mène quand même la majorité ; vous restez dans son ombre.","Papineau leads the majority all the same; you stay in his shadow.");}}]});

ev3({id:'union1822',place:'quebec',cond:s=>s.year>=1822&&s.flags.assemblee,
 title:R("Le projet d'union de 1822","The 1822 union bill"),
 text:R("Des marchands de Montréal font présenter à Londres, en secret, un projet d'union des deux Canadas : l'anglais seule langue, la majorité canadienne noyée. La nouvelle arrive à Québec.","Montréal merchants have a bill quietly introduced in London to unite the two Canadas: English the only language, the Canadien majority drowned. The news reaches Québec."),
 choices:[
  {label:R("Grande campagne de pétitions, et Papineau à Londres","A great petition campaign, and Papineau to London"),hist:true,fx:s=>{s.patri+=6;s.treasury-=1000;s.flags.antiUnion=true;return R("60 000 signatures. Papineau et John Neilson plaident à Londres : le projet est abandonné.","60,000 signatures. Papineau and John Neilson plead in London: the bill is dropped.");}},
  {label:R("Négocier des garanties","Negotiate guarantees"),fx:s=>{s.compagnie+=4;s.flags.antiUnion=true;return R("Le projet meurt de lui-même. Les marchands n'ont pas renoncé.","The bill dies on its own. The merchants have not given up.");}}]});
/* les marchands poussent à l'union quand leurs affaires souffrent et que les Canadiens se radicalisent */
LIKELY.union1822=s=>clamp(.45+(55-((s.pol&&s.pol.g.marchands)?s.pol.g.marchands.sat:50))*.03+({patriote:.3,reforme:.12,loyal:-.1}[s.orient.cour]||0),.1,1);

ev3({id:'ecoles1824',place:'quebec',cond:s=>s.year>=1824,
 title:R("Les écoles des paroisses","Parish schools"),
 text:R("Une loi permet aux fabriques d'ouvrir des écoles. En 1829, l'Assemblée va plus loin : des écoles de syndics élus, payées par l'État. Le clergé se méfie des écoles qu'il ne contrôle pas.","A law lets the fabriques open schools. In 1829 the Assembly goes further: schools run by elected trustees, paid by the state. The clergy distrusts schools it does not control."),
 choices:[
  {label:R("Les deux : fabriques et syndics","Both: fabriques and trustees"),hist:true,fx:s=>{s.flags.fabriques=true;s.flags.syndics=true;s.treasury-=1500;s.edu+=4;s.off.eve-=6;return R("En 1836, il y a plus de 1 600 écoles. Le Conseil législatif refuse alors de renouveler la loi, et elles ferment presque toutes.","By 1836 there are over 1,600 schools. The Legislative Council then refuses to renew the law, and nearly all of them close.");}},
  {label:R("Seulement les écoles de fabrique","Only fabrique schools"),fx:s=>{s.flags.fabriques=true;s.off.eve+=8;s.edu+=2;return R("Les curés ouvrent des écoles, lentement, là où la fabrique est riche.","The priests open schools, slowly, where the fabrique is rich.");}}]});

ev3({id:'dalhousie1827',place:'quebec',cond:s=>s.year>=1827&&s.flags.papineau,
 title:R("Dalhousie refuse Papineau","Dalhousie refuses Papineau"),
 text:R("Le gouverneur refuse d'accepter Papineau comme président de l'Assemblée et proroge la Chambre. 87 000 Canadiens signent une pétition à Londres contre lui.","The governor refuses to accept Papineau as Speaker and prorogues the House. 87,000 Canadiens sign a petition to London against him."),
 choices:[
  {label:R("Pétitionner Londres","Petition London"),hist:true,fx:s=>{s.flags.dalhousie=true;s.patri+=5;return R("Un comité de la Chambre des communes donne en partie raison aux Canadiens. Dalhousie est muté en Inde.","A House of Commons committee partly agrees with the Canadiens. Dalhousie is transferred to India.");}},
  {label:R("Boycotter les institutions","Boycott the institutions"),fx:s=>{s.flags.dalhousie=true;s.patri+=10;s.compagnie-=10;s.autonomy-=3;return R("L'Assemblée ne siège plus. Le gouverneur gouverne seul, avec l'argent de la Couronne.","The Assembly no longer sits. The governor governs alone, with the Crown's money.");}}]});

ev3({id:'election1832',place:'villeMarie',cond:s=>s.year>=1832,
 title:R("La fusillade du quartier Ouest","The West Ward shooting"),
 text:R("Élection partielle à Montréal : après vingt-trois jours de bagarres, la troupe tire sur la foule. Trois Canadiens sont tués. Le patriote Daniel Tracey est élu.","A by-election in Montréal: after twenty-three days of brawls, troops fire on the crowd. Three Canadiens are killed. The patriote Daniel Tracey is elected."),
 choices:[
  {label:R("Exiger une enquête","Demand an inquiry"),hist:true,fx:s=>{s.patri+=6;s.compagnie-=4;return R("Les officiers sont acquittés. À Montréal, on n'oubliera pas le 21 mai.","The officers are acquitted. Montréal will not forget 21 May.");}},
  {label:R("Calmer les esprits","Calm things down"),fx:s=>{s.patri-=3;s.compagnie+=3;return R("Les funérailles se font dans le silence.","The funerals are held in silence.");}}]});

ev3({id:'cholera1832',place:'quebec',cond:s=>s.year>=1832,must:true,
 title:R("Le choléra","Cholera"),
 text:R("Un navire d'immigrants irlandais apporte le choléra à la Grosse-Île. En quelques semaines, l'épidémie gagne Québec et Montréal. Les patriotes accusent Londres d'avoir laissé venir les malades.","A ship of Irish immigrants brings cholera to Grosse-Île. Within weeks the epidemic reaches Québec and Montréal. The patriotes accuse London of letting the sick come."),
 choices:[
  {label:R("Quarantaine stricte à la Grosse-Île","Strict quarantine at Grosse-Île"),hist:true,fx:s=>{s.mods.epid=(s.mods.epid||0)+.012;s.treasury-=800;return R("Plus de 7 000 morts dans la province. Le Bureau de santé de Québec est créé.","Over 7,000 dead in the province. The Québec Board of Health is created.");}},
  {label:R("Fermer le port aux immigrants","Close the port to immigrants"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.008;s.compagnie-=12;s.recruitMod*=.7;s.patri+=5;return R("Les navires sont refoulés vers le Nouveau-Brunswick et New York. Londres est furieuse.","Ships are turned back to New Brunswick and New York. London is furious.");}}]});

ev3({id:'resolutions1834',place:'quebec',cond:s=>s.year>=1834&&s.flags.assemblee,
 title:R("Les 92 Résolutions","The 92 Resolutions"),
 text:R("Papineau et Morin rédigent la liste de tous les griefs : un Conseil législatif élu, le contrôle du budget, des juges indépendants. Elles menacent même, à demi-mot, de suivre l'exemple américain.","Papineau and Morin draft a list of every grievance: an elected Legislative Council, control of the budget, independent judges. They even hint at following the American example."),
 choices:[
  {label:R("Les adopter","Adopt them"),hist:true,fx:s=>{s.patri+=8;s.compagnie-=8;s.flags.r92=true;return R("Adoptées 56 voix contre 23. Aux élections de 1834, les Patriotes raflent presque tout.","Adopted 56 to 23. In the 1834 elections the Patriotes sweep almost everything.");}},
  {label:R("Les adoucir, comme le veut Neilson","Soften them, as Neilson wants"),fx:s=>{s.patri+=2;s.compagnie+=2;s.flags.r92=true;s.flags.modere=true;return R("Le texte est plus prudent. Les radicaux grognent, Londres répond quand même par un refus.","The text is more cautious. The radicals grumble; London still answers with a refusal.");}}]});

ev3({id:'russell1837',place:'quebec',cond:s=>s.year>=1837&&s.flags.r92,must:true,
 title:R("Les résolutions Russell","The Russell Resolutions"),
 text:R("Londres répond aux 92 Résolutions : non à tout, et le gouverneur pourra prendre l'argent sans l'accord de l'Assemblée. Partout, des assemblées populaires. À Saint-Charles, l'Assemblée des six comtés appelle à l'action.","London answers the 92 Resolutions: no to everything, and the governor may take the money without the Assembly's consent. Popular meetings everywhere. At Saint-Charles, the Assembly of the Six Counties calls for action."),
 choices:[
  {label:R("Boycott et organisation : les Fils de la Liberté","Boycott and organize: the Sons of Liberty"),hist:true,fx:s=>{s.flags.russell=true;s.patri+=10;s.compagnie-=10;return R("On boycotte les produits anglais, on porte l'étoffe du pays. Les Fils de la Liberté défilent à Montréal.","English goods are boycotted, homespun is worn. The Sons of Liberty march in Montréal.");}},
  {label:R("Préparer l'insurrection : acheter des armes aux États-Unis","Prepare insurrection: buy arms in the United States"),fx:s=>{s.flags.russell=true;s.flags.armesUS=true;s.patri+=12;s.treasury-=2500;s.compagnie-=15;return R("Des fusils passent la frontière dans des charrettes de foin. Les agents du gouverneur le savent.","Muskets cross the border in hay carts. The governor's agents know.");}},
  {label:R("Négocier encore","Negotiate further"),fx:s=>{s.flags.russell=true;s.patri-=4;s.compagnie+=4;s.flags.negocie1837=true;return R("Gosford tente un compromis. Mais à Montréal, les esprits s'échauffent sans vous.","Gosford attempts a compromise. But in Montréal tempers rise without you.");}}]});
/* Londres choisit la coercition quand son humeur est mauvaise */
LIKELY.russell1837=s=>clamp(.3+(55-(s.pol?s.pol.cen.op:40))*.035,.15,1);

ev3({id:'rebellion1837',place:'stDenis',cond:s=>s.year>=1837&&s.flags.russell&&s.patri>=30,
 title:R("Saint-Denis, Saint-Charles, Saint-Eustache","Saint-Denis, Saint-Charles, Saint-Eustache"),
 text:R("Novembre 1837 : on lance des mandats d'arrêt contre les chefs patriotes. À Saint-Denis, Wolfred Nelson et ses hommes attendent les soldats de Gore. Mgr Lartigue a condamné la révolte. Papineau a quitté Montréal.","November 1837: warrants go out for the patriote leaders. At Saint-Denis, Wolfred Nelson and his men await Gore's soldiers. Bishop Lartigue has condemned the revolt. Papineau has left Montréal."),
 choices:s=>{const p=clamp(.015+(s.patri-65)/300+Math.max(0,(s.contra||0)-45)/350+(s.flags.promesseAbolition?.04:0)+(s.orient.cour==='patriote'?.04:0)+(s.flags.armesUS?.12:0)+(s.flags.usAid?.12:0)-(s.traits.ferveur-55)/250-(s.defense-30)/400+(s.flags.neutre1812?.03:0),.02,.55);s._rebP=p;return [
  {label:R("Prendre les armes","Take up arms"),hist:true,fx:s2=>{if(Math.random()<p){s2.flags.rebSuccess=true;s2.patri+=15;return R("Saint-Denis tient, Saint-Charles aussi. Les paroisses du Richelieu et du nord se soulèvent ; les troupes de Colborne, coupées par les glaces, reculent sur Montréal.","Saint-Denis holds, and so does Saint-Charles. The parishes of the Richelieu and the north rise; Colborne's troops, cut off by the ice, fall back on Montréal.");}
    s2.flags.rebFail=true;s2.flags.repression=true;s2.pop-=600;s2.patri-=10;s2.compagnie-=10;T(s2,'roi',-6);return R("Victoire à Saint-Denis, puis défaite à Saint-Charles. À Saint-Eustache, Chénier meurt dans l'église en flammes. Colborne fait brûler les villages. Papineau s'enfuit aux États-Unis.","Victory at Saint-Denis, then defeat at Saint-Charles. At Saint-Eustache, Chénier dies in the burning church. Colborne has the villages burned. Papineau flees to the United States.");}},
  {label:R("Suivre l'évêque : déposer les armes","Follow the bishop: lay down arms"),fx:s2=>{s2.patri-=12;s2.compagnie+=6;T(s2,'ferveur',3);T(s2,'roi',3);s2.flags.noRebellion=true;return R("Quelques bandes se battent quand même et sont écrasées. Les chefs fuient. L'Église sort grandie, le mouvement brisé.","A few bands fight anyway and are crushed. The leaders flee. The Church emerges stronger, the movement broken.");}}];}});
LIKELY.rebellion1837=s=>(s.patri>=45||(s.contra||0)>=55)?1:.5;
DIVERGE.rebellion1837=R("Dans l'histoire, les Patriotes se soulèvent en novembre 1837. Ici, le mouvement n'est pas assez fort : il n'y a pas de rébellion.","In history, the Patriotes rose in November 1837. Here, the movement is not strong enough: there is no rebellion.");

ev3({id:'republique1838',place:'stDenis',cond:s=>s.flags.rebSuccess,must:true,
 title:R("La République du Bas-Canada","The Republic of Lower Canada"),
 text:R("Robert Nelson rédige une déclaration d'indépendance : séparation de l'Église et de l'État, abolition du régime seigneurial, égalité des droits pour les Autochtones, deux langues officielles. Washington observe. Londres prépare une armée.","Robert Nelson drafts a declaration of independence: separation of Church and State, abolition of the seigneurial system, equal rights for Indigenous peoples, two official languages. Washington watches. London prepares an army."),
 choices:s=>{const pHold=clamp(.38+(s.patri-50)/150+(s.flags.usAid?.15:0)+(s.flags.armesUS?.08:0),.15,.85);return [
  {label:R("Proclamer la République et tenir","Proclaim the Republic and hold"),fx:s2=>{if(Math.random()<pHold){s2.ending='republique';return R("Au printemps, Londres négocie plutôt que de mener une guerre coûteuse à la frontière américaine. Le Bas-Canada est indépendant.","In spring, London negotiates rather than wage a costly war on the American border. Lower Canada is independent.");}
    s2.flags.rebFail=true;s2.flags.repression=true;s2.pop-=2500;s2.patri-=15;return R("L'armée de Colborne reprend le pays village par village. La république n'aura duré qu'un hiver.","Colborne's army retakes the country village by village. The republic lasted only a winter.");}},
  {label:R("Demander l'annexion aux États-Unis","Ask the United States for annexation"),fx:s2=>{if(Math.random()<pHold+.1){s2.ending='annexion';return R("Le Congrès accepte un nouveau territoire. Les Canadiens deviennent Américains, avec leurs lois civiles… pour combien de temps ?","Congress accepts a new territory. The Canadiens become Americans, with their civil law… for how long?");}
    s2.flags.rebFail=true;s2.flags.repression=true;s2.pop-=2000;return R("Washington refuse de risquer une guerre avec Londres. L'armée britannique reprend le pays.","Washington refuses to risk a war with London. The British army retakes the country.");}},
  {label:R("Négocier un gouvernement responsable dans l'Empire","Negotiate responsible government within the Empire"),fx:s2=>{s2.flags.responsable=true;s2.flags.responsableTot=true;s2.autonomy+=20;s2.patri-=5;s2.compagnie+=5;return R("Londres cède ce qu'elle refusera aux autres jusqu'en 1848 : un ministère responsable devant l'Assemblée. Le Bas-Canada reste britannique, mais se gouverne.","London grants what it will refuse others until 1848: a ministry responsible to the Assembly. Lower Canada stays British, but governs itself.");}}];}});

ev3({id:'chasseurs1838',place:'laprairie',cond:s=>s.year>=1838&&s.flags.rebFail&&!s.flags.rebSuccess,
 title:R("Les Frères chasseurs","The Hunters' Lodges"),
 text:R("Réfugiés au Vermont, Robert Nelson et ses Frères chasseurs préparent un second soulèvement pour novembre 1838. Des loges secrètes se forment dans les paroisses du sud.","Refugees in Vermont, Robert Nelson and his Hunters prepare a second rising for November 1838. Secret lodges form in the southern parishes."),
 choices:s=>{const p=clamp(.01+(s.patri-50)/400+(s.flags.usAid?.1:0),.01,.3);return [
  {label:R("Se soulever à nouveau","Rise again"),hist:true,fx:s2=>{if(Math.random()<p){s2.flags.rebSuccess=true;s2.fired.republique1838=false;return R("Cette fois, Napierville tient et la frontière s'embrase. Colborne doit négocier.","This time Napierville holds and the border catches fire. Colborne must negotiate.");}
    s2.pop-=400;s2.flags.pendus=true;s2.patri-=8;T(s2,'roi',-5);return R("Défaite à Odelltown. Douze patriotes sont pendus au Pied-du-Courant, 58 déportés en Australie. Les campagnes sont brûlées.","Defeat at Odelltown. Twelve patriotes are hanged at Pied-du-Courant, 58 deported to Australia. The countryside is burned.");}},
  {label:R("Refuser l'aventure","Refuse the adventure"),fx:s2=>{s2.patri-=6;s2.compagnie+=4;return R("Les loges se dispersent. Les pendaisons ont lieu quand même, pour l'exemple.","The lodges disperse. The hangings happen anyway, as an example.");}}];}});

ev3({id:'durham1839',place:'quebec',cond:s=>s.year>=1839&&!s.ending&&!s.flags.responsableTot&&(s.flags.rebFail||s.flags.noRebellion||s.year>=1840),must:true,
 title:R("Le rapport Durham","The Durham Report"),
 text:R("Lord Durham a enquêté. Il trouve « deux nations en guerre au sein d'un même État » et propose le remède : unir les deux Canadas pour noyer les Canadiens, « un peuple sans histoire et sans littérature », dans une majorité anglaise.","Lord Durham has investigated. He finds 'two nations warring in the bosom of a single state' and proposes the cure: unite the two Canadas to drown the Canadiens, 'a people with no history and no literature', in an English majority."),
 choices:[
  {label:R("Répondre par l'histoire : écrire, enseigner, durer","Answer with history: write, teach, endure"),hist:true,fx:s=>{s.flags.durham=true;s.patri+=4;T(s,'entraide',2);return R("François-Xavier Garneau commence son Histoire du Canada. Le mot « survivance » entre dans la langue.","François-Xavier Garneau begins his History of Canada. The word 'survivance' enters the language.");}},
  {label:R("Accepter l'anglicisation pour réussir","Accept anglicization to get ahead"),fx:s=>{s.flags.durham=true;T(s,'ouverture',4);s.compagnie+=6;s.patri-=8;s.flags.anglicise=true;return R("Des familles de notables envoient leurs fils dans les écoles anglaises.","Notable families send their sons to English schools.");}}]});

/* ===================== 1840–1867 : l'Union, le gouvernement responsable, la Confédération ===================== */
ev3({id:'union1840',place:'villeMarie',cond:s=>s.year>=1840&&!s.ending&&!s.flags.responsableTot,must:true,
 title:R("L'Acte d'Union","The Act of Union"),
 text:R("Les deux Canadas sont unis. Même nombre de députés pour chaque moitié, malgré une population canadienne plus nombreuse ; la dette du Haut-Canada partagée ; l'anglais seule langue officielle.","The two Canadas are united. The same number of members for each half, despite a larger Canadien population; Upper Canada's debt shared; English the only official language."),
 choices:[
  {label:R("S'allier aux réformistes du Haut-Canada (LaFontaine)","Ally with the Upper Canada reformers (LaFontaine)"),hist:true,fx:s=>{s.flags.unionAct=true;s.flags.lafontaine=true;s.off.mar+=15;s.patri-=4;return R("Dans son Adresse aux électeurs de Terrebonne, LaFontaine tend la main à Baldwin : ensemble, ils obtiendront le gouvernement responsable.","In his Address to the Electors of Terrebonne, LaFontaine reaches out to Baldwin: together they will win responsible government.");}},
  {label:R("Exiger le rappel de l'Union, avec Papineau","Demand repeal of the Union, with Papineau"),fx:s=>{s.flags.unionAct=true;s.flags.rappel=true;s.patri+=8;s.compagnie-=8;s.off.mar-=10;return R("Les Canadiens boycottent le jeu parlementaire. Les tories gouvernent seuls.","The Canadiens boycott parliamentary politics. The tories govern alone.");}}]});

ev3({id:'responsable1848',place:'villeMarie',cond:s=>s.year>=1848&&s.flags.unionAct&&!s.flags.responsable,
 title:R("Le gouvernement responsable","Responsible government"),
 text:R("Les réformistes ont gagné les élections. Lord Elgin appelle LaFontaine et Baldwin à former le gouvernement : pour la première fois, le ministère dépend de la majorité de l'Assemblée.","The reformers have won the elections. Lord Elgin calls on LaFontaine and Baldwin to form the government: for the first time, the ministry depends on the Assembly's majority."),
 choices:[
  {label:R("Gouverner","Govern"),hist:true,fx:s=>{s.flags.responsable=true;s.autonomy+=15;s.compagnie+=8;s.flags.bilingue=true;return R("LaFontaine prononce son premier discours en français, et la langue redevient officielle au Parlement.","LaFontaine gives his first speech in French, and the language becomes official in Parliament again.");}}]});
LIKELY.responsable1848=s=>(s.flags.lafontaine?.95:.4)*clamp(.78+((s.pol?s.pol.cen.op:45)-45)*.012,.4,1.05);

ev3({id:'typhus1847',place:'quebec',cond:s=>s.year>=1847,must:true,
 title:R("L'été des Irlandais","The summer of the Irish"),
 text:R("La famine pousse 100 000 Irlandais vers Québec. Le typhus ravage les navires et la Grosse-Île. Des centaines d'enfants se retrouvent orphelins sur les quais.","Famine drives 100,000 Irish towards Québec. Typhus ravages the ships and Grosse-Île. Hundreds of children are left orphaned on the docks."),
 choices:[
  {label:R("Que les paroisses adoptent les orphelins","Let the parishes adopt the orphans"),hist:true,fx:s=>{s.flags.orphelins=true;s.mods.epid=(s.mods.epid||0)+.003;T(s,'entraide',3);T(s,'ouverture',3);s.pop+=600;return R("Des familles canadiennes recueillent des centaines d'enfants irlandais. Beaucoup garderont leur nom : les Johnson et les O'Neill parleront français.","Canadien families take in hundreds of Irish children. Many keep their names: Johnsons and O'Neills who will speak French.");}},
  {label:R("Les laisser aux institutions","Leave them to the institutions"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.002;return R("Les sœurs grises et les hôpitaux s'en chargent. Des religieuses meurent du typhus.","The Grey Nuns and the hospitals take charge. Nuns die of typhus.");}}]});

ev3({id:'annexion1849',place:'villeMarie',cond:s=>s.year>=1849&&s.flags.unionAct,
 title:R("Le Parlement brûle","Parliament burns"),
 text:R("La loi indemnisant les victimes de 1837-1838, Canadiens compris, déchaîne les tories : ils brûlent le Parlement de Montréal. Puis des marchands anglais, ruinés par le libre-échange, signent un Manifeste pour l'annexion aux États-Unis. Des « Rouges » canadiens les rejoignent.","The bill compensating the victims of 1837–38, Canadiens included, unleashes the tories: they burn the Montréal Parliament. Then English merchants, ruined by free trade, sign a Manifesto for annexation to the United States. Some Canadien 'Rouges' join them."),
 choices:[
  {label:R("Rejeter l'annexion","Reject annexation"),hist:true,fx:s=>{s.compagnie+=6;T(s,'roi',2);return R("Le mouvement s'éteint avec le retour de la prospérité et le traité de réciprocité.","The movement fades with returning prosperity and the reciprocity treaty.");}},
  {label:R("S'y joindre avec les Rouges","Join it with the Rouges"),fx:s=>{const p=clamp(.08+(60-s.traits.roi)/200+(s.flags.institut?.04:0),.03,.35);if(Math.random()<p){s.ending='annexion';return R("Le mouvement gagne Montréal et les cantons. Londres, qui ne veut plus payer pour ses colonies, laisse faire.","The movement takes Montréal and the townships. London, no longer willing to pay for its colonies, lets it happen.");}
    s.compagnie-=10;s.patri+=4;T(s,'ouverture',3);return R("Le manifeste échoue. Les Rouges sont marqués : l'Église ne leur pardonnera pas.","The manifesto fails. The Rouges are marked men: the Church will not forgive them.");}}]});

ev3({id:'institut1850',place:'villeMarie',cond:s=>s.year>=1850,
 title:R("L'Institut canadien","The Institut canadien"),
 text:R("À Montréal, de jeunes libéraux ont une bibliothèque où l'on lit Voltaire et Lamennais. Mgr Bourget exige qu'on en retire les livres à l'Index, sous peine d'excommunication.","In Montréal, young liberals keep a library where people read Voltaire and Lamennais. Bishop Bourget demands that books on the Index be removed, under pain of excommunication."),
 choices:[
  {label:R("Donner raison à l'évêque","Side with the bishop"),hist:true,fx:s=>{s.off.eve+=12;T(s,'ferveur',3);T(s,'ouverture',-3);return R("L'Institut résiste, perd ses membres un à un. L'ultramontanisme triomphe pour un siècle.","The Institut holds out, losing its members one by one. Ultramontanism triumphs for a century.");}},
  {label:R("Défendre la liberté de lire","Defend the freedom to read"),fx:s=>{s.off.eve-=18;T(s,'ouverture',6);T(s,'ferveur',-3);s.flags.institut=true;return R("L'Institut devient une école de libéralisme. Le conflit avec Bourget durera vingt ans.","The Institut becomes a school of liberalism. The conflict with Bourget will last twenty years.");}}]});

ev3({id:'seigneurial1854',place:'beaupre',cond:s=>s.year>=1854&&s.flags.unionAct,
 title:R("La fin du régime seigneurial","The end of the seigneurial system"),
 text:R("Le gouvernement propose d'abolir le régime seigneurial : les censitaires pourront racheter leurs rentes, l'État indemnisera les seigneurs.","The government proposes to abolish the seigneurial system: tenants will be able to buy out their dues, the state will compensate the seigneurs."),
 choices:[
  {label:R("Abolir, avec indemnités","Abolish, with compensation"),hist:true,fx:s=>{s.flags.finSeigneurie=true;s.orient.terre='franc';s.eco+=3;s.treasury-=1500;T(s,'entraide',-2);return R("Les rentes se rachètent lentement : certains en paieront encore en 1940.","The dues are bought out slowly: some will still be paying in 1940.");}},
  {label:R("Le garder","Keep it"),fx:s=>{T(s,'entraide',2);s.eco-=3;s.off.mar-=8;return R("Les seigneuries survivent. Les marchands dénoncent un système d'un autre âge.","The seigneuries survive. The merchants denounce a system from another age.");}}]});

ev3({id:'reciprocite1854',place:'villeMarie',cond:s=>s.year>=1854,
 title:R("La réciprocité","Reciprocity"),
 text:R("Lord Elgin négocie à Washington un traité de libre-échange des produits naturels entre le Canada et les États-Unis.","Lord Elgin negotiates in Washington a free-trade treaty in natural products between Canada and the United States."),
 choices:[
  {label:R("Le soutenir","Support it"),hist:true,fx:s=>{s.flags.reciprocite=true;s.eco+=5;return R("Bois, blé et bétail traversent la frontière. Les années 1850 sont prospères.","Timber, wheat and cattle cross the border. The 1850s are prosperous.");}},
  {label:R("S'en méfier","Distrust it"),fx:s=>{s.eco-=2;T(s,'roi',1);return R("Le traité passe sans vous.","The treaty passes without you.");}}]});

ev3({id:'grandtronc1856',place:'villeMarie',cond:s=>s.year>=1856,
 title:R("Le Grand Tronc","The Grand Trunk"),
 text:R("Le chemin de fer relie Montréal à Toronto et à Portland, et le pont Victoria va franchir le Saint-Laurent. George-Étienne Cartier est l'avocat de la compagnie et le chef des Bleus.","The railway links Montréal to Toronto and Portland, and the Victoria Bridge is about to span the St. Lawrence. George-Étienne Cartier is the company's lawyer and the leader of the Bleus."),
 choices:[
  {label:R("Investir : Montréal métropole","Invest: Montréal the metropolis"),hist:true,fx:s=>{s.flags.chemins=true;s.treasury-=2500;s.eco+=6;return R("Montréal devient la plus grande ville de l'Amérique britannique. Les usines arrivent ; les ouvriers aussi.","Montréal becomes the largest city in British America. Factories arrive, and so do workers.");}},
  {label:R("Des chemins de colonisation plutôt","Colonization roads instead"),fx:s=>{s.flags.colonisation=true;s.treasury-=1500;T(s,'aventure',2);return R("Des routes s'enfoncent vers les Laurentides et le Saguenay. Les fils d'habitants y trouvent des terres.","Roads push into the Laurentians and the Saguenay. Habitants' sons find land there.");}}]});

ev3({id:'quebec1864',place:'quebec',cond:s=>s.year>=1864&&(s.flags.unionAct||s.flags.responsableTot)&&!s.ending,must:true,
 title:R("La conférence de Québec","The Québec Conference"),
 text:R("Le gouvernement de l'Union est paralysé. Brown exige la représentation selon la population. Macdonald et Cartier proposent une fédération de toutes les colonies : un parlement central, et des provinces qui garderont l'éducation, le droit civil et les terres.","The Union government is paralysed. Brown demands representation by population. Macdonald and Cartier propose a federation of all the colonies: a central parliament, and provinces keeping education, civil law and land."),
 choices:s=>{const pStrong=clamp(.25+(s.patri-35)/120+(s.off.mar+30)/250+(s.flags.responsable?.05:0),.05,.75);return [
  {label:R("Accepter le compromis de Cartier","Accept Cartier's compromise"),hist:true,fx:s2=>{s2.flags.confed=true;return R("Les 72 Résolutions sont adoptées. Le Québec sera une province, avec sa législature, son Code civil et ses écoles confessionnelles.","The 72 Resolutions are adopted. Quebec will be a province, with its legislature, its Civil Code and its denominational schools.");}},
  {label:R("Exiger une fédération plus décentralisée","Demand a more decentralized federation"),fx:s2=>{if(Math.random()<pStrong){s2.flags.confed=true;s2.flags.confedForte=true;return R("Cartier obtient davantage : les provinces gardent l'essentiel des pouvoirs, et le Québec un droit de veto sur les changements constitutionnels.","Cartier wins more: the provinces keep most powers, and Quebec a veto over constitutional change.");}
    s2.flags.confed=true;s2.patri+=4;return R("Macdonald tient bon : le centre sera fort. Le Québec signe quand même.","Macdonald holds firm: the centre will be strong. Quebec signs anyway.");}},
  {label:R("Refuser, avec les Rouges de Dorion","Refuse, with Dorion's Rouges"),fx:s2=>{const p=clamp(.2+(s2.patri-40)/150,.05,.5);if(Math.random()<p){s2.flags.confedRefus=true;return R("Le Bas-Canada refuse. La fédération se fera sans lui, ou ne se fera pas.","Lower Canada refuses. The federation will be made without it, or not at all.");}
    s2.flags.confed=true;s2.flags.confedFaible=true;return R("Le projet passe malgré vous, et les Rouges n'ont rien obtenu.","The plan passes despite you, and the Rouges have gained nothing.");}}];}});

ev3({id:'confed1867',place:'quebec',cond:s=>s.year>=1867&&!s.ending,must:true,
 title:R("1er juillet 1867","1 July 1867"),
 text:s=>s.flags.confedRefus?R("Le Canada-Ouest, le Nouveau-Brunswick et la Nouvelle-Écosse se fédèrent sans vous. Que fera le Bas-Canada, seul ?","Canada West, New Brunswick and Nova Scotia federate without you. What will Lower Canada do, alone?"):R("L'Acte de l'Amérique du Nord britannique entre en vigueur. Le Bas-Canada devient la province de Québec. À Québec, on tire le canon.","The British North America Act comes into force. Lower Canada becomes the Province of Quebec. In Québec, the cannon is fired."),
 choices:s=>s.flags.confedRefus?[
  {label:R("Devenir une colonie à part, autonome","Become a separate, self-governing colony"),fx:s2=>{s2.ending='dominionQc';return R("Londres accorde au Québec le statut de colonie autonome, comme Terre-Neuve.","London grants Quebec self-governing colony status, like Newfoundland.");}},
  {label:R("Proclamer l'indépendance","Proclaim independence"),fx:s2=>{const p=clamp(.25+(s2.patri-40)/120,.1,.7);if(Math.random()<p){s2.ending='republique';return R("Sans armée à opposer, Londres accepte. Les États-Unis reconnaissent le nouveau pays.","With no army to oppose it, London accepts. The United States recognizes the new country.");}s2.ending='dominionQc';return R("Londres refuse et menace ; on se contente d'une colonie autonome.","London refuses and threatens; a self-governing colony will have to do.");}}]
 :[{label:R("Entrer dans la Confédération","Enter Confederation"),hist:true,fx:s2=>{s2.ending=s2.flags.confedForte?'confedForte':s2.flags.confedFaible?'confedFaible':(1-s2.ang/s2.pop<.6?'assimilation':'confederation');return R("Le Québec est une province du Dominion du Canada.","Quebec is a province of the Dominion of Canada.");}}]});

/* ===================== conséquences et imprévus ===================== */
cq3({id:'cq3_emigration',place:'boucherville',cond:s=>s.year>=1830&&s.press>.08,w:s=>2+s.press*20,max:2,cool:10,
 because:s=>R("Les vieilles paroisses sont pleines, et les filatures de la Nouvelle-Angleterre embauchent.","The old parishes are full, and the New England mills are hiring."),
 title:R("La fièvre des États","'States fever'"),
 text:R("Des familles entières vendent leur terre et prennent le train pour Lowell ou Manchester. Les curés tonnent : on y perdra sa langue et sa foi.","Whole families sell their land and take the train to Lowell or Manchester. The priests thunder: there you will lose your language and your faith."),
 choices:[
  {label:R("Lancer une société de colonisation","Launch a colonization society"),fx:s=>{s.flags.colonisation=true;s.treasury-=1500;s.land+=8000;T(s,'entraide',2);return R("Le curé Labelle et d'autres ouvriront les Laurentides. « Emparons-nous du sol. »","Curé Labelle and others will open the Laurentians. 'Let us take hold of the land.'");}},
  {label:R("Laisser partir","Let them go"),fx:s=>{T(s,'aventure',2);return R("Les Petits Canadas naissent en Nouvelle-Angleterre. Un jour, il y aura autant de Canadiens français aux États-Unis qu'au Québec.","Little Canadas spring up in New England. One day there will be as many French Canadians in the States as in Quebec.");}}]});

cq3({id:'cq3_saguenay',place:'chicoutimi',cond:s=>s.year>=1838&&s.press>.03&&!s.flags.saguenay,w:s=>3,
 because:s=>R("Les terres manquent dans Charlevoix.","Land is running out in Charlevoix."),
 title:R("La Société des Vingt-et-un","The Society of Twenty-One"),
 text:R("Vingt et un colons de La Malbaie veulent remonter le Saguenay, sur les terres de la Compagnie de la Baie d'Hudson et des Innus.","Twenty-one settlers from La Malbaie want to go up the Saguenay, onto Hudson's Bay Company lands and Innu territory."),
 choices:[
  {label:R("Les soutenir","Support them"),hist:true,fx:s=>{s.flags.saguenay=true;s.places.chicoutimi=true;s.land+=6000;ra(s,'innu',-8);return R("Le Saguenay se peuple. Les Innus, eux, sont repoussés vers le nord.","The Saguenay fills with settlers. The Innu are pushed north.");}},
  {label:R("Négocier d'abord avec les Innus","Negotiate with the Innu first"),fx:s=>{s.flags.saguenay=true;s.places.chicoutimi=true;s.land+=4500;ra(s,'innu',4);T(s,'alliance',3);s.treasury-=800;return R("Une entente réserve des terres de chasse aux Innus de Mashteuiatsh.","An agreement reserves hunting lands for the Innu of Mashteuiatsh.");}}]});
LIKELY.cq3_saguenay=s=>1;

cq3({id:'cq3_nordouest',place:'michilimakinac',cond:s=>s.year>=1784&&s.year<1821&&(s.traits.aventure>=35||s.orient.eco3!=='agriculture'),w:s=>2.5,
 because:s=>R("Le goût des grands espaces ne s'est pas perdu.","The taste for wide spaces has not been lost."),
 title:R("Les voyageurs du Nord-Ouest","The North West voyageurs"),
 text:R("La Compagnie du Nord-Ouest, à Montréal, engage chaque printemps des centaines de jeunes Canadiens pour pagayer jusqu'au lac Athabasca.","The North West Company in Montréal hires hundreds of young Canadiens each spring to paddle as far as Lake Athabasca."),
 choices:[
  {label:R("Encourager l'engagement","Encourage signing on"),fx:s=>{s.flags.nordouest=true;s.eco+=3;T(s,'aventure',3);T(s,'alliance',2);s.pop-=300;return R("Beaucoup ne reviendront pas : ils fondent des familles avec des femmes cries et ojibwées. Un peuple métis naît à la rivière Rouge.","Many will not come back: they start families with Cree and Ojibwe women. A Métis people is born at Red River.");}},
  {label:R("Garder les fils à la terre","Keep the sons on the land"),fx:s=>{T(s,'aventure',-2);return R("Les engagés viendront surtout d'ailleurs.","The engagés will mostly come from elsewhere.");}}]});

cq3({id:'cq3_metis',place:'michilimakinac',cond:s=>s.year>=1815&&s.flags.nordouest,w:s=>2,
 because:s=>R("Des voyageurs canadiens ont fait souche dans l'Ouest.","Canadien voyageurs have put down roots in the West."),
 title:R("La rivière Rouge","Red River"),
 text:R("À la rivière Rouge, les Métis, fils de voyageurs canadiens et de femmes cries, affrontent la colonie de Selkirk à la Grenouillère. Ils écrivent à Québec : sommes-nous des vôtres ?","At Red River, the Métis, sons of Canadien voyageurs and Cree women, clash with the Selkirk colony at Seven Oaks. They write to Québec: are we yours?"),
 choices:[
  {label:R("Envoyer des prêtres et des maîtres","Send priests and teachers"),fx:s=>{s.flags.metisRR=true;T(s,'alliance',4);s.treasury-=800;return R("Provencher fonde la mission de Saint-Boniface. Le français s'enracine dans les Prairies.","Provencher founds the Saint-Boniface mission. French takes root on the Prairies.");}},
  {label:R("C'est trop loin","It is too far"),fx:s=>R("Les Métis se débrouilleront seuls. Ils s'en souviendront en 1869.","The Métis will manage on their own. They will remember it in 1869.")}]});

cq3({id:'cq3_irlandais',place:'quebec',cond:s=>s.year>=1820&&s.ang>40000&&s.traits.ferveur>=55,w:s=>2,
 because:s=>R("Beaucoup des nouveaux venus sont des Irlandais catholiques.","Many of the newcomers are Catholic Irish."),
 title:R("Des catholiques qui parlent anglais","Catholics who speak English"),
 text:R("Les Irlandais catholiques de Québec demandent leur propre église. Les patriotes voient en eux des alliés contre les marchands anglais ; les tories aussi les courtisent.","Québec's Catholic Irish ask for their own church. The patriotes see allies against the English merchants; the tories court them too."),
 choices:[
  {label:R("Les accueillir dans nos paroisses","Welcome them into our parishes"),fx:s=>{T(s,'ouverture',3);s.patri+=3;s.ang-=3000;return R("Des Irlandais épousent des Canadiennes ; leurs enfants parleront français. O'Callaghan sera patriote.","Irishmen marry Canadien women; their children will speak French. O'Callaghan will be a patriote.");}},
  {label:R("Les laisser à leur communauté","Leave them to their community"),fx:s=>R("Saint-Patrick ouvre à Montréal. Les Irlandais restent entre eux.","St. Patrick's opens in Montréal. The Irish keep to themselves.")}]});

cq3({id:'cq3_mandement',place:'villeMarie',cond:s=>s.year>=1834&&s.year<1840&&s.patri>=40&&s.traits.ferveur>=55,w:s=>3,
 because:s=>R("Le mouvement patriote monte, et l'Église est puissante.","The patriote movement is rising, and the Church is powerful."),
 title:R("Le mandement de Lartigue","Lartigue's pastoral letter"),
 text:R("L'évêque de Montréal prépare un mandement : se révolter contre l'autorité légitime est un péché. Les patriotes lui demandent de se taire.","The bishop of Montréal prepares a pastoral letter: rebelling against legitimate authority is a sin. The patriotes ask him to keep silent."),
 choices:[
  {label:R("Ménager l'évêque","Humour the bishop"),fx:s=>{s.patri-=4;s.off.eve+=8;return R("Le mandement est lu dans toutes les paroisses. Une partie des habitants se retire du mouvement.","The letter is read in every parish. Some habitants withdraw from the movement.");}},
  {label:R("Le défier publiquement","Defy him publicly"),fx:s=>{s.patri+=4;s.off.eve-=15;T(s,'ferveur',-3);return R("À Saint-Charles, des fidèles sortent de l'église pendant la lecture.","At Saint-Charles, parishioners walk out of church during the reading.");}}]});

cq3({id:'cq3_armesUS',place:'laprairie',cond:s=>s.year>=1835&&s.year<1839&&s.orient.cour==='patriote'&&!s.flags.usAid,w:s=>2,
 because:s=>R("Vous avez choisi la confrontation, et la frontière américaine est proche.","You have chosen confrontation, and the American border is close."),
 title:R("Des amis au Vermont","Friends in Vermont"),
 text:R("Des républicains du Vermont et de New York offrent de l'argent, des armes et des volontaires si les Canadiens se soulèvent.","Republicans in Vermont and New York offer money, arms and volunteers if the Canadiens rise."),
 choices:[
  {label:R("Accepter leur aide","Accept their help"),fx:s=>{s.flags.usAid=true;s.compagnie-=10;s.patri+=4;return R("Des caches d'armes se forment près de la frontière. Washington, officiellement, ne sait rien.","Arms caches build up near the border. Washington, officially, knows nothing.");}},
  {label:R("Refuser : pas d'étrangers dans nos affaires","Refuse: no foreigners in our affairs"),fx:s=>{T(s,'roi',1);return R("Les Vermontois repartent. Certains reviendront quand même.","The Vermonters go home. Some will come back anyway.");}}]});

cq3({id:'cq3_caisses',place:'quebec',cond:s=>s.year>=1835&&s.traits.entraide>=60,w:s=>1+(s.traits.entraide-55)/6,
 because:s=>R("Les paroisses ont l'habitude de s'entraider.","The parishes are used to helping each other."),
 title:R("La Banque du Peuple","The Banque du Peuple"),
 text:R("Des marchands canadiens fondent une banque pour prêter aux Canadiens, que les banques anglaises négligent. D'autres parlent de sociétés de secours mutuel.","Canadien merchants found a bank to lend to Canadiens, whom the English banks neglect. Others talk of mutual aid societies."),
 choices:[
  {label:R("Y placer l'argent des fabriques","Put the fabriques' money in it"),fx:s=>{s.flags.caisses=true;s.eco+=4;s.treasury-=800;T(s,'entraide',2);return R("La Banque du Peuple prête aux cultivateurs et aux artisans. L'idée coopérative fera son chemin.","The Banque du Peuple lends to farmers and craftsmen. The cooperative idea will grow.");}},
  {label:R("Rester prudent","Stay cautious"),fx:s=>R("La banque ouvre, modestement.","The bank opens, modestly.")}]});

cq3({id:'cq3_seven',place:'kahnawake',cond:s=>s.year>=1790&&(s.traits.alliance>=42||s.orient.nations==='alliance'),w:s=>2,
 because:s=>R("Les liens avec les nations sont restés forts.","Ties with the nations have stayed strong."),
 title:R("Les Sept-Nations du Canada","The Seven Nations of Canada"),
 text:R("Les Sept-Nations (Kahnawake, Kanesatake, Akwesasne, Odanak, Wendake…) demandent l'appui des députés canadiens pour que leurs terres ne soient plus grignotées par les seigneurs et les cantons.","The Seven Nations (Kahnawake, Kanesatake, Akwesasne, Odanak, Wendake…) ask the Canadien members for support so their lands are no longer whittled away by seigneurs and townships."),
 choices:[
  {label:R("Les appuyer à l'Assemblée","Support them in the Assembly"),fx:s=>{ra(s,'agnier',8);ra(s,'abenaki',8);ra(s,'wen',8);T(s,'alliance',4);s.off.mar-=6;s.flags.septNations=true;return R("Une loi protège les terres des missions. Les nations ont des alliés à Québec.","A law protects the mission lands. The nations have allies in Québec.");}},
  {label:R("Ce n'est pas notre affaire","It is not our business"),fx:s=>{ra(s,'agnier',-5);ra(s,'abenaki',-5);T(s,'alliance',-2);return R("Le Département des Affaires indiennes décidera pour eux.","The Indian Department will decide for them.");}}]});

cq3({id:'cq3_temperance',place:'villeMarie',cond:s=>s.year>=1840&&s.traits.ferveur>=62,w:s=>2,
 because:s=>R("La ferveur est grande depuis l'arrivée de Mgr Bourget.","Fervour has run high since Bishop Bourget arrived."),
 title:R("La croisade de tempérance","The temperance crusade"),
 text:R("L'abbé Chiniquy parcourt les paroisses et fait prêter serment de ne plus boire. Des milliers de croix noires se dressent dans les maisons.","Father Chiniquy travels the parishes and has people swear never to drink again. Thousands of black crosses go up in homes."),
 choices:[
  {label:R("L'encourager","Encourage it"),fx:s=>{s.flags.temperance=true;T(s,'ferveur',3);s.eco+=1;return R("Les auberges ferment. Les curés n'ont jamais eu autant d'autorité.","The taverns close. The priests have never had so much authority.");}},
  {label:R("Rester à l'écart","Stay out of it"),fx:s=>R("La croisade passe, comme un orage.","The crusade passes, like a storm.")}]});

cq3({id:'cq3_montreal',place:'villeMarie',cond:s=>s.year>=1830&&s.ang/s.pop>.22,w:s=>2+(s.ang/s.pop-.2)*30,
 because:s=>R("Les anglophones sont désormais nombreux, surtout à Montréal.","English speakers are now numerous, especially in Montréal."),
 title:R("Montréal, ville anglaise ?","Montréal, an English city?"),
 text:R("Au recensement, Montréal est à majorité anglophone. Les enseignes, les banques, les usines parlent anglais. Les jeunes Canadiens qui veulent réussir apprennent l'anglais.","The census shows Montréal with an English-speaking majority. The signs, the banks, the factories speak English. Young Canadiens who want to get ahead learn English."),
 choices:[
  {label:R("Ouvrir des écoles commerciales françaises","Open French commercial schools"),fx:s=>{s.treasury-=1200;s.edu+=3;s.patri+=3;return R("Les Frères des écoles chrétiennes forment des commis canadiens.","The Christian Brothers train Canadien clerks.");}},
  {label:R("Apprendre l'anglais pour réussir","Learn English to get ahead"),fx:s=>{T(s,'ouverture',3);s.eco+=2;s.ang+=Math.round(s.pop*.01);return R("Une bourgeoisie bilingue apparaît. Ses petits-enfants, parfois, ne parleront plus français.","A bilingual bourgeoisie emerges. Its grandchildren, sometimes, will no longer speak French.");}}]});

cq3({id:'cq3_seigneurs',place:'kamouraska',cond:s=>s.year>=1800&&s.year<1854&&s.orient.terre==='seigneurie'&&s.press>.03,w:s=>2,
 because:s=>R("Vous défendez le régime seigneurial, et les terres manquent.","You defend the seigneurial system, and land is short."),
 title:R("Les seigneurs augmentent les rentes","The seigneurs raise the dues"),
 text:R("Profitant de la rareté des terres, des seigneurs exigent des rentes plus lourdes et se réservent les forêts. Les censitaires protestent.","Taking advantage of land scarcity, seigneurs demand heavier dues and reserve the forests for themselves. The tenants protest."),
 choices:[
  {label:R("Défendre les censitaires","Defend the tenants"),fx:s=>{s.patri+=4;s.land+=3000;T(s,'entraide',2);return R("L'Assemblée vote une loi ; le Conseil la bloque. Mais quelques seigneurs reculent.","The Assembly passes a bill; the Council blocks it. But a few seigneurs back down.");}},
  {label:R("Ménager les seigneurs","Humour the seigneurs"),fx:s=>{s.compagnie+=3;s.patri-=2;return R("Les fils d'habitants partent vers les cantons, ou vers les États.","Habitants' sons leave for the townships, or for the States.");}}]});

sy3({id:'p3_feu',place:'quebec',cond:s=>s.year>=1765,max:2,cool:30,w:s=>.4,
 title:R("Le feu","Fire"),
 text:R("Un incendie ravage un faubourg : des centaines de maisons de bois brûlent en une nuit.","A fire ravages a suburb: hundreds of wooden houses burn in a night."),
 choices:[
  {label:R("Reconstruire en pierre, avec des secours","Rebuild in stone, with relief"),fx:s=>{s.treasury-=1000;T(s,'entraide',2);return R("Les paroisses envoient du blé et de l'argent. On rebâtit plus solide.","The parishes send wheat and money. People rebuild more solidly.");}},
  {label:R("Laisser chacun se débrouiller","Let everyone manage"),fx:s=>{s.pop-=150;return R("Des familles partent vivre chez des parents à la campagne.","Families go to live with relatives in the country.");}}]});

sy3({id:'p3_recolte',place:'troisRivieres',cond:s=>s.year>=1765,max:3,cool:15,w:s=>.6,
 title:R("La mouche à blé","The wheat midge"),
 text:R("Les récoltes de blé sont mauvaises, encore. On parle de la mouche, du sol épuisé, du froid.","The wheat harvests are poor, again. People talk of the midge, the exhausted soil, the cold."),
 choices:[
  {label:R("Encourager la pomme de terre et l'avoine","Encourage potatoes and oats"),fx:s=>{s.eco+=1;T(s,'entraide',1);return R("Les habitants changent de culture, lentement. Le blé ne reviendra plus comme avant.","The habitants change crops, slowly. Wheat will never return as before.");}},
  {label:R("Demander une aide au gouvernement","Ask the government for relief"),fx:s=>{s.treasury+=600;s.compagnie-=2;return R("Quelques sacs de semence arrivent, tard.","A few sacks of seed arrive, late.");}}]});

sy3({id:'p3_chantier',place:'quebec',cond:s=>s.year>=1806&&s.year<1870,max:2,cool:15,w:s=>.8,
 title:R("Les chantiers de bois","The timber shanties"),
 text:R("Napoléon bloque la Baltique : l'Angleterre a besoin du bois canadien. Chaque hiver, des milliers d'hommes montent aux chantiers de l'Outaouais.","Napoleon blockades the Baltic: England needs Canadian timber. Every winter thousands of men go up to the Ottawa Valley shanties."),
 choices:[
  {label:R("Que les jeunes y montent","Let the young men go"),fx:s=>{s.eco+=4;T(s,'aventure',2);s.treasury+=500;return R("Les draveurs descendent les cages de bois jusqu'à Québec. Le Saint-Laurent se couvre de radeaux.","The log drivers float timber rafts down to Québec. The St. Lawrence fills with rafts.");}},
  {label:R("Préférer la terre","Prefer farming"),fx:s=>{T(s,'aventure',-1);return R("Ce sont des Irlandais qui monteront aux chantiers.","It is the Irish who will go up to the shanties.");}}]});

sy3({id:'p3_college',place:'stHyacinthe',cond:s=>s.year>=1800&&(s.budget.ecoles||0)>=25,max:2,cool:15,
 title:R("Un collège classique","A classical college"),
 text:R("Un curé veut fonder un collège : latin, rhétorique, philosophie. On y formera les prêtres, les avocats et les notaires de demain.","A priest wants to found a college: Latin, rhetoric, philosophy. It will train tomorrow's priests, lawyers and notaries."),
 choices:[
  {label:R("Soutenir la fondation","Support the foundation"),fx:s=>{s.flags.colleges=true;s.treasury-=900;s.edu+=2;s.off.eve+=5;return R("Le collège ouvre. Il formera des patriotes… et des évêques.","The college opens. It will train patriotes… and bishops.");}},
  {label:R("Pas cette année","Not this year"),fx:s=>R("Le projet attendra.","The project will wait.")}]});

/* epidemics later in the period */
ev3({id:'cholera1849',place:'villeMarie',cond:s=>s.year>=1849,must:true,
 title:R("Le choléra revient","Cholera returns"),
 text:R("Le choléra frappe de nouveau Montréal et Québec, puis encore en 1854.","Cholera strikes Montréal and Québec again, and again in 1854."),
 choices:[{label:R("Nettoyer les quartiers, creuser des égouts","Clean the districts, dig sewers"),hist:true,fx:s=>{s.mods.epid=(s.mods.epid||0)+.004;s.treasury-=800;return R("La mortalité est moindre qu'en 1832. Les villes commencent à se doter d'aqueducs.","Mortality is lower than in 1832. The cities begin to build waterworks.");}}]});

Object.assign(DIVERGE,{
 responsable1848:R("Dans l'histoire, le gouvernement responsable arrive en 1848 avec LaFontaine et Baldwin. Ici, sans alliance réformiste, il se fait attendre.","In history, responsible government arrived in 1848 with LaFontaine and Baldwin. Here, without a reform alliance, it is slow to come.")});
EVENTS.push(...P3E);for(const e of P3E)EV[e.id]=e;
Object.assign(EVENT_IMG,{guerre1812:'chateauguay',chateauguay1813:'chateauguay',quebec1864:'cartier',confed1867:'confed',papineau1815:'papineau',dalhousie1827:'papineau',resolutions1834:'papineau',russell1837:'sixcomtes'});
})();
