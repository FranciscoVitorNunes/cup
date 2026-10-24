/* ============================================================
   RENDERIZAÇÃO (setup + torneio + modal)
   ============================================================ */

/* ============================================================
   SETUP
   ============================================================ */
function renderSetup() {
  document.getElementById('setup-section').classList.remove('hidden');
  document.getElementById('tournament').classList.add('hidden');

  document.querySelectorAll('.format-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.format === state.format);
  });

  document.getElementById('campeonato-setup').classList.toggle('hidden', state.format !== 'campeonato');
  document.getElementById('copa-setup').classList.toggle('hidden', state.format !== 'copamundo');

  if (state.format === 'campeonato') renderPlayersSetup();
  else { renderCopaTeamGrid(); renderCopaCounter(); }

  updateStartButton();
}

/* ---------- Campeonato: cards de jogador ---------- */
function renderPlayersSetup() {
  const container = document.getElementById('players-setup');
  container.innerHTML = '';
  for (let i = 0; i < 3; i++) container.appendChild(buildPlayerCard(i));
}

function buildPlayerCard(i) {
  const player = state.campeonato.players[i] || { name: '', team: null };
  const team = player.team;

  const icon = team ? teamIconHtml(team) : `<span style="font-size:1.8em">❓</span>`;
  const teamInfo = team
    ? `<div class="tp-name">${escapeHtml(team.name)}</div>
       <div class="tp-sub">${team.type === 'selecao' ? 'Seleção' : 'Clube'}</div>`
    : `<div class="tp-name">Escolher time</div>
       <div class="tp-sub">Clique para escolher</div>`;

  const div = document.createElement('div');
  div.className = 'player-input';
  div.innerHTML = `
    <label>Jogador ${i + 1}</label>
    <input type="text" id="p${i}name" placeholder="Nome do jogador" maxlength="20"
           value="${escapeHtml(player.name)}"
           oninput="updatePlayerName(${i}, this.value)">
    <button class="team-picker-btn" onclick="openTeamModal(${i})">
      ${icon}
      <div class="tp-info">${teamInfo}</div>
      <span class="tp-chevron">›</span>
    </button>
  `;
  return div;
}

/* ---------- Copa: grid de seleções + contador ---------- */
function renderCopaTeamGrid() {
  const grid = document.getElementById('copa-team-grid');
  grid.innerHTML = '';
  const selected = new Set(state.copa.selectedTeams.map(t => t.name));

  SELECOES.forEach(team => {
    const btn = document.createElement('button');
    btn.className = 'team-item' + (selected.has(team.name) ? ' selected' : '');
    btn.onclick = () => toggleCopaTeam(team);
    btn.innerHTML = `
      <img class="flag-img" src="https://flagcdn.com/w80/${team.code}.png"
           alt="" onerror="this.style.display='none'">
      <span class="ti-name">${escapeHtml(team.name)}</span>
    `;
    grid.appendChild(btn);
  });
}

function renderCopaCounter() {
  const n = state.copa.selectedTeams.length;
  const el = document.getElementById('copa-counter');
  el.textContent = `${n} seleç${n === 1 ? 'ão' : 'ões'} selecionada${n === 1 ? '' : 's'}`;
  el.classList.toggle('valid',   isValidTeamCount(n));
  el.classList.toggle('invalid', n > 0 && !isValidTeamCount(n));
}

/* ============================================================
   MODAL DE TIME (só campeonato)
   ============================================================ */
function openTeamModal(idx) {
  state.editingIdx = idx;
  document.getElementById('modal-title').textContent = `Escolher time — Jogador ${idx + 1}`;
  document.getElementById('teamModal').classList.add('show');
  document.getElementById('teamSearch').value = '';
  renderTeamGrid();
}

function closeTeamModal() {
  document.getElementById('teamModal').classList.remove('show');
  state.editingIdx = null;
}

function switchTab(tab) {
  state.currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  renderTeamGrid();
}

function filterTeams() { renderTeamGrid(); }

