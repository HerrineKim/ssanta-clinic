import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ItemThree {
  _divContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;

  _orbitControls: any;
  _raycaster: any;

  _model: any;
  _close: any;
  _tree: any;
  _items: any;
  _items2: any;

  _showcase: any;
  _isZoom: any;

  _position: any;
  _inven: any;

  constructor(items: number[]) {
    this._items = items;
    this._items2 = items;
    this._position = [
      [1.8, 3.6, 1.2],
      [2.2, 3.6, 1.2],
      [2.6, 3.6, 1.2],
      [3, 3.6, 1.2],
      [1.8, 2.9, 1.2],
      [2.2, 2.9, 1.2],
      [2.6, 2.9, 1.2],
      [3, 2.9, 1.2],
      [1.8, 2, 1.2],
      [2.2, 2, 1.2],
      [2.6, 2, 1.2],
      [3, 2, 1.2],
      [4, 3.6, 1.2],
      [4.4, 3.6, 1.2],
      [4.8, 3.6, 1.2],
      [5.2, 3.6, 1.2],
      [4, 2.9, 1.2],
      [4.4, 2.9, 1.2],
      [4.8, 2.9, 1.2],
      [5.2, 2.9, 1.2],
      [4, 2, 1.2],
      [4.4, 2, 1.2],
      [4.8, 2, 1.2],
      [5.2, 2, 1.2],
    ];
  }

  setupOnce() {
    this._setupThreeJs();
    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    this._setupPicking();
    this._setupEvents();
  }

  _setupThreeJs() {
    const divContainer = document.querySelector('#item-canvas');
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

    this._camera = camera;
  }
  _setupPicking() {
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

    loader.load('/room/showcase.glb', (gltf) => {
      count += 1;
      const model: any = gltf.scene;
      this._scene.add(model);
      const box = new THREE.Box3().setFromObject(model);
      const sizeBox = box.getSize(new THREE.Vector3()).length();

      const centerBox = box.getCenter(new THREE.Vector3());
      const direction = new THREE.Vector3(0, 1, 0);
      direction.applyAxisAngle(
        new THREE.Vector3(1, 0, 0),
        THREE.MathUtils.degToRad(90),
      );
      const halfSizeModel = sizeBox * 0.5;
      const halfFov = THREE.MathUtils.degToRad(this._camera.fov * 0.5);
      const distance = halfSizeModel / Math.tan(halfFov);

      const newPosition = new THREE.Vector3().copy(
        direction.multiplyScalar(distance).add(centerBox),
      );
      this._camera.position.copy(newPosition);
      this._camera.lookAt(centerBox.x, centerBox.y, centerBox.z);

      this._orbitControls.target.set(newPosition);
      model.position.setZ(model.position.z + 1);
      this._showcase = model;
    });

    // item load 부분
    const items: any[] = [];
    // 유저가 갖고있는 아이템 정보(리스트)에 맞게 아이템 로드
    this._items.forEach((item: number, index: number) => {
      // console.log('item:', item);
      // console.log(index);
      if (item !== 0) {
        loader.load(`/items/${item}.glb`, (gltf) => {
          count += 1;
          // console.log(index);
          const model = gltf.scene;
          model.traverse((child) => {
            child.name = String(item);
          });
          // console.log(model);
          // console.log(`${index}: `, model);
          if (
            (1 <= item && item <= 8) ||
            (21 <= item && item <= 27) ||
            item === 17
          ) {
            model.scale.set(0.012, 0.012, 0.012);
          } else if (item === 9 || item === 36) {
            model.scale.set(0.015, 0.015, 0.015);
          } else if ((10 <= item && item <= 16) || item === 18) {
            model.scale.set(0.008, 0.008, 0.008);
          } else if (item === 20) {
            model.scale.set(0.011, 0.011, 0.011);
          } else if ([19, 28, 29, 32, 33].includes(item)) {
            model.scale.set(0.01, 0.01, 0.01);
          } else if (item === 30) {
            model.scale.set(0.012, 0.012, 0.012);
          } else if (item === 31) {
            model.scale.set(0.02, 0.02, 0.02);
          } else if (item === 34) {
            model.scale.set(0.023, 0.023, 0.023);
          } else if (item === 35) {
            model.scale.set(0.014, 0.014, 0.014);
          } else if (item === 37) {
            model.scale.set(0.02, 0.02, 0.02);
          } else if (item === 38) {
            model.scale.set(0.008, 0.008, 0.008);
          } else if (40 <= item && item <= 46) {
            model.scale.set(0.06, 0.06, 0.04);
          } else if (item === 48 || item === 39) {
            model.scale.set(0.05, 0.05, 0.05);
          } else if (item === 47 || item === 50 || item === 51) {
            model.scale.set(0.03, 0.03, 0.03);
          } else if (item === 52 || item === 54) {
            model.scale.set(0.07, 0.07, 0.07);
          } else if (item === 53) {
            model.scale.set(0.09, 0.09, 0.09);
          } else if (item === 55) {
            model.scale.set(0.04, 0.04, 0.04);
          }
          const position = this._position[`${index}`];

          model.position.set(position[0], position[1], position[2]);
          items[index] = model;
          this._scene.add(model);
        });
      }
    });
    const itemCount = this._items.length;
    this._items = items;

    const loadPage = setInterval(() => {
      console.log('로딩중');

      if (count === itemCount + 1) {
        const loading = document.querySelector(
          '#item-canvas .loading',
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

    this._orbitControls.enabled = false;
  }
  _onClick(event: any) {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    const xy = {
      x: (event.offsetX / width) * 2 - 1,
      y: -(event.offsetY / height) * 2 + 1,
    };

    this._raycaster.setFromCamera(xy, this._camera);

    const itemTarget =
      this._items.length > 1
        ? this._raycaster.intersectObjects(this._items)
        : this._raycaster.intersectObject(this._items);
    if (itemTarget.length > 0) {
      let object = itemTarget[0].object;
      // tree 최상위 찾기
      while (object.parent) {
        object = object.parent;
        if (!(object instanceof THREE.Mesh)) {
          break;
        }
      }
      const result = confirm('지우겠습니까?');
      if (result) {
        object.removeFromParent();
      }
    }
  }
}
