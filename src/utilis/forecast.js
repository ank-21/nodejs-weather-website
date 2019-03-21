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
            callback(undefined,response.body.daily.data[0].summary +' The highest temperature of today was ' + ((response.body.daily.data[0].temperatureHigh-32)*0.56).toPrecision(4) + ' degree celsius and the lowest was ' + ((response.body.daily.data[0].temperatureLow-32)*0.56).toPrecision(4) + ' degree celsius. It is currently '+ ((response.body.currently.temperature-32)*0.56).toPrecision(4) + ' degree celsius . There is '+ response.body.currently.precipProbability+'% chance of rain. Currently there is '+ (response.body.currently.humidity*100).toPrecision(2) +'% humidity and the current wind speed is '+ response.body.currently.windSpeed + 'km/hr which was '+response.body.hourly.data[0].windSpeed+ 'km/hr an hour ago.')
        }
    })
}

module.exports = forecast