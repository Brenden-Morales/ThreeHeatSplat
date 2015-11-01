/**
 * Created by brenden on 10/31/2015.
 */
var GaussianSplat = function(options) {
    var self = this instanceof GaussianSplat ? this : Object.create(GaussianSplat.prototype);
    TextureRenderer.call(self,options);

    self.maxTime = 2500;
    self.intensity = Math.random() * self.maxTime;
    self.direction = Math.random() > .5? 1 : -1;

    //our fancy material
    self.shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            intensity : {type : "f", value : 0},
            size: { type: "v2", value: new THREE.Vector2(self.cameraWidth,self.cameraHeight) },
        },
        vertexShader: document.getElementById("passThroughVertex").textContent,
        fragmentShader: document.getElementById("gaussianFragment").textContent,
        blending: "AdditiveBlending"
    });

    //the plane that we will render the spat on
    //TODO set the material to a custom shader gaussian creator thing
    self.plane = new THREE.Mesh(new THREE.PlaneGeometry(self.cameraWidth,self.cameraHeight,1,1),self.shaderMaterial);

    //add the plane to the scene
    self.scene.add(self.plane);

    /**
     * THREE.AlphaFormat
     * Each element is a single alpha component.
     * The system converts it to floating point, clamped to the range [0, 1],
     * and assembles it into an RGBA element by placing attaching 0.0 to the red, green and blue channels.
     */

    self.getTexture = function(delta){
        if(delta !== undefined){
            self.intensity += delta * self.direction;
            if(self.intensity < 0){
                self.intensity = 0;
                self.direction = 1;
            }
            if(self.intensity > self.maxTime){
                self.intensity = self.maxTime;
                self.direction = -1;
            }
            self.plane.material.uniforms.intensity.value = self.intensity / self.maxTime;
        }
        renderer.render(self.scene,self.camera,self.renderTexture,true);
        return self.renderTexture;
    };


    return self;
};

GaussianSplat.prototype = Object.create(TextureRenderer.prototype);