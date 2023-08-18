const express = require('express')
const {UserModel} = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userRouter = express.Router()


userRouter.post('/register', async(req, res)=>{
    const {userName, email, password, age} = req.body

    const userExist = await UserModel.findOne({userName})
    

    try {

        if(userExist){
            res.status(200).send({"msg": `user already exist with ${userName}`})
        }
        else{

            bcrypt.hash(password, 7, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    res.status(200).send({"msg": err})
                }
                else{
                    const user = new UserModel({userName, email, password: hash, age})
                    await user.save();
                    res.status(200).send({"msg": "User has been registered succesfully"})
                }
            });
        }

    } catch (error) {
        res.status(400).send({"msg": error})
    }
})

userRouter.post('/login', async(req, res)=>{
    const {userName,password} = req.body;
    // console.log(req.body);

    const userExist = await UserModel.findOne({userName})
    // console.log(userExist);
    
    try {
        
        if(userExist){

            bcrypt.compare(password, userExist.password , (err, result)=> {
                // result == true
                if(result){
                    const token = jwt.sign({userId: userExist._id, userName: userExist.userName}, 'murmu',  { expiresIn: '1h' });
                    res.setHeader("authorization", token)
                    res.cookie('authorization', token, {httpOnly: true }); // Adjust maxAge and other options as needed
                    res.status(200).send({"msg": "Login Successfull", token: token, userId: userExist._id})


                }
                else{
                    res.status(200).send({"msg": "Entered Wrong Crendentials"})
                }
            });

        }
        


    } catch (error) {
        res.status(400).send({"msg": error})
    }
})




module.exports = {
    userRouter
}