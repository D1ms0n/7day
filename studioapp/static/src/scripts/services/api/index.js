import fetch from 'isomorphic-fetch';
import config from './../../configs';

/**
 * Service for creating api requests
 */

export default class ApiService {

  /**
   * Constructor of api service
   */

  constructor() {
  	this.config = config.api;
  }

  /**
   * Method for creating get request
   * @param {string} url - request url
   */

  getRequest(url) {
    return this.createRequest(
      `${this.config.url}${url}`,
        {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json'
          }
        }
      );
  }

  /**
   * Method for creating post request
   * @param {string} url - request url
   * @param {object} body - request payload
   */

  postRequest(url, body) {
    return this.createRequest(
      `${this.config.url}${url}`,
        {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
              'Content-type': 'application/json'
          },
          body: body
        }
      );
  }

  /**
   * Method for creating put request
   * @param {string} url - request url
   * @param {object} body - request payload
   */

  putRequest(url, body) {
    return this.createRequest(
  	  `${this.config.url}${url}`,
  		{
  		  method: 'PUT',
  		  headers: {
  		  	'Content-Type': 'application/json'
  		  },
  		  body: JSON.stringify(body)
  		}
  	);
  }

  /**
   * Method for creating delete request
   * @param {string} url - request url
   */

  deleteRequest(url) {
    return this.createRequest(
  	  `${this.config.url}${url}`,
  	  {
  	    method: 'DELETE',
  	    headers: {
  	      'Content-Type': 'application/json'
  	    }
  	  }
  	);
  }

  /**
   * Method for creating request
   * @param {string} url - request url
   * @param {object} config - fetch config
   */

  createRequest(url, config) {
    return fetch(url, config)
      .then((res) => {
        if (res.status === 404) {
          throw new Error(`Cannot get ${url}.`);
        }
        return res.json();
      })
      .catch((e) => {
          console.log(`Occurs an error during creatung request: ${e.message}`);
      });
  }
}