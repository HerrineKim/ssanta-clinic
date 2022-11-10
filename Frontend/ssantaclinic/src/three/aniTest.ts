import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export class aniTest {
  _bird: any;
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
  }

  _setupPostprocess() {
    const renderPass = new RenderPass(this._scene, this._camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0,
      0.1,
      0.1,
    );
    const composer = new EffectComposer(this._renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    this._bloomPass = bloomPass;
    this._composer = composer;
  }

  _setupThreeJs() {
    const divContainer = document.querySelector('#test-canvas');
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    if (divContainer !== null) {
      divContainer.appendChild(renderer.domElement);
      this._renderer = renderer;

      const scene = new THREE.Scene();
      const axesHelper = new THREE.AxesHelper(20);
      scene.add(axesHelper);
      this._scene = scene;
    }
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      12000,
    );

    camera.position.set(0, 1000, 3000);
    this._camera = camera;
  }

  _setupLight() {
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 5200, 0);
    spotLight.angle = Math.PI / 7;
    spotLight.penumbra = 0.1;
    spotLight.distance = 7000;

    spotLight.castShadow = true;
    const shadow = spotLight.shadow;
    shadow.mapSize.width = 1024;
    shadow.mapSize.height = 1024;
    shadow.camera.near = 600;
    shadow.camera.far = 1300;

    this._scene.add(spotLight);
  }

  _setupModel() {
    new GLTFLoader().load('/phoenix_bird.glb', (gltf) => {
      const model = gltf.scene;
      this._scene.add(model);

      model.traverse((obj3d) => {
        obj3d.castShadow = true;
        obj3d.receiveShadow = true;

        // if (obj3d.material) {
        //   obj3d.material.depthWrite = true;
        //   obj3d.material.alphaTest = 0.5;

        //   if (obj3d.material.map) {
        //     obj3d.material.map.encoding = THREE.sRGBEncoding;
        //   }
        // }
      });

      const clips = gltf.animations;
      const mixer = new THREE.AnimationMixer(model);
      const clip = clips[0];
      const action = mixer.clipAction(clip);
      action.play();
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

      model.rotation.y = -Math.PI / 2;
      const parent = new THREE.Object3D();
      parent.add(model);
      this._scene.add(parent);
      this._bird = parent;
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

    const time = this._clock.oldTime * 0.00003;

    if (this._path) {
      const currentPosition = new THREE.Vector3();
      const nextPosition = new THREE.Vector3();

      this._path.getPointAt(time % 1, currentPosition);
      this._path.getPointAt((time + 0.001) % 1, nextPosition);

      this._bird.position.copy(currentPosition);
      this._bird.lookAt(nextPosition.x, nextPosition.y, nextPosition.z);
    }
  }

  render() {
    //this._renderer.render(this._scene, this._camera);
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
