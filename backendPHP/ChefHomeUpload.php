<?php

    include_once 'Main.php';


    $upload_dir = 'HomeImage/';
    if ($_FILES['HomePic']) {

        $error = $_FILES['HomePic']["error"];
        $temp_name = $_FILES['HomePic']["tmp_name"];
        $Name = $_FILES['HomePic']['name'];
        echo($Name);

        if($error > 0){
            $response = array( 
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        } else {
            // The rest of your code will be added here.
            $random_name = rand(1000,1000000)."-".$Name.".jpg";
            $upload_name = $upload_dir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);

            if(move_uploaded_file($temp_name , $upload_name)) {
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" => $server_url."/".$upload_name
                  );
                  $sql = "UPDATE vendor 
                  SET HomePic = '$upload_name'
                  WHERE `Vendor ID` = '$Name';";
                  $result = mysqli_query($mysqli, $sql);

                   if (!$result) {
                       $message  = 'Invalid query: ' . mysqli_error() . "\n";
                       $message .= 'Whole query: ' . $query;
                       die($message);
                   }
            }else
            {
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }
        }
    } else {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "No file was sent!"
        );
    }