/**
 * Created by zhaodeyang on 17/04/17.
 */
const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();


const simpleOauthModule = require('simple-oauth2');
const axios = require('axios');
var bodyParser = require('body-parser');
var qs = require('qs');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


const oauth2 = simpleOauthModule.create({
  client: {
    id: 'testclient',
    secret: 'testpass',
  },
  auth: {
    tokenHost: 'https://accounts.yokena.cn/',
    tokenPath: '/token',
  },
});
let username;
let password;
var tokenConfig;

console.log(tokenConfig)
let token = {};
let userToken = {};

const categoriesUri = "https://api.yokena.cn/v1/Categories?";
const merchantsUri = "https://api.yokena.cn/v1/Merchants?";
const productsUri = "https://api.yokena.cn/v1/Products?";
const adsUri = "https://api.yokena.cn/v1/Ads?";
const usersUri = "https://api.yokena.cn/v1/Users";
const langUri = "https://api.yokena.cn/v1/Languages?";
const APIUri = "https://api.yokena.cn/v1";
const shippingsUri = "https://api.yokena.cn/v1/Shippings";
const  mainAddressesUri = "https://api.yokena.cn/v1/Addresses?"
const ordersUri = "https://api.yokena.cn/v1/Orders?";
const subOrdersUri = "https://api.yokena.cn/v1/SubOrders?";
// Initial page redirecting to Github


// Promises
// Get the access token object for the client
function freshToken() {
  oauth2.clientCredentials
    .getToken(tokenConfig)
    .then((result) => {
      token = oauth2.accessToken.create(result);
      console.log(token.token.access_token)
    })
    .catch((error) => {
      console.log('Access Token error', error.response.data);
    });
}
freshToken();
setInterval(freshToken, 1200000);


// Promises
// Save the access token


app.get('/Categories', (req, res) => {
  console.log(req.query)
  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [categoriesUri]
    for (var key in req.query) {
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = categoriesUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
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
app.get('/Merchants', (req, res) => {

  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [merchantsUri]
    for (var key in req.query) {
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = merchantsUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
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
      console.log('MerchantsErro', error.response.data);
    });
});
app.get('/Products', (req, res) => {
  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [productsUri]
    for (var key in req.query) {
      console.log(key)
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = productsUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
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
      console.log('ProductsError', error.response.data);
    });
});
app.get('/Ads', (req, res) => {
  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [adsUri]
    for (var key in req.query) {
      console.log(key)
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = adsUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
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
      console.log('AdsError', error.response.data);
    });
});
app.get('/Lang', (req, res) => {
  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [langUri]
    for (var key in req.query) {
      console.log(key)
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = langUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
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
      console.log('AdsError', error.response.data);
    });
});
app.post('/Login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  tokenConfig = {
    username: username,
    password: password
  };
  // console.log(tokenConfig);
  oauth2.ownerPassword
    .getToken(tokenConfig)
    .then((result) => {
      userToken = oauth2.accessToken.create(result);
      var realUri = usersUri
      var cate = axios.create({
        baseURL: realUri,
        timeout: 50000,
        headers: {
          'Authorization': 'Bearer ' + userToken.token.access_token,
          'Content-Type':'application/json'

        }
      });
      console.log('UserToken' + userToken.token.access_token)



      cate.get(realUri).then(function (response) {
        if (response.headers['transfer-encoding'] === 'chunked') {
          delete response.headers['transfer-encoding'];
        }
        res.set(response.headers)
        res.json(response.data)


        res = response.data;

        // console.log(res)
      })
        .catch((error) => {
          console.log('usersErro', error.response.data);
        });
    }).catch(() => {
    res.json(521, "Wrong Username or password")
  });

  return userToken;

});
app.get('/Users', (req, res) => {
  var cate = axios.create({
    baseURL: usersUri,
    timeout: 50000,
    headers: {
      'Authorization': req.headers.authorization,
      'Content-Type':'application/json'

    }
  });
  cate.get(usersUri).then(function (response) {
    if (response.headers['transfer-encoding'] === 'chunked') {
      delete response.headers['transfer-encoding'];
    }
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    // console.log(res)
  })
    .catch((error) => {
      console.log('usersGetError', error.response.data);
    });
});
app.post('/Token', (req, res) => {
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  tokenConfig = {
    username: username,
    password: password
  };
  console.log(tokenConfig);
  oauth2.ownerPassword
    .getToken(tokenConfig)
    .then((result) => {
      userToken = oauth2.accessToken.create(result);
      res.json(userToken)
      console.log('UserToken' + userToken.token.access_token)

    });

  return userToken;

});
app.post('/Users', (req, res) => {
  var cate = axios.create({
    baseURL: usersUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
      'Content-Type':'application/json'

    }
  });
  console.log(req.body);

  cate.post(usersUri, req.body).then(function (response) {
    if (response.headers['transfer-encoding'] === 'chunked') {
      delete response.headers['transfer-encoding'];
    }
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('usersPostError', error.response.data);
    });
});


app.post('/Merchants', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: merchantsUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
      'Content-Type':'application/json'

    }
  });
  console.log(req.body);

  cate.post(merchantsUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('merchantsPostError', error.response.data);
    });
});
app.delete('/Merchants/*', (req, res) => {
  console.log("dddd")
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
      'Content-Type':'application/json'

    }
  });
  console.log(req.body);
  const realUri = APIUri + req.originalUrl
  console.log(realUri)
  cate.delete(realUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('merchantsPatchError', error.response.data);
    });
});

