// Stats for the fancy stats dashboard page

import { getGameResult, getPlayedEnds, hasHammerData } from "./Seasonstats.js";


// Pulls games out of the seasons array, optionally filtering by seasonId
function collectGames(seasons, seasonId) {
    if (seasonId) {
        const season = seasons.find((s) => s.id === seasonId);
        return (season?.games ?? []).map((g) => ({ ...g, seasonId: season.id }));
    }
    return seasons.flatMap((s) => (s.games ?? []).map((g) => ({ ...g, seasonId: s.id })));
}

export function filterGames(seasons, filters = {}) {
    const { seasonId, opponent, rockColor } = filters;
    let games = collectGames(seasons, seasonId);

    if (opponent) {
        games = games.filter((g) => g.opponent === opponent);
    }
    if (rockColor) {
        games = games.filter((g) => g.team_color === rockColor);
    }

    return games.filter((g) => g.coin_toss === "Win" || g.coin_toss === "Loss"); // only include games with a coin toss result
}

// Flattens the games to one row per end, tagged for easy filtering

export function flattenEnds(games) {
    const rows = [];

    games.forEach((game) => {
        const teamColor = game.team_color;
        if (teamColor !=="red" && teamColor !== "blue") return; // skip if no team color
        const oppColor = teamColor === "red" ? "blue" : "red";

        getPlayedEnds(game).forEach((end, index) => {
            if (!hasHammerData(end)) return; // skip if no hammer data

            const usScore = Number(end[teamColor]) || 0;
            const oppScore = Number(end[oppColor]) || 0;
            const usHadHammer = end.hammer === teamColor;
            const isBlank = usScore === 0 && oppScore === 0;
            const isStolen = !usHadHammer && usScore > 0; //we scored without hammer
            const isScoredAgainstWithHammer = usHadHammer && oppScore > 0; //opponent scored against our hammer

            rows.push({
                gameId: game.id,
                seasonId: game.seasonId,
                opponent: game.opponent,
                gameType: game.game_type,
                teamColor,
                endNumber: end.end ?? index + 1,
                usScore,
                oppScore,
                usHadHammer,
                isBlank,
                isStolen,
                isScoredAgainstWithHammer,
            });
        });
    });

    return rows;
}

// Ratio helpers
const ratio = (num, den) => (den > 0 ? Number((num / den).toFixed(3)) : null);


// Hammer efficiency - we score 2+ with Hammer / All ends we have hammer (blanks not included)

export function calculateHammerEfficiency(ends) {
    const hammerEnds = ends.filter((e) => e.usHadHammer);
    const bigEnds = hammerEnds.filter((e) => e.usScore >= 2);
    const blankEnds = hammerEnds.filter((e) => e.isBlank);
    return ratio(bigEnds.length, hammerEnds.length - blankEnds.length);
}


// Force Efficiency - opponent scores 1 with hammer / Ends opponent has hammer, excluding blanks and steals

export function calculateForceEfficiency(ends) {
    const oppHammerEnds = ends.filter((e) => !e.usHadHammer);
    const oppScoredEnds = oppHammerEnds.filter((e) => !e.isBlank && !e.isStolen);
    const forcedEnds = oppScoredEnds.filter((e) => e.oppScore === 1);
    return ratio(forcedEnds.length, oppScoredEnds.length);
}

// Steal Efficiency - we score without hammer / Ends opponent has hammer (blanks included)
export function calculateStealEfficiency(ends) {
    const oppHammerEnds = ends.filter((e) => !e.usHadHammer);
    const stolenEnds = oppHammerEnds.filter((e) => e.isStolen);
    return ratio(stolenEnds.length, oppHammerEnds.length);
}

// Steal Defense - ends opp scores w/ our hammer / all ends we have hammer (blanks included)
export function calculateStealDefence(ends) {
    const usHammerEnds = ends.filter((e) => e.usHadHammer);
    const scoredAgainst = usHammerEnds.filter((e) => e.isScoredAgainstWithHammer);
    return ratio(scoredAgainst.length, usHammerEnds.length);
}

// Win percentage

