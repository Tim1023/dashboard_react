import request from 'utils/request';

let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && proFcess.env.NODE_ENV === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}

const auth = {
  /**
   * Logs a user in, returning a promise with `true` when done
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  login(username, password) {
    if (auth.loggedIn()) return Promise.resolve(true);
    return request('/Token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password:password }),
    })
      .then((response) => {
        // Save token to local storage
        localStorage.token = response.data.token.access_token;
        request('/Users',{headers:{'Authorization': 'Bearer ' + response.data.token.access_token,
          'Content-Type':'application/json'}})
          .then((response) => {
            console.log(response)
            localStorage.UserID = response.data[0].ID;
          })
        return Promise.resolve(true);

      })
  },
  /**
   * Logs the current user out
   */
  // logout() {
  //   return request.post('/logout');
  // },
  logout() {
    return new Promise((resolve) => {
      localStorage.removeItem('token');
      resolve(true);
    });
  },
  /**
   * Checks if a user is logged in
   */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
   * Registers a user and then logs them in
   * @param  {string} username The username of the user
   * @param  {string} password The password of the user
   */
  register(username, password) {
    // Post a fake request
    return request('/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password:password }),
    })
    // Log user in after registering
      .then(() => auth.login(username, password));
  },

  onChange() {

  },
};

export default auth;
