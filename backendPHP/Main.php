<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With, Accept");

    $dbhost = 'localhost';
    $username = 'root';
    $password = '261114ay';
    $database = 'mydb';

    $mysqli = new mysqli($dbhost, $username, $password, $database);

    if (mysqli_connect_errno($mysqli)) {
   
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
     }
?>