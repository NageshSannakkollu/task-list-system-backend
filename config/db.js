const { default: mongoose } = require("mongoose")
const express = require("express")
require("dotenv").config()
const dbUri = process.env.MONGO_URI

const DBConnection = async() => {
    try{
        await mongoose.connect(dbUri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("DB Connected Successfully")

    }catch(err){
        console.log({message:err})
    }
}

module.exports = DBConnection