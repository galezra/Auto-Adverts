"use strict";

function advSettingsCtrl($scope, $location, $routeParams,advDetailsService,FileUploader) {
    $scope.uploader = new FileUploader({url: 'public/templates'});
    init()

    function init() {
        advDetailsService.getSettings().then(function (value) {
            $scope.settings = value.data[0];
            $scope.numId = $scope.settings.ids.length;
            $scope.uploader.addToQueue($scope.settings.templates)
        });
    }

    $scope.update = function (settings) {
        setIds(settings);
        setTemplates(settings);
        $scope.newSettings = angular.copy(settings);
        advDetailsService.updateAdvSettings(settings).then(function () {
            $location.path("/manager")
        })

    }

    function setIds(settings) {
        settings.ids = [];

        for(var i= 0 ;i< $scope.numId;i++){
            settings.ids[i] = i + 1;
        }
    }

    function setTemplates(settings) {
        settings.templates = [];
        var template;
        for(var j= 0 ;j< $scope.uploader.queue.length;j++){
            template = $scope.uploader.queue[j].file.name;
            var n = template.indexOf('.');
            template = template.substring(0, n != -1 ? n : template.length);
            settings.templates.push(template)
        }
    }

}

angular.module('manageAdv').controller('advSettingsCtrl', ['$scope', '$location', '$routeParams','advDetailsService','FileUploader', advSettingsCtrl]);



