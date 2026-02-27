const inventory = [
    { id: 1, name: "ARRI Alexa Mini LF", type: "Camera Body", acc: "PL Mount, MVF-2, 3x 1TB Cards", rate: 1500, image: "Images/cameras/alexa.jpg"  },
    { id: 2, name: "RED V-Raptor 8K", type: "Camera Body", acc: "RF Mount, 2x 660GB Cards, Cage", rate: 1200, image: "Images/cameras/red.png" },
    { id: 3, name: "Cooke S4/i Prime Set", type: "Lenses", acc: "18, 25, 35, 50, 75, 100mm", rate: 800, image: "Images/lenses/cooke.png" },
    { id: 4, name: "Aputure 600d Pro", type: "Lighting", acc: "F10 Fresnel, Barn Doors, Case", rate: 120, image: "Images/lighting/aputure.png" },
    { id: 5, name: "Astera Titan Tubes", type: "Lighting", acc: "8-Light Kit, Charging Case", rate: 200, image: "Images/lighting/astera.png" },
    { id: 6, name: "DJI Ronin 2", type: "Support", acc: "Pro Combo, 6x Batteries", rate: 350, image: "Images/support/ronin2.png" },
    { id: 7, name: "Sony A7S III", type: "Camera Body", acc: "4x Batteries, 2x 160GB CFexpress Type A", rate: 80, image: "Images/cameras/sony-a7s3.png" },
    { id: 8, name: "Sigma 24-70mm f/2.8", type: "Lenses", acc: "E-mount, Lens Hood, UV Filter", rate: 40, image: "Images/lenses/sigma-24-70.png" },
    { id: 9, name: "Panavision Primo Prime Set", type: "Lenses", acc: "14, 21, 25, 32, 40, 50, 75, 100mm", rate: 1000, image: "Images/lenses/panavision.png" },
    { id: 10, name: "Canon C500 Mark II", type: "Camera Body", acc: "PL/EF Mount, 2x Batteries, V-Mount Adapter", rate: 300, image: "Images/cameras/canon-c500.png" },
    { id: 11, name: "Zeiss CP.3 6-Lens Set", type: "Lenses", acc: "21, 25, 35, 50, 85, 135mm", rate: 250, image: "Images/lenses/zeiss-cp3.png" },
    { id: 12, name: "Blackmagic Pocket 6K Pro", type: "Camera Body", acc: "4x Batteries, Cage, 2x 256GB Cards", rate: 70, image: "Images/cameras/bmpcc6k.png" },
    { id: 13, name: "Aputure LS 600x Pro", type: "Lighting", acc: "Bowens Mount, Softbox, Case", rate: 180, image: "Images/lighting/aputure-ls600x.png" },
    { id: 14, name: "Kino Flo Diva-Lite 20", type: "Lighting", acc: "2-Light Kit, Stands", rate: 60, image: "Images/lighting/kinoflo-diva.png" },
    { id: 15, name: "Manfrotto Tripod Kit", type: "Support", acc: "Tripod, Fluid Head, Carry Case", rate: 25, image: "Images/support/manfrotto-tripod.png" },
    { id: 16, name: "Sachtler Flowtech 100", type: "Support", acc: "Tripod + Head, Spreader", rate: 90, image: "Images/support/sachtler-flowtech.png" },
    { id: 17, name: "DJI Inspire 2 Drone", type: "Support", acc: "Pro Combo, 2x Batteries, Controller", rate: 400, image: "Images/support/inspire2.png" },
    { id: 18, name: "Nikon Z9", type: "Camera Body", acc: "2x Batteries, 1x 1TB CFexpress", rate: 120, image: "Images/cameras/nikon-z9.png" },
    { id: 19, name: "Tokina Cinema Vista 135mm", type: "Lenses", acc: "T/1.5, PL Mount", rate: 50, image: "Images/lenses/tokina-135.png" },
    { id: 20, name: "Fujinon MK 18-55mm", type: "Lenses", acc: "E-mount, Follow Focus", rate: 60, image: "Images/lenses/fujinon-mk.png" },
    { id: 21, name: "Mole-Richardson 200W Baby", type: "Lighting", acc: "Stand, Case", rate: 30, image: "Images/lighting/mole-200.png" },
    { id: 22, name: "Rosco LED Panel", type: "Lighting", acc: "2x Panel Kit, Dimming", rate: 45, image: "Images/lighting/rosco-led.png" },
    { id: 23, name: "Steadicam Pro", type: "Support", acc: "Vest, Arm, Sled", rate: 120, image: "Images/support/steadicam-pro.png" },
    { id: 24, name: "Zoom F8n Recorder", type: "Audio", acc: "8-Track Recorder, 4x Batteries", rate: 90, image: "Images/audio/zoom-f8n.png" },
    { id: 25, name: "Sennheiser MKH416", type: "Audio", acc: "Rycote, XLR Cable", rate: 35, image: "Images/audio/mkh416.png" },
    { id: 26, name: "ARRI Master Prime 50mm", type: "Lenses", acc: "PL Mount, High Speed", rate: 600, image: "Images/lenses/arri-master-prime-50.png" },
    { id: 27, name: "SmallHD 703 Bolt Monitor", type: "Support", acc: "Wireless RX, Sun Hood", rate: 40, image: "Images/support/smallhd-703.png" },
    { id: 28, name: "Panasonic S1H", type: "Camera Body", acc: "L-mount, 2x Batteries, Extra Cards", rate: 150, image: "Images/cameras/panasonic-s1h.png" },
    { id: 29, name: "Tamron 24-70mm f/2.8", type: "Lenses", acc: "L-mount, Weather Sealed", rate: 55, image: "Images/lenses/tamron-24-70.png" },
    { id: 30, name: "LEDGO 1200 RGB", type: "Lighting", acc: "DMX Control, Battery Powered", rate: 85, image: "Images/lighting/ledgo-1200.png" },
    { id: 31, name: "Cartoni Lambda Tripod", type: "Support", acc: "Mid-level Head, Spreader", rate: 110, image: "Images/support/cartoni-lambda.png" },
    { id: 32, name: "GoPro Hero 12 Black", type: "Camera Body", acc: "Waterproof, 2x Batteries, Mounts", rate: 45, image: "Images/cameras/gopro-12.png" },
    { id: 33, name: "Rokinon Cine DS 35mm", type: "Lenses", acc: "T/1.5, Canon EF Mount", rate: 75, image: "Images/lenses/rokinon-35.png" },
    { id: 34, name: "Neewer LED Softbox Kit", type: "Lighting", acc: "2x 960 Panel Kit, Stands, Softboxes", rate: 65, image: "Images/lighting/neewer-softbox.png" },
    { id: 35, name: "Rode Lav Wireless System", type: "Audio", acc: "2-Channel Wireless, Lavalier Mics", rate: 55, image: "Images/audio/rode-wireless.png" },
    { id: 36, name: "Matthews C-Stand Heavy Duty", type: "Support", acc: "20ft Arm, Grip Head, T-Bone", rate: 35, image: "Images/support/matthews-c-stand.png" },
    { id: 37, name: "Phantom 4 Pro Cine", type: "Support", acc: "Pro Cine, 2x Batteries, 3x Props", rate: 320, image: "Images/support/phantom-4-pro.png" },
    { id: 38, name: "Pearl & Dean Premium DSM", type: "Lighting", acc: "2x Lighting Kit, Soft Cases", rate: 140, image: "Images/lighting/pearl-dean-premium.png" },
    { id: 39, name: "Shure SM7B Microphone", type: "Audio", acc: "XLR Cable, Pop Filter, Shock Mount", rate: 40, image: "Images/audio/shure-sm7b.png" },
    { id: 40, name: "Glidecam HD-4000 Stabilizer", type: "Support", acc: "Counterweight Vest, Case", rate: 95, image: "Images/support/glidecam-hd4000.png" },
];

