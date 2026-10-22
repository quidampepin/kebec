/* Kebec — Sons. Tout est synthétisé (Web Audio) : aucun fichier, aucun téléchargement.
   Effets : plume, parchemin, cloche, tambour, petites mélodies d'issue.
   Ambiance : vent selon la saison, oiseaux l'été, et une musique très douce dont le timbre change d'une époque à l'autre
   (luth, puis clavecin, puis piano). Bouton haut-parleur : tout · effets seuls · muet. */
const SND={ctx:null,master:null,fxBus:null,ambBus:null,mode:'all',vol:.7,started:false,noise:null,wind:null,windGain:null,windFilt:null,nextNote:0,nextBird:0,lastFx:0};
try{SND.mode=localStorage.getItem('kebec-sound')||'all';}catch(e){}
function sndInit(){
  if(SND.ctx)return SND.ctx;
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;
  const c=new AC();SND.ctx=c;
  SND.master=c.createGain();SND.master.gain.value=SND.vol;SND.master.connect(c.destination);
  /* un peu de réverbération : la salle du Conseil */
  const rev=c.createConvolver();const len=c.sampleRate*1.6,ir=c.createBuffer(2,len,c.sampleRate);
  for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3);}rev.buffer=ir;
  const wet=c.createGain();wet.gain.value=.22;rev.connect(wet);wet.connect(SND.master);
  SND.fxBus=c.createGain();SND.fxBus.connect(SND.master);SND.fxBus.connect(rev);
  SND.ambBus=c.createGain();SND.ambBus.gain.value=.55;SND.ambBus.connect(SND.master);SND.ambBus.connect(rev);
  const nb=c.createBuffer(1,c.sampleRate*2,c.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;SND.noise=nb;
  sndApplyMode();return c;
}
function sndApplyMode(){if(!SND.ctx)return;const t=SND.ctx.currentTime;
  SND.fxBus.gain.setTargetAtTime(SND.mode==='off'?0:1,t,.05);SND.ambBus.gain.setTargetAtTime(SND.mode==='all'?.55:0,t,.3);}
function sndCycle(){SND.mode=SND.mode==='all'?'fx':SND.mode==='fx'?'off':'all';try{localStorage.setItem('kebec-sound',SND.mode);}catch(e){}sndInit();if(SND.ctx&&SND.ctx.state==='suspended')SND.ctx.resume();sndApplyMode();if(SND.mode!=='off')sfx('tick');}
/* la première interaction réveille l'audio (règle des navigateurs) */
function sndWake(){if(SND.started)return;SND.started=true;sndInit();if(SND.ctx&&SND.ctx.state==='suspended')SND.ctx.resume();ambStart();}
['pointerdown','keydown'].forEach(ev=>document.addEventListener(ev,sndWake,{once:false,passive:true}));

/* ---------- briques ---------- */
function env(g,t,a,peak,dec){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+dec);}
function tone(freq,t,{type='sine',a=.005,peak=.2,dec=.6,bus,detune=0,filt}={}){const c=SND.ctx;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;o.detune.value=detune;
  let n=o;if(filt){const f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=filt;o.connect(f);n=f;}n.connect(g);g.connect(bus||SND.fxBus);env(g,t,a,peak,dec);o.start(t);o.stop(t+a+dec+.05);return o;}
function noiseBurst(t,{dur=.2,peak=.15,type='bandpass',f0=2000,f1=null,q=1,bus}={}){const c=SND.ctx;const s=c.createBufferSource();s.buffer=SND.noise;s.loop=true;const f=c.createBiquadFilter();f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,t);if(f1)f.frequency.exponentialRampToValueAtTime(f1,t+dur);
  const g=c.createGain();s.connect(f);f.connect(g);g.connect(bus||SND.fxBus);env(g,t,.01,peak,dur);s.start(t,Math.random());s.stop(t+dur+.1);}
