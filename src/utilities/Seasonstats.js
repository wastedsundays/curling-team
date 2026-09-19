const isPlayedEnd = (end) => end.red !== "x" && end.blue !== "x";
const hasHammerData = (end) => end.hammer === "red" || end.hammer === "blue";
const isGamePlayed = (game) => game.coin_toss === "Win" || game.coin_toss === "Loss";

function getPlayedEnds(game) {
    return (game.ends || []).filter(isPlayedEnd);
}

function getGameTotals(game) {
    const ends = getPlayedEnds(game);
    const redTotal = ends.reduce((sum, e) => sum + (Number(e.red) || 0), 0);
    const blueTotal = ends.reduce((sum, e) => sum + (Number(e.blue) || 0), 0);
    return { redTotal, blueTotal };
}

function getEndScores(game, color) {
    return (game.ends || []).map((end) => end[color]);
}

// Win/Loss/Tie result from OUR perspective
function getGameResult(game) {
    const { redTotal, blueTotal } = getGameTotals(game);
    const usTotal = game.team_color === "red" ? redTotal : blueTotal;
    const themTotal = game.team_color === "red" ? blueTotal : redTotal;
    if (usTotal > themTotal) return "Win";
    if (usTotal < themTotal) return "Loss";
    if (usTotal === themTotal) return "Tie";
}

function tallyRecord(games) {
    const record = { wins: 0, losses: 0, ties: 0 };
    games.forEach((game) => {
        if (!isGamePlayed(game)) return undefined;
        const result = getGameResult(game);
        if (result === "Win") record.wins++;
        else if (result === "Loss") record.losses++;
        else if (result === "Tie") record.ties++;
    })
    return record;
}

function formatRecord({ wins, losses, ties }) {
    return ties > 0 ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`;
}

const pct = (num, den) => (den > 0 ? Math.round((num / den) *100) : null);

// hammer/force/steal stats

function calculateHammerStats(games) {
    let usHammerEnds = 0;
    let usHammerBigEnds = 0; // 2+ points with hammer
    let usHammerHeldEnds = 0; // opponent scores 0 against our hammer
    let oppHammerEnds = 0; 
    let forcedEnds = 0; // opponent scores 1 with hammer
    let stolenEnds = 0; // we scored without hammer

    games.forEach((game) => {
        const teamColor = game.team_color;
        if (teamColor !== "red" && teamColor !== "blue") return; // skip if no team color
        const oppColor = teamColor === "red" ? "blue" : "red";

        getPlayedEnds(game).forEach((end) => {
            if (!hasHammerData(end)) return; // skip if no hammer data

            const usScore = Number(end[teamColor]) || 0;
            const oppScore = Number(end[oppColor]) || 0;
            const usHadHammer = end.hammer === teamColor;
            
            if (usHadHammer) {
                usHammerEnds++;
                if (usScore >= 2) usHammerBigEnds++;
                if (oppScore === 0) usHammerHeldEnds++;
            } else {
                oppHammerEnds++;
                if (oppScore === 1) forcedEnds++;
                if (usScore > 0) stolenEnds++;
            }
        });
    });

    const hammerEfficiency = pct(usHammerBigEnds, usHammerEnds);
    const forceEfficiency = pct(forcedEnds, oppHammerEnds);
    const stealEfficiency = pct(stolenEnds, oppHammerEnds);
    const stealDefence = pct(usHammerHeldEnds, usHammerEnds);
    const hammerFactor = 
        hammerEfficiency !== null && stealDefence !== null ?
        hammerEfficiency - stealDefence : null;

    return { hammerEfficiency, forceEfficiency, stealEfficiency, stealDefence, hammerFactor };
}

// season-level roundup

function calculateCoinTossRecord(games) {
    const record = { wins: 0, losses: 0};
    games.forEach((game) => {
        if (game.coin_toss === "Win") record.wins++;
        else if (game.coin_toss === "Loss") record.losses++;
    });
    return `${record.wins}-${record.losses}`;
}

export function calculateSeasonStats(games) {
    const redGames = games.filter((g) => g.team_color === "red");
    const blueGames = games.filter((g) => g.team_color === "blue");
    const leagueGames = games.filter((g) => g.game_type === "league");
    const playoffGames = games.filter((g) => g.game_type === "playoffs");
    const bonspielsGames = games.filter((g) => g.game_type === "bonspiel");

    const hammerStats = calculateHammerStats(games);

    const redRecord = tallyRecord(redGames);
    const blueRecord = tallyRecord(blueGames);
    const leagueRecord = tallyRecord(leagueGames);
    const playoffRecord = tallyRecord(playoffGames);
    const bonspielsRecord = tallyRecord(bonspielsGames);

    return {
        redRockRecord: formatRecord(redRecord.wins, redRecord.losses, redRecord.ties),
        blueRockRecord: formatRecord(blueRecord.wins, blueRecord.losses, blueRecord.ties),
        leagueRecord: formatRecord(leagueRecord.wins, leagueRecord.losses, leagueRecord.ties),
        playoffRecord: formatRecord(playoffRecord.wins, playoffRecord.losses, playoffRecord.ties),
        bonspielsRecord: formatRecord(bonspielsRecord.wins, bonspielsRecord.losses, bonspielsRecord.ties),
        coinTossRecord: calculateCoinTossRecord(games),
        ...hammerStats,
    };
}

// for the results table

export function calculateRunningRecords(games) {
    const record = { wins: 0, losses: 0, ties: 0 };
    return games.map((game) => {
        if (!isGamePlayed(game)) return undefined;
        const result = getGameResult(game);
        if (result === "") return;
        if (result === "Win") record.wins++;
        else if (result === "Loss") record.losses++;
        else if (result === "Tie") record.ties++;
        return formatRecord(record.wins, record.losses, record.ties);
    });
}

export {  getGameResult, getGameTotals, isGamePlayed, getEndScores, hasHammerData, getPlayedEnds };