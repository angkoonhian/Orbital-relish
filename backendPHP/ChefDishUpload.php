<?php

    include_once 'Main.php';


    $upload_dir = 'DishImages/';
    if ($_FILES['DishImage']) {

        $error = $_FILES['DishImage']["error"];
        $temp_name = $_FILES['DishImage']["tmp_name"];
        $Name = $_FILES['DishImage']['name'];
        $spareName = $Name;
        $array = array();
        $data = explode('-', $Name);
        $DishName = $data[0];
        $DishPrice = $data[1];
        $DishDescription = $data[2];
        $VendorID = $data[3];

        if($error > 0){
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        } else {
            // The rest of your code will be added here.
            $random_name = rand(1000,1000000)."-".$DishName.".jpg";
            $upload_name = $upload_dir.strtolower($random_name);
            $upload_name = preg_replace('/\s+/', '-', $upload_name);

            if(move_uploaded_file($temp_name , $upload_name)) {
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully",
                    "url" => $server_url."/".$upload_name
                  );
                  $sql = "INSERT INTO dish (Vendor_VendorID, Name, Image, Description, price)
                  VALUES ('$VendorID', '$DishName', '$upload_name', '$DishDescription', '$DishPrice');";
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
    
    