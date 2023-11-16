import { promisePool } from '../utils/db.mjs';

const fetchAllMedia = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM mediaItems');
    console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const getMediaById = async (req, res) => {
    const media = await fetchMediaById(req.params.id);

const getMediaById = async (id) => {
  try {
    const sql = 'SELECT * FROM mediaItems WHERE media_id = ?';
    const [rows] = await promisePool.execute();
    const params = [id];
    console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

export { fetchAllMedia };
