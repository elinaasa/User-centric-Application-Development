import express from 'express';
import { deleteLike, getMediaLike, getUserLike, postLike } from '../controllers/likes-controller.mjs';

// /api/media
const likesRouter = express.Router();

// router specific middleware
//mediaRouter.use(logger);

// TODO: check and add authentication where needed

likesRouter.get('/media/:id', getMediaLike);
likesRouter.get('/user/:id', getUserLike);
likesRouter.post('/', postLike);
likesRouter.delete('/:id', deleteLike);

export default likesRouter;
