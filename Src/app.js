const path=require('path') //core module
const express=require('express')//express is function object
const hbs=require('hbs')
const { match } = require('assert')//come automatically

const geocode=require('./Utils/geocode')
const forecast=require('./Utils/forecast')


/*console.log(__dirname)
console.log(path.join(__dirname,'../public'))*/

const app=express()  //function create exp application
const port=(process.env.PORT) || (3000);
//line will take port fm ruuning env or 3000 port

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



app.get('/weather',(req,res)=>{
   // res.send('Nanded weather is always cool!')

if(!req.query.address){
   return res.send({
      Error: 'Error!Please provide address!'
    })
}

//call back function:
geocode(req.query.address,(error,{lattitude,logitude,Location}={})=>{
    //in Coach's code cordinateRes object got destucted and used below
    //GeoCode.geoCode(address,(error,{lattitude,logitude,Location}={})=>{
        //if we use only GeoCode.geoCode(address,(error,{lattitude,logitude,Location})=>{
            //and any unexpected ! or @ address given by user then hv to use ={}

    if(error){
        return res.send({error })
       
    }
    forecast(lattitude,logitude,(error,foreCastresult)=>{
     if(error){ 
         return res.send({error})
         
     }
     //res.send('all working fine!')

     res.send ({
        forecaste:foreCastresult,
         location:Location,
         address:req.query.address

         
     })



    })


})

   
})
/*
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

 

})*/


//specific help 404
app.get('/help/*',(req,res)=>{
res.render('404',{
title:'here is 404!',
name:'Gangadhar Kadam',
errorMessage:'Help page article not found!'

})
})


//for common errors generic 404
app.get('*',(req,res)=>{
    res.render('404',{
        title:'here is too 404!',
        name:'Gangadhar Kadam',
        errorMessage:'Page not found!'

    })
})


//to make server Up
app.listen(port,()=>{
console.log('Server is Up and running on port'+port)
})
