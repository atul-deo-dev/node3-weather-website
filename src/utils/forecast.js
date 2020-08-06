const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e62ae9aceb05ba0dac248fded51de230&query='+latitude+','+longitude
    request({url,json:true},(error, {body} = {} ) => {
        if (error) {
            callback('OOPS ! Currently we are not talking to internet.',undefined)
        }
        else if (body.error) {
            callback('Unable to find the location',undefined)
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees hot. There is a  "+body.current.precip+"% chance of rain. .")
        }
    })
}

module.exports = forecast 