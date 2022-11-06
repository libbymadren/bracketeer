module.exports = class {
    constructor(data) {
        this.id = data.id;
        this.tournament_id = data.tournament_id;
        this.participant_one_id = data.participant_one_id;
        this.participant_two_id = data.participant_two_id;
        this.winner_id = data.winner_id;
        this.next_match_id = data.next_match_id;
    }
}