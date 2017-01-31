/**
 * Twitter:       @jprivet_dev
 * GitHub Gist:   https://gist.github.com/jprivet-dev/ed47f7eb4ce89d743e1e50f42530d38f
 *
 * EXAMPLES
 *
 * https://stemkoski.github.io/Three.js/
 * https://threejs.org/examples/
 *
 * EARTH
 * 
 * http://learningthreejs.com/blog/2013/09/16/how-to-make-the-earth-in-webgl/
 * http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
 * http://thematicmapping.org/playground/webgl/earth/
 *
 * SKYBOX / STARMAP
 *
 * https://threejs.org/examples/webgl_materials_cars.html
 * https://threejs.org/examples/#css3d_panorama
 * 
 * LIGHT
 *
 * https://threejs.org/examples/webgl_lensflares.html
 * https://threejs.org/docs/api/lights/SpotLight.html
 * 
 * SHADOW
 *
 * https://threejs.org/examples/webgl_shadowmap.html
 * http://jsfiddle.net/4Txgp/13/
 *
 * CONTROLS
 *
 * https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js
 * https://threejs.org/examples/misc_controls_orbit.html
 * http://workshop.chromeexperiments.com/examples/gui
 *
 * ANIMATION
 *
 * https://github.com/mrdoob/three.js/issues/1830
 * https://threejs.org/examples/webgl_animation_skinning_blending.html
 *
 * TEXTURES
 *
 * https://threejs.org/examples/webgl_materials_bumpmap.html
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
 * https://nasa3d.arc.nasa.gov/
 * http://planetpixelemporium.com/earth.html
 * http://earthobservatory.nasa.gov/blogs/elegantfigures/2011/10/06/crafting-the-blue-marble/
 * http://visibleearth.nasa.gov/view.php?id=79765
 * http://visibleearth.nasa.gov/view.php?id=57747
 * 
 * Textures used in that codepen :
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_bump_1024x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_bump_2048x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_clouds_1024x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_clouds_2048x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_map_1024x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_map_2048x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_specular_1024x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/earth_specular_2048x1024.jpg
 *
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/lens_flare_circle_32x32.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/lens_flare_circle_64x64.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/lens_flare_hexagon_256x256.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/lens_flare_hexagon_256x256.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/lens_flare_sun_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/lens_flare_sun_512x512.jpg
 *
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/moon_bump_1024x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/moon_bump_512x256.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/moon_map_1024x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/moon_map_512x256.jpg
 *
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_negx_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_negx_512x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_negy_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_negy_512x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_negz_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_negz_512x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_posx_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_posx_512x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_posy_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_posy_512x512.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_posz_1024x1024.jpg
 * https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/skymap_posz_512x512.jpg
 */
var
  ASSETS_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/',
  DEFAULT = 'default',
  IMAGE_SD = 'sd',
  IMAGE_HD = 'hd',
  COLOR_WHITE = 0xffffff,
  COLOR_BLACK = 0x000000;

/**
 * Utils
 */
