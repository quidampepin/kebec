/* Kebec — Période III : événements supplémentaires (réels et plausibles), surtout pour la période parlementaire 1792–1840
   et pour faire réagir le pays aux choix du joueur. */
(()=>{
const E3=[];
const hist=e=>{e.period=3;E3.push(e);};
const cq=e=>{e.period=3;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;E3.push(e);};
const T=traitAdd,ra=relAdd;

/* ---------- les années 1760–1790 ---------- */
cq({id:'cq3_highlanders',place:'kamouraska',cond:s=>s.year>=1763&&s.year<1785&&s.traits.ouverture>=25,w:s=>1.5,
 because:s=>R("Des soldats écossais démobilisés restent au pays, et les paroisses sont accueillantes.","Demobilized Scottish soldiers stay in the country, and the parishes are welcoming."),
 title:R("Les Highlanders de Murray Bay","The Murray Bay Highlanders"),
 text:R("Des soldats du régiment de Fraser ont reçu des seigneuries à La Malbaie. Ils épousent des Canadiennes ; leurs enfants s'appellent Fraser, Nairne ou Warren, et ne parlent que français.","Soldiers of Fraser's regiment have been granted seigneuries at La Malbaie. They marry Canadien women; their children are named Fraser, Nairne or Warren, and speak only French."),
 choices:[
  {label:R("Les accueillir dans la paroisse","Welcome them into the parish"),hist:true,fx:s=>{s.ang-=400;T(s,'ouverture',3);T(s,'entraide',1);return R("En une génération, les Highlanders sont devenus Canadiens. Le curé baptise des Fraser catholiques.","Within a generation the Highlanders have become Canadiens. The priest baptizes Catholic Frasers.");}},
  {label:R("Garder ses distances","Keep one's distance"),fx:s=>{T(s,'ouverture',-2);return R("Les Écossais restent entre eux, presbytériens et anglophones.","The Scots keep to themselves, Presbyterian and English-speaking.");}}]});

hist({id:'seigneurs1765',place:'quebec',cond:s=>s.year>=1765&&s.fired.proclamation1763,
 title:R("Les jurés catholiques","Catholic jurors"),
 text:R("Les tribunaux anglais refusent les catholiques comme jurés et avocats. Les marchands anglais, une poignée, jugent seuls les affaires de 70 000 Canadiens. Murray hésite à leur donner tort.","The English courts refuse Catholics as jurors and lawyers. A handful of English merchants alone judge the affairs of 70,000 Canadiens. Murray hesitates to rule against them."),
 choices:[
  {label:R("Pétitionner pour des jurés canadiens","Petition for Canadien jurors"),hist:true,fx:s=>{s.patri+=3;s.autonomy+=3;s.off.mar-=8;return R("Londres autorise les catholiques comme jurés en 1766. Les marchands font arrêter Murray par une plainte au roi.","London allows Catholics as jurors in 1766. The merchants get Murray recalled by complaining to the king.");}},
  {label:R("Régler les affaires devant les curés et les notaires","Settle matters before priests and notaries"),fx:s=>{T(s,'entraide',3);s.church+=3;return R("On évite les tribunaux anglais : arbitrages de curés, actes de notaires, la coutume de Paris vit en marge.","People avoid the English courts: priestly arbitration, notarial deeds, the Custom of Paris lives on the margins.");}}]});

cq({id:'cq3_variole1775',place:'quebec',cond:s=>s.year>=1775&&s.year<1778&&s.fired.invasion1775,w:s=>3,
 because:s=>R("L'armée américaine a apporté la petite vérole.","The American army has brought smallpox."),
 title:R("La variole dans les deux camps","Smallpox in both camps"),
 text:R("La petite vérole décime l'armée américaine devant Québec, puis gagne les paroisses. Un chirurgien propose d'inoculer les enfants, comme on le fait à Boston.","Smallpox decimates the American army before Québec, then spreads to the parishes. A surgeon proposes inoculating the children, as is done in Boston."),
 choices:[
  {label:R("Encourager l'inoculation","Encourage inoculation"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.002;s.edu+=1;T(s,'ouverture',2);s.off.eve-=6;return R("Les curés se méfient, mais l'épidémie épargne les paroisses inoculées.","The priests are wary, but the epidemic spares the inoculated parishes.");}},
  {label:R("Prier et attendre","Pray and wait"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.008;T(s,'ferveur',1);return R("Les cimetières se remplissent jusqu'au printemps.","The graveyards fill until spring.");}}]});

/* ---------- la période parlementaire, 1792–1830 ---------- */
hist({id:'routes1796',place:'troisRivieres',cond:s=>s.year>=1796&&s.flags.assemblee,
 title:R("L'émeute des chemins","The road riots"),
 text:R("Une nouvelle loi oblige les habitants à entretenir les chemins par corvées, sous l'autorité de grands voyers nommés. On murmure aussi qu'on veut les enrôler pour la guerre contre la France. Des paroisses refusent d'obéir.","A new law obliges the habitants to maintain roads by corvée, under appointed road commissioners. There are also rumours they will be drafted for the war against France. Parishes refuse to obey."),
 choices:[
  {label:R("Calmer les paroisses","Calm the parishes"),hist:true,fx:s=>{s.compagnie+=3;s.patri-=2;return R("Quelques meneurs sont arrêtés. Les chemins se font, lentement.","A few ringleaders are arrested. The roads get built, slowly.");}},
  {label:R("Soutenir les récalcitrants","Back the resisters"),fx:s=>{s.patri+=5;s.compagnie-=6;T(s,'roi',-3);return R("La loi devient lettre morte dans plusieurs comtés. Le gouverneur parle de « sédition ».","The law becomes a dead letter in several counties. The governor speaks of 'sedition'.");}}]});

hist({id:'jesuites1800',place:'quebec',cond:s=>s.year>=1800,
 title:R("Les biens des jésuites","The Jesuit estates"),
 text:R("Le dernier jésuite du Canada, le père Casot, meurt. Leurs immenses seigneuries passent à la Couronne. Elles avaient été données pour l'instruction des Canadiens.","The last Jesuit in Canada, Father Casot, dies. Their vast seigneuries pass to the Crown. They had been granted for the education of the Canadiens."),
 choices:[
  {label:R("Réclamer ces biens pour les écoles","Claim the estates for schools"),hist:true,fx:s=>{s.patri+=3;s.flags.biensJesuites=true;return R("La question empoisonnera l'Assemblée pendant trente ans. L'argent finira par aller à l'instruction publique.","The question will poison the Assembly for thirty years. The money will end up going to public education.");}},
  {label:R("Les laisser au gouvernement","Leave them to the government"),fx:s=>{s.compagnie+=3;s.edu-=1;return R("Les revenus servent à payer les fonctionnaires du Château.","The revenues pay the officials of the Château.");}}]});

hist({id:'hart1808',place:'troisRivieres',cond:s=>s.year>=1808&&s.flags.assemblee,
 title:R("Le député Ezekiel Hart","Ezekiel Hart, member of the Assembly"),
 text:R("Trois-Rivières élit Ezekiel Hart, marchand juif. Il prête serment sur la Bible hébraïque. Le Parti canadien, qui y voit un allié du gouverneur, veut l'expulser.","Trois-Rivières elects Ezekiel Hart, a Jewish merchant. He takes his oath on the Hebrew Bible. The Parti canadien, which sees him as the governor's ally, wants him expelled."),
 choices:[
  {label:R("L'expulser","Expel him"),hist:true,fx:s=>{T(s,'ouverture',-3);s.patri+=2;return R("Il est expulsé deux fois. En 1832, l'Assemblée du Bas-Canada sera la première de l'Empire à émanciper les Juifs.","He is expelled twice. In 1832, the Lower Canada Assembly will be the first in the Empire to emancipate Jews.");}},
  {label:R("Le laisser siéger : l'électeur a parlé","Let him sit: the voters have spoken"),fx:s=>{T(s,'ouverture',5);s.autonomy+=2;s.flags.tolerance3=true;return R("Hart siège. Le Bas-Canada devient, avant Londres, un lieu où l'on peut être juif et député.","Hart sits. Lower Canada becomes, before London, a place where one can be Jewish and a legislator.");}}]});

hist({id:'banque1817',place:'villeMarie',cond:s=>s.year>=1817,
 title:R("La Banque de Montréal","The Bank of Montreal"),
 text:R("Des marchands de Montréal fondent la première banque du pays. Les Canadiens y ont peu de place, et les seigneurs se méfient du papier-monnaie depuis la monnaie de carte.","Montréal merchants found the country's first bank. Canadiens have little place in it, and the seigneurs have distrusted paper money since the card money."),
 choices:[
  {label:R("Encourager les Canadiens à y prendre part","Encourage Canadiens to take part"),fx:s=>{s.eco+=4;T(s,'ouverture',2);s.off.mar+=6;return R("Quelques marchands canadiens entrent au conseil. Le crédit circule mieux.","A few Canadien merchants join the board. Credit flows more easily.");}},
  {label:R("Rester à l'écart","Stay out"),hist:true,fx:s=>{s.eco+=1;return R("La banque prospère sans les Canadiens. Il faudra attendre 1835 pour la Banque du Peuple.","The bank prospers without the Canadiens. The Banque du Peuple will have to wait until 1835.");}}]});

hist({id:'lachine1821',place:'villeMarie',cond:s=>s.year>=1821,
 title:R("Le canal de Lachine","The Lachine Canal"),
 text:R("Pour concurrencer le canal Érié, Montréal veut contourner les rapides de Lachine. L'Assemblée doit voter une partie des fonds.","To compete with the Erie Canal, Montréal wants to bypass the Lachine Rapids. The Assembly must vote part of the funds."),
 choices:[
  {label:R("Voter les fonds","Vote the funds"),hist:true,fx:s=>{s.treasury-=1500;s.eco+=5;s.off.mar+=8;return R("Le canal ouvre en 1825. Montréal devient le port de l'intérieur ; les usines s'installent sur ses rives.","The canal opens in 1825. Montréal becomes the port of the interior; factories settle on its banks.");}},
  {label:R("Refuser : l'argent des Canadiens pour les Canadiens","Refuse: Canadien money for Canadiens"),fx:s=>{s.patri+=3;s.off.mar-=12;s.eco-=2;return R("Les marchands dénoncent une Assemblée « de paysans ». Le projet avance quand même, plus lentement.","The merchants denounce an Assembly 'of peasants'. The project goes ahead anyway, more slowly.");}}]});

hist({id:'mcgill1821',place:'villeMarie',cond:s=>s.year>=1821,
 title:R("McGill et Laval","McGill and Laval"),
 text:R("Le legs de James McGill fonde une université anglaise et protestante à Montréal. Les Canadiens n'ont que leurs collèges classiques. Faut-il une université catholique et française ?","James McGill's bequest founds an English Protestant university in Montréal. The Canadiens have only their classical colleges. Do they need a French Catholic university?"),
 choices:[
  {label:R("Réclamer une université canadienne","Demand a Canadien university"),fx:s=>{s.edu+=3;s.treasury-=1500;s.off.eve+=4;s.flags.universite3=true;return R("Le Séminaire de Québec prépare un projet. L'université Laval ouvrira en 1852, plus tôt si l'on insiste.","The Québec Seminary prepares a plan. Laval University will open in 1852, sooner if pressed.");}},
  {label:R("Les collèges suffisent","The colleges are enough"),hist:true,fx:s=>{s.off.eve+=2;return R("Les fils de notables continuent d'apprendre le latin au collège, le droit chez un avocat.","Notables' sons keep learning Latin at college and law in an attorney's office.");}}]});

hist({id:'ssjb1834',place:'villeMarie',cond:s=>s.year>=1834&&s.patri>=30,
 title:R("Le banquet de la Saint-Jean","The Saint-Jean banquet"),
 text:R("Le journaliste Ludger Duvernay réunit soixante patriotes dans un jardin de Montréal le 24 juin. On porte des toasts au peuple, à la liberté, au Canada. Il propose d'en faire une fête nationale.","Journalist Ludger Duvernay gathers sixty patriotes in a Montréal garden on 24 June. Toasts are raised to the people, to liberty, to Canada. He proposes making it a national holiday."),
 choices:[
  {label:R("Fonder la Société Saint-Jean-Baptiste","Found the Saint-Jean-Baptiste Society"),hist:true,fx:s=>{s.patri+=5;T(s,'entraide',2);s.flags.ssjb=true;return R("La feuille d'érable et le castor deviennent des emblèmes. La fête reviendra chaque année.","The maple leaf and the beaver become emblems. The celebration will return every year.");}},
  {label:R("Une fête religieuse suffit","A religious feast is enough"),fx:s=>{s.off.eve+=4;T(s,'ferveur',1);return R("La Saint-Jean reste une fête de paroisse.","Saint-Jean remains a parish feast.");}}]});

hist({id:'femmes1834',place:'quebec',cond:s=>s.year>=1834&&s.flags.assemblee,
 title:R("Le vote des femmes","Women's vote"),
 text:R("Depuis 1791, les femmes propriétaires votent, surtout les veuves. Après des élections violentes, Papineau lui-même propose de leur retirer ce droit : « il est ridicule, odieux même, de voir traîner aux hustings des femmes ».","Since 1791, women who own property have voted, especially widows. After violent elections, Papineau himself proposes to take this right away: 'it is ridiculous, odious even, to see women dragged to the hustings'."),
 choices:[
  {label:R("Leur retirer le vote","Take away their vote"),hist:true,fx:s=>{T(s,'ouverture',-3);return R("La loi de 1834 est désavouée par Londres pour d'autres raisons ; celle de 1849 rendra l'exclusion définitive. Les Québécoises ne revoteront qu'en 1940.","The 1834 law is disallowed by London for other reasons; the 1849 law will make exclusion final. Québec women will not vote again until 1940.");}},
  {label:R("Défendre le droit des électrices","Defend the women voters' right"),fx:s=>{T(s,'ouverture',6);s.patri-=2;s.flags.femmesVote=true;return R("Les veuves et les marchandes continuent de voter. Le Bas-Canada sera, longtemps, une exception dans l'Empire.","Widows and women merchants keep voting. Lower Canada will long be an exception in the Empire.");}}]});

hist({id:'vincent1825',place:'lorette',cond:s=>s.year>=1824,
 title:R("Les chefs wendats à Londres","The Wendat chiefs in London"),
 text:R("Le grand chef Nicolas Vincent Tsawenhohi et trois chefs de Wendake partent pour Londres : ils réclament la seigneurie de Sillery, donnée aux convertis en 1651 et que les jésuites ont gardée. Ils demandent l'appui de l'Assemblée.","Grand Chief Nicolas Vincent Tsawenhohi and three Wendake chiefs leave for London: they claim the seigneury of Sillery, granted to the converts in 1651 and kept by the Jesuits. They ask for the Assembly's support."),
 choices:[
  {label:R("Les appuyer","Support them"),fx:s=>{ra(s,'wen',12);T(s,'alliance',4);s.off.mar-=4;return R("Le roi George IV les reçoit. Leur demande traîne, mais Wendake sait qu'il a des alliés à Québec.","King George IV receives them. Their claim drags on, but Wendake knows it has allies in Québec.");}},
  {label:R("Ne pas s'en mêler","Stay out of it"),hist:true,fx:s=>{ra(s,'wen',-4);return R("Le roi les reçoit avec honneur, et ne leur rend rien.","The king receives them with honour, and returns nothing.");}}]});

/* ---------- conséquences 1792–1867 ---------- */
cq({id:'cq3_duvernay',place:'villeMarie',cond:s=>s.year>=1810&&s.year<1838&&(s.orient.cour==='patriote'||(s.budget.presse||0)>=30)&&s.patri>=35,w:s=>3,
 because:s=>R("Vous financez une presse de combat, et vous avez choisi la confrontation.","You are funding a fighting press, and you have chosen confrontation."),
 title:R("Un rédacteur en prison","An editor in jail"),
 text:R("Le Conseil législatif fait emprisonner deux rédacteurs patriotes pour « libelle » contre ses membres. Une foule les attend devant la prison.","The Legislative Council has two patriote editors jailed for 'libel' against its members. A crowd awaits them outside the prison."),
 choices:[
  {label:R("Les porter en triomphe","Carry them in triumph"),fx:s=>{s.patri+=6;s.compagnie-=6;return R("À leur sortie, on les promène en voiture découverte dans tout Montréal. Le Conseil est ridiculisé.","On their release they are paraded in an open carriage through Montréal. The Council is ridiculed.");}},
  {label:R("Modérer le ton des journaux","Tone down the newspapers"),fx:s=>{s.patri-=3;s.compagnie+=3;return R("Les journaux patriotes deviennent plus prudents, pour un temps.","The patriote papers grow more cautious, for a while.");}}]});

cq({id:'cq3_etoffe',place:'stDenis',cond:s=>s.year>=1834&&s.year<1839&&s.patri>=45&&s.traits.entraide>=55,w:s=>3,
 because:s=>R("Le mouvement patriote est fort, et les paroisses ont l'habitude de s'entraider.","The patriote movement is strong, and the parishes are used to helping each other."),
 title:R("L'étoffe du pays","Homespun"),
 text:R("Des femmes patriotes de Saint-Denis et de Saint-Charles organisent le boycott des tissus anglais : on file, on tisse, on porte l'étoffe du pays. Elles réclament aussi leur place dans les assemblées.","Patriote women of Saint-Denis and Saint-Charles organize the boycott of English cloth: they spin, weave, and wear homespun. They also ask for their place in the meetings."),
 choices:[
  {label:R("Les faire parler aux assemblées","Have them speak at the meetings"),fx:s=>{s.patri+=5;T(s,'ouverture',3);T(s,'entraide',2);return R("Les marchands anglais de Montréal voient leurs ventes chuter. Des femmes prennent la parole à Saint-Denis.","Montréal's English merchants see their sales drop. Women speak at Saint-Denis.");}},
  {label:R("Le boycott, mais derrière les hommes","The boycott, but behind the men"),fx:s=>{s.patri+=3;s.eco-=1;return R("Les métiers à tisser tournent dans toutes les cuisines.","Looms run in every kitchen.");}}]});

cq({id:'cq3_exiles',place:'quebec',cond:s=>s.year>=1844&&s.flags.pendus,w:s=>3,
 because:s=>R("Des patriotes ont été déportés en Australie après 1838.","Patriotes were deported to Australia after 1838."),
 title:R("Le retour des exilés","The exiles return"),
 text:R("Les patriotes déportés en Australie ont été graciés. Ils reviennent, maigres, avec des récits de bagne. Il faut payer leur voyage de Sydney à Québec.","The patriotes deported to Australia have been pardoned. They return, gaunt, with tales of the penal colony. Someone must pay their passage from Sydney to Québec."),
 choices:[
  {label:R("Une souscription nationale","A national subscription"),fx:s=>{s.treasury-=800;s.patri+=4;T(s,'entraide',3);return R("Les paroisses donnent. Les exilés sont accueillis en héros.","The parishes give. The exiles are welcomed as heroes.");}},
  {label:R("Les laisser se débrouiller","Let them manage"),fx:s=>{T(s,'entraide',-2);return R("Quelques-uns ne reviendront jamais.","Some will never come back.");}}]});

cq({id:'cq3_rouges',place:'villeMarie',cond:s=>s.year>=1847&&s.traits.ouverture>=40,w:s=>2+(s.traits.ouverture-38)/6,
 because:s=>R("Le pays s'est ouvert aux idées libérales.","The country has opened up to liberal ideas."),
 title:R("Les Rouges","The Rouges"),
 text:R("Papineau, rentré d'exil, inspire de jeunes libéraux : suffrage universel, séparation de l'Église et de l'État, république. Le journal L'Avenir fait scandale.","Papineau, back from exile, inspires young liberals: universal suffrage, separation of Church and State, a republic. The newspaper L'Avenir causes a scandal."),
 choices:[
  {label:R("Leur faire une place","Make room for them"),fx:s=>{T(s,'ouverture',3);s.off.eve-=10;s.patri+=3;s.flags.rougesForts=true;return R("Les Rouges gagnent quelques comtés. L'Église les dénonce en chaire.","The Rouges win a few counties. The Church denounces them from the pulpit.");}},
  {label:R("Les tenir à l'écart, avec les Bleus","Keep them out, with the Bleus"),fx:s=>{s.off.eve+=6;T(s,'ferveur',2);return R("Cartier et les Bleus tiennent le pays, avec la bénédiction des évêques.","Cartier and the Bleus hold the country, with the bishops' blessing.");}}]});

cq({id:'cq3_cantons2',place:'sherbrooke',cond:s=>s.year>=1845&&s.flags.cantonsAnglais&&s.press>.08,w:s=>2+s.press*15,
 because:s=>R("Les vieilles paroisses débordent, et les cantons ont des terres libres.","The old parishes are overflowing, and the townships have free land."),
 title:R("Les Canadiens montent dans les cantons","Canadiens move into the townships"),
 text:R("Des familles canadiennes s'installent dans les cantons de l'Est, achètent les fermes des Yankees qui partent vers l'Ouest. Le curé suit ; une paroisse naît à Sherbrooke.","Canadien families settle in the Eastern Townships, buying the farms of Yankees heading west. The priest follows; a parish is born in Sherbrooke."),
 choices:[
  {label:R("Les aider : chemins, crédit, paroisses","Help them: roads, credit, parishes"),hist:true,fx:s=>{s.flags.cantonsCanadiens=true;s.land+=7000;s.treasury-=1200;T(s,'aventure',2);return R("En une génération, les cantons deviendront majoritairement francophones.","Within a generation the townships will become mostly French-speaking.");}},
  {label:R("Laisser faire le marché","Let the market decide"),fx:s=>{s.land+=2500;return R("Le mouvement est plus lent. Beaucoup préfèrent les filatures des États.","The movement is slower. Many prefer the mills of the States.");}}]});

cq({id:'cq3_curecolon',place:'chicoutimi',cond:s=>s.year>=1848&&s.press>.1&&s.traits.ferveur>=55,w:s=>2+s.press*10,
 because:s=>R("Les terres manquent, et l'Église est puissante.","Land is short, and the Church is powerful."),
 title:R("Le curé colonisateur","The colonizing priest"),
 text:R("Un curé propose d'ouvrir une vallée entière à la colonisation : il recrutera les familles, bâtira l'église, négociera le chemin de fer. « Emparons-nous du sol, c'est le meilleur moyen de conserver notre nationalité. »","A priest proposes to open a whole valley to settlement: he will recruit the families, build the church, lobby for the railway. 'Let us take hold of the land; it is the best way to preserve our nationality.'"),
 choices:[
  {label:R("Lui donner les moyens","Give him the means"),fx:s=>{s.flags.colonisation=true;s.land+=9000;s.treasury-=1500;T(s,'ferveur',2);ra(s,'alg',-5);ra(s,'innu',-3);return R("Des villages poussent dans les Laurentides et au Saguenay. Les Anishinabeg et les Innus perdent leurs territoires de chasse.","Villages spring up in the Laurentians and the Saguenay. The Anishinabeg and Innu lose their hunting grounds.");}},
  {label:R("Préférer les manufactures","Prefer factories"),fx:s=>{s.eco+=3;T(s,'aventure',1);return R("On attire des usines près des villes. Les jeunes y trouvent du travail, en anglais souvent.","Factories are brought near the towns. Young people find work there, often in English.");}}]});

cq({id:'cq3_patronage',place:'quebec',cond:s=>s.year>=1849&&s.flags.responsable,w:s=>2,
 because:s=>R("Le gouvernement responsable donne aux élus le contrôle des nominations.","Responsible government gives elected members control of appointments."),
 title:R("Les places","The spoils"),
 text:R("Pour la première fois, des ministres canadiens nomment les juges, les maîtres de poste, les douaniers. Les partisans font la queue. Les réformistes promettent la compétence ; les électeurs attendent des récompenses.","For the first time, Canadien ministers appoint the judges, postmasters and customs officers. The partisans line up. The reformers promise competence; the voters expect rewards."),
 choices:[
  {label:R("Nommer selon le mérite","Appoint on merit"),fx:s=>{s.edu+=1;s.patri-=2;s.autonomy+=2;return R("Une administration canadienne compétente se forme. Les partisans grognent.","A competent Canadien administration takes shape. The partisans grumble.");}},
  {label:R("Récompenser les fidèles","Reward the faithful"),fx:s=>{s.patri+=2;s.eco-=1;return R("Le patronage devient une institution. Il durera un siècle.","Patronage becomes an institution. It will last a century.");}}]});

cq({id:'cq3_codecivil',place:'quebec',cond:s=>s.year>=1857&&s.flags.unionAct,w:s=>3,
 because:s=>R("Les lois civiles françaises ont survécu ; il faut les mettre en ordre.","French civil law has survived; it needs to be put in order."),
 title:R("Le Code civil","The Civil Code"),
 text:R("Cartier fait nommer trois juges pour codifier le droit civil du Bas-Canada, sur le modèle du Code Napoléon : famille, propriété, contrats.","Cartier has three judges appointed to codify Lower Canada's civil law on the model of the Napoleonic Code: family, property, contracts."),
 choices:[
  {label:R("Un code fidèle à la coutume et à l'Église","A code faithful to custom and the Church"),hist:true,fx:s=>{s.flags.codeCivil=true;s.autonomy+=3;T(s,'ferveur',1);return R("Le Code civil entre en vigueur en 1866. L'épouse y reste sous l'autorité du mari pour un siècle.","The Civil Code comes into force in 1866. Wives remain under their husbands' authority for a century.");}},
  {label:R("Un code plus moderne","A more modern code"),fx:s=>{s.flags.codeCivil=true;s.autonomy+=3;T(s,'ouverture',4);s.off.eve-=10;return R("Le code reconnaît plus de droits aux femmes mariées. Les évêques protestent.","The code grants more rights to married women. The bishops protest.");}}]});

cq({id:'cq3_ecolenormale',place:'villeMarie',cond:s=>s.year>=1856&&s.edu>=20,w:s=>2,
 because:s=>R("Les écoles se multiplient ; il manque des maîtres.","Schools are multiplying; teachers are lacking."),
 title:R("Les écoles normales","The normal schools"),
 text:R("Le surintendant Chauveau veut former des instituteurs dans des écoles normales, à Montréal et à Québec. L'évêque exige qu'elles soient dirigées par des prêtres.","Superintendent Chauveau wants to train teachers in normal schools, in Montréal and Québec. The bishop demands they be run by priests."),
 choices:[
  {label:R("Des écoles normales confessionnelles","Denominational normal schools"),hist:true,fx:s=>{s.edu+=4;s.off.eve+=4;return R("Jacques-Cartier et Laval ouvrent en 1857. Les instituteurs restent pauvres, mais mieux formés.","Jacques-Cartier and Laval open in 1857. Teachers stay poor, but better trained.");}},
  {label:R("Des écoles normales laïques","Lay normal schools"),fx:s=>{s.edu+=5;T(s,'ouverture',3);s.off.eve-=12;return R("L'Église s'y oppose avec force. Les écoles ouvrent, contestées.","The Church opposes them forcefully. The schools open, contested.");}}]});

cq({id:'cq3_zouaves',place:'villeMarie',cond:s=>s.year>=1860&&s.traits.ferveur>=70,w:s=>2,
 because:s=>R("L'ultramontanisme est à son sommet.","Ultramontanism is at its peak."),
 title:R("Défendre le pape","Defending the Pope"),
 text:R("Garibaldi menace Rome. Mgr Bourget appelle les jeunes Canadiens à s'engager dans les zouaves pontificaux.","Garibaldi threatens Rome. Bishop Bourget calls on young Canadiens to enlist in the Papal Zouaves."),
 choices:[
  {label:R("Encourager l'engagement","Encourage enlistment"),fx:s=>{T(s,'ferveur',2);s.off.eve+=8;s.pop-=300;return R("Des centaines de zouaves partent pour Rome. Ils reviendront héros des paroisses.","Hundreds of Zouaves leave for Rome. They will return as parish heroes.");}},
  {label:R("Rester neutre","Stay neutral"),fx:s=>{s.off.eve-=4;return R("Quelques volontaires partent quand même.","A few volunteers go anyway.");}}]});

cq({id:'cq3_secession',place:'laprairie',cond:s=>s.year>=1861&&s.year<1866&&s.press>.08,w:s=>2,
 because:s=>R("Les jeunes sans terre sont nombreux, et la guerre fait rage aux États-Unis.","Landless young men are many, and war rages in the United States."),
 title:R("La prime de l'Union","The Union bounty"),
 text:R("Des recruteurs américains offrent des primes énormes aux jeunes Canadiens qui s'engagent dans l'armée du Nord. Des milliers traversent la frontière.","American recruiters offer huge bounties to young Canadiens who enlist in the Northern army. Thousands cross the border."),
 choices:[
  {label:R("Les laisser partir","Let them go"),fx:s=>{s.pop-=2500;s.treasury+=500;T(s,'aventure',2);return R("Près de 15 000 Canadiens français porteront l'uniforme bleu. Beaucoup resteront aux États-Unis.","Nearly 15,000 French Canadians will wear the blue uniform. Many will stay in the United States.");}},
  {label:R("Dénoncer les recruteurs","Denounce the recruiters"),fx:s=>{s.compagnie+=3;s.pop-=800;return R("Quelques recruteurs sont arrêtés. Les départs ralentissent à peine.","A few recruiters are arrested. Departures barely slow.");}}]});

cq({id:'cq3_banqueroute',place:'villeMarie',cond:s=>s.year>=1837&&s.year<1840&&s.orient.eco3==='commerce',w:s=>3,
 because:s=>R("Vous avez misé sur le commerce, et une panique financière secoue l'Amérique.","You have bet on trade, and a financial panic is shaking America."),
 title:R("La panique de 1837","The Panic of 1837"),
 text:R("Les banques de New York suspendent les paiements ; celles de Montréal suivent. Les marchands qui vous ont fait confiance sont au bord de la ruine.","The New York banks suspend payments; the Montréal banks follow. The merchants who trusted you are on the brink of ruin."),
 choices:[
  {label:R("Soutenir les banques canadiennes","Support the Canadien banks"),fx:s=>{s.treasury-=1500;s.eco+=2;return R("La Banque du Peuple survit. Ses déposants s'en souviendront.","The Banque du Peuple survives. Its depositors will remember.");}},
  {label:R("Laisser faire","Let things run their course"),fx:s=>{s.eco-=5;T(s,'entraide',2);return R("Faillites en chaîne. Les paysans retournent au troc.","A chain of bankruptcies. The farmers go back to barter.");}}]});

cq({id:'cq3_fenians',place:'laprairie',cond:s=>s.year>=1866,w:s=>4,
 because:s=>R("Des vétérans irlando-américains menacent la frontière.","Irish-American veterans threaten the border."),
 title:R("Les Féniens à la frontière","Fenians on the border"),
 text:R("Des Féniens franchissent la frontière près de Pigeon Hill. La milice est appelée. Les Canadiens français doivent-ils se battre pour défendre la colonie britannique ?","Fenians cross the border near Pigeon Hill. The militia is called up. Should French Canadians fight to defend the British colony?"),
 choices:[
  {label:R("Répondre à l'appel","Answer the call"),hist:true,fx:s=>{s.defense+=8;T(s,'roi',2);s.compagnie+=4;return R("Les Féniens repassent la frontière. L'argument est fait : unis, on se défend mieux.","The Fenians recross the border. The point is made: united, we defend ourselves better.");}},
  {label:R("Ce n'est pas notre guerre","It is not our war"),fx:s=>{s.patri+=3;s.compagnie-=4;return R("Les régiments anglais s'en chargent. À Ottawa, on se méfie des Canadiens français.","The English regiments handle it. In Ottawa, French Canadians are distrusted.");}}]});

cq({id:'cq3_garneau',place:'quebec',cond:s=>s.year>=1845&&s.edu>=18,w:s=>2,
 because:s=>R("L'instruction progresse, et Durham a dit que les Canadiens n'avaient pas d'histoire.","Schooling is advancing, and Durham said the Canadiens had no history."),
 title:R("L'Histoire du Canada","The History of Canada"),
 text:R("François-Xavier Garneau, notaire, publie le premier tome de son Histoire du Canada : un peuple qui a survécu à la Conquête, et qui peut survivre à l'Union. Le clergé lui reproche d'être trop libéral.","François-Xavier Garneau, a notary, publishes the first volume of his History of Canada: a people that survived the Conquest, and can survive the Union. The clergy reproach him for being too liberal."),
 choices:[
  {label:R("En faire le livre des écoles","Make it the schoolbook"),fx:s=>{s.patri+=4;s.edu+=2;s.off.eve-=4;return R("Des générations d'écoliers apprendront Garneau. « Notre histoire », dira-t-on désormais.","Generations of schoolchildren will learn Garneau. People will now say 'our history'.");}},
  {label:R("Lui demander de l'adoucir","Ask him to soften it"),fx:s=>{s.off.eve+=4;T(s,'ferveur',1);return R("Les éditions suivantes font plus de place à la Providence.","Later editions make more room for Providence.");}}]});

cq({id:'cq3_habitants_loyaux',place:'quebec',cond:s=>s.year>=1776&&s.year<1815&&s.traits.roi>=68,w:s=>1+(s.traits.roi-65)/5,
 because:s=>R("Les Canadiens sont devenus de loyaux sujets du roi George.","The Canadiens have become loyal subjects of King George."),
 title:R("Une adresse au roi","An address to the King"),
 text:R("Des notables canadiens proposent une adresse de loyauté au roi, avec une demande : que les Canadiens accèdent enfin aux charges publiques.","Canadien notables propose a loyal address to the King, with a request: that Canadiens finally have access to public office."),
 choices:[
  {label:R("L'envoyer","Send it"),fx:s=>{s.compagnie+=6;s.autonomy+=3;T(s,'roi',1);return R("Le gouverneur nomme quelques Canadiens au Conseil. On les appellera les « chouayens ».","The governor appoints a few Canadiens to the Council. They will be called 'chouayens'.");}},
  {label:R("Ne rien demander","Ask for nothing"),fx:s=>{s.compagnie+=2;return R("Le roi remercie ses fidèles sujets.","The King thanks his faithful subjects.");}}]});

EVENTS.push(...E3);for(const e of E3)EV[e.id]=e;
Object.assign(EVENT_IMG,{cq3_highlanders:'habitant_farm',seigneurs1765:'quebec1760',cq3_variole1775:'winter',routes1796:'sleigh',jesuites1800:'relations',hart1808:'langues',banque1817:'victoria',lachine1821:'victoria',mcgill1821:'plessis',ssjb1834:'patriote',femmes1834:'langues',vincent1825:'huron_hunt',cq3_duvernay:'mesplet',cq3_etoffe:'sixcomtes',cq3_exiles:'patriote',cq3_rouges:'parlement',cq3_cantons2:'pioneer',cq3_curecolon:'pioneer',cq3_patronage:'lafontaine',cq3_codecivil:'cartier',cq3_ecolenormale:'plessis',cq3_zouaves:'bourget',cq3_secession:'raft',cq3_banqueroute:'victoria',cq3_fenians:'chateauguay',cq3_garneau:'garneau',cq3_habitants_loyaux:'quebec1760'});
})();