function renderTeamGrid() {
  const grid = document.getElementById('teamGrid');
  const search = (document.getElementById('teamSearch').value || '').toLowerCase().trim();
  grid.innerHTML = '';

  const list = state.currentTab === 'selecoes' ? SELECOES : CLUBES;
  const filtered = list.filter(t =>
    !search ||
    t.name.toLowerCase().includes(search) ||
    (t.league || '').toLowerCase().includes(search)
  );

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-dim);padding:30px">
      Nenhum time encontrado</div>`;
    return;
  }

  filtered.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'team-item';
    btn.onclick = () => pickTeam(t);
    btn.innerHTML = state.currentTab === 'selecoes'
      ? `<img class="flag-img" src="https://flagcdn.com/w80/${t.code}.png"
              alt="" onerror="this.style.display='none'">
         <span class="ti-name">${escapeHtml(t.name)}</span>`
      : `<img class="crest-img" src="${t.crest}"
              alt="" onerror="this.style.visibility='hidden'">
         <span class="ti-name">${escapeHtml(t.name)}</span>`;
    grid.appendChild(btn);
  });
}

/* ============================================================
   TORNEIO — campeonato
   ============================================================ */
function renderCampeonatoTournament() {
  document.getElementById('tournament').innerHTML = `
    <section>
      <h2><span class="icon">📅</span> Jogos — Turno e Returno</h2>
      <div id="league-matches"></div>
    </section>
    <section>
      <h2><span class="icon">📊</span> Classificação</h2>
      <div id="league-standings"></div>
    </section>
    <section>
      <h2><span class="icon">🏆</span> Final</h2>
      <div id="league-final-section"></div>
    </section>
    <section>
      <div class="actions">
        <button class="btn-secondary btn-sm" onclick="resetScores()">🔄 Zerar Placares</button>
        <button class="btn-secondary btn-sm" onclick="resetAll()">🗑️ Novo Torneio</button>
        <button class="btn-secondary btn-sm" onclick="exportData()">📋 Exportar Resultados</button>
      </div>
    </section>
  `;
  renderLeagueMatches();
  renderLeagueStandings();
  renderLeagueFinal();
}

function renderLeagueMatches() {
  const container = document.getElementById('league-matches');
  container.innerHTML = '';

  ['Turno', 'Returno'].forEach(roundName => {
    const matches = state.campeonato.matches.filter(m => m.round === roundName);
    if (!matches.length) return;

    const title = document.createElement('div');
    title.className = 'round-title';
    title.textContent = roundName;
    container.appendChild(title);

    matches.forEach(m => container.appendChild(buildLeagueMatchEl(m)));
  });
}

function buildLeagueMatchEl(m) {
  const H = state.campeonato.players[m.home];
  const A = state.campeonato.players[m.away];

  const div = document.createElement('div');
  div.className = 'match';
  div.innerHTML = `
    <div class="match-team home">
      ${teamIconHtml(H.team)}
      <div class="mt-text">
        <div class="pname">${escapeHtml(H.name)}</div>
        <div class="tname">${escapeHtml(H.team.name)}</div>
      </div>
    </div>
    <div class="score-inputs">
      <input type="number" min="0" max="99" value="${m.hs ?? ''}"
             oninput="setLeagueScore(${m.id}, 'hs', this.value)">
      <span class="x">×</span>
      <input type="number" min="0" max="99" value="${m.as ?? ''}"
             oninput="setLeagueScore(${m.id}, 'as', this.value)">
    </div>
    <div class="match-team away">
      <div class="mt-text">
        <div class="pname">${escapeHtml(A.name)}</div>
        <div class="tname">${escapeHtml(A.team.name)}</div>
      </div>
      ${teamIconHtml(A.team)}
    </div>
  `;
  return div;
}

function renderLeagueStandings() {
  const container = document.getElementById('league-standings');
  const standings = computeStandings(state.campeonato.players, state.campeonato.matches);

  const rows = standings.map((t, i) => {
    const sgClass = t.sg > 0 ? 'sg-pos' : t.sg < 0 ? 'sg-neg' : 'sg-zero';
    const sgText  = t.sg > 0 ? `+${t.sg}` : t.sg;
    const form = t.form.slice(-5).map(f => `<span class="dot ${f}">${f}</span>`).join('');

    return `
      <tr>
        <td><span class="pos-badge pos-${i + 1}">${i + 1}</span></td>
        <td class="left">
          <div class="team-cell">
            ${teamIconHtml(t.team)}
            <div>
              <div class="pname">${escapeHtml(t.name)}</div>
              <div class="tname">${escapeHtml(t.team.name)}</div>
            </div>
          </div>
        </td>
        <td class="pts">${t.pts}</td>
        <td>${t.j}</td><td>${t.v}</td><td>${t.e}</td><td>${t.d}</td>
        <td>${t.gp}</td><td>${t.gc}</td>
        <td class="${sgClass}">${sgText}</td>
        <td class="form-col"><div class="form-dots">${form || '—'}</div></td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table>
      <thead><tr>
        <th style="width:40px">#</th>
        <th class="left">Jogador</th>
        <th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th>
        <th>GP</th><th>GC</th><th>SG</th>
        <th class="form-col">Forma</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderLeagueFinal() {
  const container = document.getElementById('league-final-section');

  if (!allMatchesPlayed(state.campeonato.matches)) {
    const remaining = state.campeonato.matches.filter(m => m.hs === null || m.as === null).length;
    container.innerHTML = `<div class="pending">⏳ Faltam <strong>${remaining}</strong> jogo(s) para definir os finalistas.</div>`;
    return;
  }

  const standings = computeStandings(state.campeonato.players, state.campeonato.matches);
  state.campeonato.final.home = standings[0].idx;
  state.campeonato.final.away = standings[1].idx;

  container.innerHTML = buildLeagueFinalHTML();
}

