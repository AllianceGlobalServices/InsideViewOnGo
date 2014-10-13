angular.module('emailConfig', [])
.controller('EmailController', function($scope) {
    $scope.sendFeedback= function() {
        
     if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "Engineering Metrics Chart" , // Subject
            "Review chart",  // Body
            null,    // To
            null,                    // CC
            null,                    // BCC
            true,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }


    }
});
