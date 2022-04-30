<?php
include "db_conn.php";
include "validate.php";
header("Content-Type: application/json");

if (isset($_POST['sno'])) {

    $sno = validate($_POST['sno']);

    if (empty($sno)) {
        echo json_encode(array('ststus'=>401));
        exit();
    }else{

    $sql = "SELECT dno, dsno, duno, uid FROM user, sharedschedule WHERE uno = duno AND dsno = '$sno';";

    $result = mysqli_query($conn, $sql);

    if($result === false){
            echo json_encode(array('status'=>'500'));
            exit();
    } else {

        $results = array();

         if(mysqli_num_rows($result) != 0){
              while($row = mysqli_fetch_assoc($result)){
                   $results[] = [                       
                        'dno' => $row['dno'],
                        'dsno' => $row['dsno'],
                        'duno' => $row['duno'],
                        'shared' =>  $row['uid']
                    ];
                }
                
                echo json_encode(array('status'=>'success', 'results' => $results));
                exit();
         }
         else{
            echo json_encode(array('status' => 500));
            exit();
         }       
    }
}
}else{
        echo json_encode(array('status' => 400));
        exit();
}
?>