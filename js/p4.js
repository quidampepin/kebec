/* Kebec — Période IV (1867–1960) : la province dans la Confédération.
   Vous êtes le gouvernement de Québec, le parti au pouvoir, quel qu'il soit : la volonté politique de la province.
   Ottawa, l'Église et le grand capital sont des forces avec lesquelles il faut composer. */

/* ---------- les premiers ministres : qui vous êtes, d'une législature à l'autre ---------- */
const PREMIERS4=[
 {from:1867,name:'Pierre-Joseph-Olivier Chauveau',party:R('conservateur','Conservative')},
 {from:1873,name:'Gédéon Ouimet',party:R('conservateur','Conservative')},
 {from:1874,name:'Charles Boucher de Boucherville',party:R('conservateur','Conservative')},
 {from:1878,name:'Henri-Gustave Joly de Lotbinière',party:R('libéral','Liberal')},
 {from:1879,name:'Joseph-Adolphe Chapleau',party:R('conservateur','Conservative')},
 {from:1882,name:'Joseph-Alfred Mousseau',party:R('conservateur','Conservative')},
 {from:1884,name:'John Jones Ross',party:R('conservateur','Conservative')},
 {from:1887,name:'Honoré Mercier',party:R('Parti national','Parti national')},
 {from:1891,name:'Charles Boucher de Boucherville',party:R('conservateur','Conservative')},
 {from:1892,name:'Louis-Olivier Taillon',party:R('conservateur','Conservative')},
 {from:1896,name:'Edmund James Flynn',party:R('conservateur','Conservative')},
 {from:1897,name:'Félix-Gabriel Marchand',party:R('libéral','Liberal')},
 {from:1900,name:'Simon-Napoléon Parent',party:R('libéral','Liberal')},
 {from:1905,name:'Lomer Gouin',party:R('libéral','Liberal')},
 {from:1920,name:'Louis-Alexandre Taschereau',party:R('libéral','Liberal')},
 {from:1936,name:'Maurice Duplessis',party:R('Union nationale','Union nationale')},
 {from:1939,name:'Adélard Godbout',party:R('libéral','Liberal')},
 {from:1944,name:'Maurice Duplessis',party:R('Union nationale','Union nationale')},
 {from:1959,name:'Paul Sauvé',party:R('Union nationale','Union nationale')},
 {from:1960,name:'Antonio Barrette',party:R('Union nationale','Union nationale')}];
/* deux camps : les bleus (conservateurs, puis Union nationale) et les rouges (libéraux, Parti national).
   Le parti au pouvoir est un état de la partie : il change quand une élection est perdue (ou par un coup du lieutenant-gouverneur). */
PREMIERS4.forEach(x=>{x.side=x.party.fr==='Parti national'?'rouge':x.party.fr==='libéral'?'rouge':'bleu';x.sn=x.sn||x.name.replace(/^(Pierre-Joseph-Olivier|Gédéon|Charles|Henri-Gustave|Joseph-Adolphe|Joseph-Alfred|John Jones|Honoré|Louis-Olivier|Edmund James|Félix-Gabriel|Simon-Napoléon|Lomer|Louis-Alexandre|Maurice|Adélard|Paul|Antonio) /,'').replace(/ de Lotbinière$/,'');});
/* les chefs de l'opposition : ce sont eux qui gouvernent si l'histoire bascule */
const OPP4={
 rouge:[[1867,'Henri-Gustave Joly de Lotbinière','Joly'],[1883,'Honoré Mercier','Mercier'],[1892,'Félix-Gabriel Marchand','Marchand'],[1936,'Adélard Godbout','Godbout'],[1949,'Georges-Émile Lapalme','Lapalme'],[1958,'Jean Lesage','Lesage']],
 bleu:[[1867,'Pierre-Joseph-Olivier Chauveau','Chauveau'],[1878,'Joseph-Adolphe Chapleau','Chapleau'],[1887,'Louis-Olivier Taillon','Taillon'],[1897,'Edmund James Flynn','Flynn'],[1905,'Pierre-Évariste Leblanc','Leblanc'],[1909,'Joseph-Mathias Tellier','Tellier'],[1916,'Arthur Sauvé','Sauvé'],[1929,'Camillien Houde','Houde'],[1933,'Maurice Duplessis','Duplessis']]};
/* qui a gagné chaque élection dans l'histoire */
const HISTWIN4={1871:'bleu',1875:'bleu',1878:'rouge',1881:'bleu',1886:'rouge',1890:'rouge',1892:'bleu',1897:'rouge',1900:'rouge',1904:'rouge',1908:'rouge',1912:'rouge',1916:'rouge',1919:'rouge',1923:'rouge',1927:'rouge',1931:'rouge',1935:'rouge',1936:'bleu',1939:'rouge',1944:'bleu',1948:'bleu',1952:'bleu',1956:'bleu',1960:'rouge'};
/* le parti au pouvoir à Ottawa */
const FED4=[[1867,'bleu'],[1873,'rouge'],[1878,'bleu'],[1896,'rouge'],[1911,'bleu'],[1921,'rouge'],[1930,'bleu'],[1935,'rouge'],[1957,'bleu']];
const fedSide4=y=>{let v='bleu';for(const[a,b]of FED4)if(y>=a)v=b;return v;};
function histPremier4(y){let p=PREMIERS4[0];for(const x of PREMIERS4)if(y>=x.from)p=x;return p;}
function partyLabel4(s,side){const y=s.year;if(side==='rouge')return y>=1886&&y<1892&&(s.flags.partiNational||y>=1887)?R('Parti national','Parti national'):R('libéral','Liberal');
  return y>=1936||(y>=1935&&s.flags.actionNationale)?R('Union nationale','Union nationale'):R('conservateur','Conservative');}
function leader4(s,side){const h=histPremier4(s.year);if(h.side===side)return h;let o=OPP4[side][0];for(const x of OPP4[side])if(s.year>=x[0])o=x;
  return {from:o[0],name:o[1],sn:o[2],side,party:partyLabel4(s,side),alt:true};}
function govSide4(s){return s.side4||histPremier4(s.year).side;}
function premier4(s){const p=leader4(s,govSide4(s));return p.alt?p:Object.assign({},p,{party:partyLabel4(s,p.side)});}
function opposition4(s){return leader4(s,govSide4(s)==='bleu'?'rouge':'bleu');}
/* le nom du premier ministre de l'histoire, dans les textes, devient celui de votre premier ministre */
function sub4(t){if(!S||S.period!==4||typeof t!=='string')return t;const h=histPremier4(S.year),c=premier4(S);if(h.name===c.name||!h.sn)return t;return t.split(h.name).join(c.name).split(h.sn).join(c.sn||c.name);}
/* un changement de gouvernement */
/* chaque camp arrive au pouvoir avec ses alliés et son programme */
function platform4(y,side){if(side==='rouge')return y>=1897?{eco4:'ressources'}:y>=1886?{ottawa:'affirmation'}:{};return y>=1936?{ottawa:'autonomie',travail4:'ordre'}:{eco4:'agricole'};}
function changeGov4(s,side,why){const before=premier4(s);s.side4=side;s.govSince=s.year;const p=premier4(s);Object.assign(s.orient,platform4(s.year,side));
  s.off.eve=Math.round(s.off.eve+(side==='bleu'?10:-10));s.off.mar=Math.round(s.off.mar+(side==='rouge'?6:-3));s.off.gov=Math.round(s.off.gov*.5+(side===fedSide4(s.year)?10:-8));
  s.support=52;s.mandat=.95;
  const tx={fr:`Changement de gouvernement : ${p.name} (${p.party.fr}) remplace ${before.name}. ${why?why.fr:''}`,en:`Change of government: ${p.name} (${p.party.en}) replaces ${before.name}. ${why?why.en:''}`};
  logIt(s,tx,'good');return tx;}

