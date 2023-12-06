import {promisePool} from "../utils/database.mjs";

/**
 * Fetch user from database based on user name/password pair
 * 
 * @param {object} userCreds - Contains {username, password} properties
 * @returns user object
 */
const login = async (userCreds) => {
  try {
    const sql = `SELECT user_id, username, email, user_level_id
                 FROM Users WHERE username = ? AND password = ?`;
    const params = [userCreds.username, userCreds.password];
    const result = await promisePool.query(sql, params);
    const [rows] = result; // first item in result array is the data rows
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

/**
* Creates a new user in the database
* 
* @param {object} user data
* @returns {number} - id of the inserted user in db
*/
const addUser = async (user) => {
  try {
    const sql = `INSERT INTO Users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)                 
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const fetchAllUsers = async () => {
  const sql = `
    SELECT *
    FROM Users
  `;

  try {
    const result = await promisePool.query(sql);
    return result;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

const fetchUserById = async (userId) => {
  const sql = `
    SELECT *
    FROM Users
    WHERE user_id = ?
  `;

  const params = [userId];
  try {
    const result = await promisePool.query(sql, params);
    console.log(result);
    return result;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

const updateUserById = async (userId, updateFields) => {
  const sql = `
  UPDATE Users
  SET username = ?, password = ?, email = ?
  WHERE user_id = ?;
  `;

  const { username, password, email } = updateFields;

  const params = [username, password, email, userId];

  try {
    const result = await promisePool.query(sql, params);
    console.log('result', result);
    return result;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

const deleteUserById = async (userId) => {
  const sql = `
    DELETE FROM Users
    WHERE user_id = ?
  `;

  const params = [userId];
  try {
    const result = await promisePool.query(sql, params);
    console.log(result);
    return result;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
}

export {login, addUser, fetchAllUsers, fetchUserById, updateUserById, deleteUserById};
