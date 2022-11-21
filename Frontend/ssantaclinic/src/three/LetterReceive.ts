/* eslint-disable no-undef */
import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class LetterReceiveModel {
  _model2: any;
  _bloomPass: any;
  _composer: any;
  _finalComposer: any;
  _divContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;
  _mixer: any;
  _clock: any;
  _orbitControls: any;
  _id: any;
  constructor() {
    this._setupThreeJs();
    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();
    this._setupEvents();
    // this._setupEvents2();
  }
  _setupThreeJs() {
    const divContainer = document.querySelector('#letter-canvas');
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    if (divContainer !== null) {
      divContainer.appendChild(renderer.domElement);

      this._renderer = renderer;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#033220');
      this._scene = scene;
    }
  }
  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000,
    );

    camera.position.set(
      3.673020023484643e-22,
      1.7867154222191401,
      0.0000017867948404755238,
    );
    camera.rotation.set(
      -1.5707953267504475,
      2.0557386909291645e-22,
      2.0556473190314887e-16,
    );
    this._camera = camera;
  }
  _setupLight() {
    const color = '#E2E892';
    const light = new THREE.PointLight(color, 5);
    light.position.set(0, 0.723, 0.079);
    this._scene.add(light);
  }
  _setupModel() {
    new GLTFLoader().load('/letter/letter_receive.glb', (gltf) => {
      const model1 = gltf.scene;
      this._scene.add(model1);
    });
  }
  _setupControls() {
    this._orbitControls = new OrbitControls(this._camera, this._divContainer);
  }

  _setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();

    this._clock = new THREE.Clock();
  }

  update() {
    this._orbitControls.update();
  }
  cancle() {
    cancelAnimationFrame(this._id);
  }

  render() {
    this._renderer.render(this._scene, this._camera);

    this.update();
    this._id = requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}
