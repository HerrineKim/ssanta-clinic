/* eslint-disable no-undef */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class LoginThree {
  _divContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;
  _mixer: any;
  _clock: any;
  _orbitControls: any;
  constructor() {
    this._setupThreeJs();
    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();
    this._setupEvents();
  }
  _setupThreeJs() {
    const divContainer = document.querySelector('#login-canvas');
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    if (divContainer !== null) {
      divContainer.appendChild(renderer.domElement);

      this._renderer = renderer;

      const scene = new THREE.Scene();
      this._scene = scene;
    }
  }
  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(-49.173, 45.059, -0.363);
    camera.rotation.set(-85.8, -56.09, -83.74);
    this._camera = camera;
  }
  _setupLight() {
    const color = '#FFFFFF';
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-30.299, 26.655, -2.589);
    this._scene.add(light);
  }
  _setupModel() {
    new GLTFLoader().load('/login/roodolf_ssanta.glb', (gltf) => {
      const model = gltf.scene;
      this._scene.add(model);

      const clips = gltf.animations;
      const mixer = new THREE.AnimationMixer(model);
      const clip1 = THREE.AnimationClip.findByName(clips, 'Rig.001|Rig|Dance');
      const clip2 = THREE.AnimationClip.findByName(clips, 'Animation');
      const action1 = mixer.clipAction(clip1);
      const action2 = mixer.clipAction(clip2);
      action1.play();
      action2.play();

      this._mixer = mixer;
    });
  }
  _setupControls() {
    this._orbitControls = new OrbitControls(this._camera, this._divContainer);
  }

  _setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();

    this._clock = new THREE.Clock();
    requestAnimationFrame(this.render.bind(this));
  }

  update() {
    const delta = this._clock.getDelta();
    this._orbitControls.update();

    if (this._mixer) this._mixer.update(delta);
  }

  render() {
    this._renderer.render(this._scene, this._camera);
    this.update();

    requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}
