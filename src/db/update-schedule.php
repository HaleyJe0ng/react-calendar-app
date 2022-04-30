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
        $sno = $userInfo["sno"];
        $sinfo = $userInfo["sinfo"];
        $shareLength = count($share);

        $sql = "UPDATE schedule SET sstartdate = '$sstartdate', senddate= '$sstartdate', stitle = '$stitle', sinfo = '$sinfo' WHERE sno = '$sno';";
        $result = mysqli_query($conn, $sql);

        if($result === false){
            echo json_encode(array('status'=>'500'));
            exit();
        } else {

            $sqlGetShared = "SELECT dsno, duno FROM sharedschedule WHERE dsno = '$sno'";
            $resultGetShared = mysqli_query($conn, $sqlGetShared);

             if($resultGetShared === false){
                echo json_encode(array('status'=>'500'));
                exit();
             } else {

                //sharedschedule 있는지 확인
                if(mysqli_num_rows($resultGetShared) == 0 && $shareLength == 0){
                    //No update
                    echo json_encode(array('status'=>'success', 'results' => 'update success / no shared user'));
                    exit();
                }
                else if(mysqli_num_rows($resultGetShared) == 0 && $shareLength != 0){
                    //Select 정보는 없는데 공유 정보가 넘어왔다면 
                    //공유 정보 만큼 insert 해줌 
                    foreach ($share as $value) {
                        $sqlInsertShared = " INSERT INTO sharedschedule(dsno, duno) VALUES('$sno', '$value->shared');";
                        $resultInsertShared = mysqli_query($conn, $sqlInsertShared);
                        if($resultInsertShared === false){
                            echo json_encode(array('status'=>'500', 'results' => 'update sharedschedule failed - 1'));
                            exit();
                        }
                    }
                }
                else if(mysqli_num_rows($resultGetShared) != 0 && $shareLength == 0){
                    //공유 정보가 없다면 
                    //전부 delete 해줌
                    $sqlDeleteShared = "DELETE FROM sharedschedule WHERE dsno = '$sno';";
                    $resultDeleteShared = mysqli_query($conn, $sqlDeleteShared);
                
                    if($resultDeleteShared === false){
                            echo json_encode(array('status'=>'500', 'results' => 'update sharedschedule failed - 2'));
                            exit();
                    }
                }
                else{
                    $sqlDeleteSrd = "DELETE FROM sharedschedule WHERE dsno = '$sno';";
                    $resultDeleteSrd = mysqli_query($conn, $sqlDeleteSrd);
                
                    if($resultDeleteSrd === false){
                        echo json_encode(array('status'=>'500', 'results' => 'update sharedschedule failed - 3'));
                        exit();
                    }
                    else{
                        foreach ($share as $value) {
                            $sqlInsertSrd = " INSERT INTO sharedschedule(dsno, duno) VALUES('$sno', '$value->shared');";
                            $resultInsertSrd = mysqli_query($conn, $sqlInsertSrd);
                            if($resultInsertSrd === false){
                                echo json_encode(array('status'=>'500', 'results' => 'update sharedschedule failed - 4'));
                                exit();
                            }
                        }
                    } 
                }

                echo json_encode(array('status'=>'success', 'results' => 'update all success'));
                exit();
            }
        }
    }
}else{
        echo json_encode(array('status' => 400));
        exit();
}
?>