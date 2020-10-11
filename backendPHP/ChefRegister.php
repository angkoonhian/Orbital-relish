<?php

    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if (isset($postdata) && !empty($postdata)) {
        $name = mysqli_real_escape_string($mysqli, trim($request->username));
        $password = mysqli_real_escape_string($mysqli, trim($request->password));
        $email = mysqli_real_escape_string($mysqli, trim($request->email));
        $phoneNumber = mysqli_real_escape_string($mysqli, trim($request->phoneNumber));
        $address = mysqli_real_escape_string($mysqli, trim($request->address));
        $postalCode = mysqli_real_escape_string($mysqli, trim($request->postalCode));
        $cuisine = mysqli_real_escape_string($mysqli, trim($request->cuisine));
        $sql = "INSERT INTO vendor (VendorName, Password_Vendor, Email, HandphoneNum, Location, Cuisines, Address, PostalCode)
          VALUES ('$name', '$password', '$email', '$phoneNumber', '$address', '$cuisine', '$address', '$postalCode');";
    } 
    $result = mysqli_query($mysqli, $sql);

    if (!$result) {
        $message  = 'Invalid query: ' . mysqli_error() . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }
?>