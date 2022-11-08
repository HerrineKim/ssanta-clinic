import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'; // fps 표시하기위 한 모듈
//충돌 감지 를 위한 모듈들
import { Octree } from 'three/examples/jsm/math/Octree.js';
// import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { Mesh, Vector3 } from 'three';
import { gsap } from 'gsap';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { threadId } from 'worker_threads';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import axios from 'axios';

// import { chdir } from 'process';

// type RGB = `rgb(${number}, ${number}, ${number})`;
// type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
// type HEX = `#${string}`;

// type Color = RGB | RGBA | HEX;

// 오브젝트 3d 구성하는 요소들의 이름목록 표시
function dumpObject(obj: any, lines: string[], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  const word = `${prefix}${prefix ? localPrefix : ''}
  ${obj.name || '*no-name*'} [${obj.type}]`;
  lines.push(word);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx: number = obj.children.length - 1;
  obj.children.forEach((child: Mesh, ndx: number) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

export class ShopCanvas {
  _canvasContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;
  _controls: any;
  _fps: any;
  _previousTime: any;
  _raycaster: any;
  _model: any;
  _items: any;
  _close: any;
  _position: any;
  _isAlert: any;

  constructor() {
    this._position = [
      [3, 7.5, 7],
      [1.5, 7.5, 7],
      [0, 7.5, 7],
      [-1.5, 7.5, 7],
      [-3, 7.5, 7],
      [-4.5, 7.5, 7],
      [3, 5.5, 6.3],
      [1.5, 5.5, 6.3],
      [0, 5.5, 6.3],
      [-1.5, 5.5, 6.3],
    ];
    console.log('constructor');
    const canvasContainer = document.querySelector('#shop-canvas');
    this._canvasContainer = canvasContainer;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer?.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;

    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // this._setupOctree();
    this._setupLight();
    this._setupModel();
    this._setupCamera();
    this._setupControls();
    this._setupPicking();
    // this._setupHover();

    window.onresize = this.resize.bind(this);
    this.resize();
  }

  render(time: number) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);

    requestAnimationFrame(this.render.bind(this));
  }

  update(time: number) {
    time *= 0.001; // second unit

    this._controls.update();
    // this._fps.update();

    // console.log(this._camera.position);
    // console.log(this._camera);

    this._previousTime = time;
  }

  // scene 1을 위한 controls
  _setupControls() {
    this._controls = new OrbitControls(this._camera, this._canvasContainer);

    // //orbicontrol shift 기능 없애기
    // this._controls.enablePan = false;

    // //마우스 회전 부드럽게
    // this._controls.enableDamping = true;

    const stats = Stats();
    this._canvasContainer.appendChild(stats.dom);
    this._fps = stats;
    console.log('setoucontrols111');
  }

  _setupModel() {
    const inven: any[] = [];
    const group: any = [];
    const loader = new GLTFLoader();

    // showcase load 부분 => 나중에 showcase 파일 변경
    loader.load('/shop/shop2.glb', (gltf) => {
      console.log(gltf);
      const model: any = gltf.scene;
      model.scale.set(0.05, 0.05, 0.05);
      console.log('showcase:', model);
      this._scene.add(model);
    });

    // item load 부분
    const items: any[] = [];
    // 모든 아이템 load
    for (let i = 1; i < 9; i++) {
      loader.load(`/main/${i}.glb`, (gltf) => {
        // console.log(index);
        const model = gltf.scene;
        model.name = `${i}`;
        model.traverse((child) => {
          child.name = `${i}`;
        });
        // console.log(`${index}: `, model);
        model.scale.set(0.03, 0.03, 0.03);
        const position = this._position[`${i - 1}`];
        model.position.set(position[0], position[1], position[2]);
        items.push(model);
        this._scene.add(model);
      });
    }
    this._items = items;

    // x button load
    // loader.load('main/close.glb', (gltf) => {
    //   const model: any = gltf.scene;
    //   this._close = model;

    //   // model.position.set(10, 5, -4.5);
    //   model.position.set(1, 1, 1);
    //   model.name = 'close';
    // });
  }

  _setupPicking() {
    // raycaster로 뭘 눌렀는지 판단해야함

    console.log('setpupicking');
    const raycaster = new THREE.Raycaster();

    this._canvasContainer.addEventListener('click', this._onClick.bind(this));
    this._raycaster = raycaster;
  }

  //클릭 함수
  _onClick(event: any) {
    console.log('click!!!');

    const width = this._canvasContainer.clientWidth;
    const height = this._canvasContainer.clientHeight;
    // console.log('click event:', event);
    // console.log(event.offsetX);
    // console.log(event.offsetY);

    const xy = {
      x: (event.offsetX / width) * 2 - 1,
      y: -(event.offsetY / height) * 2 + 1,
    };

    //xy : coords — 2D coordinates of the mouse, in normalized device coordinates (NDC)---X
    //  and Y components should be between -1 and 1.
    this._raycaster.setFromCamera(xy, this._camera);

    console.log('click!!', this._model);

    const targets = this._raycaster.intersectObjects(this._items);
    console.log('raycaaster target:', targets);
    if (targets.length > 0) {
      this._setupAlert(targets[0].object.name);
    } else {
      this._removeAlert();
    }
  }

  _setupRotate(event: any) {
    event.preventDefault();
    // console.log('rotate', this._tree[0]);
    // this._tree[0].rotateY(event.deltaY * 0.0005);
  }

  _removeAlert() {
    const alert = document.querySelector('.alert') as HTMLElement | null;
    console.log(alert);
    if (alert !== null) {
      alert.style.display = 'none';
    }
    this._isAlert = false;
  }
  _setupAlert(itemId: string) {
    const alert = document.querySelector('.alert') as HTMLElement | null;
    console.dir(alert);
    if (alert !== null) {
      alert.dataset.code = itemId;
    }
    if (alert !== null) {
      console.log('alert');
      alert.style.display = 'flex';
    }
    this._isAlert = true;
  }

  _removeModal() {
    const modal = document.querySelector('.modal') as HTMLElement | null;
    if (modal !== null) {
      modal.style.display = 'none';
    }
  }
  _setupModal() {
    const modal = document.querySelector('.modal') as HTMLElement | null;
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    console.log('camera');
    camera.position.set(0, 9, -20);
    // camera.lookAt(0, 9, -20);
    // camera.getWorldDirection(new THREE.Vector3(0, 0, 0));
    // camera.lookAt(target);

    // const cameraHelper = new THREE.CameraHelper(camera);
    // this._scene.add(cameraHelper);

    // console.log('setupcamera:', this._model);  //undefined
    // const camera = this._model.children[1];
    this._camera = camera;
  }

  _addPointLight(x: number, y: number, z: number, helperColr: number) {
    const color = 0xffffff;
    const intensity = 0.5;

    const pointLight = new THREE.PointLight(color, intensity, 2000);
    pointLight.position.set(x, y, z);

    this._scene.add(pointLight);

    const pointLightHelper = new THREE.PointLightHelper(
      pointLight,
      10,
      helperColr,
    );
    this._scene.add(pointLightHelper);
  }

  _setupLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    this._scene.add(ambientLight);

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.2);
    shadowLight.position.set(20, 50, 20);
    shadowLight.target.position.set(0, 0, 0);
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      shadowLight,
      10,
    );
    this._scene.add(directionalLightHelper);

    this._scene.add(shadowLight);
    this._scene.add(shadowLight.target);

    //그림자 광원처리
    shadowLight.castShadow = true;
    shadowLight.shadow.mapSize.width = 1024;
    shadowLight.shadow.mapSize.height = 1024;
    shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 70;
    shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -70;
    shadowLight.shadow.camera.near = 10;
    shadowLight.shadow.camera.far = 90;
    shadowLight.shadow.radius = 5;
    const shadowCameraHelper = new THREE.CameraHelper(
      shadowLight.shadow.camera,
    );
    this._scene.add(shadowCameraHelper);
  }

  resize() {
    const width = this._canvasContainer.clientWidth;
    const height = this._canvasContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}
