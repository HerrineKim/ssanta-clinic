/* eslint-disable no-undef */
import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export class LoginToHome {
  _model1: any;
  _model3: any;
  _model4: any;
  _santa: any;
  _path: any;
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
  _isStart: any;
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
      0.5,
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
    const divContainer = document.querySelector('#login-to-home-canvas');
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    if (divContainer !== null) {
      divContainer.appendChild(renderer.domElement);

      this._renderer = renderer;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#04003C');
      // scene.fog = new THREE.FogExp2('#080078', 0.1);
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
    new GLTFLoader().load('/login/change_deer.glb', (gltf) => {
      const model1 = gltf.scene;
      // this._scene.add(model1);
      // this._model1 = model1;
      const clips = gltf.animations;
      const mixer = new THREE.AnimationMixer(model1);
      const clip1 = THREE.AnimationClip.findByName(clips, 'Rig.013Action');
      const clip2 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.001');
      const clip3 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.002');
      const clip4 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.003');
      const clip5 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.004');
      const clip6 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.005');
      const clip7 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.006');
      const clip8 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.007');
      const clip9 = THREE.AnimationClip.findByName(clips, 'Rig.013Action.008');
      const clip10 = THREE.AnimationClip.findByName(
        clips,
        'Armature.002Action',
      );
      const clip11 = THREE.AnimationClip.findByName(
        clips,
        'Armature.002Action.001',
      );

      const action1 = mixer.clipAction(clip1);
      const action2 = mixer.clipAction(clip2);
      const action3 = mixer.clipAction(clip3);
      const action4 = mixer.clipAction(clip4);
      const action5 = mixer.clipAction(clip5);
      const action6 = mixer.clipAction(clip6);
      const action7 = mixer.clipAction(clip7);
      const action8 = mixer.clipAction(clip8);
      const action9 = mixer.clipAction(clip9);
      const action10 = mixer.clipAction(clip10);
      const action11 = mixer.clipAction(clip11);
      // const action12 = mixer.clipAction(clip12);

      action1.play();
      action2.play();
      action3.play();
      action4.play();
      action5.play();
      action6.play();
      action7.play();
      action8.play();
      action9.play();
      action10.play();
      action11.play();
      // action12.play();

      this._mixer = mixer;

      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, 0, 0),
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 5),
        new THREE.Vector3(10, 0, 10),
        new THREE.Vector3(20, 0, 20),
        // new THREE.Vector3(20, 5, 20),
        // new THREE.Vector3(25, 10, 25),
        // new THREE.Vector3(30, 20, 30),
      ]);

      this._path = path;
      model1.rotation.y = -Math.PI / 2;
      const parent = new THREE.Object3D();
      parent.add(model1);
      this._scene.add(parent);
      this._santa = parent;
    });
    new GLTFLoader().load('/login/login_env.glb', (gltf) => {
      const model2 = gltf.scene;
      this._model2 = model2;
      this._scene.add(model2);
    });
    // new GLTFLoader().load('/login/ToHomeText.glb', (gltf) => {
    //   const model3 = gltf.scene;
    //   this._model3 = model3;
    //   this._scene.add(model3);
    // });
    new GLTFLoader().load('/login/dongurami.glb', (gltf) => {
      const model4 = gltf.scene;
      model4.position.set(20, 0, 20);
      this._model4 = model4;
      this._scene.add(model4);
    });
    const targetPivot = new THREE.Object3D();
    const target = new THREE.Object3D();
    targetPivot.add(target);
    targetPivot.name = 'targetPivot';
    target.position.set(0, 0, 1);
    this._scene.add(targetPivot);
  }
  _setupControls() {
    this._orbitControls = new OrbitControls(this._camera, this._divContainer);
  }

  _setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();

    this._clock = new THREE.Clock();
    // requestAnimationFrame(this.render.bind(this));
    this._isStart = false;
  }

  update() {
    const delta = this._clock.getDelta();
    this._orbitControls.update();

    if (this._mixer) this._mixer.update(delta);

    const time = this._clock.elapsedTime * 0.1;

    if (this._path) {
      this._isStart = false;
      const currentPosition = new THREE.Vector3();
      const nextPosition = new THREE.Vector3();
      this._path.getPointAt(time % 1, currentPosition);

      this._path.getPointAt((time + 0.00003) % 1, nextPosition);

      this._santa.position.copy(currentPosition);
      this._santa.lookAt(nextPosition.x, nextPosition.y, nextPosition.z);
      this._camera.lookAt(nextPosition.x, nextPosition.y, nextPosition.z);
    }
  }
  _id: any;
  render() {
    this._composer.render();
    this.update();

    this._id = requestAnimationFrame(this.render.bind(this));
  }

  cancle() {
    cancelAnimationFrame(this._id);
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
    this._composer.setSize(width, height);
  }
}
