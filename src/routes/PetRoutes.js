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
    handler: PetController.addPetHandler,
  },
  {
    method: 'GET',
    path: '/user/pet/{uidPet}',
    handler: PetController.getPet,
  },
  {
    method: 'GET',
    path: '/user/pets/{uid}',
    handler: PetController.getAllPets,
  },
  {
    method: 'DELETE',
    path: '/user/pet/{uidPet}',
    handler: PetController.deletePet,
  },
  {
    method: 'PUT',
    path: '/user/pet/{uidPet}',
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
    handler: PetController.updatePet,
  },
];

module.exports = routes;
