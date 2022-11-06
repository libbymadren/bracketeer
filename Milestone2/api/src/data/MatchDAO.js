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
    return db.query('INSERT INTO match (id, tournament_id, participant_one_id, participant_two_id, winner_id, next_match_id) VALUES (?,?,?,?,?,?)',
    [match.id, match.tournament_id, match.participant_one_id, match.participant_two_id, match.winner_id, match.next_match_id]).then(({results}) => {
        return getMatchById(results.insertId);
    })
}

module.exports = {
    getMatchById: getMatchById,
    getMatchesByUser: getMatchesByUser,
    getMatchesByTournament: getMatchesByTournament,
    createMatch: createMatch
};