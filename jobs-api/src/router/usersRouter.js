const express = require("express");
const client = require("../postgres");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  insertNewCompany,
  insetNewUser,
  insertUserToken,
} = require("../querys/insertQuerys");

const { updateUser } = require('../querys/updateQuery')
const { getCompanysJobs } = require('../querys/querys')
const {isTokenValid}=require('../utils/tokenUtils')
const { getUserLoginData, getUserByUidAndType } = require("../querys/querys");
const { json } = require("express");
const router = express.Router(); //"/users"
router.post("/registar/company", async (req, res) => {
  const data = JSON.parse(req.body.data);
  console.log("data /registar/company", data);
  const hashPassword = await bcrypt.hash(data.password, 8);
  console.log(insertNewCompany({ ...data, password: hashPassword }));
  try {
    client
      .query(insertNewCompany({ ...data, password: hashPassword }))
      .then(async (value) => {
        console.log("🚀 ~ file: usersRouter.js ~ line 36 ~ .then ~ value", value)
        const token = await generateAuthToken(data.email);
        const userData = await getUserData(value.rows[0].uuid
            ,
            "company"
        );
        res.send({data:userData.rows[0],token});
      }).catch((err)=>res.status(500).send({
        status: 500,
        message: err.message,
      }));
       
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
});
router.post("/registar/users", async (req, res) => {
  const data = JSON.parse(req.body.data);
  console.log("data /registar/users", data);
  try {
    const hashPassword = await bcrypt.hash(data.password, 8);

    console.log(insetNewUser({ ...data, password: hashPassword }));
    client
      .query(insetNewUser({ ...data, password: hashPassword }))
      .then(async (value) => {
        const token = await generateAuthToken(data.email);
        const userData = await getUserData(value.rows[0].uid
          ,"user");
      res.send({data:userData.rows[0],token});
       
      })
      .catch((err) => console.log("error ", err));
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
});
const generateAuthToken = async (email) => {
  const token = jwt.sign(
    {
      _id: email,
    },
    process.env.SECRET_TOKEN,

    {
      expiresIn: "6h",
    }
  );

  try {
    console.log(insertUserToken(email, token));
    const value = await client.query(insertUserToken(email, token));
    console.log("generateAuthToken -> value", value);
    console.log(value);
    if (value.rowCount >= 1) {
      console.log("generateAuthToken -> token", token);
      return token;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("problem with save token");
  }
};
const getUserData = async (uid, type) => {
  
  console.log("getUserData -> getUserByUidAndType(uid, type)", getUserByUidAndType(uid, type))

  const user = await client.query(getUserByUidAndType(uid, type));
  
  return user;
};
router.get('/get-user/:uid/:user_type', async (req, res) => {
  const uid = req.params.uid
  const userType=req.params.user_type
  console.log("get-user/ uid", uid)
  try
  {
    res.send(await getUserData(uid,userType));
  } catch (err) {
    res.status(500).send({status:500,message:"bad id"})
  }
})
router.post("/login", async (req, res) => {
  const data = req.body.data;
  console.log("data /login", data)

  try {
    client
      .query(getUserLoginData(data.email))
      .then(async (value) => {
        console.log("value", value);
        if (value.rowCount === 0) return res.status(401).send({code:401,message:"bad login data"});
        const token = await generateAuthToken(value.rows[0].email);

        const isAuth = await bcrypt.compare(
          data.password,
          value.rows[0].password
        );
        console.log("data.password: ", data.password)
        console.log("value.rows[0].password",value.rows[0].password)
        if (isAuth) {
          console.log("value", value);
          console.log("data", data);
          const userData = await getUserData(
            data.user_type === "company"
              ? value.rows[0].uuid
              : value.rows[0].uid,
            value.rows[0].user_type
          );
          console.log("userData.rows[0]", userData.rows[0]);

          res.send({ user: userData.rows[0], token });
        } else res.status(401).send({code:401,message:"not auth"});
      })
      .catch((err) => console.log("error ", err));
  } catch (err) {
    res.send({
      status: 500,
      message: err.message,
    });
  }
});

router.put("/update", async (req, res) => {
    const data =JSON.parse( req.body.data);
    console.log("data /update", data)
 
    try {
      if (data.password) {
        console.log("/update data.password", data.password)
            data.password=await bcrypt.hash(data.password,8)
          }
        const isAuthToken =await isTokenValid(data.email,JSON.parse(req.body.headers.Authorization.replace('Bearer ','').trim()))       
       console.log(updateUser(data))
        if(isAuthToken)
        client
        .query(updateUser(data))
        .then(async (value) => {
          console.log("value", value);
          if (value.rowCount === 0) return res.status(401).send({code:401,message:"bad login data"});        
          else res.send({code:200,message:"updated"});
        })
        .catch((err) => console.log("error ", err));
    } catch (err) {
      console.log(err)
      res.send({
        status: 500,
        message: err.message,
      });
    }
  });
router.get("/company-job-wall/:email/:uid",async (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token)
  const email = req.params.email;
  const uid = req.params.uid;
  console.log("uid", uid)
  console.log("/company-job-wall->email", email)
  
  
  
    try
    {
      const isAuth = await isTokenValid(email, token)
      console.log("isAuth", isAuth)
      if (isAuth) {
        console.log("getCompanysJobs(uid)", getCompanysJobs(uid))
        const jobsListQuery = await client.query(getCompanysJobs(uid))
      
       return res.send(jobsListQuery.rows)
      } else
     return res.status(505).send({status:505,message:'bad Token'})
    } catch (err) {
      console.log(err)
    }
  }
 
)
module.exports = router;
