const Joi = require('joi');
const UserController = require('./controllers/UserController');

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
    path: '/users',
    handler: UserController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.getUser,
  },
];

module.exports = routes;
