const express = require('express');
const router = express.Router();
//const data = require('../data');
//const personData =  data.Persondata;
const bluebird = require('bluebird');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var trial = false;
/*router.get('/',async(req,res,next)=> {
})*/

async function getPokemons(id){
  if(await client.existsAsync(id))
  {
    trial=true;
    console.log(id)
    return JSON.parse(await client.getAsync(id));

  }
  let poke = {};
  try{
    const  {data } = await axios.get("https://pokeapi.co/api/v2/pokemon/"+id)
     poke = {
      name: data.name,
      id: data.id,
      image: data.sprites.other["official-artwork"].front_default,
      type: data.types


    }
  }
  catch(e)
  {
    return;
  }
    
   await client.setAsync(poke.id,JSON.stringify(poke));
   return poke
     // this will be the array of people objects}
}
async function getAllPokemons(pgnum)
{
  try{
  //  const {data } = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset="+(20*(pgnum-1)))
    //return data.results;
    let b = 0;
    let pool = [];
    for(let i =((pgnum-1)*20)+1;b<20;i++)
    {
      let p = await getPokemons(i);
      pool.push(p);
      b++;
    }
    return pool;
  }
  catch(e)
  {
    console.log("DUPPPPEEERRR")
  }
}
router.get('/page/:pageNumber', async (req, res) => {

  res.json(await getAllPokemons(req.params.pageNumber));


})
router.get('/:id', async (req, res) => {

  console.log("hey")
   res.json(await getPokemons(req.params.id));

})

module.exports = router; 
