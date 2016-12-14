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
  COLOR_WHITE = 0xffffff,
  COLOR_BLACK = 0x000000;

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
          clearColor: COLOR_BLACK
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      // @see also THREE.CanvasRenderer()
      this.renderer = new THREE.WebGLRenderer({
        antialias: params.renderer.antialias,
        alpha: true
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
          positionZ: 150,
          fov: 63,
          near: 1,
          far: 8000
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

        var gCamera = gui.addFolder('CAMERA');

        gCamera.add(self.camera, 'fov', 0, 150).listen()
          .onChange(function() {
            self.updateAspect();
          });

        gCamera.add(self.camera, 'near', 0, 5).listen()
          .onChange(function() {
            self.updateAspect();
          });

        gCamera.add(self.camera, 'far', 0, 10000).listen()
          .onChange(function() {
            self.updateAspect();
          });

        gCamera.add(this, 'reset').name('RESET CAMERA');
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
          filename: 'skymap_{pos}_1024x1024.jpg'
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.skymapTexture = new THREE.CubeTextureLoader()
        .setPath(ASSETS_PATH)
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
          bumpScale: 0.1,
          opacity: 0.9,
          alphaMap: ASSETS_PATH + 'earth_clouds_2048x1024.jpg',
          bumpMap: ASSETS_PATH + 'earth_clouds_2048x1024.jpg'
        },
        geometry: {
          radius: 50.3,
          segments: 64
        },
        animate: {
          rotationFactorY: -0.00005
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
      this.cloud.rotation.y += Math.PI * params.animate.rotationFactorY;
    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.material.transparent = _default.material.transparent;
        self.material.opacity = _default.material.opacity;
        self.material.bumpScale = _default.material.bumpScale;

        self.material.color.setHex(_default.material.color);
        this.colors.color = '#' + self.material.color.getHexString();

        params.animate.rotationFactorY = _default.animate.rotationFactorY;
      },

      add: function(gui) {
        this.reset();

        var gCloud = gui.addFolder('EARTH / CLOUD');

        var gMaterial = gCloud.addFolder('Material');
        gMaterial.add(self.material, 'transparent').listen();
        gMaterial.add(self.material, 'opacity', 0, 1).listen();
        gMaterial.add(self.material, 'bumpScale', -1.5, 1.5).listen();
        gMaterial.addColor(this.colors, 'color').listen()
          .onChange(function(color) {
            self.material.color.setHex(color.replace('#', '0x'));
          });

        var gAnimate = gCloud.addFolder('Animate');
        gAnimate.add(params.animate, 'rotationFactorY', -0.005, 0.005).listen();

        gCloud.add(this, 'reset').name('RESET CLOUD');
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
          bumpScale: 0.45,
          specularMap: ASSETS_PATH + 'earth_specular_2048x1024.jpg',
          specular: 0x2d4ea0,
          shininess: 6
        },
        geometry: {
          radius: 50,
          segments: 64
        },
        animate: {
          rotationFactorY: 0.0002
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
      this.earth.rotation.y += Math.PI * params.animate.rotationFactorY;
    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.material.bumpScale = _default.material.bumpScale;
        self.material.shininess = _default.material.shininess;

        self.material.specular.setHex(_default.material.specular);
        this.colors.specular = '#' + self.material.specular.getHexString();

        params.animate.rotationFactorY = _default.animate.rotationFactorY;
      },

      add: function(gui) {
        this.reset();

        var gEarth = gui.addFolder('EARTH');

        var gMaterial = gEarth.addFolder('Material');
        gMaterial.add(self.material, 'bumpScale', -1.5, 1.5).listen();
        gMaterial.add(self.material, 'shininess', 0, 10).listen();
        gMaterial.addColor(this.colors, 'specular').listen()
          .onChange(function(color) {
            self.material.specular.setHex(color.replace('#', '0x'));
          });

        var gAnimate = gEarth.addFolder('Animate');
        gAnimate.add(params.animate, 'rotationFactorY', -0.005, 0.005).listen();

        gEarth.add(this, 'reset').name('RESET EARTH');
      }
    };

    this.init();
  };

  return new _Earth();
})();

/**
 * Moon
 */
