const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Loger = require('../models/loger')
//const objectId = require('mongoose').ObjectId

const mongoose = require('mongoose')
const { findOne } = require('../models/user')
const { updateOne} = require('../models/loger')
//const loger = require('../models/loger')
const db = "mongodb://127.0.0.1:27017/mydb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

mongoose.connect(db, err =>{
    if(err){
        console.error('Error!'+err)
    }
    else{
        console.log('connected to mongodb')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/',(req,res)=>{
    res.send("From API route")
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save().then(registeredUser=>{
        let payload = { subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
    })
    .catch(err=>{
        console.log(err);
    })
})

let userData
router.post('/login',(req,res)=>{
    userData = req.body

    User.findOne({email: userData.email}, (error,user) =>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }
            else{
                if(user.password!=userData.password){
                    res.status(401).send('Invalid pswd')
                }else{
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.post('/logs',(req,res)=>{
   let logerData = req.body
    let loger = new Loger(logerData)
    loger.save().then(loggedUser=>{
        console.log(loggedUser)
        res.status(200).send(loggedUser)
     //console.log(logerData)
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/test',verifyToken)

let adval;
router.get('/view', (req, res) =>{
    if(userData.email === "admin@a.com"){
        adval=true
        console.log("getting all user details")
    Loger.find({})
    .exec(function(err,logdata){
        if(err){
            console.log("error loading")
        }else{
            res.json(logdata)
        }
    })
    }
    else{
    adval=false
    console.log("getting user details")
    Loger.find({email : userData.email})
    .exec(function(err,logdata){
        if(err){
            console.log("error loading")
        }else{
            res.json(logdata)
        }
    })
}
})

router.get('/viewcheck', (req, res) =>{
    res.json(adval)
})

router.post('/changecheck', (req, res) =>{
    let eventData=req.body
    let id = req.body._id
    let eventlog = new Loger(eventData)
    //console.log(eventlog)
    eventData.stat="Accepted"
   console.log(eventData.stat)
        Loger.updateOne({"_id": id},{$set:eventData},(err,res)=>{
            console.log("item updated")
    
        })
        console.log(eventData)
        res.json(eventData)  
})

router.post('/changecheckR', (req, res) =>{
    let eventData=req.body
    let id = req.body._id
    let eventlog = new Loger(eventData)
    //console.log(eventlog)
    eventData.stat="rejected"
   console.log(eventData.stat)
        Loger.updateOne({"_id": id},{$set:eventData},(err,res)=>{
            console.log("item updated")
    
        })
        console.log(eventData)
        res.json(eventData)  
})

module.exports = router