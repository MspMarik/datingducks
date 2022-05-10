const express = require('express');
const router = express.Router();
//const data = require('../data');
const app = express();
const axios = require('axios');

const path = require('path');
const multer = require('multer');


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
  //data.getUser
  //res.status


})
router.post('/', upload.single('profile-pic'), async (req, res) =>
{

  let body = req.body;
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
  let name = body.name;
  let age = Number(body.age);
  let gender = body.gender;
  let email = body.email;
  //let pic =req.files.filename
  let username = body.username;
  let password = body.password;
  let bio = body.bio;
  let likes = body.likes;
  let dislikes = body.dislikes;
  let status = body.status;



  if(typeof name !="string"||typeof gender !="string"||typeof email!="string" || typeof pic !="string" ||typeof username != "string"||typeof password !="string" ||typeof bio !="string"|| typeof status!= "string"|| typeof age!="number")
  {
    res.status(400).json({ error:"Error: Wring type of info"});
  }
  if(!Array.isArray(likes)||!Array.isArray(dislikes))
  {
    res.status(400).json({ error:"Error: Array is not given"});
  }
  for(let i of likes)
  {
    if(typeof i != "string")
    {
      res.status(400).json({ error:"Error: Elements in likes is not string"});
    }
  }
  for(let i of dislikes)
  {
    if(typeof i != "string")
    {
      res.status(400).json({ error:"Error: Elements in dislikes is not string"});
    }
  }
  if(age<18||age>125)
  {
    res.status(400).json({ error:"Error: age is not valid"});
  }
  if(gender!="Drake"&&gender!="Hen"&&gender!="Other")
  {
    res.status(400).json({ error:"Error: Gender is not valid"});
  }

  let pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!email.match(pattern))
  {
    res.status(400).json({ error:"Error: email dont match the requirements"});
  }
  //data.create
  //res status whatever create returns
  //catch like prof in database
})
router.put('/:id',upload.array('uploaded_file'),async (req, res)=>
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
  let name = body.name;
  let age = Number(body.age);
  let gender = body.gender;
  let email = body.email;
  //let pic =req.files.filename
  let username = body.username;
  let password = body.password;
  let bio = body.bio;
  let likes = body.likes;
  let dislikes = body.dislikes;
  let status = body.status;



  if(typeof name !="string"||typeof gender !="string"||typeof email!="string" || typeof pic !="string" ||typeof username != "string"||typeof password !="string" ||typeof bio !="string"|| typeof status!= "string"|| typeof age!="number")
  {
    res.status(400).json({ error:"Error: Wring type of info"});
  }
  if(!Array.isArray(likes)||!Array.isArray(dislikes))
  {
    res.status(400).json({ error:"Error: Array is not given"});
  }
  for(let i of likes)
  {
    if(typeof i != "string")
    {
      res.status(400).json({ error:"Error: Elements in likes is not string"});
    }
  }
  for(let i of dislikes)
  {
    if(typeof i != "string")
    {
      res.status(400).json({ error:"Error: Elements in dislikes is not string"});
    }
  }
  if(age<18||age>125)
  {
    res.status(400).json({ error:"Error: age is not valid"});
  }
  if(gender!="Drake"&&gender!="Hen"&&gender!="Other")
  {
    res.status(400).json({ error:"Error: Gender is not valid"});
  }
  if(typeof likeProf != "object")
  {
    res.status(400).json({ error:"Error: Likeprof has to be array"});
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

///jan is going to do messages routes



module.exports = router; 
