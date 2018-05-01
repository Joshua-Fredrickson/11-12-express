'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';
import Shoes from '../model/shoes';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();

const shoesRouter = new Router();

shoesRouter.post('/api/shoes', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'POST - processing a request');
  if (!request.body.coachName) {
    logger.log(logger.INFO, 'POST - responding with a 400 error code');
    return response.sendStatus(400);
  }
  return new Shoes(request.body).save()
    .then((shoes) => {
      logger.log(logger.INFO, 'POST - responding with a 200 status code');
      return response.json(shoes);
    })
    .catch((error) => {
      logger.log(logger.ERROR, '__POST_ERROR__');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

shoesRouter.get('/api/shoes/:id', (request, response) => {
  logger.log(logger.INFO, 'GET - processing a request');

  return Shoes.findById(request.params.id)
    .then((shoes) => {
      if (!shoes) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - (!shoes)');
        return response.sendStatus(404);
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(shoes);
    })
    .catch((error) => {
      if (error.message.toLowerCase().indexOf('cast to object id failed') > -1) {
        logger.log(logger.INFO, 'GET - responding with a 404 status code - objectId');
        logger.log(logger.VERBOSE, `Could not parse the specific object id ${request.params.id}`);
        return response.sendStatus(404);
      }
      logger.log(logger.ERROR, '__GET_ERROR__ Returning a 500 status code');
      logger.log(logger.ERROR, error);
      return response.sendStatus(500);
    });
});

export default shoesRouter;
