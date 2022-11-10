/* eslint-disable no-undef */
import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export class LoginToHome {
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
      0.6,
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
      scene.background = new THREE.Color('#080078');
      scene.fog = new THREE.FogExp2('#080078', 0.4);
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
    const color2 = '#00D9FF';
    const light1 = new THREE.PointLight(color1, 1);
    const light2 = new THREE.PointLight(color2, 2.3);
    const light3 = new THREE.PointLight(color1, 1);
    light1.position.set(0, 1.212, 1.951);
    light2.position.set(-31.85, 0.0, 0);
    light3.position.set(-0.633, 0.502, -0.436);
    this._scene.add(light1);
    this._scene.add(light2);
    this._scene.add(light3);
  }
  _setupModel() {
    new GLTFLoader().load('/login/login_to_home.glb', (gltf) => {
      const model1 = gltf.scene;
      this._scene.add(model1);

      const clips = gltf.animations;
      const mixer = new THREE.AnimationMixer(model1);
      const clip1 = THREE.AnimationClip.findByName(clips, 'Armature.001Action');
      const clip2 = THREE.AnimationClip.findByName(clips, 'Armature.002Action');
      const clip3 = THREE.AnimationClip.findByName(clips, 'Armature.004Action');
      const clip4 = THREE.AnimationClip.findByName(clips, 'RigAction.002');
      const clip5 = THREE.AnimationClip.findByName(clips, 'RigAction.003');
      const clip6 = THREE.AnimationClip.findByName(clips, 'RigAction.004');
      const clip7 = THREE.AnimationClip.findByName(clips, 'RigAction.005');
      const clip8 = THREE.AnimationClip.findByName(clips, 'RigAction.006');
      const clip9 = THREE.AnimationClip.findByName(clips, 'RigAction.007');
      const clip10 = THREE.AnimationClip.findByName(clips, 'RigAction.008');
      const clip11 = THREE.AnimationClip.findByName(clips, 'RigAction.009');
      const clip12 = THREE.AnimationClip.findByName(clips, 'RigAction.010');
      const clip13 = THREE.AnimationClip.findByName(clips, 'RigAction.011');
      const clip14 = THREE.AnimationClip.findByName(clips, 'RigAction.012');
      const clip15 = THREE.AnimationClip.findByName(clips, 'RigAction.013');
      const clip16 = THREE.AnimationClip.findByName(clips, 'RigAction.014');
      const clip17 = THREE.AnimationClip.findByName(clips, 'RigAction.015');
      const clip18 = THREE.AnimationClip.findByName(clips, 'RigAction.016');
      const clip19 = THREE.AnimationClip.findByName(clips, 'RigAction.017');
      const clip20 = THREE.AnimationClip.findByName(clips, 'RigAction.018');
      const clip21 = THREE.AnimationClip.findByName(clips, 'RigAction.019');
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
      const action12 = mixer.clipAction(clip12);
      const action13 = mixer.clipAction(clip13);
      const action14 = mixer.clipAction(clip14);
      const action15 = mixer.clipAction(clip15);
      const action16 = mixer.clipAction(clip16);
      const action17 = mixer.clipAction(clip17);
      const action18 = mixer.clipAction(clip18);
      const action19 = mixer.clipAction(clip19);
      const action20 = mixer.clipAction(clip20);
      const action21 = mixer.clipAction(clip21);
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
      action12.play();
      action13.play();
      action14.play();
      action15.play();
      action16.play();
      action17.play();
      action18.play();
      action19.play();
      action20.play();
      action21.play();

      this._mixer = mixer;

      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(2000, -1100, -3000),
        new THREE.Vector3(-500, -900, 500),
        new THREE.Vector3(-1500, -800, -1500),
        new THREE.Vector3(1500, -700, -1500),

        new THREE.Vector3(1500, -600, 1500),
        new THREE.Vector3(-1500, -500, 1500),
        new THREE.Vector3(-1500, -400, -1500),
        new THREE.Vector3(1500, -300, -1500),

        new THREE.Vector3(1500, -200, 1500),
        new THREE.Vector3(-1500, 1500, 3500),
      ]);

      this._path = path;
      const points = path.getPoints(1000);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0x555555 });
      const pathLine = new THREE.Line(geometry, material);
      this._scene.add(pathLine);

      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(7000, 7000),
        new THREE.MeshStandardMaterial({ color: 0x4f4f4f }),
      );
      floor.receiveShadow = true;
      floor.position.y = -1100;
      floor.rotation.x = -Math.PI / 2;
      this._scene.add(floor);

      //this._bird = model;

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
    this._composer.render();

    this.update();
    requestAnimationFrame(this.render.bind(this));
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