const quoteList = {}; // map of itemId -> quantity

const favoriteList = {}; // map of itemId -> 1 if favorited
let currentDetailsId = null; // track which item is being viewed in details modal

// Load favorites from localStorage
function loadFavorites() {
    try {
        const raw = localStorage.getItem('favoritesList');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
            Object.assign(favoriteList, parsed);
        }
    } catch (e) { /* ignore */ }
}

function saveFavorites() {
    try { localStorage.setItem('favoritesList', JSON.stringify(favoriteList)); } catch (e) { /* ignore */ }
}

// Toggle favorite status
function toggleFavorite(id = null) {
    const itemId = id || currentDetailsId;
    if (!itemId) return;
    if (favoriteList[itemId]) {
        delete favoriteList[itemId];
    } else {
        favoriteList[itemId] = 1;
    }
    saveFavorites();
    updateCardFavorites();
    if (currentDetailsId === itemId) updateDetailsModal();
}

// Update favorite heart icons on cards
function updateCardFavorites() {
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        const id = Number(btn.dataset.id);
        if (favoriteList[id]) {
            btn.classList.add('active');
            btn.textContent = '❤';
        } else {
            btn.classList.remove('active');
            btn.textContent = '♡';
        }
    });
}
// Persistence helpers
function saveQuote() {
    try { localStorage.setItem('quoteList', JSON.stringify(quoteList)); } catch (e) { /* ignore */ }
}

