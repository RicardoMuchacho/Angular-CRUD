const express = require('express');
const path = require('path');
const morgan = require('morgan');
var session = require('express-session')
const fs = require('fs');
const db = require("./db.js")
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
var bcrypt = require('bcrypt');
const cors = require('cors');

mongoose.set('useFindAndModify', false);

app.use(cors());
app.use(session({secret: 'secret',saveUninitialized: true,resave: true}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));


app.post('/login', async (req, res)=>{
    username = req.body.username;
    pass = req.body.pass;
    
    try{
      const user = await User.findOne({'username': username}).exec(); 
        if (user){
            const validPass = await bcrypt.compare(pass, user.password);

            if(validPass){
                req.session.userid = user._id;
                req.session.username = user.username;
                req.session.firstname = user.firstname;
                req.session.secondname = user.secondname;
                res.json(user);
            } else {
                res.send(JSON.stringify("Incorrect Password"));
            }
        }
      }catch{error => console.log(error);
     res.send(JSON.stringify("Error: User not found"));
    }
})

app.post('/register', async (req, res)=>{
    try{
      firstname = req.body.firstname;
      secondname = req.body.secondname;
      username = req.body.username;
      cpass = req.body.cpass;
      pass = req.body.pass;

      const hash = await bcrypt.hash(pass, 10);
      const user = new User({
      firstname: firstname,
      secondname: secondname,
      username: username,  
      password: hash
     })
     await user.save().then(result =>{
         console.log(result);
         res.json(result);
     }).catch(err => console.log(err));
    }
    catch{(err => console.log(err))}
  })

app.get('/users', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/users.html'));
})

app.delete('/users', async (req, res)=>{
    try{
        const user = await User.findOne({'username': username}).exec();
        user_to_find = user._id;
      db.deleteUser(user_to_find);  
      res.send(JSON.stringify("User Deleted Succesfully"));
    }catch{(err => console.log(err))}
  })

app.put('/users', async (req, res)=>{
    username = req.body.username;
    try{
        const user = await User.findOne({'username': username}).exec();
        user_to_find = user._id;
        firstname = req.body.firstname;
        secondname = req.body.secondname;
        cpass = req.body.cpass;
        pass = req.body.pass;
      db.updateUser(user_to_find, firstname, secondname, username, pass)
      
      //req.session.name = newName;
      //req.session.email = newEmail;
      //req.session.password = newPass;
      res.send(JSON.stringify("Updated User Succesfully"));

    }catch{(err => console.log(err))}
  })


app.get('/userinfo', (req, res)=>{
    sid = req.session.userid;
    sname = req.session.name;
    semail = req.session.email;
    spass = req.session.password;
    res.send(JSON.stringify({"id": sid, "name":sname, "email":semail, "password":spass}));
})


const PORT = process.env.PORT || 3000
/*
app.listen(PORT, ()=>{
    console.log('Listening on port ' + PORT + '...')
});*/

//const dbURI = "mongodb://user:admin@cluster0-shard-00-00.e0sy3.mongodb.net:27017,cluster0-shard-00-01.e0sy3.mongodb.net:27017,cluster0-shard-00-02.e0sy3.mongodb.net:27017/MangaReader?ssl=true&replicaSet=atlas-42ce5x-shard-0&authSource=admin&retryWrites=true&w=majority"
const dbURI = "mongodb+srv://user:admin@cluster0.e0sy3.mongodb.net/MangaReader?retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(result => {
    console.log("connected to db");
    app.listen(PORT);
})
.catch((err) => console.log(err));