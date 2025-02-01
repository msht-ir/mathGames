  //variables
  var playerName = "";
  var N1int = 0;
  var N2int = 0;
  var N1dec = 0;
  var N2dec = 0;
  var N1 = 0n;
  var N2 = 0n;
  var GT = 0; //geme type
  var Qstn = 0;
  var R = 0;
  var Ans = 0n;
  var userAns = 0;
  var xInterval;
  var Tm = 0;
  var Ti = 0;
  var strResult = "";
  //get player name
  playerName = prompt("Player name:", "name");
  if ((playerName.trimEnd()=="your name...") || (playerName.length < 3))
  {
    document.getElementById("playerName").innerHTML = "<br><h4 style='color:blue;'>Calculations- new player </H4>";
  }
  else
  {
    document.getElementById("playerName").innerHTML = "<br><h4 style='color:blue;'>" + playerName + "</H4>";
  }
  //focus
  document.getElementById("txt_Tm").focus();
  document.getElementById("txt_Tm").select();
  document.getElementById("output").innerHTML = "";

//--method START, ASK
  function btnStart_click()
    {
      Tm = document.getElementById("txt_Tm").value;
      document.getElementById("lbl_Timer").innerHTML = Tm + "''";
      //document.getElementById("output").innerHTML = "";
      Ti = 0;
      Qstn = "";
      Ans = 0;
      userAns = 0;
      strResult = "";
      //read parameters
      GT = 0;
      Qstn = "";
      if(document.getElementById("chk_1").checked)
        {GT |= 1;}
      if(document.getElementById("chk_2").checked)
        {GT |= 2;}
      if(document.getElementById("chk_3").checked)
        {GT |= 4;}
      if(document.getElementById("chk_4").checked)
        {GT |= 8;}
      if(GT == 0)
        {
          GT = 1;
          document.getElementById("chk_1").checked = true;
        }
        //operands
      N1int = document.getElementById("txt_N1int").valueAsNumber;
      N1dec = document.getElementById("txt_N1dec").valueAsNumber;
      N2int = document.getElementById("txt_N2int").valueAsNumber;
      N2dec = document.getElementById("txt_N2dec").valueAsNumber;
      N1= Math.floor(Math.random() * Math.pow (10, (N1int + N1dec)) + 1) / Math.pow (10, (N1dec));
      N2= Math.floor(Math.random() * Math.pow (10, (N2int + N2dec)) + 1) / Math.pow (10, (N2dec));
      //operator
      R = Math.floor(Math.random() * 4 + 1) //R=[1-4]
      while (((Math.pow (2, (R-1))) & GT) != (Math.pow (2, (R-1))))
        {
          R = Math.floor(Math.random() * 4 + 1) //R=[1-4]
          //alert("R = " + R);
        }
        //alert("OK! GT:" + GT + "\n\nR: " + R + "\n\n2^(R-1): " + Math.pow (2, (R-1)));
        switch (R)
        {
          case 1:
            {
              Qstn = N1 + " + " + N2;
              Ans = parseFloat((N1 + N2).toFixed(1));
              break;
            }
          case 2:
              {
                if (N2 > N1)
                {
                  var swp = N2;
                  N2 = N1;
                  N1 = swp;
                }
                Qstn = N1 + " - " + N2;
                Ans = parseFloat((N1 - N2).toFixed(1));
                break;
              }
          case 3:
            {
              Qstn = N1 + " x " + N2;
              Ans = parseFloat((N1 * N2).toFixed(1));
              break;
            }
          case 4:
            {
              if (N2 > N1)
                {
                  var swp = N2;
                  N2 = N1;
                  N1 = swp;
                }
              Qstn = N1 + " ÷ " + N2;
              Ans = parseFloat((N1 / N2).toFixed(1));
              break;
            }
        }      
        document.getElementById("lbl_Qstn").innerHTML = Qstn;
      //timer on
      startTimer(Tm);
      document.getElementById("txt_Answer").focus();
      document.getElementById("txt_Answer").select();
  }

//--method ANSWER
  function btnAnswer_click()
  {
    if(Tm <= 0)
    {
      return;
    }
    userAns = document.getElementById("txt_Answer").value;
    if(isNaN(userAns))
    {
        document.getElementById("txt_Answer").focus();
        document.getElementById("txt_Answer").select();
        return;
      }
    else
      {
        if (userAns == Ans)
        {
          document.getElementById("output").innerHTML += Qstn + " = " + Ans + " ( correct! ) : " + Ti + "\" <br>";
          alert("Correct !");
        }
        else
        {
          document.getElementById("output").innerHTML += Qstn + " = " + userAns + " ? ( incorrect ) : " + Ti + "\" <br>";
          document.getElementById("txt_Answer").focus();
          document.getElementById("txt_Answer").select(); 
          alert("Incorrect !");
          return;
        }
      }
      btnStart_click();
    }
  function startTimer (Tm)
  {
    clearInterval(xInterval);
    xInterval = setInterval(
      function() 
      {
        Tm--;
        Ti++;
        document.getElementById("lbl_Timer").innerHTML = Tm + "''";
        if (Tm < 0)
            {
              clearInterval(xInterval);
              document.getElementById("output").innerHTML += Qstn + " --Time over <br>";
              //alert("Time over!");
              btnStart_click();
            }
      }, 1000);
  }
  function btnHelp_click()
  {
    alert (strHelp);
  }
//--method TIMER-EXIT
  function btnExit_click()
{
  clearInterval(xInterval);
  let text = "مي خواهيد خارج شويد؟";
  if (confirm(text) == true)
    {
    window.location.href = 'https://msht.ir/';
    }
  else
    {
      document.getElementById("txt_Tm").focus();
      document.getElementById("txt_Tm").select();
    }
  }

  var input1 = document.getElementById("txt_Tm");
  input1.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      if(!isNaN(input1.valueAsNumber))
      {
        //event.preventDefault();
        btnStart_click();
      }
    }
  });


  var input2 = document.getElementById("txt_Answer");
  input2.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    {
      if(!isNaN(input2.valueAsNumber))
      {
        //event.preventDefault();
        btnAnswer_click();
      }
    }
  });

