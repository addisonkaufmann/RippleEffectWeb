app.controller('navbarController', function($scope, $window){
    $scope.isNarrowScreen = $window.innerWidth < 992;
    console.log($window.innerWidth);
    $scope.navHeight = {'height': '100px'};
    var short = '100px';
    var tall = '170px';
    $scope.menuOpen = false;
    $scope.openMenu = function(){
        console.log("opening menu");
        $scope.menuOpen = !$scope.menuOpen;
        if ($scope.menuOpen){
            $scope.navHeight.height = tall;
        } else {
            $scope.navHeight.height = short;
        }
    };

    angular.element($window).on('resize', function () {
        if (!$scope.isNarrowScreen && $window.innerWidth < 992){
            console.log("narrow");
            $scope.isNarrowScreen = true;
            $scope.$apply();
        } else if ($scope.isNarrowScreen && $window.innerWidth >= 992) {
            $scope.isNarrowScreen = false;
            $scope.$apply();
        }
    });
});


app.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

app.controller('SalesController', ['$scope','$interval', function($scope, $interval){
    $scope.salesData=[
        {hour: 1,sales: 54},
        {hour: 2,sales: 66},
        {hour: 3,sales: 77},
        {hour: 4,sales: 70},
        {hour: 5,sales: 60},
        {hour: 6,sales: 63},
        {hour: 7,sales: 55},
        {hour: 8,sales: 47},
        {hour: 9,sales: 55},
        {hour: 10,sales: 30}
    ];

    $interval(function(){
        var hour=$scope.salesData.length+1;
        var sales= Math.round(Math.random() * 100);
        $scope.salesData.push({hour: hour, sales:sales});
    }, 1000, 10);
}]);




app.controller('detailController', function($scope, $stateParams, $state, $http, GilaData, YavapaiData, PimaData) {
    $scope.contaminant = $stateParams.contaminant;
    $scope.county = $stateParams.county;
    $scope.labels = [];
    $scope.data = [];
    $scope.data[0] = [];
    $scope.data[1] = [];
    var mcl;
    var allData = {
        "Gila": GilaData,
        "Yavapai": YavapaiData,
        "Pima": PimaData
    };
    var data = allData[$stateParams.county];
    // console.log(data);

    var allColors = {
        "Arsenic": "#5fbcbf",
        "Nitrate": "#266067", 
        "Fluoride": "#337d7b", 
        "pH": "#8bb5ad", 
        "Lead": "#8fc495"
    }
    $scope.thisColor = allColors[$scope.contaminant];
    $scope.pieColors = [$scope.thisColor, "#efefef"];

    switch($stateParams.contaminant) {
    case "Arsenic":
        mcl = 0.01;
        break;
    case "Lead":
        mcl = 0.015;
        break;
    case "Nitrate":
        mcl = 10; 
        break;
    case "Fluoride":
        mcl = 4;
        break;
    case "pH":
        mcl = 6.5;
        break;
    default:
        mcl = 0;
        break;
    }

    $scope.mcl = mcl;
    var exceed = 0;
    for (var i = 0; i < data.length; i++){
        if (data[i].Exceeds){
            exceed++;
        }
        if ( $scope.labels.indexOf(data[i].Date) == -1) {
            $scope.labels.push(data[i].Date);
            $scope.data[1].push(data[i].Value);
            $scope.data[0].push(mcl);

        }
     }
    $scope.piePercent = (exceed/data.length * 100).toFixed(1);
    $scope.pieData = [$scope.piePercent, 100 - $scope.piePercent];

     $scope.colors = ['#0b193e', $scope.thisColor, '#5a5895', '#9c7fad', '#266067', '#5fbcbf'];



    
    $scope.message = $stateParams.county + " " + $stateParams.contaminant;
    console.log($stateParams);

    // $scope.labels = ["2005", "2008", "2011", "2014"];
    $scope.series = ["Arsenic", "MCL"];
    // $scope.data = [
    //   [65, 59, 80, 81, 56, 55, 40]
    // ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    $scope.datasetOverride = [ 
        { 
            yAxisID: 'y-axis-1', 
            borderWidth: 2, 
            fill: false, 
            backgroundColor:'#0b193e'
        },
        { 
            yAxisID: 'y-axis-1', 
            borderWidth: 2, 
            fill: true, 
            backgroundColor:$scope.thisColor
        },
        { 
            yAxisID: 'y-axis-1', 
            borderWidth: 2, 
            fill: true, 
            backgroundColor:'#5a5895'
        },
        { 
            yAxisID: 'y-axis-1', 
            borderWidth: 2, 
            fill: true, 
            backgroundColor:'#9c7fad'
        },
        { 
            yAxisID: 'y-axis-1', 
            borderWidth: 2, 
            fill: true, 
            backgroundColor: '#266067'
        },
        { 
            yAxisID: 'y-axis-1', 
            borderWidth: 2, 
            fill: true, 
            backgroundColor:'#5fbcbf'
        } 
    ];

      $scope.options = {
        elements: {
            point: { radius: 0 }
        },
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      };

      $scope.pieOptions = {
            tooltips : {
                enabled: false
            }
      };


    
});

app.controller('homeController', ['$scope', '$window', '$sce', '$state', '$stateParams', function($scope, $window, $sce, $state, $stateParams){


    $scope.counties = ['Pima', 'Gila', 'Yavapai'];
    $scope.contaminants = ['Arsenic', 'Lead', 'Nitrate', 'Fluoride', 'pH'];


    $scope.playVideo = function(row, col){
        // var vidid = "video" + row + col;
        // var elem = document.getElementById(vidid);
        // elem.play();
    };

    $scope.pauseVideo = function(row, col){
        // var vidid = "video" +row +col;
        // var elem = document.getElementById(vidid);
        // elem.pause();
    };


    $scope.goDetail = function(row, col){
        var county = $scope.counties[col];
        var con = $scope.contaminants[row];
        if (!$scope.isNarrowScreen){
            county = $scope.counties[row];
            con = $scope.contaminants[col];
        }
        // console.log("going to detail page for " + county + " " + con);

        $state.go('detail', {county: county, contaminant: con});
    };

}]);


