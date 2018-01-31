var app = angular.module('app', ['ui.router', 'chart.js']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

        .state('home', {
            url: '/home',
            templateUrl: 'templates/partial-home.html',
            controller: 'homeController'
        })
        
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'templates/partial-home-list.html',
            controller: function($scope, $window) {
                $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                $scope.width = $window.innerWidth;
                $scope.loaded = function(){
                    console.log("hey bitches");
                };
                angular.element($window).on('resize', function () {
                    console.log($window.innerWidth);
                });
            }
        })
        
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        .state('detail', {
            url: '/detail/:county/:contaminant', 
            templateUrl: 'templates/detail.html', 
            controller: 'detailController', 
            resolve: {
                GilaData: function($http, $stateParams){
                    var path = "assets/data/Gila/Gila" + $stateParams.contaminant + ".json";

                    return $http.get(path).then(function onSuccess(response){
                        return response.data;
                    })
                    .catch(function onError(response){
                        return 0;
                    });
                },
                YavapaiData: function($http, $stateParams){
                    var path = "assets/data/Yavapai/Yavapai" + $stateParams.contaminant + ".json";

                    return $http.get(path).then(function onSuccess(response){
                        return response.data;
                    })
                    .catch(function onError(response){
                        return 0;
                    });
                },
                PimaData: function($http, $stateParams){
                    var path = "assets/data/Pima/Pima" + $stateParams.contaminant + ".json";

                    return $http.get(path).then(function onSuccess(response){
                        return response.data;
                    })
                    .catch(function onError(response){
                        return 0;
                    });
                },
            }
        })


        .state('about', {
            url: '/about',
            templateUrl: 'templates/partial-about.html', 
            controller: function($scope, $window, $document) {
                $scope.showIntro = true;
                $scope.showHistory = false;
                $scope.showWater = false;
                $scope.showRipple = false;
            }          
        })

        .state('human-effect', {
            url: '/human-effect',
            templateUrl: 'templates/partial-human-effect.html',        
        });
        
});



