const BASE_URL = 'https://haystack-api.herokuapp.com';
let configuration = {
  token: null,
  projectName: null
};
const userAgent = window.navigator.userAgent;

export default {
  configure(options) {
    configuration = Object.assign(configuration, options);
  },

  onWindowError: function onWindowError(message, source, lineno, colno, error) {
    if (!configuration.token) {
      console.log('Whoops! Looks like you imported the script but did\'t configure it with a token.');
      console.log('Try Haystack.configure({ token: <Your given token>, projectName: "Error free project" });');
      throw new Error('Haystack not configured with a token.');
    }

    if (!configuration.projectName) {
      console.log('Whoops! Looks like you imported the script but did\'t configure it with a projectName.');
      console.log('Try Haystack.configure({ token: <Your given token>, projectName: "Error free project" });');
      throw new Error('Haystack not configured with a projectName.');
    }

    fetch(`${BASE_URL}/errors`, {
	     method: 'post',
       headers: {
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         message,
         projectName: configuration.projectName,
         stacktrace: error.stack,
         token: configuration.token,
         userAgent
       })
    }).then(function(response) {
      console.log('Error logging worked!');
    }).catch(function(err) {
    	console.log('Error trying to talk to haystack servers');
    });
  },

  testError() {
    const err = new Error('Haystack test error');
    err.stack = 'Here is a super legit stacktrace';
    
    onWindowError('Howdy! Here is a test error', null, null, null, err);
  }
};
