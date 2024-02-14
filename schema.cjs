const mongoose = require('mongoose')
const restaurantsSchema=new mongoose.Schema({
    areaName:{
        type:String,
        required:true,unique:true
    },
    avgRating:{
        type:Number
    },
    costForTwo: {
       
        type:String
    },
    cuisines:{
        type:Array
    },
    imageLink:{
        type:String
    },
    name :{
        type:String
    },   
},{versionKey:false})
const Restaurant = mongoose.model('resList',restaurantsSchema)
const userSchema = new mongoose.Schema({
    contact:{
        type:String
    },
    email : {
        type : String
       
    },
    password : {
        type : String
    },
    userName : {
        type : String
    }
   
    
},{versionKey:false})

// model
const Users = mongoose.model('details', userSchema)
module.exports  = {Restaurant,Users}