/* timbre de l'époque : luth, clavecin, piano, accordéon */
function pluck(freq,t,peak=.12,bus){const era=(typeof S!=='undefined'&&S&&S.period)||1;
  if(era===1){tone(freq,t,{type:'triangle',peak,dec:1.1,bus,filt:2200});tone(freq*2,t,{type:'sine',peak:peak*.25,dec:.5,bus});}
  else if(era===2){tone(freq,t,{type:'sawtooth',peak:peak*.55,dec:.7,bus,filt:3200});tone(freq*2.001,t,{type:'square',peak:peak*.12,dec:.35,bus,filt:4000});}
  else if(era===5){tone(freq,t,{type:'sine',peak:peak*.4,dec:1.6,bus,a:.01});tone(freq*2,t,{type:'sine',peak:peak*.12,dec:.8,bus,a:.01});tone(freq*3.01,t,{type:'triangle',peak:peak*.05,dec:.5,bus,filt:3000});}
  else if(era===4){tone(freq,t,{type:'sawtooth',peak:peak*.32,dec:.9,bus,filt:1800,a:.04});tone(freq*1.004,t,{type:'sawtooth',peak:peak*.28,dec:.9,bus,filt:1600,a:.05});tone(freq/2,t,{type:'triangle',peak:peak*.25,dec:.7,bus});}
  else{tone(freq,t,{type:'sine',peak,dec:1.8,bus});tone(freq*2,t,{type:'triangle',peak:peak*.3,dec:.9,bus,filt:3000});tone(freq*3.01,t,{type:'sine',peak:peak*.08,dec:.5,bus});}}
function bell(freq,t,peak=.12,bus){[[1,1],[2.76,.45],[5.4,.22],[8.9,.1]].forEach(([m,a])=>tone(freq*m,t,{peak:peak*a,dec:2.2/m+.4,bus}));}
const NOTE=n=>440*Math.pow(2,(n-69)/12);

/* ---------- effets ---------- */
function sfx(name){
  if(window.CALIB||SND.mode==='off')return;if(!sndInit())return;const c=SND.ctx;if(c.state==='suspended')return;const t=c.currentTime+.01;
  switch(name){
   case 'tick':tone(1800,t,{type:'triangle',peak:.05,dec:.05});break;
   case 'open': /* le pli du parchemin, puis une note grave */
    noiseBurst(t,{dur:.35,peak:.09,f0:900,f1:3500,q:.7});pluck(NOTE(50),t+.12,.12);pluck(NOTE(57),t+.2,.08);break;
   case 'quill': /* la plume qui gratte */
    for(let i=0;i<3;i++)noiseBurst(t+i*.07,{dur:.06,peak:.07,f0:4500,f1:2500,q:3});break;
   case 'good':[0,4,7].forEach((d,i)=>pluck(NOTE(62+d),t+i*.11,.1));break;
   case 'bad':[0,-3,-7].forEach((d,i)=>pluck(NOTE(57+d),t+i*.14,.1));break;
   case 'mixed':pluck(NOTE(62),t,.1);pluck(NOTE(65),t+.15,.09);break;
   case 'page':noiseBurst(t,{dur:.45,peak:.08,f0:700,f1:2600,q:.6});noiseBurst(t+.18,{dur:.25,peak:.05,f0:2400,f1:1200,q:.8});break;
   case 'bell':bell(NOTE(76),t,.07);break;
   case 'world':bell(NOTE(81),t,.045);bell(NOTE(88),t+.12,.03);break;
   case 'drum':for(let i=0;i<6;i++){const tt=t+i*.09;tone(90,tt,{peak:.18,dec:.18});noiseBurst(tt,{dur:.08,peak:.06,type:'lowpass',f0:900});}tone(70,t+.6,{peak:.25,dec:.6});break;
   case 'cannon':tone(60,t,{peak:.35,dec:1.2});noiseBurst(t,{dur:1.1,peak:.25,type:'lowpass',f0:600,f1:120});break;
   case 'fanfare':[0,7,12].forEach((d,i)=>tone(NOTE(67+d),t+i*.13,{type:'sawtooth',peak:.06,dec:.35,filt:2400}));break;
   case 'ship':bell(NOTE(64),t,.06);bell(NOTE(64),t+.5,.05);break;
   case 'end':[0,4,7,12].forEach((d,i)=>pluck(NOTE(55+d),t+i*.25,.12));bell(NOTE(79),t+1.1,.06);break;
   case 'up':pluck(NOTE(74),t,.05);break;
   case 'down':pluck(NOTE(62),t,.05);break;
  }
}

