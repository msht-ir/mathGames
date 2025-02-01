  //variables
  var playerName = "";
  var level = 0;
  var nQ = 0;
  var Qi = 0;
  var Op1 = 0;
  var Op2 = 0;
  var x1 = 0;
  var x2 = 0;
  var Nx = 0;
  var N1 = 0;
  var N2 = 0;
  var N3 = 0;
  var N4 = 0;
  var Ans = 0;
  var userAns = 0;
  var Tm = 0;
  var strHelp = "";
  var intSeconds = 0;
  var counterDate;
  var xInterval;
  //1: Nx=N4  [*, +-] [2 - 5]
  //2: Nx=N4  [?, ? ] [2 - 5]
  //3: Nx=N1  [?, ? ] [2 - 5]
  //4: Nx=N3  [?, ? ] [2 - 7]
  //5: Nx=N2  [?, ? ] [3 - 10]
  //6: Nx=rnd [?, ? ] [2 - 10]
  
  //get player name
  playerName = prompt("Hello! Please enter your name:", "name");
  if ((playerName.trimEnd()=="your name...") || (playerName.length < 3))
  {
    document.getElementById("playerName").innerHTML = "<br><h4 style='color:blue;'>Pattern- new player </H4>";
  }
  else
  {
    document.getElementById("playerName").innerHTML = "<br><h4 style='color:blue;'>" + playerName + "</H4>";
  }
  //focus
  document.getElementById("txt_nQ").focus();
  document.getElementById("txt_nQ").select();
  //--method START
  function btnStart_click()
    {
      Tm = 0;
      Qi = 0;
      nQ = 0;
      document.getElementById("output").innerHTML = "";
      document.getElementById("lbl_Timer").innerHTML = Tm + "''";
      level = document.getElementById("lst_Level").value;
      if (level == "0")
      {
        document.getElementById("lst_Level").focus();
        return;
      }
      nQ = document.getElementById("txt_nQ").value;
      if(nQ < 2)
        {
          document.getElementById("txt_nQ").focus();
          document.getElementById("txt_nQ").select();
          return;
        }
        else
        {
          if (level == "1")      {  intSeconds = nQ * 50;    }
          else if (level == "2") {  intSeconds = nQ * 40;    }
          else if (level == "3") {  intSeconds = nQ * 35;    }
          else                   {  intSeconds = nQ * 30;    }
          
          switch(level)
            {
              case "1":
                {intSeconds = nQ * 50; break;}
              case "2":
                {intSeconds = nQ * 60; break;}
              case "3":
                {intSeconds = nQ * 60; break;}
              case "4":
                {intSeconds = nQ * 70; break;}
              case "5":
                {intSeconds = nQ * 80; break;}
              case "6":
                {intSeconds = nQ * 70; break;}
            }
          startTimer(intSeconds);          
          Ask();
        }
    }
  //--method ASK
    function Ask()
    {
      if(Tm <= 0)
      {
        return;
      }
      Qi++;
      if(Qi >nQ)
        {
          clearInterval(xInterval);
          document.getElementById("lbl_Timer").innerHTML = "Game is over!";
          return;
        }
      document.getElementById("lbl_Qi").innerHTML = Qi + " of " + nQ;
      strHelp="";
      //step1: determine N1, x1, x2
      switch (level)
      {
        case "1":
          {
            x1 = Math.floor(Math.random() * (5 - 2) + 2);
            x2 = Math.floor(Math.random() * (5 - 2) + 2);
            N1= Math.floor(Math.random() * (5 - 2) + 2);
            break;
          }
        case "2":
          {
            x1 = Math.floor(Math.random() * (5 - 2) + 2);
            x2 = Math.floor(Math.random() * (5 - 2) + 2);
            N1= Math.floor(Math.random() * (5 - 2) + 2);
            break;
          }
        case "3":
          {
            x1 = Math.floor(Math.random() * (5 - 2) + 2);
            x2 = Math.floor(Math.random() * (5 - 2) + 2);
            N1= Math.floor(Math.random() * (5 - 2) + 2);
            break;
          }
        case "4":
          {
            x1 = Math.floor(Math.random() * (7 - 2) + 2);
            x2 = Math.floor(Math.random() * (7 - 2) + 2);
            N1= Math.floor(Math.random() * (7 - 2) + 2);
            break;
          }
        case "5":
          {
            x1 = Math.floor(Math.random() * (10 - 3) + 3);
            x2 = Math.floor(Math.random() * (10 - 3) + 3);
            N1= Math.floor(Math.random() * (10 - 3) + 3);
            break;
          }
        case "6":
          {
            x1 = Math.floor(Math.random() * (10 - 2) + 2);
            x2 = Math.floor(Math.random() * (10 - 2) + 2);
            N1= Math.floor(Math.random() * (10 - 2) + 2);
            break;
          }
      }
      //step2: determine Op1, Op2
      if (level == 1)
        {
          Op1 = 30; //3=(*)
          Op2 = Math.floor(Math.random() * 2 + 1); //for Op2: 1=(+), 2=(-)
        }
      else
      {
        Op1 = Math.floor(Math.random() * 3 + 1) * 10;
        if ((Op1 == 10) || (Op1 == 20))
          {
            Op2 = 3; //for Op2: 3= (*)
          }
        else
          {
            Op2 = Math.floor(Math.random() * 2 + 1); //for Op2: 1=(+), 2=(-)
          }
        }
        switch (level)
          {
            case "1":
              {
                Nx = 4;
                break;
              }
            case "2":
              {
                Nx = 4;
                break;
              }
            case "3":
              {
                Nx = 1;
                break;
              }
            case "4":
              {
                Nx = 3;
                break;
              }
            case "5":
              {
                Nx = 2;
                break;
              }
            case "6":
              {
                Nx = Math.floor(Math.random() * 4 + 1); //random
                break;
              }
          }
      switch (Op1 + Op2)
      {
        case 13:
          {
            strHelp ="[ +" + x1 + " *" + x2 + " ]";
            N2 = (N1 + x1) * x2;
            N3 = (N2 + x1) * x2;
            N4 = (N3 + x1) * x2;
            break;
          }
        case 23:
          {
            strHelp ="[ -" + x1 + " *" + x2 + " ]";
            N2 = (N1 - x1) * x2;
            N3 = (N2 - x1) * x2;
            N4 = (N3 - x1) * x2;
            break;
          }
        case 31:
          {
            strHelp ="[ *" + x1 + " +" + x2 + " ]";
            N2 = (N1 * x1) + x2;
            N3 = (N2 * x1) + x2;
            N4 = (N3 * x1) + x2;
            break;
          }
        case 32:
          {
            strHelp ="[ *" + x1 + " -" + x2 + " ]";
            N2 = (N1 * x1) - x2;
            N3 = (N2 * x1) - x2;
            N4 = (N3 * x1) - x2;
            break;
          }
      }
      switch (Nx)
      {
        case 1:
          {
            Ans = N1;
            document.getElementById("lbl_N1N4").innerHTML= "[ ? ] [ " + N2 + " ] [ " + N3 + " ] [ " + N4 + " ]";
            break;
          }
        case 2:
          {
            Ans = N2;
            document.getElementById("lbl_N1N4").innerHTML= "[ " + N1 + " ] [ ? ] [ " + N3 + " ] [ " + N4 + " ]";
            break;
          }
        case 3:
          {
            Ans = N3;
            document.getElementById("lbl_N1N4").innerHTML= "[ " + N1 + " ] [ " + N2 + " ] [ ? ] [ " + N4 + " ]";
            break;
          }
        case 4:
          {
            Ans = N4;
            document.getElementById("lbl_N1N4").innerHTML= "[ " + N1 + " ] [ " + N2 + " ] [ " + N3 + " ] [ ? ]";
            break;
          }
      }
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
      if(Qi > nQ)
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
            //alert("Correct!");
            document.getElementById("output").innerHTML += "Q" + Qi +  " -Pattern: " + strHelp + " - Your ans: " + userAns + " (correct!) <br>";
          }
          else
          {
            //alert(userAns + " was incorrect!\n\nCorrect answer: " + Ans + "\n\n\nPattern: " + strHelp);
            document.getElementById("output").innerHTML += "Q" + Qi + ": Ans: " + Ans +  " -Pattern: " + strHelp + " - Your ans: " + userAns + " (incorrect!) <br>";
          }
        }
        strHelp="";
        Ask();
      }
    function startTimer (intSeconds)
    {
      Tm = intSeconds;
      clearInterval(xInterval);
      xInterval = setInterval(
        function() 
        {
          Tm--;
          document.getElementById("lbl_Timer").innerHTML = Tm + "''";
          if (Tm <= 0)
              {
                clearInterval(xInterval);
                document.getElementById("lbl_Timer").innerHTML = "Time is over!";
              }
        }, 1000);
    }
    function btnHelp_click()
    {
      alert (strHelp);
      document.getElementById("txt_Answer").focus();
      document.getElementById("txt_Answer").select();
    }
  //--method TIMER-EXIT
  function btnExit_click()
  {
    let text = "مي خواهيد خارج شويد؟";
    if (confirm(text) == true)
      {
      window.location.href = 'https://msht.ir/';
      }
    else
      {
        document.getElementById("txt_nQ").focus();
        document.getElementById("txt_nQ").select();
      }
    }    

  var input1 = document.getElementById("txt_nQ");
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
      //event.preventDefault();
      btnAnswer_click();
    }
  });
