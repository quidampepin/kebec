/* Kebec — Période II : conséquences. Des événements inventés mais plausibles, qui deviennent possibles
   (puis de plus en plus probables) à cause des choix déjà faits. Chacun dit « pourquoi maintenant ».
   w(s) = poids dans le tirage ; plus la cause est forte, plus l'événement a de chances de sortir. */
const cq=e=>{e.period=2;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||10;EVENTS.push(e);EV[e.id]=e;};
const yrsSince=(s,id)=>s.sysLast&&s.sysLast[id]!=null?s.year-s.sysLast[id]:99;

cq({id:'cq_temple',place:'quebec',cond:s=>s.flags.huguenotsP2&&yrsSince(s,'p2_huguenots')>=4,w:s=>2+s.traits.ouverture/25,
 because:s=>R("Vous avez accueilli des marchands huguenots ; ils sont maintenant établis et prospères.","You took in Huguenot merchants; they are now settled and prosperous."),
 title:R("Un temple à Québec ?","A Protestant church in Québec?"),
 text:R("Les familles protestantes de la basse-ville demandent la permission de se réunir pour prier à leur façon, avec un pasteur venu de Hollande. L'évêque menace d'excommunier quiconque leur loue une salle.","The Protestant families of the lower town ask permission to meet and pray in their own way, with a minister from Holland. The bishop threatens to excommunicate anyone who rents them a hall."),
 choices:[
  {label:R("Tolérer un culte privé","Tolerate private worship"),fx:s=>{s.flags.tolerance=true;traitAdd(s,'ouverture',8);s.off.eve-=20;s.compagnie-=4;s.pop+=60;return R("Le culte se tient derrière des volets clos. D'autres huguenots de La Rochelle prennent le chemin de Québec plutôt que celui de Boston.","Worship is held behind closed shutters. Other La Rochelle Huguenots head for Québec rather than Boston.");}},
  {label:R("Refuser, mais les laisser commercer","Refuse, but let them trade"),fx:s=>{s.off.eve+=4;s.pop-=40;return R("Quelques familles partent ; les autres vont à la messe de Pâques et prient chez elles le reste de l'année.","A few families leave; the rest go to Easter Mass and pray at home the rest of the year.");}},
  {label:R("Exiger leur conversion","Demand their conversion"),fx:s=>{s.flags.huguenotsP2=false;s.pop-=110;s.treasury-=1500;traitAdd(s,'ouverture',-6);traitAdd(s,'ferveur',2);s.off.eve+=10;return R("Ils partent pour New York avec leurs navires et leurs créances. Le commerce des Antilles en souffre.","They leave for New York with their ships and their credit. The West Indies trade suffers.");}}]});

cq({id:'cq_assemblee',place:'quebec',cond:s=>s.year>=1675&&(s.autonomy>=45||s.traits.roi<=48||s.flags.syndics&&s.autonomy>=38),w:s=>(s.flags.syndics?1.5:0)+1+Math.max(0,s.autonomy-40)/8+Math.max(0,50-s.traits.roi)/8,
 because:s=>R("Les habitants ont pris l'habitude de se faire entendre, et leur attachement au Roi s'est relâché.","The habitants are used to being heard, and their attachment to the King has loosened."),
 title:R("Les habitants veulent une assemblée","The habitants want an assembly"),
 text:R("Des capitaines de milice et des marchands de Québec et de Montréal demandent une assemblée permanente, élue dans les paroisses, qui donnerait son avis sur les impôts et la traite. À Versailles, le mot fait peur.","Militia captains and merchants of Québec and Montréal ask for a permanent assembly, elected in the parishes, to advise on taxes and the trade. At Versailles the word is frightening."),
 choices:[
  {label:R("Accorder une assemblée consultative","Grant a consultative assembly"),fx:s=>{s.flags.assemblee=s.year;s.autonomy+=12;traitAdd(s,'roi',-6);traitAdd(s,'entraide',3);s.off.gov-=10;s.compagnie-=6;return R("Une vingtaine de députés des paroisses se réunissent au château Saint-Louis. Ils n'ont aucun pouvoir, et ils le savent ; mais ils se réunissent.","Some twenty parish deputies meet at the Château Saint-Louis. They have no power, and they know it; but they meet.");}},
  {label:R("Répondre que le Roi écoute ses sujets un à un","Reply that the King hears his subjects one by one"),fx:s=>{s.autonomy-=3;s.compagnie+=2;return R("La pétition est classée. Les signataires se le tiennent pour dit, pour cette fois.","The petition is filed away. The signatories take the hint, this time.");}},
  {label:R("Faire arrêter les meneurs","Arrest the ringleaders"),fx:s=>{s.autonomy-=10;traitAdd(s,'roi',3);traitAdd(s,'entraide',-3);s.off.gov+=6;return R("Trois marchands passent l'hiver en prison. On parle moins fort, on n'en pense pas moins.","Three merchants spend the winter in jail. People speak more quietly, and think no less.");}}]});

