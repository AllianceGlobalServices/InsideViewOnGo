angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
    

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    //console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('themeCtrl', function($scope, $rootScope, $ionicSideMenuDelegate) {

    
$scope.defaultTheme = false;
$scope.themeInit = function() {
    $scope.selectedRed = false;
    $scope.selectedGreen = false;
    $scope.selectedOrange = false;
    $scope.selectedPurple = false;
    $scope.selectedBlue = false;
}

$scope.cancelChange = function(){
    $ionicSideMenuDelegate.toggleLeft();
    $scope.defaultColor = "button-stable";
     $scope.themeInit();
    $rootScope.$emit("themeChange", $scope.oldTheme);
}
$scope.saveChange = function(){
    $ionicSideMenuDelegate.toggleLeft();
    $rootScope.$emit("themeChange", $scope.choice);
}
    
 $scope.themeChanger = function (themeName) {
     $scope.themeInit();
     if(themeName == 'red') {
         $scope.selectedRed = true;
         $scope.defaultColor = "button-assertive";
     }
     if(themeName == 'green') {
         $scope.selectedGreen = true;
         $scope.defaultColor = "button-balanced";
     }
     if(themeName == 'orange') {
         $scope.selectedOrange = true;
         $scope.defaultColor = "button-energized";
     }
     if(themeName == 'purple') {
         $scope.selectedPurple = true;
         $scope.defaultColor = "button-royal";
     }
     if(themeName == 'blue') {
         $scope.selectedBlue = true;
         $scope.defaultColor = "button-positive";
     }
     $scope.choice = themeName;
     $rootScope.$emit("themeChange", $scope.choice);
 };    
    
})

.controller('LoginCtrl' , function($scope, $http, $rootScope, $state) {    
   $scope.$on('event:auth-loginRequired', function(e) {
       $state.go('signin');       
  });
    $scope.loginData = {};
   $scope.Login = function() { 
        $scope.loading = true;
        var username = $scope.loginData.username;
        var pwd = $scope.loginData.password;
        var urlLogin =  encodeURI('https://insideview.allianceglobalservices.com/MobileApp/loginPage?userName='+username + '&password='+ pwd);
        $http({method: 'GET', url: urlLogin}).
      success(function(data, status, headers, config) {       
        if(data !='Failed'){
            $rootScope.alfTicket = data;
            $rootScope.userName = username;
            $scope.loading = false;
            if($rootScope.goBackToState === undefined) {
                $rootScope.goBackToState = 'app.dashboard';
            }
            $state.go($rootScope.goBackToState);
        } else
        {      
            $scope.message = "Invalid username or password";
            $scope.loading = false;
        }
       
      }).
      error(function(data, status, headers, config) {
       $scope.modal.show();
       $scope.loginPass = true;
      });    
  };
})

.controller('AppSettingsCtrl', function($scope,$ionicModal, $rootScope, $http) {
    $rootScope.$on('themeChange', function(event , themeName){
        $scope.choice = themeName;
    });

$scope.appSettings = function(data){    
	$scope.openModal();
  };
  
$ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  
})

.controller('EnggCtrl', function($scope, $stateParams) {
   var data = [
      { name: "first", data: [10] },
      { name: "second", data: [3] },
      { name: "third", data: [13] }
    ];
    
    $scope.chartConfig = {
    options: {
                chart: {
                     type: 'area'
                 },
                 tooltip: {
                     style: {
                         padding: 10,
                         fontWeight: 'bold'
                     }
                 }
             },

             series: [{
                 data: [10, 15, 12, 8, 7]
             }],
             loading: false,            
             useHighStocks: false    
  };
    
  
})

