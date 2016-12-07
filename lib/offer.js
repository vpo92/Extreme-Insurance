exports.findXOffer = function(country, nbChild, nbAdults, remainingDaysBeforeStart){
  
  var offers = [];
  var xOff = "";
  var xOff2 = "";
  //CH, Skiing
  if(country == 'CH'){
    offers.push('Skiing');
    offers.push('Medical');
    offers.push('Sports');
    offers.push('Accident');
  }else{
    offers.push('Medical');
    offers.push('Sports');
    offers.push('Accident');
  }
  if(nbChild > 0 && nbAdults > 0){
    offers.push('Yoga');
  }

  if(xOff){
    offers.push(xOff);
  }
  if(xOff2){
    offers.push(xOff2);
  }
  if(nbChild > nbAdults){
    offers.push('Child care');
  }
  if(nbAdults>=1 && nbChild == 0){
    offers.push("Massage");
    offers.push("Dancing");
  }
  if(remainingDaysBeforeStart < 3){
    offers.push('Paper work');
  }
  //US care rental
  if(country == 'US'){
    offers.push('Rental');
  }

  //nb of offert
  var nbOffers = Math.random() * (3 - 0) + 0;
  var finalOffers = [];
  //Select Offers
  for(var i = 0; i < nbOffers; i++){
    finalOffers.push(offers[parseInt(Math.random() * (offers.length - 0) + 0)]);
  }
  //Math.random() * (high - low) + low


  return finalOffers;
};
