console.log('Client Side JS file is loaded up!')
//
/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{
response.json().then((data)=>{
console.log(data)
})

})*/

//weather info challenge


//wiring up this js with html form

//to get my form
const weatherForm=document.querySelector('form')//grab form from html and referenced
const search=document.querySelector('input')//grab input and stored/refferced to search variable
const messageOne=document.querySelector('#message-1') //to grab element by its ID
const messageSecond=document.querySelector('#message-2')
//messageOne.textContent='From empty para'

//in client side js there are plenty of eventlisterners on of then is 'submit'
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()//to prevent default behaviour of browser to load page on serach 
    const locationProvided=search.value
   // console.log(locationProvided)
if(!locationProvided||locationProvided==='')
{
//console.log('Please provide Input!')
messageOne.textContent='Please provide Input!'
}else{
    messageOne.textContent='Loading....'
    messageSecond.textContent=''

    fetch('http://localhost:3000/weather?address='+locationProvided).then((response)=>{
    
        response.json().then((data)=>{
        
        if(data.Error){
          //  console.log(data.Error)
          messageOne.textContent=data.Error
        
        }else{
            //console.log('location is '+data.location)
            //console.log('Forecaste is '+data.forecaste)
            messageOne.textContent=data.location         
            messageSecond.textContent=data.forecaste


        }
        
        })
        
        })

}
})
