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
  // {
  //   method: 'GET',
  //   path: '/users/{id}',
  //   handler: UserController.getUser,
  // },
  // {
  //   method: 'PUT',
  //   path: '/users/{id}',
  //   options: {
  //     validate: {
  //       payload: Joi.object({
  //         username: Joi.string().required(),
  //         email: Joi.string().required(),
  //         password: Joi.string().required(),
  //       }),
  //     },
  //   },
  //   handler: UserController.updateUser,
  // },
];

module.exports = routes;