cq({id:'cq_assemblee2',place:'quebec',cond:s=>s.flags.assemblee&&s.year>=s.flags.assemblee+8&&!!s.war,w:s=>4,
 because:s=>R("L'assemblée que vous avez accordée existe depuis des années, et la guerre coûte cher.","The assembly you granted has existed for years, and the war is costly."),
 title:R("L'assemblée refuse l'impôt de guerre","The assembly refuses the war tax"),
 text:R("Pour payer les fortifications, l'intendant veut une taxe sur les habitants. L'assemblée des paroisses refuse : « pas d'impôt sans notre avis ». Le gouverneur parle de la dissoudre.","To pay for fortifications, the intendant wants a tax on the habitants. The parish assembly refuses: 'no tax without our say'. The governor talks of dissolving it."),
 choices:[
  {label:R("Négocier avec l'assemblée","Negotiate with the assembly"),fx:s=>{s.autonomy+=8;s.treasury+=1500;traitAdd(s,'roi',-4);traitAdd(s,'entraide',2);s.compagnie-=5;return R("L'impôt passe, réduit de moitié, en échange d'un droit de regard sur son emploi. Un précédent est né.","The tax passes, halved, in exchange for a say in how it is spent. A precedent is born.");}},
  {label:R("Dissoudre l'assemblée","Dissolve the assembly"),fx:s=>{s.flags.assemblee=false;s.autonomy-=12;traitAdd(s,'roi',-3);s.treasury+=3000;s.off.gov+=8;return R("L'assemblée est dissoute, l'impôt levé par ordonnance. On s'en souviendra, sous d'autres maîtres.","The assembly is dissolved, the tax raised by ordinance. It will be remembered, under other masters.");}}]});

cq({id:'cq_metis',place:'michilimakinac',cond:s=>s.year>=1690&&(s.traits.alliance>=60||s.flags.francisation||s.orient.cdb==='libres'),w:s=>1+Math.max(0,s.traits.alliance-55)/6+(s.flags.francisation?2:0),
 because:s=>R("Vos voyageurs vivent dans l'Ouest, et l'alliance avec les nations est devenue une affaire de familles.","Your voyageurs live in the West, and the alliance with the nations has become a matter of families."),
 title:R("Les enfants des deux peuples","Children of both peoples"),
 text:R("À Michilimakinac et au Détroit, des voyageurs ont épousé des femmes outaouaises et ojibwées « à la façon du pays ». Leurs enfants parlent deux langues. Le missionnaire exige un mariage à l'église ; le commandant demande s'ils sont sujets du Roi.","At Michilimackinac and Detroit, voyageurs have married Odawa and Ojibwe women 'in the custom of the country'. Their children speak two languages. The missionary demands a church wedding; the commandant asks whether they are the King's subjects."),
 choices:[
  {label:R("Reconnaître ces mariages et ces enfants comme Français","Recognize these marriages and children as French"),fx:s=>{s.flags.metis=true;traitAdd(s,'alliance',6);relAdd(s,'ouest',8);s.off.eve-=8;return R("Un peuple nouveau prend racine autour des Grands Lacs, ni tout à fait français, ni tout à fait anishinaabe.","A new people takes root around the Great Lakes, neither quite French nor quite Anishinaabe.");}},
  {label:R("N'accepter que les mariages à l'église","Accept only church weddings"),fx:s=>{traitAdd(s,'ferveur',2);relAdd(s,'ouest',-2);s.off.eve+=5;return R("Quelques couples passent devant le prêtre. Les autres continuent comme avant, loin de lui.","A few couples go before the priest. The rest carry on as before, far from him.");}},
  {label:R("Interdire ces unions","Forbid these unions"),fx:s=>{traitAdd(s,'alliance',-8);relAdd(s,'ouest',-12);s.off.int+=4;return R("Les familles alliées se sentent insultées. Des voyageurs choisissent de rester chez leurs beaux-parents, pour de bon.","The allied families feel insulted. Some voyageurs choose to stay with their in-laws, for good.");}}]});

