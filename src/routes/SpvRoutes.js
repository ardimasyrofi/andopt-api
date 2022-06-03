const Joi = require('joi');
const SpvController = require('../controllers/SpvController');

const routes = [
  {
    method: 'POST',
    path: '/spv/registerAdmin',
    options: {
      validate: {
        payload: Joi.object({
          uid: Joi.string().required(),
        }),
      },
    },
    handler: SpvController.registerAdminHandler,
  },
];

module.exports = routes;
