/* eslint-disable no-undef */
import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

export class LoginThree {
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
    this._setupPostprocess();
    this._setupControls();
    this._setupEvents();
    // this._setupEvents2();
  }
  _setupPostprocess() {
    const renderPass = new RenderPass(this._scene, this._camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3,
      1,
      0.1,
    );
    const composer = new EffectComposer(this._renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    this._bloomPass = bloomPass;
    this._composer = composer;
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
      scene.background = new THREE.Color('#04003C');
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

    // camera.position.set(-0.004, 0.05, 0.7);
    // camera.rotation.set(-26.07, -0.19, -0.09);
    camera.position.set(-1.137, 1.055, 1.56);
    camera.rotation.set(-34.06, -31.13, -19.27);
    this._camera = camera;
  }
  _setupLight() {
    const color1 = '#FFFFFF';
    const color2 = '#FFFFFF';
    const light1 = new THREE.PointLight(color1, 1);
    const light2 = new THREE.PointLight(color2, 1);
    const light3 = new THREE.PointLight(color1, 1);
    light1.position.set(0, 1.212, 1.951);
    light2.position.set(-31.85, 0.0, 0);
    light3.position.set(-0.633, 0.502, -0.436);
    this._scene.add(light1);
    this._scene.add(light2);
    this._scene.add(light3);
  }
  _setupModel() {
    new GLTFLoader().load('/login/santa_elf_text_deer.glb', (gltf) => {
      const model1 = gltf.scene;
      this._scene.add(model1);

      const clips = gltf.animations;
      const mixer = new THREE.AnimationMixer(model1);
      const clip1 = THREE.AnimationClip.findByName(
        clips,
        'Armature|mixamo.com|Layer0',
      );
      const clip2 = THREE.AnimationClip.findByName(
        clips,
        'Armature.001|mixamo.com|Layer0',
      );
      const clip3 = THREE.AnimationClip.findByName(
        clips,
        'Armature|mixamo.com|Layer0.001',
      );
      const action1 = mixer.clipAction(clip1);
      const action2 = mixer.clipAction(clip2);
      const action3 = mixer.clipAction(clip3);
      action1.play();
      action2.play();
      action3.play();

      this._mixer = mixer;
    });
    new GLTFLoader().load('/login/login_env.glb', (gltf) => {
      const model2 = gltf.scene;
      this._model2 = model2;
      this._scene.add(model2);
    });
  }
  _setupControls() {
    this._orbitControls = new OrbitControls(this._camera, this._divContainer);
  }

  _setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();

    this._clock = new THREE.Clock();
    // requestAnimationFrame(this.render.bind(this));
  }

  cancle() {
    cancelAnimationFrame(this._id);
  }

  update() {
    const delta = this._clock.getDelta();
    this._orbitControls.update();

    if (this._mixer) this._mixer.update(delta);
  }

  render() {
    // console.log(1);
    // this._renderer.render(this._scene1, this._camera);
    this._composer.render();
    // this._finalComposer.render();
    this.update();
    this._id = requestAnimationFrame(this.render.bind(this));
  }
  // render2() {
  //   this._renderer.render(this._scene, this._camera);
  //   // this._composer.render();
  //   this.update();
  //   requestAnimationFrame(this.render2.bind(this));
  // }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
    this._composer.setSize(width, height);
  }
}
