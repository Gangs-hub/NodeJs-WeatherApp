const path=require('path') //core module
const express=require('express')//express is function object
const hbs=require('hbs')
const { match } = require('assert')//come automatically

const GeoCode=require('./Utils/GeoCode')
const Forecast=require('./Utils/Forecast')


/*console.log(__dirname)
console.log(path.join(__dirname,'../public'))*/

const app=express()  //function create exp application
const port=process.env.PORT || 3000 //line will take port fm ruuning env or 3000 port

//Define path for express config
const publicDirPath=path.join(__dirname,'../public')
const viewPatah=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handler bars engine and views location
app.set('view engine','hbs')//handle bar set for dynamic template set
app.set('views',viewPatah)//to provide explicite path of views if we did not created views dir for .hbs files
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))//dir to load on server start

//Route handlers
app.get('/',(req,res)=>{ //common root dirr
    res.render('index',{
        title:'Weather',
        name:'Gangs Kadam'
    })
})

//Dynamic page for about
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Gangadhar Kadam'
    
    })

})
//Dynamic Page for Help.html
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        name:'Gangadhar Kadam'
    })

})

/*This wont be used as we configured by default file to open on server
app.get('',(req,res)=>{  // on local host route
   // res.send('Hello Express!')
   res.send('<h1>Hello Express</h1>')
    
})*/

//app.com
//app.com/help
/*app.get('/help',(req,res)=>{
    //res.send('About to help you!')
    //JSON Object
    res.send([{
        name:'Gangs',
        age:26
    },
    {
        name:'Boby',
        age:23
    }
    ])
})

//Challenge:::----to make route to websites
//app.com/about
//app.com/weather
app.get('/about',(req,res)=>{
  //  res.send('We are specail!')
res.send('<h2>Title is About!<h2>')
})*/

app.get('/weather',(req,res)=>{
   // res.send('Nanded weather is always cool!')

if(!req.query.address){
   return res.send({
      Error: 'Error!Please provide address!'
    })
}
var address=req.query.address
//call back function:
GeoCode.geoCode(address,(error,{lattitude,logitude,Location}={})=>{
    //in Coach's code cordinateRes object got destucted and used below
    //GeoCode.geoCode(address,(error,{lattitude,logitude,Location}={})=>{
        //if we use only GeoCode.geoCode(address,(error,{lattitude,logitude,Location})=>{
            //and any unexpected ! or @ address given by user then hv to use ={}

    if(error){
        return res.send({Error:error })
       
    }
    Forecast.forecast(lattitude,logitude,(error,foreCastresult)=>{
     if(error){ 
         return res.send({Error:error})
         
     }
     //res.send('all working fine!')

     res.send ({
        forecaste:foreCastresult,
         location:Location,
         address:req.query.address

         
     })



    })


})





    /*{
       location:req.query.address,
       temprature:26
   }*/
   
})

app.get('/products',(req,res)=>{
   
    if(!req.query.search){
        res.send({
            Error:'you must send search key!'

        } )

       //insted of else we can provide retun for  res.send({ Error:'you must send search key!'
    }else{
           
        console.log(req.query.rating)
        res.send({
            products:[]
        })
    }

 

})

/*
//we can provide specific 404 error
app.get('/help/*',(req,res)=>{
    res.send('404.help page article not found!')
})

//if nothing of route match then this will match and show error 404 page
app.get('*',(req,res)=>{
res.send('404 page,request doenot match')
})
*/
//hanlebars and partils
//specific help 404
app.get('/help/*',(req,res)=>{
res.render('404',{
title:404,
name:'Gangadhar Kadam',
errorMessage:'Help page article not found!'

})
})


//for common errors generic 404
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Gangadhar Kadam',
        errorMessage:'Page not found!'

    })
})


//to make server Up
app.listen(port,()=>{
console.log('Server is Up and running on port'+port)
})
