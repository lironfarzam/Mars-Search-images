'use strict';
const dbModels = require("../models"); //contain the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * check if email exist on data base
 */
exports.isValidEmail = (req, res) => {

    dbModels.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user)
                res.send({ email_exist: true });
            else
                res.send({ email_exist: false });
        })
        .catch((err) => {
            res.status(404).send(err)
        })
}
/**
 * Adds an image to the user's saved image list in a database
 */
exports.addImage = (req, res) => {

    const { image } = req.body;

    dbModels.MarsImage.findOne({ where: { email: req.session.isConnected, imageId: image.id } })
        .then((imageExist) => {
            if (!imageExist)
                return dbModels.MarsImage.create({
                    url: image.source,
                    email: req.session.isConnected,
                    imageId: image.id,
                    date: image.earthDate,
                    sol: image.sol,
                    mission: image.mission,
                    camera: image.camera
                });
            else
                res.send({ "add_new_image": false });
        })
        .then((crateResult) => {
            res.send({ access: true, "add_new_image": crateResult });
        })
        .catch((err) => {
            res.status(404).send(err);
        })
}

/**
 * Deletes an image from the user's saved list in the database
 */
exports.deleteImage = (req, res) => {

    dbModels.MarsImage.findOne({ where: { email: req.session.isConnected, imageId: req.body.imageId } })
        .then((image) => { image.destroy({ force: true }) })
        .then(() => { return dbModels.MarsImage.findAll({ where: { email: req.session.isConnected } }) })
        .then((count) => { res.json({ access: true, isDelete: true, image_left: count.length }); })
        //the api task return if the image deleted and how much images left at the data. 
        .catch((err) => {
            res.status(400).send(err);
        })
}

/**
 * Deletes the entire list of user photos from the database
 */
exports.deleteAllImages = (req, res) => {

    dbModels.MarsImage.destroy({ where: { email: req.session.isConnected } })
        .then((isDeleted) => { res.send({ access: true, deleted_all_images: isDeleted }); })
        .catch((err) => {
            res.status(404).send(err);
        })
}

/**
 * Returns the entire list of user photos stored in a database
 */
exports.geSavedImageList = (req, res) => {

    dbModels.MarsImage.findAll({ where: { email: req.session.isConnected } })
        .then((imageList) => { res.send({ access: true, image_list: imageList }); })
        .catch((err) => {
            res.status(404).send(err);
        })
}

/**
 * User authentication while connecting to the site.
 * If it is authenticated and has a certificate - it gets a token that it
 * needs to attach to its API requests from the server.
 */
exports.verifyUser = (req, res) => {

    const { email, password } = req.body;

    dbModels.User.findOne({ where: { email: email } })
        .then((user) => {
            if (user) return bcrypt.compare(password, user.password);
            else
                return false;
        })
        .then((verify) => {

            if (verify) {
                req.session.isConnected = email;
                const TOKEN_SECRET = "tokenSecret";
                const token = jwt.sign({ email: email }, TOKEN_SECRET);
                res.send({ verify: true, token: token });
            }
            else
                res.send({ verify: false, verifyPassword: "The email or password you entered is incorrect" });
        })
        .catch(() => {
            res.status(404).send();
        })
}

exports.errorApi = (req, res) => {
    res.json().status(404).send("Your API request is invalid.");
}
