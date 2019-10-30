const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGFubWF5NjktNDIwIiwiYSI6ImNrMW55bHpnajBiYWkzYnFmejM5NTd2ZzEifQ.SMgqJkcQOuzdFBUAJwYzeQ&limit=1";
    request({
        url,
        json: true
    }, (error, response) => {
        const {
            features
        } = response.body.features[0];
        if (error) {
            callback("unable to connect", undefined);
        } else if (response.body.features.array === 0) {
            callback('Unable to find to location.Try antother search', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longtitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;