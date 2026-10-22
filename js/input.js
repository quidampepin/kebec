/* Onontio — Clics, curseurs et clavier. */
function act(b,ev){
  const a=b.dataset.act,v=b.dataset.v;
  switch(a){
    case 'play':setRunning(!running);break;
    case 'step':if(!running){const bf=alertSnap();advance();checkAlerts(bf);render();}break;
    case 'speed':speed=+v;try{localStorage.setItem('onontio-speed',speed)}catch(e){};render();break;
    case 'lang':lang=v;$('toasts').innerHTML='';try{localStorage.setItem('onontio-lang',lang)}catch(e){};staticCache.key='';render();break;
    case 'view':cam=null;view=v;staticCache.key='';render();break;
    case 'zoom':mapZoom(v==='in'?.6:1/.6);break;
    case 'tab':tab=v;renderTabs();break;
    case 'plan':S.routine[b.dataset.k]=v;save();renderTabs();break;
    case 'orient':{const k=b.dataset.k;if(S.orient[k]!==v){S.orient[k]=v;S.compagnie=clamp(S.compagnie-2,0,100);if(k==='all'){S.rAlg=clamp(S.rAlg-4,0,100);S.rWen=clamp(S.rWen-4,0,100);}
      logIt(S,{fr:`Nouvelle orientation : ${T.fr[v]}.`,en:`New orientation: ${T.en[v]}.`},'decision');toast({fr:`Nouvelle orientation : ${T.fr[v]}.`,en:`New orientation: ${T.en[v]}.`},'info');save();render();}}break;
    case 'spring':springPause=b.checked;try{localStorage.setItem('onontio-spring',springPause?'1':'0')}catch(e){};break;
    case 'autores':autoResume=b.checked;try{localStorage.setItem('onontio-autores',autoResume?'1':'0')}catch(e){};break;
    case 'openev':dispatchMin=false;renderDispatch();break;
    case 'sound':sndCycle();renderHUD();break;
    case 'nextnow':nextUntil=0;renderDispatch();break;
    case 'minimize':dispatchMin=true;renderDispatch();break;
    case 'choose':choose(b.dataset.id,+b.dataset.i);break;
    case 'continue':{const o=S.outcome;S.outcome=null;dispatchMin=false;if(o&&o.eff&&!window.CALIB){const e=EV[o.id];const pl=(e&&e.place)||'quebec';o.eff.filter(f=>!f.seed&&f.k!=='end').slice(0,3).forEach((f,i)=>setTimeout(()=>pushFx(pl,(f.d>0?'+':'−')+Math.abs(f.d)+' '+L(f.lab),f.good===false?'bad':'good'),i*500));}if(S.flags._openOrders){delete S.flags._openOrders;tab='ordres';resumeAfter=false;}if(S.pending.length&&!window.CALIB&&!S.flags._noPeek){nextUntil=Date.now()+2600;setTimeout(()=>{if(Date.now()>=nextUntil-50){nextUntil=0;renderDispatch();}},2650);}save();render();}if(!S.pending.length&&resumeAfter&&autoResume&&!S.ending&&relOpen===null){resumeAfter=false;setRunning(true,true);}else if(!S.pending.length)resumeAfter=false;break;
    case 'prologue':prologueOpen=false;try{localStorage.setItem('onontio-intro','1')}catch(e){};render();break;
    case 'new':running=false;clearTimeout(timer);S=newState();enterSeason(S);logIt(S,R("3 juillet 1608 : Champlain fonde l'Habitation de Québec avec 28 hommes.","3 July 1608: Champlain founds the Habitation at Québec with 28 men."),'good');
      titleOpen=false;prologueOpen=true;dispatchMin=false;tab='colonie';cam=null;view='continent';FXQ=[];TOASTS=[];TQ=[];staticCache.key='';save();render();break;
    case 'p2new':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod2(false);break;
    case 'p4new':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod4(false);break;
    case 'p5new':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod5(false);break;
    case 'p5inherit':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod5(true);break;
    case 'callref':S.flags.refAsk=true;S.flags.refSoon=true;toast(R("Le référendum est annoncé : il aura lieu au prochain tour.","The referendum is announced: it will be held next turn."),'gov');render();break;
    case 'p4inherit':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod4(true);break;
    case 'p3new':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod3(false);break;
    case 'p3inherit':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod3(true);break;
    case 'p2inherit':running=false;clearTimeout(timer);FXQ=[];TOASTS=[];TQ=[];dispatchMin=false;startPeriod2(true);break;
    case 'resume':titleOpen=false;render();break;
    case 'title':running=false;clearTimeout(timer);titleOpen=true;render();break;
    case 'credits':helpOpen=false;creditsOpen=true;renderCredits();break;
    case 'openinset':S.showInset=true;renderInset();break;
    case 'closeinset':S.showInset=false;renderInset();break;
    case 'closecredits':creditsOpen=false;renderCredits();renderHelp();break;
    case 'help':helpOpen=true;renderHelp();break;
    case 'closehelp':helpOpen=false;renderHelp();break;
    case 'toastgo':if(v==='relation'&&S.chron&&S.chron.length){relOpen=0;render();}break;
    case 'openrel':relOpen=+v;render();break;
    case 'relnav':relOpen=clamp(relOpen+(+v),0,S.chron.length-1);renderRelation();break;
    case 'closerel':relOpen=null;render();if(resumeAfter&&autoResume&&!S.pending.length&&!S.outcome&&!S.ending){resumeAfter=false;setRunning(true,true);}break;
    case 'readrel':readRel=b.checked;try{localStorage.setItem('kebec-readrel',readRel?'1':'0')}catch(e){};break;
  }
}
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-act]');if(!b||b.tagName==='INPUT'&&b.type==='range')return;if(b.tagName==='INPUT'&&b.type==='checkbox'){act(b,ev);return;}act(b,ev);});
document.addEventListener('input',ev=>{const b=ev.target;if(b.dataset&&b.dataset.act==='bud'){const k=b.dataset.k;let val=+b.value;const others=ENV.reduce((a,x)=>a+(x===k?0:S.budget[x]),0);if(others+val>100){val=100-others;b.value=val;}S.budget[k]=val;save();
  const row=b.closest('.slider');if(row){row.querySelector('.sv b').textContent=val+' %';row.querySelector('.sv small').textContent='≈ '+fmt(Math.max(0,S.treasury)*val/100);}
  const tot=document.querySelector('.tot span');if(tot)tot.textContent=(100-ENV.reduce((a,x)=>a+S.budget[x],0))+' % '+u('reserve');}});
document.addEventListener('keydown',ev=>{
  if(ev.key===' '&&(ev.target===document.body||ev.target===document.documentElement)){ev.preventDefault();if(!S.pending.length&&!S.outcome)setRunning(!running);}
  if(ev.key==='Escape'&&relOpen!==null){act({dataset:{act:'closerel'}});return;}
  if(ev.key==='Escape'){if(helpOpen){helpOpen=false;renderHelp();}else if(S.pending.length&&!S.outcome){dispatchMin=true;renderDispatch();}}
  if((ev.key==='Enter'||ev.key===' ')&&ev.target.closest&&ev.target.closest('.pin')){ev.preventDefault();dispatchMin=false;renderDispatch();}
});
window.addEventListener('resize',()=>{clearTimeout(window._rz);window._rz=setTimeout(drawMap,150);});
