const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c6cd60e423576de3e8365129b110fc20/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({
        url,
        json: true
    }, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect",undefined);
        } else if (body.error) {
            callback("Unable to find",undefined);
        } else {
            const {temperature,precipProbability} = body.currently;
            callback(undefined,`${body.daily.data[0].summary} It is currently ${temperature}C out there.There id ${precipProbability}% probability of rain.`);
        }
    });
}

module.exports = forecast;