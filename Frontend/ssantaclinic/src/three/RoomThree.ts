/* eslint-disable no-undef */
import { throws } from 'assert';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class RoomThree {
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
    const divContainer = document.querySelector('#room-canvas');
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
      10000,
    );

    camera.position.set(11.094, 5.998, -2.705);
    camera.rotation.set(-114.28, 59.33, 117.67);
    this._camera = camera;
  }
  _setupLight() {
    const color = '#BB9C8B';
    const intensity = 1.5;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(4.624, 10.0, 0.451);
    this._scene.add(light);
  }
  _setupModel() {
    new GLTFLoader().load('/room/town2.glb', (gltf) => {
      const model = gltf.scene;
      this._scene.add(model);

      // const clips = gltf.animations;
      // const mixer = new THREE.AnimationMixer(model);
      // const clip = THREE.AnimationClip.findByName(clips, '');
      // const action = mixer.clipAction(clip);
      // action.play();

      // this._mixer = mixer;
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
