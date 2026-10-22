/* Kebec — Période IV (1867–1960) : événements historiques datés.
   Vous êtes le gouvernement de la province ; Ottawa, l'Église et le capital sont des forces extérieures. */
(()=>{
const P4E=[];
const ev4=e=>{e.period=4;P4E.push(e);};
const T=traitAdd,ra=relAdd;
const M=(s,f)=>Math.round((s.revT||1e6)*f);   /* une fraction des revenus d'un tour */

/* ===================== 1867–1885 : la province bleue ===================== */
ev4({id:'chauveau1867',place:'quebec',cond:s=>s.year>=1867,must:true,
 title:R("Le premier gouvernement de la province","The province's first government"),
 text:R("Pierre-Joseph-Olivier Chauveau, lettré et pieux, forme le premier gouvernement. Mais le vrai patron des « bleus » est George-Étienne Cartier, ministre à Ottawa ET député à Québec : le double mandat est permis. La province sera-t-elle une succursale d'Ottawa ?","Pierre-Joseph-Olivier Chauveau, a man of letters and of faith, forms the first government. But the real boss of the 'bleus' is George-Étienne Cartier, a minister in Ottawa AND a member in Québec: the double mandate is allowed. Will the province be a branch office of Ottawa?"),
 choices:[
  {label:R("Gouverner en accord avec Cartier","Govern in step with Cartier"),hist:true,fx:s=>{s.off.gov+=10;s.autonomy-=2;s.support+=3;return R("Les subsides fédéraux arrivent, les chemins de fer aussi. Les libéraux se moquent d'un « gouvernement de commis ».","Federal subsidies arrive, and so do railways. The Liberals mock a 'government of clerks'.");}},
  {label:R("Affirmer dès le départ les droits de la province","Assert the province's rights from the start"),fx:s=>{s.autonomy+=5;s.patri+=3;s.off.gov-=8;return R("Chauveau rappelle que l'éducation et les terres sont à Québec. Cartier fronce les sourcils.","Chauveau points out that education and land belong to Québec. Cartier frowns.");}},
  {label:R("Interdire le double mandat","Ban the double mandate"),fx:s=>{s.autonomy+=4;s.off.gov-=6;s.flags.sansDouble=true;return R("Les députés devront choisir : Québec ou Ottawa. La province a ses propres chefs. (Dans l'histoire, ce sera fait en 1874.)","Members must choose: Québec or Ottawa. The province has its own leaders. (In history, this came in 1874.)");}}]});

ev4({id:'instruction1868',place:'quebec',cond:s=>s.year>=1868,
 title:R("Un ministère de l'Instruction publique","A ministry of public instruction"),
 text:R("Chauveau, ancien surintendant de l'Éducation, se nomme lui-même ministre de l'Instruction publique. Les évêques siègent au Conseil, mais l'État tient les cordons de la bourse. Mgr Bourget s'inquiète : l'école doit appartenir à l'Église.","Chauveau, a former superintendent of education, appoints himself minister of public instruction. The bishops sit on the Council, but the state holds the purse strings. Bishop Bourget worries: the school must belong to the Church."),
 choices:[
  {label:R("Créer le ministère, avec les évêques au Conseil","Create the ministry, with the bishops on the Council"),hist:true,fx:s=>{s.flags.ministere=true;s.edu+=2;s.off.eve-=3;return R("Le ministère ouvre des écoles normales. Il ne survivra pas à Chauveau.","The ministry opens teacher-training schools. It will not outlive Chauveau.");}},
  {label:R("Confier l'école aux évêques","Hand the school over to the bishops"),fx:s=>{s.flags.ministereAboli=true;s.church+=4;s.off.eve+=12;s.edu-=1;return R("Le Conseil de l'instruction publique devient l'affaire de l'épiscopat.","The Council of Public Instruction becomes the bishops' affair.");}},
  {label:R("Une école publique, neutre, à la française","A public, neutral school, French-style"),fx:s=>{s.flags.ministere=true;s.flags.ecoleNeutre=true;s.edu+=5;s.church-=6;s.off.eve-=30;s.support-=8;T(s,'ouverture',4);return R("Les curés tonnent en chaire contre « l'école sans Dieu ». Le gouvernement tient, de justesse.","The priests thunder from the pulpit against 'the godless school'. The government holds, barely.");}}]});

ev4({id:'zouaves1868',place:'villeMarie',cond:s=>s.year>=1868,
 title:R("Les zouaves pontificaux","The Papal Zouaves"),
 text:R("Garibaldi menace Rome. Mgr Bourget appelle les jeunes Canadiens à défendre le pape. Des centaines s'enrôlent dans les zouaves pontificaux, en uniforme gris et rouge.","Garibaldi threatens Rome. Bishop Bourget calls on young Canadiens to defend the Pope. Hundreds enlist in the Papal Zouaves, in grey and red uniforms."),
 choices:[
  {label:R("Bénir leur départ","Bless their departure"),hist:true,fx:s=>{s.church+=2;T(s,'ferveur',2);s.off.eve+=8;return R("Quelque cinq cents zouaves partent entre 1868 et 1870. Au retour, ils fondent des paroisses… et un mythe.","Some five hundred Zouaves leave between 1868 and 1870. On their return they found parishes… and a myth.");}},
  {label:R("Les décourager : on a besoin d'eux ici","Discourage them: we need them here"),fx:s=>{s.off.eve-=10;T(s,'ouverture',2);return R("Quelques dizaines partent quand même. Mgr Bourget ne l'oublie pas.","A few dozen go anyway. Bishop Bourget does not forget.");}},
  {label:R("Lever une souscription publique","Raise a public subscription"),fx:s=>{s.treasury-=M(s,.03);s.off.eve+=14;T(s,'ferveur',3);s.flags.programmeCatho=true;return R("La province paie le voyage. Les ultramontains ont le vent dans les voiles.","The province pays the passage. The ultramontanes have the wind in their sails.");}}]});

ev4({id:'riviererouge1869',place:'bytown',cond:s=>s.year>=1869,must:true,
 title:R("La résistance de la rivière Rouge","The Red River Resistance"),
 text:R("Ottawa a acheté la Terre de Rupert sans consulter ceux qui y vivent. À la rivière Rouge, les Métis, francophones et catholiques, forment un gouvernement provisoire sous Louis Riel. Le Québec y voit des cousins ; l'Ontario, des rebelles.","Ottawa has bought Rupert's Land without consulting those who live there. At Red River, the Métis, French-speaking and Catholic, form a provisional government under Louis Riel. Quebec sees cousins; Ontario sees rebels."),
 choices:[
  {label:R("Appuyer la négociation de Cartier et de Mgr Taché","Back the negotiations of Cartier and Bishop Taché"),hist:true,fx:s=>{s.flags.manitobaAct=true;s.minor+=6000;s.minorVit+=5;return R("La Loi sur le Manitoba (1870) crée une petite province bilingue, avec des écoles catholiques. Riel, lui, doit s'exiler.","The Manitoba Act (1870) creates a small bilingual province, with Catholic schools. Riel, however, must go into exile.");}},
  {label:R("Exiger un Manitoba français et catholique","Demand a French and Catholic Manitoba"),fx:s=>{s.flags.manitobaAct=true;s.flags.manitobaFort=true;s.patri+=5;s.off.gov-=12;s.minorVit+=9;s.minor+=9000;return R("Les députés québécois font bloc. Le Manitoba naît avec des garanties plus solides… et l'Ontario orangiste fulmine.","Quebec's members vote as a bloc. Manitoba is born with stronger guarantees… and Orange Ontario fumes.");}},
  {label:R("Laisser Ottawa régler cela","Let Ottawa handle it"),fx:s=>{s.flags.manitobaAct=true;s.minorVit-=6;s.off.gov+=4;return R("Une expédition militaire arrive à la rivière Rouge. Les colons ontariens suivent.","A military expedition reaches Red River. Ontario settlers follow.");}}]});

ev4({id:'guibord1869',place:'villeMarie',cond:s=>s.year>=1869,
 title:R("L'affaire Guibord","The Guibord affair"),
 text:R("Joseph Guibord, typographe, membre de l'Institut canadien, meurt. L'Institut est condamné par Mgr Bourget pour ses livres à l'Index : on refuse à Guibord la sépulture au cimetière catholique. Sa veuve va en justice, jusqu'à Londres.","Joseph Guibord, a printer and member of the Institut canadien, dies. The Institut has been condemned by Bishop Bourget for its banned books: Guibord is refused burial in the Catholic cemetery. His widow goes to court, all the way to London."),
 choices:[
  {label:R("Rester neutre : c'est l'affaire de l'Église","Stay neutral: it is the Church's business"),hist:true,fx:s=>{T(s,'ouverture',-1);return R("En 1875, Guibord est enfin inhumé, sous escorte militaire, dans un cercueil coulé dans le béton. Mgr Bourget déconsacre la fosse.","In 1875 Guibord is finally buried, under military escort, in a coffin set in concrete. Bishop Bourget deconsecrates the grave.");}},
  {label:R("Défendre l'Institut canadien","Defend the Institut canadien"),fx:s=>{s.flags.institut=true;T(s,'ouverture',5);s.off.eve-=15;s.church-=3;s.support-=4;return R("La province protège la bibliothèque de l'Institut. Les libéraux radicaux reprennent espoir ; les curés, la plume.","The province protects the Institut's library. The radical liberals take heart; the priests take up their pens.");}},
  {label:R("Appuyer Mgr Bourget","Back Bishop Bourget"),fx:s=>{s.off.eve+=10;T(s,'ferveur',2);T(s,'ouverture',-3);return R("L'Institut canadien s'éteint peu à peu. Montréal perd sa grande bibliothèque libre.","The Institut canadien slowly fades. Montréal loses its great free library.");}}]});

ev4({id:'nbschools1871',place:'bytown',cond:s=>s.year>=1871,
 title:R("Les écoles du Nouveau-Brunswick","The New Brunswick schools"),
 text:R("Le Nouveau-Brunswick cesse de financer les écoles catholiques. Les Acadiens demandent l'aide du Québec. Mais exiger qu'Ottawa désavoue une loi provinciale, c'est lui reconnaître le droit de désavouer les nôtres.","New Brunswick stops funding Catholic schools. The Acadians ask Quebec for help. But demanding that Ottawa disallow a provincial law means granting it the right to disallow ours."),
 choices:[
  {label:R("Protester, mais respecter la compétence provinciale","Protest, but respect provincial jurisdiction"),hist:true,fx:s=>{s.flags.nbSchools=true;s.minorVit-=4;s.autonomy+=1;return R("La loi passe. En 1875, à Caraquet, une émeute fait deux morts. Un compromis viendra, à la marge.","The law passes. In 1875 a riot at Caraquet leaves two dead. A compromise will come, at the margins.");}},
  {label:R("Exiger le désaveu fédéral","Demand federal disallowance"),fx:s=>{s.minorVit+=3;s.off.gov-=8;s.autonomy-=3;s.patri+=3;return R("Ottawa refuse, poliment. Le précédent, lui, reste dans les annales.","Ottawa refuses, politely. The precedent stays on the record.");}},
  {label:R("Envoyer des prêtres et des instituteurs aux Acadiens","Send priests and teachers to the Acadians"),fx:s=>{s.flags.nbSchools=true;s.treasury-=M(s,.03);s.minorVit+=5;s.minor+=2000;s.off.eve+=4;return R("Des collèges acadiens naissent, à Memramcook et ailleurs, avec des maîtres venus du Québec.","Acadian colleges are born, at Memramcook and elsewhere, with teachers from Quebec.");}}]});

ev4({id:'programme1871',place:'troisRivieres',cond:s=>s.year>=1871,
 title:R("Le Programme catholique","The Catholic Program"),
 text:R("Des journalistes ultramontains, soutenus par Mgr Laflèche de Trois-Rivières, publient un « programme » : les catholiques ne doivent voter que pour des candidats soumis à la doctrine de l'Église. Les libéraux crient à l'« influence indue ».","Ultramontane journalists, backed by Bishop Laflèche of Trois-Rivières, publish a 'program': Catholics must vote only for candidates who submit to Church doctrine. The Liberals cry 'undue influence'."),
 choices:[
  {label:R("Ne pas s'y associer officiellement","Stay officially aloof"),hist:true,fx:s=>{s.church+=1;return R("Le parti bleu se divise entre « castors » ultramontains et modérés. Les curés continuent de dire en chaire que « le ciel est bleu et l'enfer est rouge ».","The Conservative party splits between ultramontane 'castors' and moderates. Priests keep saying from the pulpit that 'heaven is blue and hell is red'.");}},
  {label:R("L'adopter comme programme du gouvernement","Adopt it as the government's program"),fx:s=>{s.flags.programmeCatho=true;s.off.eve+=12;T(s,'ferveur',3);T(s,'ouverture',-3);s.support+=2;return R("Le gouvernement promet de faire passer la doctrine avant la politique. Rome trouvera même cela excessif.","The government promises to put doctrine before politics. Even Rome will find it excessive.");}},
  {label:R("Le dénoncer : l'Église hors des élections","Denounce it: keep the Church out of elections"),fx:s=>{s.off.eve-=12;T(s,'ouverture',3);s.support-=3;s.flags.influenceIndue=true;return R("Des élections sont annulées pour « influence indue » du clergé. Les tribunaux donnent raison aux libéraux.","Elections are overturned for clerical 'undue influence'. The courts side with the Liberals.");}}]});

ev4({id:'tanneries1874',place:'villeMarie',cond:s=>s.year>=1874,
 title:R("Le scandale des Tanneries","The Tanneries scandal"),
 text:R("Le gouvernement Ouimet a échangé des terrains de la Couronne à Montréal contre des terres de bien moindre valeur, au profit d'amis du parti. La presse libérale s'en délecte.","The Ouimet government swapped Crown land in Montréal for land worth far less, to the profit of party friends. The Liberal press revels in it."),
 choices:[
  {label:R("Le premier ministre démissionne","The premier resigns"),hist:true,fx:s=>{s.support-=3;return R("Ouimet s'en va ; Boucher de Boucherville le remplace. Le parti survit.","Ouimet goes; Boucher de Boucherville replaces him. The party survives.");}},
  {label:R("Nier et tenir bon","Deny and hold on"),fx:s=>{s.flags.scandale=true;s.support-=6;return R("L'affaire traîne en commission. Chaque séance coûte des votes.","The affair drags on in committee. Every sitting costs votes.");}}]});

ev4({id:'instruction1875',place:'quebec',cond:s=>s.year>=1875&&s.flags.ministere&&!s.flags.ministereAboli,
 title:R("Abolir le ministère de l'Instruction publique ?","Abolish the ministry of public instruction?"),
 text:R("Boucher de Boucherville propose d'abolir le ministère : tous les évêques siégeront d'office au comité catholique du Conseil de l'instruction publique. L'école sera, pour longtemps, l'affaire de l'Église.","Boucher de Boucherville proposes abolishing the ministry: all the bishops will sit ex officio on the Catholic committee of the Council of Public Instruction. The school will be, for a long time, the Church's affair."),
 choices:[
  {label:R("Abolir : l'école aux évêques","Abolish it: the school to the bishops"),hist:true,fx:s=>{s.flags.ministereAboli=true;s.flags.ministere=false;s.church+=5;s.off.eve+=15;s.edu-=1;return R("Il n'y aura plus de ministre de l'Éducation au Québec avant 1964.","There will be no minister of education in Quebec until 1964.");}},
  {label:R("Garder un ministère responsable devant la Chambre","Keep a ministry answerable to the House"),fx:s=>{s.edu+=3;s.off.eve-=15;s.church-=3;s.support-=2;return R("Le ministère survit. Les évêques gardent leur place au Conseil, mais pas le dernier mot.","The ministry survives. The bishops keep their seats on the Council, but not the last word.");}}]});
LIKELY.instruction1875=s=>s.orient.eglise4==='etat'?.6:1;

ev4({id:'loi1876',place:'kahnawake',cond:s=>s.year>=1876,
 title:R("La Loi sur les Indiens","The Indian Act"),
 text:R("Ottawa adopte la Loi sur les Indiens : les réserves passent sous la tutelle d'un agent fédéral, le statut d'Indien est défini par l'État, et quiconque obtient un diplôme ou une profession perd ce statut. À Kahnawake, à Wendake, on proteste.","Ottawa passes the Indian Act: reserves come under a federal agent's tutelage, Indian status is defined by the state, and anyone who earns a degree or a profession loses that status. At Kahnawake and Wendake, people protest."),
 choices:[
  {label:R("Laisser Ottawa administrer les réserves","Let Ottawa administer the reserves"),hist:true,fx:s=>{T(s,'alliance',-2);return R("La province n'y voit pas son affaire. Elle continuera pourtant de concéder les forêts où chassent les Innus et les Atikamekw.","The province does not see it as its business. Yet it will keep conceding the forests where the Innu and Atikamekw hunt.");}},
  {label:R("Défendre les terres de Kahnawake et de Kanesatake","Defend the lands of Kahnawake and Kanesatake"),fx:s=>{ra(s,'agnier',10);ra(s,'wen',5);T(s,'alliance',4);s.off.gov-=5;s.off.eve-=4;return R("La province appuie les Mohawks contre les Sulpiciens d'Oka. Ottawa rappelle que les Indiens sont son affaire.","The province backs the Mohawks against the Sulpicians of Oka. Ottawa reminds it that Indians are its business.");}}]});

ev4({id:'labelle1872',place:'stJerome',cond:s=>s.year>=1872,
 title:R("Le curé Labelle, roi du Nord","Curé Labelle, king of the North"),
 text:R("Antoine Labelle, curé de Saint-Jérôme, géant de trois cents livres, rêve d'un pays canadien-français jusqu'à Winnipeg par les Laurentides. Il réclame un chemin de fer et des subventions pour ouvrir des paroisses dans le Nord : « Emparons-nous du sol ! »","Antoine Labelle, the three-hundred-pound priest of Saint-Jérôme, dreams of a French-Canadian country stretching through the Laurentians to Winnipeg. He demands a railway and grants to open parishes in the North: 'Let us take hold of the land!'"),
 choices:[
  {label:R("Subventionner son chemin de fer et ses paroisses","Fund his railway and his parishes"),hist:true,fx:s=>{s.flags.labelle=true;s.colT+=8;s.treasury-=M(s,.08);s.off.eve+=5;if(!s.regions.laurentides){s.regions.laurentides=s.year;s.places.stJerome=true;}return R("Le train du Nord atteint Saint-Jérôme en 1876. Labelle fonde une vingtaine de paroisses ; la terre, rocailleuse, retiendra moins de colons qu'espéré.","The northern railway reaches Saint-Jérôme in 1876. Labelle founds some twenty parishes; the stony soil will hold fewer settlers than hoped.");}},
  {label:R("Préférer l'industrie de Montréal","Prefer Montréal's industry"),fx:s=>{s.eco+=2;s.colT-=3;return R("Les fils d'habitants iront à l'usine, à Montréal ou à Lowell.","Farmers' sons will go to the factory, in Montréal or in Lowell.");}},
  {label:R("Tout miser sur la colonisation","Bet everything on settlement"),fx:s=>{s.flags.labelle=true;s.colT+=14;s.treasury-=M(s,.2);s.eco-=1;if(!s.regions.laurentides){s.regions.laurentides=s.year;s.places.stJerome=true;}return R("Agents de colonisation, primes, chemins : on ouvre le Nord à grands frais.","Settlement agents, bonuses, roads: the North is opened at great expense.");}}]});

ev4({id:'letellier1878',place:'quebec',cond:s=>s.year>=1878,
 title:R("Le « coup d'État » de Letellier","Letellier's 'coup d'état'"),
 text:R("Le lieutenant-gouverneur Luc Letellier de Saint-Just, libéral nommé par Ottawa, renvoie le premier ministre conservateur Boucher de Boucherville, pourtant majoritaire, et appelle le libéral Joly. Un représentant d'Ottawa peut-il défaire le gouvernement de la province ?","Lieutenant Governor Luc Letellier de Saint-Just, a Liberal appointed by Ottawa, dismisses Conservative premier Boucher de Boucherville, despite his majority, and calls on the Liberal Joly. Can Ottawa's representative undo the province's government?"),
 choices:[
  {label:R("S'incliner et retourner devant les électeurs","Bow and go back to the voters"),hist:true,fx:s=>{s.support-=2;s.autonomy-=1;changeGov4(s,'rouge');s.flags.jolyFall=true;return R("Joly gouverne dix-huit mois. Macdonald, revenu au pouvoir, fera destituer Letellier en 1879.","Joly governs for eighteen months. Macdonald, back in power, will have Letellier dismissed in 1879.");}},
  {label:R("Dénoncer l'ingérence fédérale","Denounce federal interference"),fx:s=>{s.patri+=3;s.autonomy+=2;s.off.gov-=6;return R("L'Assemblée vote une résolution : le lieutenant-gouverneur n'est pas un vice-roi.","The Assembly passes a resolution: the lieutenant governor is not a viceroy.");}}]});

ev4({id:'ocanada1880',place:'quebec',cond:s=>s.year>=1880,
 title:R("La convention nationale de 1880","The 1880 national convention"),
 text:R("Pour la Saint-Jean-Baptiste, des Canadiens français de tout le continent se réunissent à Québec. Calixa Lavallée a composé un chant sur des paroles du juge Routhier : « Ô Canada, terre de nos aïeux ».","For Saint-Jean-Baptiste Day, French Canadians from across the continent gather in Québec. Calixa Lavallée has composed a song to words by Judge Routhier: 'Ô Canada, terre de nos aïeux'."),
 choices:[
  {label:R("Faire jouer l'hymne national des Canadiens français","Play the French Canadians' national anthem"),hist:true,fx:s=>{s.flags.ocanada=true;s.patri+=3;T(s,'entraide',1);s.minorVit+=2;return R("Le chant fait le tour des paroisses. Un siècle plus tard, il sera l'hymne de tout le Canada.","The song goes round the parishes. A century later it will be the anthem of all Canada.");}},
  {label:R("Une fête discrète","A discreet celebration"),fx:s=>{T(s,'roi',1);return R("On défile, on prie, on rentre chez soi.","People march, pray, and go home.");}}]});

ev4({id:'exode1881',place:'lowell',cond:s=>s.year>=1881&&s.emig4>50000,
 title:R("« Les Chinois des États de l'Est »","'The Chinese of the Eastern States'"),
 text:s=>R(`Un rapport officiel du Massachusetts traite les Canadiens français de « Chinois des États de l'Est » : dociles, sans instruction, briseurs de grèves. Depuis 1867, ${nf(s.emig4,'fr')} Québécois sont partis pour les filatures. Que faire de ceux qui sont là-bas ?`,`An official Massachusetts report calls French Canadians 'the Chinese of the Eastern States': docile, unschooled, strike-breakers. Since 1867, ${nf(s.emig4,'en')} Quebecers have left for the mills. What should be done about those already there?`),
 choices:[
  {label:R("Les soutenir : paroisses nationales, écoles françaises, journaux","Support them: national parishes, French schools, newspapers"),hist:true,fx:s=>{s.flags.paroissesFA=true;s.off.eve+=4;s.fram+=Math.round(s.fram*.03);return R("Les « Petits Canadas » ont leurs églises, leurs écoles paroissiales, leurs sociétés Saint-Jean-Baptiste. On y parlera français trois générations.","The 'Little Canadas' get their churches, parish schools and Saint-Jean-Baptiste societies. French will be spoken there for three generations.");}},
  {label:R("Les rapatrier : des terres pour ceux qui reviennent","Bring them home: land for those who return"),fx:s=>{s.flags.rapatriement=true;s.treasury-=M(s,.08);s.colT+=4;s.pop+=6000;s.fram-=6000;return R("Des agents de rapatriement parcourent la Nouvelle-Angleterre. Quelques milliers reviennent, souvent pour repartir.","Repatriation agents tour New England. A few thousand come back, often to leave again.");}},
  {label:R("Ils ont choisi : qu'ils deviennent Américains","They chose: let them become Americans"),fx:s=>{s.fram-=Math.round(s.fram*.04);T(s,'ouverture',1);return R("Les noms se changent : Leblanc devient White, Boisvert devient Greenwood.","Names change: Leblanc becomes White, Boisvert becomes Greenwood.");}}]});

/* ===================== 1885 : Riel ===================== */
ev4({id:'riel1885',place:'bytown',cond:s=>s.year>=1885,must:true,
 title:R("Louis Riel est condamné à mort","Louis Riel is sentenced to death"),
 text:R("Revenu de son exil pour défendre les Métis de la Saskatchewan, Riel a mené une rébellion, écrasée à Batoche. Un jury anglophone de Regina l'a déclaré coupable de haute trahison. Macdonald : « Il sera pendu, même si tous les chiens du Québec aboient en sa faveur. »","Back from exile to defend the Saskatchewan Métis, Riel led a rebellion, crushed at Batoche. An English-speaking jury in Regina found him guilty of high treason. Macdonald: 'He shall hang, though every dog in Quebec bark in his favour.'"),
 choices:[
  {label:R("Demander la clémence, sans rompre avec Ottawa","Plead for clemency, without breaking with Ottawa"),hist:true,fx:s=>{s.flags.riel=true;s.patri+=6;s.off.gov-=6;T(s,'roi',-3);return R("Riel est pendu le 16 novembre 1885. Au Québec, des drapeaux noirs apparaissent aux fenêtres.","Riel is hanged on 16 November 1885. In Quebec, black flags appear in the windows.");}},
  {label:R("Mobiliser la province : « Riel, notre frère »","Mobilize the province: 'Riel, our brother'"),g:{professions:6,habitants:3,ouvriers:2,anglos:-8,capital:-4},fx:s=>{s.flags.riel=true;s.flags.partiNational=true;s.patri+=12;s.off.gov-=16;T(s,'roi',-6);s.support+=3;return R("Pétitions, assemblées, cloches qui sonnent le glas : la province entière réclame la grâce. Riel est pendu quand même, et le Québec ne votera plus conservateur avant longtemps.","Petitions, rallies, bells tolling: the whole province demands a pardon. Riel is hanged anyway, and Quebec will not vote Conservative for a long time.");}},
  {label:R("Approuver la sentence : la loi est la loi","Approve the sentence: the law is the law"),g:{professions:-8,habitants:-5,ouvriers:-4,anglos:5},fx:s=>{s.flags.riel=true;s.support-=14;s.off.gov+=8;T(s,'roi',3);s.patri+=2;return R("Le gouvernement s'aligne sur Macdonald. Les électeurs, eux, ne s'alignent pas.","The government lines up behind Macdonald. The voters do not.");}}]});

ev4({id:'champdemars1885',place:'villeMarie',cond:s=>s.year>=1885&&s.fired.riel1885,
 title:R("Le Champ-de-Mars, 22 novembre","The Champ-de-Mars, 22 November"),
 text:R("Cinquante mille personnes à Montréal. Honoré Mercier, chef libéral, lance : « Riel, notre frère, est mort, victime de son dévouement à la cause des Métis… et du fanatisme. » Il propose d'unir libéraux et conservateurs nationalistes dans un Parti national.","Fifty thousand people in Montréal. Honoré Mercier, the Liberal leader, cries: 'Riel, our brother, is dead, victim of his devotion to the Métis cause… and of fanaticism.' He proposes uniting Liberals and nationalist Conservatives in a Parti national."),
 choices:[
  {label:R("Le Parti national : l'union des Canadiens français","The Parti national: French Canadians united"),hist:true,fx:s=>{s.flags.partiNational=true;s.patri+=5;return R("En 1887, Mercier devient premier ministre. Pour la première fois, la province est gouvernée au nom d'une nation.","In 1887 Mercier becomes premier. For the first time, the province is governed in the name of a nation.");}},
  {label:R("Laisser retomber la colère","Let the anger subside"),fx:s=>{s.patri-=3;s.support-=2;return R("La colère retombe, mais les braises restent chaudes.","The anger subsides, but the embers stay hot.");}}]});

ev4({id:'variole1885',place:'villeMarie',cond:s=>s.year>=1885,
 title:R("La variole à Montréal","Smallpox in Montréal"),
 text:R("Un conducteur de train malade a apporté la variole de Chicago. L'épidémie frappe surtout les quartiers canadiens-français, où l'on se méfie du vaccin. Faut-il vacciner de force ?","A sick train conductor brought smallpox from Chicago. The epidemic strikes mainly the French-Canadian districts, where people distrust the vaccine. Should vaccination be compulsory?"),
 choices:[
  {label:R("Vaccination obligatoire, avec la police s'il le faut","Compulsory vaccination, with the police if need be"),hist:true,fx:s=>{s.mods.epid=(s.mods.epid||0)+.0022;s.support-=2;s.flags.hygiene=true;return R("Le 28 septembre, une émeute antivaccin saccage l'hôtel de ville. Mais l'épidémie recule : un peu plus de 3 000 morts, surtout des enfants.","On 28 September an anti-vaccine riot ransacks city hall. But the epidemic recedes: just over 3,000 dead, mostly children.");}},
  {label:R("Laisser chacun choisir","Let everyone choose"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.0045;s.support+=1;return R("L'épidémie dure jusqu'à l'hiver. Les cercueils d'enfants se suivent dans les rues de l'est.","The epidemic lasts until winter. Children's coffins follow one another through the eastern streets.");}}]});

/* ===================== 1887–1897 : Mercier, les Jésuites, le Manitoba ===================== */
ev4({id:'mercier1887',place:'quebec',cond:s=>s.year>=1887,must:true,
 title:R("La conférence interprovinciale","The interprovincial conference"),
 text:R("Mercier invite les premiers ministres des provinces à Québec. L'Ontario d'Oliver Mowat, lui aussi, en a assez des désaveux fédéraux. Ensemble, ils pourraient exiger une fédération véritable.","Mercier invites the provincial premiers to Québec. Oliver Mowat's Ontario is also fed up with federal disallowances. Together they could demand a true federation."),
 choices:[
  {label:R("Réunir les provinces contre la centralisation","Unite the provinces against centralization"),hist:true,fx:s=>{s.flags.conference1887=true;s.autonomy+=6;s.off.gov-=8;s.patri+=2;return R("Cinq provinces réclament la fin du désaveu et des subsides accrus. Macdonald boude ; les tribunaux de Londres, peu à peu, donneront raison aux provinces.","Five provinces demand an end to disallowance and larger subsidies. Macdonald sulks; the London courts will gradually side with the provinces.");}},
  {label:R("Collaborer avec Macdonald","Work with Macdonald"),fx:s=>{s.off.gov+=8;s.autonomy-=2;s.patri-=2;return R("Ottawa apprécie. Le Parti national, beaucoup moins.","Ottawa appreciates it. The Parti national, much less.");}}]});

ev4({id:'jesuites1888',place:'quebec',cond:s=>s.year>=1888,
 title:R("Les biens des Jésuites","The Jesuit Estates"),
 text:R("Depuis la Conquête, les biens des Jésuites dorment entre les mains de l'État. Les Jésuites et l'Université Laval se les disputent. Mercier propose une indemnité de 400 000 $, répartie… sur arbitrage du pape.","Since the Conquest, the Jesuits' estates have lain in the state's hands. The Jesuits and Université Laval both claim them. Mercier proposes $400,000 in compensation, divided… by the Pope's arbitration."),
 choices:[
  {label:R("Régler, avec l'arbitrage du pape","Settle, with the Pope's arbitration"),hist:true,g:{clerge:8,anglos:-4},fx:s=>{s.flags.jesuites=true;s.treasury-=M(s,.08);s.off.eve+=10;s.church+=2;s.patri+=1;s.off.gov-=3;s.minorVit-=2;return R("L'Assemblée vote la loi à l'unanimité. En Ontario, les orangistes fondent l'Equal Rights Association : « un pape à Québec ! » L'onde de choc frappera le Manitoba.","The Assembly passes the law unanimously. In Ontario, the Orangemen found the Equal Rights Association: 'a pope in Québec!' The shock wave will hit Manitoba.");}},
  {label:R("Payer, sans mêler Rome","Pay, without involving Rome"),fx:s=>{s.treasury-=M(s,.08);s.off.eve+=2;return R("Les évêques se querellent sur le partage. L'Ontario regarde ailleurs.","The bishops quarrel over the division. Ontario looks elsewhere.");}},
  {label:R("Refuser toute indemnité","Refuse any compensation"),g:{clerge:-10,anglos:4},fx:s=>{s.off.eve-=14;return R("Les biens restent à l'État. Les Jésuites n'oublieront pas.","The estates stay with the state. The Jesuits will not forget.");}}]});

ev4({id:'manitoba1890',place:'bytown',cond:s=>s.year>=1890,must:true,
 title:R("Les écoles du Manitoba","The Manitoba schools"),
 text:R("Le Manitoba, devenu anglais et protestant par l'immigration, abolit le financement des écoles catholiques et le statut officiel du français. Les Franco-Manitobains en appellent à Ottawa, en vertu de la constitution de 1870.","Manitoba, now English and Protestant through immigration, abolishes funding for Catholic schools and the official status of French. The Franco-Manitobans appeal to Ottawa, under the 1870 constitution."),
 choices:[
  {label:R("Réclamer une loi réparatrice à Ottawa","Demand remedial legislation from Ottawa"),hist:true,fx:s=>{s.flags.manitoba=true;s.minorVit-=6;s.patri+=4;s.off.gov-=4;return R("L'affaire empoisonne la politique fédérale pendant six ans. En 1897, le compromis Laurier-Greenway ne laisse qu'une demi-heure de catéchisme et un peu de français.","The affair poisons federal politics for six years. In 1897 the Laurier-Greenway compromise leaves only half an hour of catechism and a little French.");}},
  {label:R("Financer des écoles libres au Manitoba","Fund independent schools in Manitoba"),fx:s=>{s.flags.manitoba=true;s.treasury-=M(s,.05);s.minorVit-=1;s.minor+=3000;s.off.eve+=6;return R("Les Franco-Manitobains paient la double taxe, mais leurs écoles tiennent, avec l'argent du Québec.","The Franco-Manitobans pay double taxes, but their schools hold, with Quebec's money.");}},
  {label:R("Se taire : c'est une compétence provinciale","Stay silent: it is provincial jurisdiction"),g:{professions:-5,clerge:-6},fx:s=>{s.flags.manitoba=true;s.minorVit-=10;s.autonomy+=1;s.patri-=1;return R("Le français recule au Manitoba. On commence à dire que le Canada français, c'est le Québec.","French retreats in Manitoba. People begin to say that French Canada means Quebec.");}}]});
LIKELY.manitoba1890=s=>s.flags.manitobaFort?.55:1;

ev4({id:'baiechaleurs1891',place:'gaspe',cond:s=>s.year>=1891,
 title:R("Le scandale de la Baie des Chaleurs","The Baie des Chaleurs scandal"),
 text:R("Une subvention au chemin de fer de la Baie des Chaleurs aurait servi à payer les dettes électorales du parti au pouvoir. Le lieutenant-gouverneur Angers destitue le premier ministre Mercier.","A subsidy to the Baie des Chaleurs railway allegedly went to pay the ruling party's election debts. Lieutenant Governor Angers dismisses Premier Mercier."),
 choices:[
  {label:R("Accepter la destitution","Accept the dismissal"),hist:true,fx:s=>{polPunish(s,'rouge',-8);changeGov4(s,'bleu');return R("Mercier sera acquitté, ruiné, et mourra en 1894. Les conservateurs reviennent.","Mercier will be acquitted, ruined, and will die in 1894. The Conservatives return.");}},
  {label:R("Contester devant le peuple","Contest it before the people"),fx:s=>{s.support-=3;s.patri+=2;s.off.gov-=6;s.autonomy+=1;return R("La campagne est rude : on parle autant de l'ingérence d'Ottawa que des pots-de-vin.","The campaign is rough: there is as much talk of Ottawa's meddling as of the bribes.");}}]});

ev4({id:'laurier1896',place:'bytown',cond:s=>s.year>=1896,must:true,
 title:R("Laurier contre les évêques","Laurier against the bishops"),
 text:R("Élection fédérale. Les évêques publient un mandement : les catholiques doivent voter pour les candidats favorables à la loi réparatrice du Manitoba, c'est-à-dire les conservateurs. En face, Wilfrid Laurier, libéral, catholique, Canadien français, promet des « voies ensoleillées ».","Federal election. The bishops issue a pastoral letter: Catholics must vote for candidates favouring Manitoba remedial legislation, that is, the Conservatives. Facing them is Wilfrid Laurier, a Liberal, a Catholic, a French Canadian, promising 'sunny ways'."),
 choices:[
  {label:R("Laisser les électeurs choisir Laurier","Let the voters choose Laurier"),hist:true,g:{professions:4,ouvriers:2,clerge:-6},fx:s=>{s.off.eve-=6;s.off.gov+=15;T(s,'ouverture',2);T(s,'roi',2);return R("Le Québec donne 49 de ses 65 sièges à Laurier. Les évêques ont parlé ; le peuple a voté autrement.","Quebec gives 49 of its 65 seats to Laurier. The bishops spoke; the people voted otherwise.");}},
  {label:R("Suivre le mandement des évêques","Follow the bishops' letter"),g:{clerge:8,professions:-5,ouvriers:-3},fx:s=>{s.off.eve+=10;s.off.gov-=8;T(s,'ferveur',2);return R("Le gouvernement fait campagne pour les bleus. Laurier gagne quand même, grâce à l'Ontario, et s'en souviendra.","The government campaigns for the Conservatives. Laurier wins anyway, thanks to Ontario, and will remember.");}}]});

ev4({id:'marchand1897',place:'quebec',cond:s=>s.year>=1897,
 title:R("Le projet de loi Marchand","The Marchand bill"),
 text:R("Le nouveau premier ministre libéral, Félix-Gabriel Marchand, fait voter le rétablissement d'un ministère de l'Instruction publique. Mgr Bruchési court à Rome. Le Conseil législatif, chambre haute nommée à vie, peut tout bloquer.","The new Liberal premier, Félix-Gabriel Marchand, has the House vote to restore a ministry of public instruction. Archbishop Bruchési hurries to Rome. The Legislative Council, an upper house appointed for life, can block it all."),
 choices:[
  {label:R("S'incliner devant le Conseil législatif","Bow to the Legislative Council"),hist:true,fx:s=>{s.church+=1;s.off.eve+=4;return R("Le projet meurt au Conseil, par une voix. Marchand se contente de réformes modestes.","The bill dies in the Council, by one vote. Marchand settles for modest reforms.");}},
  {label:R("Passer outre : un ministère de l'Éducation","Override it: a ministry of education"),fx:s=>{s.flags.ministere=true;s.flags.ministereAboli=false;s.edu+=3;s.off.eve-=18;s.church-=4;s.support-=3;return R("Le gouvernement nomme des conseillers favorables et force le vote. Les évêques le lui feront payer en chaire.","The government appoints friendly councillors and forces the vote. The bishops will make it pay from the pulpit.");}},
  {label:R("Abolir le Conseil législatif","Abolish the Legislative Council"),fx:s=>{s.flags.conseilAboli=true;s.autonomy+=2;s.off.eve-=10;s.off.mar-=4;s.support+=1;return R("La chambre haute disparaît, soixante-dix ans avant l'histoire. Les élus du peuple ont désormais le dernier mot.","The upper house disappears, seventy years ahead of history. The people's representatives now have the last word.");}}]});

ev4({id:'nord1898',place:'chicoutimi',cond:s=>s.year>=1898,
 title:R("Le Québec s'agrandit vers le nord","Quebec expands northward"),
 text:R("Ottawa cède à la province les terres jusqu'à la rivière Eastmain : l'Abitibi, le Témiscamingue nord, le pays des Cris et des Innus. Des forêts, des rivières, peut-être des mines.","Ottawa cedes to the province the lands up to the Eastmain River: Abitibi, northern Témiscamingue, the country of the Cree and Innu. Forests, rivers, perhaps mines."),
 choices:[
  {label:R("Accepter, et préparer la colonisation du Nord","Accept, and prepare to settle the North"),hist:true,fx:s=>{s.flags.nord1898=true;s.colT+=2;s.eco+=1;return R("La carte de la province double de taille. Personne n'a demandé l'avis des Cris.","The province's map doubles in size. No one asked the Cree.");}},
  {label:R("Négocier avec les Cris et les Innus avant d'ouvrir","Negotiate with the Cree and Innu before opening it"),fx:s=>{s.flags.nord1898=true;ra(s,'innu',8);T(s,'alliance',3);s.off.gov-=3;return R("Quelques ententes de chasse sont signées. Ottawa trouve cela inutile ; les Innus, inhabituel.","A few hunting agreements are signed. Ottawa finds it pointless; the Innu, unusual.");}}]});

/* ===================== 1899–1914 : l'Empire, Bourassa, l'industrie ===================== */
ev4({id:'boers1899',place:'villeMarie',cond:s=>s.year>=1899,must:true,
 title:R("La guerre des Boers","The Boer War"),
 text:R("L'Angleterre fait la guerre aux républiques boers d'Afrique du Sud. Le Canada anglais veut envoyer des troupes. Henri Bourassa, petit-fils de Papineau, démissionne de la Chambre des communes : pas une goutte de sang canadien pour l'Empire.","Britain wages war on the Boer republics of South Africa. English Canada wants to send troops. Henri Bourassa, Papineau's grandson, resigns from the House of Commons: not a drop of Canadian blood for the Empire."),
 choices:[
  {label:R("Le compromis de Laurier : des volontaires seulement","Laurier's compromise: volunteers only"),hist:true,fx:s=>{s.patri+=3;T(s,'roi',1);s.flags.bourassa=true;return R("Sept mille volontaires partent, presque tous anglophones. Bourassa devient la voix d'un nationalisme canadien, contre l'impérialisme.","Seven thousand volunteers leave, almost all English-speaking. Bourassa becomes the voice of a Canadian nationalism, against imperialism.");}},
  {label:R("Protester avec Bourassa : aucune participation","Protest with Bourassa: no participation"),fx:s=>{s.patri+=6;s.off.gov-=8;T(s,'roi',-3);s.flags.bourassa=true;return R("L'Assemblée vote une résolution contre la guerre. À Montréal, les étudiants de McGill et de Laval se battent dans la rue.","The Assembly passes a resolution against the war. In Montréal, McGill and Laval students brawl in the street.");}},
  {label:R("Appuyer l'Empire sans réserve","Back the Empire without reservation"),fx:s=>{T(s,'roi',4);s.patri-=4;s.support-=5;s.off.gov+=5;return R("Le gouvernement offre un contingent québécois. Peu de Québécois s'y présentent.","The government offers a Quebec contingent. Few Quebecers show up.");}}]});

ev4({id:'hull1900',place:'hull',cond:s=>s.year>=1900,
 title:R("Le grand feu de Hull","The great Hull fire"),
 text:R("Le 26 avril 1900, un feu de cheminée embrase Hull, ses scieries et ses cours à bois, puis traverse la rivière jusqu'à Ottawa. Quinze mille personnes sont sans abri.","On 26 April 1900, a chimney fire sets Hull ablaze, with its sawmills and lumber yards, then crosses the river to Ottawa. Fifteen thousand people are left homeless."),
 choices:[
  {label:R("Secours d'urgence et reconstruction","Emergency relief and rebuilding"),hist:true,fx:s=>{s.treasury-=M(s,.05);s.support+=2;T(s,'entraide',1);return R("Les dons affluent de tout l'Empire. Hull renaît, en brique cette fois. Les ouvriers d'E. B. Eddy reprennent le travail.","Donations pour in from across the Empire. Hull is reborn, in brick this time. E. B. Eddy's workers go back to work.");}},
  {label:R("Laisser les compagnies reconstruire","Let the companies rebuild"),fx:s=>{s.off.mar+=4;s.support-=3;return R("Les usines repartent vite. Les maisons ouvrières, plus lentement.","The mills restart quickly. The workers' houses, more slowly.");}}]});

ev4({id:'chaussure1900',place:'quebec',cond:s=>s.year>=1900,
 title:R("Le lock-out de la chaussure","The shoe lockout"),
 text:R("À Québec, capitale de la chaussure, vingt et un patrons ferment leurs usines pour briser les syndicats : cinq mille ouvriers à la rue. On demande à Mgr Bégin d'arbitrer.","In Québec City, capital of the shoe industry, twenty-one employers close their factories to break the unions: five thousand workers on the street. Archbishop Bégin is asked to arbitrate."),
 choices:[
  {label:R("Confier l'arbitrage à l'archevêque","Entrust the arbitration to the archbishop"),hist:true,fx:s=>{s.flags.syndCatho=true;s.off.eve+=6;return R("Mgr Bégin reconnaît le droit d'association… à condition que les syndicats acceptent un aumônier. C'est la naissance du syndicalisme catholique.","Archbishop Bégin recognizes the right to organize… provided the unions accept a chaplain. Catholic unionism is born.");}},
  {label:R("Laisser patrons et ouvriers s'arranger","Let employers and workers sort it out"),fx:s=>{s.off.mar+=4;return R("Le lock-out dure des mois. Les ouvriers reviennent, plus pauvres.","The lockout lasts months. The workers return, poorer.");}},
  {label:R("Une loi d'arbitrage obligatoire","A compulsory arbitration law"),fx:s=>{s.off.mar-=8;s.flags.arbitrage=true;s.off.eve-=3;return R("Un tribunal du travail tranchera désormais. Les patrons protestent ; les syndicats internationaux aussi.","A labour tribunal will now decide. Employers protest; so do the international unions.");}}]});

ev4({id:'caisses1900',place:'lauzon',cond:s=>s.year>=1900,
 title:R("La caisse populaire de Lévis","The Lévis caisse populaire"),
 text:R("Alphonse Desjardins, sténographe aux Communes, a vu des ouvriers ruinés par les usuriers. Le 6 décembre 1900, dans sa maison de Lévis, il fonde une coopérative d'épargne et de crédit : chacun y dépose dix sous, la paroisse en répond.","Alphonse Desjardins, a Commons stenographer, has seen workers ruined by moneylenders. On 6 December 1900, in his house in Lévis, he founds a savings and credit co-operative: each member deposits ten cents, the parish answers for it."),
 choices:[
  {label:R("L'encourager, et lui donner une loi (1906)","Encourage it, and give it a law (1906)"),hist:true,fx:s=>{s.flags.caisses=true;T(s,'entraide',3);s.eco+=1;return R("Les curés deviennent gérants de caisse. En 1920, il y en a plus de cent ; un jour, ce sera la plus grande institution financière du Québec.","Priests become caisse managers. By 1920 there are over a hundred; one day it will be Quebec's largest financial institution.");}},
  {label:R("Laisser faire les banques","Leave it to the banks"),fx:s=>{T(s,'entraide',-1);return R("Desjardins persévère, seul, et lentement.","Desjardins perseveres, alone, and slowly.");}}]});

ev4({id:'shawinigan1898',place:'shawinigan',cond:s=>s.year>=1898,
 title:R("Les chutes de Shawinigan","The Shawinigan falls"),
 text:R("Des capitalistes de Boston et de Montréal demandent la concession des chutes de la Saint-Maurice. Ils promettent une centrale électrique, des usines d'aluminium et de pâte, une ville neuve.","Boston and Montréal capitalists ask for the concession of the Saint-Maurice falls. They promise a power plant, aluminium and pulp mills, a new town."),
 choices:[
  {label:R("Concéder les chutes au capital privé","Concede the falls to private capital"),hist:true,g:{capital:8,ouvriers:2,professions:-3},fx:s=>{s.flags.shawinigan=true;s.eco+=4;s.foreign+=4;s.off.mar+=10;s.places.shawinigan=true;return R("La Shawinigan Water & Power devient un empire. En 1903, le courant arrive à Montréal par la plus longue ligne du monde.","Shawinigan Water & Power becomes an empire. In 1903 power reaches Montréal on the longest line in the world.");}},
  {label:R("Garder les chutes à la province","Keep the falls for the province"),g:{capital:-8,professions:4},fx:s=>{s.flags.hydroPublic=true;s.eco+=1;s.foreign-=3;s.off.mar-=12;s.treasury-=M(s,.1);return R("La province bâtit elle-même, lentement, faute de capitaux. Les industriels vont voir ailleurs, en Ontario surtout.","The province builds by itself, slowly, for lack of capital. Industrialists look elsewhere, mostly in Ontario.");}},
  {label:R("Les concéder à des intérêts canadiens-français","Concede them to French-Canadian interests"),g:{professions:5,capital:-4},fx:s=>{s.flags.shawinigan=true;s.eco+=2;s.foreign-=1;s.off.mar-=4;s.places.shawinigan=true;return R("Un syndicat financier canadien-français rassemble l'argent avec peine. L'usine ouvre deux ans plus tard.","A French-Canadian financial syndicate scrapes the money together. The plant opens two years later.");}}]});

ev4({id:'techniques1907',place:'villeMarie',cond:s=>s.year>=1907,
 title:R("Les écoles techniques et les HEC","Technical schools and the HEC"),
 text:R("Lomer Gouin veut former des ingénieurs, des comptables, des contremaîtres canadiens-français : « l'avenir appartient aux peuples instruits ». Il propose des écoles techniques à Montréal et à Québec, et une École des hautes études commerciales. Les collèges classiques grincent.","Lomer Gouin wants to train French-Canadian engineers, accountants, foremen: 'the future belongs to educated peoples'. He proposes technical schools in Montréal and Québec, and a school of higher commercial studies. The classical colleges grumble."),
 choices:[
  {label:R("Fonder les écoles techniques et les HEC","Found the technical schools and the HEC"),hist:true,fx:s=>{s.flags.ecolesTechniques=true;s.flags.hec=true;s.edu+=3;s.treasury-=M(s,.06);s.off.eve-=3;return R("Les HEC ouvrent en 1910, rue Viger. Pour la première fois, l'État québécois forme des gens d'affaires.","The HEC opens in 1910 on rue Viger. For the first time, the Quebec state trains business people.");}},
  {label:R("Laisser l'instruction aux collèges classiques","Leave instruction to the classical colleges"),fx:s=>{s.off.eve+=4;return R("Les collèges continuent de former des prêtres, des avocats et des médecins. Les ingénieurs, eux, viennent de McGill.","The colleges keep turning out priests, lawyers and doctors. The engineers come from McGill.");}}]});

ev4({id:'pontquebec1907',place:'quebec',cond:s=>s.year>=1907,
 title:R("Le pont de Québec s'effondre","The Québec Bridge collapses"),
 text:R("Le 29 août 1907, la travée sud du pont de Québec, le plus long pont cantilever du monde, s'écroule dans le fleuve. Soixante-quinze ouvriers meurent, dont trente-trois Mohawks de Kahnawake, monteurs de charpente réputés.","On 29 August 1907, the south span of the Québec Bridge, the longest cantilever bridge in the world, collapses into the river. Seventy-five workers die, including thirty-three Mohawks from Kahnawake, renowned ironworkers."),
 choices:[
  {label:R("Une commission d'enquête, puis reconstruire","A commission of inquiry, then rebuild"),hist:true,fx:s=>{s.treasury-=M(s,.03);ra(s,'agnier',3);return R("L'enquête accuse les ingénieurs américains. Le pont sera reconstruit et tombera encore en 1916, avant d'ouvrir en 1917. Les jeunes ingénieurs canadiens porteront un anneau de fer.","The inquiry blames the American engineers. The bridge will be rebuilt, fall again in 1916, and open in 1917. Young Canadian engineers will wear an iron ring.");}},
  {label:R("Indemniser les familles de Kahnawake","Compensate the Kahnawake families"),fx:s=>{s.treasury-=M(s,.05);ra(s,'agnier',10);T(s,'alliance',3);return R("La province paie là où la compagnie se dérobe. À Kahnawake, on décide de ne plus envoyer tous les hommes sur le même chantier.","The province pays where the company evades. At Kahnawake, people decide never again to send all the men to the same site.");}}]});

ev4({id:'devoir1910',place:'villeMarie',cond:s=>s.year>=1910,
 title:R("Le Devoir","Le Devoir"),
 text:R("Henri Bourassa fonde un quotidien « indépendant des partis » : Le Devoir. Sa devise : « Fais ce que dois ». Il attaquera tout le monde, à commencer par le gouvernement.","Henri Bourassa founds a daily 'independent of parties': Le Devoir. Its motto: 'Do what you must'. It will attack everyone, starting with the government."),
 choices:[
  {label:R("Un journal libre : tant mieux","A free newspaper: so much the better"),hist:true,fx:s=>{s.flags.devoir=true;s.patri+=3;s.edu+=1;return R("Le Devoir devient le journal des élites nationalistes. Il ne tirera jamais beaucoup, mais tout le monde le lit.","Le Devoir becomes the paper of the nationalist elite. It will never sell much, but everyone reads it.");}},
  {label:R("Le combattre : il attaque le gouvernement","Fight it: it attacks the government"),fx:s=>{s.support+=1;s.patri-=1;T(s,'ouverture',-1);return R("Les annonces gouvernementales vont ailleurs. Bourassa n'en écrit que plus fort.","Government advertising goes elsewhere. Bourassa only writes louder.");}}]});

ev4({id:'eucharistique1910',place:'villeMarie',cond:s=>s.year>=1910,
 title:R("Le congrès eucharistique","The Eucharistic Congress"),
 text:R("Le premier congrès eucharistique tenu en Amérique attire des centaines de milliers de fidèles à Montréal. À Notre-Dame, l'archevêque de Westminster, Mgr Bourne, déclare que l'avenir du catholicisme en Amérique passe par la langue anglaise. Bourassa demande la parole.","The first Eucharistic Congress held in America draws hundreds of thousands of faithful to Montréal. At Notre-Dame, the Archbishop of Westminster, Bishop Bourne, declares that the future of Catholicism in America lies in the English language. Bourassa asks to speak."),
 choices:[
  {label:R("Applaudir la réplique de Bourassa","Applaud Bourassa's reply"),hist:true,fx:s=>{s.patri+=4;T(s,'ferveur',2);s.minorVit+=2;return R("« Laissez-nous notre langue ! » La foule l'ovationne. La langue et la foi sont liées pour un demi-siècle.","'Leave us our language!' The crowd gives him an ovation. Language and faith are bound together for half a century.");}},
  {label:R("Rester discret","Stay discreet"),fx:s=>R("Le congrès se termine par une procession immense. On en parlera longtemps.","The congress ends with an immense procession. It will be talked about for a long time.")},
  {label:R("Donner raison à Mgr Bourne","Agree with Bishop Bourne"),fx:s=>{T(s,'ouverture',2);s.patri-=4;s.minorVit-=4;s.off.eve-=4;return R("La province semble accepter que le français soit une langue de minorité, même dans l'Église.","The province seems to accept that French is a minority language, even in the Church.");}}]});

ev4({id:'embargo1910',place:'quebec',cond:s=>s.year>=1910,
 title:R("Le bois de pulpe","Pulpwood"),
 text:R("Les papetières américaines achètent le bois des forêts publiques québécoises et le transforment chez elles. Gouin envisage d'interdire l'exportation du bois coupé sur les terres de la Couronne : qu'on le transforme ici.","American paper companies buy wood from Quebec's public forests and process it at home. Gouin considers banning the export of wood cut on Crown land: let it be processed here."),
 choices:[
  {label:R("Interdire l'exportation du bois brut","Ban the export of raw wood"),hist:true,fx:s=>{s.flags.embargo=true;s.eco+=3;s.foreign+=1;s.off.mar+=2;return R("Les Américains construisent leurs moulins au Québec : Trois-Rivières devient la capitale mondiale du papier journal.","The Americans build their mills in Quebec: Trois-Rivières becomes the world capital of newsprint.");}},
  {label:R("Laisser le marché décider","Let the market decide"),fx:s=>{s.eco-=1;s.off.mar+=6;return R("Les trains de billes partent pour le Maine et le Wisconsin.","Log trains leave for Maine and Wisconsin.");}},
  {label:R("Réserver la forêt à des papetières d'ici","Reserve the forest for local paper companies"),fx:s=>{s.flags.embargo=true;s.eco+=1;s.foreign-=3;s.off.mar-=8;return R("Quelques papetières canadiennes-françaises naissent, fragiles.","A few French-Canadian paper companies are born, fragile.");}}]});

ev4({id:'marine1910',place:'bytown',cond:s=>s.year>=1910,
 title:R("La marine de Laurier","Laurier's navy"),
 text:R("Laurier crée une petite marine canadienne qui pourrait, en cas de guerre, être mise à la disposition de l'Empire. Pour les impérialistes, c'est trop peu ; pour Bourassa et les nationalistes, c'est le premier pas vers la conscription.","Laurier creates a small Canadian navy that could, in wartime, be placed at the Empire's disposal. For the imperialists it is too little; for Bourassa and the nationalists it is the first step towards conscription."),
 choices:[
  {label:R("Laisser les nationalistes combattre Laurier","Let the nationalists fight Laurier"),hist:true,fx:s=>{s.patri+=3;s.flags.nationalistes1911=true;return R("En 1911, les nationalistes s'allient aux conservateurs : Laurier tombe. Borden, l'impérialiste, prend le pouvoir… avec des voix du Québec.","In 1911 the nationalists ally with the Conservatives: Laurier falls. Borden the imperialist takes power… with Quebec votes.");}},
  {label:R("Défendre Laurier","Defend Laurier"),fx:s=>{s.off.gov+=6;s.patri-=2;return R("Laurier perd quand même, sur le libre-échange avec les États-Unis, mais le Québec lui reste fidèle.","Laurier loses anyway, on free trade with the United States, but Quebec stays loyal to him.");}}]});

ev4({id:'reglement17_1912',place:'bytown',cond:s=>s.year>=1912,must:true,
 title:R("Le Règlement 17","Regulation 17"),
 text:R("L'Ontario limite l'enseignement du français à la première et à la deuxième année. À Ottawa, des institutrices défient la loi ; des mères montent la garde à l'école Guigues, épingles à chapeau à la main. Les Franco-Ontariens demandent l'aide du Québec.","Ontario limits French instruction to the first two grades. In Ottawa, teachers defy the law; mothers stand guard at the Guigues school, hatpins in hand. The Franco-Ontarians ask Quebec for help."),
 choices:[
  {label:R("Soutenir les Franco-Ontariens : souscriptions, motion à l'Assemblée","Support the Franco-Ontarians: subscriptions, a motion in the Assembly"),hist:true,fx:s=>{s.flags.reglement17=true;s.minorVit-=3;s.patri+=5;s.treasury-=M(s,.02);s.off.gov-=4;return R("Le « sou de la pensée française » circule dans les écoles du Québec. Les « blessés de l'Ontario » deviennent une cause.","The 'penny for French thought' circulates in Quebec schools. 'The wounded of Ontario' become a cause.");}},
  {label:R("Laisser l'Ontario décider","Let Ontario decide"),g:{professions:-6,clerge:-6},fx:s=>{s.flags.reglement17=true;s.minorVit-=10;s.patri+=1;return R("Une génération de Franco-Ontariens apprendra à lire en anglais.","A generation of Franco-Ontarians will learn to read in English.");}},
  {label:R("Riposter : boycott des produits ontariens","Retaliate: boycott Ontario goods"),g:{professions:6,capital:-8,anglos:-6},fx:s=>{s.flags.reglement17=true;s.patri+=8;s.off.gov-=10;s.eco-=2;s.minorVit-=2;return R("La campagne enflamme les esprits et refroidit les affaires. Toronto parle de « guerre de races ».","The campaign inflames minds and cools business. Toronto talks of a 'race war'.");}}]});

ev4({id:'ungava1912',place:'chicoutimi',cond:s=>s.year>=1912,
 title:R("L'Ungava","Ungava"),
 text:R("Ottawa cède à la province le district d'Ungava, jusqu'au détroit d'Hudson. La côte du Labrador, elle, reste revendiquée par Terre-Neuve, colonie britannique.","Ottawa cedes the district of Ungava to the province, up to Hudson Strait. The Labrador coast remains claimed by Newfoundland, a British colony."),
 choices:[
  {label:R("Accepter l'Ungava","Accept Ungava"),hist:true,fx:s=>{s.flags.ungavaTerr=true;return R("Le Québec couvre désormais un territoire grand comme trois fois la France. Ses frontières avec le Labrador restent floues.","Quebec now covers an area three times the size of France. Its border with Labrador remains vague.");}},
  {label:R("Réclamer aussi tout le Labrador","Also claim all of Labrador"),fx:s=>{s.flags.ungavaTerr=true;s.flags.labradorClaim=true;s.patri+=2;s.off.gov-=4;return R("Le Québec fait valoir ses droits. L'affaire ira devant le Conseil privé de Londres.","Quebec presses its claims. The matter will go before the Privy Council in London.");}}]});

/* ===================== 1914–1919 : la Grande Guerre et la conscription ===================== */
ev4({id:'guerre1914',place:'villeMarie',cond:s=>s.year>=1914,must:true,
 title:R("La guerre","War"),
 text:R("L'Angleterre déclare la guerre à l'Allemagne : le Canada est en guerre. Les Canadiens français s'enrôlent peu : un régiment francophone, le 22e bataillon, est formé, mais l'armée parle anglais et l'Ontario ferme ses écoles françaises. Bourassa : « Les ennemis de la race française, ce ne sont pas les Allemands, ce sont les Ontariens. »","Britain declares war on Germany: Canada is at war. Few French Canadians enlist: a French-speaking regiment, the 22nd Battalion, is formed, but the army speaks English and Ontario closes its French schools. Bourassa: 'The enemies of the French race are not the Germans, they are the Ontarians.'"),
 choices:[
  {label:R("Appuyer l'effort de guerre, volontaires seulement","Support the war effort, volunteers only"),hist:true,fx:s=>{T(s,'roi',3);s.flags.r22=true;s.eco+=2;return R("Le 22e se couvre de gloire à Courcelette. Mais au Québec, on s'enrôle quatre fois moins qu'en Ontario.","The 22nd covers itself in glory at Courcelette. But in Quebec, enlistment is a quarter of Ontario's.");}},
  {label:R("Neutralité morale, avec Bourassa","Moral neutrality, with Bourassa"),fx:s=>{s.patri+=5;T(s,'roi',-4);s.off.gov-=8;return R("Le gouvernement fait le strict minimum. Le Canada anglais accuse le Québec de lâcheté.","The government does the bare minimum. English Canada accuses Quebec of cowardice.");}},
  {label:R("Recruter activement, avec des officiers francophones","Recruit actively, with French-speaking officers"),fx:s=>{T(s,'roi',6);s.patri-=4;s.off.gov+=8;s.flags.r22=true;s.flags.recrutementQc=true;s.pop-=4000;return R("Des régiments canadiens-français naissent, commandés en français. Les enrôlements doublent… et les morts aussi.","French-Canadian regiments are born, commanded in French. Enlistment doubles… and so do the deaths.");}}]});

ev4({id:'conscription1917',place:'quebec',cond:s=>s.year>=1917,must:true,
 title:R("La conscription","Conscription"),
 text:R("Après Vimy, les volontaires ne suffisent plus. Borden fait voter la Loi du service militaire. Laurier s'y oppose et perd ses députés anglophones. Au Québec, presque tout le monde est contre. Les élections de décembre seront un référendum.","After Vimy, volunteers are no longer enough. Borden passes the Military Service Act. Laurier opposes it and loses his English-speaking members. In Quebec, nearly everyone is against it. The December election will be a referendum."),
 choices:[
  {label:R("S'opposer, mais dans la légalité","Oppose it, but within the law"),hist:true,fx:s=>{s.flags.conscription=true;s.patri+=8;T(s,'roi',-6);s.off.gov-=15;s.pop-=5000;return R("Le Québec élit 62 libéraux de Laurier sur 65 sièges. Le reste du Canada vote pour Borden. Deux pays, une seule armée.","Quebec elects 62 of Laurier's Liberals in 65 seats. The rest of Canada votes for Borden. Two countries, one army.");}},
  {label:R("Résister ouvertement","Resist openly"),g:{habitants:4,professions:4,anglos:-12,capital:-8},fx:s=>{s.flags.conscription=true;s.flags.resistance=true;s.patri+=14;T(s,'roi',-12);s.off.gov-=25;s.pop-=3000;return R("Les insoumis se cachent dans les bois ; des curés les nourrissent. Ottawa parle d'envoyer l'armée.","Draft evaders hide in the woods; priests feed them. Ottawa talks of sending in the army.");}},
  {label:R("Accepter la loi","Accept the law"),g:{habitants:-10,professions:-8,ouvriers:-6,anglos:6},fx:s=>{s.flags.conscription=true;s.support-=15;s.patri+=3;T(s,'roi',2);s.off.gov+=5;s.pop-=7000;return R("Le gouvernement prêche l'obéissance. La rue, elle, gronde.","The government preaches obedience. The street rumbles.");}}]});

ev4({id:'francoeur1918',place:'quebec',cond:s=>s.year>=1918&&s.flags.conscription,must:true,
 title:R("La motion Francœur","The Francœur motion"),
 text:R("Le député Joseph-Napoléon Francœur dépose une motion : « Cette Chambre est d'avis que la province de Québec serait disposée à accepter la rupture du pacte fédératif de 1867 si, dans les autres provinces, on croit qu'elle est un obstacle à l'union, au progrès et au développement du Canada. » Pour la première fois, on parle de quitter la Confédération.","Member Joseph-Napoléon Francœur tables a motion: 'This House is of the opinion that the Province of Quebec would be disposed to accept the breaking of the federative pact of 1867 if, in the other provinces, it is believed that she is an obstacle to the union, progress and development of Canada.' For the first time, there is talk of leaving Confederation."),
 choices:[
  {label:R("Débattre, puis retirer la motion","Debate it, then withdraw it"),hist:true,fx:s=>{s.patri+=3;s.autonomy+=1;return R("Après un grand discours de Gouin sur les bienfaits de la fédération, Francœur retire sa motion. Mais le mot est lâché.","After a grand speech by Gouin on the benefits of federation, Francœur withdraws his motion. But the word is out.");}},
  {label:R("Voter la motion","Pass the motion"),fx:s=>{s.flags.francoeurVote=true;s.patri+=10;s.off.gov-=20;T(s,'roi',-6);return R("L'Assemblée adopte la motion. Le Canada anglais s'indigne ; certains, à Toronto, répondent : « Qu'ils partent ! »","The Assembly passes the motion. English Canada is outraged; some in Toronto answer: 'Let them go!'");}},
  {label:R("Refuser d'en débattre","Refuse to debate it"),fx:s=>{s.patri-=2;s.off.gov+=3;return R("La motion meurt au feuilleton. Les nationalistes parlent de lâcheté.","The motion dies on the order paper. The nationalists talk of cowardice.");}}]});

ev4({id:'emeutes1918',place:'quebec',cond:s=>s.year>=1918&&s.flags.conscription,must:true,
 title:R("Pâques 1918 à Québec","Easter 1918 in Québec"),
 text:R("La police fédérale arrête un jeune homme sans papiers d'exemption. La foule saccage le bureau d'enregistrement. Ottawa envoie des troupes de Toronto. Le lundi de Pâques, sous la neige, les soldats tirent dans la foule.","Federal police arrest a young man without exemption papers. The crowd ransacks the registration office. Ottawa sends troops from Toronto. On Easter Monday, in the snow, the soldiers fire into the crowd."),
 choices:[
  {label:R("Appeler au calme ; exiger une enquête","Call for calm; demand an inquiry"),hist:true,fx:s=>{s.patri+=4;T(s,'roi',-3);return R("Quatre civils sont tués, des dizaines blessés. Le coroner blâme les autorités. Personne n'est puni.","Four civilians are killed, dozens wounded. The coroner blames the authorities. No one is punished.");}},
  {label:R("Exiger le retrait des troupes ontariennes","Demand the withdrawal of the Ontario troops"),fx:s=>{s.patri+=7;s.off.gov-=12;T(s,'roi',-4);return R("Ottawa proclame la loi martiale à Québec. Le Québec s'en souviendra en 1944, et en 1970.","Ottawa proclaims martial law in Québec. Quebec will remember in 1944, and in 1970.");}},
  {label:R("Laisser l'armée rétablir l'ordre","Let the army restore order"),fx:s=>{s.support-=7;T(s,'roi',1);s.patri+=2;return R("L'ordre revient. La confiance, non.","Order returns. Trust does not.");}}]});

ev4({id:'grippe1918',place:'villeMarie',cond:s=>s.year>=1918,must:true,
 title:R("La grippe espagnole","The Spanish flu"),
 text:R("Rapportée par les soldats, la grippe frappe à l'automne 1918. En quelques semaines, les hôpitaux débordent ; les religieuses soignent jusqu'à tomber. Faut-il fermer les églises ?","Brought back by soldiers, the flu strikes in the autumn of 1918. Within weeks the hospitals overflow; the nuns nurse until they drop. Should the churches be closed?"),
 choices:[
  {label:R("Fermer écoles, théâtres et églises","Close schools, theatres and churches"),hist:true,fx:s=>{s.mods.epid=(s.mods.epid||0)+.0052;s.off.eve-=4;return R("Environ quatorze mille Québécois meurent. La santé publique devient une affaire d'État.","About fourteen thousand Quebecers die. Public health becomes a matter of state.");}},
  {label:R("Garder les églises ouvertes : prier","Keep the churches open: pray"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.0075;s.off.eve+=4;T(s,'ferveur',1);return R("Les processions répandent le mal. La mort fauche plus large.","The processions spread the disease. Death reaps more widely.");}}]});

ev4({id:'prohibition1919',place:'quebec',cond:s=>s.year>=1919,
 title:R("La prohibition","Prohibition"),
 text:R("Partout en Amérique du Nord, on interdit l'alcool. Au Québec, les ligues de tempérance poussent, les curés aussi. Le gouvernement Gouin tient un référendum : la bière, le cidre et le vin léger devraient-ils rester permis ?","Across North America, alcohol is being banned. In Quebec the temperance leagues push, and so do the priests. The Gouin government holds a referendum: should beer, cider and light wine stay legal?"),
 choices:[
  {label:R("Bière et vin permis ; puis une Commission des liqueurs","Beer and wine allowed; then a Liquor Commission"),hist:true,fx:s=>{s.flags.liqueurs=true;s.off.eve-=4;s.support+=3;return R("Le « oui » l'emporte à 78 %. En 1921, la province devient seule vendeuse d'alcool : les Américains assoiffés viennent à Montréal, et les profits remplissent le trésor.","'Yes' wins with 78%. In 1921 the province becomes the sole seller of liquor: thirsty Americans come to Montréal, and the profits fill the treasury.");}},
  {label:R("Prohibition totale","Total prohibition"),fx:s=>{s.flags.prohibition=true;s.off.eve+=8;s.support-=6;return R("Les contrebandiers font fortune sur la frontière. Les tavernes ferment, les cuisines ouvrent.","Bootleggers make fortunes along the border. The taverns close, the kitchens open.");}}]});

/* ===================== 1920–1939 : l'électricité, la Crise, l'Union nationale ===================== */
ev4({id:'assistance1921',place:'quebec',cond:s=>s.year>=1921,
 title:R("La loi de l'assistance publique","The Public Charities Act"),
 text:R("Les hôpitaux, orphelinats et hospices des communautés religieuses sont débordés. Taschereau propose que l'État en paie une partie. Les évêques y voient le premier pas d'une étatisation de la charité.","The religious orders' hospitals, orphanages and hospices are overflowing. Taschereau proposes that the state pay part of the cost. The bishops see it as the first step towards nationalizing charity."),
 choices:[
  {label:R("Voter la loi malgré les évêques","Pass the law despite the bishops"),hist:true,g:{clerge:-8,ouvriers:6,habitants:2},fx:s=>{s.flags.assistance=true;s.off.eve-=8;s.church-=1;s.treasury-=M(s,.05);return R("Les communautés acceptent l'argent, et gardent la gestion. L'État met un pied dans la porte.","The orders accept the money, and keep the management. The state gets a foot in the door.");}},
  {label:R("Laisser la charité à l'Église","Leave charity to the Church"),g:{clerge:6,ouvriers:-6},fx:s=>{s.off.eve+=6;return R("Les religieuses continuent de faire des miracles avec des quêtes. La mortalité infantile, elle, ne baisse pas.","The nuns keep working miracles with collections. Infant mortality does not fall.");}}]});

ev4({id:'ctcc1921',place:'hull',cond:s=>s.year>=1921,
 title:R("Les syndicats catholiques","The Catholic unions"),
 text:R("À Hull, des syndicats encadrés par des aumôniers fondent la Confédération des travailleurs catholiques du Canada. Ils rejettent la lutte des classes et les « unions internationales » américaines.","In Hull, unions guided by chaplains found the Confederation of Catholic Workers of Canada. They reject class struggle and the American 'international unions'."),
 choices:[
  {label:R("Reconnaître les syndicats catholiques","Recognize the Catholic unions"),hist:true,g:{clerge:4,ouvriers:2},fx:s=>{s.flags.ctcc=true;s.off.eve+=4;return R("La CTCC grandit dans les villes de province. Trente ans plus tard, elle mènera la grève de l'amiante.","The CTCC grows in the provincial towns. Thirty years later, it will lead the asbestos strike.");}},
  {label:R("Favoriser les unions internationales","Favour the international unions"),g:{ouvriers:4,clerge:-8,capital:-3},fx:s=>{s.flags.cio=true;s.off.eve-=8;s.off.mar-=4;return R("Les unions américaines, plus combatives, recrutent à Montréal. Les évêques dénoncent les « neutres ».","The American unions, more combative, recruit in Montréal. The bishops denounce the 'neutrals'.");}}]});

ev4({id:'labrador1927',place:'septIles',cond:s=>s.year>=1927,must:true,
 title:R("Le Labrador","Labrador"),
 text:R("Le Comité judiciaire du Conseil privé, à Londres, tranche le litige : tout le bassin des rivières qui coulent vers l'Atlantique appartient à Terre-Neuve. Le Québec perd un territoire immense, et ses chutes.","The Judicial Committee of the Privy Council in London settles the dispute: the whole basin of rivers flowing to the Atlantic belongs to Newfoundland. Quebec loses an immense territory, and its falls."),
 choices:[
  {label:R("Protester, sans plus","Protest, nothing more"),hist:true,fx:s=>{s.flags.labrador=true;s.patri+=3;return R("Les cartes du Québec continueront longtemps d'indiquer une frontière « non définie ».","Quebec's maps will long go on marking the border as 'undefined'.");}},
  {label:R("Offrir de racheter le Labrador","Offer to buy Labrador"),fx:s=>{s.flags.labrador=true;if(Math.random()<.2){s.flags.labradorAchat=true;s.treasury-=M(s,.6);s.eco+=2;return R("Terre-Neuve, ruinée, accepte de vendre. Le Labrador et ses chutes Hamilton deviennent québécois.","Newfoundland, bankrupt, agrees to sell. Labrador and its Hamilton Falls become Quebec's.");}s.patri+=2;return R("Terre-Neuve demande un prix extravagant. Les négociations traînent, puis meurent.","Newfoundland asks an extravagant price. The negotiations drag, then die.");}}]});

ev4({id:'crise1930',place:'villeMarie',cond:s=>s.year>=1930,must:true,
 title:R("La Crise","The Depression"),
 text:R("Le krach de Wall Street a gagné le monde. Les usines ferment, les papetières s'effondrent, un ouvrier montréalais sur quatre est chômeur. Les soupes populaires de la Saint-Vincent-de-Paul ne suffisent plus.","The Wall Street crash has spread around the world. Factories close, paper companies collapse, one Montréal worker in four is unemployed. The Saint-Vincent-de-Paul soup kitchens are no longer enough."),
 choices:[
  {label:R("Secours direct et travaux publics, avec Ottawa","Direct relief and public works, with Ottawa"),hist:true,g:{ouvriers:6,habitants:3},fx:s=>{s.treasury-=M(s,.15);s.off.gov+=4;s.support+=2;return R("Le « secours direct » nourrit, à peine. On construit des routes, des bains publics, le Jardin botanique.","'Direct relief' feeds people, barely. Roads, public baths and the Botanical Garden are built.");}},
  {label:R("Le retour à la terre","Back to the land"),g:{habitants:4,clerge:4,ouvriers:-3},fx:s=>{s.flags.retourTerre=true;s.colT+=8;s.treasury-=M(s,.15);s.off.eve+=4;return R("On envoie les chômeurs défricher l'Abitibi. Beaucoup découvrent qu'on ne s'improvise pas colon.","The unemployed are sent to clear Abitibi. Many discover that one does not become a settler overnight.");}},
  {label:R("La charité de l'Église, rien de plus","The Church's charity, nothing more"),g:{ouvriers:-10,habitants:-6,clerge:4},fx:s=>{s.support-=8;s.off.eve+=6;s.mods.epid=(s.mods.epid||0)+.0015;return R("Les paroisses s'épuisent. Dans les quartiers ouvriers, la tuberculose revient.","The parishes are exhausted. In the working-class districts, tuberculosis returns.");}}]});

ev4({id:'vautrin1934',place:'amos',cond:s=>s.year>=1934,
 title:R("Le plan Vautrin","The Vautrin plan"),
 text:R("Le ministre Irénée Vautrin propose un grand plan de colonisation : des primes, des lots, des chemins, pour établir des milliers de familles de chômeurs en Abitibi et au Témiscamingue.","Minister Irénée Vautrin proposes a great settlement plan: bonuses, lots, roads, to settle thousands of unemployed families in Abitibi and Témiscamingue."),
 choices:[
  {label:R("Lancer le plan Vautrin","Launch the Vautrin plan"),hist:true,fx:s=>{s.flags.vautrin=true;s.colT+=10;s.treasury-=M(s,.15);if(!s.regions.abitibi){s.regions.abitibi=s.year;s.places.amos=true;}return R("Des dizaines de paroisses naissent en Abitibi : Val-Paradis, Villebois, Beaucanton. La terre est froide, les étés courts ; beaucoup partiront vers les mines.","Dozens of parishes are born in Abitibi: Val-Paradis, Villebois, Beaucanton. The soil is cold, the summers short; many will leave for the mines.");}},
  {label:R("Préférer de grands travaux urbains","Prefer major urban works"),fx:s=>{s.eco+=2;s.support+=2;return R("Ponts, égouts, édifices : on bâtit en ville. L'Abitibi attendra.","Bridges, sewers, buildings: the cities get built. Abitibi will wait.");}}]});

ev4({id:'aln1935',place:'quebec',cond:s=>s.year>=1935,
 title:R("L'Action libérale nationale","The Action libérale nationale"),
 text:R("Des libéraux dissidents, menés par Paul Gouin, publient un programme de « restauration sociale » : nationaliser l'électricité, briser les trusts, aider les cultivateurs. Maurice Duplessis, chef conservateur, leur propose une alliance : l'Union nationale.","Dissident Liberals led by Paul Gouin publish a program of 'social restoration': nationalize electricity, break the trusts, help farmers. Maurice Duplessis, the Conservative leader, offers them an alliance: the Union nationale."),
 choices:[
  {label:R("Laisser l'opposition s'unir contre le régime","Let the opposition unite against the regime"),hist:true,fx:s=>{s.flags.actionNationale=true;s.patri+=4;s.support-=7;return R("Le comité des comptes publics étale les scandales du régime Taschereau. En 1936, l'Union nationale balaie la province ; Duplessis oubliera vite le programme de Paul Gouin.","The public accounts committee lays bare the Taschereau regime's scandals. In 1936 the Union nationale sweeps the province; Duplessis will soon forget Paul Gouin's program.");}},
  {label:R("Couper l'herbe sous le pied : adopter le programme de l'ALN","Steal their thunder: adopt the ALN program"),g:{professions:8,capital:-8,habitants:2},fx:s=>{s.flags.promesseHydro=true;s.off.mar-=12;s.support+=3;s.patri+=4;return R("Le gouvernement promet de nationaliser l'électricité. Les dissidents rentrent au bercail ; le trust de l'électricité, lui, finance désormais l'adversaire.","The government promises to nationalize electricity. The dissidents come back to the fold; the power trust now funds the opponent.");}}]});

ev4({id:'cadenas1937',place:'quebec',cond:s=>s.year>=1937,
 title:R("La loi du cadenas","The Padlock Law"),
 text:R("Le procureur général propose une « loi protégeant la province contre la propagande communiste » : la police pourra cadenasser tout local servant à la propagande. Le mot « communisme » n'est pas défini.","The attorney general proposes an 'Act to protect the province against communistic propaganda': police may padlock any premises used for propaganda. The word 'communism' is not defined."),
 choices:[
  {label:R("Voter la loi du cadenas","Pass the Padlock Law"),hist:true,g:{clerge:5,ouvriers:-4,professions:-2,anglos:-3},fx:s=>{s.flags.cadenas=true;s.off.eve+=8;s.off.mar+=4;T(s,'ouverture',-3);return R("Imprimeries, locaux syndicaux, salles de Témoins de Jéhovah sont cadenassés. La Cour suprême invalidera la loi… en 1957.","Print shops, union halls and Jehovah's Witness halls are padlocked. The Supreme Court will strike the law down… in 1957.");}},
  {label:R("Refuser : les libertés d'abord","Refuse: liberties first"),fx:s=>{T(s,'ouverture',3);s.off.eve-=6;return R("Le cardinal Villeneuve s'inquiète publiquement. Les communistes, une poignée, restent une poignée.","Cardinal Villeneuve voices public concern. The communists, a handful, remain a handful.");}}]});

ev4({id:'textile1937',place:'sherbrooke',cond:s=>s.year>=1937,
 title:R("La grève du textile","The textile strike"),
 text:R("Dix mille ouvriers et ouvrières de la Dominion Textile débraient à Montréal, Valleyfield, Sherbrooke, Magog, à l'appel des syndicats catholiques. Salaires de misère, semaines de soixante heures. La compagnie refuse de négocier.","Ten thousand Dominion Textile workers, men and women, walk out in Montréal, Valleyfield, Sherbrooke and Magog, at the call of the Catholic unions. Starvation wages, sixty-hour weeks. The company refuses to negotiate."),
 choices:[
  {label:R("Faire arbitrer par le cardinal Villeneuve","Have Cardinal Villeneuve arbitrate"),hist:true,g:{ouvriers:-5,clerge:4,capital:3},fx:s=>{s.flags.textile=true;s.off.eve+=5;return R("Après un mois, le cardinal obtient une entente modeste. La Loi des salaires raisonnables suit.","After a month, the cardinal obtains a modest agreement. The Fair Wages Act follows.");}},
  {label:R("Envoyer la police provinciale","Send in the provincial police"),g:{ouvriers:-12,capital:6},fx:s=>{polRealign(s,'ouvriers',govSide4(s),-5);s.support-=3;s.off.mar+=6;s.flags.repressionGreve=true;return R("Les piquets sont dispersés. Les ouvrières rentrent, la rage au cœur.","The pickets are dispersed. The women workers go back, rage in their hearts.");}},
  {label:R("Imposer un salaire minimum et la semaine de 48 heures","Impose a minimum wage and the 48-hour week"),g:{ouvriers:10,capital:-10},fx:s=>{s.flags.salaireMin=true;s.off.mar-=10;s.support+=3;return R("La Dominion Textile menace de partir pour la Caroline. Elle reste.","Dominion Textile threatens to leave for the Carolinas. It stays.");}}]});

/* ===================== 1939–1945 : la Seconde Guerre ===================== */
ev4({id:'guerre1939',place:'quebec',cond:s=>s.year>=1939,must:true,
 title:R("La guerre, encore","War, again"),
 text:R("Le Canada déclare la guerre à l'Allemagne. Duplessis déclenche des élections-éclair : la guerre servira de prétexte à Ottawa pour tout centraliser. Les ministres fédéraux québécois, Lapointe en tête, menacent de démissionner s'il gagne, laissant le Québec seul face aux conscriptionnistes.","Canada declares war on Germany. Duplessis calls a snap election: Ottawa will use the war as a pretext to centralize everything. The federal Quebec ministers, led by Lapointe, threaten to resign if he wins, leaving Quebec alone against the conscriptionists."),
 choices:[
  {label:R("Faire confiance à Lapointe : « pas de conscription »","Trust Lapointe: 'no conscription'"),hist:true,fx:s=>{s.flags.promesse39=true;s.off.gov+=12;s.autonomy-=3;return R("Adélard Godbout, libéral, est élu sur la promesse fédérale qu'il n'y aura pas de conscription pour outre-mer.","Adélard Godbout, a Liberal, is elected on Ottawa's promise that there will be no conscription for overseas service.");}},
  {label:R("Défendre l'autonomie, contre Ottawa","Defend autonomy, against Ottawa"),fx:s=>{s.patri+=6;s.off.gov-=12;s.autonomy+=3;s.support-=4;return R("La campagne est féroce. Ottawa jette tout son poids dans la balance.","The campaign is ferocious. Ottawa throws all its weight into the scales.");}}]});

ev4({id:'suffrage1940',place:'quebec',cond:s=>s.year>=1940,
 title:R("Le vote des femmes","Votes for women"),
 text:R("Depuis 1918, les Québécoises votent aux élections fédérales, mais pas à Québec. Thérèse Casgrain et Idola Saint-Jean présentent leur projet chaque année depuis treize ans. Le cardinal Villeneuve s'y oppose : « contraire à l'unité et à la hiérarchie familiale ».","Since 1918, Quebec women have voted in federal elections, but not in provincial ones. Thérèse Casgrain and Idola Saint-Jean have presented their bill every year for thirteen years. Cardinal Villeneuve opposes it: 'contrary to family unity and hierarchy'."),
 choices:[
  {label:R("Accorder le droit de vote aux femmes","Grant women the vote"),hist:true,fx:s=>{s.flags.suffrage=true;T(s,'ouverture',4);s.off.eve-=8;s.support+=2;return R("Le 25 avril 1940, la loi est adoptée. Godbout menace de démissionner si l'Église s'en mêle ; elle se tait.","On 25 April 1940 the law is passed. Godbout threatens to resign if the Church interferes; it keeps quiet.");}},
  {label:R("Attendre encore","Wait some more"),fx:s=>{s.off.eve+=6;T(s,'ouverture',-2);return R("Le Québec reste la dernière province où les femmes ne votent pas.","Quebec remains the last province where women cannot vote.");}}]});
LIKELY.suffrage1940=s=>s.orient.eglise4==='concordat'&&s.traits.ferveur>75?.6:1;

ev4({id:'houde1940',place:'villeMarie',cond:s=>s.year>=1940,
 title:R("Camillien Houde interné","Camillien Houde interned"),
 text:R("Le maire de Montréal, Camillien Houde, invite publiquement les hommes à ne pas s'inscrire au registre national. Ottawa le fait arrêter et l'interne dans un camp, sans procès, pour quatre ans.","The mayor of Montréal, Camillien Houde, publicly urges men not to sign the national registry. Ottawa has him arrested and interned in a camp, without trial, for four years."),
 choices:[
  {label:R("Ne rien dire : c'est la guerre","Say nothing: there is a war on"),hist:true,fx:s=>{T(s,'roi',1);return R("Houde passera la guerre dans un camp ontarien. À sa libération, en 1944, cinquante mille Montréalais l'accueillent à la gare.","Houde will spend the war in an Ontario camp. On his release in 1944, fifty thousand Montrealers greet him at the station.");}},
  {label:R("Protester contre l'internement","Protest the internment"),fx:s=>{s.patri+=4;s.off.gov-=6;return R("Ottawa rappelle les pouvoirs de guerre. Le gouvernement gagne du respect, pas Houde sa liberté.","Ottawa cites its war powers. The government gains respect; Houde does not gain his freedom.");}}]});

ev4({id:'plebiscite1942',place:'villeMarie',cond:s=>s.year>=1942,must:true,
 title:R("Le plébiscite","The plebiscite"),
 text:R("Mackenzie King demande à tous les Canadiens de le libérer de sa promesse de ne pas imposer la conscription. La Ligue pour la défense du Canada, avec André Laurendeau, mène la campagne du Non : « Pas de conscription ! »","Mackenzie King asks all Canadians to release him from his promise not to impose conscription. The League for the Defence of Canada, with André Laurendeau, leads the No campaign: 'No conscription!'"),
 choices:[
  {label:R("Faire campagne pour le Non","Campaign for No"),hist:true,fx:s=>{s.flags.non42=true;s.patri+=6;T(s,'roi',-4);s.off.gov-=8;return R("Le Québec vote non à 72 % ; le reste du Canada, oui à 80 %. La fracture est nette. Le Bloc populaire naît.","Quebec votes No by 72%; the rest of Canada, Yes by 80%. The rift is stark. The Bloc populaire is born.");}},
  {label:R("Neutralité du gouvernement","Government neutrality"),fx:s=>{s.patri+=2;return R("Le Non l'emporte au Québec, sans le gouvernement. Les nationalistes s'organisent ailleurs.","No wins in Quebec, without the government. The nationalists organize elsewhere.");}},
  {label:R("Appuyer le Oui","Back Yes"),fx:s=>{s.support-=10;T(s,'roi',3);s.off.gov+=8;return R("Le gouvernement se coupe de son électorat. Le Non l'emporte quand même au Québec.","The government cuts itself off from its voters. No wins in Quebec anyway.");}}]});

ev4({id:'obligatoire1943',place:'quebec',cond:s=>s.year>=1943,
 title:R("L'école obligatoire","Compulsory schooling"),
 text:R("Le Québec est la seule province où l'école n'est pas obligatoire. Des milliers d'enfants quittent l'école à dix ans pour la ferme ou l'usine. Godbout propose l'instruction obligatoire jusqu'à quatorze ans, et la gratuité au primaire.","Quebec is the only province where school is not compulsory. Thousands of children leave school at ten for the farm or the factory. Godbout proposes compulsory schooling to age fourteen, and free primary school."),
 choices:[
  {label:R("L'école obligatoire et gratuite jusqu'à 14 ans","Compulsory, free schooling to age 14"),hist:true,fx:s=>{s.flags.ecoleObligatoire=true;s.edu+=5;s.off.eve-=6;s.treasury-=M(s,.1);return R("Les évêques, divisés, finissent par se taire. Les écoles se remplissent ; il faut des institutrices.","The bishops, divided, end up keeping quiet. The schools fill up; teachers are needed.");}},
  {label:R("Laisser les familles décider","Let families decide"),fx:s=>{s.off.eve+=4;return R("Les enfants de cultivateurs continuent de quitter l'école au printemps.","Farmers' children keep leaving school in spring.");}}]});

ev4({id:'hydro1944',place:'villeMarie',cond:s=>s.year>=1944,
 title:R("Hydro-Québec","Hydro-Québec"),
 text:R("Le trust de l'électricité vend le courant le plus cher du continent. Godbout propose d'exproprier la Montreal Light, Heat & Power et de créer une société d'État : la Commission hydroélectrique de Québec.","The power trust sells the most expensive electricity on the continent. Godbout proposes to expropriate Montreal Light, Heat & Power and create a Crown corporation: the Quebec Hydro-Electric Commission."),
 choices:[
  {label:R("Nationaliser la Montreal Light, Heat & Power","Nationalize Montreal Light, Heat & Power"),hist:true,g:{capital:-10,professions:5,ouvriers:3},fx:s=>{s.flags.hydroQc=true;s.foreign-=6;s.off.mar-=15;s.patri+=3;s.treasury-=M(s,.1);s.eco+=1;return R("Le 14 avril 1944, Hydro-Québec naît. Les tarifs baissent ; les ingénieurs canadiens-français ont enfin une grande entreprise à eux.","On 14 April 1944, Hydro-Québec is born. Rates fall; French-Canadian engineers finally have a great company of their own.");}},
  {label:R("Racheter toutes les compagnies d'électricité","Buy out all the power companies"),g:{capital:-16,professions:8,ouvriers:4,habitants:2},fx:s=>{s.flags.hydroQc=true;s.flags.hydroTotal=true;s.foreign-=12;s.off.mar-=30;s.treasury-=M(s,.4);s.eco+=2;s.patri+=5;return R("La province s'endette lourdement, mais l'électricité du Québec appartient désormais aux Québécois, vingt ans avant l'histoire.","The province takes on heavy debt, but Quebec's electricity now belongs to Quebecers, twenty years ahead of history.");}},
  {label:R("Laisser le trust en place","Leave the trust in place"),g:{capital:6,professions:-5,ouvriers:-3},fx:s=>{s.off.mar+=8;s.support-=4;return R("Les Montréalais continuent de payer. Le ressentiment, lui, grandit.","Montrealers keep paying. The resentment grows.");}}]});

ev4({id:'conscription1944',place:'bytown',cond:s=>s.year>=1944,must:true,
 title:R("La conscription de 1944","The 1944 conscription"),
 text:R("Après le débarquement, l'armée manque de fantassins. Mackenzie King cède : seize mille conscrits partiront outre-mer. « La conscription si nécessaire, mais pas nécessairement la conscription » : c'est devenu nécessaire.","After D-Day, the army is short of infantry. Mackenzie King gives in: sixteen thousand conscripts will go overseas. 'Conscription if necessary, but not necessarily conscription': it has become necessary."),
 choices:[
  {label:R("Protester, sans désordre","Protest, without disorder"),hist:true,fx:s=>{s.flags.conscription44=true;s.patri+=5;T(s,'roi',-3);return R("Il y a des manifestations à Montréal et une mutinerie à Terrace, en Colombie-Britannique. La guerre finit avant que la plupart des conscrits n'arrivent au front.","There are demonstrations in Montréal and a mutiny at Terrace, British Columbia. The war ends before most conscripts reach the front.");}},
  {label:R("Soutenir les manifestations","Back the demonstrations"),fx:s=>{s.flags.conscription44=true;s.patri+=8;s.off.gov-=12;T(s,'roi',-5);return R("Les vitrines de la rue Sainte-Catherine volent en éclats. Ottawa ne recule pas.","The shop windows on rue Sainte-Catherine shatter. Ottawa does not back down.");}},
  {label:R("Accepter : la guerre achève","Accept it: the war is ending"),fx:s=>{s.support-=6;T(s,'roi',1);return R("Le gouvernement prêche la patience. Les électeurs s'en souviendront.","The government preaches patience. The voters will remember.");}}]});

/* ===================== 1945–1960 : la Grande Noirceur ? ===================== */
ev4({id:'impots1947',place:'quebec',cond:s=>s.year>=1947,
 title:R("Louer nos impôts à Ottawa ?","Rent our taxes to Ottawa?"),
 text:R("Pendant la guerre, les provinces ont « loué » leurs impôts sur le revenu et les sociétés à Ottawa contre une subvention. Ottawa veut prolonger : il bâtit un État-providence pancanadien. Duplessis voit là la fin de l'autonomie provinciale.","During the war, the provinces 'rented' their income and corporate taxes to Ottawa in exchange for a grant. Ottawa wants to extend it: it is building a pan-Canadian welfare state. Duplessis sees it as the end of provincial autonomy."),
 choices:[
  {label:R("Refuser : on ne vend pas son droit d'aînesse","Refuse: one does not sell one's birthright"),hist:true,fx:s=>{s.flags.refusLocation=true;s.autonomy+=4;s.treasury-=M(s,.1);s.off.gov-=10;s.patri+=2;return R("Le Québec est seul à refuser. Il perd des millions, mais garde le principe.","Quebec alone refuses. It loses millions, but keeps the principle.");}},
  {label:R("Signer l'entente fiscale","Sign the tax agreement"),fx:s=>{s.flags.locationImpots=true;s.treasury+=M(s,.15);s.autonomy-=5;s.off.gov+=10;return R("L'argent d'Ottawa arrive, avec ses conditions. Les programmes nationaux suivent.","Ottawa's money arrives, with its conditions. National programs follow.");}}]});

ev4({id:'fleurdelise1948',place:'quebec',cond:s=>s.year>=1948,
 title:R("Le fleurdelisé","The Fleurdelisé"),
 text:R("Depuis des années, des nationalistes réclament un drapeau pour la province : croix blanche sur fond bleu, quatre fleurs de lys. L'Union Jack flotte toujours sur le Parlement.","For years, nationalists have demanded a flag for the province: a white cross on a blue field, four fleurs-de-lis. The Union Jack still flies over the Parliament."),
 choices:[
  {label:R("Hisser le fleurdelisé sur le Parlement","Raise the Fleurdelisé over the Parliament"),hist:true,fx:s=>{s.flags.fleurdelise=true;s.patri+=4;return R("Le 21 janvier 1948, à trois heures de l'après-midi, le fleurdelisé monte au mât de la tour centrale. L'Union Jack descend.","On 21 January 1948, at three in the afternoon, the Fleurdelisé rises on the central tower's mast. The Union Jack comes down.");}},
  {label:R("Garder l'Union Jack","Keep the Union Jack"),fx:s=>{T(s,'roi',3);s.patri-=2;return R("Le débat reviendra, chaque année, à la Saint-Jean.","The debate will come back every year, on Saint-Jean-Baptiste Day.");}}]});

ev4({id:'refusglobal1948',place:'villeMarie',cond:s=>s.year>=1948,
 title:R("Refus global","Refus global"),
 text:R("Le peintre Paul-Émile Borduas et quinze jeunes artistes publient un manifeste : « Au diable le goupillon et la tuque ! » Ils refusent la peur, la soumission, l'Église qui tient tout. Borduas enseigne à l'École du meuble, une école d'État.","Painter Paul-Émile Borduas and fifteen young artists publish a manifesto: 'To hell with the holy-water sprinkler and the tuque!' They refuse fear, submission, the Church that holds everything. Borduas teaches at the École du meuble, a state school."),
 choices:[
  {label:R("Congédier Borduas","Fire Borduas"),hist:true,fx:s=>{T(s,'ouverture',-1);s.off.eve+=4;return R("Borduas perd son poste et finira sa vie à Paris. Le manifeste, tiré à 400 exemplaires, deviendra un texte fondateur.","Borduas loses his post and will end his life in Paris. The manifesto, printed in 400 copies, will become a founding text.");}},
  {label:R("Le défendre : la liberté de l'artiste","Defend him: the artist's freedom"),fx:s=>{s.flags.refusGlobal=true;T(s,'ouverture',4);s.off.eve-=6;s.support-=2;return R("Le gouvernement refuse de sévir. Les automatistes exposent ; la jeunesse lit.","The government refuses to crack down. The Automatistes exhibit; the young read.");}}]});

ev4({id:'amiante1949',place:'thetford',cond:s=>s.year>=1949,must:true,
 title:R("La grève de l'amiante","The asbestos strike"),
 text:R("À Asbestos et à Thetford Mines, cinq mille mineurs, membres des syndicats catholiques, débraient sans attendre l'arbitrage : la poussière d'amiante les tue, les salaires sont bas, la compagnie est américaine. Duplessis déclare la grève illégale.","At Asbestos and Thetford Mines, five thousand miners, members of the Catholic unions, walk out without waiting for arbitration: asbestos dust is killing them, wages are low, the company is American. Duplessis declares the strike illegal."),
 choices:[
  {label:R("La police provinciale à Asbestos","The provincial police to Asbestos"),hist:true,g:{ouvriers:-12,capital:6,professions:-3},fx:s=>{polRealign(s,'ouvriers',govSide4(s),-6);polRealign(s,'professions',govSide4(s),-3);s.flags.amiante=true;s.off.mar+=8;s.off.eve-=4;s.support-=2;return R("Matraques, arrestations, briseurs de grève. Mgr Charbonneau fait quêter pour les grévistes dans les églises. Un jeune avocat, Pierre Elliott Trudeau, et un journaliste, Gérard Pelletier, y voient le début d'une révolution.","Batons, arrests, strike-breakers. Archbishop Charbonneau has collections taken for the strikers in the churches. A young lawyer, Pierre Elliott Trudeau, and a journalist, Gérard Pelletier, see it as the start of a revolution.");}},
  {label:R("Imposer une convention négociée","Impose a negotiated agreement"),g:{ouvriers:10,capital:-8},fx:s=>{s.flags.amiante=true;s.flags.reconnaissance=true;s.off.mar-=10;s.off.eve+=4;s.support+=2;return R("La Johns-Manville cède sur les salaires et la poussière. Les syndicats sortent grandis.","Johns-Manville gives way on wages and dust. The unions come out stronger.");}},
  {label:R("Rester neutre","Stay neutral"),fx:s=>{s.flags.amiante=true;return R("La grève dure quatre mois. Les mineurs rentrent avec peu, mais le Québec ouvrier a montré les dents.","The strike lasts four months. The miners go back with little, but working-class Quebec has bared its teeth.");}}]});

ev4({id:'tremblay1953',place:'quebec',cond:s=>s.year>=1953,
 title:R("La commission Tremblay","The Tremblay Commission"),
 text:R("Ottawa offre de l'argent aux universités, à la suite du rapport Massey. Mais l'éducation est de compétence provinciale. Faut-il refuser l'argent et étudier à fond la place du Québec dans la fédération ?","Ottawa offers money to universities, following the Massey report. But education is a provincial jurisdiction. Should the money be refused and Quebec's place in the federation studied in depth?"),
 choices:[
  {label:R("Refuser l'argent ; créer la commission Tremblay","Refuse the money; create the Tremblay Commission"),hist:true,fx:s=>{s.flags.tremblay=true;s.autonomy+=4;s.edu-=1;s.off.gov-=8;return R("Le rapport Tremblay (1956) fera de l'autonomie une doctrine : le Québec n'est pas une province comme les autres.","The Tremblay report (1956) will make autonomy a doctrine: Quebec is not a province like the others.");}},
  {label:R("Accepter les subventions","Accept the grants"),fx:s=>{s.edu+=3;s.autonomy-=3;s.off.gov+=6;return R("Les universités respirent. Ottawa met un pied dans l'éducation.","The universities breathe. Ottawa gets a foot into education.");}}]});

ev4({id:'impot1954',place:'quebec',cond:s=>s.year>=1954,
 title:R("L'impôt provincial sur le revenu","The provincial income tax"),
 text:R("Pour financer ses écoles et ses routes sans dépendre d'Ottawa, la province pourrait lever son propre impôt sur le revenu, égal à 15 % de l'impôt fédéral. Les contribuables paieraient deux fois, à moins qu'Ottawa ne cède.","To fund its schools and roads without depending on Ottawa, the province could levy its own income tax, equal to 15% of the federal tax. Taxpayers would pay twice, unless Ottawa gives way."),
 choices:[
  {label:R("Créer l'impôt provincial","Create the provincial tax"),hist:true,fx:s=>{s.flags.impotProv=true;s.autonomy+=6;s.support-=2;s.off.gov-=4;return R("Après un bras de fer, St-Laurent accepte une déduction de 10 %. La province a enfin ses propres revenus.","After a tug of war, St-Laurent accepts a 10% deduction. The province finally has its own revenue.");}},
  {label:R("Rester dans l'entente fédérale","Stay within the federal arrangement"),fx:s=>{s.off.gov+=6;s.autonomy-=2;return R("Ottawa continue de verser, et de décider.","Ottawa keeps paying, and deciding.");}}]});

ev4({id:'ungava1950',place:'septIles',cond:s=>s.year>=1950,
 title:R("Le fer de l'Ungava","Ungava iron"),
 text:R("Au cœur du Nouveau-Québec, des géologues ont trouvé l'un des plus grands gisements de fer du monde. L'Iron Ore Company, américaine, propose un chemin de fer de 500 km depuis Sept-Îles, une ville minière… et une redevance d'un cent la tonne.","In the heart of New Quebec, geologists have found one of the world's largest iron deposits. The American Iron Ore Company proposes a 500-km railway from Sept-Îles, a mining town… and a royalty of one cent a ton."),
 choices:[
  {label:R("Concéder le fer (un cent la tonne)","Concede the iron (one cent a ton)"),hist:true,fx:s=>{s.flags.ungava=true;s.eco+=4;s.foreign+=5;s.off.mar+=15;s.places.septIles=true;return R("Schefferville sort du bois en 1954. Le minerai part pour les aciéries de Pittsburgh ; René Lévesque parlera de « vente au rabais ».","Schefferville rises from the bush in 1954. The ore leaves for Pittsburgh's steel mills; René Lévesque will call it a 'fire sale'.");}},
  {label:R("Exiger des redevances fortes et une aciérie au Québec","Demand strong royalties and a steel mill in Quebec"),fx:s=>{s.flags.ungava=true;s.eco+=2;s.off.mar-=10;s.treasury+=M(s,.05);s.places.septIles=true;return R("La compagnie hésite, puis accepte une partie. Une aciérie québécoise est promise ; elle viendra plus tard.","The company hesitates, then accepts part of it. A Quebec steel mill is promised; it will come later.");}},
  {label:R("Garder le fer pour plus tard","Keep the iron for later"),fx:s=>{s.off.mar-=15;s.eco-=1;return R("Le fer attendra un Québec capable de l'exploiter lui-même.","The iron will wait for a Quebec able to mine it itself.");}}]});

ev4({id:'television1952',place:'villeMarie',cond:s=>s.year>=1952,
 title:R("La télévision","Television"),
 text:R("Radio-Canada inaugure à Montréal la première station de télévision française au monde hors d'Europe. Bientôt, chaque famille regardera La Famille Plouffe, et René Lévesque expliquera le monde à Point de mire.","Radio-Canada opens in Montréal the world's first French-language television station outside Europe. Soon every family will watch La Famille Plouffe, and René Lévesque will explain the world on Point de mire."),
 choices:[
  {label:R("Le petit écran entre dans les foyers","The small screen enters homes"),hist:true,fx:s=>{s.flags.television=true;T(s,'ouverture',3);T(s,'ferveur',-1);return R("Le chapelet en famille du cardinal Léger a désormais un concurrent : la télévision.","Cardinal Léger's family rosary now has a competitor: television.");}}]});

ev4({id:'richard1955',place:'villeMarie',cond:s=>s.year>=1955,
 title:R("L'émeute du Forum","The Forum riot"),
 text:R("Le président de la Ligue nationale, Clarence Campbell, suspend Maurice Richard, idole des Canadiens, pour le reste de la saison. Le 17 mars, Campbell se présente au Forum. Une bombe lacrymogène éclate ; la foule envahit la rue Sainte-Catherine.","The president of the National Hockey League, Clarence Campbell, suspends Maurice Richard, idol of the Canadiens, for the rest of the season. On 17 March, Campbell shows up at the Forum. A tear-gas bomb goes off; the crowd floods rue Sainte-Catherine."),
 choices:[
  {label:R("Appeler au calme ; Richard parle à la radio","Call for calm; Richard speaks on the radio"),hist:true,fx:s=>{s.flags.richard=true;s.patri+=3;return R("Le lendemain, Richard demande aux partisans de rentrer chez eux. Certains historiens y verront le premier frisson de la Révolution tranquille.","The next day Richard asks the fans to go home. Some historians will see it as the first tremor of the Quiet Revolution.");}},
  {label:R("Dénoncer l'injustice faite au « Rocket »","Denounce the injustice done to the 'Rocket'"),fx:s=>{s.flags.richard=true;s.patri+=5;return R("La suspension devient une affaire nationale. La LNH ne bouge pas.","The suspension becomes a national affair. The NHL does not budge.");}}]});

ev4({id:'murdochville1957',place:'gaspe',cond:s=>s.year>=1957,
 title:R("Murdochville","Murdochville"),
 text:R("Dans une ville de compagnie de la Gaspésie, les mineurs de la Gaspé Copper (Noranda) font la grève pour faire reconnaître leur syndicat, les Métallos. La compagnie embauche des briseurs de grève ; la police provinciale les protège.","In a Gaspé company town, the Gaspé Copper (Noranda) miners strike to have their union, the Steelworkers, recognized. The company hires strike-breakers; the provincial police protect them."),
 choices:[
  {label:R("Laisser la compagnie gagner","Let the company win"),hist:true,g:{ouvriers:-10,capital:6},fx:s=>{polRealign(s,'ouvriers',govSide4(s),-4);s.off.mar+=6;s.support-=1;return R("Après sept mois, la grève est brisée. Les syndicats du Québec, toutes tendances confondues, marchent ensemble pour la première fois.","After seven months the strike is broken. Quebec's unions, of every stripe, march together for the first time.");}},
  {label:R("Imposer la reconnaissance syndicale","Impose union recognition"),g:{ouvriers:10,capital:-10},fx:s=>{s.flags.reconnaissance=true;s.off.mar-=10;s.support+=2;return R("Une loi oblige l'employeur à reconnaître un syndicat majoritaire. Les compagnies minières protestent à New York.","A law obliges employers to recognize a majority union. The mining companies protest in New York.");}}]});

ev4({id:'duplessis1959',place:'septIles',cond:s=>s.year>=1959,must:true,
 title:R("« Désormais… »","'From now on…'"),
 text:R("Le 7 septembre 1959, Maurice Duplessis meurt à Schefferville, au milieu des mines de fer. Son successeur, Paul Sauvé, commence chacune de ses déclarations par le même mot : « Désormais… »","On 7 September 1959, Maurice Duplessis dies at Schefferville, among the iron mines. His successor, Paul Sauvé, begins each of his statements with the same word: 'From now on…'"),
 choices:[
  {label:R("« Désormais » : les choses vont changer","'From now on': things will change"),hist:true,fx:s=>{T(s,'ouverture',2);s.support+=4;s.edu+=1;return R("Sauvé dégèle les subventions aux universités, augmente les salaires des fonctionnaires… et meurt cent jours plus tard. Le changement, lui, est lancé.","Sauvé unfreezes university grants, raises civil servants' pay… and dies a hundred days later. Change, however, has been set in motion.");}},
  {label:R("Continuer comme avant","Carry on as before"),fx:s=>{s.support-=4;T(s,'ouverture',-1);return R("L'Union nationale ferme les rangs. La jeunesse, elle, regarde ailleurs.","The Union nationale closes ranks. The young look elsewhere.");}}]});

Object.assign(DIVERGE,{
 instruction1875:R("Dans l'histoire, le ministère de l'Instruction publique est aboli en 1875 et l'école confiée aux évêques jusqu'en 1964. Ici, l'État garde la main.","In history, the ministry of public instruction was abolished in 1875 and schools were entrusted to the bishops until 1964. Here, the state keeps its hand in."),
 manitoba1890:R("Dans l'histoire, le Manitoba abolit les écoles catholiques et le français officiel en 1890. Ici, les garanties de 1870 tiennent.","In history, Manitoba abolished Catholic schools and official French in 1890. Here, the 1870 guarantees hold."),
 suffrage1940:R("Dans l'histoire, les Québécoises votent en 1940. Ici, l'Église a obtenu un sursis.","In history, Quebec women got the vote in 1940. Here, the Church has won a reprieve.")});
EVENTS.push(...P4E);for(const e of P4E)EV[e.id]=e;
})();

/* certaines affaires n'existent que si tel camp gouverne */
(()=>{const need={tanneries1874:'bleu',instruction1875:'bleu',letellier1878:'bleu',baiechaleurs1891:'rouge',marchand1897:'rouge',aln1935:'rouge',cadenas1937:'bleu',guerre1939:'bleu',duplessis1959:'bleu'};
  /* et seulement à leur époque : un scandale de 1891 ne frappe pas un gouvernement de 1898 */
  const until={tanneries1874:1876,instruction1875:1877,letellier1878:1879,baiechaleurs1891:1892,marchand1897:1900,aln1935:1936,cadenas1937:1940,guerre1939:1940,duplessis1959:1960};
  for(const id in need){const e=EV[id];if(!e)continue;const c=e.cond;e.cond=s=>govSide4(s)===need[id]&&s.year<=(until[id]||9999)&&c(s);}})();
