// Enhanced features: Equipment Details, Favorites, Advanced Filters

// Add stock property to each inventory item
function addStockStatus() {
    const stocks = ['Available','Available','Limited','Available','Limited','Available','Available','Available','Limited','Available','Available','Available','Limited','Available','Available','Available','Available','Limited','Available','Available','Available','Available','Available','Limited','Available','Available','Available','Limited','Available','Available','Available','Limited','Available','Limited','Available','Limited','Available','Available','Limited','Available'];
    if (typeof inventory === 'undefined' || !Array.isArray(inventory)) return;
    inventory.forEach((item, idx) => {
        item.stock = item.stock || (stocks[idx] || 'Available');
    });
}

// Equipment Details Modal functions
function openDetailsModal(id) {
    currentDetailsId = id;
    const item = inventory.find(i => i.id === id);
    if (!item) return;
    const title = document.getElementById('detailsTitle');
    const img = document.getElementById('detailsImage');
    const typeEl = document.getElementById('detailsType');
    const accEl = document.getElementById('detailsAcc');
    const priceEl = document.getElementById('detailsPrice');
    const badge = document.getElementById('stockBadge');
    
    if (title) title.textContent = item.name;
    if (img) img.src = item.image;
    if (typeEl) typeEl.textContent = `Category: ${item.type}`;
    if (accEl) accEl.textContent = item.acc;
    if (priceEl) priceEl.textContent = `$${item.rate}`;
    if (badge) {
        badge.textContent = item.stock || 'Available';
        badge.className = `details-badge stock-${(item.stock || 'Available').toLowerCase()}`;
    }

    updateDetailsModal();
    const modal = document.getElementById('detailsModal');
    if (modal) modal.style.display = 'block';
}

function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    if (modal) modal.style.display = 'none';
    currentDetailsId = null;
}

function updateDetailsModal() {
    const favBtn = document.getElementById('favBtn');
    if (!favBtn) return;
    if (favoriteList && favoriteList[currentDetailsId]) {
        favBtn.textContent = '❤';
        favBtn.style.color = 'var(--accent-red)';
    } else {
        favBtn.textContent = '♡';
        favBtn.style.color = 'white';
    }
}

function addFromDetailsAndClose() {
    if (!currentDetailsId) return;
    addToQuote(currentDetailsId);
    closeDetailsModal();
}

