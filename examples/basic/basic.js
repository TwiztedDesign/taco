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

    taco.onUpdate(function(){
        try{
            $scope.$apply();
        } catch(e){}
    });

    window.onload = function(){

        var dragArea = taco('.drag-area');

        dragArea.onChange('dragging', function(val){
            console.log('Dragging: ', val);
        });
        dragArea.onChange('result.x', function(val){
            $scope.drag.x = val;
            $scope.$apply();
        });
        dragArea.onChange('result.y', function(val){
            $scope.drag.y = val;
            $scope.$apply();
        });

        dragArea.onChange('result', function(val){
            console.log(val); //TODO
        });

        dragArea.onChange(function(prop, val, path){
            // console.log("some value changed: ", prop, val, path);
        });

    };

}]);


