const { 
    addUserProfileHandler, 
    getAllUserProfileHandler, 
    getUserProfileByIdHandler, 
    editUserProfileByIdHandler,
    addAnimalPostHandler,
    getAllAnimalPostHandler,
    getAnimalPostByIdUserHandler,
    editAnimalPostByIdUserHandler,
    deleteAnimalPostByIdUserHandler,
    addArticleHandler, 
    getAllArticleHandler, 
    getArticleByIdAdminHandler, 
    getArticleByIdAdminHandler, 
    editArticleByIdAdminHandler,
    deleteArticleByIdAdminHandler,
    addAdminProfileHandler,
    getAllAdminProfileHandler,
    getAdminProfileByIdSpvHandler,
    editAdminProfileByIdSpvHandler
 } = require('./handler');

const routes = [
    // -------------------------------------> USER <------------------------------------- //
    // -----------------------------------> Profile <------------------------------------ //
    {
        method: 'POST',
        path: '/',
        handler: addUserProfileHandler,
    },
    {
      method: 'GET',
      path: '/',
      handler: getAllUserProfileHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: getUserProfileByIdHandler,
    },
    {
        method: 'PUT',
        path: '/',
        handler: editUserProfileByIdHandler,
    },
    // -------------------------------------> USER <------------------------------------- //
    // ---------------------------------> Animal Post <---------------------------------- //
    {
        method: 'POST',
        path: '/',
        handler: addAnimalPostHandler,
    },
    {
      method: 'GET',
      path: '/',
      handler: getAllAnimalPostHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: getAnimalPostByIdUserHandler,
    },
    {
        method: 'PUT',
        path: '/',
        handler: editAnimalPostByIdUserHandler,
    },
    {
        method: 'DELETE',
        path: '/',
        handler: deleteAnimalPostByIdUserHandler,
    },
    // -------------------------------------> ADMIN <------------------------------------- //
    // ---------------------------------> Article Post <---------------------------------- //
    {
        method: 'POST',
        path: '/',
        handler: addArticleHandler,
    },
    {
      method: 'GET',
      path: '/',
      handler: getAllArticleHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: getArticleByIdAdminHandler, 
    },
    {
        method: 'PUT',
        path: '/',
        handler: editArticleByIdAdminHandler,
    },
    {
        method: 'DELETE',
        path: '/',
        handler: deleteArticleByIdAdminHandler,
    },
    // -------------------------------> SUPERVISOR (SPV) <-------------------------------- //
    // --------------------------------> Register Admin <--------------------------------- //
    {
        method: 'POST',
        path: '/',
        handler: addAdminProfileHandler,
    },
    {
      method: 'GET',
      path: '/',
      handler: getAllAdminProfileHandler,
    },
    {
        method: 'GET',
        path: '/',
        handler: getAdminProfileByIdSpvHandler,
    },
    {
        method: 'PUT',
        path: '/',
        handler: editAdminProfileByIdSpvHandler,
    },
];
   
module.exports = routes;