<?php

    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if (isset($postdata) && !empty($postdata)) {
        $ChefID = mysqli_real_escape_string($mysqli, trim($request->ChefID));
        $CustID = mysqli_real_escape_string($mysqli, trim($request->custID));
        $totalSum = mysqli_real_escape_string($mysqli, trim($request->totalSum));
        $Orders = mysqli_real_escape_string($mysqli, trim($request->orders));
        $Location = mysqli_real_escape_string($mysqli, trim($request->location));
        $dateTime = mysqli_real_escape_string($mysqli, trim($request->dateTime));
        $sql = "INSERT INTO orders (OrderDate, Order_VendorID, Order_CustomerID, OrderDetails, status, Location, TotalAmount)
          VALUES ('$dateTime', '$ChefID', '$CustID', '$Orders', 'Pending', '$Location', '$totalSum');";
    } 
    $result = mysqli_query($mysqli, $sql);

    if (!$result) {
        $message  = 'Invalid query: ' . mysqli_error() . "\n";
        $message .= 'Whole query: ' . $query;
        die($message);
    }
?>