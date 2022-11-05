const db = require('./DBConnection');
const Tournament = require('./models/Tournament');

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

module.exports = {
    getAllTournaments: getAllTournaments,
    createTournament: createTournament,
    updateTournament: updateTournament,
    deleteTournament: deleteTournament,
    getTournamentById: getTournamentById
  };