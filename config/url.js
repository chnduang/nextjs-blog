const baseUrl = 'http://127.0.0.1:7001/client/'

const urlPath = {
  getArticleList: `${baseUrl}getList`,
  getArticleListBy: `${baseUrl}getListBy`,
  getDetailList: `${baseUrl}getDetail`,
  getTypeInfo: `${baseUrl}getType`,
  getIdList: `${baseUrl}getIdList`,
  saveContent: `${baseUrl}saveContent`,
  updateContent: `${baseUrl}updateContent`
}

export default urlPath
