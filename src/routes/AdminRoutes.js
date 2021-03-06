const Joi = require('joi');
const AdminController = require('../controllers/AdminController');

const routes = [
  {
    method: 'GET',
    path: '/admin/{uid}',
    handler: AdminController.getAdmin,
  },
  {
    method: 'PUT',
    path: '/admin/{uid}',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          photoURL: Joi.string().required()
        }),
      },
    },
    handler: AdminController.updateAdmin,
  },
  {
    method: 'GET',
    path: '/users',
    handler: AdminController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/user/username/{username}',
    handler: AdminController.searchUsers,
  },
  {
    method: 'DELETE',
    path: '/user/uid/{uid}',
    handler: AdminController.deleteUsers,
  },
  {
    method: 'DELETE',
    path: '/pet/id/{id}',
    handler: AdminController.deletePets,
  },
  {
    method: 'POST',
    path: '/admin/{uid}/articles',
    options: {
      validate: {
        payload: Joi.object({
          id : Joi.string().required(),
          title: Joi.string().required(),
          imageUrl: Joi.string().required(),
          category: Joi.string().required(),
          content: Joi.string().required(),
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
          title: Joi.string().required(),
          imageUrl: Joi.string().required(),
          type: Joi.string().required(),
          content: Joi.string().required(),
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
