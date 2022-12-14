const db = require('./DBConnection');
const Tournament = require('./models/Tournament');
const UserDAO = require('./UserDAO');

function getAllTournaments() {
    return db.query('SELECT * FROM tournament').then(({results}) => {
        return results.map(tournament => new Tournament(tournament)); ;
    });
}

function createTournament(tournament) {
    let query = 'INSERT INTO tournament (id, picture, name, organizer_id, location, description, created, start, end, join_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return db.query(query, [
        tournament.id,
        tournament.picture,
        tournament.name,
        tournament.organizer_id,
        tournament.location,
        tournament.description,
        tournament.created,
        tournament.start,
        tournament.end,
        tournament.join_id]).then(({results}) => {
            return getTournamentById(results.insertId)
        });
}

function updateTournament(tournamentBody, tournamentId) {
    return db.query('UPDATE tournament SET ? WHERE id=?', [tournamentBody, tournamentId]).then(({results}) => {
        return (getTournamentById(tournamentId));
    });
}

function deleteTournament(tournamentId) {
    return db.query('DELETE FROM tournament WHERE id=?', [tournamentId]).then(({results}) => {
        return getAllTournaments();
    });
}

function getTournamentById(tournamentId) {
    return db.query('SELECT * FROM tournament WHERE id=?', [tournamentId]).then(({results}) => {
        if(results[0])
            return results[0];
    });
}

function getTournamentByJoinId(joinId) {
    return db.query('SELECT * FROM tournament WHERE join_id=?', [joinId]).then(({results}) => {
        if(results[0])
            return new Tournament(results[0]);
    });
}

function getEnteredTournamentsByUser(userId) {
    let query = "SELECT * FROM tournament LEFT JOIN tournament_user ON tournament.id=tournament_user.tournament_id  WHERE user_id=?"
    return db.query(query, [userId]).then(({results}) => {
        return results;
    });
}

function getCreatedTournamentsByUser(userId) {
    let query = "SELECT * FROM tournament WHERE organizer_id=?"
    return db.query(query, [userId]).then(({results}) => {
        return results;
    });
}

function addUserToTournament(tournamentId, userId) {
    return db.query('INSERT INTO tournament_user (user_id, tournament_id) VALUES (?, ?)', [userId, tournamentId]).then(async ({results}) => {
        return {
            tournament: await getTournamentById(tournamentId),
            user: await UserDAO.getUserById(userId)
        }
   });
}

function getTournamentParticipants(tournamentId) {
    let query = "SELECT * FROM user LEFT JOIN tournament_user ON user.id=tournament_user.user_id WHERE tournament_id=?";
    return db.query(query, [tournamentId]).then(({results}) => {
        return results;
    });
}

function markMatchesGenerated(tournamentId) {
    let query = "UPDATE tournament SET matches_generated=1 WHERE id=?";
    return db.query(query, [tournamentId])
}

function getTournamentMatches(tournamentId) {
    let query = "SELECT * FROM `match` WHERE tournament_id=?";
    return db.query(query, [tournamentId]).then(({results}) => {
        return results;
    })
}

module.exports = {
    getAllTournaments: getAllTournaments,
    createTournament: createTournament,
    updateTournament: updateTournament,
    deleteTournament: deleteTournament,
    getTournamentById: getTournamentById,
    getTournamentByJoinId: getTournamentByJoinId,
    addUserToTournament: addUserToTournament,
    getTournamentParticipants: getTournamentParticipants,
    getEnteredTournamentsByUser: getEnteredTournamentsByUser,
    getCreatedTournamentsByUser: getCreatedTournamentsByUser,
    markMatchesGenerated: markMatchesGenerated,
    getTournamentMatches: getTournamentMatches
};
