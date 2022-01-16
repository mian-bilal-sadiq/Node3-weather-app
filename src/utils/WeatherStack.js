const request = require('postman-request')

const weatherStack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=643dd502ffe76ec5da97628aebbe642d&query='+latitude+','+longitude
    request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('Sorry, stabel connection isn\'t available', undefined)
        } else if(response.body.error){
            callback({
                error_message : 'Entered location isn\'t valid',
                error_server : response.body.error.info
            },undefined)
        } else {
            callback(undefined, ({
                weather_description : response.body.current.weather_descriptions[0],
                temperature : response.body.current.temperature,
                feels_like : response.body.current.feelslike,
                forecast : 'It is '+ response.body.current.weather_descriptions[0] + '. The temperature is '+response.body.current.temperature+ ' but it feels like ' +response.body.current.feelslike+'.'
            }))
        }
    })
}

module.exports= weatherStack