// Angular Authentication Tutorial

const express = require('express'),
      router = express.Router(),
      jwt = require('jsonwebtoken'),
      User = require('../models/User.js');

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-control, Content-Type, Authorization");
    res.header("Access-Control-Max-Age","1728000");
    res.header("Access-Control-Allow-Credentials","true");
	next();
});

router.get('/', (req, res, next) => {
    res.send("JWT routes root page...");
});

router.post('/aat/register', (req, res) => {
    const newUser = req.body;
    User.findOne({email: newUser.email}, (err, user) => {
        if(err) {
            throw new Error(err);
        } else {
            if(!user) {
                User(newUser).save((err, registeredUser) => {
                    if(err) {
                      throw new Error(err);
                    }
                    let payload = { subject: registeredUser._id };
                    // second argument can be anything. Le it be
                    // a string in our case
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token });
                });
            } else {
                res.status(400).send('The email already exists');
            }
        }
    });
});

router.post('/aat/login', (req, res) => {
    const userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if(err) {
            throw new Error(err);
        } else {
            if(!user) {
                res.status(401).send('Invalid email. It looks like the user is not registered');
            } else if(user.password !== userData.password) {
                res.status(401).send('Invalid password');
            } else {
                let payload = { subject: user._id };
                // second argument can be anything. Le it be
                // a string in our case
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token });
            }
        }
    });
});

// TODO: move it to real collection in future
router.get('/aat/events', (req,res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    res.json(events)
});

// TODO: move it to real collection in future
router.get('/aat/special', verifyToken, (req, res) => {
    let specialEvents = [
        {
            "_id": "1",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo Special",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    res.json(specialEvents)
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    try {
        const payload = jwt.verify(token, 'secretKey');
        req.userId = payload.subject;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized request');
    }
}

module.exports = router;
