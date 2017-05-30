/**
 * Created by zhaodeyang on 17/04/17.
 */
var sse = require("simple-sse");
var Profile = require('../models/Profile.js');

exports.get = (req, res) => {
  var client = sse.add(req, res);

  sse.join(client, req.params.merchantId);
  console.log("!!!!!!!!!!!!")
  console.log(  sse.in(client, 'c2f1d67f-4257-43fb-9d52-dd8256d8554c'))

};
