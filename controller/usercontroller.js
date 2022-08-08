const user = require("../model/user");
const ticket = require("../model/ticket");
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
var bearerToken = require('bearer-token')
var jwt = require("jsonwebtoken");


app.use(express.json());

async function register(req, res) {
    try {

        const users = await user.findOne({ email: req.body.email });

        if (users) {
            throw new Error("Email already required");
        }


        const result = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,     
        });

        // console.log(result);    


       

        const token = jwt.sign({
                id: result._id,
            },
            process.env.jwt_secret, {
                expiresIn: "24h",
            }
        ); 
        
        
console.log(token);

   
        result.token = token;

        await user.updateOne({ _id: result._id }, { token });


        // let plainuser = result;
        // delete plainuser.password;


        // console.log(plainuser);


        return res.status(200).json({
            status: true,
            message: "register sucessfully",
            response: result,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,

      
            message: err.message,
        });
    }
}

async function ticketregister(req, res) {
    try {

        const data = await user.findById(req.user.id);

        console.log("ksdfgjudsfjgs",data);


        const result = await ticket.create({

            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            role: req.body.role,     
            priority: req.body.priority, 
         assignedTo:data._id
        });

        constresult = await ticket(result).save();



            return res.status(200).json({
            status: true,
            message: "register sucessfully",
            response: result,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,

      
            message: err.message,
        });
    }
}
async function ticketget(req, res) {
    try {
        const data = await ticket.findById({_id : req.body.id});

        console.log("ksdfgjudsfjgs",data);

            return res.status(200).json({
            status: true,
            message: "register sucessfully",
            response: data,
        });
    } catch (err) {
        return res.status(400).json({
            status: false,

      
            message: err.message,
        });
    }
}
async function ticketdelete(req, res) {
    try {

        const data = await ticket.findByIdAndDelete({_id : req.body.id});

        console.log("ksdfgjudsfjgs",data);

            return res.status(200).json({
            status: true,
            message: "Delete sucessfully",
            
        });
    } catch (err) {
        return res.status(400).json({
            status: false,

      
            message: err.message,
        });
    }
}


async function closeTicket(){
    
}
module.exports = {
    register,
    ticketregister,
    ticketget,
    ticketdelete,
    closeTicket
};