/**
 * Created by brenden on 10/31/2015.
 */
var GaussianSplat = function(options) {
    var self = this instanceof GaussianSplat ? this : Object.create(GaussianSplat.prototype);
    TextureRenderer.call(self,options);

    self.maxTime = 24000;
    self.currentTime = 0;

    var readings = (function(){
        var ret = [];
        for(var i = 0; i < 24; i ++){
            ret.push(Math.random());
        }
        return ret;
    })();

    //our fancy material
    self.shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time : {type : "f", value : 0},
            readCount : {type : "uInt", value : 24},
            readings : {type : "fv1", value : readings},
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

    self.getTexture = function(renderer,delta){
        if(delta !== undefined){
            if((self.currentTime + delta) > self.maxTime){
                self.currentTime = 0;
            }
            else
                self.currentTime += delta;
            self.plane.material.uniforms.time.value = self.currentTime / self.maxTime;
        }
        self.render(renderer);
        return self.renderTexture;
    };


    return self;
};

GaussianSplat.prototype = Object.create(TextureRenderer.prototype);