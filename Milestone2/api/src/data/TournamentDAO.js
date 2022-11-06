const db = require('./DBConnection');
const Tournament = require('./models/Tournament');

function getAllTournaments() {
    return db.query('SELECT * FROM tournaments').then(({results}) => {
        return results.map(tournament => new Tournament(tournament)); 
    });
}

function createTournament(tournament) {
    return db.query('INSERT INTO tournaments (id, picture, name, organizer_id, location, ' + 
        'description, created, start, join_id, participants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

        [tournament.id, tournament.picture, tournament.name, tournament.organizer_id, tournament.location, 
            tournament.description, tournament.created, tournament.start, tournament.join_id, tournament.participants]).then(({results}) => {
            getTournamentById(results.insertId)
   });
}

function updateTournament(tournamentBody, tournamentId) {
    return db.query('UPDATE tournaments SET ? WHERE id=?', [tournamentBody, tournamentId]).then(({results}) => {
        return (getTournamentById(tournamentId));
    });
}

function deleteTournament(tournamentId) {
    return db.query('DELETE FROM tournaments WHERE id=?', [tournamentId]).then(({results}) => {
        return getAllTournaments();
    });
}

function getTournamentByID(tournamentId) {
    return db.query('SELECT * FROM tournaments WHERE id=?', [tournamentId]).then(({results}) => {
        if(results[0])
            return new Tournament(results[0]);
    });
}

function getTournamentsByUser(userId) {
    return db.query('SELECT * FROM tournament_user WHERE user_id=?', [userId]).then(({results}) => {
        return results.map(tournamentUser => getTournamentById(tournamentUser.tournament_id));
    });
}

module.exports = {
    getAllTournaments: getAllTournaments,
    createTournament: createTournament,
    updateTournament: updateTournament,
    deleteTournament: deleteTournament,
    getTournamentByID: getTournamentByID,
    getTournamentsByUser: getTournamentsByUser
};