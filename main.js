/**
 * Created by brenden on 10/30/2015.
 */

//globals we'll be using often and stuff
var renderer, camera, scene, controls, stats;
var startTime = Date.now();
var totalTime = 0;
var jp;

//var splats = [];

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

    jp = new JacksonPollock({
        cameraWidth : window.innerWidth,
        cameraHeight : window.innerHeight
    });
    var texture = jp.getTexture(1);

    //fancy shader translation material
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) },
            heatMap: { type: "t", value: texture },
        },
        vertexShader: document.getElementById("passThroughVertex").textContent,
        fragmentShader: document.getElementById("heatBlendFragment").textContent
    });

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1),shaderMaterial);
    scene.add(plane);

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
    var delta = Date.now() - startTime;
    totalTime += delta;
    startTime = Date.now();
    jp.getTexture(delta);

    //for(var i = 0; i < splats.length; i++){
    //    splats[i].getTexture(delta);
    //}

    renderer.render(scene,camera);
    //splat.renderer.render(splat.scene,splat.camera);
}
