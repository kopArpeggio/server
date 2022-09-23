const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser') ;
const cookieParser = require('cookie-parser');
const session = require("express-session");


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userID",
    secret: "kop_ter",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 20,
    },
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "test_project"
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user_info WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {

            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                req.session.user = result;
                console.log(req.session.user);
                res.send(result);
            } else {
                res.send({ message: "Wrong username or Password" });
            }
        }
    );
});

app.get("/login", (req,res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})

app.get('/user', (req,res) => {
    db.query ("SELECT * FROM user_info", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen('3001', () => {
    console.log('Server is runnng on port 3001')
})

app.post('/test', (req,res, next) =>{
    res.json({msg: 'Hello World Test'})
})





