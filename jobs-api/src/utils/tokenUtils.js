
const client = require('../postgres')
const jwt =require('jsonwebtoken')
const { getTokenRow } = require('../querys/utilsQuerys')
const isTokenValid = async (email, token) => {
    token = token.replace('Bearer', '').trim();
    const isTokenInDb = (await client.query(getTokenRow(email, token))).rowCount === 1;
    console.log("isTokenValid -> isTokenInDb", isTokenInDb)
    console.log("isTokenValid -> getTokenRow(email, token)", getTokenRow(email, token))
    console.log("process.env.SECRET_TOKEN",process.env.SECRET_TOKEN)
  try {
    const isTokenValid = jwt.verify(token, process.env.SECRET_TOKEN)

    if(isTokenValid._id)
      return true;
    else
      return false
  }
  catch (err) {
    throw new Error("bad token")
  
  }
}
  module.exports={isTokenValid}