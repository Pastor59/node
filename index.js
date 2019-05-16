const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost/ninjago',  {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use("/api", require("./routes/api"));
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000);

app.get('/',function(req, res){
    res.end();
});