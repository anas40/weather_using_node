const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5hczQwIiwiYSI6ImNrMGFtYTN1dDBqZTgzcG1xdG9qenVsMDYifQ.DI4tDQ7DJzl1_hktNJDpew&limit=1';
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback("Unable to connect to positioning services!",undefined); //if we do not provide 2nd arg then it would be assigned undefined by js
        }
        else if(body.message || body.features.length === 0){
            callback("Incorrect position",undefined);
        }
        else{
            const {place_name:location,center} = body.features[0]
            callback(undefined,{
                latitude:center[1],
                longitude:center[0],
                location
            });
        }
    });
}

module.exports = geocode;