var articleDao = app.dao.articleDao;

function getArticle(req, res, dm) {
  var aid = parseInt(req.path[2]);
  articleDao.getOne(aid, dm.intercept(function (article) {
    res.sendjson(article);
  }))
}

function getLatest(req, res, dm) {
  var param = {};
  param.limit = req.getparam.s || 10;
  param.skip = (req.getparam.p || 1 - 1) * req.getparam.s;
  articleDao.getList(param, dm.intercept(function (articles) {
    res.sendjson(articles);
  }))
}

function getFn(req, res, dm) {
  switch (req.path[2]) {
    case undefined:
    case "index":
    case 'latest':
      return getLatest(req, res, dm);
    default:
      return getArticle(req, res, dm);
  }
}

function postFn(req, res, dm) {
}

function putFn(req, res, dm) {
}

function delFn(req, res, dm) {
}

module.exports = {
  GET: getFn,
  PUT: putFn,
  POST: postFn,
  DELETE: delFn
};