cq({id:'cq_illinois',place:'detroit',cond:s=>s.year>=1700&&(s.flags.louisiane===2||(s.flags.louisiane>=1&&s.traits.aventure>=55)),w:s=>s.flags.louisiane===2?4:2,
 because:s=>R("Vous avez ouvert la route de la Louisiane, et l'esprit d'aventure ne manque pas.","You opened the route to Louisiana, and the spirit of adventure runs high."),
 title:R("Le blé des Illinois","The wheat of the Illinois"),
 text:R("Des familles canadiennes cultivent à Kaskaskia, au pays des Illinois, et envoient leur blé à la Nouvelle-Orléans. La Louisiane veut ce pays ; les Canadiens qui y vivent préfèrent dépendre de Québec.","Canadian families farm at Kaskaskia, in the Illinois country, and send their wheat to New Orleans. Louisiana wants the region; the Canadians living there would rather depend on Québec."),
 choices:[
  {label:R("Rattacher les Illinois au Canada","Attach the Illinois to Canada"),fx:s=>{s.flags.illinois=true;s.pop-=150;s.mods.fur*=1.15;relAdd(s,'ouest',4);traitAdd(s,'aventure',3);s.treasury-=1000;return R("Le Canada s'étire jusqu'au Mississippi. Il faut des soldats, des curés et des canots pour le tenir.","Canada stretches to the Mississippi. It takes soldiers, priests and canoes to hold it.");}},
  {label:R("Les laisser à la Louisiane","Leave them to Louisiana"),fx:s=>{s.compagnie+=3;s.pop-=80;return R("Les Illinois regardent désormais vers le sud. Des familles canadiennes descendent les rejoindre.","The Illinois now look south. Canadian families go down to join them.");}}]});

cq({id:'cq_neutralite',place:'villeMarie',cond:s=>!!s.war&&s.year>=1702&&!s.flags.neutralite,w:s=>1+Math.max(0,55-s.traits.roi)/8+(s.flags.grandePaix?1:0),
 because:s=>R("Les Canadiens sont las des guerres d'Europe, et le commerce avec Albany ne s'est jamais vraiment arrêté.","Canadians are weary of Europe's wars, and the trade with Albany never really stopped."),
 title:R("Une neutralité avec la Nouvelle-Angleterre ?","Neutrality with New England?"),
 text:R("Des marchands de Boston et d'Albany font savoir qu'ils signeraient une neutralité : pas de raids d'un côté ni de l'autre, quoi qu'en disent les rois. Les Abénakis, qui portent la guerre à la frontière, ne sont pas d'accord.","Merchants of Boston and Albany let it be known they would sign a neutrality: no raids on either side, whatever the kings say. The Abenaki, who carry the war on the frontier, disagree."),
 choices:[
  {label:R("Signer une neutralité locale","Sign a local neutrality"),fx:s=>{s.flags.neutralite=s.war;s.compagnie-=10;traitAdd(s,'roi',-5);relAdd(s,'abenaki',-12);s.off.gov-=8;return R("Les raids cessent sur la frontière. Versailles parle de trahison ; les habitants récoltent en paix.","The raids stop on the frontier. Versailles speaks of treason; the habitants harvest in peace.");}},
  {label:R("Faire traîner les pourparlers","Drag out the talks"),fx:s=>{s.defense+=4;relAdd(s,'abenaki',-3);return R("On échange des lettres et des prisonniers. Une saison de répit, rien de plus.","Letters and prisoners are exchanged. A season's respite, no more.");}},
  {label:R("Refuser : la guerre du Roi est la nôtre","Refuse: the King's war is ours"),fx:s=>{traitAdd(s,'roi',3);relAdd(s,'abenaki',4);s.compagnie+=3;return R("Les partis de guerre repartent vers la Nouvelle-Angleterre.","The war parties set off again for New England.");}}]});

cq({id:'cq_imprimerie',place:'quebec',cond:s=>s.year>=1715&&(s.traits.ouverture>=40||s.autonomy>=45||s.flags.ecoles||s.flags.college),w:s=>(s.flags.college?1:0)+1+Math.max(0,s.traits.ouverture-35)/6+(s.flags.ecoles?1:0),
 because:s=>R("La colonie s'est ouverte, et ses écoles ont appris à lire à une génération.","The colony has opened up, and its schools have taught a generation to read."),
 title:R("Une imprimerie à Québec ?","A printing press in Québec?"),
 text:R("Un imprimeur de Rouen demande la permission d'installer une presse à Québec. Il n'y en a aucune en Nouvelle-France : tout s'imprime en France, avec privilège du Roi.","A printer from Rouen asks permission to set up a press in Québec. There is none in New France: everything is printed in France, under royal privilege."),
 choices:[
  {label:R("L'autoriser","Allow it"),fx:s=>{s.flags.imprimerie=s.year;traitAdd(s,'ouverture',6);s.autonomy+=3;s.off.eve-=12;traitAdd(s,'roi',-2);return R("La première presse du Canada imprime des ordonnances, des almanachs… et bientôt d'autres choses.","Canada's first press prints ordinances, almanacs… and soon other things.");}},
  {label:R("Seulement pour l'évêché et l'intendance","Only for the bishopric and the intendancy"),fx:s=>{s.flags.imprimerie=s.year;s.flags.presseOfficielle=true;s.off.eve+=3;s.off.int+=4;return R("Catéchismes et ordonnances sortent de la presse. Rien d'autre.","Catechisms and ordinances come off the press. Nothing else.");}},
  {label:R("Refuser","Refuse"),fx:s=>{s.off.eve+=4;return R("Il n'y aura pas de presse au Canada avant les Anglais.","There will be no press in Canada before the English.");}}]});