/* ---------- ambiance ---------- */
function ambStart(){
  if(!sndInit()||SND.wind)return;const c=SND.ctx;
  const s=c.createBufferSource();s.buffer=SND.noise;s.loop=true;const f=c.createBiquadFilter();f.type='bandpass';f.Q.value=.6;f.frequency.value=400;
  const g=c.createGain();g.gain.value=0;s.connect(f);f.connect(g);g.connect(SND.ambBus);s.start();SND.wind=s;SND.windGain=g;SND.windFilt=f;
  setInterval(ambTick,400);
}
/* modes : ré dorien (I), sol mixolydien (II), fa majeur (III), sol pentatonique de reel (IV) */
const MODES={1:[50,52,53,55,57,59,60,62,64,65],2:[55,57,59,60,62,64,65,67,69,71],3:[53,55,57,58,60,62,64,65,67,69],4:[55,57,59,62,64,67,69,71,74,76],5:[52,55,57,59,62,64,66,67,69,71]};
let ambPhrase=[];
function ambTick(){
  if(!SND.ctx||SND.mode!=='all'||SND.ctx.state!=='running')return;const c=SND.ctx,t=c.currentTime;
  const st=(typeof S!=='undefined'&&S)?S:null;const season=st&&st.period===1?st.season:1;const era=(st&&st.period)||1;
  /* vent : fort l'hiver, doux l'été */
  const wv={0:.05,1:.025,2:.06,3:.11}[season]||.03;
  SND.windGain.gain.setTargetAtTime(wv*(.7+.3*Math.sin(t*.23)),t,1.2);SND.windFilt.frequency.setTargetAtTime(300+260*Math.sin(t*.11)+(season===3?200:0),t,1.5);
  /* oiseaux au printemps et l'été */
  if((season===0||season===1)&&t>SND.nextBird){SND.nextBird=t+4+Math.random()*9;const b=2200+Math.random()*1800;
    for(let i=0;i<2+Math.floor(Math.random()*3);i++){const o=c.createOscillator(),g=c.createGain();o.type='sine';const tt=t+i*.13;o.frequency.setValueAtTime(b,tt);o.frequency.exponentialRampToValueAtTime(b*1.4,tt+.06);
      o.connect(g);g.connect(SND.ambBus);env(g,tt,.01,.02,.08);o.start(tt);o.stop(tt+.15);}}
  /* période IV : un train siffle au loin */
  if(era===4&&t>(SND.nextTrain||0)){SND.nextTrain=t+40+Math.random()*60;if(SND.nextTrain-t<100&&Math.random()<.6){[0,.5].forEach(d=>{tone(NOTE(70),t+d,{type:'triangle',peak:.018,a:.08,dec:.9,bus:SND.ambBus,filt:1400});tone(NOTE(74),t+d,{type:'triangle',peak:.014,a:.08,dec:.9,bus:SND.ambBus,filt:1400});});}}
  /* musique : une phrase lente, jouée note à note, puis un silence */
  if(t>SND.nextNote){
    if(!ambPhrase.length){const sc=MODES[era]||MODES[1];let i=Math.floor(Math.random()*4)+2;ambPhrase=[];
      for(let n=0;n<4+Math.floor(Math.random()*4);n++){i=clamp(i+[-2,-1,-1,1,1,2,0][Math.floor(Math.random()*7)],0,sc.length-1);ambPhrase.push(sc[i]);}ambPhrase.push(null);}
    const n=ambPhrase.shift();
    if(n===null){SND.nextNote=t+6+Math.random()*8;}
    else{pluck(NOTE(n),t,.045,SND.ambBus);if(Math.random()<.3)pluck(NOTE(n-12),t,.03,SND.ambBus);SND.nextNote=t+.55+Math.random()*.6;}}
}
/* le bouton */
function soundBtnHTML(){const m=SND.mode;const lab=m==='all'?(fr()?'Sons et musique':'Sound and music'):m==='fx'?(fr()?'Effets seulement':'Effects only'):(fr()?'Muet':'Muted');
  const ic=m==='off'?'<path d="M4 9h3l4-4v14l-4-4H4z"/><path d="M16 9l5 6M21 9l-5 6"/>':m==='fx'?'<path d="M4 9h3l4-4v14l-4-4H4z"/><path d="M15.5 9.5a4 4 0 010 5"/>':'<path d="M4 9h3l4-4v14l-4-4H4z"/><path d="M15.5 9.5a4 4 0 010 5M18 7a7.5 7.5 0 010 10"/>';
  return `<button class="sndbtn" data-act="sound" title="${lab}" aria-label="${lab}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic}</svg></button>`;}
