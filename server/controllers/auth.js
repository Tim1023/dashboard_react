const axios = require('../config/axios');
var Profile = require('../models/Profile.js');

exports.callback = (req, res, next) => {
  Profile.findOne({ProfileID: req.user.ProfileID}, function (err, pf) {
    res.redirect('/')

  });
}
