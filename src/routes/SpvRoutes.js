const Joi = require('joi');
const SpvController = require('../controllers/SpvController');

const routes = [
  {
    method: 'POST',
    path: '/spv/{uid}/admin/register',
    options: {
      validate: {
        payload: Joi.object({
          uid: Joi.string().required(),
        }),
      },
    },
    handler: SpvController.createAdmin,
  }
];

module.exports = routes;
