<?php
include "db_conn.php";
include "validate.php";
header("Content-Type: application/json");

if (isset($_POST['uno']) && isset($_POST['year']) && isset($_POST['month']) && isset($_POST['userInfo'])) {

    $uno = validate($_POST['uno']);
    $year = validate($_POST['year']);
    $month = validate($_POST['month']);
    $userInfo = (array)json_decode($_POST['userInfo']);

    foreach ($userInfo as $value) {
        $userInfo->$value = validate($value);
    }

    if (empty($uno)) {
        echo json_encode(array('ststus'=>401));
        exit();
    }else if (empty($userInfo)) {
        echo json_encode(array('ststus'=>401));
        exit();
    }
    else{

        $sstartdate = $userInfo["day"];
        $owner = $userInfo["owner"];
        $share = (array)($userInfo["share"]);
        $stitle = $userInfo["stitle"];
        $sinfo = $userInfo["sinfo"];
        $shareLength = count($share);

        // insert user schedule 
        $sql = "INSERT INTO schedule(suno, sstartdate, sstarttime, senddate, sendtime, stitle, sinfo) VALUES ('$uno','$sstartdate', '00:00:00', '$sstartdate', '23:59:00','$stitle', '$sinfo');";
        $result = mysqli_query($conn, $sql);

        if($result === false){
            echo json_encode(array('status'=>'500'));
            exit();
        } else {
            if($shareLength != 0)
            {
                 //get latest data 
                 $sqlGetSno = "SELECT sno FROM schedule WHERE suno = '$uno' ORDER BY sno DESC LIMIT 1;";
                 $resultGetSno = mysqli_query($conn, $sqlGetSno);

                 if($resultGetSno === false){
                    echo json_encode(array('status'=>'500', 'results' => 'insert schedule false'));
                    exit();
                }else
                {
                    if(mysqli_num_rows($resultGetSno) != 0){
                        while($row = mysqli_fetch_assoc($resultGetSno)){
                            $sno = $row['sno'];
                          }
                        // insert shared schedule 
                        foreach ($share as $value) {
                            $sqlShared = " INSERT INTO sharedschedule(dsno, duno) VALUES('$sno', '$value->shared');";
                            $resultShared = mysqli_query($conn, $sqlShared);
                            if($resultShared === false){
                                echo json_encode(array('status'=>'500', 'results' => 'insert sharedschedule false'));
                                exit();
                            }
                        }
                   }
                }
            }    
            echo json_encode(array('status'=>'success', 'results' => 'insert success'));
            exit();
        }
}
}else{
        echo json_encode(array('status' => 400));
        exit();
}
?>






