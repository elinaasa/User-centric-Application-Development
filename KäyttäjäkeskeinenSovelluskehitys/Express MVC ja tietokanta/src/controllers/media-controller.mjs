import {
  addMedia,
  fetchAllMedia,
  fetchMediaById,
} from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const mediaItems = await fetchAllMedia();
  res.json(mediaItems);
};

const getMediaById = async (req, res) => {
  console.log(req.params);
  const result = await fetchMediaById(req.params.id);
  // "error handling" for different scenarios
  if (result) {
    if (result.error) {
      res.status(500);
    }
    res.json(result);
  } else {
    res.status(404);
    res.json({ error: "Not Found", media_id: req.params.id });
  }
};

const postMedia = async (req, res) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  const { title, description, user_id } = req.body;
  const { filename, mimetype, size } = req.file;
  if (filename && title && user_id) {
    // TODO: add error handling when database error occurs
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({ message: "New media item added.", ...result });
  } else {
    res.sendStatus(400);
  }
};

const putMedia = (req, res) => {
  res.sendStatus(200);
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params.id;

    const existingMedia = await fetchMediaById(id);

    if (!existingMedia) {
      res.sendStatus(404).json({ error: "Media item not found" });
    }

    const deletedMedia = await deleteMedia(id);

    res.json({ message: "Media item deleted", deletedMedia });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export { getMedia, getMediaById, postMedia, putMedia, deleteMedia };
