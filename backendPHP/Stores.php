<?php
    
    include_once 'Main.php';

    $sql = "SELECT * FROM vendor;"; 

    if ($result = mysqli_query($mysqli, $sql)) {
        $rows = array();

        while($row = mysqli_fetch_assoc($result)) {
            $dataSql = "SELECT * FROM vendor LIMIT 1;";
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
    
?>