const request = require('request');

const forecast = (latittude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/b03db8164f097644c9986c7916123ab0/${latittude},${longtitude}?units=si`;

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            return callback("Unable to get data", undefined);
        } else if (response.body.error) {
            console.log("unable to find location");
        } else {
            const {
                temperature,
                precipProbability
            } = response.body.currently;
            const dailyData = response.body.daily.data[0];
            const sendData = `${dailyData.summary} It is currently ${temperature} degrees out there is ${precipProbability} chance of rain`
            return callback(undefined, sendData);

        }
    })

}


module.exports = forecast;