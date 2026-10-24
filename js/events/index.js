/* Onontio — Index des événements et fonctions d'aide. */
const EV=Object.fromEntries(EVENTS.map(e=>[e.id,e]));
function kirkeStrength(s){return s.defense+(s.food>=s.pop*.5?15:0)+(s.flags.huguenots?0:0);}
function occupy(s,keep){s.women=Math.min(s.women,3);s.flags.occupied=true;s.flags.blockade=true;s.pop=Math.max(5,Math.round(s.pop*keep));s.treasury=0;s.furs=0;}
function huroniaFalls(s){return (s.wenStr+(s.rWen-50)/8+(s.orient.all==='armee'?5:0))<75;}
function fallHuronia(s){s.wenFallen=true;s.wenStr=10;s.haud+=10;s.places.huronia=false;}


/* ---- Historical likelihood: external currents always happen (no entry = 1);
   local events depend on the situation. When one doesn't happen, history forks and the game says so. ---- */
const hostP=v=>clamp((30-v)/70,.03,1);
const LIKELY={
 alliance1609:s=>s.rAlg>=60?1:.4, onondaga1615:s=>s.rel.wen>=0?1:.3, pieskaret1643:s=>s.rel.alg>=0?1:.2,
 jogues1642:s=>hostP(s.rel.agnier), dauversiere1644:s=>hostP(s.rel.agnier), jogues1646:s=>s.rel.agnier>=55?.35:.92,
 teanaostaie1648:s=>.3+.7*Math.max(hostP(s.rel.agnier),hostP(s.rel.onon)), huronia1649:s=>.25+.75*Math.max(hostP(s.rel.agnier),hostP(s.rel.onon)),
 kerbodot1652:s=>hostP(s.rel.agnier), peaceEnd1655:s=>s.rel.agnier>=55?.3:.9, orleans1656:s=>s.rel.agnier>=40?.25:.9,
 gann1656:s=>s.rel.onon>-80?.9:.3, druillettes1650:s=>s.haud>=50?.95:.4, sault1660:s=>Math.max(hostP(s.rel.agnier),hostP(s.rel.onon))};
const DIVERGE={
 alliance1609:R("Dans l'histoire, les alliés entraînent Champlain contre les Agniers dès 1609. Ici, ils ne vous font pas assez confiance pour vous le demander.","In history, the allies drew Champlain into war against the Mohawk in 1609. Here, they don't trust you enough to ask."),
 onondaga1615:R("Dans l'histoire, les Wendats entraînent Champlain contre un village onontagué en 1615. Ici, ils partent sans vous.","In history, the Wendat drew Champlain into an attack on an Onondaga village in 1615. Here, they go without you."),
 jogues1642:R("Dans l'histoire, Isaac Jogues est capturé par les Agniers en 1642. Ici, vos relations avec les Agniers lui ont épargné ce sort.","In history, Isaac Jogues was captured by the Mohawk in 1642. Here, your relations with the Mohawk spared him."),
 dauversiere1644:R("Dans l'histoire, deux cents Agniers attaquent Ville-Marie en 1644. Ici, l'attaque n'a pas lieu.","In history, two hundred Mohawk attacked Ville-Marie in 1644. Here, the attack never comes."),
 jogues1646:R("Dans l'histoire, la paix de 1645 se brise dès 1646 avec la mort de Jogues. Ici, elle tient.","In history, the 1645 peace broke in 1646 with Jogues's death. Here, it holds."),
 teanaostaie1648:R("Dans l'histoire, Teanaostaiaé est détruit en 1648. Ici, la Huronie n'est pas attaquée cette année-là.","In history, Teanaostaiaé was destroyed in 1648. Here, Huronia is not attacked that year."),
 huronia1649:R("Dans l'histoire, la Huronie tombe en 1649 et les Wendats se dispersent. Ici, l'assaut n'a pas lieu : la Huronie reste debout.","In history, Huronia fell in 1649 and the Wendat scattered. Here, the assault never comes: Huronia still stands."),
 kerbodot1652:R("Dans l'histoire, le gouverneur des Trois-Rivières tombe dans une embuscade agnière en 1652. Ici, il n'y a pas d'embuscade.","In history, the governor of Trois-Rivières fell into a Mohawk ambush in 1652. Here, there is no ambush."),
 peaceEnd1655:R("Dans l'histoire, les Agniers reprennent les raids en 1655. Ici, la paix tient.","In history, the Mohawk resumed raiding in 1655. Here, the peace holds."),
 orleans1656:R("Dans l'histoire, les Agniers massacrent les Wendats réfugiés à l'île d'Orléans en 1656. Ici, cela n'arrive pas.","In history, the Mohawk massacred the Wendat refugees on the Île d'Orléans in 1656. Here, it doesn't happen."),
 gann1656:R("Dans l'histoire, les Onontagués invitent les Français chez eux en 1656. Ici, la guerre est trop profonde pour une invitation.","In history, the Onondaga invited the French into their country in 1656. Here, the war runs too deep for an invitation."),
 sault1660:R("Dans l'histoire, Dollard des Ormeaux meurt au Long-Sault en 1660. Ici, il n'y a pas de grande armée haudenosaunee à arrêter.","In history, Dollard des Ormeaux died at the Long Sault in 1660. Here, there is no great Haudenosaunee army to stop."),
 pieskaret1643:R("Dans l'histoire, Pieskaret mène ses grandes expéditions avec des armes françaises. Ici, les Algonquins ne viennent pas vous en demander.","In history, Pieskaret led his great raids with French arms. Here, the Algonquins don't come to ask you for them.")};
function diverge(s,e,p){
  const txt=DIVERGE[e.id]||{fr:`Dans l'histoire, « ${e.title.fr} » a eu lieu à ce moment. Ici, les circonstances ont changé : cela n'arrive pas.`,en:`In history, “${e.title.en}” happened at this point. Here, circumstances have changed: it does not happen.`};
  if(e.id==='huronia1649'){s.flags.huroniaHeld=true;s.wenStr=Math.min(100,s.wenStr+5);}
  if(e.id==='jogues1646'||e.id==='peaceEnd1655')s.flags.peace=true;
  const tt=typeof e.title==='function'?e.title(s):e.title;
  /* ce qui, dans cette partie, a rendu l'événement improbable */
  let why=[];try{if(window.WHY_NOT&&WHY_NOT[e.id])why=WHY_NOT[e.id](s)||[];}catch(err){why=[];}
  s.divergences=s.divergences||[];s.divergences.push({y:s.year,id:e.id,title:tt,text:txt,p:Math.round(p*100),why});
  s.yearOut=s.yearOut||[];s.yearOut.push({t:tt,r:txt});
  logIt(s,txt,'good');
  /* un grand encadré plutôt qu'une simple notification */
  if(s===S&&!window.CALIB){s.bifs=s.bifs||{};s.bifs[e.id]={id:e.id,title:tt,text:txt,why,p:Math.round(p*100)};s.pending.push('D:'+e.id);}
}