/* ---------- avec qui il faut composer : Ottawa, l'Église, le capital ---------- */
const OFFICERS4={
 gov:[
  {from:1867,name:'John A. Macdonald',trait:R("Le père de la Confédération voulait un État unitaire ; il a dû concéder des provinces. Il compte sur Cartier et les « bleus » pour tenir le Québec.","The father of Confederation wanted a unitary state; he had to concede provinces. He counts on Cartier and the 'bleus' to hold Quebec."),like:{ottawa:'cooperation',routes:1},mod:{fav:1.1}},
  {from:1873,name:'Alexander Mackenzie',trait:R("Libéral écossais, économe, peu porté sur les grands travaux. Le scandale du Pacifique l'a porté au pouvoir.","A thrifty Scottish Liberal, not keen on grand projects. The Pacific Scandal brought him to power."),like:{ottawa:'autonomie'},mod:{fav:1}},
  {from:1878,name:'John A. Macdonald',trait:R("De retour avec la Politique nationale : tarifs protecteurs, chemin de fer du Pacifique, peuplement de l'Ouest.","Back with the National Policy: protective tariffs, the Pacific railway, settling the West."),like:{ottawa:'cooperation',industrie:1},mod:{fav:1.05}},
  {from:1891,name:'Les successeurs de Macdonald',trait:R("Abbott, Thompson, Bowell, Tupper : quatre premiers ministres en cinq ans, paralysés par la question des écoles du Manitoba.","Abbott, Thompson, Bowell, Tupper: four prime ministers in five years, paralysed by the Manitoba schools question."),like:{minorites:'prudence'},mod:{fav:.9}},
  {from:1896,name:'Wilfrid Laurier',trait:R("Le premier Canadien français à Ottawa. Il préfère les « voies ensoleillées » du compromis aux combats de principe.","The first French Canadian in Ottawa. He prefers the 'sunny ways' of compromise to battles of principle."),like:{ottawa:'cooperation',minorites:'prudence'},mod:{fav:1.25}},
  {from:1911,name:'Robert Borden',trait:R("Conservateur, impérialiste : quand l'Empire est en guerre, le Canada l'est aussi, et jusqu'au bout.","A Conservative imperialist: when the Empire is at war, so is Canada, to the end."),like:{ottawa:'cooperation'},mod:{fav:.8}},
  {from:1920,name:'Arthur Meighen',trait:R("L'auteur de la loi de conscription. Au Québec, son nom est une injure.","The author of the conscription law. In Quebec his name is an insult."),like:{ottawa:'cooperation'},mod:{fav:.65}},
  {from:1921,name:'William Lyon Mackenzie King',trait:R("Prudent jusqu'à l'obscur, il gouverne avec Ernest Lapointe comme lieutenant québécois.","Cautious to the point of obscurity, he governs with Ernest Lapointe as his Quebec lieutenant."),like:{ottawa:'cooperation'},mod:{fav:1.15}},
  {from:1930,name:'R. B. Bennett',trait:R("Millionnaire de Calgary, il promet de « faire sauter » les marchés pour en finir avec la Crise. Les secours tardent.","A Calgary millionaire, he promises to 'blast' his way into markets to end the Depression. Relief is slow to come."),like:{ottawa:'cooperation',industrie:.5},mod:{fav:.85}},
  {from:1935,name:'William Lyon Mackenzie King',trait:R("De retour. La guerre lui servira à centraliser les impôts : Ottawa « loue » ceux des provinces.","Back again. The war will let him centralize taxes: Ottawa 'rents' the provinces' tax fields."),like:{ottawa:'cooperation'},mod:{fav:1.05}},
  {from:1948,name:'Louis St-Laurent',trait:R("« Oncle Louis », avocat de Québec. Il veut un Canada fort et des programmes nationaux, jusque dans les universités.","'Uncle Louis', a Québec City lawyer. He wants a strong Canada and national programs, even in the universities."),like:{ottawa:'cooperation',ecoles:-.5},mod:{fav:1.1}},
  {from:1957,name:'John Diefenbaker',trait:R("« Un seul Canada » : le Prairie lawyer ne comprend pas bien ce que veut le Québec.","'One Canada': the prairie lawyer does not quite understand what Quebec wants."),like:{ottawa:'cooperation'},mod:{fav:.9}}],
 eve:[
  {from:1867,name:'Ignace Bourget',trait:R("L'évêque de Montréal mène la guerre aux libéraux, à l'Institut canadien et à tout ce qui sent la Révolution. Il envoie des zouaves au pape.","The bishop of Montréal wages war on the liberals, the Institut canadien and anything that smells of Revolution. He sends Zouaves to the Pope."),like:{ecoles:1.4,eglise4:'concordat'},mod:{church:1.3}},
  {from:1876,name:'Elzéar-Alexandre Taschereau',trait:R("L'archevêque de Québec, prudent, se méfie des ultramontains et des curés qui font de la politique. Il sera le premier cardinal canadien.","The archbishop of Québec, cautious, distrusts the ultramontanes and priests who meddle in politics. He will be the first Canadian cardinal."),like:{ecoles:1},mod:{church:1.05}},
  {from:1898,name:'Louis-Nazaire Bégin et Paul Bruchési',trait:R("Québec et Montréal : ils combattent tout ministère de l'Instruction publique et lancent les syndicats catholiques.","Québec and Montréal: they fight any ministry of public instruction and launch the Catholic unions."),like:{ecoles:1.2,travail4:'catholiques',eglise4:'concordat'},mod:{church:1.2}},
  {from:1931,name:'Rodrigue Villeneuve',trait:R("Cardinal, oblat, il prêche le corporatisme et la restauration sociale contre le communisme et le libéralisme.","A cardinal and Oblate, he preaches corporatism and social restoration against communism and liberalism."),like:{ecoles:1.2,eglise4:'concordat',travail4:'catholiques'},mod:{church:1.25}},
  {from:1940,name:'Joseph Charbonneau',trait:R("L'archevêque de Montréal se range du côté des ouvriers et fait quêter pour les grévistes. Il dérange.","The archbishop of Montréal sides with the workers and takes up collections for strikers. He disturbs people."),like:{ecoles:1,travail4:'catholiques'},mod:{church:1.05}},
  {from:1950,name:'Paul-Émile Léger',trait:R("Le cardinal du chapelet en famille, à la radio chaque soir. Les églises sont pleines ; les séminaires commencent à se vider.","The cardinal of the family rosary, on the radio every evening. The churches are full; the seminaries begin to empty."),like:{ecoles:1.1,eglise4:'concordat',sante:.5},mod:{church:1.15}}],
 mar:[
  {from:1867,name:'Hugh Allan et la rue Saint-Jacques',trait:R("Armateur, banquier, roi du chemin de fer : la Banque de Montréal et les marchands écossais tiennent le crédit du pays.","Shipowner, banker, railway king: the Bank of Montreal and the Scottish merchants hold the country's credit."),like:{routes:1.2,industrie:.6},mod:{eco:1.05}},
  {from:1881,name:'Le Canadien Pacifique',trait:R("George Stephen et Van Horne bâtissent l'empire d'acier qui relie Montréal au Pacifique. Ils ont Ottawa dans leur poche.","George Stephen and Van Horne build the steel empire linking Montréal to the Pacific. They have Ottawa in their pocket."),like:{routes:1,ottawa:'cooperation'},mod:{eco:1.1}},
  {from:1898,name:'La Shawinigan Water & Power',trait:R("Les chutes de la Saint-Maurice deviennent des kilowatts : aluminium, pâte, électrochimie. Le capital vient de Boston et de Montréal.","The Saint-Maurice falls become kilowatts: aluminium, pulp, electrochemistry. The capital comes from Boston and Montréal."),like:{industrie:1,eco4:'ressources'},mod:{eco:1.1}},
  {from:1910,name:'Les papetières',trait:R("Price Brothers, la Laurentide, les journaux de New York : la forêt québécoise imprime les quotidiens américains.","Price Brothers, the Laurentide, the New York papers: Quebec's forest prints America's dailies."),like:{industrie:1,eco4:'ressources',travail4:'ordre'},mod:{eco:1.1}},
  {from:1925,name:"L'Alcan et la Noranda",trait:R("L'aluminium d'Arvida, le cuivre de Rouyn : des villes entières appartiennent à une compagnie.","Arvida's aluminium, Rouyn's copper: whole towns belong to a company."),like:{industrie:1.2,eco4:'ressources'},mod:{eco:1.15}},
  {from:1936,name:'Le trust de l’électricité',trait:R("La Montreal Light, Heat & Power de Herbert Holt vend cher l'électricité aux Montréalais. On l'appelle « le trust ».","Herbert Holt's Montreal Light, Heat & Power sells Montrealers expensive power. People call it 'the trust'."),like:{eco4:'ressources',industrie:.8},mod:{eco:1.05}},
  {from:1945,name:'Iron Ore Company of Canada',trait:R("Les Américains veulent le fer de l'Ungava. Ils offrent un chemin de fer, une ville, et une redevance d'un cent la tonne.","The Americans want Ungava's iron. They offer a railway, a town, and a royalty of one cent a ton."),like:{eco4:'ressources',travail4:'ordre',industrie:1},mod:{eco:1.15}}]};