function buildLeagueFinalHTML() {
  const f = state.campeonato.final;
  if (f.home === null || f.away === null) {
    return `<div class="pending">⏳ Aguardando definição dos finalistas.</div>`;
  }

  const H = state.campeonato.players[f.home];
  const A = state.campeonato.players[f.away];

  return `
    <div class="final-box">
      <div class="final-title">🏆 Grande Final 🏆</div>
      <div class="final-matchup">
        <div class="final-team">
          <div class="label">1º Lugar</div>
          ${teamIconHtml(H.team, 'big')}
          <div class="name">${escapeHtml(H.name)}</div>
          <div class="team">${escapeHtml(H.team.name)}</div>
        </div>
        <div class="final-vs">VS</div>
        <div class="final-team">
          <div class="label">2º Lugar</div>
          ${teamIconHtml(A.team, 'big')}
          <div class="name">${escapeHtml(A.name)}</div>
          <div class="team">${escapeHtml(A.team.name)}</div>
        </div>
      </div>
      <div class="final-score">
        <input type="number" min="0" max="99" value="${f.hs ?? ''}"
               oninput="setLeagueFinalScore('hs', this.value)">
        <span class="x">×</span>
        <input type="number" min="0" max="99" value="${f.as ?? ''}"
               oninput="setLeagueFinalScore('as', this.value)">
      </div>
      <div id="league-champion">${buildLeagueChampionHTML()}</div>
    </div>
  `;
}

/* ============================================================
   PÓDIO (compartilhado campeonato + copa)
   ============================================================ */

/**
 * Renderiza o pódio.
 * @param {Array} places — [{ name, team, medal }] em ordem [1º, 2º, 3º]
 *                         (o 3º pode não existir)
 * @param {string} [subtitle]
 * @returns {string} HTML
 */
