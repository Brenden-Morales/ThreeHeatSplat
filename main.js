/**
 * Created by brenden on 10/30/2015.
 */

//globals we'll be using often and stuff
var heatmap;

var totalTime = 0;
var startTime = Date.now();

//initialize function called from body onload()
var initialize = function(){

    heatmap = new Heatmap({canvas : document.getElementById("mainCanvas")});
    heatmap.render();

    //start up the main animation loop
    requestAnimationFrame(animate);

};

//we just keep looping through this function forever
function animate(){
    requestAnimationFrame(animate);
    render();
}

//the actual render function
function render(){
    var delta = Date.now() - startTime;
    totalTime += delta;
    startTime = Date.now();
    heatmap.render(delta);
}
