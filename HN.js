var intMaximum = 0;
var intHiddenNumber = 0;
var intYourGuess =0;
var intUpGuess=0;
var intDownGuess=0;
var intTries=0;
var strGuide="";
var boolShowGuide = false;
var intSeconds = 0;
var counterDate;
var xInterval;
document.getElementById("txtMax").focus();
document.getElementById("txtMax").select();
function btnStart_click()
{
  intMaximum = document.getElementById("txtMax").value;
  if(intMaximum < 6)
    {
      alert("يک عدد بيش از 5 وارد کنيد")
      return;
    }
  intHiddenNumber = Math.floor(Math.random() * intMaximum + 1);
  intTries = 0;
  intYourGuess = 0;
  intDownGuess= 1;
  intUpGuess = intMaximum;
  boolShowGuide = document.getElementById("chkShowGuide").checked;
  Guide("Start guessing the number!");
  document.getElementById("txtGuess").value="";
  document.getElementById("txtGuess").focus();
  intSeconds = 60;
  if (intMaximum <= 200)
  {
    intSeconds = 35;
  }
  if (intMaximum > 200)
  {
    intSeconds = 60;
  }
  if (intMaximum > 1000)
  {
    intSeconds = 70;
  }
  if (intMaximum > 5000)
  {
    intSeconds = 80;
  }
  if (intMaximum > 10000)
  {
    intSeconds = 100;
  }
  startTimer(intSeconds);
}
function btnTry_click()
{
  strGuide="";
  boolShowGuide = document.getElementById("chkShowGuide").checked;
  intYourGuess = document.getElementById("txtGuess").value;
  if(intYourGuess < 1)
    {
      alert("حدس خود را وارد کنيد")
      document.getElementById("txtGuess").focus();
      return;
    }
  intTries ++ ;
  if (intYourGuess == intHiddenNumber)
      {
          document.getElementById("lblGuide0").innerHTML = "CORRECT ! you guessed it in ( "+ intTries + " ) tries!";
          document.getElementById("lblGuide1").innerHTML = "";
          document.getElementById("lblGuide2").innerHTML = "";
          clearInterval(xInterval);
      }
  else if (intYourGuess > intHiddenNumber)
      {
          intUpGuess = intYourGuess;
          Guide("Guide: try a smaller number");
      }
  else if (intYourGuess < intHiddenNumber)
    {
      intDownGuess = intYourGuess;
      Guide("Guide: try a bigger number");
    }
    //focus
    document.getElementById("txtGuess").focus();
    document.getElementById("txtGuess").select();
  }
function Guide(strGuideString)
  {
    document.getElementById("lblGuide0").innerHTML = strGuideString + "<br>";
    if(boolShowGuide)
      {
        document.getElementById("lblGuide1").innerHTML = "greater than " + intDownGuess + " , less than " + intUpGuess;
        document.getElementById("lblGuide2").innerHTML = intDownGuess + " <   x   < " + intUpGuess;
      }
    else
      {
        document.getElementById("lblGuide1").innerHTML = "";
        document.getElementById("lblGuide2").innerHTML = "";
      }
  } 
function startTimer (intSeconds)
{
clearInterval(xInterval);
//Set the date we're counting down to
counterDate = new Date().getTime();
xInterval = setInterval(
  function() 
  {
      var now = new Date().getTime();
      var distance = now - counterDate;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("lblTimer").innerHTML = minutes + "' " + seconds + "'' / " + intSeconds + "''";
      if (distance > (intSeconds * 1000)) 
          {
              clearInterval(xInterval);
              document.getElementById("lblTimer").innerHTML = "Time is over!";
          }
  }, 1000
);
}

var input1 = document.getElementById("txtMax");
input1.addEventListener("keyup", function(event) 
    {
        if (event.keyCode === 13) 
            {
                if(!isNaN(input1.valueAsNumber))
                    {
                        //event.preventDefault();
                        btnStart_click();
                    }
            }
    }
);

var input2 = document.getElementById("txtGuess");
input2.addEventListener("keyup", function(event) 
    {
        if (event.keyCode === 13) 
            {
                if(!isNaN(input2.valueAsNumber))
                    {
                        //event.preventDefault();
                        btnTry_click();
                    }
            }
});
