<?php
    @header("Content-Type:text/html;charset=utf-8");

    @include_once("conn.php");

    if(!(isset($_POST["user"])&&isset($_POST["pwd"]))){
        $obj = array(); 
        $obj["status"] = false;
        $obj["msg"] = "请传入完整参数";
        $json = json_encode($obj);
        exit($json);
    }


    // 前端传入的用户名/密码 
    // $user = "a123123";
    // $pwd = "123123";

    $user = $_POST["user"];
    $pwd = $_POST["pwd"];


    // 登录 
    // 前端传入的用户名/密码   和  数据库存储的用户名密码对比

    // 1. 如何获取 数据库存储的用户名密码?   => 对应用户名查找

    $sql = "select * from `userinfo` where user = '$user'";

    $result = mysqli_query($conn,$sql);

    $obj = array();
    if($result){

        $item = mysqli_fetch_assoc($result);
        // print_r($item);

        if($item){  // 有数据  => 对比密码
            $realPwd = $item["pwd"];
            if($pwd === $realPwd){
                $obj["status"] = true;
                $obj["msg"] = "登录成功";
            }else{
                $obj["status"] = false;
                $obj["msg"] = "用户名或密码有误";
            }
        }else{
            $obj["status"] = false;
            $obj["msg"] = "该用户名未注册";
        }
    }else{
        $obj["status"] = false;
        $obj["msg"] = "sql语句有误";
        $obj["sql"] = $sql;
    }

    echo json_encode($obj);



?>