export function calculateWinPercentage(games) {
    if (games.length === 0) return null;
    let wins = 0;
    let ties = 0;
    games.forEach((game) => {
        const result = getGameResult(game);
        if (result === "Win") wins++;
        else if (result === "Tie") ties++;
    });

    return Number(((wins * 2 + ties) / (games.length * 2)).toFixed(3));
}

// ---- headline bundle ------------------------------------------------------
 
// games/ends should already be filtered (via filterGames/flattenEnds above)
// before being passed in here.
export function calculateHeadlineStats(games, ends) {
    const hammerEfficiency = calculateHammerEfficiency(ends);
    const forceEfficiency = calculateForceEfficiency(ends);
    const stealEfficiency = calculateStealEfficiency(ends);
    const stealDefence = calculateStealDefence(ends);
    const winPercentage = calculateWinPercentage(games);
 
    const hammerFactor =
        hammerEfficiency !== null && stealDefence !== null
            ? Number((hammerEfficiency - stealDefence).toFixed(3))
            : null;
    const withoutHammerFactor =
        forceEfficiency !== null && stealEfficiency !== null
            ? Number((forceEfficiency + stealEfficiency).toFixed(3))
            : null;
    const combinedTeamIndex =
        hammerFactor !== null && withoutHammerFactor !== null
            ? Number((hammerFactor + withoutHammerFactor).toFixed(3))
            : null;
    const teamEfficiency =
        combinedTeamIndex !== null && winPercentage !== null
            ? Number((combinedTeamIndex + winPercentage).toFixed(3))
            : null;
 
    return {
        hammerEfficiency,
        forceEfficiency,
        stealEfficiency,
        stealDefence,
        hammerFactor,
        withoutHammerFactor,
        combinedTeamIndex,
        winPercentage,
        teamEfficiency,
    };
}
 
// Convenience: filters + flattens + computes the headline bundle in one call.
export function calculateDashboardStats(seasons, filters = {}) {
    const games = filterGames(seasons, filters);
    const ends = flattenEnds(games);
    return calculateHeadlineStats(games, ends);
}


// records & scoring

function tallyRecord(games) {
    const record = { wins: 0, losses: 0, ties: 0 };
    games.forEach((game) => {
        const result = getGameResult(game);
        if (result === "Win") record.wins++;
        else if (result === "Loss") record.losses++;
        else if (result === "Tie") record.ties++;
    });
    return record;
}

function formatRecord({wins, losses, ties}) {
    return ties > 0 ? `${wins}-${losses}-${ties}` : `${wins}-${losses}`;
}

function calculateCoinTossRecord(games) {
    let wins = 0;
    let losses = 0;
    games.forEach((game) => {
        if (game.coin_toss === "Win") wins++;
        else if (game.coin_toss === "Loss") losses++;   
    });
    return `${wins}-${losses}`;
}

//Which color had hammer in the first Played End of the game
function getFirstEndHammer(game) {
    return game.ends?.[0]?.hammer;
}

function calculateHammerFirstEndRecords(games) {
    const withHammer = games.filter((g) => getFirstEndHammer(g) === g.team_color);
    const withoutHammer = games.filter((g) => {
        const hammer = getFirstEndHammer(g);
        return hammer && hammer !== g.team_color;    
    });
    return {
        withHammerFirstEndRecord: formatRecord(tallyRecord(withHammer)),
        withoutHammerFirstEndRecord: formatRecord(tallyRecord(withoutHammer))
    }
}

// One row per played end, scoring only (no hammer requirement) - used for
// points-per-end and totals, which only need team_color to be backfilled.
export function flattenScoringEnds(games) {
    const rows = [];
    games.forEach((game) => {
        const teamColor = game.team_color;
        if (teamColor !== 'red' && teamColor !== 'blue') return;
        const oppColor = teamColor === 'red' ? 'blue' : 'red';
 
        getPlayedEnds(game).forEach((end, index) => {
            rows.push({
                gameId: game.id,
                seasonId: game.seasonId,
                opponent: game.opponent,
                gameType: game.game_type,
                teamColor,
                endNumber: end.end ?? index + 1,
                usScore: Number(end[teamColor]) || 0,
                oppScore: Number(end[oppColor]) || 0,
            });
        });
    });
    return rows;
}
 
