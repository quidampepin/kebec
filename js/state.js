/* Kebec — État initial d'une partie, et moteur de relations (une échelle allié-ennemi par nation). */
/* ---------------- state ---------------- */
const ENV=['etab','def','pres','traite','miss'];
function newState(){return attachRel({
 year:1608,season:1,pop:28,food:45,treasury:1000,furs:0,defense:10,compagnie:50,wenStr:100,rel:{innu:45,alg:40,wen:10,agnier:-10,onon:0,abenaki:0},str:{innu:55,alg:60,agnier:60,onon:80,abenaki:40},relMem:{},missions:0,church:10,cleared:0,autonomy:0,
 families:false,annedda:false,hospital:false,scurvyMod:1,firstWinter:true,birthAcc:0,recruitMod:1,pendingSettlers:0,
 orient:{eco:'traite',all:'mediation',mis:'discretes'},
 budget:{etab:20,def:20,pres:25,traite:25,miss:0},alloc:{etab:300,def:300,pres:400,traite:500,miss:0},
 places:{quebec:true,tadoussac:true},flags:{},fired:{},pending:[],dispatches:[],log:[],raided:{},
 popHist:[[1608.25,28]],prev:null,routine:{trade:'wait',cargo:'engages',ration:'normal'},mods:{fur:1,harvest:1,scurvy:1},sysLast:{},sysCount:{},arcs:{},haudTalk:0,lastArrivals:0,cargo:'engages',truchYear:0,birthBoost:0,women:0,girls:[],pendingWomen:0,ys:{y:1608,start:28,arr:28,births:0,dep:0,furs:0,harvest:0,ev:0},shipAt:0,ending:null,govName:'Samuel de Champlain'});}
let S;


