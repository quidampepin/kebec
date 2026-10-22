/* Kebec — Le terroir : seigneuries en rangs, posées sur les vraies rives du Saint-Laurent (FRONT, js/frontage.js).
   Chaque bande dessinée représente quelques terres (3 arpents × 30, exagérées pour la lecture).
   Elles s'étendent avec les terres défrichées : 1er rang au bord de l'eau, puis 2e et 3e rangs derrière. */
const TERR=(()=>{
  // keep every 2nd bank point (~1.1 unit) and compute tangents within each bank run
  const pts=[];let last=-1,c=0;
  for(const p of FRONT){if(p[4]!==last){last=p[4];c=0;}if(c++%2===0)pts.push({x:p[0],y:p[1],nx:p[2],ny:p[3],run:p[4]});}
  for(let i=0;i<pts.length;i++){const a=pts[i-1]&&pts[i-1].run===pts[i].run?pts[i-1]:pts[i],b=pts[i+1]&&pts[i+1].run===pts[i].run?pts[i+1]:pts[i];
    let tx=b.x-a.x,ty=b.y-a.y;const m=Math.hypot(tx,ty)||1;pts[i].tx=tx/m;pts[i].ty=ty/m;
    // re-orthogonalize the inland normal against the tangent, keep its side
    let nx=-pts[i].ty,ny=pts[i].tx;if(nx*pts[i].nx+ny*pts[i].ny<0){nx=-nx;ny=-ny;}pts[i].nx=nx;pts[i].ny=ny;
    pts[i].h=((i*2654435761)>>>0)%997/997;}
  return pts;
})();
const TERR_NEAR={};
function terrNear(key){
  if(TERR_NEAR[key])return TERR_NEAR[key];
  const[x,y]=P(PLACES[key].ll[0],PLACES[key].ll[1]);
  const L=TERR.map((p,i)=>[i,Math.hypot(p.x-x,p.y-y)]).filter(a=>a[1]<75).sort((a,b)=>a[1]-b[1]).map(a=>a[0]);
  return TERR_NEAR[key]=L;
}
const CLEARED_PER_STRIP=22;
// greedy allocation of bank lots to each settlement, biggest first
function terrAlloc(s){
  const pp=placePops(s);const used=new Map();const out=[];
  const keys=Object.keys(pp).filter(k=>PLACES[k]&&!PLACES[k].post).sort((a,b)=>pp[b].cleared-pp[a].cleared);
  for(const key of keys){
    let need=pp[key].cleared/Math.max(CLEARED_PER_STRIP,(s.cleared||0)/1900);const mine=[];
    for(const i of terrNear(key)){if(need<=0)break;if(used.has(i))continue;
      // stay on reachable shore: after the first dozen lots, only extend next to lots already taken
      if(mine.length>10){const p=TERR[i];if(!mine.some(j=>Math.abs(j-i)<=2&&TERR[j].run===p.run))continue;}
      used.set(i,key);mine.push(i);const f=Math.min(1,need);out.push({i,key,rang:0,f,seq:mine.length});need-=1;}
    for(let r=1;r<3&&need>0;r++)for(const i of mine){if(need<=0)break;const f=Math.min(1,need);out.push({i,key,rang:r,f,seq:0});need-=1;}
  }
  return out;
}
const CROP_COL=[
  ['#93a752','#a5815a','#86a35b','#b48f62','#9aae55','#a07c55'],          // printemps : labours et pousses
  ['#e0b844','#8ea64a','#d2ad4c','#b08f5c','#dcb43c','#97ab50'],          // été : blés mûrs, prés
  ['#cf9b40','#a39448','#c48d3e','#9e7b52','#d3a14a','#ad8f4f'],          // automne : chaumes
  ['#f1f2ef','#e6e9e8','#eff1ee','#e2e6e6','#f1f2ef','#e9ecea']           // hiver : sous la neige
];
function terroirSVG(s,k){
  const lots=terrAlloc(s);if(!lots.length)return '';
  const pal=CROP_COL[s.season||0];const byCol=pal.map(()=>[]);const walls=[],roofs=[],road=[],churches=[];
  const DEPTH=k<1?2.9:3.4,W=.56; // half-width ~ half the lot spacing
  const f1=v=>v.toFixed(2);
  for(const l of lots){const p=TERR[l.i];const d0=.25+l.rang*(DEPTH+.25),d1=d0+DEPTH*(l.rang===0?.85+p.h*.3:1)*l.f;
    // split each lot in two fields for texture
    for(let half=0;half<2;half++){const a=-W+half*W,b=a+W;
      const q=[[a,d0],[b,d0],[b,d1],[a,d1]].map(([u,v])=>[p.x+p.tx*u+p.nx*v,p.y+p.ty*u+p.ny*v]);
      const ci=Math.floor((p.h*6+half*3+l.rang*2))%pal.length;
      byCol[ci].push('M'+q.map(z=>f1(z[0])+','+f1(z[1])).join('L')+'Z');}
    if(k<1&&l.rang===0&&l.f>.4){// house at the river end, the road just behind
      const hx=p.x+p.nx*.7,hy=p.y+p.ny*.7,hs=.42;
      walls.push(`M${f1(hx-hs/2)},${f1(hy-hs/2)}h${hs}v${f1(hs*.8)}h${-hs}z`);
      roofs.push(`M${f1(hx-hs*.62)},${f1(hy-hs/2)}L${f1(hx)},${f1(hy-hs*1.15)}L${f1(hx+hs*.62)},${f1(hy-hs/2)}z`);
      if(l.seq%14===7)churches.push([p.x+p.nx*1.25,p.y+p.ny*1.25]);}
  }
  let h='<g class="terroir">';
  // cleared zone underlay (also what shows at continent scale): a soft ochre band along settled banks
  {let d='';const first=lots.filter(l=>l.rang===0);const deep={};for(const l of lots)deep[l.i]=Math.max(deep[l.i]||0,l.rang+l.f);
   for(const l of first){const p=TERR[l.i];const dd=(deep[l.i]||1)*(DEPTH+.25)+.4;d+=`M${f1(p.x)},${f1(p.y)}L${f1(p.x+p.nx*dd)},${f1(p.y+p.ny*dd)}`;}
   h+=`<path d="${d}" class="clearing" stroke-width="${k<1?2.4:3.2}"/>`;}
  byCol.forEach((arr,ci)=>{if(arr.length)h+=`<path d="${arr.join('')}" fill="${pal[ci]}" class="lot"/>`;});
  // chemin du roi: connect consecutive first-rang lots on the same bank
  if(k<1){const first=lots.filter(l=>l.rang===0).map(l=>l.i).sort((a,b)=>a-b);let d='';
    for(let j=1;j<first.length;j++){const a=TERR[first[j-1]],b=TERR[first[j]];if(a.run!==b.run||first[j]-first[j-1]>2)continue;
      d+=`M${f1(a.x+a.nx*1.05)},${f1(a.y+a.ny*1.05)}L${f1(b.x+b.nx*1.05)},${f1(b.y+b.ny*1.05)}`;}
    if(d)h+=`<path d="${d}" class="chemin" stroke-width="${(.22).toFixed(2)}"/>`;
    if(walls.length)h+=`<path d="${walls.join('')}" class="hwall"/><path d="${roofs.join('')}" class="hroof"/>`;
    for(const[cx,cy]of churches)h+=`<g class="church" transform="translate(${f1(cx)},${f1(cy)}) scale(.16)"><rect x="-4" y="-2" width="8" height="6"/><path d="M-4.6,-2 L0,-6 L4.6,-2Z" class="r"/><path d="M2,-3 v-7 l1.2,-2 l1.2,2 v7" class="r"/><path d="M3.2,-12 v-3 M2.2,-14 h2" class="x"/></g>`;
  }
  return h+'</g>';
}
