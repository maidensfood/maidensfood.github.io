{
const WHATS = '5511983262003'; // (11) 98326-2003 — DDI + DDD + número, só dígitos

// Horário de funcionamento (horário de Brasília). 0 = domingo ... 6 = sábado. null = fechado.
const HORARIO = {0:[18,22], 1:[16,22], 2:[16,22], 3:[16,22], 4:[16,22], 5:[16,22], 6:null};
const HORARIO_TEXTO = 'Seg a sex, 16h às 22h · Dom, 18h às 22h · Sáb fechado';
const BLOQUEAR_FORA_DO_HORARIO = true; // false = deixa enviar pedido com a loja fechada

const ICON = {
  acai:`<svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" fill="var(--acai)"/><path d="M17 24h24l-3 20a4 4 0 0 1-4 3.4H24A4 4 0 0 1 20 44Z" fill="#8a64ab"/><path d="M16 22h26v4H16z" rx="2" fill="#6b4c86"/><circle cx="24" cy="19" r="4.5" fill="#f4c542"/><circle cx="32" cy="18" r="5" fill="#e85a6c"/><path d="M36 14c3 0 5 2 5 5h-6z" fill="#7bbf6a"/><path d="M22 33h14" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/></svg>`,
  pasteis:`<svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" fill="var(--past)"/><path d="M11 36c0-9 8-17 18-17s18 8 18 17Z" fill="#e8b45a"/><path d="M11 36h36a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3Z" fill="#b7802a"/><path d="M16 36v-3m5 3v-3m5 3v-3m5 3v-3m5 3v-3m5 3v-3" stroke="#fbf2e3" stroke-width="2" stroke-linecap="round"/><path d="M22 26c3-3 7-4 11-3" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  caldos:`<svg viewBox="0 0 58 58" aria-hidden="true"><rect width="58" height="58" fill="var(--cald)"/><path d="M24 12c-2 3 2 4 0 7m6-8c-2 3 2 4 0 7m6-6c-2 3 2 4 0 7" stroke="#9db892" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M11 27h36c0 10-8 17-18 17S11 37 11 27Z" fill="#5d7f52"/><ellipse cx="29" cy="27" rx="18" ry="3.5" fill="#8fae7f"/><circle cx="23" cy="27" r="1.6" fill="#e8b45a"/><circle cx="33" cy="26.5" r="1.4" fill="#e85a6c"/><path d="M22 47h14" stroke="#5d7f52" stroke-width="3" stroke-linecap="round"/></svg>`
};

const MENU = [
 {id:'acai', t:'Açaí', s:'Monte o seu: acompanhamentos à vontade', groups:[
   {g:'Copos', items:[
     {id:'a300',n:'Copo 300 ml',p:15,acai:1},{id:'a400',n:'Copo 400 ml',p:20,acai:1},
     {id:'a500',n:'Copo 500 ml',p:25,acai:1},{id:'a700',n:'Copo 700 ml',p:30,acai:1}]}]},
 {id:'pasteis', t:'Pastéis', s:'Fritos na hora, massa sequinha', groups:[
   {g:'Tradicionais', items:[
     {id:'p1',n:'Queijo mussarela',p:16},{id:'p2',n:'Frango',p:16},{id:'p3',n:'Calabresa',p:16},{id:'p4',n:'Carne',p:18}]},
   {g:'Especiais', items:[
     {id:'p5',n:'Dois queijos',d:'Mussarela e catupiry',p:20},{id:'p6',n:'Frango com catupiry',p:20},
     {id:'p7',n:'Frango com mussarela',p:20},{id:'p8',n:'Calabresa com catupiry',p:20},
     {id:'p9',n:'Calabresa com mussarela',p:20},{id:'p10',n:'Carne com ovo',p:20},
     {id:'p11',n:'Carne com mussarela',p:20},{id:'p12',n:'Carne com catupiry',p:20},
     {id:'p13',n:'Pizza',d:'Mussarela, tomatinho cereja, azeitonas e orégano',p:20}]},
   {g:'Meia lua doce', items:[
     {id:'p14',n:'Nutella',p:12,pre:'Meia lua de'},{id:'p15',n:'Doce de leite',p:10,pre:'Meia lua de'}]},
   {g:'Adicionais', items:[{id:'p16',n:'Sachês de ketchup e mostarda',p:0,pre:''}]}]},
 {id:'caldos', t:'Caldos', s:'Quentinhos, servidos na hora', groups:[
   {g:'Caldos', items:[
     {id:'c1',n:'Feijão',p:30},{id:'c2',n:'Kenga',p:30},{id:'c3',n:'Caldo verde',p:35,pre:''},
     {id:'c4',n:'Canja',p:35,pre:''},{id:'c5',n:'Sopa de legumes',p:35,pre:''},
     {id:'c6',n:'Mandioquinha',p:35},{id:'c7',n:'Mandioca com costela',p:35}]},
   {g:'Adicionais', items:[
     {id:'c8',n:'Sachê de pimenta',p:0,pre:''},{id:'c9',n:'Salsa e cebolinha',p:0,pre:''},
     {id:'c10',n:'Queijo mussarela',p:2,pre:'Adicional de'},{id:'c11',n:'Torrada',p:2,pre:''}]}]}
];
const PRE = {pasteis:'Pastel de', caldos:'Caldo de', acai:'Açaí'};
const ACOMP = ['Leite condensado','Leite em pó','Sucrilhos','Chocobol','Banana'];
const ADDS = [{n:'Kiwi',p:6},{n:'Morango',p:5},{n:'Manga',p:4},{n:'Granola',p:4},{n:'Paçoca',p:4}];

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brl = v => v === 0 ? 'grátis' : 'R$ ' + v.toFixed(2).replace('.', ',');
const ITEM = {};
MENU.forEach(c => c.groups.forEach(g => g.items.forEach(i => {
  i.cat = c.id;
  i.full = i.pre === '' ? i.n : (i.pre || PRE[c.id]) + ' ' + (i.acai ? i.n.replace('Copo ', '') : i.n.toLowerCase());
  ITEM[i.id] = i;
})));

let tab = 'acai';
try { const t = localStorage.getItem('maidens-tab'); if (MENU.some(c => c.id === t)) tab = t; } catch (e) {}
let cart = [];  // {key,id,qty,acomp:[],adds:[]}
try { cart = JSON.parse(localStorage.getItem('maidens-cart') || '[]').filter(l => ITEM[l.id]); } catch (e) {}
const save = () => { try { localStorage.setItem('maidens-cart', JSON.stringify(cart)); } catch (e) {} };
const unit = l => ITEM[l.id].p + l.adds.reduce((s, n) => s + ADDS.find(a => a.n === n).p, 0);
const qtyOf = id => cart.filter(l => l.id === id).reduce((s, l) => s + l.qty, 0);

function addSimple(id, d) {
  let l = cart.find(x => x.key === id);
  if (!l) { if (d < 0) return; l = {key:id, id, qty:0, acomp:[], adds:[]}; cart.push(l); }
  l.qty += d;
  cart = cart.filter(x => x.qty > 0);
  refresh();
}

function ctl(i) {
  const q = qtyOf(i.id);
  if (i.acai) return `<div class="ctl">${q ? `<span class="badge">${q}</span>` : ''}<button class="rb add" data-acai="${i.id}" aria-label="Montar ${esc(i.n)}">+</button></div>`;
  if (!q) return `<div class="ctl"><button class="rb add" data-add="${i.id}" aria-label="Adicionar ${esc(i.n)}">+</button></div>`;
  return `<div class="ctl"><button class="rb" data-sub="${i.id}" aria-label="Remover um">−</button><span class="q">${q}</span><button class="rb" data-add="${i.id}" aria-label="Adicionar mais um">+</button></div>`;
}

function renderMenu() {
  $('#menu').innerHTML = MENU.map(c => `
    <section id="${c.id}" ${c.id === tab ? '' : 'hidden'}>
      <div class="cat">${ICON[c.id]}<div><h2>${c.t}</h2><p>${c.s}</p></div></div>
      ${c.groups.map(g => `
        ${c.groups.length > 1 || c.id === 'acai' ? `<h3>${g.g}</h3>` : ''}
        <div class="list">${g.items.map(i => `
          <div class="item"><div class="tx"><div class="n">${esc(i.n)}</div>${i.d ? `<div class="d">${esc(i.d)}</div>` : ''}<span class="price ${i.p ? '' : 'free'}">${brl(i.p)}</span></div>${ctl(i)}</div>`).join('')}
        </div>`).join('')}
      ${c.id === 'acai' ? `<h3>Acompanhamentos grátis</h3><div class="list"><div class="chips-note">${ACOMP.map(a => `<span>${a}</span>`).join('')}</div></div>
        <h3>Adicionais</h3><div class="list">${ADDS.map(a => `<div class="item"><div class="tx"><div class="n">${a.n}</div></div><span class="price">${brl(a.p)}</span></div>`).join('')}</div>` : ''}
    </section>`).join('');
}

/* açaí */
let cur = null, pick = {acomp:new Set(), adds:new Set()};
function openAcai(id) {
  cur = ITEM[id]; pick = {acomp:new Set(), adds:new Set()};
  $('#acaiT').textContent = 'Açaí ' + cur.n.replace('Copo ', '');
  $('#acomp').innerHTML = ACOMP.map(a => `<button class="chip" aria-pressed="false" data-ac="${a}">${a}</button>`).join('');
  $('#adds').innerHTML = ADDS.map(a => `<label class="opt"><input type="checkbox" data-ad="${a.n}"><span>${a.n}</span><b>+ ${brl(a.p)}</b></label>`).join('');
  acaiTot(); open('#acaiSheet');
}
function acaiTot() { $('#acaiTot').textContent = brl(unit({id:cur.id, adds:[...pick.adds]})); }
$('#acomp').addEventListener('click', e => {
  const b = e.target.closest('[data-ac]'); if (!b) return;
  const on = b.getAttribute('aria-pressed') !== 'true';
  b.setAttribute('aria-pressed', on); on ? pick.acomp.add(b.dataset.ac) : pick.acomp.delete(b.dataset.ac);
});
$('#adds').addEventListener('change', e => {
  const n = e.target.dataset.ad; e.target.checked ? pick.adds.add(n) : pick.adds.delete(n); acaiTot();
});
$('#acaiAdd').addEventListener('click', () => {
  const acomp = ACOMP.filter(a => pick.acomp.has(a)), adds = ADDS.map(a => a.n).filter(n => pick.adds.has(n));
  const key = [cur.id, ...acomp, '|', ...adds].join(',');
  const l = cart.find(x => x.key === key);
  l ? l.qty++ : cart.push({key, id:cur.id, qty:1, acomp, adds});
  close(); refresh();
});

/* pedido */
const form = {pay:'Pix'};
function message() {
  const L = ['Olá, Maidens! Quero fazer um pedido:', ''];
  cart.forEach(l => {
    L.push(`${l.qty}x ${ITEM[l.id].full} — ${brl(unit(l) * l.qty)}`);
    if (l.acomp.length) L.push(`   com ${l.acomp.join(', ').toLowerCase()}`);
    if (l.adds.length) L.push(`   + ${l.adds.join(', ').toLowerCase()}`);
  });
  L.push('', `*Total: ${brl(total())}*`, '');
  L.push(`Nome: ${$('#fName').value.trim()}`);
  L.push('Retirada na loja');
  L.push(`Pagamento: ${form.pay}${form.pay === 'Dinheiro' && $('#fChg').value.trim() ? ' (troco para R$ ' + $('#fChg').value.trim() + ')' : ''}`);
  if ($('#fObs').value.trim()) L.push(`Obs.: ${$('#fObs').value.trim()}`);
  return L.join('\n');
}
const total = () => cart.reduce((s, l) => s + unit(l) * l.qty, 0);

function renderCart() {
  $('#lines').innerHTML = cart.length ? cart.map((l, k) => `
    <div class="line"><div class="tx"><div class="n" style="font-weight:700">${esc(ITEM[l.id].full)}</div>
      ${l.acomp.length ? `<div class="ex">com ${esc(l.acomp.join(', ').toLowerCase())}</div>` : ''}
      ${l.adds.length ? `<div class="ex">+ ${esc(l.adds.join(', ').toLowerCase())}</div>` : ''}
      <span class="price">${brl(unit(l) * l.qty)}</span></div>
      <div class="ctl"><button class="rb" data-ls="${k}" aria-label="Remover um">−</button><span class="q">${l.qty}</span><button class="rb" data-la="${k}" aria-label="Adicionar mais um">+</button></div></div>`).join('')
    : '<p class="empty">Seu pedido está vazio.</p>';
  $('#cartTot').textContent = brl(total()).replace('grátis', 'R$ 0,00');
  updSend();
}
/* horário */
const DIAS = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
function agoraSP() {
  const p = {};
  new Intl.DateTimeFormat('en-US', {timeZone:'America/Sao_Paulo', weekday:'short', hour:'numeric', minute:'numeric', hourCycle:'h23'})
    .formatToParts(new Date()).forEach(x => p[x.type] = x.value);
  return {dia: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday), min: +p.hour * 60 + +p.minute};
}
function situacao() {
  const {dia, min} = agoraSP(), h = HORARIO[dia];
  if (h && min >= h[0] * 60 && min < h[1] * 60) return {aberto:true, texto:`Aberto agora · até ${h[1]}h`};
  if (h && min < h[0] * 60) return {aberto:false, texto:`Fechado · abre hoje às ${h[0]}h`, abre:`hoje às ${h[0]}h`};
  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7, hh = HORARIO[d];
    if (hh) { const q = i === 1 ? 'amanhã' : DIAS[d]; return {aberto:false, texto:`Fechado · abre ${q} às ${hh[0]}h`, abre:`${q} às ${hh[0]}h`}; }
  }
  return {aberto:false, texto:'Fechado', abre:''};
}
function updStatus() {
  const s = situacao();
  $('#status').className = 'pill status ' + (s.aberto ? 'open' : 'closed');
  $('#statusTx').textContent = s.texto;
  return s;
}

