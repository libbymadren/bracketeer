const crypto = require('crypto');

module.exports = class {
  #passwordHash;
  #salt;

  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.profile_piture = data.profile_picture;
    this.#salt = data.salt;
    this.#passwordHash = data.password;
  }

  validatePassword(password) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, this.#salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) { 
         reject("Error: " +err);
        }

        const digest = derivedKey.toString('hex');
        if (this.#passwordHash == digest) {
          resolve(this);
        }
        else {
          reject("Invalid username or password");
        }
      });
    });
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      profile_piture: this.profile_piture
    }
  }
};