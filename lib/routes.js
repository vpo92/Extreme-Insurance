var moment = require('moment');

exports.order = function order(req, res, next) {
  // TODO implement from here
  res.json({});
}

exports.quote = function quote(req, res, next) {
  console.info("QUOTE:", req.body.country, req.body.content);
  
  console.log(req.body);
	var cover = req.body.cover;
	var country = req.body.country;
	var ages = req.body.travellerAges;
	
	var Covers = {"Basic" : 1.7 , "Extra" : 2.4 , "Premier" : 4.2 }; 
	var countries = {'ES' : 1.0 , 'BE' : 1.1 , 'FI' : 0.8 , 'FR' : 1.0 , 'EL':0.9, 'UK':1.1, "CZ": 1.4};	
	var a = moment(req.body.returnDate);
	var b = moment(req.body.departureDate);	
	var options = req.body.options.length != 0 ? 28 : 0;
	var numberOfDays = a.diff(b, 'days');	
	var numberOfTravelers = req.body.travellerAges.length;	
	var quoteConstant = 1.8;
	
	console.log("numberOfDays "+numberOfDays);
	console.log("numberOfTravelers "+numberOfTravelers);
	console.log("options "+options);
	
	var quotes = quoteConstant * numberOfDays * numberOfTravelers;
	//(covers[cover] * numberOfDays * getAges(ages) * countries[country]) + options
	console.log("quotes "+quotes);
	res.json({"quote": quotes});
	
}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.message, req.body.content);
  res.json({});
}