var Utils = {
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
        webGLRenderer: {
          antialias: false,
          alpha: true,
          clearColor: COLOR_BLACK,
          canvasId: 'canvas-earth'
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.keepCurrentAntialias();

      // @see also THREE.CanvasRenderer()
      this.webGLRenderer = new THREE.WebGLRenderer({
        antialias: params.webGLRenderer.antialias,
        alpha: params.webGLRenderer.alpha
      });

      this.webGLRenderer.setClearColor(params.webGLRenderer.clearColor);
      this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
      this.webGLRenderer.domElement.id = params.webGLRenderer.canvasId;

      this.renderView();
    };

    this.refresh = function(antialias) {
      this.setParamAntialias(antialias);

      if (this.isAntialiasNotChanging()) {
        return;
      }

      this.keepCurrentAntialias();

      var canvasElement = document.getElementById(params.webGLRenderer.canvasId);
      document.body.removeChild(canvasElement);
      this.init();

      Scene.activeOrbitControls();
      SceneShadow.activeWebGLRendererShadowMap();
    };

    this.setParamAntialias = function(antialias) {
      params.webGLRenderer.antialias = antialias || paramsDefault().webGLRenderer.antialias;
    };

    this.keepCurrentAntialias = function() {
      params.webGLRenderer.previousAntialias = params.webGLRenderer.antialias;
    };

    this.isAntialiasNotChanging = function() {
      return params.webGLRenderer.antialias === params.webGLRenderer.previousAntialias;
    };

    this.renderView = function() {
      this.view = document.body;
      this.view.appendChild(this.webGLRenderer.domElement);
      this.updateSize();
    };

    this.updateSize = function() {
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    this.gui = {
      reset: function() {
        self.refresh();
      },

      add: function(gui) {
        var folderRenderer = gui.addFolder('RENDERER');

        folderRenderer
          .add(params.webGLRenderer, 'antialias').listen()
          .onChange(function(antialias) {
            self.refresh(antialias);
          });
      }
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
        perspectiveCamera: {
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
      this.perspectiveCamera = new THREE.PerspectiveCamera(
        params.perspectiveCamera.fov,
        Utils.windowRatio(),
        params.perspectiveCamera.near,
        params.perspectiveCamera.far
      );

      this.perspectiveCamera.position.set(
        params.perspectiveCamera.positionX,
        params.perspectiveCamera.positionY,
        params.perspectiveCamera.positionZ
      );
    };

    this.updateAspect = function() {
      this.perspectiveCamera.aspect = Utils.windowRatio();
      this.perspectiveCamera.updateProjectionMatrix();
    };

    this.updateLookAt = function(target) {
      this.perspectiveCamera.lookAt(target);
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        self.perspectiveCamera.fov = _default.perspectiveCamera.fov;
        self.perspectiveCamera.near = _default.perspectiveCamera.near;
        self.perspectiveCamera.far = _default.perspectiveCamera.far;

        self.updateAspect();
      },

      add: function(gui) {
        var folderCamera = gui.addFolder('CAMERA');

        folderCamera
          .add(self.perspectiveCamera, 'fov', 0, 150).listen()
          .onChange(function() {
            self.updateAspect();
          });

        folderCamera
          .add(self.perspectiveCamera, 'near', 0, 5).listen()
          .onChange(function() {
            self.updateAspect();
          });

        folderCamera
          .add(self.perspectiveCamera, 'far', 0, 10000).listen()
          .onChange(function() {
            self.updateAspect();
          });

        folderCamera
          .add(this, 'reset').name('RESET CAMERA');

        return folderCamera;
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
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        cubeTextureLoader: {
          positionTag: '{pos}',
          positions: ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'],
          filename: {
            sd: 'skymap_{pos}_512x512.jpg',
            hd: 'skymap_{pos}_1024x1024.jpg'
          }
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {};

    this.setParamImgDef = function(imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setSceneBgCubeTexture = function(_scene, imgDef) {
      this.setParamImgDef(imgDef);
      if (this.doesRefreshTextureNecessary()) {
        _scene.background = this.getCubeTextureLoader();
        this.disableRefreshTexture();
      }
    };

    this.getCubeTextureLoader = function() {
      return new THREE.CubeTextureLoader()
        .setPath(ASSETS_PATH)
        .load(this.getFilenames());
    };

    this.getFilenames = function() {
      var filenames = [];

      for (var i = 0; i < params.cubeTextureLoader.positions.length; i++) {
        filenames.push(
          this.getFilename(params.cubeTextureLoader.positions[i])
        );
      }

      return filenames;
    };

    this.getFilename = function(position) {
      return params.cubeTextureLoader.filename[params.imgDef].replace(
        params.cubeTextureLoader.positionTag,
        position
      );
    };

    this.doesRefreshTextureNecessary = function() {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function() {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {},

      reset: function() {
        var _default = paramsDefault();
        self.setSceneBgCubeTexture(Scene.scene, _default.imgDef);
      },

      add: function(gui) {
        var folderSkymap = gui.addFolder('SKYMAP');

        folderSkymap
          .add(params, 'imgDef', [IMAGE_SD, IMAGE_HD]).listen()
          .onChange(function(imgDef) {
            self.setSceneBgCubeTexture(Scene.scene, imgDef);
          });

        folderSkymap
          .add(this, 'reset').name('RESET SKYMAP');

        return folderSkymap;
      }
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
        imgDef: IMAGE_SD,
        imgDefPrevious: undefined,
        visible: true,
        material: {
          wireframe: false,
          transparent: true,
          color: COLOR_WHITE,
          bumpScale: 0.13,
          opacity: 0.9,
          alphaMap: {
            sd: ASSETS_PATH + 'earth_clouds_1024x512.jpg',
            hd: ASSETS_PATH + 'earth_clouds_2048x1024.jpg'
          },
          bumpMap: {
            sd: ASSETS_PATH + 'earth_clouds_1024x512.jpg',
            hd: ASSETS_PATH + 'earth_clouds_2048x1024.jpg'
          }
        },
        geometry: {
          radius: 50.3,
          widthSegments: 64,
          heightSegments: 32
        },
        animate: {
          enabled: true,
          rotationsYPerSecond: -0.0012
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.material = new THREE.MeshPhongMaterial({
        wireframe: params.material.wireframe,
        color: params.material.color,
        opacity: params.material.opacity,
        transparent: params.material.transparent,
        bumpScale: params.material.bumpScale
      });

      this.setMaterialTextures();

      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.widthSegments,
        params.geometry.heightSegments
      );

      this.cloudMesh = new THREE.Mesh(this.geometry, this.material);
      this.cloudMesh.visible = params.visible;
    };

    this.animate = function(delta) {
      if (params.animate.enabled) {
        this.cloudMesh.rotation.y += delta * 2 * Math.PI * params.animate.rotationsYPerSecond;
      }
    };

    this.setParamImgDef = function(imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setMaterialTextures = function(imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.material.alphaMap = new THREE.TextureLoader().load(params.material.alphaMap[params.imgDef]);
        this.material.bumpMap = new THREE.TextureLoader().load(params.material.bumpMap[params.imgDef]);
        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function() {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function() {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        self.cloudMesh.visible = _default.visible;

        self.material.wireframe = _default.material.wireframe;
        self.material.transparent = _default.material.transparent;
        self.material.opacity = _default.material.opacity;
        self.material.bumpScale = _default.material.bumpScale;
        self.material.color.setHex(_default.material.color);

        params.animate.enabled = _default.animate.enabled;
        params.animate.rotationsYPerSecond = _default.animate.rotationsYPerSecond;

        self.setMaterialTextures(_default.imgDef);

        this.resetColorsHexString();
      },

      resetColorsHexString: function() {
        this.params.colors.color = '#' + self.material.color.getHexString();
      },

      add: function(gui) {
        this.resetColorsHexString();

        var folderCloud = gui.addFolder('CLOUD');

        folderCloud
          .add(self.cloudMesh, 'visible').listen();

        var folderMaterial = folderCloud.addFolder('Material');

        folderMaterial
          .add(params, 'imgDef', [IMAGE_SD, IMAGE_HD]).listen()
          .onChange(function(imgDef) {
            self.setMaterialTextures(imgDef);
          });

        folderMaterial
          .add(self.material, 'wireframe').listen();

        folderMaterial
          .add(self.material, 'transparent').listen();

        folderMaterial
          .add(self.material, 'opacity', 0, 1).listen();

        folderMaterial
          .add(self.material, 'bumpScale', -1.5, 1.5).listen();

        folderMaterial
          .addColor(this.params.colors, 'color').listen()
          .onChange(function(color) {
            self.material.color.setHex(color.replace('#', '0x'));
          });

        var folderAnimate = folderCloud.addFolder('Animate');

        folderAnimate
          .add(params.animate, 'enabled').listen();

        folderAnimate
          .add(params.animate, 'rotationsYPerSecond', -2, 2).listen();

        folderCloud
          .add(this, 'reset').name('RESET CLOUD');

        return folderCloud;
      }
    };

    this.init();
  };

  return new _Cloud();
})();

/**
 * Earth
 */
var Earth = (function(Cloud) {
  var _Earth = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        imgDef: IMAGE_SD,
        imgDefPrevious: undefined,
        visible: true,
        material: {
          wireframe: false,
          map: {
            sd: ASSETS_PATH + 'earth_map_1024x512.jpg',
            hd: ASSETS_PATH + 'earth_map_2048x1024.jpg'
          },
          bumpMap: {
            sd: ASSETS_PATH + 'earth_bump_1024x512.jpg',
            hd: ASSETS_PATH + 'earth_bump_2048x1024.jpg'
          },
          bumpScale: 0.45,
          specularMap: {
            sd: ASSETS_PATH + 'earth_specular_1024x512.jpg',
            hd: ASSETS_PATH + 'earth_specular_2048x1024.jpg'
          },
          specular: 0x2d4ea0,
          shininess: 6
        },
        geometry: {
          radius: 50,
          widthSegments: 64,
          heightSegments: 32
        },
        animate: {
          enabled: true,
          rotationsYPerSecond: 0.01
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.widthSegments,
        params.geometry.heightSegments
      );

      this.material = new THREE.MeshPhongMaterial({
        wireframe: params.material.wireframe,
        bumpScale: params.material.bumpScale,
        specular: params.material.specular,
        shininess: params.material.shininess
      });

      this.setMaterialTextures();

      this.earthMesh = new THREE.Mesh(this.geometry, this.material);
      this.earthMesh.visible = params.visible;

      this.earthMesh.add(Cloud.cloudMesh);
    };

    this.animate = function(delta) {
      if (params.animate.enabled) {
        this.earthMesh.rotation.y += delta * 2 * Math.PI * params.animate.rotationsYPerSecond;
      }
    };

    this.setParamImgDef = function(imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setMaterialTextures = function(imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.material.map = new THREE.TextureLoader().load(params.material.map[params.imgDef]);
        this.material.bumpMap = new THREE.TextureLoader().load(params.material.bumpMap[params.imgDef]);
        this.material.specularMap = new THREE.TextureLoader().load(params.material.specularMap[params.imgDef]);
        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function() {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function() {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        self.earthMesh.visible = _default.visible;

        self.material.wireframe = _default.material.wireframe;
        self.material.bumpScale = _default.material.bumpScale;
        self.material.shininess = _default.material.shininess;
        self.material.specular.setHex(_default.material.specular);

        params.animate.enabled = _default.animate.enabled;
        params.animate.rotationsYPerSecond = _default.animate.rotationsYPerSecond;

        self.setMaterialTextures(_default.imgDef);

        this.resetColorsHexString();
      },

      resetColorsHexString: function() {
        this.params.colors.specular = '#' + self.material.specular.getHexString();
      },

      add: function(gui) {
        this.resetColorsHexString();

        var folderEarth = gui.addFolder('EARTH');

        folderEarth
          .add(self.earthMesh, 'visible').listen();

        var folderMaterial = folderEarth.addFolder('Material');

        folderMaterial
          .add(params, 'imgDef', [IMAGE_SD, IMAGE_HD]).listen()
          .onChange(function(imgDef) {
            self.setMaterialTextures(imgDef);
          });

        folderMaterial
          .add(self.material, 'wireframe').listen();

        folderMaterial
          .add(self.material, 'bumpScale', -1.5, 1.5).listen();

        folderMaterial
          .add(self.material, 'shininess', 0, 10).listen();

        folderMaterial
          .addColor(this.params.colors, 'specular').listen()
          .onChange(function(color) {
            self.material.specular.setHex(color.replace('#', '0x'));
          });

        var folderAnimate = folderEarth.addFolder('Animate');

        folderAnimate
          .add(params.animate, 'enabled').listen();

        folderAnimate
          .add(params.animate, 'rotationsYPerSecond', -2, 2).listen();

        folderEarth
          .add(this, 'reset').name('RESET EARTH');

        return folderEarth;
      }
    };

    this.init();
  };

  return new _Earth();
})(Cloud);

/**
 * Moon
 */
var Moon = (function(Earth) {
  var _Moon = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        imgDef: IMAGE_SD,
        imgDefPrevious: undefined,
        moonMesh: {
          visible: true,
          position: {
            x: 0,
            y: 0,
            z: -100,
          },
        },
        material: {
          wireframe: false,
          map: {
            sd: ASSETS_PATH + 'moon_map_512x256.jpg',
            hd: ASSETS_PATH + 'moon_map_1024x512.jpg'
          },
          bumpMap: {
            sd: ASSETS_PATH + 'moon_bump_512x256.jpg',
            hd: ASSETS_PATH + 'moon_bump_1024x512.jpg'
          },
          bumpScale: 0.1,
          shininess: 0
        },
        geometry: {
          radius: 10,
          widthSegments: 32,
          heightSegments: 16
        },
        animate: {
          enabled: true,
          pivotRotationsPerSecond: 0.05
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.widthSegments,
        params.geometry.heightSegments
      );

      this.material = new THREE.MeshPhongMaterial({
        wireframe: params.material.wireframe,
        bumpScale: params.material.bumpScale,
        shininess: params.material.shininess
      });

      this.setMaterialTextures();

      this.moonMesh = new THREE.Mesh(this.geometry, this.material);

      this.moonMesh.position.set(
        params.moonMesh.position.x,
        params.moonMesh.position.y,
        params.moonMesh.position.z
      );

      this.moonMesh.visible = params.moonMesh.visible;
      this.pivot = this.createPivot();
    };

    this.createPivot = function() {
      var pivot = new THREE.Object3D();
      pivot.position = Earth.earthMesh.position;
      pivot.add(this.moonMesh);

      return pivot;
    };

    this.animate = function(delta) {
      if (params.animate.enabled) {
        this.pivot.rotation.y += delta * 2 * Math.PI * params.animate.pivotRotationsPerSecond;
      }
    };

    this.setParamImgDef = function(imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setMaterialTextures = function(imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.material.map = new THREE.TextureLoader().load(params.material.map[params.imgDef]);
        this.material.bumpMap = new THREE.TextureLoader().load(params.material.bumpMap[params.imgDef]);
        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function() {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function() {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        self.moonMesh.visible = _default.moonMesh.visible;

        self.material.wireframe = _default.material.wireframe;
        self.material.bumpScale = _default.material.bumpScale;
        self.material.shininess = _default.material.shininess;

        self.moonMesh.position.x = _default.moonMesh.position.x;
        self.moonMesh.position.y = _default.moonMesh.position.y;
        self.moonMesh.position.z = _default.moonMesh.position.z;

        params.animate.enabled = _default.animate.enabled;
        params.animate.pivotRotationsPerSecond = _default.animate.pivotRotationsPerSecond;

        self.setMaterialTextures(_default.imgDef);
      },

      add: function(gui) {
        var folderMoon = gui.addFolder('MOON');

        folderMoon
          .add(self.moonMesh, 'visible').listen();

        var folderPosition = folderMoon.addFolder('Position');

        folderPosition
          .add(self.moonMesh.position, 'x', -100, 100).listen();

        folderPosition
          .add(self.moonMesh.position, 'y', -100, 100).listen();

        folderPosition
          .add(self.moonMesh.position, 'z', -100, 100).listen();

        var folderMaterial = folderMoon.addFolder('Material');

        folderMaterial
          .add(params, 'imgDef', [IMAGE_SD, IMAGE_HD]).listen()
          .onChange(function(imgDef) {
            self.setMaterialTextures(imgDef);
          });

        folderMaterial
          .add(self.material, 'wireframe').listen();

        folderMaterial
          .add(self.material, 'bumpScale', -1.5, 1.5).listen();

        folderMaterial
          .add(self.material, 'shininess', 0, 10).listen();

        var folderAnimate = folderMoon.addFolder('Animate');

        folderAnimate
          .add(params.animate, 'enabled').listen();

        folderAnimate
          .add(params.animate, 'pivotRotationsPerSecond', -2, 2).listen();

        folderMoon
          .add(this, 'reset').name('RESET MOON');

        return folderMoon;
      }
    };

    this.init();
  };

  return new _Moon();
})(Earth);

/**
 * Sun
 */
var Sun = (function() {
  var _Sun = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        sunLight: {
          visible: true,
          color: COLOR_WHITE,
          intensity: 1.3,
          position: {
            x: -380,
            y: 240,
            z: -1000,
          }
        },
        sunLensFlare: {
          textures: {
            sun: {
              sd: ASSETS_PATH + 'lens_flare_sun_512x512.jpg',
              hd: ASSETS_PATH + 'lens_flare_sun_1024x1024.jpg'
            },
            circle: {
              sd: ASSETS_PATH + 'lens_flare_circle_32x32.jpg',
              hd: ASSETS_PATH + 'lens_flare_circle_64x64.jpg'
            },
            hexagon: {
              sd: ASSETS_PATH + 'lens_flare_hexagon_128x128.jpg',
              hd: ASSETS_PATH + 'lens_flare_hexagon_256x256.jpg'
            }
          },
          flareCircleSizeMax: 70,
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
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.textureLoader = new THREE.TextureLoader();
      this.sunLight = new THREE.DirectionalLight(params.sunLight.color, params.sunLight.intensity);

      this.sunLight.position.set(
        params.sunLight.position.x,
        params.sunLight.position.y,
        params.sunLight.position.z
      );

      this.sunLight.visible = params.sunLight.visible;

      this.createLensFlare();
      this.disableRefreshTexture();
    };

    this.setParamImgDef = function(imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.createLensFlare = function() {
      this.sunLensFlare = this.getSunLensFlare();
      this.sunLight.add(this.sunLensFlare);
    };

    this.getSunLensFlare = function() {
      this.loadLensFlareTextures();

      var sunLensFlare = new THREE.LensFlare(
        this.getTextureByIndex(0),
        params.sunLensFlare.lensFlares[0].size,
        params.sunLensFlare.lensFlares[0].distance,
        THREE.AdditiveBlending
      );

      return this.addLensFlareSunCirclesAndHexagons(sunLensFlare);
    };

    this.addLensFlareSunCirclesAndHexagons = function(sunLensFlare) {
      for (var i = 1; i < params.sunLensFlare.lensFlares.length; i++) {
        sunLensFlare.add(
          this.getTextureByIndex(i),
          params.sunLensFlare.lensFlares[i].size,
          params.sunLensFlare.lensFlares[i].distance,
          THREE.AdditiveBlending
        );
      }

      return sunLensFlare;
    };

    this.getTextureByIndex = function(index) {
      if (0 === index) {
        return this.textureFlareSun;
      }
      return params.sunLensFlare.lensFlares[index].size < params.sunLensFlare.flareCircleSizeMax ?
        this.textureFlareCircle :
        this.textureFlareHexagon;
    };

    this.loadLensFlareTextures = function() {
      this.textureFlareSun = this.textureLoader.load(params.sunLensFlare.textures.sun[params.imgDef]);
      this.textureFlareCircle = this.textureLoader.load(params.sunLensFlare.textures.circle[params.imgDef]);
      this.textureFlareHexagon = this.textureLoader.load(params.sunLensFlare.textures.hexagon[params.imgDef]);
    };

    this.refreshTextures = function(imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.loadLensFlareTextures();

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          this.sunLensFlare.lensFlares[i].texture = this.getTextureByIndex(i);
        }

        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function() {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function() {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        self.sunLight.visible = _default.sunLight.visible;
        self.sunLight.intensity = _default.sunLight.intensity;
        self.sunLight.color.setHex(_default.sunLight.color);

        self.sunLight.position.x = _default.sunLight.position.x;
        self.sunLight.position.y = _default.sunLight.position.y;
        self.sunLight.position.z = _default.sunLight.position.z;

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          self.sunLensFlare.lensFlares[i].size = _default.sunLensFlare.lensFlares[i].size;
          self.sunLensFlare.lensFlares[i].opacity = _default.sunLensFlare.lensFlares[i].opacity;
          self.sunLensFlare.lensFlares[i].distance = _default.sunLensFlare.lensFlares[i].distance;
        }

        this.resetColorsHexString();

        self.refreshTextures();
      },

      resetColorsHexString: function() {
        this.params.colors.color = '#' + self.sunLight.color.getHexString();
      },

      add: function(gui) {
        this.resetColorsHexString();

        var folderSun = gui.addFolder('SUN');

        folderSun
          .add(self.sunLight, 'visible').listen();

        var folderLight = folderSun.addFolder('Light');

        folderLight
          .add(self.sunLight, 'intensity', 0, 10).listen();

        folderLight
          .addColor(this.params.colors, 'color').listen()
          .onChange(function(color) {
            self.sunLight.color.setHex(color.replace('#', '0x'));
          });

        var folderPosition = folderSun.addFolder('Position');

        folderPosition
          .add(self.sunLight.position, 'x', -2000, 2000).listen();

        folderPosition
          .add(self.sunLight.position, 'y', -2000, 2000).listen();

        folderPosition
          .add(self.sunLight.position, 'z', -2000, 2000).listen();

        var folderLensFlares = folderSun.addFolder('LensFlares');

        folderLensFlares
          .add(params, 'imgDef', [IMAGE_SD, IMAGE_HD]).listen()
          .onChange(function(imgDef) {
            self.refreshTextures(imgDef);
          });

        for (var i = 0; i < self.sunLensFlare.lensFlares.length; i++) {
          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], 'size', 0, 2000).name(i + '. size').listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], 'opacity', 0, 1).name(i + '. opacity').listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], 'distance', -1, 1).name(i + '. distance').listen();
        }

        folderSun
          .add(this, 'reset').name('RESET SUN');

        return folderSun;
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
      this.scene = new THREE.Scene();
      this.scene.add(Earth.earthMesh);
      this.scene.add(Moon.pivot);
      this.scene.add(Sun.sunLight);

      Skymap.setSceneBgCubeTexture(this.scene);

      this.activeOrbitControls();
    };

    this.activeOrbitControls = function() {
      this.orbitControls = new THREE.OrbitControls(
        Camera.perspectiveCamera,
        Renderer.webGLRenderer.domElement
      );

      this.applyParamsOrbitControlsAutoRotate();
      this.applyParamsOrbitControlsAutoRotateSpeed();

      this.orbitControls.enableDamping = true;
    };

    this.applyParamsOrbitControlsAutoRotate = function() {
      this.orbitControls.autoRotate = params.orbitControls.autoRotate;
    };

    this.applyParamsOrbitControlsAutoRotateSpeed = function() {
      this.orbitControls.autoRotateSpeed = params.orbitControls.autoRotateSpeed;
    };

    this.refreshOrbitControls = function() {
      this.activeOrbitControls();
      this.gui.reset();
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        params.orbitControls.autoRotate = _default.orbitControls.autoRotate;
        params.orbitControls.autoRotateSpeed = _default.orbitControls.autoRotateSpeed;

        self.applyParamsOrbitControlsAutoRotate();
        self.applyParamsOrbitControlsAutoRotateSpeed();
      },

      add: function(gui) {
        var folderOrbitControls = gui.addFolder('ORBIT CONTROLS');

        folderOrbitControls
          .add(params.orbitControls, 'autoRotate').listen()
          .onChange(function(value) {
            self.applyParamsOrbitControlsAutoRotate();
          });

        folderOrbitControls
          .add(params.orbitControls, 'autoRotateSpeed', -1, 1).listen()
          .onChange(function(value) {
            self.applyParamsOrbitControlsAutoRotateSpeed();
          });

        folderOrbitControls
          .add(this, 'reset').name('RESET CONTR.');

        return folderOrbitControls;
      }
    };

    this.init();
  };

  return new _Scene();
})();

