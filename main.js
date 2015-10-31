/**
 * Created by brenden on 10/30/2015.
 */

//globals we'll be using often and stuff
var renderer, camera, scene, controls, stats, plane, splat;

var startTime = Date.now();
var totalTime = 0;

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

    splat = new GaussianSplat({size:100});
    var tex1 = splat.getTexture();

    plane = new THREE.Mesh(new THREE.PlaneGeometry(100,100,1,1),new THREE.MeshBasicMaterial({map:tex1}));
    scene.add(plane);

    splat = new GaussianSplat({size:100});
    var tex2 = splat.getTexture();

    var plane2 = new THREE.Mesh(new THREE.PlaneGeometry(100,100,1,1),new THREE.MeshBasicMaterial( {map: tex2 }));
    plane2.position.z = 1;
    plane2.position.y = 50;
    plane2.position.x = 50;
    scene.add(plane2);

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

    renderer.render(scene,camera);
    //splat.renderer.render(splat.scene,splat.camera);
}
