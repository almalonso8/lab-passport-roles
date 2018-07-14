const mongoose = require('mongoose');
const User = require('../models/user.models');


module.exports.create = (req, res, next) => {
    res.render('users/create');
}

module.exports.doCreate = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                res.render("users/create", {
                    user: req.body,
                    errors: { email: "email already registered"}
                })
            } else {
                user = new User(req.body);
                return user.save()
                .then(user => {
                    res.redirect("/sesssions/create")
                });
            }
        })
        .catch(error => {
            if(error instanceof mongoose.Error.ValidationError){
                res.render("users/create", {
                    user: req.body,
                    errors: error.errors
                })
            } else {
                next(error);
            }
        })
    }