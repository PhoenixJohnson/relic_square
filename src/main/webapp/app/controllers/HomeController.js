function fullpageChange(pageName) {
    switch (pageName) {
        case "friends":
            $.fn.fullpage.moveTo('cyclePage', 0);
            break;
        case "infoStation":
            $.fn.fullpage.moveTo('cyclePage', 1);
            break;
        default :
            $.fn.fullpage.moveTo('cyclePage', 0);
    }
}


Cycle.controller('HomeController', function ($scope, $filter, $rootScope, Lightbox, UserAction) {


    //personal informations

    $scope.userPic = "../img/phoenix.png";
    $scope.userName = "Phoenix Jiang";

    $scope.widgetPage = "../sections/Friends.html";

    $scope.pageName = "朋友圈";
    /*
     ******************************    Side bar controller     ***********************
     */

    /*
     ******************************    Links controller     ***********************
     */

    /*
     ******************************    Tasks controller     ***********************
     */

//dummy data
    $scope.notis = [
        {
            picture: "",
            title: "A新闻中友人评论了你",
            type: "新闻",
            publishTime: "5 秒钟前",
            content: "和谐就是力量，和谐就是社会的发展动力。"
        },
        {
            picture: "",
            title: "信息站B发表了新的分享",
            type: "信息站",
            publishTime: "5 秒钟前",
            content: "和谐就是力量，和谐就是社会的发展动力。"
        }
        ,
        {
            picture: "",
            title: "你的朋友圈开始躁动了",
            type: "朋友圈",
            publishTime: "5 秒钟前",
            content: "和谐就是力量，和谐就是社会的发展动力。"
        }
        ,
        {
            picture: "",
            title: "归属圈B有人更新了新的动态",
            type: "归属圈",
            publishTime: "5 秒钟前",
            content: "和谐就是力量，和谐就是社会的发展动力。"
        }
    ];

    $scope.msgs = [
        {
            picture: "",
            title: "虚假信息，测试使用",
            shortContent: "你号你好你浩！阿里款到即发；流口水的减肥；阿里看的就是发斯蒂芬；垃圾可是对方； 阿斯蒂芬；进口拉丝的；法律框架阿斯顿；理发速度发来；卡就是的；分了就卡死地方",
            publishTime: "2 小时前",
            from: "Melania"

        },
        {
            picture: "",
            title: "你问我时谁，我问你是谁",
            shortContent: "你号你好你浩！",
            publishTime: "一天 2 小时前",
            from: "Melania"

        },
        {
            picture: "",
            title: "虚假信息，不要看太多哦",
            shortContent: "你号你好你浩！",
            publishTime: "2 小时前",
            from: "Melania"

        }
    ];

    $scope.records = [
        {
            checked: false,
            picture: "../img/NewsPics/news.jpg",
            messageTitle: "提示1",
            star: true,
            messageContent: "当点赞按钮和点踩按钮比例超过90%，并且总量达到50000以上时，原始作者愿意提供更多信息或者管理这个平台是，归属按钮出现，此信息变为信息站类型。同事赞和踩按钮消失",
            createdDate: "2017-9-5",
            messageType: "新闻",
            comments: Math.floor(Math.random() * (100000 - 50) + 50),
            like: Math.floor(Math.random() * (5000 - 5) + 5),
            disLike: Math.floor(Math.random() * (1000 - 50) + 50),
            copyRight: "是"

        },
        {
            checked: false,
            picture: "../img/NewsPics/news.jpg",
            messageTitle: "提示2",
            star: false,
            messageContent: "当您的信息被人点赞+点踩总和大于10000以上时（赞的比例必须大于等于40%），热点按钮即被打开，该信息可能被直接推送至其他用户主页概率提高",
            createdDate: "2017-9-5",
            messageType: "新闻",
            comments: Math.floor(Math.random() * (100000 - 50) + 50),
            like: Math.floor(Math.random() * (5000 - 5) + 5),
            disLike: Math.floor(Math.random() * (1000 - 50) + 50),
            copyRight: "是"

        },
        {
            checked: true,
            picture: "../img/NewsPics/news.jpg",
            messageTitle: "提示3",
            star: false,
            messageContent: "一人对同一条信息只能点一次赞或者一次踩，多点无效。",
            createdDate: "2017-9-5",
            messageType: "新闻",
            comments: Math.floor(Math.random() * (100000 - 50) + 50),
            like: Math.floor(Math.random() * (5000 - 5) + 5),
            disLike: Math.floor(Math.random() * (1000 - 50) + 50),
            copyRight: "是"

        },
        {
            checked: false,
            picture: "../img/NewsPics/news.jpg",
            messageTitle: "提示1",
            star: false,
            messageContent: "当点赞按钮和点踩按钮比例超过90%，并且总量达到50000以上时，原始作者愿意提供更多信息或者管理这个平台是，归属按钮出现，此信息变为信息站类型。同事赞和踩按钮消失",
            createdDate: "2017-9-5",
            messageType: "新闻",
            comments: Math.floor(Math.random() * (100000 - 50) + 50),
            like: Math.floor(Math.random() * (5000 - 5) + 5),
            disLike: Math.floor(Math.random() * (1000 - 50) + 50),
            copyRight: "是"

        },
        {
            checked: false,
            picture: "../img/NewsPics/news.jpg",
            messageTitle: "提示2",
            star: false,
            messageContent: "当您的信息被人点赞+点踩总和大于10000以上时（赞的比例必须大于等于40%），热点按钮即被打开，该信息可能被直接推送至其他用户主页概率提高",
            createdDate: "2017-9-5",
            messageType: "新闻",
            comments: Math.floor(Math.random() * (100000 - 50) + 50),
            like: Math.floor(Math.random() * (5000 - 5) + 5),
            disLike: Math.floor(Math.random() * (1000 - 50) + 50),
            copyRight: "是"

        },
        {
            checked: true,
            picture: "../img/NewsPics/news.jpg",
            messageTitle: "提示3",
            star: false,
            messageContent: "一人对同一条信息只能点一次赞或者一次踩，多点无效。",
            createdDate: "2017-9-5",
            messageType: "新闻",
            comments: Math.floor(Math.random() * (100000 - 50) + 50),
            like: Math.floor(Math.random() * (5000 - 5) + 5),
            disLike: Math.floor(Math.random() * (1000 - 50) + 50),
            copyRight: "是"

        }

    ];


    $scope.infoStations = [];

    for (var i = 0; i < 63; i++) {

        $scope.infoStations.push({
            picture: "../img/projects/1.png",
            stationName: "医疗知识信息站" + (i + 1),
            members: Math.floor(Math.random() * (100000 - 50) + 50),
            feeOrNot: "￥50每年",
            description: "每日提供各种医务急救信息",
            samples: "多读书多看报，少打游戏多睡觉！"
        });
    }

    $scope.setStar = function (record) {
        record.star = !record.star;
        //TODO save user's cache for archive it or not
        //TODO backend send a ajax call to add or delete(logic delete) one record in user's like field
    };
    $scope.setLike = function (record) {

        if (record.likelock === undefined) {
            record.like++;
            record.likelock = "";
        }
        //TODO save user's cache for archive it or not
        //TODO backend send a ajax call to add or delete(logic delete) one record in user's like field
    };
    $scope.setDislike = function (record) {
        console.log(record.dislike);

        if (record.dislikelock === undefined) {
            record.disLike++;
            record.dislikelock = "";
        }
        //TODO save user's cache for archive it or not
        //TODO backend send a ajax call to add or delete(logic delete) one record in user's like field
    };
    $scope.setComments = function (record) {
        record.comments++;
        //TODO save user's cache for archive it or not
        //TODO backend send a ajax call to add or delete(logic delete) one record in user's like field
    };
    //$scope.changeWidgetPage = function(pageName){
    //    switch(pageName){
    //        case "infoStation":
    //            $scope.widgetPage="../sections/InfoStation.html";$scope.pageName="信息站";
    //            break;
    //        case "friends":
    //            $scope.widgetPage = "../sections/Friends.html";$scope.pageName = "朋友圈";
    //            break;
    //        default:
    //            $scope.widgetPage = "../sections/Friends.html";$scope.pageName = "朋友圈";
    //    }
    //
    //};


    $scope.ThemeChange = function (theme) {

        switch (theme) {
            case "violate":
                $rootScope.myTheme = "skin-blur-violate";
                break;
            case "lights":
                $rootScope.myTheme = "skin-blur-lights";
                break;
            case "city":
                $rootScope.myTheme = "skin-blur-city";
                break;
            case "greenish":
                $rootScope.myTheme = "skin-blur-greenish";
                break;
            case "night":
                $rootScope.myTheme = "skin-blur-night";
                break;
            case "sunny":
                $rootScope.myTheme = "skin-blur-sunny";
                break;
            case "blue":
                $rootScope.myTheme = "skin-blur-blue";
                break;
            case "chrome":
                $rootScope.myTheme = "skin-blur-chrome";
                break;
            case "ocean":
                $rootScope.myTheme = "skin-blur-ocean";
                break;
            case "sunset":
                $rootScope.myTheme = "skin-blur-sunset";
                break;
            case "yellow":
                $rootScope.myTheme = "skin-blur-yellow";
                break;
            case "kiwi":
                $rootScope.myTheme = "skin-blur-kiwi";
                break;
            case "nexus":
                $rootScope.myTheme = "skin-blur-nexus";
                break;
            default:
                $rootScope.myTheme = "skin-blur-city";
        }

    };

    $scope.logout = function () {
        $rootScope.authenticated = false;
        //do an ajax call to backend
    };
    $scope.signup = function () {

        UserAction.signup();
    }


});
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};