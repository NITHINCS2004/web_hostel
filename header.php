<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
    *{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Encode Sans Expanded",sans-serif;
    }


    .Nav{
    background: black;
      height: 80px;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index:10;

    }

    @media screen and (max-width: 960px) {
      .Nav{
        transition: 0.8s all ease;
      }
    }
    .NavbarContainer{
      display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;

    }
    @media screen and (max-width: 768px){
      .NavbarContainer{
        padding: 0 60px;
      }
    }

    .NavLogo{
      color:red;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
    }

    .MobileIcon{
      display: none;
    }
    @media screen and (max-width: 768px){
      .MobileIcon{
       display: block;
       position: absolute;
       top:0;
       right: 0;
       transform: translate(-100%,60%);
       font-size: 1.8rem;
       cursor: pointer;
       color: #fff;
     }

    }

    .NavMenu{
      display: flex;
    align-items: center;
    list-style:none;
    text-align:center;
    margin-right: -22px;

    }
    @media screen and (max-width: 768px){
      .NavMenu{
        display:none;
      }
    }
    .NavItem{
      height: 80px;
    }

    .NavLinks{
      color: #fff;
    display: flex;
    align-items:center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    }
    .NavLinks.active{
        border-bottom: 3px solid #01bf71;

    }
    .NavBtn{
      display: flex;
      align-items: center;

    }

      @media screen and (max-width: 768px){
        .NavBtn{
        display: none;
    }
    }

    .NavBtnLink{
      border-radius: 50px;
      background: #01bf71;
      whitespace: nowrap;
      padding: 10px 22px;
      color: #010606;
      font-size: 16px;
      outline: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-decoration: none;

    }

    .NavBtnLink:hover{

        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;

    }
    </style>
    <script type="text/javascript">
      function rtohome(){
window.location.href ="studentdashboard.php";

      }
      function logout(){
        window.location.href ="../index.php";

      }
    </script>
    

  </head>
  <body>
    <div class="Nav" id="Nav1">
      <div class="NavbarContainer">
        <img src="https://www.addressguru.in/images/1299650455.png" alt="assam" class="NavLogo" onclick="rtohome()">
        
        <div class="NavBtn" >
        <a href="../index.php" class="NavBtnLink" type="button" name="button">
            Back
        </a>
    </div>
        <div class="NavBtn">
          <button type="button" name="button" class="NavBtnLink" onclick="logout()" >Logout</button>
        </div>

      </div>
    </div>

  </body>
</html>