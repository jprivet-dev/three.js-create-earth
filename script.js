/**
 * Resources :
 * http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/
 * http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
 * http://planetpixelemporium.com/earth.html
 * https://threejs.org/examples/webgl_materials_bumpmap.html
 * http://earthobservatory.nasa.gov/blogs/elegantfigures/2011/10/06/crafting-the-blue-marble/
 * http://visibleearth.nasa.gov/view.php?id=79765
 * http://visibleearth.nasa.gov/view.php?id=57747
 * https://stemkoski.github.io/Three.js/
 */
var
  COLOR_WHITE = 0xffffff,
  COLOR_BLUE = 0x156289,
  COLOR_DARK_BLUE = 0x072534;

/**
 * Utils
 */
var Utils = {
  mousePosition: function(e) {
    return {
      x: (e.clientX - this.windowHalf.x),
      y: (e.clientY - this.windowHalf.y)
    }
  },
  mouseWheelDelta: function(e) {
    var e = window.event || e;
    return Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  },
  windowHalf: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  },
  windowRatio: function() {
    return window.innerWidth / window.innerHeight;
  }
};

/**
 * Renderer
 */
var Renderer = (function() {
  var
    RENDERER_ANTIALIAS_ON = true,
    RENDERER_VIEW_ID = 'view',
    RENDERER_CLEAR_COLOR = COLOR_WHITE;

  this.init = function() {
    // @see also THREE.CanvasRenderer()
    this.renderer = new THREE.WebGLRenderer({
      antialias: RENDERER_ANTIALIAS_ON
    });

    this.renderer.setClearColor(RENDERER_CLEAR_COLOR);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderView();
  };

  this.renderView = function() {
    this.view = document.getElementById(RENDERER_VIEW_ID);
    this.view.appendChild(this.renderer.domElement);
    this.updateSize();
  };

  this.updateSize = function() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  this.init();

  return this;
})();

/**
 * Camera
 */
var Camera = (function() {
  var
    CAMERA_POSITION_X = 0,
    CAMERA_POSITION_Y = 0,
    CAMERA_POSITION_Z = 1500,
    CAMERA_POSITION_FACTOR_X = 2,
    CAMERA_POSITION_FACTOR_Y = 0.5,
    CAMERA_POSITION_FACTOR_Z = 100,
    CAMERA_FOV = 50,
    CAMERA_NEAR = 1,
    CAMERA_FAR = 10000;

  this.init = function() {
    this.camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      Utils.windowRatio(),
      CAMERA_NEAR,
      CAMERA_FAR
    );

    this.camera.position.set(
      CAMERA_POSITION_X,
      CAMERA_POSITION_Y,
      CAMERA_POSITION_Z
    );
  };

  this.updateAspect = function() {
    this.camera.aspect = Utils.windowRatio();
    this.camera.updateProjectionMatrix();
  };

  this.updatePositionXY = function(mouse, target) {
    this.camera.position.x = mouse.x * CAMERA_POSITION_FACTOR_X;
    this.camera.position.y = -mouse.y * CAMERA_POSITION_FACTOR_Y;
    this.camera.lookAt(target);
  };

  this.updatePositionZ = function(mouseWheelDelta, target) {
    this.camera.position.z += mouseWheelDelta * CAMERA_POSITION_FACTOR_Z;
    this.camera.lookAt(target);
  };

  this.updateLookAt = function(target) {
    this.camera.lookAt(target);
  };

  this.init();

  return this;
})();

/**
 * Stars
 */
var Stars = (function() {
  var
    STARS_DIM = 2000,
    STARS_SEGMENTS = 32,
    STARS_MATERIAL_TEXTURE_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/sky_2048x1024.jpg';

  this.init = function() {
    this.material = new THREE.MeshBasicMaterial({
      map: this.getTexture(),
      side: THREE.BackSide
    });

    this.geometry = new THREE.SphereGeometry(
      STARS_DIM,
      STARS_SEGMENTS,
      STARS_SEGMENTS
    );

    this.stars = new THREE.Mesh(this.geometry, this.material);
  };

  this.getTexture = function() {
    var texture = new THREE.TextureLoader().load(STARS_MATERIAL_TEXTURE_IMAGE_URL);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return texture;
  };

  this.init();

  return this;
})();

/**
 * Cloud
 */
