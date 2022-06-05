const Joi = require('joi');
const UserController = require('../controllers/UserController');

const routes = [
  {
    method: 'POST',
    path: '/user/register',
    options: {
      validate: {
        payload: Joi.object({
          uid: Joi.string().required(),
        }),
      },
    },
    handler: UserController.createUser,
  },
  {
    method: 'POST',
    path: '/user/{uid}/lastseen',
    options: {
      validate: {
        payload: Joi.object({
          pet_id: Joi.string().required(),
        }),
      },
    },
    handler: UserController.addLastseen,
  },
  {
    method: 'DELETE',
    path: '/user/{uid}/lastseen/{id}',
    handler: UserController.deleteLastseen,
  },
];

module.exports = routes;
