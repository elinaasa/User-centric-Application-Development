import express from 'express';
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from '../controllers/media-controller.mjs';
import {logger} from '../middlewares/middlewares.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body} from 'express-validator';
import upload from '../middlewares/upload.mjs';

// /api/media
const mediaRouter = express.Router();

// router specific middleware
//mediaRouter.use(logger);

// TODO: check and add authentication where needed
mediaRouter.post('/',
    authenticateToken,
    upload.single('file'),
    // TODO: add missing validation rules
    body('title').trim().isLength({min: 3}),
    body('description'),
    postMedia
  );

mediaRouter.get('/', getMedia);
mediaRouter.get('/:id', getMediaById)
mediaRouter.put('/:id', putMedia)
mediaRouter.delete('/:id', deleteMedia)

export default mediaRouter;
