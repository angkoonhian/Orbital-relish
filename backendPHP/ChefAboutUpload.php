<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    
    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if (isset($postdata) && !empty($postdata)) {
        $ID = mysqli_real_escape_string($mysqli, trim($request->currentVendorID));
        $About = mysqli_real_escape_string($mysqli, trim($request->AboutUpdate));
        $sql = "UPDATE vendor SET About = '$About' WHERE `Vendor ID` = '$ID';";
    }

    $result = mysqli_query($mysqli, $sql);

    if (!$result) {
        $message  = 'Invalid query: ' . mysqli_error() . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }
?>