// Points for/against broken out per end number (dynamic - covers extra ends
// beyond a standard 8, doesn't assume every game goes the same length).
export function calculatePointsPerEnd(scoringEnds) {
    const endNumbers = Array.from(new Set(scoringEnds.map((e) => e.endNumber))).sort((a, b) => a - b);
    return endNumbers.map((endNumber) => {
        const endsAtN = scoringEnds.filter((e) => e.endNumber === endNumber);
        const pointsFor = endsAtN.reduce((sum, e) => sum + e.usScore, 0);
        const pointsAgainst = endsAtN.reduce((sum, e) => sum + e.oppScore, 0);
        return {
            endNumber,
            pointsFor,
            pointsAgainst,
            endsPlayed: endsAtN.length,
            avgFor: endsAtN.length > 0 ? +(pointsFor / endsAtN.length).toFixed(1) : null,
            avgAgainst: endsAtN.length > 0 ? +(pointsAgainst / endsAtN.length).toFixed(1) : null,
        };
    });
}
 
function calculateScoringAverages(games, scoringEnds) {
    const pointsFor = scoringEnds.reduce((sum, e) => sum + e.usScore, 0);
    const pointsAgainst = scoringEnds.reduce((sum, e) => sum + e.oppScore, 0);
    const gamesPlayed = games.length;
    const endsPlayed = scoringEnds.length;
    return {
        pointsFor,
        pointsAgainst,
        avgForPerGame: gamesPlayed > 0 ? +(pointsFor / gamesPlayed).toFixed(1) : null,
        avgAgainstPerGame: gamesPlayed > 0 ? +(pointsAgainst / gamesPlayed).toFixed(1) : null,
        avgForPerEnd: endsPlayed > 0 ? +(pointsFor / endsPlayed).toFixed(1) : null,
        avgAgainstPerEnd: endsPlayed > 0 ? +(pointsAgainst / endsPlayed).toFixed(1) : null,
    };
}
 
// games should already be filtered (via filterGames above) before this runs.
export function calculateRecordsStats(games) {
    const scoringEnds = flattenScoringEnds(games);
    const leagueGames = games.filter((g) => g.game_type === 'league');
    const bonspielGames = games.filter((g) => g.game_type === 'bonspiel');
    const playoffGames = games.filter((g) => g.game_type === 'playoffs');
 
    return {
        overallRecord: formatRecord(tallyRecord(games)),
        leagueRecord: formatRecord(tallyRecord(leagueGames)),
        bonspielRecord: formatRecord(tallyRecord(bonspielGames)),
        playoffRecord: formatRecord(tallyRecord(playoffGames)),
        coinTossRecord: calculateCoinTossRecord(games),
        ...calculateHammerFirstEndRecords(games),
        ...calculateScoringAverages(games, scoringEnds),
        pointsPerEnd: calculatePointsPerEnd(scoringEnds),
    };
}
 
// Convenience wrapper, same pattern as calculateDashboardStats above.
export function calculateRecordsDashboardStats(seasons, filters = {}) {
    const games = filterGames(seasons, filters);
    return calculateRecordsStats(games);
}

// single panel combined bundle

export function calculateAllDashboardStats(seasons, filters = {}) {
    const games = filterGames(seasons, filters);
    const ends = flattenEnds(games);
    return {
        ...calculateHeadlineStats(games, ends),
        ...calculateRecordsStats(games),
    };
}

export function calculateStatTrend(seasons, filters, statKey) {
    const games = filterGames(seasons, filters);
    const sortedGames = [...games].sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
 
    return sortedGames.map((game, index) => {
        const gamesSoFar = sortedGames.slice(0, index + 1);
        const ends = flattenEnds(gamesSoFar);
        const stats = {
            ...calculateHeadlineStats(gamesSoFar, ends),
            ...calculateRecordsStats(gamesSoFar),
        };
        return {
            gameId: game.id,
            date: game.date,
            opponent: game.opponent,
            value: stats[statKey],
        };
    });
}