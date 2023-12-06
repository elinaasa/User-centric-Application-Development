import {
  fetchLikesByMediaId,
  fetchLikesByUserId,
  addLike,
  deleteLikeById,
} from "../models/likes-model.mjs";

const getMediaLike = async (req, res) => {
  const media_id = req.params.id;
  const result = await fetchLikesByMediaId(media_id);
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: 'Not Found', media_id });
  }
}

const getUserLike = async (req, res) => {
  const user_id = req.params.id;
  const result = await fetchLikesByUserId(user_id);
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: 'Not Found', user_id });
  }
}

const postLike = async (req, res, next) => {
  console.log(req.body);
  const { user_id, media_id } = req.body;
  const result = await addLike(user_id, media_id);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201);
  res.json({message: 'New like item added.', ...result});
}

const deleteLike = async (req, res, next) => {
  const likeId = req.params.id;

  const result = await deleteLikeById(likeId);

  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(200);
  res.json({message: 'Deleted like', ...result});
}

export { getMediaLike, getUserLike, postLike, deleteLike };