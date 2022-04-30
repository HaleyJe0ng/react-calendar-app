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

    $sql = "SELECT * FROM sharedschedule WHERE dsno = '$sno';";
    $result = mysqli_query($conn, $sql);

    if($result === false){
        echo json_encode(array('status'=>'500'));
        exit();
    } 
    else {
        if(mysqli_num_rows($result) != 0){
            $sqlShared = "DELETE FROM sharedschedule WHERE dsno = '$sno';";
            $resultShared = mysqli_query($conn, $sqlShared);

            if($resultShared === false){
                echo json_encode(array('status'=>'500', 'results' => 'shared schedule delete failed'));
                exit();
            } 
        }
    }

    $sqlSchedule = "DELETE FROM schedule WHERE sno = '$sno';";
    $resultSchedule = mysqli_query($conn, $sqlSchedule);

    if($resultSchedule === false){
            echo json_encode(array('status'=>'500', 'results' => 'schedule delete failed'));
            exit();
    } else {
        echo json_encode(array('status'=>'success', 'results' => 'Delete success'));
        exit();
    }
}
}else{
        echo json_encode(array('status' => 400));
        exit();
}
?>

