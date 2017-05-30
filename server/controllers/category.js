/**
 * Created by zhaodeyang on 14/04/17.
 */
const apiServer = require('../config/axios');
var Profile = require('../models/Profile.js');
const categoriesUri = "https://api.yokena.cn/v1/Categories?";

exports.get = (req, res) => {
  Profile.findOne({ProfileID: req.user.ProfileID}, function (err, pf) {
    t = 'Bearer ' + pf.AccessToken
    if (JSON.stringify(req.query).length > 2) {
      console.log(req.query)
      var queryUri = [categoriesUri]
      for (var key in req.query) {
        queryUri += key + "=" + req.query[key] + '&'
      }

    }
    else {
      var queryUri = categoriesUri
    }
    var cate = apiServer.create({
      baseURL: queryUri,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': t

      }
    });
    cate.get(queryUri).then(function (response) {

      res.json(response.data);


    })
      .catch(function (error) {
        console.log(error);
      });

  });
};
