angular.module('loading', [])
.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading" ng-show="loading"><div class="loading-content-outer"><div class="loading-content"><div class="agsLoading ion-loading-c"></div><span class="loading-text">Loading...</span></div></div></div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (scope.showingLoadingScreen) {
                    scope.showingLoadingScreen(val);
                }
            });
        }
    }

});