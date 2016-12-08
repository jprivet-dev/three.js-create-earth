/**
 * Resources Three.js :
 * http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/
 * http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
 * http://thematicmapping.org/playground/webgl/earth/
 * https://threejs.org/examples/
 * https://threejs.org/examples/#css3d_panorama
 * https://threejs.org/examples/webgl_materials_bumpmap.html
 * https://threejs.org/examples/webgl_materials_cars.html
 * https://stemkoski.github.io/Three.js/
 * https://threejs.org/examples/webgl_lensflares.html
 *
 * Specials :
 * https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
 * https://threejs.org/examples/misc_controls_orbit.html
 * http://workshop.chromeexperiments.com/examples/gui
 *
 * Resources textures :
 * http://planetpixelemporium.com/earth.html
 * http://earthobservatory.nasa.gov/blogs/elegantfigures/2011/10/06/crafting-the-blue-marble/
 * http://visibleearth.nasa.gov/view.php?id=79765
 * http://visibleearth.nasa.gov/view.php?id=57747
 */
var
  ASSETS_PATH = 'http://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/',
  COLOR_WHITE = 0xffffff;

/**
 * Utils
 */
var Utils = {
  MOUSE_WHEEL_DELTA_Y_FACTOR: 0.01,

  mousePosition: function(e) {
    return {
      x: (e.clientX - this.windowHalf.x),
      y: (e.clientY - this.windowHalf.y)
    };
  },
  mouseWheelDeltaY: function(e) {
    return e.deltaY * this.MOUSE_WHEEL_DELTA_Y_FACTOR;
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
    this.view = document.body;
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

  this.updateLookAt = function(target) {
    this.camera.lookAt(target);
  };

  this.init();

  return this;
})();

/**
 * Skymap
 */
var Skymap = (function() {
  var
    SKYMAP_TEXTURE_POSITION_TAG = '{pos}',
    SKYMAP_TEXTURE_POSITIONS = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'],
    SKYMAP_TEXTURE_PATH = ASSETS_PATH,
    SKYMAP_TEXTURE_FILENAME = 'skymap_{pos}_1024x1024.jpg';

  this.init = function() {
    this.skymapTexture = new THREE.CubeTextureLoader()
      .setPath(SKYMAP_TEXTURE_PATH)
      .load(this.getFilenames());
  };

  this.getFilenames = function() {
    var filenames = [];

    for (var i = 0; i < SKYMAP_TEXTURE_POSITIONS.length; i++) {
      filenames.push(
        this.getFilename(SKYMAP_TEXTURE_POSITIONS[i])
      );
    }

    return filenames;
  };

  this.getFilename = function(position) {
    return SKYMAP_TEXTURE_FILENAME.replace(
      SKYMAP_TEXTURE_POSITION_TAG,
      position
    );
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
    CLOUD_ANIMATE_ROTATION_Y = 100,
    CLOUD_MATERIAL_ALPHA_IMAGE_URL = ASSETS_PATH + 'earth_clouds_2048x1024.jpg',
    CLOUD_MATERIAL_BUMP_IMAGE_URL = ASSETS_PATH + 'earth_clouds_2048x1024.jpg',
    CLOUD_MATERIAL_BUMP_SCALE = 1;

  this.init = function() {
    this.material = new THREE.MeshPhongMaterial({
      color: COLOR_WHITE,
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

  this.animate = function() {
    //this.cloud.rotation.y += CLOUD_ANIMATE_ROTATION_Y;
  };

  this.init();

  return this;
})();

/**
 * Earth
 */
var Earth = (function() {
  var
    self = this,
    paramsDefault = function() {
      return {
        material: {
          map: ASSETS_PATH + 'earth_map_2048x1024.jpg',
          bumpMap: ASSETS_PATH + 'earth_bump_2048x1024.jpg',
          bumpScale: 3,
          specularMap: ASSETS_PATH + 'earth_specular_2048x1024.jpg',
          specular: 0xfffdef,
          shininess: 3
        },
        geometry: {
          radius: 300,
          segments: 64
        },
        animate: {
          rotationFactorY: 2
        }
      };
    },
    params = paramsDefault();

  this.init = function() {
    this.geometry = new THREE.SphereGeometry(
      params.geometry.radius,
      params.geometry.segments,
      params.geometry.segments
    );

    this.material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(params.material.map),
      bumpMap: new THREE.TextureLoader().load(params.material.bumpMap),
      specularMap: new THREE.TextureLoader().load(params.material.specularMap),
      bumpScale: params.material.bumpScale,
      specular: params.material.specular,
      shininess: params.material.shininess
    });

    this.earth = new THREE.Mesh(this.geometry, this.material);
  };

  this.animate = function() {
    this.earth.rotation.y += Math.PI * params.animate.rotationFactorY / 5000;
  };

  this.gui = {
    colors: {},

    reset: function() {
      var _default = paramsDefault();

      self.material.bumpScale = _default.material.bumpScale;
      self.material.specular.setHex(_default.material.specular);
      self.material.shininess = _default.material.shininess;

      params.animate.rotationFactorY = _default.animate.rotationFactorY;
      params.animate.rotationFactorY = _default.animate.rotationFactorY;

      this.colors.specular = '#' + self.material.specular.getHexString();
    },

    add: function(gui) {
      this.reset();

      var gEarth = gui.addFolder('Earth');

      var gMaterial = gEarth.addFolder('Material');
      gMaterial.add(self.material, 'bumpScale', 0, 10).listen();
      gMaterial.add(self.material, 'shininess', 0, 10).listen();
      gMaterial.addColor(this.colors, 'specular').listen()
        .onChange(function(value) {
          self.material.specular.setHex(value.replace('#', '0x'));
        });

      var gAnimate = gEarth.addFolder('Animate');
      gAnimate.add(params.animate, 'rotationFactorY', -20, 20).listen();

      gEarth.add(this, 'reset').name('Reset Earth');
    }
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

    this.scene.background = Skymap.skymapTexture;

    this.enableControls();
  };

  this.enableControls = function() {
    this.controls = new THREE.OrbitControls(Camera.camera, Renderer.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.07;
    this.controls.enableDamping = true;
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
    animate();
    addGui();

    window.addEventListener('resize', updateAll, false);
  };

  var addGui = function() {
    var gui = new dat.GUI();
    Earth.gui.add(gui);
  };

  var updateAll = function() {
    Camera.updateAspect();
    Renderer.updateSize();
  };

  var animate = function() {
    requestAnimationFrame(animate);

    Earth.animate();
    Cloud.animate();

    Scene.controls.update();
    Renderer.renderer.render(Scene.scene, Camera.camera);
  };

  init();
})();