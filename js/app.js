/* ============================================================
   ORQUESTRAÇÃO, EVENTOS E INICIALIZAÇÃO
   ============================================================ */

/* ---------- Setup ---------- */
function selectFormat(fmt) {
  state.format = fmt;
  saveState();
  renderSetup();
}

function updatePlayerName(idx, value) {
  if (!state.campeonato.players[idx]) {
    state.campeonato.players[idx] = { name: value, team: null };
  } else {
    state.campeonato.players[idx].name = value;
  }
  saveState();
  updateStartButton();
}

function toggleCopaTeam(teamData) {
  const teams = state.copa.selectedTeams;
  const idx = teams.findIndex(t => t.name === teamData.name);

  if (idx >= 0) teams.splice(idx, 1);
  else {
    if (teams.length >= 32) { showToast('Máximo de 32 seleções'); return; }
    teams.push({ type: 'selecao', name: teamData.name, code: teamData.code });
  }

  renderCopaTeamGrid();
  renderCopaCounter();
  updateStartButton();
  saveState();
}

function pickTeam(t) {
  const idx = state.editingIdx;
  if (idx === null) return;

  if (!state.campeonato.players[idx]) {
    state.campeonato.players[idx] = { name: `Jogador ${idx + 1}`, team: null };
  }

  state.campeonato.players[idx].team = state.currentTab === 'selecoes'
    ? { type: 'selecao', name: t.name, code: t.code }
    : { type: 'clube',   name: t.name, crest: t.crest };

  saveState();
  renderPlayersSetup();
  closeTeamModal();
  showToast(`✅ ${t.name} escolhido!`);
}

function updateStartButton() {
  const btn = document.getElementById('startBtn');
  let ok = false, msg = '';

  if (state.format === 'campeonato') {
    ok = state.campeonato.players.length === 3 &&
         state.campeonato.players.every(p => p && p.team);
    msg = ok ? '🚀 Iniciar Torneio' : '⚠️ Escolha os 3 times para começar';
  } else {
    ok = isValidTeamCount(state.copa.selectedTeams.length);
    msg = ok ? '🚀 Iniciar Torneio' : '⚠️ Selecione 2, 4, 8, 16 ou 32 seleções';
  }

  btn.disabled = !ok;
  btn.textContent = msg;
}

function startTournament() {
  if (state.format === 'campeonato') {
    if (!state.campeonato.players.every(p => p && p.team)) {
      showToast('Escolha os 3 times primeiro'); return;
    }
    // Preenche nomes padrão
    state.campeonato.players.forEach((p, i) => {
      if (!p.name || !p.name.trim()) p.name = `Jogador ${i + 1}`;
    });
    state.campeonato.matches = buildLeagueMatches();
    state.campeonato.final = { home: null, away: null, hs: null, as: null };
  } else {
    if (!isValidTeamCount(state.copa.selectedTeams.length)) {
      showToast('Selecione 2, 4, 8, 16 ou 32 seleções'); return;
    }
    state.copa.rounds = createBracket(state.copa.selectedTeams);
  }

  state.phase = 'tournament';
  saveState();
  renderTournament();
  showToast('Torneio iniciado! Boa sorte 🍀');
}

/* ---------- Inputs de placar ---------- */
function setLeagueScore(matchId, field, value) {
  const m = state.campeonato.matches.find(x => x.id === matchId);
  if (!m) return;
  m[field] = clampScore(value);

  // Re-renderiza só o que depende dos placares (tabela e final)
  renderLeagueStandings();
  renderLeagueFinal();
  saveState();
}

function setLeagueFinalScore(field, value) {
  state.campeonato.final[field] = clampScore(value);
  // Atualiza só o bloco do campeão — preserva foco do input
  const el = document.getElementById('league-champion');
  if (el) el.innerHTML = buildLeagueChampionHTML();
  saveState();
}

