const express = require('express');
const router = express.Router();
const data = require('../data/user');
const app = express();
const axios = require('axios');

const path = require('path');
const multer = require('multer');
///Check ids


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let popper = __dirname;
    popper = popper.split("/");
    fruit = popper.pop();
    popper= popper.join("/");
      cb(null,popper+'/profile');
  },

  filename: function(req, file, cb) {
    console.log(file);
    cb(null, new Date().toISOString() + file.originalname);
  }
});

var upload = multer({ storage: storage })
/*router.get('/',async(req,res,next)=> {
})*/

router.get('/:id', async (req, res) => {
  try {
    if(typeof req.params.id != "string")
    {
      throw "Error: Was not given a string somehow."
    }
    const result = await data.getID(req.params.id);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ error:"Person not found" });
  }
});
router.get('/', async (req, res) => {
  try{
    const result =await data.getAll();
    res.status(400).json(result);

  }
  catch(e)
  {
    res.status(404).json({ error:"Person not found" });
  }
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/like',async (req, res) => {
  let currentUser = req.body.currentID;
  let likedUser = req.body.likedUser;
  let result
  try{
    result = await data.addLike(currentUser, likedUser);
    //res.status(200).json(result);
  }
  catch(e){
  res.status(400).json({error: e})
  console.log(e);
  
  }
  res.status(200).json(result);

})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', upload.single('signupPic'), async (req, res) =>
{

  let body = req.body;
  console.log(req.file);
  if(!body)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  if(!body.signupName||!body.signupAge||!body.signupGender||!body.signupEmail||!body.signupUser||!body.signupPass||!body.signupBio||!body.signupLikes||!body.signupDislikes||!body.signupStatus||!body.signupPref)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  /////////////////////////////////////////////////////////////change the where thr 
  let name = body.signupName;
  let age = Number(body.signupAge);
  
  let gender;
  if(body.signupGender==="Goose (Other)")
  {
    gender = body.signupOtherGenderText;
  }
  else{
    gender = body.signupGender;
  }
  let email = body.signupEmail;
  let pic;
  try{
    pic =req.files.filename
  }
  catch(e)
  {
    pic = "unknown.jpeg"
  }
  let username = body.signupUser;
  let password = body.signupPass;
  let bio = body.signupBio;
  let likes = body.signupLikes;
  let dislikes = body.signupDislikes;
  let status = body.signupStatus;
  let pref = body.signupPref;




  if(typeof name !="string"||typeof pref !="string"||typeof gender !="string"||typeof email!="string" || typeof pic !="string" ||typeof username != "string"||typeof password !="string" ||typeof bio !="string"|| typeof status!= "string"|| typeof age!="number", typeof likes !="string",typeof dislikes!= "string")
  {
    res.status(400).json({ error:"Error: Wring type of info"});
  }

  if(age<18||age>125)
  {
    res.status(400).json({ error:"Error: age is not valid"});
  }
  let pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!email.match(pattern))
  {
    res.status(400).json({ error:"Error: email dont match the requirements"});
  }
  try{
    const returnVal  = await data.create(name,age,gender, email, pic, username, password, bio, likes, dislikes, status, pref);
    res.status(400).json(returnVal);
  }
  catch(e)
  {
   res.status(400).json({error: e})
   console.log(e);
  }

  //data.create
  //res status whatever create returns
  //catch like prof in database
})
//router.put('/:id',upload.array('uploaded_file'),async (req, res)=>
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:id',async (req, res)=>
{

  let body = req.body;
  let id = req.params.id;
  console.log(req.file)
  if(!body)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  if(!body.name||!body.age||!body.gender||!body.email||!body.username||!body.password||!body.bio||!body.likes||!body.dislikes||!body.likeProf||!body.status)
  {
    res.status(400).json({ error:"Error: There is no data"});
  }
  /////////////////////////////////////////////////////////////change the where thr 
  let name = body.profileNewName;
  let age = Number(body.age);
  let gender = body.profileNewGender;
  let pic;
  if (!req.files)
  {
    pic = body.pic;
  }
  else
  {
    upload.single('profile');
    pic = req.files.filename;

  }
  let password = body.profileNewPass;
  let bio = body.profileNewBio;
  let likes = body.profileNewLikes;
  let dislikes = body.profileNewDislikes;
  let status = body.profileNewStatus;
  let pref = body.profileNewPreference;



  if(typeof name !="string"||typeof gender !="string"||typeof email!="string" || typeof pic !="string" ||typeof dislikes =="string"||typeof likes =="string"||typeof username != "string"||typeof password !="string" ||typeof bio !="string"|| typeof status!= "string"|| typeof age!="number")
  {
    res.status(400).json({ error:"Error: Wring type of info"});
  }
  
  if(age<18||age>125)
  {
    res.status(400).json({ error:"Error: age is not valid"});
  }
  let pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!email.match(pattern))
  {
    res.status(400).json({ error:"Error: email dont match the requirements"});
  }
  //data.update
  //res status whatever updates returns
  //catch likeprof in database
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete("/match", async(req,res)=>{
let currentID = req.body.currentID;
let deletedID = req.body.matchID;
try{
  let results = await data.remMatch(currentID,deleteID)
  res.status(200).json(results);
}
catch(e)
{
  res.status(400).json({error:e})
}
})
router.get("/random/:id", async(req,res)=>{
  let id = req.params.id;
  try{
    const results =data.getRandom(id)
    res.status("200").json(results);
  }
  catch(e)
  {
    res.status("400").json({error:e})
    //
  }
})


///jan is going to do messages routes



module.exports = router; 