function loadQuote() {
    try {
        const raw = localStorage.getItem('quoteList');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
            Object.keys(parsed).forEach(k => { quoteList[Number(k)] = parsed[k]; });
        }
    } catch (e) { /* ignore parse errors */ }
}

// DISPLAY GEAR
// Generate a small SVG placeholder as a data URL. Uses item name/type to create a contextual placeholder.
function makePlaceholder(name, type) {
    const shortName = (name || '').split(' ').slice(0,4).join(' ');
    const colorMap = {
        'Camera Body': '#2b2f77',
        'Lenses': '#5a2b2b',
        'Lighting': '#7a5a00',
        'Support': '#114411',
        'Audio': '#4a2b9a'
    };
    const bg = colorMap[type] || '#333333';
    const fg = '#ffffff';
    const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
  <rect width='100%' height='100%' fill='${bg}' />
  <g fill='${fg}' font-family='Segoe UI, Roboto, -apple-system, sans-serif'>
    <text x='50%' y='46%' text-anchor='middle' font-size='28' font-weight='700'>${type}</text>
    <text x='50%' y='62%' text-anchor='middle' font-size='20'>${shortName}</text>
  </g>
</svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function displayGear(items) {
    const grid = document.getElementById('gearGrid');
    grid.innerHTML = items.map(item => `
        <div class="card" onclick="openDetailsModal(${item.id})" style="cursor: pointer;">
            <div class="card-img-container">
                <img src="${item.image}" loading="lazy" alt="${item.name}" onerror="this.onerror=null;this.src='${makePlaceholder(item.name, item.type)}'">
            </div>
            <span class="item-badge" data-id="${item.id}"></span>
            <button class="btn-favorite" data-id="${item.id}" onclick="event.stopPropagation(); toggleFavorite(${item.id}); updateCardFavorites(); updateFavoritesCount();" style="position: absolute; top: 12px; left: 12px; width: 40px; height: 40px; background: rgba(0,0,0,0.6); border: none; border-radius: 50%; color: white; font-size: 1.2rem; cursor: pointer; z-index: 10;">♡</button>
            <div class="card-content">
                <div class="card-title">${item.name}</div>
                <div class="card-acc">${item.acc}</div>
                <div class="card-footer">
                    <div class="price">$${item.rate}<span>/day</span></div>
                    ${(() => {
                        const qty = quoteList[item.id] || 0;
                        if (qty > 0) {
                            return `
                                <div class="card-controls">
                                    <button class="control-btn" onclick="event.stopPropagation(); changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
                                    <span class="qty-display" data-id="${item.id}">${qty}</span>
                                    <button class="control-btn" onclick="event.stopPropagation(); changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
                                    <button class="btn-remove-card" onclick="event.stopPropagation(); removeFromQuote(${item.id})" aria-label="Remove from quote">Remove</button>
                                </div>
                            `;
                        } else {
                            return `<button class="btn-add" onclick="event.stopPropagation(); addToQuote(${item.id})">Add to Quote</button>`;
                        }
                    })()}
                </div>
            </div>
        </div>
    `).join('');
    updateCardBadges();
}

// SEARCH GEAR
function filterGear() {
    const val = document.getElementById('searchInput').value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(val) || 
        item.type.toLowerCase().includes(val)
    );
    displayGear(filtered);
}

