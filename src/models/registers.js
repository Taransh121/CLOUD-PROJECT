const mongoose=require("mongoose")
const user_schema=new mongoose.Schema({  //Defining the schema of our database
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }
})

//We need to create a collection now    
const Register=new mongoose.model("ToDoList",user_schema);
module.exports=Register;