function updSend() {
  const name = $('#fName').value.trim(), s = updStatus();
  const shut = BLOQUEAR_FORA_DO_HORARIO && !s.aberto;
  const ok = cart.length && name && !shut;
  $('#sendHint').textContent = shut ? `Estamos fechados agora. Abrimos ${s.abre}.` : !cart.length ? 'Adicione itens ao pedido' : !name ? 'Preencha seu nome para enviar' : 'Você confere a mensagem no WhatsApp antes de enviar';
  $('#send').setAttribute('aria-disabled', !ok);
  const msg = message();
  $('#preview').textContent = msg;
  $('#send').href = `https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`;
}
$('#lines').addEventListener('click', e => {
  const a = e.target.closest('[data-la],[data-ls]'); if (!a) return;
  const l = cart[a.dataset.la ?? a.dataset.ls]; l.qty += a.dataset.la != null ? 1 : -1;
  cart = cart.filter(x => x.qty > 0); refresh();
});
function seg(sel, key, after) {
  $(sel).addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $(sel).querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    form[key] = b.dataset.v; after(); renderCart();
  });
}
seg('#pay', 'pay', () => { $('#chgBox').hidden = form.pay !== 'Dinheiro'; });
['#fName', '#fChg', '#fObs'].forEach(s => $(s).addEventListener('input', updSend));

