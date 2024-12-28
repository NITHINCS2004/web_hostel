<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    
    <title></title>
    <link rel="stylesheet" href="..\css\studentdashboard.css">

    <script type="text/javascript">
      function applyleave(){
        window.location.href ="/project/applyleave.html";
      }
      function roomdetails(){
        window.location.href ="/project/studentroomdetails.html";

      }
      function searchroommates(){
        window.location.href ="/project/select/select.html";

      }
    </script>
  </head>
  <body>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- about -->

<?php include '../header.php';?>


<!-- end about -->
<div class="wrapper">

   <div class="content">
      <!-- card -->
      <div class="card" onclick="searchroommates()">

            <div class="icon"><i class="material-icons md-36">search</i></div>
            <p class="title">Raise Complaint</p>
            <p class="text">Report the Issue.</p>

      </div>
      <!-- end card -->
      <!-- card -->
      <div class="card" onclick="roomdetails()">

            <div class="icon"><i class="material-icons md-36">description</i></div>
            <p class="title">My Block Details</p>
            <p class="text">Check your block details.</p>

      </div>
      <!-- end card -->


      <!-- card -->
      <div class="card"  onclick="applyleave()">

            <div class="icon"><i class="material-icons md-36">add</i></div>
            <p class="title">Apply Leave</p>
            <p class="text">Apply for leave.</p>

      </div>
      <!-- end card -->

   </div>

</div>



  </body>
</html>