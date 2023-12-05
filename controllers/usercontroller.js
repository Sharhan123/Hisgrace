const express = require('express');
const router = express.Router();
const userdata = require('../models/usermodel')
const bcrypt = require('bcrypt')
module.exports = {
 homepage : async (req,res) =>{
    try{
        if(req.cookies.user){
            const user = req.cookies.user

            res.render('user/home',{user})
            
        }else{
            res.render('user/home',{user:""})
        }     
    } catch(err){
        console.log(err);
    }
},

getlogin : async (req,res)=>{
try{
let error = ''
if(req.query.error){
    error = req.query.error
}

res.render('user/login',{error})
} catch(err){
    console.log(err);
}
},

login : async (req,res)=>{
    try{
        const user = await userdata.findOne({email:req.body.email})
        if(!user){
            res.redirect('/getlogin?error = invalid email id')
        }else{
            const cdata = {
                name : user.username,
                email: user.email,
                phone : user.phone
            }
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                  // Handle error
                  return res.status(500).send('Error comparing passwords');
                }
        
                if (isMatch) {
                  res.cookie('user', cdata, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
                  res.redirect('/');
                } else {
                  // Passwords do not match, handle accordingly
                  res.redirect('/getlogin?error=password is incorrect')
                }
              });
            }
          
        
    } catch(err){
        console.log(err);
    }
},

getsignup: async (req,res)=>{

    try{

        let error = ""
        if(req.query.error){
            error = req.query.error
        }
        res.render('user/signup',{error})

    } catch(err){
        console.log(err);
    }


}

,
signup: async (req,res) =>{
    try{
        
        const {name,email,password,cpassword,phone} = req.body

        const exist =  await userdata.findOne({email:email})
        

        if(exist){
            res.redirect('/getsignup?error=User with Email or Phone already exists')
        }else{
            if(password === cpassword){
                const bpassword = await bcrypt.hash(password, 10)
            const data = new userdata({
                username : name,
                email: email,
                password : bpassword,
                phone : phone         
            })
            await data.save()

            const udata = {
                name : name,
                email : email,
                phone: phone
            }
            res.cookie('user',udata,{ maxAge: 3600000, httpOnly: true })
            res.redirect('/')
        }else{

            res.redirect('/getsignup?error=confirm password does not match')
        }
        }


    } catch(err){
        console.log(err);
    }
},


logout : async (req,res)=>{
    try{
        res.clearCookie('user')
        res.redirect('/')
    } catch(err){
        console.log(err);
    }
}

}