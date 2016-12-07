var moment = require('moment');
var roman = require('../lib/roman');
var offerManager = require('../lib/offer');

exports.order = function order(req, res, next) {
  // TODO implement from here
  res.json({});
}
exports.defQuote = function quote(req, res, next) {
  res.status(204);
  res.json({});//next();
}

exports.quote = function quote(req, res, next) {
  //console.info("QUOTE:", req.body.country, req.body.content);

  console.log(req.body);



	var cover = req.body.cover;
	var country = req.body.country;
	var ages = req.body.travellerAges;
	var options = req.body.options;

	var a = moment(req.body.returnDate);
	var b = moment(req.body.departureDate);
  var c = moment(new Date());


	var numberOfDays = a.diff(b, 'days');

  var remainingDaysBeforeStart = b.diff(c, 'days');

	if (numberOfDays < 0){
		res.status(400);
	}
	var numberOfTravelers = req.body.travellerAges.length;
	var quoteConstant = getCover(cover);
	var countryValue = getCountry(country);
	if(countryValue==-1){
		res.status(400);
	}
	var ages = req.body.travellerAges;
	if (getAges(ages) < 0)
	{
		res.status(400);
	}

	//numberOfDays = numberOfDays < 11 ? 7: numberOfDays;
  var dayRatio = roman.all(numberOfDays);
	console.log("numberOfDays: "+numberOfDays);
	console.log("numberOfTravelers: "+numberOfTravelers);
	console.log("options: "+options);
	console.log("Cover: "+quoteConstant);
  console.log("dayRatio: "+dayRatio);

  //all


	var quotes = (quoteConstant * countryValue * getAges(ages) * dayRatio) + getOption(options);

	console.log("Children: " + children, "Adults: " +adults, "Senior: " +senior);
/*
  if(children > adults){
		quotes = quotes * 1.15 ;
	}else
	if(adults >= 2 && children >= 2){
		quotes = quotes * 0.8;
	}else
	if (adults == 2){
		quotes = quotes * 0.9;
	}else
	if (youngAdult >= 5)
	{
		quotes = quotes *0.9;
	}else
		if (numberOfTravelers ==1)
		{
			quotes = quotes * 0.95;
		}
	*/
	console.log("quotes "+quotes);
	res.json(
    {"quote": quotes, "offers":offerManager.findXOffer(country,children,adults,remainingDaysBeforeStart)}
  );

}

exports.feedback = function feedback(req, res, next) {
  console.info("FEEDBACK:", req.body.type, req.body.message, req.body.content);
  res.json({});
}

function calculateQuote(cover,country,ages,numberOfDays,options){

	return  (cover * country * ages * numberOfDays) + options;


}

function getCover(cover){
	var Covers = {"Basic" : 1.8 , "Extra" : 2.4 , "Premier" : 4.2 };

	return Covers[cover]? Covers[cover] : 1;

}

function getCountry(countries){
	var country = {'DK':1.2,'AT': 0.9, 'RO': 1.3, 'BG': 1.1, 'ES' : 1.1 , 'NL': 0.7,'SE':1.2, 'BE' : 0.9 , 'PT': 0.5,
  'PL' : 1.4, 'SK': 0.7, 'IT': 1.2, 'DE': 0.8, 'FI' : 0.8 , 'FR' : 1.0 , 'EL':0.9, 'UK':1.1, "CZ": 1.2, 'HR': 1.3,
   'HU': 1.1};

	return country[countries]? country[countries] : -1;

}

function getOption(options){
	var QUOTEoptions = {"Skiing" : 24 , "Medical" : 72 , "Scuba" : 36, "Sports": 25, "Yoga": -3 };

	var sumOfOptions = 0;
	for (i = 0 ; i < options.length; i++ ){
		var currentOpt = options[i];

			sumOfOptions += QUOTEoptions[currentOpt] ? QUOTEoptions[currentOpt] : 0;
	}
	return sumOfOptions;
}



function getAges(arrAges){
	adults = 0;
	children = 0;
	senior = 0;
	youngAdult = 0;

	var sumOfAges = 0;
	for (i = 0 ; i < arrAges.length; i++ ){
		var currentAge = arrAges[i];

		if (currentAge < 0)
		{
			return -1;
		}
		switch (true){
			case (currentAge < 18):
			sumOfAges += 1.1;
			//console.log("less than 18: " );
			children++;
			break;

			case (currentAge >= 18 && currentAge <= 24):
			sumOfAges += 0.9 ;
			youngAdult ++;
			adults++;
			break;

			case (currentAge >= 25 && currentAge <= 65):
			sumOfAges += 1.0;
			adults++;
			break;

			case (currentAge > 66):
			sumOfAges += 1.5;
			adults++;
			break;
			}

	}
	//console.log("sum of ages: " + sumOfAges);
	return sumOfAges;
}