cq({id:'cq_gazette',place:'quebec',cond:s=>s.flags.imprimerie&&!s.flags.presseOfficielle&&s.year>=s.flags.imprimerie+6,w:s=>4,
 because:s=>R("Vous avez autorisé une imprimerie libre.","You allowed a free printing press."),
 title:R("La Gazette de Québec","The Québec Gazette"),
 text:R("Une feuille hebdomadaire circule dans les tavernes. Ce mois-ci, elle se moque de l'intendant et publie la liste des prix du blé chez les marchands du Roi.","A weekly sheet circulates in the taverns. This month it mocks the intendant and publishes the wheat prices at the King's merchants."),
 choices:[
  {label:R("La laisser paraître","Let it publish"),fx:s=>{traitAdd(s,'ouverture',4);s.autonomy+=5;s.off.int-=12;traitAdd(s,'roi',-3);return R("On lit la Gazette à voix haute sur le parvis après la messe. L'intendant fait vérifier ses comptes.","The Gazette is read aloud on the church steps after Mass. The intendant has his accounts checked.");}},
  {label:R("La censurer","Censor it"),fx:s=>{s.off.int+=6;s.autonomy-=3;return R("Désormais, chaque numéro passe chez le censeur. Elle devient très ennuyeuse.","From now on every issue goes to the censor. It becomes very dull.");}}]});

cq({id:'cq_fils',place:'troisRivieres',cond:s=>s.pop>=22000&&s.year>=1715,w:s=>1+s.pop/20000,
 because:s=>R("Les familles nombreuses ont rempli les rangs le long du fleuve.","Large families have filled the rangs along the river."),
 title:R("Trop de fils pour trop peu de terres","Too many sons, too little land"),
 text:R("Le long du fleuve, les premiers rangs sont pleins. Les pères partagent leurs terres entre leurs fils, en bandes de plus en plus minces. Où iront les cadets ?","Along the river, the first rangs are full. Fathers divide their land among their sons, in ever thinner strips. Where will the younger sons go?"),
 choices:[
  {label:R("Ouvrir les seigneuries de la Chaudière et du Richelieu","Open seigneuries on the Chaudière and the Richelieu"),fx:s=>{s.treasury-=2000;s.cleared+=s.pop*.08;traitAdd(s,'entraide',2);s.off.int+=6;return R("Des rangs neufs s'ouvrent vers la Beauce et le haut Richelieu. On défriche loin du fleuve, pour la première fois.","New rangs open toward the Beauce and the upper Richelieu. Land is cleared far from the river for the first time.");}},
  {label:R("Les laisser partir dans l'Ouest","Let them go west"),fx:s=>{s.pop-=300;traitAdd(s,'aventure',5);relAdd(s,'ouest',3);s.mods.fur*=1.1;return R("Les cadets s'engagent comme voyageurs. Beaucoup ne reviendront pas.","The younger sons sign on as voyageurs. Many will not come back.");}},
  {label:R("Laisser les terres se morceler","Let the land be divided"),fx:s=>{s.mods.harvest=.88;traitAdd(s,'entraide',3);return R("Les terres rapetissent, les familles se serrent. On mange moins bien, mais on reste ensemble.","The farms shrink, families squeeze together. People eat less well, but they stay together.");}}]});

cq({id:'cq_agniers',place:'fortRichelieu',cond:s=>s.year>=1668&&s.rel.agnier>=35&&!s.flags.agnierAlly,w:s=>1+(s.rel.agnier-30)/10+(s.flags.peace67?1.5:0),
 because:s=>R("Votre paix avec les Agniers a tenu, et elle est devenue de l'amitié.","Your peace with the Mohawk has held, and turned into friendship."),
 title:R("Les Agniers proposent une alliance","The Mohawk propose an alliance"),
 text:R("Des chefs agniers viennent à Montréal : ils porteraient leurs fourrures ici plutôt qu'à Albany, si Onontio les protège quand les Anglais se fâcheront. Les Algonquins, vieux ennemis des Agniers, observent.","Mohawk chiefs come to Montréal: they would bring their furs here rather than to Albany, if Onontio protects them when the English grow angry. The Algonquins, old enemies of the Mohawk, watch."),
 choices:[
  {label:R("Conclure l'alliance","Conclude the alliance"),fx:s=>{s.flags.agnierAlly=true;relAdd(s,'agnier',15);relAdd(s,'onon',6);relAdd(s,'alg',-8);s.mods.fur*=1.2;traitAdd(s,'alliance',4);return R("La route d'Albany se vide. À New York, on s'inquiète de voir les Agniers passer aux Français.","The Albany route empties. In New York, people worry to see the Mohawk going over to the French.");}},
  {label:R("Rester en paix, sans alliance","Stay at peace, without an alliance"),fx:s=>{relAdd(s,'alg',3);relAdd(s,'agnier',-4);return R("On se quitte en bons termes. Les fourrures continuent d'aller à Albany.","They part on good terms. The furs keep going to Albany.");}}]});

