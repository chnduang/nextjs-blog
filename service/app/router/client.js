'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/client/index', controller.client.home.index);
  router.get('/client/getList', controller.client.home.getArticleList);
  router.get('/client/getListBy', controller.client.home.getArticleListBy);
  router.get('/client/getDetail/:id', controller.client.home.getDetailList);
  router.get('/client/getType', controller.client.home.getTypeList);
  router.get('/client/getIdList/:id', controller.client.home.getListById);
  router.post('/client/saveContent', controller.client.home.saveContent);
  router.put('/client/updateContent', controller.client.home.updateContent);
};
