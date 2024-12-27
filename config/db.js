const { default: mongoose } = require("mongoose")
const express = require("express")
require("dotenv").config()

const DBConnection = async() => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/taskList`)
        console.log("DB Connected Successfully")

    }catch(err){
        console.log({message:err})
    }
}

module.exports = DBConnection