/**
 * SceneShadow
 */
var SceneShadow = (function(Scene) {
  var _SceneShadow = function() {
    var self = this;

    var paramsDefault = function() {
      return {
        cameraHelper: {
          visible: false
        },
        shadow: {
          castShadow: true,
          camera: {
            near: 950,
            far: 1250,
            right: 150,
            left: -150,
            top: 150,
            bottom: -150
          },
          mapSize: {
            width: 512,
            height: 512
          },
          bias: 0
        }
      };
    };

    var params = paramsDefault();

    this.init = function() {
      this.setShadowConfiguration();
    };

    this.setShadowConfiguration = function() {
      this.cameraHelper = new THREE.CameraHelper(Sun.sunLight.shadow.camera);
      Scene.scene.add(this.cameraHelper);
      this.cameraHelper.visible = params.cameraHelper.visible;

      Sun.sunLight.castShadow = params.shadow.castShadow;
      Sun.sunLight.shadow.camera.near = params.shadow.camera.near;
      Sun.sunLight.shadow.camera.far = params.shadow.camera.far;
      Sun.sunLight.shadow.mapSize.width = params.shadow.mapSize.width;
      Sun.sunLight.shadow.mapSize.height = params.shadow.mapSize.height;
      Sun.sunLight.shadow.bias = params.shadow.bias;

      Sun.sunLight.shadow.camera.right = params.shadow.camera.right;
      Sun.sunLight.shadow.camera.left = params.shadow.camera.left;
      Sun.sunLight.shadow.camera.top = params.shadow.camera.top;
      Sun.sunLight.shadow.camera.bottom = params.shadow.camera.bottom;

      Earth.earthMesh.castShadow = true;
      Earth.earthMesh.receiveShadow = true;

      Cloud.cloudMesh.receiveShadow = true;

      Moon.moonMesh.castShadow = true;
      Moon.moonMesh.receiveShadow = true;

      this.activeWebGLRendererShadowMap();

      this.updateShadow();
    };

    this.activeWebGLRendererShadowMap = function() {
      Renderer.webGLRenderer.shadowMap.enabled = true;
      Renderer.webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
      Renderer.webGLRenderer.shadowMapSoft = true;
    };

    this.updateShadow = function() {
      Sun.sunLight.shadow.camera.updateProjectionMatrix();
      this.cameraHelper.update();
    };

    this.gui = {
      params: {
        colors: {}
      },

      reset: function() {
        var _default = paramsDefault();

        //self.cameraHelper.visible = _default.cameraHelper.visible;

        Sun.sunLight.castShadow = _default.shadow.castShadow;
        Sun.sunLight.shadow.camera.near = _default.shadow.camera.near;
        Sun.sunLight.shadow.camera.far = _default.shadow.camera.far;
        Sun.sunLight.shadow.mapSize.width = _default.shadow.mapSize.width;
        Sun.sunLight.shadow.mapSize.height = _default.shadow.mapSize.height;
        Sun.sunLight.shadow.bias = _default.shadow.bias;

        Sun.sunLight.shadow.camera.right = _default.shadow.camera.right;
        Sun.sunLight.shadow.camera.left = _default.shadow.camera.left;
        Sun.sunLight.shadow.camera.top = _default.shadow.camera.top;
        Sun.sunLight.shadow.camera.bottom = _default.shadow.camera.bottom;

        self.updateShadow();
      },

      add: function(gui) {
        var folderShadow = gui.addFolder('SHADOW');

        folderShadow
          .add(self.cameraHelper, 'visible').name('cameraHelper').listen();

        folderShadow
          .add(Sun.sunLight, 'castShadow').listen();

        folderShadow
          .add(Sun.sunLight.shadow.camera, 'near').step(10).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, 'far').step(10).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.mapSize, 'width', 0, 2048).listen();

        folderShadow
          .add(Sun.sunLight.shadow.mapSize, 'height', 0, 2048).listen();

        folderShadow
          .add(Sun.sunLight.shadow, 'bias', 0, 0.4).step(0.001).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, 'right').step(10).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, 'left').step(10).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, 'top').step(10).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, 'bottom').step(10).listen()
          .onChange(function() {
            self.updateShadow();
          });

        folderShadow
          .add(this, 'reset').name('RESET SHADOW');

        return folderShadow;
      }
    };

    this.init();
  };

  return new _SceneShadow();
})(Scene);

