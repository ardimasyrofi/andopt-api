const Joi = require('joi');
const AdminController = require('../controllers/AdminController');

const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: AdminController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/users/{username}/{role}',
    handler: AdminController.searchUser,
  },
  {
    method: 'GET',
    path: '/users/username/{username}',
    handler: AdminController.searchUserByUsername,
  },
  {
    method: 'GET',
    path: '/users/role/{role}',
    handler: AdminController.searchUserByRole,
  },
  
];

module.exports = routes;
