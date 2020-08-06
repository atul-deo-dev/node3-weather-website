const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXR1bGRlbyIsImEiOiJja2RjdGpnbTQxNWhhMnV0OWZlcWFmdjFkIn0.GjWMIEP54yGlT4e1L_ZTvg&limit=1'
    request({url,json: true},(error, {body} = {} )=> {
        if (error) {
            callback({error: 'No internet connection'},undefined)
        }
        else if (body.features.length === 0) {
            callback({error: 'Unable to find location, Try another search'},undefined)
        }
        else
        {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode