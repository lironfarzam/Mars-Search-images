'use strict';

exports.getLogin = (req, res) => {

    //Checking if we forcibly removed the user from the site because he ran out of access.
    const errorMsgToUser = req.session.accessDenied ?
        "Sorry, your user is no longer logged in, please log in again and try again" : "";

    //to set this error only once
    if (errorMsgToUser != "")
        req.session.accessDenied = null;

    res.render('login', {
        pageTitle: "NASA Login",
        error_msg_to_user: errorMsgToUser,
        scriptPath: "javaScript/login.js",
    });
}

exports.postLogin = (req, res) => {
    res.redirect('/login')
}