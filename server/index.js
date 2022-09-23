const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
var jwt = require('jsonwebtoken');
const secret = 'kop_ter_login_Project'

app.use(cors())

const mysql = require('mysql2');
const { JsonWebTokenError } = require('jsonwebtoken');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_project',
    multipleStatements: true
})
const connection2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectdb',
    multipleStatements: true
})

app.post('/Addstudent', jsonParser, function (req, res, next) {
    connection.execute(
        'INSERT INTO user_info (username, password, address, role) VALUES (?, ?, ?, ?)',
        [req.body.username, req.body.password, req.body.address, req.body.role],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    );
})

app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM user_info WHERE username = ? AND password = ?',
        [req.body.username, req.body.password],
        function (err, student, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return
            }
            if (student.length == 0) {
                connection.execute(
                    'SELECT * FROM teacher WHERE username = ? AND password = ?',
                    [req.body.username, req.body.password],
                    function (err, teacher, fields) {
                        if (err) {
                            res.json({ status: 'error', message: err })
                            return
                        }
                        if (teacher.length == 0) {
                            res.json({ status: 'error', message: 'no user found' });
                        } else {
                            var test = { role: teacher[0].role };
                            var token = jwt.sign({ username: teacher[0].username }, secret, { expiresIn: '3h' });
                            res.json({ login: 'pass', token, test })
                        }
                    }
                )
            } else {
                var test = { role: student[0].role };
                var token = jwt.sign({ username: student[0].username }, secret, { expiresIn: '3h' });
                res.json({ login: 'pass', token, test })

            }

        }
    )
})

app.post('/authen', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, secret);
        res.json({ status: "ok", decoded })
    } catch (err) {
        res.json({ status: 'error', message: err.message })
    }

})

app.listen('3001', () => {
    console.log('Server is runnng on port 3001')
})


app.get('/test', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM user_info',
        function (err, results, fields) {
            res.json(results)
        }

    )
})



app.get('/test2', jsonParser, function (req, res, next) {
    connection.execute(`SELECT user_info.username FROM user_info`,
        function (err, a) {
            if (err) {
                console.log(err)

            }

            connection.execute(`SELECT teacher.username FROM teacher`,
                function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    res.json({ results, a })
                }
            )
        });
})

app.get('/test3/:username', function (req, res, next) {
    connection.execute(
        `SELECT * FROM user_info WHERE username = ? `,
        [req.params.username],
        function (err, results, fields) {
            res.json(results)
        }

    )
})
app.get('/getcompany', jsonParser, function (req, res, next) {
    connection2.execute(
        `SELECT address.province,address.amphoe, address.district , company.name, address.subadd
        FROM address
        INNER JOIN company ON address.add_id = company.add_id
        `,
        function (err, results, fields) {
            res.json(results)
        }
    )
})
app.post('/testaddress', jsonParser, function (req, res, next) {
    connection2.execute(
        'INSERT INTO address (add_id, province, amphoe, district, zipcode, subadd) VALUES (?, ?, ?, ?, ?,? )',
        [req.body.address_id, req.body.province, req.body.amphoe, req.body.district, req.body.zipcode, req.body.subadd],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    );
})