// CATEGORY FILTER
function filterCategory(cat, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    const filtered = cat === 'All' ? inventory : inventory.filter(i => i.type === cat);
    displayGear(filtered);
}

// QUOTE LIST (add/remove/qty)
function updateQuoteBadge() {
    const count = Object.values(quoteList).reduce((s, q) => s + q, 0);
    const btn = document.getElementById('cartCount');
    if (!btn) return;
    btn.innerText = count;
}

function addToQuote(id) {
    quoteList[id] = (quoteList[id] || 0) + 1;
    updateQuoteBadge();
    saveQuote();
    if (modal && modal.style.display === 'block') renderModalSummary();
    updateCardBadges();
    showAddAnimation(id);
}

// show a small +1 animation on the card where item was added
function showAddAnimation(id) {
    try {
        const badge = document.querySelector(`.item-badge[data-id="${id}"]`);
        if (!badge) return;
        const card = badge.closest('.card');
        if (!card) return;
        const anim = document.createElement('span');
        anim.className = 'add-anim';
        anim.textContent = '+1 added';
        card.appendChild(anim);
        // remove after animation finishes
        setTimeout(() => {
            anim.remove();
        }, 750);
    } catch (e) {
        // ignore
    }
}

function removeFromQuote(id) {
    if (!quoteList[id]) return;
    delete quoteList[id];
    updateQuoteBadge();
    saveQuote();
    renderModalSummary();
    updateCardBadges();
}

function changeQty(id, delta) {
    if (!quoteList[id]) return;
    quoteList[id] = quoteList[id] + delta;
    if (quoteList[id] <= 0) delete quoteList[id];
    updateQuoteBadge();
    saveQuote();
    renderModalSummary();
    updateCardBadges();
}

// MODAL LOGIC
const modal = document.getElementById("quoteModal");
const API_ENDPOINT = 'https://example.com/api/quotes'; // replace with real endpoint

function renderModalSummary() {
    const container = document.getElementById('modalSummary');
    const ids = Object.keys(quoteList).map(Number);
    if (ids.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No items in your quote list.</p>';
        return;
    }
    let total = 0;
    container.innerHTML = ids.map(id => {
        const item = inventory.find(i => i.id === id);
        const qty = quoteList[id];
        const lineTotal = item.rate * qty;
        total += lineTotal;
        return `
            <div class="quote-item">
                <div class="quote-item-info">
                    <div class="quote-item-name">${item.name}</div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <button class="btn-qty" onclick="changeQty(${id}, -1)">−</button>
                        <span style="min-width: 25px; text-align: center; font-weight: 600;">${qty}</span>
                        <button class="btn-qty" onclick="changeQty(${id}, 1)">+</button>
                        <span style="color: var(--text-muted); margin-left: 1rem;">@ $${item.rate}/day</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="text-align: right; min-width: 60px; font-weight: 700; color: var(--accent-gold);">$${lineTotal}</div>
                    <button class="btn-remove" onclick="removeFromQuote(${id})">✕</button>
                </div>
            </div>
        `;
    }).join('') + `<div class="quote-total">Total/day: $${total}</div>`;
}

function toggleModal() { modal.style.display = "none"; }
window.onclick = (e) => { if(e.target == modal) toggleModal(); }