cq({id:'cq_huronie',place:'gahoendoe',cond:s=>!s.wenFallen&&s.rel.wen>=25&&s.year>=1665,w:s=>3,
 because:s=>R("La Huronie a survécu grâce à vos choix de la période I.","Huronia survived thanks to your choices in Period I."),
 title:R("Wendake au Conseil souverain ?","Wendake on the Sovereign Council?"),
 text:R("La confédération wendate, toujours debout autour de la baie Georgienne, demande un comptoir français permanent… et que ses délégués siègent au Conseil souverain quand on y parle de la traite.","The Wendat confederacy, still standing around Georgian Bay, asks for a permanent French trading town… and for its delegates to sit on the Sovereign Council whenever the trade is discussed."),
 choices:[
  {label:R("Leur donner un siège au Conseil","Give them a seat on the Council"),fx:s=>{s.flags.wendakeConseil=true;relAdd(s,'wen',15);traitAdd(s,'alliance',8);s.off.gov+=4;s.compagnie-=5;traitAdd(s,'ouverture',4);return R("Pour la première fois, une nation autochtone siège au gouvernement de la colonie. Versailles n'en revient pas.","For the first time, an Indigenous nation sits in the colony's government. Versailles can hardly believe it.");}},
  {label:R("Un comptoir, sans siège","A trading town, no seat"),fx:s=>{relAdd(s,'wen',6);s.mods.fur*=1.15;s.treasury-=800;return R("Le comptoir de Sainte-Marie renaît. Les Wendats restent des alliés, pas des conseillers.","The Sainte-Marie trading town is reborn. The Wendat remain allies, not councillors.");}},
  {label:R("Refuser","Refuse"),fx:s=>{relAdd(s,'wen',-12);return R("Les Wendats repartent déçus. Certains parlent d'aller voir les Anglais.","The Wendat leave disappointed. Some talk of going to see the English.");}}]});

cq({id:'cq_cures',place:'quebec',cond:s=>s.year>=1680&&s.traits.ferveur>=66&&s.church>=60,w:s=>1+(s.traits.ferveur-70)/5,
 because:s=>R("La ferveur est forte et l'Église tient les paroisses.","Fervour runs high and the Church holds the parishes."),
 title:R("Le pouvoir des curés","The power of the priests"),
 text:R("Les curés demandent que la dîme passe du vingt-sixième au treizième des grains, et qu'aucun capitaine de milice ne soit nommé sans leur avis. Les habitants grognent.","The priests ask that the tithe rise from a twenty-sixth to a thirteenth of the grain, and that no militia captain be named without their advice. The habitants grumble."),
 choices:[
  {label:R("Donner raison à l'Église","Side with the Church"),fx:s=>{s.church+=6;s.off.eve+=12;s.autonomy-=4;traitAdd(s,'entraide',-2);traitAdd(s,'ferveur',2);return R("La dîme monte, les curés deviennent les vrais maîtres de la paroisse.","The tithe rises; the priests become the true masters of the parish.");}},
  {label:R("Donner raison aux habitants","Side with the habitants"),fx:s=>{s.off.eve-=14;s.autonomy+=4;traitAdd(s,'entraide',2);return R("La dîme reste au vingt-sixième. Le curé tonne en chaire contre l'ingratitude du siècle.","The tithe stays at a twenty-sixth. The priest thunders from the pulpit against the ingratitude of the age.");}}]});

cq({id:'cq_tartuffe',place:'quebec',cond:s=>s.year>=1680&&s.traits.ferveur<=60,w:s=>1+(60-s.traits.ferveur)/6,
 because:s=>R("La ferveur a reculé ; les officiers et les marchands aiment le théâtre et les bals.","Fervour has ebbed; officers and merchants love theatre and balls."),
 title:R("Molière au château","Molière at the château"),
 text:R("Des officiers veulent jouer le Tartuffe de Molière au château Saint-Louis. L'évêque y voit une insulte à l'Église et menace d'excommunier les comédiens.","Officers want to stage Molière's Tartuffe at the Château Saint-Louis. The bishop sees it as an insult to the Church and threatens to excommunicate the actors."),
 choices:[
  {label:R("Laisser jouer la pièce","Let the play go on"),fx:s=>{traitAdd(s,'ouverture',4);traitAdd(s,'ferveur',-2);s.off.eve-=15;s.off.gov+=6;return R("La salle est pleine, les rires aussi. L'évêque refuse la communion aux comédiens à Pâques.","The hall is full, and so is the laughter. The bishop refuses the actors communion at Easter.");}},
  {label:R("Interdire la représentation","Ban the performance"),fx:s=>{traitAdd(s,'ferveur',2);s.off.eve+=8;s.off.gov-=6;return R("Le gouverneur, vexé, se console avec un bal. L'évêque paie cent pistoles aux officiers pour qu'ils renoncent.","The vexed governor consoles himself with a ball. The bishop pays the officers a hundred pistoles to give up.");}}]});

