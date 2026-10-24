/* ============================================================
   LÓGICA DO FORMATO "COPA DO MUNDO" (mata-mata + sorteio)
   ============================================================ */

const VALID_TEAM_COUNTS = [2, 4, 8, 16, 32];

function isValidTeamCount(n) {
  return VALID_TEAM_COUNTS.includes(n);
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Cria a estrutura de rounds do mata-mata.
 * rounds[0] = primeira fase (oitavas, quartas, semi, etc.)
 * rounds[last] = final
 */
function createBracket(teams) {
  const shuffled = shuffleArray(teams);
  const n = shuffled.length;
  const numRounds = Math.log2(n);   // 1 → final, 2 → semi+final, etc.
  const rounds = [];

  // Rodada 0: confrontos sorteados
  const firstRound = [];
  for (let i = 0; i < n; i += 2) {
    firstRound.push({
      id: `r0-m${i / 2}`,
      teamA: shuffled[i],
      teamB: shuffled[i + 1],
      scoreA: null,
      scoreB: null,
      winner: null
    });
  }
  rounds.push(firstRound);

  // Rodadas subsequentes: placeholders vazios
  for (let r = 1; r < numRounds; r++) {
    const round = [];
    const matchesInRound = n / Math.pow(2, r + 1);
    for (let m = 0; m < matchesInRound; m++) {
      round.push({
        id: `r${r}-m${m}`,
        teamA: null,
        teamB: null,
        scoreA: null,
        scoreB: null,
        winner: null
      });
    }
    rounds.push(round);
  }

  return rounds;
}

function getRoundName(roundIdx, totalRounds) {
  const remaining = totalRounds - roundIdx;
  const names = {
    1: 'Final',
    2: 'Semifinal',
    3: 'Quartas de Final',
    4: 'Oitavas de Final',
    5: 'Fase de 32'
  };
  return names[remaining] || `Rodada ${roundIdx + 1}`;
}

function calculateWinner(match) {
  if (match.scoreA === null || match.scoreB === null) return null;
  if (match.scoreA > match.scoreB) return match.teamA;
  if (match.scoreB > match.scoreA) return match.teamB;
  return null; // empate → não avança
}

/**
 * Propaga o vencedor de (roundIdx, matchIdx) para a próxima fase.
 * Se o time que ocupa a vaga mudou, limpa o placar e o vencedor
 * da partida seguinte, e propaga em cascata.
 */
function propagateFromMatch(rounds, roundIdx, matchIdx) {
  if (roundIdx >= rounds.length - 1) return; // é a final, nada a propagar

  const match = rounds[roundIdx][matchIdx];
  const nextRoundIdx = roundIdx + 1;
  const nextMatchIdx = Math.floor(matchIdx / 2);
  const slot = matchIdx % 2 === 0 ? 'teamA' : 'teamB';
  const nextMatch = rounds[nextRoundIdx][nextMatchIdx];

  if (nextMatch[slot] === match.winner) return; // nada mudou

  nextMatch[slot] = match.winner;
  nextMatch.scoreA = null;
  nextMatch.scoreB = null;
  nextMatch.winner = null;

  propagateFromMatch(rounds, nextRoundIdx, nextMatchIdx);
}

function getChampion(rounds) {
  if (!rounds.length) return null;
  const finalRound = rounds[rounds.length - 1];
  return finalRound[0]?.winner || null;
}