const apiServer = require('../config/axios');
var Profile = require('../models/Profile.js');

exports.get = (req, res) => {
  Profile.findOne({ProfileID: req.user.ProfileID}, function (err, pf) {
    t = 'Bearer ' + pf.AccessToken
    var cate = apiServer.create({
      baseURL: 'https://api.yokena.cn/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': t

      }
    });
    cate.get('/v1/Merchants?where=UserID='+req.user.ProfileID).then(function (response) {
      res.json(response.data);


    })
      .catch(function (error) {
        console.log(error);
      });

  });
};
