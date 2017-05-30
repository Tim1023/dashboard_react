const apiServer = require('axios');
const endpoint = 'https://api.yokena.cn/';
apiServer.defaults.endpoint = endpoint;

module.exports = apiServer;
