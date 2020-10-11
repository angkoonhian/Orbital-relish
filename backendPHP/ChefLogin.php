<?php

    include_once 'Main.php';

    $postData = file_get_contents("php://input");
    $request = json_decode($postData);

    if (isset($postData) && !empty($postData)) {
        $password = mysqli_real_escape_string($mysqli, trim($request->password));
        $username = mysqli_real_escape_string($mysqli, trim($request->username));

        //echo $username;
        //echo $password;
        $sql = '';
        $sql = "SELECT * FROM vendor where VendorName = '$username' AND password_Vendor = '$password' LIMIT 1;";
        $result = mysqli_query($mysqli, $sql);

        if ($result = mysqli_query($mysqli, $sql)) {
            $rows = array();

            while($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }

            echo json_encode($rows);
        } else {
            http_response_code(404);
        }

        //if (!empty($result)) {
        //    echo json_encode($result);
        //}

        //else {
        //    http_response_code(404);
        //}
    }