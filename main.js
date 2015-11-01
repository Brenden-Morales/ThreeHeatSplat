/**
 * Created by brenden on 10/30/2015.
 */

//globals we'll be using often and stuff
var renderer, camera, scene, controls, stats;
var startTime = Date.now();
var totalTime = 0;

var splats = [];

//initialize function called from body onload()
var initialize = function(){
    //setup renderer
    renderer = new THREE.WebGLRenderer( { antialias: false, canvas : document.getElementById("mainCanvas")} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    //setup camera
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 20);
    camera.position.z = 10;

    //setup scene
    scene = new THREE.Scene();

    //setup controls
    controls = new THREE.OrbitControls( camera );
    controls.damping = 0.2;
    controls.staticMoving = false;

    //setup stats
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

    //TODO hook this method up for orthographic cameras
    //window.addEventListener( 'resize', onWindowResize, false );
    for(var i = 0; i < 500; i ++){
        var splat = new GaussianSplat({size:100});
        splats.push(splat);
        var tex = splat.getTexture();
        var mat = new THREE.MeshBasicMaterial({map:tex,transparent:true,blending:THREE.AdditiveBlending});
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(100,100,1,1),mat);
        scene.add(plane);

        plane.position.x = Math.random() * window.innerWidth - window.innerWidth / 2;
        plane.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;

    }

    //start up the main animation loop
    requestAnimationFrame(animate);

};

//TODO hook this method up for orthographic cameras
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//we just keep looping through this function forever
function animate(){
    requestAnimationFrame(animate);
    render();
    stats.update();
}

//the actual render function
function render(){
    totalTime += Date.now() - startTime;
    startTime = Date.now();

    for(var i = 0; i < splats.length; i++){
        splats[i].getTexture(((totalTime / 1000) % 5) / 5);
    }

    renderer.render(scene,camera);
    //splat.renderer.render(splat.scene,splat.camera);
}
