const express=require("express");
const res = require("express/lib/response");
const mongoose=require("mongoose");
const nodemailer = require("nodemailer");
const app=express();
app.use(express.json());
const connect=()=>{
   return mongoose.connect("mongodb+srv://parul:paru@cluster0.kwhsq.mongodb.net/registrationdatabase?retryWrites=true&w=majority")
  
}

//userSchema

const Users=new mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true}
},
{   versionKey:false,
    timespans:true
});

const usermodel=new mongoose.model("users",Users)

//register

const registeration=mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
},{
    versionKey:false,
    timespans:true
});

const registermodel=mongoose.model("register",registeration)

//getusers

app.get("/user",async(req,res)=>{
    try{
        const page=req.query.page || 1;
        const pagesize=req.query.pagesize || 10;
        const skip=(page-1)*pagesize;
        const users=await usermodel.find().skip(skip).limit(pagesize).lean().exec();
         const totalpage=Math.ceil((await usermodel.find().countDocuments())/pagesize)
           res.status(200).send({users,totalpage});
    }
    catch(err){
        res.status(404).send("somthing wrong1")
    }
});

app.post("/user",async(req,res)=>{
    try{
        const users=await usermodel.create(req.body);
           res.status(200).send(users);
    }
    catch(err){
        res.status(404).send("somthing wrong2")
    }
});

app.patch("/user/:id",async(req,res)=>{
    try{
        const users=await usermodel.findByIdAndUpdate(req.params.id,req.body);
           res.status(200).send(users);
    }
    catch(err){
        res.status(404).send("somthing wrong3")
    }
})

app.delete("/user/:id",async(req,res)=>{
    try{
        const users=await usermodel.findByIdAndDelete(req.params.id);
           res.status(200).send(users);
    }
    catch(err){
        res.status(404).send("somthing wrong4")
    }
});




//registration crud


app.get("/register",async(req,res)=>{
    try{
        const registers=await registermodel.find().lean().exec();
           res.status(200).send(register);
    }
    catch(err){
        res.status(404).send("somthing wrong5")   
    }
});

app.post("/register/:id",async(req,res)=>{
    try{
        const registers=await registermodel.create(req.body);

        "use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "8aacc436a4c627", // generated ethereal user
      pass: "00d6e6996efd73", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"MOUNT CARMEL👻" <admin@amazom.com>', // sender address
    to: user.email, // list of receivers
    subject: "Hello you are registred is successfully ✔", // Subject line
    text: "Hello sir/mam you are registered sucessfully", // plain text body
    html: "<b>Hello sir/mam you are registered sucessfully</b>", // html body
  });

}

main().catch(console.error);
           res.status(200).send(registers);
    }
    catch(err){
        res.status(404).send("somthing wrong6")
    }
});

//email




app.patch("/register/:id",async(req,res)=>{
    try{
        const registers=await registermodel.findByIdAndUpdate(req.params.id,req.body);
           res.status(200).send(registers);
    }
    catch(err){
        res.status(404).send("somthing wrong7")
    }
})

app.delete("/register/:id",async(req,res)=>{
    try{
        const registers=await registermodel.findByIdAndDelete(req.params.id);
           res.status(200).send(registers);
    }
    catch(err){
        res.status(404).send("somthing wrong8")
    }
});

app.listen(5555,async()=>{
try{
 await connect()

}
catch(err){
     console.log("err");
}

    console.log("Listining port 5555");
})