cq({id:'cq_canadiens',place:'villeMarie',cond:s=>!!s.war&&s.traits.roi<=52&&s.year>=1740,w:s=>1+(52-s.traits.roi)/5,
 because:s=>R("L'attachement au Roi s'est relâché : on se dit « Canadien » avant d'être Français.","Loyalty to the King has slackened: people call themselves 'Canadiens' before Frenchmen."),
 title:R("« Nous ne sommes pas des Français de France »","'We are not Frenchmen from France'"),
 text:R("Des officiers de milice refusent d'obéir aux officiers des bataillons venus de France, qui méprisent leur façon de faire la guerre. « Nous connaissons ce pays ; eux, non. »","Militia officers refuse to obey the officers of the battalions from France, who scorn their way of fighting. 'We know this country; they do not.'"),
 choices:[
  {label:R("Donner le commandement aux Canadiens dans les bois","Give Canadians command in the woods"),fx:s=>{s.flags.canadiens=true;s.defense+=6;traitAdd(s,'roi',-3);traitAdd(s,'aventure',2);s.off.gov+=6;return R("La petite guerre reprend, à la canadienne. Les officiers de France écrivent que la colonie leur échappe.","The 'petite guerre' resumes, Canadian-style. The French officers write that the colony is slipping from their grasp.");}},
  {label:R("Imposer l'autorité des officiers de France","Impose the authority of the French officers"),fx:s=>{s.defense-=4;traitAdd(s,'roi',2);s.compagnie+=3;return R("Les miliciens obéissent, de mauvaise grâce. Certains rentrent chez eux pour les récoltes, sans permission.","The militiamen obey, grudgingly. Some go home for the harvest, without leave.");}}]});

cq({id:'cq_refuge',place:'villeMarie',cond:s=>s.flags.noSlavery&&s.year>=1712,w:s=>3,
 because:s=>R("Vous avez refusé l'esclavage au Canada ; la nouvelle a franchi la frontière.","You refused slavery in Canada; the news has crossed the border."),
 title:R("Des fugitifs d'Albany","Fugitives from Albany"),
 text:R("Des hommes et des femmes réduits en esclavage à New York et à Albany ont fui vers le nord par le lac Champlain. Ils demandent à rester à Montréal. Leurs propriétaires réclament leur retour.","Men and women enslaved in New York and Albany have fled north by Lake Champlain. They ask to stay in Montréal. Their owners demand their return."),
 choices:[
  {label:R("Leur accorder l'asile","Grant them asylum"),fx:s=>{s.pop+=35;traitAdd(s,'ouverture',6);s.compagnie-=2;s.flags.asile=true;return R("Ils s'établissent comme artisans et engagés libres. D'autres suivront, chaque printemps.","They settle as craftsmen and free hired hands. Others will follow, every spring.");}},
  {label:R("Les rendre contre une indemnité","Return them for compensation"),fx:s=>{s.treasury+=500;traitAdd(s,'ouverture',-5);return R("Ils repartent enchaînés vers le sud. Le refus de 1709 ne valait que pour le Canada.","They go back south in chains. The refusal of 1709 held only for Canada.");}}]});

cq({id:'cq_contrebande',place:'kahnawake',cond:s=>s.places.kahnawake&&s.year>=1700,w:s=>2,
 because:s=>R("Kahnawake est devenue un village prospère entre Montréal et Albany.","Kahnawake has become a prosperous village between Montréal and Albany."),
 title:R("La route d'Albany","The Albany road"),
 text:R("Les marchands de Montréal vendent leurs castors aux gens de Kahnawake, qui les portent à Albany contre des draps anglais deux fois moins chers. Tout le monde y gagne, sauf le Roi.","Montréal merchants sell their beaver to the people of Kahnawake, who carry it to Albany for English cloth at half the price. Everyone gains, except the King."),
 choices:[
  {label:R("Fermer les yeux","Look the other way"),fx:s=>{relAdd(s,'agnier',6);s.mods.fur*=.9;s.autonomy+=3;s.off.int-=6;return R("Le commerce continue, discret et florissant. Kahnawake reste fidèle.","The trade continues, quiet and flourishing. Kahnawake stays loyal.");}},
  {label:R("Réprimer la contrebande","Crack down on smuggling"),fx:s=>{relAdd(s,'agnier',-10);s.mods.fur*=1.08;s.off.int+=8;return R("Des canots saisis, des amendes. Kahnawake grogne et parle de s'installer ailleurs.","Canoes seized, fines levied. Kahnawake grumbles and talks of moving elsewhere.");}},
  {label:R("Taxer ce commerce plutôt que l'interdire","Tax the trade rather than ban it"),fx:s=>{s.treasury+=900;s.compagnie-=5;relAdd(s,'agnier',2);return R("Une licence officieuse, un droit perçu à Chambly. Versailles n'en saura rien, ou presque.","An unofficial licence, a duty collected at Chambly. Versailles will know nothing of it, or almost.");}}]});

