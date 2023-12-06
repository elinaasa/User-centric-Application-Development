import {validationResult} from "express-validator";
import {addMedia, fetchAllMedia, fetchMediaById, updateMediaById, deleteMediaById} from "../models/media-model.mjs";

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
    res.json({error: 'Not Found', media_id: req.params.id});
  }
};

const postMedia = async (req, res, next) => {
  //console.log('uploaded file', req.file);
  //console.log('uploaded form data', req.body);
  // Error handling moved to fileFilter
  // if (!req.file) {
  //   const error = new Error('file missing or invalid');
  //   error.status = 400;
  //   return next(error);
  // }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // details about errors:
    console.log('validation errors', errors.array());
    const error = new Error('invalid input fields');
    error.status = 400;
    return next(error);
  }
  const {title, description} = req.body;
  const {filename, mimetype, size} = req.file;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  const newMedia = {title, description, user_id, filename, mimetype, size};
  const result = await addMedia(newMedia);
  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201);
  res.json({message: 'New media item added.', ...result});
};

const putMedia = async (req, res) => {
  const updateFields = req.body;
  const mediaId = req.params.id;

  const result = await updateMediaById(mediaId, updateFields);

  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(200);
  res.json({message: 'Updated media', ...result});
};

const deleteMedia = async (req, res) => {
  const mediaId = req.params.id;

  const result = await deleteMediaById(mediaId);

  // error handling when database error occurs
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(200);
  res.json({message: 'Deleted media', ...result});
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};
