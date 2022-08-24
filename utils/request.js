import {getAuth} from './auth';

const request = async (URL, options = {}) => {
  const auth = await getAuth();
  if (!options.headers) {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  if (auth !== null) {
    options.headers.Authorization = auth.token;
  }
  try {
    const response = await fetch(URL, options);
    let body;
    if (response.status === 200) {
      body = await response.json();
    } else {
      body = {
        status: 'error',
        error: `Error ${
          response.status
        } for ${URL} with options ${JSON.stringify(options)}`,
      };
    }
    return body;
  } catch (err) {
    console.log('Error', URL, options, err);
    return {
      status: 'error',
      error: 'Network Error. Please check your internet connection.',
    };
  }
};

const certificateRequest = async (URL, options = {}) => {
    const auth = await getAuth();
    if (!options.headers) {
      options.headers = {
        Accept: 'application/pdf',
        'Content-Type': 'application/pdf',
      };
    }
    if (auth !== null) {
      options.headers.Authorization = 'Bearer ' + auth.token;
    }
    try {
      const response = await fetch(URL, options);
      let body;
      if (response.status === 200) {
        body = response;
      } else {
        body = {
          status: 'error',
          error: `Error ${
            response.status
          } for ${URL} with options ${JSON.stringify(options)}`,
        };
      }
      return body;
    } catch (err) {
      console.log('Error', URL, options, err);
      return {
        status: 'error',
        error: 'Network Error. Please check your internet connection.',
      };
    }
  };
  
export {request, certificateRequest};