const OFF_LAB4={gov:R('Ottawa','Ottawa'),eve:R("L'Église",'The Church'),mar:R('Le capital','Capital')};
function officer4(s,k){let o=OFFICERS4[k][0];for(const x of OFFICERS4[k])if(s.year>=x.from)o=x;return o;}
function offEff4(s,k,m){const o=officer4(s,k);const base=(o.mod&&o.mod[m])||1;return base*(1+(s.off[k]||0)/260);}

/* ---------- les guerres, la Crise, le rythme ---------- */
const WARS4=[{id:'nordouest',a:1885,b:1885,name:R('Rébellion du Nord-Ouest','North-West Rebellion')},{id:'boers',a:1899,b:1902,name:R('Guerre des Boers','Boer War')},{id:'gg1',a:1914,b:1918,name:R('La Grande Guerre','The Great War')},{id:'gg2',a:1939,b:1945,name:R('La Seconde Guerre mondiale','The Second World War')},{id:'coree',a:1950,b:1953,name:R('Guerre de Corée','Korean War')}];
const warAt4=y=>WARS4.find(w=>y>=w.a&&y<=w.b)||null;
const crise4=y=>y>=1930&&y<=1938;
function regime4(y){return crise4(y)?R('La Crise','The Depression'):R('Province de Québec','Province of Quebec');}
const ELECT4=[1867,1871,1875,1878,1881,1886,1890,1892,1897,1900,1904,1908,1912,1916,1919,1923,1927,1931,1935,1936,1939,1944,1948,1952,1956,1960];
const CRISES4=[[1867,1868],[1885,1887],[1896,1897],[1914,1919],[1929,1933],[1939,1945],[1949,1949],[1959,1960]];
function turnLen4(s){const y=s.year;if(CRISES4.some(([a,b])=>y>=a&&y<=b))return 1;
  const ne=ELECT4.find(e=>e>y)||1961,nc=(CRISES4.find(([a])=>a>y)||[1961])[0];return clamp(Math.min(ne,nc)-y,1,4);}
/* ce que la province perçoit, par habitant (dollars courants) */
function usPop4(y){return pw([[1867,37000000],[1870,38600000],[1900,76200000],[1930,123200000],[1960,179300000]],y);}
const revRate4=y=>pw([[1867,1.1],[1900,2.3],[1912,3.8],[1920,6.5],[1930,12],[1940,18],[1946,33],[1950,47],[1960,95]],y);

/* ---------- les traits, avec les mots de l'époque ---------- */
const TRAITS4=[
 {id:'ferveur',name:R('Ferveur','Fervour'),lo:R('libres penseurs','freethinkers'),hi:R('cléricaux','clerical')},
 {id:'alliance',name:R('Liens avec les Premières Nations','Ties with the First Nations'),lo:R('ignorance','ignorance'),hi:R('respect','respect')},
 {id:'aventure',name:R('Mobilité','Mobility'),lo:R('enracinés','rooted'),hi:R('déracinés','uprooted')},
 {id:'roi',name:R('Loyauté au Canada','Loyalty to Canada'),lo:R('nationalistes','nationalists'),hi:R('loyaux au Dominion','loyal to the Dominion')},
 {id:'entraide',name:R('Entraide','Mutual aid'),lo:R('chacun pour soi','each for himself'),hi:R('coopératives et syndicats','co-ops and unions')},
 {id:'ouverture',name:R('Ouverture','Openness'),lo:R('repli','withdrawal'),hi:R('modernité','modernity')}];

/* ---------- les lieux de la période ---------- */
Object.assign(PLACES,{
 stJerome:{ll:[-74.0,45.78],name:R('Saint-Jérôme','Saint-Jérôme'),dx:6,dy:-4,p4:true},
 montLaurier:{ll:[-75.5,46.55],name:R('Mont-Laurier','Mont-Laurier'),dx:6,dy:12,p4:true},
 roberval:{ll:[-72.23,48.52],name:R('Roberval','Roberval'),dx:-6,dy:12,anchor:'end',p4:true},
 shawinigan:{ll:[-72.75,46.57],name:R('Shawinigan','Shawinigan'),dx:6,dy:-4,p4:true},
 thetford:{ll:[-71.3,46.1],name:R('Thetford Mines','Thetford Mines'),dx:6,dy:12,p4:true},
 hull:{ll:[-75.73,45.43],name:R('Hull','Hull'),dx:-6,dy:12,anchor:'end',p4:true},
 temiscamingue:{ll:[-79.43,47.33],name:R('Ville-Marie (Témiscamingue)','Ville-Marie (Témiscamingue)'),dx:6,dy:12,p4:true},
 amos:{ll:[-78.12,48.57],name:R('Amos','Amos'),dx:6,dy:-4,p4:true},
 rouyn:{ll:[-79.02,48.24],name:R('Rouyn','Rouyn'),dx:6,dy:12,p4:true},
 arvida:{ll:[-71.18,48.41],name:R('Arvida','Arvida'),dx:6,dy:12,p4:true},
 septIles:{ll:[-66.38,50.21],name:R('Sept-Îles','Sept-Îles'),dx:6,dy:12,p4:true},
 matapedia:{ll:[-67.15,48.45],name:R('Amqui','Amqui'),dx:6,dy:12,p4:true},
 sudbury:{ll:[-80.99,46.49],name:R('Sudbury','Sudbury'),dx:6,dy:12,foreign:true,p4:true},
 lowell:{ll:[-71.32,42.64],name:R('Lowell','Lowell'),dx:6,dy:-4,foreign:true,p4:true},
 manchesterNH:{ll:[-71.46,42.99],name:R('Manchester','Manchester'),dx:6,dy:-4,foreign:true,p4:true},
 fallRiver:{ll:[-71.15,41.7],name:R('Fall River','Fall River'),dx:6,dy:12,foreign:true,p4:true},
 woonsocket:{ll:[-71.51,42.0],name:R('Woonsocket','Woonsocket'),dx:-6,dy:12,anchor:'end',foreign:true,p4:true},
 lewiston:{ll:[-70.21,44.1],name:R('Lewiston','Lewiston'),dx:6,dy:-4,foreign:true,p4:true}});
