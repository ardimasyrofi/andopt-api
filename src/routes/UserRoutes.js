const Joi = require('joi');
const UserController = require('../controllers/UserController');

const routes = [
  {
    method: 'POST',
    path: '/register',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          confirmPassword: Joi.string().required(),
        }),
      },
      auth: {
        mode: 'try',
      }
    },
    handler: UserController.registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
      auth: {
        mode: 'try',
      }
    },
    handler: UserController.loginHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.getUser,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
    handler: UserController.updateUser,
  },
];

module.exports = routes;
