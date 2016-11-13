Cycle.controller('NewsController', function ($scope, Lightbox) {


    $scope.NewsList = [];
    $scope.news = [];
    $scope.NewsList.push({
        newsId: "001",
        publishTime: "2015/5/25 22:58",
        //main pic
        url:[],
        orgPics:[],
        thumbPic: [
            {
                url: "../img/photo-gallery/superbox-thumb-" + 1 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 2 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 3 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 4 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 5 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 6 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 7 + ".jpg"
            },
            {
                url: "../img/photo-gallery/superbox-thumb-" + 8 + ".jpg"
            }
        ],
        title: "一点点描述信息 NO.",
        shortDescription: "新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内" +
        "新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容新闻简要内容"
    });

    for (var i = 1; i <= 24; i++) {
        $scope.NewsList.push({
            newsId: "001" + i,
            publishTime: "2015/5/25 22:58",
            //main pic
            url: "../img/photo-gallery/superbox-full-" + 2 + ".jpg",
            orgPics: [
                {
                    url: "../img/photo-gallery/superbox-full-" + 3 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 4 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 5 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 6 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 7 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 8 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 9 + ".jpg",
                    title:"该图片的描述"
                },
                {
                    url: "../img/photo-gallery/superbox-full-" + 10 + ".jpg",
                    title:"该图片的描述"
                }
            ],
            thumbPic: [
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                },
                {
                    url: "../img/photo-gallery/superbox-thumb-" + i + ".jpg"
                }
                ],
            title: "一点点描述信息 NO." + i,
            shortDescription: "新闻简要内容"
        });

    }

    $scope.openLightboxModal = function (news, index) {
        Lightbox.openModal(news.orgPics, index);
    };
});
