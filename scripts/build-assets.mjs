import fs from 'node:fs';

const out = new URL('../assets/', import.meta.url);
fs.mkdirSync(out, { recursive: true });
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const text = (x,y,s,size=14,color='#a4a9b4',extra='') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" ${extra}>${esc(s)}</text>`;
const umbrella = (x,y,r=44) => `<g transform="translate(${x} ${y})">${Array.from({length:8},(_,i)=>{const a=(i*45-90)*Math.PI/180,b=((i+1)*45-90)*Math.PI/180;return `<path d="M0 0 L${Math.cos(a)*r} ${Math.sin(a)*r} L${Math.cos(b)*r} ${Math.sin(b)*r} Z" fill="${i%2?'#f1eeea':'#dd3348'}" stroke="#101219" stroke-width="2"/>`;}).join('')}</g>`;
const svg = (h,body,defs='') => `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${h}" viewBox="0 0 960 ${h}" role="img"><defs>${defs}</defs><style>text{font-family:Segoe UI,Arial,sans-serif}.mono{font-family:Consolas,monospace}.pulse{animation:pulse 3s ease-in-out infinite}@keyframes pulse{50%{opacity:.35}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style><rect x=".5" y=".5" width="959" height="${h-1}" rx="16" fill="#101219" stroke="#2c303b"/>${body}</svg>`;
const save = (name,content) => fs.writeFileSync(new URL(name,out),content);

save('hero.svg',svg(338,`
<rect x="1" y="1" width="958" height="336" rx="16" fill="url(#glow)"/>
<path d="M0 274H960M0 298H960M0 322H960" stroke="#ffffff" stroke-opacity=".025"/>
${Array.from({length:24},(_,i)=>`<path d="M${i*44} 0V338" stroke="#ffffff" stroke-opacity=".025"/>`).join('')}
<rect x="32" y="30" width="6" height="6" fill="#e44458" class="pulse"/>
${text(50,37,'PERSONAL ARCHIVE  /  SIRIUS',11,'#b6bac4','class="mono" letter-spacing="2"')}
${text(32,118,'Sirius',70,'#f4f2ef','font-weight="700" letter-spacing="-3"')}
${text(34,149,'@Sirius-yibai1002',16,'#e45d6c','class="mono"')}
${text(34,191,'Build useful systems. Keep exploring.',22,'#e3e3e6')}
${text(34,222,'AI AGENTS   /   LOGISTICS TOOLS   /   ROBOTICS',12,'#9a9fac','class="mono" letter-spacing="1"')}
<path d="M34 254H581" stroke="#30323d"/>
${text(34,284,'01  BUILD',11,'#dc5d6c','class="mono"')}${text(185,284,'02  EXPERIMENT',11,'#b5b9c3','class="mono"')}${text(380,284,'03  SAVE PROGRESS',11,'#b5b9c3','class="mono"')}
<circle cx="776" cy="150" r="114" fill="none" stroke="#a73546" stroke-opacity=".25"/>
<circle cx="776" cy="150" r="99" fill="none" stroke="#a73546" stroke-opacity=".3" stroke-dasharray="2 8"/>
<path d="M641 150H660M892 150H911M776 15V34M776 266V285" stroke="#df455b"/>
${umbrella(776,150,78)}
${text(776,296,'RESIDENT EVIL  /  FAN THEME',10,'#bd6975','text-anchor="middle" class="mono" letter-spacing="1"')}
`, '<radialGradient id="glow" cx="83%" cy="40%" r="75%"><stop stop-color="#561b2b" stop-opacity=".65"/><stop offset="1" stop-color="#101219" stop-opacity="0"/></radialGradient>'));

const rows=[['BUILD',['Python','Flask','HTML / CSS','JavaScript']],['WORKFLOW',['AI Agents','Document Parsing','Quote Review']],['EXPLORE',['Isaac Lab','PyTorch','ROS / ROS 2','Sim-to-Real']]];
save('stack.svg',svg(218,`${text(30,31,'TOOLBOX',11,'#e36070','class="mono" letter-spacing="2"')}${text(930,31,'BUILDING WITH  /  EXPLORING',10,'#7f8796','text-anchor="end" class="mono"')}${rows.map(([label,chips],i)=>{const y=72+i*54;let x=174;return umbrella(39,y-4,11)+text(62,y,label,11,'#939cac','class="mono" letter-spacing="1"')+chips.map(c=>{const w=c.length*8.1+32;const s=`<rect x="${x}" y="${y-23}" width="${w}" height="34" rx="17" fill="${i===2?'#191d28':'#281922'}" stroke="${i===2?'#424858':'#73303f'}"/>${text(x+w/2,y,c,13,i===2?'#bbc2d2':'#edb5bc','text-anchor="middle"')}`;x+=w+10;return s;}).join('');}).join('')}`));

