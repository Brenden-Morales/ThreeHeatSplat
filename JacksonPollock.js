/**
 * Created by brenden on 11/1/2015.
 */
var JacksonPollock = function(options) {
    var self = this instanceof JacksonPollock ? this : Object.create(JacksonPollock.prototype);
    TextureRenderer.call(self,options);

    var splatSize = 100;
    var splats = [];

    for(var i = 0; i < 500; i ++){
        var splat = new GaussianSplat({cameraWidth:splatSize,cameraHeight:splatSize});
        splats.push(splat);
        var tex = splat.getTexture();
        var mat = new THREE.MeshBasicMaterial({map:tex,transparent:true,blending:THREE.AdditiveBlending});
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(splatSize,splatSize,1,1),mat);
        plane.position.x = Math.random() * window.innerWidth - window.innerWidth / 2;
        plane.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;
        self.scene.add(plane);
    }

    self.getTexture = function(delta){
        for(var i = 0; i < splats.length; i++){
            splats[i].getTexture(delta);
        }
        self.render(renderer);
        return self.renderTexture;
    };

    return self;
};

JacksonPollock.prototype = Object.create(TextureRenderer.prototype);