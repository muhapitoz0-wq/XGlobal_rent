const inventory = [
    { id: 1, name: "ARRI Alexa Mini LF", type: "Camera Body", acc: "PL Mount, MVF-2, 3x 1TB Cards", rate: 1500, image: "images/cameras/alexa.jpg"  },
    { id: 2, name: "RED V-Raptor 8K", type: "Camera Body", acc: "RF Mount, 2x 660GB Cards, Cage", rate: 1200, image: "images/cameras/red.png" },
    { id: 3, name: "Cooke S4/i Prime Set", type: "Lenses", acc: "18, 25, 35, 50, 75, 100mm", rate: 800, image: "images/lenses/cooke.png" },
    { id: 4, name: "Aputure 600d Pro", type: "Lighting", acc: "F10 Fresnel, Barn Doors, Case", rate: 120, image: "images/lighting/aputure.png" },
    { id: 5, name: "Astera Titan Tubes", type: "Lighting", acc: "8-Light Kit, Charging Case", rate: 200, image: "images/lighting/astera.png" },
    { id: 6, name: "DJI Ronin 2", type: "Support", acc: "Pro Combo, 6x Batteries", rate: 350, image: "images/support/ronin2.png" },
    { id: 7, name: "Sony A7S III", type: "Camera Body", acc: "4x Batteries, 2x 160GB CFexpress Type A", rate: 80, image: "images/cameras/sony-a7s3.png" },
    { id: 8, name: "Sigma 24-70mm f/2.8", type: "Lenses", acc: "E-mount, Lens Hood, UV Filter", rate: 40, image: "images/lenses/sigma-24-70.png" },
];

const quoteList = {}; // map of itemId -> quantity

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
function displayGear(items) {
    const grid = document.getElementById('gearGrid');
    grid.innerHTML = items.map(item => `
        <div class="card">
            <div class="card-img-container">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Global+Rental+House'">
            </div>
            <span class="item-badge" data-id="${item.id}"></span>
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
                                    <button class="control-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
                                    <span class="qty-display" data-id="${item.id}">${qty}</span>
                                    <button class="control-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase quantity">+</button>
                                    <button class="btn-remove-card" onclick="removeFromQuote(${item.id})" aria-label="Remove from quote">Remove</button>
                                </div>
                            `;
                        } else {
                            return `<button class="btn-add" onclick="addToQuote(${item.id})">Add to Quote</button>`;
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
    const btn = document.getElementById('quoteBtn');
    if (!btn) return;
    btn.innerText = `Quote List (${count})`;
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
        container.innerHTML = '<p>No items in your quote.</p>';
        return;
    }
    let total = 0;
    container.innerHTML = ids.map(id => {
        const item = inventory.find(i => i.id === id);
        const qty = quoteList[id];
        const lineTotal = item.rate * qty;
        total += lineTotal;
        return `
            <div class="quote-item" style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
                <div style="flex:1">
                    <div style="font-weight:600">${item.name}</div>
                    <div style="font-size:0.9rem;color:#666">${item.acc} — $${item.rate}/day</div>
                </div>
                <div style="display:flex;gap:8px;align-items:center;margin-left:12px">
                    <button class="btn-qty" onclick="changeQty(${id}, -1)">−</button>
                    <span>${qty}</span>
                    <button class="btn-qty" onclick="changeQty(${id}, 1)">+</button>
                    <div style="width:12px"></div>
                    <div style="font-weight:600">$${lineTotal}</div>
                    <button class="btn-remove" onclick="removeFromQuote(${id})" style="margin-left:8px">Remove</button>
                </div>
            </div>
        `;
    }).join('') + `<div style="text-align:right;margin-top:10px;font-weight:700">Total/day: $${total}</div>`;
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
                        <button class="control-btn" onclick="changeQty(${id}, -1)" aria-label="Decrease quantity">−</button>
                        <span class="qty-display" data-id="${id}">${qty}</span>
                        <button class="control-btn" onclick="changeQty(${id}, 1)" aria-label="Increase quantity">+</button>
                        <button class="btn-remove-card" onclick="removeFromQuote(${id})" aria-label="Remove from quote">Remove</button>
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
                footer.insertAdjacentHTML('beforeend', `<button class="btn-add" onclick="addToQuote(${id})">Add to Quote</button>`);
            }
        }
    });
}