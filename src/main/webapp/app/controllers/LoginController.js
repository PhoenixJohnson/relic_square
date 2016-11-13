Cycle.controller('AuthCtrl', function ($rootScope, $scope, $http, $location, $cookieStore, $csrf) {


    $scope.init = function () {
        $http.get('users/current')
            .success(function (user) {
                console.log(user);
                if (user.name !== 'anonymousUser') {
                    $rootScope.authenticated = true;
                    $scope.username = user.username;
                }
                $scope.xsrf = $csrf;
                //$scope.xsrf = $cookieStore.get('XSRF-TOKEN');
                console.log($scope.xsrf);
            });
    };

    $scope.login = function () {
        var req = {
            url: 'login',
            method: 'POST',
            header: {
                "X-XSRF-TOKEN": $scope.xsrf
            },
            data: {username: $scope.username, password: $scope.password}
        };

        $http(req)
            .success(function (result, status, headers) {
                if (status === 200) {
                    $rootScope.authenticated = true;
                }
                console.log(result);
                console.log(status);
                $rootScope.XAuthToken = headers()['x-auth-token'];
                $location.path('#/');
                $scope.xsrf = $csrf;
                console.log($scope.xsrf);
            });
    };

    $scope.logout = function () {
        $rootScope.authenticated = false;
    };
});