/* Kebec — L'Acadie, de Port-Royal à la renaissance : événements des quatre périodes. */
(()=>{
const T=traitAdd;
const A_=s=>acadEnsure(s);
const P1=e=>{EVENTS.push(e);EV[e.id]=e;};                          /* période I : pas de champ period */
const PN=(p,e)=>{e.period=p;EVENTS.push(e);EV[e.id]=e;};
const CQ=(p,e)=>{e.period=p;e.sys=true;e.conseq=true;e.max=e.max||1;e.cool=e.cool||10;EVENTS.push(e);EV[e.id]=e;};
const M4=(s,f)=>Math.round((s.revT||1e6)*f);

/* ====================== Période I : la colonie sœur ====================== */
P1({id:'acadie1610',place:'portRoyal',cond:s=>s.year>=1610&&s.season===1,
 title:R("Port-Royal et Membertou","Port-Royal and Membertou"),
 text:R("Poutrincourt est revenu à Port-Royal, l'habitation fondée en 1605 et abandonnée deux ans plus tard. Le grand chef mi'kmaq Membertou, qui dit avoir connu Cartier, se fait baptiser avec sa famille. La petite colonie demande des hommes et des vivres à Québec.","Poutrincourt has returned to Port-Royal, the habitation founded in 1605 and abandoned two years later. The great Mi'kmaq chief Membertou, who says he knew Cartier, is baptized with his family. The little colony asks Québec for men and supplies."),
 choices:[
  {label:R("C'est l'affaire de Poutrincourt","It is Poutrincourt's business"),hist:true,fx:s=>{const A=A_(s);A.st='fr';A.pop=20;return R("Port-Royal survit seule, avec une vingtaine d'hommes, grâce aux Mi'kmaq.","Port-Royal survives on its own, with some twenty men, thanks to the Mi'kmaq.");}},
  {label:R("Envoyer quelques hommes et du blé","Send a few men and some wheat"),fx:s=>{const A=A_(s);A.st='fr';A.pop=34;A.mik+=4;s.pop-=4;s.treasury-=150;s.food-=40;return R("Une barque descend le fleuve. Les deux colonies se parlent enfin.","A boat goes down the river. The two colonies finally talk to each other.");}}]});

P1({id:'argall1613',place:'portRoyal',cond:s=>s.year>=1613&&s.fired.acadie1610,
 title:R("Argall brûle Port-Royal","Argall burns Port-Royal"),
 text:R("Un navire de Virginie, commandé par Samuel Argall, détruit la mission de Saint-Sauveur puis rase Port-Royal en l'absence de ses habitants. Charles de Biencourt et le jeune Charles de La Tour se réfugient chez les Mi'kmaq.","A Virginia ship under Samuel Argall destroys the Saint-Sauveur mission, then razes Port-Royal while its people are away. Charles de Biencourt and young Charles de La Tour take refuge with the Mi'kmaq."),
 choices:[
  {label:R("Les laisser vivre avec les Mi'kmaq","Let them live with the Mi'kmaq"),hist:true,fx:s=>{const A=A_(s);A.pop=Math.min(A.pop,16);A.mik+=8;return R("Une poignée de Français reste, mêlée aux Mi'kmaq, traitant les fourrures au cap de Sable. L'Acadie tient à un fil.","A handful of Frenchmen stay, living among the Mi'kmaq, trading furs at Cape Sable. Acadia hangs by a thread.");}},
  {label:R("Protester à Paris et envoyer une barque","Protest in Paris and send a boat"),fx:s=>{const A=A_(s);A.pop=Math.max(A.pop*.7,18);s.treasury-=120;s.compagnie+=2;return R("Paris proteste mollement. La barque ramène quelques survivants.","Paris protests feebly. The boat brings back a few survivors.");}}]});

P1({id:'razilly1632',place:'portRoyal',cond:s=>s.year>=1632&&s.fired.acadie1610&&!s.flags.occupied,
 title:R("Razilly et les premières familles","Razilly and the first families"),
 text:R("Le traité de Saint-Germain-en-Laye rend l'Acadie à la France. Isaac de Razilly arrive à La Hève avec trois cents hommes. Pour que la colonie dure, il faut des familles, des laboureurs, des femmes. Charles de Menou d'Aulnay en fera venir du Loudunais.","The Treaty of Saint-Germain-en-Laye returns Acadia to France. Isaac de Razilly lands at La Hève with three hundred men. For the colony to last, it needs families, ploughmen, women. Charles de Menou d'Aulnay will bring some from the Loudun country."),
 choices:[
  {label:R("Appuyer l'envoi de familles","Support sending families"),hist:true,fx:s=>{const A=A_(s);A.pop+=150;return R("Les Le Blanc, Bourgeois, Thibodeau, Landry, Cormier, Gaudet… Quelques dizaines de familles feront tout un peuple.","The Le Blancs, Bourgeois, Thibodeaus, Landrys, Cormiers, Gaudets… A few dozen families will make a whole people.");}},
  {label:R("Partager les recrues entre Québec et l'Acadie","Share the recruits between Québec and Acadia"),fx:s=>{const A=A_(s);A.pop+=90;s.recruitMod*=1.05;return R("Les deux colonies grandissent un peu, chacune de son côté.","The two colonies each grow a little, on their own.");}},
  {label:R("Tout pour Québec","Everything for Québec"),fx:s=>{const A=A_(s);A.pop+=40;s.recruitMod*=1.1;return R("Razilly garde ses soldats ; l'Acadie reste un poste de traite.","Razilly keeps his soldiers; Acadia remains a trading post.");}}]});

P1({id:'latour1645',place:'portRoyal',cond:s=>s.year>=1645&&s.fired.razilly1632,
 title:R("La Tour contre d'Aulnay","La Tour against d'Aulnay"),
 text:R("L'Acadie est en guerre civile. Charles de La Tour, qui commerce avec Boston, et Charles d'Aulnay, qui a la commission du roi, se disputent les fourrures et les forts. D'Aulnay assiège le fort La Tour sur la rivière Saint-Jean ; Françoise-Marie Jacquelin le défend en l'absence de son mari.","Acadia is at civil war. Charles de La Tour, who trades with Boston, and Charles d'Aulnay, who holds the king's commission, fight over the furs and the forts. D'Aulnay besieges Fort La Tour on the Saint John River; Françoise-Marie Jacquelin defends it while her husband is away."),
 choices:[
  {label:R("Soutenir d'Aulnay, l'homme du roi","Back d'Aulnay, the king's man"),hist:true,fx:s=>{const A=A_(s);A.pop+=60;s.compagnie+=2;return R("Le fort tombe ; Françoise-Marie Jacquelin meurt peu après. D'Aulnay installe ses colons à Port-Royal. La Tour, ironie, épousera sa veuve en 1653.","The fort falls; Françoise-Marie Jacquelin dies soon after. D'Aulnay settles his colonists at Port-Royal. La Tour, ironically, will marry his widow in 1653.");}},
  {label:R("Soutenir La Tour et le commerce avec Boston","Back La Tour and the Boston trade"),fx:s=>{const A=A_(s);A.pop+=30;A.mik+=4;s.treasury+=200;s.compagnie-=4;return R("La Tour tient la rivière Saint-Jean. Boston devient le marché de l'Acadie, et un jour son maître.","La Tour holds the Saint John River. Boston becomes Acadia's market, and one day its master.");}},
  {label:R("Imposer une paix entre les deux","Impose peace between them"),fx:s=>{const A=A_(s);A.pop+=80;s.treasury-=300;return R("Un arbitre de Québec partage les côtes. L'Acadie économise une guerre.","An arbiter from Québec divides the coasts. Acadia is spared a war.");}}]});

P1({id:'sedgwick1654',place:'portRoyal',cond:s=>s.year>=1654&&s.fired.razilly1632,
 title:R("Sedgwick prend Port-Royal","Sedgwick takes Port-Royal"),
 text:R("Une flotte de la Nouvelle-Angleterre, commandée par Robert Sedgwick, s'empare des forts acadiens. Pour seize ans, l'Acadie sera anglaise. Les habitants restent sur leurs terres et attendent.","A New England fleet under Robert Sedgwick seizes the Acadian forts. For sixteen years Acadia will be English. The settlers stay on their land and wait."),
 choices:[
  {label:R("On ne peut rien : attendre la paix","Nothing can be done: wait for peace"),hist:true,fx:s=>{const A=A_(s);A.st='occ';return R("Les Acadiens apprennent à vivre sous un autre drapeau, en gardant leur foi et leur langue. Ils sauront s'en souvenir.","The Acadians learn to live under another flag, keeping their faith and language. They will remember how.");}},
  {label:R("Envoyer une expédition de secours","Send a relief expedition"),fx:s=>{const A=A_(s);s.treasury-=600;s.defense-=8;if(Math.random()<.25){return R("Le coup réussit : Port-Royal reste française. Boston ne pardonnera pas.","The stroke succeeds: Port-Royal stays French. Boston will not forgive.");}A.st='occ';s.pop-=10;return R("L'expédition échoue sur la côte. Une dizaine d'hommes ne reviennent pas.","The expedition fails on the coast. A dozen men do not return.");}}]});

/* ====================== Période II : la Nouvelle-France et l'Acadie ====================== */
PN(2,{id:'acadie1670',place:'portRoyal',cond:s=>s.year>=1670&&A_(s).st==='occ',must:true,
 title:R("L'Acadie rendue","Acadia returned"),
 text:R("Le traité de Breda rend l'Acadie à la France. Le chevalier de Grandfontaine prend possession de Pentagouët et de Port-Royal. Le premier recensement compte moins de quatre cents personnes. Talon propose d'y envoyer des colons et une soixantaine de soldats et de filles.","The Treaty of Breda returns Acadia to France. The Chevalier de Grandfontaine takes possession of Pentagouët and Port-Royal. The first census counts fewer than four hundred people. Talon proposes sending settlers and some sixty soldiers and girls."),
 choices:[
  {label:R("Envoyer une soixantaine de colons","Send some sixty settlers"),hist:true,fx:s=>{const A=A_(s);A.st='fr';A.pop+=60;s.treasury-=600;return R("Le recensement de 1671 compte 392 personnes à Port-Royal. Les familles se multiplieront vite.","The 1671 census counts 392 people at Port-Royal. The families will multiply quickly.");}},
  {label:R("Un vrai effort : deux cents colons","A real effort: two hundred settlers"),fx:s=>{const A=A_(s);A.st='fr';A.pop+=200;s.treasury-=1800;s.pop-=60;return R("L'Acadie double presque. Le Canada en sent le prix.","Acadia almost doubles. Canada feels the cost.");}},
  {label:R("Laisser l'Acadie à elle-même","Leave Acadia to itself"),fx:s=>{const A=A_(s);A.st='fr';return R("Grandfontaine n'a que ses soldats. Les Acadiens commercent avec Boston.","Grandfontaine has only his soldiers. The Acadians trade with Boston.");}}]});

PN(2,{id:'aboiteaux1680',place:'portRoyal',cond:s=>s.year>=1680&&A_(s).st==='fr',
 title:R("Les aboiteaux","The aboiteaux"),
 text:R("Les Acadiens ne défrichent pas la forêt : ils endiguent les marais salés du fond de la baie Française, avec des digues et des clapets de bois, les aboiteaux. Des familles quittent Port-Royal pour Beaubassin, les Mines (Grand-Pré), Pigiguit, Cobequid.","The Acadians do not clear forest: they dike the salt marshes at the head of the Bay of Fundy, with earth dikes and wooden sluices, the aboiteaux. Families leave Port-Royal for Beaubassin, Minas (Grand-Pré), Pisiquid, Cobequid."),
 choices:[
  {label:R("Laisser les familles essaimer","Let the families spread out"),hist:true,fx:s=>{const A=A_(s);A.pop+=40;A.mik+=3;return R("Les Mines deviennent le grenier de l'Acadie. Les villages sont loin des forts, et loin du gouverneur.","Minas becomes the granary of Acadia. The villages are far from the forts, and from the governor.");}},
  {label:R("Les garder près de Port-Royal","Keep them near Port-Royal"),fx:s=>{const A=A_(s);A.pop-=20;s.defense+=2;return R("Port-Royal reste le cœur. Les jeunes partent quand même, en cachette.","Port-Royal stays the heart. The young leave anyway, quietly.");}}]});

PN(2,{id:'phipsAcadie1690',place:'portRoyal',cond:s=>s.year>=1690&&s.war&&A_(s).st==='fr',
 title:R("Phips à Port-Royal","Phips at Port-Royal"),
 text:R("Avant d'attaquer Québec, William Phips prend Port-Royal sans combat. Il pille l'église, fait prêter aux habitants un serment au roi Guillaume et repart. Les Acadiens ont compris : leur pays est un champ de bataille entre deux empires.","Before attacking Québec, William Phips takes Port-Royal without a fight. He loots the church, makes the settlers swear an oath to King William, and sails off. The Acadians have understood: their country is a battlefield between two empires."),
 choices:[
  {label:R("Prêter serment et rester neutres","Swear the oath and stay neutral"),hist:true,fx:s=>{const A=A_(s);A.trust+=5;A.neutral=true;return R("La neutralité devient une manière de survivre. Elle durera soixante ans.","Neutrality becomes a way to survive. It will last sixty years.");}},
  {label:R("Prendre les armes avec les Mi'kmaq","Take up arms with the Mi'kmaq"),fx:s=>{const A=A_(s);A.mik+=8;A.pop-=30;A.trust-=10;return R("La guérilla commence. Boston répondra par des raids.","The guerrilla begins. Boston will answer with raids.");}}]});

PN(2,{id:'church1704',place:'portRoyal',cond:s=>s.year>=1704&&s.war&&A_(s).st==='fr',
 title:R("Les raids de Benjamin Church","Benjamin Church's raids"),
 text:R("En représailles pour Deerfield, Benjamin Church et ses miliciens remontent la baie Française : ils brûlent Grand-Pré, Pigiguit et Beaubassin et ouvrent les digues pour noyer les récoltes.","In reprisal for Deerfield, Benjamin Church and his militiamen sail up the Bay of Fundy: they burn Grand-Pré, Pisiquid and Beaubassin and breach the dikes to drown the crops."),
 choices:[
  {label:R("Rebâtir les digues","Rebuild the dikes"),hist:true,fx:s=>{const A=A_(s);A.pop-=25;return R("Les Acadiens réparent les aboiteaux en un été. Les marais redonneront du blé dès l'an prochain.","The Acadians repair the aboiteaux in one summer. The marshes will give wheat again next year.");}},
  {label:R("Envoyer des Canadiens et des Abénakis","Send Canadians and Abenaki"),fx:s=>{const A=A_(s);s.treasury-=1200;s.defense-=4;relAdd(s,'abenaki',4);A.mik+=4;return R("Les raids reprennent sur la côte de la Nouvelle-Angleterre. L'Acadie respire, et devient une cible.","The raids resume on the New England coast. Acadia breathes, and becomes a target.");}}]});

PN(2,{id:'portroyal1710',place:'portRoyal',cond:s=>s.year>=1710&&s.war&&A_(s).st==='fr',must:true,
 title:R("La chute de Port-Royal","The fall of Port-Royal"),
 text:R("Francis Nicholson arrive avec 36 navires et 2 000 hommes. Le gouverneur Subercase n'a que 300 soldats. Port-Royal devient Annapolis Royal.","Francis Nicholson arrives with 36 ships and 2,000 men. Governor Subercase has only 300 soldiers. Port-Royal becomes Annapolis Royal."),
 choices:[
  {label:R("Capituler avec les honneurs","Surrender with honours"),hist:true,fx:s=>{const A=A_(s);A.st='br';A.oath='none';A.fr=.06;return R("La garnison rentre en France. Les Acadiens, eux, restent : ils sont désormais sujets d'une reine anglaise, sans l'avoir choisi.","The garrison returns to France. The Acadians stay: they are now subjects of an English queen, without having chosen it.");}},
  {label:R("Soutenir un long siège","Hold a long siege"),fx:s=>{const A=A_(s);s.treasury-=2000;s.defense-=6;if(Math.random()<.2)return R("Les Anglais lèvent le siège à l'approche de l'hiver. Pour combien de temps ?","The English lift the siege as winter comes. For how long?");A.st='br';A.oath='none';A.fr=.06;A.pop-=60;return R("Port-Royal tombe quand même, après des semaines de bombardements.","Port-Royal falls anyway, after weeks of bombardment.");}}]});

PN(2,{id:'serment1730',place:'portRoyal',cond:s=>s.year>=1729&&A_(s).st==='br',
 title:R("Le serment de Philipps","Philipps's oath"),
 text:R("Le gouverneur Richard Philipps exige un serment de fidélité au roi George. Les Acadiens acceptent, à une condition dite de vive voix : ils ne porteront jamais les armes, ni contre les Anglais, ni contre les Français et les Mi'kmaq.","Governor Richard Philipps demands an oath of fidelity to King George. The Acadians agree, on one condition stated aloud: they will never bear arms, neither against the English nor against the French and the Mi'kmaq."),
 choices:[
  {label:R("Le serment avec la réserve de neutralité","The oath with the neutrality clause"),hist:true,fx:s=>{const A=A_(s);A.oath='neutral';A.trust+=6;return R("On les appellera les « Français neutres ». Londres n'a jamais vu cette réserve écrite noir sur blanc.","They will be called the 'neutral French'. London never saw that clause in black and white.");}},
  {label:R("Prêter un serment sans réserve","Swear an unconditional oath"),fx:s=>{const A=A_(s);A.oath='full';A.trust+=18;A.mik-=8;s.off.eve-=4;return R("Les Acadiens deviennent des sujets britanniques à part entière. Les missionnaires français parlent de trahison.","The Acadians become full British subjects. The French missionaries speak of betrayal.");}},
  {label:R("Refuser et rester fidèles au roi de France","Refuse and stay loyal to the King of France"),fx:s=>{const A=A_(s);A.oath='refus';A.trust-=15;A.fr+=.05;return R("Les plus décidés partent pour l'île Royale. Les autres restent, sous surveillance.","The most determined leave for Île Royale. The others stay, under watch.");}}]});

PN(2,{id:'grandpre1747',place:'portRoyal',cond:s=>s.year>=1747&&s.war&&A_(s).st==='br',
 title:R("La bataille de Grand-Pré","The Battle of Grand-Pré"),
 text:R("Un détachement de Canadiens et de Mi'kmaq, commandé par Coulon de Villiers, traverse l'Acadie en raquettes et surprend la nuit les soldats de la Nouvelle-Angleterre cantonnés chez les habitants de Grand-Pré.","A detachment of Canadians and Mi'kmaq under Coulon de Villiers crosses Acadia on snowshoes and surprises, at night, the New England soldiers billeted with the settlers of Grand-Pré."),
 choices:[
  {label:R("Attaquer","Attack"),hist:true,fx:s=>{const A=A_(s);A.trust-=10;s.defense+=2;return R("Une victoire française, au milieu des maisons acadiennes. À Boston, on se dit que les « neutres » ne le sont pas.","A French victory, in the middle of Acadian homes. In Boston, people say the 'neutrals' are not neutral.");}},
  {label:R("Épargner les villages acadiens","Spare the Acadian villages"),fx:s=>{const A=A_(s);A.trust+=4;return R("Le détachement rentre au Canada sans combattre. Les Acadiens respirent.","The detachment returns to Canada without fighting. The Acadians breathe.");}}]});

PN(2,{id:'beausejour1755',place:'portRoyal',cond:s=>s.year>=1755&&A_(s).st==='br'&&s.flags.acadiaLost,must:true,
 title:R("Le serment de Lawrence","Lawrence's oath"),
 text:R("Le fort Beauséjour est tombé ; on y a trouvé quelque 270 Acadiens en armes. Le gouverneur Charles Lawrence convoque les délégués des villages : ils prêteront un serment sans réserve, ou il en tirera les conséquences.","Fort Beauséjour has fallen; some 270 Acadians were found inside under arms. Governor Charles Lawrence summons the village delegates: they will swear an unconditional oath, or he will draw the consequences."),
 choices:[
  {label:R("Refuser : nous avons déjà juré, avec réserve","Refuse: we already swore, with a clause"),hist:true,fx:s=>{const A=A_(s);A.oath='refus';A.trust-=12;return R("Les délégués sont emprisonnés à l'île Georges. Le 28 juillet, le Conseil de Halifax décide la déportation.","The delegates are imprisoned on Georges Island. On 28 July, the Halifax Council decides on deportation.");}},
  {label:R("Prêter le serment sans réserve","Swear the unconditional oath"),fx:s=>{const A=A_(s);A.oath='full';A.trust+=30;A.mik-=10;return R("Les délégués signent, la mort dans l'âme. Lawrence hésite : il voulait leurs terres pour des colons de la Nouvelle-Angleterre.","The delegates sign, heavy-hearted. Lawrence hesitates: he wanted their land for New England settlers.");}},
  {label:R("Partir en masse vers les terres françaises","Leave en masse for French lands"),fx:s=>{const A=A_(s);A.fr=Math.min(.7,A.fr+.35);A.trust-=20;A.pop*=.96;return R("Des villages entiers passent l'isthme, vers l'île Saint-Jean et la rivière Saint-Jean. Lawrence fait brûler ce qui reste.","Whole villages cross the isthmus, to Île Saint-Jean and the Saint John River. Lawrence has what remains burned.");}}]});

/* le Grand Dérangement : l'ancien événement prend appui sur le moteur acadien */
{const e=EV.acadie1755;if(e){
  e.cond=s=>s.year>=1755&&s.flags.acadiaLost&&A_(s).st==='br'&&s.fired.beausejour1755;
  e.text=s=>{const A=A_(s);return R(`Le Conseil de Halifax a tranché. Le 5 septembre, à Grand-Pré, le colonel Winslow lit l'ordre dans l'église : les terres et le bétail sont confisqués au profit du roi, les habitants seront embarqués. Plus de ${nf(Math.round(A.pop*(1-A.fr)*.55/100)*100,'fr')} Acadiens vont être dispersés dans les colonies anglaises, les familles séparées sur les navires. Les maisons brûlent derrière eux.`,`The Halifax Council has decided. On 5 September, at Grand-Pré, Colonel Winslow reads the order in the church: land and livestock are forfeit to the King, the settlers will be shipped away. Over ${nf(Math.round(A.pop*(1-A.fr)*.55/100)*100,'en')} Acadians are to be scattered across the English colonies, families separated on the ships. The houses burn behind them.`);};
  e.choices=[
   {label:R("Accueillir les réfugiés au Canada","Take in the refugees in Canada"),hist:true,fx:s=>{const r=acadDeport(s,'refuge');s.pop+=r.toQc;s.women+=Math.round(r.toQc*.25);s.food-=r.toQc;s.mods.epid=(s.mods.epid||0)+.008;T(s,'ouverture',3);return R(`${nf(r.dep,'fr')} Acadiens sont déportés. Près de ${nf(r.toQc,'fr')} gagnent Québec, affamés et malades ; la variole les suit.`,`${nf(r.dep,'en')} Acadians are deported. Nearly ${nf(r.toQc,'en')} reach Québec, starving and sick; smallpox follows them.`);}},
   {label:R("Soutenir la résistance acadienne et mi'kmaq","Support the Acadian and Mi'kmaq resistance"),fx:s=>{const r=acadDeport(s,'resist');s.pop+=r.toQc;s.treasury-=2000;s.defense-=4;relAdd(s,'abenaki',8);T(s,'alliance',3);A_(s).mik+=8;return R(`Boishébert et Joseph Broussard dit Beausoleil mènent la guérilla avec les Mi'kmaq. ${nf(r.dep,'fr')} sont déportés, mais des communautés entières échappent aux navires et se cachent sur la Miramichi.`,`Boishébert and Joseph Broussard "Beausoleil" lead the guerrilla with the Mi'kmaq. ${nf(r.dep,'en')} are deported, but whole communities escape the ships and hide on the Miramichi.`);}},
   {label:R("Organiser la fuite vers le Canada et l'île Saint-Jean","Organize the flight to Canada and Île Saint-Jean"),fx:s=>{const r=acadDeport(s,'flee');s.pop+=r.toQc;s.women+=Math.round(r.toQc*.25);s.food-=r.toQc*1.2;s.treasury-=1200;s.mods.epid=(s.mods.epid||0)+.01;return R(`Des goélettes et des canots emmènent les familles par la baie Verte et la rivière Saint-Jean. ${nf(r.toQc,'fr')} arrivent au Canada ; ${nf(r.dep,'fr')} n'ont pas pu partir à temps.`,`Schooners and canoes carry families out by Baie Verte and the Saint John River. ${nf(r.toQc,'en')} reach Canada; ${nf(r.dep,'en')} could not leave in time.`);}}];}}
LIKELY.acadie1755=s=>acadDeportP(s);
Object.assign(DIVERGE,{acadie1755:R("Dans l'histoire, les Acadiens sont déportés à partir de 1755. Ici, Lawrence recule : ils restent sur leurs terres, sujets britanniques et « neutres ».","In history, the Acadians were deported from 1755. Here, Lawrence backs down: they stay on their land, British subjects and 'neutral'.")});
/* si la déportation n'a pas lieu, l'Acadie reste britannique et neutre */
PN(2,{id:'acadieReste1756',place:'portRoyal',cond:s=>s.year>=1756&&s.fired.acadie1755&&A_(s).st==='br'&&!s.flags.grandDerangement,
 title:R("Les neutres restent","The neutrals stay"),
 text:R("L'ordre de déportation n'a pas été exécuté. Londres a préféré garder des fermiers qui nourrissent ses garnisons. Mais Halifax veut des terres pour les colons de la Nouvelle-Angleterre.","The deportation order was not carried out. London preferred to keep farmers who feed its garrisons. But Halifax wants land for New England settlers."),
 choices:[
  {label:R("Les encourager à rester neutres","Encourage them to stay neutral"),hist:true,fx:s=>{const A=A_(s);A.trust+=10;A.oath='neutral';return R("Les Acadiens restent sur leurs aboiteaux. Ils seront britanniques, catholiques et français : un précédent pour le Canada.","The Acadians stay on their dikelands. They will be British, Catholic and French: a precedent for Canada.");}},
  {label:R("Les inviter au Canada","Invite them to Canada"),fx:s=>{const A=A_(s);const n=Math.round(A.pop*.12);A.pop-=n;A.qc+=n;s.pop+=n;s.women+=Math.round(n*.25);s.treasury-=1500;return R(`${nf(n,'fr')} Acadiens remontent le fleuve vers le Canada en guerre.`,`${nf(n,'en')} Acadians come up the river to Canada at war.`);}}]});

PN(2,{id:'ilestjean1758',place:'louisbourg',cond:s=>s.year>=1758&&s.flags.lbg58&&A_(s).pop>200&&(A_(s).fr>.05||A_(s).st==='dep'),must:true,
 title:R("La déportation de l'île Saint-Jean","The deportation of Île Saint-Jean"),
 text:R("Louisbourg est tombée. Lord Rollo débarque à l'île Saint-Jean, où des milliers d'Acadiens s'étaient réfugiés. On les embarque pour la France, à l'automne, sur des navires surchargés.","Louisbourg has fallen. Lord Rollo lands on Île Saint-Jean, where thousands of Acadians had taken refuge. They are shipped to France, in autumn, on overloaded ships."),
 choices:[
  {label:R("On ne peut plus rien","Nothing more can be done"),hist:true,fx:s=>{const r=acadDeportIsles(s,false);return R(`${nf(r.dep,'fr')} sont déportés vers la France. Le Duke William, la Violet et le Ruby sombrent ; ${nf(r.dead,'fr')} meurent noyés ou de maladie.`,`${nf(r.dep,'en')} are deported to France. The Duke William, the Violet and the Ruby sink; ${nf(r.dead,'en')} drown or die of disease.`);}},
  {label:R("Aider les familles à fuir vers la baie des Chaleurs","Help families flee to the Baie des Chaleurs"),fx:s=>{const A=A_(s);const r=acadDeportIsles(s,true);const n=Math.round(r.dep*.3);A.pop+=0;s.treasury-=1000;return R(`Des centaines passent à Restigouche et à la Miramichi. ${nf(r.dep,'fr')} sont tout de même déportés.`,`Hundreds cross to Restigouche and the Miramichi. ${nf(r.dep,'en')} are deported all the same.`);}}]});

CQ(2,{id:'cq_acadieBoston',place:'portRoyal',cond:s=>s.year>=1715&&A_(s).st==='br'&&A_(s).pop>3000,w:s=>1.5,
 because:s=>R("Les Acadiens sont nombreux et vivent sous le drapeau britannique.","The Acadians are numerous and live under the British flag."),
 title:R("Le commerce de Boston","The Boston trade"),
 text:R("Les Acadiens vendent leur bétail et leur blé à Louisbourg… et achètent leurs outils à Boston. Les uns les disent contrebandiers, les autres traîtres.","The Acadians sell their cattle and wheat to Louisbourg… and buy their tools from Boston. Some call them smugglers, others traitors."),
 choices:[
  {label:R("Fermer les yeux : Louisbourg a besoin de leur blé","Look away: Louisbourg needs their wheat"),fx:s=>{s.treasury+=600;s.food+=400;const A=A_(s);A.trust-=3;return R("Les marchés de Louisbourg se remplissent de bœuf acadien.","Louisbourg's markets fill with Acadian beef.");}},
  {label:R("Les inviter à s'établir à l'île Saint-Jean","Invite them to settle on Île Saint-Jean"),fx:s=>{const A=A_(s);A.fr+=.05;s.treasury-=600;A.trust-=4;return R("Quelques familles passent le détroit. Port-La-Joye grandit.","A few families cross the strait. Port-La-Joye grows.");}}]});

/* ====================== Période III : le retour ====================== */
PN(3,{id:'retour1764',place:'quebec',cond:s=>s.year>=1764&&A_(s).deported>0,must:true,
 title:R("Les exilés reviennent","The exiles come back"),
 text:s=>{const A=A_(s);return R(`Londres autorise les Acadiens à s'établir en Nouvelle-Écosse, en petits groupes et loin de leurs anciennes terres, données à des colons de la Nouvelle-Angleterre. Environ ${nf(Math.round(A.exil/100)*100,'fr')} sont encore en exil. Certains demandent à venir dans la province de Québec.`,`London allows the Acadians to settle in Nova Scotia, in small groups and far from their old lands, which were given to New England settlers. About ${nf(Math.round(A.exil/100)*100,'en')} are still in exile. Some ask to come to the Province of Quebec.`);},
 choices:[
  {label:R("Les accueillir : des terres à L'Acadie, à Saint-Jacques, à Nicolet","Welcome them: land at L'Acadie, Saint-Jacques, Nicolet"),hist:true,fx:s=>{const A=A_(s);const n=Math.round(A.exil*.14);A.exil-=n;A.qc+=n;s.pop+=n;T(s,'entraide',2);return R(`${nf(n,'fr')} Acadiens s'établissent dans la vallée du Richelieu et autour de Nicolet. On appellera ces paroisses « la Petite-Cadie ».`,`${nf(n,'en')} Acadians settle in the Richelieu valley and around Nicolet. These parishes will be called 'Little Acadia'.`);}},
  {label:R("Laisser chacun retourner aux Maritimes","Let each go back to the Maritimes"),fx:s=>{const A=A_(s);const n=Math.round(A.exil*.1);A.exil-=n;A.pop+=n;A.ret+=n;return R("Les exilés reviennent à pied, par le Maine. Ils s'établissent sur les côtes : Baie Sainte-Marie, Memramcook, Caraquet.","The exiles walk back through Maine. They settle on the coasts: St. Mary's Bay, Memramcook, Caraquet.");}}]});

PN(3,{id:'louisiane1785',place:'quebec',cond:s=>s.year>=1784&&A_(s).dest&&A_(s).dest.fr>300,
 title:R("Les sept navires","The seven ships"),
 text:R("En France, des centaines d'Acadiens survivent mal dans le Poitou et à Nantes depuis vingt ans. L'Espagne, maîtresse de la Louisiane, offre de les transporter et de leur donner des terres sur le bayou. D'autres voix leur proposent plutôt le Canada.","In France, hundreds of Acadians have been barely getting by in Poitou and Nantes for twenty years. Spain, master of Louisiana, offers to ship them out and give them land on the bayou. Other voices propose Canada instead."),
 choices:[
  {label:R("Les laisser partir pour la Louisiane","Let them go to Louisiana"),hist:true,fx:s=>{const A=A_(s);const n=Math.min(1600,Math.round(A.exil*.55)+800);A.exil=Math.max(0,A.exil-n*.6);A.cajun+=n;A.dest.la=(A.dest.la||0)+n;A.dest.fr=Math.max(0,A.dest.fr-n);return R(`En 1785, sept navires emmènent ${nf(n,'fr')} Acadiens à La Nouvelle-Orléans. Avec ceux venus des colonies depuis 1765, ils deviendront les Cadiens, les « Cajuns ».`,`In 1785, seven ships carry ${nf(n,'en')} Acadians to New Orleans. With those who came from the colonies since 1765, they will become the Cajuns.`);}},
  {label:R("Les inviter dans la province de Québec","Invite them to the Province of Quebec"),fx:s=>{const A=A_(s);const n=Math.min(1200,Math.round(A.exil*.5)+600);A.exil=Math.max(0,A.exil-n*.6);A.qc+=n;s.pop+=n;s.compagnie-=3;return R(`${nf(n,'fr')} Acadiens arrivent à Québec. Le gouverneur Haldimand grince : encore des catholiques français.`,`${nf(n,'en')} Acadians arrive in Québec. Governor Haldimand grumbles: more French Catholics.`);}}]});

PN(3,{id:'madawaska1785',place:'quebec',cond:s=>s.year>=1785&&A_(s).ret>500,
 title:R("La Madawaska","The Madawaska"),
 text:R("Les Loyalistes réfugiés des États-Unis prennent les terres des Acadiens de la Sainte-Anne, sur la rivière Saint-Jean. Ceux-ci remontent encore la rivière jusqu'à la Madawaska, à la frontière de la province de Québec.","Loyalist refugees from the United States take the lands of the Sainte-Anne Acadians on the Saint John River. They move further up the river to the Madawaska, at the edge of the Province of Quebec."),
 choices:[
  {label:R("Les laisser s'établir à la Madawaska","Let them settle on the Madawaska"),hist:true,fx:s=>{const A=A_(s);A.pop+=80;return R("Avec des Canadiens venus du Témiscouata, ils fondent un petit pays « brayon », qu'une frontière coupera en deux en 1842.","With Canadiens from Témiscouata, they found a small 'Brayon' country, which a border will cut in two in 1842.");}},
  {label:R("Leur offrir des terres au Témiscouata","Offer them land in Témiscouata"),fx:s=>{const A=A_(s);const n=Math.round(A.pop*.02);A.pop-=n;A.qc+=n;s.pop+=n;return R("Quelques centaines passent dans la province de Québec.","A few hundred move into the Province of Quebec.");}}]});

PN(3,{id:'evangeline1847',place:'portRoyal',cond:s=>s.year>=1847&&A_(s).st!=='none',
 title:R("Évangéline","Evangeline"),
 text:R("Le poète américain Henry Wadsworth Longfellow publie Évangéline, l'histoire d'une jeune Acadienne séparée de son fiancé à Grand-Pré. Le poème fait le tour du monde ; les Acadiens se découvrent une héroïne, et une histoire.","The American poet Henry Wadsworth Longfellow publishes Evangeline, the story of a young Acadian woman separated from her fiancé at Grand-Pré. The poem goes round the world; the Acadians discover a heroine, and a history."),
 choices:[
  {label:R("Le faire traduire et diffuser","Have it translated and spread"),hist:true,fx:s=>{const A=A_(s);A.vit+=4;s.patri+=1;return R("Pamphile Le May le traduit en 1865. Évangéline devient le symbole de tout un peuple.","Pamphile Le May translates it in 1865. Evangeline becomes the symbol of a whole people.");}},
  {label:R("Ce n'est qu'un poème américain","It is only an American poem"),fx:s=>R("Le poème fait son chemin sans vous.","The poem makes its way without you.")}]});

PN(3,{id:'memramcook1864',place:'portRoyal',cond:s=>s.year>=1864&&A_(s).st!=='none'&&A_(s).deported>0,
 title:R("Le collège de Memramcook","The Memramcook college"),
 text:R("Le père Camille Lefebvre, un Québécois de la congrégation de Sainte-Croix, ouvre le collège Saint-Joseph à Memramcook. Pour la première fois, les Acadiens auront leurs propres prêtres, avocats, journalistes. Il demande l'aide du Québec.","Father Camille Lefebvre, a Québécois of the Congregation of Holy Cross, opens the Collège Saint-Joseph at Memramcook. For the first time, the Acadians will have their own priests, lawyers and journalists. He asks Quebec for help."),
 choices:[
  {label:R("L'appuyer : maîtres et souscriptions","Support it: teachers and subscriptions"),hist:true,fx:s=>{const A=A_(s);s.flags.memramcook=true;A.vit+=6;s.treasury-=600;return R("De Memramcook sortira l'élite de la renaissance acadienne.","Out of Memramcook will come the elite of the Acadian renaissance.");}},
  {label:R("Le laisser se débrouiller","Let it manage"),fx:s=>{const A=A_(s);s.flags.memramcook=true;A.vit+=2;return R("Le collège ouvre, modestement.","The college opens, modestly.");}}]});

/* ====================== Période IV : la renaissance ====================== */
PN(4,{id:'caraquet1875',place:'bytown',cond:s=>s.year>=1875&&s.flags.nbSchools,
 title:R("L'émeute de Caraquet","The Caraquet riot"),
 text:R("À Caraquet, des Acadiens refusent de payer la taxe pour les écoles « neutres » du Nouveau-Brunswick. La milice arrive ; dans l'échauffourée, un jeune Acadien, Louis Mailloux, et un milicien sont tués.","At Caraquet, Acadians refuse to pay the tax for New Brunswick's 'neutral' schools. The militia comes; in the scuffle a young Acadian, Louis Mailloux, and a militiaman are killed."),
 choices:[
  {label:R("Soutenir les Acadiens : avocats et pétitions","Back the Acadians: lawyers and petitions"),hist:true,fx:s=>{const A=A_(s);s.flags.caraquet=true;A.vit+=4;s.treasury-=M4(s,.01);s.patri+=2;return R("Un compromis tolère des enseignants religieux dans les écoles catholiques. Louis Mailloux devient un martyr.","A compromise tolerates religious teachers in Catholic schools. Louis Mailloux becomes a martyr.");}},
  {label:R("Ne pas s'en mêler","Stay out of it"),fx:s=>{const A=A_(s);s.flags.caraquet=true;A.vit-=3;return R("Les Acadiens se sentent seuls.","The Acadians feel alone.");}}]});

PN(4,{id:'convention1881',place:'bytown',cond:s=>s.year>=1881,
 title:R("La convention de Memramcook","The Memramcook convention"),
 text:R("Cinq mille Acadiens se réunissent à Memramcook pour leur première convention nationale. Faut-il adopter la Saint-Jean-Baptiste, fête des Canadiens français, ou une fête à soi, l'Assomption du 15 août ? Des Québécois plaident pour l'union.","Five thousand Acadians gather at Memramcook for their first national convention. Should they adopt Saint-Jean-Baptiste Day, the French Canadians' holiday, or a day of their own, the Feast of the Assumption, 15 August? Québécois speakers plead for union."),
 choices:[
  {label:R("Laisser les Acadiens choisir l'Assomption","Let the Acadians choose the Assumption"),hist:true,fx:s=>{const A=A_(s);s.flags.convention1881=true;A.vit+=6;return R("Le 15 août devient la fête nationale de l'Acadie. Les Acadiens sont un peuple, pas une branche du Québec.","15 August becomes Acadia's national holiday. The Acadians are a people, not a branch of Quebec.");}},
  {label:R("Plaider pour la Saint-Jean-Baptiste","Plead for Saint-Jean-Baptiste"),fx:s=>{const A=A_(s);s.flags.convention1881=true;A.vit+=2;s.minorVit+=2;s.patri+=1;return R("La convention vote quand même pour l'Assomption, mais garde le lien avec le Canada français.","The convention votes for the Assumption anyway, but keeps the bond with French Canada.");}}]});

PN(4,{id:'drapeau1884',place:'bytown',cond:s=>s.year>=1884&&s.flags.convention1881,
 title:R("Le drapeau de Miscouche","The Miscouche flag"),
 text:R("À la deuxième convention, à Miscouche, l'abbé Marcel-François Richard présente un drapeau : le tricolore français, avec une étoile dorée, Stella Maris. On adopte aussi un hymne, l'Ave Maris Stella.","At the second convention, at Miscouche, Father Marcel-François Richard presents a flag: the French tricolour with a golden star, Stella Maris. A hymn is adopted too, the Ave Maris Stella."),
 choices:[
  {label:R("Saluer le drapeau acadien","Salute the Acadian flag"),hist:true,fx:s=>{const A=A_(s);s.flags.drapeauAcadien=true;A.vit+=4;return R("L'étoile de l'Acadie flotte sur les églises de Caraquet à Chéticamp.","The star of Acadia flies over the churches from Caraquet to Chéticamp.");}}]});

PN(4,{id:'eveque1912',place:'bytown',cond:s=>s.year>=1912&&A_(s).st==='ren',
 title:R("Un évêque acadien","An Acadian bishop"),
 text:R("Dans les Maritimes, les évêques sont irlandais et anglophones ; les paroisses acadiennes réclament des leurs. Rome nomme enfin Édouard LeBlanc, premier évêque acadien, à Saint-Jean.","In the Maritimes the bishops are Irish and English-speaking; Acadian parishes ask for their own. Rome at last appoints Édouard LeBlanc, the first Acadian bishop, to Saint John."),
 choices:[
  {label:R("Appuyer la demande à Rome","Support the request in Rome"),hist:true,fx:s=>{const A=A_(s);s.flags.evequeAcadien=true;A.vit+=5;s.off.eve+=2;return R("D'autres suivront, à Chatham et à Moncton. L'Église devient un rempart de la langue.","Others follow, at Chatham and Moncton. The Church becomes a bulwark of the language.");}},
  {label:R("Ne pas se mêler des affaires de Rome","Stay out of Rome's affairs"),fx:s=>{const A=A_(s);s.flags.evequeAcadien=true;A.vit+=2;return R("La nomination vient quand même, plus tard.","The appointment comes anyway, later.");}}]});

PN(4,{id:'grandpre1955',place:'bytown',cond:s=>s.year>=1955&&A_(s).st==='ren',
 title:R("Le bicentenaire de la Déportation","The bicentenary of the Deportation"),
 text:R("Deux cents ans après 1755, des milliers d'Acadiens, de Cadiens de Louisiane et de Franco-Américains se retrouvent à Grand-Pré, devant l'église-souvenir et la statue d'Évangéline.","Two hundred years after 1755, thousands of Acadians, Louisiana Cajuns and Franco-Americans gather at Grand-Pré, before the memorial church and the statue of Evangeline."),
 choices:[
  {label:R("Envoyer une délégation officielle du Québec","Send an official Quebec delegation"),hist:true,fx:s=>{const A=A_(s);A.vit+=3;s.minorVit+=2;return R("Le Québec, l'Acadie et la Louisiane se reconnaissent cousins. En 1960, un Acadien, Louis Robichaud, deviendra premier ministre du Nouveau-Brunswick.","Quebec, Acadia and Louisiana recognize each other as cousins. In 1960 an Acadian, Louis Robichaud, will become premier of New Brunswick.");}}]});

/* les nouvelles qui touchent l'Acadie */
WORLD.push({y:1605,k:'amerique',t:R("Port-Royal","Port-Royal"),x:R("Après un hiver terrible à l'île Sainte-Croix, Dugua de Mons et Champlain s'installent à Port-Royal. C'est là que Lescarbot monte le Théâtre de Neptune, la première pièce jouée en Amérique du Nord.","After a terrible winter on Île Sainte-Croix, Dugua de Mons and Champlain settle at Port-Royal. There Lescarbot stages the Theatre of Neptune, the first play performed in North America.")},
 {y:1749,k:'empire',t:R("Halifax","Halifax"),x:R("Edward Cornwallis fonde Halifax avec 2 500 colons. La Nouvelle-Écosse aura une capitale anglaise et protestante ; les Acadiens n'y sont plus qu'une population à surveiller.","Edward Cornwallis founds Halifax with 2,500 settlers. Nova Scotia will have an English, Protestant capital; the Acadians are now only a population to be watched.")},
 {y:1960,k:'amerique',t:R("Louis Robichaud","Louis Robichaud"),x:R("Au Nouveau-Brunswick, un Acadien de Saint-Antoine, Louis J. Robichaud, devient premier ministre. Il lancera son « programme de chances égales ».","In New Brunswick, an Acadian from Saint-Antoine, Louis J. Robichaud, becomes premier. He will launch his 'Equal Opportunity' program.")});
})();

