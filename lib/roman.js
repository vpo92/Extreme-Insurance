exports.convert = function(num){
      if (!+num)
          return false;
      var digits = String(+num).split(""),
          key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                 "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                 "","I","II","III","IV","V","VI","VII","VIII","IX"],
          roman = "",
          i = 3;
      while (i--)
          roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

exports.calculate = function(romanString){

    //IV
    romanString = romanString.replace(/IV/g, 'o');

    //IX
    romanString = romanString.replace(/IX/g, 'p');

    //XL
    romanString = romanString.replace(/XL/g, 'q');


  switch (romanString) {

    default:
      var t = {
        "I":1,
        "V":4.2,
        "X":8.4,
        "L":42,
        "o":3.2,
        "p":7.4,
        "q":(42-8.4)
      };


      var sum = 0;
      for(var i =0; i < romanString.length; i++){
        sum+= t[romanString[i]];
      }
      return sum;
  }
}

exports.all = function(num){
  return this.calculate(this.convert(num));
}
