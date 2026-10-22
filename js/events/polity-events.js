/* Kebec — Les forces sociales en mouvement (périodes III à V) :
   coalitions qui se brisent, grève du capital, stratégies du centre, légitimité de votre ligne.
   Ces événements naissent de l'état des groupes, pas du calendrier : ce sont des hypothèses, pas des faits attestés. */
(()=>{
const CD={rupture:9,capital:8,centre:10,deborde:8,lache:8,minor:12};
/* qui s'oppose à qui : une concession à un groupe coûte à un autre */
const OPP={ouvriers:'capital',precaires:'capital',technocrates:'capital',habitants:'seigneurs',professions:'clerge',clerge:'professions',capital:'ouvriers',quebecinc:'ouvriers',anglos:'technocrates',allos:'technocrates',seigneurs:'habitants',marchands:'habitants'};
const grpById=(s,id)=>polGroups(s).find(g=>g.id===id);
const gov=s=>s.period===4?govSide4(s):s.period===5?govParty5(s):'canadien';
const M=(s,f)=>Math.round((s.revT||s.treasury||1000)*f);

/* chaque fin d'année : un groupe-clé abandonne-t-il le pouvoir ? le capital fait-il la grève ? que décide le centre ? */
window.polQueue=function(s){const P=s.pol;if(!P||s.ending)return;P.cd=P.cd||{};const y=s.year,ok=k=>y-(P.cd[k]??-99)>=CD[k],push=(k,id)=>{P.cd[k]=y;if(!s.pending.includes(id))s.pending.push(id);};
  if(s.pending.filter(x=>x.startsWith('P:')).length)return;
  /* la rupture d'une coalition : un groupe qui vous a porté au pouvoir est en colère */
  P.cnt=P.cnt||{};if(s.period>=4&&ok('rupture')&&(P.cnt.rupture||0)<4&&s.lastVote&&s.lastVote.byG){const g0=gov(s);
    const c=polGroups(s).filter(g=>{const st=P.g[g.id],b=s.lastVote.byG[g.id];return st&&b&&st.share>=.04&&st.sat<31&&(b[g0]||0)>=.45;}).sort((a,b)=>P.g[a.id].sat-P.g[b.id].sat)[0];
    if(c){P.evg=P.evg||{};P.evg.rupture=c.id;P.cnt.rupture=(P.cnt.rupture||0)+1;push('rupture','P:rupture');return;}}
  /* la grève du capital */
  if(s.period>=4&&ok('capital')&&P.cap<36){push('capital','P:capital');return;}
  if(s.period===3&&ok('capital')&&P.cap<36&&!s.flags.unionAct&&y>=1805){push('capital','P:marchands');return;}
  /* le centre agit */
  if(ok('centre')){
    if(s.period===5&&P.cen.strat==='planB'&&y>=1985&&!s.flags.planB){push('centre','P:planB');return;}
    if(s.period===5&&P.cen.strat==='accommodement'&&s.souv>=42&&!s.flags.offreOttawa&&!s.flags.oui){push('centre','P:offre');return;}
    if(s.period===4&&P.cen.strat==='centralisation'&&y>=1900&&!s.flags.resisteCentral){push('centre','P:central');return;}
    if(s.period===3&&P.cen.strat==='coercition'&&!s.flags.rebFail&&!s.flags.rebSuccess&&y>=1800&&y<1838){push('centre','P:coercition');return;}}
  /* la légitimité de votre ligne (période III) */
  if(s.period===3&&y>=1800&&!s.flags.unionAct){
    if(s.gap3>14&&s.orient.cour!=='patriote'&&ok('deborde')){push('deborde','P:deborde');return;}
    if(s.gap3<-16&&s.orient.cour==='patriote'&&ok('lache')){push('lache','P:lache');return;}}
};

const ev=(id,o)=>Object.assign({id,routine:false,conseq:true,place:'quebec'},o);
window.polEvent=function(s,id){const F=fr(),P=s.pol||{},y=s.year;
  if(id==='P:rupture'){const gid=(P.evg||{}).rupture||'ouvriers';const g=grpById(s,gid)||{name:R(gid,gid)};const st=(P.g||{})[gid]||{sat:30};const opp=OPP[gid];const og=opp&&grpById(s,opp);
    const why=(st.whySat||[]).filter(c=>c.v<0).slice(0,2).map(c=>L(c.l).toLowerCase()).join(F?' et ':' and ')||(F?'leur sort':'their lot');
    const party=L(polPartyLab(s,gov(s)));
    return ev(id,{title:R(`Une coalition se fissure : ${g.name.fr.toLowerCase()}`,`A coalition cracks: ${g.name.en.toLowerCase()}`),
      because:()=>R(`Ils ont voté pour vous, mais leur satisfaction est tombée à ${Math.round(st.sat)}/100, à cause de ${why}.`,`They voted for you, but their satisfaction has fallen to ${Math.round(st.sat)}/100, because of ${why}.`),
      text:R(`Leurs porte-parole le disent sans détour : « Nous avons porté ce gouvernement au pouvoir, et il gouverne contre nous. » Dans les assemblées, on parle de ne plus voter ${party}. Une coalition est une alliance d'intérêts : quand les intérêts divergent, elle se brise.`,
             `Their spokesmen say it plainly: "We brought this government to power, and it governs against us." In meetings, there is talk of no longer voting ${party}. A coalition is an alliance of interests: when interests diverge, it breaks.`),
      choices:[
       {label:R("Leur faire une concession réelle","Make them a real concession"),desc:og?R(`Coûte de l'argent, et mécontente ${og.name.fr.toLowerCase()}.`,`Costs money, and displeases ${og.name.en.toLowerCase()}.`):R("Coûte de l'argent.","Costs money."),
        g:Object.assign({[gid]:12},opp?{[opp]:-5}:{}),fx:s2=>{s2.treasury-=Math.min(s2.treasury,M(s2,.08));return R("La concession est accueillie avec méfiance, puis avec soulagement. La coalition tient, pour l'instant.","The concession is greeted with suspicion, then relief. The coalition holds, for now.");}},
       {label:R("Acheter les chefs : postes, contrats, honneurs","Buy the leaders: posts, contracts, honours"),desc:R("Moins cher ; la base n'est pas dupe.","Cheaper; the rank and file aren't fooled."),
        g:{[gid]:4},fx:s2=>{s2.treasury-=Math.min(s2.treasury,M(s2,.03));polRealign(s2,gid,gov(s2),-3);return R("Quelques dirigeants rentrent dans le rang. La base, elle, retient la leçon.","A few leaders fall into line. The rank and file remember.");}},
       {label:R("Tenir le cap : gouverner pour tous, pas pour un groupe","Hold the line: govern for all, not for one group"),desc:R("Le groupe rompt avec votre parti pour longtemps.","The group breaks with your party for a long time."),
        fx:s2=>{polRealign(s2,gid,gov(s2),-9);if(opp)polGfx(s2,{[opp]:3});return R(`La rupture avec ${g.name.fr.toLowerCase()} est consommée. Il faudra gouverner avec une autre coalition, ou perdre.`,`The break with ${g.name.en.toLowerCase()} is final. You will have to govern with another coalition, or lose.`);}}]});}
  if(id==='P:capital'){const p5=s.period===5;
    return ev(id,{title:p5?R("La grève du capital","The capital strike"):R("Le capital se retire","Capital pulls back"),
      because:()=>R(`Le climat d'investissement est tombé à ${Math.round(P.cap)}/100 : ${p5?'nationalisme, impôts, syndicats, incertitude constitutionnelle':'lois ouvrières, nationalisme, menaces de nationalisation'}.`,`The investment climate has fallen to ${Math.round(P.cap)}/100: ${p5?'nationalism, taxes, unions, constitutional uncertainty':'labour laws, nationalism, threats of nationalization'}.`),
      text:p5?R("Les sièges sociaux font leurs boîtes pour Toronto. Les banques retardent leurs prêts, les agences de notation menacent, on fait circuler des photos de camions de la Brink's sur la route de l'Ontario. Personne ne fait de grève de cette façon : on ne fait qu'investir ailleurs.","Head offices pack up for Toronto. Banks delay loans, rating agencies threaten, photos of Brink's trucks on the road to Ontario circulate. No one strikes this way: one simply invests elsewhere."):
                R("La Bourse de Montréal s'inquiète, les compagnies américaines suspendent leurs projets de moulins, les banques resserrent le crédit. Le message est clair : changez de politique, ou l'argent ira ailleurs.","The Montreal exchange frets, American companies suspend their mill projects, banks tighten credit. The message is clear: change policy, or the money goes elsewhere."),
      choices:[
       {label:R("Rassurer : baisser les impôts, ménager les patrons","Reassure: cut taxes, spare the bosses"),desc:R("Le capital revient ; les salariés paient.","Capital comes back; wage earners pay."),
        g:p5?{capital:10,quebecinc:5,ouvriers:-6,technocrates:-4,precaires:-4}:{capital:10,ouvriers:-6,professions:-2},fx:s2=>{s2.pol.cap+=8;return R("Les investissements reprennent. Les syndicats parlent de « gouvernement des banques ».","Investment resumes. The unions speak of a 'bankers' government'.");}},
       {label:p5?R("Prendre le relais : la Caisse, Hydro, la SGF investissent","Step in: the Caisse, Hydro, the SGF invest"):R("Prendre le relais : crédit public et coopératives","Step in: public credit and co-operatives"),desc:R("L'État remplace le capital privé ; la dette monte.","The state replaces private capital; debt rises."),
        g:p5?{technocrates:6,quebecinc:4,capital:-6}:{professions:5,habitants:3,capital:-6},fx:s2=>{if(p5){s2.etat+=4;s2.dette+=3;s2.foreign-=2;}else{s2.treasury-=Math.min(s2.treasury,M(s2,.1));s2.foreign-=2;}s2.pol.cap+=3;return R("Des capitaux d'ici prennent la place. Ils sont moins nombreux, mais ils restent.","Local capital takes over. There is less of it, but it stays.");}},
       {label:R("Ne pas céder au chantage","Refuse to give in to blackmail"),desc:R("L'économie souffre ; la dignité aussi a un prix.","The economy suffers; dignity has a price too."),
        g:p5?{technocrates:3,ouvriers:2}:{professions:3},fx:s2=>{s2.eco-=4;if(p5)s2.mtl=(s2.mtl??58)-4;return R("Des usines ferment, des cadres partent. Mais le gouvernement a montré qui gouverne.","Factories close, managers leave. But the government has shown who governs.");}}]});}
  if(id==='P:marchands')return ev(id,{title:R("Les marchands en appellent à Londres","The merchants appeal to London"),
      because:()=>R(`Les marchands britanniques sont mécontents (climat d'affaires ${Math.round(P.cap)}/100) : la Chambre canadienne bloque les canaux, les bureaux d'enregistrement et les taxes sur le commerce.`,`The British merchants are unhappy (business climate ${Math.round(P.cap)}/100): the Canadien House blocks canals, registry offices and trade taxes.`),
      text:R("Les marchands de Montréal financent des pétitions et des agents à Londres : il faut unir les Canadas, noyer la majorité canadienne et ouvrir le pays au commerce. Le capital marchand a plus d'amis au Parlement de Westminster que l'Assemblée de Québec.","Montreal merchants fund petitions and agents in London: the Canadas must be united, the Canadien majority drowned and the country opened to trade. Merchant capital has more friends in Westminster than the Assembly in Quebec."),
      choices:[
       {label:R("Voter les canaux et des bureaux d'enregistrement","Vote the canals and registry offices"),desc:R("Les marchands se calment ; les seigneurs et les professions grincent.","The merchants calm down; seigneurs and professions grumble."),g:{marchands:12,seigneurs:-4,professions:-3},fx:s2=>{s2.eco+=2;return R("Le canal de Lachine se creuse. À Londres, le lobby de l'union perd des appuis.","The Lachine Canal is dug. In London, the union lobby loses support.");}},
       {label:R("Défendre la Chambre : pas de taxes sans notre accord","Defend the House: no taxes without our consent"),desc:R("Londres entend surtout les marchands.","London mostly hears the merchants."),g:{professions:4,habitants:2,marchands:-6},fx:s2=>{s2.flags.lobbyUnion=y;return R("Les pétitions des marchands s'empilent à Londres. Le projet d'union reviendra.","The merchants' petitions pile up in London. The union scheme will return.");}}]});
  if(id==='P:planB')return ev(id,{title:R("Le plan B d'Ottawa","Ottawa's Plan B"),
      because:()=>R(`Ottawa juge la menace sérieuse (${Math.round(s.souv)} % de souverainistes chez les francophones) et choisit la manière forte.`,`Ottawa judges the threat serious (${Math.round(s.souv)}% sovereigntists among francophones) and chooses the hard line.`),
      text:R("Ottawa renvoie à la Cour suprême la question de la sécession, prépare une loi sur la « clarté » qui lui donnera le droit de juger la question et la majorité, et laisse ses ministres parler de partition : si le Canada est divisible, le Québec l'est aussi.","Ottawa refers secession to the Supreme Court, prepares a 'clarity' law giving it the right to judge the question and the majority, and lets its ministers speak of partition: if Canada is divisible, so is Quebec."),
      choices:[
       {label:R("Répliquer : une loi sur le droit du Québec à disposer de lui-même","Reply: a law on Quebec's right to self-determination"),g:{technocrates:4,anglos:-4},fx:s2=>{s2.flags.planB=true;s2.patri+=2;s2.souv+=2;return R("Chaque Parlement vote sa loi. Le bras de fer juridique nourrit les deux camps.","Each Parliament passes its law. The legal arm-wrestling feeds both camps.");}},
       {label:R("Faire le dos rond","Lie low"),g:{quebecinc:3,technocrates:-3},fx:s2=>{s2.flags.planB=true;s2.souv-=2;return R("La peur fait son œuvre : la souveraineté paraît plus risquée.","Fear does its work: sovereignty seems riskier.");}}]});
  if(id==='P:offre')return ev(id,{title:R("Ottawa tend la main","Ottawa reaches out"),
      because:()=>R(`Le Canada anglais est plutôt ouvert (${Math.round(P.cen.op)}/100) et la souveraineté inquiète (${Math.round(s.souv)} %) : Ottawa préfère acheter la paix.`,`English Canada is fairly open (${Math.round(P.cen.op)}/100) and sovereignty worries it (${Math.round(s.souv)}%): Ottawa prefers to buy peace.`),
      text:R("Le premier ministre fédéral propose de céder des pouvoirs : main-d'œuvre, immigration, culture, un droit de retrait avec compensation. Rien de constitutionnel, mais du concret.","The federal prime minister offers to hand over powers: manpower, immigration, culture, an opt-out with compensation. Nothing constitutional, but concrete."),
      choices:[
       {label:R("Accepter : des pouvoirs, tout de suite","Accept: powers, right now"),g:{technocrates:3,quebecinc:4,anglos:3,allos:3},fx:s2=>{s2.flags.offreOttawa=true;s2.autonomy+=6;s2.souv-=5;return R("Les fonctionnaires québécois héritent de nouveaux programmes. La souveraineté perd un argument.","Quebec civil servants inherit new programs. Sovereignty loses an argument.");}},
       {label:R("Refuser : des miettes, quand on veut un pays","Refuse: crumbs, when we want a country"),g:{technocrates:2,quebecinc:-3},fx:s2=>{s2.flags.offreOttawa=true;s2.patri+=1;s2.pol.cen.op-=4;return R("Ottawa se sent rabroué. Le Canada anglais retient que le Québec ne veut jamais rien.","Ottawa feels rebuffed. English Canada remembers that Quebec never wants anything.");}}]});
  if(id==='P:central')return ev(id,{title:R("Ottawa centralise","Ottawa centralizes"),
      because:()=>R(`Le Canada anglais voit le Québec comme une province parmi d'autres (humeur ${Math.round(P.cen.op)}/100).`,`English Canada sees Quebec as one province among others (mood ${Math.round(P.cen.op)}/100).`),
      text:R("Ottawa propose de « louer » les impôts des provinces et de financer lui-même universités, routes et pensions. L'argent est réel ; les conditions aussi.","Ottawa proposes to 'rent' the provinces' taxes and fund universities, roads and pensions itself. The money is real; so are the conditions."),
      choices:[
       {label:R("Prendre l'argent","Take the money"),g:{ouvriers:3,habitants:2,professions:-4,clerge:-3},fx:s2=>{s2.treasury+=M(s2,.15);s2.autonomy-=4;return R("Les chèques fédéraux arrivent. L'autonomie de la province s'amenuise.","Federal cheques arrive. The province's autonomy shrinks.");}},
       {label:R("Refuser : nos compétences ne sont pas à louer","Refuse: our powers are not for rent"),g:{professions:5,clerge:3,ouvriers:-2},fx:s2=>{s2.flags.resisteCentral=true;s2.autonomy+=4;s2.patri+=2;return R("La province perd de l'argent, mais garde ses compétences. Les nationalistes applaudissent.","The province loses money but keeps its powers. Nationalists applaud.");}}]});
  if(id==='P:coercition')return ev(id,{title:R("Le Château serre la vis","The Château tightens the screws"),
      because:()=>R(`Londres a choisi la coercition (humeur ${Math.round(P.cen.op)}/100) : le mouvement national l'inquiète.`,`London has chosen coercion (mood ${Math.round(P.cen.op)}/100): the national movement worries it.`),
      text:R("Le gouverneur dissout la Chambre, fait saisir les presses d'un journal canadien et emprisonner son imprimeur. Ses conseillers parlent de suspendre la constitution.","The Governor dissolves the House, has a Canadien newspaper's presses seized and its printer jailed. His advisers speak of suspending the constitution."),
      choices:[
       {label:R("Des pétitions à Londres, des assemblées partout","Petitions to London, meetings everywhere"),g:{professions:4,habitants:2},fx:s2=>{s2.patri+=4;s2.compagnie-=4;return R("Les paroisses signent par milliers. Le gouverneur sera rappelé, mais la méfiance reste.","Parishes sign by the thousands. The Governor will be recalled, but mistrust remains.");}},
       {label:R("Plier : le clergé appelle au calme","Bend: the clergy calls for calm"),g:{clerge:5,seigneurs:4,professions:-6},fx:s2=>{s2.compagnie+=5;s2.patri-=3;return R("La tempête passe. Les jeunes avocats ne pardonneront pas votre prudence.","The storm passes. The young lawyers will not forgive your caution.");}}]});
  if(id==='P:deborde')return ev(id,{title:R("Les radicaux vous débordent","The radicals outflank you"),
      because:()=>R(`Le peuple canadien est plus nationaliste que votre ligne (écart de ${Math.round(s.gap3)} points) : les professions et les habitants des comtés du sud s'impatientent.`,`The Canadien people are more nationalist than your line (a gap of ${Math.round(s.gap3)} points): the professions and the habitants of the southern counties grow impatient.`),
      text:R("Une nouvelle génération d'avocats et de médecins tient des assemblées sans vous : ils veulent le contrôle des subsides, un conseil législatif électif, la fin du « gouvernement du Château ». Dans les gazettes, on vous traite de « vendus ».","A new generation of lawyers and doctors holds meetings without you: they want control of supply, an elected legislative council, an end to 'Château government'. In the gazettes, you are called 'sell-outs'."),
      choices:[
       {label:R("Prendre la tête du mouvement","Take the lead of the movement"),desc:R("Votre ligne se durcit d'un cran ; le clergé et les seigneurs s'inquiètent.","Your line hardens a notch; the clergy and the seigneurs worry."),g:{professions:6,habitants:3,clerge:-4,seigneurs:-4},fx:s2=>{s2.orient.cour=s2.orient.cour==='loyal'?'reforme':'patriote';return R("Vous reprenez la main. Le gouverneur, lui, vous range désormais parmi les « factieux ».","You regain the initiative. The Governor now counts you among the 'factious'.");}},
       {label:R("Tenir votre ligne","Hold your line"),desc:R("Les professions vous lâchent pour des chefs plus radicaux.","The professions abandon you for more radical leaders."),fx:s2=>{polRealign(s2,'professions','canadien',-8);polRealign(s2,'habitants','canadien',-3);return R("Le parti se divise. Les radicaux auront leurs propres journaux, et bientôt leurs propres candidats.","The party splits. The radicals will have their own papers, and soon their own candidates.");}}]});
  if(id==='P:lache')return ev(id,{title:R("Le clergé et les modérés vous lâchent","The clergy and the moderates abandon you"),
      because:()=>R(`Votre ligne patriote va plus loin que le peuple (écart de ${Math.round(-s.gap3)} points) : les curés, les seigneurs et les habitants prudents prennent peur.`,`Your patriote line goes further than the people (a gap of ${Math.round(-s.gap3)} points): priests, seigneurs and cautious habitants take fright.`),
      text:R("Du haut de la chaire, les curés lisent une lettre de l'évêque : la révolte contre l'autorité légitime est un péché. Des députés modérés quittent le parti et s'entendent avec le gouverneur.","From the pulpit, priests read a letter from the bishop: revolt against lawful authority is a sin. Moderate members leave the party and come to terms with the Governor."),
      choices:[
       {label:R("Modérer le ton : revenir à la réforme","Tone it down: back to reform"),g:{clerge:5,seigneurs:4,professions:-5},fx:s2=>{s2.orient.cour='reforme';return R("Les modérés reviennent. Les plus ardents, eux, vous traitent de tiède.","The moderates return. The most ardent call you lukewarm.");}},
       {label:R("Aller de l'avant, avec ceux qui suivent","Press on, with those who follow"),fx:s2=>{polRealign(s2,'clerge','canadien',-8);polRealign(s2,'seigneurs','canadien',-8);polRealign(s2,'habitants','canadien',-3);return R("Le mouvement perd ses notables, mais il gagne en ardeur. S'il y a révolte, ce sera sans l'Église.","The movement loses its notables but gains in ardour. If there is a revolt, it will be without the Church.");}}]});
  return null;};

/* le Canada anglais et les minorités : l'humeur du centre rend les mesures contre les écoles françaises plus ou moins probables */
const bf=s=>clamp(1+(50-((s.pol&&s.pol.cen)?s.pol.cen.op:50))*.025,.45,1);
const wrap=(id,f)=>{const old=LIKELY[id];LIKELY[id]=s=>(old?old(s):1)*f(s);};
wrap('manitoba1890',bf);wrap('reglement17_1912',bf);wrap('nbschools1871',bf);
})();
