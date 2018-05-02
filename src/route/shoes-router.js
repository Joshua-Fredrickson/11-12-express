'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpErrors from 'http-errors';
import Shoes from '../model/shoes';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const shoesRouter = new Router();

shoesRouter.post('/api/shoes', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.coachName) {
    logger.log(logger.INFO, 'POST - responding with a 400 error code');
    return next(new HttpErrors(400, 'title is required'));
  }
  return new Shoes(request.body).save()
    .then((shoes) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(shoes);
    })
    .catch(next);
});

shoesRouter.put('/api/notes/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  return Shoes.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedShoes) => {
      if (!updatedShoes) {
        logger.log(logger.INFO, 'GET - responding with a 404 status - (!note)');
        return next(new HttpErrors(404, 'note not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(updatedShoes);
    })
    .catch(next);
});

shoesRouter.get('/api/shoes/:id', (request, response, next) => {
  logger.log(logger.INFO, 'GET - processing a request');
  return Shoes.findById(request.params.id)
    .then((shoes) => {
      if (!shoes) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!shoes)');
        return next(new HttpErrors(404, 'shoes not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(shoes);
    })
    .catch(next);
});


shoesRouter.delete('/api/shoes/:id', (request, response, next) => {
  logger.log(logger.INFO, 'DELETE - processing a request');

  return Shoes.findByIdAndRemove(request.params.id)
    .then((shoes) => {
      if (!shoes.id()) {
        logger.log(logger.INFO, 'DELETE - responding with a 404 status code - (!shoes)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'DELETE - responding with a 200 status code');
      return response.json(shoes);
    })
    .catch(next);
});

export default shoesRouter;
