const db = require('./DBConnection');
const User = require('./models/User');

async function getUserByCredentials(username, password) {
  return db.query('SELECT * FROM user WHERE username=?', [username]).then(async ({results}) => {

    // Create a user based off of the first match of the query for username
    const user = new User(results[0]);

    // If a user was found then validate credentials, if not throw error
    if (user) {

      let validatePassword = await user.validatePassword(password);

      if (validatePassword) {
        return user;
      } else {
        throw new Error("Invalid password")
      }
      
    } else {
      throw new Error("Invalid username");
    }
  });
}

function getAllUsers() {
    return db.query('SELECT * FROM user').then(({results}) => {
      return results.map(user => new User(user).toJSON()); 
    });
}

function getUserById(userId) {
    return db.query('SELECT * FROM user WHERE id=?', [userId]).then(({results}) => {
      if(results[0])
        return new User(results[0]).toJSON();
    });
}

function deleteUser(userId) {
    return db.query('DELETE FROM user WHERE id=?', [userId]).then(({results}) => {
        return getAllUsers();
    });
}

function createUser(user) {
    return db.query('INSERT INTO user (id, username, salt, password, profile_picture) VALUES (?, ?, ?, ?, ?)',
    [user.id, user.username, user.salt, user.passwordHash, user.profile_picture]).then(({results}) => {
        return getUserById(results.insertId);
    });
}

function updateUser(userBody, userId) {
    return db.query('UPDATE user SET ? WHERE id=?', [userBody, userId]).then(({results}) => {
        return (getUserById(userId));
    });
}


module.exports = {
  getUserByCredentials: getUserByCredentials,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  deleteUser: deleteUser,
  createUser: createUser,
  updateUser: updateUser
};