/* Onontio — Textes de l'interface (FR/EN) et utilitaires de langue. */
/* ---------------- i18n ---------------- */
const T={
 fr:{sub:"Nouvelle-France, 1608–1663. Prototype : vous êtes l'Onontio, la charge qui survit aux hommes.",newGame:"Nouvelle partie",cont:"Continent",valley:"Vallée",
  pop:"Habitants",food:"Vivres",treasury:"Trésor",furs:"Fourrures",defense:"Défense",compagnie:"Faveur de la Compagnie",rAlg:"Algonquins et Innus",rWen:"Wendats",haud:"Tension haudenosaunee",
  seasonsLeft:"saisons",livres:"livres",packs:"paquets",histRef:"Histoire",traj:"Trajectoire : vous et l'histoire",yours:"vous",hist:"histoire",
  affairs:"Affaires à trancher",dispatches:"Dépêches",noAffairs:"Rien ne presse cette saison. Ajustez vos orientations ou laissez passer le temps.",histChoice:"choix historique",
  orient:"Orientations",eco:"Économie",traite:"Traite",equilibre:"Équilibre",colonie:"Peuplement",all:"Alliances",armee:"Alliance armée",mediation:"Médiation",mis:"Missions",actives:"Actives",discretes:"Discrètes",
  budget:"Budget de l'année",budgetHint:"À répartir au printemps, à l'arrivée des navires.",budgetLocked:"Le budget se fixe au printemps. Voici ce qui est engagé cette année.",occupiedB:"Québec est aux mains des Kirke : pas de budget.",
  etab:"Établissement",etabS:"recrues, défrichement",def:"Défense",defS:"palissades, soldats",pres:"Présents",presS:"cadeaux aux alliés",traiteE:"Traite",traiteS:"marchandises de traite",miss:"Missions",missS:"Église, écoles",reserve:"Réserve",engaged:"Engagé",
  journal:"Journal",next:"Terminer la saison",resolve:"Tranchez d'abord les affaires en cours.",nextHint:"Fin de la saison : ",onontio:"Onontio",
  legSet:"établissement",legRang:"rangs défrichés",legCanoe:"canots de traite",legAlly:"nation alliée",legHost:"nation hostile",legPin:"affaire à trancher",
  occupied:"occupé par les Anglais",dispersed:"dispersés",restart:"Recommencer",ships:"navires",lastTime:"comme la dernière fois",routine:"Affaire de saison",unplanned:"Imprévu",historic:"Histoire",help:"Comment jouer",plan:"Plan de l'année",tradeL:"Traite d'été",cargoL:"Commande à la France",rationL:"Rations d'hiver",wait:"Attendre à Québec",upriver:"Monter au-devant",truch:"Hiverner chez eux",engages:"Engagés",colons:"Familles",soldats:"Soldats",vivres:"Vivres, outils",cTraite:"Marchandises",normal:"Normales",strict:"Sévères",share:"Partager",runYear:"Lancer l'année",resume:"Reprendre l'année",runningL:"L'année se déroule…",oneSeason:"Une saison seulement",interrupted:"Le temps est suspendu : tranchez, puis relancez.",women:"femmes",yearHint:"",playL:"Jouer",pauseL:"Pause",speedL:"Vitesse",springL:"pause au printemps",runningHint:"Le temps passe. Espace ou ❚❚ pour suspendre.",pausedHint:"En pause. Modifiez ce que vous voulez, puis relancez.",standing:"ordres permanents",budgetNext:"Le budget est engagé à chaque printemps, avec les pourcentages ci-dessous. Une modification s'applique au prochain printemps."},
 en:{sub:"New France, 1608–1663. Prototype: you are Onontio, the office that outlives the men who hold it.",newGame:"New game",cont:"Continent",valley:"Valley",
  pop:"Settlers",food:"Provisions",treasury:"Treasury",furs:"Furs",defense:"Defence",compagnie:"Company favour",rAlg:"Algonquins & Innu",rWen:"Wendat",haud:"Haudenosaunee tension",
  seasonsLeft:"seasons",livres:"livres",packs:"packs",histRef:"History",traj:"Trajectory: you vs. history",yours:"you",hist:"history",
  affairs:"Matters to decide",dispatches:"Dispatches",noAffairs:"Nothing pressing this season. Adjust your orientations or let time pass.",histChoice:"historical choice",
  orient:"Orientations",eco:"Economy",traite:"Fur trade",equilibre:"Balanced",colonie:"Settlement",all:"Alliances",armee:"Armed alliance",mediation:"Mediation",mis:"Missions",actives:"Active",discretes:"Discreet",
  budget:"Year's budget",budgetHint:"Allocated in spring, when the ships arrive.",budgetLocked:"The budget is set in spring. Here is what is committed this year.",occupiedB:"Québec is held by the Kirkes: no budget.",
  etab:"Settlement",etabS:"recruits, land clearing",def:"Defence",defS:"palisades, soldiers",pres:"Gifts",presS:"presents to allies",traiteE:"Trade",traiteS:"trade goods",miss:"Missions",missS:"Church, schools",reserve:"Reserve",engaged:"Committed",
  journal:"Journal",next:"End the season",resolve:"Decide the pending matters first.",nextHint:"End of season: ",onontio:"Onontio",
  legSet:"settlement",legRang:"cleared strips (rangs)",legCanoe:"fur-trade canoes",legAlly:"allied nation",legHost:"hostile nation",legPin:"matter to decide",
  occupied:"occupied by the English",dispersed:"dispersed",restart:"Start over",ships:"ships",lastTime:"same as last time",routine:"Seasonal matter",unplanned:"Unplanned",historic:"History",help:"How to play",plan:"Plan for the year",tradeL:"Summer trade",cargoL:"Order to France",rationL:"Winter rations",wait:"Wait at Québec",upriver:"Go upriver",truch:"Winter with them",engages:"Indentured men",colons:"Families",soldats:"Soldiers",vivres:"Food, tools",cTraite:"Trade goods",normal:"Normal",strict:"Strict",share:"Share",runYear:"Start the year",resume:"Resume the year",runningL:"The year unfolds…",oneSeason:"One season only",interrupted:"Time is paused: decide, then resume.",women:"women",yearHint:"",playL:"Play",pauseL:"Pause",speedL:"Speed",springL:"pause each spring",runningHint:"Time is passing. Space or ❚❚ to pause.",pausedHint:"Paused. Change whatever you like, then resume.",standing:"standing orders",budgetNext:"The budget is committed each spring using the percentages below. A change applies next spring."}
};
const SEASONS={fr:['Printemps','Été','Automne','Hiver'],en:['Spring','Summer','Autumn','Winter']};
const SEASON_NOTE={fr:["Les glaces partent, les navires arrivent.","La traite : les flottilles descendent vers la vallée.","Récoltes. Les navires repartent avec les fourrures.","Le fleuve gèle. Il faut tenir jusqu'au printemps."],
 en:["The ice breaks up and the ships arrive.","Trading season: the canoe fleets come down to the valley.","Harvest. The ships leave with the furs.","The river freezes. Hold out until spring."]};
let lang='fr', view='continent';
const L=o=>(o&&typeof o==='object')?(o[lang]??o.fr):o;
const t=k=>T[lang][k]??k;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

