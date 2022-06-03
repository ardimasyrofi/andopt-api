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
          address: Joi.array().optional(),
        }),
      },
    },
    handler: UserController.registerHandler,
  },
  {
    method: 'PUT',
    path: '/users/{uid}',
    options: {
      validate: {
        payload: Joi.object({
          uid: Joi.string().required(),
          address: Joi.array().optional(),
        }),
      },
    },
    handler: UserController.updateUser,
  },
  {
    method: 'DELETE',
    path: '/user/{uid}',
    handler: UserController.deleteUser,
  }
];

module.exports = routes;