var Moon = (function() {
  var _Moon = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        moon: {
          position: {
            x: 100,
            y: 0,
            z: 0,
          },          
        },
        material: {
          map: ASSETS_PATH + 'earth_map_2048x1024.jpg',
          bumpMap: ASSETS_PATH + 'earth_bump_2048x1024.jpg',
          bumpScale: 0.45,
          specularMap: ASSETS_PATH + 'earth_specular_2048x1024.jpg',
          specular: 0x2d4ea0,
          shininess: 6
        },
        geometry: {
          radius: 10,
          segments: 64
        },
        animate: {
          rotationFactorY: 0.0002
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

      this.moon = new THREE.Mesh(this.geometry, this.material);

      this.moon.position.set(
        params.moon.position.x,
        params.moon.position.y,
        params.moon.position.z
      );
    };

    this.animate = function() {
      this.moon.rotation.y += Math.PI * params.animate.rotationFactorY;
    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.material.bumpScale = _default.material.bumpScale;
        self.material.shininess = _default.material.shininess;

        self.material.specular.setHex(_default.material.specular);
        this.colors.specular = '#' + self.material.specular.getHexString();

        params.animate.rotationFactorY = _default.animate.rotationFactorY;
        
        self.moon.position.x = _default.moon.position.x;
        self.moon.position.y = _default.moon.position.y;
        self.moon.position.z = _default.moon.position.z;
      },

      add: function(gui) {
        this.reset();

        var gMoon = gui.addFolder('MOON');
        
        var gPosition = gMoon.addFolder('Position');
        gPosition.add(self.moon.position, 'x', -100, 100).listen();
        gPosition.add(self.moon.position, 'y', -100, 100).listen();
        gPosition.add(self.moon.position, 'z', -100, 100).listen();

        var gMaterial = gMoon.addFolder('Material');
        gMaterial.add(self.material, 'bumpScale', -1.5, 1.5).listen();
        gMaterial.add(self.material, 'shininess', 0, 10).listen();
        gMaterial.addColor(this.colors, 'specular').listen()
          .onChange(function(color) {
            self.material.specular.setHex(color.replace('#', '0x'));
          });

        var gAnimate = gMoon.addFolder('Animate');
        gAnimate.add(params.animate, 'rotationFactorY', -0.005, 0.005).listen();

        gMoon.add(this, 'reset').name('RESET MOON');
      }
    };

    this.init();
  };

  return new _Moon();
})();

/**
 * Sun
 */
