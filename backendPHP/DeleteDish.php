<?php
    
    include_once 'Main.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if (isset($postdata) && !empty($postdata)) {
        $DishID = mysqli_real_escape_string($mysqli, trim($request->DishID));
        $sql = "DELETE FROM dish WHERE DishID = $DishID;"; 
        $result = mysqli_query($mysqli, $sql);

        if (!$result) {
            $message  = 'Invalid query: ' . mysql_error() . "\n";
            $message .= 'Whole query: ' . $query;
            die($message);
        }
    }
    
    
?>