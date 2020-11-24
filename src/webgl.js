// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");
const eases = require('eases');
const BazierEasing = require('bezier-easing');

const settings = {
  // Make the loop anim
  //ated
  dimensions: [512,512],
  fps: 24,
  duration:6,
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",

  attributes: {antialias: true}
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();
  //camera.position.set(2, 2, -4);
  //camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  //const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();
  const palette = random.pick(palettes);
  //const fragmentShader = `
  //  varying vec2 vUv;
  //  void main () {
  //    vec3 color = vec3(1.0);
  // //   gl_FragColor = vec4(vec3(vUv.x), 1.0);
  //}
  //`
  //;
  //const vertexShader = `
  //    varying vec2 vUv;
  //    uniform float time;
//
  //    void main () {
  //      vUv = uv;
  //      vec3 pos = position.xyz * sin(time);
  //      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//
  //    }
//
//  `
 // ;
  

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 1, 1);

  // Setup a material
  

  // Setup a mesh with geometry + material
  //const mesh = new THREE.Mesh(
  //  new THREE.BoxGeometry(1, 1, 1),
  //  new THREE.MeshPhysicalMaterial({
  //    color: 'white',
  //    roughness: 0.75,
   //   flatShading: true
  //  })
  for (let i = 0; i < 20; i++) {
    const mesh = new THREE.Mesh(geometry, 
      new THREE.ShaderMaterial({
        //fragmentShader,
        //vertexShader,
        color: random.pick(palette),
        wireframe: true
      })
      );
    mesh.position.set(
      random.range(-1,1),
      random.range(-1,1),
      random.range(-1,1)
    );
    mesh.scale.set(
      random.range(-1,1),
      random.range(-1,1),
      random.range(-1,1)
    )
    mesh.scale.multiplyScalar(0.25);
   scene.add(mesh);
  }
  /*scene.add(new THREE.AmbientLight('hsl(0, 0%, 40%'));

  const light = new THREE.DirectionalLight('white', 1);
  light.position.set(2, 2, 4);
  scene.add(light);*/

  const easeFn = BazierEasing(.56,.02,.54,.84);
  
  //specify an ambient/unlit color

  //scene.add(new THREE.AmbientLight('#59314f'));
  //Add some light

  /*const light = new THREE.PointLight('#45caf7', 1, 15.5);
  light.position.set(2, 2, -4).multiplyScalar(1.5);
  scene.add(light);*/

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      //camera.aspect = viewportWidth / viewportHeight;
      const aspect = viewportWidth / viewportHeight;

// Ortho zoom
      const zoom = 1.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());
      camera.updateProjectionMatrix();
    },

    
    // Update & render your scene here
    render({ playhead }) {
      //mesh.rotation.y = time * (10 * Math.PI / 100);
      //controls.update();
      const t =  Math.sin(playhead * Math.PI * 1.75) * 2;
      scene.rotation.z = easeFn(t);
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
     // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
