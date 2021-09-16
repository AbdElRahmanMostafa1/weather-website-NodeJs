const request = require('postman-request');

const forecast = (long, lat, callbackFun) => {
  const weatherURL = `http://api.weatherstack.com/current?access_key=fe4e2bcf595713dacb4eb6234b36dc1d&query=${lat},${long}`;

  request({url: weatherURL, json: true}, (error, {body}) => {
    if(error) {
      callbackFun(`Opps! Can't connect to get weather!`, undefined)
    } else if(body.error) {
      callbackFun(`Unable to find the location. Try another search!`, undefined)
    } else {
      const temp = body.current.temperature;
      const feelslike = body.current.feelslike;
      callbackFun(undefined, `The temperature is ${temp} and it feels like ${feelslike}`);
    }
  })
}

module.exports = forecast;