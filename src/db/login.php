<?php
include "db_conn.php";
header("Content-Type: application/json");

if (isset($_POST['uid']) && isset($_POST['upasswd'])) {

    function validate($data){
       $data = trim($data);
       $data = stripslashes($data);
       $data = htmlspecialchars($data);
       return $data;
    }

    $uid = validate($_POST['uid']);
    $upasswd = validate($_POST['upasswd']);

    if (empty($uid)) {
        echo json_encode(array('ststus'=>401));
        exit();
    }else if(empty($upasswd)){
        echo json_encode(array('ststus'=>401));
        exit();
    }
    else{

    $sql = "SELECT uno, uid FROM user WHERE uid ='$uid' and '$upasswd' = (SELECT AES_DECRYPT(UNHEX(upasswd), UNIQUEKEY ) FROM user WHERE uid='$uid')";
    $result = mysqli_query($conn, $sql);

    if($result === false){
            echo json_encode(array('status'=>'500'));
            exit();
    } else {
         if(mysqli_num_rows($result) != 0){
              while($row = mysqli_fetch_assoc($result)){
                  $uno = $row['uno'];
                }
                echo json_encode(array('status'=>'success', 'uno' => $uno, 'uid' => $uid));
                exit();
         }
         else{
                echo json_encode(array('status'=>500));
                exit();
         }       
    }
}
}else{
        echo json_encode(array('status' => 400));
        exit();
}
?>