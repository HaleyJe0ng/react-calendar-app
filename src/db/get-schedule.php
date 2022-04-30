<?php
include "db_conn.php";
include "validate.php";
header("Content-Type: application/json");

if (isset($_POST['uno']) && isset($_POST['year']) && isset($_POST['month'])) {

    $uno = validate($_POST['uno']);
    $year = validate($_POST['year']);
    $month = validate($_POST['month']);

    if (empty($uno)) {
        echo json_encode(array('ststus'=>401));
        exit();
    }else{

    $sql = " ((SELECT sno, suno as uno, uid, sstartdate, stitle, sinfo FROM schedule, user WHERE suno = uno and uno = '$uno' AND YEAR(sstartdate)='$year' AND MONTH(sstartdate) BETWEEN '$month' AND '$month') UNION (SELECT sno, suno as uno, uid, sstartdate, stitle, sinfo FROM schedule, user WHERE sno IN (SELECT sno FROM schedule WHERE YEAR(sstartdate)='$year' AND MONTH(sstartdate) BETWEEN '$month' AND '$month' AND sno IN (SELECT dsno FROM sharedschedule, user WHERE uno = duno AND uno = '$uno')) AND uid = (SELECT uid FROM user WHERE uno = (SELECT suno FROM schedule WHERE YEAR(sstartdate)='$year' AND MONTH(sstartdate) BETWEEN '$month' AND '$month' AND sno IN (SELECT dsno FROM sharedschedule, user WHERE uno = duno AND uno = '$uno') GROUP BY suno))))ORDER BY sstartdate ASC;";

    $result = mysqli_query($conn, $sql);

    if($result === false){
            echo json_encode(array('status'=>'500'));
            exit();
    } else {

        $results = array();

         if(mysqli_num_rows($result) != 0){
              while($row = mysqli_fetch_assoc($result)){
                   $results[] = [                       
                        'sno' => $row['sno'],
                        'owner' => $row['uno'],
                        'uid' => $row['uid'],
                        'sstartdate' =>  $row['sstartdate'],
                        'stitle' => $row['stitle'],
                        'sinfo' => $row['sinfo']
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