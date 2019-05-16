const express = require('express');
const router = express.Router();
const Ninja = require("../models/ninja");

router.get('/ninjas', function(req, res, next){
    /*Ninja.find({}).then(function(){

    });*/
    console.log(parseFloat(req.query.lng) + " "+ parseFloat(req.query.lat));

    Ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
       }).then(function(ninjas){
        res.send(ninjas);
    });
});

router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    });
});

router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findOneAndDelete({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    });
});

module.exports = router;