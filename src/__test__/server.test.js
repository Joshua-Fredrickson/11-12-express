'use strict';

import faker from 'faker';
import superagent from 'superagent';
import Shoes from '../model/shoes';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}/api/shoes`;

const pCreateShoesMock = () => {
  return new Shoes({
    coachName: faker.name.findName(),
    sport: faker.lorem.words(2),
  }).save();
};
describe('/api/shoes', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(() => Shoes.remove({}));

  test('POST should respond with a 200 status', () => {
    const shoesToPost = {
      coachName: faker.name.findName(),
      sport: faker.lorem.words(2),
    };
    return superagent.post(apiURL)
      .send(shoesToPost)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.coachName).toEqual(shoesToPost.coachName);
        expect(response.body.sport).toEqual(shoesToPost.sport);
        expect(response.body._id).toBeTruthy();
        expect(response.body.timeStamp).toBeTruthy();
      });
  });


  test('POST - It should respond with a 400 status ', () => {
    const shoesToPost = {
      sport: faker.lorem.words(3),
    };
    return superagent.post(apiURL)
      .send(shoesToPost)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  describe('GET /api/shoes', () => {
    test('should respond with 200 if there are no errors', () => {
      let shoesToTest = null;
      return pCreateShoesMock()
        .then((shoes) => {
          shoesToTest = shoes;
          return superagent.get(`${apiURL}/${shoes._id}`);
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.coachName).toEqual(shoesToTest.coachName);
          expect(response.body.sport).toEqual(shoesToTest.sport);
        });
    });
    test('should respond with 404 if there is no shoes to be found', () => {
      return superagent.get(`${apiURL}/ThisIsAnInvalidId1`)
        .then(Promise.reject)
        .catch((response) => {
          expect(response.status).toEqual(404);
        });
    });
  });
  describe('PUT /api/shoes', () => {
    test('should update a shoes and return a 200 status code', () => {
      let shoesToUpdate = null;
      return pCreateShoesMock()
        .then((shoesMock) => {
          shoesToUpdate = shoesMock;
          return superagent.put(`${apiURL}/${shoesMock._id}`)
            .send({ coachName: 'coachJ' });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.coachName).toEqual('coachJ');
          expect(response.body.sport).toEqual(shoesToUpdate.sport);
          expect(response.body._id).toEqual(shoesToUpdate._id.toString());
        });
    });
  });
  // describe('DELETE /api/shoes', () => {
  //   test('should respond with 204 if there are no errors', () => {
  //     let shoesToUpdate = null;
  //     return pCreateShoesMock()
  //       .then((shoesMock) => {
  //       //  need to FIX
  //
  //       })
  //       .then((response) => {
  //         expect(response.status).toEqual(204);
  //       });
  //   });
  // });
});
