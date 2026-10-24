/* ============================================================
   BASE DE DADOS — eFootball 2026
   Organizada por confederação (seleções) e liga (clubes).
   Fácil adicionar/remover: cada time é uma linha.
   ============================================================ */

/* ---------- SELEÇÕES (divididas por confederação) ---------- */
const SELECOES = [
  // CONMEBOL (América do Sul)
  { name: 'Brasil',         code: 'br' },
  { name: 'Argentina',      code: 'ar' },
  { name: 'Uruguai',        code: 'uy' },
  { name: 'Colômbia',       code: 'co' },
  { name: 'Chile',          code: 'cl' },
  { name: 'Peru',           code: 'pe' },
  { name: 'Equador',        code: 'ec' },
  { name: 'Paraguai',       code: 'py' },
  { name: 'Venezuela',      code: 've' },
  { name: 'Bolívia',        code: 'bo' },

  // UEFA (Europa)
  { name: 'França',         code: 'fr' },
  { name: 'Alemanha',       code: 'de' },
  { name: 'Espanha',        code: 'es' },
  { name: 'Inglaterra',     code: 'gb-eng' },
  { name: 'Portugal',       code: 'pt' },
  { name: 'Itália',         code: 'it' },
  { name: 'Holanda',        code: 'nl' },
  { name: 'Bélgica',        code: 'be' },
  { name: 'Croácia',        code: 'hr' },
  { name: 'Suíça',          code: 'ch' },
  { name: 'Dinamarca',      code: 'dk' },
  { name: 'Suécia',         code: 'se' },
  { name: 'Polônia',        code: 'pl' },
  { name: 'Sérvia',         code: 'rs' },
  { name: 'Áustria',        code: 'at' },
  { name: 'Ucrânia',        code: 'ua' },
  { name: 'Turquia',        code: 'tr' },
  { name: 'Escócia',        code: 'gb-sct' },
  { name: 'País de Gales',  code: 'gb-wls' },
  { name: 'Irlanda',        code: 'ie' },
  { name: 'Noruega',        code: 'no' },
  { name: 'Tchéquia',       code: 'cz' },
  { name: 'Hungria',        code: 'hu' },
  { name: 'Grécia',         code: 'gr' },
  { name: 'Romênia',        code: 'ro' },
  { name: 'Eslováquia',     code: 'sk' },

  // CONCACAF (América do Norte/Central)
  { name: 'México',         code: 'mx' },
  { name: 'Estados Unidos', code: 'us' },
  { name: 'Canadá',         code: 'ca' },
  { name: 'Costa Rica',     code: 'cr' },
  { name: 'Jamaica',        code: 'jm' },
  { name: 'Panamá',         code: 'pa' },
  { name: 'Honduras',       code: 'hn' },

  // AFC (Ásia)
  { name: 'Japão',          code: 'jp' },
  { name: 'Coreia do Sul',  code: 'kr' },
  { name: 'Arábia Saudita', code: 'sa' },
  { name: 'Irã',            code: 'ir' },
  { name: 'Austrália',      code: 'au' },
  { name: 'Catar',          code: 'qa' },
  { name: 'Iraque',         code: 'iq' },
  { name: 'Emirados Árabes',code: 'ae' },
  { name: 'China',          code: 'cn' },

  // CAF (África)
  { name: 'Marrocos',       code: 'ma' },
  { name: 'Senegal',        code: 'sn' },
  { name: 'Egito',          code: 'eg' },
  { name: 'Argélia',        code: 'dz' },
  { name: 'Tunísia',        code: 'tn' },
  { name: 'Nigéria',        code: 'ng' },
  { name: 'Camarões',       code: 'cm' },
  { name: 'Gana',           code: 'gh' },
  { name: 'Costa do Marfim',code: 'ci' },
  { name: 'África do Sul',  code: 'za' },
];