/* sheets */
let openEl = null;
function open(sel) { openEl = $(sel); openEl.classList.add('on'); $('#scrim').classList.add('on'); document.body.style.overflow = 'hidden'; setTimeout(() => openEl.querySelector('.x').focus(), 50); }
function close() { if (!openEl) return; openEl.classList.remove('on'); $('#scrim').classList.remove('on'); document.body.style.overflow = ''; openEl = null; }
$('#scrim').addEventListener('click', close);
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
$('#openCart').addEventListener('click', () => { renderCart(); open('#cartSheet'); });

$('#menu').addEventListener('click', e => {
  const b = e.target.closest('[data-add],[data-sub],[data-acai]'); if (!b) return;
  if (b.dataset.acai) return openAcai(b.dataset.acai);
  addSimple(b.dataset.add || b.dataset.sub, b.dataset.add ? 1 : -1);
});

function refresh() {
  save();
  const y = scrollY; renderMenu(); scrollTo(0, y);
  const n = cart.reduce((s, l) => s + l.qty, 0);
  $('#bar').classList.toggle('on', n > 0);
  $('#barQty').textContent = `· ${n} ${n === 1 ? 'item' : 'itens'}`;
  $('#barTot').textContent = 'R$ ' + total().toFixed(2).replace('.', ',');
  if (openEl && openEl.id === 'cartSheet') renderCart();
}

/* abas: uma categoria por vez */
function showTab(id, jump) {
  tab = id;
  try { localStorage.setItem('maidens-tab', id); } catch (e) {}
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-current', t.dataset.t === id));
  document.querySelectorAll('main section').forEach(s => s.hidden = s.id !== id);
  const nav = document.querySelector('nav');
  if (jump && nav.getBoundingClientRect().top <= 0) scrollTo(0, nav.offsetTop);
}
$('#tabs').addEventListener('click', e => {
  const b = e.target.closest('[data-t]'); if (b) showTab(b.dataset.t, true);
});

$('#waFoot').href = `https://wa.me/${WHATS}`;
$('#hours').textContent = HORARIO_TEXTO;
$('#hoursFoot').textContent = HORARIO_TEXTO;
updStatus();
setInterval(() => { updStatus(); if (openEl && openEl.id === 'cartSheet') updSend(); }, 60000);
refresh();
showTab(tab, false);
}
