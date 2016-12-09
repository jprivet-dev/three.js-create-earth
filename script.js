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
  var _Renderer = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        renderer: {
          antialias: true,
          clearColor: COLOR_WHITE
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      // @see also THREE.CanvasRenderer()
      this.renderer = new THREE.WebGLRenderer({
        antialias: params.renderer.antialias
      });

      this.renderer.setClearColor(params.renderer.clearColor);
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
  };

  return new _Renderer();
})();

/**
 * Camera
 */
var Camera = (function() {
  var _Camera = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        camera: {
          positionX: 0,
          positionY: 0,
          positionZ: 1500,
          fov: 67,
          near: 1,
          far: 2000
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.camera = new THREE.PerspectiveCamera(
        params.camera.fov,
        Utils.windowRatio(),
        params.camera.near,
        params.camera.far
      );
      
      this.camera.position.set(
        params.camera.positionX,
        params.camera.positionY,
        params.camera.positionZ
      );
    };

    this.updateAspect = function() {
      this.camera.aspect = Utils.windowRatio();
      this.camera.updateProjectionMatrix();
    };

    this.updateLookAt = function(target) {
      this.camera.lookAt(target);
    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.camera.fov = _default.camera.fov;
        self.camera.near = _default.camera.near;
        self.camera.far = _default.camera.far;

        self.updateAspect();
      },

      add: function(gui) {
        this.reset();

        var gCamera = gui.addFolder('Camera');
        
        gCamera.add(self.camera, 'fov', -150, 150).listen()
          .onChange(function() {
            self.updateAspect();
          });
        
        gCamera.add(self.camera, 'near', 0, 5).listen()
          .onChange(function() {
            self.updateAspect();
          });
        
        gCamera.add(self.camera, 'far', -5000, 5000).listen()
          .onChange(function() {
            self.updateAspect();
          });
        
        gCamera.add(this, 'reset').name('Reset Camera');
      }
    };

    this.init();
  };

  return new _Camera();
})();

/**
 * Skymap
 */
var Skymap = (function() {
  var _Skymap = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        skymapTexture: {
          positionTag: '{pos}',
          positions: ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'],
          path: ASSETS_PATH,
          filename: 'skymap_{pos}_1024x1024.jpg'
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.skymapTexture = new THREE.CubeTextureLoader()
        .setPath(params.skymapTexture.path)
        .load(this.getFilenames());
    };

    this.getFilenames = function() {
      var filenames = [];

      for (var i = 0; i < params.skymapTexture.positions.length; i++) {
        filenames.push(
          this.getFilename(params.skymapTexture.positions[i])
        );
      }

      return filenames;
    };

    this.getFilename = function(position) {
      return params.skymapTexture.filename.replace(
        params.skymapTexture.positionTag,
        position
      );
    };

    this.init();
  };

  return new _Skymap();
})();

/**
 * Cloud
 */
var Cloud = (function() {
  var _Cloud = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        material: {
          transparent: true,
          color: COLOR_WHITE,
          bumpScale: 1,
          opacity: 0.9,
          alphaMap: ASSETS_PATH + 'earth_clouds_2048x1024.jpg',
          bumpMap: ASSETS_PATH + 'earth_clouds_2048x1024.jpg'
        },
        geometry: {
          radius: 302,
          segments: 64
        },
        animate: {
          rotationY: 100
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.material = new THREE.MeshPhongMaterial({
        color: params.material.color,
        opacity: params.material.opacity,
        transparent: params.material.transparent,
        alphaMap: new THREE.TextureLoader().load(params.material.alphaMap),
        bumpMap: new THREE.TextureLoader().load(params.material.bumpMap),
        bumpScale: params.material.bumpScale
      });

      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.segments,
        params.geometry.segments
      );

      this.cloud = new THREE.Mesh(this.geometry, this.material);
    };

    this.animate = function() {
      //this.cloud.rotation.y += params.animate.rotationY;
    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.material.transparent = _default.material.transparent;
        self.material.color.setHex(_default.material.color);
        self.material.opacity = _default.material.opacity;
        self.material.bumpScale = _default.material.bumpScale;

        this.colors.color = '#' + self.material.color.getHexString();
      },

      add: function(gui) {
        this.reset();

        var gCloud = gui.addFolder('Cloud');

        var gMaterial = gCloud.addFolder('Material');
        gMaterial.add(self.material, 'transparent').listen();
        gMaterial.add(self.material, 'opacity', 0, 1).listen();
        gMaterial.add(self.material, 'bumpScale', -10, 10).listen();
        gMaterial.addColor(this.colors, 'color').listen()
          .onChange(function(color) {
            self.material.color.setHex(color.replace('#', '0x'));
          });

        gCloud.add(this, 'reset').name('Reset Cloud');
      }
    };

    this.init();
  };

  return new _Cloud();
})();

/**
 * Earth
 */
var Earth = (function() {
  var _Earth = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        material: {
          map: ASSETS_PATH + 'earth_map_2048x1024.jpg',
          bumpMap: ASSETS_PATH + 'earth_bump_2048x1024.jpg',
          bumpScale: 3,
          specularMap: ASSETS_PATH + 'earth_specular_2048x1024.jpg',
          specular: 0x2d4ea0,
          shininess: 6
        },
        geometry: {
          radius: 300,
          segments: 64
        },
        animate: {
          rotationFactorY: 2
        }
      };
    };

    var params = paramsDefault();

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

        this.colors.specular = '#' + self.material.specular.getHexString();
      },

      add: function(gui) {
        this.reset();

        var gEarth = gui.addFolder('Earth');

        var gMaterial = gEarth.addFolder('Material');
        gMaterial.add(self.material, 'bumpScale', -10, 10).listen();
        gMaterial.add(self.material, 'shininess', 0, 10).listen();
        gMaterial.addColor(this.colors, 'specular').listen()
          .onChange(function(color) {
            self.material.specular.setHex(color.replace('#', '0x'));
          });

        var gAnimate = gEarth.addFolder('Animate');
        gAnimate.add(params.animate, 'rotationFactorY', -20, 20).listen();

        gEarth.add(this, 'reset').name('Reset Earth');
      }
    };

    this.init();
  };

  return new _Earth();
})();

/**
 * Light
 */
var Light = (function() {
  var _Light = function() {
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
  };

  return new _Light();
})();

/**
 * Scene
 */
var Scene = (function() {
  var _Scene = function() {
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
  };

  return new _Scene();
})();

/**
 * View
 */
var View = (function() {
  var _View = function() {
    var init = function() {
      updateAll();
      animate();
      addGui();

      window.addEventListener('resize', updateAll, false);
    };

    var addGui = function() {
      var gui = new dat.GUI();
      Camera.gui.add(gui);
      Earth.gui.add(gui);
      Cloud.gui.add(gui);
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
  };

  return new _View();
})();