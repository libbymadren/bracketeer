module.exports = class {
    constructor(data) {
      this.id = data.id;
      this.picture = data.picture;
      this.name = data.name;
      this.organizer_id = data.organizer_id;
      this.location = data.location;
      this.description = data.description;
      this.created = data.created;
      this.start = data.start;
      this.end = data.end;
      this.join_id = data.join_id;
      this.participants = data.participants;
    }
};