const Joi = require('joi');
const PetController = require('../controllers/PetController');

const routes = [
  {
    method: 'POST',
    path: '/user/pet',
    options: {
      validate: {
        payload: Joi.object({
          uidPet: Joi.string().required(),
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
    path: '/user/pet/{uidPet}',
    handler: PetController.getPet,
  },
  {
    method: 'GET',
    path: '/user/pets',
    handler: PetController.getAllPets,
  },
  {
    method: 'DELETE',
    path: '/user/pet/{uidPet}',
    handler: PetController.deletePet,
  },
];

module.exports = routes;
