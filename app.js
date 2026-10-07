const $ = s => document.querySelector(s);
const eur = n => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const FREE_SHIP = 50;
let cart = JSON.parse(localStorage.getItem('cart') || '{}');
let filter = 'Tous';

const stars = (r, n) => `<div class="stars">${'★'.repeat(Math.round(r))}${'☆'.repeat(5 - Math.round(r))} <small>${r} (${n})</small></div>`;
const priceHTML = p => `<div class="price">${eur(p.price)}${p.old ? `<s>${eur(p.old)}</s>` : ''}</div>`;
const imgTag = p => `<img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'">`;

function renderFilters() {
  const cats = ['Tous', ...new Set(PRODUCTS.map(p => p.cat))];
  $('#filters').innerHTML = cats.map(c => `<button class="${c === filter ? 'on' : ''}" data-c="${c}">${c}</button>`).join('');
  $('#filters').onclick = e => { if (e.target.dataset.c) { filter = e.target.dataset.c; renderFilters(); renderGrid(); } };
}

function renderGrid() {
  const list = PRODUCTS.filter(p => filter === 'Tous' || p.cat === filter);
  $('#grid').innerHTML = list.map(p => `
    <article class="card">
      <div class="thumb" data-view="${p.id}">${p.badge ? `<span class="badge">${p.badge}</span>` : ''}${imgTag(p)}</div>
      <div class="info">
        <span class="cat">${p.cat}</span>
        <h3>${p.name}</h3>
        ${stars(p.rating, p.reviews)}
        ${priceHTML(p)}
        <button class="add" data-add="${p.id}">Ajouter au panier</button>
      </div>
    </article>`).join('');
}

function save() { localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); }
function add(id) {
  cart[id] = (cart[id] || 0) + 1; save();
  toast('Ajouté au panier');
}
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 1800); }

function renderCart() {
  const ids = Object.keys(cart);
  let total = 0, count = 0;
  $('#cartItems').innerHTML = ids.length ? ids.map(id => {
    const p = PRODUCTS.find(x => x.id == id); if (!p) return '';
    total += p.price * cart[id]; count += cart[id];
    return `<div class="ci">${imgTag(p)}<div><b>${p.name}</b><div class="qty"><button data-dec="${id}">−</button>${cart[id]}<button data-inc="${id}">+</button></div></div>
      <div style="text-align:right"><b>${eur(p.price * cart[id])}</b><br><button class="rm" data-rm="${id}">Retirer</button></div></div>`;
  }).join('') : '<p class="empty">Votre panier est vide.</p>';
  $('#cartCount').textContent = count;
  $('#cartTotal').textContent = eur(total);
  const left = FREE_SHIP - total;
  $('#ship').innerHTML = count ? (left > 0
    ? `Plus que ${eur(left)} pour la livraison offerte<div class="bar"><i style="width:${total / FREE_SHIP * 100}%"></i></div>`
    : `Livraison offerte<div class="bar"><i style="width:100%"></i></div>`) : '';
}

function openCart(on) { $('#drawer').classList.toggle('on', on); $('#overlay').classList.toggle('on', on); }

function view(id) {
  const p = PRODUCTS.find(x => x.id == id);
  $('#modalBox').innerHTML = `<button class="x" data-close>✕</button>${imgTag(p)}
    <div class="mb"><span class="cat">${p.cat}</span><h3>${p.name}</h3>${stars(p.rating, p.reviews)}${priceHTML(p)}
    <p>${p.desc}</p><p>Livraison 48h · Retour gratuit 30 jours</p>
    <button class="btn full" data-add="${p.id}" data-close>Ajouter au panier</button></div>`;
  $('#modal').classList.add('on');
}

document.addEventListener('click', e => {
  const t = e.target, d = t.closest('[data-view],[data-add],[data-inc],[data-dec],[data-rm],[data-close]');
  if (t.id === 'modal') $('#modal').classList.remove('on');
  if (!d) return;
  const D = d.dataset;
  if (D.add) add(D.add);
  if (D.view) view(D.view);
  if (D.inc) { cart[D.inc]++; save(); }
  if (D.dec) { if (--cart[D.dec] <= 0) delete cart[D.dec]; save(); }
  if (D.rm) { delete cart[D.rm]; save(); }
  if ('close' in D) $('#modal').classList.remove('on');
});
$('#openCart').onclick = () => openCart(true);
$('#closeCart').onclick = $('#overlay').onclick = () => openCart(false);
$('#checkout').onclick = () => toast('Paiement : à connecter (Stripe / Shopify)');
$('#news').onsubmit = e => { e.preventDefault(); toast('Merci ! Code BIENVENUE10 envoyé'); e.target.reset(); };

renderFilters(); renderGrid(); renderCart();
