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
  { name: 'Braga',             league: 'Liga Portugal', crest: 'https://imgs.search.brave.com/OflfQmNCR2ir1errGFUZfhlz0RIOfHZw0ykv2tAUBso/rs:fit:100:100:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcGktc3BvcnRz/LmlvL2Zvb3RiYWxs/L3RlYW1zLzIxNy5w/bmc' },

  // Brasileirão Série A
  { name: 'Flamengo',          league: 'Brasileirão',   crest: 'https://crests.football-data.org/1783.png' },
  { name: 'Palmeiras',         league: 'Brasileirão',   crest: 'https://crests.football-data.org/1769.png' },
  { name: 'Corinthians',       league: 'Brasileirão',   crest: 'https://crests.football-data.org/1779.png' },
  { name: 'São Paulo',         league: 'Brasileirão',   crest: 'https://crests.football-data.org/1776.png' },
  { name: 'Fluminense',        league: 'Brasileirão',   crest: 'https://crests.football-data.org/1765.png' },
  { name: 'Vasco',             league: 'Brasileirão',   crest: 'https://crests.football-data.org/1780.png' },
  { name: 'Botafogo',          league: 'Brasileirão',   crest: 'https://crests.football-data.org/1770.png' },
  { name: 'Cruzeiro',          league: 'Brasileirão',   crest: 'https://crests.football-data.org/1771.png' },
  { name: 'Atlético-MG',       league: 'Brasileirão',   crest: 'https://crests.football-data.org/1766.png' },
  { name: 'Grêmio',            league: 'Brasileirão',   crest: 'https://crests.football-data.org/1767.png' },
  { name: 'Internacional',     league: 'Brasileirão',   crest: 'https://imgs.search.brave.com/jmtMvamuW2bBlVwHO5A_cZP7Az6tWts03QqvVyLVBHU/rs:fit:100:100:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcGktc3BvcnRz/LmlvL2Zvb3RiYWxs/L3RlYW1zLzExOS5w/bmc' },
  { name: 'Santos',            league: 'Brasileirão',   crest: 'https://imgs.search.brave.com/4ptf8C9kZ_sXtH-V7j22NP70udfMM8CuHKQcVsivgkY/rs:fit:100:100:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcGktc3BvcnRz/LmlvL2Zvb3RiYWxs/L3RlYW1zLzEyOC5w/bmc' },
  { name: 'Bahia',             league: 'Brasileirão',   crest: 'https://crests.football-data.org/1777.png' },
  { name: 'Vitória',           league: 'Brasileirão',   crest: 'https://crests.football-data.org/1782.png' },
  { name: 'Athletico-PR',      league: 'Brasileirão',   crest: 'https://crests.football-data.org/1768.png' },
  { name: 'Fortaleza',         league: 'Brasileirão',   crest: 'https://fortaleza1918.com.br/wp-content/uploads/2019/01/site-1-150x150.png' },

  // Outras ligas (licenciadas no eFootball)
  { name: 'Galatasaray',       league: 'Süper Lig',     crest: 'https://crests.football-data.org/612.png' },
  { name: 'Fenerbahçe',        league: 'Süper Lig',     crest: 'https://imgs.search.brave.com/LRdVLwUGWAWE4d5Xp6u9pmkkR7Bwo1M9KfnrJq8aKEU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/Yi53aWtpbWVkaWEu/b3JnL3dpa2lwZWRp/YS9lbi90aHVtYi8z/LzM5L0ZlbmVyYmFo/JUMzJUE3ZS5zdmcv/MTI4MHB4LUZlbmVy/YmFoJUMzJUE3ZS5z/dmcucG5nP3V0bV9z/b3VyY2U9ZW4ud2lr/aXBlZGlhLm9yZyZh/bXA7dXRtX2NhbXBh/aWduPWluZGV4JmFt/cDt1dG1fY29udGVu/dD10aHVtYm5haWw' },
  { name: 'Shakhtar Donetsk',  league: 'UPL',           crest: 'https://imgs.search.brave.com/IurkCnfs6TYZ0z-qQrFoXBTq6r-0Xi-T1h-baOtHQBU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90aHVt/Yi53aWtpbWVkaWEu/b3JnL3dpa2lwZWRp/YS9jb21tb25zL3Ro/dW1iLzMvMzgvJUQw/JUE0JUQwJTlBXyVE/MCVBOCVEMCVCMCVE/MSU4NSVEMSU4MiVE/MCVCMCVEMSU4MF8l/RDAlOTQlRDAlQkUl/RDAlQkQlRDAlQjUl/RDElODYlRDElOEMl/RDAlQkEuc3ZnLzk2/MHB4LSVEMCVBNCVE/MCU5QV8lRDAlQTgl/RDAlQjAlRDElODUl/RDElODIlRDAlQjAl/RDElODBfJUQwJTk0/JUQwJUJFJUQwJUJE/JUQwJUI1JUQxJTg2/JUQxJThDJUQwJUJB/LnN2Zy5wbmc_dXRt/X3NvdXJjZT1wdC53/aWtpcGVkaWEub3Jn/JmFtcDt1dG1fY2Ft/cGFpZ249aW5kZXgm/YW1wO3V0bV9jb250/ZW50PXRodW1ibmFp/bA' },
  { name: 'Celtic',            league: 'Scottish Prem', crest: 'https://crests.football-data.org/732.png' },
  { name: 'Rangers',           league: 'Scottish Prem', crest: 'https://crests.football-data.org/720.png' },
  { name: 'Al-Nassr',          league: 'Saudi Pro',     crest: 'https://imgs.search.brave.com/fL3OqphNMvzYb7GYJPoAFsJXNWzlp3sa8Ifx6vcSIow/rs:fit:100:100:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcGktc3BvcnRz/LmlvL2Zvb3RiYWxs/L3RlYW1zLzI5Mzku/cG5n'},
  { name: 'Al-Hilal',          league: 'Saudi Pro',     crest: 'https://imgs.search.brave.com/iAgfPscTtvxPVlr9ZVZNv8jqY-LOHch6QfpUFTjtVsc/rs:fit:100:100:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcGktc3BvcnRz/LmlvL2Zvb3RiYWxs/L3RlYW1zLzI5MzIu/cG5n'},
  { name: 'Al-Ittihad',        league: 'Saudi Pro',     crest: 'https://imgs.search.brave.com/QPFYq-W3VnFrvP98rc_Y_noODU7BAx7U2a51yvZfyss/rs:fit:100:100:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hcGktc3BvcnRz/LmlvL2Zvb3RiYWxs/L3RlYW1zLzI5Mzgu/cG5n'},
];