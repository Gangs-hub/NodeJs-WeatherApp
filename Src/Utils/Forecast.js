//Function for coordinates to temperature
const request=require('postman-request')
const forecast=(lattitude,logitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=33c36d9773406114b689239ec6d06b14&query='+ lattitude +','+logitude +'&units=m'
    request({url:url,json:true},(error,response)=>{
          //by object destruction>> here we are using only body propetie of object response
        //request({url:url,json:true},(error,{body}={})=>{}
        //Object shortHand url as property and and parameter same so
        //request({url,json:true},(error,{body}={})=>{}
            if(error){
                callback('Unable to connect to WeatherStack API!',undefined)
            }else if(response.body.error){
                //by object destruction>> else if(body.error){
                callback('Unable to get Location! Please try another',undefined)
            }else{
                var currTemp=response.body.current.temperature
                var apprentTemp=response.body.current.feelslike
                var overallDesc=response.body.current.weather_descriptions[0]
                //console.log( overallDesc+'. Current temperature is '+currTemp+' however it feels like '+apprentTemp)
                callback(undefined, overallDesc+'. Current temperature is '+currTemp+' however it feels like '+apprentTemp)
    
            }
            /*{
                currentTemp:currTemp,
                FeelsTemp:apprentTemp,
                'Overall Atmosphere':overallDesc

            }*/
    
    })
        }

        module.exports=forecast
           