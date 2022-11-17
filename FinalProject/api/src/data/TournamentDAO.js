const db = require('./DBConnection');
const Tournament = require('./models/Tournament');
const UserDAO = require('./UserDAO');

function getAllTournaments() {
    return db.query('SELECT * FROM tournament').then(({results}) => {
        return results.map(tournament => new Tournament(tournament)); ;
    });
}

function createTournament(tournament) {
    return db.query('INSERT INTO tournament (id, picture, name, organizer_id, location, ' + 
        'description, created, start, join_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',

        [tournament.id, tournament.picture, tournament.name, tournament.organizer_id, tournament.location, 
            tournament.description, tournament.created, tournament.start, tournament.join_id]).then(({results}) => {
            getTournamentById(results.insertId)
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
            return new Tournament(results[0]);
    });
}

function getTournamentByJoinId(joinId) {
    return db.query('SELECT * FROM tournament WHERE join_id=?', [joinId]).then(({results}) => {
        if(results[0])
            return new Tournament(results[0]);
    });
}

function getTournamentsByUser(userId) {
    return db.query('SELECT * FROM tournament_user WHERE user_id=?', [userId]).then(({results}) => {
        return results.map(tournamentUser => getTournamentById(tournamentUser.tournament_id));
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

module.exports = {
    getAllTournaments: getAllTournaments,
    createTournament: createTournament,
    updateTournament: updateTournament,
    deleteTournament: deleteTournament,
    getTournamentById: getTournamentById,
    getTournamentsByUser: getTournamentsByUser,
    getTournamentByJoinId: getTournamentByJoinId,
    addUserToTournament: addUserToTournament
  };