if(PLACES.villeMarie)PLACES.villeMarie.n3=R('Montréal','Montreal');
if(PLACES.bytown)PLACES.bytown.n4=R('Ottawa','Ottawa');
/* les régions de colonisation : elles s'ouvrent avec le chemin de fer, les curés colonisateurs et l'effort de la province */
const REGIONS4=[
 {id:'laurentides',y:1868,need:28,place:'stJerome',name:R('Les Laurentides du curé Labelle','Curé Labelle’s Laurentians'),pts:[[-74.3,45.95],[-74.0,46.4],[-74.6,47.0],[-75.8,46.9],[-75.9,46.2],[-75.0,45.9]],lab:[-74.95,46.45]},
 {id:'saguenay',y:1870,need:30,place:'roberval',name:R('Le Lac-Saint-Jean','Lac-Saint-Jean'),pts:[[-71.0,48.3],[-71.0,48.6],[-72.0,48.95],[-72.6,48.8],[-72.4,48.3],[-71.6,48.2]],lab:[-71.9,48.75]},
 {id:'matapedia',y:1880,need:34,place:'matapedia',name:R('La Matapédia','The Matapédia'),pts:[[-68.2,48.05],[-67.0,47.95],[-66.4,48.3],[-67.3,48.75],[-68.3,48.55]],lab:[-67.35,48.3]},
 {id:'temiscamingue',y:1886,need:36,place:'temiscamingue',name:R('Le Témiscamingue','Témiscamingue'),pts:[[-79.5,46.9],[-78.9,47.0],[-78.8,47.8],[-79.5,47.8]],lab:[-79.15,47.55]},
 {id:'abitibi',y:1912,need:40,place:'amos',name:R("L'Abitibi","Abitibi"),pts:[[-79.5,48.0],[-77.0,48.0],[-76.9,48.95],[-79.5,49.0]],lab:[-78.2,48.8]}];

/* ---------- état de départ ---------- */
const ENV4=['colon','ecoles','sante','routes','industrie'];
function p4Defaults(s){
  s.period=4;s.season=1;s.turn=1;s.ending=null;s.pending=[];s.outcome=null;
  s.off={gov:0,eve:10,mar:0};s.offName={};
  s.p4start={year:s.year,pop:s.pop};s.yearOut=[];s.chron=[];
  s.urb=s.urb||.22;s.capital=Math.max(s.capital||0,.38);s.foreign=s.foreign||58;s.colT=s.colT||38;s.regions=s.regions||{};
  s.support=55;s.mandat=1;s.side4=s.side4||histPremier4(s.year).side;s.govSince=s.govSince||s.year;s.revT=Math.round(s.pop*revRate4(s.year));s.treasury=Math.max(s.treasury||0,0)>s.revT*2?s.revT:Math.round(s.revT*.8);
  s.fram=s.fram||Math.max(150000,Math.round((s.emig||0)*1.1));s.minor=s.minor||155000;s.minorVit=s.minorVit||55;s.emig4=0;s.emig=s.emig||0;
  s.us=0;s.war=null;s.warsSeen={};s.seenWorld=s.seenWorld||{};WORLD.forEach((w,i)=>{if(w.y<s.year)s.seenWorld[i]=true;});
  s.budget={colon:25,ecoles:20,sante:10,routes:30,industrie:15};s.alloc={};
  s.orient={eglise4:'concordat',eco4:'agricole',ottawa:'cooperation',minorites:'prudence',travail4:'ordre'};s.cls=null;
  s.routine=s.routine||{};
  for(const k of ['gov','eve','mar'])s.offName[k]=officer4(s,k).name;s.premier=premier4(s).name;
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0,emig:0,deaths:0};
  s.lastReview=null;s.revSnap=null;s.sysCount=s.sysCount||{};s.sysLast=s.sysLast||{};
  s.str=s.str||{};
  setEnvFor(s);return s;
}
/* départ historique : 1er juillet 1867 */
function newState4(){
  const s=attachRel(newState());
  Object.assign(s,{year:1867,pop:1180000,ang:262000,women:236000,cleared:0,food:0,treasury:0,furs:0,defense:20,compagnie:50,church:66,missions:30,autonomy:35,
    eco:34,edu:20,patri:24,land:0,emig:240000,wenFallen:true,wenStr:12,annedda:true,hospital:true,firstWinter:false});
  s.rel={innu:25,alg:20,wen:35,agnier:10,onon:0,abenaki:30,ouest:20};
  s.places={quebec:true,tadoussac:true,troisRivieres:true,villeMarie:true,orleans:true,beauport:true,lauzon:true,beaupre:true,kamouraska:true,batiscan:true,sorel:true,laprairie:true,boucherville:true,kahnawake:true,lorette:true,
    stHyacinthe:true,stDenis:true,stEustache:true,rimouski:true,chicoutimi:true,sherbrooke:true,gaspe:true,kingston:true,york:true,bytown:true};
  s.flags={conquest:true,grandePaix:true,unionAct:true,responsable:true,finSeigneurie:true,chemins:true,confed:true};s.fired={};s.raided={};
  s.popHist=[[1867,1180000]];
  s.traits={ferveur:70,alliance:32,aventure:55,roi:50,entraide:62,ouverture:34};
  s.log=[];logIt(s,R("1er juillet 1867 : le Bas-Canada devient la province de Québec. Elle a sa législature, son premier ministre, ses écoles et son droit civil ; Ottawa a le reste.","1 July 1867: Lower Canada becomes the Province of Quebec. It has its legislature, its premier, its schools and its civil law; Ottawa has the rest."),'good');
  return p4Defaults(s);
}
/* départ hérité : le pays que le joueur a laissé à la fin de la période III */
const P4_INHERIT=['confederation','confedForte','confedFaible','assimilation'];
function inheritState4(p3){
  const s=attachRel(structuredClone(p3));const how=s.ending;
  s.year=1867;s.inherited=true;s.pending=[];s.outcome=null;s.flags=s.flags||{};s.flags.confed=true;
  for(const k of ['ouest','abenaki','agnier','onon','innu','alg','wen'])if(s.rel[k]==null)s.rel[k]=0;
  const T={confedForte:R("1867 : le Québec entre dans une fédération à sa mesure, avec un droit de veto sur la constitution.","1867: Quebec enters a federation on its own terms, with a veto over the constitution."),
   confedFaible:R("1867 : le Québec entre dans un Canada très centralisé. Ottawa nomme, désavoue, décide.","1867: Quebec enters a highly centralized Canada. Ottawa appoints, disallows, decides."),
   assimilation:R("1867 : la province de Québec naît, mais les Canadiens français n'y sont plus qu'une courte majorité.","1867: the Province of Quebec is born, but French Canadians are now only a narrow majority in it.")};
  logIt(s,T[how]||R("1867 : le pays que vous avez défendu devient la province de Québec.","1867: the country you defended becomes the Province of Quebec."),'good');
  p4Defaults(s);
  if(how==='confedForte'){s.autonomy=clamp((s.autonomy||30)+12,0,100);s.flags.vetoQc=true;s.off.gov=-10;}
  if(how==='confedFaible'){s.autonomy=clamp((s.autonomy||30)-10,0,100);s.flags.tutelle=true;s.patri=clamp((s.patri||20)+5,0,100);}
  s.autonomy=clamp(Math.max(s.autonomy||0,25),0,100);
  s.popHist=[[1867,s.pop]];
  return s;
}
function startPeriod4(inherit){
  S=inherit?inheritState4(S):newState4();
  titleOpen=false;prologueOpen=true;dispatchMin=false;tab='colonie';view='continent';cam=null;staticCache.key='';
  enterYear4(S);save();render();
}

