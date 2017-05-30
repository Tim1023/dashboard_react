/**
 * Created by zhaodeyang on 14/04/17.
 */
const apiServer = require('../config/axios');
var Profile = require('../models/Profile.js');
const subOrdersUri = "https://api.yokena.cn/v1/SubOrders?";
var sse = require("simple-sse");
var EventSource = require('eventsource');
const APIUri = "https://api.yokena.cn/v1";

exports.get = (req, res) => {
  Profile.findOne({ProfileID: req.user.ProfileID}, function (err, pf) {
    t = 'Bearer ' + pf.AccessToken
    console.log(req.query)
    if (JSON.stringify(req.query).length > 2) {
      var queryUri = [subOrdersUri]
      for (var key in req.query) {
        queryUri += key + "=" + req.query[key] + '&'
      }
      var merchantID =req.query['where'].replace('merchantID=','')
      console.log(merchantID)
      var eventdata = '';
      // var eventSourceInitDict = {headers: {'Authorization': 'Bearer '+userToken}};
      const  url = 'https://api.yokena.cn/v1/Stream/Merchants/'+merchantID;
      console.log(url)
      // var es = new EventSource(url, eventSourceInitDict);
      //TODO ADD HEADER
      var es = new EventSource(url);
      es.onmessage = function(e) {
        console.log(e)
        eventdata=e.data

        sse.broadcast(merchantID, ['event'], eventdata);
        // console.log(e.data);
      };
      es.onerror = function() {
        console.log('ERROR!');
      };



    }
    else {
      var queryUri = subOrdersUri
    }
    var cate = apiServer.create({
      baseURL: queryUri,
      timeout: 10000,
      headers: {
        'Authorization': t,
        'Content-Type':'application/json'

      }
    });
    console.log(queryUri);
    cate.get(queryUri).then(function (response) {
      if (response.headers['transfer-encoding'] === 'chunked') {
        delete response.headers['transfer-encoding'];
      }
      res.set(response.headers)
      res.json(response.data);
    })
      .catch((error) => {
        console.log('CategoriesErro', error.response.data);
      });
  });

};
exports.put = (req, res) => {
  console.log("START PUT")

  Profile.findOne({ProfileID: req.user.ProfileID}, function (err, pf) {
    t = 'Bearer ' + pf.AccessToken
    var cate = apiServer.create({
      baseURL: APIUri,
      timeout: 50000,
      headers: {
        'Authorization': t,
        'Content-Type':'application/json'

      }
    });
    console.log(req.body);
    const realUri = APIUri + req.originalUrl
    console.log(realUri)
    cate.patch(realUri, req.body).then(function (response) {
      res.set(response.headers);

      res.json(response.data);


      res = response.data;

      console.log(res)
    })
      .catch((error) => {
        console.log('subOrdersPatchError', error.response.data);
      });

  });

};
