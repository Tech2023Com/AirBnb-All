// For Supervisor



import axios from 'axios';
import  store  from '../Store/Store';
import { refreshToken } from '../Actions/AuthActions';


var axiosInstance = axios.create();

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(token) {
  subscribers = subscribers.filter(callback => callback(token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}



axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('x-auth');


  if(token) {
    config.headers.authorization = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401 && config.headers.authorization) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      store.dispatch(refreshToken()).then((token) => {
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(token);
      }).catch( (err) => {
        // store.dispatch(logoutuser());
      });
    }

    const retryOriginalRequest = new Promise((resolve, reject) => {
      addSubscriber(token => {
        originalRequest.headers.authorization = token;
        resolve(axios(originalRequest));
      });
    });

    return retryOriginalRequest;
  } else {
    return Promise.reject(error);
  }
});

export default axiosInstance;