function clearQuote() {
    Object.keys(quoteList).forEach(k => delete quoteList[k]);
    saveQuote();
    updateQuoteBadge();
    if (modal && modal.style.display === 'block') renderModalSummary();
    updateCardBadges();
}

function showToast(message, duration = 4000) {
    const t = document.getElementById('toast');
    if (!t) { alert(message); return; }
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(t._hideTimeout);
    t._hideTimeout = setTimeout(() => t.classList.remove('show'), duration);
}

document.getElementById('quoteBtn').onclick = () => {
    const totalItems = Object.values(quoteList).reduce((s, q) => s + q, 0);
    if (totalItems === 0) return showToast("Add items to your list first!");
    modal.style.display = "block";
    renderModalSummary();
};

document.getElementById('quoteForm').onsubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn ? submitBtn.innerText : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = 'Sending...'; }

    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const location = document.getElementById('location').value;
    const items = Object.keys(quoteList).map(id => {
        const item = inventory.find(i => i.id === Number(id));
        return { id: Number(id), name: item ? item.name : '', qty: quoteList[id], rate: item ? item.rate : 0 };
    });

    // Build a human-readable message and open WhatsApp with it
    const waNumber = '201030554531'; // destination WhatsApp number (no +)
    const itemsText = items.map(it => `- ${it.name} x${it.qty} ($${it.rate}/day)`).join('\n');
    const total = items.reduce((s, it) => s + (it.qty * it.rate), 0);
    const msgLines = [
        'New Quote Request from Global Rental House website',
        `Name: ${name}`,
        `Email: ${email}`,
        `Start: ${startDate}`,
        `End: ${endDate}`,
        `Location: ${location}`,
        '',
        'Items:',
        itemsText,
        '',
        `Total/day: $${total}`
    ];
    const message = msgLines.join('\n');
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    try {
        window.open(waUrl, '_blank');
        showToast('Opening WhatsApp with your quote...');
        clearQuote();
        if (form.reset) form.reset();
        toggleModal();
    } catch (err) {
        showToast('Could not open WhatsApp: ' + err.message);
    } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = originalText; }
    }
};

// Load persisted quote and start the page
loadQuote();
updateQuoteBadge();
displayGear(inventory);

// Update badges for cards to show per-item quantities
function updateCardBadges() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const badge = card.querySelector('.item-badge');
        const id = badge ? Number(badge.dataset.id) : null;
        if (!id) return;
        const qty = quoteList[id] || 0;

        // update top-right badge
        if (qty > 0) {
            badge.textContent = qty;
            badge.classList.add('has-qty');
        } else {
            badge.textContent = '';
            badge.classList.remove('has-qty');
        }

        const footer = card.querySelector('.card-footer');
        if (!footer) return;
        const existingControls = footer.querySelector('.card-controls');
        const existingAdd = footer.querySelector('.btn-add');

        if (qty > 0) {
            // ensure controls exist and show current qty
            if (!existingControls) {
                footer.insertAdjacentHTML('beforeend', `
                    <div class="card-controls">
                        <button class="control-btn" onclick="event.stopPropagation(); changeQty(${id}, -1)" aria-label="Decrease quantity">−</button>
                        <span class="qty-display" data-id="${id}">${qty}</span>
                        <button class="control-btn" onclick="event.stopPropagation(); changeQty(${id}, 1)" aria-label="Increase quantity">+</button>
                        <button class="btn-remove-card" onclick="event.stopPropagation(); removeFromQuote(${id})" aria-label="Remove from quote">Remove</button>
                    </div>
                `);
            } else {
                const qel = existingControls.querySelector('.qty-display');
                if (qel) qel.textContent = qty;
            }
            if (existingAdd) existingAdd.remove();
        } else {
            // qty is zero: remove controls and show Add button
            if (existingControls) existingControls.remove();
            if (!existingAdd) {
                footer.insertAdjacentHTML('beforeend', `<button class="btn-add" onclick="event.stopPropagation(); addToQuote(${id})">Add to Quote</button>`);
            }
        }
    });
}