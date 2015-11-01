/**
 * Created by brenden on 10/31/2015.
 */
var TextureRenderer = function(options) {
    var self = this instanceof TextureRenderer ? this : Object.create(TextureRenderer.prototype);

    self.cameraWidth = options.cameraWidth;
    self.cameraHeight = options.cameraHeight;

    //the camera that we will this texture with
    self.camera = new THREE.OrthographicCamera(self.cameraWidth / -2, self.cameraWidth / 2, self.cameraHeight / 2,self.cameraHeight / -2, 1, 10);
    self.camera.position.z = 2;

    //the scene that will hold all the objects
    self.scene = new THREE.Scene();

    //the texture that we'll be rendering the scene to
    self.renderTexture = new THREE.WebGLRenderTarget(self.cameraWidth, self.cameraHeight,{ minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat});


    return self;
};
