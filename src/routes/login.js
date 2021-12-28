const express = require("express");
const router = express.Router();
const passport = require("passport")

const login = require("../controllers/login.controllers")

router.post("/login", login.loginUsers);

router.post('/signin', async (req, res, next) =>{

    await passport.authenticate('local.signin', (err, data, info) =>{
        if(err) throw err;
        if(data){
            req.logIn(data, (err) => {
                if (err) throw err;
                res.status(200).send(data);
              });
        } else {
            ress.status(404).send(info);
        }
    })(req, res, next);
})

module.exports = router;