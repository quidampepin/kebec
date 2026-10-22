/* Kebec — Période V (1960–2000) : événements historiques datés.
   Vous êtes le gouvernement du Québec ; Ottawa, les syndicats et le capital sont des forces avec lesquelles il faut composer. */
(()=>{
const P5E=[];
const ev5=e=>{e.period=5;P5E.push(e);};
const T=traitAdd,ra=relAdd;
const M=(s,f)=>Math.round((s.revT||1e6)*f);
const gov=s=>govParty5(s);

/* ===================== 1960–1966 : la Révolution tranquille ===================== */
ev5({id:'lesage1960',place:'quebec',cond:s=>s.year>=1960,must:true,
 title:R("« C'est le temps que ça change »","'It's time for a change'"),
 text:R("L'« équipe du tonnerre » de Jean Lesage prend le pouvoir après seize ans de Duplessis. René Lévesque, ancien journaliste vedette de la télévision, Paul Gérin-Lajoie, Georges-Émile Lapalme : ils veulent un État moderne, sans patronage, qui fasse rattraper au Québec un siècle de retard.","Jean Lesage's 'thunder team' takes power after sixteen years of Duplessis. René Lévesque, a former TV star journalist, Paul Gérin-Lajoie, Georges-Émile Lapalme: they want a modern state, without patronage, that will make Quebec catch up a century."),
 choices:[
  {label:R("Le grand ménage : fonction publique de carrière, fin du patronage","The big clean-up: a career civil service, an end to patronage"),hist:true,fx:s=>{s.etat+=6;s.support+=3;s.off.eve+=6;T(s,'ouverture',3);return R("Les contrats sont soumis aux appels d'offres, les fonctionnaires recrutés par concours. Les jeunes diplômés affluent à Québec.","Contracts go to tender, civil servants are hired by competition. Young graduates flock to Québec City.");}},
  {label:R("Réformer doucement, sans brusquer l'Église ni les comtés","Reform gently, without upsetting the Church or the ridings"),fx:s=>{s.etat+=2;s.church+=3;s.support+=1;return R("On garde les vieilles habitudes là où elles rapportent des votes. La Révolution sera moins tranquille… et plus lente.","Old habits stay where they win votes. The Revolution will be less quiet… and slower.");}}]});

ev5({id:'parent1961',place:'quebec',cond:s=>s.year>=1961,
 title:R("La commission Parent","The Parent Commission"),
 text:R("Le Québec a le plus faible taux de scolarisation du Canada : la moitié des jeunes quittent l'école avant quinze ans. Une commission présidée par Mgr Alphonse-Marie Parent examine tout le système, des écoles de rang aux collèges classiques.","Quebec has the lowest school enrolment in Canada: half of young people leave school before fifteen. A commission chaired by Msgr Alphonse-Marie Parent reviews the whole system, from country schools to classical colleges."),
 choices:[
  {label:R("Lui donner carte blanche : une école publique, gratuite, pour tous","Give it free rein: a public, free school for all"),hist:true,fx:s=>{s.flags.rapportParent=true;s.edu+=3;s.treasury-=M(s,.04);return R("Le rapport, en cinq tomes, propose un ministère de l'Éducation, des polyvalentes, des cégeps et une université publique.","The five-volume report proposes a ministry of education, comprehensive high schools, CEGEPs and a public university.");}},
  {label:R("Moderniser, mais laisser les écoles aux commissions confessionnelles","Modernize, but leave the schools to the religious boards"),fx:s=>{s.edu+=1;s.church+=3;s.off.eve-=3;return R("Les collèges classiques survivent ; les filles et les fils d'ouvriers restent sur le pas de la porte.","The classical colleges survive; workers' daughters and sons stay on the doorstep.");}}]});

ev5({id:'hydro1962',place:'shawinigan',cond:s=>s.year>=1962,must:true,
 title:R("« Maîtres chez nous »","“Masters in our own house”"),
 text:R("René Lévesque, ministre des Ressources naturelles, veut nationaliser les onze compagnies privées d'électricité : la Shawinigan Water & Power, la Gatineau Power… Hydro-Québec deviendrait le levier économique des Québécois. Il faudrait emprunter 600 millions à New York. Lesage hésite, puis déclenche des élections sur la question.","René Lévesque, minister of natural resources, wants to nationalize the eleven private power companies: Shawinigan Water & Power, Gatineau Power… Hydro-Québec would become Quebecers' economic lever. It would mean borrowing 600 million in New York. Lesage hesitates, then calls an election on the issue."),
 choices:[
  {label:R("Nationaliser : « Maîtres chez nous »","Nationalize: 'Masters in our own house'"),hist:true,g:{technocrates:6,ouvriers:3,capital:-10},fx:s=>{s.flags.hydro2=true;s.dette+=4;s.etat+=8;s.foreign-=6;s.off.mar-=10;s.patri+=4;s.support+=5;T(s,'entraide',2);return R("Le 1er mai 1963, Hydro-Québec achète les compagnies. Les ingénieurs francophones prennent les commandes ; les contrats vont aux firmes d'ici.","On 1 May 1963, Hydro-Québec buys the companies. Francophone engineers take charge; contracts go to local firms.");}},
  {label:R("Réglementer les tarifs, sans acheter","Regulate rates, without buying"),fx:s=>{s.off.mar+=6;s.eco+=1;s.patri-=2;return R("Les compagnies baissent un peu leurs tarifs. Lévesque menace de démissionner.","The companies lower their rates a little. Lévesque threatens to resign.");}}]});

ev5({id:'sgf1962',place:'villeMarie',cond:s=>s.year>=1962,
 title:R("La Société générale de financement","The Société générale de financement"),
 text:R("Les entreprises francophones manquent de capital : les banques anglo-canadiennes prêtent ailleurs. L'État pourrait créer une société d'investissement, avec l'épargne des Québécois, pour bâtir des entreprises d'ici.","Francophone firms lack capital: the Anglo-Canadian banks lend elsewhere. The state could create an investment company, with Quebecers' savings, to build local businesses."),
 choices:[
  {label:R("Créer la SGF","Create the SGF"),hist:true,fx:s=>{s.flags.sgf=true;s.treasury-=M(s,.05);s.etat+=3;return R("La SGF achète Marine Industries, Volcano, Forano. Tout ne réussit pas, mais un capital francophone naît.","The SGF buys Marine Industries, Volcano, Forano. Not everything succeeds, but francophone capital is born.");}},
  {label:R("Laisser faire les banques","Leave it to the banks"),fx:s=>{s.off.mar+=4;return R("Les entreprises d'ici restent petites ; les grandes viennent d'ailleurs.","Local firms stay small; the big ones come from elsewhere.");}}]});

ev5({id:'flq1963',place:'villeMarie',cond:s=>s.year>=1963,
 title:R("Les bombes du FLQ","The FLQ bombs"),
 text:R("Le Front de libération du Québec pose des bombes dans des boîtes aux lettres de Westmount et contre des casernes. Un gardien de nuit, Wilfred O'Neill, est tué. Une poignée de jeunes rêvent d'une révolution « à la cubaine ».","The Front de libération du Québec plants bombs in Westmount mailboxes and against army barracks. A night watchman, Wilfred O'Neill, is killed. A handful of young people dream of a 'Cuban-style' revolution."),
 choices:[
  {label:R("La police, les procès, rien de plus","Police, trials, nothing more"),hist:true,fx:s=>{s.flq=Math.max(0,(s.flq||0)-8);return R("Les poseurs de bombes sont arrêtés. D'autres cellules prendront la relève.","The bombers are arrested. Other cells will take over.");}},
  {label:R("Une escouade antiterroriste et des pouvoirs spéciaux","An anti-terrorist squad and special powers"),fx:s=>{s.flq=Math.max(0,(s.flq||0)-15);T(s,'ouverture',-2);s.patri+=1;return R("Les perquisitions se multiplient. Le FLQ recule, la méfiance aussi s'installe.","Raids multiply. The FLQ falls back; mistrust also sets in.");}}]});

ev5({id:'bill60_1964',place:'quebec',cond:s=>s.year>=1964&&s.flags.rapportParent,
 title:R("Un ministère de l'Éducation","A ministry of education"),
 text:R("Le bill 60 crée le premier ministère de l'Éducation depuis 1875. Les évêques s'y opposent : l'école doit rester catholique. Paul Gérin-Lajoie négocie : les comités confessionnels resteront, mais le ministre décide.","Bill 60 creates the first ministry of education since 1875. The bishops oppose it: school must remain Catholic. Paul Gérin-Lajoie negotiates: the denominational committees will stay, but the minister decides."),
 choices:[
  {label:R("Créer le ministère, avec des comités confessionnels","Create the ministry, with denominational committees"),hist:true,fx:s=>{s.flags.ministereEduc=true;s.flags.ministereAboli=false;s.edu+=4;s.church-=4;T(s,'ouverture',2);return R("Gérin-Lajoie devient ministre. Polyvalentes, autobus scolaires, gratuité : l'école se démocratise.","Gérin-Lajoie becomes minister. Comprehensive schools, school buses, free tuition: schooling is democratized.");}},
  {label:R("Une école laïque, tout de suite","A secular school, right away"),fx:s=>{s.flags.ministereEduc=true;s.flags.ministereAboli=false;s.flags.ecoleLaique=true;s.edu+=5;s.church-=8;s.support-=4;T(s,'ferveur',-3);return R("Le Québec rattrape la France de Jules Ferry en une seule loi. Les curés tonnent en chaire ; les campagnes grondent.","Quebec catches up with Jules Ferry's France in a single law. Priests thunder from the pulpit; the countryside grumbles.");}}]});

ev5({id:'kirkland1964',place:'quebec',cond:s=>s.year>=1964,
 title:R("La loi 16 : l'égalité des époux","Bill 16: equality of spouses"),
 text:R("Claire Kirkland-Casgrain, première femme élue à l'Assemblée, propose de mettre fin à l'incapacité juridique de la femme mariée : sans son mari, elle ne peut ni signer un contrat, ni ouvrir un compte, ni exercer une profession.","Claire Kirkland-Casgrain, the first woman elected to the Assembly, proposes to end the legal incapacity of married women: without her husband, she can neither sign a contract, open an account, nor practise a profession."),
 choices:[
  {label:R("Adopter la loi","Pass the bill"),hist:true,fx:s=>{T(s,'ouverture',3);s.support+=1;return R("Les Québécoises deviennent des personnes juridiques à part entière. La Fédération des femmes du Québec naît deux ans plus tard.","Quebec women become full legal persons. The Fédération des femmes du Québec is born two years later.");}},
  {label:R("Attendre la réforme du Code civil","Wait for the Civil Code reform"),fx:s=>{T(s,'ouverture',-1);return R("La réforme attendra. Les femmes, elles, n'attendent plus.","The reform will wait. Women no longer do.");}}]});

ev5({id:'rentes1964',place:'quebec',cond:s=>s.year>=1964,
 title:R("Le régime de rentes et la Caisse de dépôt","The pension plan and the Caisse de dépôt"),
 text:R("Ottawa veut un régime de pensions pancanadien. Lesage arrive à la conférence de Québec avec un plan meilleur : un régime québécois, dont les cotisations formeraient un immense fonds d'investissement, aux mains du Québec. Pearson recule.","Ottawa wants a Canada-wide pension plan. Lesage arrives at the Québec conference with a better plan: a Quebec plan whose contributions would form a huge investment fund, in Quebec's hands. Pearson backs down."),
 choices:[
  {label:R("Le Régie des rentes et la Caisse de dépôt et placement","The Régie des rentes and the Caisse de dépôt et placement"),hist:true,fx:s=>{s.flags.regieRentes=true;s.flags.caisse=true;s.autonomy+=4;s.etat+=4;s.off.gov-=4;s.off.mar-=4;return R("En 1966, la Caisse commence à placer l'épargne des Québécois. Elle deviendra l'un des plus gros investisseurs du continent.","In 1966, the Caisse starts investing Quebecers' savings. It will become one of the biggest investors on the continent.");}},
  {label:R("Adhérer au Régime de pensions du Canada","Join the Canada Pension Plan"),fx:s=>{s.off.gov+=8;s.autonomy-=2;return R("Les cotisations partent à Ottawa. Le Québec a une pension ; il n'a pas de caisse.","Contributions go to Ottawa. Quebec gets a pension; it does not get a fund.");}}]});

ev5({id:'fulton1965',place:'bytown',cond:s=>s.year>=1965,
 title:R("La formule Fulton-Favreau","The Fulton-Favreau formula"),
 text:R("Ottawa et les provinces s'entendent sur une formule pour modifier la Constitution, encore une loi britannique. Le Québec aurait un droit de veto… comme toutes les provinces. Les nationalistes y voient une « camisole de force » : plus jamais de pouvoirs nouveaux pour le Québec.","Ottawa and the provinces agree on a formula to amend the Constitution, still a British statute. Quebec would have a veto… like every province. Nationalists see it as a 'straitjacket': never again new powers for Quebec."),
 choices:[
  {label:R("Retirer l'appui du Québec","Withdraw Quebec's support"),hist:true,fx:s=>{s.autonomy+=2;s.patri+=2;s.off.gov-=4;return R("La formule meurt. La Constitution reste à Londres, pour l'instant.","The formula dies. The Constitution stays in London, for now.");}},
  {label:R("Signer : un veto vaut mieux que rien","Sign: a veto is better than nothing"),fx:s=>{s.flags.formuleSignee=true;s.autonomy-=2;s.off.gov+=8;s.patri-=2;return R("La Constitution est rapatriée en 1966, avec l'accord du Québec. Les nationalistes crient à la trahison.","The Constitution is patriated in 1966, with Quebec's agreement. Nationalists cry betrayal.");}}]});

ev5({id:'metro1966',place:'villeMarie',cond:s=>s.year>=1966,
 title:R("Le métro de Montréal","The Montreal metro"),
 text:R("Le maire Jean Drapeau inaugure le métro, sur pneumatiques comme à Paris. Il veut maintenant l'Exposition universelle, et une ville digne des grandes capitales.","Mayor Jean Drapeau opens the metro, on rubber tires like in Paris. Now he wants the World's Fair, and a city worthy of great capitals."),
 choices:[
  {label:R("Financer le prolongement","Fund the extension"),hist:true,fx:s=>{s.treasury-=M(s,.03);s.eco+=1;return R("Longueuil et l'île Sainte-Hélène sont reliées. Montréal se donne des airs de métropole.","Longueuil and Île Sainte-Hélène are linked. Montreal gives itself the airs of a metropolis.");}},
  {label:R("Laisser Montréal payer","Let Montreal pay"),fx:s=>{s.treasury+=M(s,.01);return R("Drapeau trouve l'argent ailleurs, et ne l'oublie pas.","Drapeau finds the money elsewhere, and does not forget it.");}}]});

/* ===================== 1967–1970 : l'éveil ===================== */
ev5({id:'expo1967',place:'villeMarie',cond:s=>s.year>=1967,must:true,
 title:R("Terre des Hommes","Man and His World"),
 text:R("Cinquante millions de visiteurs, soixante pays, Habitat 67, la Biosphère : Montréal reçoit le monde pour le centenaire du Canada. Les Québécois découvrent qu'ils peuvent être modernes, et en français.","Fifty million visitors, sixty countries, Habitat 67, the Biosphere: Montreal hosts the world for Canada's centennial. Quebecers discover they can be modern, and in French."),
 choices:[
  {label:R("Une exposition grandiose","A grandiose fair"),hist:true,fx:s=>{s.flags.expo67=true;s.dette+=1;s.treasury-=M(s,.03);T(s,'aventure',5);T(s,'ouverture',4);s.eco+=2;return R("L'été 67 restera le plus bel été de la Révolution tranquille.","The summer of '67 will remain the finest summer of the Quiet Revolution.");}},
  {label:R("Une exposition modeste, sans dettes","A modest fair, without debt"),fx:s=>{s.flags.expo67=true;T(s,'aventure',2);return R("Le monde vient quand même ; il repart un peu déçu.","The world comes anyway; it leaves a little disappointed.");}}]});

ev5({id:'degaulle1967',place:'villeMarie',cond:s=>s.year>=1967&&s.flags.expo67,
 title:R("« Vive le Québec libre ! »","'Vive le Québec libre!'"),
 text:R("Du balcon de l'hôtel de ville de Montréal, le général de Gaulle lance devant la foule : « Vive le Québec… libre ! » Ottawa juge la phrase « inacceptable » ; de Gaulle écourte sa visite. Le premier ministre doit dire ce qu'il en pense.","From the balcony of Montreal city hall, General de Gaulle tells the crowd: 'Vive le Québec… libre!' Ottawa calls it 'unacceptable'; de Gaulle cuts his visit short. The premier must say what he thinks."),
 choices:[
  {label:R("Le remercier, sans endosser","Thank him, without endorsing"),hist:true,fx:s=>{s.patri+=4;s.souv+=2;s.off.gov-=6;s.flags.franceAppui=true;return R("La France ouvre ses portes : coopération, échanges, délégation du Québec à Paris. Le mot « libre » ne s'oubliera pas.","France opens its doors: cooperation, exchanges, Quebec's delegation in Paris. The word 'libre' will not be forgotten.");}},
  {label:R("Se dissocier publiquement","Publicly distance yourself"),fx:s=>{s.off.gov+=8;s.patri-=2;return R("Paris est vexé. Les nationalistes aussi.","Paris is offended. So are the nationalists.");}}]});

ev5({id:'pq1968',place:'quebec',cond:s=>s.year>=1967,must:true,
 title:R("René Lévesque quitte les libéraux","René Lévesque leaves the Liberals"),
 text:R("Au congrès libéral, René Lévesque propose un Québec souverain, associé économiquement au Canada. Il est battu et claque la porte. Avec le RIN de Pierre Bourgault et le RN de Gilles Grégoire, il pourrait fonder un parti souverainiste crédible.","At the Liberal convention, René Lévesque proposes a sovereign Quebec, economically associated with Canada. He is defeated and walks out. With Pierre Bourgault's RIN and Gilles Grégoire's RN, he could found a credible sovereigntist party."),
 choices:[
  {label:R("Il part : le Mouvement souveraineté-association, puis le Parti québécois","He leaves: the Mouvement souveraineté-association, then the Parti Québécois"),hist:true,fx:s=>{s.flags.pq=true;s.souv+=4;s.flq=Math.max(0,(s.flq||0)-6);return R("Le Parti québécois naît en octobre 1968. Le FLQ perd des recrues : la souveraineté a désormais une voie démocratique.","The Parti Québécois is born in October 1968. The FLQ loses recruits: sovereignty now has a democratic path.");}},
  {label:R("Le retenir : les libéraux adoptent un « statut particulier »","Keep him: the Liberals adopt a 'special status' program"),fx:s=>{s.autonomy+=4;s.patri+=2;s.flags.statutProgramme=true;s.off.gov-=6;return R("Lévesque reste, à condition que le parti réclame un statut particulier pour le Québec. Pas de parti souverainiste… pour l'instant. Le FLQ, lui, recrute.","Lévesque stays, provided the party demands special status for Quebec. No sovereigntist party… for now. The FLQ, however, recruits.");}}]});
LIKELY.pq1968=s=>gov(s)==='plq'&&s.flags.statutProgramme?.3:1;

ev5({id:'cegeps1967',place:'villeMarie',cond:s=>s.year>=1967&&s.flags.rapportParent,
 title:R("Les cégeps et l'Université du Québec","The CEGEPs and the Université du Québec"),
 text:R("La commission Parent propose des collèges publics, gratuits, entre le secondaire et l'université, et une université d'État en région. Les collèges classiques, tenus par des religieux, disparaîtraient.","The Parent Commission proposes public, free colleges between high school and university, and a state university in the regions. The classical colleges, run by religious orders, would disappear."),
 choices:[
  {label:R("Créer les cégeps et l'UQ","Create the CEGEPs and the UQ"),hist:true,fx:s=>{s.flags.cegeps=true;s.flags.uq=true;s.edu+=4;s.treasury-=M(s,.05);s.church-=3;return R("Vingt-trois cégeps ouvrent en deux ans, l'UQAM en 1969. Une génération entière accède aux études supérieures.","Twenty-three CEGEPs open in two years, UQAM in 1969. A whole generation gains access to higher education.");}},
  {label:R("Garder les collèges classiques, avec des bourses","Keep the classical colleges, with grants"),fx:s=>{s.edu+=1;s.church+=2;return R("Les fils de notables continuent d'étudier le latin. Les autres travaillent.","Notables' sons keep studying Latin. The others go to work.");}}]});

ev5({id:'belles1968',place:'villeMarie',cond:s=>s.year>=1968,
 title:R("Les Belles-sœurs","Les Belles-sœurs"),
 text:R("Au Rideau Vert, quinze femmes de la rue Fabre collent des timbres-primes en joual. La pièce de Michel Tremblay scandalise : on n'avait jamais parlé ainsi sur une scène. Le ministère des Affaires culturelles doit-il subventionner ce théâtre ?","At the Rideau Vert, fifteen women from rue Fabre paste trading stamps, speaking joual. Michel Tremblay's play scandalizes: no one had ever spoken like that on stage. Should the Ministry of Cultural Affairs subsidize such theatre?"),
 choices:[
  {label:R("Subventionner la création, quelle que soit sa langue","Fund creation, whatever its language"),hist:true,fx:s=>{T(s,'ouverture',2);s.patri+=2;return R("Théâtre, chanson, cinéma : Vigneault, Charlebois, Deschamps, Carle. La culture québécoise explose.","Theatre, song, cinema: Vigneault, Charlebois, Deschamps, Carle. Quebec culture explodes.");}},
  {label:R("Subventionner le « bon français »","Fund 'good French'"),fx:s=>{T(s,'ouverture',-1);return R("Les académiciens applaudissent. Le public va voir Tremblay quand même.","The purists applaud. The public goes to see Tremblay anyway.");}}]});

ev5({id:'stleonard1968',place:'villeMarie',cond:s=>s.year>=1968,
 title:R("La crise de Saint-Léonard","The Saint-Léonard crisis"),
 text:R("À Saint-Léonard, la commission scolaire décide que les enfants des immigrants italiens iront à l'école française. Les parents veulent l'école anglaise, celle de la réussite en Amérique. Il y a des émeutes. Neuf enfants d'immigrants sur dix choisissent l'anglais.","In Saint-Léonard, the school board decides that the children of Italian immigrants will go to French school. The parents want English school, the school of success in America. There are riots. Nine immigrant children in ten choose English."),
 choices:[
  {label:R("La loi 63 : le libre choix, avec des cours de français","Bill 63: free choice, with French lessons"),hist:true,fx:s=>{s.flags.stLeonard=true;s.flags.loi63=true;s.orient.langue5='libre';s.patri+=3;s.off.mar+=4;return R("Des milliers de manifestants devant le parlement : le libre choix, disent-ils, c'est l'anglicisation de Montréal.","Thousands of protesters outside parliament: free choice, they say, means the anglicization of Montreal.");}},
  {label:R("L'école française pour tous les enfants d'immigrants","French school for all immigrant children"),fx:s=>{s.flags.stLeonard=true;s.orient.langue5='charte';s.fraFrac+=.05;s.off.mar-=6;s.ang-=8000;s.rel.agnier-=2;return R("La communauté italienne s'indigne ; Ottawa aussi. Mais les enfants d'immigrants apprendront le français.","The Italian community is outraged; so is Ottawa. But immigrant children will learn French.");}}]});

ev5({id:'octobre1970',place:'villeMarie',cond:s=>s.year>=1970&&(s.flq||0)>=10,must:true,
 title:R("La crise d'Octobre","The October Crisis"),
 text:R("Le FLQ enlève le diplomate britannique James Cross, puis le ministre Pierre Laporte. Il exige la libération de « prisonniers politiques » et la lecture de son manifeste à Radio-Canada. Montréal a peur. Ottawa propose d'envoyer l'armée et de suspendre les libertés civiles.","The FLQ kidnaps British diplomat James Cross, then minister Pierre Laporte. It demands the release of 'political prisoners' and the reading of its manifesto on Radio-Canada. Montreal is afraid. Ottawa offers to send the army and suspend civil liberties."),
 choices:[
  {label:R("Demander l'armée : la Loi sur les mesures de guerre","Ask for the army: the War Measures Act"),hist:true,fx:s=>{s.flags.octobre=true;s.flags.octobreMesures=true;s.flq=0;s.off.gov+=10;s.patri+=2;T(s,'ouverture',-3);s.support+=4;return R("Près de cinq cents arrestations sans mandat, dont des poètes et des syndicalistes. Pierre Laporte est retrouvé mort. Le FLQ est fini ; le souvenir des arrestations, non.","Nearly five hundred arrests without warrant, poets and unionists among them. Pierre Laporte is found dead. The FLQ is finished; the memory of the arrests is not.");}},
  {label:R("Négocier la vie des otages","Negotiate for the hostages' lives"),fx:s=>{s.flags.octobre=true;s.flq=Math.max(0,s.flq-10);s.off.gov-=12;s.support-=4;return R("Le manifeste est lu, quelques prisonniers partent pour Cuba, les otages sont libérés. Ottawa accuse Québec de faiblesse.","The manifesto is read, a few prisoners leave for Cuba, the hostages are freed. Ottawa accuses Québec of weakness.");}},
  {label:R("La police seule, sans l'armée","The police alone, without the army"),fx:s=>{s.flags.octobre=true;s.flq=Math.max(0,s.flq-6);s.off.gov-=6;s.autonomy+=2;return R("L'enquête est longue. Les ravisseurs sont retrouvés à Saint-Luc ; Laporte n'a pas survécu.","The investigation is long. The kidnappers are found in Saint-Luc; Laporte did not survive.");}}]});

ev5({id:'assmaladie1970',place:'quebec',cond:s=>s.year>=1970,
 title:R("L'assurance maladie","Medicare"),
 text:R("Ottawa paie la moitié des régimes d'assurance maladie provinciaux. Les médecins spécialistes font la grève contre le régime québécois. Faut-il tenir bon ?","Ottawa pays half the cost of provincial medicare plans. Specialist doctors strike against Quebec's plan. Should you hold firm?"),
 choices:[
  {label:R("Une loi spéciale : les médecins rentrent, l'assurance maladie commence","A special law: the doctors go back, medicare begins"),hist:true,fx:s=>{s.flags.assuranceMaladie=true;s.etat+=3;s.treasury-=M(s,.05);s.support+=3;T(s,'entraide',2);return R("Le 1er novembre 1970, la carte-soleil fait son apparition. Puis les CLSC, en 1972.","On 1 November 1970, the health card appears. Then the CLSCs, in 1972.");}},
  {label:R("Un régime à la carte, avec frais modérateurs","A plan with user fees"),fx:s=>{s.flags.assuranceMaladie=true;s.etat+=1;s.off.eve-=6;return R("Ottawa retient une partie de ses transferts. Les syndicats dénoncent une médecine à deux vitesses.","Ottawa withholds part of its transfers. The unions denounce two-tier medicine.");}}]});

/* ===================== 1971–1976 : le projet du siècle, les fronts communs ===================== */
ev5({id:'victoria1971',place:'bytown',cond:s=>s.year>=1971&&!s.flags.formuleSignee,
 title:R("La charte de Victoria","The Victoria Charter"),
 text:R("Trudeau veut rapatrier la Constitution avec une charte des droits. Le Québec aurait un droit de veto, mais pas les pouvoirs en politique sociale que réclame Bourassa. Il a dix jours pour répondre.","Trudeau wants to patriate the Constitution with a charter of rights. Quebec would have a veto, but not the social-policy powers Bourassa demands. He has ten days to answer."),
 choices:[
  {label:R("Refuser","Refuse"),hist:true,fx:s=>{s.autonomy+=1;s.off.gov-=6;s.patri+=1;return R("Bourassa rentre à Québec et dit non. Trudeau range son projet pour dix ans.","Bourassa returns to Québec and says no. Trudeau shelves his plan for ten years.");}},
  {label:R("Accepter : un veto, une charte, le rapatriement","Accept: a veto, a charter, patriation"),fx:s=>{s.flags.victoria=true;s.autonomy-=3;s.off.gov+=12;s.souv-=3;s.patri-=2;return R("La Constitution canadienne est rapatriée en 1972, avec un veto pour le Québec. Il n'y aura pas de « nuit des longs couteaux ».","The Canadian Constitution is patriated in 1972, with a veto for Quebec. There will be no 'night of the long knives'.");}}]});

ev5({id:'baiejames1971',place:'matagami',cond:s=>s.year>=1971,must:true,
 title:R("Le projet du siècle","The project of the century"),
 text:R("Robert Bourassa annonce l'aménagement des rivières de la baie James : des barrages géants, des réservoirs grands comme des pays, 125 000 emplois promis. Personne n'a consulté les Cris, qui chassent et pêchent sur ces terres depuis des millénaires.","Robert Bourassa announces the development of the James Bay rivers: giant dams, reservoirs the size of countries, 125,000 jobs promised. No one has consulted the Cree, who have hunted and fished these lands for millennia."),
 choices:[
  {label:R("Lancer les travaux tout de suite","Start work right away"),hist:true,fx:s=>{s.flags.baieJames=true;s.dette+=2;s.eco+=2;s.support+=3;s.off.eve+=4;ra(s,'cri',-20);ra(s,'inuit',-10);return R("La route de la baie James perce la forêt boréale. À Fort George et Mistissini, on apprend la nouvelle à la radio.","The James Bay road cuts through the boreal forest. In Fort George and Mistissini, people hear the news on the radio.");}},
  {label:R("Négocier d'abord avec les Cris et les Inuit","Negotiate first with the Cree and Inuit"),fx:s=>{s.flags.baieJames=true;s.flags.conventionBJ=true;s.support-=1;ra(s,'cri',15);ra(s,'inuit',10);s.treasury-=M(s,.06);T(s,'alliance',4);return R("Trois ans de négociation retardent les travaux, mais il n'y aura pas d'injonction. Les Cris deviennent des partenaires.","Three years of talks delay the work, but there will be no injunction. The Cree become partners.");}},
  {label:R("Renoncer : trop cher, trop loin","Give it up: too expensive, too far"),fx:s=>{s.support-=4;s.eco-=1;return R("Le Québec achètera son électricité ailleurs, ou se tournera vers le nucléaire de Gentilly.","Quebec will buy its electricity elsewhere, or turn to the Gentilly nuclear plant.");}}]});

ev5({id:'frontcommun1972',place:'quebec',cond:s=>s.year>=1972,
 title:R("Le Front commun","The Common Front"),
 text:R("Pour la première fois, la CSN, la FTQ et la CEQ négocient ensemble pour 210 000 employés de l'État : un salaire minimum de 100 $ par semaine. Grève générale dans les hôpitaux et les écoles. Le gouvernement peut adopter une loi spéciale.","For the first time, the CSN, the FTQ and the CEQ bargain together for 210,000 public employees: a minimum wage of $100 a week. General strike in hospitals and schools. The government can pass a special law."),
 choices:[
  {label:R("Loi spéciale ; les trois chefs syndicaux en prison","A special law; the three union leaders to jail"),hist:true,g:{ouvriers:-10,precaires:-3,capital:4},fx:s=>{polRealign(s,'ouvriers','plq',-6);s.flags.frontCommun=true;s.off.eve-=18;s.off.mar+=6;T(s,'entraide',2);return R("Pepin, Laberge et Charbonneau font quatre mois de prison. Des villes ouvrières, comme Sept-Îles, sont occupées par les grévistes.","Pepin, Laberge and Charbonneau serve four months in jail. Working-class towns like Sept-Îles are occupied by strikers.");}},
  {label:R("Céder le 100 $ par semaine","Concede the $100 a week"),fx:s=>{s.flags.frontCommun=true;s.treasury-=M(s,.08);s.off.eve+=12;s.off.mar-=6;T(s,'entraide',3);return R("Les bas salariés de l'État font un bond. Le secteur privé suivra, de loin.","The lowest-paid public employees jump ahead. The private sector will follow, from afar.");}}]});

ev5({id:'malouf1973',place:'matagami',cond:s=>s.year>=1973&&s.flags.baieJames&&!s.flags.conventionBJ,
 title:R("Le jugement Malouf","The Malouf judgment"),
 text:R("Le juge Albert Malouf donne raison aux Cris et aux Inuit : leurs droits sur le territoire n'ont jamais été cédés. Il ordonne l'arrêt des travaux. Une semaine plus tard, la Cour d'appel suspend l'injonction. Les Cris peuvent encore tout bloquer en Cour suprême.","Judge Albert Malouf sides with the Cree and Inuit: their rights to the land were never ceded. He orders work to stop. A week later, the Court of Appeal suspends the injunction. The Cree can still block everything in the Supreme Court."),
 choices:[
  {label:R("Négocier une convention : argent, terres, autonomie","Negotiate an agreement: money, land, self-government"),hist:true,fx:s=>{s.flags.negoBJ=true;ra(s,'cri',8);ra(s,'inuit',8);return R("Billy Diamond, 24 ans, chef des Cris, s'assoit en face des négociateurs de Québec et d'Ottawa.","Billy Diamond, 24, chief of the Cree, sits across from the Québec and Ottawa negotiators.");}},
  {label:R("Continuer les travaux et plaider","Continue work and litigate"),fx:s=>{ra(s,'cri',-15);ra(s,'inuit',-10);s.flags.procesBJ=true;return R("Les travaux continuent. Le procès durera des années, et la cause des Cris fera le tour du monde.","Work continues. The trial will last years, and the Cree cause will go around the world.");}}]});

ev5({id:'conventionbj1975',place:'radisson',cond:s=>s.year>=1975&&s.flags.baieJames&&!s.flags.conventionBJ,
 title:R("La Convention de la Baie-James","The James Bay Agreement"),
 text:R("Après deux ans de négociations, une entente est prête : 225 millions de dollars, des terres réservées, des droits de chasse exclusifs, des commissions scolaires et de santé cries et inuites. En échange, les Cris et les Inuit cèdent leurs droits sur le reste du territoire.","After two years of negotiations, an agreement is ready: $225 million, reserved lands, exclusive hunting rights, Cree and Inuit school and health boards. In exchange, the Cree and Inuit surrender their rights to the rest of the territory."),
 choices:[
  {label:R("Signer la Convention","Sign the Agreement"),hist:true,fx:s=>{s.flags.conventionBJ=true;s.treasury-=M(s,.04);ra(s,'cri',25);ra(s,'inuit',22);T(s,'alliance',4);return R("Le premier traité moderne du Canada. Il fonde le Grand Conseil des Cris et la société Makivik ; il ne règle pas tout.","Canada's first modern treaty. It founds the Grand Council of the Crees and the Makivik Corporation; it does not settle everything.");}},
  {label:R("Offrir moins, et finir les travaux","Offer less, and finish the work"),fx:s=>{s.flags.conventionBJ=true;s.treasury-=M(s,.015);ra(s,'cri',6);ra(s,'inuit',4);return R("Les Cris signent, de mauvaise grâce. Ils s'en souviendront.","The Cree sign, grudgingly. They will remember.");}}]});

ev5({id:'loi22_1974',place:'quebec',cond:s=>s.year>=1974&&s.orient.langue5!=='charte',
 title:R("La loi 22 : le français, langue officielle","Bill 22: French, the official language"),
 text:R("Le français devient la seule langue officielle du Québec. Les enfants d'immigrants devront passer un test d'anglais pour aller à l'école anglaise. Les anglophones crient à l'injustice, les nationalistes à la demi-mesure.","French becomes Quebec's sole official language. Immigrant children will have to pass an English test to attend English school. Anglophones cry injustice, nationalists half-measure."),
 choices:[
  {label:R("Adopter la loi 22","Pass Bill 22"),hist:true,g:{anglos:-10,allos:-10,technocrates:-4},fx:s=>{polRealign(s,'anglos','plq',-9);polRealign(s,'allos','plq',-6);s.orient.langue5='incitation';s.flags.loi22=true;s.off.mar-=3;s.patri+=1;return R("Des enfants de sept ans passent des tests de langue. Personne n'est content ; tout le monde s'en souviendra aux élections.","Seven-year-olds take language tests. Nobody is happy; everyone will remember at election time.");}},
  {label:R("Aller plus loin : l'école française pour les immigrants","Go further: French school for immigrants"),fx:s=>{s.orient.langue5='charte';s.off.mar-=8;s.off.gov-=6;s.patri+=3;return R("Le Québec anglophone se mobilise. L'Ontario et Ottawa protestent.","English-speaking Quebec mobilizes. Ontario and Ottawa protest.");}},
  {label:R("Ne rien changer","Change nothing"),fx:s=>{s.patri+=2;s.off.mar+=3;return R("Le libre choix demeure. Montréal continue de s'angliciser, lentement.","Free choice remains. Montreal keeps anglicizing, slowly.");}}]});

ev5({id:'fetenat1975',place:'quebec',cond:s=>s.year>=1975,
 title:R("« Gens du pays »","'Gens du pays'"),
 text:R("Sur le mont Royal, pour la Saint-Jean, Gilles Vigneault chante « Gens du pays, c'est votre tour de vous laisser parler d'amour ». Des centaines de milliers de personnes. Faut-il faire du 24 juin la fête nationale du Québec ?","On Mount Royal, for Saint-Jean, Gilles Vigneault sings 'Gens du pays, c'est votre tour de vous laisser parler d'amour'. Hundreds of thousands of people. Should June 24 become Quebec's national holiday?"),
 choices:[
  {label:R("La fête nationale du Québec","Quebec's national holiday"),hist:true,fx:s=>{s.patri+=2;T(s,'roi',-1);return R("En 1977, le 24 juin devient la Fête nationale. La Saint-Jean-Baptiste devient la fête de tous les Québécois.","In 1977, June 24 becomes the Fête nationale. Saint-Jean-Baptiste becomes everyone's holiday.");}},
  {label:R("Une fête religieuse, comme avant","A religious feast, as before"),fx:s=>{s.church+=1;return R("Le mouton de saint Jean-Baptiste défile encore.","Saint John the Baptist's lamb still parades.");}}]});

ev5({id:'olympiques1976',place:'villeMarie',cond:s=>s.year>=1976,must:true,
 title:R("Les Jeux olympiques de Montréal","The Montreal Olympics"),
 text:R("« Les Olympiques ne peuvent pas plus avoir de déficit qu'un homme avoir un bébé », a dit Jean Drapeau. Le stade de Roger Taillibert n'est pas fini, les coûts explosent. Québec doit reprendre le chantier.","'The Olympics can no more have a deficit than a man can have a baby,' Jean Drapeau said. Roger Taillibert's stadium is unfinished, costs are exploding. Québec must take over the site."),
 choices:[
  {label:R("Reprendre le chantier, payer la facture","Take over the site, pay the bill"),hist:true,fx:s=>{s.flags.olympiques=true;s.dette+=1.5;T(s,'aventure',2);return R("Nadia Comaneci a dix ans de plus que la tour du stade, qui ne sera finie qu'en 1987. La dette olympique durera trente ans.","The stadium's tower won't be finished until 1987. The Olympic debt will last thirty years.");}},
  {label:R("Des Jeux modestes, sans le mât","Modest Games, without the mast"),fx:s=>{s.flags.olympiques=true;s.dette+=.5;return R("Le stade reste un cratère inachevé. Les Jeux ont lieu quand même.","The stadium stays an unfinished crater. The Games go on anyway.");}}]});

/* ===================== 1977–1982 : la loi 101, le référendum, le rapatriement ===================== */
ev5({id:'loi101_1977',place:'quebec',cond:s=>s.year>=1977&&gov(s)==='pq',must:true,
 title:R("La Charte de la langue française","The Charter of the French Language"),
 text:R("Camille Laurin dépose la loi 101 : le français, langue de l'État, du travail, du commerce et de l'affichage ; l'école française pour les enfants d'immigrants. « Le Québec sera aussi français que l'Ontario est anglais. »","Camille Laurin tables Bill 101: French as the language of the state, work, commerce and signs; French school for immigrant children. 'Quebec will be as French as Ontario is English.'"),
 choices:[
  {label:R("Adopter la loi 101 telle quelle","Pass Bill 101 as it stands"),hist:true,g:{technocrates:8,ouvriers:4,anglos:-14,allos:-8,capital:-8},fx:s=>{s.flags.loi101=true;s.orient.langue5='charte';s.patri+=4;s.off.mar-=10;s.off.gov-=8;s.ang-=12000;T(s,'ouverture',-1);return R("Les enseignes changent, les entreprises se francisent, les enfants d'immigrants vont à l'école française. Des dizaines de milliers d'anglophones partent pour Toronto.","Signs change, businesses switch to French, immigrant children go to French school. Tens of thousands of anglophones leave for Toronto.");}},
  {label:R("L'école française pour les immigrants, l'affichage bilingue","French school for immigrants, bilingual signs"),fx:s=>{s.flags.loi101=true;s.orient.langue5='charte';s.patri+=2;s.off.mar-=5;s.off.gov-=4;return R("Les anglophones grognent, mais restent davantage. Les nationalistes parlent de demi-loi.","Anglophones grumble, but more of them stay. Nationalists call it half a law.");}}]});

ev5({id:'sunlife1978',place:'villeMarie',cond:s=>s.year>=1978&&s.orient.langue5==='charte',
 title:R("La Sun Life déménage","Sun Life moves"),
 text:R("La compagnie d'assurances Sun Life annonce qu'elle transfère son siège social à Toronto, à cause de la loi 101. D'autres sièges sociaux suivent. Montréal n'est plus la métropole du Canada.","Sun Life Assurance announces it is moving its head office to Toronto, because of Bill 101. Other head offices follow. Montreal is no longer Canada's metropolis."),
 choices:[
  {label:R("Laisser partir : d'autres prendront la place","Let them go: others will take their place"),hist:true,g:{capital:-6,quebecinc:4},fx:s=>{s.eco-=2;s.foreign-=3;s.flags.quebecInc=true;s.patri+=1;return R("Une génération de patrons francophones monte en grade : Bombardier, Provigo, la Banque Nationale, Desjardins.","A generation of francophone bosses rises: Bombardier, Provigo, the National Bank, Desjardins.");}},
  {label:R("Offrir des exemptions aux sièges sociaux","Offer exemptions to head offices"),fx:s=>{s.eco+=1;s.patri-=2;s.off.mar+=6;return R("Les sièges sociaux peuvent travailler en anglais. Quelques-uns restent.","Head offices may work in English. A few stay.");}}]});

ev5({id:'cullen1978',place:'villeMarie',cond:s=>s.year>=1978,
 title:R("Choisir ses immigrants","Choosing one's immigrants"),
 text:R("Le Québec veut choisir lui-même une partie de ses immigrants, en privilégiant ceux qui parlent français : Haïtiens, Libanais, Vietnamiens, Maghrébins. Ottawa est prêt à signer une entente.","Quebec wants to choose some of its immigrants itself, favouring those who speak French: Haitians, Lebanese, Vietnamese, North Africans. Ottawa is ready to sign an agreement."),
 choices:[
  {label:R("Signer l'entente Cullen-Couture","Sign the Cullen-Couture agreement"),hist:true,fx:s=>{s.flags.selectionQc=true;s.autonomy+=2;s.off.gov+=2;return R("Le Québec sélectionne ses immigrants indépendants. La part des immigrants francophones augmente.","Quebec selects its independent immigrants. The share of French-speaking immigrants rises.");}},
  {label:R("Laisser Ottawa choisir","Let Ottawa choose"),fx:s=>{s.off.gov+=4;return R("Les immigrants continuent d'arriver sans savoir un mot de français.","Immigrants keep arriving without a word of French.");}}]});

ev5({id:'livreblanc1979',place:'quebec',cond:s=>s.year>=1978&&govParty5(s)==='pq'&&!(s.refs||[]).length,
 title:R("La nouvelle entente Québec-Canada","The new Quebec-Canada deal"),
 text:R("Le gouvernement publie son livre blanc : un Québec souverain, associé au Canada par une union économique et monétaire. Claude Ryan, chef libéral, prépare son « livre beige » sur un fédéralisme renouvelé. La campagne référendaire est lancée.","The government publishes its white paper: a sovereign Quebec, associated with Canada by an economic and monetary union. Claude Ryan, the Liberal leader, prepares his 'beige paper' on renewed federalism. The referendum campaign is launched."),
 choices:[
  {label:R("La souveraineté-association, en douceur","Sovereignty-association, gently"),hist:true,fx:s=>{s.souv+=6;s.patri+=2;s.flags.refSoon=true;return R("« Égal à égal. » Les sondages montent : le Oui et le Non sont au coude-à-coude au printemps.","'Equal to equal.' The polls rise: Yes and No are neck and neck in the spring.");}},
  {label:R("L'indépendance, et la rupture avec le Canada","Independence, and a break with Canada"),fx:s=>{s.souv+=2;s.patri+=4;s.off.gov-=8;s.eco-=2;return R("Les militants exultent ; les indécis s'inquiètent.","Activists exult; the undecided worry.");}}]});

ev5({id:'rapatriement1981',place:'bytown',cond:s=>s.year>=1981&&!s.flags.victoria&&!s.flags.formuleSignee,must:true,
 title:R("La nuit des longs couteaux","The night of the long knives"),
 text:R("Trudeau rapatrie la Constitution, avec une Charte des droits. Le Québec s'était allié à sept provinces contre lui. Dans la nuit du 4 au 5 novembre 1981, pendant que la délégation québécoise dort à Hull, les neuf autres provinces signent une entente avec Ottawa. Au matin, il reste au Québec à signer, ou non.","Trudeau patriates the Constitution, with a Charter of Rights. Quebec had allied with seven provinces against him. On the night of 4–5 November 1981, while the Quebec delegation sleeps in Hull, the nine other provinces sign a deal with Ottawa. In the morning, Quebec can sign, or not."),
 choices:[
  {label:R("Refuser de signer","Refuse to sign"),hist:true,fx:s=>{s.flags.rapatriement=true;s.autonomy-=4;s.patri+=4;s.off.gov-=10;return R("La Loi constitutionnelle de 1982 s'applique au Québec sans son accord. Aucun gouvernement québécois ne la signera.","The Constitution Act, 1982 applies to Quebec without its consent. No Quebec government will sign it.");}},
  {label:R("Signer, en échange de compensations","Sign, in exchange for compensation"),fx:s=>{s.flags.signe82=true;s.autonomy-=2;s.off.gov+=10;s.patri-=3;s.souv-=4;return R("Le Québec signe. Ottawa promet un droit de retrait avec compensation. Les nationalistes parlent de reddition.","Quebec signs. Ottawa promises opting-out with compensation. Nationalists call it surrender.");}}]});

ev5({id:'decrets1982',place:'quebec',cond:s=>s.year>=1982,
 title:R("La récession et les décrets","The recession and the decrees"),
 text:R("Les taux d'intérêt dépassent 20 %, le chômage atteint 14 %. Les revenus de l'État s'effondrent. Le gouvernement a signé de généreuses conventions collectives. Il peut emprunter encore, ou reprendre une partie des salaires de ses employés.","Interest rates top 20%, unemployment reaches 14%. State revenues collapse. The government has signed generous collective agreements. It can borrow more, or claw back part of its employees' pay."),
 choices:[
  {label:R("Décrets : couper les salaires du secteur public de 20 %","Decrees: cut public-sector pay by 20%"),hist:true,g:{technocrates:-12,ouvriers:-8},fx:s=>{polRealign(s,'technocrates','pq',-8);polRealign(s,'ouvriers','pq',-5);s.flags.decrets82=true;s.dette-=1;s.treasury+=M(s,.06);s.off.eve-=20;s.support-=4;return R("Les enseignants descendent dans la rue. Le mouvement syndical ne pardonnera pas au PQ.","Teachers take to the streets. The labour movement will not forgive.");}},
  {label:R("Emprunter et attendre la reprise","Borrow and wait for the recovery"),fx:s=>{s.dette+=3;s.off.eve+=4;s.off.mar-=4;return R("Les agences de crédit baissent la cote du Québec. La reprise viendra, la dette restera.","Credit agencies downgrade Quebec. The recovery will come; the debt will stay.");}}]});

ev5({id:'beaurisque1984',place:'quebec',cond:s=>s.year>=1984&&gov(s)==='pq'&&s.year<1988,
 title:R("Le « beau risque »","The 'beau risque'"),
 text:R("Brian Mulroney promet de ramener le Québec dans la Constitution « dans l'honneur et l'enthousiasme ». René Lévesque est tenté : laisser la souveraineté de côté, et parier sur le fédéralisme. Parizeau et d'autres ministres menacent de démissionner.","Brian Mulroney promises to bring Quebec back into the Constitution 'with honour and enthusiasm'. René Lévesque is tempted: set sovereignty aside, and bet on federalism. Parizeau and other ministers threaten to resign."),
 choices:[
  {label:R("Prendre le beau risque","Take the beau risque"),hist:true,fx:s=>{s.flags.beauRisque=true;s.off.gov+=10;s.souv-=3;s.support-=2;return R("Parizeau et six ministres démissionnent. Lévesque, épuisé, quittera la politique l'année suivante.","Parizeau and six ministers resign. Lévesque, exhausted, will leave politics the following year.");}},
  {label:R("Garder le cap : la souveraineté à la prochaine élection","Hold the line: sovereignty at the next election"),fx:s=>{s.patri+=2;s.off.gov-=6;s.support-=3;return R("Le parti se raidit. Les électeurs, eux, sont fatigués des chicanes.","The party stiffens. The voters are tired of squabbles.");}}]});

ev5({id:'nations1985',place:'quebec',cond:s=>s.year>=1985,
 title:R("La reconnaissance des nations autochtones","Recognizing the Indigenous nations"),
 text:R("René Lévesque propose à l'Assemblée nationale de reconnaître les dix nations autochtones du Québec (onze avec les Malécites, plus tard), leur droit à l'autonomie au sein du Québec, à leur culture, à leurs terres.","René Lévesque proposes that the National Assembly recognize Quebec's ten Indigenous nations (eleven with the Maliseet, later), their right to self-government within Quebec, to their culture and their lands."),
 choices:[
  {label:R("Adopter la motion","Pass the motion"),hist:true,fx:s=>{s.flags.reconnaissance85=true;for(const k of ['cri','inuit','innu','alg','agnier','abenaki','wen'])if(s.rel[k]!=null)ra(s,k,5);T(s,'alliance',3);return R("Le Québec devient la première province à reconnaître les Premières Nations comme des nations. Les ententes concrètes tarderont.","Quebec becomes the first province to recognize the First Nations as nations. Concrete agreements will be slow to come.");}},
  {label:R("Une motion, et des ententes d'autonomie gouvernementale","A motion, and self-government agreements"),fx:s=>{s.flags.reconnaissance85=true;s.treasury-=M(s,.03);for(const k of ['cri','inuit','innu','alg','agnier','abenaki','wen'])if(s.rel[k]!=null)ra(s,k,12);T(s,'alliance',6);return R("Des ententes sur le territoire, la police et l'éducation sont signées avec plusieurs nations.","Agreements on land, policing and education are signed with several nations.");}}]});

/* ===================== 1987–1992 : Meech, Oka, Charlottetown ===================== */
ev5({id:'meech1987',place:'bytown',cond:s=>s.year>=1987&&s.flags.rapatriement&&gov(s)!=='pq'&&/Mulroney/.test(officer5(s,'gov').name),must:true,
 title:R("Le lac Meech","Meech Lake"),
 text:R("Au chalet du lac Meech, Mulroney et les dix premiers ministres s'entendent sur les cinq conditions du Québec : la reconnaissance comme « société distincte », un droit de veto, des pouvoirs en immigration, un rôle dans la nomination des juges, un droit de retrait. Les provinces ont trois ans pour ratifier.","At the Meech Lake lodge, Mulroney and the ten premiers agree on Quebec's five conditions: recognition as a 'distinct society', a veto, immigration powers, a role in appointing judges, opting-out rights. The provinces have three years to ratify."),
 choices:[
  {label:R("Accepter l'entente","Accept the accord"),hist:true,fx:s=>{s.flags.meech=true;s.off.gov+=10;s.souv-=4;return R("Le Québec réintégrerait la Constitution « dans l'honneur et l'enthousiasme ». Trudeau, sorti de sa retraite, dénonce un « gâchis total ».","Quebec would rejoin the Constitution 'with honour and enthusiasm'. Trudeau, out of retirement, denounces a 'total mess'.");}},
  {label:R("Exiger davantage : les pouvoirs en culture et en communications","Demand more: powers over culture and communications"),fx:s=>{s.flags.meech=true;s.flags.meechPlus=true;s.patri+=2;s.off.gov-=4;return R("Les autres provinces se raidissent. L'entente tient, mais par un fil.","The other provinces stiffen. The accord holds, but by a thread.");}}]});

ev5({id:'loi178_1988',place:'villeMarie',cond:s=>s.year>=1988&&s.flags.loi101,
 title:R("L'affichage et la Cour suprême","Signs and the Supreme Court"),
 text:R("La Cour suprême invalide l'affichage unilingue français de la loi 101 : il viole la liberté d'expression. Le gouvernement peut invoquer la clause dérogatoire pour maintenir le français seul à l'extérieur, au risque de faire dérailler Meech au Canada anglais.","The Supreme Court strikes down Bill 101's French-only signs: they violate freedom of expression. The government can invoke the notwithstanding clause to keep French-only outdoor signs, at the risk of derailing Meech in English Canada."),
 choices:[
  {label:R("La loi 178 : le français seul dehors, la clause dérogatoire","Bill 178: French only outdoors, the notwithstanding clause"),hist:true,g:{anglos:-12,allos:-6,technocrates:3},fx:s=>{polRealign(s,'anglos','plq',-10);polRealign(s,'allos','plq',-4);s.flags.loi178=true;s.patri+=2;s.off.gov-=6;s.ang-=3000;return R("Trois ministres anglophones démissionnent ; le Parti Égalité fait élire quatre députés. Au Manitoba et à Terre-Neuve, on se demande pourquoi accepter Meech.","Three anglophone ministers resign; the Equality Party elects four members. In Manitoba and Newfoundland, people wonder why they should accept Meech.");}},
  {label:R("Le bilinguisme, avec le français prédominant","Bilingualism, with French predominant"),fx:s=>{s.flags.loi178Annulee=true;s.patri-=1;s.off.gov+=6;s.souv-=1;return R("Les nationalistes protestent. Le Canada anglais applaudit, un peu.","Nationalists protest. English Canada applauds, a little.");}}]});

ev5({id:'libreechange1988',place:'villeMarie',cond:s=>s.year>=1988,
 title:R("Le libre-échange","Free trade"),
 text:R("Mulroney propose un accord de libre-échange avec les États-Unis. L'Ontario et les syndicats s'y opposent. Le Québec, souverainistes et fédéralistes ensemble, y voit une façon de moins dépendre du marché canadien.","Mulroney proposes a free-trade agreement with the United States. Ontario and the unions oppose it. Quebec, sovereigntists and federalists alike, sees a way to depend less on the Canadian market."),
 choices:[
  {label:R("Appuyer le libre-échange","Back free trade"),hist:true,g:{quebecinc:6,capital:6,ouvriers:-4},fx:s=>{s.flags.libreEchange=true;s.eco+=2;s.off.gov+=4;s.off.eve-=6;return R("Le Québec vote massivement pour Mulroney en 1988. L'accord entre en vigueur en 1989.","Quebec votes massively for Mulroney in 1988. The agreement comes into force in 1989.");}},
  {label:R("S'y opposer, avec les syndicats","Oppose it, with the unions"),fx:s=>{s.off.eve+=6;s.off.gov-=4;return R("L'accord passe quand même. Le Québec a choisi le mauvais camp.","The agreement passes anyway. Quebec picked the wrong side.");}}]});

ev5({id:'meech1990',place:'bytown',cond:s=>s.year>=1990&&s.flags.meech&&!s.flags.meechDone,must:true,
 title:R("Le 23 juin 1990","23 June 1990"),
 text:R("Date limite de ratification de l'accord du lac Meech. Au Manitoba, le député cri Elijah Harper, une plume d'aigle à la main, refuse son consentement : les Premières Nations n'ont jamais été consultées. Terre-Neuve annule son vote. Le premier ministre peut attendre, ou tenter une dernière concession.","The deadline for ratifying the Meech Lake Accord. In Manitoba, Cree member Elijah Harper, an eagle feather in hand, withholds his consent: the First Nations were never consulted. Newfoundland cancels its vote. The premier can wait, or try one last concession."),
 choices:[
  {label:R("Attendre le verdict","Await the verdict"),hist:true,fx:s=>meechVerdict5(s,0)},
  {label:R("Une dernière concession : un « Canada-clause » et un rôle pour les autochtones","A last concession: a 'Canada clause' and a role for Indigenous peoples"),fx:s=>{s.patri-=2;return meechVerdict5(s,.12);}}]});
window.meechVerdict5=(s,bonus)=>{s.flags.meechDone=true;
  const ind=((s.rel.cri||0)+(s.rel.innu||0)+(s.rel.agnier||0))/3;
  const p=clamp(.15+bonus+((s.pol?s.pol.cen.op:56)-56)*.012+(ind>25?.1:ind<-15?-.08:0)+(s.off.gov||0)/400,.03,.85);
  if(Math.random()<p){s.flags.societeDistincte=true;s.souv-=8;s.off.gov+=10;return R("Le Manitoba et Terre-Neuve ratifient de justesse. Le Québec signe la Constitution : il est reconnu comme société distincte.","Manitoba and Newfoundland ratify by a hair. Quebec signs the Constitution: it is recognized as a distinct society.");}
  s.flags.meechDead=true;s.patri+=6;s.support+=3;
  return R("L'accord meurt. Le premier ministre se lève à l'Assemblée : « Le Québec est, aujourd'hui et pour toujours, une société distincte, libre et capable d'assumer son destin. » Le lendemain, la Saint-Jean est immense.","The accord dies. The premier rises in the Assembly: 'Quebec is, today and forever, a distinct society, free and able to take charge of its destiny.' The next day, Saint-Jean is immense.");};

ev5({id:'oka1990',place:'stEustache',cond:s=>s.year>=1990,must:true,
 title:R("Oka","Oka"),
 text:R("À Kanesatake, des Mohawks barricadent une pinède où la municipalité d'Oka veut agrandir un terrain de golf, sur un cimetière ancestral. La Sûreté du Québec donne l'assaut ; le caporal Marcel Lemay est tué. Les Mohawks de Kahnawake bloquent le pont Mercier. Le face-à-face dure.","At Kanesatake, Mohawks barricade a pine grove where the town of Oka wants to expand a golf course, over an ancestral cemetery. The Sûreté du Québec storms it; Corporal Marcel Lemay is killed. The Mohawks of Kahnawake block the Mercier Bridge. The standoff drags on."),
 choices:[
  {label:R("Demander l'armée canadienne","Call in the Canadian army"),hist:true,fx:s=>{s.flags.oka=true;ra(s,'agnier',-25);for(const k of ['cri','innu','alg'])ra(s,k,-5);s.support+=2;T(s,'alliance',-4);return R("Soixante-dix-huit jours de crise. À Châteauguay, des foules lancent des pierres sur des voitures de familles mohawks. Le golf ne sera jamais agrandi.","Seventy-eight days of crisis. In Châteauguay, crowds stone cars carrying Mohawk families. The golf course will never be expanded.");}},
  {label:R("Négocier : acheter la pinède, retirer la SQ","Negotiate: buy the pines, withdraw the SQ"),fx:s=>{s.flags.oka=true;s.flags.okaNego=true;ra(s,'agnier',10);s.support-=4;s.treasury-=M(s,.01);T(s,'alliance',3);return R("Ottawa achète les terres. Les barricades tombent après trois semaines. Une partie de l'opinion parle de capitulation.","Ottawa buys the land. The barricades come down after three weeks. Part of the public calls it capitulation.");}}]});

ev5({id:'belanger1990',place:'quebec',cond:s=>s.year>=1990&&s.flags.meechDead,
 title:R("La commission Bélanger-Campeau","The Bélanger-Campeau Commission"),
 text:R("Après l'échec de Meech, une commission parlementaire sur l'avenir du Québec entend des centaines de mémoires. Plus de 60 % des Québécois se disent souverainistes. Elle recommande un référendum sur la souveraineté… ou sur des offres du Canada.","After Meech fails, a parliamentary commission on Quebec's future hears hundreds of briefs. Over 60% of Quebecers say they are sovereigntists. It recommends a referendum on sovereignty… or on offers from Canada."),
 choices:[
  {label:R("La loi 150 : un référendum en 1992, sur la souveraineté ou sur des offres","Bill 150: a referendum in 1992, on sovereignty or on offers"),hist:true,fx:s=>{s.flags.loi150=true;s.off.gov+=2;return R("Le gouvernement gagne du temps. Ottawa prépare des offres.","The government buys time. Ottawa prepares offers.");}},
  {label:R("Un référendum sur la souveraineté, tout de suite","A referendum on sovereignty, right away"),fx:s=>{s.flags.refAsk=true;s.lastRef=Math.min(s.lastRef||0,s.year-5);s.off.gov-=10;return R("Le référendum aura lieu dans l'année. Le Canada anglais se réveille en sursaut.","The referendum will take place this year. English Canada wakes with a start.");}}]});

ev5({id:'charlottetown1992',place:'bytown',cond:s=>s.year>=1992&&s.flags.meechDead&&!s.flags.oui,
 title:R("L'entente de Charlottetown","The Charlottetown Accord"),
 text:R("Ottawa et les provinces proposent une nouvelle entente : société distincte, Sénat élu, autonomie gouvernementale autochtone, 25 % des sièges aux Communes garantis au Québec. Un référendum pancanadien aura lieu le 26 octobre.","Ottawa and the provinces propose a new accord: distinct society, an elected Senate, Indigenous self-government, 25% of Commons seats guaranteed to Quebec. A Canada-wide referendum will be held on 26 October."),
 choices:[
  {label:R("Faire campagne pour le Oui à l'entente","Campaign for Yes to the accord"),hist:true,fx:s=>{const p=clamp(.08+(s.fed-55)*.01+(s.off.gov||0)/400+((s.pol?s.pol.cen.op:50)-50)*.006,.03,.6);if(Math.random()<p){s.flags.societeDistincte=true;s.souv-=8;return R("L'entente est approuvée de justesse. Le Québec signe la Constitution, avec le statut de société distincte.","The accord is narrowly approved. Quebec signs the Constitution, with distinct-society status.");}
   s.flags.charlottetownDead=true;s.support-=3;return R("Le Non l'emporte au Québec (57 %) et dans l'Ouest, pour des raisons opposées. La voie constitutionnelle est fermée.","No wins in Quebec (57%) and in the West, for opposite reasons. The constitutional road is closed.");}},
  {label:R("La rejeter : trop peu, trop tard","Reject it: too little, too late"),fx:s=>{s.flags.charlottetownDead=true;s.patri+=2;s.off.gov-=8;return R("Le Québec fait campagne pour le Non. L'entente meurt partout.","Quebec campaigns for No. The accord dies everywhere.");}}]});

ev5({id:'bloc1993',place:'bytown',cond:s=>s.year>=1993,
 title:R("Le Bloc québécois","The Bloc Québécois"),
 text:R("Lucien Bouchard, ancien ministre de Mulroney, a quitté le gouvernement fédéral après Meech pour fonder le Bloc québécois. Aux élections fédérales, le Bloc remporte 54 sièges et devient l'opposition officielle à Ottawa.","Lucien Bouchard, a former Mulroney minister, left the federal government after Meech to found the Bloc Québécois. In the federal election, the Bloc wins 54 seats and becomes Ottawa's Official Opposition."),
 choices:[
  {label:R("Un allié à Ottawa","An ally in Ottawa"),hist:true,fx:s=>{s.flags.bloc=true;s.patri+=2;s.souv+=1;s.off.gov-=4;return R("Des souverainistes forment l'opposition de Sa Majesté. Bouchard devient la figure la plus populaire du Québec.","Sovereigntists form Her Majesty's Loyal Opposition. Bouchard becomes Quebec's most popular figure.");}},
  {label:R("Garder ses distances","Keep your distance"),fx:s=>{s.flags.bloc=true;s.off.gov+=2;return R("Le Bloc fait son chemin sans vous.","The Bloc makes its way without you.");}}]});

ev5({id:'grandebaleine1994',place:'radisson',cond:s=>s.year>=1991&&s.flags.baieJames,
 title:R("Grande-Baleine","Great Whale"),
 text:R("Hydro-Québec veut harnacher la Grande rivière de la Baleine. Les Cris font campagne à New York : ils descendent l'Hudson en canot, convainquent l'État de New York d'annuler un contrat d'électricité de 17 milliards. Le projet est-il encore rentable ?","Hydro-Québec wants to dam the Great Whale River. The Cree campaign in New York: they paddle down the Hudson, persuade New York State to cancel a $17-billion power contract. Is the project still profitable?"),
 choices:[
  {label:R("Mettre le projet sur la glace","Put the project on ice"),hist:true,fx:s=>{ra(s,'cri',12);ra(s,'inuit',8);s.eco-=1;return R("Le projet Grande-Baleine est abandonné en 1994. Une décennie plus tard, la « Paix des Braves » fera des Cris des partenaires d'Hydro.","The Great Whale project is abandoned in 1994. A decade later, the 'Peace of the Braves' will make the Cree partners of Hydro.");}},
  {label:R("Construire malgré tout","Build anyway"),fx:s=>{s.flags.grandeBaleine=true;s.dette+=2;ra(s,'cri',-25);ra(s,'inuit',-15);s.eco+=1;return R("Les contrats d'exportation manquent ; les manifestations se multiplient à New York et en Europe.","Export contracts are lacking; protests multiply in New York and Europe.");}},
  {label:R("Le faire en partenariat avec les Cris","Do it in partnership with the Cree"),fx:s=>{s.flags.paixBraves=true;s.treasury-=M(s,.05);ra(s,'cri',20);T(s,'alliance',4);return R("Une entente de nation à nation : redevances, emplois, cogestion du territoire. Un précédent.","A nation-to-nation agreement: royalties, jobs, co-management of the land. A precedent.");}}]});

ev5({id:'virage1995',place:'quebec',cond:s=>s.year>=1995&&gov(s)==='pq'&&!(s.refs||[]).some(r=>r.y>=1990),
 title:R("Le virage","The shift"),
 text:R("Les sondages donnent 40 % au Oui. Lucien Bouchard, chef du Bloc, exige un « virage » : une offre formelle de partenariat économique et politique avec le Canada, et un rôle de négociateur en chef pour lui-même.","Polls give Yes 40%. Lucien Bouchard, the Bloc leader, demands a 'shift': a formal offer of economic and political partnership with Canada, and the role of chief negotiator for himself."),
 choices:[
  {label:R("Accepter : Bouchard négociateur en chef","Accept: Bouchard as chief negotiator"),hist:true,fx:s=>{s.flags.bouchard=true;s.souv+=2;return R("L'entente du 12 juin réunit le PQ, le Bloc et l'ADQ de Mario Dumont. La campagne sera menée par Bouchard.","The 12 June agreement unites the PQ, the Bloc and Mario Dumont's ADQ. The campaign will be led by Bouchard.");}},
  {label:R("Refuser : la souveraineté, sans conditions","Refuse: sovereignty, no strings"),fx:s=>{s.patri+=1;s.souv-=1;return R("Bouchard fait campagne sans enthousiasme. L'ADQ reste neutre.","Bouchard campaigns without enthusiasm. The ADQ stays neutral.");}}]});

ev5({id:'deficit1996',place:'quebec',cond:s=>s.year>=1996&&(s.dette||0)>=30,
 title:R("Le déficit zéro","The zero deficit"),
 text:R("La dette approche la moitié de l'économie. Le premier ministre convoque un sommet avec les patrons, les syndicats et les groupes communautaires : éliminer le déficit en quatre ans. Il faudra couper dans la santé et l'éducation, mettre des milliers d'infirmières à la retraite.","The debt approaches half the economy. The premier convenes a summit with employers, unions and community groups: eliminate the deficit in four years. Health and education will have to be cut, thousands of nurses retired."),
 choices:[
  {label:R("Le déficit zéro : couper partout","The zero deficit: cut everywhere"),hist:true,g:{technocrates:-8,ouvriers:-6,precaires:-8,capital:5,quebecinc:4},fx:s=>{polRealign(s,'ouvriers','pq',-4);s.flags.deficitZero=true;s.orient.finances5='austerite';s.off.eve-=10;s.off.mar+=8;s.support-=3;return R("En 1998, le budget est équilibré. Les urgences débordent ; les garderies à 5 $ naissent en même temps.","In 1998, the budget is balanced. Emergency rooms overflow; $5 daycare is born at the same time.");}},
  {label:R("Étaler l'effort, protéger la santé","Spread the effort, protect health care"),fx:s=>{s.dette+=1;s.off.eve+=4;s.off.mar-=4;return R("Les agences de notation grognent. Les hôpitaux respirent.","Rating agencies grumble. Hospitals breathe.");}}]});

ev5({id:'verglas1998',place:'villeMarie',cond:s=>s.year>=1998,
 title:R("Le verglas","The ice storm"),
 text:R("Cinq jours de pluie verglaçante. Les pylônes d'Hydro-Québec s'effondrent comme des châteaux de cartes : 1,4 million de foyers sans électricité, au cœur de janvier, dans le « triangle noir » de la Montérégie.","Five days of freezing rain. Hydro-Québec's pylons collapse like houses of cards: 1.4 million homes without power, in the heart of January, in Montérégie's 'black triangle'."),
 choices:[
  {label:R("L'armée, Hydro, les bénévoles : tout le monde au front","The army, Hydro, volunteers: everyone to the front"),hist:true,fx:s=>{s.treasury-=M(s,.04);T(s,'entraide',3);s.support+=2;return R("Des refuges dans chaque école. On se souviendra des voisins qui ont partagé leur poêle à bois.","Shelters in every school. People will remember the neighbours who shared their wood stove.");}},
  {label:R("Laisser Hydro réparer, à son rythme","Let Hydro repair, at its own pace"),fx:s=>{s.support-=4;return R("Certains villages restent un mois dans le noir.","Some villages stay a month in the dark.");}}]});

ev5({id:'clarte2000',place:'bytown',cond:s=>s.year>=1999&&(s.refs||[]).length>0&&!s.flags.oui,
 title:R("La loi sur la clarté","The Clarity Act"),
 text:R("Ottawa fait voter une loi : c'est la Chambre des communes qui jugera si une question référendaire est « claire » et si une majorité est suffisante. Le gouvernement du Québec répond par sa propre loi : le peuple québécois décide seul de son avenir, à 50 % plus un.","Ottawa passes a law: the House of Commons will judge whether a referendum question is 'clear' and whether a majority is enough. Quebec's government replies with its own law: the Quebec people alone decide their future, by 50% plus one."),
 choices:[
  {label:R("La loi 99 : 50 % plus un","Bill 99: 50% plus one"),hist:true,fx:s=>{s.patri+=2;s.autonomy+=1;s.off.gov-=6;return R("Deux lois se répondent. La question de fond reste entière.","Two laws answer each other. The underlying question remains.");}},
  {label:R("Laisser passer","Let it pass"),fx:s=>{s.off.gov+=4;s.souv-=2;return R("Le Québec ne réplique pas. Les souverainistes y voient un aveu.","Quebec does not reply. Sovereigntists see it as an admission.");}}]});

/* ---------- les affaires qui n'existent que si tel parti gouverne ---------- */
(()=>{const need={loi22_1974:['plq','un'],beaurisque1984:['pq'],virage1995:['pq'],deficit1996:['pq','plq']};
  for(const id in need){const e=P5E.find(x=>x.id===id);if(!e)continue;const c=e.cond;e.cond=s=>need[id].includes(govParty5(s))&&c(s);}})();

Object.assign(DIVERGE,{
 pq1968:R("Dans l'histoire, René Lévesque quitte les libéraux et fonde le Parti québécois en 1968. Ici, il reste : le Québec réclame un statut particulier.","In history, René Lévesque left the Liberals and founded the Parti Québécois in 1968. Here, he stays: Quebec demands special status."),
 octobre1970:R("Dans l'histoire, la crise d'Octobre éclate en 1970. Ici, le FLQ n'a plus assez de recrues pour frapper.","In history, the October Crisis broke out in 1970. Here, the FLQ no longer has enough recruits to strike.")});
EVENTS.push(...P5E);for(const e of P5E)EV[e.id]=e;
})();
