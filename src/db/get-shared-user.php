<?php
include "db_conn.php";
include "validate.php";
header("Content-Type: application/json");

if (isset($_POST['uno'])) {

    $uno = validate($_POST['uno']);

    if (empty($uno)) {
        echo json_encode(array('ststus'=>401));
        exit();
    }else{

    $sql =  "SELECT uno, uid FROM user WHERE uno IN (SELECT llinked FROM linkeduser, user WHERE uno = luno AND uno = '$uno');";
 
    $result = mysqli_query($conn, $sql);

    if($result === false){
            echo json_encode(array('status'=>'500'));
            exit();
    } else {

        $results = array();

         if(mysqli_num_rows($result) != 0){
              while($row = mysqli_fetch_assoc($result)){
                   $results[] = [                       
                        'shared' => $row['uno'],
                        'user' => $row['uid']
                    ];
                }
                echo json_encode(array('status'=>'success', 'results' => $results));
                exit();
         }
         else{
                echo json_encode(array('status'=>'success', 'results' => $results));
                exit();
         }       
    }
}
}else{
        echo json_encode(array('status' => 400));
        exit();
}
?>