var Sun = (function() {
  var _Sun = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        sun: {
          color: COLOR_WHITE,
          intensity: 1.3,
          position: {
            x: -380,
            y: 460,
            z: -1000,
          }
        },
        lensFlares: [{
          size: 1400,
          opacity: 1,
          distance: 0
        }, {
          size: 20,
          opacity: 0.4,
          distance: 0.63
        }, {
          size: 40,
          opacity: 0.3,
          distance: 0.64
        }, {
          size: 70,
          opacity: 0.8,
          distance: 0.7
        }, {
          size: 110,
          opacity: 0.7,
          distance: 0.8
        }, {
          size: 60,
          opacity: 0.4,
          distance: 0.85
        }, {
          size: 30,
          opacity: 0.4,
          distance: 0.86
        }, {
          size: 120,
          opacity: 0.3,
          distance: 0.9
        }, {
          size: 260,
          opacity: 0.4,
          distance: 1
        }]
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.sun = new THREE.DirectionalLight(params.sun.color, params.sun.intensity);

      this.sun.position.set(
        params.sun.position.x,
        params.sun.position.y,
        params.sun.position.z
      );

      this.createLensFlare();
    };

    this.createLensFlare = function() {
      var textureLoader = new THREE.TextureLoader();
      var textureFlare0 = textureLoader.load(ASSETS_PATH + 'lens-flare-01.jpg');
      var textureFlare10 = textureLoader.load(ASSETS_PATH + 'lens-flare-10.jpg');
      var textureFlare20 = textureLoader.load(ASSETS_PATH + 'lens-flare-20.jpg');

      this.lensFlare = new THREE.LensFlare(
        textureFlare0,
        params.lensFlares[0].size,
        params.lensFlares[0].distance,
        THREE.AdditiveBlending
      );

      for (var i = 1; i < params.lensFlares.length; i++) {
        var texture = params.lensFlares[i].size < 70 ? textureFlare10 : textureFlare20;

        this.lensFlare.add(
          texture,
          params.lensFlares[i].size,
          params.lensFlares[i].distance,
          THREE.AdditiveBlending
        );
      }

      this.sun.add(this.lensFlare);
    };

    this.updateLensFlare = function() {

    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.sun.intensity = _default.sun.intensity;

        self.sun.color.setHex(_default.sun.color);
        this.colors.color = '#' + self.sun.color.getHexString();

        self.sun.position.x = _default.sun.position.x;
        self.sun.position.y = _default.sun.position.y;
        self.sun.position.z = _default.sun.position.z;

        for (var i = 0; i < params.lensFlares.length; i++) {
          self.lensFlare.lensFlares[i].size = _default.lensFlares[i].size;
          self.lensFlare.lensFlares[i].opacity = _default.lensFlares[i].opacity;
          self.lensFlare.lensFlares[i].distance = _default.lensFlares[i].distance;
        }
      },

      add: function(gui) {
        this.reset();

        var gSun = gui.addFolder('SUN');

        var gLight = gSun.addFolder('Light');
        gLight.add(self.sun, 'intensity', 0, 10).listen();
        gLight.addColor(this.colors, 'color').listen()
          .onChange(function(color) {
            self.sun.color.setHex(color.replace('#', '0x'));
          });

        var gPosition = gSun.addFolder('Position');
        gPosition.add(self.sun.position, 'x', -2000, 2000).listen();
        gPosition.add(self.sun.position, 'y', -2000, 2000).listen();
        gPosition.add(self.sun.position, 'z', -2000, 2000).listen();

        var gLensFlares = gSun.addFolder('LensFlares');

        for (var i = 0; i < self.lensFlare.lensFlares.length; i++) {
          gLensFlares.add(self.lensFlare.lensFlares[i], 'size', 0, 2000).name(i + '. size').listen();
          gLensFlares.add(self.lensFlare.lensFlares[i], 'opacity', 0, 1).name(i + '. opacity').listen();
          gLensFlares.add(self.lensFlare.lensFlares[i], 'distance', -1, 1).name(i + '. distance').listen();
        }

        gSun.add(this, 'reset').name('RESET SUN');
      }
    };

    this.init();
  };

  return new _Sun();
})();

/**
 * Scene
 */
var Scene = (function() {
  var _Scene = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        orbitControls: {
          autoRotate: true,
          autoRotateSpeed: 0.07
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      Earth.earth.add(Cloud.cloud);

      this.scene = new THREE.Scene();
      this.scene.add(Earth.earth);
      this.scene.add(Moon.moon);
      this.scene.add(Sun.sun);

      this.scene.background = Skymap.skymapTexture;

      this.enableOrbitControls();
    };

    this.enableOrbitControls = function() {
      this.orbitControls = new THREE.OrbitControls(Camera.camera, Renderer.renderer.domElement);
      this.orbitControls.autoRotate = params.orbitControls.autoRotate;
      this.orbitControls.autoRotateSpeed = params.orbitControls.autoRotateSpeed;
      this.orbitControls.enableDamping = true;
    };

    this.gui = {
      colors: {},

      reset: function() {
        var _default = paramsDefault();

        self.orbitControls.autoRotate = _default.orbitControls.autoRotate;
        self.orbitControls.autoRotateSpeed = _default.orbitControls.autoRotateSpeed;
      },

      add: function(gui) {
        this.reset();

        var gOrbitControls = gui.addFolder('ORBIT CONTROLS');
        gOrbitControls.add(self.orbitControls, 'autoRotate').listen();
        gOrbitControls.add(self.orbitControls, 'autoRotateSpeed', -0.5, 0.5).listen();

        gOrbitControls.add(this, 'reset').name('RESET CONTR.');
      }
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

      Scene.gui.add(gui);
      Camera.gui.add(gui);
      Sun.gui.add(gui);
      Earth.gui.add(gui);
      Cloud.gui.add(gui);
      Moon.gui.add(gui);
    };

    var updateAll = function() {
      Camera.updateAspect();
      Renderer.updateSize();
    };

    var animate = function() {
      requestAnimationFrame(animate);

      Earth.animate();
      Cloud.animate();

      Scene.orbitControls.update();
      Renderer.renderer.render(Scene.scene, Camera.camera);
    };

    init();
  };

  return new _View();
})();