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
    path: '/user/{uid}/address',
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
    path: '/user/{uid}/address/{id}',
    options: {
      validate: {
        payload: Joi.object({
          street: Joi.string().required(),
          city: Joi.string().required(),
          province: Joi.string().required(),
        }),
      },
    },
    handler: UserController.updateAddress,
  },
  {
    method: 'DELETE',
    path: '/user/{uid}/address/{id}',
    handler: UserController.deleteAddress,
  },
];

module.exports = routes;
