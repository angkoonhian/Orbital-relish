<?php
    
    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    if (isset($postdata) && !empty($postdata)) {
        $VendorID = mysqli_real_escape_string($mysqli, trim($request->VendorID));
        $sql = "SELECT * FROM dish WHERE Vendor_VendorID = $VendorID;"; 
        if ($result = mysqli_query($mysqli, $sql)) {
            $rows = array();
    
            while($row = mysqli_fetch_assoc($result)) {
                $dataSql = "SELECT * FROM dish LIMIT 1;";
                $dataResult = mysqli_query($mysqli, $dataSql);
                $dataNew = mysqli_fetch_assoc($dataResult);
    
                $rows[] = $row + $dataNew;
            }
            echo json_encode($rows);
        } else {
            http_response_code(404);
        }
        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }
    }
    
    
?>