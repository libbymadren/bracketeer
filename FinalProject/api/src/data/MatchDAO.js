const db = require('./DBConnection');
const Match = require('./models/Match');


function getMatchById(matchId) {
    return db.query('SELECT * FROM match WHERE id=?', [matchId]).then(({results}) => {
        return results.map(match => new Match(match));
    });
}

function getMatchesByUser(userId) {
    return db.query('SELECT * FROM `match` WHERE participant_one_id=? OR participant_two_id=?', [userId, userId]).then(({results}) => {
        return results.map(match => Match(match));
    });
}

function getMatchesByTournament(tournamentId) {
    return db.query('SELECT * FROM match WHERE tournament_id=?', [tournamentId]).then(({results}) => {
        return results.map(match => new Match(match))
    });
}

function createMatch(match) {
    return db.query('INSERT INTO match (tournament_id, participant_one_id, participant_two_id, winner_id, number, round, next_match_number) VALUES (?,?,?,?,?,?, ?)',
    [match.tournament_id, match.participant_one_id, match.participant_two_id, match.winner_id, match.number, match.next_match_number]).then(({results}) => {
        return getMatchById(results.insertId);
    })
}

function bulkInsertMatches(matches) {
    console.log("Bulk inserting matches");
    let query = "INSERT INTO `match` (tournament_id, participant_one_id, participant_two_id, winner_id, number, round, next_match_number) VALUES ?";
    values = [];
    for (let match of matches) {
        values.push([match.tournament_id, match.participant_one_id, match.participant_two_id, match.winner_id, match.number, match.round, match.next_match_number])
    }
    return db.query(query, [values]).then(({results}) => {
        return results;
    })
}

module.exports = {
    getMatchById: getMatchById,
    getMatchesByUser: getMatchesByUser,
    getMatchesByTournament: getMatchesByTournament,
    createMatch: createMatch,
    bulkInsertMatches: bulkInsertMatches
};