/* ---------- la démographie : repères historiques ---------- */
const pw=(pts,y)=>{if(y<=pts[0][0])return pts[0][1];for(let i=0;i<pts.length-1;i++){const[a,va]=pts[i],[b,vb]=pts[i+1];if(y<=b)return va+(vb-va)*(y-a)/(b-a);}return pts[pts.length-1][1];};
const BR4=[[1867,.0455],[1880,.0445],[1900,.0395],[1920,.0375],[1930,.0305],[1940,.0275],[1947,.031],[1960,.028]];
const DR4=[[1867,.0245],[1885,.0235],[1900,.0205],[1920,.0152],[1930,.0133],[1940,.0112],[1950,.0088],[1960,.0074]];
const URB4=[[1867,.22],[1881,.27],[1891,.34],[1901,.40],[1911,.48],[1921,.56],[1931,.63],[1941,.63],[1951,.67],[1961,.74]];
/* l'attrait des filatures de la Nouvelle-Angleterre, selon la conjoncture américaine */
function pull4(y){return y<1873?.0105:y<1879?.0075:y<1893?.0125:y<1897?.0085:y<1901?.0105:y<1911?.005:y<1920?.006:y<1930?.007:y<1946?.0005:.0010;}
/* l'immigration vers le Québec (surtout anglophone et allophone) */
function imm4(y){return y<1900?2000:y<1914?6000:y<1919?800:y<1930?5000:y<1946?500:15000;}

