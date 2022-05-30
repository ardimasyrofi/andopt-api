const Joi = require('joi');
const UserController = require('../controllers/UserController');

const routes = [
  {
    method: 'POST',
    path: '/users',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required(),
          address: Joi.string().required(),
        }),
      },
    },
    handler: UserController.addUser,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.getUser,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: UserController.updateUser,
  },
];

module.exports = routes;