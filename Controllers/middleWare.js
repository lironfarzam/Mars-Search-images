'use strict';
const jwt = require('jsonwebtoken');
const dbModels = require("../models"); //contain the User model

/**
 * middleWare to check if the user has access to perform the requested operation.
 * @returns if the user has access or not
 */
module.exports.checkAccess = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token || !req.session.isConnected) {
        req.session.accessDenied = true;
        return res.send({ access: false });
    }

    try {
        const TOKEN_SECRET = "tokenSecret";
        const verified = jwt.verify(token, TOKEN_SECRET);
        req.user = verified;
        req.session.accessDenied = null;
        next();

    } catch (err) {
        req.session.accessDenied = true;
        res.send({ access: false });
    }
}
/**
 * If good validation - continues
 *  Otherwise - Moves to the Error page with custom error message
 * @returns if the validation ok or not
 */
module.exports.valitadeRgester = (req, res, next) => {

    const { firstNameInput, lastNameInput, emailInput, passwordInput } = req.body;

    return dbModels.User.findOne({ where: { email: emailInput } })
        .then((user) => {
            const v_email = user ? false : true;
            const v_first_name = /^[a-zA-Z]+$/.test(firstNameInput);
            const v_last_name = /^[a-zA-Z]+$/.test(lastNameInput);
            const v_password = passwordInput.length > 7;

            return v_first_name && v_last_name && v_email && v_password;
        }).then((v) => {
            if (v)
                next();
            else
                throw "";

        }).catch(() => {
            req.session.set_error = true;
            res.redirect("/register/fail");
        });


}
/**
 * Checks if the user has cookies for registration (there is a time limit for registration)
 * @returns if the cookies ok or not
 */
module.exports.checkTimerCookie = (req, res, next) => {

    const { cookies } = req;

    if (!('registerTimer' in cookies)) {
        req.session.set_error = true;
        res.redirect("/register/fail");
    }
    else
        next();
}

/**
 * if the user alredy connected - move to home page
 */
module.exports.alreadyConnected = (req, res, next) => {

    if (req.session.isConnected && !req.session.accessDenied)
        res.redirect("/");
    else
        next();
}

