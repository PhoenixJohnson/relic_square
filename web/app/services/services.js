'use strict';
//simple stub that could use a lot of work...
Cycle.factory('RESTService',
    function ($http, $rootScope) {

        return {
            get: function (url, callback) {
                return $http({method: 'GET', url: url}).
                    success(function (data, status, headers, config) {
                        callback(data);
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
            }
        };
    }
);


//simple auth service that can use a lot of work... 
Cycle.factory('AuthService',
    function () {
        var currentUser = null;
        var authorized = false;

        // initMaybe it wasn't meant to work for mpm?ial state says we haven't logged in or out yet...
        // this tells us we are in public browsing
        var initialState = true;

        return {
            initialState: function () {
                return initialState;
            },
            login: function (name, password) {
                currentUser = name;
                authorized = true;
                //console.log("Logged in as " + name);
                initialState = false;
            },
            logout: function () {
                currentUser = null;
                authorized = false;
            },
            isLoggedIn: function () {
                return authorized;
            },
            currentUser: function () {
                return currentUser;
            },
            authorized: function () {
                return authorized;
            }
        };
    }
);

//user check
//PRM.factory('Users', [ '$resource','PRMconf', function($resource,config) {
//	return $resource(config.RESTAPIBASEURL+'user', {}, {
//		'query' : {
//			method : 'GET',
//			isArray : false,
//			cache : false
//		},
//		'update' : {}
//	});
//} ]);


Cycle.factory('UserAction', ['$http', '$rootScope', 'conf', function ($http, $rootScope, config) {
    return {
        signup: function () {

            var req = {
                url: 'signup',
                method: 'POST',
                data: {'username': 'phoenix', 'password': '121212'}
            };

            $http(req)
                .success(function (result, status, headers) {
                    if (status === 200) {
                        $rootScope.authenticated = true;
                    }
                    console.log(result);
                    console.log(status);
                    $rootScope.XAuthToken = headers()['x-auth-token'];
                    console.log($rootScope.XAuthToken);
                });

        }
    }
}]);

Cycle.factory('AuthInterceptor', ['$q', function ($q) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            // insert code to populate your request header for instance
            return config;
        },
        response: function (response) {
            if (response.status === 403 || response.status === 401) {
                // insert code to redirect to custom unauthorized page
            }
            return response || $q.when(response);
        }
    };
}]);
