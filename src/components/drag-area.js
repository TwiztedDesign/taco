/******
 angular.module('td.directives')

 .directive('dragArea', [
 function() {
            return {
                restrict: 'E',
                template: '<div></div>',
                replace: true,
                scope:{
                    result      :"=",
                    mode        :"=",
                    minValueX   :"=",
                    minValueY   :"=",
                    maxValueX   :"=",
                    maxValueY   :"=",
                    precision   :"="
                },
                link: function (scope,element) {
                    var isDragging=false;

                    element.mousedown(function(e){
                        isDragging = true;
                        calc(e);
                    });

                    element.bind( "touchstart", function(e){
                        isDragging = true;
                        calc(e.originalEvent.touches[0]);
                    });

                    element.mouseup(function(e){
                        isDragging = false;
                    });

                    element.bind( "touchend", function(e){
                        isDragging = false;
                    });

                    element.mousemove(function(e){
                        calc(e);
                    });

                    element.bind( "touchmove", function(e){
                        calc(e.originalEvent.touches[0]);
                    });

                    function calc(e){
                        if(isDragging) {
                            var bounds = element[0].getBoundingClientRect();
                            var x = 0;
                            var y = 0;
                            if (scope.mode === "screen") {
                                x = e.screenX;
                                y = e.screenY;
                            }
                            else if (scope.mode === "linear") {

                                x = scope.minValueX + (((e.clientX - bounds.left) / bounds.width) * (scope.maxValueX - scope.minValueX));
                                y = scope.minValueY + (((e.clientY - bounds.top) / bounds.height) * (scope.maxValueY - scope.minValueY));


                            } else {
                                x = e.clientX - bounds.left;
                                y = e.clientY - bounds.top;
                            }

                            if (scope.precision === "int") {
                                x = Math.floor(x);
                                y = Math.floor(y);
                            }

                            scope.result.x = x;
                            scope.result.y = y;


                            //console.log(x + " : " + y);
                        }
                    }
                }
            };
        }]);
 *****/