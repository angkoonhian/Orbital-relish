<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    
    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if (isset($postdata) && !empty($postdata)) {
        $name = mysqli_real_escape_string($mysqli, trim($request->username));
        $password = mysqli_real_escape_string($mysqli, trim($request->password));
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $phoneNumber = mysqli_real_escape_string($mysqli, trim($request->phoneNumber));
        $preference = mysqli_real_escape_string($mysqli, trim($request->preference));
        $sql = "INSERT INTO customer (CustomerName, Password_Cust, Handphone, Preferences, email)
    VALUES ('$name', '$password', '$phoneNumber', '$preference', '$email');";
    }

    $result = mysqli_query($mysqli, $sql);

    if (!$result) {
        $message  = 'Invalid query: ' . mysqli_error() . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }
?>