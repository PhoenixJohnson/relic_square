/**
 * Created by phoenix on 14/11/7.
 */
var hostName = window.location.host;
var port = window.location.port;
console.log("hostname:" + hostName + "    portnumber   " + port);
Cycle.constant('conf',
    {

        RESTAPIBASEURL: 'http://' + hostName + '/rest/',
        BRANDSHIT_PAGE_SIZE: 10,
        PROJECT_NAME: "Relic",
        CUSTOMIZEFIELD:'CustomizeField'

    }
);

Cycle.factory('$csrf', function () {

    var name = "XSRF-TOKEN" + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "none";


});
