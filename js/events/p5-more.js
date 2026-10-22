/* Kebec — Période V : conséquences, luttes sociales, imprévus, nouvelles du monde, images. */
(()=>{
const E5=[];
const cq=e=>{e.period=5;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;E5.push(e);};
const sy=e=>{e.period=5;e.sys=true;e.max=e.max||2;e.cool=e.cool||12;E5.push(e);};
const T=traitAdd,ra=relAdd;
const M=(s,f)=>Math.round((s.revT||1e6)*f);

/* ---------- conséquences de vos choix ---------- */
cq({id:'cq5_flq',place:'villeMarie',cond:s=>(s.flq||0)>=45&&!s.flags.octobre,w:s=>1+s.flq/20,
 because:s=>R("Le nationalisme monte sans débouché politique : les plus jeunes se radicalisent.","Nationalism rises without a political outlet: the youngest radicalize."),
 title:R("Une cellule du FLQ","An FLQ cell"),
 text:R("Une bombe explose à la Bourse de Montréal : vingt-sept blessés. Le FLQ revendique l'attentat. Les journaux réclament des mesures exceptionnelles.","A bomb explodes at the Montreal Stock Exchange: twenty-seven injured. The FLQ claims responsibility. The papers demand exceptional measures."),
 choices:[
  {label:R("Ouvrir une voie démocratique : parler aux souverainistes","Open a democratic path: talk to the sovereigntists"),fx:s=>{s.flq-=20;s.patri+=2;s.off.gov-=4;return R("Le gouvernement reconnaît la légitimité de l'option souverainiste. Les poseurs de bombes perdent leurs sympathisants.","The government recognizes the legitimacy of the sovereigntist option. The bombers lose their sympathizers.");}},
  {label:R("Rafles et escouade spéciale","Raids and a special squad"),fx:s=>{s.flq-=12;T(s,'ouverture',-2);s.off.gov+=4;return R("Des dizaines d'arrestations. Quelques-unes de trop.","Dozens of arrests. A few too many.");}}]});

cq({id:'cq5_exode',place:'villeMarie',cond:s=>s.out5>220000&&s.year>=1976,w:s=>2+s.out5/200000,
 because:s=>R(`Plus de ${nf(Math.round(s.out5/10000)*10000,lang)} Québécois sont partis pour le reste du Canada depuis 1960.`,`More than ${nf(Math.round(s.out5/10000)*10000,lang)} Quebecers have left for the rest of Canada since 1960.`),
 title:R("Le Québec anglais s'en va","English Quebec is leaving"),
 text:R("Des camions de déménagement sur l'autoroute 401. Les écoles anglaises de l'Ouest de l'île ferment l'une après l'autre ; Alliance Québec réclame des garanties pour la communauté.","Moving trucks on Highway 401. The English schools of the West Island close one after another; Alliance Québec demands guarantees for the community."),
 choices:[
  {label:R("Garantir les institutions anglophones : écoles, hôpitaux, universités","Guarantee English institutions: schools, hospitals, universities"),fx:s=>{s.flags.garantiesAng=true;s.out5=Math.round(s.out5*.85);s.off.mar+=6;s.patri-=1;return R("Le réseau anglophone est protégé par la loi. Les départs ralentissent.","The English network is protected by law. Departures slow down.");}},
  {label:R("Un Québec français, pour tous","A French Quebec, for everyone"),fx:s=>{s.patri+=2;s.off.mar-=4;return R("Ceux qui restent apprennent le français ; leurs enfants seront les plus bilingues du pays.","Those who stay learn French; their children will be the most bilingual in the country.");}}]});

cq({id:'cq5_natalite',place:'quebec',cond:s=>s.year>=1985&&pw(CBR5,s.year)<.014&&!s.flags.allocNaiss,w:s=>2,
 because:s=>R("Les Québécoises ont en moyenne 1,4 enfant : le plus faible taux de fécondité du monde occidental.","Quebec women have 1.4 children on average: the lowest fertility rate in the Western world."),
 title:R("La revanche des berceaux est finie","The revenge of the cradle is over"),
 text:R("Le Québec, qui avait la plus forte natalité du continent, a maintenant l'une des plus faibles. Sans immigration, la population commencera à baisser vers 2020. Faut-il payer pour des bébés ?","Quebec, which had the highest birth rate on the continent, now has one of the lowest. Without immigration, the population will start declining around 2020. Should the state pay for babies?"),
 choices:[
  {label:R("Une allocation à la naissance : 8 000 $ au troisième enfant","A birth allowance: $8,000 for the third child"),fx:s=>{s.flags.allocNaiss=true;s.treasury-=M(s,.04);return R("Les naissances remontent un peu, pour quelques années.","Births rise a little, for a few years.");}},
  {label:R("Des garderies et des congés parentaux","Daycare and parental leave"),fx:s=>{s.flags.allocNaiss=true;s.flags.garderies=true;s.treasury-=M(s,.06);T(s,'entraide',3);return R("Les femmes concilient mieux travail et famille. L'effet sur les naissances est lent, mais durable.","Women balance work and family better. The effect on births is slow, but lasting.");}},
  {label:R("Miser sur l'immigration","Bet on immigration"),fx:s=>{s.flags.immigrationPlus=true;s.budget.langue=Math.min(60,(s.budget.langue||5)+5);return R("Le Québec ouvre ses portes plus grand. Il faudra les franciser.","Quebec opens its doors wider. They will have to learn French.");}}]});

cq({id:'cq5_mtl',place:'villeMarie',cond:s=>s.year>=1970&&s.fraFrac<.3&&s.allo/s.pop>.06,w:s=>2+(.3-s.fraFrac)*10,
 because:s=>R(`Sept enfants d'immigrants sur dix adoptent l'anglais.`,`Seven immigrant children in ten adopt English.`),
 title:R("Montréal bascule","Montreal tips over"),
 text:R("Les démographes le répètent : si rien ne change, Montréal sera majoritairement anglophone avant l'an 2000. Les enfants d'immigrants grossissent les écoles anglaises ; le français recule dans l'Ouest de l'île.","Demographers keep saying it: if nothing changes, Montreal will be mostly English-speaking before 2000. Immigrant children swell the English schools; French retreats in the West Island."),
 choices:[
  {label:R("L'école française pour les enfants d'immigrants","French school for immigrant children"),fx:s=>{s.orient.langue5='charte';s.off.mar-=6;s.patri+=3;return R("La loi est votée. Les commissions scolaires anglophones vont en cour.","The law passes. The English school boards go to court.");}},
  {label:R("Des classes d'accueil et des incitations","Welcome classes and incentives"),fx:s=>{s.orient.langue5='incitation';s.budget.langue=Math.min(60,(s.budget.langue||5)+5);return R("Des COFI ouvrent partout. Les résultats sont modestes.","Language centres open everywhere. The results are modest.");}}]});

cq({id:'cq5_greve',place:'villeMarie',cond:s=>s.year>=1965&&clsG(s,'ouvriers')>=60,w:s=>1+clsG(s,'ouvriers')/30,max:2,
 because:s=>R("Les salariés estiment ne pas recevoir leur juste part.","Workers feel they are not getting their fair share."),
 title:R("La grève générale","The general strike"),
 text:R("Après la Firestone, la United Aircraft, le Front commun : les grèves se multiplient, longues et dures. Des briseurs de grève entrent par la porte arrière, la police escorte les autobus.","After Firestone, United Aircraft, the Common Front: strikes multiply, long and bitter. Strikebreakers come in through the back door; police escort the buses."),
 choices:[
  {label:R("Une loi anti-briseurs de grève","An anti-strikebreaker law"),fx:s=>{s.flags.antiBriseurs=true;s.off.eve+=12;s.off.mar-=10;T(s,'entraide',2);return R("Le Québec interdit les briseurs de grève, une première en Amérique du Nord. Les conflits raccourcissent.","Quebec bans strikebreakers, a first in North America. Disputes get shorter.");}},
  {label:R("Des lois spéciales, à répétition","Special laws, over and over"),fx:s=>{s.off.eve-=12;s.off.mar+=6;s.support-=2;return R("Le travail reprend, la colère reste.","Work resumes; the anger remains.");}}]});

cq({id:'cq5_decote',place:'villeMarie',cond:s=>s.dette>=38,w:s=>2+(s.dette-38)/5,
 because:s=>R(`La dette du Québec dépasse ${Math.round(s.dette)} % de son économie.`,`Quebec's debt exceeds ${Math.round(s.dette)}% of its economy.`),
 title:R("Moody's décote le Québec","Moody's downgrades Quebec"),
 text:R("L'agence de notation abaisse la cote de crédit du Québec. Chaque point de taux d'intérêt coûte des centaines de millions. Les marchés de New York attendent un signal.","The rating agency lowers Quebec's credit rating. Every point of interest costs hundreds of millions. The New York markets await a signal."),
 choices:[
  {label:R("Un plan de redressement : couper les dépenses","A recovery plan: cut spending"),fx:s=>{s.orient.finances5='austerite';s.off.mar+=8;s.off.eve-=8;return R("Les marchés applaudissent. Les syndicats préparent la riposte.","Markets applaud. Unions prepare to strike back.");}},
  {label:R("Hausser les impôts","Raise taxes"),fx:s=>{s.treasury+=M(s,.08);s.dette-=1;s.support-=5;s.eco-=1;return R("Les Québécois deviennent les contribuables les plus taxés du continent.","Quebecers become the most heavily taxed people on the continent.");}}]});

cq({id:'cq5_cris',place:'radisson',cond:s=>s.flags.baieJames&&(s.rel.cri||0)<=-35,w:s=>2,
 because:s=>R("Les Cris s'estiment dépossédés de leur territoire.","The Cree feel dispossessed of their land."),
 title:R("Les Cris à l'ONU","The Cree at the UN"),
 text:R("Le Grand Conseil des Cris porte sa cause devant les Nations unies et les parlements européens. Les images du réservoir de LG-2, des caribous noyés, du mercure dans les poissons font le tour du monde.","The Grand Council of the Crees takes its case to the United Nations and European parliaments. Pictures of the LG-2 reservoir, drowned caribou, mercury in the fish go around the world."),
 choices:[
  {label:R("Rouvrir la négociation : de nation à nation","Reopen negotiations: nation to nation"),fx:s=>{s.orient.nord5='negocier';ra(s,'cri',18);s.treasury-=M(s,.04);T(s,'alliance',3);return R("Une table permanente est créée. La confiance revient lentement.","A permanent table is created. Trust returns slowly.");}},
  {label:R("Faire valoir les droits du Québec sur son territoire","Assert Quebec's rights over its territory"),fx:s=>{ra(s,'cri',-8);s.patri+=1;return R("Les Cris déclarent qu'en cas de souveraineté, ils resteront au Canada avec leurs terres.","The Cree declare that if Quebec becomes sovereign, they will stay in Canada with their land.");}}]});

cq({id:'cq5_pression',place:'quebec',cond:s=>s.souv>=55&&s.year-(s.lastRef||0)>=6&&!s.flags.oui,w:s=>1+(s.souv-55)/5,
 because:s=>R(`${Math.round(s.souv)} % des francophones sont souverainistes, et aucun référendum n'est prévu.`,`${Math.round(s.souv)}% of francophones are sovereigntists, and no referendum is planned.`),
 title:R("« Le Québec aux Québécois ! »","'Quebec for Quebecers!'"),
 text:R("Cent mille personnes dans les rues de Montréal pour réclamer un référendum. Les sondages n'ont jamais été aussi favorables à la souveraineté. Le moment est-il venu ?","A hundred thousand people in the streets of Montreal demanding a referendum. The polls have never been so favourable to sovereignty. Has the time come?"),
 choices:[
  {label:R("Annoncer un référendum","Announce a referendum"),fx:s=>{s.flags.refAsk=true;s.flags.refSoon=true;return R("Le référendum aura lieu l'an prochain. Le dollar canadien plonge.","The referendum will take place next year. The Canadian dollar plunges.");}},
  {label:R("Attendre des conditions gagnantes","Wait for winning conditions"),fx:s=>{s.souv-=2;s.support-=2;return R("La ferveur retombe un peu. Elle n'a pas disparu.","The fervour subsides a little. It has not disappeared.");}}]});

cq({id:'cq5_statut',place:'quebec',cond:s=>s.flags.statutProgramme&&!s.flags.statutParticulier&&s.year>=1972,w:s=>2,
 because:s=>R("Le gouvernement a promis un statut particulier pour le Québec.","The government promised special status for Quebec."),
 title:R("Le statut particulier","Special status"),
 text:R("Le Québec demande d'être une province pas comme les autres : pleins pouvoirs en culture, en communications, en immigration, en politique sociale. Ottawa peut dire oui à une partie, ou à rien.","Quebec asks to be a province unlike the others: full powers over culture, communications, immigration, social policy. Ottawa can say yes to part of it, or to nothing."),
 choices:[
  {label:R("Négocier une entente asymétrique","Negotiate an asymmetric deal"),fx:s=>{const p=clamp(.25+(s.off.gov||0)/200+(/Pearson|Mulroney|Clark/.test(officer5(s,'gov').name)?.2:0),.05,.8);if(Math.random()<p){s.flags.statutParticulier=true;s.autonomy+=8;s.souv-=8;return R("Ottawa accepte : le Québec obtient un statut particulier, inscrit dans une nouvelle constitution.","Ottawa accepts: Quebec obtains special status, written into a new constitution.");}
   s.patri+=4;s.souv+=4;s.off.gov-=6;return R("Ottawa refuse : « Il n'y aura pas de statut particulier. » La déception nourrit les souverainistes.","Ottawa refuses: 'There will be no special status.' Disappointment feeds the sovereigntists.");}},
  {label:R("Y renoncer","Give it up"),fx:s=>{s.flags.statutProgramme=false;s.patri-=1;return R("Le Québec redevient une province comme les autres, du moins sur papier.","Quebec becomes a province like the others again, at least on paper.");}}]});

/* ---------- les imprévus de l'époque ---------- */
sy({id:'sy5_scandale',place:'quebec',cond:s=>s.year>=1962,max:2,cool:12,
 title:R("Un scandale de financement","A funding scandal"),
 text:R("Une commission d'enquête révèle que des entrepreneurs ont versé des pots-de-vin au parti au pouvoir en échange de contrats publics.","An inquiry reveals that contractors paid kickbacks to the ruling party in exchange for public contracts."),
 choices:[
  {label:R("Une loi sur le financement des partis","A party-financing law"),fx:s=>{s.flags.financementPartis=true;s.support-=2;T(s,'ouverture',1);return R("Seuls les électeurs pourront désormais financer les partis, et pour de petites sommes.","Only voters may now fund parties, and only small sums.");}},
  {label:R("Sacrifier un ministre","Sacrifice a minister"),fx:s=>{s.flags.scandale=true;return R("Le ministre démissionne. Les électeurs ne sont pas dupes.","The minister resigns. The voters are not fooled.");}}]});

sy({id:'sy5_fermeture',place:'gaspe',cond:s=>s.year>=1970&&s.chom>=10,max:2,cool:10,
 title:R("Une usine ferme en région","A plant closes in the regions"),
 text:R("La papetière, la mine ou la base militaire ferme. Une ville de cinq mille habitants perd son seul employeur. Le maire demande de l'aide à Québec.","The paper mill, the mine or the military base closes. A town of five thousand loses its only employer. The mayor asks Québec for help."),
 choices:[
  {label:R("Racheter l'usine avec la SGF","Buy the plant through the SGF"),fx:s=>{s.treasury-=M(s,.03);s.etat+=1;s.support+=2;return R("L'usine reprend, à perte. La ville survit.","The plant restarts, at a loss. The town survives.");}},
  {label:R("Aider les travailleurs à se recycler","Help the workers retrain"),fx:s=>{s.treasury-=M(s,.01);return R("Les jeunes partent pour Montréal. Les vieux restent.","The young leave for Montreal. The old stay.");}}]});

E5.push({period:5,id:'manic1965',place:'baieComeau',cond:s=>s.year>=1964&&s.flags.hydro2,
 title:R("Manic-5","Manic-5"),
 text:R("Hydro-Québec propose le plus grand barrage à voûtes multiples du monde, sur la rivière Manicouagan. Les lignes à 735 000 volts, une invention québécoise, porteraient le courant jusqu'à Montréal.","Hydro-Québec proposes the world's largest multiple-arch dam, on the Manicouagan River. 735,000-volt lines, a Quebec invention, would carry the power to Montreal."),
 choices:[
  {label:R("Construire Manic-5","Build Manic-5"),hist:true,fx:s=>{s.flags.manic=true;s.dette+=1;s.eco+=2;ra(s,'innu',-5);s.patri+=1;return R("« Manic » devient un symbole : la chanson de Georges Dor fait pleurer les ingénieurs.","'Manic' becomes a symbol: Georges Dor's song makes engineers weep.");}},
  {label:R("Acheter l'électricité de Terre-Neuve","Buy power from Newfoundland"),fx:s=>{s.flags.churchillContrat=true;s.eco+=1;return R("Le contrat de Churchill Falls, signé pour soixante-cinq ans, sera une mine d'or pour Hydro-Québec, et une plaie pour Terre-Neuve.","The Churchill Falls contract, signed for sixty-five years, will be a gold mine for Hydro-Québec, and a sore for Newfoundland.");}}]});

/* ---------- les nouvelles du monde ---------- */
WORLD.push(
 {y:1961,k:'science',t:R("Gagarine","Gagarin"),x:R("Le premier homme dans l'espace est soviétique. La course à la Lune commence.","The first man in space is Soviet. The race to the Moon begins.")},
 {y:1962,k:'monde',t:R("Vatican II","Vatican II"),x:R("Le pape Jean XXIII ouvre un concile : la messe en français, l'Église ouverte au monde. Au Québec, les églises commencent pourtant à se vider.","Pope John XXIII opens a council: Mass in French, a Church open to the world. In Quebec, the churches are nonetheless beginning to empty.")},
 {y:1962,k:'monde',t:R("L'Algérie indépendante","Algeria independent"),x:R("Après huit ans de guerre, l'Algérie devient indépendante. Les jeunes nationalistes québécois lisent Frantz Fanon.","After eight years of war, Algeria becomes independent. Young Quebec nationalists read Frantz Fanon.")},
 {y:1963,k:'amerique',t:R("Dallas","Dallas"),x:R("Le président Kennedy est assassiné. Martin Luther King avait fait son discours « I have a dream » trois mois plus tôt.","President Kennedy is assassinated. Martin Luther King had given his 'I have a dream' speech three months earlier.")},
 {y:1965,k:'amerique',t:R("L'unifolié","The Maple Leaf"),x:R("Le Canada adopte un drapeau à feuille d'érable, sans Union Jack. Une partie du Canada anglais ne s'en remet pas.","Canada adopts a maple-leaf flag, without the Union Jack. Part of English Canada never gets over it.")},
 {y:1968,k:'france',t:R("Mai 68","May '68"),x:R("Les étudiants occupent la Sorbonne, les ouvriers les usines. « Il est interdit d'interdire. » Les cégépiens d'ici occupent leurs collèges à l'automne.","Students occupy the Sorbonne, workers the factories. 'It is forbidden to forbid.' Local CEGEP students occupy their colleges in the fall.")},
 {y:1969,k:'science',t:R("La Lune","The Moon"),x:R("Neil Armstrong marche sur la Lune. Le Québec regarde à la télévision, en direct de Radio-Canada.","Neil Armstrong walks on the Moon. Quebec watches on television, live on Radio-Canada.")},
 {y:1973,k:'monde',t:R("Le choc pétrolier","The oil shock"),x:R("L'OPEP quadruple le prix du pétrole. L'électricité du Nord québécois devient soudain précieuse.","OPEC quadruples the price of oil. Northern Quebec's electricity suddenly becomes precious.")},
 {y:1975,k:'monde',t:R("La fin de la guerre du Vietnam","The end of the Vietnam War"),x:R("Saïgon tombe. Des milliers de réfugiés vietnamiens, les « boat people », trouveront refuge au Québec.","Saigon falls. Thousands of Vietnamese refugees, the 'boat people', will find refuge in Quebec.")},
 {y:1979,k:'monde',t:R("La révolution iranienne","The Iranian revolution"),x:R("Deuxième choc pétrolier ; les taux d'intérêt vont s'envoler.","A second oil shock; interest rates are about to soar.")},
 {y:1981,k:'science',t:R("L'ordinateur personnel","The personal computer"),x:R("IBM lance son PC. Dans les cégeps, on apprend le BASIC.","IBM launches its PC. In the CEGEPs, students learn BASIC.")},
 {y:1985,k:'monde',t:R("Gorbatchev","Gorbachev"),x:R("La glasnost et la perestroïka : l'Union soviétique se met à changer.","Glasnost and perestroika: the Soviet Union begins to change.")},
 {y:1989,k:'monde',t:R("Le mur de Berlin","The Berlin Wall"),x:R("Le mur tombe. En deux ans, quinze républiques soviétiques deviendront des pays. Les souverainistes québécois prennent des notes.","The Wall falls. Within two years, fifteen Soviet republics will become countries. Quebec sovereigntists take notes.")},
 {y:1991,k:'monde',t:R("La fin de l'URSS","The end of the USSR"),x:R("L'Union soviétique se dissout. L'Estonie, la Lettonie, la Lituanie, l'Ukraine sont reconnues en quelques semaines.","The Soviet Union dissolves. Estonia, Latvia, Lithuania and Ukraine are recognized within weeks.")},
 {y:1993,k:'monde',t:R("La Tchécoslovaquie se divise","Czechoslovakia splits"),x:R("Le « divorce de velours » : la Tchéquie et la Slovaquie se séparent sans un coup de feu.","The 'velvet divorce': the Czech Republic and Slovakia separate without a shot fired.")},
 {y:1994,k:'amerique',t:R("L'ALENA","NAFTA"),x:R("Le libre-échange s'étend au Mexique. Les usines de textile de Montréal ferment ; l'aéronautique et le multimédia prennent le relais.","Free trade extends to Mexico. Montreal's textile mills close; aerospace and multimedia take over.")},
 {y:1995,k:'science',t:R("Internet","The Internet"),x:R("Le Web entre dans les foyers. Une langue y domine : l'anglais.","The Web enters homes. One language dominates it: English.")},
 {y:1999,k:'monde',t:R("L'euro","The euro"),x:R("Onze pays d'Europe adoptent une monnaie commune. Une union sans fusion : les souverainistes y voient un modèle.","Eleven European countries adopt a common currency. A union without merger: sovereigntists see a model.")},
 {y:2000,k:'science',t:R("L'an 2000","The year 2000"),x:R("Le bogue tant redouté n'a pas lieu. Un siècle se termine ; celui des Canadiens français aussi.","The dreaded bug doesn't happen. A century ends; so does that of the French Canadians.")});

/* ---------- les images (Wikimedia Commons) ---------- */
Object.assign(IMG,{
 p5_title:{c:R("Laurent Bélanger, Habitat 67 et les îles de l'Expo, mai 1967 (CC BY-SA 3.0)","Laurent Bélanger, Habitat 67 and the Expo islands, May 1967 (CC BY-SA 3.0)"),f:"Expo 67, Habitat 67, et vue vers les îles de l'Expo..jpg"},
 p5_expo:{c:R("Expo 67, juillet 1967 (CC BY-SA 4.0)","Expo 67, July 1967 (CC BY-SA 4.0)"),f:'1967 July Expo 67 Montreal (3).jpg'},
 p5_assemblee:{c:R("L'hôtel du Parlement, Québec (photo Marc Lautenbacher, CC BY-SA 4.0)","The Parliament Building, Québec (photo Marc Lautenbacher, CC BY-SA 4.0)"),f:'Hôtel du Parlement - Québec, façade.jpg'},
 p5_drapeau:{c:R("Le fleurdelisé, drapeau du Québec depuis 1948","The fleurdelisé, Quebec's flag since 1948"),f:'Flag of Quebec.svg'},
 p5_levesque:{c:R("René Lévesque, 18 octobre 1960","René Lévesque, 18 October 1960"),f:'René Lévesque, 18 octobre 1960.jpg'},
 p5_bourassa:{c:R("Robert Bourassa (photo Thomas Kierans, CC BY-SA 4.0)","Robert Bourassa (photo Thomas Kierans, CC BY-SA 4.0)"),f:'Robert-Bourassa.jpg'},
 p5_parizeau:{c:R("Jacques Parizeau, 1976 (BAnQ, CC BY-SA 3.0)","Jacques Parizeau, 1976 (BAnQ, CC BY-SA 3.0)"),f:'Jacques Parizeau BAnQ P243S1D5069.jpg'},
 p5_bouchard:{c:R("Lucien Bouchard (photo Antoine Taveneaux, CC BY-SA 3.0)","Lucien Bouchard (photo Antoine Taveneaux, CC BY-SA 3.0)"),f:'Lucien Bouchard1.jpg'},
 p5_trudeau:{c:R("Pierre Elliott Trudeau, 1968 (ONF)","Pierre Elliott Trudeau, 1968 (NFB)"),f:'Pierre Elliott Trudeau portrait 1968 (cropped).jpg'},
 p5_mulroney:{c:R("Brian Mulroney, 1984","Brian Mulroney, 1984"),f:'Brian Mulroney in 1984 (cropped).jpg'},
 p5_pearson:{c:R("Lester B. Pearson, 1963","Lester B. Pearson, 1963"),f:'Lester B. Pearson (1963 ABC press photo).jpg'},
 p5_chretien:{c:R("Jean Chrétien, 1996","Jean Chrétien, 1996"),f:'Jean Chrétien, 1996.jpg'},
 p5_manic:{c:R("Le barrage Daniel-Johnson (Manic-5) (CC BY-SA 3.0)","The Daniel-Johnson Dam (Manic-5) (CC BY-SA 3.0)"),f:'Barrage Daniel-Johnson2 edited.jpg'},
 p5_lg2:{c:R("La construction de la centrale La Grande-2, vers 1977 (CC BY-SA 4.0)","Building the La Grande-2 power station, about 1977 (CC BY-SA 4.0)"),f:'Construction de la centrale hydroélectrique La Grande-2.png'},
 p5_degaulle:{c:R("Le général de Gaulle à Montréal, 24 juillet 1967","General de Gaulle in Montreal, 24 July 1967"),f:'Photo PLM+CDG 1.jpg'},
 p5_octobre:{c:R("Un robot démineur des Forces canadiennes, crise d'Octobre 1970 (CC BY-SA 4.0)","A Canadian Forces bomb-disposal robot, October Crisis 1970 (CC BY-SA 4.0)"),f:"Robot des forces canadiennes lors de la crise d'octobre de 1970.jpg"},
 p5_stade:{c:R("Le Parc olympique de Montréal (photo Paolo Costa Baldi, CC BY 3.0)","Montreal's Olympic Park (photo Paolo Costa Baldi, CC BY 3.0)"),f:'Montreal - Olympic Park panorama - Cropped version.jpg'},
 p5_oka:{c:R("La Sûreté du Québec et les Forces canadiennes à Oka, 3 septembre 1990 (CC BY-SA 3.0)","The Sûreté du Québec and the Canadian Forces at Oka, 3 September 1990 (CC BY-SA 3.0)"),f:"Crise d'Oka - SQ et forces canadiennes.jpg"},
 p5_vigneault:{c:R("Gilles Vigneault à Natashquan, 1989 (CC BY-SA 3.0)","Gilles Vigneault at Natashquan, 1989 (CC BY-SA 3.0)"),f:'Gilles Vigneault Chantauvent Natashquan 1989.jpg'},
 p5_tremblay:{c:R("Michel Tremblay (CC BY-SA 4.0)","Michel Tremblay (CC BY-SA 4.0)"),f:'Michel Tremblay (cropped).jpg'},
 p5_laurin:{c:R("Camille Laurin (CC BY-SA 3.0)","Camille Laurin (CC BY-SA 3.0)"),f:'Camille Laurin.jpg'},
 p5_harper:{c:R("Elijah Harper, 1990","Elijah Harper, 1990"),f:'Elijah Harper (1990).jpg'},
 p5_gerinlajoie:{c:R("Paul Gérin-Lajoie et le cardinal Léger, 1962 (CC BY-SA 3.0)","Paul Gérin-Lajoie and Cardinal Léger, 1962 (CC BY-SA 3.0)"),f:'Paul Gérin-Lajoie et Paul-Émile Léger, 1962.png'},
 p5_verglas:{c:R("La tempête de verglas vue par satellite, 9 janvier 1998","The ice storm seen by satellite, 9 January 1998"),f:'1998 Ice Storm GOES8-ir-1998-01-09-0015TU.png'},
});
Object.assign(GOV_IMG,{'René Lévesque':'p5_levesque','Robert Bourassa':'p5_bourassa','Jacques Parizeau':'p5_parizeau','Lucien Bouchard':'p5_bouchard','Pierre Elliott Trudeau':'p5_trudeau','Brian Mulroney':'p5_mulroney','Lester B. Pearson':'p5_pearson','Jean Chrétien':'p5_chretien'});
Object.assign(EVENT_IMG,{lesage1960:'p4_lesage',parent1961:'p5_gerinlajoie',bill60_1964:'p5_gerinlajoie',hydro1962:'p5_levesque',manic1965:'p5_manic',expo1967:'p5_expo',metro1966:'p5_title',degaulle1967:'p5_degaulle',pq1968:'p5_levesque',
 belles1968:'p5_tremblay',fetenat1975:'p5_vigneault',octobre1970:'p5_octobre',cq5_flq:'p5_octobre',flq1963:'p5_octobre',baiejames1971:'p5_lg2',malouf1973:'p5_lg2',conventionbj1975:'p5_lg2',grandebaleine1994:'p5_lg2',cq5_cris:'p5_lg2',
 olympiques1976:'p5_stade',loi101_1977:'p5_laurin',cq5_mtl:'p5_laurin',stleonard1968:'p5_laurin',victoria1971:'p5_trudeau',rapatriement1981:'p5_trudeau',meech1987:'p5_mulroney',meech1990:'p5_harper',beaurisque1984:'p5_mulroney',libreechange1988:'p5_mulroney',
 oka1990:'p5_oka',verglas1998:'p5_verglas',clarte2000:'p5_chretien',virage1995:'p5_bouchard',bloc1993:'p5_bouchard',deficit1996:'p5_bouchard',livreblanc1979:'p5_levesque',nations1985:'p5_levesque',decrets1982:'p5_parizeau',
 'V:ref':'p5_drapeau','V:nego':'p5_assemblee','E:elec5':'p5_assemblee',belanger1990:'p5_assemblee',charlottetown1992:'p5_mulroney',rentes1964:'p5_assemblee',fulton1965:'p5_pearson'});
EVENTS.push(...E5);for(const e of E5)EV[e.id]=e;
})();
