angular.module('dbcontroller', ['dbService'])
.controller('SettingsCtrl', function($scope, USER_PREF, $rootScope, $http) {
    $scope.prefRecords = [];
    $scope.prefRecord = null;
    
 $scope.projList = [
    { text: "Nalco", checked: true },
    { text: "IDEXX", checked: false },
    { text: "HBG", checked: false },
     { text: "Radian", checked: false },
    { text: "Mecksson", checked: false },
    { text: "DnB SLRM", checked: false },
     { text: "DnB eCommerce", checked: false },
    { text: "Doc Builder", checked: false },
    { text: "AGS Neat", checked: false },
     { text: "ASTM PTP", checked: false },
    { text: "ERT Devlopment", checked: false },
    { text: "Global Foundries", checked: false }
     
  ];
    
  $scope.getSites = function () {
        $scope.loading = true;
        $scope.prefRecords = [];
        $scope.prefRecord = null;
      //http://localhost:8080
         var urlSites =  encodeURI('https://insideview.allianceglobalservices.com/MobileApp/sites?ticket=' + $rootScope.alfTicket);
        $http({method: 'GET', url: urlSites}).
      success(function(data, status, headers, config) {       
        $scope.sitesList = data;
        $scope.loading = false;
        $scope.getProjectSelected();
        
      }).
      error(function(data, status, headers, config) {
        $rootScope.goBackToState = 'app.settings'; 
        $scope.loading = false;
       $rootScope.$broadcast('event:auth-loginRequired', 'app.settings');      
      }); 
      
     }    

 $scope.getProjectSelected = function() {
    USER_PREF.getById(1).then(function(prefRecord) {
         console.log('after inserted/updated: ' + prefRecord);
         console.log('after inserted/updated: ' + prefRecord.pref_value);
         $scope.prefRecord = prefRecord;
         $scope.project = prefRecord.pref_value;
     });

};
    
 $scope.projectChanged = function(projectSelected){
     $scope.updateProjectInDB(1, 'Project', projectSelected);
 };
   
 $scope.getProjectList = function() {    
    USER_PREF.all().then(function(prefRecords){
        console.log('after inserted/updated: ' + prefRecords);
        $scope.prefRecords = prefRecords;
    });
 };

 $scope.updateProjectInDB = function(id, prefName, prefValue){
    USER_PREF.getById(id).then(function(prefRecord) {
        if(prefRecord === undefined){
            console.log("Inserting pref Record: " + id + " prefValue: " +prefValue + " prefName: " + prefName);
            //insert record with pref name and value
            USER_PREF.putData(id, prefName, prefValue);
        } else {
            console.log("Updating pref Record: " + id + " prefValue: " +prefValue + " prefName: " + prefName);
            //update record
            USER_PREF.updateByPrefId(id, prefValue).then(function(prefRecord){
                //$scope.prefRecord = prefRecord;
            });
        }
        ///$scope.prefRecord = prefRecord;
        
    });
 };
});
