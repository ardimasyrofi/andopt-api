const Joi = require('joi');
const PetController = require('../controllers/PetController');

const routes = [
  {
    method: 'POST',
    path: '/user/{uid}/pet',
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          imageUrls: Joi.array().required(),
          age: Joi.string().optional(),
          gender: Joi.string().required(),
          type: Joi.object().required(),
          location: Joi.string().required(),
          desc: Joi.string().required()
        }),
      },
    },
    handler: PetController.createPet,
  },
  {
    method: 'GET',
    path: '/pet/{id}',
    handler: PetController.getPet,
  },
  {
    method: 'GET',
    path: '/pets',
    handler: PetController.getAllPets,
  },
  {
    method: 'PUT',
    path: '/user/{uid}/pet/{id}',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          imageUrl: Joi.string().required(),
          age: Joi.string().required(),
          gender: Joi.string().required(),
          type: Joi.object().required(),
          location: Joi.string().required(),
          description: Joi.string().optional()
        }),
      },
    },
    handler: PetController.updatePet,
  },
  {
    method: 'DELETE',
    path: '/user/{uid}/pet/{id}',
    handler: PetController.deletePet,
  }, 
];

module.exports = routes;