cq({id:'cq_marchands',place:'villeMarie',cond:s=>s.year>=1680&&s.traits.aventure<=42,w:s=>1+(42-s.traits.aventure)/5,
 because:s=>R("Vous avez retenu la jeunesse aux champs : la traite s'est asséchée.","You have kept the young men on the farms: the trade has dried up."),
 title:R("Les marchands de Montréal font faillite","Montréal merchants go bankrupt"),
 text:R("Trois maisons de commerce de Montréal font faillite. Leurs créanciers de La Rochelle réclament leur dû, et les marchands demandent qu'on rouvre les congés de traite.","Three Montréal trading houses go bankrupt. Their La Rochelle creditors demand payment, and the merchants ask that the trade licences be reopened."),
 choices:[
  {label:R("Rouvrir des congés","Reopen licences"),fx:s=>{s.orient.cdb='conges';traitAdd(s,'aventure',4);s.mods.fur*=1.15;s.off.int-=4;return R("Les canots repartent vers les Grands Lacs au printemps.","The canoes set off again for the Great Lakes in spring.");}},
  {label:R("Tenir bon : la terre d'abord","Hold firm: land first"),fx:s=>{traitAdd(s,'entraide',2);s.compagnie-=4;s.treasury-=600;return R("Les faillites s'enchaînent. Montréal devient une ville de paysans et d'artisans.","The bankruptcies pile up. Montréal becomes a town of farmers and craftsmen.");}}]});

cq({id:'cq_chantier',place:'quebec',cond:s=>s.year>=1725&&(s.flags.talonEco||s.flags.forges),w:s=>2+(s.flags.forges?2:0),
 because:s=>R("Les projets de Talon et les forges du Saint-Maurice ont donné au pays des ouvriers et du fer.","Talon's projects and the Saint-Maurice ironworks have given the country workers and iron."),
 title:R("Des vaisseaux du Roi à Québec","King's ships in Québec"),
 text:R("Le ministre de la Marine propose de construire des vaisseaux de guerre à Québec, avec le chêne du pays et le fer des forges.","The Minister of Marine proposes building warships in Québec, with local oak and iron from the forges."),
 choices:[
  {label:R("Ouvrir le chantier royal","Open the royal shipyard"),fx:s=>{s.flags.chantier=true;s.treasury-=2500;s.compagnie+=8;s.pop+=80;s.defense+=4;traitAdd(s,'entraide',1);return R("Le Canada lance ses premiers vaisseaux. Des charpentiers de Rochefort s'installent dans la basse-ville.","Canada launches its first warships. Shipwrights from Rochefort settle in the lower town.");}},
  {label:R("Décliner : trop cher","Decline: too costly"),fx:s=>{s.compagnie-=2;return R("Le chêne du Canada continuera de partir en billes.","Canadian oak will keep leaving as logs.");}}]});

cq({id:'cq_celibataires',place:'quebec',cond:s=>s.year>=1668&&s.women<s.pop*.15,w:s=>1+(.17-s.women/s.pop)*60,
 because:s=>R("Il y a trop peu de femmes dans la colonie.","There are too few women in the colony."),
 title:R("Trop d'hommes seuls","Too many single men"),
 text:R("Les soldats et les engagés restés au pays ne trouvent pas d'épouse. Beaucoup parlent de repartir, d'autres de « courir les bois ».","The soldiers and indentured men who stayed cannot find wives. Many talk of going home, others of 'running the woods'."),
 choices:[
  {label:R("Réclamer de nouveau des filles à marier","Ask again for marriageable girls"),fx:s=>{s.compagnie-=4;s.women+=70;s.pop+=70;return R("Versailles envoie un dernier contingent, à contrecœur.","Versailles sends one last contingent, reluctantly.");}},
  {label:R("Mettre à l'amende les célibataires","Fine the bachelors"),fx:s=>{s.treasury+=600;traitAdd(s,'roi',-2);s.pop-=50;return R("Comme Talon l'avait fait : interdits de chasse et de traite tant qu'ils ne sont pas mariés. Certains partent.","As Talon did: barred from hunting and trading until they marry. Some leave.");}},
  {label:R("Encourager les mariages avec les nations alliées","Encourage marriages with the allied nations"),fx:s=>{s.women+=40;s.pop+=40;traitAdd(s,'alliance',5);s.off.eve-=5;return R("Des mariages se font aux missions de Sillery et de Lorette.","Marriages take place at the Sillery and Lorette missions.");}}]});

