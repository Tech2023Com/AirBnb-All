// For Super Admin


import axios from 'axios';
import  store  from '../Store/Store';
import { refreshToken } from '../Actions/Login';


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
  

  console.log('token')
  console.log(token)
  console.log('token')


  if(token) {
    console.log("in if condition")
    config.headers.authorization = token;
    console.log("in if condition")
  }
  return config;
});

axiosInstance.interceptors.response.use(function (response) {
  console.log("jsdjkdksjdsjdlsdsjdlk")
  console.log(response)
  return response;
}, function (error) {
  console.log('error')
  console.log(error)
  console.log('error')
  const { config, response: { status } } = error;
  const originalRequest = config;



  if (status === 401 && config.headers.authorization) {
    if (!isAlreadyFetchingAccessToken) {
      console.log("11770")
      isAlreadyFetchingAccessToken = true;
      store.dispatch(refreshToken()).then((token) => {
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched(token);
      }).catch( (err) => {
        console.log(err)
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