/**
 * View
 */
var View = (function() {
  var self = this,
    clock, delta;

  var params = {
    imgDef: DEFAULT,
    helpClassname: 'help'
  };

  var _View = function() {
    this.init = function() {
      clock = new THREE.Clock();

      this.updateAll();
      this.addGui();
      this.help();

      animate();

      window.addEventListener('resize', this.updateAll, false);
    };

    this.addGui = function() {
      var gui = new dat.GUI();

      Scene.gui.add(gui);
      Camera.gui.add(gui);
      Skymap.gui.add(gui);
      Sun.gui.add(gui);
      folderEarth = Earth.gui.add(gui);
      Cloud.gui.add(folderEarth);
      Moon.gui.add(gui);
      SceneShadow.gui.add(gui);
      Renderer.gui.add(gui);

      gui.add(params, 'imgDef', [DEFAULT, IMAGE_SD, IMAGE_HD]).name('IMG DEF ALL').listen()
        .onChange(function(imgDef) {
          imgDef = DEFAULT === imgDef ? undefined : imgDef;

          Sun.refreshTextures(imgDef);
          Skymap.setSceneBgCubeTexture(Scene.scene, imgDef);
          Earth.setMaterialTextures(imgDef);
          Cloud.setMaterialTextures(imgDef);
          Moon.setMaterialTextures(imgDef);
        });

      gui.add(this, 'resetAll').name('RESET ALL');
      gui.add(this, 'help').name('(?) HELP');
    };

    this.resetAll = function() {
      params.imgDef = DEFAULT;

      Renderer.gui.reset();
      Scene.gui.reset();
      Camera.gui.reset();
      Skymap.gui.reset();
      Sun.gui.reset();
      Earth.gui.reset();
      Cloud.gui.reset();
      Moon.gui.reset();
      SceneShadow.gui.reset();
    };

    this.updateAll = function() {
      Camera.updateAspect();
      Renderer.updateSize();
    };

    this.help = function() {
      var helpElementStyle = document.getElementsByClassName(params.helpClassname)[0].style;
      helpElementStyle.display = this.helpHideToggle(helpElementStyle.display);
    };

    this.helpHideToggle = function(value) {
      return 'none' === value ? 'block' : 'none';
    };

    var animate = function() {
      requestAnimationFrame(animate);

      delta = clock.getDelta();

      Earth.animate(delta);
      Cloud.animate(delta);
      Moon.animate(delta);

      Scene.orbitControls.update();
      Renderer.webGLRenderer.render(Scene.scene, Camera.perspectiveCamera);
    };

    this.init();
  };

  return new _View();
})();