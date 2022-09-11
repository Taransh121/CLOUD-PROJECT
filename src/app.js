const express=require ("express");
const app=express();
const path=require("path");
const hbs=require("hbs");                       // importing handlebars
const port=process.env.PORT || 3000
require("./database/connection")                     //building a database
const Register=require("./models/registers")   //importing our schema

// Now if we want to make our "index.html" file(If we create any inside our public folder) go live.
// const static_folder_path=path.join(__dirname,"../public")  
// console.log(static_folder_path);
// app.use(express.static(static_folder_path))


//Now if we want to make our template engine i:e handlebars(hbs) "index.hbs" file go live.
const template_path=path.join(__dirname,"../templates/views")   //yha pr hum log apne 'views' folder ka path dere hai.
// const partials_path=path.join(__dirname,"../templates/partials")   //yha pr hum log apne 'partials' folder ka path dere hai.

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine","hbs");         //yha pr hum log template engine set krre hai.
app.set("views",template_path)        //yha pr hum ye btare hai ki ab "views" ki jagh "template_path" ko dhundho.
// hbs.registerPartials(partials_path)   //Yha pr hum log apne partials file ko register kr rhe hai.
app.get("/",(req,res)=>{
    res.render("index")
});
//Registering an old user-
app.get("/register",(req,res)=>{
    res.render("register")
});
app.get("/about",(req,res)=>{
    res.render("about")
});
//Checking conditions to register an old user
app.post("/register",async (req,res)=>{
    try{
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;
        if(password==confirmpassword){
            const registerUser=new Register({    //Ye hum logo ne saara data get krliya hai
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phonenumber:req.body.phonenumber,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
            })
            //Ab hum log apna data save krenge
            const registered=await registerUser.save();
            res.status(200).render("index")
        }
        else{
            // res.send("Passwords do not match")
            res.status(404).render("pwdonotmatch")
        }
    }catch(error){
        res.status(400).send(error)
    }
});
//Signing in a new user page-
app.get("/login",(req,res)=>{
    res.render("login")
})
//Checking conditions for a new user signin-
app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        
        const useremail=await Register.findOne({email:email}); //ye check krra hai ki jo email hum log enter krre hai vo database mai hai ki ni
        // res.send(useremail);
        if (useremail.password==password){
            res.status(200).render("index")
        }
        else{
            // res.send("Invalid login details")
            res.status(404).render("invaliddetails")
        }
        }catch(error){
        res.status(400).send("User not found")
    }
})

//This is like a backup option when static folder or template engine folder is not available then this will be printed.
app.get("/",(req,res)=>{
    res.send("Hello World i am app.js file")
});

app.listen(port,()=>{
    console.log(`Server is running at port number- ${port}`);
});