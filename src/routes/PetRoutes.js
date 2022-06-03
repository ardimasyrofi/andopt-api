const Joi = require('joi');
const PetController = require('../controllers/PetController');

const routes = [
  {
    method: 'POST',
    path: '/user/pet',
    options: {
      validate: {
        payload: Joi.object({
          uid: Joi.string().required(),
          type: Joi.string().optional(),
          gender: Joi.string().optional(),
          age: Joi.number().optional(),
          address: Joi.array().optional(),
        }),
      },
    },
    handler: PetController.registerPetHandler,
  },
  {
    method: 'GET',
    path: '/user/pet/{uid}',
    handler: PetController.getPet,
  },
  {
    method: 'GET',
    path: '/user/pet',
    handler: PetController.getAllPets,
  },
  {
    method: 'DELETE',
    path: '/user/pet/{uid}',
    handler: PetController.deletePet,
  },
];

module.exports = routes;
