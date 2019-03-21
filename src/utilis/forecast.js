const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/10c6b7ef64c49b2bf6d1255fea9d80b9/'+latitude+','+longitude

    request({
        url,
        json: true
        }, (error,response) => {
        if(error){
            callback('Unable to connect to the weather service!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,response.body.daily.data[0].summary + 'It is currently '+ ROUND((response.body.currently.temperature-32)*0.56) + 'degree celsius out.There is '+ response.body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast