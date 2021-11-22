<?php
    @header("Content-Type:text/html;charset=utf-8");

    @include_once("conn.php");

    if(!isset($_GET["user"])){
        $obj = array();
        $obj["status"] = false;
        $obj["msg"] = "请传入完整参数";
        $json = json_encode($obj);
        exit($json);
    }

    $user = $_GET["user"];

    $sql = "select * from `userinfo` where user = '$user'";

    $result = mysqli_query($conn,$sql);

    $obj = array();
    if($result){

        $item = mysqli_fetch_assoc($result);
        // print_r($item);

        if(!$item){  // $item = null
            $obj["status"] = true;
            $obj["msg"] = "可以使用的用户名";
        }else{
            $obj["status"] = false;
            $obj["msg"] = "该用户名已注册";
        }
    }else{
        $obj["status"] = false;
        $obj["msg"] = "sql语句有误";
        $obj["sql"] = $sql;
    }

    echo json_encode($obj);


?>