/* ---------- simulation ---------- */
function processYear4(s){
  const dt=s.turn||1,ys=s.ys,war=warAt4(s.year),O=s.orient,F=s.flags;
  const base=Math.max(0,s.treasury),a={};let tot=0;for(const k of ENV4){a[k]=Math.round(base*(s.budget[k]||0)/100);tot+=a[k];}s.alloc=a;s.treasury-=tot;
  const ref=Math.max(1,(s.revT||1)*.1),ef=k=>Math.log1p((a[k]||0)/ref)*(s.mandat||1);
  const gE=m=>offEff4(s,'gov',m),eE=m=>offEff4(s,'eve',m),mE=m=>offEff4(s,'mar',m);const y=s.year;
  /* l'Église et l'école */
  {const tgt=clamp(46+12*ef('ecoles')*eE('church')+(O.eglise4==='concordat'?10:-10)+(F.ministereAboli?5:0)+(F.programmeCatho?3:0)-(s.urb-.3)*12-(F.ecoleObligatoire?3:0)-Math.max(0,y-1950)*.6,0,100);s.church+=(tgt-s.church)*(1-Math.pow(.88,dt));}
  {const tgt=clamp(14+9*ef('ecoles')+(O.eglise4==='etat'?6:0)+(F.ministere?6:0)+(F.ecolesTechniques?4:0)+(F.hec?2:0)+(F.ecoleObligatoire?8:0)+(F.allocations?2:0)+Math.max(0,y-1867)*.24-(F.ministereAboli?3:0),0,95);s.edu+=(tgt-s.edu)*(1-Math.pow(.92,dt));}
  /* l'économie : les cycles américains, la Crise, les guerres */
  const cyc=y<1873?2:y<1879?-6:y<1893?0:y<1897?-5:y<1913?6:y<1914?-2:y<1919?5:y<1921?-4:y<1929?6:y<1933?-16:y<1939?-8:y<1946?8:y<1957?7:2;
  {const tgt=clamp(26+10*ef('industrie')*mE('eco')+4*ef('routes')+{agricole:-4,ressources:8,national:3}[O.eco4]+cyc+s.capital*18+(F.hydroQc?4:0)+(F.embargo?3:0)+(F.caisses?1:0),0,100);s.eco+=(tgt-s.eco)*(1-Math.pow(.75,dt));}
  /* la propriété étrangère de l'industrie */
  {const tgt=clamp(56+{ressources:12,agricole:2,national:-14}[O.eco4]+2*ef('industrie')-(F.hydroQc?8:0)-(F.caisses?2:0)-(F.embargo?2:0)-(F.banqueNationale?2:0)+(F.ungava?4:0),15,95);s.foreign+=(tgt-s.foreign)*(1-Math.pow(.9,dt));}
  /* la colonisation */
  {const nR=Object.keys(s.regions).length;const tgt=clamp(22+14*ef('colon')+nR*3+(O.eco4==='agricole'?10:0)+(F.labelle?5:0)+(F.vautrin?10:0)+(F.creditAgricole?4:0)-(y>1945?10:0),0,100);s.colT+=(tgt-s.colT)*(1-Math.pow(.85,dt));}
  s.press=clamp((58-s.colT)/180,0,.3);
  /* l'urbanisation */
  {const tgt=clamp(pw(URB4,y)+(s.eco-55)*.0012+{agricole:-.01,ressources:.015,national:0}[O.eco4]-(s.colT-62)*.0008,.1,.9);s.urb+=(tgt-s.urb)*(1-Math.pow(.8,dt));}
  /* naissances, décès, départs */
  {const fp=s.pop-s.ang,nz=1+(Math.random()-.5)*.06;
   const br=1.05*pw(BR4,y)*(1+(s.traits.ferveur-75)*.002)*(1-(s.urb-pw(URB4,y))*.6)*(F.allocations?1.03:1);
   const ep=s.mods.epid||0;s.mods.epid=0;
   const dr=pw(DR4,y)*(1-(ef('sante')-.7)*.07)*(F.hygiene?.96:1)*(F.assistance?.98:1)*(F.assuranceHosp?.97:1)+(war&&war.id==='gg1'?.0007:0)+(war&&war.id==='gg2'?.0004:0)+ep;
   const births=Math.round(fp*br*nz*dt),deaths=Math.round(fp*dr*dt);
   const m=clamp(1+(48-s.eco)*.015-(s.colT-62)*.008-(s.urb-pw(URB4,y))*.8+(F.rapatriement?-.06:0)+(O.eco4==='national'?-.04:0)+(s.press*.6),.3,2.4);
   const em=Math.round(fp*pull4(y)*m*dt);
   s.emig+=em;s.emig4+=em;ys.emig+=em;ys.births+=births;ys.deaths+=deaths;
   /* les anglophones et les nouveaux venus */
   const ai=Math.round(imm4(y)*(O.eco4==='ressources'?1.1:1)*dt);
   const ag=Math.round(s.ang*(.0125-(y<1901?.0095:.0035)-ep*.5)*dt);
   s.ang+=ai+ag;ys.arr+=ai;
   s.pop+=births-deaths-em+ai+ag;ys.dep+=em;s.women=Math.round(s.pop*.2);
   /* la diaspora : Franco-Américains et minorités canadiennes */
   const sol=O.minorites==='solidarite';
   s.fram=Math.round(s.fram+em*.9+s.fram*(.014-(y<1920?.011:.019)+(sol?.002:0)+(F.sentinelle?-.002:0))*dt);
   const assim=(.004+(F.manitoba?.002:0)+(F.reglement17&&!F.reg17Abroge?.003:0)+(F.nbSchools?.001:0)+(y>1930?.002:0))*(sol?.7:1);
   s.minor=Math.round(s.minor+em*.08+s.minor*(.018-assim)*dt);
   s.minorVit=clamp(s.minorVit+((sol?.6:-.4)-(F.reglement17&&!F.reg17Abroge?.8:0)-(F.manitoba?.4:0))*dt,0,100);}
  /* le trésor de la province */
  const rev=Math.round(s.pop*revRate4(y)*(.7+s.eco/110)*(s.autonomy>=50?1.06:1)*(F.impotProv?1.15:1)*(F.locationImpots&&!F.impotProv?.92:1)*(F.liqueurs?1.04:1)*dt);
  s.treasury+=rev;s.revT=rev;
  /* l'appui électoral et le nationalisme se calculent groupe par groupe (polity.js) */
  if(F.scandale){polGfx(s,{professions:-6,ouvriers:-5,habitants:-5,clerge:-4,capital:-2,anglos:-3});F.scandale=false;}
  /* l'autonomie provinciale : Ottawa centralise, la province résiste ou cède */
  s.autonomy+=(({cooperation:-.1,autonomie:.45,affirmation:.6}[O.ottawa])+(war?-.4:0)+(F.impotProv?.4:0)+(F.tremblay?.3:0)-(F.locationImpots&&!F.impotProv?.4:0)+(F.vetoQc?.15:0))*dt;
  /* les officiers */
  for(const k of ['gov','eve','mar']){const o=officer4(s,k);let al=0;
    for(const kk in o.like){const w=o.like[kk];if(typeof w==='number')al+=w*((s.budget[kk]||0)-20)/20;else al+=O[kk]===w?1:-.6;}
    s.off[k]=clamp(s.off[k]+clamp(al*3,-6,6)*dt-s.off[k]*.06*dt,-100,100);}
  if(O.ottawa==='affirmation')s.off.gov=clamp(s.off.gov-2*dt,-100,100);
  classTick(s,dt);if(typeof acadTick==='function')acadTick(s,dt);polTick(s,dt);
  /* traits */
  {const TG={
    ferveur:supT(s,'ferveur')+30+s.church*.5+(O.eglise4==='concordat'?6:-8)-Math.max(0,s.urb-.5)*20-Math.max(0,y-1945)*.5,
    alliance:20+['innu','alg','abenaki','agnier','wen'].map(k=>Math.max(0,s.rel[k]||0)).reduce((x,z)=>x+z,0)/5*.3,
    aventure:supT(s,'aventure')+30+s.press*60+pull4(y)*1500+(s.urb-.3)*20,
    roi:supT(s,'roi')+38+{cooperation:10,autonomie:0,affirmation:-12}[O.ottawa]-(F.riel?6:0)-(F.conscription?10:0)-(F.conscription44?4:0)+(war&&O.ottawa==='cooperation'?3:0),
    entraide:supT(s,'entraide')+40+s.church*.08+(F.caisses?5:0)+(F.ucc?3:0)+(O.travail4!=='ordre'?3:0),
    ouverture:supT(s,'ouverture')+18+(O.eglise4==='etat'?10:0)+s.edu*.25+(F.refusGlobal?4:0)+(F.radioCanada?2:0)+(F.television?4:0)};
   const r=1-Math.pow(.965,dt);for(const k in TG)s.traits[k]=clamp(s.traits[k]+(clamp(TG[k],0,100)-s.traits[k])*r,0,100);}
  /* les régions de colonisation et les villes nouvelles */
  for(const R4 of REGIONS4)if(!s.regions[R4.id]&&y>=R4.y&&s.colT>=R4.need*(.9+Math.random()*.2)){s.regions[R4.id]=y;s.places[R4.place]=true;logIt(s,{fr:`Colonisation : on ouvre ${R4.name.fr.replace(/^(Le|La|Les) /,m=>m.toLowerCase())}.`,en:`Settlement: ${R4.name.en} opens up.`},'good');}
  if(y>=1870)s.places.hull=true;if(y>=1876)s.places.stJerome=true;
  if(y>=1899&&s.capital>.45)s.places.shawinigan=true;if(y>=1880)s.places.thetford=true;
  if(y>=1926&&(s.capital>.55||F.alcan))s.places.arvida=true;if(y>=1925&&s.regions.abitibi)s.places.rouyn=true;if(y>=1950&&(F.ungava||s.capital>.7))s.places.septIles=true;
  for(const k of ['lowell','manchesterNH','fallRiver','woonsocket','lewiston'])s.places[k]=s.fram>100000;if(y>=1890)s.places.sudbury=true;
  for(let i=0;i<dt;i++)relDrift(s);
  for(const k of ['compagnie','defense','church','missions','autonomy','eco','edu','patri','support','foreign','colT'])s[k]=clamp(s[k],0,100);
  s.pop=Math.max(0,Math.round(s.pop));s.ang=Math.round(s.ang);s.furs=Math.round(s.eco);ys.furs=s.furs;
}
function enterYear4(s){
  setEnvFor(s);
  for(let yy=s.year;yy<s.year+(turnLen4(s)||1);yy++){const keep=s.year;s.year=yy;deliverWorld(s);s.year=keep;}
  for(const k in s.raided){s.raided[k]--;if(s.raided[k]<=0)delete s.raided[k];}
  for(const k of ['gov','eve','mar']){const o=officer4(s,k);if(o.name!==s.offName[k]){s.offName[k]=o.name;
    s.off[k]=Math.round(s.off[k]*.3);logIt(s,{fr:`${OFF_LAB4[k].fr} : ${o.name}.`,en:`${OFF_LAB4[k].en}: ${o.name}.`},'good');if(s===S&&!window.CALIB)toast({fr:`${OFF_LAB4[k].fr} : ${o.name}.`,en:`${OFF_LAB4[k].en}: ${o.name}.`},'gov',GOV_IMG[o.name]||null);}}
  /* 1879 : le Conseil législatif refuse les crédits, cinq députés passent aux bleus ; Chapleau prend le pouvoir */
  if(s.flags.jolyFall&&s.year>=1879&&s.year<=1880&&govSide4(s)==='rouge'&&s.govSince===1878&&s.support<60){s.flags.jolyFall=false;const t=changeGov4(s,'bleu',R("Le Conseil législatif refuse les crédits ; des députés libéraux changent de camp.","The Legislative Council refuses supply; Liberal members cross the floor."));if(s===S&&!window.CALIB)toast(t,'gov');}
  {const p=premier4(s);if(p.name!==s.premier){s.premier=p.name;const tx={fr:`Premier ministre : ${p.name} (${p.party.fr}).`,en:`Premier: ${p.name} (${p.party.en}).`};logIt(s,tx,'good');if(s===S&&!window.CALIB)toast(tx,'gov',GOV_IMG[p.name]||null);}}
  s.govName=s.premier;
  const w=warAt4(s.year);
  if(w&&!s.warsSeen[w.id]){s.warsSeen[w.id]=true;logIt(s,{fr:`${w.name.fr}.`,en:`${w.name.en}.`},'bad');}
  s.war=w?w.id:null;s.flags.crise=crise4(s.year);s.eng=Math.round(usPop4(s.year));s.us=s.eng;
  s.turn=turnLen4(s);
  s.ys={y:s.year,start:s.pop,arr:0,births:0,dep:0,furs:0,harvest:0,ev:0,emig:0,deaths:0};
  if(ELECT4.includes(s.year)&&s.year>1867&&s.lastElec!==s.year&&!s.ending)s.pending.push('E:elec');
  let histN=0;
  for(const e of EVENTS){if(e.period!==4||e.sys||s.fired[e.id])continue;if(histN>=2&&!e.must){const nom=+((e.id.match(/\d{4}/)||[0])[0]);if(!(nom&&s.year-nom>=2))continue;}
    let ok=false;try{ok=e.cond(s);}catch(err){}if(!ok)continue;s.fired[e.id]=true;
    const p=LIKELY[e.id]?clamp(LIKELY[e.id](s),0,1):1;
    if(Math.random()<p){s.pending.push(e.id);histN++;}else diverge(s,e,p);}
  queueReview(s);
  if(!s.ending){
    const elig=EVENTS.filter(e=>{if(e.period!==4||!e.sys)return false;if((s.sysCount[e.id]||0)>=(e.max||2))return false;
      if((s.year-(s.sysLast[e.id]??-99))<e.cool)return false;try{return e.cond(s);}catch(err){return false;}});
    if(s.pending.length<3&&elig.length&&Math.random()<(s.pending.length?.35:.55)){const wt=e=>{let w=1;try{w=e.w?e.w(s):(e.conseq?3:1);}catch(err){}return Math.max(0,w);};
      const tot=elig.reduce((a,e)=>a+wt(e),0);let r=Math.random()*tot,e=elig[0];for(const x of elig){r-=wt(x);if(r<=0){e=x;break;}}
      s.sysLast[e.id]=s.year;s.sysCount[e.id]=(s.sysCount[e.id]||0)+1;s.pending.push(e.id);}
  }
}
function advance4(){
  if(S.pending.length||S.ending)return;
  S.prev=snap(S);const y0=S.year,dt=S.turn||1;
  processYear4(S);
  if(window.CALIB&&!window.CALIB_REL){S.yearOut=[];S.yearImg=null;S.yearWorld=[];}
  if(!window.CALIB||window.CALIB_REL){writeGazette4(S,dt>1?`${y0}–${y0+dt-1}`:y0);if(!window.CALIB){const busy=S.chron[0]&&S.chron[0].dec&&S.chron[0].dec.length;if(readRel&&!busy)relOpen=0;else toast({fr:`${gazName4(y0).fr} : le numéro de ${y0} est paru.`,en:`${gazName4(y0).en}: the ${y0} issue is out.`},'relation',null,'relation');}}
  S.year+=dt;
  if(!S.ending&&S.year>1960)S.ending=endingFor4(S);
  if(!S.ending)enterYear4(S);
  S.popHist.push([S.year,S.pop]);
  if(!window.CALIB){save();render(true);}
}
/* 1960 : si aucun événement n'a tranché, l'état de la province décide */
function endingFor4(s){const fr=1-s.ang/s.pop;
  if(fr<.7)return 'minorite';
  if(s.edu>=52&&s.church<58&&(s.flags.hydroQc||s.foreign<45)&&s.autonomy>=45)return 'etatModerne';
  if(s.church>=70&&s.edu<48&&s.traits.ouverture<38)return 'noirceur';
  return 'revolutionTranquille';}

