const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const jwt = require("jsonwebtoken")

const pool = require('../database')
const bcrypt = require("../lib/bcrypt")
const { key } = require("../key");

passport.use('local.signin', new LocalStrategy({
    usernameField: 'mail',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, mail, password, done) => {
    /* const { mail, password } = req.body; */
    const response = await pool.query(
        "select * from users where mail=$1",
        [mail]
    );
    if (response.rowCount > 0) {
        const user = response.rows[0];
        const validPassword = await bcrypt.matchPassword(password, user.password);
        if (validPassword) {
            const { id, rol, name, mail, password } = user;
            const payload = {
                check: true,
            };
            const token = jwt.sign({ id: id }, key, {
                expiresIn: 60 * 60 * 24,
            });
            const data = { id, rol, name, mail, password, token }
            return done(null, data, {message:"Success"});
        } else {
            return done(null, false, { message: "Password Incorret" })
        }
    } else {
        return done(null, false, { message: "Not User Found" })
    }
}));

passport.serializeUser((data, done) => {
    const { id } = data
    done(null, id);
});

passport.deserializeUser(async (id, done) => {
    const response = await pool.query('select * from users where id = $1', [id]);
    const user = response.rows[0]
    done(null, user);
});