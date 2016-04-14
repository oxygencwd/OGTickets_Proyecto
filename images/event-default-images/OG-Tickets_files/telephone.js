angular.module('OGTicketsApp.filters')
.filter('tel', function () {
    return function (tel) {

        var value = tel.toString();

        value = value.slice(0, 4) + '-' + value.slice(4);
    };
});