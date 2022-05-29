const { 
    addUserProfileHandler,
 } = require('./handler');

const routes = [
    // -------------------------------------> USER <------------------------------------- //
    // -----------------------------------> Profile <------------------------------------ //
    {
        method: 'GET',
        path: '/profile',
        handler: getAllDataUserProfileHandler,
    },
    
];
   
module.exports = routes;

