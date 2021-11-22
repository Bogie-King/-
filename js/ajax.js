
// 模拟封装 jquery中的ajax
// $ 对象 => 存储了三个方法
// $.ajax({
//     type,    请求方式
//     url      请求地址
//     data     传递的数据(string|object)  如果是对象 => 遍历对象转化为参数数据队列
//     async    是否异步
//     dataType 接口返回的数据类型(text(默认) / html / json)
//     success  回调函数 => 请求成功时执行的内容(回调函数有一个形式参数  用于接收接口返回的结果)
// })

var $ = {
    get: function (options) {
        // debugger;
        var { url, data = "", async = true, dataType = "text", success } = options;

        // data instanceof Object   不准确 且听下回分解
        if (typeof data == "object") {
            var str = "";
            for (var key in data) {
                var val = data[key];
                str += key + "=" + val + "&";
            }
            data = str.substring(0, str.length - 1);
            console.log(data);
        }


        var xhr = new XMLHttpRequest();

        xhr.open("get", url + "?" + data, async);

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                console.log(result);
                if (dataType == "json") {  // 如果用户说 返回的数据是json => JSON.parse();
                    result = JSON.parse(result);
                }
                console.log(result);

                // 获取接口响应的结果之后  => 用户执行的内容并不是固定的
                if (success) {
                    success(result);   // 回调函数在执行过程中 => 将请求的结果作为实际参数传入
                }

            }
        }
    },
    post: function (options) {
        // debugger;
        var { url, data = "", async = true, dataType = "text", success } = options;

        // data instanceof Object   不准确 且听下回分解
        if (typeof data == "object") {
            var str = "";
            for (var key in data) {
                var val = data[key];
                str += key + "=" + val + "&";
            }
            data = str.substring(0, str.length - 1);
            console.log(data);
        }

        var xhr = new XMLHttpRequest();

        xhr.open("post", url, async);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                console.log(result);
                if (dataType == "json") {  // 如果用户说 返回的数据是json => JSON.parse();
                    result = JSON.parse(result);
                }
                console.log(result);

                // 获取接口响应的结果之后  => 用户执行的内容并不是固定的
                if (success) {
                    success(result);   // 回调函数在执行过程中 => 将请求的结果作为实际参数传入
                }

            }
        }
    },
    ajax: function (options) {
        // debugger;
        var { type = "get", url, data = "", async = true, dataType = "text", success } = options;

        // data instanceof Object   不准确 且听下回分解
        if (typeof data == "object") {
            var str = "";
            for (var key in data) {
                var val = data[key];
                str += key + "=" + val + "&";
            }
            data = str.substring(0, str.length - 1);
            // console.log(data);
        }

        var xhr = new XMLHttpRequest();

        if (type.toLowerCase() == "get") {
            // data(是否有数据) 有: 拼接url + "?" + data 没有:直接请求url
            xhr.open("get", data ? url + "?" + data : url, async);
            xhr.send();
        } else if (type.toLowerCase() == "post") {
            xhr.open("post", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
        }


        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                // console.log(result);
                if (dataType == "json") {  // 如果用户说 返回的数据是json => JSON.parse();
                    result = JSON.parse(result);
                }
                // console.log(result);

                // 获取接口响应的结果之后  => 用户执行的内容并不是固定的
                if (success) {
                    success(result);   // 回调函数在执行过程中 => 将请求的结果作为实际参数传入
                }

            }
        }
    }
}