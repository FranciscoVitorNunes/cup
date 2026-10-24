/* ============================================================
   ESTADO GLOBAL + PERSISTÊNCIA + UTILITÁRIOS
   ============================================================ */

const STORAGE_KEY = 'copa_amigos_v3';

// Estado único, com duas seções independentes (campeonato e copa)
let state = {
  format: 'campeonato',           // 'campeonato' | 'copamundo'
  phase: 'setup',                 // 'setup' | 'tournament'

  campeonato: {
    players: [],                  // 3 × { name, team: TeamObject }
    matches: [],                  // 6 × { id, round, home, away, hs, as }
    final: { home: null, away: null, hs: null, as: null }
  },

  copa: {
    selectedTeams: [],            // TeamObjects escolhidas no setup
    rounds: []                    // bracket: [[match, ...], [match], ...]
  },

  // UI state (não persistido em lógica de jogo, mas salvo para restaurar)
  editingIdx: null,
  currentTab: 'selecoes'
};

/* ---------- Persistência ---------- */
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return false;
    state = Object.assign(state, parsed);
    return true;
  } catch (e) { return false; }
}

/* ---------- Utilidades ---------- */
function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

let _toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

function clampScore(v) {
  if (v === '' || v === null || v === undefined) return null;
  const n = parseInt(v, 10);
  if (isNaN(n)) return null;
  return Math.max(0, Math.min(99, n));
}

/* ---------- HTML de ícone (bandeira/escudo) ---------- */
function teamIconHtml(team, size) {
  if (!team) return '';
  const big = size === 'big';
  if (team.type === 'selecao' && team.code) {
    return `<img class="${big ? 'flag-img big' : 'flag-img'}"
                 src="https://flagcdn.com/w80/${team.code}.png"
                 alt="" onerror="this.style.display='none'">`;
  }
  if (team.type === 'clube' && team.crest) {
    return `<img class="${big ? 'crest-img big' : 'crest-img'}"
                 src="${team.crest}"
                 alt="" onerror="this.style.visibility='hidden'">`;
  }
  return '';
}