const request = require('postman-request');

const geoCode = (address, callbackFun) => {
  const haha = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiYWJkb21vc3RhZmFoYWhhaGEiLCJhIjoiY2t0aHIydHpjMHVzaTJ2anljczd6aWVtbSJ9.fHoOADKhEhiV6iZnLACuvA`;
  
  request({url: haha, json: true}, (error, {body}) => {
    if(error) {
      callbackFun(`Unable to connect to location services`, undefined);
    } else if(body.features.length === 0) {
      callbackFun(undefined, `Unable to find location. Try another Location!`);
    } else {
      callbackFun(undefined, {
        long: body.features[0].center[0],
        lat: body.features[0].center[1],
        country: body.features[0].place_name,
      })

    }
  })
}

module.exports = geoCode;