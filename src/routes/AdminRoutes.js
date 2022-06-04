const Joi = require('joi');
const AdminController = require('../controllers/AdminController');

const routes = [
  {
    method: 'GET',
    path: '/admin/user/{uid}',
    handler: AdminController.getUser,
  },
  {
    method: 'GET',
    path: '/admin/users',
    handler: AdminController.getAllUsers,
  },
];

module.exports = routes;
