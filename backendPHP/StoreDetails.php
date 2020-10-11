<?php

    include_once 'Main.php';

    $postdata = file_get_contents("php://input");

    if (isset($postdata) && !empty($postdata)) {
        $sql = "SELECT * FROM vendor WHERE `Vendor ID` = $postdata;"; 
        if ($result = mysqli_query($mysqli, $sql)) {
            $rows = array();
    
            while($row = mysqli_fetch_assoc($result)) {
                $dataSql = "SELECT * FROM vendor LIMIT 1;";
                $dataResult = mysqli_query($mysqli, $dataSql);
                $dataNew = mysqli_fetch_assoc($dataResult);
    
                $rows[] = $row + $dataNew;
            }
            echo json_encode($rows[0]);
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