/* Kebec — Période IV : conséquences, luttes sociales, imprévus, nouvelles du monde. */
(()=>{
const E4=[];
const hist=e=>{e.period=4;E4.push(e);};
const cq=e=>{e.period=4;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;E4.push(e);};
const sy=e=>{e.period=4;e.sys=true;e.max=e.max||2;e.cool=e.cool||12;E4.push(e);};
const T=traitAdd,ra=relAdd;
const M=(s,f)=>Math.round((s.revT||1e6)*f);

/* ---------- jalons historiques secondaires ---------- */
hist({id:'valleyfield1900',place:'villeMarie',cond:s=>s.year>=1900,
 title:R("La grève de Valleyfield","The Valleyfield strike"),
 text:R("À Salaberry-de-Valleyfield, les ouvriers de la Montreal Cotton débraient pour quelques sous de plus. La compagnie demande la milice. Les soldats arrivent de Montréal, baïonnette au canon.","At Salaberry-de-Valleyfield, the Montreal Cotton workers walk out for a few more cents. The company asks for the militia. Soldiers arrive from Montréal, bayonets fixed."),
 choices:[
  {label:R("Laisser la milice protéger l'usine","Let the militia protect the mill"),hist:true,fx:s=>{s.off.mar+=5;return R("Des pierres volent, des soldats sont blessés. La grève est brisée ; le souvenir, non.","Stones fly, soldiers are wounded. The strike is broken; the memory is not.");}},
  {label:R("Rappeler la milice et proposer une médiation","Recall the militia and propose mediation"),fx:s=>{s.off.mar-=6;s.flags.arbitrage=true;return R("Le maire et le curé négocient une hausse modeste. Les patrons se plaignent à Ottawa.","The mayor and the priest negotiate a modest raise. The employers complain to Ottawa.");}}]});

hist({id:'tricentenaire1908',place:'quebec',cond:s=>s.year>=1908,
 title:R("Le tricentenaire de Québec","Québec's tercentenary"),
 text:R("Pour les trois cents ans de la fondation de Québec, le gouverneur général Lord Grey veut une grande fête impériale, avec le prince de Galles et la flotte britannique. Les nationalistes voulaient fêter Champlain et la Nouvelle-France.","For the three-hundredth anniversary of Québec's founding, Governor General Lord Grey wants a great imperial festival, with the Prince of Wales and the British fleet. The nationalists wanted to celebrate Champlain and New France."),
 choices:[
  {label:R("Une fête impériale, avec Champlain et Wolfe","An imperial festival, with Champlain and Wolfe"),hist:true,fx:s=>{T(s,'roi',2);s.off.gov+=4;return R("Reconstitutions historiques sur les plaines d'Abraham, où Montcalm et Wolfe défilent côte à côte. Les plaines deviennent un parc national.","Historical pageants on the Plains of Abraham, where Montcalm and Wolfe parade side by side. The Plains become a national park.");}},
  {label:R("Une fête de la Nouvelle-France","A New France festival"),fx:s=>{s.patri+=3;s.off.gov-=4;return R("Les drapeaux à fleurs de lys sont partout. Le prince de Galles écourte sa visite.","Fleur-de-lis flags are everywhere. The Prince of Wales cuts his visit short.");}}]});

hist({id:'ucc1924',place:'quebec',cond:s=>s.year>=1924,
 title:R("L'Union catholique des cultivateurs","The Catholic Farmers' Union"),
 text:R("À Québec, deux mille cultivateurs fondent l'Union catholique des cultivateurs : coopératives, crédit agricole, prix justes. Ils veulent peser autant que les marchands de grains et les banques.","In Québec City, two thousand farmers found the Catholic Farmers' Union: co-ops, farm credit, fair prices. They want as much weight as the grain merchants and the banks."),
 choices:[
  {label:R("L'appuyer ; créer le crédit agricole","Support it; create farm credit"),hist:true,fx:s=>{s.flags.ucc=true;s.flags.creditAgricole=true;s.treasury-=M(s,.04);s.colT+=2;T(s,'entraide',2);return R("L'UCC grandit vite. Le crédit agricole provincial suit en 1936.","The UCC grows fast. Provincial farm credit follows in 1936.");}},
  {label:R("Laisser faire le marché","Let the market work"),fx:s=>{s.flags.ucc=true;s.off.mar+=3;return R("L'UCC grandit quand même, contre le gouvernement.","The UCC grows anyway, against the government.");}}]});

hist({id:'sentinelle1924',place:'woonsocket',cond:s=>s.year>=1924&&s.fram>250000,
 title:R("L'affaire de la Sentinelle","The Sentinelle affair"),
 text:R("Au Rhode Island, l'évêque irlandais Hickey prélève l'argent des paroisses franco-américaines pour des écoles secondaires anglaises. Le journal La Sentinelle de Woonsocket mène la révolte. Rome s'apprête à excommunier les meneurs.","In Rhode Island, the Irish bishop Hickey levies money from Franco-American parishes for English high schools. The Woonsocket newspaper La Sentinelle leads the revolt. Rome prepares to excommunicate the leaders."),
 choices:[
  {label:R("Rester à l'écart : Rome a parlé","Stay out of it: Rome has spoken"),hist:true,fx:s=>{s.flags.sentinelle=true;s.fram-=Math.round(s.fram*.02);return R("Les sentinellistes sont excommuniés en 1928, puis se soumettent. La défaite accélère l'anglicisation des Petits Canadas.","The Sentinellists are excommunicated in 1928, then submit. The defeat speeds up the anglicization of the Little Canadas.");}},
  {label:R("Soutenir les sentinellistes","Back the Sentinellists"),fx:s=>{s.patri+=2;s.off.eve-=8;s.fram+=Math.round(s.fram*.01);return R("Des prêtres québécois prennent la parole à Woonsocket. Le Vatican n'apprécie pas.","Quebec priests speak out in Woonsocket. The Vatican is not pleased.");}}]});

hist({id:'reg17_1927',place:'bytown',cond:s=>s.year>=1927&&s.flags.reglement17&&!s.flags.reg17Abroge,
 title:R("La fin du Règlement 17","The end of Regulation 17"),
 text:R("Quinze ans de résistance : écoles désobéissantes, institutrices non payées, procès. Le gouvernement de l'Ontario commande un rapport sur les écoles bilingues. Il conclut que le règlement a échoué.","Fifteen years of resistance: defiant schools, unpaid teachers, lawsuits. The Ontario government commissions a report on the bilingual schools. It concludes that the regulation has failed."),
 choices:[
  {label:R("Saluer la victoire des Franco-Ontariens","Hail the Franco-Ontarians' victory"),hist:true,fx:s=>{s.flags.reg17Abroge=true;s.minorVit+=8;s.patri+=1;return R("Le Règlement 17 est suspendu. Il ne sera officiellement abrogé qu'en 1944.","Regulation 17 is suspended. It will only be officially repealed in 1944.");}}]});
LIKELY.reg17_1927=s=>s.orient.minorites==='solidarite'||s.minorVit>40?1:.6;

hist({id:'radio1922',place:'villeMarie',cond:s=>s.year>=1922,
 title:R("CKAC, la voix de La Presse","CKAC, the voice of La Presse"),
 text:R("La Presse lance CKAC, la première station de radio française d'Amérique. On y diffusera des radio-romans, le hockey, les chansonniers… et des sermons.","La Presse launches CKAC, the first French-language radio station in America. It will broadcast radio serials, hockey, chansonniers… and sermons."),
 choices:[
  {label:R("Laisser la radio aux entreprises privées","Leave radio to private companies"),hist:true,fx:s=>{T(s,'ouverture',2);return R("La radio fait entrer Montréal dans les cuisines des campagnes. Ottawa créera Radio-Canada en 1936.","Radio brings Montréal into country kitchens. Ottawa will create Radio-Canada in 1936.");}},
  {label:R("Une radio provinciale d'éducation","A provincial educational radio"),fx:s=>{s.edu+=2;T(s,'ouverture',2);s.treasury-=M(s,.03);s.flags.radioQc=true;return R("Radio-Québec naît avant l'heure. Ottawa conteste : la radio, dit-il, est fédérale.","Radio-Québec is born ahead of its time. Ottawa objects: radio, it says, is federal.");}}]});

hist({id:'bloc1942',place:'villeMarie',cond:s=>s.year>=1942&&s.flags.non42,
 title:R("Le Bloc populaire","The Bloc populaire"),
 text:R("Après le plébiscite, les nationalistes fondent un parti, le Bloc populaire canadien, avec Maxime Raymond et André Laurendeau : anticonscriptionniste, autonomiste, réformiste. Il veut se présenter à Québec comme à Ottawa.","After the plebiscite, the nationalists found a party, the Bloc populaire canadien, with Maxime Raymond and André Laurendeau: anti-conscription, autonomist, reformist. It wants to run in Québec as in Ottawa."),
 choices:[
  {label:R("Laisser le Bloc diviser le vote","Let the Bloc split the vote"),hist:true,fx:s=>{s.patri+=2;s.support-=2;return R("En 1944, le Bloc obtient 15 % des voix et quatre sièges. Il a surtout aidé Duplessis à revenir.","In 1944 the Bloc wins 15% of the vote and four seats. Mostly it has helped Duplessis return.");}},
  {label:R("Reprendre son programme","Take over its program"),fx:s=>{s.patri+=4;s.support+=3;s.off.gov-=6;return R("Le gouvernement parle de réformes sociales et d'autonomie. Le Bloc perd sa raison d'être.","The government talks of social reform and autonomy. The Bloc loses its reason to exist.");}}]});

hist({id:'charbonneau1950',place:'villeMarie',cond:s=>s.year>=1950&&s.flags.amiante,
 title:R("Le départ de Mgr Charbonneau","Archbishop Charbonneau's departure"),
 text:R("L'archevêque de Montréal, qui a pris le parti des grévistes de l'amiante, est poussé à la démission par Rome, sous la pression de la hiérarchie et, dit-on, du premier ministre. Il partira pour Victoria, en Colombie-Britannique.","The archbishop of Montréal, who sided with the asbestos strikers, is pushed to resign by Rome, under pressure from the hierarchy and, it is said, the premier. He will leave for Victoria, British Columbia."),
 choices:[
  {label:R("Ne pas s'en mêler","Stay out of it"),hist:true,fx:s=>{T(s,'ouverture',-1);return R("Charbonneau finit sa vie comme aumônier de religieuses. Les catholiques progressistes perdent leur évêque.","Charbonneau ends his life as chaplain to nuns. Progressive Catholics lose their bishop.");}},
  {label:R("Le défendre publiquement","Defend him publicly"),fx:s=>{s.off.eve-=6;s.off.mar-=4;T(s,'ouverture',2);s.support-=1;return R("La querelle s'étale dans les journaux. Rome ne revient pas sur sa décision.","The quarrel spills into the papers. Rome does not reverse its decision.");}}]});

hist({id:'italiens1950',place:'villeMarie',cond:s=>s.year>=1950&&s.ang>500000,
 title:R("Les écoles des immigrants","The immigrants' schools"),
 text:R("Des milliers d'Italiens, de Grecs, de Portugais s'installent à Montréal. Catholiques, ils pourraient aller à l'école française ; mais les écoles catholiques françaises les accueillent mal, et l'anglais est la langue de l'Amérique. Ils s'inscrivent dans les écoles anglaises.","Thousands of Italians, Greeks and Portuguese settle in Montréal. Catholic, they could go to French schools; but the French Catholic schools welcome them poorly, and English is the language of America. They enrol in the English schools."),
 choices:[
  {label:R("Laisser les parents choisir","Let parents choose"),hist:true,fx:s=>{s.ang+=Math.round(s.pop*.004);return R("Neuf enfants d'immigrants sur dix iront à l'école anglaise. La question reviendra, brûlante, à Saint-Léonard en 1968.","Nine immigrant children in ten will go to English school. The question will come back, burning, at Saint-Léonard in 1968.");}},
  {label:R("Ouvrir les écoles françaises aux nouveaux venus","Open the French schools to newcomers"),fx:s=>{s.treasury-=M(s,.03);s.off.eve-=2;s.ang-=Math.round(s.pop*.002);T(s,'ouverture',2);return R("Des classes d'accueil, des maîtres italiens, des écoles neutres : une partie des immigrants passe au français.","Welcome classes, Italian teachers, neutral schools: some of the immigrants switch to French.");}}]});

/* ---------- conséquences : ce que vos choix ont mis en marche ---------- */
cq({id:'cq4_lowell',place:'lowell',cond:s=>s.year>=1868&&s.year<1930&&s.ys&&s.emig4>30000,w:s=>2+s.emig4/200000,
 because:s=>R(`Depuis 1867, ${nf(s.emig4,'fr')} Québécois sont partis aux États-Unis.`,`Since 1867, ${nf(s.emig4,'en')} Quebecers have left for the United States.`),
 title:R("Une lettre de Lowell","A letter from Lowell"),
 text:R("« Chère mère, ici on travaille douze heures à la filature, mais on est payés en argent, chaque samedi. Les petites travaillent aussi. Dites à Joseph qu'il y a de la place. » La lettre fait le tour du rang.","'Dear mother, here we work twelve hours in the mill, but we are paid in cash, every Saturday. The little girls work too. Tell Joseph there is room.' The letter goes round the whole concession."),
 choices:[
  {label:R("Ouvrir des terres neuves pour les retenir","Open new land to keep them"),fx:s=>{s.colT+=5;s.treasury-=M(s,.05);return R("Des lots gratuits sont offerts en Matapédia et au Témiscamingue. Une partie des jeunes reste.","Free lots are offered in the Matapédia and Témiscamingue. Some of the young stay.");}},
  {label:R("Attirer des usines au Québec","Bring factories to Quebec"),fx:s=>{s.eco+=2;s.foreign+=2;s.off.mar+=4;return R("Des filatures ouvrent à Magog, à Montmorency, à Drummondville. Les salaires y sont plus bas qu'à Lowell.","Mills open at Magog, Montmorency, Drummondville. Wages there are lower than in Lowell.");}},
  {label:R("Ils reviendront bien","They'll come back"),fx:s=>R("Certains reviennent, achètent la terre du voisin… et repartent.","Some come back, buy the neighbour's farm… and leave again.")}]});

cq({id:'cq4_rapatriement',place:'quebec',cond:s=>s.year>=1875&&s.year<1914&&s.emig4>150000&&!s.flags.rapatriement,w:s=>2,
 because:s=>R("L'exode vers les États-Unis inquiète les élites.","The exodus to the United States worries the elite."),
 title:R("Le rapatriement","Repatriation"),
 text:R("Le clergé propose une société de rapatriement : des agents iraient dans les Petits Canadas offrir des lots de colonisation aux familles qui reviendraient.","The clergy proposes a repatriation society: agents would go to the Little Canadas offering settlement lots to families who come back."),
 choices:[
  {label:R("Financer le rapatriement","Fund repatriation"),fx:s=>{s.flags.rapatriement=true;s.treasury-=M(s,.06);const n=Math.round(s.fram*.015);s.pop+=n;s.fram-=n;s.colT+=3;return R(`${nf(n,'fr')} personnes reviennent. Les terres offertes sont souvent loin et pauvres.`,`${nf(n,'en')} people return. The land offered is often remote and poor.`);}},
  {label:R("Mieux vaut les aider là-bas","Better to help them there"),fx:s=>{s.flags.paroissesFA=true;s.off.eve+=3;return R("On envoie des prêtres et des religieuses enseignantes en Nouvelle-Angleterre.","Priests and teaching nuns are sent to New England.");}}]});

cq({id:'cq4_villecompagnie',place:'arvida',cond:s=>s.year>=1905&&s.capital>.55,w:s=>2+s.capital*2,
 because:s=>R("L'industrie des ressources s'est installée dans les régions.","The resource industry has settled in the regions."),
 title:R("La ville de compagnie","The company town"),
 text:R("La compagnie a tout bâti : les maisons, l'église, l'école, l'hôpital, le magasin. Elle paie le curé et le maire. Les ouvriers demandent que la ville soit incorporée, avec un conseil élu.","The company built everything: the houses, the church, the school, the hospital, the store. It pays the priest and the mayor. The workers ask for the town to be incorporated, with an elected council."),
 choices:[
  {label:R("Incorporer la ville","Incorporate the town"),fx:s=>{s.off.mar-=6;T(s,'entraide',2);return R("Le premier conseil municipal est élu. La compagnie garde la main sur l'essentiel : les salaires.","The first town council is elected. The company keeps hold of what matters: wages.");}},
  {label:R("Laisser la compagnie gérer","Let the company run it"),fx:s=>{s.off.mar+=5;return R("La ville est propre, ordonnée, et muette.","The town is clean, orderly, and silent.");}}]});

cq({id:'cq4_gouttelait',place:'villeMarie',cond:s=>s.year>=1900&&s.year<1940&&s.urb>.38,w:s=>2+(s.urb-.38)*10,
 because:s=>R("Montréal a l'un des pires taux de mortalité infantile du monde occidental.","Montréal has one of the worst infant mortality rates in the Western world."),
 title:R("Les gouttes de lait","The milk stations"),
 text:R("Un bébé sur quatre meurt avant un an dans les quartiers ouvriers de Montréal : lait contaminé, eau sale, taudis. Des médecins proposent des « gouttes de lait » : du lait pasteurisé et des conseils aux mères.","One baby in four dies before age one in Montréal's working-class districts: contaminated milk, dirty water, slums. Doctors propose 'milk stations': pasteurized milk and advice for mothers."),
 choices:[
  {label:R("Financer les gouttes de lait et la pasteurisation","Fund milk stations and pasteurization"),fx:s=>{s.flags.hygiene=true;s.treasury-=M(s,.04);s.support+=2;return R("La mortalité infantile commence enfin à baisser. Les religieuses tiennent les dispensaires.","Infant mortality finally starts to fall. The nuns run the dispensaries.");}},
  {label:R("C'est l'affaire des villes et des paroisses","It is a matter for the cities and parishes"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.0008;return R("Les petits cercueils blancs continuent de monter vers le cimetière Côte-des-Neiges.","The small white coffins keep climbing toward Côte-des-Neiges cemetery.");}}]});

cq({id:'cq4_trust',place:'villeMarie',cond:s=>s.year>=1925&&!s.flags.hydroQc&&s.capital>.55,w:s=>2+(s.flags.promesseHydro?3:0),
 because:s=>R("L'électricité appartient à des compagnies privées qui fixent leurs prix.","Electricity belongs to private companies that set their own prices."),
 title:R("Le trust de l'électricité","The power trust"),
 text:R("T.-D. Bouchard, maire de Saint-Hyacinthe, et le Dr Philippe Hamel dénoncent le « trust » : à Toronto, où l'électricité est publique depuis 1906, on la paie deux fois moins cher.","T.-D. Bouchard, mayor of Saint-Hyacinthe, and Dr Philippe Hamel denounce the 'trust': in Toronto, where electricity has been public since 1906, people pay half as much."),
 choices:[
  {label:R("Une commission sur les tarifs","A commission on rates"),fx:s=>{s.support+=2;s.off.mar-=4;return R("La commission Lapointe recommande un contrôle des tarifs. Le trust baisse un peu ses prix.","The Lapointe commission recommends rate control. The trust lowers its prices a little.");}},
  {label:R("Préparer la nationalisation","Prepare nationalization"),fx:s=>{s.flags.promesseHydro=true;s.off.mar-=10;s.patri+=2;s.support+=3;return R("Les compagnies financent l'opposition. Le peuple, lui, applaudit.","The companies fund the opposition. The people applaud.");}},
  {label:R("Défendre l'entreprise privée","Defend private enterprise"),fx:s=>{s.off.mar+=6;s.support-=3;return R("Les factures continuent d'arriver. La colère aussi.","The bills keep coming. So does the anger.");}}]});

cq({id:'cq4_patronage',place:'quebec',cond:s=>(s.flags.patronage||0)>=2,w:s=>3,
 because:s=>R("Vous avez promis des ponts et des routes dans chaque comté.","You promised bridges and roads in every riding."),
 title:R("Le patronage éclabousse","Patronage splashes back"),
 text:R("Des contrats de voirie accordés sans soumission, des bouts de route qui ne mènent nulle part, un pont payé deux fois : l'opposition a les factures.","Road contracts awarded without tender, stretches of road leading nowhere, a bridge paid for twice: the opposition has the invoices."),
 choices:[
  {label:R("Une commission d'enquête","A commission of inquiry"),fx:s=>{s.flags.patronage=0;s.support-=3;return R("Quelques fonctionnaires sont congédiés. Le système, lui, survit.","A few officials are fired. The system survives.");}},
  {label:R("Nier ; l'opposition en faisait autant","Deny it; the opposition did the same"),fx:s=>{s.flags.patronage=0;s.flags.scandale=true;s.support-=6;return R("Le Devoir fait ses choux gras du scandale pendant des semaines.","Le Devoir feasts on the scandal for weeks.");}}]});

cq({id:'cq4_achatchez',place:'villeMarie',cond:s=>s.year>=1925&&(s.orient.eco4==='national'||s.patri>=50),w:s=>2+(s.orient.eco4==='national'?2:0),
 because:s=>R("Le nationalisme économique gagne du terrain.","Economic nationalism is gaining ground."),
 title:R("« Achetons chez nous »","'Let's buy from our own'"),
 text:R("La Société Saint-Jean-Baptiste et l'Action française lancent une campagne : acheter des produits canadiens-français, faire affaire avec Dupuis Frères plutôt qu'Eaton, déposer à la caisse plutôt qu'à la banque.","The Saint-Jean-Baptiste Society and the Action française launch a campaign: buy French-Canadian goods, shop at Dupuis Frères rather than Eaton's, deposit at the caisse rather than the bank."),
 choices:[
  {label:R("L'appuyer officiellement","Officially support it"),fx:s=>{s.foreign-=2;s.patri+=2;s.off.mar-=4;s.flags.cooperatives=true;return R("Les petits commerces canadiens-français respirent. Les grands magasins anglais haussent les épaules.","French-Canadian shops breathe again. The big English stores shrug.");}},
  {label:R("Laisser la société civile s'en charger","Leave it to civil society"),fx:s=>{s.foreign-=1;return R("La campagne a son effet, modeste.","The campaign has its effect, a modest one.");}}]});

cq({id:'cq4_minorite',place:'sudbury',cond:s=>s.year>=1900&&s.orient.minorites==='solidarite',w:s=>2,
 because:s=>R("Vous avez choisi la solidarité avec les minorités françaises.","You chose solidarity with the French minorities."),
 title:R("L'appel des Franco-Ontariens","The Franco-Ontarians' appeal"),
 text:R("De Sudbury à Hawkesbury, les Franco-Ontariens fondent des écoles, des caisses, des journaux. Ils demandent au Québec des enseignants, des prêtres, de l'argent pour Le Droit.","From Sudbury to Hawkesbury, the Franco-Ontarians found schools, caisses, newspapers. They ask Quebec for teachers, priests, money for Le Droit."),
 choices:[
  {label:R("Envoyer maîtres et subventions","Send teachers and grants"),fx:s=>{s.treasury-=M(s,.03);s.minorVit+=6;s.minor+=Math.round(s.minor*.01);return R("Le Droit paraît à Ottawa en 1913. L'Ontario français tient bon.","Le Droit appears in Ottawa in 1913. French Ontario holds firm.");}},
  {label:R("Une aide symbolique","A symbolic gesture"),fx:s=>{s.minorVit+=2;return R("Une délégation, des discours, peu d'argent.","A delegation, speeches, little money.");}}]});

cq({id:'cq4_metis',place:'bytown',cond:s=>s.year>=1890&&s.year<1930&&s.orient.minorites==='solidarite',w:s=>1.5,
 because:s=>R("Les francophones de l'Ouest comptent sur le Québec.","The francophones of the West count on Quebec."),
 title:R("Peupler l'Ouest en français ?","Settle the West in French?"),
 text:R("Mgr Taché, à Saint-Boniface, supplie le Québec d'envoyer des colons dans l'Ouest : si les Canadiens français vont en Nouvelle-Angleterre plutôt qu'au Manitoba, l'Ouest sera anglais.","Archbishop Taché, in Saint-Boniface, begs Quebec to send settlers West: if French Canadians go to New England rather than Manitoba, the West will be English."),
 choices:[
  {label:R("Organiser des convois vers l'Ouest","Organize convoys to the West"),fx:s=>{const n=Math.round(s.pop*.006);s.pop-=n;s.minor+=n;s.minorVit+=4;s.colT-=2;return R(`${nf(n,'fr')} colons partent pour le Manitoba et la Saskatchewan. Saint-Boniface, Gravelbourg, Saint-Paul : des paroisses françaises dans la prairie.`,`${nf(n,'en')} settlers leave for Manitoba and Saskatchewan. Saint-Boniface, Gravelbourg, Saint-Paul: French parishes on the prairie.`);}},
  {label:R("Garder nos gens au Québec","Keep our people in Quebec"),fx:s=>{s.colT+=2;s.minorVit-=2;return R("Ottawa remplit l'Ouest d'Ukrainiens, d'Allemands et d'Anglais.","Ottawa fills the West with Ukrainians, Germans and English.");}}]});

cq({id:'cq4_innu',place:'chicoutimi',cond:s=>s.year>=1915&&(s.capital>.55||s.flags.shawinigan),w:s=>1.5,
 because:s=>R("Les barrages et les coupes forestières avancent vers le nord.","Dams and logging push northward."),
 title:R("Les territoires de chasse","The hunting grounds"),
 text:R("Un barrage va noyer des territoires de chasse des Atikamekw et des Innus ; les coupes ont fait fuir l'orignal. Des chefs demandent une compensation, et des terres réservées.","A dam will flood Atikamekw and Innu hunting grounds; logging has driven off the moose. Chiefs ask for compensation, and reserved lands."),
 choices:[
  {label:R("Réserver des territoires de chasse","Reserve hunting territories"),fx:s=>{ra(s,'innu',8);ra(s,'alg',6);T(s,'alliance',4);s.off.mar-=4;return R("Des réserves à castors sont créées, cogérées avec les familles de chasseurs. Une première.","Beaver reserves are created, co-managed with the hunting families. A first.");}},
  {label:R("Le progrès d'abord","Progress first"),fx:s=>{ra(s,'innu',-6);ra(s,'alg',-6);T(s,'alliance',-2);s.eco+=1;return R("Le réservoir se remplit. Des familles perdent leurs sentiers, leurs sépultures.","The reservoir fills. Families lose their trails, their burial grounds.");}}]});

cq({id:'cq4_tuberculose',place:'villeMarie',cond:s=>s.year>=1905&&s.year<1955&&s.urb>.45,w:s=>1.5,
 because:s=>R("Les taudis des villes industrielles favorisent la tuberculose.","The slums of industrial cities breed tuberculosis."),
 title:R("La peste blanche","The white plague"),
 text:R("La tuberculose tue plus que toute autre maladie dans les quartiers ouvriers. Des médecins demandent des sanatoriums, des cliniques, des radiographies dans les écoles.","Tuberculosis kills more than any other disease in the working-class districts. Doctors ask for sanatoriums, clinics, X-rays in the schools."),
 choices:[
  {label:R("Bâtir des sanatoriums","Build sanatoriums"),fx:s=>{s.treasury-=M(s,.05);s.flags.hygiene=true;s.support+=1;return R("Le sanatorium du lac Édouard, puis d'autres, accueillent les malades. La mortalité recule.","The Lac-Édouard sanatorium, then others, take in the sick. Mortality recedes.");}},
  {label:R("Compter sur les religieuses","Rely on the nuns"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.001;s.off.eve+=2;return R("Les religieuses font ce qu'elles peuvent, avec ce qu'elles ont.","The nuns do what they can, with what they have.");}}]});

cq({id:'cq4_laurentie',place:'quebec',cond:s=>s.year>=1930&&s.year<1958&&s.patri>=58&&s.orient.ottawa==='affirmation',w:s=>1+(s.patri-58)/8,
 because:s=>R("Le nationalisme est à son comble et vous parlez au nom d'une nation.","Nationalism is at its peak and you speak for a nation."),
 title:R("La Laurentie","Laurentia"),
 text:R("Autour de l'abbé Groulx, des jeunes gens rêvent d'un État français indépendant sur le Saint-Laurent : la Laurentie. Les Jeune-Canada en font un programme. Faut-il poser la question au peuple ?","Around Abbé Groulx, young people dream of an independent French state on the St. Lawrence: Laurentia. The Jeune-Canada make it a program. Should the question be put to the people?"),
 choices:[
  {label:R("Rester dans la Confédération, mais autrement","Stay in Confederation, but differently"),fx:s=>{s.autonomy+=3;s.patri+=2;return R("Le gouvernement promet une « nouvelle entente » avec le Canada anglais. L'idée d'indépendance reste dans les cercles d'étudiants.","The government promises a 'new deal' with English Canada. The idea of independence stays in student circles.");}},
  {label:R("Tenir un référendum sur l'indépendance","Hold a referendum on independence"),fx:s=>{const p=clamp(.08+(s.patri-60)/80+(s.flags.francoeurVote?.08:0)+(s.flags.conscription44?.05:0)-(s.traits.roi-40)/150,.02,.6);
    if(Math.random()<p){s.ending='laurentie';return R("Le Oui l'emporte. Après de longues négociations, et des menaces, le Québec quitte la Confédération.","Yes wins. After long negotiations, and threats, Quebec leaves Confederation.");}
    s.patri-=6;s.support-=8;s.off.gov-=10;s.autonomy-=3;return R("Le Non l'emporte. Le gouvernement en sort affaibli ; Ottawa, conforté.","No wins. The government comes out weakened; Ottawa, strengthened.");}},
  {label:R("Désavouer ces jeunes exaltés","Disown these young hotheads"),fx:s=>{s.patri-=3;s.off.gov+=4;return R("Groulx retourne à ses livres d'histoire.","Groulx goes back to his history books.");}}]});

cq({id:'cq4_secession1918',place:'quebec',cond:s=>s.year>=1918&&s.year<=1920&&s.flags.francoeurVote&&s.flags.resistance&&s.patri>=60,w:s=>6,max:1,
 because:s=>R("L'Assemblée a voté la motion Francœur et la province résiste à la conscription.","The Assembly passed the Francœur motion and the province is resisting conscription."),
 title:R("Rompre le pacte ?","Break the pact?"),
 text:R("Les insoumis se comptent par milliers, l'armée occupe Québec, l'Assemblée a dit qu'elle accepterait la rupture. Des voix demandent qu'on aille au bout : proclamer que la province se retire de la Confédération.","Draft evaders number in the thousands, the army occupies Québec, the Assembly has said it would accept a break. Voices demand going all the way: proclaiming that the province withdraws from Confederation."),
 choices:[
  {label:R("Reculer : on ne fait pas la guerre au Canada","Back down: one does not make war on Canada"),fx:s=>{s.patri-=4;s.autonomy-=2;return R("La crise retombe avec l'armistice. Le Québec rentre dans le rang, la rancune au cœur.","The crisis subsides with the armistice. Quebec falls back into line, resentment in its heart.");}},
  {label:R("Proclamer le retrait de la Confédération","Proclaim withdrawal from Confederation"),fx:s=>{if(Math.random()<.12){s.ending='laurentie';return R("Londres, épuisée par la guerre, refuse d'envoyer des troupes ; Ottawa négocie. Le Québec devient un dominion distinct, puis la Laurentie.","London, exhausted by the war, refuses to send troops; Ottawa negotiates. Quebec becomes a separate dominion, then Laurentia.");}
    s.flags.tutelle=true;s.autonomy-=15;s.patri+=8;s.off.gov=-80;s.support-=10;return R("Ottawa suspend le gouvernement provincial et gouverne par décret jusqu'aux élections. La province en sort brisée, et plus nationaliste que jamais.","Ottawa suspends the provincial government and rules by decree until the elections. The province comes out broken, and more nationalist than ever.");}}]});

/* ---------- luttes sociales ---------- */
cq({id:'cq4_greve',place:'villeMarie',cond:s=>s.year>=1880&&clsG(s,'ouvriers')>=55,w:s=>1+(clsG(s,'ouvriers')-55)/8+(s.cls&&s.cls.ouvriers?s.cls.ouvriers.org/40:0),max:3,cool:6,
 because:s=>R("La classe ouvrière juge sa part injuste, et elle s'organise.","The working class finds its share unfair, and it is organizing."),
 title:R("La grève","The strike"),
 text:s=>s.year<1920?R("Les débardeurs du port de Montréal cessent le travail : quatorze heures par jour pour quinze sous de l'heure. Les navires s'entassent au quai.","Montréal's longshoremen stop work: fourteen hours a day for fifteen cents an hour. Ships pile up at the docks."):s.year<1945?R("Les ouvrières des manufactures de vêtements, à Montréal, débraient à l'appel de Léa Roback et des syndicats : on veut la semaine de 44 heures et un salaire décent.","Montréal's garment workers walk out at the call of Léa Roback and the unions: they want the 44-hour week and a decent wage."):R("Chez Dupuis Frères, à Louiseville, dans les mines de la Côte-Nord : les grèves se multiplient. Les syndicats réclament la reconnaissance et la sécurité.","At Dupuis Frères, in Louiseville, in the North Shore mines: strikes multiply. The unions demand recognition and safety."),
 choices:[
  {label:R("Une loi du travail : arbitrage, salaire minimum","A labour law: arbitration, minimum wage"),fx:s=>{s.flags.salaireMin=true;s.off.mar-=8;if(s.cls&&s.cls.ouvriers)s.cls.ouvriers.grief-=10;s.support+=2;return R("Les patrons protestent, mais signent. La paix sociale revient, pour un temps.","The employers protest, but sign. Social peace returns, for a while.");}},
  {label:R("Briser la grève","Break the strike"),fx:s=>{s.off.mar+=6;s.flags.repressionGreve=true;if(s.cls&&s.cls.ouvriers){s.cls.ouvriers.grief+=6;s.cls.ouvriers.org+=4;}s.support-=2;return R("La police disperse les piquets. Les grévistes rentrent ; les militants, eux, s'endurcissent.","The police disperse the pickets. The strikers go back; the militants harden.");}},
  {label:R("Laisser l'Église arbitrer","Let the Church arbitrate"),fx:s=>{s.off.eve+=4;if(s.cls&&s.cls.ouvriers)s.cls.ouvriers.grief-=4;return R("L'aumônier obtient un compromis. Les syndicats catholiques recrutent.","The chaplain obtains a compromise. The Catholic unions recruit.");}}]});

cq({id:'cq4_cultivateurs',place:'rimouski',cond:s=>s.year>=1875&&clsG(s,'habitants')>=55,w:s=>1+(clsG(s,'habitants')-55)/8,max:2,
 because:s=>R("Les cultivateurs et les colons estiment ne pas recevoir leur juste part.","Farmers and settlers feel they are not getting their fair share."),
 title:R("La colère des campagnes","Rural anger"),
 text:R("Le prix du bois de pulpe est fixé par les compagnies, le beurre se vend mal, les dettes s'accumulent chez le marchand général. Des colons de la Matapédia et du Témiscouata parlent de « faire la grève du bois ».","The price of pulpwood is set by the companies, butter sells poorly, debts pile up at the general store. Settlers in the Matapédia and Témiscouata talk of a 'wood strike'."),
 choices:[
  {label:R("Des coopératives et du crédit agricole","Co-ops and farm credit"),fx:s=>{s.flags.cooperatives=true;s.flags.creditAgricole=true;s.treasury-=M(s,.05);if(s.cls&&s.cls.habitants)s.cls.habitants.grief-=10;return R("Coopératives forestières, laiteries coopératives, crédit à long terme : les campagnes respirent.","Forestry co-ops, dairy co-ops, long-term credit: the countryside breathes again.");}},
  {label:R("Des routes et des ponts","Roads and bridges"),fx:s=>{s.treasury-=M(s,.04);s.support+=2;if(s.cls&&s.cls.habitants)s.cls.habitants.grief-=4;return R("Le député inaugure un pont. Les prix, eux, ne bougent pas.","The member opens a bridge. Prices do not budge.");}},
  {label:R("Rien à faire : c'est le marché","Nothing to be done: it's the market"),fx:s=>{if(s.cls&&s.cls.habitants)s.cls.habitants.org+=5;s.support-=3;return R("Les colons s'organisent seuls. L'Opération Dignité naîtra de cette colère, en 1970.","The settlers organize on their own. Opération Dignité will be born of this anger, in 1970.");}}]});

cq({id:'cq4_porteurs',place:'villeMarie',cond:s=>s.year>=1900&&clsG(s,'professions')>=50,w:s=>1+(clsG(s,'professions')-50)/8,max:2,
 because:s=>R("La petite bourgeoisie canadienne-française se sent tenue à l'écart des grandes affaires.","The French-Canadian petty bourgeoisie feels shut out of big business."),
 title:R("« Porteurs d'eau »","'Hewers of wood and drawers of water'"),
 text:R("Dans les grandes entreprises de Montréal, les cadres sont anglophones ; les Canadiens français sont commis, contremaîtres au mieux. Les jeunes diplômés des HEC demandent : à quoi sert d'étudier ?","In Montréal's big companies, the managers are English-speaking; French Canadians are clerks, foremen at best. Young HEC graduates ask: what is the point of studying?"),
 choices:[
  {label:R("Des sociétés d'État et une banque nationale","Crown corporations and a national bank"),fx:s=>{s.flags.banqueNationale=true;s.foreign-=3;s.off.mar-=8;s.patri+=2;s.treasury-=M(s,.06);return R("La province crée des sociétés où l'on travaille en français, du sommet à la base.","The province creates companies where French is spoken, from top to bottom.");}},
  {label:R("Exiger le français dans les entreprises","Require French in companies"),fx:s=>{s.patri+=3;s.off.mar-=12;s.eco-=1;return R("Les compagnies traînent les pieds ; certaines menacent de partir pour Toronto.","The companies drag their feet; some threaten to leave for Toronto.");}},
  {label:R("Le mérite finira par payer","Merit will pay off in the end"),fx:s=>{if(s.cls&&s.cls.professions)s.cls.professions.grief+=4;return R("Les meilleurs partent pour Ottawa, ou pour les États.","The best leave for Ottawa, or for the States.");}}]});

/* ---------- imprévus ---------- */
sy({id:'sy4_feu',place:'quebec',cond:s=>s.year>=1870,max:3,cool:18,w:s=>.5,
 title:R("Le feu","Fire"),
 text:R("Un incendie rase un quartier ouvrier : maisons de bois collées les unes aux autres, pompiers mal équipés. Des milliers de sans-abri.","A fire razes a working-class district: wooden houses packed together, ill-equipped firemen. Thousands homeless."),
 choices:[
  {label:R("Secours et règlement de construction","Relief and a building code"),fx:s=>{s.treasury-=M(s,.03);T(s,'entraide',1);return R("On rebâtit en brique. Le feu sera moins meurtrier la prochaine fois.","Rebuilding is in brick. Fire will be less deadly next time.");}},
  {label:R("Laisser les paroisses s'en occuper","Let the parishes handle it"),fx:s=>{s.pop-=300;s.off.eve+=2;return R("Des familles partent pour la campagne, ou pour les États.","Families leave for the country, or for the States.");}}]});

sy({id:'sy4_forets',place:'chicoutimi',cond:s=>s.year>=1880,max:2,cool:20,w:s=>.5,
 title:R("Les feux de forêt","Forest fires"),
 text:R("Un été sec, une étincelle de locomotive : la forêt brûle sur des centaines de kilomètres. Des paroisses de colonisation sont menacées.","A dry summer, a spark from a locomotive: the forest burns for hundreds of kilometres. Settlement parishes are threatened."),
 choices:[
  {label:R("Créer un service de protection des forêts","Create a forest protection service"),fx:s=>{s.treasury-=M(s,.03);s.eco+=1;return R("Des tours de guet s'élèvent sur les collines. Les compagnies partagent les frais.","Lookout towers rise on the hills. The companies share the cost.");}},
  {label:R("Laisser le feu s'éteindre","Let the fire burn out"),fx:s=>{s.colT-=3;s.eco-=1;return R("Des colons ruinés abandonnent leurs lots.","Ruined settlers abandon their lots.");}}]});

sy({id:'sy4_crue',place:'villeMarie',cond:s=>s.year>=1868,max:2,cool:20,w:s=>.4,
 title:R("La débâcle","The ice breakup"),
 text:R("Au printemps, les glaces du fleuve s'amoncellent et l'eau envahit Griffintown et la Pointe-Saint-Charles. Les ouvriers irlandais et canadiens-français pataugent dans leurs caves.","In spring the river ice piles up and the water floods Griffintown and Pointe-Saint-Charles. Irish and French-Canadian workers wade through their cellars."),
 choices:[
  {label:R("Construire une digue","Build a dike"),fx:s=>{s.treasury-=M(s,.03);s.support+=1;return R("La digue de la Commission du port tiendra, la plupart des printemps.","The Harbour Commission's dike will hold, most springs.");}},
  {label:R("Attendre que l'eau baisse","Wait for the water to go down"),fx:s=>{s.mods.epid=(s.mods.epid||0)+.0004;return R("La typhoïde suit l'inondation, comme chaque fois.","Typhoid follows the flood, as always.");}}]});

sy({id:'sy4_college',place:'troisRivieres',cond:s=>s.year>=1870&&(s.budget.ecoles||0)>=25,max:2,cool:15,
 title:R("Un nouveau collège","A new college"),
 text:R("Une communauté religieuse veut ouvrir un collège classique, ou une école normale pour jeunes filles, dans une ville de région.","A religious order wants to open a classical college, or a teacher-training school for young women, in a regional town."),
 choices:[
  {label:R("Le subventionner","Fund it"),fx:s=>{s.treasury-=M(s,.03);s.edu+=2;s.off.eve+=4;return R("Le collège ouvre. La région aura ses notaires, ses médecins, ses prêtres, ses institutrices.","The college opens. The region will have its notaries, doctors, priests and teachers.");}},
  {label:R("Préférer une école technique","Prefer a technical school"),fx:s=>{s.treasury-=M(s,.03);s.edu+=1;s.eco+=1;s.off.eve-=3;return R("On y formera des électriciens et des mécaniciens. Le curé boude l'inauguration.","It will train electricians and mechanics. The priest sulks at the opening.");}}]});

sy({id:'sy4_miracle',place:'quebec',cond:s=>s.year>=1870&&s.traits.ferveur>=65,max:2,cool:20,w:s=>.6,
 title:R("Le frère André","Brother André"),
 text:R("Un humble portier du collège Notre-Dame, le frère André, attire des foules : on dit qu'il guérit par l'huile de saint Joseph. Il veut bâtir un oratoire sur le mont Royal.","A humble doorman at Collège Notre-Dame, Brother André, draws crowds: people say he heals with Saint Joseph's oil. He wants to build an oratory on Mount Royal."),
 choices:[
  {label:R("Laisser faire : c'est la foi du peuple","Let it be: it is the people's faith"),fx:s=>{T(s,'ferveur',2);s.off.eve+=4;return R("L'oratoire Saint-Joseph s'élève, sou par sou. Des béquilles tapissent ses murs.","Saint Joseph's Oratory rises, penny by penny. Crutches line its walls.");}},
  {label:R("Rester à distance","Keep a distance"),fx:s=>R("Les foules montent quand même.","The crowds climb anyway.")}]});

sy({id:'sy4_tempete',place:'gaspe',cond:s=>s.year>=1870,max:2,cool:18,w:s=>.4,
 title:R("La tempête","The storm"),
 text:R("Une tempête d'automne détruit les barques de pêche de la côte gaspésienne. Les pêcheurs, endettés envers les compagnies jersiaises, n'ont plus rien.","An autumn storm destroys the fishing boats of the Gaspé coast. The fishermen, in debt to the Jersey companies, are left with nothing."),
 choices:[
  {label:R("Aider les pêcheurs à fonder une coopérative","Help the fishermen found a co-op"),fx:s=>{s.treasury-=M(s,.02);s.flags.cooperatives=true;T(s,'entraide',2);return R("Les Pêcheurs-Unis naîtront de ces coopératives. Les Robin perdent leur monopole.","The Pêcheurs-Unis will be born of these co-ops. The Robin company loses its monopoly.");}},
  {label:R("Un secours d'urgence","Emergency relief"),fx:s=>{s.treasury-=M(s,.01);return R("Le secours passe l'hiver. La dette, elle, reste.","The relief lasts the winter. The debt remains.");}}]});

/* ---------- les nouvelles du monde, 1868–1960 ---------- */
WORLD.push(
 {y:1869,k:'monde',t:R("Le canal de Suez","The Suez Canal"),x:R("Ferdinand de Lesseps relie la Méditerranée à la mer Rouge. La route des Indes raccourcit de moitié.","Ferdinand de Lesseps links the Mediterranean to the Red Sea. The route to India is cut in half.")},
 {y:1870,k:'france',t:R("La France vaincue","France defeated"),x:R("Napoléon III capitule à Sedan ; Paris assiégé mange ses rats, puis vient la Commune. Au Québec, on prie pour la France… et contre les communards.","Napoleon III surrenders at Sedan; besieged Paris eats its rats, then comes the Commune. In Quebec, people pray for France… and against the Communards."),big:true},
 {y:1871,k:'amerique',t:R("La Colombie-Britannique entre dans le Canada","British Columbia joins Canada"),x:R("On lui promet un chemin de fer jusqu'au Pacifique en dix ans. Le Canada va d'un océan à l'autre.","It is promised a railway to the Pacific within ten years. Canada now runs from sea to sea.")},
 {y:1876,k:'science',t:R("Le téléphone","The telephone"),x:R("Alexander Graham Bell fait le premier appel interurbain, à Brantford, en Ontario. Montréal aura son central dès 1880.","Alexander Graham Bell makes the first long-distance call, at Brantford, Ontario. Montréal will have its exchange by 1880.")},
 {y:1879,k:'science',t:R("La lampe d'Edison","Edison's lamp"),x:R("Une ampoule brûle quarante heures à Menlo Park. L'électricité va changer les villes, et la valeur des chutes du Québec.","A bulb burns for forty hours at Menlo Park. Electricity will change cities, and the value of Quebec's waterfalls.")},
 {y:1885,k:'amerique',t:R("Le dernier crampon","The last spike"),x:R("À Craigellachie, Donald Smith enfonce le dernier crampon du Canadien Pacifique. Montréal est reliée au Pacifique. Le même mois, Riel est pendu.","At Craigellachie, Donald Smith drives the last spike of the Canadian Pacific. Montréal is linked to the Pacific. The same month, Riel is hanged.")},
 {y:1885,k:'science',t:R("Pasteur et la rage","Pasteur and rabies"),x:R("Louis Pasteur sauve le petit Joseph Meister. La médecine entre dans l'ère des microbes.","Louis Pasteur saves young Joseph Meister. Medicine enters the age of germs.")},
 {y:1889,k:'france',t:R("La tour Eiffel","The Eiffel Tower"),x:R("Pour le centenaire de la Révolution, Paris dresse une tour de fer de trois cents mètres. Les évêques du Québec ne fêtent pas 1789.","For the centenary of the Revolution, Paris raises a three-hundred-metre iron tower. Quebec's bishops do not celebrate 1789.")},
 {y:1893,k:'amerique',t:R("La panique de 1893","The panic of 1893"),x:R("Banques et chemins de fer font faillite aux États-Unis. Les filatures ralentissent ; certains Canadiens rentrent au pays.","Banks and railways fail in the United States. The mills slow down; some Canadiens come home.")},
 {y:1896,k:'culture',t:R("Le cinématographe à Montréal","The cinematograph in Montréal"),x:R("Six mois après Paris, les vues animées des frères Lumière sont projetées boulevard Saint-Laurent.","Six months after Paris, the Lumière brothers' moving pictures are shown on boulevard Saint-Laurent.")},
 {y:1897,k:'amerique',t:R("La ruée vers l'or du Klondike","The Klondike gold rush"),x:R("Cent mille chercheurs d'or se lancent vers le Yukon. Quelques Canadiens français y feront fortune ; beaucoup y laisseront leur peau.","A hundred thousand prospectors head for the Yukon. A few French Canadians will make fortunes there; many will leave their lives.")},
 {y:1901,k:'science',t:R("Marconi à Terre-Neuve","Marconi in Newfoundland"),x:R("Sur la colline Signal, Marconi capte un signal radio envoyé de Cornouailles. L'Atlantique se traverse en un instant.","On Signal Hill, Marconi picks up a radio signal sent from Cornwall. The Atlantic is crossed in an instant.")},
 {y:1903,k:'science',t:R("Les frères Wright","The Wright brothers"),x:R("À Kitty Hawk, un aéroplane vole douze secondes. Le siècle prend son envol.","At Kitty Hawk, an aeroplane flies for twelve seconds. The century takes off.")},
 {y:1905,k:'amerique',t:R("L'Alberta et la Saskatchewan","Alberta and Saskatchewan"),x:R("Deux nouvelles provinces naissent dans l'Ouest. Laurier voulait des écoles catholiques garanties ; il cède en partie.","Two new provinces are born in the West. Laurier wanted guaranteed Catholic schools; he partly gives in.")},
 {y:1912,k:'monde',t:R("Le Titanic","The Titanic"),x:R("Le paquebot « insubmersible » sombre au large de Terre-Neuve. Plus de 1 500 morts.","The 'unsinkable' liner sinks off Newfoundland. More than 1,500 dead.")},
 {y:1914,k:'culture',t:R("Maria Chapdelaine","Maria Chapdelaine"),x:R("Un Français, Louis Hémon, publie l'histoire d'une fille du Lac-Saint-Jean : « Au pays de Québec, rien ne doit mourir et rien ne doit changer. » Le roman fera le tour du monde.","A Frenchman, Louis Hémon, publishes the story of a Lac-Saint-Jean girl: 'In the land of Quebec nothing must die and nothing must change.' The novel will travel the world.")},
 {y:1917,k:'monde',t:R("La révolution russe","The Russian Revolution"),x:R("Les bolcheviks prennent le pouvoir à Petrograd. Pour l'Église du Québec, un nouvel ennemi est né.","The Bolsheviks seize power in Petrograd. For the Quebec Church, a new enemy is born."),big:true},
 {y:1917,k:'amerique',t:R("L'explosion de Halifax","The Halifax explosion"),x:R("Un cargo de munitions, le Mont-Blanc, explose dans le port : deux mille morts. C'est la plus grande explosion jamais provoquée par l'homme, avant l'atome.","A munitions ship, the Mont-Blanc, explodes in the harbour: two thousand dead. It is the largest man-made explosion before the atom bomb.")},
 {y:1918,k:'monde',t:R("L'armistice","The Armistice"),x:R("Le 11 novembre, les canons se taisent. Soixante mille Canadiens sont morts ; la grippe en tuera presque autant.","On 11 November, the guns fall silent. Sixty thousand Canadians are dead; the flu will kill nearly as many."),big:true},
 {y:1919,k:'amerique',t:R("La grève générale de Winnipeg","The Winnipeg General Strike"),x:R("Trente mille travailleurs débraient. La police montée charge les grévistes. Ottawa voit des bolcheviks partout.","Thirty thousand workers walk out. The Mounted Police charge the strikers. Ottawa sees Bolsheviks everywhere.")},
 {y:1927,k:'science',t:R("Lindbergh traverse l'Atlantique","Lindbergh crosses the Atlantic"),x:R("Seul, sans escale, de New York à Paris. Le monde rétrécit encore.","Alone, non-stop, from New York to Paris. The world shrinks again.")},
 {y:1929,k:'amerique',t:R("Le krach de Wall Street","The Wall Street Crash"),x:R("Le « jeudi noir », la Bourse de New York s'effondre. En trois ans, les exportations de papier journal du Québec seront coupées de moitié.","On 'Black Thursday', the New York Stock Exchange collapses. Within three years, Quebec's newsprint exports will be cut in half."),big:true},
 {y:1931,k:'empire',t:R("Le statut de Westminster","The Statute of Westminster"),x:R("Le Canada devient pleinement souverain dans le Commonwealth. Mais sa constitution reste à Londres : on ne s'entend pas sur la manière de la modifier.","Canada becomes fully sovereign within the Commonwealth. But its constitution stays in London: no one agrees on how to amend it.")},
 {y:1933,k:'monde',t:R("Hitler chancelier","Hitler chancellor"),x:R("En Allemagne, le chef nazi prend le pouvoir. Les journaux du Québec suivent la montée des dictatures, parfois avec trop d'indulgence.","In Germany, the Nazi leader takes power. Quebec's newspapers follow the rise of the dictatorships, sometimes too indulgently.")},
 {y:1936,k:'monde',t:R("La guerre d'Espagne","The Spanish Civil War"),x:R("Franco contre la République. Le Québec catholique prend parti pour Franco ; Norman Bethune, médecin montréalais, part soigner les républicains.","Franco against the Republic. Catholic Quebec sides with Franco; Norman Bethune, a Montréal doctor, goes to treat the Republicans.")},
 {y:1940,k:'france',t:R("La France tombe","France falls"),x:R("Les Allemands entrent dans Paris. Pétain signe l'armistice ; de Gaulle appelle à la résistance depuis Londres. Le Québec est déchiré entre le Maréchal et le Général.","The Germans enter Paris. Pétain signs the armistice; de Gaulle calls for resistance from London. Quebec is torn between the Marshal and the General."),big:true},
 {y:1942,k:'monde',t:R("Dieppe","Dieppe"),x:R("Un raid sur la côte française tourne au massacre : neuf cents Canadiens tués, dont des Fusiliers Mont-Royal.","A raid on the French coast turns into a massacre: nine hundred Canadians killed, including Fusiliers Mont-Royal.")},
 {y:1944,k:'france',t:R("La Libération de Paris","The Liberation of Paris"),x:R("Le 25 août, Paris est libéré. Les cloches de Notre-Dame sonnent ; à Montréal aussi.","On 25 August, Paris is liberated. The bells of Notre-Dame ring; in Montréal too.")},
 {y:1945,k:'monde',t:R("Hiroshima","Hiroshima"),x:R("Une seule bombe détruit une ville. L'uranium canadien a servi au projet. Une ère nouvelle commence, et la guerre finit.","A single bomb destroys a city. Canadian uranium served the project. A new era begins, and the war ends."),big:true},
 {y:1945,k:'culture',t:R("Bonheur d'occasion","The Tin Flute"),x:R("Gabrielle Roy raconte Saint-Henri, ses taudis, ses filles de restaurant, ses soldats. Pour la première fois, le roman québécois est urbain.","Gabrielle Roy tells of Saint-Henri, its slums, its waitresses, its soldiers. For the first time, the Quebec novel is urban.")},
 {y:1949,k:'amerique',t:R("Terre-Neuve devient canadienne","Newfoundland becomes Canadian"),x:R("Par un référendum serré, Terre-Neuve entre dans la Confédération, avec le Labrador que le Québec lui conteste toujours.","By a narrow referendum, Newfoundland joins Confederation, with the Labrador that Quebec still disputes.")},
 {y:1950,k:'monde',t:R("La guerre de Corée","The Korean War"),x:R("Le Canada envoie des troupes sous le drapeau de l'ONU. Le Royal 22e Régiment se bat sur la colline 355.","Canada sends troops under the UN flag. The Royal 22nd Regiment fights on Hill 355.")},
 {y:1957,k:'science',t:R("Spoutnik","Sputnik"),x:R("Les Soviétiques mettent en orbite le premier satellite. L'Amérique s'inquiète de son retard en sciences ; le Québec aussi, du sien.","The Soviets put the first satellite into orbit. America worries about its lag in science; Quebec, about its own.")},
 {y:1959,k:'amerique',t:R("La voie maritime du Saint-Laurent","The St. Lawrence Seaway"),x:R("Les grands navires remontent désormais jusqu'aux Grands Lacs sans s'arrêter à Montréal. Le port perd une part de sa raison d'être.","Large ships now sail up to the Great Lakes without stopping at Montréal. The port loses part of its reason for being.")},
 {y:1959,k:'monde',t:R("La révolution cubaine","The Cuban Revolution"),x:R("Fidel Castro entre à La Havane. Les jeunes du monde entier ont un nouveau héros.","Fidel Castro enters Havana. Young people around the world have a new hero.")});

Object.assign(DIVERGE,{reg17_1927:R("Dans l'histoire, le Règlement 17 est suspendu en 1927. Ici, il tient encore.","In history, Regulation 17 was suspended in 1927. Here, it still stands.")});
/* ---------- images de la période (Wikimedia Commons, domaine public) ---------- */
Object.assign(IMG,{
 p4_title:{c:R("La rue Saint-Denis vue de la rue Sainte-Catherine, Montréal, vers 1910","St. Denis Street from St. Catherine Street, Montréal, about 1910"),f:'St. Denis Street from St. Catherine Street, Montreal, QC, about 1910.jpg'},
 p4_barrage:{c:R("La centrale de la Shawinigan Water & Power, 1907","The Shawinigan Water & Power plant, 1907"),f:'The Shawinigan Water and Power Company - its property and plant. (1907) (14581996428).jpg'},
 p4_eglise:{c:R("L'oratoire Saint-Joseph en construction, vers 1930 (BAnQ)","Saint Joseph's Oratory under construction, about 1930 (BAnQ)"),f:'Oratoire Saint-Joseph BAnQ P748S1P1396.jpg'},
 p4_usine:{c:R("Les filatures de Lowell sur la Merrimack, vers 1900 (Library of Congress)","The Lowell mills on the Merrimack, about 1900 (Library of Congress)"),f:'Lowell, Mass., mills on Merrimack River; LOC; det.4a18323.jpg'},
 p4_fleurdelise:{c:R("Le drapeau du Québec, adopté le 21 janvier 1948","The flag of Quebec, adopted 21 January 1948"),f:'Flag of Quebec.svg'},
 p4_parlement:{c:R("L'hôtel du Parlement et la côte de la Montagne, Québec, vers 1880 (BAnQ)","The Parliament Building and Côte de la Montagne, Québec, about 1880 (BAnQ)"),f:'Quartier Vieux-Quebec - Cote de la Montagne - Parc Montmorency - Parlement de Quebec BAnQ P560S1P200.jpg'},
 p4_lesage:{c:R("Jean Lesage, premier ministre du Québec, 1960","Jean Lesage, Premier of Quebec, 1960"),f:'Jean Lesage (premier of Quebec).jpg'},
 riel:{c:R("Louis Riel, vers 1879","Louis Riel, about 1879"),f:'Louis Riel.jpg'},
 mercier:{c:R("Honoré Mercier, gravure de 1882 (Sulte)","Honoré Mercier, 1882 engraving (Sulte)"),f:'SULTE(1882) 7.161 HONORÉ MERCIER.jpg'},
 laurier:{c:R("Sir Wilfrid Laurier, 1902","Sir Wilfrid Laurier, 1902"),f:'Sir Wilfrid Laurier.jpg'},
 bourassa:{c:R("Henri Bourassa, 1917","Henri Bourassa, 1917"),f:'Henri Bourassa 2 (cropped).jpg'},
 duplessis:{c:R("Maurice Duplessis, 1936","Maurice Duplessis, 1936"),f:'Maurice Duplessis, 1938 (cropped).png'},
 labelle:{c:R("Le curé Antoine Labelle, 1891","Curé Antoine Labelle, 1891"),f:'Curé Labelle.png'},
 labelle_voyage:{c:R("Voyage du curé Labelle à la Chute-aux-Iroquois, 1889","Curé Labelle's journey to Chute-aux-Iroquois, 1889"),f:'Voyage du cure Labelle a Chute-aux-Iroquois.jpg'},
 desjardins:{c:R("Alphonse Desjardins, 1913","Alphonse Desjardins, 1913"),f:'Alphonse Desjardins.jpg'},
 conscription:{c:R("Défilé contre la conscription au square Victoria, Montréal, 17 mai 1917","Anti-conscription parade at Victoria Square, Montréal, 17 May 1917"),f:'Anti-conscription parade at Victoria Square.jpg'},
 godbout:{c:R("Adélard Godbout, vers 1944","Adélard Godbout, about 1944"),f:'Adélard Godbout, vers 1944.jpg'},
 zouave:{c:R("Le zouave pontifical C.-E. Roulleau, Rome, mai 1868","Papal Zouave C.-E. Roulleau, Rome, May 1868"),f:'Canadien C.-E. Roulleau, régiment des Zouaves Pontificaux, à Rome en mai 1868 v2 c7 s12 ss02 01.jpg'},
 pontquebec:{c:R("Le pont de Québec effondré, 1907","The collapsed Québec Bridge, 1907"),f:'Quebec bridge view No 48 (HS85-10-18817).jpg'},
 fileuse:{c:R("Lewis Hine, Elizabeth Demarais, 13 ans, fileuse à Winchendon (Massachusetts), 1911","Lewis Hine, Elizabeth Demarais, 13, a spinner at Winchendon, Massachusetts, 1911"),f:'Elizabeth Demaris (i.e., Demarais?), 13 years old. A spinner in the Spring Village Mill, Winchendon, Mass. Been working since May. Lumina Demaris, sister of Elizabeth, admitted 12 years old. LOC nclc.02298.jpg'},
 hull1900:{c:R("La rue Queen après le grand feu de Hull et d'Ottawa, 26 avril 1900","Queen Street after the great Hull–Ottawa fire, 26 April 1900"),f:'Queen street 1900 Hull-Ottawa fire.jpg'},
 chauveau:{c:R("Pierre-Joseph-Olivier Chauveau, 1862","Pierre-Joseph-Olivier Chauveau, 1862"),f:'Pierre-Joseph-Olivier Chauveau (1862).jpg'},
 gouin:{c:R("Lomer Gouin","Lomer Gouin"),f:'Photograph of Jean Lomer Gouin.jpg'},
 taschereau:{c:R("Louis-Alexandre Taschereau, vers 1925","Louis-Alexandre Taschereau, about 1925"),f:'Louis-Alexandre Taschereau, ca. 1925.jpg'},
 grippe:{c:R("Affiche contre la grippe espagnole, Alberta, 1918","Spanish flu poster, Alberta, 1918"),f:'SpanishFluPosterAlberta.jpg'},
 abitibi:{c:R("Un nouveau centre de colonisation, l'Abitibi, 1915","A new settlement centre, Abitibi, 1915"),f:"Un nouveau centre de colonisation, l'Abitibi (1915) (14591280847).jpg"},
 amiante:{c:R("Mineurs d'amiante, Thetford Mines, 1923","Asbestos miners, Thetford Mines, 1923"),f:'Asbestos miners, Thetford Mines, Quebec, Canada LCCN2010651726.jpg'},
 casgrain:{c:R("Thérèse Casgrain","Thérèse Casgrain"),f:'People. Mde Pierre Casgrain La Familiale Madame Thérèse Casgrain -Madame Thérèse Casgrain- (50618241311).jpg'}});
Object.assign(GOV_IMG,{'Jean Lesage':'p4_lesage','Pierre-Joseph-Olivier Chauveau':'chauveau','Honoré Mercier':'mercier','Lomer Gouin':'gouin','Louis-Alexandre Taschereau':'taschereau','Maurice Duplessis':'duplessis','Adélard Godbout':'godbout','Wilfrid Laurier':'laurier','Ignace Bourget':'bourget'});
Object.assign(EVENT_IMG,{chauveau1867:'chauveau',instruction1868:'chauveau',zouaves1868:'zouave',riviererouge1869:'riel',riel1885:'riel',champdemars1885:'mercier',mercier1887:'mercier',jesuites1888:'mercier',
 programme1871:'bourget',guibord1869:'bourget',labelle1872:'labelle_voyage',exode1881:'fileuse',cq4_lowell:'fileuse',cq4_rapatriement:'p4_usine',laurier1896:'laurier',marine1910:'laurier',
 boers1899:'bourassa',devoir1910:'bourassa',eucharistique1910:'bourassa',caisses1900:'desjardins',shawinigan1898:'p4_barrage',cq4_trust:'p4_barrage',hydro1944:'p4_barrage',
 conscription1917:'conscription',francoeur1918:'p4_parlement',emeutes1918:'conscription',pontquebec1907:'pontquebec',hull1900:'hull1900',techniques1907:'gouin',embargo1910:'gouin',
 assistance1921:'taschereau',prohibition1919:'gouin',aln1935:'duplessis',cadenas1937:'duplessis',guerre1939:'godbout',suffrage1940:'casgrain',obligatoire1943:'godbout',fleurdelise1948:'p4_fleurdelise',
 impots1947:'duplessis',tremblay1953:'duplessis',impot1954:'duplessis',duplessis1959:'duplessis',grippe1918:'grippe',vautrin1934:'abitibi',crise1930:'abitibi',amiante1949:'amiante',
 cq4_villecompagnie:'p4_barrage',cq4_laurentie:'p4_fleurdelise',cq4_secession1918:'p4_parlement',sy4_miracle:'p4_eglise',letellier1878:'p4_parlement',nord1898:'abitibi',ungava1912:'abitibi'});
EVENTS.push(...E4);for(const e of E4)EV[e.id]=e;
})();