var Cloud = (function() {
  var
    CLOUD_DIM = 302,
    CLOUD_SEGMENTS = 64,
    CLOUD_OPACITY = 0.6,
    CLOUD_ANIMATION_ROTATION_Y = 100,
    CLOUD_MATERIAL_TEXTURE_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_clouds_2048x1024.jpg',
    CLOUD_MATERIAL_ALPHA_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_clouds_2048x1024.jpg',
    CLOUD_MATERIAL_BUMP_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_clouds_2048x1024.jpg',
    CLOUD_MATERIAL_BUMP_SCALE = 1;

  this.init = function() {
    this.material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(CLOUD_MATERIAL_TEXTURE_IMAGE_URL),
      opacity: CLOUD_OPACITY,
      transparent: true,
      alphaMap: new THREE.TextureLoader().load(CLOUD_MATERIAL_ALPHA_IMAGE_URL),
      bumpMap: new THREE.TextureLoader().load(CLOUD_MATERIAL_BUMP_IMAGE_URL),
      bumpScale: CLOUD_MATERIAL_BUMP_SCALE
    });

    this.geometry = new THREE.SphereGeometry(
      CLOUD_DIM,
      CLOUD_SEGMENTS,
      CLOUD_SEGMENTS
    );

    this.cloud = new THREE.Mesh(this.geometry, this.material);
  };

  this.animation = function() {
    //this.cloud.rotation.y += CLOUD_ANIMATION_ROTATION_Y;
  };

  this.init();

  return this;
})();

/**
 * Earth
 */
var Earth = (function() {
  var
    EARTH_DIM = 300,
    EARTH_SEGMENTS = 64,
    EARTH_MATERIAL_TEXTURE_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_map_2048x1024.jpg',
    EARTH_MATERIAL_BUMP_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_bump_2048x1024.jpg',
    EARTH_MATERIAL_BUMP_SCALE = 4,
    EARTH_MATERIAL_SPECULAR_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_specular_2048x1024.jpg',
    EARTH_MATERIAL_SPECULAR_COLOR = 0xfffdef,
    EARTH_MATERIAL_SHININESS = 3,
    EARTH_ANIMATION_ROTATION_Y = Math.PI / 1000;

  this.init = function() {
    this.material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(EARTH_MATERIAL_TEXTURE_IMAGE_URL),
      bumpMap: new THREE.TextureLoader().load(EARTH_MATERIAL_BUMP_IMAGE_URL),
      bumpScale: EARTH_MATERIAL_BUMP_SCALE,
      specularMap: new THREE.TextureLoader().load(EARTH_MATERIAL_SPECULAR_IMAGE_URL),
      specular: EARTH_MATERIAL_SPECULAR_COLOR,
      shininess: EARTH_MATERIAL_SHININESS
    });

    this.geometry = new THREE.SphereGeometry(
      EARTH_DIM,
      EARTH_SEGMENTS,
      EARTH_SEGMENTS
    );

    this.earth = new THREE.Mesh(this.geometry, this.material);
  };

  this.animation = function() {
    this.earth.rotation.y += EARTH_ANIMATION_ROTATION_Y;
  };

  this.init();

  return this;
})();

/**
 * Light
 */
var Light = (function() {
  var
    LIGHT_COLOR = COLOR_WHITE,
    LIGHT_INTENSITY = 1.2,
    LIGHT_POSITION_X = 1000,
    LIGHT_POSITION_Y = 500,
    LIGHT_POSITION_Z = 1000;

  this.init = function() {
    this.light = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY);

    this.light.position.set(
      LIGHT_POSITION_X,
      LIGHT_POSITION_Y,
      LIGHT_POSITION_Z
    );
  };

  this.init();

  return this;
})();

/**
 * Scene
 */
var Scene = (function() {
  this.init = function() {
    Earth.earth.add(Cloud.cloud);

    this.scene = new THREE.Scene();
    this.scene.add(Earth.earth);
    this.scene.add(Light.light);
    this.scene.add(Stars.stars);
  };

  this.init();

  return this;
})();

/**
 * View
 */
var View = (function() {
  var init = function() {
    updateAll();
    render();

    window.addEventListener('resize', updateAll, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousewheel', onMouseWheel, false);
  };

  var onMouseMove = function(e) {
    Camera.updatePositionXY(
      Utils.mousePosition(e),
      Earth.earth.position
    );
  };

  var onMouseWheel = function(e) {
    Camera.updatePositionZ(
      Utils.mouseWheelDelta(e),
      Earth.earth.position
    );
  };

  var updateAll = function() {
    Camera.updateAspect();
    Renderer.updateSize();
  };

  var render = function() {
    Earth.animation();
    Cloud.animation();
    Renderer.renderer.render(Scene.scene, Camera.camera);
    requestAnimationFrame(render);
  };

  init();
})();