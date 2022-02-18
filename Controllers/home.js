'use strict';
const dbModels = require("../models"); //contain the User model

/**
 * Checks if the user is connected, if so, takes him to the home page and write user name on top page,
 * otherwise - 
 *      1.if he is not connected: to the login page.
 *      2.If there is a server failure: Error page
 * @returns home page or error page
 */
exports.getHome = (req, res) => {

    if (req.session.isConnected) {
        return dbModels.User.findOne({ where: { email: req.session.isConnected } })
            .then((user) => {
                if (user)
                    return res.render('home', {
                        pageTitle: "NASA",
                        scriptPath: "javaScript/home.js",
                        user_first_name: user.firstName,
                        user_last_name: user.lastName
                    });
                else
                    throw "";

            }).catch((msg) => {
                res.render('myError', {
                    pageTitle: "NASA Error",
                    scriptPath: "",
                    message: "Something went wrong, we were unable to verify the account, please try logging in again"
                });
            })
    }
    else
        res.redirect("/login");
}
/**
 * when user logout - delete his session
 */
exports.postLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login'); // will always fire after session is destroyed
}