/* ---------- les images de l'Acadie (Wikimedia Commons) ---------- */
Object.assign(IMG,{
 ac_membertou:{c:R("Alan Syliboy, portrait du grand chef Henri Membertou, 2010 (CC BY-SA 4.0)","Alan Syliboy, portrait of Grand Chief Henri Membertou, 2010 (CC BY-SA 4.0)"),f:'Grand Chief Henri Membertou.jpg'},
 ac_argall:{c:R("John Henry Walker, l'incendie de Port-Royal en 1613, gravure de 1877","John Henry Walker, the burning of Port-Royal in 1613, engraving, 1877"),f:'Walker - Burning of Port Royal (N. S.), A.D. 1613.png'},
 ac_latour:{c:R("C. W. Jefferys, Madame de La Tour défend le fort Sainte-Marie, vers 1934","C. W. Jefferys, Madame de La Tour defends Fort Sainte-Marie, about 1934"),f:'Madame La Tour Defending Fort St.Jean.jpg'},
 ac_fortanne:{c:R("Le fort Anne, l'ancien fort de Port-Royal, à Annapolis Royal, vers 1930","Fort Anne, the old fort of Port-Royal, at Annapolis Royal, about 1930"),f:'Fort Anne Annapolis Royal 1930.png'},
 ac_aboiteau:{c:R("M. O. Hammond, les digues de Grand-Pré, 1907","M. O. Hammond, the dykes of Grand-Pré, 1907"),f:'Aboiteau Grand-Pré.jpg'},
 ac_church1704:{c:R("Carte de Bellin (1757) annotée : l'expédition de Benjamin Church contre l'Acadie, 1704","Bellin map (1757), annotated: Benjamin Church's expedition against Acadia, 1704"),f:'GrandPre1704RaidFirst.jpg'},
 ac_homestead:{c:R("Une maison acadienne en pièce sur pièce, Madawaska (photo Paul et Lois Muller, licence Art libre)","An Acadian log house, Madawaska (photo Paul and Lois Muller, Free Art License)"),f:'Martin Acadian Homestead.jpg'},
 ac_madawaska:{c:R("La croix du débarquement acadien, Madawaska (Maine)","The Acadian landing cross, Madawaska, Maine"),f:'MadawaskaME AcadianLandingCross.jpg'},
 ac_grandpre47:{c:R("C. W. Jefferys, la bataille de Grand-Pré, 1747","C. W. Jefferys, the Battle of Grand-Pré, 1747"),f:'WCJefferys Battle of Grand Pre.png'},
 ac_beausejour:{c:R("Capitaine Hamilton, le fort Beauséjour, 1755","Captain Hamilton, Fort Beauséjour, 1755"),f:'FortBeausejour1755byCaptHamilton.jpg'},
 ac_isj:{c:R("L'île Saint-Jean vers 1750 (carte, CC BY-SA 4.0)","Île Saint-Jean about 1750 (map, CC BY-SA 4.0)"),f:'Isle Saint-Jean.jpg'},
 ac_deport:{c:R("George Craig, la déportation à Grand-Pré, 1893","George Craig, the deportation at Grand-Pré, 1893"),f:'Deportation Grand-Pré.jpg'},
 ac_ordre:{c:R("C. W. Jefferys, Winslow lit l'ordre de déportation dans l'église de Grand-Pré, 1923","C. W. Jefferys, Winslow reads the deportation order in the church at Grand-Pré, 1923"),f:'Deportation of Acadians order, painting by Jefferys.jpg'},
 ac_louisiane:{c:R("Le site des premiers Acadiens de Louisiane, paroisse Saint-Jacques (photo Ken Lund, CC BY-SA 2.0)","Site of the first Acadian settlers in Louisiana, St. James Parish (photo Ken Lund, CC BY-SA 2.0)"),f:'Site of First Acadian Settlers in Louisiana, S.R. 18, St. James Parish.jpg'},
 ac_evangeline:{c:R("La statue d'Évangéline et l'église-souvenir de Grand-Pré (photo Mykola Swarnyk, CC BY-SA 3.0)","The Evangeline statue and the memorial church at Grand-Pré (photo Mykola Swarnyk, CC BY-SA 3.0)"),f:'Evangeline statue and Memorial Church Grand-Pré 1.jpg'},
 ac_memramcook:{c:R("Le collège Saint-Joseph de Memramcook, avant 1933","Collège Saint-Joseph, Memramcook, before 1933"),f:'College Saint-Joseph 1933 Memramcook 2.png'},
 ac_caraquet:{c:R("Les émeutes de Caraquet : la mort du constable Gifford, 1875","The Caraquet riots: the death of Constable Gifford, 1875"),f:'Fusillade Caraquet.jpg'},
 ac_drapeau:{c:R("Le drapeau acadien, adopté à Miscouche en 1884","The Acadian flag, adopted at Miscouche in 1884"),f:'Flag of Acadia.svg'},
 ac_leblanc:{c:R("Mgr Alfred-Édouard LeBlanc, premier évêque acadien, 1913","Bishop Alfred-Édouard LeBlanc, the first Acadian bishop, 1913"),f:'Alfred-Édouard Leblanc 1913.jpg'},
 ac_memorial:{c:R("L'église-souvenir des Acadiens, Grand-Pré, 1926 (Bibliothèque et Archives Canada, CC BY 2.0)","The memorial church to the Acadians, Grand-Pré, 1926 (Library and Archives Canada, CC BY 2.0)"),f:'The memorial church to Acadians, Grand Pré, Nova Scotia, 1926.jpg'}});
Object.assign(EVENT_IMG,{acadie1610:'ac_membertou',argall1613:'ac_argall',razilly1632:'bontemps',latour1645:'ac_latour',sedgwick1654:'ac_fortanne',
 acadie1670:'ac_fortanne',aboiteaux1680:'ac_aboiteau',phipsAcadie1690:'ac_fortanne',church1704:'ac_church1704',portroyal1710:'ac_fortanne',serment1730:'ac_homestead',
 grandpre1747:'ac_grandpre47',beausejour1755:'ac_beausejour',acadie1755:'ac_ordre',acadieReste1756:'ac_aboiteau',ilestjean1758:'ac_isj',cq_acadieBoston:'acadiens',
 retour1764:'ac_deport',louisiane1785:'ac_louisiane',madawaska1785:'ac_madawaska',evangeline1847:'ac_evangeline',memramcook1864:'ac_memramcook',
 caraquet1875:'ac_caraquet',convention1881:'ac_memramcook',drapeau1884:'ac_drapeau',eveque1912:'ac_leblanc',grandpre1955:'ac_memorial'});
