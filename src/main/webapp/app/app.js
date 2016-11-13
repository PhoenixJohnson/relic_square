// declare top-level module which depends on filters,and services
//angular.element(document).ready(function () {
//
//    $(window).off('hashchange');
//    $(document).off('click', '#fullPage-nav a');
//    $('.section').off('click', '.toSlide');
//    $(document).off('click', '.fullPage-slidesNav a');
//    $('#fullpage').fullpage({
//        anchors: ['cyclePage'],
//        autoScrolling: false,
//        fitToSection: false,
//        css3: true,
//        //Navigation
////                menu: false,
////                anchors:['firstPage', 'secondPage'],
////                navigation: false,
////                navigationPosition: 'right',
////                navigationTooltips: ['firstSlide', 'secondSlide'],
////                showActiveTooltips: false,
////                slidesNavigation: true,
////                slidesNavPosition: 'bottom',
////                //Accessibility
////                keyboardScrolling: true,
////                animateAnchor: true,
////                recordHistory: true,
////
////                //Design
//                controlArrows: false
////                verticalCentered: true,
////                resize : false,
////                sectionsColor : ['#ccc', '#fff'],
////                paddingTop: '3em',
////                paddingBottom: '10px',
////                fixedElements: '#header, .footer',
////                responsive: 0
//
//        //Custom selectors
////                sectionSelector: '.section',
////                slideSelector: '.slide',
////
////                //events
////                onLeave: function(index, nextIndex, direction){},
////                afterLoad: function(anchorLink, index){},
////                afterRender: function(){},
////                afterResize: function(){},
////                afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
////                onSlideLeave: function(anchorLink, index, slideIndex, direction){}
//    });
//
//});
var Cycle = angular.module('Cycle',
    [
        'ngRoute',
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ui.bootstrap',
        'bootstrapLightbox'

    ]);

// bootstrap angular
Cycle.config(['$routeProvider', '$locationProvider', '$httpProvider', 'LightboxProvider', function ($routeProvider, $locationProvider, $httpProvider, LightboxProvider) {

    //$httpProvider.responseInterceptors.push('AuthInterceptor');
    $locationProvider.html5Mode(true);
//	$locationProvider.html5Mode(true).hashPrefix('!');
    // set a custom template
    LightboxProvider.templateUrl = '../sections/modals/NewsModal.html';

    //LightboxProvider.calculateImageDimensionLimits
    //LightboxProvider.calculateModalDimensions


    $routeProvider.when('/', {
        templateUrl: '../sections/QuickBoard.html'
    });
    $routeProvider.when('/qb', {
        templateUrl: '../sections/QuickBoard.html'
    });
    $routeProvider.when('/infoStation', {
        templateUrl: '../sections/InfoStation.html'
    });
    $routeProvider.when('/weiNews', {
        templateUrl: '../sections/News.html'
    });
    $routeProvider.when('/belongs', {
        templateUrl: '../sections/Belongs.html'
    });
    $routeProvider.when('/login', {
        templateUrl: '../pages/login.html',
        controller: 'AuthCtrl'

    });

    //$routeProvider.when('/login', {
    //    templateUrl: '../pages/login.html',
    //    scope:"root"
    //});
    //$routeProvider.when('/404', {
    //    templateUrl: '../pages/404.html',
    //    scope:"root"
    //});
    $routeProvider.otherwise({
        redirectTo: '/'
    });

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

}]);

// this is run after angular is instantiated and bootstrapped
Cycle.run(function ($rootScope, $location, $http, $timeout, AuthService, conf) {

    //$rootScope.myTheme="";
    // *****
    // Initialize authentication
    // *****
    $rootScope.authenticated = false;
    $rootScope.ProjectName = "未确定";
    $rootScope.myTheme = "skin-blur-lights";
    $rootScope.myAnimate = "animated fadeInDown";
    $rootScope.subAnimate = "animated rotateInUpRight";
    $rootScope.authService = AuthService;
    $rootScope.postBoardNotifier = new NotificationManager($rootScope);
    $rootScope.ProjcetName = conf.PROJECT_NAME;


    // text input for login/password (only)
    $rootScope.loginInput = 'yunjiang@relic.com';
    $rootScope.passwordInput = 'complexpassword';

    $rootScope.$watch('authService.authorized()', function () {

        // if never logged in, do nothing (otherwise bookmarks fail)
        if ($rootScope.authService.initialState()) {
            // we are public browsing
            return;
        }

        // instantiate and initialize an auth notification manager
        $rootScope.authNotifier = new NotificationManager($rootScope);

        // when user logs in, redirect to home
        if ($rootScope.authService.authorized()) {
            //$location.path("/");
            $rootScope.authNotifier.notify('information', 'Welcome ' + $rootScope.authService.currentUser() + "!");
        }

        // when user logs out, redirect to home
        if (!$rootScope.authService.authorized()) {
            $location.path("/");
            $rootScope.authNotifier.notify('information', 'Thanks for visiting.  You have been signed out.');
        }

    }, true);


});