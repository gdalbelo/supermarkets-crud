var mongoose     = require('./database');
var Schema       	= mongoose.Schema;

var SupermarketsSchema = new Schema({
  "superMarketName" : {
      type: String
  },
  "superMarketMainImage":{
      type:String
  },
  "superMarketAdditionalImages" : {
      type:String
  },
  "locationStreet" : {
      type:String
  },
  "locationNumber" : {
      type:String
  },
  "locationDistrict" : {
    type: String
  },
  "locationZip":{
      type:String
  },
  "locationCountry" : {
      type:String
  },
  "locationCity" : {
      type:String
  },
  "locationState" : {
      type:String
  },
  "superMarketDescription" : {
    type:String
  },
  "superMarketPhone" : {
    type:String
  }
});

module.exports = mongoose.model('Supermarket', SupermarketsSchema, 'supermarkets');

