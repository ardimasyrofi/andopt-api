const Joi = require('joi');
const AdminController = require('../controllers/AdminController');
const UserController = require('../controllers/UserController');

const routes = [
  {
    method: 'POST',
    path: '/administrators',
    options: {
      validate: {
        payload: Joi.object({
          Adminname: Joi.string().required(),
          email: Joi.string().required(),
          address: Joi.string().required(),
        }),
      },
    },
    handler: AdminController.addAdmin,
  },
  
  // Admin bisa melihat akun semua user
  {
    method: 'GET',
    path: '/users',
    handler: AdminController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.get_User,
  },
  {
    method: 'GET',
    path: '/administrators/{id}',
    handler: AdminController.getAdmin,
  },
  {
    method: 'PUT',
    path: '/administrators/{id}',
    handler: AdminController.updateAdmin,
  },
  
  // Admin yg bisa menghapus akun user
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: UserController.deleteUser,
  },
];

module.exports = routes;
