angular.module('loading', [])
.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,      
        template: '<div class="agsLoading" align="center" style="z-index:9999;" ng-show="loading"><div class="agsLoading ion-loading-c"></div><br>Loading...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (scope.showingLoadingScreen) {
                    scope.showingLoadingScreen(val);
                }
            });
        }
    }

});