/* 모아두는 · 기록의 마을 — plain JS, no build server. Tistory-skin friendly. */
(function(){
'use strict';
/* mobile sidebar toggle on normal pages */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.tw-menu-btn'); if(b) document.body.classList.toggle('tw-side-open');});
/* ---------------- 귀신의 집 분위기 (20261122p11, p12: +나폴리탄, p13: 모바일 글자 선명): horror posts + category lists get a shrine-at-night frame ---------------- */
(function(){
  if(document.body.id==='tt-body-index') return;
  var ROOT='귀신의 집', re=/^\s*(귀신의 집|나폴리탄)(\s*\/|\s*$)/, hit=false;
  try{ var ei=window.T&&window.T.entryInfo; if(ei&&ei.categoryLabel&&re.test(ei.categoryLabel)) hit=true; }catch(e){}
  if(!hit){ var c=document.querySelector('.tw-article .tw-cat'); if(c&&re.test(c.textContent)) hit=true; }
  if(!hit){ var l=document.querySelector('.tw-list[data-cat-title]'); if(l&&re.test(l.getAttribute('data-cat-title')||'')) hit=true; }
  if(!hit){ var p=''; try{ p=decodeURIComponent(location.pathname); }catch(e){ p=location.pathname; } if(/^\/category\/(귀신의 집|나폴리탄)(\/|$)/.test(p)) hit=true; }
  if(!hit) return;
  var A=(window.TOWN_ASSET||'https://cdn.jsdelivr.net/gh/kimleeyeol1-gif/yeollo-blog-images@main/skin/'), V='?v=20261122p11';
  var BG='url("'+A+'horror_bg_p11.jpg'+V+'")', TAL='url("'+A+'horror_talisman_p11.webp'+V+'")';
  var css=[
  'html.tw-horror{background:#0b0807!important}html.tw-horror body{background:transparent!important}',
  'html.tw-horror body{color:#2a1c16}',
  /* the painted shrine hall, fixed behind everything (pseudo-fixed layer so it also works on iOS) */
  '.hr-bg{position:fixed;inset:0;z-index:-3;background:#0b0807 '+BG+' center 30%/cover no-repeat;filter:saturate(.85) brightness(.82)}',
  '.hr-bg::after{content:"";position:absolute;inset:0;background:radial-gradient(60% 75% at 50% 45%,rgba(8,6,5,.15),rgba(8,6,5,.55) 70%,rgba(4,3,3,.9) 100%)}',
  '.hr-mist{position:fixed;left:-20%;right:-20%;bottom:-10%;height:60%;z-index:-2;pointer-events:none;opacity:.55;',
  '  background:radial-gradient(40% 35% at 25% 70%,rgba(150,165,165,.22),transparent 70%),radial-gradient(35% 30% at 70% 80%,rgba(140,155,160,.2),transparent 70%),radial-gradient(50% 30% at 50% 100%,rgba(120,135,140,.25),transparent 75%);',
  '  filter:blur(8px);animation:hrMist 38s ease-in-out infinite alternate}',
  '.hr-mist.b{opacity:.35;animation-duration:53s;animation-direction:alternate-reverse;bottom:-20%}',
  '@keyframes hrMist{0%{transform:translate3d(-6%,0,0) scale(1)}100%{transform:translate3d(6%,-3%,0) scale(1.08)}}',
  /* candle glow at the lower corners, breathing + the odd stutter */
  '.hr-glow{position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(22% 30% at 4% 88%,rgba(255,150,60,.20),transparent 70%),radial-gradient(18% 26% at 93% 84%,rgba(255,140,55,.16),transparent 70%);animation:hrFlick 7s steps(1,end) infinite}',
  '@keyframes hrFlick{0%{opacity:1}12%{opacity:.82}14%{opacity:1}47%{opacity:.9}49%{opacity:.55}50%{opacity:1}73%{opacity:.86}86%{opacity:.6}87%{opacity:.95}100%{opacity:1}}',
  '.hr-vig{position:fixed;inset:0;z-index:30;pointer-events:none;box-shadow:inset 0 0 160px 40px rgba(0,0,0,.75)}',
  /* a pale shape that is sometimes, briefly, at the left edge */
  '.hr-shade{position:fixed;left:-30px;bottom:6vh;width:150px;height:62vh;z-index:-1;pointer-events:none;opacity:0;',
  '  background:radial-gradient(28% 9% at 50% 9%,rgba(210,215,215,.55),transparent 70%),radial-gradient(30% 44% at 50% 30%,rgba(10,10,12,.9),transparent 72%),radial-gradient(40% 60% at 50% 62%,rgba(200,205,205,.28),transparent 70%);',
  '  filter:blur(3px);animation:hrShade 41s linear infinite}',
  '@keyframes hrShade{0%,71%{opacity:0;transform:translateX(-30px)}74%{opacity:.55;transform:translateX(0)}78%{opacity:.5}80%{opacity:0;transform:translateX(-12px)}100%{opacity:0}}',
  /* talismans pasted on the outer walls (wide screens) */
  '.hr-tal{position:fixed;z-index:-1;pointer-events:none;width:92px;height:174px;background:'+TAL+' center/100% 100% no-repeat;filter:drop-shadow(0 4px 6px rgba(0,0,0,.7)) brightness(.78) sepia(.2);opacity:.9}',
  '.hr-tal.t1{left:2.2%;top:16%;transform:rotate(-7deg)}.hr-tal.t2{left:7.5%;top:46%;transform:rotate(4deg) scale(.85)}.hr-tal.t3{right:2.5%;top:22%;transform:rotate(6deg) scale(.95)}.hr-tal.t4{right:7%;top:58%;transform:rotate(-5deg) scale(.8)}',
  '@media (max-width:1500px){.hr-tal.t2,.hr-tal.t4{display:none}}@media (max-width:1300px){.hr-tal{display:none}}',
  /* header: black lacquer and red cord */
  'html.tw-horror .tw-header{background:linear-gradient(180deg,rgba(22,14,12,.96),rgba(14,9,8,.93));box-shadow:0 1px 0 rgba(150,30,22,.8),0 6px 18px rgba(0,0,0,.6)}',
  'html.tw-horror .tw-logo-title{color:#e8d6b0;text-shadow:0 0 12px rgba(180,40,30,.35)}html.tw-horror .tw-logo-sub{color:#a3261b}',
  'html.tw-horror .tw-pill{background:linear-gradient(180deg,#5a1a14,#3a0f0b);border-color:#7a1d14;color:#f1e2c2;box-shadow:inset 0 1px 0 rgba(255,200,170,.15),0 0 0 2px rgba(20,12,10,.9),0 0 0 3px #6e1a12;text-shadow:none}',
  'html.tw-horror .tw-pill.ghost{background:rgba(30,20,17,.85);color:#e2d2b0;border-color:rgba(160,60,40,.55)}',
  /* panels: old, stained hanji — still light enough for the posts\' inline #222 text */
  'html.tw-horror .tw-panel{background:',
  '  radial-gradient(90px 70px at 92% 6%,rgba(120,70,30,.16),transparent 70%),radial-gradient(140px 110px at 6% 96%,rgba(110,60,25,.18),transparent 70%),radial-gradient(70px 50px at 80% 70%,rgba(140,40,30,.07),transparent 70%),',
  '  url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'220\' height=\'220\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 .4 0 0 0 0 .28 0 0 0 0 .15 0 0 0 .09 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>"),',
  '  radial-gradient(120% 90% at 50% 20%,#f3ead3 0%,#ebdfc1 62%,#d9c79f 100%);',
  '  box-shadow:inset 0 0 0 1px rgba(120,40,28,.55),inset 0 0 0 5px rgba(240,230,205,.35),inset 0 0 0 6px rgba(140,30,22,.35),inset 0 0 60px rgba(90,55,25,.28),0 0 0 1.5px #3a1a12,0 14px 40px rgba(0,0,0,.75),0 0 60px rgba(120,20,12,.18)}',
  'html.tw-horror .tw-panel .cn{filter:sepia(.6) hue-rotate(-25deg) saturate(1.6) brightness(.7)}',
  'html.tw-horror .tw-article{overflow:visible}',
  'html.tw-horror .tw-article::before,html.tw-horror .tw-article::after{content:"";position:absolute;top:-26px;width:58px;height:110px;background:'+TAL+' center/100% 100% no-repeat;filter:drop-shadow(0 3px 4px rgba(0,0,0,.55));pointer-events:none;z-index:2}',
  'html.tw-horror .tw-article::before{left:-14px;transform:rotate(-9deg)}html.tw-horror .tw-article::after{right:-12px;transform:rotate(7deg) scaleX(-1)}',
  'html.tw-horror .tw-title,html.tw-horror .tw-list-head h2{color:#4a1410}',
  'html.tw-horror .tw-kicker{color:#8e1f16!important}',
  'html.tw-horror .tw-cat{background:linear-gradient(180deg,#7a1d14,#4a0f0a);color:#f3e3c0!important;box-shadow:0 0 0 1px #2a0a07,0 0 10px rgba(140,20,12,.35);letter-spacing:.04em}',
  'html.tw-horror .tw-category a{color:#3a2418}html.tw-horror .tw-category a:hover{color:#9e2418}',
  'html.tw-horror .tw-article-head{border-bottom-color:rgba(140,30,22,.45)}',
  'html.tw-horror .tw-article-head::after{content:"封";background:#ece1c4;color:#9e2418;font-family:serif;font-weight:700}',
  'html.tw-horror a{color:#8e1f16}',
  'html.tw-horror .tw-item{border-bottom-color:rgba(120,40,28,.3)}',
  'html.tw-horror .tw-item-link:hover{background:rgba(150,30,22,.08)}',
  'html.tw-horror .tw-item-title{color:#2b1510}',
  'html.tw-horror .tw-footer{background:rgba(10,7,6,.85);color:#b9a585;border-top-color:rgba(140,30,22,.6)}html.tw-horror .tw-footer a{color:#d8c39a}',
  '@media (max-width:900px){html.tw-horror .tw-article::before,html.tw-horror .tw-article::after{width:40px;height:76px;top:-18px}.hr-vig{box-shadow:inset 0 0 90px 20px rgba(0,0,0,.7)}}',
  /* p13: phones/tablets — nothing may sit on top of the text column. Vignette goes behind the (opaque) panels,
     the panel loses its inner edge shading, side glows/apparition are toned down or hidden, talismans stay inside the screen. */
  '@media (max-width:900px){',
  '  html.tw-horror,html.tw-horror body{overflow-x:hidden}@supports (overflow:clip){html.tw-horror,html.tw-horror body{overflow-x:clip}}',
  '  .hr-vig{z-index:-1;box-shadow:inset 0 0 70px 6px rgba(0,0,0,.55)}',
  '  .hr-glow{opacity:.6;animation:none}.hr-shade{display:none}.hr-mist{filter:none;opacity:.35}.hr-mist.b{display:none}',
  '  html.tw-horror .tw-panel{box-shadow:inset 0 0 0 1px rgba(120,40,28,.55),inset 0 0 0 4px rgba(240,230,205,.35),inset 0 0 0 5px rgba(140,30,22,.3),0 0 0 1.5px #3a1a12,0 8px 22px rgba(0,0,0,.6)}',
  '  html.tw-horror .tw-article::before{left:-6px}html.tw-horror .tw-article::after{right:-6px}',
  '}',
  '@media (prefers-reduced-motion:reduce){.hr-mist,.hr-glow,.hr-shade{animation:none!important}.hr-shade{display:none}}'
  ].join('\n');
  var st=document.createElement('style'); st.id='hr-style'; st.textContent=css; document.head.appendChild(st);
  document.documentElement.classList.add('tw-horror'); document.body.classList.add('tw-horror');
  var f=document.createDocumentFragment();
  ['hr-bg','hr-mist','hr-mist b','hr-glow','hr-shade','hr-tal t1','hr-tal t2','hr-tal t3','hr-tal t4','hr-vig'].forEach(function(k){ var d=document.createElement('div'); d.className=k; d.setAttribute('aria-hidden','true'); f.appendChild(d); });
  document.body.insertBefore(f,document.body.firstChild);
})();
if(document.body.id!=='tt-body-index'||!document.getElementById('world')) return;
document.documentElement.classList.add('tw-town-on');
function rnd(a,b){return a+Math.random()*(b-a);}
var CFG=window.TOWN_CONFIG||{};
var S=1.5, WW=1920, WH=1560;                       // art authored in 1280x720, drawn at 1920x1080
var ASSET=window.TOWN_ASSET||(document.currentScript&&document.currentScript.src||'').replace(/town[^\/]*\.js.*$/,'')||'./images/';
var AV='?v=20261122p11';   // cache-busting for re-uploaded images (hero.png etc.)
var CM={"hero":{"cw":157,"ch":263,"sc":2,"h":120,"rows":{"down":{"r":0,"n":7},"up":{"r":1,"n":7},"left":{"r":2,"n":9},"right":{"r":3,"n":9},"dl":{"r":4,"n":7},"dr":{"r":5,"n":7},"ul":{"r":6,"n":7},"ur":{"r":7,"n":7}},"stride":41.5},"npc":{"bard":{"cw":166,"ch":240,"sc":2,"h":110,"rows":{"idle":{"r":0,"n":2}}},"granny":{"cw":144,"ch":204,"sc":2,"h":92,"rows":{"idle":{"r":0,"n":2}}},"cat":{"cw":99,"ch":120,"sc":2,"h":50,"rows":{"idle":{"r":0,"n":2}}},"mailboy":{"cw":148,"ch":238,"sc":2,"h":108,"rows":{"idle":{"r":0,"n":2},"down":{"r":1,"n":7},"up":{"r":2,"n":7},"left":{"r":3,"n":7}}},"witch":{"cw":168,"ch":256,"sc":2,"h":118,"rows":{"idle":{"r":0,"n":2}}}}};
var OD={"cell":10,"gw":192,"gh":156,"walk":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAA/gAAAAAAAAAAAAAAAAAAAAAAAB+AAAAA/gAAAAAAAAAAAAAAAAAAAAAAAB+AAAAA/gAAAAAAAAAAAAAAAAAAAAAAAB/AAAAA/gAAAAAAAAAAAAAAAAAAAAAAAB/AAAAB/gAAAAAAAAAAAAAAAAAAAAAAAB/AAAAB/gAAAAAAAAAAAAAAAAAAAAAAAB/AAAAB/gAAAAAAAAAAAAAAAAAAAAAAAB/gAAAB/gAAAAAAAAAAAAAAAAAAAAAAAB/gAAAB/gAAAAAAAAAAAAAAAAAAAAAAAB/gAAAB/gAAAAAAAAAAAAAAAAAAAAAAAB/gAAAB/gAAAAAAAAAAAAAAAAAAAAAAAD/gAAAB/gAAAAAAAAAAAAAAAAAAAAAAAD/gAAAB/+AAAAAAAAAAAAAAAAAAAAAAAD/gAAAB//AAAAAAAAAAAAAAAAAAAAAAAD/wAAAB//gAAAAAAAAAAAAAAAAAAAAAAD/wAAAB//wAAAAAAAAAAAAAAAAAAAAAAD/gAAAD//4AAAAAAAAAAAAAAAAAAAAP///gAAAH///AAAAAAAAAAAAAAAAAAAAP///gAAAH///gAAAAAAAAAAAAAAAAAAAf///gAAAP///wAAAAAAAAAAAAAAAAAAA////gA/8B///4AAAAAAAAAAAAAAAAAAA////g///+///4AAAAAAAAAAAAAAAAAAB///8P////////8AAAAAAAAAAAAAAAAf////h/////////4AAAAAAAAAAAAAAAAf///8P/////////4AAAAAAAAAAAAAAAAf///x//////////wAPAAAAAAAAAAAAAAH///H//////////gD8AAAAAAAAAAAAAAAf/+f/////////+Af4AAAAAAAAAAAAAAAH//////8P////4D/wAAAAAAAAAAAAAAB///////4H///////gAAAAAAAAAAAAAAP///////4H///////AAAAAAAAAAAAAAB///////+AAf/////8AAAAAAAAAAAAAAA///////gAAB/////8AAAAAAAAAAAAAAAf/////8AAAAf////+AAAAAAAAAAAAAAAf/////4AAAAH/////AAAAAAAAAAAAAAAP8H/4/gAAAAD/////AAAAAAAAAAAAAAAPAH+ADAAAAAB/////AAAAAAAAAAAAAAAAAH4AAAAAAAA/////AAAAAAAAAAAAAAAAAHwAAAAAAAAf////AAAAAAAAAAAAAAAAAHwAAAAAAAAf////8AAAAAAAAAAAAAAAAHwAAAAAAAAf/////AAAAAAAAAAAAAAAAP4AAAAAAAAf/////wAAAAAAAAAAAAAOP/8AAAAAAAA//////+AAAAAAAAAAAAB////AHAAAAAA///////gAAAAAAAAAAAB/n////gAAAAB///////4AAAAAAAAAAA/+D////wAAAAD///////8AAAAAAAAAAAPwB////4AAAAP/wf////+AAAAAAAAAAAPAB/f///AAAA//gP/////AAAAAAAAAAAAAAAP///4AAH//AH/////wAAAAAAAAAAAAAAH////8P//+AH/////+AAAAAAAAAAAAAAD////////+AD//////wAAAAAAAAAAAAAB/////////AAAAP///+AAAAAAAAAAAAAA/////////+AAAB////AAAAAAAAAAAAAAP////////8AAAAH///gAAAAAAAAAAAAAH////////wAAAAAf//gAAAAAAAAAAAAAD////////gAAAAAD//wAAAAAAAAAAAAAH////////AAAAAAB//8AAAAAAAAAAAAAH///////8AAAAAAA//8AAAAAAAAAAAAAH///////8AAAAAAAf/8AAAAAAAAAAAAAH///////+AAAAAAAf/+AAAAAAAAAAAAAH///////+AAAAAAAf/+AAAAAAAAAAAAAH///+f//+AAAAAAAf/+AAAAAAAAAAAAAH///8H//+AAAAAAAeAAAAAAAAAAAAAAAH///wB//+AAAAAAAeAAAAAAAAAAAAAAAH///AAf/+AAAAAAAeAAAAAAAAAAAAAAAH//+AAP/+AAAAAAAeAAAAAAAAAAAAAAAH//8AAH/+AAAAAAAeAAAAAAAAAAAAAAAH//wAAD/8AAAAAAAeAAAAAAAAAAAAAAAH//gAAB/8AAAAAAAeAAAAAAAAAAAAAAAH//gAAA/8AAAAAAAeAAAAAAAAAAAAAAA///gAAB/8AAAAAAAeAAAAAAAAAAAAAAA///wAAB/8AAAAAAA+AAAAAAAAAAAAAAB///gAAA/8AAAAAAA+AAAAAAAAAAAAAAB///AAAA/8AAAAAAAeAAAAAAAAAAAAAAB///AAAAf8AAAAAAAeAAAAAAAAAAAAAAB//+gAAAP/4AAAAAAeAAAAAAAAAAAAAAB//+gAAAP/+AAAAAAeAAAAAAAAAAAAAAB//+AAAAP//gAAAAAeAAAAAAAAAAAAAAB///wAAAP//8AAAAAeAAAAAAAAAAAAAAB//+AAAAP///AAAAAeAAAAAAAAAAAAAAB//+AAAAP///4AAAAeAAAAAAAAAAAAAAB//+AAAAP///8AAAAeAAAAAAAAAAAAAf////w//D////gAAAAeAAAAAAAAAAAB//////////////gAAAAfAAAAAAAAAAAB//////////////gAAAA/AAAAAAAAAAAB//////////////gAAAA/AAAAAAAAAAAB//////////////wAAAH/gAAAAAAAAAAB//////////////8AAAf/8AAAAAAAAAAAAAP/gAAH8AAH//+AAB///wAAAAAAAAAAAAH/gAAP8AAH///AAP///4AAAAAAAAAAAAH/AAAP8AAH///gA////gAAAAAAAAAAAAD/AAAH8AAH///4H////gAAAAAAAAAAAAD/AAAH4AAH/+/+f////wAAAAAAAAAAAAB/AAAH4AAH/8P//////4AAAAAAAAAAAAB/gAAH4AAP/4Af//////8AAAAAAAAAAAA/gAAH4AAP/4AP////z/8AAAAAAAAAAAAfwAAH4AA//gAH////z8YAAAAAAAAAAAAf4AAH8AB//gAD////B4AAAAAAAAAAAAAP+AAH8AH//AAA///8AAAAAAAAAAAAAAAP/gAH8B//+AAAP//wAAAAAAAAAAAAAAAH/4AH8B//+AAAD/4AAAAAAAAAAAAAAAAH//Af////8AAAAAAAAAAAAAAAAAAAAAAD////////8AAAAAAAAAAAAAAAAAAAAAAD////////4AAAAAAAAAAAAAAAAAAAAAAAf///////4AAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAD///////AAAAAAAAAAAAAAAAAAAAAAAAA//////+AAAAAAAAAAAAAAAAAAAAAAAAAf/////8AAAAAAAAAAAAAAAAAAAAAAAAAP/////wAAAAAAAAAAAAAAAAAAAAAAAAAD////+AAAAAAAAAAAAAAAAAAAAAAAAAAD////4AAAAAAAAAAAAAAAAAAAAAAAAAAB////wAAAAAAAAAAAAAAAAAAAAAAAAAAB////wAAAAAAAAAAAAAAAAAAAAAAAAAAB////AAAAAAAAAAAAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAAAAAAAAAAAAAAAAAAAf//+AAAAAAAAAAAAAAAAAAAAAAAAAAAAP//+AAAAAAAAAAAAAAAAAAAAAAAAAAAAP///gAAAAAAAAAAAAAAAAAAAAAAAAAAAP///gAAAAAAAAAAAAAAAAAAAAAAAAAAAP//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAP//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAf//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAf//4AAAAAAAAAAAAAAAAAAAAAAAAAAAA///4AAAAAAAAAAAAAAAAAAAAAAAAAAAB///8AAAAAAAAAAAAAAAAAAAAAAAAAAAH///+AAAAAAAAAAAAAAAAAAAAAAAAAGAP////AAAAAAAAAAAAAAAAAAAAAAAAAfg/////AAAAAAAAAAAAAAAAAAAAAAAAA///////gAAAAAAAAAAAAAAAAAAAAAAAB///////4AAAAAAAAAAAAAAAAAAAAAAAB///////8AAAAAAAAAAAAAAAAAAAAAAAAf///////gAAAAAAAAAAAAAAAAAAAAAAAf///////4AAAAAAAAAAAAAAAAAAAAAAAf////////AAAAAAAAAAAAAAAAAAAAAAB/////////4AAAAAAAAAAAAAAAAAAAAAB/////////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","objs":[{"id":"css","solid":true,"box":[266,46,397,359],"foot":[[280,295],[400,350],[440,400],[525,400],[560,350],[650,342]],"at":[0,0]},{"id":"js","solid":true,"box":[834,0,191,381],"foot":[[838,335],[900,355],[905,378],[995,378],[1000,355],[1022,335]],"at":[399,0]},{"id":"tip","solid":true,"box":[1184,0,525,395],"foot":[[1190,300],[1260,335],[1298,390],[1360,390],[1420,338],[1586,350],[1702,255]],"at":[0,383]},{"id":"store","solid":true,"box":[38,330,360,318],"foot":[[50,562],[150,615],[220,636],[330,642],[395,612]],"at":[527,383]},{"id":"barn","solid":true,"box":[1474,326,395,361],"foot":[[1478,562],[1580,612],[1640,655],[1722,684],[1802,644],[1866,602]],"at":[0,780]},{"id":"inn","solid":true,"box":[220,614,427,383],"foot":[[240,862],[330,930],[398,990],[472,994],[560,922],[644,880]],"at":[397,780]},{"id":"tent","solid":true,"box":[1290,700,331,316],"foot":[[1300,950],[1420,1012],[1562,1004],[1612,882]],"at":[0,1165]},{"id":"board","solid":true,"box":[856,798,207,208],"foot":[[866,1000],[1052,1000]],"at":[333,1165]},{"id":"fountain","solid":false,"box":[809,392,302,259],"foot":[[790,585],[1126,585]],"at":[542,1165]}]};
var PROPS={"tree":{"img":"berry_tree.png","cx":1240,"base":690,"w":351,"h":350,"foot":684,"trunk":[1240,680,44,16],"x":1065,"y":340},"pit":{"img":"campfire_pit.png","cx":705,"cy":575,"w":150,"h":106,"foot":575,"ring":[705,577,80,38],"x":630,"y":522}}, CRM={"cw":143,"ch":222,"sc":2,"chars":{"sword":{"r":0,"h":74,"sit":true},"mage":{"r":1,"h":104,"sit":false},"archer":{"r":2,"h":74,"sit":true},"knight":{"r":3,"h":74,"sit":true},"cleric":{"r":4,"h":104,"sit":false},"thief":{"r":5,"h":104,"sit":false}}};   // berry tree / campfire placement + under-tree crowd sheet meta   // walkable grid + object cut-outs (generated by build_data.py)

/* ---------------- buildings: foot = collision footprint, occ = occluder polygon, base = depth line (all 1280-space) ---------------- */
var B=[
 {key:'Css', url:'/category/Css', live:true,   name:'대장장이 공방',     kicker:'Css · Workshop',      ico:'⚒', desc:'두드리고 다듬어 만든 스타일 기록들이 모루 옆에 쌓여 있어요.',
  foot:[200,118,432,228], base:228, door:[372,262], crop:[200,20,440],
  occ:[[197,120],[231,90],[246,47],[290,47],[376,30],[442,128],[430,205],[398,222],[282,236],[200,214]]},
 {key:'Js', url:'/category/Js', live:true,    name:'마법사의 탑',       kicker:'Js · Wizard Tower',   ico:'✧', desc:'움직임과 상호작용의 주문서가 탑 꼭대기까지 빼곡해요.',
  foot:[572,150,695,222], base:222, door:[633,262], crop:[520,0,230],
  occ:[[560,0],[705,0],[705,205],[690,222],[580,222],[560,205]]},
 {key:'Tip', url:'/category/Tip', live:true,   name:'왕립 도서관',       kicker:'Tip · Royal Library', ico:'❧', desc:'제이쿼리, 그누보드, 잡팁까지 — 서가별로 정리된 지식 창고.',
  foot:[798,100,1128,206], base:208, door:[903,254], crop:[810,0,300],
  occ:[[790,0],[1135,0],[1135,190],[1050,212],[905,214],[860,206],[798,182],[790,100]]},
 {key:'Plugin', url:'/category/Plugin', live:true,name:'모퉁이 잡화점',     kicker:'Plugin · General Store',ico:'⚘', desc:'쓸만한 플러그인을 골라 진열해 둔 작은 가게.',
  foot:[35,300,240,402], base:402, door:[263.3,421.3], crop:[20,215,250],
  occ:[[28,300],[100,235],[141,214],[200,250],[232,290],[250,345],[238,400],[130,410],[30,395]]},
 {key:'backup', url:'/category/backup', live:true,name:'통나무 창고',       kicker:'backup · Storehouse', ico:'❖', desc:'예전 작업물을 차곡차곡 보관해 둔 창고예요.',
  foot:[995,330,1235,422], base:422, door:[1063.3,441.3], crop:[985,195,280],
  occ:[[988,318],[1140,222],[1240,316],[1240,390],[1131,432],[998,415]]},
 {key:'소설 아이디어', url:'/category', live:false,name:'음유시인의 여관',kicker:'Story · Inn',    ico:'♪', desc:'난롯가에서 떠오른 이야기의 씨앗을 적어 두는 곳.',
  foot:[160,540,415,645], base:640, door:[350,664], crop:[140,400,280],
  occ:[[150,531],[214,470],[214,426],[250,426],[250,450],[338,412],[420,531],[404,612],[325,648],[162,605]]},
 {key:'미분류', url:'/category', live:false,name:'떠돌이 상인의 천막', kicker:'Misc · Wanderer\'s Tent',ico:'✿', desc:'아직 자리를 못 찾은 이것저것이 모여 있어요.',
  foot:[835,585,1075,668], base:612, door:[876.7,653.3], crop:[850,455,230],
  occ:[[860,535],[934,468],[995,478],[1082,555],[1040,662],[956,670],[832,622]]},
 {key:'공지', url:'/notice', live:true,  name:'광장 공지판',       kicker:'Notice · Town Board', ico:'✉', desc:'마을 소식과 알림을 붙여 두는 게시판.',
  foot:[586,640,700,668], base:665, door:[641,520], doors:[[641,520],[641,684],[566,648],[716,648]], crop:[555,515,160],
  occ:[[577,582],[600,560],[642,538],[686,560],[707,580],[701,592],[701,670],[583,670],[583,592]]},
 {key:'귀신의 집',name:'귀신의 집',kicker:'Horror · 버려진 사당',ico:'⛩',desc:'부적이 덕지덕지 붙은 낡은 사당. 금줄 너머로 괴담과 SCP, 바다 건너 전해진 인기 공포 이야기가 모여요. 혼자 읽지 마세요…',
  haunt:true, live:true, url:'/category/'+encodeURIComponent('귀신의 집'),
  subs:[{s:'괴담',lbl:'괴담',ico:'🕯'},{s:'SCP',lbl:'SCP',ico:'⚠'},{s:'나폴리탄',lbl:'나폴리탄',ico:'🍝'},{s:'번역 공포',lbl:'번역',note:'출처 표기',ico:'★',grp:'인기 공포'},{s:'각색 공포',lbl:'각색',ico:'✎',grp:'인기 공포'}],
  foot:[1113,640,1280,706], base:706, door:[1161.3,709.3], crop:[1106,545,180],
  occ:[[1128,596],[1143,591],[1157,576],[1172,562],[1187,566],[1201,567],[1216,567],[1231,579],[1245,571],[1260,586],[1275,599],[1275,692],[1260,699],[1245,709],[1231,714],[1216,717],[1201,717],[1187,716],[1172,715],[1157,713],[1143,705],[1128,699]]}
 ,{key:'외주 작업소', name:'외주 작업소', kicker:'Outsource · Publishing Atelier', ico:'✎',
  desc:'그누보드 스킨·게시판 수정과 피그마 디자인을 웹으로 옮기는 일을 맡기는 작은 작업실이에요. 문의는 비밀댓글이나 방명록으로 남겨 주세요.',
  shop:true, live:true, url:'/category/'+encodeURIComponent('외주 작업소'),
  subs:[{s:'작업 안내',lbl:'안내',ico:'✎'},{s:'포트폴리오',lbl:'포트폴리오',ico:'❀'}],
  foot:[165, 795, 500, 980], base:980, door:[473.3, 963.3], crop:[140, 680, 360],
  occ:[[200,728],[221.3,712],[245.3,726.7],[245.3,745.3],[390,681.3],[398,685.3],[461.3,803.3],[465.3,818.7],[466.7,826.7],[496.7,833.3],[496.7,910],[483.3,914.7],[483.3,950],[454.7,961.3],[400,970.7],[390,1000],[373.3,1010.7],[300,1010.7],[293.3,984],[278.7,980],[277.3,1010.7],[250.7,1010.7],[249.3,980],[168.7,925.3],[165.3,828],[141.3,825.3],[144,814.7],[200,766.7]],
  medal:shopMedal}
];
B.forEach(function(b){ if(b.subs) b.subs.forEach(function(x){ x.url=b.url+'/'+encodeURIComponent(x.s); }); });
var FOUNTAIN={x:638*S,y:370*S,rx:108*S,ry:64*S};
var POSTS=(window.BLOG_POSTS||[]).filter(function(p){return !p.p;});
B.forEach(function(b){
  b.posts=POSTS.filter(function(p){return p.c===b.key}).map(function(p){var q={};for(var k in p)q[k]=p[k];q.u=String(p.u).replace(/^https?:\/\/yeollo\.tistory\.com/,'');return q;});
  b.f=b.foot.map(function(v){return v*S});
  b.dx=b.door[0]*S; b.dy=b.door[1]*S;
  b.dW=(b.doors||[b.door]).map(function(p){return [p[0]*S,p[1]*S];});   // p9: several approach points
});
function countOf(k){for(var i=0;i<B.length;i++) if(B[i].key===k) return B[i].posts.length; return 0;}


/* ---------------- live data: read the blog's own category pages (same origin, same skin markup) ---------------- */
function parseList(html){
  var doc=new DOMParser().parseFromString(html,'text/html'), out=[];
  [].forEach.call(doc.querySelectorAll('.tw-list .tw-item'),function(li){
    var a=li.querySelector('a.tw-item-link'), t=li.querySelector('.tw-item-title'); if(!a||!t) return;
    var cat=(li.getAttribute('data-cat')||'').trim(), sub=cat.indexOf('/')>=0?cat.split('/').slice(1).join('/'):'';
    out.push({t:t.textContent.trim(),u:a.getAttribute('href'),d:(li.getAttribute('data-date')||'').replace(/\./g,'-').replace(/-$/,''),c:cat,s:sub,p:0});
  });
  [].forEach.call(doc.querySelectorAll('.tw-notice-item'),function(n){
    var a=n.querySelector('a'), t=n.querySelector('.tw-item-title'), d=n.querySelector('[data-date]'); if(!a||!t) return;
    out.push({t:t.textContent.replace(/^\s*공지\s*/,'').trim(),u:a.getAttribute('href'),d:d?(d.getAttribute('data-date')||'').replace(/\./g,'-'):'',c:'공지',s:'',p:0});
  });
  if(!out.length) [].forEach.call(doc.querySelectorAll('.tw-post-card'),function(c){
    var a=c.querySelector('a.tw-card-link'), t=c.querySelector('.tw-item-title'); if(!a||!t) return;
    var cat=(c.getAttribute('data-cat')||'').trim();
    out.push({t:t.textContent.trim(),u:a.getAttribute('href'),d:(c.getAttribute('data-date')||'').replace(/\./g,'-').replace(/-$/,''),c:cat,s:cat.indexOf('/')>=0?cat.split('/').slice(1).join('/'):'',p:0});
  });
  var next=doc.querySelector('.tw-paging .tw-page-next'), hasNext=!!(next&&next.getAttribute('href')&&!/no-more|no_more/.test(next.className));
  return {items:out,hasNext:hasNext,ok:!!doc.querySelector('.tw-main')};
}
function loadLive(b){
  if(!b.live||!window.fetch||!window.DOMParser) return;
  var acc=[], page=1;
  function step(){
    fetch(b.url+(b.url.indexOf('?')>=0?'&':'?')+'page='+page,{credentials:'same-origin'}).then(function(r){ if(!r.ok) throw r.status; return r.text(); }).then(function(h){
      var r=parseList(h); if(!r.ok) return;
      acc=acc.concat(r.items);
      if(r.hasNext&&page<12&&r.items.length){ page++; step(); return; }
      var seen={}; acc=acc.filter(function(p){ if(seen[p.u]) return false; seen[p.u]=1; return true; });
      if(b.key==='Tip'){ acc.forEach(function(p){ if(!p.s&&p.c&&p.c!=='Tip') p.s=p.c.replace(/^Tip\//,''); }); }
      b.posts=acc; b.liveOk=true; refreshCounts();
      if(curB===b||curB==='ALL') renderList();
    }).catch(function(){ /* keep bundled public list */ });
  }
  step();
}
function refreshCounts(){ POSTS=[]; B.forEach(function(b){ POSTS=POSTS.concat(b.posts); }); if(near){ $('.plate-meta',plate).textContent=near.key+' · '+(near.posts.length?'기록 '+near.posts.length+'편':'아직 공개된 기록 없음'); } }

/* ---------------- dom ---------------- */
var $=function(s,r){return (r||document).querySelector(s)};
var cv=$('#world'), cx=cv.getContext('2d');
var plate=$('#plate'), bubble=$('#bubble'), win=$('#win'), veil=$('#veil'), mEnter=$('#mEnter'), hint=$('#hint');
var DPR=1, VW=0, VH=0, Z=1;
function resize(){
  DPR=Math.min(window.devicePixelRatio||1,2);
  VW=window.innerWidth; VH=window.innerHeight;
  cv.width=Math.round(VW*DPR); cv.height=Math.round(VH*DPR);
  Z=Math.max(0.5,Math.min(1.15,Math.min(VW/1350,VH/840)));
  if(VW/Z>WW) Z=VW/WW; if(VH/Z>WH) Z=Math.max(Z,VH/WH);
  if(/[?&]fit=1/.test(location.search)) Z=Math.min(VW/WW,VH/WH);   // debug: whole map
}
window.addEventListener('resize',resize); resize();

/* ---------------- assets ---------------- */
/* ---------------- 외주 작업소 (20261121p8): painted into town_p8.jpg on the new south lane (map extended 1080->1560).
   shop_mask_p8.png is the building's alpha; the occluder re-paints town_p8.jpg through it over anyone standing behind.
   Night: its windows join WINDOWS, its chimney joins CHIMNEYS, like every other house. WORLD px. ---------------- */
var SHOP={x:210,y:1018,w:538,h:502,mask:'shop_mask_p8.png',
  foot:[[210,1238],[253,1390],[416,1472],[600,1458],[682,1444],[748,1426]],
  win:[[327,1232],[553,1220],[335,1350,1.6],[505,1370,1.5],[617,1330,.8]], chim:[332,1074], medal:[478,1268,540]};
function patchShopWalk(){}
function buildShop(){}
function shopMedal(el){
  var m=SHOP.medal, sz=m[2];
  el.classList.remove('px');
  el.style.backgroundImage='url('+ASSET+'town_p8.jpg'+AV+')';
  el.style.backgroundSize=(WW/sz*100)+'% auto';
  el.style.backgroundPosition=((m[0]-sz/2)/(WW-sz)*100)+'% '+((m[1]-sz/2)/(WH-sz)*100)+'%';
}
function drawShop(){}
function shopNightLights(g,k){}

var IMG={}, toLoad=['town_p8.jpg','shop_mask_p8.png','oak_mid_p9.png','oak_left_p9.png','occ_mask.png','hero.png','npc_bard.png','npc_granny.png','npc_cat.png','npc_mailboy.png','npc_witch.png','berry_tree.png','campfire_pit.png','crowd.png','hero_kick.png','jelly.png','haunt.png'], loaded=0;
toLoad.forEach(function(f){
  var im=new Image(); im.onload=im.onerror=function(){loaded++; $('.ld-bar i').style.width=(loaded/toLoad.length*100)+'%'; if(loaded===toLoad.length) start();};
  im.src=ASSET+f+AV; IMG[f]=im;
});

/* ---------------- walk grid ---------------- */
var CELL=10, GW=Math.ceil(WW/CELL), GH=Math.ceil(WH/CELL), grid=new Uint8Array(GW*GH);
var WALK=(function(){ var b=atob(OD.walk), n=OD.gw*OD.gh, out=new Uint8Array(n); for(var i=0;i<n;i++) out[i]=(b.charCodeAt(i>>3)>>(7-(i&7)))&1; return out; })();
patchShopWalk();
function walkable(x,y){ var gx=Math.floor(x/OD.cell), gy=Math.floor(y/OD.cell); return gx>=0&&gy>=0&&gx<OD.gw&&gy<OD.gh&&WALK[gy*OD.gw+gx]===1; }
function blockedPt(x,y){
  if(!walkable(x,y)) return true;            // authored walkable mask: paths, plaza, yards; never behind roofs
  return false;
}
function buildGrid(){for(var gy=0;gy<GH;gy++)for(var gx=0;gx<GW;gx++)grid[gy*GW+gx]=blockedPt(gx*CELL+CELL/2,gy*CELL+CELL/2)?1:0;}
function free(x,y){var gx=Math.floor(x/CELL),gy=Math.floor(y/CELL); if(gx<0||gy<0||gx>=GW||gy>=GH) return false; return !grid[gy*GW+gx];}
function nearestFree(x,y){
  var gx=Math.floor(x/CELL),gy=Math.floor(y/CELL);
  for(var r=0;r<50;r++)for(var dy=-r;dy<=r;dy++)for(var dx=-r;dx<=r;dx++){
    if(Math.max(Math.abs(dx),Math.abs(dy))!==r) continue;
    var X=gx+dx,Y=gy+dy; if(X>=0&&Y>=0&&X<GW&&Y<GH&&!grid[Y*GW+X]) return [X*CELL+CELL/2,Y*CELL+CELL/2];
  }
  return null;
}
function astar(sx,sy,tx,ty){
  var s=[Math.floor(sx/CELL),Math.floor(sy/CELL)], t=[Math.floor(tx/CELL),Math.floor(ty/CELL)];
  var N=GW*GH, g=new Float32Array(N).fill(1e9), came=new Int32Array(N).fill(-1), closed=new Uint8Array(N), fs=new Float32Array(N);
  var si=s[1]*GW+s[0], ti=t[1]*GW+t[0]; if(grid[ti]) return null;
  var open=[si]; g[si]=0;
  function h(i){var x=i%GW,y=(i/GW)|0,dx=Math.abs(x-t[0]),dy=Math.abs(y-t[1]);return Math.max(dx,dy)+0.414*Math.min(dx,dy);}
  fs[si]=h(si); var it=0;
  while(open.length&&it++<60000){
    var bi=0; for(var k=1;k<open.length;k++) if(fs[open[k]]<fs[open[bi]]) bi=k;
    var c=open[bi]; open[bi]=open[open.length-1]; open.pop(); if(c===ti) break; if(closed[c]) continue; closed[c]=1;
    var cx_=c%GW, cy_=(c/GW)|0;
    for(var dy=-1;dy<=1;dy++)for(var dx=-1;dx<=1;dx++){
      if(!dx&&!dy) continue; var nx=cx_+dx,ny=cy_+dy; if(nx<0||ny<0||nx>=GW||ny>=GH) continue;
      var ni=ny*GW+nx; if(grid[ni]||closed[ni]) continue;
      if(dx&&dy&&(grid[cy_*GW+nx]||grid[ny*GW+cx_])) continue;
      var ng=g[c]+(dx&&dy?1.414:1);
      if(ng<g[ni]){g[ni]=ng;came[ni]=c;fs[ni]=ng+h(ni); open.push(ni);}
    }
  }
  if(came[ti]<0&&ti!==si) return null;
  var path=[], c2=ti; while(c2!==si&&c2>=0){path.push([(c2%GW)*CELL+CELL/2,((c2/GW)|0)*CELL+CELL/2]); c2=came[c2];}
  path.reverse(); if(path.length) path[path.length-1]=[tx,ty];
  var out=[], cur=[sx,sy], i=0;
  while(i<path.length){var j=path.length-1; while(j>i&&!los(cur,path[j])) j--; out.push(path[j]); cur=path[j]; i=j+1;}
  return out;
}
function los(a,b){var d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.ceil(d/5);for(var i=1;i<=n;i++){var x=a[0]+(b[0]-a[0])*i/n,y=a[1]+(b[1]-a[1])*i/n;if(!free(x,y))return false;}return true;}

/* ---------------- actors ---------------- */
var HM=CM.hero, CYCLE=HM.stride*2;     // world px travelled per full walk cycle -> frames advance by distance (no foot sliding)
var P={x:638*S,y:478*S,dir:'down',moving:false,path:null,goal:null,speed:190,dist:0,frame:0};
var NPCS=[
 {k:'bard',   x:770,y:1404, solid:true, name:'음유시인 리오', ia:[.45,.7], ib:[.45,.7], lines:['어서 와요, 여행자님! 이 마을엔 공개된 기록이 '+POSTS.length+'편 있어요.','바로 뒤가 새로 문을 연 외주 작업소예요. 웹 일을 맡기고 싶을 때 들러 보세요.','도서관엔 팁이 '+countOf('Tip')+'편… 밤새 읽어도 모자라죠.','여관엔 언젠가 이야기의 씨앗이 쌓일 거예요 ♪']},
 {k:'granny', x:1080,y:792, solid:true, name:'사과 할머니',   ia:[2.5,4.5], ib:[1,1.6], lines:['마법사의 탑엔 Js 주문서가 '+countOf('Js')+'권 있단다.','길을 잃으면 위쪽 「일반 목록 보기」를 눌러 보렴.','사과 하나 줄까? 후후.']},
 {k:'witch',  x:1012,y:405, solid:true, name:'견습 마녀 루루', ia:[2.2,3.5], ib:[1.2,2], lines:['쉿, 지금 주문서 읽는 중이에요…','탑 안 주문서는 대부분 자바스크립트래요!','언젠가 저도 탑 꼭대기 층에 올라갈 거예요.']},
 {k:'cat',    x:556*S,y:448*S, solid:false,name:'고양이 모모',   ia:[2,4], ib:[1.2,2.5], lines:['냐아~','(꼬리를 살랑살랑 흔든다)','…골골골.'], wander:true},
 {k:'mailboy',x:762*S,y:272*S, solid:false,name:'우편배달부 핀', ia:[1.5,2.5], ib:[.8,1.2], lines:['새 글 소식 배달 왔어요!','공지판도 가끔 봐 주세요~','오늘은 도서관까지 배달이 세 통이에요.'],
   route:[[1143,408],[1052,706],[729,693],[1052,706]], ri:0, pause:0, speed:70}
];
/* ---- the berry-tree crowd: SD adventurers huddled under the tree by day, around the campfire by night ---- */
var CRMM={cw:CRM.cw,ch:CRM.ch,sc:CRM.sc,rows:{}}; Object.keys(CRM.chars).forEach(function(k){CRMM.rows[k]={r:CRM.chars[k].r,n:2};});
var CROWD_DEF=[
 {k:'sword', name:'검사 지망생 카이', day:[1150,764], night:[668,516], cd:['언제 떨어지지…','배고프다~','오늘은 내가 먼저!'], cn:['불 따뜻하다~','내일도 줍자!'],
  lines:['열매 언제 떨어지지… 배고프다~','이 나무 열매 먹으면 힘이 세진대!','오늘은 꼭 내가 먼저 주울 거야.']},
 {k:'mage',  name:'꼬마 마법사 미르', day:[1118,702], night:[634,650], cd:['저기! 익었다!','바람아 불어라~'], cn:['별 진짜 많다…','불꽃 예쁘다'],
  lines:['저기! 저기 빨간 거 곧 떨어져!','바람 마법으로 살짝 흔들어 볼까…?','보라색 열매가 더 달아요.']},
 {k:'archer',name:'궁수 나비', day:[1342,716], night:[750,512], cd:['어제 세 개 주웠어','ㅋㅋㅋ'], cn:['탁탁 소리 좋아','마시멜로 없나?'],
  lines:['어제는 세 개나 주웠다니까?','화살로 쏘면 반칙이겠지…?','여기 앉아서 기다리는 게 제일 좋아.']},
 {k:'knight',name:'견습 기사 토토', day:[1226,752], night:[596,586], cd:['(꾸벅꾸벅…)','Zzz…'], cn:['Zzz…','(꾸벅…)'],
  lines:['(꾸벅꾸벅…)','투구가 무거워서 위를 못 보겠어…','열매 떨어지면 깨워 줘…']},
 {k:'cleric',name:'성직자 루미', day:[1288,736], night:[780,652], cd:['같이 먹어요♪','두근두근'], cn:['따뜻해요♪','오늘도 수고했어요'], noB:true,
  lines:['잡았다! 같이 나눠 먹어요 ♪','욕심내지 말고 하나씩이에요~','오늘 바람이 좋네요.']},
 {k:'thief', name:'도적 소년 제로', day:[1388,692], night:[818,594], cd:['저거 내 거!','쉿, 곧이야…'], cn:['무서운 얘기 해줄까?','별똥별이다!'],
  lines:['쉿… 곧 떨어진다.','저 큰 거 내 거다!','몰래 흔들면… 아, 안 되지.']}
];
CROWD_DEF.forEach(function(d){ NPCS.push({k:d.k,crowd:true,x:d.day[0],y:d.day[1],solid:true,name:d.name,lines:d.lines,d:d,ia:d.noB?[1e9,1e9]:[2.2,5],ib:[1,2.4]}); });
var CROWD=NPCS.filter(function(n){return n.crowd;});
NPCS.forEach(function(n){var m=n.crowd?CRMM:CM.npc[n.k]; n.m=m; n.h=n.crowd?CRM.chars[n.k].h:m.h; n.sit=n.crowd&&CRM.chars[n.k].sit; n.t=Math.random()*6; n.ox=n.x; n.oy=n.y; n.tx=n.x; n.ty=n.y; n.wt=0; n.fr=0; n.ft=rnd(n.ia[0],n.ia[1]); n.dist=0;});

/* ---------------- occluders: exact cut-outs of each object (no ground pixels). An object is painted over an actor
   only when the actor's feet are behind the object's ground line, and only inside the actor's box. ---------------- */
var OBJS=OD.objs.map(function(o){ return {id:o.id,solid:o.solid,x:o.box[0],y:o.box[1],w:o.box[2],h:o.box[3],ax:o.at[0],ay:o.at[1],foot:o.foot,c:null}; });
var TR=PROPS.tree, PT=PROPS.pit;
OBJS.push({id:'tree',solid:false,fade:true,x:TR.x,y:TR.y,w:TR.w,h:TR.h,foot:[[TR.x,TR.foot],[TR.x+TR.w,TR.foot]],c:null,img:'berry_tree.png'});
OBJS.push({id:'haunt',solid:true,x:1670,y:835,w:250,h:243,foot:[[1670, 1027], [1686, 1039], [1719, 1043], [1723, 1051], [1738, 1057], [1758, 1058], [1774, 1064], [1800, 1065], [1836, 1066], [1852, 1056], [1891, 1051], [1922, 1033]],c:null,img:'haunt.png',sub:[130, 175]});
OBJS.push({id:'torii',solid:true,x:1589,y:671,w:131,h:163,foot:[[1589, 803], [1616, 807], [1685, 833], [1720, 839]],c:null,img:'haunt.png',sub:[49, 11]});
OBJS.push({id:'jang',solid:true,x:1542,y:909,w:83,h:101,foot:[[1555, 997], [1575, 1000], [1595, 1006], [1612, 1005], [1626, 1001]],c:null,img:'haunt.png',sub:[2, 249]});
OBJS.push({id:'pit',solid:false,x:PT.x,y:PT.y,w:PT.w,h:PT.h,foot:[[PT.x,PT.foot],[PT.x+PT.w,PT.foot]],c:null,img:'campfire_pit.png'});
/* p9: the two oaks south of the tent are painted into town_p8.jpg; these cut-outs let the lane to the shrine pass behind them */
OBJS.push({id:'oak_mid',solid:false,fade:true,x:1514,y:1001,w:216,h:270,foot:[[1514,1262],[1730,1262]],c:null,mask:'oak_mid_p9.png'});
OBJS.push({id:'oak_left',solid:false,fade:true,x:1236,y:1078,w:235,h:267,foot:[[1236,1336],[1471,1336]],c:null,mask:'oak_left_p9.png'});
var OAKS=OBJS.filter(function(o){return /^oak_/.test(o.id);});
OBJS.push({id:'shop',solid:true,x:SHOP.x,y:SHOP.y,w:SHOP.w,h:SHOP.h,foot:SHOP.foot,c:null,mask:SHOP.mask});
function footAt(o,x){ var f=o.foot; if(x<=f[0][0]) return f[0][1]; if(x>=f[f.length-1][0]) return f[f.length-1][1];
  for(var i=0;i<f.length-1;i++){ if(x>=f[i][0]&&x<=f[i+1][0]){ var t=(x-f[i][0])/Math.max(1,f[i+1][0]-f[i][0]); return f[i][1]+t*(f[i+1][1]-f[i][1]); } } return f[0][1]; }
function buildLayers(){
  OBJS.forEach(function(o){
    if(o.img){ if(o.sub){ var sc=document.createElement('canvas'); sc.width=o.w; sc.height=o.h; sc.getContext('2d').drawImage(IMG[o.img],o.sub[0],o.sub[1],o.w,o.h,0,0,o.w,o.h); o.c=sc; } else o.c=IMG[o.img]; return; }
    var c=document.createElement('canvas'); c.width=o.w; c.height=o.h; var g=c.getContext('2d');
    if(o.mask) g.drawImage(IMG[o.mask],0,0); else g.drawImage(IMG['occ_mask.png'],o.ax,o.ay,o.w,o.h,0,0,o.w,o.h);   // this object's alpha only
    g.globalCompositeOperation='source-in';
    g.drawImage(IMG['town_p8.jpg'],o.x,o.y,o.w,o.h,0,0,o.w,o.h);
    o.c=c;
  });
}
function actorBox(x,y,h){ var w=h*0.62; return [x-w/2,y-h*1.1,w,h*1.1+4]; }
function behind(o,x,y){ return y<footAt(o,x); }
var canopyA=1;   // the canopy turns see-through while the hero walks behind it
function coverActor(x,y,h,hero){
  var bx=actorBox(x,y,h), hit=false;
  for(var i=0;i<OBJS.length;i++){ var o=OBJS[i]; if(!o.c) continue;
    if(bx[0]>o.x+o.w||bx[0]+bx[2]<o.x||bx[1]>o.y+o.h||bx[1]+bx[3]<o.y) continue;
    if(!behind(o,x,y)) continue;
    cx.save(); cx.beginPath(); cx.rect(bx[0],bx[1],bx[2],bx[3]); cx.clip(); if(o.fade&&hero) cx.globalAlpha=canopyA; cx.drawImage(o.c,o.x,o.y); cx.restore(); hit=true;
  }
  return hit;
}
var silC=document.createElement('canvas'), silG=silC.getContext('2d');
function silhouette(img,m,row,col,x,y){   // faint outline of the hero when something stands in front of her
  var w=m.cw/m.sc, h=m.ch/m.sc, foot=4/m.sc, r=m.rows[row].r;
  if(silC.width!==m.cw){ silC.width=m.cw; silC.height=m.ch; }
  silG.globalCompositeOperation='source-over'; silG.clearRect(0,0,m.cw,m.ch); silG.drawImage(img,col*m.cw,r*m.ch,m.cw,m.ch,0,0,m.cw,m.ch);
  silG.globalCompositeOperation='source-in'; silG.fillStyle='#3b4f8f'; silG.fillRect(0,0,m.cw,m.ch);
  cx.save(); cx.globalAlpha=.3; cx.drawImage(silC,x-w/2,y-h+foot,w,h); cx.restore();
}

/* ---------------- 귀신의 집 (20261116b): a rotting folk shrine (사당/神社) in the quiet south-east corner.
   Painted into town.jpg; haunt.png holds the cut-outs (shrine, torii, 장승) that re-paint over anyone standing behind them. ---------------- */
var HM_={"door": [1740, 1066], "candles": [[1739, 1003], [1749, 1007], [1790, 1010], [1580, 994], [1593, 999]], "doorway": [1771, 981], "crow": [1836, 850], "strips": [[1899, 886], [1894, 931], [1905, 938], [1916, 922], [1912, 957]], "tal": [[1718, 935], [1728, 958], [1808, 972], [1817, 956], [1896, 955]], "jang": [1595, 942], "pillars": [[1616, 807], [1685, 833]]};
var HAUNT={door:HM_.door, candles:HM_.candles, doorway:HM_.doorway, crow:HM_.crow, strips:HM_.strips, tal:HM_.tal, jang:HM_.jang, pillars:HM_.pillars,
  fl:[], wisps:[], caw:0, cawT:rnd(6,14), crowHop:0, fig:{a:0,t:rnd(8,16),on:0}, eyes:[], gust:0, gustT:rnd(3,7)};
HAUNT.candles.forEach(function(){ HAUNT.fl.push({v:1,t:rnd(0,1)}); });
for(var hw=0;hw<3;hw++) HAUNT.wisps.push({ph:rnd(0,6.28),r:rnd(16,30),sp:rnd(.35,.6),z:rnd(0,6.28)});
[[1700,880],[1890,812],[1862,1000],[1585,905],[1562,1046]].forEach(function(p){ HAUNT.eyes.push({x:p[0],y:p[1],a:0,t:rnd(2,12),on:0,bl:0}); });
var TAL=[];   // loose talismans that flutter (anchor, length, phase); torn ones flap harder
HAUNT.tal.forEach(function(p,i){ TAL.push({x:p[0],y:p[1],len:9,ph:rnd(0,6),torn:i%2===1}); });
HAUNT.pillars.forEach(function(p,i){ TAL.push({x:p[0]+(i?-2:2),y:p[1]-58-i*4,len:8,ph:rnd(0,6),torn:i===0}); });
var GHOST={t:rnd(0,20),x:1790,y:930,a:.5,boo:0,booCd:0,line:'',px:1790,py:930,tail:[]};
function hauntB(){ for(var i=0;i<B.length;i++) if(B[i].haunt) return B[i]; return null; }
function updateHaunt(dt){
  HAUNT.fl.forEach(function(f){ f.t-=dt; if(f.t<=0){ var off=Math.random()<.12; f.v=off?rnd(.25,.5):rnd(.75,1); f.t=off?rnd(.05,.15):rnd(.06,.4); } });
  HAUNT.gustT-=dt; if(HAUNT.gustT<=0){ HAUNT.gust=1; HAUNT.gustT=rnd(4,9); } HAUNT.gust=Math.max(0,HAUNT.gust-dt*.6);
  // hitodama (도깨비불) drifting round the shrine; swoops to the hero at the door
  GHOST.t+=dt; var t=GHOST.t;
  var hx=1792+Math.sin(t*.31)*85+Math.sin(t*1.07)*8, hy=930+Math.sin(t*.47)*38+Math.sin(t*1.6)*4;
  if(GHOST.boo>0){ GHOST.boo-=dt; var k=Math.min(1,(2.8-GHOST.boo)*2.5); hx=hx+(P.x+40-hx)*k*.85; hy=hy+(P.y-HM.h*.75-hy)*k*.85; }
  GHOST.px=GHOST.x; GHOST.py=GHOST.y; GHOST.x=hx; GHOST.y=hy;
  GHOST.tail.unshift([hx,hy]); if(GHOST.tail.length>9) GHOST.tail.pop();
  var target=GHOST.boo>0?1:(isNight?(.8+.15*Math.sin(t*.8)):(.18+.22*Math.max(0,Math.sin(t*.29))));
  GHOST.a+=(target-GHOST.a)*Math.min(1,dt*1.6);
  if(GHOST.booCd>0) GHOST.booCd-=dt;
  var hb=hauntB();
  if(hb&&near===hb&&GHOST.booCd<=0&&GHOST.boo<=0){ GHOST.boo=2.8; GHOST.booCd=14; HAUNT.fig.on=3.2; GHOST.line=['…들어올 거야?','부적… 떼지 마.','쉿. 안에서 누가 불러.','…너도 이야기 하나 두고 가.'][(Math.random()*4)|0]; }
  // the pale figure in the doorway: rare, brief; bolder at night
  var F=HAUNT.fig; F.t-=dt; if(F.t<=0&&F.on<=0){ F.on=rnd(2.2,3.6); F.t=isNight?rnd(12,24):rnd(25,45); }
  if(F.on>0) F.on-=dt; var fa=F.on>0?(isNight?.62:.26):0; F.a+=(fa-F.a)*Math.min(1,dt*(fa>F.a?1.1:2.2));
  HAUNT.eyes.forEach(function(e){ e.t-=dt; if(e.t<=0&&e.on<=0){ e.on=rnd(1.5,3.5); e.t=rnd(6,18); } if(e.on>0) e.on-=dt; e.a+=((e.on>0?1:0)-e.a)*Math.min(1,dt*3); e.bl=(Math.sin(T*2.3+e.x)>.96)?1:0; });
  HAUNT.cawT-=dt; if(HAUNT.cawT<=0){ HAUNT.caw=1.6; HAUNT.cawT=rnd(10,20); HAUNT.crowHop=.35; } if(HAUNT.caw>0) HAUNT.caw-=dt; if(HAUNT.crowHop>0) HAUNT.crowHop-=dt;
}
function drawTalisman(x,y,len,ang,torn,a){   // yellow 부적 with a red brush mark, hanging from its top edge
  cx.save(); cx.translate(x,y); cx.rotate(ang); cx.globalAlpha=a;
  var w=3.4; cx.fillStyle='#e6c25a'; cx.beginPath(); cx.moveTo(-w/2,0); cx.lineTo(w/2,0);
  if(torn){ cx.lineTo(w/2,len*.7); cx.lineTo(.4,len*.85); cx.lineTo(-.6,len*.62); cx.lineTo(-w/2,len*.9); } else { cx.lineTo(w/2,len); cx.lineTo(-w/2,len); }
  cx.closePath(); cx.fill(); cx.strokeStyle='rgba(120,80,20,.45)'; cx.lineWidth=.4; cx.stroke();
  cx.strokeStyle='#b8261c'; cx.lineWidth=.7; cx.beginPath(); cx.moveTo(0,1.2); cx.lineTo(0,len*.62); cx.moveTo(-1,2.6); cx.lineTo(1,2.6); cx.moveTo(-1,4.2); cx.lineTo(.9,5.1); cx.stroke();
  cx.restore(); }
function drawCrow(x,y){
  var hop=HAUNT.crowHop>0?Math.sin(HAUNT.crowHop/.35*Math.PI)*3:0, cawing=HAUNT.caw>0&&Math.sin(T*22)>-.2, nod=Math.sin(T*1.3)>.92?1.2:0;
  cx.save(); cx.translate(x,y-hop); cx.fillStyle='#16141c';
  cx.beginPath(); cx.ellipse(0,0,4.6,3,-.25,0,7); cx.fill();                       // body
  cx.beginPath(); cx.moveTo(3,-.5); cx.lineTo(9,1.5); cx.lineTo(3.5,1.8); cx.fill();   // tail
  cx.beginPath(); cx.arc(-4,-2.4+nod,2.3,0,7); cx.fill();                            // head
  cx.fillStyle='#2b2733'; cx.beginPath(); cx.moveTo(-6,-2.8+nod); cx.lineTo(-9.4,-2.2+nod-(cawing?1:0)); cx.lineTo(-6,-1.9+nod); cx.fill();
  if(cawing){ cx.beginPath(); cx.moveTo(-6,-1.9+nod); cx.lineTo(-9,-.6+nod); cx.lineTo(-6,-1.4+nod); cx.fill(); }
  cx.strokeStyle='#16141c'; cx.lineWidth=.8; cx.beginPath(); cx.moveTo(-1,2.5); cx.lineTo(-1.4,4.4); cx.moveTo(1,2.5); cx.lineTo(1.2,4.4); cx.stroke();
  cx.fillStyle=isNight?'rgba(255,60,40,.95)':'#e9d27a'; cx.beginPath(); cx.arc(-4.6,-2.8+nod,.6,0,7); cx.fill();
  cx.restore(); }
function drawFigure(x,y,a){   // a pale, long-haired shape standing just inside the doorway
  if(a<=.02) return; cx.save(); cx.globalAlpha=a; cx.translate(x,y);
  var g=cx.createLinearGradient(0,-30,0,2); g.addColorStop(0,'rgba(235,238,240,.95)'); g.addColorStop(1,'rgba(235,238,240,0)');
  cx.fillStyle=g; cx.beginPath(); cx.moveTo(-3.4,-20); cx.quadraticCurveTo(-5,-6,-4.2,2); cx.lineTo(4.2,2); cx.quadraticCurveTo(5,-6,3.4,-20); cx.closePath(); cx.fill();
  cx.fillStyle='#e9ecef'; cx.beginPath(); cx.ellipse(0,-23,2.6,3.2,0,0,7); cx.fill();
  cx.fillStyle='#0d0b10'; cx.beginPath(); cx.moveTo(-3.2,-24); cx.quadraticCurveTo(0,-29,3.2,-24); cx.lineTo(3.6,-10+Math.sin(T*1.1)*.6); cx.lineTo(1.2,-12); cx.lineTo(1,-21.5); cx.lineTo(-1,-21.5); cx.lineTo(-1.2,-12); cx.lineTo(-3.6,-10); cx.closePath(); cx.fill();
  cx.restore(); }
function drawHitodama(){ var a=GHOST.a; if(a<=.02) return;
  cx.save(); cx.globalCompositeOperation='lighter';
  for(var i=GHOST.tail.length-1;i>=1;i--){ var p=GHOST.tail[i], f=1-i/GHOST.tail.length; lightAt(cx,p[0],p[1]-i*1.2,4+6*f,'120,200,255',a*.35*f); }
  lightAt(cx,GHOST.x,GHOST.y,16,'110,190,255',a*.55); lightAt(cx,GHOST.x,GHOST.y,6,'230,245,255',a*.95);
  cx.restore();
  cx.fillStyle='rgba(240,250,255,'+(a*.9)+')'; cx.beginPath(); cx.arc(GHOST.x,GHOST.y,2.2,0,7); cx.fill(); }
function hauntGround(){   // under the actors: candles, red doorway glow, fluttering 부적 and 오방색 strips, the crow, the figure, night fog
  var k=nightK, gust=HAUNT.gust;
  cx.save(); cx.globalCompositeOperation='lighter';
  HAUNT.candles.forEach(function(c,i){ var f=HAUNT.fl[i].v; lightAt(cx,c[0],c[1]-3,7,'255,170,80',(.32+.2*k)*f); });
  var d=HAUNT.doorway; lightAt(cx,d[0],d[1]-6,22,'200,20,30',(.10+.16*k)*(.75+.25*Math.sin(T*1.3)));
  cx.restore();
  drawFigure(d[0],d[1]+4,HAUNT.fig.a);
  TAL.forEach(function(t){ var amp=(t.torn?.5:.22)+gust*.5; drawTalisman(t.x,t.y,t.len,Math.sin(T*(t.torn?5.5:3.2)+t.ph)*amp+gust*.35,t.torn,.95); });
  var cols=['#3d6fb5','#c0392b','#e2b93b','#f1efe8','#22202a'];
  HAUNT.strips.forEach(function(s,i){ if(i%2) return; cx.save(); cx.translate(s[0],s[1]); cx.strokeStyle=cols[i%5]; cx.lineWidth=1.4; cx.globalAlpha=.85; cx.lineCap='round'; cx.beginPath(); cx.moveTo(0,0);
    var sw=Math.sin(T*3+i*1.7)*(1.5+gust*3); cx.quadraticCurveTo(sw+gust*3,5,sw*1.6+gust*6,11); cx.stroke(); cx.restore(); });
  drawCrow(HAUNT.crow[0],HAUNT.crow[1]);
  if(k>.02){ cx.save(); for(var i=0;i<8;i++){ var mx=1590+i*45+Math.sin(T*.22+i*1.7)*30, my=1040-(i%3)*55+Math.sin(T*.35+i)*10;
      var g=cx.createRadialGradient(mx,my,0,mx,my,95); g.addColorStop(0,'rgba(190,195,205,'+(.22*k)+')'); g.addColorStop(1,'rgba(190,195,205,0)'); cx.fillStyle=g; cx.beginPath(); cx.ellipse(mx,my,95,30,0,0,7); cx.fill(); } cx.restore(); }
}
function hauntAir(){   // over the actors: 도깨비불 by the 장승, the hitodama, eyes in the dark
  var k=nightK;
  HAUNT.wisps.forEach(function(p){ var a=T*p.sp+p.ph, x=HAUNT.jang[0]+Math.cos(a)*p.r, y=HAUNT.jang[1]+Math.sin(a*1.3)*p.r*.35+Math.sin(T*2+p.z)*3;
    p.x=x; p.y=y; var al=(.25+.6*k)*(.6+.4*Math.sin(T*3+p.z));
    cx.save(); cx.globalCompositeOperation='lighter'; lightAt(cx,x,y,8,'90,170,255',al*.75); cx.restore();
    cx.fillStyle='rgba(220,240,255,'+al+')'; cx.beginPath(); cx.arc(x,y,1.5,0,7); cx.fill(); });
  drawHitodama();

}
function hauntBubbles(){
  if(GHOST.boo>0&&GHOST.line){ var a=Math.min(1,(2.8-GHOST.boo)*4,GHOST.boo*2.5); cbubble(GHOST.x,GHOST.y-14,GHOST.line,a); }
  if(HAUNT.caw>0){ var a2=Math.min(1,(1.6-HAUNT.caw)*5,HAUNT.caw*3); cbubble(HAUNT.crow[0],HAUNT.crow[1]-10,'까악!',a2); }
}
function hauntNightLights(g,k){
  HAUNT.candles.forEach(function(c,i){ lightAt(g,c[0],c[1]-3,30,'255,150,70',.7*k*HAUNT.fl[i].v); });
  var d=HAUNT.doorway; lightAt(g,d[0],d[1]-8,80,'210,30,40',.75*k*(.8+.2*Math.sin(T*1.3)));
  lightAt(g,GHOST.x,GHOST.y,55,'120,190,255',.6*k*GHOST.a);
  HAUNT.wisps.forEach(function(p){ if(p.x) lightAt(g,p.x,p.y,22,'100,170,255',.4*k); });
  if(HAUNT.fig.a>.05) lightAt(g,d[0],d[1]-10,26,'225,230,240',.5*k*HAUNT.fig.a);
}
function hauntAfterNight(){   // drawn after the night overlay so they read in the dark
  var k=nightK; if(k<.02) return;
  cx.save(); cx.globalCompositeOperation='source-over'; var d=HAUNT.doorway; drawFigure(d[0],d[1]+4,HAUNT.fig.a*k*.85); cx.restore();
  HAUNT.eyes.forEach(function(e){ var a=e.a*(isNight?.95:.0); if(a<.03||e.bl) return;
    cx.save(); cx.globalCompositeOperation='lighter'; lightAt(cx,e.x-2.6,e.y,5,'255,40,30',a); lightAt(cx,e.x+2.6,e.y,5,'255,40,30',a); cx.restore();
    cx.fillStyle='rgba(255,230,200,'+a+')'; cx.fillRect(e.x-3,e.y-.5,1.4,1); cx.fillRect(e.x+1.6,e.y-.5,1.4,1); });
}
function hauntNightGlow(g,k){
  HAUNT.candles.forEach(function(c,i){ lightAt(g,c[0],c[1]-3,9,'255,190,100',.6*k*HAUNT.fl[i].v); });
  var d=HAUNT.doorway; lightAt(g,d[0],d[1]-8,26,'220,30,40',.32*k*(.8+.2*Math.sin(T*1.3)));
  lightAt(g,GHOST.x,GHOST.y,18,'170,215,255',.4*k*GHOST.a);
}

/* ---------------- ambience ---------------- */
var petals=[], smoke=[], sparkles=[], ripples=[], flies=[], clouds=[];
for(var i=0;i<46;i++) petals.push(newPetal(true));
function newPetal(any){return {x:any?rnd(0,WW):rnd(-200,WW*0.6),y:any?rnd(0,WH):-20,vx:rnd(18,42),vy:rnd(16,34),r:rnd(3,6),a:rnd(0,6.28),va:rnd(-2,2),sw:rnd(0,6.28),c:Math.random()<.7?['#f7c6cf','#f9d7dc','#fde6ea'][(Math.random()*3)|0]:['#c9dfa0','#e8d98e'][(Math.random()*2)|0]};}
for(i=0;i<14;i++) flies.push({x:rnd(100,WW-100),y:rnd(150,WH-100),t:rnd(0,9),c:['#fff2b3','#cfe6ff','#ffd3e0'][i%3],s:rnd(.6,1)});
for(i=0;i<4;i++) clouds.push({x:rnd(-600,WW),y:rnd(-100,WH),r:rnd(260,420),v:rnd(10,18)});
var CHIMNEYS=[[269*S,50*S],[231*S,428*S],SHOP.chim];

/* ---------------- day / night ---------------- */
var WINDOWS=[[535,210],[610,260],[335,285],[555,292,1.6],[905,160],[950,165],[995,160],[900,225],[950,235],[995,225],
  [1270,125],[1240,195],[1290,215],[1375,160],[1505,190],[1475,270],[1525,280],[1375,250,1.4],[120,480],[262,465],[115,540],
  [280,862],[490,812],[440,910],[492,890,1.3]].concat(SHOP.win);
var LAMPS=[[810,178],[1085,156],[588,662],[1185,790],[35,520]];
var timeMode=(function(){ try{ return localStorage.getItem('twTimeMode')||'auto'; }catch(e){ return 'auto'; } })();
function autoNight(){ var h=new Date().getHours(); return h>=19||h<6; }
var isNight=timeMode==='night'||(timeMode==='auto'&&autoNight()), nightK=isNight?1:0, swapT=0, crowdNight=isNight;
var stars=[]; for(i=0;i<70;i++) stars.push({x:Math.random(),y:Math.pow(Math.random(),1.7)*.42,s:rnd(.6,1.8),t:rnd(0,6.28),v:rnd(1,3)});
var embers=[], fireT=0, flick=1;
function setNight(v){
  if(v==='auto'){ timeMode='auto'; v=autoNight(); } else { v=!!v; timeMode=v?'night':'day'; }
  try{ localStorage.setItem('twTimeMode',timeMode); }catch(e){}
  if(v!==isNight){ isNight=v; swapT=1.1; }
  syncNightUI();
}
var btnN=$('#btnNight');
if(!btnN){ btnN=document.createElement('button'); btnN.id='btnNight'; btnN.type='button'; btnN.className='tw-btn ghost';
  var tb=$('#topbar'); if(tb) tb.insertBefore(btnN,$('#btnHelp',tb)||null); }
btnN.onclick=function(){ setNight(!isNight); };
function syncNightUI(){
  btnN.textContent=isNight?'☾':'☀'; var lab=isNight?'밤 마을 (누르면 낮으로)':'낮 마을 (누르면 밤으로)';
  btnN.title=lab; btnN.setAttribute('aria-label',lab); btnN.setAttribute('aria-pressed',isNight?'true':'false');
  document.documentElement.setAttribute('data-tw-time',isNight?'night':'day');
  try{ window.dispatchEvent(new CustomEvent('tw:timechange',{detail:{night:isNight,mode:timeMode}})); }catch(e){}
}
syncNightUI();
setInterval(function(){ if(timeMode==='auto'&&autoNight()!==isNight){ isNight=!isNight; swapT=1.1; syncNightUI(); } },60000);
function placeCrowd(night){
  crowdNight=night;
  CROWD.forEach(function(n){ var p=night?n.d.night:n.d.day; n.x=n.ox=p[0]; n.y=n.oy=p[1]; n.bub=null; });
  if(gridReady){ buildGrid(); if(!free(P.x,P.y)){ var q=nearestFree(P.x,P.y); if(q){P.x=q[0];P.y=q[1];} } P.path=null; }
}

/* ---------------- berries ---------------- */
var berries=[], pops=[], floats=[], berryT=3, berryN=0;
var berryCount=(function(){ try{ return +localStorage.getItem('twBerries')||0; }catch(e){ return 0; } })();
function crowdBy(k){ for(var i=0;i<CROWD.length;i++) if(CROWD[i].k===k) return CROWD[i]; }
function spawnBerry(tx,ty,toCleric){
  var sx=TR.cx+rnd(-125,125), sy=TR.y+rnd(105,215), kind=Math.random()<.55?0:1, cl=crowdBy('cleric');
  if(toCleric){ tx=cl.x+4; ty=cl.y-cl.h*0.86; sx=tx+rnd(-30,30); sy=Math.min(sy,ty-90); }
  else if(tx==null){ for(var k=0;k<30;k++){ var a=rnd(0,6.28), r=rnd(60,175); tx=TR.cx+Math.cos(a)*r; ty=TR.foot+18+Math.abs(Math.sin(a))*rnd(10,80);
      if(free(tx,ty)&&!CROWD.some(function(n){return Math.hypot(n.x-tx,(n.y-ty)*1.5)<34;})) break; tx=null; }
    if(tx==null) return null; }
  var b={x:sx,y:sy,sx:sx,sy:sy,tx:tx,ty:ty,kind:kind,st:'fall',t:0,dur:Math.sqrt(2*Math.max(30,ty-sy)/900),rot:rnd(-.4,.4),life:0,catchBy:toCleric?cl:null,bz:0,vz:0};
  berries.push(b); return b;
}
function burst(x,y,n,col){ for(var i=0;i<n;i++){ var a=i/n*6.28+rnd(-.2,.2), v=rnd(40,95); pops.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.7-30,life:0,max:rnd(.45,.8),s:rnd(1.6,3),c:col||'#fff6c8'}); } }
function chat(n,text,dur){ n.bub={text:text,t:dur||3,max:dur||3}; }
function pickBerry(b,who){
  b.st='pop'; b.t=0; burst(b.x,b.y-6,12,b.kind?'#e7c8ff':'#ffd0d6');
  if(who===P){ berryCount++; try{ localStorage.setItem('twBerries',berryCount); }catch(e){}
    floats.push({x:b.x,y:b.y-14,text:'+1',life:0,max:1.1});
    P.bub={text:(berryCount===1?'첫 열매다! 달콤해 ♥':'산딸기 냠! ×'+berryCount),t:2.4,max:2.4};
    var nb=null,bd=1e9; CROWD.forEach(function(n){var d=Math.hypot(n.x-P.x,n.y-P.y); if(d<bd){bd=d;nb=n;}}); if(nb&&bd<220&&!nb.bub) chat(nb,['앗, 내 거…!','좋겠다~','나도 줘!'][(Math.random()*3)|0],2.2);
  } else if(who){ who.emo='♥'; who.emoT=1.6; }
}
function updateBerries(dt){
  berryT-=dt;
  var ground=berries.filter(function(b){return b.st==='ground';}).length;
  if(berryT<=0){ berryT=crowdNight?rnd(9,15):rnd(3.2,6.5); if(ground<5){ berryN++; var cl=crowdBy('cleric'); spawnBerry(null,null,!crowdNight&&berryN%4===0&&cl&&!cl.busy); } }
  berries.forEach(function(b){
    b.t+=dt;
    if(b.st==='fall'){ var k=Math.max(0,Math.min(1,b.t/b.dur)); b.x=b.sx+(b.tx-b.sx)*k; b.y=b.sy+(b.ty-b.sy)*k*k; b.rot+=dt*3;
      if(k>=1){ if(b.catchBy){ var c=b.catchBy; b.st='gone'; c.fr=1; c.ft=3.2; c.busy=true; chat(c,'잡았다!',2.2); burst(b.x,b.y,8); setTimeout(function(){c.busy=false;},3200); }
        else { b.st='ground'; b.t=0; b.vz=b.big?-125:-70; b.bz=0; burst(b.x,b.y-4,7);
          var nb=null,bd=1e9; CROWD.forEach(function(n){var d=Math.hypot(n.x-b.x,n.y-b.y); if(d<bd){bd=d;nb=n;}}); if(nb&&!nb.bub){ nb.emo='!'; nb.emoT=1.2; } } } }
    else if(b.st==='ground'){ if(b.vz||b.bz<0){ b.vz+=520*dt; b.bz+=b.vz*dt; if(b.bz>=0){ b.bz=0; b.vz=Math.abs(b.vz)>40?-Math.abs(b.vz)*.35:0; } }
      if(Math.hypot(P.x-b.x,(P.y-b.y)*1.4)<30) pickBerry(b,P);
      else if(b.t>9){ for(var i=0;i<CROWD.length;i++){ var n=CROWD[i]; if(Math.hypot(n.x-b.x,(n.y-b.y)*1.4)<70&&Math.random()<dt*.25){ pickBerry(b,n); break; } } }
      if(b.st==='ground'&&b.t>32){ b.st='fade'; b.t=0; }
      if(b.st==='ground'&&Math.random()<dt*.8) pops.push({x:b.x+rnd(-6,6),y:b.y-8+rnd(-5,3),vx:0,vy:-8,life:0,max:.7,s:rnd(1.4,2.4),c:'#fffbe0',tw:1}); }
    else if(b.st==='pop'&&b.t>.45) b.st='gone';
    else if(b.st==='fade'&&b.t>1) b.st='gone';
  });
  berries=berries.filter(function(b){return b.st!=='gone';});
  pops=pops.filter(function(p){p.life+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=60*dt;return p.life<p.max;});
  floats=floats.filter(function(f){f.life+=dt;f.y-=28*dt;return f.life<f.max;});
}
/* ---- berry-tree kick: walk to the trunk, kick, the tree shakes and drops 2-6 berries ---- */
var KM={cw:205,ch:263,sc:2,rows:{right:{r:0},left:{r:1}}}, KICK={cd:0,shake:0,busy:false,last:0};
var treeHit=null;
function onTree(x,y){ if(x<TR.x||x>TR.x+TR.w||y<TR.y||y>TR.foot+6) return false;
  if(!treeHit){ try{ var c=document.createElement('canvas'); c.width=TR.w; c.height=TR.h; var g=c.getContext('2d'); g.drawImage(IMG['berry_tree.png'],0,0,TR.w,TR.h); treeHit=g.getImageData(0,0,TR.w,TR.h); }catch(e){ return true; } }
  var lx=Math.floor(x-TR.x), ly=Math.min(TR.h-1,Math.floor(y-TR.y)); return treeHit.data[(ly*TR.w+lx)*4+3]>40; }
function kickSpots(){ var tx=TR.trunk?TR.trunk[0]:TR.cx, side=P.x<tx?-1:1, out=[];
  [side,-side].forEach(function(sd){ for(var dy=10;dy>=-2;dy-=4) for(var dx=58;dx<=70;dx+=4){ var x=tx+sd*dx, y=TR.foot+dy; if(free(x,y)){ out.push({x:x,y:y,face:sd<0?'right':'left'}); return; } } });
  var q=nearestFree(tx,TR.foot+12); if(q) out.push({x:q[0],y:q[1],face:q[0]<tx?'right':'left'});
  return out; }
function kickTree(){
  if(KICK.busy) return;
  if(KICK.cd>0){ P.bub={text:['나무가 아직 흔들려요…','조금만 쉬었다가!','후우… 숨 좀 돌리고'][(Math.random()*3)|0],t:1.6,max:1.6}; return; }
  var L=kickSpots();
  for(var i=0;i<L.length;i++){ var sp=L[i];
    if(Math.hypot(P.x-sp.x,P.y-sp.y)<6){ startKick(sp.face); return; }
    goTo(sp.x,sp.y,null);
    if(P.path&&P.path.length){ (function(sp){ P.arrive=function(){ if(Math.hypot(P.x-sp.x,P.y-sp.y)<=14) startKick(sp.face); }; })(sp); return; } }
}
function startKick(face){ KICK.busy=true; P.path=null; marker=null; keys={}; P.kick={t:0,face:face,hit:false}; P.dir=face; }
function kickImpact(){
  KICK.shake=.8; KICK.cd=3; P.bub={text:['에잇!','하앗!','열매야 떨어져라!'][(Math.random()*3)|0],t:1.3,max:1.3};
  var tx0=TR.trunk?TR.trunk[0]:TR.cx;
  burst(tx0+(P.kick.face==='right'?-14:14),TR.foot-14,10,'#fff3c4');
  for(var i=0;i<14;i++) pops.push({x:TR.cx+rnd(-140,140),y:TR.y+rnd(60,190),vx:rnd(-30,30),vy:rnd(10,50),life:0,max:rnd(.7,1.3),s:rnd(2,3.4),c:['#6fa64a','#8cc062','#4e8a36'][i%3]});
  var n=2+((Math.random()*5)|0), made=0;
  for(var k=0;k<160&&made<n;k++){ var relax=k>=80, a=rnd(0,6.28), r=rnd(40,relax?190:150), x=tx0+Math.cos(a)*r, y=TR.foot+10+Math.abs(Math.sin(a))*rnd(8,relax?130:90);
    if(!free(x,y)||Math.hypot(x-P.x,(y-P.y)*1.4)<(relax?22:34)||(!relax&&CROWD.some(function(c){return Math.hypot(c.x-x,(c.y-y)*1.5)<30;}))) continue;
    var b=spawnBerry(x,y,false); if(b){ b.big=1; b.t=-made*.09-rnd(0,.08); b.sx=x+rnd(-40,40); b.sy=TR.y+rnd(90,190); b.x=b.sx; b.y=b.sy; b.dur=Math.sqrt(2*Math.max(30,y-b.sy)/900); made++; } }
  KICK.last=made;
  var near2=CROWD.slice().sort(function(a,b){return Math.hypot(a.x-P.x,a.y-P.y)-Math.hypot(b.x-P.x,b.y-P.y);});
  var cheers=['우와아!','나이스 킥!','열매 비다~!','한 번 더!','멋져요!'];
  var said=0; near2.forEach(function(c,i){ var clear=Math.abs(c.x-P.x)>70||c.y-P.y>110; if(said<2&&clear){ said++; chat(c,cheers[(Math.random()*cheers.length)|0],2.4); } else if(i<5){ c.bub=null; c.emo=i%2?'!':'♪'; c.emoT=1.4; } });
}
function updateKick(dt){
  if(KICK.cd>0) KICK.cd=Math.max(0,KICK.cd-dt); if(KICK.shake>0) KICK.shake=Math.max(0,KICK.shake-dt);
  if(!P.kick) return; var k=P.kick; k.t+=dt; P.dir=k.face;
  if(!k.hit&&k.t>=.26){ k.hit=true; kickImpact(); }
  if(k.t>=.62){ P.kick=null; KICK.busy=false; }
}
function kickFrame(t){ return t<.13?0:t<.26?1:t<.42?2:3; }
/* ---- jelly monsters: small round squishy blobs that hop around the plaza (original designs) ----
   jelly.png: 4 rows (kinds) x 9 cols: 0 front,1 3/4 front,2 side,3 3/4 back,4 back,5 happy front,6 happy 3/4,7 happy side,8 sleepy
   left-facing views are the right-facing ones mirrored. sizes: big 1.3 (mama/papa), normal 1, baby .55 */
var JM={cw:114,ch:124,sc:2,kinds:[{k:'momo',h:53,glow:'255,170,190'},{k:'minto',h:53,glow:'170,255,215'},{k:'remo',h:59,glow:'255,240,150'},{k:'rabi',h:46,glow:'200,190,255'}]};
/* families: [kind,x,y,babies]  solos: [kind,x,y,scale] */
var JELLY_FAM=[[0,700,540,3],[2,960,720,2],[1,1200,770,2]];
var JELLY_SOLO=[[3,430,470,1],[0,1125,280,1],[3,1340,560,1]];
var JELLIES=[];
/* dir index: 0 right,1 down-right,2 down,3 down-left,4 left,5 up-left,6 up,7 up-right -> [sheet col, mirror] */
var JDIR=[[2,0],[1,0],[0,0],[1,1],[2,1],[3,1],[4,0],[3,0]];
function jdir8(dx,dy){ return ((Math.round(Math.atan2(dy,dx)/(Math.PI/4))%8)+8)%8; }
function jellyClear(x,y){ if(!free(x,y)) return false;
  for(var i=0;i<B.length;i++){ if(Math.hypot(x-B[i].dx,(y-B[i].dy)*1.3)<70) return false; }
  for(i=0;i<NPCS.length;i++){ var n=NPCS[i]; if(n.solid&&Math.hypot(x-n.x,(y-n.y)*1.5)<34) return false; }
  if(Math.hypot(x-FOUNTAIN.x,(y-FOUNTAIN.y)*1.6)<FOUNTAIN.rx+18) return false;
  return true; }
function lineClear(x0,y0,x1,y1){ var d=Math.hypot(x1-x0,y1-y0), n=Math.ceil(d/3); for(var i=1;i<=n;i++){ if(!free(x0+(x1-x0)*i/n,y0+(y1-y0)*i/n)) return false; } return true; }
function jellySpot(x,y,taken){ var ok=function(X,Y){ return jellyClear(X,Y)&&!taken.some(function(q){return Math.hypot(q[0]-X,q[1]-Y)<16;}); };
  if(ok(x,y)) return [x,y]; for(var r=8;r<=170;r+=8) for(var a=0;a<6.28;a+=.35){ var X=x+Math.cos(a)*r, Y=y+Math.sin(a)*r*.7; if(ok(X,Y)&&lineClear(x,y,X,Y)) return [X,Y]; }
  for(r=8;r<=170;r+=8) for(a=0;a<6.28;a+=.35){ X=x+Math.cos(a)*r; Y=y+Math.sin(a)*r*.7; if(ok(X,Y)) return [X,Y]; } return null; }
function mkJelly(kind,x,y,s,role){ var j={kind:kind,K:JM.kinds[kind],s:s,role:role,x:x,y:y,hx:x,hy:y,t:rnd(0,2),wait:rnd(.6,3),ph:rnd(0,6.28),dir:(Math.random()*8)|0,
    hop:null,chain:2+((Math.random()*3)|0),happy:0,emo:null,emoT:0,cool:rnd(0,2),eat:null,id:JELLIES.length,trail:[[x,y]],lookT:rnd(1,4),lookBack:-1,turnT:0,
    bumpCool:rnd(3,8),seek:null,awake:0,dawT:rnd(6,16),dawdle:0,hurry:false,lead:null,fam:-1};
  j.dir=2; JELLIES.push(j); return j; }
function initJellies(){ JELLIES=[]; var taken=[];
  JELLY_FAM.forEach(function(f,fi){ var p=jellySpot(f[1],f[2],taken); if(!p) return; taken.push(p);
    var L=mkJelly(f[0],p[0],p[1],1.3,'lead'); L.fam=fi; var prev=L, a0=rnd(0,6.28);
    for(var b=0;b<f[3];b++){ var q=jellySpot(prev.x+Math.cos(a0)*22,prev.y+Math.sin(a0)*16,taken); if(!q) continue; taken.push(q);
      var c=mkJelly(f[0],q[0],q[1],.55,'baby'); c.fam=fi; c.lead=prev; c.trail=[[q[0],q[1]]]; prev=c; } });
  JELLY_SOLO.forEach(function(d){ var p=jellySpot(d[1],d[2],taken); if(!p) return; taken.push(p); mkJelly(d[0],p[0],p[1],d[3],'solo'); }); }
function jellyH(j){ return j.K.h*j.s; }
function jellyR(j){ return j.K.h*j.s*.45; }
function isBaby(j){ return j.s<.7; }
/* hop curve: anticipation squash -> launch stretch / airborne -> landing squash -> jiggle settle */
function hopShape(u,H){ var sx=1,sy=1,z=0, a;
  if(u<.15){ a=u/.15; sx=1+.15*a; sy=1-.19*a; }
  else if(u<.70){ a=(u-.15)/.55; z=H*Math.sin(a*Math.PI); sx=.9+.1*a; sy=1.14-.16*a; }
  else if(u<.88){ a=(u-.70)/.18; var q=Math.sin(a*Math.PI); sx=1+.2*q; sy=1-.24*q; }
  else { a=(u-.88)/.12; var w=Math.sin(a*Math.PI*2)*(1-a); sx=1-.04*w; sy=1+.04*w; }
  return {sx:sx,sy:sy,z:z}; }
function jellyHop(j,tx,ty,big,o){ o=o||{}; var baby=isBaby(j), dur=big?.9:(baby?(j.hurry?.28:.38):(j.s>1.2?.74:.62)), H=(big?28:10)*(baby?.75:(j.s>1.2?1.15:1));
  if(o.bump){ dur=baby?.34:.5; H=baby?5:7; }
  j.hop={x0:j.x,y0:j.y,x1:tx,y1:ty,t:0,dur:dur,big:!!big,H:H}; j.lookBack=-1;
  if(!o.noTurn&&Math.hypot(tx-j.x,ty-j.y)>2){ var nd=jdir8(tx-j.x,ty-j.y); if(nd!==j.dir) j.turnT=.14; j.dir=nd; } }
function faceHeroDir(j){ var d=jdir8(P.x-j.x,P.y-j.y); if(d>=5) d=P.x<j.x?4:0; return d; }
function jellyHappy(j,sym){ if(j.happy>0) return; j.happy=1.3; j.awake=8; j.emo=sym||(Math.random()<.6?'♥':'!'); j.emoT=1.5; j.cool=5; j.dir=faceHeroDir(j); j.lookBack=-1; j.dawdle=0;
  if(!j.hop) jellyHop(j,j.x,j.y,true); else j.hop.big=true, j.hop.H=28*(isBaby(j)?.75:1); }
function sleeping(j){ return isNight&&j.awake<=0&&!j.hop&&!j.eat&&j.happy<=0&&!j.hurry; }
function landed(j){ j.trail.push([j.x,j.y]); if(j.trail.length>24) j.trail.shift();
  // bump into a jelly from another group -> both boing back a little
  if(j.bumpCool>0&&!j.seek) return;
  for(var i=0;i<JELLIES.length;i++){ var o=JELLIES[i]; if(o===j||(o.fam>=0&&o.fam===j.fam)||o.eat||(o!==j.seek&&(o.hop||o.bumpCool>0))) continue;
    var d=Math.hypot(o.x-j.x,(o.y-j.y)*1.4); if(d<jellyR(j)+jellyR(o)+3){ jellyBump(j,o); return; } } }
function jellyBump(a,b){ var dx=b.x-a.x, dy=b.y-a.y, d=Math.hypot(dx,dy)||1; dx/=d; dy/=d;
  [[a,-1],[b,1]].forEach(function(e){ var j=e[0], k=e[1], st=12*(isBaby(j)?.7:1), tx=j.x+dx*st*k, ty=j.y+dy*st*k*.8;
    j.dir=jdir8(-dx*k,-dy*k); j.seek=null; j.bumpCool=rnd(10,18); j.awake=Math.max(j.awake,3);
    if(jellyClear(tx,ty)&&lineClear(j.x,j.y,tx,ty)) jellyHop(j,tx,ty,false,{bump:1,noTurn:1}); else jellyHop(j,j.x,j.y,false,{bump:1,noTurn:1});
    j.wait=rnd(.6,1.2); j.chain=1; });
  a.emo=Math.random()<.5?'!':'♪'; a.emoT=1.2; if(Math.random()<.6){ b.emo=Math.random()<.5?'!':'?'; b.emoT=1.2; } }
function idleLook(j,dt){ if(j.hop||j.eat) return; j.lookT-=dt; if(j.lookT>0) return;
  if(j.lookBack>=0){ j.dir=j.lookBack; j.lookBack=-1; j.turnT=.12; j.lookT=rnd(1.6,4.5); return; }
  if(Math.random()<.65){ j.lookBack=j.dir; j.dir=(j.dir+[-2,-1,1,2,4,3,-3][(Math.random()*7)|0]+8)&7; j.turnT=.12; j.lookT=rnd(.5,1.2); } else j.lookT=rnd(1,3); }
function trailTarget(pred,sp){ var tr=pred.trail, acc=0, px=pred.x, py=pred.y;
  for(var i=tr.length-1;i>=0;i--){ var q=tr[i], d=Math.hypot(q[0]-px,q[1]-py); if(acc+d>=sp){ var f=(sp-acc)/(d||1); return [px+(q[0]-px)*f, py+(q[1]-py)*f]; } acc+=d; px=q[0]; py=q[1]; }
  return [px,py]; }
function followStep(j,dt){ var pred=j.lead, sp=(jellyR(pred)+jellyR(j))*.85, d=Math.hypot(pred.x-j.x,pred.y-j.y);
  if(j.dawdle>0){ j.dawdle-=dt; idleLook(j,dt*2.2); if(d<sp+90&&j.dawdle>0) return true; j.dawdle=0; if(d>sp+14){ j.hurry=true; j.emo='!'; j.emoT=1; } }
  if(j.dawT<=0){ j.dawT=rnd(9,20); if(Math.random()<.6&&!isNight){ j.dawdle=rnd(2,3.6); j.lookT=0; return true; } }
  if(!j.hurry&&d>sp+26){ j.hurry=true; j.emo='!'; j.emoT=1; } if(j.hurry&&d<sp+8) j.hurry=false;
  if(d<=sp+5){ j.wait=rnd(.1,.35); return false; }
  var tg=trailTarget(pred,sp), dx=tg[0]-j.x, dy=tg[1]-j.y, dd=Math.hypot(dx,dy);
  if(dd<3){ j.wait=.2; return false; }
  var st=Math.min(dd,j.hurry?18:11), tx=j.x+dx/dd*st, ty=j.y+dy/dd*st, w=rnd(-3,3), ux=-dy/dd, uy=dx/dd;
  if(jellyClear(tx+ux*w,ty+uy*w)&&lineClear(j.x,j.y,tx+ux*w,ty+uy*w)){ tx+=ux*w; ty+=uy*w; }
  if(free(tx,ty)&&lineClear(j.x,j.y,tx,ty)){ jellyHop(j,tx,ty); j.wait=j.hurry?.03:rnd(.05,.22); return false; }
  var pth=astar(j.x,j.y,pred.x,pred.y); if(pth&&pth.length){ var q=pth[0]; dx=q[0]-j.x; dy=q[1]-j.y; dd=Math.hypot(dx,dy)||1; st=Math.min(dd,12); tx=j.x+dx/dd*st; ty=j.y+dy/dd*st; if(free(tx,ty)&&lineClear(j.x,j.y,tx,ty)){ jellyHop(j,tx,ty); return false; } }
  j.wait=.4; return false; }
function updateJellies(dt){
  JELLIES.forEach(function(j){
    j.t+=dt; if(j.cool>0) j.cool-=dt; if(j.happy>0) j.happy-=dt; if(j.awake>0) j.awake-=dt; if(j.role==='baby') j.dawT-=dt; if(j.bumpCool>0) j.bumpCool-=dt; if(j.turnT>0) j.turnT-=dt;
    if(j.emoT>0){ j.emoT-=dt; if(j.emoT<=0) j.emo=null; }
    // hero comes close: wake up, turn toward the hero with a happy face and jump
    if(j.cool<=0&&Math.hypot(P.x-j.x,(P.y-j.y)*1.4)<(isBaby(j)?46:56)) jellyHappy(j);
    if(j.happy>0) j.dir=faceHeroDir(j);
    if(j.hop){ var h=j.hop; h.t+=dt; var u=Math.min(1,h.t/h.dur), m=Math.min(1,Math.max(0,(u-.15)/.55));
      j.x=h.x0+(h.x1-h.x0)*m; j.y=h.y0+(h.y1-h.y0)*m;
      if(u>=1){ j.hop=null; j.x=h.x1; j.y=h.y1; landed(j); if(j.hop) return;
        if(j.role==='baby'){ } else if(j.eat) j.wait=.12; else if(--j.chain>0) j.wait=rnd(.12,.35); else { j.chain=2+((Math.random()*3)|0); j.wait=isNight&&j.awake<=0?rnd(5,10):rnd(1.4,3.6); } }
      return; }
    if(j.role==='baby'&&j.lead){ j.wait-=dt; if(j.wait>0){ if(!sleeping(j)) idleLook(j,dt); return; } followStep(j,dt); return; }
    // nibbling a berry
    if(j.eat){ var b=j.eat;
      if(b.st!=='ground'){ j.eat=null; j.nib=0; j.path=null; }
      else if(Math.hypot(b.x-j.x,b.y-j.y)<14*Math.max(1,j.s)){ j.nib=(j.nib||0)+dt; j.dir=jdir8(b.x-j.x,b.y-j.y+6); if(j.dir>=5) j.dir=2; if(j.nib>2.4){ j.nib=0; j.eat=null; pickBerry(b,j); j.emoT=1.6; j.cool=1.5; jellyHop(j,j.x,j.y,true); } return; }
      else { j.wait-=dt; if(j.wait<=0){ var wp=(j.path&&j.path.length)?j.path[0]:[b.x,b.y], dx=wp[0]-j.x, dy=wp[1]-j.y, d=Math.hypot(dx,dy)||1, last=!j.path||j.path.length<=1, st=Math.min(last?d-8:d,24);
          if(st<1&&j.path&&j.path.length){ j.path.shift(); return; }
          var tx=j.x+dx/d*st, ty=j.y+dy/d*st;
          if(free(tx,ty)&&lineClear(j.x,j.y,tx,ty)) { jellyHop(j,tx,ty); if(!last&&Math.hypot(wp[0]-tx,wp[1]-ty)<3) j.path.shift(); } else { j.eat=null; j.path=null; } } return; } }
    j.wait-=dt; if(j.wait>0){ if(!sleeping(j)) idleLook(j,dt); return; }
    if(sleeping(j)&&Math.random()<.8){ j.wait=rnd(4,9); return; }
    // a family leader waits for a baby that fell behind (and looks back at it)
    if(j.role==='lead'){ var lag=null; JELLIES.forEach(function(o){ if(o.fam===j.fam&&o!==j&&Math.hypot(o.x-j.x,o.y-j.y)>(o.dawdle>0?100:78)+(o.id%3)*10) lag=o; });
      if(lag){ j.dir=jdir8(lag.x-j.x,lag.y-j.y); j.wait=rnd(.5,.9); return; } }
    // look for a berry that has been lying around a while
    var best=null, bd=1e9; berries.forEach(function(b){ if(b.st!=='ground'||b.t<4||Math.hypot(P.x-b.x,P.y-b.y)<90||JELLIES.some(function(o){return o!==j&&o.eat===b;})) return; var d=Math.hypot(b.x-j.x,b.y-j.y); if(d<240&&d<bd){ bd=d; best=b; } });
    if(best){ var pth=lineClear(j.x,j.y,best.x,best.y)?[[best.x,best.y]]:astar(j.x,j.y,best.x,best.y), L=0, px=j.x, py=j.y;
      if(pth&&pth.length){ pth.forEach(function(q){ L+=Math.hypot(q[0]-px,q[1]-py); px=q[0]; py=q[1]; }); if(L<320){ j.eat=best; j.path=pth.slice(); j.wait=0; return; } } }
    // sometimes waddle over to another jelly and bump into it
    if(!j.seek&&j.bumpCool<=0&&!isNight&&Math.random()<.22){ var c=null, cd=1e9; JELLIES.forEach(function(o){ if(o===j||(o.fam>=0&&o.fam===j.fam)||o.eat||o.role==='baby') return; var d=Math.hypot(o.x-j.x,o.y-j.y); if(d<130&&d<cd&&lineClear(j.x,j.y,o.x,o.y)){ cd=d; c=o; } }); if(c){ j.seek=c; j.seekT=7; } }
    if(j.seek){ var o=j.seek; j.seekT-=1; var dx2=o.x-j.x, dy2=o.y-j.y, d2=Math.hypot(dx2,dy2)||1, gap=jellyR(j)+jellyR(o)+1;
      if(j.seekT<0||d2>200){ j.seek=null; j.bumpCool=6; }
      else { var st2=Math.min(22,Math.max(8,d2-gap+5)), tx2=j.x+dx2/d2*st2, ty2=j.y+dy2/d2*st2; if(free(tx2,ty2)&&lineClear(j.x,j.y,tx2,ty2)){ jellyHop(j,tx2,ty2); j.chain=9; return; } j.seek=null; j.bumpCool=6; } }
    // wander: a short hop toward a spot near home (never near doors, NPCs, the fountain)
    var R=j.role==='lead'?150:120;
    for(var k=0;k<8;k++){ var a=(k<3&&j.role==='lead')?(j.dir*Math.PI/4+rnd(-.7,.7)):rnd(0,6.28), r=rnd(14,26)*(j.s>1.2?1.1:1), tx=j.x+Math.cos(a)*r, ty=j.y+Math.sin(a)*r*.7;
      if(Math.hypot(tx-j.hx,(ty-j.hy)*1.3)>R){ a=Math.atan2(j.hy-j.y,j.hx-j.x)+rnd(-.5,.5); tx=j.x+Math.cos(a)*r; ty=j.y+Math.sin(a)*r; }
      if(jellyClear(tx,ty)&&lineClear(j.x,j.y,tx,ty)){ jellyHop(j,tx,ty); return; } }
    j.wait=rnd(.5,1.5);
  });
}
function jellyPose(j){ var sx=1,sy=1,z=0, baby=isBaby(j);
  if(j.hop){ var s=hopShape(Math.min(1,j.hop.t/j.hop.dur),j.hop.H); sx=s.sx; sy=s.sy; z=s.z; }
  else if(j.eat&&j.nib>0){ var q=Math.sin(j.t*16); sx=1+.06*q; sy=1-.07*q; }
  else if(sleeping(j)){ var q=Math.sin(j.t*1.3+j.ph); sx=1.03+.035*q; sy=.97-.045*q; }      // slow sleepy breathing
  else { var q=Math.sin(j.t*(baby?5.2:j.s>1.2?2.4:3.1)+j.ph); sx=1+.045*q; sy=1-.055*q; } // idle breathing squish (babies quicker)
  if(j.turnT>0){ var tq=Math.sin(j.turnT/.14*Math.PI); sx*=1+.05*tq; sy*=1-.05*tq; }
  if(baby){ sx*=1.05; sy*=.97; }                                                             // babies a touch rounder
  return {sx:sx,sy:sy,z:z}; }
function jellyFrame(j){ if(sleeping(j)) return [8,0];
  var dc=JDIR[j.dir], col=dc[0], fl=dc[1];
  if(j.happy>0||(j.eat&&j.nib>0&&Math.sin(j.t*5)>0)){ col=col===0?5:col===1?6:7; }
  return [col,fl]; }
function drawJelly(j){
  var p=jellyPose(j), w=JM.cw/JM.sc*j.s, h=JM.ch/JM.sc*j.s, foot=4/JM.sc*j.s, f=jellyFrame(j);
  cx.save(); cx.translate(j.x,j.y-p.z); if(f[1]) cx.scale(-1,1); cx.scale(p.sx,p.sy); cx.globalAlpha=.97;
  cx.drawImage(IMG['jelly.png'],f[0]*JM.cw,j.kind*JM.ch,JM.cw,JM.ch,-w/2,-h+foot,w,h); cx.restore();
}
function jellyZzz(j){ if(!sleeping(j)) return; var h=jellyH(j), base=j.t*.55+j.ph;
  cx.save(); cx.textAlign='center'; cx.lineWidth=2.5; cx.strokeStyle='rgba(40,40,80,.55)';
  for(var i=0;i<3;i++){ var u=(base+i/3)%1, sz=(isBaby(j)?6:8)+u*5; cx.globalAlpha=Math.sin(u*Math.PI)*.95; cx.font='bold '+sz.toFixed(1)+'px sans-serif';
    var x=j.x+6+u*12*Math.max(.7,j.s)+Math.sin(u*6)*2, y=j.y-h-2-u*20*Math.max(.7,j.s); cx.strokeText('z',x,y); cx.fillStyle='#eef0ff'; cx.fillText('z',x,y); }
  cx.restore(); }
function jellyShadow(j){ var p=jellyPose(j), r=JM.kinds[j.kind].h*.42*j.s*(1-Math.min(.45,p.z/40))*p.sx;
  cx.save(); cx.globalAlpha=1-Math.min(.5,p.z/40); shadow(j.x,j.y+1,r); cx.restore(); }
function jellyAt(x,y){ var best=null; for(var i=JELLIES.length-1;i>=0;i--){ var j=JELLIES[i], h=jellyH(j), wv=Math.max(h*.55,13); if(Math.abs(x-j.x)<wv&&y<j.y+6&&y>j.y-Math.max(h,22)-4&&(!best||j.y>best.y)) best=j; } return best; }
var chatT=2;
function updateCrowd(dt){
  chatT-=dt;
  CROWD.forEach(function(n){ if(n.bub){ n.bub.t-=dt; if(n.bub.t<=0) n.bub=null; } if(n.emoT>0){ n.emoT-=dt; if(n.emoT<=0) n.emo=null; } });
  if(chatT<=0){ chatT=rnd(2.2,4.5);
    var live=CROWD.filter(function(n){return n.bub;}).length, idle=CROWD.filter(function(n){return !n.bub&&!n.emo;});
    if(live<2&&idle.length){ var n=idle[(Math.random()*idle.length)|0];
      if(Math.random()<.35){ n.emo=['♪','…','♥','?','!'][(Math.random()*5)|0]; n.emoT=1.8; }
      else { var L=crowdNight?n.d.cn:n.d.cd; chat(n,L[(Math.random()*L.length)|0],3); } } }
  if(P.bub){ P.bub.t-=dt; if(P.bub.t<=0) P.bub=null; }
}
function drawBerry(x,y,s,kind,a){
  var c1=kind?'#6b3d9e':'#c8243a', c2=kind?'#a77bdc':'#f0566a';
  cx.save(); cx.translate(x,y); cx.scale(s,s); cx.globalAlpha=a==null?1:a;
  var P5=[[0,-2],[-3.2,0],[3.2,0],[-1.6,3],[1.6,3],[0,1]];
  P5.forEach(function(p){ var g=cx.createRadialGradient(p[0]-1,p[1]-1.2,.3,p[0],p[1],3.3); g.addColorStop(0,c2); g.addColorStop(1,c1); cx.fillStyle=g; cx.beginPath(); cx.arc(p[0],p[1],3.1,0,7); cx.fill(); });
  cx.fillStyle='rgba(255,255,255,.75)'; cx.beginPath(); cx.arc(-1.4,-3,1,0,7); cx.arc(2.2,-1.2,.7,0,7); cx.fill();
  cx.fillStyle='#4f8a2e'; cx.beginPath(); cx.ellipse(-2,-5.4,3,1.4,-.5,0,7); cx.ellipse(2,-5.4,3,1.4,.5,0,7); cx.fill();
  cx.strokeStyle='#5b3a1e'; cx.lineWidth=1; cx.beginPath(); cx.moveTo(0,-4.6); cx.lineTo(.6,-7.6); cx.stroke();
  cx.restore();
}
function drawStar4(x,y,s,a,col){ cx.fillStyle=col||'rgba(255,255,255,'+a+')'; if(col) cx.globalAlpha=a;
  cx.beginPath(); cx.moveTo(x,y-s*2.2); cx.lineTo(x+s*.5,y); cx.lineTo(x,y+s*2.2); cx.lineTo(x-s*.5,y); cx.closePath(); cx.fill();
  cx.beginPath(); cx.moveTo(x-s*2.2,y); cx.lineTo(x,y+s*.5); cx.lineTo(x+s*2.2,y); cx.lineTo(x,y-s*.5); cx.closePath(); cx.fill(); cx.globalAlpha=1; }
function rrect(g,x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
function cbubble(x,y,text,a){
  cx.save(); cx.globalAlpha=a; cx.font='700 13px "Gowun Dodum","Gowun Batang",sans-serif'; var w=Math.ceil(cx.measureText(text).width)+18, h=24;
  cx.fillStyle='rgba(255,251,240,.96)'; cx.strokeStyle='rgba(122,88,54,.8)'; cx.lineWidth=1.3;
  rrect(cx,x-w/2,y-h-7,w,h,10); cx.fill(); cx.stroke();
  cx.beginPath(); cx.moveTo(x-5,y-7.6); cx.lineTo(x,y-1); cx.lineTo(x+5,y-7.6); cx.fill(); cx.beginPath(); cx.moveTo(x-5,y-7); cx.lineTo(x,y-1); cx.lineTo(x+5,y-7); cx.stroke();
  cx.fillStyle='#4a3426'; cx.textAlign='center'; cx.textBaseline='middle'; cx.fillText(text,x,y-h/2-7+.5); cx.restore();
}
function cemote(x,y,sym,a){
  cx.save(); cx.globalAlpha=a; cx.fillStyle='rgba(255,251,240,.96)'; cx.strokeStyle='rgba(122,88,54,.8)'; cx.lineWidth=1.3;
  cx.beginPath(); cx.arc(x,y-17,12,0,7); cx.fill(); cx.stroke();
  cx.beginPath(); cx.moveTo(x-4,y-7); cx.lineTo(x+1,y-1); cx.lineTo(x+3,y-7); cx.fill();
  cx.font='700 14px "Gowun Dodum",sans-serif'; cx.textAlign='center'; cx.textBaseline='middle';
  cx.fillStyle=sym==='♥'?'#e0506a':sym==='!'?'#d0702a':'#5a4a8a'; cx.fillText(sym,x,y-16.5); cx.restore();
}
function flameShape(x,y,w,h,sw,c0,c1){
  var g=cx.createLinearGradient(x,y,x,y-h); g.addColorStop(0,c0); g.addColorStop(1,c1); cx.fillStyle=g;
  cx.beginPath(); cx.moveTo(x-w/2,y); cx.bezierCurveTo(x-w*.62,y-h*.45,x+sw*.4-w*.18,y-h*.7,x+sw,y-h);
  cx.bezierCurveTo(x+sw*.4+w*.18,y-h*.7,x+w*.62,y-h*.45,x+w/2,y); cx.closePath(); cx.fill();
}
function drawFire(k){   // flames live in the depth sort, so anyone sitting behind the fire is partly hidden by them
  if(k<=0.01) return; var x=PT.cx, y=PT.cy-2;
  cx.save(); cx.globalAlpha=Math.min(1,k*1.3); cx.translate(x,y); cx.scale(1.3,1.38); cx.translate(-x,-y);
  var g=cx.createRadialGradient(x,y,0,x,y,34); g.addColorStop(0,'rgba(255,200,90,.95)'); g.addColorStop(.6,'rgba(240,110,40,.55)'); g.addColorStop(1,'rgba(200,60,20,0)');
  cx.fillStyle=g; cx.beginPath(); cx.ellipse(x,y,34,13,0,0,7); cx.fill();
  for(var i=0;i<6;i++){ var ph=fireT*(5.2+i*.8)+i*1.9, off=(i-2.5)*7, hh=(54-Math.abs(i-2.5)*11)*(.84+.18*Math.sin(ph)+.07*Math.sin(ph*2.9));
    flameShape(x+off+Math.sin(ph*.7)*2,y,15-Math.abs(i-2.5)*1.8,hh,Math.sin(ph*1.1)*6,'rgba(255,120,30,.92)','rgba(220,50,20,0)'); }
  for(i=0;i<4;i++){ var ph2=fireT*(6.5+i)+i*2.3, hh2=(36-Math.abs(i-1.5)*8)*(.85+.2*Math.sin(ph2));
    flameShape(x+(i-1.5)*6+Math.sin(ph2*.8)*1.5,y,11,hh2,Math.sin(ph2*1.3)*4,'rgba(255,215,90,.98)','rgba(255,150,40,0)'); }
  flameShape(x+Math.sin(fireT*7)*1.2,y,9,18+3*Math.sin(fireT*9),Math.sin(fireT*8)*2,'rgba(255,250,215,1)','rgba(255,220,120,0)');
  cx.restore();
}

/* ---------------- input ---------------- */
var keys={};
var KEYMAP={ArrowUp:'u',KeyW:'u',ArrowDown:'d',KeyS:'d',ArrowLeft:'l',KeyA:'l',ArrowRight:'r',KeyD:'r'};
window.addEventListener('keydown',function(e){
  if(BMON) return;
  if(!win.classList.contains('hidden')){ if(e.key==='Escape') closeWin(); return; }
  if(e.target&&e.target.tagName==='INPUT') return;
  var k=KEYMAP[e.code]; if(k){ if(P.kick) return; keys[k]=1; P.path=null; P.goal=null; P.arrive=null; marker=null; e.preventDefault(); dismissHint();}
  if((e.key==='Enter'||e.code==='Space')&&near){ e.preventDefault(); openWin(near); }
});
window.addEventListener('keyup',function(e){var k=KEYMAP[e.code]; if(k) keys[k]=0;});
window.addEventListener('blur',function(){keys={};});
var cam={x:P.x,y:P.y};
function toWorld(cx_,cy_){return [ (cx_-VW/2)/Z+cam.x, (cy_-VH/2)/Z+cam.y ];}
var marker=null;
function inPoly(x,y,poly){var c=false;for(var i=0,j=poly.length-1;i<poly.length;j=i++){var xi=poly[i][0]*S,yi=poly[i][1]*S,xj=poly[j][0]*S,yj=poly[j][1]*S;if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c;}return c;}
cv.addEventListener('pointerdown',function(e){
  if(BMON) return;
  dismissHint();
  var w=toWorld(e.clientX,e.clientY), x=w[0], y=w[1];
  var jj=jellyAt(x,y); if(jj){ jj.happy=0; jellyHappy(jj,Math.random()<.65?'♥':'!'); return; }
  for(var i=0;i<NPCS.length;i++){var n=NPCS[i],hh=n.h; if(Math.abs(x-n.x)<Math.max(hh*.35,26)&&y<n.y+6&&y>n.y-hh){talk(n);return;}}
  if(P.kick) return;
  if(onTree(x,y)){ kickTree(); return; }
  var hit=null;
  for(i=0;i<B.length;i++){ if(inPoly(x,y,B[i].occ)){hit=B[i];break;} }
  if(hit){ goTo(hit.dx,hit.dy,hit); return; }
  goTo(x,y,null);
});
function goTo(x,y,b){
  P.arrive=null;
  var t=free(x,y)?[x,y]:nearestFree(x,y);
  if(!t){ if(b) openWin(b); return; }
  if(!free(P.x,P.y)){ var q=nearestFree(P.x,P.y); if(q){ P.x=q[0]; P.y=q[1]; } }
  var p=astar(P.x,P.y,t[0],t[1]);
  if(!p){ if(b) openWin(b); return; }          // never leave a click unanswered
  if(!p.length){ if(b) openWin(b); return; }
  P.path=p; P.goal=b; P.stuck=0; P.repath=0; marker={x:t[0],y:t[1],t:0};
}
plate.addEventListener('click',function(){ if(!BMON&&near) openWin(near); });
plate.addEventListener('keydown',function(e){ if(!BMON&&e.key==='Enter'&&near) openWin(near); });
mEnter.addEventListener('click',function(){ if(!BMON&&near) openWin(near); });
if(window.matchMedia('(pointer:coarse)').matches){ hint.innerHTML='<span>탭 한 곳으로 걸어가요</span><i>✦</i><span>건물을 탭하면 바로 들어가요</span>'; }
var hintGone=false; function dismissHint(){ if(hintGone) return; hintGone=true; setTimeout(function(){hint.style.opacity='0';},4500); }

/* ---------------- talk ---------------- */
var talkN=null, talkT=0;
function talk(n){ n.li=((n.li==null?-1:n.li)+1)%n.lines.length; talkN=n; talkT=Math.max(4.2,n.lines[n.li].length*.085); bubble.innerHTML='<b>'+n.name+'</b>'+n.lines[n.li]; bubble.classList.remove('hidden'); }

/* ---------------- window ---------------- */
var curB=null, curTab='';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function medalStyle(el,b){
  el.classList.toggle('px',!!b.medal); if(b.medal){ b.medal(el); return; }
  var c=b.crop, sz=c[2];
  el.style.backgroundImage='url('+ASSET+'town.jpg)';
  el.style.backgroundSize=(1280/sz*100)+'% auto';
  el.style.backgroundPosition=(c[0]/(1280-sz)*100)+'% '+(c[1]/(720-sz)*100)+'%';
}
function openWin(b,tab){
  curB=b; curTab=tab||'';
  win.classList.toggle('haunt',!!b.haunt); document.documentElement.classList.toggle('tw-haunt-open',!!b.haunt);
  win.classList.toggle('shop',!!b.shop);
  keys={}; P.path=null; P.moving=false; marker=null;
  medalStyle($('.medal-img',win),b);
  $('.win-kicker',win).textContent=b.kicker;
  $('#winTitle').textContent=b.name;
  $('.win-desc',win).textContent=b.desc;
  var more=$('.win-more',win); if(more){ more.href=b.url; more.style.display=''; more.textContent=(b.key==='공지'?'공지 전체 보기':'카테고리 페이지')+' ▸'; }
  var tabs=$('.win-tabs',win); tabs.innerHTML='';
  var subs={}; b.posts.forEach(function(p){ if(p.s) subs[p.s]=(subs[p.s]||0)+1; });
  var sk=Object.keys(subs);
  if(b.subs){   // fixed sub-boards (always shown, even with 0 posts)
    var mkS=function(lbl,val,n,ico){ var bt=document.createElement('button'); bt.type='button'; bt.innerHTML=(ico?'<i>'+ico+'</i>':'')+esc(lbl)+' <b>'+n+'</b>'; bt.dataset.v=val; if(val===curTab) bt.className='on';
      bt.onclick=function(){ curTab=val; [].forEach.call(tabs.querySelectorAll('button'),function(x){x.className=x.dataset.v===val?'on':'';}); hauntMore(b); renderList(); }; tabs.appendChild(bt); };
    tabs.classList.add('hb');
    mkS('전체','',b.posts.length,'');
    var grp=null;
    b.subs.forEach(function(x){ var n=subs[x.s]||0;
      if(!x.grp){ mkS(x.lbl,x.s,n,x.ico); return; }
      if(!grp){ grp=document.createElement('div'); grp.className='hb-split'; grp.innerHTML='<span class="hb-lbl">'+esc(x.grp)+'</span>'; tabs.appendChild(grp); }
      var bt=document.createElement('button'); bt.type='button'; bt.dataset.v=x.s; if(x.s===curTab) bt.className='on';
      bt.innerHTML='<i>'+x.ico+'</i>'+esc(x.lbl)+(x.note?'<small>'+esc(x.note)+'</small>':'')+' <b>'+n+'</b>'; bt.title=x.s;
      bt.onclick=function(){ curTab=x.s; [].forEach.call(tabs.querySelectorAll('button'),function(y){y.className=y.dataset.v===x.s?'on':'';}); hauntMore(b); renderList(); }; grp.appendChild(bt); });
  } else if(sk.length){
    var mk=function(lbl,val,n){var bt=document.createElement('button');bt.type='button';bt.textContent=lbl+' '+n;bt.dataset.v=val;if(val===curTab)bt.className='on';
      bt.onclick=function(){curTab=val;[].forEach.call(tabs.children,function(x){x.className=x.dataset.v===val?'on':'';});renderList();};tabs.appendChild(bt);};
    mk('전체','',b.posts.length); sk.sort(function(a,b2){return subs[b2]-subs[a]}).forEach(function(s){mk(s.replace(' [PHP]',''),s,subs[s]);});
  }
  var inp=$('.win-search input',win); inp.value=''; inp.placeholder=b.haunt?'오싹한 이야기 찾기…':'이 건물의 기록 찾기…';
  hauntMore(b);
  renderList();
  veil.classList.remove('hidden'); win.classList.remove('hidden');
  plate.classList.add('hidden'); mEnter.classList.add('hidden');
  setTimeout(function(){ if(window.matchMedia('(pointer:fine)').matches) inp.focus(); },60);
}
function hauntMore(b){ var more=$('.win-more',win); if(!more||!b||!b.subs) return; var sb=null; b.subs.forEach(function(x){ if(x.s===curTab) sb=x; });
  setTimeout(function(){ more.href=sb?sb.url:b.url; more.style.display=''; more.textContent=(sb?sb.s:b.key)+' 카테고리 ▸'; },0); }
function postLi(p,showSub){
  return '<li><a href="'+esc(p.u)+'" ><span class="t">'+(showSub&&p.s?'<span class="sub">'+esc(p.s.replace(' [PHP]',''))+'</span>':'')+esc(p.t)+(p.p?'<span class="lock">비공개</span>':'')+'</span><span class="d">'+esc(p.d.replace(/-/g,'.'))+'</span></a></li>';
}
function renderList(){
  var q=$('.win-search input',win).value.trim().toLowerCase(), ul=$('.win-list',win), html='', n=0;
  if(curB==='ALL'){
    if(!q){ var all=[]; B.forEach(function(b){ b.posts.forEach(function(p){ all.push(p); }); });
      all.sort(function(a,b2){ return (b2.d||'').localeCompare(a.d||''); });
      if(all.length){ html+='<li class="grp recent">✦ 최근 글<small>새로 쌓인 기록</small></li>'; all.slice(0,6).forEach(function(p){ html+=postLi(p,true); }); } }
    B.forEach(function(b){
      var ps=b.posts.filter(function(p){return !q||p.t.toLowerCase().indexOf(q)>=0;}); if(!ps.length) return;
      html+='<li class="grp" data-k="'+esc(b.key)+'">'+b.ico+' '+esc(b.name)+'<small>'+esc(b.key)+' · '+ps.length+'편</small></li>';
      ps.forEach(function(p){html+=postLi(p,true);}); n+=ps.length;
    });
  } else {
    var ps=curB.posts.filter(function(p){return (!curTab||p.s===curTab)&&(!q||p.t.toLowerCase().indexOf(q)>=0);});
    ps.forEach(function(p){html+=postLi(p,!curTab);}); n=ps.length;
  }
  var qq=$('.win-search input',win).value.trim();
  if(qq) html+='<li class="ext"><a href="'+esc(SEARCH_BASE+encodeURIComponent(qq))+'" >블로그 전체에서 “'+esc(qq)+'” 검색하기 ↗</a></li>';
  var spooky=curB&&curB!=='ALL'&&curB.haunt;
  ul.innerHTML=html||(spooky&&!q?'<li class="empty spooky"><span class="boo" aria-hidden="true">勅<br>令</span><b>아직 글이 없어요…</b><small>'+(curTab?esc(curTab)+' 방':'귀신의 집')+'은 아직 고요해요. 밤이 깊으면 누군가 오싹한 이야기를 두고 갈지도 몰라요.</small></li>':'<li class="empty">'+(q?'찾는 기록이 없어요.':'아직 공개된 기록이 없어요. 곧 채워질 거예요.')+'</li>');
  ul.scrollTop=0;
  $('.win-count',win).textContent='기록 '+n+'편';
}
$('.win-search input',win).addEventListener('input',renderList);
$('.win-search input',win).addEventListener('keydown',function(e){ if(e.key==='Enter'){ var v=this.value.trim(); var first=$('.win-list a',win);
  if(v&&(!first||first.parentNode.className==='ext')) window.open(SEARCH_BASE+encodeURIComponent(v),'_blank','noopener'); } });
function closeWin(){ win.classList.remove('haunt'); win.classList.remove('shop'); document.documentElement.classList.remove('tw-haunt-open'); win.classList.add('hidden'); veil.classList.add('hidden'); curB=null; near=null; }
$('.win-close',win).onclick=closeWin; $('.win-back',win).onclick=closeWin; veil.onclick=closeWin;
$('.win-list',win).addEventListener('click',function(e){ var g=e.target.closest('.grp'); if(g){ var b=B.filter(function(x){return x.key===g.dataset.k;})[0]; if(b) openWin(b);} });
function openAll(focusSearch){
  curB='ALL'; curTab=''; win.classList.remove('haunt'); win.classList.remove('shop'); document.documentElement.classList.remove('tw-haunt-open');
  var el=$('.medal-img',win); el.classList.remove('px');
  if(BMON&&window.__baram){ el.classList.add('px'); window.__baram.medalAll(el); }
  else { el.style.backgroundImage='url('+ASSET+'town.jpg)'; el.style.backgroundSize='300% auto'; el.style.backgroundPosition='50% 50%'; }
  $('.win-kicker',win).textContent='All Records'; $('#winTitle').textContent='전체 기록 목록';
  $('.win-desc',win).textContent='마을을 걷지 않고 바로 찾아볼 수 있어요. 건물 이름을 누르면 그 건물로 들어가요.';
  var more=$('.win-more',win); if(more){ more.href='/category'; more.textContent='전체 글 페이지 ▸'; }
  $('.win-tabs',win).innerHTML=''; var inp=$('.win-search input',win); inp.value=''; inp.placeholder='모든 기록에서 찾기… (제목)'; renderList();
  keys={}; P.path=null; marker=null;
  veil.classList.remove('hidden'); win.classList.remove('hidden'); plate.classList.add('hidden'); mEnter.classList.add('hidden');
  if(focusSearch||window.matchMedia('(pointer:fine)').matches) setTimeout(function(){ inp.focus(); },60);
}
$('#btnList').onclick=function(){ openAll(false); };
/* ---------------- quick nav: every board one click away, no walking needed ---------------- */
var SEARCH_BASE=CFG.searchBase||(/tistory\.com$/.test(location.hostname)?'/search/':'https://yeollo.tistory.com/search/');
var qnav=document.createElement('nav'); qnav.id='qnav'; qnav.setAttribute('aria-label','게시판 바로가기');
qnav.innerHTML='<button class="qn-toggle" type="button" aria-expanded="false"><span class="qn-burger">☰</span><span>게시판</span></button><div class="qn-list" role="list"></div>';
(document.getElementById('stage')||cv.parentNode).appendChild(qnav);
var qList=$('.qn-list',qnav), qTog=$('.qn-toggle',qnav), NAVLBL={};
function qItem(ico,name,meta,fn,cls){ var b=document.createElement('button'); b.type='button'; b.className='qn-item'+(cls?' '+cls:''); b.setAttribute('role','listitem');
  b.innerHTML='<span class="qn-ico">'+ico+'</span><span class="qn-name">'+esc(name)+'</span><span class="qn-meta">'+esc(meta)+'</span>';
  b.onclick=function(){ fn(); qnav.classList.remove('open'); qTog.setAttribute('aria-expanded','false'); }; return b; }
function totalPosts(){ var n=0; B.forEach(function(b){ n+=b.posts.length; }); return n; }
function refreshNav(){
  qList.innerHTML='';
  qList.appendChild(qItem('☰','전체글',String(totalPosts()),function(){ openAll(false); },'all'));
  B.forEach(function(b){ var L=NAVLBL[b.key]||{}; var it=qItem(L.ico||b.ico,L.name||b.navName||b.name,String(b.posts.length),function(){ openWin(L.b||b); },b.haunt?'haunt':(b.shop?'shop':'')); it.title=(b.navKey||b.key)+' 게시판'; qList.appendChild(it);
    if(b.subs){ var grpEl=null; b.subs.forEach(function(x){ var n=b.posts.filter(function(p){return p.s===x.s;}).length;
      if(!x.grp){ var si=qItem(x.ico,x.lbl,String(n),function(){ openWin(b,x.s); },'sub haunt-sub'); si.title=b.key+' › '+x.s; qList.appendChild(si); return; }
      if(!grpEl){ grpEl=document.createElement('div'); grpEl.className='qn-split'; grpEl.setAttribute('role','listitem'); grpEl.innerHTML='<span class="qn-ico">✦</span><span class="qn-slbl">'+esc(x.grp)+'</span>'; qList.appendChild(grpEl); }
      var h=document.createElement('button'); h.type='button'; h.className='qn-half'; h.title=b.key+' › '+x.s+(x.note?' ('+x.note+')':'');
      h.innerHTML='<span class="qn-name">'+esc(x.lbl)+'</span>'+(x.note?'<small>'+esc(x.note)+'</small>':'')+'<span class="qn-meta">'+n+'</span>';
      h.onclick=function(){ openWin(b,x.s); qnav.classList.remove('open'); qTog.setAttribute('aria-expanded','false'); }; grpEl.appendChild(h); }); } });
  qList.appendChild(qItem('⌕','검색','',function(){ openAll(true); },'search'));
}
qTog.onclick=function(){ var o=!qnav.classList.contains('open'); qnav.classList.toggle('open',o); qTog.setAttribute('aria-expanded',o?'true':'false'); };
refreshNav(); var navTicks=0, navIv=setInterval(function(){ refreshNav(); if(++navTicks>15) clearInterval(navIv); },2000);
$('#btnHelp').onclick=function(){ if(BMON&&window.__baram){ window.__baram.help(); return; } var g={x:P.x,y:P.y,h:HM.h,name:'안내',lines:['방향키·WASD 또는 클릭/탭으로 걸어요. 건물 문 앞에 서면 이름표가 뜨고, Enter나 이름표를 누르면 들어가요. 주민을 누르면 말을 걸 수 있어요. 열매 나무 아래 떨어진 산딸기를 주워 보세요! 오른쪽 위 ☀/☾ 버튼으로 낮·밤을 바꿀 수 있어요.']}; talk(g); };


/* ---------------- theme switch: 테일즈위버(그림) ⇄ 바람(픽셀) ---------------- */
/* 20261115d: 바람(픽셀) 테마 비활성화 — 코드는 남겨 두고 주석/가드 처리. 다시 켜려면 BARAM_ON=true + 아래 주석 해제 + style.css 의 바람 블록 주석 해제. */
var BARAM_ON=false;
var THEME=(function(){ try{ var v=localStorage.getItem('twTheme'); if(!BARAM_ON&&v&&v!=='tw'){ localStorage.setItem('twTheme','tw'); return 'tw'; } return v==='baram'?'baram':'tw'; }catch(e){ return 'tw'; } })();
var SVG_WIND='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" shape-rendering="crispEdges"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">'+
  '<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7a2.5 2.5 0 1 1-2.5 2.5"/></g><rect x="19" y="5" width="2" height="2" fill="currentColor"/><rect x="21" y="9" width="1.6" height="1.6" fill="currentColor"/></svg>';
var SVG_TW='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><g fill="currentColor">'+
  '<path d="M17.8 2.6c-4.6.9-8.4 4.7-9.6 9.9l-1.5 6.2 1.3.4 1.3-3.4c3.9-.4 6.8-2.6 8.1-6.1-1.1.4-2.1.5-3.1.4 1.6-.9 2.8-2.3 3.5-3.9-.9.3-1.8.4-2.6.3 1-.9 1.9-2.2 2.6-3.8z"/>'+
  '<path d="M6.6 9.2C4.6 8 2.6 8.1 1.2 9.1c1.4.1 2.5.6 3.4 1.5-1.3-.1-2.4.3-3.3 1.1 1.7-.2 3.1.2 4.3 1.1z" opacity=".85"/>'+
  '<path d="M13.4 15.6c1.9 1.3 2.6 3.2 2.3 4.9-.6-1.2-1.4-2-2.5-2.5.5 1.2.5 2.4 0 3.5-.6-1.6-1.6-2.8-2.9-3.6z" opacity=".85"/></g>'+
  '<path d="M7 21.4l1.7-6.8" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>';
function mkThemeBtn(id,svg,lab){ var b=document.createElement('button'); b.id=id; b.type='button'; b.className='tw-btn ghost theme-btn'; b.innerHTML=svg; b.title=lab; b.setAttribute('aria-label',lab);
  var tb=$('#topbar'); if(tb) tb.insertBefore(b,$('#btnNight',tb)||$('#btnHelp',tb)||null); return b; }
var btnTW=null, btnBR=null;
/* 바람 비활성화: 테마 아이콘(테일즈위버 / 바람) 숨김
if(BARAM_ON){ btnTW=mkThemeBtn('btnTW',SVG_TW,'테일즈위버 마을 (그림 테마)'); btnBR=mkThemeBtn('btnBaram',SVG_WIND,'바람의 마을 (픽셀 테마)'); }
*/
var fx=null; if(BARAM_ON){ fx=document.createElement('canvas'); fx.id='fx'; fx.setAttribute('aria-hidden','true'); (document.getElementById('stage')||document.body).appendChild(fx); }
var themeBusy=false;
function syncThemeUI(){
  document.documentElement.classList.toggle('tw-theme-baram',THEME==='baram');
  document.documentElement.setAttribute('data-tw-theme',THEME);
  if(btnTW) btnTW.setAttribute('aria-pressed',THEME==='tw'?'true':'false'); if(btnBR) btnBR.setAttribute('aria-pressed',THEME==='baram'?'true':'false');
}
syncThemeUI();
function loadBaram(cb){
  if(!BARAM_ON) return cb(null);   // 바람 비활성화: baram.js / 픽셀 폰트를 불러오지 않음
  /* 바람 로더 (주석 처리)
  if(window.__baram) return cb(window.__baram);
  if(!document.getElementById('bmFont')){ var l=document.createElement('link'); l.id='bmFont'; l.rel='stylesheet'; l.href=CFG.baramFont||'https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css'; document.head.appendChild(l); }
  var sc=document.createElement('script'); sc.src=ASSET+'baram.js'+AV; sc.async=true;
  sc.onload=function(){ cb(window.__baram||null); }; sc.onerror=function(){ cb(null); };
  document.head.appendChild(sc);
  */
  return cb(null);
}
function snapshot(){ // whatever is on screen right now, at device resolution
  var c=document.createElement('canvas'); c.width=fx.width; c.height=fx.height; var g=c.getContext('2d');
  var src=BMON&&window.__baram?window.__baram.canvas():cv; try{ g.drawImage(src,0,0,c.width,c.height); }catch(e){} return c; }
function runFx(toBaram,done){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){ done(); return; }
  fx.width=Math.round(VW*DPR); fx.height=Math.round(VH*DPR); var g=fx.getContext('2d'), snap=snapshot();
  var bs=Math.max(8,Math.round(14*DPR)), cols=Math.ceil(fx.width/bs), rows=Math.ceil(fx.height/bs), thr=[], i, j;
  for(j=0;j<rows;j++) for(i=0;i<cols;i++){ var u=i/cols; if(!toBaram) u=1-u; thr.push(u*.62+Math.random()*.38); }
  var streaks=[]; for(i=0;i<46;i++) streaks.push({y:Math.random(),l:.15+Math.random()*.35,w:(1+Math.random()*3)*DPR,o:Math.random()*.6,c:Math.random()});
  var leaves=[]; for(i=0;i<34;i++) leaves.push({y:Math.random(),o:Math.random()*.5,s:(3+Math.random()*4)*DPR,a:Math.random()*6});
  fx.style.display='block'; done();          // the new world starts underneath; the old one is dissolved away on top
  var t0=performance.now(), D=1500;
  (function step(now){
    var t=Math.min(1,(now-t0)/D), W=fx.width, H=fx.height, k;
    g.clearRect(0,0,W,H); g.imageSmoothingEnabled=false;
    // old world, eaten block by block behind the wind front
    g.save(); g.beginPath();
    for(k=0;k<thr.length;k++){ if(thr[k]>t*1.18-.04){ g.rect((k%cols)*bs,((k/cols)|0)*bs,bs,bs); } }
    g.clip(); g.drawImage(snap,0,0); g.restore();
    // the gust: pale streaks and leaves racing across
    var dir=toBaram?1:-1, a=Math.sin(Math.PI*t);
    for(k=0;k<streaks.length;k++){ var s=streaks[k], p=(t*1.6-s.o), x0=(dir>0?p:1-p)*W*1.4-W*.2, len=s.l*W;
      g.globalAlpha=.55*a; g.fillStyle=s.c<.5?'#f4f1e2':(toBaram?'#cfe6c8':'#f6dca4');
      var yy=s.y*H+Math.sin(p*7+s.y*9)*14*DPR; g.fillRect(dir>0?x0-len:x0,Math.round(yy),len,s.w); }
    for(k=0;k<leaves.length;k++){ var L=leaves[k], q=(t*1.5-L.o), lx=(dir>0?q:1-q)*W*1.3-W*.15, ly=L.y*H+Math.sin(q*9+L.a)*30*DPR;
      g.globalAlpha=a; g.fillStyle=toBaram?(k%3?'#6f9a3c':'#c8a84a'):(k%3?'#e9a6b8':'#f3d78a'); g.fillRect(Math.round(lx),Math.round(ly),L.s,L.s*.7); }
    // a big brush character in the middle of the gust
    g.globalAlpha=Math.max(0,Math.sin(Math.PI*Math.min(1,t*1.25)))*.9; g.fillStyle=toBaram?'#2b2418':'#fff6dc';
    g.font=(toBaram?'bold ':'')+Math.round(Math.min(W,H)*.22)+'px '+(toBaram?'"Galmuri11","DungGeunMo",serif':'"Gowun Batang",serif');
    g.textAlign='center'; g.textBaseline='middle'; g.fillText(toBaram?'風':'✦',W/2,H/2);
    g.globalAlpha=1;
    if(t<1) requestAnimationFrame(step); else { g.clearRect(0,0,W,H); fx.style.display='none'; themeBusy=false; }
  })(t0);
}
function setTheme(t,instant){
  t=(BARAM_ON&&t==='baram')?'baram':'tw';
  if(themeBusy) return; 
  if(t==='baram'){
    themeBusy=true;
    loadBaram(function(bm){
      if(!bm){ themeBusy=false; return; }
      var go=function(){ closeWin(); keys={}; P.path=null; BMON=true; THEME='baram'; syncThemeUI(); bm.start(window.__town);
        plate.classList.add('hidden'); mEnter.classList.add('hidden'); bubble.classList.add('hidden'); };
      bm.ready(function(){ if(instant){ go(); themeBusy=false; } else runFx(true,go); });
    });
  } else {
    if(!BMON){ THEME='tw'; syncThemeUI(); return; }
    themeBusy=true;
    var back=function(){ closeWin(); window.__baram.stop(); BMON=false; THEME='tw'; syncThemeUI(); for(var k in NAVLBL) delete NAVLBL[k]; refreshNav();
      plate.classList.add('hidden'); mEnter.classList.add('hidden'); bubble.classList.add('hidden'); talkN=null; };
    if(instant){ back(); themeBusy=false; } else runFx(false,back);
  }
  try{ localStorage.setItem('twTheme',t); }catch(e){}
}
/* 바람 비활성화: 테마 전환 버튼 핸들러
btnBR.onclick=function(){ if(THEME!=='baram') setTheme('baram'); };
btnTW.onclick=function(){ if(THEME!=='tw') setTheme('tw'); };
*/

/* ---------------- loop ---------------- */
var near=null, last=0, T=0, gridReady=false, BMON=false;
function start(){
  buildShop(); placeCrowd(isNight); buildGrid(); buildLayers(); gridReady=true;
  B.forEach(loadLive);
  B.forEach(function(b){ b.dW.forEach(function(p){ if(!free(p[0],p[1])){ var q=nearestFree(p[0],p[1]); if(q){ p[0]=q[0]; p[1]=q[1]; } } }); b.dx=b.dW[0][0]; b.dy=b.dW[0][1]; });
  initJellies();
  $('#loading').classList.add('done'); setTimeout(function(){$('#loading').style.display='none';},900);
  cam.x=P.x; cam.y=P.y-50;
  requestAnimationFrame(loop);
  if(BARAM_ON&&THEME==='baram') setTheme('baram',true);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ buildShop(); if(gridReady) buildLayers(); });
}
var DIR8=['right','dr','down','dl','left','ul','up','ur'];
function dir8(vx,vy){ var k=Math.round(Math.atan2(vy,vx)/(Math.PI/4)); return DIR8[(k+8)%8]; }
function update(dt){
  T+=dt;
  var mx=(keys.r?1:0)-(keys.l?1:0), my=(keys.d?1:0)-(keys.u?1:0);
  var vx=0,vy=0;
  updateKick(dt); if(P.kick){ mx=0; my=0; }
  if(mx||my){ var l=Math.hypot(mx,my); vx=mx/l; vy=my/l; }
  else if(P.path&&P.path.length){
    var t=P.path[0], dx=t[0]-P.x, dy=t[1]-P.y, d=Math.hypot(dx,dy);
    if(d<P.speed*dt+1){ P.dist+=d; P.x=t[0]; P.y=t[1]; P.path.shift(); if(!P.path.length){ P.path=null; marker=null; if(P.goal){ var g=P.goal; P.goal=null; P.dir='up'; if(g.dW&&g.dW.length>1){ var fx=(g.f[0]+g.f[2])/2-P.x, fy=(g.f[1]+g.f[3])/2-P.y; P.dir=Math.abs(fx)>Math.abs(fy)*1.2?(fx>0?'right':'left'):(fy>0?'down':'up'); } setTimeout(function(){openWin(g);},140);} else if(P.arrive){ var af=P.arrive; P.arrive=null; af(); } } }
    else { vx=dx/d; vy=dy/d; }
  }
  var ox=P.x, oy=P.y;
  if(vx||vy){
    var nx=P.x+vx*P.speed*dt, ny=P.y+vy*P.speed*dt;
    if(free(nx,P.y)) P.x=nx; if(free(P.x,ny)) P.y=ny;
    P.dir=dir8(vx,vy);
  }
  var moved=Math.hypot(P.x-ox,P.y-oy); P.dist+=moved;
  if(P.path&&!(mx||my)){ if(moved<P.speed*dt*0.2){ P.stuck=(P.stuck||0)+dt; } else P.stuck=0;
    if(P.stuck>0.5){ P.stuck=0; var gl=P.path[P.path.length-1], gb=P.goal; P.repath=(P.repath||0)+1;
      if(P.repath>2){ P.path=null; marker=null; P.goal=null; if(gb) openWin(gb); }
      else { var np=astar(P.x,P.y,gl[0],gl[1]); if(np&&np.length) P.path=np; else { P.path=null; marker=null; P.goal=null; if(gb) openWin(gb); } } } }
  P.moving=moved>0.01||(!!P.path);
  var nfr=HM.rows[P.dir].n-1;
  if(P.moving){ P.frame=1+Math.floor(P.dist/(CYCLE/nfr))%nfr; } else { P.frame=0; P.dist=0; }
  // near door
  var best=null,bd=1e9;
  B.forEach(function(b){ if(b.dW.length>1&&!(P.goal===b)){ var bi=0,bv=1e9; b.dW.forEach(function(p,i){ var v=Math.hypot(P.x-p[0],(P.y-p[1])*1.3); if(v<bv){bv=v;bi=i;} }); b.dx=b.dW[bi][0]; b.dy=b.dW[bi][1]; } });
  B.forEach(function(b){var d=Math.hypot(P.x-b.dx,(P.y-b.dy)*1.3); if(d<bd){bd=d;best=b;}});
  var nb=bd<84?best:null;
  if(nb!==near){ near=nb;
    if(near&&win.classList.contains('hidden')){
      $('.plate-key',plate).textContent=window.matchMedia('(pointer:fine)').matches?'Enter ▸ 들어가기':'탭 ▸ 들어가기'; $('.plate-name',plate).textContent=near.ico+'  '+near.name;
      $('.plate-meta',plate).textContent=near.key+' · '+(near.posts.length?'기록 '+near.posts.length+'편':'아직 공개된 기록 없음');
      plate.classList.remove('hidden'); plate.style.animation='none'; void plate.offsetWidth; plate.style.animation='';
      if(!window.matchMedia('(pointer:fine)').matches) mEnter.classList.remove('hidden');
    } else { plate.classList.add('hidden'); mEnter.classList.add('hidden'); }
  }
  // npcs
  NPCS.forEach(function(n){ n.t+=dt; n.walk=false;
    var talking=(talkN===n);
    if(n.route&&!talking){
      if(n.pause>0){ n.pause-=dt; }
      else { var tg=n.route[n.ri], dx=tg[0]-n.x, dy=tg[1]-n.y, d=Math.hypot(dx,dy), sp=n.speed;
        if(d<sp*dt+1){ n.x=tg[0]; n.y=tg[1]; n.ri=(n.ri+1)%n.route.length; n.pause=(n.ri%2===0)?rnd(2.5,4):rnd(1,2); n.fr=1; n.ft=n.pause; }
        else { n.x+=dx/d*sp*dt; n.y+=dy/d*sp*dt; n.dist+=sp*dt; n.walk=true;
          n.vdir=Math.abs(dx)>Math.abs(dy)*0.9?(dx<0?'left':'right'):(dy<0?'up':'down'); }
      }
    }
    if(n.wander&&!talking){ n.wt-=dt;
      if(n.wt<=0){ n.wt=rnd(3,7); var a=rnd(0,6.28),r=rnd(20,90); var tx=n.ox+Math.cos(a)*r, ty=n.oy+Math.sin(a)*r*.6; if(free(tx,ty)){n.tx=tx;n.ty=ty;} }
      var dx2=n.tx-n.x,dy2=n.ty-n.y,d2=Math.hypot(dx2,dy2); if(d2>2){n.x+=dx2/d2*34*dt;n.y+=dy2/d2*34*dt;n.flip=dx2>0;n.walk=true;n.dist+=34*dt;}
    }
    if(!n.walk){ n.ft-=dt; if(n.ft<=0){ n.fr=n.fr?0:1; var r2=n.fr?n.ib:n.ia; n.ft=rnd(r2[0],r2[1]); } }
  });
  if(talkN){ talkT-=dt; if(talkT<=0){talkN=null;bubble.classList.add('hidden');} }
  // camera
  var tx=P.x, ty=P.y-50;
  cam.x+=(tx-cam.x)*Math.min(1,dt*5); cam.y+=(ty-cam.y)*Math.min(1,dt*5);
  var hw=VW/2/Z, hh=VH/2/Z;
  cam.x=Math.max(hw,Math.min(WW-hw,cam.x)); cam.y=Math.max(hh,Math.min(WH-hh,cam.y));
  // ambience
  petals.forEach(function(p,i){ p.sw+=dt*2; p.x+=(p.vx+Math.sin(p.sw)*14)*dt; p.y+=p.vy*dt; p.a+=p.va*dt; if(p.y>WH+20||p.x>WW+20) petals[i]=newPetal(false); });
  CHIMNEYS.forEach(function(c){ if(Math.random()<dt*3.2) smoke.push({x:c[0]+rnd(-3,3),y:c[1],r:rnd(6,10),life:0,max:rnd(3,4.5),vx:rnd(6,14)}); });
  smoke=smoke.filter(function(s){s.life+=dt;s.y-=16*dt;s.x+=s.vx*dt;s.r+=7*dt;return s.life<s.max;});
  if(Math.random()<dt*14) sparkles.push({x:FOUNTAIN.x+rnd(-70,70),y:FOUNTAIN.y-6+rnd(-28,40),life:0,max:rnd(.5,1.2),s:rnd(1.5,3.2)});
  sparkles=sparkles.filter(function(s){s.life+=dt;return s.life<s.max;});
  if(Math.random()<dt*1.6) ripples.push({a:rnd(0,6.28),d:rnd(.25,.8),life:0});
  ripples=ripples.filter(function(r){r.life+=dt;return r.life<1.8;});
  flies.forEach(function(f){f.t+=dt;f.x+=Math.cos(f.t*.7+f.s*3)*30*dt;f.y+=Math.sin(f.t*1.1)*18*dt;});
  clouds.forEach(function(c){c.x+=c.v*dt;c.y+=c.v*.35*dt;if(c.x-c.r>WW){c.x=-c.r*2;c.y=rnd(-200,WH*.7);}});
  if(marker) marker.t+=dt;
  // day/night crossfade: the crowd moves (tree <-> campfire) at the darkest point of the blink
  if(swapT>0){ swapT-=dt; if(swapT<=.55&&crowdNight!==isNight) placeCrowd(isNight); if(swapT<0) swapT=0; }
  var tk=isNight?1:0; nightK+=(tk-nightK)*Math.min(1,dt*2.6); if(Math.abs(tk-nightK)<.002) nightK=tk;
  fireT+=dt; flick=.88+.08*Math.sin(T*13.7)+.05*Math.sin(T*23.1+1.3)+.04*Math.sin(T*5.3);
  if(nightK>.3&&Math.random()<dt*9) embers.push({x:PT.cx+rnd(-14,14),y:PT.cy-18,vx:rnd(-12,12),vy:rnd(-75,-40),life:0,max:rnd(.9,1.9),s:rnd(.9,1.8),w:rnd(0,6)});
  if(nightK<.5&&Math.random()<dt*1.4) smoke.push({x:PT.cx+rnd(-6,6),y:PT.cy-8,r:rnd(3,5),life:0,max:rnd(2.5,3.5),vx:rnd(2,6),pit:1});
  embers=embers.filter(function(e){e.life+=dt;e.w+=dt*4;e.x+=(e.vx+Math.sin(e.w)*10)*dt;e.y+=e.vy*dt;e.vy*=.995;return e.life<e.max;});
  var behindTree=(P.y<TR.foot&&P.x>TR.x+20&&P.x<TR.x+TR.w-20&&P.y>TR.y+40)||OAKS.some(function(o){ return P.y<o.foot[0][1]&&P.x>o.x+15&&P.x<o.x+o.w-15&&P.y>o.y+30; });
  canopyA+=((behindTree?.42:1)-canopyA)*Math.min(1,dt*6);
  updateBerries(dt); updateCrowd(dt); if(gridReady) updateJellies(dt); updateHaunt(dt);
}

function shadow(x,y,rx){ cx.save(); cx.translate(x,y); cx.scale(1,.36); var g=cx.createRadialGradient(0,0,0,0,0,rx); g.addColorStop(0,'rgba(60,40,30,.42)'); g.addColorStop(.6,'rgba(60,40,30,.22)'); g.addColorStop(1,'rgba(60,40,30,0)'); cx.fillStyle=g; cx.beginPath(); cx.arc(0,0,rx,0,7); cx.fill(); cx.restore(); }
function drawFrame(img,m,row,col,x,y,flip,squash){
  if(!img||!img.width) return;
  var r=m.rows[row].r, w=m.cw/m.sc, h=m.ch/m.sc, foot=4/m.sc;
  cx.save(); cx.translate(x,y); if(flip) cx.scale(-1,1); if(squash) cx.scale(1-squash*.5,1+squash);
  cx.drawImage(img,col*m.cw,r*m.ch,m.cw,m.ch,-w/2,-h+foot,w,h); cx.restore();
}
function drawWater(){
  ripples.forEach(function(r){var k=r.life/1.8, x=FOUNTAIN.x+Math.cos(r.a)*FOUNTAIN.rx*.55*r.d, y=FOUNTAIN.y+4+Math.sin(r.a)*FOUNTAIN.ry*.45*r.d;
    cx.strokeStyle='rgba(255,255,255,'+(0.55*(1-k))+')'; cx.lineWidth=1.4; cx.beginPath(); cx.ellipse(x,y,4+k*22,(4+k*22)*.4,0,0,7); cx.stroke();});
  sparkles.forEach(function(s){var k=s.life/s.max, a=Math.sin(k*Math.PI); cx.fillStyle='rgba(255,255,255,'+a*.95+')';
    cx.beginPath(); cx.moveTo(s.x,s.y-s.s*2.2); cx.lineTo(s.x+s.s*.5,s.y); cx.lineTo(s.x,s.y+s.s*2.2); cx.lineTo(s.x-s.s*.5,s.y); cx.closePath(); cx.fill();
    cx.fillRect(s.x-s.s*1.6,s.y-.4,s.s*3.2,.8);});
  for(var i=0;i<14;i++){var ph=(T*1.4+i/14)%1, ang=i/14*6.28, x=FOUNTAIN.x+Math.cos(ang)*(14+ph*36), y=363*S-70+ph*ph*70+Math.sin(ang)*6;
    cx.fillStyle='rgba(225,245,255,'+(0.75*(1-ph))+')'; cx.beginPath(); cx.arc(x,y,1.7,0,7); cx.fill();}
}

function draw(){
  cx.setTransform(DPR,0,0,DPR,0,0);
  cx.fillStyle='#6f8f5a'; cx.fillRect(0,0,VW,VH);
  cx.setTransform(DPR*Z,0,0,DPR*Z,DPR*(VW/2-cam.x*Z),DPR*(VH/2-cam.y*Z));
  cx.imageSmoothingQuality='high';
  cx.drawImage(IMG['town_p8.jpg'],0,0,WW,WH);
  cx.drawImage(IMG['campfire_pit.png'],PT.x,PT.y,PT.w,PT.h);
  drawShop();
  hauntGround();

  if(near){ var gl=cx.createRadialGradient(near.dx,near.dy-6,0,near.dx,near.dy-6,60); var pa=.35+.15*Math.sin(T*4);
    gl.addColorStop(0,'rgba(255,240,190,'+pa+')'); gl.addColorStop(1,'rgba(255,240,190,0)'); cx.fillStyle=gl; cx.beginPath(); cx.ellipse(near.dx,near.dy-6,60,30,0,0,7); cx.fill(); }
  if(marker){ var mk=(marker.t*1.6)%1; cx.strokeStyle='rgba(255,246,214,'+(1-mk)+')'; cx.lineWidth=2.5; cx.beginPath(); cx.ellipse(marker.x,marker.y,8+mk*16,(8+mk*16)*.45,0,0,7); cx.stroke();
    cx.fillStyle='rgba(255,240,200,.9)'; cx.beginPath(); cx.ellipse(marker.x,marker.y,3.5,1.8,0,0,7); cx.fill(); }
  // shadows first (always on ground)
  shadow(P.x,P.y,30); NPCS.forEach(function(n){ shadow(n.x,n.y,n.k==='cat'?22:n.sit?26:n.h*.26); });
  berries.forEach(function(b){ if(b.st==='fall'){ var k=Math.max(0,Math.min(1,b.t/b.dur)); shadow(b.tx,b.ty,4+6*k); } else if(b.st==='ground') shadow(b.x,b.y,7); });
  JELLIES.forEach(jellyShadow);

  drawWater();
  // berry tree: soft canopy shade on the ground, then the tree itself (cut-out sprite; re-painted over anyone behind its foot line)
  cx.save(); cx.translate(TR.cx+18,TR.foot-6); cx.scale(1,.32); var tg=cx.createRadialGradient(0,0,0,0,0,170); tg.addColorStop(0,'rgba(40,50,25,.30)'); tg.addColorStop(1,'rgba(40,50,25,0)'); cx.fillStyle=tg; cx.beginPath(); cx.arc(0,0,170,0,7); cx.fill(); cx.restore();
  if(KICK.shake>0){ var sk=KICK.shake/.8, ph=(.8-KICK.shake)*34, bx0=TR.trunk?TR.trunk[0]:TR.cx;
    cx.save(); cx.translate(bx0,TR.foot); cx.rotate(Math.sin(ph)*.035*sk); cx.transform(1,0,Math.sin(ph*1.3)*.05*sk,1,0,0); cx.scale(1+Math.sin(ph*.9)*.018*sk,1-Math.sin(ph*.9)*.014*sk);
    cx.drawImage(IMG['berry_tree.png'],TR.x-bx0,TR.y-TR.foot,TR.w,TR.h); cx.restore(); }
  else cx.drawImage(IMG['berry_tree.png'],TR.x,TR.y,TR.w,TR.h);
  // actors in ground-y order; after each actor, re-paint only the object pixels standing in front of it
  var items=[];
  NPCS.forEach(function(n){ items.push({y:n.y,n:n}); });
  items.push({y:P.y,p:1});
  JELLIES.forEach(function(j){ items.push({y:j.y,j:j}); });
  berries.forEach(function(b){ if(b.st==='ground'||b.st==='fade') items.push({y:b.y,berry:b}); });
  if(nightK>.01) items.push({y:PT.foot+.5,fire:1});
  items.sort(function(a,b){return a.y-b.y;});
  items.forEach(function(it){
    if(it.p&&P.kick){ var kf=kickFrame(P.kick.t), sh=kf===2?(Math.random()<.5?-1:1):0; drawFrame(IMG['hero_kick.png'],KM,P.kick.face,kf,P.x+sh,P.y,false,0);
      if(coverActor(P.x,P.y,HM.h,true)) silhouette(IMG['hero.png'],HM,P.dir,0,P.x,P.y); }
    else if(it.p){ drawFrame(IMG['hero.png'],HM,P.dir,P.frame,P.x,P.y,false, P.moving?0:Math.sin(T*2.2)*0.008);
      if(coverActor(P.x,P.y,HM.h,true)) silhouette(IMG['hero.png'],HM,P.dir,P.frame,P.x,P.y); }
    else if(it.j){ drawJelly(it.j); coverActor(it.j.x,it.j.y,jellyH(it.j)*1.7); }
    else if(it.berry){ var b=it.berry; drawBerry(b.x,b.y-5+b.bz,1.05,b.kind,b.st==='fade'?1-b.t:1); }
    else if(it.fire){ drawFire(nightK); }
    else if(it.n.crowd){ var n=it.n, bob=n.sit?0:Math.sin(n.t*2.1)*0.012; drawFrame(IMG['crowd.png'],CRMM,n.k,n.fr,n.x,n.y,false,bob); coverActor(n.x,n.y,n.h); }
    else { var n=it.n, m=n.m, im=IMG['npc_'+n.k+'.png'];
      if(n.walk&&n.route){ var row=n.vdir==='right'?'left':n.vdir, nf=m.rows[row].n-1, cyc=CM.hero.stride*2*m.h/HM.h;
        drawFrame(im,m,row,1+Math.floor(n.dist/(cyc/nf))%nf,n.x,n.y,n.vdir==='right',0); }
      else if(n.walk){ var bob=Math.abs(Math.sin(n.dist*.35))*2; cx.save(); cx.translate(0,-bob); drawFrame(im,m,'idle',0,n.x,n.y,n.flip,0); cx.restore(); }
      else drawFrame(im,m,'idle',n.fr,n.x,n.y,n.k==='cat'&&n.flip,Math.sin(n.t*2.1)*0.012);
      coverActor(n.x,n.y,n.h);
    }
  });
  // falling berries + pops are above everything on the ground
  berries.forEach(function(b){ if(b.st==='fall'){ cx.save(); cx.translate(b.x,b.y); cx.rotate(b.rot); drawBerry(0,0,1.05,b.kind); cx.restore(); }
    else if(b.st==='pop'){ var k=b.t/.45; drawBerry(b.x,b.y-5-k*18,1.05+k*.9,b.kind,1-k); } });
  pops.forEach(function(p){ var k=p.life/p.max, a=p.tw?Math.sin(k*Math.PI):1-k; drawStar4(p.x,p.y,p.s,a,p.c); });

  smoke.forEach(function(s){var k=s.life/s.max; cx.fillStyle='rgba(245,240,232,'+(0.33*(1-k))+')'; cx.beginPath(); cx.arc(s.x,s.y,s.r,0,7); cx.fill();});
  flies.forEach(function(f,fi){ if(fi>=5&&nightK<.5) return; var fl=Math.abs(Math.sin(f.t*14)); cx.fillStyle=f.c; cx.globalAlpha=.9;
    cx.beginPath(); cx.ellipse(f.x-3*fl,f.y,3.6*fl+.6,2.6,-.4,0,7); cx.ellipse(f.x+3*fl,f.y,3.6*fl+.6,2.6,.4,0,7); cx.fill(); cx.globalAlpha=1;});
  clouds.forEach(function(c){var g=cx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.r); g.addColorStop(0,'rgba(50,60,90,.10)'); g.addColorStop(1,'rgba(50,60,90,0)'); cx.fillStyle=g; cx.beginPath(); cx.arc(c.x,c.y,c.r,0,7); cx.fill();});
  petals.forEach(function(p){cx.save(); cx.translate(p.x,p.y); cx.rotate(p.a); cx.scale(1,Math.abs(Math.cos(p.a*1.7))*.7+.3); cx.fillStyle=p.c; cx.globalAlpha=.9;
    cx.beginPath(); cx.ellipse(0,0,p.r,p.r*.55,0,0,7); cx.fill(); cx.restore();});
  hauntAir();

  drawNight();
  if(DEBUG) drawDebug();
  cx.setTransform(DPR,0,0,DPR,0,0);
  var sun=cx.createRadialGradient(VW*.15,-VH*.1,0,VW*.15,-VH*.1,Math.max(VW,VH)*1.1); cx.globalAlpha=1-nightK;
  sun.addColorStop(0,'rgba(255,236,190,.28)'); sun.addColorStop(.5,'rgba(255,225,180,.08)'); sun.addColorStop(1,'rgba(255,220,180,0)');
  cx.fillStyle=sun; cx.fillRect(0,0,VW,VH); cx.globalAlpha=1;
  var vg=cx.createRadialGradient(VW/2,VH/2,Math.min(VW,VH)*.45,VW/2,VH/2,Math.max(VW,VH)*.78);
  vg.addColorStop(0,'rgba(60,40,20,0)'); vg.addColorStop(1,nightK>.5?'rgba(14,12,40,.42)':'rgba(60,40,20,.32)'); cx.fillStyle=vg; cx.fillRect(0,0,VW,VH);
  if(swapT>0){ var bk=Math.sin(Math.min(1,(1.1-swapT)/1.1)*Math.PI); cx.fillStyle='rgba(16,14,40,'+(bk*.55)+')'; cx.fillRect(0,0,VW,VH); }
  // speech bubbles / emotes (never tinted)
  cx.setTransform(DPR*Z,0,0,DPR*Z,DPR*(VW/2-cam.x*Z),DPR*(VH/2-cam.y*Z));
  CROWD.forEach(function(n){ var top=n.y-n.h-4;
    if(n.bub){ var a=Math.min(1,(n.bub.max-n.bub.t)*5,n.bub.t*3); cbubble(n.x,top-(1-Math.min(1,(n.bub.max-n.bub.t)*6))*6,n.bub.text,a); }
    else if(n.emo){ cemote(n.x+10,top+2-Math.abs(Math.sin(T*6))*2,n.emo,Math.min(1,n.emoT*3)); } });
  hauntAfterNight();
  JELLIES.forEach(jellyZzz);
  hauntBubbles();
  JELLIES.forEach(function(j){ if(j.emo){ var z=jellyPose(j).z; cemote(j.x+8,j.y-jellyH(j)-2-z-Math.abs(Math.sin(T*6))*2,j.emo,Math.min(1,j.emoT*3)); } });
  if(P.bub){ var pa=Math.min(1,(P.bub.max-P.bub.t)*5,P.bub.t*3); cbubble(P.x,P.y-HM.h-8-(1-Math.min(1,(P.bub.max-P.bub.t)*6))*8,P.bub.text,pa); }
  floats.forEach(function(f){ var k=f.life/f.max; cx.save(); cx.globalAlpha=1-k*k; cx.font='800 16px "Gowun Dodum",sans-serif'; cx.textAlign='center';
    cx.lineWidth=3; cx.strokeStyle='rgba(90,40,40,.85)'; cx.strokeText(f.text,f.x,f.y); cx.fillStyle='#ffe7a6'; cx.fillText(f.text,f.x,f.y); cx.restore(); });
  cx.setTransform(DPR,0,0,DPR,0,0);

  if(near&&!plate.classList.contains('hidden')){ var s=w2s(near.dx,near.dy-HM.h-30); plate.style.left=s[0]+'px'; plate.style.top=s[1]+'px'; }
  if(talkN){ var s2=w2s(talkN.x,talkN.y-(talkN.h||90)-14); bubble.style.left=s2[0]+'px'; bubble.style.top=s2[1]+'px'; }
}
var lm=document.createElement('canvas'), lg=lm.getContext('2d'), LMS=.5;
function lightAt(g,x,y,r,col,a){ var gr=g.createRadialGradient(x,y,0,x,y,r); gr.addColorStop(0,'rgba('+col+','+a+')'); gr.addColorStop(.45,'rgba('+col+','+(a*.45)+')'); gr.addColorStop(1,'rgba('+col+',0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }
function drawNight(){
  var k=nightK; if(k<=.003) return;
  var w=Math.max(2,Math.ceil(VW*LMS)), h=Math.max(2,Math.ceil(VH*LMS)); if(lm.width!==w||lm.height!==h){ lm.width=w; lm.height=h; }
  lg.setTransform(1,0,0,1,0,0); lg.globalCompositeOperation='source-over';
  lg.fillStyle='rgb('+Math.round(255-(255-70)*k)+','+Math.round(255-(255-82)*k)+','+Math.round(255-(255-156)*k)+')'; lg.fillRect(0,0,w,h);
  lg.setTransform(LMS*Z,0,0,LMS*Z,LMS*(VW/2-cam.x*Z),LMS*(VH/2-cam.y*Z)); lg.globalCompositeOperation='lighter';
  lightAt(lg,PT.cx,PT.cy-24,330*flick,'255,160,80',.95*k*flick);
  lightAt(lg,PT.cx,PT.cy-24,120*flick,'255,210,140',.6*k);
  WINDOWS.forEach(function(p){ lightAt(lg,p[0],p[1],34*(p[2]||1),'255,190,110',.8*k); });
  LAMPS.forEach(function(p){ lightAt(lg,p[0],p[1],78,'255,200,130',.55*k); });
  shopNightLights(lg,k);
  flies.forEach(function(f){ lightAt(lg,f.x,f.y,22,'220,255,170',.35*k); });
  lightAt(lg,FOUNTAIN.x,FOUNTAIN.y-10,140,'120,170,255',.18*k);
  JELLIES.forEach(function(j){ lightAt(lg,j.x,j.y-jellyH(j)*.45,48*j.s,j.K.glow,.38*k); });
  hauntNightLights(lg,k);
  cx.save(); cx.setTransform(DPR,0,0,DPR,0,0); cx.globalCompositeOperation='multiply'; cx.drawImage(lm,0,0,VW,VH); cx.restore();
  // additive glows on top: window panes, flame bloom, embers, fireflies
  cx.save(); cx.globalCompositeOperation='lighter';
  WINDOWS.forEach(function(p,i){ var a=(.42+.08*Math.sin(T*1.3+i))*k; lightAt(cx,p[0],p[1],11*(p[2]||1),'255,200,120',a); });
  LAMPS.forEach(function(p){ lightAt(cx,p[0],p[1],16,'255,215,150',.55*k); });
  lightAt(cx,PT.cx,PT.cy-22,70*flick,'255,140,50',.32*k);
  embers.forEach(function(e){ var q=e.life/e.max; lightAt(cx,e.x,e.y,e.s*3.2,'255,190,90',(1-q)*.9*k); cx.fillStyle='rgba(255,236,180,'+((1-q)*k)+')'; cx.fillRect(e.x-.6,e.y-.6,1.2,1.2); });
  flies.forEach(function(f){ var a=(.55+.45*Math.sin(f.t*3+f.s*9))*k; lightAt(cx,f.x,f.y,9,'225,255,160',a); });
  JELLIES.forEach(function(j){ var z=jellyPose(j).z; lightAt(cx,j.x,j.y-z-jellyH(j)*.42,22*j.s,j.K.glow,(.22+.06*Math.sin(T*2+j.ph))*k); });
  hauntNightGlow(cx,k);
  cx.restore();
  // stars over the upper sky haze (screen space)
  cx.save(); cx.setTransform(DPR,0,0,DPR,0,0); cx.globalCompositeOperation='lighter';
  var sk=cx.createLinearGradient(0,0,0,VH*.5); sk.addColorStop(0,'rgba(40,50,120,'+(.35*k)+')'); sk.addColorStop(1,'rgba(40,50,120,0)'); cx.fillStyle=sk; cx.fillRect(0,0,VW,VH*.5);
  stars.forEach(function(st){ var a=(.35+.65*Math.abs(Math.sin(T*st.v*.5+st.t)))*k*(1-st.y*1.8); if(a<=0) return; drawStar4(st.x*VW,st.y*VH,st.s*.7,a); });
  cx.restore();
}
var DEBUG=/[?&#]debug=walk/.test(location.search+location.hash);
function drawDebug(){
  cx.fillStyle='rgba(60,220,80,.33)';
  for(var gy=0;gy<GH;gy++)for(var gx=0;gx<GW;gx++) if(!grid[gy*GW+gx]) cx.fillRect(gx*CELL,gy*CELL,CELL,CELL);
  cx.lineWidth=3;
  OBJS.forEach(function(o){ cx.strokeStyle=o.solid?'rgba(255,0,200,.9)':'rgba(0,200,255,.9)'; cx.strokeRect(o.x,o.y,o.w,o.h);
    cx.strokeStyle='rgba(255,230,0,.95)'; cx.beginPath(); o.foot.forEach(function(p,i){cx[i?'lineTo':'moveTo'](p[0],p[1]);}); cx.stroke(); });
  var b=actorBox(P.x,P.y,HM.h); cx.strokeStyle='#fff'; cx.lineWidth=1.5; cx.strokeRect(b[0],b[1],b[2],b[3]);
}
function occProbe(x,y,row,col){
  var m=HM, r=m.rows[row].r, w=m.cw/m.sc, h=m.ch/m.sc, foot=4/m.sc, bx=actorBox(x,y,HM.h);
  var W2=Math.ceil(w)+2, H2=Math.ceil(h)+2, ox=Math.floor(x-w/2)-1, oy=Math.floor(y-h+foot)-1;
  var c=document.createElement('canvas'); c.width=W2; c.height=H2; var g=c.getContext('2d');
  g.drawImage(IMG['hero.png'],col*m.cw,r*m.ch,m.cw,m.ch,(x-w/2)-ox,(y-h+foot)-oy,w,h);
  var hd=g.getImageData(0,0,W2,H2).data, total=0; for(var i=3;i<hd.length;i+=4) if(hd[i]>40) total++;
  var res=[];
  OBJS.forEach(function(o){
    if(!behind(o,x,y)) return;
    var c2=document.createElement('canvas'); c2.width=W2; c2.height=H2; var g2=c2.getContext('2d');
    g2.beginPath(); g2.rect(bx[0]-ox,bx[1]-oy,bx[2],bx[3]); g2.clip(); g2.drawImage(o.c,o.x-ox,o.y-oy);
    var od=g2.getImageData(0,0,W2,H2).data, n=0; for(var j=3;j<od.length;j+=4) if(od[j]>40&&hd[j]>40) n++;
    if(n) res.push({id:o.id,solid:o.solid,px:n,frac:n/total,foot:footAt(o,x)});
  });
  return {total:total,hits:res};
}
function w2s(x,y){return [(x-cam.x)*Z+VW/2,(y-cam.y)*Z+VH/2];}
var TSCALE=1;
function loop(ts){ if(BMON){ last=ts; requestAnimationFrame(loop); return; } var dt=Math.min(.05,(ts-last)/1000||0)*TSCALE; last=ts; update(dt); draw(); requestAnimationFrame(loop); }

window.__town={P:P,B:B,npcs:NPCS,w2s:w2s,near:function(){return near&&near.key;},goTo:goTo,openWin:openWin,cam:cam,free:free,shop:SHOP,
  teleport:function(x,y){P.x=x;P.y=y;P.path=null;cam.x=x;cam.y=y-50;}, count:function(){return POSTS.length;},
  occProbe:occProbe, objs:OBJS, grid:function(){return {g:grid,GW:GW,GH:GH,CELL:CELL};}, dir8:dir8,
  setDir:function(d,f){P.dir=d;P.frame=f||0;}, openAll:openAll, closeWin:closeWin, refreshNav:refreshNav, NAVLBL:NAVLBL, press:function(k,v){keys[k]=v?1:0;},
  setNight:setNight, isNight:function(){return isNight;}, timeMode:function(){return timeMode;}, crowd:CROWD, props:PROPS,
  berries:function(){return berries;}, spawnBerry:spawnBerry, berryCount:function(){return berryCount;}, canopyA:function(){return canopyA;},
  jellies:function(){return JELLIES;}, haunt:HAUNT, ghost:GHOST, hauntB:hauntB, jellyAt:jellyAt, jellyPose:jellyPose, jellyHop:jellyHop, jellyClear:jellyClear, setTimeScale:function(v){TSCALE=v;}, kickTree:kickTree, kick:function(){return {busy:KICK.busy,cd:KICK.cd,shake:KICK.shake,last:KICK.last,k:P.kick&&{t:P.kick.t,face:P.kick.face}};}, onTree:onTree, tree:TR,
  setTheme:setTheme, theme:function(){return THEME;}, themeBusy:function(){return themeBusy;}, esc:esc, ASSET:ASSET, AV:AV, SEARCH_BASE:SEARCH_BASE, talkOff:function(){talkN=null;}};
})();
