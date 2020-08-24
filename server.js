var config      = require('./config');
var express     = require('express');
var cors        = require('cors');
var bodyParser  = require('body-parser');
//var sql         = require('mssql');
//const mailer 	  = require('nodemailer');
//const Cotacao   = require('./models/cotacao');
const Supermarket   = require('./models/supermarket');
const async     = require('async');

var app = express();

//const port = 8082;
const port = process.env.PORT || 3000;

var posts = [
  {message: 'Hello Wolrd'},
  {message: 'what goig on'}
]

app.use(cors());
app.use(bodyParser.json());

app.post("/api/supermarkets", (req, res, next) => {
  const supermarket = new Supermarket({
    superMarketName: req.body.SUPERMARKETNAME,
    superMarketMainImage: req.body.SUPERMARKETMAINIMAGE,
    superMarketAdditionalImages: req.body.SUPERMARKETADDITIONALIMAGES,
    locationStreet:      req.body.STREET,
    locationNumber:       req.body.NUMBER,
    locationDistrict:     req.body.DISTRICT,
    locationZip:          req.body.ZIP,
    locationCountry:      req.body.COUNTRY,
    locationCity:         req.body.CITY,
    locationState:        req.body.STATE,
    superMarketDescription: req.body.SUPERMARKETDESCRIPTION,
    superMarketPhone: req.body.SUPERMARKETPHONE
  });
  supermarket.save(function (err, newsupermarket) {
    if (err) return console.error(err);
    console.log(newsupermarket + " saved to supermarket collection.");
    res.status(200).json({ supermarket: newsupermarket });
  });
});

app.get("/api/supermarkets/:id", (req, res, next) => {
  Supermarket.find({ _id: req.params.id }).then(documents => {
    res.status(200).json({
      message: "Supermarket fetched successfully!",
      supermarkets: documents
    });
  });
});

app.post("/update/supermarket", (req, res, next) => {
  const supermarket = new Supermarket({
    _id: req.body._id,
    superMarketName: req.body.SUPERMARKETNAME,
    superMarketMainImage: req.body.SUPERMARKETMAINIMAGE,
    superMarketAdditionalImages: req.body.SUPERMARKETADDITIONALIMAGES,
    locationStreet:      req.body.STREET,
    locationNumber:       req.body.NUMBER,
    locationDistrict:     req.body.DISTRICT,
    locationZip:          req.body.ZIP,
    locationCountry:      req.body.COUNTRY,
    locationCity:         req.body.CITY,
    locationState:        req.body.STATE,
    superMarketDescription: req.body.SUPERMARKETDESCRIPTION,
    superMarketPhone: req.body.SUPERMARKETPHONE
  });
  Supermarket.findByIdAndUpdate({ _id: supermarket._id }, supermarket, function(err, result){
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }
  });
});

app.delete("/api/supermarkets/:id", (req, res, next) => {
  Supermarket.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Supermarket deleted!" });
  });
});

app.get('/consulta-id-supermarket/:id_supermarket', function(req, res) {
    var id_supermarket = req.params.id_supermarket;

    var ret = {};

    async.parallel([

      function(callback) {

        Supermarket.findOne({ id_supermarket: id_supermarket})
        .exec(function(err, docs){
          if (err) throw err;

          console.log('qtde de supermarkets: ', docs);
          ret.supermarket = docs;

          callback();
        });
      }

    ], function(err) {
      if (err){
        console.log('error: ', err);
        res.json({error: err});
      } else {

        // retorna os dados para o front
        ret.success = true;
        res.json( ret );

      };
    });
  });

  app.post('/insert-supermarket', async function(req, res) {
    try{
      const supermarket = new Supermarket({
        superMarketName: req.body.SUPERMARKETNAME,
        superMarketMainImage: req.body.SUPERMARKETMAINIMAGE,
        superMarketAdditionalImages: req.body.SUPERMARKETADDITIONALIMAGES,
        locationStreet:      req.body.STREET,
        locationNumber:       req.body.NUMBER,
        locationDistrict:     req.body.DISTRICT,
        locationZip:          req.body.ZIP,
        locationCountry:      req.body.COUNTRY,
        locationCity:         req.body.CITY,
        locationState:        req.body.STATE,
        superMarketDescription: req.body.SUPERMARKETDESCRIPTION,
        superMarketPhone: req.body.SUPERMARKETPHONE
      });
      const result = await supermarket.save();
      res.json({req: result});
    } catch (err) {
      console.log('error: ', err);
      res.json({error: err});
    };
  });

  app.get('/lista-supermarkets', function(req, res) {
    var ret = {};
    async.parallel([
        function(callback) {
            Supermarket.find({})
            .exec(function(err, docs){
                if (err) throw err;
                ret = docs;
                callback();
            });
        }

    ], function(err) {
        if (err) {
            console.log('error: ', err);
            res.json({error: err});
        } else {
            // retorna os dados para o front
            ret.success = true;
            res.json(ret);
        }
    })
  });

app.listen(port);
