/**
 * Created by zhaodeyang on 14/04/17.
 */
const apiServer = require('../config/axios');
var Profile = require('../models/Profile.js');

exports.get = (req, res) => {
  Profile.findOne({ProfileID: req.user.ProfileID}, function (err, pf) {
    console.log("!@#!#@#")
    console.log(pf)
    res.json(pf)
  })
};
