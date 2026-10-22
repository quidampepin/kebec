/* Kebec — Crédits et sources. */
let creditsOpen=false;
const BIBLIO=[
 {s:R('Nouvelle-France et premiers contacts','New France and early contact'),w:[
  'Marcel Trudel, <i>Histoire de la Nouvelle-France</i>, Fides, 1963–1999 ; <i>La population du Canada en 1663</i>, Fides, 1973.',
  'Louise Dechêne, <i>Habitants et marchands de Montréal au XVII<sup>e</sup> siècle</i>, Plon, 1974.',
  'Denys Delâge, <i>Le pays renversé : Amérindiens et Européens en Amérique du Nord-Est, 1600–1664</i>, Boréal, 1985.',
  'Bruce G. Trigger, <i>The Children of Aataentsic: A History of the Huron People to 1660</i>, McGill-Queen’s, 1976.',
  'Richard White, <i>The Middle Ground: Indians, Empires, and Republics in the Great Lakes Region, 1650–1815</i>, Cambridge, 1991.',
  'Gilles Havard et Cécile Vidal, <i>Histoire de l’Amérique française</i>, Flammarion, 2003.']},
 {s:R('Société, économie et classes sociales','Society, economy and social classes'),w:[
  'Stanley B. Ryerson, <i>Unequal Union: Confederation and the Roots of Conflict in the Canadas, 1815–1873</i>, 1968 (trad. <i>Le capitalisme et la Confédération</i>, Parti pris, 1972).',
  'Gilles Bourque, <i>Classes sociales et question nationale au Québec, 1760–1840</i>, Parti pris, 1970.',
  'Fernand Ouellet, <i>Histoire économique et sociale du Québec, 1760–1850</i>, Fides, 1966.',
  'Allan Greer, <i>Peasant, Lord, and Merchant: Rural Society in Three Quebec Parishes, 1740–1840</i>, University of Toronto Press, 1985.',
  'Allan Greer, <i>The Patriots and the People: The Rebellion of 1837 in Rural Lower Canada</i>, University of Toronto Press, 1993.',
  'Gérald Bernier et Daniel Salée, <i>The Shaping of Québec Politics and Society: Colonialism, Power, and the Transition to Capitalism in the 19th Century</i>, Crane Russak, 1992.',
  'John A. Dickinson et Brian Young, <i>Brève histoire socio-économique du Québec</i>, Septentrion.']},
 {s:R('La Confédération, l’exode et l’industrie (1867–1960)','Confederation, exodus and industry (1867–1960)'),w:[
  'Jean Hamelin et Yves Roby, <i>Histoire économique du Québec, 1851–1896</i>, Fides, 1971.',
  'Yves Roby, <i>Les Franco-Américains de la Nouvelle-Angleterre : rêves et réalités</i>, Septentrion, 2000.',
  'Gérard Bouchard, <i>Quelques arpents d’Amérique : population, économie, famille au Saguenay, 1838–1971</i>, Boréal, 1996.',
  'Terry Copp, <i>The Anatomy of Poverty: The Condition of the Working Class in Montreal, 1897–1929</i>, McClelland & Stewart, 1974.',
  'Jacques Rouillard, <i>Le syndicalisme québécois : deux siècles d’histoire</i>, Boréal, 2004.',
  'Paul-André Linteau, <i>Histoire de Montréal depuis la Confédération</i>, Boréal, 1992.',
  'Susan Mann, <i>The Dream of Nation: A Social and Intellectual History of Quebec</i>, McGill-Queen’s, 1982 (rééd. 2002).',
  'Pierre Elliott Trudeau (dir.), <i>La grève de l’amiante</i>, Cité libre, 1956.',
  'Robert Rumilly, <i>Histoire de la province de Québec</i>, 41 vol., 1940–1969 (pour la chronique politique, à lire avec recul).']},
 {s:R('Le Québec moderne (1960–2000)','Modern Quebec (1960–2000)'),w:[
  'Paul-André Linteau, René Durocher, Jean-Claude Robert et François Ricard, <i>Histoire du Québec contemporain, t. II : Le Québec depuis 1930</i>, Boréal, 1989.',
  'Kenneth McRoberts, <i>Quebec: Social Change and Political Crisis</i>, McClelland & Stewart, 1988.',
  'Marc V. Levine, <i>The Reconquest of Montreal: Language Policy and Social Change in a Bilingual City</i>, Temple University Press, 1990.',
  'Pierre Godin, <i>René Lévesque</i>, 4 vol., Boréal, 1994–2005.',
  'Boyce Richardson, <i>Strangers Devour the Land</i>, Knopf, 1976 (la Baie-James et les Cris).',
  'Andrew Cohen, <i>A Deal Undone: The Making and Breaking of the Meech Lake Accord</i>, Douglas & McIntyre, 1990.',
  'Chantal Hébert et Jean Lapierre, <i>Confessions post-référendaires</i>, Éditions de l’Homme, 2014.',
  'Institut de la statistique du Québec, séries démographiques (naissances, migrations, langue maternelle), 1961–2001 ; Directeur général des élections du Québec, résultats des élections et des référendums de 1980 et 1995.']},
 {s:R('Synthèses','General histories'),w:[
  'Paul-André Linteau, René Durocher et Jean-Claude Robert, <i>Histoire du Québec contemporain</i>, Boréal, 1979.',
  'Jacques Lacoursière, <i>Histoire populaire du Québec</i>, Septentrion.',
  'Yves Frenette, <i>Brève histoire des Canadiens français</i>, Boréal, 1998.']},
 {s:R('Données et ouvrages de référence','Data and reference works'),w:[
  'Statistique Canada, recensements du Canada, 1665 à 2001 (séries historiques).',
  'Programme de recherche en démographie historique (PRDH), Université de Montréal.',
  '<i>Atlas historique du Canada</i>, University of Toronto Press / Presses de l’Université de Montréal.',
  '<i>Dictionnaire biographique du Canada</i> ; <i>L’Encyclopédie canadienne</i>.',
  'U.S. Census Bureau, <i>Historical Statistics of the United States</i> (populations des colonies anglaises).']}];
