'use strict';
const dbModels = require("../models"); //contain the User model
const bcrypt = require("bcrypt");
const SALT_HASH = 10;

/**
 * add user to data base
 * @returns success/error page view
 */
exports.addUserToDataBase = (req, res) => {

    const { firstNameInput, lastNameInput, emailInput, passwordInput } = req.body;

    return bcrypt.hash(passwordInput, SALT_HASH)
        .then((encryptedPassword) => {
            return dbModels.User.create({
                firstName: firstNameInput,
                lastName: lastNameInput,
                email: emailInput,
                password: encryptedPassword
            })

        }).then((isRegister) => {
            if (isRegister) {
                req.session.user_name = firstNameInput + " " + lastNameInput;
                res.redirect("/register/succsess");
            }

            else
                throw "";

        }).catch(() => {
            req.session.set_error = true;
            redirect("/register/fail");
        })
}

exports.getRegister = (req, res) => {
    //if user already connected - move to homepage
    if (req.session.isConnected)
        res.redirect('/');

    res.render('register', {
        pageTitle: "NASA Sign Up",
        scriptPath: "javaScript/register.js",
        error_msg: ""
    });
}

exports.postTimeOut = (req, res) => {

    res.render('myError', {
        pageTitle: "NASA Error",
        scriptPath: "",
        message: "Too late, hurry up next time"
    });
}


exports.getSuccess = (req, res) => {

    if (req.session.user_name) {
        const userName = req.session.user_name;
        req.session.user_name = null;

        res.render('success', {
            pageTitle: "NASA Success",
            scriptPath: "",
            user_name: userName
        });
    }
    else {
        res.redirect('/');
    }
}

exports.getFail = (req, res) => {
        
    if (req.session.set_error) {
        req.session.set_error = null;
        res.render('myError', {
            pageTitle: "NASA Error",
            scriptPath: "",
            message: "Sorry, registration failed Please try again."
        });
    }
    else
        res.redirect('/');
}

