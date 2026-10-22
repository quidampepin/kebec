/* Kebec — Événements sociaux : griefs, résistances, grèves et compromis, pour les trois périodes.
   Ils sortent quand une classe est mécontente et organisée ; leur « pourquoi maintenant » dit la cause matérielle. */
(()=>{
const add=(p,e)=>{e.period=p===1?undefined:p;if(e.sys){e.conseq=true;e.max=e.max||1;e.cool=e.cool||8;}EVENTS.push(e);EV[e.id]=e;};
const G=clsG,Sh=clsS,T=traitAdd,ra=relAdd;
const org=(s,id)=>(s.cls&&s.cls[id])?s.cls[id].org:0;

/* ===================== Période I ===================== */
add(1,{id:'cl1_engages',sys:true,place:'quebec',cond:s=>s.year>=1625&&s.pop>=60&&G(s,'engages')>=48,w:s=>2+(G(s,'engages')-45)/8,
 because:s=>R("Les engagés travaillent trois ans pour un salaire de misère, et la Compagnie garde le profit de la traite.","The indentured men work three years for a pittance, and the Company keeps the profit of the trade."),
 title:R("Les engagés réclament","The indentured men protest"),
 text:R("Une trentaine d'engagés refusent de travailler aux défrichements de la Compagnie : ils exigent leurs gages en retard et le droit de prendre une terre à la fin de leur contrat, au lieu d'être renvoyés en France.","Some thirty indentured men refuse to work on the Company's clearing: they demand their overdue wages and the right to take land at the end of their contract, instead of being shipped back to France."),
 choices:[
  {label:R("Leur promettre une terre","Promise them land"),fx:s=>{s.cleared+=8;s.compagnie-=4;s.pendingSettlers=(s.pendingSettlers||0);s.flags.engagesTerre=true;return R("Plusieurs restent au pays et deviennent habitants. La Compagnie y perd des bras à bon marché.","Several stay in the country and become habitants. The Company loses cheap hands.");}},
  {label:R("Les menacer du cachot","Threaten them with the lock-up"),fx:s=>{s.compagnie+=3;s.pop-=3;return R("Ils reprennent le travail. Au printemps, trois désertent chez les Hollandais.","They go back to work. In spring, three desert to the Dutch.");}}]});

add(1,{id:'cl1_traite',sys:true,place:'troisRivieres',cond:s=>s.year>=1630&&s.pop>=150&&!s.flags.habitants&&G(s,'habitants')>=40,w:s=>2+(G(s,'habitants')-38)/8,
 because:s=>R("Le monopole de la Compagnie interdit aux habitants de traiter eux-mêmes avec les nations.","The Company's monopoly forbids the habitants to trade with the nations themselves."),
 title:R("La traite en cachette","Trading on the sly"),
 text:R("Des habitants échangent du blé, de l'eau-de-vie et des outils contre des peaux, la nuit, derrière les commis de la Compagnie. Ils disent que le pays ne vivra jamais si seuls les actionnaires de Paris profitent du castor.","Habitants trade wheat, brandy and tools for pelts at night, behind the Company clerks' backs. They say the country will never live if only Paris shareholders profit from the beaver."),
 choices:[
  {label:R("Fermer les yeux","Turn a blind eye"),fx:s=>{s.compagnie-=6;s.autonomy+=4;s.treasury-=100;return R("Une petite traite habitante s'installe. Les commis enragent.","A small habitant trade takes root. The clerks are furious.");}},
  {label:R("Faire saisir les peaux","Have the pelts seized"),fx:s=>{s.compagnie+=5;s.autonomy-=3;s.treasury+=100;return R("Les peaux saisies partent pour Paris. Les habitants retiennent la leçon, et leur rancœur.","The seized pelts go to Paris. The habitants learn the lesson, and keep the grudge.");}},
  {label:R("Demander une part de la traite pour les habitants","Ask for a share of the trade for the habitants"),fx:s=>{s.compagnie-=3;s.autonomy+=6;s.flags.traiteHabitants=true;return R("La Compagnie accepte d'acheter les peaux des habitants à prix fixe. C'est un début.","The Company agrees to buy the habitants' pelts at a fixed price. It is a start.");}}]});

/* ===================== Période II ===================== */
add(2,{id:'dime1667',place:'quebec',cond:s=>s.year>=1667,
 title:R("La dîme","The tithe"),
 text:R("Mgr de Laval a fixé la dîme au treizième des grains. Les habitants protestent : en France, c'est souvent bien moins, et leurs terres neuves rapportent peu. L'intendant propose le vingt-sixième.","Bishop Laval has set the tithe at one thirteenth of the grain. The habitants protest: in France it is often far less, and their new land yields little. The intendant proposes one twenty-sixth."),
 choices:[
  {label:R("Le vingt-sixième","One twenty-sixth"),hist:true,fx:s=>{s.church-=3;s.off.eve-=8;s.off.int+=6;return R("La dîme est fixée au vingt-sixième, sur les grains seulement. Elle le restera jusqu'au XXe siècle.","The tithe is set at one twenty-sixth, on grain only. It will stay so until the 20th century.");}},
  {label:R("Le treizième, comme le veut l'évêque","One thirteenth, as the bishop wishes"),fx:s=>{s.church+=6;s.off.eve+=12;s.flags.dime13=true;return R("Les curés sont mieux payés ; les habitants paient de mauvaise grâce et cachent leur grain.","The priests are better paid; the habitants pay grudgingly and hide their grain.");}}]});

add(2,{id:'cl2_banalite',sys:true,place:'boucherville',cond:s=>s.year>=1680&&G(s,'habitants')>=45&&s.orient.seig!=='censitaires',w:s=>2+(G(s,'habitants')-42)/7,
 because:s=>R("Les seigneurs exigent cens, rentes et droits de moulin, sans toujours bâtir le moulin promis.","The seigneurs demand dues, rents and mill rights, without always building the promised mill."),
 title:R("Le moulin banal","The seigneurial mill"),
 text:R("Les censitaires d'une seigneurie doivent faire moudre leur grain au moulin du seigneur et lui laisser le quatorzième. Mais le moulin est à trois lieues, et souvent en panne. Ils demandent à l'intendant le droit de moudre ailleurs.","A seigneury's tenants must grind their grain at the seigneur's mill and leave him one fourteenth. But the mill is three leagues away, and often broken. They ask the intendant for the right to grind elsewhere."),
 choices:[
  {label:R("Donner raison aux censitaires","Rule for the tenants"),fx:s=>{s.off.int+=6;s.cleared+=60;T(s,'entraide',2);s.cls.seigneurs&&(s.cls.seigneurs.grief+=10);return R("L'ordonnance oblige les seigneurs à entretenir leurs moulins, sous peine de perdre leur droit.","The ordinance obliges seigneurs to maintain their mills, or lose their right.");}},
  {label:R("Le droit du seigneur est le droit","The seigneur's right is the law"),fx:s=>{s.cls.habitants&&(s.cls.habitants.grief+=8);T(s,'roi',-1);return R("Les censitaires paient. Certains partent dans les bois, comme coureurs.","The tenants pay. Some leave for the woods, as coureurs.");}}]});

add(2,{id:'cl2_corvee',sys:true,place:'quebec',cond:s=>!!s.war&&G(s,'habitants')>=40,w:s=>2+(G(s,'habitants')-38)/8,
 because:s=>R("La guerre impose aux paroisses corvées et réquisitions, pendant que les marchands vendent cher aux troupes.","The war imposes corvées and requisitions on the parishes, while merchants sell dear to the troops."),
 title:R("La corvée des fortifications","The fortification corvée"),
 text:R("Le gouverneur exige des paroisses des journées de corvée pour les murs de Québec, au moment des semailles. À Longueuil, des femmes et des habitants armés de bâtons refusent de partir.","The governor demands corvée days from the parishes for Québec's walls, at sowing time. At Longueuil, women and habitants armed with sticks refuse to go."),
 choices:[
  {label:R("Payer les journées","Pay for the days"),fx:s=>{s.treasury-=900;s.defense+=4;return R("On paie un salaire de corvée. Les murs montent, moins vite, sans révolte.","A corvée wage is paid. The walls go up, more slowly, without revolt.");}},
  {label:R("Punir les meneurs","Punish the ringleaders"),fx:s=>{s.defense+=6;s.cls.habitants&&(s.cls.habitants.grief+=10);T(s,'roi',-2);return R("Quelques habitants sont mis aux fers. Les autres travaillent, en silence.","A few habitants are put in irons. The others work, in silence.");}}]});

add(2,{id:'cl2_compagnie',sys:true,place:'villeMarie',cond:s=>s.year>=1696&&s.year<1720&&G(s,'marchands')>=35,w:s=>3,
 because:s=>R("Les marchands canadiens étouffent sous les règlements de la traite et la concurrence des fermiers du Roi.","Canadian merchants are stifled by trade regulations and competition from the King's farmers."),
 title:R("La Compagnie de la Colonie","The Compagnie de la Colonie"),
 text:R("Les marchands de Québec et de Montréal proposent de racheter le monopole du castor et de former une compagnie canadienne. Les habitants pourront y prendre des parts, disent-ils.","Québec and Montréal merchants propose buying the beaver monopoly and forming a Canadian company. Habitants may buy shares, they say."),
 choices:[
  {label:R("Les soutenir","Back them"),hist:true,fx:s=>{s.flags.compagnieColonie=true;s.autonomy+=4;s.treasury-=600;return R("La Compagnie de la Colonie est fondée en 1700. Mal gérée, frappée par la surabondance du castor, elle fera faillite en six ans.","The Compagnie de la Colonie is founded in 1700. Badly run, hit by the beaver glut, it goes bankrupt within six years.");}},
  {label:R("Garder le monopole en France","Keep the monopoly in France"),fx:s=>{s.compagnie+=4;s.cls.marchands&&(s.cls.marchands.grief+=10);return R("Les fermiers généraux gardent le castor. Les marchands canadiens se tournent vers la contrebande.","The tax farmers keep the beaver. Canadian merchants turn to smuggling.");}}]});

add(2,{id:'cl2_voyageurs',sys:true,place:'michilimakinac',cond:s=>s.year>=1690&&G(s,'engages')>=48,w:s=>2+(G(s,'engages')-45)/8,
 because:s=>R("Les voyageurs portent les canots et les ballots, mais ce sont les bourgeois de la traite qui s'enrichissent.","The voyageurs carry the canoes and bales, but it is the trading bourgeois who grow rich."),
 title:R("Les voyageurs veulent leurs gages","The voyageurs want their wages"),
 text:R("Au poste de Michilimakinac, des voyageurs refusent de repartir : gages impayés, vivres insuffisants, avances retenues sur leur salaire. Des marchands anglais d'Albany paient mieux, disent-ils.","At the Michilimackinac post, voyageurs refuse to set off again: unpaid wages, short rations, advances withheld from their pay. English merchants at Albany pay better, they say."),
 choices:[
  {label:R("Imposer un contrat type devant notaire","Impose a standard contract before a notary"),fx:s=>{s.cls.engages&&(s.cls.engages.grief-=15);s.mods.fur*=.95;T(s,'aventure',1);return R("Les engagements de voyageurs passent devant notaire, gages et rations écrits.","Voyageur engagements go before a notary, with wages and rations in writing.");}},
  {label:R("Qu'ils obéissent","Let them obey"),fx:s=>{s.cls.engages&&(s.cls.engages.grief+=8);s.mods.fur*=.9;return R("Une dizaine désertent vers Albany avec leurs fourrures.","A dozen desert to Albany with their furs.");}}]});

add(2,{id:'cl2_concessions',sys:true,place:'kamouraska',cond:s=>s.year>=1700&&G(s,'habitants')>=42&&s.orient.seig==='seigneurs',w:s=>2,
 because:s=>R("Des seigneurs gardent leurs terres incultes pour les revendre plus cher, pendant que les fils d'habitants cherchent à s'établir.","Some seigneurs keep their land uncultivated to sell it dearer, while habitants' sons seek to settle."),
 title:R("Des terres qui dorment","Land lying idle"),
 text:R("Des fils d'habitants se plaignent : le seigneur refuse de leur concéder des terres, ou exige des rentes doubles. Ils menacent de partir dans l'Ouest.","Habitants' sons complain: the seigneur refuses to grant them land, or demands double rents. They threaten to leave for the West."),
 choices:[
  {label:R("Forcer les concessions","Force the grants"),fx:s=>{s.cleared+=150;s.cls.seigneurs&&(s.cls.seigneurs.grief+=8);s.off.int+=5;return R("L'intendant réunit au domaine deux seigneuries qui ne concédaient pas. Les autres s'exécutent.","The intendant takes back two seigneuries that would not grant land. The others comply.");}},
  {label:R("Laisser faire","Let things be"),fx:s=>{T(s,'aventure',2);s.pop-=40;return R("Les fils partent pour les Pays d'en Haut.","The sons leave for the Upper Country.");}}]});

/* ===================== Période III ===================== */
add(3,{id:'greve1794',place:'michilimakinac',cond:s=>s.year>=1794,
 title:R("La grève du lac à la Pluie","The Rainy Lake strike"),
 text:R("Au fort du lac à la Pluie, les voyageurs de la Compagnie du Nord-Ouest refusent d'avancer plus loin sans hausse de gages. Les bourgeois écossais crient à la mutinerie.","At the Rainy Lake fort, the North West Company voyageurs refuse to go further without higher wages. The Scottish partners cry mutiny."),
 choices:[
  {label:R("Les soutenir de loin","Support them from afar"),fx:s=>{s.cls.ouvriers&&(s.cls.ouvriers.org+=8);s.patri+=2;T(s,'entraide',2);return R("Les meneurs sont renvoyés, mais les gages augmentent un peu. Les voyageurs savent maintenant ce qu'ils valent.","The ringleaders are dismissed, but wages rise a little. The voyageurs now know what they are worth.");}},
  {label:R("Ce n'est pas notre affaire","It is not our business"),hist:true,fx:s=>R("Les bourgeois matent la grève en quelques jours. C'est l'une des premières grèves connues au Canada.","The partners break the strike within days. It is one of the first known strikes in Canada.")}]});

add(3,{id:'typo1827',place:'quebec',cond:s=>s.year>=1827,
 title:R("La Société typographique de Québec","The Quebec Typographical Society"),
 text:R("Les ouvriers imprimeurs de Québec fondent une société : secours aux malades, tarif commun, apprentissage contrôlé. Les patrons des journaux y voient une coalition illégale.","Québec's printing workers found a society: help for the sick, a common rate, controlled apprenticeship. The newspaper owners see an illegal combination."),
 choices:[
  {label:R("La défendre","Defend it"),fx:s=>{s.flags.typo=true;s.flags.secoursMutuel=true;T(s,'entraide',2);s.off.mar-=5;return R("La Société tient. D'autres métiers suivent : cordonniers, charpentiers de navires.","The Society holds. Other trades follow: shoemakers, ship carpenters.");}},
  {label:R("Ne pas s'en mêler","Stay out of it"),hist:true,fx:s=>{s.flags.typo=true;return R("La Société survit tant bien que mal. On la considère comme le premier syndicat du Québec.","The Society survives as best it can. It is considered Quebec's first union.");}}]});

add(3,{id:'greve1843',place:'laprairie',cond:s=>s.year>=1843,
 title:R("Les canaux de Beauharnois et de Lachine","The Beauharnois and Lachine canals"),
 text:R("Des milliers de terrassiers, Irlandais et Canadiens, creusent les canaux pour un salaire de famine, payé en bons du magasin de l'entrepreneur. Ils se mettent en grève. Les entrepreneurs appellent la troupe.","Thousands of navvies, Irish and Canadien, dig the canals for a starvation wage, paid in scrip at the contractor's store. They go on strike. The contractors call in the troops."),
 choices:[
  {label:R("Exiger qu'on négocie","Demand negotiation"),fx:s=>{s.cls.ouvriers&&(s.cls.ouvriers.grief-=10);s.cls.ouvriers&&(s.cls.ouvriers.org+=6);s.off.mar-=8;T(s,'ouverture',2);return R("Le gouvernement oblige les entrepreneurs à payer en argent. La grève finit sans morts.","The government forces the contractors to pay in cash. The strike ends without deaths.");}},
  {label:R("Laisser faire la troupe","Let the troops act"),hist:true,fx:s=>{s.cls.ouvriers&&(s.cls.ouvriers.grief+=10);s.pop-=10;return R("À Beauharnois, les soldats tirent : une dizaine d'ouvriers sont tués. Les travaux reprennent.","At Beauharnois, the soldiers fire: about ten workers are killed. Work resumes.");}}]});

add(3,{id:'cl3_rentes',sys:true,place:'stHyacinthe',cond:s=>s.year>=1815&&s.orient.terre==='seigneurie'&&!s.flags.finSeigneurie&&G(s,'habitants')>=48,w:s=>2+(G(s,'habitants')-45)/6,
 because:s=>R("La terre se fait rare ; les seigneurs en profitent pour hausser les rentes et se réserver les forêts.","Land is getting scarce; the seigneurs take the opportunity to raise rents and keep the forests for themselves."),
 title:R("Charivari chez le seigneur","Charivari at the manor"),
 text:R("Une nuit, des censitaires masqués font un charivari devant le manoir : casseroles, cornes, menaces. Ils refusent de payer les arrérages de rentes. Le seigneur demande la troupe.","One night, masked tenants hold a charivari outside the manor: pots, horns, threats. They refuse to pay back rents. The seigneur asks for troops."),
 choices:[
  {label:R("Proposer le rachat des rentes","Propose buying out the dues"),fx:s=>{s.patri+=3;s.cls.seigneurs&&(s.cls.seigneurs.grief+=8);s.cls.habitants&&(s.cls.habitants.grief-=8);s.flags.rachatPropose=true;return R("L'idée d'abolir le régime seigneurial entre à l'Assemblée. Papineau, seigneur lui-même, s'y oppose.","The idea of abolishing the seigneurial system enters the Assembly. Papineau, a seigneur himself, opposes it.");}},
  {label:R("Défendre l'ordre","Defend order"),fx:s=>{s.compagnie+=3;s.cls.habitants&&(s.cls.habitants.grief+=6);return R("Les meneurs sont condamnés. La colère rentre sous terre.","The ringleaders are sentenced. The anger goes underground.");}}]});

add(3,{id:'cl3_patriotes',sys:true,place:'stDenis',cond:s=>s.year>=1834&&s.year<1838&&s.patri>=40&&G(s,'habitants')>=45,w:s=>3,
 because:s=>R("Les habitants souffrent de la crise agricole, et les chefs patriotes cherchent leur appui.","The habitants suffer from the agricultural crisis, and the patriote leaders seek their support."),
 title:R("Que promettre aux habitants ?","What to promise the habitants?"),
 text:R("Les chefs patriotes sont avocats, notaires, médecins, quelques seigneurs. Pour soulever les campagnes, les plus radicaux veulent promettre l'abolition des rentes seigneuriales. Les modérés craignent d'effrayer les seigneurs et le clergé.","The patriote leaders are lawyers, notaries, doctors, a few seigneurs. To rouse the countryside, the radicals want to promise the abolition of seigneurial dues. The moderates fear frightening the seigneurs and the clergy."),
 choices:[
  {label:R("Promettre l'abolition","Promise abolition"),fx:s=>{s.patri+=8;s.cls.habitants&&(s.cls.habitants.org+=10);s.flags.promesseAbolition=true;s.cls.seigneurs&&(s.cls.seigneurs.grief+=15);s.off.eve-=8;return R("Les campagnes du Richelieu s'enflamment. Une partie des notables prend peur.","The Richelieu countryside catches fire. Some notables take fright.");}},
  {label:R("S'en tenir aux droits de l'Assemblée","Stick to the Assembly's rights"),fx:s=>{s.patri+=2;return R("Le combat reste celui des avocats et des journaux. Les habitants écoutent, sans trop savoir ce qu'ils y gagnent.","The struggle stays one of lawyers and newspapers. The habitants listen, not quite sure what they stand to gain.");}}]});

add(3,{id:'cl3_secours',sys:true,place:'villeMarie',cond:s=>s.year>=1840&&s.cls&&s.cls.ouvriers&&G(s,'ouvriers')>=45,w:s=>2+(G(s,'ouvriers')-42)/7,
 because:s=>R("Les ouvriers de Montréal travaillent douze heures par jour et n'ont rien quand vient la maladie.","Montréal workers labour twelve hours a day and have nothing when illness comes."),
 title:R("Une société de secours mutuel","A mutual aid society"),
 text:R("Des ouvriers du faubourg Saint-Laurent fondent l'Union Saint-Joseph : une cotisation par semaine, une rente en cas de maladie, des funérailles décentes. Le curé veut en être l'aumônier ; les patrons s'en méfient.","Workers of the Saint-Laurent suburb found the Union Saint-Joseph: a weekly fee, an allowance in sickness, decent funerals. The priest wants to be its chaplain; the employers are wary."),
 choices:[
  {label:R("L'encourager","Encourage it"),fx:s=>{s.flags.secoursMutuel=true;T(s,'entraide',3);s.cls.ouvriers&&(s.cls.ouvriers.org+=8);return R("Les sociétés de secours se multiplient. Elles seront le berceau du mouvement ouvrier.","Mutual aid societies multiply. They will be the cradle of the labour movement.");}},
  {label:R("La confier au curé","Entrust it to the priest"),fx:s=>{s.flags.secoursMutuel=true;s.off.eve+=6;T(s,'ferveur',1);return R("La société devient une confrérie pieuse, utile, et docile.","The society becomes a pious confraternity, useful, and docile.");}}]});

add(3,{id:'cl3_dixheures',sys:true,place:'villeMarie',cond:s=>s.year>=1860&&s.cls&&s.cls.ouvriers&&G(s,'ouvriers')>=50&&(s.capital||0)>=.4,w:s=>3,
 because:s=>R("Les usines de Montréal se multiplient, et les journées de travail s'allongent.","Montréal's factories multiply, and the working day grows longer."),
 title:R("La journée de dix heures","The ten-hour day"),
 text:R("Des ouvriers du Grand Tronc et des fabriques de chaussures réclament la journée de dix heures. Une grève éclate aux ateliers de Pointe-Saint-Charles.","Grand Trunk workers and shoe factory hands demand the ten-hour day. A strike breaks out at the Pointe-Saint-Charles shops."),
 choices:[
  {label:R("Appuyer la demande","Back the demand"),fx:s=>{s.cls.ouvriers&&(s.cls.ouvriers.grief-=12);s.eco-=2;s.off.mar-=10;T(s,'entraide',2);return R("Quelques ateliers cèdent. Le mouvement des neuf heures suivra en 1872.","A few shops give way. The nine-hour movement will follow in 1872.");}},
  {label:R("Le travail fait vivre les familles","Work feeds the families"),fx:s=>{s.eco+=2;s.cls.ouvriers&&(s.cls.ouvriers.grief+=8);return R("La grève est brisée par des briseurs venus des campagnes.","The strike is broken by strikebreakers brought in from the countryside.");}}]});

add(3,{id:'cl3_marchands',sys:true,place:'villeMarie',cond:s=>s.year>=1820&&s.year<1840&&G(s,'marchands')>=45,w:s=>2+(G(s,'marchands')-42)/6,
 because:s=>R("Les marchands britanniques veulent des canaux, des banques et des terres libres ; l'Assemblée canadienne et les seigneuries leur barrent la route.","British merchants want canals, banks and free land; the Canadien Assembly and the seigneuries stand in their way."),
 title:R("Les marchands contre l'Assemblée","The merchants against the Assembly"),
 text:R("La Chambre de commerce de Montréal accuse l'Assemblée « de paysans et d'avocats » de bloquer le progrès. Elle réclame l'union avec le Haut-Canada, le régime anglais des terres et l'anglais seul.","The Montréal Board of Trade accuses the Assembly 'of peasants and lawyers' of blocking progress. It demands union with Upper Canada, English land tenure and English only."),
 choices:[
  {label:R("Voter enfin leurs canaux et leurs banques","Finally vote their canals and banks"),fx:s=>{s.eco+=4;s.cls.marchands&&(s.cls.marchands.grief-=12);s.patri-=3;s.capital=(s.capital||0)+.03;return R("Les marchands obtiennent l'essentiel. Ils se montrent moins pressés de noyer l'Assemblée.","The merchants get most of what they want. They seem less eager to drown the Assembly.");}},
  {label:R("Tenir tête","Stand firm"),fx:s=>{s.patri+=4;s.cls.marchands&&(s.cls.marchands.grief+=8);return R("Les marchands se tournent vers Londres. Le projet d'union reviendra.","The merchants turn to London. The union plan will return.");}}]});

Object.assign(EVENT_IMG,{cl1_engages:'habitation',cl1_traite:'beaver',dime1667:'laval',cl2_banalite:'habitant_farm',cl2_corvee:'quebec1760',cl2_compagnie:'beaver',cl2_voyageurs:'voyageurs',cl2_concessions:'habitant_farm',greve1794:'encamp',typo1827:'mesplet',greve1843:'victoria',cl3_rentes:'sleigh',cl3_patriotes:'sixcomtes',cl3_secours:'victoria',cl3_dixheures:'victoria',cl3_marchands:'victoria'});
})();
