var app = angular.module("myApp", []);


app.controller("Ctrl", ['$scope',function($scope){


    $scope.drag = {
        visibility  : true,
        x           : 0,
        y           : 0
    };


    var results = {
        "title text" : "Title",
        "title color" : "red",
        "drag-area xValue" : 0,
        "drag-area yValue" : 0
    };

    $scope.drag = taco.addTemplate('drag', $scope.drag);

    taco.onUpdate(function(){
        try{
            $scope.$apply();
        } catch(e){}
    });

    window.onload = function(){

        $scope.dragArea = document.getElementById("drag-area");
        //
        // $scope.$watch(function(){
        //     return $scope.dragArea.result.x;
        // }, function(val){
        //     $scope.drag.x = val;
        // }, true);
        //




        document.getElementById("drag-area").onChange('x', function(val){
            $scope.drag.x = val;
        });

        document.getElementById("drag-area").onChange(function(prop, val){
            $scope.drag[prop] = val;
        });

        var dragAreaObserve = taco.observable(document.getElementById("drag-area"));


        taco.observe('drag.x', function(){
            $scope.drag.x = dragAreaObserve.result.x;
            $scope.drag.y = dragAreaObserve.result.y;
            $scope.$apply();
            // document.getElementById("coordinates").innerHTML = $scope.dragAreaObserve.result.x + ' ' + $scope.dragAreaObserve.result.y;
        });

        var counter = 0;
        taco.observe(function(){
            $scope.drag.y;
            counter++;
            // $scope.$apply();
            // document.getElementById("coordinates").innerHTML = $scope.dragAreaObserve.result.x + ' ' + $scope.dragAreaObserve.result.y;
        });

    };

}]);


