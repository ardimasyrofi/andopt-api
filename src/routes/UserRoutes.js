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
    method: 'POST',
    path: '/user/address/{uid}',
    options: {
      validate: {
        payload: Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
          province: Joi.string().required(),
        }),
      },
    },
    handler: UserController.addAddress,
  },
  {
    method: 'PUT',
    path: '/user/address/{uid}/{id}',
    options: {
      validate: {
        payload: Joi.object({
          street: Joi.string().optional(),
          city: Joi.string().optional(),
          province: Joi.string().optional(),
        }),
      },
    },
    handler: UserController.updateAddress,
  },
  {
    method: 'DELETE',
    path: '/user/address/{uid}/{id}',
    handler: UserController.deleteAddress,
  },
  {
    method: 'DELETE',
    path: '/user/{uid}',
    handler: UserController.deleteUser,
  }
];

module.exports = routes;
