Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
Cycle.controller('brandReportCtrl', ['$scope', '$timeout', '$filter', 'ngTableParams', 'JDData', 'PRMconf','$interval', function ($scope, $timeout, $filter, ngTableParams, JDData, config, $interval) {

    /*
     Values
     */

    $scope.data = [];
    $scope.checked = false;

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'pie'
            },
            plotOptions: {
                pie: {
                    shadow: true,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    }
                },
                showInLegend: true
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [
            {
                name: 'HitRate',
                data: [],
                size: '100%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: 'black'
                },
                point: {
                    events: {
                        click: function (event) {
                            //console.log(this.x);
                            $("#brandsDetailsTrigger").click();
                        }

                    }
                }
            }
        ],
        title: {
            text: 'Ebay - JD Brands Hit Rate Chart'
        },
        credits: {
            enabled: true
        },
        loading: false

    };

    $scope.filter_dict = {
        collectionType: "brands_hit_audit",
        fileName: "",
        itemId: "",
        ebayBrandName: "",
        jdBrandId: "",
        hitOrNot: "",
        jdBrandName: "",
        hitType: "",
        genDate: -1,
        currentPageNumber: 1,
        pageSize: 10
    };
    $scope.totalRows = 0;
    $scope.columns = [
        //{title: 'Date', field: 'Date', visible: true, filter: {'Date': 'text'}, visibleOption: true},
        {title: 'File Name', field: 'fileName', visible: true, filter: {'fileName': 'text'}, visibleOption: true},
        {title: 'Item Id', field: 'itemId', visible: true, filter: {'itemId': 'text'}, visibleOption: true},
        {
            title: 'eBay Brand Name',
            field: 'ebayBrandName',
            visible: true,
            visibleOption: true
        },
        {
            title: 'Jd Brand Id',
            field: 'jdBrandId',
            visible: true,
            visibleOption: true
        },

        {
            title: 'Hit or Not',
            field: 'hitOrNot',
            visible: true,
            visibleOption: true
        },
        {
            title: 'jdBrandName',
            field: 'jdBrandName',
            visible: false,
            visibleOption: false
        },
        {
            title: 'Generated Date',
            field: 'genDate',
            visible: false
        },
        {
            title: 'hitType',
            field: 'hitType',
            visible: true,
            visibleOption: false
        }
    ];
    $scope.loopTrigger = true;

    /*
     Functions
     */
    $scope.genCVS = function () {
        $scope.filter_dict.currentPageNumber = -100;
        JDData.query(angular.toJson($scope.filter_dict), (function (response) {
            console.log("begin to export...");
            var responseObject = angular.fromJson(response);
            var JSONData = responseObject.data;
            var ReportTitle = "BrandsHitRate";
            var ShowLabel = true;
            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            for(var index=0;index<arrData.length;index++){
                delete arrData[index].jdBrandName;
                delete arrData[index].ebayMiss;
                delete arrData[index].jdListMiss;
                delete arrData[index].totalHits;
                delete arrData[index].collectionType;
            }
            var CSV = '';
            //Set Report title in first row or line

            CSV += ReportTitle + '\r\n\n';

            //This condition will generate the Label/Header
            if (ShowLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "eBay_JD_Reports_";
            //this will remove the blank-spaces from the title and replace it with an underscore
            fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log("export successfully!");
        }));

    };

    $scope.filterTitle = function () {

        $scope.tableParams.reload();
    };
    //$scope.$watch("setDone", function () {
    //    $scope.chartConfig.series.splice(1, 1);
    //    $scope.chartConfig.series.push({data: BrandRefreshData});
    //}, true);
    $scope.refreshData = function () {
        $scope.chartConfig.series.splice(1, 1);
        $scope.chartConfig.series.push({data: BrandRefreshData});
        //$scope.tableParams.reload();
    };


    var forCall = function () {
        return {
            refreshData: function () {
                $scope.refreshData();
            },
            callz: function () {
                return JDData.query(angular.toJson($scope.filter_dict), (function (response) {

                    var responseObject = angular.fromJson(response);
                    var feeds = responseObject.data;
                    $scope.totalRows = responseObject.total;
                    //$scope.data.push.apply($scope.data, feeds);
                    //console.dir($scope.data);

                    $scope.data = response.data;

                    if (response.data.length > 0) {

                        $scope.ebayMiss = $scope.data[0].ebayMiss;
                        $scope.JDListMiss = $scope.data[0].jdListMiss;
                        $scope.TotalHits = $scope.data[0].totalHits;
                    } else {
                        $scope.ebayMiss = 0;
                        $scope.JDListMiss = 0;
                        $scope.TotalHits = 0;
                    }
                    console.log($scope.ebayMiss + "   " + $scope.JDListMiss + "   " + $scope.TotalHits );

                    var colors = Highcharts.getOptions().colors;
                    BrandRefreshData = [
                        {
                            name: 'eBay Brands Missing',
                            y: parseFloat($scope.ebayMiss),
                            color: colors[0]
                        },
                        {
                            name: 'JD Brands List Missing',
                            y: parseFloat($scope.JDListMiss),
                            color: colors[1]
                        },
                        {
                            name: 'Total Hits',
                            y: parseFloat($scope.TotalHits),
                            color: colors[2]
                        }];


                    //var staff = function () {
                    //    console.log("insde");
                    //    if (typeof(BrandRefreshData) != "undefined") {
                    //        $scope.loopTrigger = false;
                    //        $scope.refreshData();
                    //        //console.dir($scope.chartConfig);
                    //    }
                    //};
                    //$timeout(staff, 5000);
                    //$scope.setDone = new Date();
                    //$defer.resolve($scope.chartConfig.series.splice(1, 1).push({data: BrandRefreshData}));

                    //triggerRefresh();
                    //$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }));
            }
        }
    };


    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: config.BRANDSHIT_PAGE_SIZE,         // count per page
        filter: {
            File_Name: ''       // initial filter
        }

    }, {
        counts: [],
        //total: 0,
        getData: function ($defer, params) {

            var page = params.page();
            var size = config.BRANDSHIT_PAGE_SIZE;
            $scope.filter_dict.currentPageNumber = page;
            $scope.filter_dict.pageSize = size;

            forCall().callz().$promise.then(function () {

                var data = $scope.data;
                //var filteredData = $scope.filter_dict ?
                //    $filter('filter')(data, $scope.filter_dict) :
                //    data;
                //var orderedData = params.sorting() ?
                //    $filter('orderBy')(filteredData, params.orderBy()) :
                //    filteredData;
                console.log($scope.totalRows);
                params.total($scope.totalRows);
                $defer.resolve(data);
                $scope.loopTrigger = true;
            });
            //promise.$promise.then(function(){
            //
            //
            //
            //
            //});
        }
        //scope: $scope
    });


    var staff = function () {
        //console.log($scope.loopTrigger);
        if (typeof(BrandRefreshData) != "undefined"&&$scope.loopTrigger) {
            //$interval.flush(1000);
            //$interval.cancel(promiseInterval);
            $scope.loopTrigger = false;
            $scope.refreshData();

        }
    };
    var promiseInterval = $interval(staff, 2000);
    $scope.$on("$destroy", function(){
        $interval.cancel(promiseInterval);
    });

}]);
