/*
 convertID(id);
 */
var union = app.lib.tools.union,
  intersect = app.lib.tools.intersect,
  IDString = app.lib.model.IDString,
  defautArticle = app.lib.model.Article;

var that = app.dao.db.bind('article', {

  getList: function (param, callback) {
    that.find({
    }, {
      sort: {
        index: -1
      },
      limit: param.limit,
      skip: param.skip,
      fields: {
        title: 1,
        content: 1,
        age: 1
      }
    }).toArray(callback);
  },
  getOne: function (art_id, callback) {
    that.findOne({
      age: art_id
    }, {
      fields: {
        title: 1,
        content: 1
      }
    }, callback);
  }

});

module.exports = {
  getList: that.getList,
  getOne: that.getOne
};