// Favorites modal rendering
function openFavoritesModal() {
    const container = document.getElementById('favoritesList');
    if (!container) return;
    const favIds = Object.keys(favoriteList).map(Number);
    if (favIds.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:2rem;">No favorite items yet.</p>';
        const modal = document.getElementById('favoritesModal'); if (modal) modal.style.display = 'block';
        updateFavoritesCount();
        return;
    }
    container.innerHTML = favIds.map(id => {
        const item = inventory.find(i => i.id === id);
        if (!item) return '';
        return `
            <div class="favorite-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='${makePlaceholder(item.name,item.type)}'">
                <div class="favorite-item-name">${item.name}</div>
                <div class="favorite-item-price">$${item.rate}/day</div>
                <div style="display:flex;gap:.5rem;">
                    <button class="btn-primary" style="flex:1;padding:.5rem;" onclick="addToQuote(${item.id}); updateCardBadges();">Add</button>
                    <button class="btn-secondary" style="flex:1;padding:.5rem;" onclick="toggleFavorite(${item.id}); openFavoritesModal();">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    const modal = document.getElementById('favoritesModal'); if (modal) modal.style.display = 'block';
    updateFavoritesCount();
}

function closeFavoritesModal() {
    const modal = document.getElementById('favoritesModal'); if (modal) modal.style.display = 'none';
}

function updateFavoritesCount() {
    const el = document.getElementById('favCount');
    if (!el) return;
    el.textContent = Object.keys(favoriteList).length;
}

// Advanced filters
let currentCategory = 'All';
function toggleAdvancedFilters() {
    const panel = document.getElementById('filtersPanel');
    if (!panel) return;
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function applyAdvancedFilters() {
    const priceMaxEl = document.getElementById('priceRange');
    const display2 = document.getElementById('priceDisplay2');
    const priceMax = priceMaxEl ? Number(priceMaxEl.value) : 2000;
    if (display2) display2.textContent = priceMax;
    const checked = Array.from(document.querySelectorAll('.filter-checkboxes input[type="checkbox"]:checked')).map(n => n.value);
    let filtered = inventory.slice();
    if (currentCategory && currentCategory !== 'All') filtered = filtered.filter(i => i.type === currentCategory);
    filtered = filtered.filter(i => i.rate <= priceMax);
    if (checked.length > 0) filtered = filtered.filter(i => checked.includes(i.stock || 'Available'));
    displayGear(filtered);
}

function resetFilters() {
    const priceRange = document.getElementById('priceRange'); if (priceRange) priceRange.value = 2000;
    const display2 = document.getElementById('priceDisplay2'); if (display2) display2.textContent = 2000;
    document.querySelectorAll('.filter-checkboxes input[type="checkbox"]').forEach(cb => cb.checked = false);
    currentCategory = 'All';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const firstTab = document.querySelector('.tab'); if (firstTab) firstTab.classList.add('active');
    displayGear(inventory);
}

// Smooth transitions: wrap existing filterCategory if present
if (typeof filterCategory === 'function') {
    const _origFilter = filterCategory;
    filterCategory = function(cat, el) {
        currentCategory = cat;
        _origFilter(cat, el);
        setTimeout(() => {
            const grid = document.getElementById('gearGrid'); if (grid) grid.scrollIntoView({behavior:'smooth', block:'start'});
        }, 80);
        const panel = document.getElementById('filtersPanel'); if (panel) panel.style.display = 'none';
    }
}

// Enhanced displayGear: add favorite button, stock badge, ensure event propagation control
if (typeof displayGear === 'function') {
    const _origDisplay = displayGear;
    displayGear = function(items) {
        const grid = document.getElementById('gearGrid');
        if (!grid) return;
        grid.innerHTML = items.map(item => `
            <div class="card" onclick="openDetailsModal(${item.id})">
                <div class="card-img-container">
                    <img src="${item.image}" loading="lazy" alt="${item.name}" onerror="this.onerror=null;this.src='${makePlaceholder(item.name,item.type)}'">
                </div>
                <span class="item-badge" data-id="${item.id}"></span>
                <button class="btn-favorite" data-id="${item.id}" onclick="event.stopPropagation(); toggleFavorite(${item.id}); updateCardFavorites(); updateFavoritesCount();">♡</button>
                ${item.stock ? `<span class="stock-badge stock-${(item.stock||'Available').toLowerCase()}">${item.stock}</span>` : ''}
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
        updateCardFavorites();
    }
}

// Add favorites button to navbar if not present
function addFavoritesButton() {
    const nav = document.querySelector('.nav-actions');
    if (!nav) return;
    if (document.getElementById('favoritesBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'favoritesBtn';
    btn.className = 'quote-cart';
    btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 17.5L1.5 11C-0.5 9 -0.5 6 1.5 4C3.5 2 6.5 2 8.5 4L9 4.5L9.5 4C11.5 2 14.5 2 16.5 4C18.5 6 18.5 9 16.5 11L9 17.5Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <span id="favCount">0</span>
    `;
    btn.onclick = openFavoritesModal;
    nav.insertBefore(btn, nav.lastChild);
    updateFavoritesCount();
}

// Initialization
function initializeEnhancedFeatures() {
    addStockStatus();
    try { if (typeof loadFavorites === 'function') loadFavorites(); } catch(e){}
    addFavoritesButton();
    // modal overlay click handlers
    const detModal = document.getElementById('detailsModal'); if (detModal) detModal.addEventListener('click', e => { if (e.target === detModal) closeDetailsModal(); });
    const favModal = document.getElementById('favoritesModal'); if (favModal) favModal.addEventListener('click', e => { if (e.target === favModal) closeFavoritesModal(); });

    // Back-to-top behavior
    const back = document.getElementById('backToTop');
    function checkScroll() {
        const show = window.scrollY > 420;
        if (!back) return;
        if (show) back.classList.add('show'); else back.classList.remove('show');
    }
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Loading skeleton: show briefly then render gear
    showSkeleton(6);
    setTimeout(() => { try { displayGear(inventory); } catch(e) {} }, 300);
}

// Scroll to top helper
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// Copy quote to clipboard
function copyQuoteToClipboard() {
    const ids = Object.keys(quoteList).map(Number);
    if (ids.length === 0) {
        showToast('No items to copy. Add items to your quote first.');
        return;
    }
    const name = document.getElementById('fullName') ? document.getElementById('fullName').value.trim() : '';
    const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
    const start = document.getElementById('startDate') ? document.getElementById('startDate').value : '';
    const end = document.getElementById('endDate') ? document.getElementById('endDate').value : '';
    const location = document.getElementById('location') ? document.getElementById('location').value : '';
    const items = ids.map(id => {
        const item = inventory.find(i => i.id === id);
        return `${item ? item.name : id} x${quoteList[id]} ($${item ? item.rate : '0'}/day)`;
    });
    const total = ids.reduce((s, id) => { const it = inventory.find(i=>i.id===id); return s + ((it?it.rate:0) * quoteList[id]); }, 0);
    const lines = [
        'Quote from Global Rental House',
        `Name: ${name}`,
        `Email: ${email}`,
        `Start: ${start}`,
        `End: ${end}`,
        `Location: ${location}`,
        '',
        'Items:',
        ...items,
        '',
        `Total/day: $${total}`
    ];
    const text = lines.join('\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast('Quote copied to clipboard')).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
    function fallbackCopy(t) {
        const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); showToast('Quote copied to clipboard'); } catch(e) { showToast('Copy failed'); } ta.remove();
    }
}

// Loading skeleton helpers
function showSkeleton(count = 6) {
    const grid = document.getElementById('gearGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i=0;i<count;i++) {
        const s = document.createElement('div'); s.className = 'skeleton-card'; s.innerHTML = `
            <div class="skeleton-img"></div>
            <div class="skeleton-body">
                <div class="skeleton-line long"></div>
                <div class="skeleton-line medium"></div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
                    <div class="skeleton-line short" style="height:18px;width:40%;"></div>
                    <div class="skeleton-line short" style="height:22px;width:20%;"></div>
                </div>
            </div>
        `;
        grid.appendChild(s);
    }
}


if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeEnhancedFeatures); else initializeEnhancedFeatures();
