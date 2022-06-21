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
  },
  {
    method: 'GET',
    path: '/admins',
    handler: SpvController.getAllAdmin,
  },
  {
    method: 'GET',
    path: '/admin/username/{username}',
    handler: SpvController.searchAdmin,
  },
  {
    method: 'DELETE',
    path: '/admin/uid/{uid}',
    handler: SpvController.deleteAdmin,
  }
];

module.exports = routes;
