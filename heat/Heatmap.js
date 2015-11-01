/**
 * Created by brenden on 11/1/2015.
 */
var Heatmap = function(options) {
    var self = this instanceof Heatmap ? this : Object.create(Heatmap.prototype);

    if(options.canvas === undefined || typeof options.canvas !== "object"){
        throw "Invalid canvas";
    }

    //setup renderer
    var renderer = new THREE.WebGLRenderer( {
        antialias: false,
        alpha : true,
        canvas : options.canvas} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0xffffff,0);
    renderer.setSize( window.innerWidth, window.innerHeight );

    //setup camera
    var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 20);
    camera.position.z = 10;

    //setup scene
    var scene = new THREE.Scene();

    //setup stats
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );

    var jp = new JacksonPollock({
        cameraWidth : window.innerWidth,
        cameraHeight : window.innerHeight,
        renderer : renderer
    });
    var texture = jp.getTexture(renderer,1);

    //fancy shader translation material
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) },
            heatMap: { type: "t", value: texture },
        },
        vertexShader: document.getElementById("passThroughVertex").textContent,
        fragmentShader: document.getElementById("heatBlendFragment").textContent,
        transparent : true
    });

    var plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1),shaderMaterial);
    scene.add(plane);

    self.render = function(delta){
        stats.update();
        jp.getTexture(renderer,delta);
        renderer.render(scene,camera);
    };

    return self;
};
