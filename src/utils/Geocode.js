const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address.toString()+'.json?access_token=pk.eyJ1IjoibWlhbi1iaWxhbCIsImEiOiJja3k5YzExdGcwNHY0Mm9tbmo0ajhrOGx5In0.VAkiap76DG7NiKc23A9tcg'
    request({url : url, json: true}, (error, response)=>{
        if(error){
            callback('Stable Internet connection can\'t be establised', undefined)
        } else if (response.body.features.length === 0){
            callback('Please enter a valid address', undefined)
        } else {
            callback(null, {
                location : response.body.features[0].place_name,
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
            })
        }
    })
}

module.exports = geocode