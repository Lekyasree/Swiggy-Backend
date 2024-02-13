const bodyParser = require('body-parser')
const express = require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const{Restaurant,Users}=require('./schema.cjs')

const app =express()
app.use(bodyParser.json())
app.use(cors())
 async function connectTODb(){
    try{
     await mongoose.connect('mongodb+srv://LekyaSree:Lekya64@cluster0.uwfzgz8.mongodb.net/Swiggy?retryWrites=true&w=majority')
       console.log('DB connection established ;)')
     const port=process.env.port || 4000
     app.listen(port,function(){
    console.log(`Listening on port ${port}...`)
})
    }catch(error){
        console.log(error)
    }

}
connectTODb()

app.post('/add-restaurant',async function(request,response){
    try{
        await Restaurant.create({
        "areaName":request.body.areaName,
        "avgRating":request.body.avgRating,
        "costForTwo":request.body.costForTwo,
        "cuisines":request.body.cuisines,
        "name":request.body.name
        })
        response.status(201).json({
            "status":"success",
            "message":"user created"
        })
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"internal server error",
            "error":error
        })
    }
})
app.get('/get-restaurant-details',async function(request,response){
try{
    const restaurantDetails =await Restaurant.find()
    response.status(200).json(restaurantDetails)
}catch(error){ 
 response.status(500).json({
    "status":"failure",
    "message":"couldnot fetch details",
    "error":error
 })

}
})
app.post('/create-new-user', async function(request, response) {
    try {
         await Users.create({
             "userName" : request.body.username,
             "email" : request.body.email,
             "password" : request.body.password,
             "contact":request.body.contact
         })
         response.status(201).json({
         "status" : "success",
         "message":"user created"
         })
    } catch(error) {
         response.status(500).json({
             "status" : "failure",
             "message":"internal server error"
         })
    }
 })
 
 app.post('/validate-user',async function(request, response) {
  try{
   const user= await Users.findOne({
    "email":request.body.email,
    "password":request.body.password

   })
   if(user){
    response.status(200).json({
        "message":"valid user"
    })
   }else{
    response.status(401).json({
        "message":"invalid user"
    })
   }
  }
  catch(error){
    response.status(500).json({
        "message":"internal server error"
    })
  }
 })