/* ---------- les élections : le peuple juge la législature ---------- */
function electionEvent(s){
  const p=premier4(s),o=opposition4(s),side=govSide4(s),sup=Math.round(s.support);const F=fr();
  const hw=HISTWIN4[s.year],hp=hw?leader4(Object.assign({},s,{year:s.year+1}),hw):null;
  const pr=polVote(s,parties4(s));const lead=(pr.v[side]||0)-(pr.v[side==='bleu'?'rouge':'bleu']||0);
  const pollTxt={fr:`On évalue les forces : ${cap1(partyLabel4(s,'bleu').fr)} ${Math.round((pr.v.bleu||0)*100)} %, ${partyLabel4(s,'rouge').fr} ${Math.round((pr.v.rouge||0)*100)} %.`,en:`Estimated strength: ${cap1(partyLabel4(s,'bleu').en)} ${Math.round((pr.v.bleu||0)*100)}%, ${partyLabel4(s,'rouge').en} ${Math.round((pr.v.rouge||0)*100)}%.`};
  const mood=lead>.08?R("Le vent est favorable.","The wind is favourable."):lead>-.03?R("La lutte sera serrée.","It will be a close fight."):R("L'opposition sent la victoire.","The opposition smells victory.");
  /* l'issue : votre appui, la campagne, l'usure du pouvoir, et le « vent de l'époque » (ce qui a fait gagner tel camp dans l'histoire) */
  const tot=y=>y<1912?65:y<1931?81:y<1944?90:92;
  const res=(s2,bonus,gb)=>{const g0=govSide4(s2);const tide={};if(hw)tide[hw]=3;const bon=Object.assign({},tide);bon[g0]=(bon[g0]||0)+bonus*.5;
    /* être du même camp qu'Ottawa coûte cher quand Ottawa vient de blesser le Québec : c'est dans les affinités des groupes (polity.js) */
    const r=polVote(s2,parties4(s2),{bonus:bon,gbonus:gb||{},noise:3});s2.lastVote=r;r.y=s2.year;const T=tot(s2.year);
    const other=g0==='bleu'?'rouge':'bleu';const sg=Math.round((r.seats[g0]||0)*T),so=T-sg;s2.lastElec=s2.year;const win=sg>so;const out=[];
    const line=`${cap1(L(partyLabel4(s2,'bleu')))} ${Math.round((r.v.bleu||0)*100)} % (${g0==='bleu'?sg:so}) · ${cap1(L(partyLabel4(s2,'rouge')))} ${Math.round((r.v.rouge||0)*100)} % (${g0==='rouge'?sg:so})`;
    if(win){s2.mandat=clamp(.8+sg/T*.45,.8,1.2);
      out.push(F?`${premier4(s2).name} est reporté au pouvoir : ${sg} sièges sur ${T}. ${sg>T*.7?'Un raz-de-marée : les mains sont libres.':'Une majorité suffisante pour gouverner.'} ${line}.`:`${premier4(s2).name} is returned to power: ${sg} of ${T} seats. ${sg>T*.7?'A landslide: hands are free.':'A working majority.'} ${line}.`);}
    else{const ns=other;const loser=premier4(s2).name;const tx=changeGov4(s2,ns);const np=premier4(s2);
      out.push(F?`Défaite : ${loser} n'obtient que ${sg} sièges sur ${T}. ${line}. ${np.name} (${np.party.fr}) forme le gouvernement. Vous restez la volonté politique de la province, mais c'est désormais par lui qu'elle passe : l'Église, Ottawa et le capital le jugent à neuf.`:`Defeat: ${loser} wins only ${sg} of ${T} seats. ${line}. ${np.name} (${np.party.en}) forms the government. You remain the province's political will, but it now passes through him: the Church, Ottawa and capital judge him anew.`);}
    out.push(polVoteStory(s2,r));
    /* écart avec l'histoire */
    if(hw&&govSide4(s2)!==hw&&s2===S){S.divergences=S.divergences||[];S.divergences.push({y:s2.year,id:'elec'+s2.year,title:R(`Les élections de ${s2.year}`,`The ${s2.year} election`),
      text:{fr:`Élections de ${s2.year} : ${premier4(s2).name} gouverne. Dans l'histoire, c'est ${hp?hp.name:'l’autre camp'} qui l'emporte.`,en:`${s2.year} election: ${premier4(s2).name} governs. In history, ${hp?hp.name:'the other side'} won.`}});}
    return {fr:out.join(' '),en:out.join(' ')};};
  const fitNat=side==='bleu'&&s.year>=1935||side==='rouge'&&s.year>=1885&&s.year<1892;
  const fitOrdre=side==='bleu'?3:-2;
  const histLine=hw?(F?` Dans l'histoire, ${hp.name} (${hw==='bleu'?'bleu':'rouge'}) gagne cette élection.`:` In history, ${hp.name} (${hw==='bleu'?'Conservative/UN':'Liberal'}) wins this election.`):'';
  return {id:'E:elec',routine:true,elec:true,place:'quebec',title:R(`Les élections de ${s.year}`,`The ${s.year} election`),
   text:{fr:`La législature tire à sa fin. ${p.name} (${p.party.fr}) sollicite un nouveau mandat contre ${o.name} (${o.party.fr}). ${pollTxt.fr} ${mood.fr} Si vous perdez, c'est ${o.name} qui gouvernera, avec ses alliés et ses ennemis. Sur quoi faire campagne ?${histLine}`,
         en:`The legislature is ending. ${p.name} (${p.party.en}) seeks a new mandate against ${o.name} (${o.party.en}). ${pollTxt.en} ${mood.en} If you lose, ${o.name} will govern, with his own allies and enemies. What should the campaign be about?${histLine}`},
   choices:[
    {label:R('Le bilan : routes, ponts, écoles de rang','The record: roads, bridges, country schools'),desc:R('Parle aux campagnes et aux villes de compagnie.','Speaks to the countryside and the company towns.'),fx:s2=>{const g=govSide4(s2);return res(s2,2+Math.min(3,Math.max(0,(s2.eco-45)*.1)),{habitants:{[g]:2},ouvriers:{[g]:1}});}},
    {label:R('Des promesses dans chaque comté (le patronage)','Promises in every riding (patronage)'),fx:s2=>{s2.treasury=Math.round(s2.treasury*.85);s2.flags.patronage=(s2.flags.patronage||0)+1;const g=govSide4(s2);return res(s2,5-Math.min(4,(s2.flags.patronage-1)*1.5),{habitants:{[g]:2},professions:{[g]:-1}});}},
    {label:R('La nation : nos droits face à Ottawa','The nation: our rights against Ottawa'),desc:R('Mobilise la petite bourgeoisie et le clergé ; inquiète les anglophones et le capital.','Mobilizes the petty bourgeoisie and the clergy; worries anglophones and capital.'),fx:s2=>{s2.patri+=4;s2.off.gov-=8;const g=govSide4(s2);return res(s2,(fitNat?2:0),{professions:{[g]:5},clerge:{[g]:2},habitants:{[g]:1},anglos:{[g]:-5},capital:{[g]:-4}});}},
    {label:R("L'ordre, la religion, la famille","Order, religion, family"),desc:R('Le clergé et les campagnes applaudissent ; les ouvriers et les libéraux décrochent.','The clergy and the countryside applaud; workers and liberals drift away.'),fx:s2=>{s2.off.eve+=8;traitAdd(s2,'ferveur',1);const g=govSide4(s2);return res(s2,fitOrdre*.5,{clerge:{[g]:6},habitants:{[g]:2},ouvriers:{[g]:-2},professions:{[g]:-1}});}}]};
}

