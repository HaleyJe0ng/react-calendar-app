<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Max-Age: 86400');
header('Access-Control-Allow-Headers: x-requested-with');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

  $conn = mysqli_connect("IP", "USER", "PW", "DB");
    if (!$conn) {
        echo json_encode(array('status'=>'500'));
        exit();
    }
?>