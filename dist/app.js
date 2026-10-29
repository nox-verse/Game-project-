// FOREST LOG — data, save handling and interactions. No server or account required.
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const KEY = 'forest-log.save.v1';
const paths = {
  sprout:'M12 21v-9M12 16C4 16 3 10 3 6c7 0 9 4 9 10ZM12 12c0-7 4-9 9-9 0 7-3 10-9 9Z',
  leaf:'M5 20c1-7 5-10 12-13M4 15C1 5 10 2 21 3c0 11-4 17-13 15',
  tree:'m12 2-6 7h3l-5 6h6v6h4v-6h6l-5-6h3Z',
  heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  chair:'M5 3h14v9H5zM4 12h16v5H4zM6 17v5m12-5v5M8 6v3m4-3v3m4-3v3',
  book:'M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-3-1-6-2-10 1Zm0 0v16',
  pen:'m16 3 5 5M3 21l5-1L21 7a3.5 3.5 0 0 0-5-5L3 15Z',
  settings:'m10 2-1 3-3 1-3-1-2 4 2 2v3l-2 2 2 4 3-1 3 1 1 3h4l1-3 3-1 3 1 2-4-2-2v-3l2-2-2-4-3 1-3-1-1-3Zm2 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  sun:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-6v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5',
  pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z',
  'volume-off':'m10 4-5 4H2v8h3l5 4ZM16 9l6 6m0-6-6 6',
  volume:'m10 4-5 4H2v8h3l5 4Zm5 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  hand:'M9 11V4a2 2 0 0 1 4 0v7-4a2 2 0 0 1 4 0v5-2a2 2 0 0 1 4 0v5c0 5-3 8-7 8h-2c-3 0-5-3-7-6l-2-3a2 2 0 0 1 3-2l3 3',
  arrow:'M4 12h16m-6-6 6 6-6 6',
  close:'m6 6 12 12M18 6 6 18',
  gift:'M3 8h18v5H3zM5 13v8h14v-8M12 8v13M12 8C3 9 4 1 8 3c3 1 4 5 4 5Zm0 0c9 1 8-7 4-5-3 1-4 5-4 5Z',
  chat:'M21 11a9 9 0 0 1-9 9c-2 0-3-.5-4-1L2 22l1-6a9 9 0 1 1 18-5ZM7 10h10m-10 4h7',
  check:'m5 12 4 4L19 6',
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.leaf}"/></svg>`;
function hydrate(root=document){$$('[data-icon]',root).forEach(el=>{el.innerHTML=icon(el.dataset.icon);el.removeAttribute('data-icon');});}
const art = (inside, cls='item-svg') => `<svg class="${cls}" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inside}</svg>`;
const flower=art('<path d="M40 44v30" stroke="#78904e" stroke-width="4" stroke-linecap="round"/><path d="M39 65C22 65 20 55 21 52c14 0 18 7 18 13ZM41 58c14 1 20-8 19-13-12 0-19 6-19 13Z" fill="#a1b968" stroke="#6e8a4e" stroke-width="2"/><g fill="#e9b7b5" stroke="#b9878d" stroke-width="1.5"><ellipse cx="39" cy="23" rx="11" ry="14"/><ellipse cx="25" cy="33" rx="11" ry="14" transform="rotate(-62 25 33)"/><ellipse cx="30" cy="48" rx="11" ry="14" transform="rotate(-140 30 48)"/><ellipse cx="48" cy="47" rx="11" ry="14" transform="rotate(140 48 47)"/><ellipse cx="53" cy="32" rx="11" ry="14" transform="rotate(62 53 32)"/></g><circle cx="39" cy="36" r="9" fill="#f5d88d" stroke="#c5a66a" stroke-width="1.5"/><circle cx="36" cy="33" r="2" fill="#fff6cc"/>');
const berry=art('<path d="M41 22c0-8 3-13 9-15" stroke="#7d8850" stroke-width="3" stroke-linecap="round"/><path d="M40 23C23 22 22 12 23 9c15-1 20 5 17 14Z" fill="#9bb569" stroke="#798c50" stroke-width="2"/><path d="M39 25c12-15 28 0 28 15 0 20-13 31-26 31-15 0-29-12-29-30 0-15 15-27 27-16Z" fill="#e79b76" stroke="#ba7b59" stroke-width="2"/><path d="M22 39c1-7 4-10 8-11" stroke="#ffe1b2" stroke-width="4" stroke-linecap="round"/><path d="M38 25c4 5 7 5 11 2" stroke="#b67b59" stroke-width="2"/>');
const leaf=art('<path d="M14 64C8 29 36 10 68 12c1 36-16 57-44 56" fill="#b8ca78" stroke="#839956" stroke-width="2"/><path d="M13 74c6-23 18-38 43-51M27 51l-3-18m15 5 15 1M25 55l22 1" stroke="#7d9554" stroke-width="2.5" stroke-linecap="round"/>');
const ITEMS={flower:{name:'들꽃',art:flower,description:'햇살을 머금고 피어난 연분홍 들꽃. 북극여우가 특히 좋아해요.'},berry:{name:'숲 열매',art:berry,description:'달콤하게 익은 숲의 작은 열매. 붉은여우의 가장 좋아하는 간식이에요.'},leaf:{name:'나뭇잎',art:leaf,description:'바람에 살랑이는 싱그러운 잎. 티베트여우의 엉뚱한 발명에 꼭 필요하대요.'}};
const decorationArt={
 flowerbed:art('<ellipse cx="40" cy="65" rx="33" ry="10" fill="#b5bf7c"/><path d="M23 61V33m18 28V24m17 37V37" stroke="#7f984c" stroke-width="3"/><path d="m24 50-10-8m27 0 10-9m7 20 10-8" stroke="#8aa45c" stroke-width="3"/><g fill="#e8a5a5" stroke="#b98286"><circle cx="23" cy="26" r="8"/><circle cx="16" cy="33" r="8"/><circle cx="30" cy="33" r="8"/><circle cx="23" cy="40" r="8"/></g><circle cx="23" cy="33" r="5" fill="#f3d78a"/><g fill="#f7e0aa" stroke="#bfa671"><circle cx="41" cy="17" r="8"/><circle cx="34" cy="24" r="8"/><circle cx="48" cy="24" r="8"/><circle cx="41" cy="31" r="8"/></g><circle cx="41" cy="24" r="5" fill="#ddab75"/><g fill="#bdc8df" stroke="#8b9aad"><circle cx="58" cy="31" r="7"/><circle cx="52" cy="37" r="7"/><circle cx="64" cy="37" r="7"/><circle cx="58" cy="43" r="7"/></g><circle cx="58" cy="37" r="4" fill="#f4db90"/>','decor-svg'),
 mushroom:art('<ellipse cx="40" cy="69" rx="26" ry="6" fill="#89955f" opacity=".24"/><path d="m29 38-4 24c0 10 29 10 29 0l-4-24" fill="#f0e5c8" stroke="#ad9673" stroke-width="2"/><path d="M8 39C11 1 65-2 72 39c-8 13-54 14-64 0Z" fill="#cd8d76" stroke="#9c7159" stroke-width="2"/><ellipse cx="28" cy="25" rx="8" ry="6" fill="#ffe9c7"/><ellipse cx="51" cy="34" rx="7" ry="5" fill="#ffe9c7"/><ellipse cx="49" cy="17" rx="4" ry="3" fill="#ffe9c7"/>','decor-svg'),
 fence:art('<path d="M9 34h62v8H9zm0 18h62v8H9z" fill="#c6a77e" stroke="#997c58" stroke-width="2"/><path d="m15 20 7-8 7 8v50H15zm36 0 7-8 7 8v50H51Z" fill="#dfc39a" stroke="#a28662" stroke-width="2"/><path d="M20 27v33m36-33v33" stroke="#eddbb7" stroke-width="2"/><circle cx="22" cy="38" r="2" fill="#967652"/><circle cx="58" cy="56" r="2" fill="#967652"/>','decor-svg'),
 lantern:art('<ellipse cx="40" cy="70" rx="18" ry="5" fill="#7c8458" opacity=".2"/><path d="M40 70V12q0-10 10-7" stroke="#816e4e" stroke-width="4" stroke-linecap="round"/><path d="M49 10v8" stroke="#816e4e" stroke-width="2"/><path d="m34 27 15-12 15 12" fill="#8d8866" stroke="#6e7056" stroke-width="2"/><path d="m36 28 3 28h20l3-28Z" fill="#f8d890" stroke="#a68c5c" stroke-width="2"/><path d="M49 29v24" stroke="#b59a65" stroke-width="2"/><ellipse cx="48" cy="42" rx="5" ry="8" fill="#fff3bd"/><path d="M36 57h26" stroke="#86734e" stroke-width="3"/>','decor-svg'),
 sign:art('<path d="M37 24h7v49h-7Z" fill="#b1956c" stroke="#8f7755" stroke-width="2"/><path d="M9 16h54l9 14-9 14H9Z" fill="#debd8e" stroke="#9e8059" stroke-width="2"/><path d="M20 24h31m-31 9h23" stroke="#f5dbac" stroke-width="3" stroke-linecap="round"/><path d="M50 33c0-9 6-12 12-12-1 8-5 12-12 12Z" fill="#9caf6d" stroke="#819659" stroke-width="1.5"/>','decor-svg'),
};
const DECOR={
 flowerbed:{name:'작은 꽃밭',art:decorationArt.flowerbed,cost:{flower:3,leaf:1},description:'색색의 꽃이 모여 있는 작은 정원. 친구들과 함께 꽃향기를 나눠요.'},
 mushroom:{name:'버섯 의자',art:decorationArt.mushroom,cost:{berry:2,leaf:2},description:'잠깐 앉아 쉬어 가기 좋은 폭신한 의자. 숲의 휴식 자리를 만들어줘요.'},
 fence:{name:'나무 울타리',art:decorationArt.fence,cost:{leaf:4},description:'숲의 작은 구역을 아늑하게 둘러주는 나무 울타리예요.'},
 lantern:{name:'작은 등불',art:decorationArt.lantern,cost:{flower:2,berry:2,leaf:2},description:'친구들이 길을 잃지 않도록 따뜻한 빛으로 밝혀주는 등불이에요.'},
 sign:{name:'숲 표지판',art:decorationArt.sign,cost:{leaf:3,berry:1},description:'여기가 우리의 숲이라고 알려주는 다정한 표지판이에요.'},
};
const FOXES={
 red:{name:'붉은여우',personality:'활발하고 장난기 많은 탐험가',favorite:'berry',position:[35,65],speech:'같이 산책할래?',intro:'너도 이 숲이 마음에 들어? 저쪽 나무 뒤에 달콤한 열매가 잔뜩 있더라!',talks:['오늘은 구름이 폭신한 꼬리처럼 생겼어. 내 꼬리가 더 폭신하지만!','새로운 길을 찾았어! 음… 어제 간 길이랑 똑같이 생겼네?','연못에 내 얼굴이 비쳤는데, 엄청 멋진 여우가 있지 뭐야!'],close:'네가 오는 날은 숲을 탐험하는 게 두 배로 즐거워. 다음엔 비밀 장소에 데려가 줄게!',best:'혼자 걷던 길도 너와 걸으면 새로운 길이 돼. 이 숲에서 제일 좋은 발견은 바로 너야.',thanks:'우와, 달콤한 열매다! 네 몫도 남겨둘게. 약속!',memory:'붉은여우가 오래된 나무 뒤의 비밀 산책길을 알려주었다.'},
 arctic:{name:'북극여우',personality:'조용하고 다정한 꽃의 친구',favorite:'flower',position:[58,75],speech:'햇살이 따뜻하네…',intro:'안녕… 꽃향기를 따라왔더니 네가 있었네. 여기, 같이 앉을래?',talks:['아무것도 하지 않는 시간도 좋아. 꽃들은 가만히 있어도 자라니까.','바람이 꽃잎을 하나 데려갔어. 누군가에게 작은 선물이 되겠지?','오늘 네 마음의 날씨는 어때? 나는 잔잔하게 맑음이야.'],close:'네 발소리가 들리면 나도 모르게 웃게 돼. 오늘은 너를 닮은 꽃을 찾았어.',best:'말하지 않아도 편한 친구가 생겼어. 고마워. 네 옆에서는 마음이 봄 같아.',thanks:'나를 생각하며 골랐구나… 소중히 간직할게. 정말 예쁘다.',memory:'북극여우와 나란히 앉아 이름 모를 꽃에 우리만의 이름을 붙였다.'},
 tibetan:{name:'티베트여우',personality:'엉뚱한 생각이 많은 철학자',favorite:'leaf',position:[73,57],speech:'나뭇잎도 낮잠을 잘까?',intro:'흠. 나는 지금 매우 중요한 일을 하고 있어. 바로… 아무것도 안 하기.',talks:['돌멩이를 주웠는데 다시 놓았어. 걔도 집이 있을 테니까.','나뭇잎을 베개로 쓰면 나무 꿈을 꿀 수 있을까? 연구가 필요해.','열매가 떨어지면 중력이고, 내가 넘어지면 낮잠이야.'],close:'이건 비밀인데, 너랑 이야기할 때는 아무것도 안 하는 것보다 조금 더 좋아.',best:'우리 우정을 논문으로 쓰려 했는데, 그냥 같이 낮잠 자는 게 좋겠어. 옆자리 비워뒀어.',thanks:'완벽한 나뭇잎이군. 이건… 내 중요한 연구에 쓰겠어. 고마워.',memory:'티베트여우와 나뭇잎 베개를 만들고, 느긋하게 구름을 세었다.'},
};
Object.assign(FOXES,{
 rabbit:{name:'토끼',personality:'꽃향기를 따라다니는 수줍은 친구',favorite:'flower',position:[35,65],area:'hill',intro:'안녕! 이 언덕에서는 계절마다 다른 꽃향기가 나. 같이 찾아볼래?',speech:'어떤 꽃이 피었을까?',talks:['내 귀는 작은 바람 소리도 들을 수 있어. 네 인사도 잘 들었어!','꽃을 세다가 나비가 지나가면, 처음부터 다시 세게 돼.','천천히 걸어도 괜찮아. 예쁜 꽃은 가까이에도 있으니까.'],close:'네가 올까 봐 오늘 제일 예쁜 꽃을 골라뒀어.',best:'너와 함께라면 처음 가는 길도 무섭지 않아.',thanks:'이 꽃, 정말 예쁘다! 내 작은 정원에 놓아둘게.',memory:'토끼와 꽃언덕에서 작은 꽃다발을 만들었다.'},
 bear:{name:'곰',personality:'느긋하고 든든한 숲의 이웃',favorite:'berry',position:[42,65],area:'pond',intro:'어서 와. 연못 바람이 참 시원하지? 열매를 먹으며 쉬어 가도 좋아.',speech:'잠깐 쉬어 가자.',talks:['크게 하품하면 걱정도 조금 작아지는 것 같아.','오늘은 물 위에 구름이 몇 개나 떠 있는지 세어봤어.','맛있는 열매를 찾으면 친구들과 나누는 게 제일 좋아.'],close:'너와 나눌 열매를 따로 챙겨두었어. 함께 먹자.',best:'이 숲에서 네가 편히 쉴 수 있도록 늘 곁에 있을게.',thanks:'우와, 잘 익었네! 너도 하나 먹을래?',memory:'곰과 연못가에 앉아 달콤한 열매를 나눠 먹었다.'},
 deer:{name:'사슴',personality:'작은 변화를 알아보는 다정한 산책가',favorite:'leaf',position:[66,75],area:'hill',intro:'반가워. 새잎이 돋은 길을 따라 여기까지 왔어. 같이 산책할까?',speech:'새잎이 돋았어!',talks:['오늘은 어제보다 잎사귀가 조금 더 초록빛이야.','발밑의 작은 꽃을 살피며 걸으면 길이 더 재미있어.','내 뿔에 잎사귀가 걸리면 숲이 준 장식이라고 생각해.'],close:'이 언덕에서 가장 포근한 산책길을 너에게 알려주고 싶어.',best:'너와 만든 추억이 이 숲에서 가장 소중한 풍경이야.',thanks:'싱그러운 잎이네. 나를 생각해줘서 고마워.',memory:'사슴과 언덕길을 걸으며 처음 핀 꽃을 찾았다.'},
 raccoon:{name:'너구리',personality:'보물 찾기를 좋아하는 호기심쟁이',favorite:'berry',position:[62,78],area:'pond',intro:'쉿! 반짝이는 돌을 발견했어. 오늘의 보물찾기에 함께할래?',speech:'저건 무슨 보물이지?',talks:['반짝이지 않아도 소중한 건 많아. 이 조약돌처럼!','나는 꼬리를 베개로 쓰지만, 가끔 너무 간지러워.','연못에서 내 얼굴을 봤어. 아주 유능한 탐험가처럼 생겼더라.'],close:'내 보물 상자를 보여줄게. 네가 준 선물도 들어 있어.',best:'숲의 보물을 다 모아도 너와의 추억만큼은 못할 거야.',thanks:'보물보다 더 좋은 열매잖아! 정말 고마워.',memory:'너구리와 동그란 조약돌을 찾고 보물 지도를 그렸다.'}
});
const AREAS={home:{name:'햇살 숲',image:'assets/forest-wide.webp',description:'우리의 작은 집이 있는 숲'},hill:{name:'꽃언덕',image:'assets/flower-hill.webp',description:'토끼와 사슴이 산책하는 언덕'},pond:{name:'연못가',image:'assets/quiet-pond.webp',description:'곰과 너구리가 쉬어 가는 물가'}};
const NODES=[['flower',19,51],['leaf',48,43],['berry',62,49],['flower',30,84],['berry',20,72],['leaf',82,42],['flower',80,80],['berry',49,89],['leaf',40,75],['flower',66,87],['berry',87,62],['leaf',17,89]];
const SLOTS=[[26,57],[48,58],[64,62],[84,53],[23,79],[42,86],[61,91],[74,74],[54,39],[36,45],[18,62],[64,40]];
// Retain the first twelve slot IDs so existing decorations keep their positions.
for(let y=42;y<=87;y+=9)for(let x=14;x<=86;x+=9)if(!SLOTS.some(([a,b])=>Math.hypot(a-x,b-y)<5))SLOTS.push([x,y]);
const friendValues=()=>Object.fromEntries(Object.keys(FOXES).map(id=>[id,0]));
const initialLocations=()=>Object.fromEntries(Object.entries(FOXES).map(([id,f])=>[id,{area:f.area||'home',x:f.position[0],y:f.position[1]}]));
const FRESH=()=>({version:1,started:false,inventory:{flower:0,berry:0,leaf:0},foundItems:[],met:[],affection:friendValues(),talkCounts:friendValues(),lastTalk:friendValues(),unlocked:[],stock:{flowerbed:0,mushroom:0,fence:0,lantern:0,sign:0},placed:[],harvested:{},areaHarvested:{},nodePositions:{},characterLocations:initialLocations(),currentArea:'home',journal:[],memories:[],stats:{collected:0,gifts:0,crafted:0,placed:0}});
const finite=(n,max=999999)=>Number.isInteger(n)&&n>=0&&n<=max;
// Validate imported/local data so a malformed save cannot produce negative inventory or broken positions.
function validate(s){
 if(!s||s.version!==1||typeof s.started!=='boolean')throw Error('저장 파일 형식이 맞지 않아요.');
 for(const k of Object.keys(ITEMS))if(!finite(s.inventory?.[k]))throw Error('재료 정보가 올바르지 않아요.');
 for(const k of Object.keys(FOXES)){if(!['red','arctic','tibetan'].includes(k)){s.affection[k]??=0;s.talkCounts[k]??=0;s.lastTalk[k]??=0;}if(!finite(s.affection?.[k],100)||!finite(s.talkCounts?.[k])||!Number.isFinite(s.lastTalk?.[k])||s.lastTalk[k]<0)throw Error('친구 정보가 올바르지 않아요.');}
 for(const k of Object.keys(DECOR))if(!finite(s.stock?.[k]))throw Error('장식 정보가 올바르지 않아요.');
 for(const [key,allowed] of [['met',Object.keys(FOXES)],['foundItems',Object.keys(ITEMS)],['unlocked',Object.keys(DECOR)]])if(!Array.isArray(s[key])||s[key].some(v=>!allowed.includes(v)))throw Error('도감 정보가 올바르지 않아요.');
 if(!Array.isArray(s.placed)||s.placed.length>SLOTS.length*3||s.placed.some(p=>!DECOR[p.kind]||!finite(p.slot,SLOTS.length-1)||!s.unlocked.includes(p.kind)||(p.area!==undefined&&!AREAS[p.area]))||new Set(s.placed.map(p=>(p.area||'home')+':'+p.slot)).size!==s.placed.length)throw Error('장식 위치가 올바르지 않아요.');
 if(!Array.isArray(s.journal)||s.journal.length>100||s.journal.some(e=>typeof e.text!=='string'||e.text.length>500||!Number.isFinite(e.time)||!['leaf','heart','gift','chair','book','sprout'].includes(e.icon)))throw Error('일기 정보가 올바르지 않아요.');
 if(!Array.isArray(s.memories)||s.memories.length>30||s.memories.some(x=>typeof x!=='string'||x.length>60))throw Error('추억 정보가 올바르지 않아요.');
 for(const k of ['collected','gifts','crafted','placed'])if(!finite(s.stats?.[k]))throw Error('기록 정보가 올바르지 않아요.');
 if(!s.harvested||typeof s.harvested!=='object'||Object.entries(s.harvested).some(([k,v])=>!finite(Number(k),NODES.length-1)||!Number.isFinite(v)||v<0))throw Error('숲 정보가 올바르지 않아요.');
 s.currentArea??='home';s.areaHarvested??={};s.nodePositions??={};s.characterLocations??=initialLocations();
 if(!AREAS[s.currentArea])throw Error('장소 정보가 올바르지 않아요.');
 for(const id of Object.keys(FOXES)){s.characterLocations[id]??=initialLocations()[id];const p=s.characterLocations[id];if(!AREAS[p.area]||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>100||p.y<0||p.y>100)throw Error('친구 위치가 올바르지 않아요.');}
 for(const [area,nodes]of Object.entries(s.nodePositions))if(!AREAS[area]||!Array.isArray(nodes)||nodes.length!==NODES.length||nodes.some(p=>!Array.isArray(p)||p.length!==2||p.some(n=>!Number.isFinite(n)||n<0||n>100)))throw Error('수집 위치가 올바르지 않아요.');
 for(const [area,values]of Object.entries(s.areaHarvested))if(!AREAS[area]||!values||Object.entries(values).some(([k,v])=>!finite(Number(k),NODES.length-1)||!Number.isFinite(v)||v<0))throw Error('장소별 수집 정보가 올바르지 않아요.');
 return s;
}
let state=FRESH(),saveAvailable=true,recovery=false;
try{const raw=localStorage.getItem(KEY);if(raw)state=validate(JSON.parse(raw));}catch(e){saveAvailable=false;recovery=true;}
let view='forest',category='friends',selectedKind=null,movingSlot=null,activeFox=null,soundOn=false,audio=null,audioTimer=null;
let selectedWalker=null,travelling=false,walkTimers={},camera={zoom:1,x:0,y:0},drag=null,suppressGroundClick=false;
const movementKeys=new Set(),areaImages=new Map();
let keyboardFrame=0,keyboardLastTime=0,keyboardDirty=false,keyboardSaveTime=0;
let followFrame=0,followLastTime=0,travelVersion=0,travelAnimations=[];
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));saveAvailable=true;$('#save-status').innerHTML='<i></i>자동 저장됨';$('#save-status').classList.remove('save-warning');}catch{saveAvailable=false;$('#save-status').textContent='저장 공간 확인 필요';$('#save-status').classList.add('save-warning');}}
function log(text,type='leaf'){state.journal.unshift({text,time:Date.now(),icon:type});state.journal=state.journal.slice(0,80);}
function toast(message,error=false){const el=document.createElement('div');el.className='toast'+(error?' error':'');el.textContent=message;$('#toast-region').append(el);while($('#toast-region').children.length>3)$('#toast-region').firstElementChild.remove();setTimeout(()=>el.remove(),3500);}
function particle(x,y,text){const el=document.createElement('span');el.className='particle';el.style.left=x+'%';el.style.top=y+'%';el.textContent=text;$('#world').append(el);setTimeout(()=>el.remove(),1600);}
const affinityLabel=n=>n>=100?'소중한 단짝':n>=60?'마음 나눈 친구':n>=25?'가까워지는 사이':'알아가는 사이';
const costHTML=cost=>Object.entries(cost).map(([k,n])=>`${ITEMS[k].art}<span>${n}</span>`).join('');
const canCraft=kind=>Object.entries(DECOR[kind].cost).every(([k,n])=>state.inventory[k]>=n);
function remember(id,text,type='book'){if(state.memories.includes(id))return;state.memories.push(id);log(text,type);toast('새로운 추억이 숲 일기에 기록되었어요');}
function addAffinity(id,amount){const before=state.affection[id];state.affection[id]=Math.min(100,before+amount);for(const threshold of [25,60,100])if(before<threshold&&state.affection[id]>=threshold)remember(`${id}-${threshold}`,threshold===100?FOXES[id].memory:`${FOXES[id].name}와 ${affinityLabel(threshold)}가 되었다.`, 'heart');}
function renderResources(){ $('#resources').innerHTML=Object.entries(ITEMS).map(([k,v])=>`<div class="resource" aria-label="${v.name} ${state.inventory[k]}개">${v.art}<div class="resource-info"><span>${v.name}</span><strong data-count="${k}">${state.inventory[k]}</strong></div></div>`).join('');}
const currentArea=()=>state.currentArea||'home';
const localDecor=()=>state.placed.filter(p=>(p.area||'home')===currentArea());
const harvestFor=(area=currentArea())=>area==='home'?state.harvested:(state.areaHarvested[area]??={});
function isGround(area,x,y){return x>=10&&x<=90&&y>=41&&y<=89&&!(area==='home'&&x>77&&y>69)&&!(area==='home'&&x>69&&y<49)&&!(area==='pond'&&x>72&&y>62);}
// Movement uses elapsed time, with normalized diagonals and the map's aspect ratio.
function movementDirection(keys){
 const x=Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft'));
 const y=Number(keys.has('ArrowDown'))-Number(keys.has('ArrowUp'));
 const length=Math.hypot(x,y)||1;return {x:x/length,y:y/length};
}
function movementStep(position,direction,seconds,aspect=1){
 const distance=18*Math.min(.05,Math.max(0,seconds));
 let x=Math.max(10,Math.min(90,position.x+direction.x*distance));
 let y=Math.max(41,Math.min(89,position.y+direction.y*distance*aspect));
 if(!isGround(position.area,x,position.y))x=position.x;
 if(!isGround(position.area,x,y))y=position.y;
 return {x,y};
}
function boundaryDestination(area,position,direction){
 const order=Object.keys(AREAS),index=order.indexOf(area);
 if(direction.x<0&&position.x<=10.75)return order[index-1]||null;
 if(direction.x>0&&position.x>=89.25)return order[index+1]||null;
 return null;
}
function entrancePosition(area,direction,previousY){
 const x=direction>0?14:86,preferred=Math.max(44,Math.min(86,previousY));
 const y=[preferred,58,52,64,80].find(value=>isGround(area,x,value));
 return {area,x,y:y??58};
}
function stopCharacterMotion(id){
 const el=id&&$(`[data-walker="${id}"]`);if(!el)return;
 const wasMoving=!!walkTimers[id];
 if(walkTimers[id]){
  const computed=getComputedStyle(el),world=$('#world');
  state.characterLocations[id].x=parseFloat(computed.left)/world.offsetWidth*100;
  state.characterLocations[id].y=parseFloat(computed.top)/world.offsetHeight*100;
  clearTimeout(walkTimers[id]);delete walkTimers[id];
 }
 const p=state.characterLocations[id];
 el.style.setProperty('--walk-duration','0ms');el.style.left=p.x+'%';el.style.top=p.y+'%';
 el.classList.remove('walking');
 if(followFrame)cancelAnimationFrame(followFrame);followFrame=0;followLastTime=0;
 return wasMoving;
}
function stopKeyboardMovement(){
 movementKeys.clear();if(keyboardFrame)cancelAnimationFrame(keyboardFrame);
 keyboardFrame=0;keyboardLastTime=0;
 if(selectedWalker&&!walkTimers[selectedWalker])$(`[data-walker="${selectedWalker}"]`)?.classList.remove('walking');
 if(keyboardDirty){keyboardDirty=false;persist();}
}
function keyboardMovementAllowed(){
 return !!selectedWalker&&view!=='decorate'&&!$('#dialog').open&&!document.hidden;
}
function runKeyboardMovement(time){
 keyboardFrame=0;
 if(!keyboardMovementAllowed()||!movementKeys.size){stopKeyboardMovement();return;}
 const seconds=keyboardLastTime?Math.min(.05,(time-keyboardLastTime)/1000):1/60;
 keyboardLastTime=time;
 if(!travelling){
  const direction=movementDirection(movementKeys),p=state.characterLocations[selectedWalker];
  const world=$('#world'),next=movementStep(p,direction,seconds,world.offsetWidth/world.offsetHeight);
  const el=$(`[data-walker="${selectedWalker}"]`),moving=next.x!==p.x||next.y!==p.y;
  if(el){
   el.style.setProperty('--walk-duration','0ms');
   el.classList.toggle('walking',moving);
   if(direction.x)el.style.setProperty('--sprite-facing',direction.x<0?-1:1);
   if(moving){p.x=next.x;p.y=next.y;el.style.left=p.x+'%';el.style.top=p.y+'%';keyboardDirty=true;}
  }
  followCharacterCamera(p,seconds);
  if(keyboardDirty&&time-keyboardSaveTime>600){keyboardSaveTime=time;keyboardDirty=false;persist();}
  const destination=boundaryDestination(p.area,p,direction);
  if(destination)travelTo(destination,{continuous:true});
 }
 if(movementKeys.size)keyboardFrame=requestAnimationFrame(runKeyboardMovement);
}
function startKeyboardMovement(){if(!keyboardFrame){keyboardLastTime=0;keyboardFrame=requestAnimationFrame(runKeyboardMovement);}}
function followCharacterCamera(position,seconds,immediate=false){
 if(drag||!position)return;
 const scene=$('#scene'),world=$('#world'),width=scene.clientWidth,height=scene.clientHeight;
 const actorX=position.x/100*world.offsetWidth*camera.zoom;
 const actorY=position.y/100*world.offsetHeight*camera.zoom;
 let targetX=camera.x,targetY=camera.y;
 if(immediate){targetX=width*.5-actorX;targetY=height*.65-actorY;}
 else{
  if(actorX+camera.x<width*.3)targetX=width*.3-actorX;
  if(actorX+camera.x>width*.7)targetX=width*.7-actorX;
  if(actorY+camera.y<height*.42)targetY=height*.42-actorY;
  if(actorY+camera.y>height*.76)targetY=height*.76-actorY;
 }
 const blend=immediate?1:1-Math.exp(-9*Math.max(0,seconds));
 camera.x+=(targetX-camera.x)*blend;camera.y+=(targetY-camera.y)*blend;applyCamera();
}
function trackWalkingCamera(time){
 followFrame=0;
 if(!selectedWalker||travelling&&$('#scene').classList.contains('is-travelling'))return;
 const el=$(`[data-walker="${selectedWalker}"]`),world=$('#world');
 if(!el)return;
 const computed=getComputedStyle(el),seconds=followLastTime?Math.min(.05,(time-followLastTime)/1000):1/60;
 followLastTime=time;
 followCharacterCamera({x:parseFloat(computed.left)/world.offsetWidth*100,y:parseFloat(computed.top)/world.offsetHeight*100},seconds);
 if(walkTimers[selectedWalker])followFrame=requestAnimationFrame(trackWalkingCamera);
}
function preloadArea(area){
 if(!areaImages.has(area)){
  const image=new Image();image.src=AREAS[area].image;
  const ready=image.decode().then(()=>image);
  areaImages.set(area,ready);ready.catch(()=>areaImages.delete(area));
 }
 return areaImages.get(area);
}
function cancelAreaTransition(){
 travelVersion++;travelAnimations.forEach(animation=>animation.cancel());travelAnimations=[];
 $$('.area-transition').forEach(el=>el.remove());$('#scene').classList.remove('is-travelling');travelling=false;
}
async function transitionArea(area,id,direction,{continuous=false}={}){
 const version=++travelVersion;travelling=true;
 const scene=$('#scene');scene.dataset.transitionTo=AREAS[area].name+'(으)로 산책 중';scene.classList.add('is-travelling');
 try{await preloadArea(area);}catch{if(version===travelVersion){travelling=false;scene.classList.remove('is-travelling');stopKeyboardMovement();toast('숲 배경을 불러오지 못했어요. 다시 이동해 주세요.',true);}return;}
 if(version!==travelVersion)return;
 const world=$('#world'),snapshot=document.createElement('div');
 snapshot.className='area-transition';snapshot.setAttribute('aria-hidden','true');snapshot.inert=true;
 const oldWorld=world.cloneNode(true);oldWorld.removeAttribute('id');
 $$('[id]',oldWorld).forEach(el=>el.removeAttribute('id'));
 $$('[data-walker],[data-collect],[data-slot]',oldWorld).forEach(el=>{el.removeAttribute('data-walker');el.removeAttribute('data-collect');el.removeAttribute('data-slot');});
 snapshot.append(oldWorld);scene.append(snapshot);scene.classList.add('is-travelling');
 scene.dataset.transitionTo=AREAS[area].name+'(으)로 산책 중';
 const previousCamera={...camera},previousY=id?state.characterLocations[id].y:60;
 if(id)state.characterLocations[id]=entrancePosition(area,direction,previousY);
 enterArea(area);camera=previousCamera;
 if(id)followCharacterCamera(state.characterLocations[id],0,true);else applyCamera();
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches,duration=reduced?80:460;
 travelAnimations=[snapshot.animate([{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${reduced?0:-direction*45}px)`}],{duration,easing:'ease-in-out'}),world.animate([{opacity:.2},{opacity:1}],{duration,easing:'ease-in-out'})];
 await Promise.allSettled(travelAnimations.map(animation=>animation.finished));
 if(version!==travelVersion)return;
 travelAnimations=[];snapshot.remove();scene.classList.remove('is-travelling');travelling=false;
 if(id){log(`${FOXES[id].name}와 ${AREAS[area].name}(으)로 산책을 갔다.`,'leaf');persist();}
 if(movementKeys.size&&id)startKeyboardMovement();
 else if(id&&!continuous)walkTo(id,...arrivalSpot(area,id));
}
function randomNodePosition(area,index,positions){
 const previous=positions[index];let fallback=null;
 for(let attempt=0;attempt<800;attempt++){
  const p=[12+Math.random()*76,44+Math.random()*43];const [x,y]=p;
  if(!isGround(area,x,y))continue;
  if(Object.entries(state.characterLocations).some(([id,c])=>c.area===area&&Math.abs(x-c.x)<10&&y>c.y-19&&y<c.y+6))continue;
  if(state.placed.some(d=>(d.area||'home')===area&&Math.abs(x-SLOTS[d.slot][0])<7&&Math.abs(y-SLOTS[d.slot][1])<9))continue;
  if(positions.some((q,i)=>i!==index&&q&&Math.hypot((q[0]-x)/1.1,q[1]-y)<8))continue;
  fallback=p;if(!previous||Math.hypot(previous[0]-x,previous[1]-y)>11)return p;
 }
 // A dense decorated forest may have fewer free cells: choose a safe ground cell,
 // rather than hang or put a collectible into the pond.
 return fallback||previous||[20+index%4*13,48+Math.floor(index/4)*15];
}
function ensureNodes(area=currentArea()){if(!state.nodePositions[area]){const positions=[];for(let i=0;i<NODES.length;i++)positions.push(randomNodePosition(area,i,positions));state.nodePositions[area]=positions;}return state.nodePositions[area];}
function respawnNodes(now=Date.now()){let changed=false;for(const area of Object.keys(AREAS)){const harvested=harvestFor(area);for(const k of Object.keys(harvested))if(harvested[k]<=now){const positions=ensureNodes(area);positions[Number(k)]=randomNodePosition(area,Number(k),positions);delete harvested[k];changed=true;}}return changed;}
function renderNodes(){const now=Date.now(),positions=ensureNodes(),harvested=harvestFor();$('#collectibles').innerHTML=NODES.map(([kind],i)=>{const [x,y]=positions[i];return `<button class="collectible ${harvested[i]>now?'gathered':''}" data-collect="${i}" style="left:${x}%;top:${y}%" aria-label="${ITEMS[kind].name} 수집" ${harvested[i]>now?'disabled':''}>${ITEMS[kind].art}</button>`;}).join('');}
const animalImage=id=>['red','arctic','tibetan'].includes(id)?`assets/characters-v2/${id}.png`:`assets/animals/${id}.png`;
function renderCharacters(){const locals=Object.keys(FOXES).filter(id=>state.characterLocations[id].area===currentArea());if(selectedWalker&&!locals.includes(selectedWalker))selectedWalker=null;$('#characters').innerHTML=locals.map(id=>{const f=FOXES[id],p=state.characterLocations[id];return `<button class="character ${id} ${selectedWalker===id?'is-selected':''}" style="left:${p.x}%;top:${p.y}%" data-walker="${id}" aria-label="${f.name} 선택" aria-pressed="${selectedWalker===id}"><span class="speech">${f.speech}</span><img src="${animalImage(id)}" alt="${f.name}" draggable="false"><span class="character-tag">${f.name}<span>♡</span></span></button>`;}).join('');renderWalkerControls();}
function renderWalkerControls(){$('#walker-controls').innerHTML=selectedWalker?`<span>${FOXES[selectedWalker].name}</span><kbd aria-label="방향키로 이동">← ↑ ↓ →</kbd><button data-fox="${selectedWalker}">대화</button><button data-deselect="true" aria-label="캐릭터 선택 해제">×</button>`:'동물을 선택하면 방향키로 산책할 수 있어요';$('#scene').classList.toggle('has-selected-walker',selectedWalker!==null);}
function selectWalker(id){if(travelling)return;if(selectedWalker===id){clearWalkerSelection();return;}stopKeyboardMovement();if(selectedWalker&&stopCharacterMotion(selectedWalker))persist();selectedWalker=id;if(!state.met.includes(id)){state.met.push(id);log(`${AREAS[currentArea()].name}에서 ${FOXES[id].name}와 처음 인사를 나누었다.`,'heart');persist();renderSidebar();}$$('[data-walker]').forEach(el=>{el.classList.toggle('is-selected',el.dataset.walker===id);el.setAttribute('aria-pressed',el.dataset.walker===id?'true':'false');});renderWalkerControls();toast(`${FOXES[id].name} 선택 · 방향키 또는 배경 클릭으로 이동`);}
function clearWalkerSelection(){stopKeyboardMovement();if(selectedWalker&&stopCharacterMotion(selectedWalker))persist();cancelAreaTransition();selectedWalker=null;$$('[data-walker]').forEach(el=>{el.classList.remove('is-selected');el.setAttribute('aria-pressed','false');});renderWalkerControls();}
function walkTo(id,x,y,arrival){
 const p=state.characterLocations[id],el=$(`[data-walker="${id}"]`);if(!p||!el)return;
 stopKeyboardMovement();stopCharacterMotion(id);
 const duration=Math.max(450,Math.min(2500,Math.hypot(p.x-x,p.y-y)*35));
 if(x!==p.x)el.style.setProperty('--sprite-facing',x<p.x?-1:1);
 p.x=x;p.y=y;el.classList.add('walking');el.style.setProperty('--walk-duration',duration+'ms');
 el.style.left=x+'%';el.style.top=y+'%';persist();
 walkTimers[id]=setTimeout(()=>{delete walkTimers[id];el.classList.remove('walking');arrival?.();},duration);
 if(selectedWalker===id&&!followFrame){followLastTime=0;followFrame=requestAnimationFrame(trackWalkingCamera);}
}
function enterArea(area){state.currentArea=area;ensureNodes(area);renderWorld();persist();render();renderCharacters();}
function arrivalSpot(area,id){return [[48,55],[25,78],[50,84],[80,58],[18,52]].find(([x,y])=>isGround(area,x,y)&&!Object.entries(state.characterLocations).some(([other,p])=>other!==id&&p.area===area&&Math.abs(p.x-x)<13&&Math.abs(p.y-y)<18))||[50,86];}
function stopAllWalks(){stopKeyboardMovement();Object.keys(walkTimers).forEach(stopCharacterMotion);walkTimers={};cancelAreaTransition();selectedWalker=null;}
function travelTo(area,{continuous=false}={}){
 if(!AREAS[area]||area===currentArea()||travelling)return;
 if(view==='decorate')switchView('forest');
 const id=selectedWalker,from=currentArea(),direction=Object.keys(AREAS).indexOf(area)>Object.keys(AREAS).indexOf(from)?1:-1;
 if(continuous)return transitionArea(area,id,direction,{continuous:true});
 stopKeyboardMovement();
 if(id&&state.characterLocations[id].area===from){
  travelling=true;const edge=direction>0?89.4:10.6,p=state.characterLocations[id];
  const y=isGround(from,edge,p.y)?p.y:58;
  walkTo(id,edge,y,()=>transitionArea(area,id,direction));
 }else transitionArea(area,null,direction);
}
function renderWorld(){const area=currentArea();$('.forest-background').src=AREAS[area].image;$('.forest-background').alt=AREAS[area].description;$('#area-title').innerHTML=AREAS[area].name+`<small>${AREAS[area].description}</small>`;$('#world-map').innerHTML='<small>숲 지도 · 친구들과 산책해요</small><div>'+Object.entries(AREAS).map(([id,a])=>`<button data-travel="${id}" class="${id===area?'active':''}">${a.name}</button>`).join('')+'</div>';const keys=Object.keys(AREAS),i=keys.indexOf(area);$('#area-navigation').innerHTML=(i>0?`<button class="area-exit prev" data-travel="${keys[i-1]}" aria-label="${AREAS[keys[i-1]].name}(으)로 이동">‹<small>${AREAS[keys[i-1]].name}</small></button>`:'')+(i<keys.length-1?`<button class="area-exit next" data-travel="${keys[i+1]}" aria-label="${AREAS[keys[i+1]].name}(으)로 이동">›<small>${AREAS[keys[i+1]].name}</small></button>`:'');resetCamera();}
function applyCamera(){const scene=$('#scene');const min=1/1.4;camera.zoom=Math.max(min,Math.min(1.4,camera.zoom));camera.x=Math.max(scene.clientWidth-scene.clientWidth*1.4*camera.zoom,Math.min(0,camera.x));camera.y=Math.max(scene.clientHeight-scene.clientHeight*1.4*camera.zoom,Math.min(0,camera.y));$('#world').style.transform=`translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`;$('#camera-percent').textContent=Math.round(camera.zoom*100)+'%';}
function resetCamera(fit=false){const zoom=fit?1/1.4:.8;camera={zoom,x:-$('#scene').clientWidth*(1.4*zoom-1),y:-$('#scene').clientHeight*(1.4*zoom-1)/2};applyCamera();}
function zoomCamera(direction){if(direction==='reset'){resetCamera(true);return;}const old=camera.zoom;camera.zoom=Math.max(1/1.4,Math.min(1.4,old+(direction==='in'?.12:-.12)));const r=camera.zoom/old;camera.x=(camera.x-$('#scene').clientWidth/2)*r+$('#scene').clientWidth/2;camera.y=(camera.y-$('#scene').clientHeight/2)*r+$('#scene').clientHeight/2;applyCamera();}
function renderDecor(){const edit=view==='decorate';$('#scene').classList.toggle('editing',edit);document.querySelector("#scene").classList.toggle('placing',edit&&(selectedKind!==null||movingSlot!==null));$('#decoration-layer').innerHTML=SLOTS.map(([x,y],i)=>{const placed=localDecor().find(p=>p.slot===i);if(!placed&&!isGround(currentArea(),x,y))return '';return `<button class="decor-slot ${placed?'occupied':'empty'} ${movingSlot===i?'selected':''}" style="left:${x}%;top:${y}%" data-slot="${i}" ${!edit?'disabled':''} aria-label="${placed?DECOR[placed.kind].name+(edit?' 이동 또는 회수':''):i+1+'번 빈 배치 자리'}">${placed?DECOR[placed.kind].art:'+'}</button>`;}).join('');$('#scene-instruction').hidden=!edit;$('#scene-instruction').textContent=movingSlot!==null?'옮길 빈자리를 눌러주세요':selectedKind?DECOR[selectedKind].name+' · 빈자리를 눌러 배치해요':'아래에서 장식을 제작하고 선택해요';$('#mode-label').textContent=edit?'숲 꾸미는 중':'숲 산책 중';$('#mode-hint').textContent=edit?'장식을 누르면 이동하거나 회수할 수 있어요':'방향키·배경 클릭으로 이동 · 좌우 경계에서 다음 숲으로';$('#decorate-toggle').innerHTML=(edit?'꾸미기 마치기':'숲 꾸미기')+icon('arrow');}
function renderWorkbench(){const root=$('#workbench');root.hidden=view!=='decorate';if(view!=='decorate')return;root.innerHTML=`<div class="workbench-heading"><h2>숲을 채우는 작은 것들</h2><p>재료를 모아 제작한 뒤, 숲의 + 자리에 놓아보세요.</p></div><div class="decor-grid">${Object.entries(DECOR).map(([k,d])=>`<article class="decor-card ${selectedKind===k?'chosen':''}">${d.art}<h3>${d.name}</h3><div class="recipe" aria-label="필요 재료">${costHTML(d.cost)}</div><div class="owned-count">보관 ${state.stock[k]}개 · 배치 ${state.placed.filter(p=>p.kind===k).length}개</div><button class="craft" data-craft="${k}" ${!canCraft(k)?'disabled':''}>${state.unlocked.includes(k)?'추가 제작':'제작하기'}</button><button data-select="${k}" ${!state.stock[k]?'disabled':''}>${selectedKind===k?'선택됨':'배치'}</button></article>`).join('')}</div>`;}
const goals=()=>[{label:'숲의 선물 3개 모으기',done:state.stats.collected>=3,count:`${Math.min(3,state.stats.collected)}/3`},{label:'친구 세 마리에게 인사하기',done:state.met.length>=3,count:`${Math.min(3,state.met.length)}/3`},{label:'마음을 담아 선물하기',done:state.stats.gifts>0,count:''},{label:'나만의 장식 놓아보기',done:state.stats.placed>0,count:''}];
function friendsCard(){return `<section class="side-card friends-list"><span class="eyebrow">OUR FOREST FRIENDS</span><div class="side-heading"><h2>숲의 친구들</h2><span>${state.met.length}마리 만남</span></div><div class="friends-scroll">${Object.entries(FOXES).map(([id,f])=>{const known=state.met.includes(id),place=state.characterLocations[id].area;return `<button class="friend-row ${known?'':'unmet'}" ${known||place===currentArea()?`data-fox="${id}"`:`data-travel="${place}"`}><span class="friend-portrait ${id}"><img src="${animalImage(id)}" alt="${known||place===currentArea()?f.name:'미발견 친구'}"></span><span class="friend-details"><span class="friend-name">${known||place===currentArea()?f.name:'아직 만나지 못한 친구'}<span>♡ ${state.affection[id]}</span></span><small>${AREAS[place].name} · ${known?affinityLabel(state.affection[id]):'이곳에서 만나요'}</small><span class="meter"><span style="width:${state.affection[id]}%"></span></span></span></button>`;}).join('')}</div><p class="card-footnote">친구를 선택하고 방향키로 함께 산책해요.</p></section>`;}
function goalsCard(){const list=goals();return `<section class="side-card goals-card"><span class="eyebrow">LITTLE MOMENTS, BIG JOY</span><div class="side-heading"><h2>오늘의 작은 발자국</h2><span>${list.filter(g=>g.done).length} / 4</span></div>${list.map(g=>`<div class="goal ${g.done?'done':''}"><span class="goal-check">${g.done?'✓':''}</span><span>${g.label}</span>${g.count?`<small>${g.count}</small>`:''}</div>`).join('')}<div class="goals-footer">${icon('leaf')}${list.every(g=>g.done)?'첫 숲 산책을 완성했어요. 참 잘했어요!':'하나씩, 나의 속도로 해도 괜찮아요.'}</div></section>`;}
function journalCard(){return `<section class="side-card journal-card"><span class="eyebrow">DEAR, MY FOREST</span><div class="side-heading"><h2>숲에 남긴 이야기</h2><span>${state.journal.length}개의 기록</span></div>${journalEntries(5)}<button class="text-button" data-action="full-journal">일기장 펼치기 ${icon('arrow')}</button></section>`;}
function journalEntries(limit=80){return `<div class="journal-list">${state.journal.length?state.journal.slice(0,limit).map(e=>`<article class="journal-entry"><span>${icon(e.icon)}</span><div><time>${new Date(e.time).toLocaleString('ko-KR',{month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'})}</time><p>${escapeHTML(e.text)}</p></div></article>`).join(''):'<div class="journal-empty">아직은 하얀 일기장이에요.<br>숲에서의 첫 추억을 남겨볼까요?</div>'}</div>`;}
function renderSidebar(){const root=$('#sidebar');root.dataset.mode=view;document.body.dataset.view=view;if(view==='collection'){root.innerHTML=`<section class="side-card"><span class="eyebrow">우리 숲의 작은 만남들</span><div class="side-heading"><h2>나의 숲 도감</h2><span>${state.met.length}마리 만남</span></div><p class="book-intro">숲속에서 만난 작은 발견 <strong>${state.met.length}마리</strong></p><button class="primary-button" data-action="open-book" style="width:100%">도감 펼치기</button></section>${goalsCard()}`;}
 else if(view==='journal'){root.innerHTML=journalCard()+goalsCard();}
 else if(view==='decorate'){root.innerHTML=`<section class="side-card"><span class="eyebrow">MAKE YOURSELF AT HOME</span><div class="side-heading"><h2>나만의 숲 꾸미기</h2><span>${localDecor().length}개 배치</span></div><div class="decor-help"><ol><li>숲을 산책하며 재료를 모아요.</li><li>아래 작업대에서 장식을 제작해요.</li><li>장식의 ‘배치’를 누르고 빈자리를 선택해요.</li><li>놓인 장식은 눌러서 옮기거나 회수해요.</li></ol></div><div class="collection-summary">장식을 회수하면 주머니로 돌아와요. 재료를 다시 쓰지 않고 언제든 배치할 수 있어요.</div><button class="secondary-button" data-action="cancel-placement" style="width:100%;margin-top:15px">${movingSlot!==null?'이동 취소':'선택 해제'}</button></section>${goalsCard()}`;}
 else if(view==='friends'){root.innerHTML=friendsCard()+`<section class="side-card friend-focus-card"><span class="eyebrow">A LITTLE GIFT, A LOT OF LOVE</span><div class="side-heading"><h2>마음을 전하는 방법</h2></div><p>붉은여우는 달콤한 열매,<br>북극여우는 향긋한 들꽃,<br>티베트여우는 싱그러운 잎을 좋아해요.</p><div class="collection-summary">좋아하는 선물은 친밀도 +15<br>다른 선물도 마음은 전해져요. +8</div></section>`;}
 else root.innerHTML=friendsCard()+goalsCard();hydrate(root);}
const discoveredCount=()=>state.met.length+state.foundItems.length+state.unlocked.length;
function catalog(){const group=category==='friends'?FOXES:category==='items'?ITEMS:DECOR;const known=category==='friends'?state.met:category==='items'?state.foundItems:state.unlocked;const cards=Object.entries(group).map(([id,item])=>{const found=known.includes(id);return `<button class="catalog-item ${!found?'unknown':''}" data-detail="${category}:${id}" aria-label="${found?item.name:'미발견 항목'}">${category==='friends'?`<img src="${animalImage(id)}" alt="${found?item.name:'미발견 친구의 실루엣'}">`:item.art}<span>${found?item.name:'???'}</span></button>`;});if(category==='friends')while(cards.length<12)cards.push(`<div class="catalog-item catalog-mystery" aria-label="앞으로의 새로운 만남"><span class="mystery-animal">${icon('sprout')}</span><span>?</span></div>`);return `<div class="collection-tabs" role="tablist" aria-label="도감 분류">${[['friends','동물'],['items','아이템'],['decor','꾸미기']].map(([id,name])=>`<button role="tab" aria-selected="${category===id}" data-category="${id}" class="${category===id?'active':''}">${name}</button>`).join('')}</div><div class="catalog-grid">${cards.join('')}</div><div class="collection-summary">숲속에서 만난 작은 발견 <strong>${state.met.length}마리</strong><p>인사를 나눈 동물 친구들이 기록돼요.</p></div>`;}
function openBook(){openModal(`<section class="modal field-guide">${closeButton()}<div class="book-rings" aria-hidden="true"></div><h2 class="sr-only">나의 숲 도감</h2>${catalog()}</section>`);}
function render(){respawnNodes();renderResources();renderNodes();renderDecor();renderWorkbench();renderSidebar();}
const viewCopy={forest:['어서 와요, 나의 작은 숲에','서두르지 않아도 괜찮아요. 오늘은 어떤 작은 추억을 만나게 될까요?'],friends:['곁에 있으면, 마음이 포근해져요','작은 인사와 다정한 선물로 숲의 친구들과 가까워져요.'],decorate:['작은 손길로, 더 아늑한 숲','숲이 건네준 선물로 나만의 공간을 하나씩 채워보세요.'],collection:['우리가 만난, 소중한 것들','처음 만난 친구도, 작은 잎사귀도. 하나하나 숲의 이야기가 됩니다.'],journal:['오늘도 한 페이지, 우리의 이야기','당신이 남긴 작은 관심들을 숲은 오래오래 기억할 거예요.']};
function switchView(next){if(!viewCopy[next])return;stopKeyboardMovement();if(selectedWalker&&stopCharacterMotion(selectedWalker))persist();view=next;selectedKind=null;movingSlot=null;$$('#main-nav [data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-current',b.dataset.view===view?'page':'false');});$('#page-title').innerHTML=viewCopy[view][0]+` <span class="heading-leaf">${icon('leaf')}</span>`;$('#page-description').textContent=viewCopy[view][1];$('#scene-caption').textContent=view==='decorate'?'배경을 드래그해 둘러보고, 빈자리에 장식을 놓아요':'방향키·배경 클릭으로 이동 · 좌우 경계에서 다음 숲으로 · 드래그로 둘러보기';render();if(view==='collection')openBook();}
function collect(index){const node=NODES[index],harvested=harvestFor();if(!node||view==='decorate'||travelling||harvested[index]>Date.now())return;const [kind]=node,[x,y]=ensureNodes()[index];state.inventory[kind]++;state.stats.collected++;harvested[index]=Date.now()+12000;if(!state.foundItems.includes(kind)){state.foundItems.push(kind);log(`${ITEMS[kind].name}을 처음 발견했다. 작은 주머니에 소중히 담았다.`);toast(`${ITEMS[kind].name} 발견! 도감에 기록했어요`);}else toast(`${ITEMS[kind].name} +1 · 주머니에 담았어요`);particle(x,y,`${ITEMS[kind].name} +1`);chime();if(state.stats.collected===3)remember('first-collection','숲의 선물 세 개를 모았다. 내 작은 숲의 첫 수확이다.');persist();render();}
function closeModal(){const d=$('#dialog');d.close();activeFox=null;}
function openModal(content){stopKeyboardMovement();if(selectedWalker&&stopCharacterMotion(selectedWalker))persist();if(travelling)cancelAreaTransition();$('#dialog-content').innerHTML=content;hydrate($('#dialog-content'));if(!$('#dialog').open)$('#dialog').showModal();}
const closeButton=()=>`<button class="close-modal icon-button" data-action="close" aria-label="닫기">${icon('close')}</button>`;
function openFox(id,override){if(!FOXES[id])return;activeFox=id;const fox=FOXES[id];if(!state.met.includes(id)){state.met.push(id);log(`${fox.name}와 처음 인사를 나누었다. ${fox.personality}.`,'heart');if(state.met.length===3)remember('all-friends','숲의 친구 세 마리를 만났다. 숲이 조금 더 다정해졌다.','heart');persist();renderSidebar();}const n=state.affection[id];const text=override??(n>=100?fox.best:n>=25?fox.close:fox.intro);const hearts=Array.from({length:5},(_,i)=>`<span class="${n>=(i+1)*20?'filled':'empty'}">${n>=(i+1)*20?'♥':'♡'}</span>`).join('');openModal(`<section class="modal friend-modal ${id}">${closeButton()}<div class="friend-title-panel"><span class="eyebrow">우리 숲의 소중한 친구</span><h2>${fox.name}</h2></div><div class="friend-scene-pane"><span class="portrait-sparkle" aria-hidden="true">✧</span><img src="${animalImage(id)}" alt="${fox.name}"></div><div class="friend-story-pane"><div class="personality">${fox.personality}</div><div class="affection-hearts"><span class="hearts" aria-label="친밀도 하트 ${Math.floor(n/20)}개">${hearts}</span><span>${n} / 100</span></div><div class="meter"><span style="width:${n}%"></span></div><div class="affection-label"><span>${affinityLabel(n)}</span><span>함께한 만큼 자라는 마음</span></div><div class="dialogue-box" id="dialogue-box">“${text}”</div><div class="friend-buttons"><button class="primary-button" data-gift-menu="${id}">${icon('gift')}선물하기</button><button class="secondary-button" data-talk="${id}">${icon('chat')}대화하기</button></div><p class="favorite-note">좋아하는 선물 · ${ITEMS[fox.favorite].name} &nbsp;<span class="gift-heart">♥ +15</span></p></div></section>`);}
function talk(id){const f=FOXES[id],before=state.affection[id];state.talkCounts[id]++;const gain=Date.now()-state.lastTalk[id]>=30000;if(gain){state.lastTalk[id]=Date.now();addAffinity(id,2);if(state.talkCounts[id]===1)log(`${f.name}와 숲 이야기를 나누었다.`,'heart');}const n=state.affection[id];const options=[...f.talks,...(n>=25?[f.close]:[]),...(n>=100?[f.best]:[])];persist();renderSidebar();openFox(id,options[(state.talkCounts[id]-1)%options.length]);if(gain&&n>before)toast(`${f.name}와 마음이 가까워졌어요 · 친밀도 +${n-before}`);else toast('이야기를 조금 더 나눠요. 마음도 천천히 자라나요.');}
function giftMenu(id){activeFox=id;const f=FOXES[id];openModal(`<section class="modal">${closeButton()}<button class="back-button" data-fox="${id}">← ${f.name}에게 돌아가기</button><span class="eyebrow" style="display:block">A GIFT FROM THE HEART</span><h2>어떤 마음을 전할까요?</h2><p>선물할 재료 한 개를 골라주세요.<br>좋아하는 선물은 친밀도 +15, 다른 선물은 +8이에요.</p><div class="gift-options">${Object.entries(ITEMS).map(([k,item])=>`<button class="gift-option ${f.favorite===k?'favorite':''}" data-gift="${id}:${k}" ${state.inventory[k]===0?'disabled':''}>${item.art}<strong>${item.name}</strong><small>보유 ${state.inventory[k]}개</small><small>${f.favorite===k?'♡ 좋아하는 선물 +15':'마음을 담아 +8'}</small></button>`).join('')}</div><p class="small-note">${Object.values(state.inventory).every(n=>n===0)?'주머니가 비었어요. 숲의 반짝이는 아이템을 먼저 모아주세요.':'작은 선물에도, 다정한 마음은 충분히 전해져요.'}</p></section>`);}
function gift(id,kind){if(!FOXES[id]||!ITEMS[kind]||state.inventory[kind]<=0)return;const before=state.affection[id],f=FOXES[id],favorite=f.favorite===kind;state.inventory[kind]--;state.stats.gifts++;addAffinity(id,favorite?15:8);log(`${f.name}에게 ${ITEMS[kind].name}을 선물했다.${favorite?' 무척 좋아해 주었다.':''}`,'gift');persist();render();openFox(id,favorite?f.thanks:'이건 나에게 주는 거야? 나를 떠올려줘서 고마워. 소중히 할게.');const actual=state.affection[id]-before;toast(`${f.name}에게 마음을 전했어요${actual?` · 친밀도 +${actual}`:' · 이미 소중한 단짝이에요'}`);particle(f.position[0],f.position[1]-12,'♡');chime(true);}
function craft(kind){if(!DECOR[kind]||!canCraft(kind))return;for(const[k,n]of Object.entries(DECOR[kind].cost))state.inventory[k]-=n;state.stock[kind]++;state.stats.crafted++;if(!state.unlocked.includes(kind))state.unlocked.push(kind);log(`${DECOR[kind].name}을 만들었다. 숲에 놓을 자리를 찾아봐야겠다.`,'chair');selectedKind=kind;movingSlot=null;persist();render();toast(`${DECOR[kind].name} 완성! 숲의 + 자리를 눌러 배치하세요`);}
function selectDecor(kind){if(state.stock[kind]<=0)return;selectedKind=kind;movingSlot=null;renderDecor();renderWorkbench();renderSidebar();toast(`${DECOR[kind].name} · 숲의 빈자리를 골라주세요`);}
function clickSlot(index){if(view!=='decorate'||!finite(index,SLOTS.length-1)||!isGround(currentArea(),...SLOTS[index]))return;const existing=localDecor().find(p=>p.slot===index);if(existing){if(movingSlot!==null&&movingSlot!==index){toast('이미 장식이 있는 자리예요. 빈자리를 골라주세요.');return;}decorOptions(existing);return;}if(movingSlot!==null){const p=localDecor().find(p=>p.slot===movingSlot);if(!p)return;const name=DECOR[p.kind].name;p.slot=index;movingSlot=null;log(`${name}을 새로운 자리로 옮겼다.`,'chair');toast(`${name}을 옮겼어요`);}else if(selectedKind&&state.stock[selectedKind]>0){state.stock[selectedKind]--;state.placed.push({kind:selectedKind,slot:index,area:currentArea()});state.stats.placed++;log(`${DECOR[selectedKind].name}을 숲에 놓았다. 한결 아늑해졌다.`,'chair');toast('숲이 조금 더 아늑해졌어요');if(state.stats.placed===1)remember('first-decoration','첫 장식으로 숲에 나만의 자리를 만들었다.','chair');if(state.stock[selectedKind]===0)selectedKind=null;}else{toast('아래 작업대에서 장식을 제작하거나 배치를 선택해주세요.');return;}persist();render();}
function decorOptions(p){openModal(`<section class="modal">${closeButton()}<span class="eyebrow">A LITTLE CHANGE OF SCENERY</span><h2>이 장식을 어떻게 할까요?</h2><div class="selection-preview">${DECOR[p.kind].art}<h3>${DECOR[p.kind].name}</h3><p>${DECOR[p.kind].description}</p></div><div class="friend-buttons"><button class="primary-button" data-move="${p.slot}">다른 자리로 이동</button><button class="secondary-button" data-remove="${p.slot}">주머니로 회수</button></div><p class="small-note">회수한 장식은 재료 없이 다시 배치할 수 있어요.</p></section>`);}
function removeDecor(index){const p=localDecor().find(p=>p.slot===index);if(!p)return;state.stock[p.kind]++;state.placed=state.placed.filter(p=>(p.area||'home')!==currentArea()||p.slot!==index);log(`${DECOR[p.kind].name}을 주머니로 회수했다.`,'chair');if(movingSlot===index)movingSlot=null;closeModal();persist();render();toast('장식을 주머니로 돌려놓았어요');}
function openDetail(key){const [group,id]=key.split(':');const data=group==='friends'?FOXES:group==='items'?ITEMS:DECOR;const found=(group==='friends'?state.met:group==='items'?state.foundItems:state.unlocked).includes(id);const item=data[id];if(!item)return;openModal(`<section class="modal">${closeButton()}<span class="eyebrow">MY FOREST COLLECTION</span><h2>${found?item.name:'아직 발견하지 못했어요'}</h2><div class="detail-art ${!found?'unknown':''}">${group==='friends'?`<img src="${animalImage(id)}" alt="친구 실루엣">`:item.art}</div><p>${found?(item.description||item.personality):group==='friends'?'숲에서 친구를 눌러 처음 인사를 나눠보세요.':group==='items'?'숲의 반짝이는 아이템을 눌러 수집해보세요.':'꾸미기 작업대에서 재료를 모아 제작해보세요.'}</p>${found&&group==='decor'?`<div class="recipe">제작 재료 ${costHTML(item.cost)}</div>`:''}${found&&group==='friends'?`<button class="primary-button" data-fox="${id}" style="width:100%;margin-top:20px">친구와 이야기하기</button>`:''}</section>`);}
function fullJournal(){openModal(`<section class="modal">${closeButton()}<span class="eyebrow">LITTLE MOMENTS TO KEEP</span><h2>나의 숲 일기</h2><p>다정했던 순간을 한 페이지씩 모았어요.</p>${journalEntries()}</section>`);}
function settings(){openModal(`<section class="modal">${closeButton()}<span class="eyebrow">TAKE CARE OF YOUR FOREST</span><h2>숲의 작은 설정</h2><div class="settings-info">진행 상황은 이 브라우저에 자동으로 저장돼요. 다른 브라우저나 기기에서는 저장 파일을 불러와 이어갈 수 있어요.${!saveAvailable?'<br><strong>현재 자동 저장이 어려워요. 저장 파일을 내려받아 진행 상황을 보관해주세요.</strong>':''}</div><div class="button-stack"><button class="primary-button" data-action="export">저장 파일 내려받기</button><button class="secondary-button" data-action="import">저장 파일 불러오기</button><button class="secondary-button" data-action="help">플레이 방법</button><button class="secondary-button danger-button" data-action="reset-confirm">숲을 처음부터 시작하기</button></div><input type="file" id="import-file" accept="application/json,.json" hidden><p class="small-note">FOREST LOG · 작은 숲, 우리의 이야기</p></section>`);}
function exportSave(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`forest-log-${new Date().toLocaleDateString('sv-SE')}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('숲의 추억을 파일로 보관했어요');}
function welcome(help=false){openModal(`<section class="modal welcome">${closeButton()}<span class="eyebrow">WELCOME TO YOUR LITTLE FOREST</span><div class="welcome-foxes"><img src="assets/characters-v2/arctic.png" alt="북극여우"><img src="assets/characters-v2/red.png" alt="붉은여우"><img src="assets/characters-v2/tibetan.png" alt="티베트여우"></div><h2>우리의 작은 숲에 온 걸 환영해요</h2><p>반짝이는 꽃과 열매, 나뭇잎을 모으고<br>여우 친구들에게 다정한 마음을 전해보세요.<br>작은 장식을 놓으면 숲이 조금 더 포근해질 거예요.</p><button class="primary-button" data-action="start">${help?'다시 산책하러 가기':'나의 숲 산책 시작하기'} ${icon('arrow')}</button><p class="welcome-note">경쟁도, 시간제한도 없어요. 당신의 속도로 즐겨주세요.</p></section>`);}
// Gentle generated ambience; starts only after an explicit click. No external media required.
function toggleSound(){if(soundOn){soundOn=false;clearInterval(audioTimer);audio?.suspend();}else{const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext){toast('이 브라우저는 숲 소리를 지원하지 않아요.');return;}audio??=new AudioContext();audio.resume();soundOn=true;bird();audioTimer=setInterval(bird,4000);}$('#sound').innerHTML=icon(soundOn?'volume':'volume-off');$('#sound').setAttribute('aria-label',soundOn?'숲 소리 끄기':'숲 소리 켜기');$('#sound').title=soundOn?'숲 소리 끄기':'숲 소리 켜기';toast(soundOn?'작은 새들의 노랫소리가 들려와요':'숲 소리를 껐어요');}
function bird(){if(!soundOn||!audio||document.hidden)return;const t=audio.currentTime;for(let i=0;i<3;i++){const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(1700+i*270,t+i*.2);o.frequency.exponentialRampToValueAtTime(2500-i*120,t+i*.2+.08);o.frequency.exponentialRampToValueAtTime(1500,t+i*.2+.18);g.gain.setValueAtTime(0,t+i*.2);g.gain.linearRampToValueAtTime(.012,t+i*.2+.03);g.gain.exponentialRampToValueAtTime(.0001,t+i*.2+.2);o.connect(g);g.connect(audio.destination);o.start(t+i*.2);o.stop(t+i*.2+.22);}}
function chime(heart=false){if(!soundOn||!audio)return;const t=audio.currentTime;[heart?523:880,heart?659:1174].forEach((freq,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=freq;g.gain.setValueAtTime(.03,t+i*.1);g.gain.exponentialRampToValueAtTime(.0001,t+i*.1+.5);o.connect(g);g.connect(audio.destination);o.start(t+i*.1);o.stop(t+i*.1+.5);});}
document.addEventListener('click',event=>{const b=event.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
 if(d.view)switchView(d.view);
 else if(d.collect!==undefined){clearWalkerSelection();collect(Number(d.collect));}
 else if(d.fox)openFox(d.fox);
 else if(d.walker){if(event.detail>1)clearWalkerSelection();else selectWalker(d.walker);}
 else if(d.deselect)clearWalkerSelection();
 else if(d.travel)travelTo(d.travel);
 else if(d.camera)zoomCamera(d.camera);
 else if(d.talk)talk(d.talk);
 else if(d.giftMenu)giftMenu(d.giftMenu);
 else if(d.gift){const[id,k]=d.gift.split(':');gift(id,k);}
 else if(d.craft)craft(d.craft);
 else if(d.select)selectDecor(d.select);
 else if(d.slot!==undefined)clickSlot(Number(d.slot));
 else if(d.move!==undefined){movingSlot=Number(d.move);selectedKind=null;closeModal();render();toast('옮길 빈자리를 눌러주세요');}
 else if(d.remove!==undefined)removeDecor(Number(d.remove));
 else if(d.category){category=d.category;openBook();}
 else if(d.detail)openDetail(d.detail);
 else if(d.action){switch(d.action){case 'close':closeModal();break;case 'open-book':openBook();break;case 'start':if(!state.started){state.started=true;log('오랫동안 비어 있던 작은 숲의 문을 열었다. 오늘부터 여기가 나의 숲이다.','sprout');persist();renderSidebar();}closeModal();break;case 'full-journal':fullJournal();break;case 'cancel-placement':movingSlot=null;selectedKind=null;render();break;case 'export':exportSave();break;case 'import':$('#import-file').click();break;case 'help':welcome(true);break;case 'reset-confirm':openModal(`<section class="modal">${closeButton()}<span class="eyebrow">A FRESH LITTLE BEGINNING</span><h2>숲을 새로 시작할까요?</h2><p>지금까지 모은 재료, 친밀도, 장식과 일기가 모두 초기화돼요. 소중한 추억은 먼저 파일로 보관할 수 있어요.</p><div class="button-stack"><button class="secondary-button" data-action="export">먼저 저장 파일 내려받기</button><button class="secondary-button danger-button" data-action="reset">모든 진행을 지우고 새로 시작</button><button class="primary-button" data-action="close">지금의 숲에 머무르기</button></div></section>`);break;case 'reset':stopAllWalks();state=FRESH();persist();renderWorld();switchView('forest');renderCharacters();welcome();break;}}
});
$('#decorate-toggle').addEventListener('click',()=>switchView(view==='decorate'?'forest':'decorate'));
$('#settings').addEventListener('click',settings);
$('#inventory-book').addEventListener('click',()=>{category='items';switchView('collection');});
$('#sound').addEventListener('click',toggleSound);
$('#scene').addEventListener('pointerdown',e=>{if(e.button!==0||travelling||!e.target.closest('#world')||e.target.closest('button'))return;stopKeyboardMovement();drag={startX:e.clientX,startY:e.clientY,x:camera.x,y:camera.y,moved:false};});
document.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.startX,dy=e.clientY-drag.startY;if(Math.hypot(dx,dy)>5)drag.moved=true;if(drag.moved){camera.x=drag.x+dx;camera.y=drag.y+dy;applyCamera();$('#world').classList.add('dragging');}});
document.addEventListener('pointerup',()=>{if(!drag)return;suppressGroundClick=drag.moved;drag=null;$('#world').classList.remove('dragging');setTimeout(()=>{suppressGroundClick=false;},0);});
$('#scene').addEventListener('click',e=>{if(suppressGroundClick||travelling||view==='decorate'||e.target.closest('button')||!e.target.closest('#world')||!selectedWalker)return;const r=$('#world').getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;if(!isGround(currentArea(),x,y)){toast('길이 있는 잔디 위를 눌러주세요.');return;}walkTo(selectedWalker,x,y);});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&selectedWalker&&!$('#dialog').open){e.preventDefault();clearWalkerSelection();return;}
 if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)||e.altKey||e.ctrlKey||e.metaKey)return;
 if(e.target.closest?.('input,textarea,select,[contenteditable="true"],[role="textbox"]')||!keyboardMovementAllowed())return;
 e.preventDefault();
 if(!movementKeys.size&&!travelling)stopCharacterMotion(selectedWalker);
 movementKeys.add(e.key);startKeyboardMovement();
});
document.addEventListener('keyup',e=>{
 if(!movementKeys.has(e.key))return;e.preventDefault();movementKeys.delete(e.key);
 if(!movementKeys.size)stopKeyboardMovement();
});
window.addEventListener('blur',stopKeyboardMovement);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopKeyboardMovement();});
window.addEventListener('resize',applyCamera);
$('.brand').addEventListener('click',e=>{e.preventDefault();switchView('forest');});
$('#dialog').addEventListener('click',e=>{if(e.target===$('#dialog')){const r=$('#dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
$('#dialog').addEventListener('close',()=>{activeFox=null;});
document.addEventListener('change',async e=>{if(e.target.id!=='import-file')return;const file=e.target.files[0];if(!file)return;if(file.size>250000){toast('저장 파일이 너무 커요. FOREST LOG 저장 파일을 골라주세요.',true);return;}try{const next=validate(JSON.parse(await file.text()));openModal(`<section class="modal">${closeButton()}<h2>이 숲으로 이어갈까요?</h2><p>수집 ${next.stats.collected}회, 만난 친구 ${next.met.length}명, 배치한 장식 ${next.placed.length}개가 있어요. 현재 진행은 선택한 저장 파일로 바뀌어요.</p><div class="button-stack"><button class="primary-button" id="confirm-import">이 저장 파일로 이어하기</button><button class="secondary-button" data-action="close">취소</button></div></section>`);$('#confirm-import').onclick=()=>{stopAllWalks();state=next;persist();closeModal();renderWorld();switchView('forest');renderCharacters();toast('숲의 추억을 다시 불러왔어요');};}catch(err){toast(err.message||'저장 파일을 읽을 수 없어요.',true);}});
// Respawn quietly, without a countdown or a penalty for leaving the game.
setInterval(()=>{if(respawnNodes()){persist();renderNodes();}},1500);
window.addEventListener('storage',e=>{if(e.key!==KEY||!e.newValue)return;try{stopAllWalks();state=validate(JSON.parse(e.newValue));renderWorld();renderCharacters();render();if($('#dialog').open)closeModal();toast('다른 창에서 저장한 숲을 불러왔어요');}catch{}});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&audio)audio.suspend();else if(soundOn&&audio)audio.resume();});
function renderNavigation(){
 const pictures={
  forest:art('<path d="M35 45h11v28H35z" fill="#b18b5c" stroke="#8b6e4e" stroke-width="2"/><path d="M17 53C-1 42 11 21 25 24 23 5 52 1 57 20 76 13 86 40 65 49 61 64 39 66 33 55c-6 6-15 4-16-2Z" fill="#a6bd68" stroke="#7d9958" stroke-width="2.5"/><path d="M24 27c2-11 17-14 25-8" stroke="#d6e496" stroke-width="5" stroke-linecap="round"/><path d="M19 70q21-6 44 0" stroke="#b3c478" stroke-width="5" stroke-linecap="round"/>','menu-art'),
  friends:'<img src="assets/characters-v2/red.png" alt="">',
  decorate:DECOR.flowerbed.art,
  collection:art('<path d="M7 17q17-6 33 4 16-10 33-4v47q-17-5-33 4-16-9-33-4Z" fill="#dfbb88" stroke="#a48152" stroke-width="3"/><path d="M12 12q15-4 28 4 15-8 28-4v45q-16-3-28 5-13-8-28-5Z" fill="#fff1ce" stroke="#c8a46b" stroke-width="2"/><path d="M40 16v46" stroke="#c6a16a" stroke-width="2"/><path d="M20 24h12m-12 8h12m-12 8h12m16-16h12m-12 8h12m-12 8h12" stroke="#d2b78b" stroke-width="2" stroke-linecap="round"/><path d="m50 11 7-1v22l-4-4-3 4Z" fill="#b6c581"/>','menu-art'),
  journal:art('<path d="M17 12h42v57H17z" fill="#fff0ca" stroke="#c9a674" stroke-width="2.5"/><path d="M22 12h4v57h-4Z" fill="#e1bc88"/><path d="M9 22h14M9 34h14M9 46h14M9 58h14" stroke="#ae9066" stroke-width="3" stroke-linecap="round"/><path d="M34 26h15m-15 10h15m-15 10h11" stroke="#d3b78b" stroke-width="2" stroke-linecap="round"/><path d="M44 62c2-17 10-35 28-42-2 20-12 35-24 38" fill="#b2c78b" stroke="#8eaa6c" stroke-width="2"/><path d="m43 68 22-40" stroke="#88a365" stroke-width="2.5" stroke-linecap="round"/>','menu-art'),
 };
 const labels={forest:'나의 숲',friends:'친구들',decorate:'꾸미기',collection:'도감',journal:'숲 일기'};
 $$('#main-nav [data-view]').forEach(b=>{b.innerHTML=`<span class="nav-medallion">${pictures[b.dataset.view]}</span><span>${labels[b.dataset.view]}</span>`;});
}
hydrate();renderNavigation();renderWorld();renderCharacters();render();if(!recovery)persist();
Object.keys(AREAS).forEach(area=>{preloadArea(area).catch(()=>{});});
if(recovery){$('#save-status').textContent='저장 파일 확인 필요';$('#save-status').classList.add('save-warning');openModal(`<section class="modal">${closeButton()}<h2>저장된 숲을 확인해주세요</h2><p>이 브라우저의 저장 데이터를 읽지 못했어요. 저장 파일이 있다면 설정에서 불러올 수 있어요. 새로 시작하면 기존 브라우저 저장 내용이 바뀝니다.</p><div class="button-stack"><button class="primary-button" id="recovery-settings">저장 파일 불러오기</button><button class="secondary-button" data-action="reset-confirm">새 숲 시작하기</button></div></section>`);$('#recovery-settings').onclick=settings;}
else if(!state.started)welcome();
