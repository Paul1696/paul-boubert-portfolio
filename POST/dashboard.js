/* ADP — Dashboard Social Media */

/* ════════════════════════════════════════
   B3-i : Initialisation + helpers de date
   ════════════════════════════════════════ */

const START_DATE = '2026-06-22';
const DAYS_AVAILABLE = 30;

const JOURS_FR = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const MOIS_FR  = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];

/* Retourne 'YYYY-MM-DD' d'une Date */
function toDateStr(date) {
    return date.toISOString().split('T')[0];
}

/* Retourne une Date à partir d'une string 'YYYY-MM-DD' (heure locale, pas UTC) */
function parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
}

/* Formate une date en "Lundi 22 juin 2026" */
function formatDateLong(str) {
    const d = parseDate(str);
    return `${JOURS_FR[d.getDay()]} ${d.getDate()} ${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

/* Formate une date en "22/06/2026" */
function formatDateShort(str) {
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
}

/* Ajoute n jours à une string date */
function addDays(str, n) {
    const d = parseDate(str);
    d.setDate(d.getDate() + n);
    return toDateStr(d);
}

/* Date du jour en string */
function todayStr() {
    return toDateStr(new Date());
}

/* Vérifie si une date est dans la plage disponible */
function isInRange(str) {
    const end = addDays(START_DATE, DAYS_AVAILABLE - 1);
    return str >= START_DATE && str <= end;
}

const PLATFORM_LABELS = {
    linkedin:  'LinkedIn',
    instagram: 'Instagram',
    facebook:  'Facebook',
    x:         'X',
    tiktok:    'TikTok',
    whatsapp:  'WhatsApp',
};

/* ════════════════════════════════════════
   B3-ii : Affichage du jour courant
   ════════════════════════════════════════ */

let currentDate = START_DATE;

function updateDayNav() {
    /* label principal */
    document.getElementById('dayLabel').textContent = formatDateLong(currentDate);
    document.getElementById('daySubLabel').textContent = formatDateShort(currentDate);

    /* badge aujourd'hui */
    const todayBadge = document.getElementById('todayBadge');
    todayBadge.style.display = currentDate === todayStr() ? 'inline-block' : 'none';

    /* points de complétion */
    const postsOfDay = POSTS.filter(p => p.date === currentDate);
    document.querySelectorAll('.db-day-dot').forEach(dot => {
        const platform = dot.dataset.platform;
        const post = postsOfDay.find(p => p.platform === platform);
        dot.classList.remove('filled', 'published');
        if (post) {
            const status = getStatus(post.id);
            if (status === 'published') dot.classList.add('published');
            else if (post.text.trim()) dot.classList.add('filled');
        }
    });

    /* boutons navigation */
    document.getElementById('btnPrevDay').disabled = !isInRange(addDays(currentDate, -1));
    document.getElementById('btnNextDay').disabled = !isInRange(addDays(currentDate, 1));
}

/* ── Génère une carte HTML pour un post ── */
function renderCard(post) {
    const status = getStatus(post.id);
    const statusLabels = { todo: 'À faire', ready: 'Prêt', published: 'Publié' };

    return `
    <article class="db-card" data-platform="${post.platform}" data-week="${post.week}" data-id="${post.id}">
        <div class="db-card-header">
            <div class="db-card-meta">
                <span class="db-badge-platform">${PLATFORM_LABELS[post.platform]}</span>
                <span class="db-badge-week">S${post.week} — ${post.weekLabel}</span>
            </div>
            <button class="db-badge-status" data-status="${status}" onclick="cycleStatus('${post.id}', this)">
                ${statusLabels[status]}
            </button>
        </div>
        <div class="db-card-body">
            <span class="db-card-type">${post.type}</span>
            <div class="db-card-text" id="text-${post.id}">${escapeHtml(post.text)}</div>
            <button class="db-card-expand" onclick="toggleExpand('${post.id}', this)">Voir plus</button>
            ${post.hashtags ? `<div class="db-card-hashtags">${escapeHtml(post.hashtags)}</div>` : ''}
        </div>
        <div class="db-card-footer">
            <button class="db-btn-copy" onclick="copyPost('${post.id}', this)">📋 Copier</button>
            <button class="db-btn-edit" onclick="openEditModal('${post.id}')">✏️</button>
            <a class="db-btn-open" href="${post.networkUrl}" target="_blank" rel="noopener">↗ Ouvrir</a>
            <button class="db-btn-publish" onclick="publishPost('${post.id}', this)">⚡ Publier via Zernio</button>
        </div>
    </article>`;
}

/* ── Injecte toutes les cartes dans la grille ── */
function renderGrid(posts) {
    const grid = document.getElementById('postsGrid');
    if (!posts.length) {
        grid.innerHTML = '<p style="color:var(--adp-grey-400);padding:40px 0;grid-column:1/-1;text-align:center;">Aucun post pour cette sélection.</p>';
        return;
    }
    grid.innerHTML = posts.map(renderCard).join('');
}

/* ── Utilitaires ── */
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function toggleExpand(id, btn) {
    const el = document.getElementById('text-' + id);
    el.classList.toggle('expanded');
    btn.textContent = el.classList.contains('expanded') ? 'Voir moins' : 'Voir plus';
}

/* ════════════════════════════════════════
   3d : Copier + statut localStorage
   ════════════════════════════════════════ */

const STATUS_CYCLE = ['todo', 'ready', 'published'];
const STATUS_LABELS = { todo: 'À faire', ready: 'Prêt', published: 'Publié' };
const STORAGE_KEY = 'adp_post_status';

function getStatusMap() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
}

function getStatus(id) {
    return getStatusMap()[id] || 'todo';
}

function saveStatus(id, status) {
    const map = getStatusMap();
    map[id] = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

function cycleStatus(id, btn) {
    const current = btn.dataset.status;
    const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
    btn.dataset.status = next;
    btn.textContent = STATUS_LABELS[next];
    saveStatus(id, next);
}

function copyPost(id, btn) {
    const post = POSTS.find(p => p.id === id);
    if (!post) return;
    const fullText = post.hashtags ? post.text + '\n\n' + post.hashtags : post.text;

    navigator.clipboard.writeText(fullText).then(() => {
        btn.textContent = '✅ Copié !';
        btn.classList.add('copied');
        showToast('Texte copié dans le presse-papiers', 'success');
        setTimeout(() => {
            btn.textContent = '📋 Copier';
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        showToast('Impossible de copier — vérifiez les permissions', 'error');
    });
}

function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'db-toast show' + (type ? ' ' + type : '');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.className = 'db-toast';
    }, 3000);
}

/* ════════════════════════════════════════
   B3-iv : Grille filtrée par jour + plateforme
   ════════════════════════════════════════ */

let currentPlatform = 'all';

function getFilteredPosts() {
    return POSTS.filter(p => {
        const matchDate     = p.date === currentDate;
        const matchPlatform = currentPlatform === 'all' || p.platform === currentPlatform;
        return matchDate && matchPlatform;
    });
}

/* Rendu spécial pour les cartes vides */
function renderEmptyCard(post) {
    return `
    <article class="db-card" data-platform="${post.platform}" data-id="${post.id}">
        <div class="db-card-header">
            <div class="db-card-meta">
                <span class="db-badge-platform">${PLATFORM_LABELS[post.platform]}</span>
                <span class="db-badge-week">${post.type}</span>
            </div>
            <button class="db-badge-status" data-status="todo" onclick="cycleStatus('${post.id}', this)">À faire</button>
        </div>
        <div class="db-card-empty" onclick="openEditModal('${post.id}')">
            <span class="db-card-empty-icon">✏️</span>
            <span>Aucun texte — cliquez pour rédiger</span>
        </div>
        <div class="db-card-footer">
            <button class="db-btn-copy" disabled style="opacity:.4;cursor:not-allowed;">📋 Copier</button>
            <a class="db-btn-open" href="${post.networkUrl}" target="_blank" rel="noopener">↗ Ouvrir</a>
        </div>
    </article>`;
}

/* ════════════════════════════════════════
   B3-iii : Navigation ← →
   ════════════════════════════════════════ */

function initDayNav() {
    /* démarrer sur aujourd'hui si dans la plage, sinon le premier jour */
    const today = todayStr();
    currentDate = isInRange(today) ? today : START_DATE;

    updateDayNav();
    renderGrid(getFilteredPosts());

    document.getElementById('btnPrevDay').addEventListener('click', () => {
        const prev = addDays(currentDate, -1);
        if (isInRange(prev)) {
            currentDate = prev;
            updateDayNav();
            renderGrid(getFilteredPosts());
        }
    });

    document.getElementById('btnNextDay').addEventListener('click', () => {
        const next = addDays(currentDate, 1);
        if (isInRange(next)) {
            currentDate = next;
            updateDayNav();
            renderGrid(getFilteredPosts());
        }
    });
}

function initFilters() {
    document.querySelectorAll('.db-platform-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.db-platform-tab').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPlatform = btn.dataset.platform;
            renderGrid(getFilteredPosts());
        });
    });
}

/* ════════════════════════════════════════
   3e : Modal Zernio + publication
   ════════════════════════════════════════ */

const ZERNIO_KEY = 'adp_zernio_key';

function getZernioKey() {
    return localStorage.getItem(ZERNIO_KEY) || '';
}

function updateZernioStatus() {
    const key = getZernioKey();
    const badge = document.getElementById('zernioStatus');
    if (key) {
        badge.textContent = '✅ Zernio connecté';
        badge.classList.add('connected');
        document.body.classList.add('zernio-ready');
    } else {
        badge.textContent = 'Non connecté';
        badge.classList.remove('connected');
        document.body.classList.remove('zernio-ready');
    }
}

function initModal() {
    const overlay  = document.getElementById('settingsModal');
    const btnOpen  = document.getElementById('btnSettings');
    const btnClose = document.getElementById('btnCloseModal');
    const btnSave  = document.getElementById('btnSaveKey');
    const btnClear = document.getElementById('btnClearKey');
    const input    = document.getElementById('zernioApiKey');

    btnOpen.addEventListener('click', () => {
        input.value = getZernioKey();
        overlay.classList.add('open');
    });

    btnClose.addEventListener('click', () => overlay.classList.remove('open'));

    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
    });

    btnSave.addEventListener('click', () => {
        const key = input.value.trim();
        if (!key) { showToast('Clé vide — rien enregistré', 'error'); return; }
        localStorage.setItem(ZERNIO_KEY, key);
        overlay.classList.remove('open');
        updateZernioStatus();
        showToast('Clé Zernio enregistrée', 'success');
    });

    btnClear.addEventListener('click', () => {
        localStorage.removeItem(ZERNIO_KEY);
        input.value = '';
        overlay.classList.remove('open');
        updateZernioStatus();
        showToast('Clé Zernio supprimée');
    });
}

async function publishPost(id, btn) {
    const key = getZernioKey();
    if (!key) { showToast('Clé Zernio manquante — cliquez sur ⚙️ Zernio', 'error'); return; }

    const post = POSTS.find(p => p.id === id);
    if (!post) return;

    btn.classList.add('loading');
    btn.textContent = '⏳ Publication…';

    const fullText = post.hashtags ? post.text + '\n\n' + post.hashtags : post.text;

    try {
        const res = await fetch('https://api.zernio.com/v1/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: fullText,
                platforms: [post.platform],
            }),
        });

        if (res.ok) {
            showToast('Publié avec succès sur ' + PLATFORM_LABELS[post.platform], 'success');
            /* marquer automatiquement comme publié */
            const card = document.querySelector(`[data-id="${id}"]`);
            const statusBtn = card?.querySelector('.db-badge-status');
            if (statusBtn) {
                statusBtn.dataset.status = 'published';
                statusBtn.textContent = 'Publié';
                saveStatus(id, 'published');
            }
        } else {
            const err = await res.json().catch(() => ({}));
            showToast('Erreur Zernio : ' + (err.message || res.status), 'error');
        }
    } catch {
        showToast('Impossible de joindre Zernio — vérifiez votre connexion', 'error');
    } finally {
        btn.classList.remove('loading');
        btn.textContent = '⚡ Publier via Zernio';
    }
}

/* ════════════════════════════════════════
   C3 : Modal de rédaction — ouvrir, remplir, sauvegarder
   ════════════════════════════════════════ */

let editingId = null;

function openEditModal(id) {
    const post = POSTS.find(p => p.id === id);
    if (!post) return;

    editingId = id;

    /* titre et méta */
    document.getElementById('editModalTitle').textContent =
        PLATFORM_LABELS[post.platform] + ' — ' + post.date;
    document.getElementById('editModalMeta').textContent =
        post.type + ' · ' + formatDateLong(post.date);

    /* pré-remplir les champs */
    document.getElementById('editTopic').value    = post.topic    || '';
    document.getElementById('editText').value     = post.text     || '';
    document.getElementById('editHashtags').value = post.hashtags || '';

    document.getElementById('editModal').classList.add('open');
    document.getElementById('editText').focus();
}

function initEditModal() {
    const overlay  = document.getElementById('editModal');
    const btnClose = document.getElementById('btnCloseEditModal');
    const btnCancel = document.getElementById('btnCancelEdit');
    const btnSave  = document.getElementById('btnSaveEdit');

    btnClose.addEventListener('click',  () => overlay.classList.remove('open'));
    btnCancel.addEventListener('click', () => overlay.classList.remove('open'));

    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
    });

    btnSave.addEventListener('click', () => {
        if (!editingId) return;

        const topic    = document.getElementById('editTopic').value.trim();
        const text     = document.getElementById('editText').value.trim();
        const hashtags = document.getElementById('editHashtags').value.trim();

        if (!text) { showToast('Le texte ne peut pas être vide', 'error'); return; }

        /* sauvegarder dans localStorage */
        savePost(editingId, { topic, text, hashtags });

        /* mettre à jour POSTS en mémoire */
        const post = POSTS.find(p => p.id === editingId);
        if (post) { post.topic = topic; post.text = text; post.hashtags = hashtags; }

        overlay.classList.remove('open');
        updateDayNav();
        renderGrid(getFilteredPosts());
        showToast('Post enregistré', 'success');
    });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
    POSTS = loadPosts();
    initDayNav();
    initFilters();
    initModal();
    initEditModal();
    updateZernioStatus();
});
