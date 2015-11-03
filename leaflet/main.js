/**
 * Created by brenden on 11/1/2015.
 */
//globals we'll be using often and stuff
var heatmap;

var totalTime = 0;
var startTime = Date.now();

//initialize function called from body onload()
var initialize = function(){

    var map = L.map('map').setView([51.505, -0.09], 13);
    var canvasImageLayer = L.TileLayer.canvasImageLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'brendenmorales.o25eegf6',
        accessToken: 'pk.eyJ1IjoiYnJlbmRlbm1vcmFsZXMiLCJhIjoiY2lnZ3l4YzR1ODQ1eXZvbHVzNWV3MnNzaiJ9.5PTcNsA-WpPRADoUurkZTA'
    }).addTo(map);

    heatmap = new Heatmap({canvas : document.getElementById("mainCanvas")});
    heatmap.render();

    canvasImageLayer.on("tileload",function(event){
        var context = event.tile.tile.getContext("2d");
        context.beginPath();
        context.drawImage(event.tile,0,0);
    });

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
