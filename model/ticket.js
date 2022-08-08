const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema({

    title:{
    type:String,
    },
    description:{
    type:String,
    },
    status:{
    type:String,
    enum:['open','close'],
        default:'open',
    },
    priority:{
    type:String,
    enum:['low','medium','high'],
        default:'low',
    },
    assignedTo:{
    type:String,
    type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
   
},
    
       { timestamps: true }
       );
       module.exports = mongoose.model("ticket", ticketSchema);