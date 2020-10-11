<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    
    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $ID = $_GET['OrderID'];
    $Status = $_GET['Status'];
    $sql = "UPDATE orders SET status = '$Status' WHERE `OrderNumber` = '$ID';";
    
    $result = mysqli_query($mysqli, $sql);

    if (!$result) {
        $message  = 'Invalid query: ' . mysqli_error() . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }
?>