/* ---------- la presse : le résumé de l'époque change de forme ---------- */
function gazName4(y){y=parseInt(y);return y<1884?R('La Minerve','La Minerve'):y<1910?R('La Presse','La Presse'):R('Le Devoir','Le Devoir');}
function writeGazette4(s,y){
  const yn=parseInt(y),ys=s.ys,items=[];const N=n=>nf(n,'fr'),NE=n=>nf(n,'en');
  const add=(h,f,e)=>items.push({h,fr:f,en:e});
  for(const x of (s.yearOut||[]).filter(x=>L(x.r)).slice(0,3))add(x.t,x.r.fr,x.r.en);
  const fp=s.pop-s.ang,frs=fp/s.pop;
  add(R('La population','Population'),`La province compte ${N(s.pop)} habitants, dont ${Math.round(frs*100)} % de langue française ; ${Math.round(s.urb*100)} % vivent en ville. ${ys.births?`On a enregistré ${N(ys.births)} naissances${dtTxt(s)}.`:''}`,`The province counts ${NE(s.pop)} people, ${Math.round(frs*100)}% French-speaking; ${Math.round(s.urb*100)}% live in towns. ${ys.births?`${NE(ys.births)} births were recorded${dtTxtE(s)}.`:''}`);
  if(ys.emig>2000)add(R('Les départs','Departures'),`${N(ys.emig)} des nôtres sont partis pour les « États », surtout vers les filatures de Lowell, Manchester et Fall River.`,`${NE(ys.emig)} of our people left for 'the States', mostly for the mills of Lowell, Manchester and Fall River.`);
  if(s.cls){if(clsG(s,'ouvriers')>=55)add(R('Les quartiers ouvriers','Working-class districts'),'À Saint-Henri et dans les villes de compagnie, on parle de salaires de famine, de taudis et de mortalité infantile.','In Saint-Henri and the company towns, people talk of starvation wages, slums and infant mortality.');
    if(clsG(s,'habitants')>=55)add(R('Les campagnes','The countryside'),'Les cultivateurs réclament du crédit, des routes et des prix justes ; les fils s’en vont.','Farmers demand credit, roads and fair prices; their sons are leaving.');
    if(clsG(s,'professions')>=50)add(R('Notre infériorité économique','Our economic inferiority'),`Les grandes compagnies appartiennent à d'autres ; nos diplômés sont commis, nos ouvriers « porteurs d'eau ».`,`The big companies belong to others; our graduates are clerks, our workers 'hewers of wood and drawers of water'.`);}
  if(s.flags.crise)add(R('La Crise','The Depression'),'Les soupes populaires débordent ; le « secours direct » ne suffit pas.','The soup kitchens are overflowing; direct relief is not enough.');
  const wl=(s.yearWorld||[]).map(i=>WORLD[i]).filter(Boolean);for(const w of wl.slice(0,2))add(w.t,w.x.fr,w.x.en);
  s.chron=s.chron||[];
  s.chron.unshift({y,p3:true,p4:true,gaz:gazName4(y),items,fr:items.map(i=>i.fr).join(' '),en:items.map(i=>i.en).join(' '),pop:s.pop,ang:s.ang,emig:ys.emig,arr:ys.arr,births:ys.births,deaths:ys.deaths,urb:s.urb,hist:Math.round(histPop(yn+.99)),gov:s.premier,img:s.yearImg||'relations',world:(s.yearWorld||[]).slice(),rel:Object.assign({},s.rel),dec:(s.yearOut||[]).map(x=>x.t)});
  s.yearImg=null;s.yearOut=[];s.yearWorld=[];if(s.chron.length>60)s.chron.length=60;
}

/* ---------- repères de population (recensements du Québec) ---------- */
HIST_POP.push([1871,1191516],[1881,1359027],[1891,1488535],[1901,1648898],[1911,2005776],[1921,2360510],[1931,2874662],[1941,3331882],[1951,4055681],[1956,4628378],[1961,5259211]);
HIST_SOURCES.push(...[[1871,1191516],[1881,1359027],[1891,1488535],[1901,1648898],[1911,2005776],[1921,2360510],[1931,2874662],[1941,3331882],[1951,4055681],[1956,4628378]].map(([y,v])=>({y,v,src:'Recensements du Canada (Statistique Canada)'})));
HIST_POP.sort((a,b)=>a[0]-b[0]);
