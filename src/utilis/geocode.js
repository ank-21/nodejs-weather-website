const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address+ '.json?access_token=pk.eyJ1IjoiYW5raXQyMTU5OCIsImEiOiJjanQ4OHV1YjEwMTAxNDNvamV2amR4ZG9wIn0.vk0ndL5iA8adSX8F43LOrw&limit=1'

    request({
        url,
        json: true
    }, (error,response) => {
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find location!. Try another search..',undefined)
        }else{
            callback(undefined,{
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode