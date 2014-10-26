angular.module('emailConfig', [])
.controller('EmailController', ['$compile','$scope',  function($compile, $scope) {
    
/*    $scope.getSvg = function(){
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> \
        <title>HTML5 Logo</title> \
        <polygon fill="#E44D26" points="107.644,470.877 74.633,100.62 437.367,100.62 404.321,470.819 255.778,512"/> \
        <polygon fill="#F16529" points="256,480.523 376.03,447.246 404.27,130.894 256,130.894"/> \
        <polygon fill="#EBEBEB" points="256,268.217 195.91,268.217 191.76,221.716 256,221.716 256,176.305 255.843,176.305 142.132,176.305 143.219,188.488 154.38,313.627 256,313.627"/> \
        <polygon fill="#EBEBEB" points="256,386.153 255.801,386.206 205.227,372.55 201.994,336.333 177.419,336.333 156.409,336.333 162.771,407.634 255.791,433.457 256,433.399"/> \
        <path d="M108.382,0h23.077v22.8h21.11V0h23.078v69.044H152.57v-23.12h-21.11v23.12h-23.077V0z"/> \
        <path d="M205.994,22.896h-20.316V0h63.72v22.896h-20.325v46.148h-23.078V22.896z"/> \
        <path d="M259.511,0h24.063l14.802,24.26L313.163,0h24.072v69.044h-22.982V34.822l-15.877,24.549h-0.397l-15.888-24.549v34.222h-22.58V0z"/> \
        <path d="M348.72,0h23.084v46.222h32.453v22.822H348.72V0z"/> \
        <polygon fill="#FFFFFF" points="255.843,268.217 255.843,313.627 311.761,313.627 306.49,372.521 255.843,386.191 255.843,433.435 348.937,407.634 349.62,399.962 360.291,280.411 361.399,268.217 349.162,268.217"/> \
        <polygon fill="#FFFFFF" points="255.843,176.305 255.843,204.509 255.843,221.605 255.843,221.716 365.385,221.716 365.385,221.716 365.531,221.716 366.442,211.509 368.511,188.488 369.597,176.305"/> \
    </svg>';
    }*/
    
    
    
    $scope.sendFeedback= function() {
        /*var newDirective = angular.element('<canvas id="chartCanvas1"></canvas>');
        $compile(newDirective)($scope);
        canvg(newDirective, $scope.getSvg());
        alert(document.getElementById('chartCanvas1').toDataURL());*/
        
     if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "Engineering Metrics Chart" , // Subject
            "<html><body>Testing</body></html>",  // Body
            
            null,    // To
            null,                    // CC
            null,                    // BCC
            true,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }


    }
}]);