/* ---------- CLUBES (por liga) ---------- */
const CLUBES = [
  // La Liga (Espanha)
  { name: 'Real Madrid',       league: 'La Liga',       crest: 'https://crests.football-data.org/86.png'  },
  { name: 'Barcelona',         league: 'La Liga',       crest: 'https://crests.football-data.org/81.png'  },
  { name: 'Atlético de Madrid',league: 'La Liga',       crest: 'https://crests.football-data.org/78.png'  },
  { name: 'Sevilla',           league: 'La Liga',       crest: 'https://crests.football-data.org/559.png' },
  { name: 'Real Betis',        league: 'La Liga',       crest: 'https://crests.football-data.org/90.png'  },
  { name: 'Real Sociedad',     league: 'La Liga',       crest: 'https://crests.football-data.org/92.png'  },
  { name: 'Athletic Bilbao',   league: 'La Liga',       crest: 'https://crests.football-data.org/77.png'  },
  { name: 'Valencia',          league: 'La Liga',       crest: 'https://crests.football-data.org/95.png'  },

  // Premier League (Inglaterra)
  { name: 'Manchester City',   league: 'Premier League',crest: 'https://crests.football-data.org/65.png'  },
  { name: 'Manchester United', league: 'Premier League',crest: 'https://crests.football-data.org/66.png'  },
  { name: 'Liverpool',         league: 'Premier League',crest: 'https://crests.football-data.org/64.png'  },
  { name: 'Chelsea',           league: 'Premier League',crest: 'https://crests.football-data.org/61.png'  },
  { name: 'Arsenal',           league: 'Premier League',crest: 'https://crests.football-data.org/57.png'  },
  { name: 'Tottenham',         league: 'Premier League',crest: 'https://crests.football-data.org/73.png'  },
  { name: 'Newcastle',         league: 'Premier League',crest: 'https://crests.football-data.org/67.png'  },
  { name: 'Aston Villa',       league: 'Premier League',crest: 'https://crests.football-data.org/58.png'  },
  { name: 'West Ham',          league: 'Premier League',crest: 'https://crests.football-data.org/563.png' },
  { name: 'Everton',           league: 'Premier League',crest: 'https://crests.football-data.org/62.png'  },

  // Serie A (Itália)
  { name: 'Juventus',          league: 'Serie A',       crest: 'https://crests.football-data.org/109.png' },
  { name: 'Inter de Milão',    league: 'Serie A',       crest: 'https://crests.football-data.org/108.png' },
  { name: 'Milan',             league: 'Serie A',       crest: 'https://crests.football-data.org/98.png'  },
  { name: 'Napoli',            league: 'Serie A',       crest: 'https://crests.football-data.org/113.png' },
  { name: 'Roma',              league: 'Serie A',       crest: 'https://crests.football-data.org/100.png' },
  { name: 'Lazio',             league: 'Serie A',       crest: 'https://crests.football-data.org/110.png' },
  { name: 'Atalanta',          league: 'Serie A',       crest: 'https://crests.football-data.org/102.png' },
  { name: 'Fiorentina',        league: 'Serie A',       crest: 'https://crests.football-data.org/99.png'  },

  // Bundesliga (Alemanha)
  { name: 'Bayern de Munique', league: 'Bundesliga',    crest: 'https://crests.football-data.org/5.png'   },
  { name: 'Borussia Dortmund', league: 'Bundesliga',    crest: 'https://crests.football-data.org/4.png'   },
  { name: 'RB Leipzig',        league: 'Bundesliga',    crest: 'https://crests.football-data.org/721.png' },
  { name: 'Bayer Leverkusen',  league: 'Bundesliga',    crest: 'https://crests.football-data.org/3.png'   },
  { name: 'Eintracht Frankfurt',league: 'Bundesliga',   crest: 'https://crests.football-data.org/19.png'  },
  { name: 'VfB Stuttgart',     league: 'Bundesliga',    crest: 'https://crests.football-data.org/10.png'  },

  // Ligue 1 (França)
  { name: 'PSG',               league: 'Ligue 1',       crest: 'https://crests.football-data.org/524.png' },
  { name: 'Marseille',         league: 'Ligue 1',       crest: 'https://crests.football-data.org/516.png' },
  { name: 'Lyon',              league: 'Ligue 1',       crest: 'https://crests.football-data.org/523.png' },
  { name: 'Monaco',            league: 'Ligue 1',       crest: 'https://crests.football-data.org/548.png' },
  { name: 'Lille',             league: 'Ligue 1',       crest: 'https://crests.football-data.org/521.png' },

  // Eredivisie (Holanda)
  { name: 'Ajax',              league: 'Eredivisie',    crest: 'https://crests.football-data.org/678.png' },
  { name: 'PSV',               league: 'Eredivisie',    crest: 'https://crests.football-data.org/674.png' },
  { name: 'Feyenoord',         league: 'Eredivisie',    crest: 'https://crests.football-data.org/675.png' },

  // Liga Portugal
  { name: 'Benfica',           league: 'Liga Portugal', crest: 'https://crests.football-data.org/1903.png'},
  { name: 'Porto',             league: 'Liga Portugal', crest: 'https://crests.football-data.org/503.png' },
  { name: 'Sporting',          league: 'Liga Portugal', crest: 'https://crests.football-data.org/498.png' },
  { name: 'Braga',             league: 'Liga Portugal', crest: 'https://crests.football-data.org/561.png' },

  // Brasileirão Série A
  { name: 'Flamengo',          league: 'Brasileirão',   crest: 'https://crests.football-data.org/1783.png' },
  { name: 'Palmeiras',         league: 'Brasileirão',   crest: 'https://crests.football-data.org/1769.png' },
  { name: 'Corinthians',       league: 'Brasileirão',   crest: 'https://crests.football-data.org/1776.png' },
  { name: 'São Paulo',         league: 'Brasileirão',   crest: 'https://crests.football-data.org/1770.png' },
  { name: 'Fluminense',        league: 'Brasileirão',   crest: 'https://crests.football-data.org/1781.png' },
  { name: 'Vasco',             league: 'Brasileirão',   crest: 'https://crests.football-data.org/1782.png' },
  { name: 'Botafogo',          league: 'Brasileirão',   crest: 'https://crests.football-data.org/1778.png' },
  { name: 'Cruzeiro',          league: 'Brasileirão',   crest: 'https://crests.football-data.org/1777.png' },
  { name: 'Atlético-MG',       league: 'Brasileirão',   crest: 'https://crests.football-data.org/1765.png' },
  { name: 'Grêmio',            league: 'Brasileirão',   crest: 'https://crests.football-data.org/1780.png' },
  { name: 'Internacional',     league: 'Brasileirão',   crest: 'https://crests.football-data.org/1775.png' },
  { name: 'Santos',            league: 'Brasileirão',   crest: 'https://crests.football-data.org/1771.png' },
  { name: 'Bahia',             league: 'Brasileirão',   crest: 'https://crests.football-data.org/1774.png' },
  { name: 'Athletico-PR',      league: 'Brasileirão',   crest: 'https://crests.football-data.org/1785.png' },
  { name: 'Fortaleza',         league: 'Brasileirão',   crest: 'https://crests.football-data.org/1784.png' },

  // Outras ligas (licenciadas no eFootball)
  { name: 'Galatasaray',       league: 'Süper Lig',     crest: 'https://crests.football-data.org/612.png' },
  { name: 'Fenerbahçe',        league: 'Süper Lig',     crest: 'https://crests.football-data.org/620.png' },
  { name: 'Shakhtar Donetsk',  league: 'UPL',           crest: 'https://crests.football-data.org/561.png' },
  { name: 'Celtic',            league: 'Scottish Prem', crest: 'https://crests.football-data.org/732.png' },
  { name: 'Rangers',           league: 'Scottish Prem', crest: 'https://crests.football-data.org/720.png' },
  { name: 'Al-Nassr',          league: 'Saudi Pro',     crest: 'https://crests.football-data.org/1086.png'},
  { name: 'Al-Hilal',          league: 'Saudi Pro',     crest: 'https://crests.football-data.org/1084.png'},
  { name: 'Al-Ittihad',        league: 'Saudi Pro',     crest: 'https://crests.football-data.org/1085.png'},
];