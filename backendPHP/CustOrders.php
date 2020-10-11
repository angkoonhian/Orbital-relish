<?php

include_once 'Main.php';

$postdata = file_get_contents("php://input");
$request = $_GET['CustID'];
$sql = "SELECT * FROM orders WHERE Order_CustomerID = $request";

    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = array();

        while($row=mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }

        echo json_encode($rows);
    } else {
        http_response_code(404);
    }