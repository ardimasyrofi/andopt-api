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
          username: Joi.string().required(),
          email: Joi.string().required(),
          photoURL: Joi.string().required()
        }),
      },
    },
    handler: UserController.createUser,
  },
  {
    method: 'GET',
    path: '/user/{uid}',
    handler: UserController.getUser,
  },
  {
    method: 'PUT',
    path: '/user/{uid}',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          photoURL: Joi.string().required()
        }),
      },
    },
    handler: UserController.updateUser,
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
