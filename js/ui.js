/* Kebec — Interface : bandeau, bureau du gouverneur, dépêches illustrées, écran-titre, bilan. */
const $=id=>document.getElementById(id);
const fmt=n=>Math.round(n).toLocaleString(lang==='fr'?'fr-CA':'en-CA');
const ico=(id,cls)=>`<svg class="ico ${cls||''}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const fr=()=>lang==='fr';
let nextUntil=0,tab='colonie',dispatchMin=false,prologueOpen=false,helpOpen=false,titleOpen=false;
const UI={
 fr:{colonie:'Colonie',ordres:'Ordres',registre:'Registre',playing:'Le temps passe',paused:'En pause',decision:'Une décision vous attend',step:'+1 saison',cont:'Continent',valley:'Vallée',
  seasonsLeft:'saisons de vivres',lastHaul:'dernière traite',defence:'défense',women:'femmes',settlers:'habitants',souls:'âmes',
  gov:'Onontio',since:'en charge depuis',colony:'La colonie',families:'familles',cleared:'arpents défrichés',church:'Église',autonomy:'Autonomie des habitants',company:'Faveur de la Compagnie',
  nations:'Les nations',seeds:'Ce que vos choix préparent',noSeeds:'Rien encore. Les grandes décisions laisseront ici leur trace.',traj:'Population : vous et l\'histoire',you:'vous',hist:'histoire',
  budget:'Budget annuel',budgetNote:'Engagé chaque printemps à l\'arrivée des navires. Un changement s\'applique au prochain printemps.',reserve:'en réserve',committed:'engagé cette année',
  standing:'Ordres permanents',orient:'Orientations',relations:'Les Relations',noRel:'La première Relation sera rédigée au printemps prochain.',journal:'Journal',
  story:'Histoire',unplanned:'Imprévu',context:'Contexte',seeMap:'Voir la carte',histChoice:'choix historique',uncertain:'issue incertaine',yourDecision:'Votre décision',
  inHistory:'Dans l\'histoire',wasHist:'C\'est ce qui s\'est réellement passé.',continue:'Continuer',take:'Prendre la charge',newGame:'Nouvelle partie',resume:'Continuer la partie',howto:'Comment jouer',credits:'Images',close:'Fermer',
  autoResume:'reprise automatique',springPause:'pause au printemps',speed:'Vitesse',restart:'Recommencer',pending:'affaire en attente'},
 en:{colonie:'Colony',ordres:'Orders',registre:'Register',playing:'Time is passing',paused:'Paused',decision:'A decision awaits',step:'+1 season',cont:'Continent',valley:'Valley',
  seasonsLeft:'seasons of food',lastHaul:'last trade',defence:'defence',women:'women',settlers:'settlers',souls:'souls',
  gov:'Onontio',since:'in office since',colony:'The colony',families:'families',cleared:'arpents cleared',church:'Church',autonomy:'Habitant autonomy',company:'Company favour',
  nations:'The nations',seeds:'What your choices set up',noSeeds:'Nothing yet. Major decisions will leave their mark here.',traj:'Population: you vs. history',you:'you',hist:'history',
  budget:'Annual budget',budgetNote:'Committed each spring when the ships arrive. A change applies next spring.',reserve:'in reserve',committed:'committed this year',
  standing:'Standing orders',orient:'Orientations',relations:'The Relations',noRel:'The first Relation will be written next spring.',journal:'Journal',
  story:'History',unplanned:'Unplanned',context:'Context',seeMap:'See the map',histChoice:'historical choice',uncertain:'uncertain outcome',yourDecision:'Your decision',
  inHistory:'In history',wasHist:'This is what really happened.',continue:'Continue',take:'Take office',newGame:'New game',resume:'Resume game',howto:'How to play',credits:'Images',close:'Close',
  autoResume:'auto-resume',springPause:'pause each spring',speed:'Speed',restart:'Start over',pending:'matter pending'}};
const u=k=>UI[lang][k]??k;

/* ---------- HUD ---------- */
function dl(k,inv){if(!S.prev||S.prev[k]==null)return'';const d=Math.round(S[k]-S.prev[k]);if(!d)return'';const good=inv?d<0:d>0;return `<span class="dd ${good?'up':'down'}">${d>0?'+':'−'}${fmt(Math.abs(d))}</span>`;}
function renderHUD(){
  const g=gov(S);
  if(S.period===5){const cr=CRISES5.some(([x,y])=>S.year>=x&&S.year<=y);$('date').innerHTML=`<span class="season ${cr?'war':'s1'}">${L(regime5(S.year))}</span><b>${S.year}</b><small>${S.turn>1?(fr()?`Législature · ${S.turn} ans`:`Legislature · ${S.turn} years`):(fr()?'Un an par tour':'One year per turn')}</small>`;}
  else if(S.period===4){const w=warAt4(S.year);$('date').innerHTML=`<span class="season ${w||crise4(S.year)?'war':'s1'}">${w?L(w.name):L(regime4(S.year))}</span><b>${S.year}</b><small>${S.turn>1?(fr()?`Législature · ${S.turn} ans`:`Legislature · ${S.turn} years`):(fr()?'Un an par tour':'One year per turn')}</small>`;}
  else if(S.period===3){const w=warAt3(S.year);$('date').innerHTML=`<span class="season ${w?'war':'s1'}">${w?L(w.name):L(regime3(S.year))}</span><b>${S.year}</b><small>${S.turn>1?(fr()?`Législature de ${S.turn} ans`:`${S.turn}-year legislature`):(fr()?'Un an par tour':'One year per turn')}</small>`;}
  else if(S.period===2){const w=warAt(S.year);$('date').innerHTML=`<span class="season ${w?'war':'s1'}">${w?(fr()?'Guerre':'War'):(fr()?'Paix':'Peace')}</span><b>${S.year}</b><small>${w?L(w.name):(S.turn>1?(fr()?'Tours de deux ans':'Two-year turns'):(fr()?'Un an par tour':'One year per turn'))}</small>`;}
  else $('date').innerHTML=`<span class="season s${S.season}">${SEASONS[lang][S.season]}</span><b>${S.year}</b><small>${SEASON_NOTE[lang][S.season]}</small>`;
  const sea=S.pop?(S.period===2?S.food/S.pop*4:S.food/(S.pop*.25)):99;
  const item=(i,v,sub,tip,extra,cls)=>`<div class="r ${cls||''}" title="${tip}">${ico(i)}<div><b>${v}${extra||''}</b><small>${sub}</small></div></div>`;
  if(S.period===5){const frs=frShare5(S);$('res').innerHTML=item('pop',fmt(S.pop),`${Math.round(frs*100)} % ${fr()?'francophones':'francophone'}`,u('settlers'),dl('pop'))
   +item('fleur',Math.round(S.souv)+' %',fr()?'souverainistes':'sovereigntist',fr()?'Appui à la souveraineté chez les francophones':'Support for sovereignty among francophones',dl('souv'))
   +item('coin',fmtM(S.treasury),'$',fr()?'Trésor du Québec':'Quebec treasury','',S.treasury<0?'warn':'')
   +item('feather',Math.round(S.support)+' %',fr()?'appui':'support',fr()?'Appui électoral':'Electoral support',dl('support'),S.support<40?'warn':'')
   +item('shield',S.chom.toFixed(1)+' %',fr()?'chômage':'unemployment',fr()?`Chômage · dette ${Math.round(S.dette)} % du PIB`:`Unemployment · debt ${Math.round(S.dette)}% of GDP`,'',S.chom>11?'warn':'');}
  else if(S.period===4){const frs=1-S.ang/S.pop;$('res').innerHTML=item('pop',fmt(S.pop),`${Math.round(S.urb*100)} % ${fr()?'en ville':'urban'}`,u('settlers'),dl('pop'))
   +item('women',Math.round(frs*100)+' %',fr()?'francophones':'francophones',fr()?'Part des francophones':'Share of francophones','',frs<.72?'warn':'')
   +item('coin',fmt(S.treasury),'$',fr()?'Deniers publics':'Public money',dl('treasury'),S.treasury<0?'warn':'')
   +item('feather',Math.round(S.support)+' %',fr()?'appui':'support',fr()?'Appui électoral':'Electoral support',dl('support'),S.support<40?'warn':'')
   +item('fleur',Math.round(S.patri),fr()?'nationalisme':'nationalism',fr()?'Nationalisme':'Nationalism',dl('patri'));}
  else if(S.period===3){const frs=1-S.ang/S.pop;$('res').innerHTML=item('pop',fmt(S.pop),`${fmt(S.ang)} ${fr()?'anglophones':'English speakers'}`,u('settlers'),dl('pop'))
   +item('women',Math.round(frs*100)+' %',fr()?'Canadiens':'Canadiens',fr()?'Part des Canadiens français':'Share of French Canadians','',frs<.7?'warn':'')
   +item('coin',fmt(S.treasury),'£',fr()?'Moyens':'Means',dl('treasury'),S.treasury<0?'warn':'')
   +item('fur',Math.round(S.eco),fr()?'économie':'economy',fr()?'Économie':'Economy')
   +item('shield',Math.round(S.patri),fr()?'mouvement national':'national movement',fr()?'Mouvement national':'National movement',dl('patri'));}
  else $('res').innerHTML=item('pop',fmt(S.pop),`${fmt(S.women||0)} ${u('women')}`,u('settlers'),dl('pop'))
   +item('food',sea>=40?'40+':sea.toFixed(1),S.period===2?(fr()?'saisons de vivres':'seasons of food'):u('seasonsLeft'),t('food'),'',sea<2?'warn':'')
   +item('coin',fmt(S.treasury),t('livres'),t('treasury'),dl('treasury'),S.treasury<0?'warn':'')
   +item('fur',fmt(S.furs),u('lastHaul'),t('furs'))
   +item('shield',Math.round(S.defense),u('defence'),t('defense'),dl('defense'));
  const blocked=S.pending.length||S.outcome||S.ending;
  const idle=!running&&!blocked&&relOpen===null&&!titleOpen&&!prologueOpen;
  $('ctl').innerHTML=`<button class="play${running?' on':''}${idle?' idle':''}" data-act="play" ${blocked?'disabled':''} aria-label="${running?'Pause':'Play'}">${ico(running?'pause':'play')}<span>${running?(fr()?'Pause':'Pause'):(fr()?'Jouer':'Play')}</span></button>
   <div class="speeds" role="group" aria-label="${u('speed')}">${[0,1,2].map(i=>`<button data-act="speed" data-v="${i}" aria-pressed="${speed===i}">${'›'.repeat(i+1)}</button>`).join('')}</div>
   <div class="status ${blocked&&S.pending.length?'need':''}">${S.pending.length?u('decision'):resuming?(fr()?'Reprise dans un instant…':'Resuming shortly…'):running?u('playing'):u('paused')}<button class="linkbtn" data-act="step" ${blocked||running?'disabled':''}>${S.period>=2?(fr()?`+${S.turn||1} an${(S.turn||1)>1?'s':''}`:`+${S.turn||1} year${(S.turn||1)>1?'s':''}`):u('step')}</button></div>`;
  $('sndslot').innerHTML=soundBtnHTML();$('lang-fr').setAttribute('aria-pressed',lang==='fr');$('lang-en').setAttribute('aria-pressed',lang==='en');
  $('v-cont').textContent=u('cont');$('v-val').textContent=u('valley');
  renderHUDView();renderGauge();
  $('bigplay').hidden=!idle;$('bigplay').innerHTML=`${ico('play')}<span>${fr()?'Faire passer le temps':'Let time pass'}<small>${fr()?'barre d\'espace':'space bar'}</small></span>`;
  const last=S.log[0];$('ticker').innerHTML=last?`<span>${S.period>=2?'':SEASONS[lang][last.se]+' '}${last.y}</span> ${L(last.text)}`:'';
  const era=document.querySelector('.brand .era');if(era)era.textContent=S.period===5?'V · 1960–2000':S.period===4?'IV · 1867–1960':S.period===3?'III · 1760–1867':S.period===2?'II · 1663–1760':'I · 1608–1663';
}
/* ---------- desk tabs ---------- */
function renderTabs(){
  $('tabs').innerHTML=['colonie','ordres','registre'].map(k=>`<button role="tab" data-act="tab" data-v="${k}" aria-selected="${tab===k}">${u(k)}${k==='registre'&&S.chron&&S.chron.length&&S.chronSeen!==S.chron[0].y?'<i class="dot"></i>':''}</button>`).join('');
  $('tabbody').innerHTML=tab==='colonie'?(S.period===5?tabColonie5():S.period===4?tabColonie4():S.period===3?tabColonie3():S.period===2?tabColonie2():tabColonie()):tab==='ordres'?(S.period===5?tabOrdres5():S.period===4?tabOrdres4():S.period===3?tabOrdres3():S.period===2?tabOrdres2():tabOrdres()):tabRegistre();
}
/* les grands montants, en millions ou milliards */
function fmtM(n){const a=Math.abs(n);if(a>=1e9)return (n/1e9).toFixed(a>=1e10?0:1).replace('.',fr()?',':'.')+(fr()?' G':' B');if(a>=1e6)return Math.round(n/1e6)+' M';return fmt(n);}
function meter(v,inv,lab,val){const q=inv?100-v:v;const c=q>=60?'good':q>=35?'mid':'bad';return `<div class="meter"><div class="ml"><span>${lab}</span><b>${val??Math.round(v)}</b></div><div class="mb"><i class="${c}" style="width:${clamp(v,0,100)}%"></i></div></div>`;}
function initials(n){return n.replace(/\(.*?\)/g,'').split(/\s+/).filter(w=>/^[A-ZÉ]/.test(w)).map(w=>w[0]).slice(0,2).join('');}
function tabColonie(){
  const g=gov(S);const pic=GOV_IMG[g.name];
  let h=`<section class="gov">${pic?`<img src="${imgSrc(pic)}" alt="">`:`<div class="mono">${initials(g.name)}</div>`}<div><div class="kick">${u('gov')} · ${u('since')} ${g.from}</div><h3>${g.name}</h3><p>${L(g.trait)}</p></div></section>`;
  h+=`<section><h4>${u('colony')}</h4><div class="stats">
    <div>${ico('pop')}<b>${fmt(S.pop)}</b><small>${u('souls')}</small></div>
    <div>${ico('women')}<b>${fmt(S.women||0)}</b><small>${u('women')}</small></div>
    <div>${ico('food')}<b>${fmt(S.cleared*4)}</b><small>${u('cleared')}</small></div></div>
    ${meter(S.church,false,u('church'))}${meter(S.autonomy,false,u('autonomy'))}${meter(S.compagnie,false,u('company'))}</section>`;
  // trajectory
  const W=340,H=96,x=y=>14+(y-1608)/(1663-1608)*(W-24),maxP=Math.max(3000,...S.popHist.map(p=>p[1]));const yv=v=>H-16-Math.sqrt(v/maxP)*(H-26);
  const hp=[];for(let yy=1608;yy<=1663;yy+=.5)hp.push(`${x(yy).toFixed(1)},${yv(histPop(yy)).toFixed(1)}`);
  const yp=S.popHist.map(p=>`${x(p[0]).toFixed(1)},${yv(p[1]).toFixed(1)}`);const lp=S.popHist[S.popHist.length-1];
  h+=`<section><h4>${u('traj')}</h4><svg class="traj" viewBox="0 0 ${W} ${H}"><polyline class="hist" points="${hp.join(' ')}"/><polyline class="you" points="${yp.join(' ')}"/>${lp?`<circle class="you" cx="${x(lp[0])}" cy="${yv(lp[1])}" r="3"/>`:''}<text x="14" y="${H-2}">1608</text><text x="${W-10}" y="${H-2}" text-anchor="end">1663</text><text x="${W-10}" y="10" text-anchor="end">— ${u('you')} · ┄ ${u('hist')}</text></svg></section>`;
  // nations
  h+=`<section><h4>${u('nations')}</h4>`+GROUPS.map(g=>{const v=S.rel[g.id],tone=natTone(g);const word=g.id==='wen'&&S.wenFallen?t('dispersed'):L(TONE_WORD[tone]);
    return `<div class="rel"><div class="ml"><span>${L(g.name)}</span><b class="${tone}">${word} <small>${v>0?'+':''}${Math.round(v)}</small></b></div><div class="rbar" title="−100 … +100"><i class="${tone}" style="left:${(v+100)/2}%"></i></div></div>`;}).join('')+`<p class="quiet" style="margin:6px 0 0">${fr()?'De −100 (guerre) à +100 (alliance). Toute nation peut devenir alliée ou ennemie.':'From −100 (war) to +100 (alliance). Any nation can become an ally or an enemy.'}</p></section>`;
  // seeds
  const seeds=[];for(const f in SEEDS){const on=f==='annedda'?S.annedda:S.flags[f];if(on)seeds.push(L(SEEDS[f]));}
  for(const p in PLACE_GAIN)if(S.places[p])seeds.push(L(PLACE_GAIN[p]));
  h+=`<section><h4>${u('seeds')}</h4>${seeds.length?`<div class="seeds">${seeds.map(x=>`<span class="chip seed"><i class="ico seed"></i>${x}</span>`).join('')}</div>`:`<p class="quiet">${u('noSeeds')}</p>`}</section>`;
  h+=societyHTML(S);if(typeof acadHTML==='function'){acadEnsure(S);h+=acadHTML(S);}
  return h;
}
const OHINT={eco:{traite:R("Plus de fourrures, peu de défrichement ; les engagés repartent.","More furs, little clearing; indentured men go home."),equilibre:R("Un peu de tout, rien d'excellent.","A bit of everything, nothing excellent."),colonie:R("Défrichement et familles ; moins de fourrures, la Compagnie grogne.","Clearing and families; fewer furs, the Company grumbles.")},
 all:{armee:R("Les alliés vous font confiance. Les Haudenosaunee vous visent.","The allies trust you. The Haudenosaunee target you."),mediation:R("La tension baisse lentement. Les alliés doutent de vous.","Tension slowly eases. The allies doubt you.")},
 mis:{actives:R("L'Église grandit ; les missionnaires vivent chez les Wendats, avec ce que ça implique.","The Church grows; missionaries live among the Wendat, with all that implies."),discretes:R("Moins de frictions, moins d'influence de l'Église.","Less friction, less Church influence.")}};
const PHINT={trade:{wait:R("Sûr, mais 20 % de fourrures en moins.","Safe, but 20% fewer furs."),upriver:R("Plus de fourrures ; risque d'embuscade si la tension est forte.","More furs; risk of ambush when tension is high."),truch:R("3 jeunes hommes partent ; liens plus forts, plus de fourrures l'an prochain.","3 young men leave; stronger ties, more furs next year.")},
 cargo:{engages:R("Beaucoup de bras, presque que des hommes : la plupart repartiront.","Lots of hands, almost all men: most will go home."),colons:R("Moins d'arrivants, mais plus d'un tiers de femmes : des familles qui restent.","Fewer newcomers, but over a third women: families who stay."),soldats:R("Défense +8 au printemps ; presque pas de femmes.","Defence +8 in spring; almost no women."),vivres:R("Vivres et défrichement en plus.","Extra food and land clearing."),traite:R("+20 % de fourrures l'été suivant.","+20% furs the following summer.")},
 ration:{normal:R("Chacun mange à sa faim, ou presque.","Everyone eats their fill, almost."),strict:R("30 % de vivres économisés ; plus de scorbut, moins de naissances.","Saves 30% of food; more scurvy, fewer births."),share:R("Nourrir des familles alliées : vivres en moins, alliés reconnaissants.","Feed allied families: less food, grateful allies.")}};
function tabOrdres(){
  const NAMES={etab:['etab','etabS'],def:['def','defS'],pres:['pres','presS'],traite:['traiteE','traiteS'],miss:['miss','missS']};
  const sum=ENV.reduce((a,k)=>a+S.budget[k],0),base=Math.max(0,S.treasury);
  let h=`<section><h4>${u('budget')}</h4>${S.flags.occupied?`<p class="quiet">${t('occupiedB')}</p>`:`<p class="quiet">${u('budgetNote')}</p>`}`;
  for(const k of ENV)h+=`<label class="slider"><span class="sl"><b>${t(NAMES[k][0])}</b><small>${t(NAMES[k][1])}</small></span><input type="range" min="0" max="100" step="5" value="${S.budget[k]}" data-act="bud" data-k="${k}" id="bud-${k}" ${S.flags.occupied?'disabled':''}><span class="sv"><b>${S.budget[k]} %</b><small>≈ ${fmt(base*S.budget[k]/100)}</small></span></label>`;
  h+=`<div class="tot"><span>${100-sum} % ${u('reserve')}</span><span>${fmt(ENV.reduce((a,k)=>a+(S.alloc[k]||0),0))} ${t('livres')} ${u('committed')}</span></div></section>`;
  const row=(k,lab,opts,hints,obj)=>`<div class="og"><div class="lab">${t(lab)}</div><div class="seg" role="group">${opts.map(o=>`<button data-act="${obj}" data-k="${k}" data-v="${o[0]}" aria-pressed="${(obj==='plan'?S.routine:S.orient)[k]===o[0]}" ${o[2]?'disabled':''}>${t(o[1])}</button>`).join('')}</div><p>${L(hints[k][(obj==='plan'?S.routine:S.orient)[k]])}</p></div>`;
  h+=`<section><h4>${u('standing')}</h4>`+row('trade','tradeL',[['wait','wait'],['upriver','upriver'],['truch','truch',S.pop<=15]],PHINT,'plan')+row('cargo','cargoL',[['engages','engages'],['colons','colons'],['soldats','soldats'],['vivres','vivres'],['traite','cTraite']],PHINT,'plan')+row('ration','rationL',[['normal','normal'],['strict','strict'],['share','share']],PHINT,'plan')+`</section>`;
  h+=`<section><h4>${u('orient')}</h4>`+row('eco','eco',[['traite','traite'],['equilibre','equilibre'],['colonie','colonie']],OHINT,'orient')+row('all','all',[['armee','armee'],['mediation','mediation']],OHINT,'orient')+row('mis','mis',[['actives','actives'],['discretes','discretes']],OHINT,'orient')+`</section>`;
  h+=`<section class="prefs"><label class="chk"><input type="checkbox" data-act="spring" ${springPause?'checked':''}> ${u('springPause')}</label><label class="chk"><input type="checkbox" data-act="autores" ${autoResume?'checked':''}> ${u('autoResume')}</label></section>`;
  return h;
}
function tabRegistre(){
  if(S.chron&&S.chron.length)S.chronSeen=S.chron[0].y;
  let h=`<section><h4>${u('relations')}</h4>`;
  if(!S.chron||!S.chron.length)h+=`<p class="quiet">${u('noRel')}</p>`;
  else h+=S.chron.slice(0,12).map((c,i)=>`<article class="relation${i===0?' fresh':''}" data-act="openrel" data-v="${i}" tabindex="0" role="button"><div class="rh">${fr()?'Relation de ce qui s\'est passé en la Nouvelle-France en l\'année':'Relation of what took place in New France in the year'} <b>${c.y}</b></div><p>${L(c)}</p><span class="readmore">${fr()?'Lire la Relation':'Read the Relation'} →</span></article>`).join('');
  const dv=S.divergences||[];h+=`</section><section><h4>${fr()?'Les bifurcations':'Where history forked'}</h4>${dv.length?dv.slice().reverse().map(d=>`<p class="fork"><b>${d.y}</b><span>${L(d.text)}</span></p>`).join(''):`<p class="quiet">${fr()?"Pour l'instant, l'histoire suit son cours. Quand vos choix rendront un événement historique improbable, il sera noté ici.":'So far, history follows its course. When your choices make a historical event unlikely, it will be noted here.'}</p>`}`;
  const WL=S.worldLog||[];h+=`</section><section><h4>${fr()?'Le monde':'The world'}</h4>${WL.length?WL.slice(0,30).map(w=>{const it=WORLD[w.i];return it?`<p class="fork world"><b>${it.y}</b><span><i>${L(WORLD_K[it.k])}</i> · <b>${L(it.t)}</b> — ${L(it.x)}</span></p>`:'';}).join(''):`<p class="quiet">${fr()?'Les nouvelles du monde arrivent avec les navires.':'News of the world arrives with the ships.'}</p>`}`;
  h+=`</section><section><h4>${u('journal')}</h4><div class="journal">${S.log.slice(0,40).map(e=>`<p class="${e.kind}"><b>${S.period>=2&&e.y>=1663?'':SEASONS[lang][e.se].slice(0,3)+'. '}${e.y}</b><span>${L(e.text)}</span></p>`).join('')}</div></section>`;
  return h;
}
/* ---------- dispatch ---------- */
/* histoire ou hypothèse : chaque affaire dit d'où elle vient */
const ALT_EVENTS=new Set(['kirke1629b','etat1776','republique1838','paix1760','acadieReste1756']);
function evKind(e){if(!e)return 'plaus';if(e.review)return 'review';if(e.elec)return 'elec';if(e.vote)return 'ref';if(ALT_EVENTS.has(e.id)||e.alt)return 'alt';if(e.conseq)return 'conseq';if(e.sys)return 'plaus';return 'hist';}
const KIND={hist:R(['Fait historique','Ceci est vraiment arrivé, à peu près à ce moment.'],['Historical event','This really happened, at about this time.']),
 alt:R(['Uchronie','Ceci n’est pas arrivé : vos choix ont fait bifurquer l’histoire.'],['Alternate history','This did not happen: your choices have forked history.']),
 conseq:R(['Hypothèse','Une suite plausible de vos choix, pas un fait attesté.'],['Hypothetical','A plausible result of your choices, not a recorded fact.']),
 plaus:R(['Vraisemblable','Typique de l’époque, mais inventé pour le jeu.'],['Plausible','Typical of the era, but invented for the game.']),
 ref:R(['Référendum','Le peuple décide de son avenir : le résultat dépend de l’appui à la souveraineté, de la question posée et de la campagne.'],['Referendum','The people decide their future: the result depends on support for sovereignty, the question asked and the campaign.']),
 elec:R(['Élection','Le peuple tranche, groupe par groupe : chacun juge ce que votre bilan lui a donné ou enlevé ; la campagne compte, le vent de l’époque un peu.'],['Election','The people decide, group by group: each judges what your record gave or took from it; the campaign matters, the mood of the times a little.']),
 review:R(['Le cap','Vos orientations pour les années qui viennent.'],['The course','Your direction for the years ahead.'])};
function kindTag(e){const k=evKind(e),t=L(KIND[k]);return `<span class="tag k-${k}" title="${t[1]}">${ico(k==='hist'?'book':k==='alt'?'fleur':k==='review'||k==='elec'||k==='ref'?'flag':'feather')}${t[0]}</span>`;}
function kindNote(e){const k=evKind(e);return k==='review'||k==='elec'||k==='ref'?'':`<p class="knote k-${k}">${L(KIND[k])[1]}</p>`;}
function forkCount(){return (S.divergences||[]).length;}
function histGap(){if(typeof histPop!=='function'||!S.pop)return 0;const h=histPop(S.year+(S.period===1?S.season/4:0));return h?S.pop/h-1:0;}
function renderGauge(){const el=$('histgauge');if(!el)return;if(titleOpen||S.ending){el.hidden=true;return;}el.hidden=false;const n=forkCount(),g=histGap(),F=fr();
  const lvl=n===0&&Math.abs(g)<.1?0:n<4&&Math.abs(g)<.25?1:2;
  el.className='histgauge l'+lvl;el.title=F?'Écart entre votre partie et l’histoire réelle. Cliquez pour voir les bifurcations (Registre).':'How far your game has drifted from real history. Click to see the forks (Register).';
  el.innerHTML=`<span class="gl">${lvl===0?(F?'Fidèle à l’histoire':'On the historical track'):lvl===1?(F?'L’histoire s’écarte':'History is drifting'):(F?'Histoire alternative':'Alternate history')}</span><span class="gs">${n?`${n} ${F?(n>1?'bifurcations':'bifurcation'):(n>1?'forks':'fork')}`:(F?'aucune bifurcation':'no forks')} · ${F?'population':'population'} ${g>=0?'+':'−'}${Math.round(Math.abs(g)*100)} %</span>`;}
/* image d'une affaire ; le cap et les imprévus sans gravure prennent celle de l'époque */
function evImg(id,e){if(EVENT_IMG[id])return EVENT_IMG[id];const P=(S&&S.period)||1;if(e&&e.review)return ['','habitation','filles','montreal1760','p4_parlement','p5_assemblee'][P];return P>=5?'p5_assemblee':P>=4?'p4_parlement':P===3?'montreal1760':e&&e.sys?'carte1612':'carte1632';}
const S4=t=>S&&S.period===5&&typeof sub5==='function'?sub5(t):typeof sub4==='function'?sub4(t):t;
function plate(k){if(!k||!IMG[k])return '';return `<figure class="plate"><img src="${imgSrc(k)}" alt="${L(IMG[k].c).replace(/"/g,'')}"><figcaption>${L(IMG[k].c)} · <a href="${commonsUrl(k)}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption></figure>`;}
const BATTLES=new Set(['quebec1759','siege1775','rebellion1837','chateauguay1813','carillon1758','phips1690','lachine1689','louisbourg1745','louisbourg1758','monongahela1755','william1757','deerfield1704','kirke1629','dauversiere1644','sault1660']);
function renderDispatch(){
  const el=$('dispatch');let h='';
  if(S.ending||titleOpen){el.hidden=true;return;}
  if(prologueOpen&&(S.period||1)>=2){h=introHTML(S);}
  else if(prologueOpen){
    h=`<div class="letter">${plate('habitation1608')}<div class="body"><div class="kick">${fr()?'Québec · 3 juillet 1608':'Québec · 3 July 1608'}</div><h2>${fr()?'Vous êtes l\'Onontio':'You are Onontio'}</h2>
    <p class="story drop">${fr()?"Au pied du cap que les Innus appellent Kebec, « là où le fleuve se rétrécit », vingt-huit hommes déchargent des planches, des outils et des barils de lard. Samuel de Champlain fait tracer l'Habitation. Personne ne sait encore s'ils survivront à l'hiver.":"At the foot of the cliff the Innu call Kebec, 'where the river narrows', twenty-eight men unload planks, tools and barrels of salt pork. Samuel de Champlain lays out the Habitation. No one yet knows whether they will survive the winter."}</p>
    <p class="story">${fr()?"Vous n'êtes pas Champlain. Vous êtes la charge qu'il inaugure, celle que les nations appelleront <i>Onontio</i>. Les gouverneurs passeront ; vous resterez, de 1608 jusqu'au jour où le roi reprendra la colonie en main.":"You are not Champlain. You are the office he begins, the one the nations will call <i>Onontio</i>. Governors will come and go; you will remain, from 1608 until the day the King takes the colony in hand."}</p>
    <ul class="how"><li>${ico('play')}<span>${fr()?"<b>Laissez couler le temps.</b> Le jeu s'arrête de lui-même quand une décision vous attend.":"<b>Let time run.</b> The game stops on its own when a decision awaits."}</span></li><li>${ico('book')}<span>${fr()?"<b>Donnez vos ordres</b> (onglet Ordres) : budget, traite, commande à la France, rations, orientations.":"<b>Give your orders</b> (Orders tab): budget, trade, order to France, rations, orientations."}</span></li><li>${ico('women')}<span>${fr()?"<b>Peuplez.</b> Sans familles, les engagés repartent ; avec elles, la colonie grandit d'elle-même.":"<b>Settle.</b> Without families, indentured men go home; with them, the colony grows on its own."}</span></li><li>${ico('feather')}<span>${fr()?"<b>Ménagez vos alliés.</b> Sans les Innus, les Algonquins et les Wendats, ni fourrures ni sécurité.":"<b>Tend your allies.</b> Without the Innu, Algonquins and Wendat, there are no furs and no safety."}</span></li></ul>
    <div class="acts"><button class="cta" data-act="prologue">${u('take')}</button></div></div></div>`;
  } else if(S.outcome){
    const o=S.outcome;
    h=`<div class="letter out">${plate(o.img)}<div class="body"><div class="kick">${u('yourDecision')} · ${S.period>=2?'':SEASONS[lang][S.season]+' '}${S.year}</div><h2>${L(o.title)}</h2>
     <p class="chosen">« ${S4(L(o.label))} »</p><p class="story result">${S4(L(o.res))}</p>
     ${o.eff.length?`<div class="effects">${o.eff.map((f,i)=>`<span style="animation-delay:${i*90}ms">${chipHTML(f)}</span>`).join('')}</div>`:''}
     ${o.grp&&o.grp.length?`<div class="grpfx"><b>${fr()?'Gagnants et perdants':'Winners and losers'}</b> ${o.grp.slice().sort((a,b)=>b.v-a.v).map(g=>`<span class="${g.v>0?'up':'down'}">${L(g.n)} ${g.v>0?'▲':'▼'}</span>`).join(' ')}</div>`:''}
     ${(o.kind==='ref'||o.kind==='elec')?'':o.wasHist?`<aside class="hist ok">${ico('book')}<span><b>${fr()?'Comme dans l’histoire.':'As in history.'}</b> ${u('wasHist')}</span></aside>`:o.histLabel?`<aside class="hist fork">${ico('fleur')}<span><b>${fr()?'L’histoire bifurque ici.':'History forks here.'}</b> ${u('inHistory')}, ${fr()?'on a choisi':'the choice was'} « ${L(o.histLabel)} ». ${L(o.histRes)}</span></aside>`:o.kind&&o.kind!=='hist'&&o.kind!=='review'&&o.kind!=='elec'&&o.kind!=='ref'?`<aside class="hist hyp">${ico('feather')}<span><b>${L(KIND[o.kind])[0]}.</b> ${L(KIND[o.kind])[1]}</span></aside>`:''}
     <div class="acts"><button class="cta" data-act="continue" autofocus>${u('continue')}</button></div></div></div>`;
  } else if(S.pending.length&&!dispatchMin&&(holdForNews(),Date.now()<nextUntil)){
    const e=getEv(S.pending[0]);const pl=e&&PLACES[e.place];const where=pl&&pl.name?L(pl.name):'';
    h=`<div class="nextbar"><span class="nk">${fr()?'Affaire suivante':'Next matter'}${S.pending.length>1?` · ${S.pending.length}`:''}</span><b>${e?L(e.title):''}</b>${where?`<span class="nw">${where}</span>`:''}<button class="cta small" data-act="nextnow">${fr()?'Ouvrir':'Open'}</button><i class="nprog"></i></div>`;
    el.classList.add('peek');el.hidden=false;el.innerHTML=h;return;
  } else if(S.pending.length&&!dispatchMin){
    const id=S.pending[0],e=getEv(id);if(window._sndLast!==id){window._sndLast=id;sfx(BATTLES.has(id)?'cannon':'open');}const txt=typeof e.text==='function'?e.text(S):e.text;const chs=typeof e.choices==='function'?e.choices(S):e.choices;
    const pl=PLACES[e.place];const where=pl&&pl.name?L(pl.name):'';const ctx=CONTEXT[id];
    const k=evImg(id,e);
    h=`<div class="letter">${plate(k)}<div class="body"><div class="kick">${kindTag(e)} · ${S.period>=2?'':SEASONS[lang][S.season]+' '}${S.year}${where?' · '+where:''}${S.pending.length>1?` · 1/${S.pending.length}`:''}</div><h2>${L(e.title)}</h2>${kindNote(e)}
     <p class="story drop">${S4(L(txt))}</p>${e.because?`<aside class="because">${ico('fleur')}<span><b>${fr()?'Pourquoi maintenant':'Why now'} :</b> ${L(e.because(S))}</span></aside>`:''}${ctx?`<aside class="context"><b>${u('context')}</b> ${L(ctx)}</aside>`:''}
     <div class="choices">${chs.map((c,i)=>{const pv=previewChoice(e,i);return `<button class="choice" data-act="choose" data-id="${id}" data-i="${i}"><span class="cl">${S4(L(c.label))}${c.hist?`<em class="seal" title="${u('histChoice')}">${ico('fleur')}${u('histChoice')}</em>`:''}</span>${c.desc?`<small>${L(c.desc)}</small>`:''}<span class="chips">${(e.elec||e.vote?[]:pv.eff).map(chipHTML).join('')}${pv.uncertain?`<span class="chip unc">? ${u('uncertain')}</span>`:''}</span></button>`;}).join('')}</div>
     <div class="acts left"><button class="linkbtn" data-act="minimize">${u('seeMap')}</button></div></div></div>`;
  }
  el.classList.remove('peek');el.hidden=!h;el.innerHTML=h;
}
let lastTR=Date.now();
function renderHUDView(){const free=!!cam;$('v-cont').setAttribute('aria-pressed',!free&&view==='continent');$('v-val').setAttribute('aria-pressed',!free&&view==='valley');}
function renderToasts(){
  const now=Date.now();if(modalOpen())TOASTS.forEach(x=>x.t+=now-lastTR);lastTR=now; /* le temps de lecture ne court pas sous une fenêtre */TOASTS=TOASTS.filter(x=>now-x.t<8000);
  /* rendu par différence : un message déjà affiché n'est pas recréé, donc il ne clignote plus */
  const box=$('toasts');const keep=new Set(TOASTS.map(x=>x.id));
  for(const el of [...box.children]){if(!keep.has(el.dataset.tid)){el.classList.add('out');if(!el.dataset.gone){el.dataset.gone=1;setTimeout(()=>el.remove(),350);}}}
  for(const x of TOASTS){if(box.querySelector(`[data-tid="${x.id}"]`))continue;
    const d=document.createElement('div');d.className='toast '+x.kind;d.dataset.tid=x.id;if(x.onclick){d.dataset.act='toastgo';d.dataset.v=x.onclick;}
    d.innerHTML=`${x.img?`<img src="${imgSrc(x.img)}" alt="">`:String(x.kind).startsWith('world')?ico('globe','tw'):''}<span>${L(x.text)}</span>`;box.appendChild(d);}
}
setInterval(()=>{if(TOASTS.length)renderToasts();},1000);
/* ---------- title, help, ending ---------- */
const PERIODS=[
 {n:'I',d:'1608–1663',name:R('Les compagnies','The companies'),who:R("L'Onontio","The Onontio"),blurb:R("Survivre, s'allier, peupler. Une poignée d'hommes au bord du fleuve, et des alliés dont tout dépend.","Survive, ally, settle. A handful of men by the river, and allies on whom everything depends."),img:'defaite1609',open:true},
 {n:'II',d:'1663–1760',open:true,start:1663,img:'filles',name:R('Le régime royal','The royal regime'),who:R('La volonté politique, entre gouverneur, intendant et évêque','The political will, between governor, intendant and bishop'),blurb:R("Talon, les Filles du Roi, la Grande Paix, un empire du Saint-Laurent au Mississippi, puis la guerre.","Talon, the King's Daughters, the Great Peace, an empire from the St. Lawrence to the Mississippi, then war.")},
 {n:'III',d:'1760–1867',open:true,start:1760,img:'habitant_farm',name:R('La colonie britannique','The British colony'),who:R('Le clergé, les seigneurs, l\'Assemblée','Clergy, seigneurs, the Assembly'),blurb:R("Un peuple conquis qui négocie sa survivance : Acte de Québec, Parlement, Patriotes, Union.","A conquered people negotiating its survival: Quebec Act, Parliament, Patriotes, Union.")},
 {n:'IV',d:'1867–1960',open:true,start:1867,img:'p4_title',name:R('La Confédération','Confederation'),who:R('Un parti au pouvoir','A party in power'),blurb:R("Exode vers les filatures, Église toute-puissante, conscription, crise : la province dans le Dominion.","Exodus to the mills, an all-powerful Church, conscription, depression: the province in the Dominion.")},
 {n:'V',d:'1960–2000',open:true,start:1960,img:'p5_expo',name:R('Le Québec moderne','Modern Quebec'),who:R('Le gouvernement du Québec : libéral, unioniste ou péquiste','The Quebec government: Liberal, Union nationale or PQ'),blurb:R("Révolution tranquille, langue, Baie-James, référendums : un pays, un statut, ou une province ?","Quiet Revolution, language, James Bay, referendums: a country, a status, or a province?")}];
function renderTitle(){
  const el=$('title');if(!titleOpen){el.hidden=true;return;}el.hidden=false;
  const hasGame=S&&S.log&&S.log.length>1&&!S.ending;const F=fr();
  const mine=p=>hasGame&&((S.period||1)===({I:1,II:2,III:3,IV:4,V:5}[p.n]||0));
  const pacts=p=>{const res=mine(p)?`<button class="cta" data-act="resume">${u('resume')} <small>${S.period>=2?'':SEASONS[lang][S.season]+' '}${S.year}</small></button>`:'';
    if(p.n==='V'){const inh5=S&&S.period===4&&S.ending&&P5_INHERIT.includes(S.ending)?`<button class="cta" data-act="p5inherit">${F?'Continuer avec votre Québec de 1960':'Continue with your 1960 Quebec'}</button>`:'';return res+inh5+`<button class="${mine(p)||inh5?'ghost':'cta'}" data-act="p5new">${F?'Commencer en 1960 (historique)':'Start in 1960 (historical)'}</button>`;}
    if(p.n==='IV'){const inh4=S&&S.period===3&&S.ending&&P4_INHERIT.includes(S.ending)?`<button class="cta" data-act="p4inherit">${F?'Continuer avec votre province de 1867':'Continue with your 1867 province'}</button>`:'';return res+inh4+`<button class="${mine(p)||inh4?'ghost':'cta'}" data-act="p4new">${F?'Commencer en 1867 (historique)':'Start in 1867 (historical)'}</button>`;}
    if(p.n==='III'){const inh3=S&&S.period===2&&S.ending&&S.ending!=='abandon'?`<button class="cta" data-act="p3inherit">${F?'Continuer avec votre pays de 1760':'Continue with your 1760 country'}</button>`:'';return res+inh3+`<button class="${mine(p)||inh3?'ghost':'cta'}" data-act="p3new">${F?'Commencer en 1760 (historique)':'Start in 1760 (historical)'}</button>`;}
    if(p.n==='I')return res+`<button class="${mine(p)?'ghost':'cta'}" data-act="new">${F?'Commencer en 1608':'Start in 1608'}</button>`;
    const inh=S&&S.ending==='royal'?`<button class="cta" data-act="p2inherit">${F?'Continuer avec votre colonie de 1663':'Continue with your 1663 colony'}</button>`:'';
    return res+inh+`<button class="${mine(p)||inh?'ghost':'cta'}" data-act="p2new">${F?'Commencer en 1663 (historique)':'Start in 1663 (historical)'}</button>`;};
  const card=(p)=>`<article data-era="${['I','II','III','IV','V'].indexOf(p.n)+1}" class="pcard${p.open?' open':' locked'}" ${p.open?'':'aria-disabled="true"'}>
     ${p.img?`<div class="pimg" style="background-image:url('${imgSrc(p.img)}')"></div>`:`<div class="pimg blank"><span>${p.n}</span></div>`}
     <div class="pbody"><div class="pnum">${F?'Période':'Period'} ${p.n} · ${p.d}</div><h3>${L(p.name)}</h3><div class="pwho">${F?'Vous êtes':'You are'} : ${L(p.who)}</div><p>${L(p.blurb)}</p>
     ${p.open?`<div class="pacts">${pacts(p)}</div>`:`<div class="soon">${F?'En construction':'In the works'}</div>`}</div></article>`;
  el.innerHTML=`<div class="tbg" style="background-image:url('${imgSrc('carte1632')}')"></div><div class="tcard wide">
   <div class="tk">${F?"Et si l'histoire avait tourné autrement ?":'What if history had turned out differently?'}</div><h1>Kebec</h1>
   <p class="tsub">${F?"Quatre siècles de l'histoire des Canadiens français, de 1608 à 2000. Le monde suit son cours ; vous décidez comment ce peuple y répond, et ce qu'il devient.":'Four centuries of French-Canadian history, from 1608 to 2000. The world follows its course; you decide how this people responds, and what it becomes.'}</p>
   <div class="periods">${PERIODS.map(card).join('')}</div>
   <div class="fullrun"><b>${F?'Partie complète, 1608–2000':'Full game, 1608–2000'}</b> · ${F?"les périodes s'enchaîneront, chacune héritant de l'état laissé par la précédente. On pourra aussi commencer n'importe quelle période dans son état historique réel.":'periods will follow one another, each inheriting the state left by the last. You will also be able to start any period in its real historical state.'}</div>
   <div class="tfoot"><button class="ghost big" data-act="help">${u('howto')}</button><div class="seg small" role="group"><button data-act="lang" data-v="fr" aria-pressed="${lang==='fr'}">Français</button><button data-act="lang" data-v="en" aria-pressed="${lang==='en'}">English</button></div></div>
   <p class="tcred">${F?'Illustrations : Wikimedia Commons, domaine public.':'Illustrations: Wikimedia Commons, public domain.'} <button class="linkbtn" data-act="credits">${u('credits')}</button></p></div>`;
}
function renderHelp(){
  const el=$('help');if(!helpOpen){el.hidden=true;return;}el.hidden=false;
  el.innerHTML=`<div class="letter help"><div class="body">${INTRO[lang]}<p><button class="ghost" data-act="credits">${fr()?'Crédits et sources':'Credits and sources'}</button></p><div class="acts"><button class="cta" data-act="closehelp">${u('close')}</button></div></div></div>`;
}
const INTRO={
fr:`<h2>Comment jouer</h2>
<p><b>Kebec</b> raconte l'histoire des Canadiens français de 1608 à 2000, en cinq périodes. Le monde suit son cours historique ; vous décidez comment ce peuple y répond. Faire tous les choix historiques mène à peu près à l'histoire réelle ; s'en écarter la fait bifurquer. Les quatre premières périodes sont jouables pour l'instant.</p>
<p>En période I, vous êtes l'<i>Onontio</i> : la charge de gouverneur de la Nouvelle-France, de 1608 à 1663. Votre but : remettre au roi la colonie la plus solide possible. Votre trajectoire est comparée à l'histoire réelle (environ 3 000 habitants en 1663).</p>
<ul><li><b>Le temps</b> passe saison par saison (▶, trois vitesses, barre d'espace pour suspendre). Il s'arrête tout seul quand une décision vous attend ou qu'une alerte survient.</li>
<li><b>Les dépêches</b> racontent l'événement. Sous chaque choix, les effets probables ; après votre décision, ce qui a changé, et ce qui s'est réellement passé.</li>
<li><b>Les ordres permanents</b> (onglet Ordres) s'appliquent jusqu'à ce que vous les changiez : budget, traite d'été, commande à la France, rations d'hiver, orientations.</li>
<li><b>La population</b> dépend des familles : les engagés célibataires repartent, les familles restent, les filles deviennent mères quinze ans plus tard.</li>
<li><b>Les alliances</b> se nourrissent de présents, de loyauté et de guerres partagées. La tension haudenosaunee commande les raids.</li>
<li><b>Les Relations</b> (onglet Registre) racontent chaque année. <b>Ce que vos choix préparent</b> (onglet Colonie) garde la trace de vos grandes décisions.</li></ul>
<p>On peut perdre : la colonie peut être abandonnée, ou les rois d'Europe peuvent décider de ne pas vous rendre Québec.</p>
<h3>Période II · 1663–1760</h3><p>Le Roi reprend la colonie. Vous restez la volonté politique, mais elle passe par trois officiers : le <b>gouverneur</b> (guerre, nations), l'<b>intendant</b> (peuplement, finances) et l'<b>évêque</b> (Église, écoles). Chacun juge votre budget et vos orientations ; content, il applique vos ordres à plein, fâché, il les freine. Un tour dure un an jusqu'en 1713, puis deux ans en temps de paix. Les guerres d'empires viennent d'Europe quoi que vous fassiez ; la Conquête de 1760 est très probable, mais une colonie très forte peut la repousser. Les <b>traits du peuple</b> (ferveur, alliance, aventure, attachement au Roi, entraide, ouverture) évoluent avec vos choix et pèseront sur la suite.</p><h3>Période III · 1760–1867</h3><p>Sous la Couronne britannique, vous parlez au nom des Canadiens : le clergé et les seigneurs, puis l'Assemblée, les Patriotes, les Réformistes. Le gouverneur, l'évêque et « l'autre camp » jugent vos choix. Un tour dure une législature, un an dans les crises. La gazette résume chaque tour.</p>
<h3>Période IV · 1867–1960</h3><p>Vous êtes le gouvernement de la province, quel que soit le parti au pouvoir. Vous répartissez les deniers publics (colonisation, éducation, santé, routes, industrie) et fixez cinq orientations : face à Ottawa, l'Église et l'État, l'économie, le travail, les minorités françaises. Ottawa, l'Église et le grand capital réagissent. À chaque élection, le peuple juge la législature : une forte majorité donne les mains libres, une faible les lie. Surveillez l'exode vers la Nouvelle-Angleterre, la propriété étrangère de l'industrie, l'instruction et la vitalité des minorités.</p>`,
en:`<h2>How to play</h2>
<p><b>Kebec</b> tells the history of French Canadians from 1608 to 2000, in five periods. The world follows its historical course; you decide how this people responds. Making every historical choice leads roughly to real history; departing from it makes history fork. The first four periods are playable for now.</p>
<p>In Period I you are <i>Onontio</i>: the office of governor of New France, from 1608 to 1663. Your goal: hand the King the strongest colony you can. Your trajectory is compared with real history (about 3,000 settlers in 1663).</p>
<ul><li><b>Time</b> passes season by season (▶, three speeds, space bar to pause). It stops on its own when a decision awaits or an alert comes up.</li>
<li><b>Dispatches</b> tell the event. Under each choice, the likely effects; after your decision, what changed, and what really happened.</li>
<li><b>Standing orders</b> (Orders tab) apply until you change them: budget, summer trade, order to France, winter rations, orientations.</li>
<li><b>Population</b> depends on families: single indentured men go home, families stay, daughters become mothers fifteen years later.</li>
<li><b>Alliances</b> are fed by gifts, loyalty and shared wars. Haudenosaunee tension drives the raids.</li>
<li><b>The Relations</b> (Register tab) tell each year. <b>What your choices set up</b> (Colony tab) keeps track of your major decisions.</li></ul>
<p>You can lose: the colony can be abandoned, or the kings of Europe may decide not to give Québec back.</p>
<h3>Period II · 1663–1760</h3><p>The King takes over the colony. You remain the political will, but it works through three officers: the <b>governor</b> (war, the nations), the <b>intendant</b> (settlement, finances) and the <b>bishop</b> (Church, schools). Each judges your budget and orientations; pleased, he carries out your orders in full, angry, he drags his feet. A turn lasts one year until 1713, then two years in peacetime. Imperial wars come from Europe whatever you do; the 1760 Conquest is very likely, but a very strong colony can hold it off. The <b>people's traits</b> (fervour, alliance, adventure, loyalty to the King, mutual aid, openness) change with your choices and will weigh on what follows.</p><h3>Period III · 1760–1867</h3><p>Under the British Crown, you speak for the Canadiens: clergy and seigneurs, then the Assembly, the Patriotes, the Reformers. The governor, the bishop and 'the other side' judge your choices. A turn lasts a legislature, one year in crises. The gazette sums up each turn.</p>
<h3>Period IV · 1867–1960</h3><p>You are the provincial government, whichever party is in power. You share out public money (settlement, education, health, roads, industry) and set five orientations: towards Ottawa, Church and State, the economy, labour, the French minorities. Ottawa, the Church and big capital react. At each election, the people judge the legislature: a strong majority frees your hands, a weak one ties them. Watch the exodus to New England, foreign ownership of industry, schooling and the vitality of the minorities.</p>`};
function futuresList(){
  const F=[];const ff=(c,a,b)=>{if(c)F.push(fr()?a:b);};
  ff(S.flags.hbcEnglish,"Radisson et Des Groseilliers sont passés aux Anglais : la baie d'Hudson sera anglaise, et prendra la Nouvelle-France à revers.","Radisson and Des Groseilliers went over to the English: Hudson Bay will be English, and will outflank New France.");
  ff(S.flags.northFrench,"Radisson et Des Groseilliers travaillent pour vous : la baie d'Hudson peut devenir française.","Radisson and Des Groseilliers work for you: Hudson Bay can become French.");
  ff((S.flags.west||0)>=1,"Les Pays d'en haut sont ouverts plus tôt : la France peut viser les Grands Lacs, puis le Mississippi.","The upper country opened early: France can aim for the Great Lakes, then the Mississippi.");
  ff(S.flags.huroniaHeld,"La Huronie a survécu : une confédération wendate alliée tient le cœur des Grands Lacs.","Huronia survived: an allied Wendat confederacy holds the heart of the Great Lakes.");
  ff(S.flags.gannKept,"Une colonie française vit chez les Onontagués : une alliance avec les Haudenosaunee devient possible.","A French colony lives among the Onondaga: an alliance with the Haudenosaunee becomes possible.");
  ff(S.flags.huguenots,"Des huguenots vivent dans la colonie : la révocation de l'édit de Nantes, en 1685, la déchirera ou la renforcera.","Huguenots live in the colony: the revocation of the Edict of Nantes in 1685 will tear it apart or strengthen it.");
  ff(S.flags.syndics||S.autonomy>=40,"Les habitants ont pris l'habitude de se faire entendre : l'absolutisme royal aura du mal à s'imposer.","The habitants are used to being heard: royal absolutism will struggle to take hold.");
  ff(S.flags.lavalWins||S.church>=70,"L'Église domine la colonie : écoles, hôpitaux, paroisses… et une forte influence sur l'État.","The Church dominates the colony: schools, hospitals, parishes… and a strong hold on the State.");
  ff(S.flags.stateWins,"Le gouverneur a tenu tête à l'évêque : l'État royal part avec l'avantage.","The governor stood up to the bishop: the royal State starts with the upper hand.");
  ff(arc(S,'brandy').path==='allow',"L'eau-de-vie est devenue une monnaie de traite : les alliances en souffriront.","Brandy has become trade currency: the alliances will suffer for it.");
  ff(S.women>=S.pop*.25,"La colonie est faite de familles : elle grandira d'elle-même, même sans immigration.","The colony is made of families: it will grow on its own, even without immigration.");
  ff(S.flags.boucher,"Pierre Boucher a convaincu Louis XIV : le régiment de Carignan-Salières arrivera en 1665.","Pierre Boucher convinced Louis XIV: the Carignan-Salières regiment will arrive in 1665.");
  return F;
}
function renderEnding(){
  const el=$('ending');if(!S.ending||titleOpen){el.hidden=true;window._sndEnd=null;return;}el.hidden=false;if(window._sndEnd!==S.ending+S.year){window._sndEnd=S.ending+S.year;sfx('end');}
  if(S.period===5){el.innerHTML=ending5HTML();return;}
  if(S.period===4){el.innerHTML=ending4HTML();return;}
  if(S.period===3){el.innerHTML=ending3HTML();return;}
  if(S.period===2){el.innerHTML=ending2HTML();return;}
  let img='filles',title,lead,body='';
  if(S.ending==='abandon'){img='winter';title=fr()?'La colonie est abandonnée':'The colony is abandoned';lead=fr()?`En ${S.year}, les derniers survivants rembarquent. Comme Charlesbourg-Royal avant elle, la colonie du Saint-Laurent n'est plus qu'un nom sur une carte.`:`In ${S.year}, the last survivors re-embark. Like Charlesbourg-Royal before it, the St. Lawrence colony is now just a name on a map.`;}
  else if(S.ending==='english'){img='kirke';title=fr()?'Une Nouvelle-Écosse sur le Saint-Laurent':'A Nova Scotia on the St. Lawrence';lead=fr()?"La France a échangé Québec contre des avantages en Europe. Le fleuve devient anglais un siècle et demi avant la Conquête. Les Hébert et quelques autres restent : les premiers « Canadiens » d'une histoire qui n'aura pas lieu.":"France traded Québec away for advantages in Europe. The river becomes English a century and a half before the Conquest. The Héberts and a few others stay: the first 'Canadiens' of a history that will not happen.";}
  else{const ratio=S.pop/3000;title=fr()?'1663 : la colonie royale':'1663: the royal colony';
    lead=ratio>=1.3?(fr()?"Louis XIV hérite d'une colonie plus forte qu'en réalité. La Nouvelle-Angleterre a un voisin à prendre au sérieux.":"Louis XIV inherits a stronger colony than in reality. New England has a neighbour to take seriously."):ratio>=.8?(fr()?"Une colonie proche de celle de l'histoire : fragile, pieuse, accrochée au fleuve.":"A colony close to the historical one: fragile, devout, clinging to the river."):(fr()?"Une colonie plus faible que dans l'histoire. Le roi devra tout reprendre de zéro.":"A weaker colony than in history. The King will have to start almost from scratch.");
    body+=`<div class="endstats"><div><b>${fmt(S.pop)}</b><small>${fr()?'habitants (histoire ≈ 3 000)':'settlers (history ≈ 3,000)'}</small></div><div><b>${fmt(S.women)}</b><small>${u('women')}</small></div><div><b>${S.wenFallen?(fr()?'Tombée':'Fallen'):(fr()?'Debout':'Standing')}</b><small>${fr()?'la Huronie':'Huronia'}</small></div><div><b>${S.places.villeMarie?(fr()?'Tient':'Holds'):(fr()?'—':'—')}</b><small>Ville-Marie</small></div></div>`;
    body+=societySummary(S);const DV=S.divergences||[];if(DV.length)body+=`<h3>${fr()?'Là où l\'histoire a bifurqué':'Where history forked'}</h3><ul class="futures">${DV.map(d=>`<li><b>${d.y}</b> · ${L(d.text)}</li>`).join('')}</ul>`;
    const F=futuresList();if(F.length)body+=`<h3>${u('seeds')}</h3><ul class="futures">${F.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    body+=`<p class="quiet">${fr()?"La suite serait l'ère royale : Talon, les Filles du Roi, le régiment de Carignan-Salières… et chacun de ces chiffres pèserait sur ce qui vient.":"Next would come the royal era: Talon, the King's Daughters, the Carignan-Salières regiment… and each of these numbers would weigh on what follows."}</p>`;}
  el.innerHTML=`<div class="letter end">${plate(img)}<div class="body"><div class="kick">${fr()?'Fin de la partie':'End of the game'} · ${S.year}</div><h2>${title}</h2><p class="story drop">${lead}</p>${body}<div class="acts">${S.ending==='royal'?`<button class="cta" data-act="p2inherit">${fr()?'Continuer en période II avec cette colonie':'Continue into Period II with this colony'}</button><button class="ghost" data-act="new">${u('restart')}</button>`:`<button class="cta" data-act="new">${u('restart')}</button>`}</div></div></div>`;
}
function render(){
  document.documentElement.lang=lang;document.documentElement.dataset.era=String(S&&S.period||1);setEnvFor(S);
  renderHUD();renderTabs();drawMap();renderDispatch();renderToasts();renderTitle();renderHelp();renderCredits();renderEnding();renderRelation();if(typeof renderInset==='function')renderInset();
}
function renderRelation(){
  const el=$('relation');if(relOpen===null||titleOpen||!S.chron||!S.chron[relOpen]){el.hidden=true;return;}el.hidden=false;
  const c=S.chron[relOpen],F=fr(),prev=S.chron[relOpen+1];if(window._sndRel!==relOpen+'|'+c.y){window._sndRel=relOpen+'|'+c.y;sfx('page');}
  if(c.p5){el.innerHTML=news5HTML(c);return;}
  if(c.p3){el.innerHTML=gazetteHTML(c);return;}
  const dlt=(a,b)=>b==null?'':`<i class="${a-b>=0?'up':'down'}">${a-b>=0?'+':'−'}${fmt(Math.abs(a-b))}</i>`;
  const row=(lab,v,extra)=>`<tr><th>${lab}</th><td>${fmt(v||0)}</td><td>${extra||''}</td></tr>`;
  const gap=c.pop-(c.hist||0);
  const img=c.img&&IMG[c.img]?c.img:'relations';
  el.innerHTML=`<div class="book" role="dialog" aria-label="Relation ${c.y}">
   <div class="page left">
    <div class="frontis"><div class="fr1">${F?'Relation':'Relation'}</div><div class="fr2">${F?"de ce qui s'est passé":'of what took place'}</div><div class="fr2">${F?'en la Nouvelle-France':'in New France'}</div><div class="fr3">${F?"en l'année":'in the year'}</div><div class="fry">${c.y}</div>
     <div class="fr4">${F?`Sous le gouvernement de ${c.gov||''}`:`Under the governorship of ${c.gov||''}`}</div><div class="orn">✦ ❧ ✦</div></div>
    <figure><img src="${imgSrc(img)}" alt=""><figcaption>${L(IMG[img].c)}</figcaption></figure>
   </div>
   <div class="page right">
    <p class="story drop">${L(c)}</p>
    <table class="ledger"><caption>${F?'État de la colonie':'State of the colony'}</caption>
     ${row(F?'Âmes françaises':'French souls',c.pop,dlt(c.pop,prev&&prev.pop)+`<small>${F?'histoire ≈ ':'history ≈ '}${fmt(c.hist||0)} (${gap>=0?'+':'−'}${fmt(Math.abs(gap))})</small>`)}
     ${row(F?'dont femmes':'of whom women',c.women,dlt(c.women||0,prev&&prev.women))}
     ${row(F?'Arrivés de France':'Arrived from France',c.arr)}
     ${row(F?'Baptêmes':'Baptisms',c.births)}
     ${row(F?'Sépultures':'Burials',c.deaths)}
     ${row(F?'Retournés en France':'Returned to France',c.dep)}
     ${row(F?'Paquets de castor':'Packs of beaver',c.furs,dlt(c.furs,prev&&prev.furs))}
     ${row(F?'Raids subis':'Raids suffered',c.raids)}
    </table>
    ${c.world&&c.world.length?`<div class="facts world"><h4>${F?'Nouvelles du monde':'News of the world'}</h4><ul>${c.world.map(i=>WORLD[i]?`<li><b>${L(WORLD[i].t)}</b> — ${L(WORLD[i].x)}</li>`:'').join('')}</ul></div>`:''}
    ${c.dec&&c.dec.length?`<div class="facts"><h4>${F?'Faits mémorables':'Memorable events'}</h4><ul>${c.dec.map(d=>`<li>${L(d)}</li>`).join('')}</ul></div>`:''}
    <div class="booknav"><button class="ghost" data-act="relnav" data-v="1" ${relOpen>=S.chron.length-1?'disabled':''}>‹ ${prev?prev.y:''}</button><button class="ghost" data-act="relnav" data-v="-1" ${relOpen<=0?'disabled':''}>${relOpen>0?S.chron[relOpen-1].y:''} ›</button><span class="sp"></span><button class="cta" data-act="closerel">${F?'Poursuivre':'Continue'}</button></div>
    <label class="chk"><input type="checkbox" data-act="readrel" ${readRel?'checked':''}> ${F?'Ouvrir chaque Relation au printemps':'Open each Relation in spring'}</label>
   </div></div>`;
}
