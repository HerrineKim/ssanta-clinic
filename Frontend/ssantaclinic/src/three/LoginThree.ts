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
      1200,
    );

    camera.position.set(-0.004, 0.05, 0.7);
    camera.rotation.set(-26.07, -0.19, -0.09);
    this._camera = camera;
  }
  _setupLight() {
    const color = '#FFFFFF';
    const intensity = 1;
    const light1 = new THREE.DirectionalLight(color, intensity);
    const light2 = new THREE.PointLight(color, intensity);
    light1.position.set(-30.299, 26.655, -2.589);
    light2.position.set(0.191, 0.268, 0.455);
    this._scene.add(light1);
    this._scene.add(light2);
  }
  _setupModel() {
    new GLTFLoader().load('/login/login_santa_penguin.glb', (gltf) => {
      const model = gltf.scene;
      this._scene.add(model);

      const clips = gltf.animations;
      const mixer = new THREE.AnimationMixer(model);
      const clip1 = THREE.AnimationClip.findByName(
        clips,
        'Armature|mixamo.com|Layer0',
      );
      const clip2 = THREE.AnimationClip.findByName(clips, 'Scene');
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
