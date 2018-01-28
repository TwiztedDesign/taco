window.onload = function(){


    var dragArea = taco.observable(document.getElementById("drag-area"));

    taco.observe(function(){
        document.getElementById("coordinates").innerHTML = dragArea.result.x + ' ' + dragArea.result.y;
    });

};
