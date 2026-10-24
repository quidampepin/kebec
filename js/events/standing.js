/* Onontio — Décisions saisonnières (héritées de la v2) et utilitaires. */
/* ---- routine: one standing decision per season ---- */
const ROUTINE={
 0:s=>({id:'R:0',routine:true,place:'quebec',title:R("Le budget de l'année","The year's budget"),
   text:{fr:`${s.lastArrivals?`Les navires ont débarqué ${s.lastArrivals} personnes. `:''}Le trésor compte ${nf(s.treasury,'fr')} livres. Répartissez-le dans le budget (plus bas), puis approuvez.`,
         en:`${s.lastArrivals?`The ships landed ${s.lastArrivals} people. `:''}The treasury holds ${nf(s.treasury,'en')} livres. Split it in the budget (below), then approve.`},
   choices:[{label:R("Approuver le budget","Approve the budget"),fx:s=>{const sum=ENV.reduce((a,k)=>a+s.budget[k],0);return {fr:`Budget approuvé : ${sum} % engagé, ${100-sum} % en réserve.`,en:`Budget approved: ${sum}% committed, ${100-sum}% in reserve.`};}}]}),
 1:s=>{const est=Math.round(expectedFurs(s));return {id:'R:1',routine:true,place:'troisRivieres',title:R("La traite d'été","The summer trade"),
   text:{fr:`Les flottilles s'annoncent : environ ${est} paquets attendus.${s.haud>55?' Des partis de guerre rôdent sur la route.':''}`,en:`The canoe fleets are on their way: about ${est} packs expected.${s.haud>55?' War parties are prowling the route.':''}`},
   choices:[
    {key:'wait',label:R("Les attendre à Québec","Wait for them at Québec"),desc:R("sûr, mais moins de fourrures","safe, but fewer furs"),fx:s=>{s.routine.trade='wait';return R("On attend au quai.","We wait at the wharf.");}},
    {key:'upriver',label:R("Monter à leur rencontre","Go upriver to meet them"),desc:R("plus de fourrures, risque d'embuscade","more furs, risk of ambush"),fx:s=>{s.routine.trade='upriver';return R("Les barques remontent le fleuve.","The boats head upriver.");}},
    ...(s.pop>15?[{key:'truch',label:R("Envoyer des jeunes hiverner chez les alliés","Send young men to winter with the allies"),desc:R("3 hommes de moins, liens plus forts, plus de fourrures l'an prochain","3 fewer men, stronger ties, more furs next year"),fx:s=>{s.routine.trade='truch';s.pop-=3;s.rAlg+=3;if(!s.wenFallen)s.rWen+=3;s.truchYear=s.year;return R("Comme Étienne Brûlé, ils apprendront les langues et les routes.","Like Étienne Brûlé, they'll learn the languages and the routes.");}}]:[])
   ]};},
 2:s=>({id:'R:2',routine:true,place:'gulf',title:R("Ce qu'on demande à la France","What to ask of France"),
   text:R("Les navires repartent avec les fourrures. Que demander pour le printemps prochain ?","The ships leave with the furs. What do we ask for next spring?"),
   choices:[
    {key:'colons',label:R("Des colons et des engagés","Settlers and indentured men"),desc:R("plus d'arrivants","more newcomers"),fx:s=>{s.routine.cargo='colons';return R("Des recruteurs parcourront le Perche et la Normandie.","Recruiters will tour the Perche and Normandy.");}},
    {key:'soldats',label:R("Des soldats","Soldiers"),desc:R("défense +8, moins de colons","defence +8, fewer settlers"),fx:s=>{s.routine.cargo='soldats';return R("On réclame une compagnie de soldats.","A company of soldiers is requested.");}},
    {key:'vivres',label:R("Des vivres et des outils","Food and tools"),desc:R("plus de vivres et de défrichement","more food and clearing"),fx:s=>{s.routine.cargo='vivres';return R("Farine, lard, haches et charrues.","Flour, pork, axes and ploughs.");}},
    {key:'traite',label:R("Des marchandises de traite","Trade goods"),desc:R("+20 % de fourrures l'été prochain","+20% furs next summer"),fx:s=>{s.routine.cargo='traite';return R("Chaudrons, couvertures, perles de verre.","Kettles, blankets, glass beads.");}}
   ]}),
 3:s=>{const sea=s.pop?s.food/(s.pop*.25):9;return {id:'R:3',routine:true,place:'quebec',title:R("Les rations d'hiver","Winter rations"),
   text:{fr:`Réserves : ${nf(s.food,'fr')} mesures pour ${s.pop} personnes, environ ${sea.toFixed(1)} saisons.`,en:`Stores: ${nf(s.food,'en')} measures for ${s.pop} people, about ${sea.toFixed(1)} seasons.`},
   choices:[
    {key:'normal',label:R("Rations normales","Normal rations"),fx:s=>{s.routine.ration='normal';return R("Chacun mange à sa faim, ou presque.","Everyone eats their fill, almost.");}},
    {key:'strict',label:R("Rationner sévèrement","Strict rationing"),desc:R("30 % de vivres en moins consommés, plus de scorbut","30% less food used, more scurvy"),fx:s=>{s.routine.ration='strict';return R("Pois secs et biscuit.","Dried peas and biscuit.");}},
    ...(sea>5?[{key:'share',label:R("Partager avec les alliés affamés","Share with hungry allies"),desc:R("vivres en moins, alliés reconnaissants","less food, grateful allies"),fx:s=>{s.routine.ration='share';s.food-=s.pop*.3;s.rAlg+=5;if(!s.wenFallen)s.rWen+=2;return R("Des familles innues passent l'hiver près de l'Habitation.","Innu families winter near the Habitation.");}}]:[])
   ]};}
};
function expectedFurs(s){let f=(s.rAlg*.25+(s.wenFallen?0:s.rWen*.45*s.wenStr/100))*.65;f*={traite:1.4,equilibre:1,colonie:.8}[s.orient.eco];f*=1+(s.alloc.traite||0)/1500;if(s.places.troisRivieres)f*=1.1;if(s.places.villeMarie)f*=1.1;f*=1-s.haud/250;return f*s.mods.fur;}
function getEv(id){if(id==='R:rev')return reviewEvent(S);if(id==='E:elec')return electionEvent(S);if(id==='E:elec5')return electionEvent5(S);if(id==='E:elec3')return electionEvent3(S);if(id.startsWith('P:'))return polEvent(S,id);if(id.startsWith('D:'))return bifEvent(S,id);if(id==='V:ref')return refEvent5(S);if(id==='V:nego')return negoEvent5(S);if(id.startsWith('R:'))return ROUTINE[+id.slice(2)](S);const e=EV[id];if(e&&typeof e.title==='function')return Object.assign({},e,{title:e.title(S)});return e;}

