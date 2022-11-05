const crypto = require('crypto');
const argon2 = require('argon2');

module.exports = class {

  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.profile_picture = data.profile_picture;
    this.salt = data.salt;
    this.passwordHash = data.password;
  }

  async validatePassword(password) {
    try {
      if (await argon2.verify(this.passwordHash, password + this.salt)) {
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
    if (!this.salt) {
      console.log("GENERATING SALT")
      let newSalt = crypto.createHash('sha256').update(Math.random() + "").digest('base64');
      this.salt = newSalt;
    }
    
    // hash password
    console.log("APPLYING ARGON2 HASH")
    this.passwordHash = await argon2.hash(password + this.salt);

    console.log(this.salt);
    console.log(this.passwordHash);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      profile_picture: this.profile_picture
    }
  }
};