save('workflow.svg',svg(122,`${text(30,29,'CURRENT BUILD  /  LOGISTICS QUOTATION',11,'#df6071','class="mono" letter-spacing="1.5"')}${['需求分析','路线选择','服务匹配','人工审核','费用试算'].map((s,i)=>{const x=30+i*185;return `<rect x="${x}" y="49" width="160" height="46" rx="8" fill="#191b24" stroke="#333540"/>${text(x+15,77,String(i+1).padStart(2,'0'),12,'#df6071','class="mono"')}${text(x+47,77,s,14,'#e0dfe4')}${i<4?text(x+169,77,'›',22,'#94515c'):''}`;}).join('')}`));

save('footer.svg',svg(133,`<path d="M24 71H228L239 54L249 89L260 33L272 103L283 71H613L625 62L636 79L648 71H936" fill="none" stroke="#dd4358" stroke-width="1.5" opacity=".7"/>${umbrella(854,44,16)}${text(31,37,'SAVE ROOM',11,'#e06575','class="mono" letter-spacing="3"')}${text(31,111,'Progress saved. See you at the next checkpoint.',13,'#a0a6b2')}${text(930,111,'SIRIUS / END OF FILE',10,'#727b8b','text-anchor="end" class="mono"')}`));

// Only fetch the unauthenticated public profile calendar. No private data or token is used.
const user='Sirius-yibai1002';
const fixture=process.argv.includes('--local-calendar');
const html=fixture?fs.readFileSync(new URL('../calendar-source.html',import.meta.url),'utf8'):await fetch(`https://github.com/users/${user}/contributions`,{headers:{'User-Agent':'Sirius-profile-calendar'}}).then(r=>{if(!r.ok)throw Error(`Calendar HTTP ${r.status}`);return r.text();});
const cells=[...html.matchAll(/<td\b[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="([0-4])"[^>]*>/g)].map(m=>({date:m[1],id:m[2],level:Number(m[3])})).sort((a,b)=>a.date.localeCompare(b.date));
if(cells.length<350||cells.length>380)throw Error(`Unexpected calendar: ${cells.length} days`);
const tips=new Map([...html.matchAll(/<tool-tip\b[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g)].map(m=>[m[1],m[2].replace(/<[^>]+>/g,'').trim()]));
const total=cells.reduce((sum,c)=>{const tip=tips.get(c.id);if(!tip)throw Error('Missing contribution tooltip');const n=tip.match(/^([\d,]+) contributions?/);return sum+(n?Number(n[1].replaceAll(',','')):0);},0);
const active=cells.filter(c=>c.level>0).length;
const colors=['#1c202b','#582333','#923347','#cc455c','#fa7c8e'];
const start=new Date(cells[0].date+'T00:00:00Z');
let months='';let lastMonth='';
const grid=cells.map(c=>{const date=new Date(c.date+'T00:00:00Z');const day=Math.round((date-start)/86400000)+start.getUTCDay();const week=Math.floor(day/7);const x=31+week*17,y=154+date.getUTCDay()*17;const month=c.date.slice(0,7);if(month!==lastMonth&&date.getUTCDate()<=7){months+=text(x,142,date.toLocaleString('en',{month:'short',timeZone:'UTC'}),10,'#7d8595');lastMonth=month;}return `<rect x="${x}" y="${y}" width="13" height="13" rx="3" fill="${colors[c.level]}"><title>${esc(c.date+': '+tips.get(c.id))}</title></rect>`;}).join('');
save('activity.svg',svg(330,`${text(30,31,'ACTIVITY LOG',11,'#df6071','class="mono" letter-spacing="2"')}${text(930,31,'PUBLIC PROFILE DATA',10,'#7d8595','text-anchor="end" class="mono"')}${text(30,87,total,36,'#f0edf0','font-weight="600"')}${text(110,84,'visible contributions',13)}${text(410,87,active,36,'#f0edf0','font-weight="600"')}${text(480,84,'active days',13)}${text(930,78,cells.at(-1).date,15,'#dca0aa','text-anchor="end" class="mono"')}${text(930,99,'latest calendar date',10,'#7d8595','text-anchor="end"')}${months}${grid}${text(30,304,'PUBLIC SIGNAL ONLY · PRIVATE WORK IS NOT INCLUDED',10,'#7d8595','class="mono"')}${colors.map((c,i)=>`<rect x="${835+i*19}" y="291" width="13" height="13" rx="3" fill="${c}"/>`).join('')}`));
console.log(`Generated profile assets: ${cells.length} calendar days, ${total} public contributions.`);
