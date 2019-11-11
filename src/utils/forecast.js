const request = require('request')

const forecast = (longitude, latitude, callback)=> {
const url = 'https://api.darksky.net/forecast/b983cf99e90748ae51771d72998f6534/'+longitude+','+latitude+'?lang=es&units=si'
request({url, json:true},(error, {body})=>{
    if (error){
        callback('Conection Error',undefined)
    }else if (body.error){
        callback('Unable to find weather location!',undefined)
    }else {
        
        callback(undefined,'Timezone: '+ body.timezone+" " + body.daily.data[0].summary + " It is currently " + body.currently.temperature + 
                 " degrees out. "+ " There  is a " + body.currently.precipProbability * 100 + 
                 '% chance of rain.' )
    }
})

}

module.exports = forecast