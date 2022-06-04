const UserRoutes = require('./UserRoutes');
const SpvRoutes = require('./SpvRoutes');
const PetRoutes = require('./PetRoutes');

const routes = [
    UserRoutes,
    SpvRoutes,
    PetRoutes
];

const bundledRoutes = (() => ({
    name: 'routes',
    version: '1.0.0',
    register: (server, options) => {
      server.route(routes.flat().map((route) => ({ ...route, path: route.path })));
    },
  }))();
  
  module.exports = bundledRoutes;