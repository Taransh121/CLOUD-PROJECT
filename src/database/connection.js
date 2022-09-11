const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/CloudProject",{   //connect method hume ek promise return krta hai

}).then(()=>{  //Agar connect hojata hai toh-
    console.log("Connection successful");
}).catch((e)=>{ //Agar connect ni ho pata or error ajata hai
    console.log("Connection failed");
})