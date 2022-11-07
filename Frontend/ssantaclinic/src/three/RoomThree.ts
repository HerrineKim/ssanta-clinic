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
      1000,
    );

    camera.position.set(4.866, 3.138, 4.918);
    camera.rotation.set(-32.54, 39.83, 22.23);
    this._camera = camera;
  }
  _setupLight() {
    const color1 = '#5F02B0';
    const color2 = '#BC9DD7';
    const intensity = 2;
    const light1 = new THREE.PointLight(color1, intensity);
    const light2 = new THREE.PointLight(color2, intensity);
    light1.position.set(0.0, 3.595, 4.786);
    light2.position.set(4.241, 3.184, 0);
    this._scene.add(light1);
    this._scene.add(light2);
  }
  _setupModel() {
    new GLTFLoader().load('/room/my_room_base.glb', (gltf) => {
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