.controller('SitesCtrl', function($scope, $rootScope, $http) {
     $scope.getSites = function () {
        $scope.prefRecords = [];
        $scope.prefRecord = null;
         var urlSites =  encodeURI('http://localhost:8080/MobileApp/sites?ticket=' + $rootScope.alfTicket);
        $http({method: 'GET', url: urlSites}).
      success(function(data, status, headers, config) {       
        $scope.sitesList = data;
      }).
      error(function(data, status, headers, config) {
       $rootScope.$broadcast('event:auth-loginRequired', status);      
      });    
     }
     
 })
.controller('UserInfoCtrl', function($scope, $rootScope, $http, SIGNIN) {
     $scope.getUserInfo = function () {
         var siginPromise = SIGNIN.init($rootScope.userName, $rootScope.alfTicket);
         siginPromise.then(function(data) {
             //alert('success: ' + data);
             $scope.displayUserName = data.firstName;
         }).error(function(data){
             $rootScope.$broadcast('event:auth-loginRequired', 'app.home'); 
         });
     }
        
         /*var urlUserInfo =  encodeURI('https://insideview.allianceglobalservices.com/alfresco/service/api/people/'+$rootScope.userName+'?ticket=' + $rootScope.alfTicket);
        $http({method: 'GET', url: urlUserInfo}).
      success(function(data, status, headers, config) {       
        $scope.displaUserName = data.lastName;
      }).
      error(function(data, status, headers, config) {
       $rootScope.$broadcast('event:auth-loginRequired', status);      
      });  */  
     
     
 })

.controller('DashboardCtrl', function($scope, $state){
    $scope.loading = true;
    $scope.gotoProjMetrics = function(){
        $state.go('app.projMetrics');
    }
    $scope.selectedProjectCard = function(name){
            var data1 = [['Firefox', 26.8], ['IE', 45.0],['Safari',  8.5],['Opera',  6.2], ['Others',   0.7]];
            var data2 = [['Chrome', 45.0], ['IE', 26.0] ,['Safari',  8.5],['Opera',  6.2], ['Others',   0.7]];
            var data3 = [['Firefox', 26.8], ['IE', 12.8], ['Safari',  6.2],['Opera',  8.5], ['Others',   0.7]];
        $scope.selected = name; 
        if(name == 'AlfrescoDev') {
             $scope.dashBoardChart.series[0].data = [];
             $scope.dashBoardChart.series[0].data = data1;
            
        }
        if(name == 'DnB SLRM') {
             $scope.dashBoardChart.series[0].data = [];
             $scope.dashBoardChart.series[0].data = data2;
            
        }
        if(name == 'GLOBALFOUNDRIES MTQA') {
             $scope.dashBoardChart.series[0].data = [];
             $scope.dashBoardChart.series[0].data = data3;
            
        }
    }
    
    $scope.data = {};
    $scope.data.columns = [{"id":"1453","name":"AlfrescoDev"},
                           {"id":"1355","name":"DnB SLRM"},
                           {"id":"0393","name":"GLOBALFOUNDRIES MTQA"},
                           {"id":"3932","name":"RMG"},                           
                           {"id":"2939","name":"HAVI Testing(ROP & EAS)"},
                           {"id":"1234","name":"DnB eCommerce"}];

      $scope.dashBoardChart = {
        size: {
           // width: '800',
            height: '250'
        },
        
        chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                 },
                  //title: 'Project Compliance',
                  plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: [
                        ['Firefox',   45.0],
                        ['IE',       26.8],
                        ['Safari',    8.5],
                        ['Opera',     6.2],
                        ['Others',   0.7]
                    ]
                }],
                loading: false,            
                useHighStocks: false
    }
    $scope.loading = false;  
})

.controller('PopoverCtrl', function($scope, $ionicPopover) {
    $scope.metricTypes = [{"id":"1453","title":"Compliance"},
                           {"id":"1355","title":"Resource Utilization"},
                           {"id":"0393","title":"Risks"},
                           {"id":"3932","title":"Issues"}];
    
  $ionicPopover.fromTemplateUrl('templates/dashboard-items.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
});