/**
 * Created by brenden on 10/31/2015.
 */
var TextureRenderer = function(options) {
    var self = this instanceof TextureRenderer ? this : Object.create(TextureRenderer.prototype);

    self.cameraWidth = options.cameraWidth;
    self.cameraHeight = options.cameraHeight;

    //the camera that we will render this splat with
    self.camera = new THREE.OrthographicCamera(self.cameraWidth / -2, self.cameraWidth / 2, self.cameraHeight / 2,self.cameraHeight / -2, 1, 10);
    self.camera.position.z = 2;

    //the scene that will hold this splat
    self.scene = new THREE.Scene();


    return self;
};