app.put('/Merchants/*', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
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
      console.log('merchantsPatchError', error.response.data);
    });
});
app.post('/Categories', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: categoriesUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
      'Content-Type':'application/json'

    }
  });

  console.log(req.body);

  cate.post(categoriesUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('categoriesPostError', error.response.data);
    });
});
app.delete('/Categories/*', (req, res) => {
  console.log("dddd")
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
      'Content-Type':'application/json'

    }
  });
  console.log(req.body);
  const realUri = APIUri + req.originalUrl
  console.log(realUri)
  cate.delete(realUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('mCategoriesPatchError', error.response.data);
    });
});

app.put('/Categories/*', (req, res) => {
  console.log("dddd")
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
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
      console.log('merchantsPatchError', error.response.data);
    });
});
app.post('/Products', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: productsUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
      'Content-Type':'application/json'

    }
  });

  console.log(req.body);

  cate.post(productsUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('productsPostError', error.response.data);
    });
});
app.delete('/Products/*', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
      'Content-Type':'application/json'

    }
  });
  console.log(req.body);
  const realUri = APIUri + req.originalUrl
  console.log(realUri)
  cate.delete(realUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    console.log(res)
  })
    .catch((error) => {
      console.log('mCategoriesPatchError', error.response.data);
    });
});

app.put('/Products/*', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
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
      console.log('merchantsPatchError', error.response.data);
    });
});


app.post('/Shipping', (req, res) => {

  var cate = axios.create({
    baseURL: shippingsUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + token.token.access_token,
      'Content-Type':'application/json'

    }
  });

  console.log(req.body);

  cate.post(shippingsUri, req.body).then(function (response) {
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

    // console.log(res)
  })
    .catch((error) => {
      console.log('shippingsPostError', error.response.data);
    });
});
app.get('/MainAddresses', (req, res) => {
  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [mainAddressesUri]
    for (var key in req.query) {
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = mainAddressesUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': req.headers.authorization,
      'Content-Type': 'application/json'
    }
  });
  cate.get(queryUri).then(function (response) {
    if (response.headers['transfer-encoding'] === 'chunked') {
      delete response.headers['transfer-encoding'];
    }
    res.set(response.headers);

    res.json(response.data);


    res = response.data;

  })
    .catch((error) => {
      console.log('getAddressError', error.response.data);
    });
});

app.post('/Orders', (req, res) => {
  console.dir(req.body)
  var cate = axios.create({
    baseURL: ordersUri,
    timeout: 50000,
    headers: {
      'Authorization': req.headers.authorization,
      'Content-Type':'application/json'

    }
  });
  cate.post(ordersUri,req.body).then(function (response) {
    if (response.headers['transfer-encoding'] === 'chunked') {
      delete response.headers['transfer-encoding'];
    }
    res.set(response.headers);

    res.json(response.data);


    res = response.data;
    console.log(res)
  })
    .catch((error) => {
      console.log('ordersPostError', error.response.data);
    });
});

app.get('/Orders', (req, res) => {

  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [ordersUri]
    for (var key in req.query) {
      queryUri += key + "=" + req.query[key] + '&'
    }

  }
  else {
    var queryUri = ordersUri
  }
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
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
      console.log('OrdersErro', error.response.data);
    });
});
var sse = require("simple-sse");

var eventdata = '';
var EventSource = require('eventsource');
// var eventSourceInitDict = {headers: {'Authorization': 'Bearer '+userToken}};
const  url = 'https://api.yokena.cn/v1/Stream/Merchants/c2f1d67f-4257-43fb-9d52-dd8256d8554c';
console.log(url)
// var es = new EventSource(url, eventSourceInitDict);
//TODO ADD HEADER

var es = new EventSource(url)


///TEST ONLY
es.onmessage = function(e) {
  eventdata=e.data

  sse.broadcast('c2f1d67f-4257-43fb-9d52-dd8256d8554c', ['event'], eventdata);
  console.log(e.data);
};
///
app.get('/SubOrders', (req, res) => {
  console.log(req.query)
  if (JSON.stringify(req.query).length > 2) {
    var queryUri = [subOrdersUri]
    for (var key in req.query) {
      queryUri += key + "=" + req.query[key] + '&'
    }
    var merchantID =req.query['where'].replace('MerchantID = ','')
    console.log(merchantID)
    var eventdata = '';
    var EventSource = require('eventsource');
    // var eventSourceInitDict = {headers: {'Authorization': 'Bearer '+userToken}};
    const  url = 'https://api.yokena.cn/v1/Stream/Merchants/'+merchantID;
    console.log(url)
    // var es = new EventSource(url, eventSourceInitDict);
    //TODO ADD HEADER
    var es = new EventSource(url);
    es.onmessage = function(e) {
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
  var cate = axios.create({
    baseURL: queryUri,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
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


app.put('/SubOrders/*', (req, res) => {
  if (userToken.expired()) {
    // Callbacks
    userToken.refresh((error, result) => {
      userToken = result;
    })

    // Promises
    userToken.refresh()
      .then((result) => {
        userToken = result;
      });

  }
  console.log(userToken.token.access_token);

  var cate = axios.create({
    baseURL: APIUri,
    timeout: 50000,
    headers: {
      'Authorization': 'Bearer ' + userToken.token.access_token,
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

// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));
// app.get('/', function(req, res){
//   if(req.session.page_views){
//     req.session.page_views++;
//     res.send("You visited this page " + req.session.page_views + " times");
//   }else{
//     req.session.page_views = 1;
//     res.send("Welcome to this page for the first time!");
//   }
// });
app.get('/userInfo',(req,res) => {
  const response = {
    success: Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime(),
    username: Cookie.get('user_name') || '',
    message: ''
  };
  res.json(response)
});

app.get('/room/:merchantId', function(req, res) {
  var client = sse.add(req, res);

  sse.join(client, req.params.merchantId);
  console.log("!!!!!!!!!!!!")
  console.log(  sse.in(client, 'c2f1d67f-4257-43fb-9d52-dd8256d8554c'))

});
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
