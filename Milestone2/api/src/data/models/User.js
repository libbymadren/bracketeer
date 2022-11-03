const crypto = require('crypto');
const argon2 = require('argon2');

module.exports = class {
  #passwordHash;
  #salt;

  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.profile_piture = data.profile_picture;
    this.#salt = data.salt;
    this.#passwordHash = data.passwordHash;
  }

  async validatePassword(password) {
    try {
      if (await argon2.verify(this.#passwordHash, password + this.#salt)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async setPasswordHash(password) {
    // generate salt if none
    if (!this.#salt) {
      let newSalt = crypto.createHash('sha256').update(Math.random()).digest('base64');
      this.#salt = newSalt;
    }
    
    // hash password
    this.#passwordHash = await argon2.hashPassword(password + this.#salt);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      profile_piture: this.profile_piture
    }
  }
};