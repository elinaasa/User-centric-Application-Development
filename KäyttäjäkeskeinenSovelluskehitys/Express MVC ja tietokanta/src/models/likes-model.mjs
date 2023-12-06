import { promisePool } from "../utils/database.mjs";

const addLike = async (user_id, media_id) => {
  try {
    const sql = `INSERT INTO Likes (user_id, media_id)
                VALUES (?, ?)`;
    const params = [user_id, media_id];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchLikesByMediaId = async (media_id) => {
  const sql = `
    SELECT * FROM Likes
    WHERE media_id = ?
  `;

  // user level id defaults to 2 (normal user)
  const params = [media_id];

  try {
    const result = await promisePool.query(sql, params);
    return result[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const fetchLikesByUserId = async (user_id) => {
  const sql = `
    SELECT * FROM Likes
    WHERE user_id = ?
  `;
  const params = [user_id];

  try {
    const result = await promisePool.query(sql, params);
    return result[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

const deleteLikeById = async (id) => {
  const sql = `
    DELETE FROM Likes
    WHERE like_id = ?;
  `;
  const params = [id];

  try {
    const result = await promisePool.query(sql, params);
    return result[0];
  } catch (e) {
    console.error("error", e.message);
    return { error: e.message };
  }
};

export { addLike, fetchLikesByMediaId, fetchLikesByUserId, deleteLikeById };
