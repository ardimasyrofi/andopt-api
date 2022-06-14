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
    path: '/user/{username}/{role}',
    handler: AdminController.searchUser,
  },
  {
    method: 'GET',
    path: '/user/username/{username}',
    handler: AdminController.searchUserByUsername,
  },
  {
    method: 'GET',
    path: '/user/role/{role}',
    handler: AdminController.searchUserByRole,
  },
  {
    method: 'POST',
    path: '/user/{uid}/article',
    options: {
      validate: {
        payload: Joi.object({
          id : Joi.string().required(),
          tittle: Joi.string().required(),
          imageUrls: Joi.string().required(),
          type: Joi.string().required(),
          contents: Joi.string().required(),
        }),
      },
    },
    handler: AdminController.createArticle,
  },
  {
    method: 'GET',
    path: '/article/{id}',
    handler: AdminController.getArticle,
  },
  {
    method: 'GET',
    path: '/articles',
    handler: AdminController.getAllArticles,
  },
  {
    method: 'PUT',
    path: '/article/{id}',
    options: {
      validate: {
        payload: Joi.object({
          tittle: Joi.string().required(),
          imageUrls: Joi.string().required(),
          type: Joi.string().required(),
          contents: Joi.string().required(),
        }),
      },
    },      
    handler: AdminController.updateArticle,
  },
  {
    method: 'DELETE',
    path: '/article/{id}',
    handler: AdminController.deleteArticle,
  },
  {
    method: 'GET',
    path: '/articles/newest',
    handler: AdminController.getNewestArticles,
  },
];

module.exports = routes;
