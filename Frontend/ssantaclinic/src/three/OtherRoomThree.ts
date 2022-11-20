/* eslint-disable no-undef */
// import { throws } from 'assert';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class OtherRoomThree {
  _divContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;
  _mixer: any;
  _clock: any;
  _orbitControls: any;
  _raycaster: any;

  _model: any;

  _tree: any;

  _id: any;
  _treeaddres: string | null;

  constructor(tree: string | null) {
    this._treeaddres = tree;
    this._setupThreeJs();
    this._setupCamera();
    this._setupLight();
    this._setupModel();

    this._setupControls();
    this._setupPicking();
    this._setupEvents();
  }
  _setupThreeJs() {
    const divContainer = document.querySelector('#other-room-canvas');
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
  _setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();
  }

  update() {
    this._orbitControls.update();
  }

  cancle() {
    cancelAnimationFrame(this._id);
  }

  render() {
    // console.log(this._camera.position);
    this._renderer.render(this._scene, this._camera);
    this.update();
    // console.log('!');

    this._id = requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );

    camera.position.set(7.382013649990576, 5.62568011018224, 7.322713694518906);
    camera.rotation.set(
      -0.8316913746184987,
      0.5939123123275776,
      0.5506322260223571,
    );
    this._camera = camera;
  }
  _setupPicking() {
    // raycaster로 뭘 눌렀는지 판단해야함

    console.log('setpupicking');
    const raycaster = new THREE.Raycaster();

    this._divContainer.addEventListener('click', this._onClick.bind(this));
    this._raycaster = raycaster;
  }
  _setupLight() {
    const ambientLight = new THREE.AmbientLight(0xfff8ea, 1);
    this._scene.add(ambientLight);

    const color1 = '#B490C1';
    const color2 = '#CCA333';
    const light1 = new THREE.SpotLight(color1, 1.3);
    const light2 = new THREE.PointLight(color2, 1.5);
    light1.position.set(12.32, 17.978, 11.404);
    light2.position.set(-0.22, 1.178, 4.743);
    this._scene.add(light1);
    this._scene.add(light2);
  }
  _setupModel() {
    let count = 0;

    const loader = new GLTFLoader();
    loader.load('/room/room_change.glb', (gltf) => {
      count += 1;
      const model = gltf.scene;

      this._scene.add(model);
      const children: any[] = [];
      model.traverse((child) => {
        children.push(child);
      });
      // console.log(children);
      this._model = model;
    });

    if (this._treeaddres !== null && this._treeaddres !== '') {
      loader.load(`${this._treeaddres}`, (gltf) => {
        count += 1;
        const model: any = gltf.scene;
        this._scene.add(model);
      });
    } else {
      loader.load('/room/tree.glb', (gltf) => {
        count += 1;
        const model: any = gltf.scene;
        this._scene.add(model);
      });
    }

    const loadPage = setInterval(() => {
      if (count === 2) {
        const loading = document.querySelector(
          '#other-room-canvas .loading',
        ) as HTMLElement | null;

        if (loading !== null) {
          loading.style.display = 'none';
        }

        clearInterval(loadPage);
      }
    }, 1000);
  }
  _setupControls() {
    this._orbitControls = new OrbitControls(this._camera, this._divContainer);
    this._orbitControls.target.set(0, 2, 0);
    this._orbitControls.enabled = false;
    this._orbitControls.enableDamping = true;
  }
  _onClick(event: any) {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    const xy = {
      x: (event.offsetX / width) * 2 - 1,
      y: -(event.offsetY / height) * 2 + 1,
    };

    this._raycaster.setFromCamera(xy, this._camera);

    const targets = this._raycaster.intersectObject(this._model);
    // console.log('raycaaster target:', targets);

    if (targets.length > 0) {
      // console.log(targets);
      // console.log('scenenumber 1');
      if (targets[0].object.parent.name === 'advaent_calendar') {
        this._setupCalendar();
      } else {
        this._removeCalendar();
      }
    } else {
      this._removeCalendar();
    }
  }

  _setupCalendar() {
    const calendarAlert = document.querySelector(
      '.calendar',
    ) as HTMLElement | null;
    // console.log(alert);
    if (calendarAlert !== null) {
      console.log('calendarAlert');
      calendarAlert.style.display = 'flex';
    }
  }
  _removeCalendar() {
    const calendarAlert = document.querySelector(
      '.calendar',
    ) as HTMLElement | null;
    // console.log(memoryAlert);
    if (calendarAlert !== null) {
      calendarAlert.style.display = 'none';
    }
  }
}
