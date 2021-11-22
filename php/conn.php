<?php
    @header("Content-Type:text/json;charset=utf-8");

    // 1. 链接mysql
    // const host = "localhost:3306";
    const host = "127.0.0.1:3306";
    const user = "root";
    const pwd = "root";
    const dbName = "2108";

    // mysqli_connect(host,user,pwd,dbName)
    // 链接成功  => 链接对象
    // 链接失败  => 报错: Access denied for user 'root'@'localhost'  => false

    $conn = mysqli_connect(host,user,pwd,dbName);

    // print_r($conn);

    if(!$conn) {
        exit("数据库连接失败!!!");
    }

    // 转码设置  => 可以手写 但是没有必要 (可以不写 但是不能写错)
    mysqli_query($conn,"set names utf8"); // 从数据库取数据时  将编码转为utf-8;  
    mysqli_query($conn,"set character set utf-8"); // 向数据库存数据时  将编码转为utf-8




?>