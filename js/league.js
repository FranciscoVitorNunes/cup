/* ============================================================
   LÓGICA DO FORMATO "CAMPEONATO" (round-robin + final)
   ============================================================ */

function buildLeagueMatches() {
  const pairs = [[0, 1], [0, 2], [1, 2]];
  const matches = [];
  let id = 0;

  // Turno
  pairs.forEach(([h, a]) => matches.push({
    id: id++, round: 'Turno', home: h, away: a, hs: null, as: null
  }));

  // Returno (mando invertido)
  pairs.forEach(([h, a]) => matches.push({
    id: id++, round: 'Returno', home: a, away: h, hs: null, as: null
  }));

  return matches;
}

function computeStandings(players, matches) {
  const table = players.map((p, i) => ({
    idx: i,
    name: p.name,
    team: p.team,
    pts: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0,
    form: [],
    h2h: {}
  }));

  matches.forEach(m => {
    if (m.hs === null || m.as === null) return;
    const H = table[m.home], A = table[m.away];

    H.j++; A.j++;
    H.gp += m.hs; H.gc += m.as;
    A.gp += m.as; A.gc += m.hs;

    if (m.hs > m.as) {
      H.pts += 3; H.v++; A.d++;
      H.form.push('V'); A.form.push('D');
      H.h2h[m.away] = (H.h2h[m.away] || 0) + 3;
    } else if (m.hs < m.as) {
      A.pts += 3; A.v++; H.d++;
      A.form.push('V'); H.form.push('D');
      A.h2h[m.home] = (A.h2h[m.home] || 0) + 3;
    } else {
      H.pts++; A.pts++; H.e++; A.e++;
      H.form.push('E'); A.form.push('E');
      H.h2h[m.away] = (H.h2h[m.away] || 0) + 1;
      A.h2h[m.home] = (A.h2h[m.home] || 0) + 1;
    }
  });

  table.forEach(t => { t.sg = t.gp - t.gc; });

  // Ordenação: Pts → SG → GP → confronto direto → nome
  table.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.sg  !== a.sg)  return b.sg  - a.sg;
    if (b.gp  !== a.gp)  return b.gp  - a.gp;
    const h2hA = a.h2h[b.idx] || 0;
    const h2hB = b.h2h[a.idx] || 0;
    if (h2hB !== h2hA) return h2hB - h2hA;
    return a.name.localeCompare(b.name);
  });

  return table;
}

function allMatchesPlayed(matches) {
  return matches.every(m => m.hs !== null && m.as !== null);
}