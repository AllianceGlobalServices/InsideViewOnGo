angular.module('signinService', [])
.factory('SIGNIN', function($q, $http) {
    var signin = this;    
 
    signin.init = function(username, alfTicket) {
         var deferred = $q.defer();
        var urlUserInfo =  encodeURI('https://insideview.allianceglobalservices.com/alfresco/service/api/people/'+username+'?alf_ticket=' + alfTicket); //+ '&callback=JSON_CALLBACK');
        $http({
          method: 'GET',
          url: urlUserInfo
        }).success(function(data, status, headers, config) {
           deferred.resolve(data);
        }).error(function(data, status, headers, config) {
            deferred.reject(data);
        });
      return deferred.promise;  
    }
    
    return signin;
});

    