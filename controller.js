/**
 * Created by stranger on 01.09.18.
 */
var app = angular.module('weatherApp', []);
app.controller('weatherCtrl', function($scope, $http){
    var vm = $scope;
    vm.heading = "Weather App";
    vm.gender = "male";

    getWeather(21);

    vm.chooseGender = function (val) {
        vm.bestCity = '';
        if (val == "male") getWeather(21);
        else if (val == "female") getWeather(22);
    };


    function getWeather(normalTemp) {
        var normalHumidity = 50;
        var ipKey = "fb6f335ba1f18db50eed591823f74686";
        var weatherUrl = 'http://api.openweathermap.org/data/2.5/box/city?bbox=-24,-120,75,120,15&APPID=' + ipKey;

        $http.get(weatherUrl).success(function(data){
            var cityList = data.list;
            cityList.forEach(function (item) {
                item.diff = Math.sqrt((normalTemp - item.main.temp)*(normalTemp - item.main.temp) + (normalHumidity - item.main.humidity)*(normalHumidity - item.main.humidity)).toFixed(5);
            });

            cityList.sort( function( a, b ) { return a.diff - b.diff; } );

            // cityList.forEach(function (item) {
            //     console.log(item.diff);
            // });

            vm.bestCity = cityList[0];

            vm.weatherList = cityList.slice(1,6);
        });
    }

});