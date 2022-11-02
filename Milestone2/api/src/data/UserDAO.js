const db = require('./DBConnection');
const User = require('./models/User');

function getUserByCredentials(username, password) {
  return db.query('SELECT * FROM user WHERE username=?', [username]).then(({results}) => {
    const user = new User(results[0]);
    if (user) { 
      return user.validatePassword(password);
    }
    else {
      throw new Error("No such user");
    }
  });
}

function getAllUsers() {
    return db.query('SELECT * FROM users').then(({results}) => {
      return results.map(user => new User(user).toJSON()); 
    });
}

function getUserById(userId) {
    return db.query('SELECT * FROM users WHERE id=?', [userId]).then(({results}) => {
      if(results[0])
        return new User(results[0]).toJSON();
    });
}

function deleteUser(userId) {
    return db.query('DELETE FROM users WHERE id=?', [userId]).then(({results}) => {
        return getAllUsers();
    });
}

function createUser(user) {
    return db.query('INSERT INTO users (id, username, salt, password, profile_picture) VALUES (?, ?, ?, ?, ?)',
    [user.id, user.username, user.salt, user.password, user.profile_picture]).then(({results}) => {
        return getUserById(results.insertId);
    });
}

function updateUser(userBody, userId) {
    return db.query('UPDATE users SET ? WHERE id=?', [userBody, userId]).then(({results}) => {
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