function creditsHTML(){
  const F=fr();
  let h=`<div class="letter help credits-page"><div class="body"><h2>${F?'Crédits et sources':'Credits and sources'}</h2>
  <h3>Kebec</h3><p>${F?'Conception et direction : David Pépin. Écriture, recherche et programmation : David Pépin avec Claude (Anthropic).':'Design and direction: David Pépin. Writing, research and programming: David Pépin with Claude (Anthropic).'}</p>
  <h3>${F?'Une lecture de l’histoire':'A reading of history'}</h3>
  <p>${F?"Le monde suit son cours, mais il n’est pas fait que de chefs et de batailles. La simulation s’inspire de l’histoire sociale et matérialiste : la manière dont un pays produit sa richesse (la traite des fourrures, la seigneurie, puis le capitalisme marchand et industriel), la façon dont cette richesse se partage entre les groupes sociaux, et les tensions qui en naissent, pèsent sur le cours des événements autant que les décisions politiques. Les mentalités (la ferveur, la loyauté, l’entraide) suivent, avec retard, les conditions matérielles. Cette approche doit beaucoup à l’historiographie marxiste (Ryerson, Bourque) et à l’histoire sociale québécoise (Dechêne, Greer, Delâge), et elle se mesure aux lectures plus libérales ou nationales (Ouellet, Trudel, Lacoursière).":"The world follows its course, but it is not made only of leaders and battles. The simulation draws on social and materialist history: the way a country produces its wealth (the fur trade, the seigneury, then merchant and industrial capitalism), how that wealth is shared among social groups, and the tensions that arise from it weigh on the course of events as much as political decisions. Mentalities (fervour, loyalty, mutual aid) follow material conditions, with a lag. This approach owes much to Marxist historiography (Ryerson, Bourque) and to Quebec social history (Dechêne, Greer, Delâge), and it is tested against more liberal or national readings (Ouellet, Trudel, Lacoursière)."}</p>
  <p>${F?"Les événements datés suivent l’histoire ; les événements hypothétiques sont des fictions plausibles, signalées comme telles. En faisant tous les choix historiques, la population reste à environ 10 % des recensements.":"Dated events follow history; hypothetical events are plausible fictions, marked as such. Making every historical choice keeps the population within about 10% of the censuses."}</p>
  <h3>${F?'Ouvrages':'Works'}</h3>`;
  for(const b of BIBLIO)h+=`<h4>${L(b.s)}</h4><ul class="biblio">${b.w.map(x=>`<li>${x}</li>`).join('')}</ul>`;
  h+=`<h3>${F?'Carte':'Map'}</h3><p>${F?'Traits de côte, lacs, rivières et relief : Natural Earth (domaine public), projetés et peints pour le jeu. Contours des territoires autochtones : approximations d’après l’<i>Atlas historique du Canada</i>.':'Coastlines, lakes, rivers and relief: Natural Earth (public domain), projected and painted for the game. Indigenous territory outlines: approximations after the <i>Historical Atlas of Canada</i>.'}</p>
  <h3>${F?'Sons':'Sound'}</h3><p>${F?'Tous les sons et la musique sont synthétisés en direct dans le navigateur (Web Audio) : aucun enregistrement.':'All sounds and music are synthesized live in the browser (Web Audio): no recordings.'}</p>
  <h3>${F?'Polices':'Typefaces'}</h3><p>IM Fell English, EB Garamond, Cormorant Garamond, Libre Caslon, Playfair Display, Alegreya Sans, Inter — Google Fonts (SIL Open Font License).</p>
  <h3>${F?'Illustrations':'Illustrations'}</h3><p class="quiet">${F?'Toutes du domaine public, via Wikimedia Commons. Cliquez pour voir la source.':'All public domain, via Wikimedia Commons. Click to see the source.'}</p>
  <ul class="credits">${Object.keys(IMG).map(k=>`<li><a href="${commonsUrl(k)}" target="_blank" rel="noopener">${L(IMG[k].c)}</a></li>`).join('')}</ul>
  <div class="acts"><button class="cta" data-act="closecredits">${u('close')}</button></div></div></div>`;
  return h;}
function renderCredits(){const el=$('help');if(!creditsOpen){if(!helpOpen)el.hidden=true;return;}el.hidden=false;el.innerHTML=creditsHTML();el.scrollTop=0;}
