const mongoose = require('mongoose')
const {Schema} = mongoose

const ExpenseSchema = new Schema ({
    expenseName:{
        type:String,
    },
    amount:{
        type:Number
    },
    date:{
        type:Date
    },
    salary:{
        type:Number
    },
    category:{
        type:String
    },
    ptype:{
        type:String
    }
})
const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        default:Date.now
    },
    expense:{
        type:[ExpenseSchema],
        default:[]
    }
    // date:{
    //     type:Date,
    //     default:Date.now
    // }
})

module.exports=mongoose.model('user',UserSchema)