function renderPodium(places, subtitle) {
  if (!places || places.length === 0) {
    return `
      <div class="podium-section">
        <div class="podium-title">🏆 Pódio 🏆</div>
        <div class="pending" style="text-align:center;padding:20px">
          ⏳ O pódio será revelado quando o torneio terminar.
        </div>
      </div>
    `;
  }

  const hasThree = places.length >= 3;
  const [p1, p2, p3] = places;

  // Ordem visual: 2º à esquerda, 1º no centro, 3º à direita
  const order = hasThree
    ? [{ place: p2, cls: 'p2' }, { place: p1, cls: 'p1' }, { place: p3, cls: 'p3' }]
    : [{ place: p2, cls: 'p2' }, { place: p1, cls: 'p1' }];

  const medals = { p1: '🥇', p2: '🥈', p3: '🥉' };

  const placesHtml = order.map(({ place, cls }) => {
    if (!place) return '';
    const teamName = place.team ? place.team.name : '';
    return `
      <div class="podium-place ${cls}">
        <div class="medal">${medals[cls]}</div>
        <div class="avatar">${teamIconHtml(place.team, 'big')}</div>
        <div class="pname">${escapeHtml(place.name)}</div>
        <div class="tname">${escapeHtml(teamName)}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="podium-section">
      <div class="podium-title">🏆 Pódio 🏆</div>
      ${subtitle ? `<div class="pending" style="text-align:center;margin-bottom:12px">${escapeHtml(subtitle)}</div>` : ''}
      <div class="podium-podium">${placesHtml}</div>
    </div>
  `;
}

function buildLeagueChampionHTML() {
  const f = state.campeonato.final;
  if (f.hs === null || f.as === null) return '';

  if (f.hs === f.as) {
    return `<div class="champion">
      <div class="trophy">⚖️</div>
      <div class="title">Empate na Final</div>
      <div class="name">Decidam nos pênaltis!</div>
      <div class="team">Ajustem o placar após a decisão</div>
    </div>`;
  }

  // Monta o pódio: 1º e 2º vêm da final, 3º vem da classificação geral
  const winnerIdx = f.hs > f.as ? f.home : f.away;
  const loserIdx  = f.hs > f.as ? f.away : f.home;

  const standings = computeStandings(state.campeonato.players, state.campeonato.matches);
  const third = standings.find(t => t.idx !== winnerIdx && t.idx !== loserIdx);

  const W = state.campeonato.players[winnerIdx];
  const L = state.campeonato.players[loserIdx];
  const T = third ? state.campeonato.players[third.idx] : null;

  const places = [
    { name: W.name, team: W.team },
    { name: L.name, team: L.team },
  ];
  if (T) places.push({ name: T.name, team: T.team });

  return renderPodium(places, 'Campeonato — Resultado Final');
}

/* ============================================================
   TORNEIO — copa do mundo
   ============================================================ */
function renderCopaTournament() {
  const totalRounds = state.copa.rounds.length;

  const roundsHtml = state.copa.rounds.map((_, ri) => `
    <div class="bracket-round">
      <h3>${getRoundName(ri, totalRounds)}</h3>
      <div id="round-${ri}"></div>
    </div>
  `).join('');

  document.getElementById('tournament').innerHTML = `
    <section>
      <h2><span class="icon">🌍</span> Chaveamento — Copa do Mundo</h2>
      ${roundsHtml}
      <div id="copa-champion"></div>
    </section>
    <section>
      <div class="actions">
        <button class="btn-secondary btn-sm" onclick="resetScores()">🔄 Zerar Placares</button>
        <button class="btn-secondary btn-sm" onclick="resetAll()">🗑️ Novo Torneio</button>
        <button class="btn-secondary btn-sm" onclick="exportData()">📋 Exportar Resultados</button>
      </div>
    </section>
  `;

  // Preenche cada round
  state.copa.rounds.forEach((round, ri) => {
    const roundEl = document.getElementById(`round-${ri}`);
    round.forEach((m, mi) => roundEl.appendChild(buildBracketMatchEl(m, ri, mi)));
  });

  renderCopaChampion();
}

function buildBracketMatchEl(match, roundIdx, matchIdx) {
  const teamA = match.teamA;
  const teamB = match.teamB;
  const disabled = (!teamA || !teamB) ? 'disabled' : '';

  const teamAHtml = teamA
    ? `<div class="match-team home">
         ${teamIconHtml(teamA)}
         <div class="mt-text"><div class="pname">${escapeHtml(teamA.name)}</div></div>
       </div>`
    : `<div class="match-team home placeholder">A definir</div>`;

  const teamBHtml = teamB
    ? `<div class="match-team away">
         <div class="mt-text"><div class="pname">${escapeHtml(teamB.name)}</div></div>
         ${teamIconHtml(teamB)}
       </div>`
    : `<div class="match-team away placeholder">A definir</div>`;

  const tieWarning = (match.scoreA !== null && match.scoreB !== null && match.scoreA === match.scoreB)
    ? `<div class="pending" style="margin-top:-4px;margin-bottom:8px;font-size:0.8em">
         ⚖️ Empate — decidam nos pênaltis e ajustem o placar</div>`
    : '';

  const div = document.createElement('div');
  div.innerHTML = `
    <div class="match">
      ${teamAHtml}
      <div class="score-inputs">
        <input type="number" min="0" max="99" value="${match.scoreA ?? ''}"
               ${disabled}
               oninput="setCopaScore(${roundIdx}, ${matchIdx}, 'A', this.value)">
        <span class="x">×</span>
        <input type="number" min="0" max="99" value="${match.scoreB ?? ''}"
               ${disabled}
               oninput="setCopaScore(${roundIdx}, ${matchIdx}, 'B', this.value)">
      </div>
      ${teamBHtml}
    </div>
    ${tieWarning}
  `;
  return div.firstElementChild && tieWarning
    ? (() => { const w = document.createElement('div'); w.appendChild(div.firstElementChild); return w; })()
    : div.firstElementChild;
}

function renderCopaChampion() {
  const el = document.getElementById('copa-champion');
  if (!el) return;

  const champ = getChampion(state.copa.rounds);
  if (!champ) { el.innerHTML = ''; return; }

  // Na copa só temos o campeão definido pelo bracket.
  // Se quiser 2º e 3º, precisaria de disputa de 3º lugar.
  // Por ora, só o 1º:
  const places = [
    { name: 'Campeão', team: champ },
  ];

  el.innerHTML = renderPodium(places, 'Copa do Mundo — Resultado Final');
}

/* ============================================================
   TORNEIO — dispatcher
   ============================================================ */
function renderTournament() {
  document.getElementById('setup-section').classList.add('hidden');
  document.getElementById('tournament').classList.remove('hidden');

  if (state.format === 'campeonato') renderCampeonatoTournament();
  else renderCopaTournament();
}