function setCopaScore(roundIdx, matchIdx, field, value) {
  const match = state.copa.rounds[roundIdx][matchIdx];
  match[field === 'A' ? 'scoreA' : 'scoreB'] = clampScore(value);

  // Recalcula vencedor e propaga
  match.winner = calculateWinner(match);
  propagateFromMatch(state.copa.rounds, roundIdx, matchIdx);

  // Re-renderiza apenas rounds posteriores (não o que o usuário está editando)
  for (let ri = roundIdx + 1; ri < state.copa.rounds.length; ri++) {
    const roundEl = document.getElementById(`round-${ri}`);
    if (!roundEl) continue;
    roundEl.innerHTML = '';
    state.copa.rounds[ri].forEach((m, mi) => roundEl.appendChild(buildBracketMatchEl(m, ri, mi)));
  }

  renderCopaChampion();
  saveState();
}

/* ---------- Ações globais ---------- */
function resetScores() {
  if (!confirm('Zerar todos os placares? Os jogadores e times serão mantidos.')) return;

  if (state.format === 'campeonato') {
    state.campeonato.matches.forEach(m => { m.hs = null; m.as = null; });
    state.campeonato.final.hs = null;
    state.campeonato.final.as = null;
    renderCampeonatoTournament();
  } else {
    state.copa.rounds.forEach((round, ri) => {
      round.forEach(m => {
        if (ri > 0) { m.teamA = null; m.teamB = null; }
        m.scoreA = null; m.scoreB = null; m.winner = null;
      });
    });
    renderCopaTournament();
  }

  saveState();
  showToast('Placares zerados.');
}

function resetAll() {
  if (!confirm('Começar um novo torneio? Todos os dados serão apagados.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function exportData() {
  const lines = ['=== COPA DOS AMIGOS — eFootball ===', ''];

  if (state.format === 'campeonato') {
    const standings = computeStandings(state.campeonato.players, state.campeonato.matches);
    lines.push('--- CAMPEONATO (3 jogadores) ---', '', 'Classificação:');
    standings.forEach((t, i) =>
      lines.push(`${i + 1}. ${t.name} (${t.team.name}) — ${t.pts}pts | J:${t.j} V:${t.v} E:${t.e} D:${t.d} | GP:${t.gp} GC:${t.gc} SG:${t.sg}`)
    );
    lines.push('', 'Jogos:');
    state.campeonato.matches.forEach(m => {
      const H = state.campeonato.players[m.home], A = state.campeonato.players[m.away];
      lines.push(`[${m.round}] ${H.name} ${m.hs ?? '-'} x ${m.as ?? '-'} ${A.name}`);
    });
    if (state.campeonato.final.home !== null) {
      const H = state.campeonato.players[state.campeonato.final.home];
      const A = state.campeonato.players[state.campeonato.final.away];
      lines.push('', 'Final:',
        `${H.name} ${state.campeonato.final.hs ?? '-'} x ${state.campeonato.final.as ?? '-'} ${A.name}`);
    }
  } else {
    lines.push('--- COPA DO MUNDO (mata-mata) ---');
    state.copa.rounds.forEach((round, ri) => {
      lines.push('', `${getRoundName(ri, state.copa.rounds.length)}:`);
      round.forEach(m => {
        const a = m.teamA ? m.teamA.name : '?';
        const b = m.teamB ? m.teamB.name : '?';
        lines.push(`${a} ${m.scoreA ?? '-'} x ${m.scoreB ?? '-'} ${b}`);
      });
    });
    const champ = getChampion(state.copa.rounds);
    if (champ) lines.push('', `🏆 Campeão: ${champ.name}`);
  }

  copyToClipboard(lines.join('\n'));
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showToast('📋 Resultados copiados!'))
    .catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('📋 Resultados copiados!');
    });
}

/* ---------- Init ---------- */
function hasTournamentData() {
  return state.format === 'campeonato'
    ? state.campeonato.matches.length > 0
    : state.copa.rounds.length > 0;
}

(function init() {
  const loaded = loadState();

  if (loaded && state.phase === 'tournament' && hasTournamentData()) {
    renderTournament();
  } else {
    state.phase = 'setup';
    // Garante 3 slots no campeonato
    if (!Array.isArray(state.campeonato.players) || state.campeonato.players.length !== 3) {
      state.campeonato.players = [{ name: '', team: null }, { name: '', team: null }, { name: '', team: null }];
    }
    renderSetup();
  }

  // Fecha o modal clicando no overlay
  document.getElementById('teamModal').addEventListener('click', e => {
    if (e.target.id === 'teamModal') closeTeamModal();
  });
})();