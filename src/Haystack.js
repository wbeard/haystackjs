const BASE_URL = 'https://haystack-api.herokuapp.com';
let configuration = {
  token: null,
  meta: {},
  projectName: null
};
const userAgent = window.navigator.userAgent;

export default {
  configure(options) {
    configuration = Object.assign(configuration, options);
  },

  onWindowError(message, source, lineno, colno, error) {
    fetch(`${BASE_URL}/errors`, {
	     method: 'post',
       mode: 'cors',
       body: {
         message,
         meta: configuration.meta,
         projectName: configuration.projectName,
         stacktrace: error.stack,
         token: configuration.token,
         userAgent
       }
    }).then(function(response) {
      console.log('Error logging worked!');
    }).catch(function(err) {
    	console.log('Error trying to talk to haystack servers');
    });
  }
};
