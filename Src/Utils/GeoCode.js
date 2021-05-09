//CallBack Pattern: to make code reusable
const request=require('postman-request')


const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2FuZ3MiLCJhIjoiY2tuc3Z6djNqMHVwdTJvbzMwc2tva3FzbSJ9.rNBtjuIeW99Xi59zju7b1w&limit=1'
    request({url:url,json:true},(error,response)=>{
        //by object destruction>> here we are using only body propetie of object response
        //request({url:url,json:true},(error,{body}={})=>{}
        //Object shortHand url as property and and parameter same so
        //request({url,json:true},(error,{body}={})=>{}
        
        if(error){
            callback('Unable to connect to MapBox.com',undefined)
        }else if(response.body.features.length===0){
            // //by object destruction>> we can remove all instances for body
            //else if(response.features.length===0){ in all below as well
            callback('unable to find location. Please check query!')
        }else{
            var logitude=response.body.features[0].center[0]
            var lattitude=response.body.features[0].center[1]
            var locationQuery=response.body.query[0]
            var res=locationQuery+' is location those logitude is '+logitude+' and lattitude is '+lattitude
            callback(undefined,{        //JS object
                lattitude:response.body.features[0].center[1],
                logitude:response.body.features[0].center[0],
                Location:response.body.features[0].place_name
                  
                
            })
        }
    })
    
    }

   






    module.exports=geocode
        
        
    