cq({id:'cq_voyageurs',place:'michilimakinac',cond:s=>s.year>=1690&&s.traits.aventure>=58,w:s=>1+(s.traits.aventure-55)/5,
 because:s=>R("L'esprit d'aventure est fort : une génération vit dans les Pays d'en Haut.","The spirit of adventure is strong: a generation lives in the upper country."),
 title:R("Les fils ne reviennent plus","The sons no longer come home"),
 text:R("Des centaines de jeunes Canadiens passent l'hiver dans l'Ouest et y fondent des familles. Les curés parlent de paroisses vides ; les commandants, d'une France nouvelle aux Grands Lacs.","Hundreds of young Canadians winter in the West and raise families there. Priests speak of empty parishes; commandants, of a new France on the Great Lakes."),
 choices:[
  {label:R("Fonder des paroisses au Détroit et aux Illinois","Found parishes at Detroit and in the Illinois"),fx:s=>{s.flags.paysdenhaut=true;s.pop-=200;relAdd(s,'ouest',6);traitAdd(s,'alliance',3);s.off.eve+=4;return R("Des villages canadiens s'alignent le long du Détroit, avec leur église et leurs moulins.","Canadian villages line the Detroit, with their church and their mills.");}},
  {label:R("Les rappeler à la colonie","Call them back to the colony"),fx:s=>{traitAdd(s,'aventure',-5);s.off.int+=6;s.pop+=80;relAdd(s,'ouest',-4);return R("Quelques-uns reviennent. Les autres ont déjà choisi.","A few come back. The rest have already chosen.");}}]});

cq({id:'cq_conseil',place:'villeMarie',cond:s=>s.year>=1702&&s.traits.alliance>=60&&s.rel.ouest>=45&&s.rel.alg>=30,w:s=>2+(s.traits.alliance-58)/5,
 because:s=>R("L'alliance avec les nations est devenue profonde : mariages, missions, guerres partagées.","The alliance with the nations has grown deep: marriages, missions, shared wars."),
 title:R("Un grand conseil permanent","A permanent great council"),
 text:R("Les nations alliées proposent que le grand conseil de Montréal se réunisse chaque année, avec Onontio non plus comme « père » mais comme frère aîné, et que les décisions de guerre s'y prennent ensemble.","The allied nations propose that the great council of Montréal meet every year, with Onontio no longer as 'father' but as elder brother, and that decisions of war be taken there together."),
 choices:[
  {label:R("Accepter : une confédération","Accept: a confederacy"),fx:s=>{s.flags.conseilNations=true;for(const k of ['innu','alg','abenaki','ouest'])relAdd(s,k,8);traitAdd(s,'alliance',6);traitAdd(s,'roi',-4);s.compagnie-=6;return R("Le conseil de Montréal devient une institution. Versailles n'a pas été consulté ; les nations, si.","The Montréal council becomes an institution. Versailles was not consulted; the nations were.");}},
  {label:R("Rester le père des nations","Remain father of the nations"),fx:s=>{relAdd(s,'ouest',-3);s.compagnie+=2;return R("Onontio reste père. Les nations repartent polies et un peu froides.","Onontio remains father. The nations leave polite and a little cool.");}}]});

cq({id:'cq_louisbourg',place:'louisbourg',cond:s=>s.places.louisbourg&&s.year>=1725,w:s=>2,
 because:s=>R("Louisbourg est devenue un grand port de pêche et de commerce.","Louisbourg has become a great fishing and trading port."),
 title:R("Les Bostonnais à Louisbourg","Bostonians at Louisbourg"),
 text:R("Des navires de Boston déchargent à Louisbourg bois, farine et briques, contre du rhum et de la mélasse des Antilles. C'est interdit, et indispensable.","Boston ships unload timber, flour and bricks at Louisbourg, in exchange for West Indies rum and molasses. It is forbidden, and indispensable."),
 choices:[
  {label:R("Tolérer ce commerce","Tolerate the trade"),fx:s=>{s.treasury+=1500;s.compagnie-=3;s.food+=s.pop*.05;return R("Louisbourg mange à sa faim, grâce à ses ennemis.","Louisbourg eats its fill, thanks to its enemies.");}},
  {label:R("L'interdire","Ban it"),fx:s=>{s.compagnie+=3;s.flags.lbgStr=(s.flags.lbgStr||40)-8;return R("Les navires de Boston repartent. L'hiver est long à l'île Royale.","The Boston ships leave. Winter is long on Île Royale.");}}]});
