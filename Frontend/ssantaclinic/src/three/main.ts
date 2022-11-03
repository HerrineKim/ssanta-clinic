import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'; // fps 표시하기위 한 모듈
//충돌 감지 를 위한 모듈들
import { Octree } from 'three/examples/jsm/math/Octree.js';
// import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { Mesh } from 'three';
import { gsap } from 'gsap';
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

export class MainCanvas {
  _canvasContainer: any;
  _renderer: any;
  _scene: any;
  _worldOctree: any;
  _controls: any;
  _camera: any;
  _fps: any;
  _pressedKeys: any;
  _currentAnimationAction: any;
  _animationMap: any;
  _mixer: any;
  _capsule: any;
  _boxHelper: any;
  _model: any;
  _raycaster3: any;
  _raycaster2: any;
  _raycaster: any;
  _group: any;
  _isAlert: boolean;

  _previousTime: any;
  _requestId: any;
  _isTreeModal: boolean;
  _tree: any;
  _items: number[];
  _position: any[];

  constructor(items: number[]) {
    //(9, 0, -4.5);
    this._position = [
      [7, 1, 1],
      [7.5, 1, 1],
      [8, 2, -2.5],
      [6, 3, -2.5],
      [7, 3, -2.5],
      [8, 3, -2.5],
      [6, 4, -2.5],
      [7, 4, -2.5],
      [8, 4, -2.5],
      [9, 4, -2.5],
    ];
    this._items = items;
    this._isAlert = false;
    this._isTreeModal = false;
    // const divContainer = document.querySelector('#webgl-container');
    // this._divContainer = divContainer;
    console.log('constructor');
    const canvasContainer = document.querySelector('#main-canvas');
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
    // this._setupClick();
    this._setupHover();

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

    // 모델이 움직일때마다 모델박스 바껴야 하므로
    if (this._boxHelper) {
      this._boxHelper.update();
    }

    this._fps.update();

    this._previousTime = time;
  }

  _setupOctree(model: any) {
    this._worldOctree = new Octree();
    this._worldOctree.fromGraphNode(model);
    console.dir(this._worldOctree);
  }

  _setupControls() {
    this._controls = new OrbitControls(this._camera, this._canvasContainer);

    //orbicontrol shift 기능 없애기
    this._controls.enablePan = false;

    //마우스 회전 부드럽게
    this._controls.enableDamping = true;

    const stats = Stats();
    this._canvasContainer.appendChild(stats.dom);
    this._fps = stats;
  }

  _setupModel() {
    const group: any = [];
    const loader = new GLTFLoader();
    // 안눌러도 되는 맵 로드
    loader.load('main/santa.glb', (gltf) => {
      const model = gltf.scene;
      this._model = model;
      this._scene.add(model);
      // console.log('model:', model);

      model.traverse((child) => {
        // console.log(child);
        // model은 그림자 생성 true

        if (child instanceof THREE.PointLight) {
          child.intensity = 2;
        }
        if (child instanceof THREE.Group) {
          // console.log(child, child.name);
          group.push(child);
        }
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // console.log('traverse child: ', child);
          if (child.parent) {
            child.name = child.parent.name;
          }
        }
      });

      this._setupOctree(model);
      // console.log(dumpObject(model, [], true, '').join('\n'));
      group.push(model);
    });

    loader.load('main/camera.glb', (gltf) => {
      const model: any = gltf.scene;

      console.log(model);
    });

    loader.load('main/showcase.glb', (gltf) => {
      const model: any = gltf.scene;
      model.traverse((child: any) => {
        if (child instanceof THREE.Group) {
          // console.log(child, child.name);
          group.push(child);
        }
      });
      model.scale.set(20, 20, 20);
      model.position.set(9, 0, -4.5);
      model.children[0].children[0].children[0].children[0].children[0].material.color.set(
        0xff00ff,
      );
      // this._scene.add(model);
      console.dir(model);
      console.log('showcase:', model);
    });

    loader.load('main/lowtree.glb', (gltf) => {
      const tree: any[] = [];
      const model: any = gltf.scene;
      model.traverse((child: any) => {
        if (child instanceof THREE.Group) {
          // console.log(child, child.name);
          group.push(child);
        }
      });
      model.position.set(5, 0, -4.5);
      model.name = 'tree';
      model.traverse((child: THREE.Object3D) => {
        tree.push(child);
        child.name = 'tree';
      });
      this._scene.add(model);
      console.log('treegltf:', model);
      this._tree = tree;
    });

    // 유저가 갖고있는 아이템 정보(리스트)에 맞게 아이템 로드
    this._items.forEach((item, index) => {
      // console.log('item:', item);
      console.log(index);
      loader.load(`main/${item}.glb`, (gltf) => {
        console.log(index);
        const model = gltf.scene;
        console.log(`${index}: `, model);
        const position = this._position[`${index}`];
        model.position.set(position[0], position[1], position[2]);
        this._scene.add(model);
      });
    });

    // scene에 있는 모든 3dobj 검사

    this._group = group;
    console.log(group);
  }

  _setupHover() {
    const raycaster3 = new THREE.Raycaster();
    this._canvasContainer.addEventListener(
      'mouseover',
      this._setTest.bind(this),
    );
    this._raycaster3 = raycaster3;
  }
  _setTest(event: any) {
    const width = this._canvasContainer.clientWidth;
    const height = this._canvasContainer.clientHeight;
    const xy = {
      x: (event.offsetX / width) * 2 - 1,
      y: -(event.offsetY / height) * 2 + 1,
    };
    this._raycaster3.setFromCamera(xy, this._camera);

    const cars: any = [];
    this._scene.traverse((obj3d: any) => {
      if (obj3d.name === 'car') {
        cars.push(obj3d);
      }
    });

    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      const targets = this._raycaster3.intersectObject(car, true);
      if (targets.length > 0) {
        console.log('!!!');
        return;
      }
    }
  }

  _setupPicking() {
    // raycaster로 뭘 눌렀는지 판단해야함
    const raycaster = new THREE.Raycaster();
    this._canvasContainer.addEventListener('click', this._onClick.bind(this));
    this._raycaster = raycaster;
  }
  //클릭 함수
  _onClick(event: any) {
    const width = this._canvasContainer.clientWidth;
    const height = this._canvasContainer.clientHeight;
    console.log(event);
    console.log(event.offsetX);
    console.log(event.offsetY);

    const xy = {
      x: (event.offsetX / width) * 2 - 1,
      y: -(event.offsetY / height) * 2 + 1,
    };
    console.log(xy);
    //xy : coords — 2D coordinates of the mouse, in normalized device coordinates (NDC)---X
    //  and Y components should be between -1 and 1.
    this._raycaster.setFromCamera(xy, this._camera);

    // 모든 3d 돌면서 더블클릭된 객체 zoomfit
    console.log('click함수 실행:', this._group);
    const targets = this._raycaster.intersectObjects(this._group);
    // const target = this._raycaster.intersectObject(this._group[11]);
    // console.log('target : ', target);
    console.log('targets: ', targets);
    if (targets.length > 0) {
      if (targets[0].object.name === 'tree') {
        console.log('tree!!!!!');
        // 트리 줌인 후에 꾸밀수 있도록 인벤토리
        this._zoomFit(targets[0].object.parent, 60);
        setTimeout(() => {
          this._setupTreeModal();
        }, 1600);
      } else if (targets[0].object.name === 'house') {
        console.log('house!!!!!!!!');
        this._zoomFit(targets[0].object.parent, 60);
        setTimeout(() => {
          this._setupAlert();
        }, 1500);
      } else if (targets[0].object.name === 'ball1') {
        console.log('ball1!!!!!!!!!!!!!!');
      } else {
        if (this._isAlert) {
          this._removeAlert();
        }

        if (this._isTreeModal) {
          this._removeTreeModal();
        }

        this._removeModal();
        setTimeout(() => {
          this._zoomFit(this._model, 60);
        }, 100);
      }
    } else {
      if (this._isAlert) {
        this._removeAlert();
      }

      if (this._isTreeModal) {
        this._removeTreeModal();
      }

      this._removeModal();
      setTimeout(() => {
        this._zoomFit(this._model, 60);
      }, 100);
    }

    const targets2 = this._raycaster.intersectObjects(this._tree);
    if (targets2.length > 0) {
      let object = targets2[0].object;
      while (object.parent) {
        object = object.parent;
        if (object instanceof THREE.Group) {
          break;
        }
      }
      console.log('parent:', object);
      this._zoomFit(object, 60);
    }
  }

  _setupTreeModal() {
    const treeModal = document.querySelector(
      '.treemodal',
    ) as HTMLElement | null;
    if (treeModal !== null) {
      treeModal.style.display = 'flex';
    }
    this._isTreeModal = true;
  }

  _removeTreeModal() {
    const treeModal = document.querySelector(
      '.treemodal',
    ) as HTMLElement | null;
    if (treeModal !== null) {
      treeModal.style.display = 'none';
    }
    this._isTreeModal = false;
  }

  _removeAlert() {
    const alert = document.querySelector('.alert') as HTMLElement | null;
    console.log(alert);
    if (alert !== null) {
      alert.style.display = 'none';
    }
    this._isAlert = false;
  }
  _setupAlert() {
    const alert = document.querySelector('.alert') as HTMLElement | null;
    console.log(alert);
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

  // https://www.youtube.com/watch?v=OgC3kGKKb7A
  // viewangle 은 수직축으로의 각도 90 도면 평면과 평행하게 바라봄. 0 도면 위에서 바라봄.
  _zoomFit(object3d: any, viewAngle: number) {
    // console.log('zoomfit object3d: ', object3d);
    //box 는 객체를 담는 최소크기 박스
    const box = new THREE.Box3().setFromObject(object3d);
    //box를통해 얻을 수있는 가장 긴 모서리 길이
    const sizeBox = box.getSize(new THREE.Vector3()).length();
    //box 중심점 ;; 카메라가 바라보는 곳으로 설정하면 좋음
    const centerBox = box.getCenter(new THREE.Vector3());

    const direction = new THREE.Vector3(0, 1, 0);
    direction.applyAxisAngle(
      new THREE.Vector3(1, 0, 0),
      THREE.MathUtils.degToRad(viewAngle),
    );

    const halfSizeModel = sizeBox * 0.5;
    const halfFov = THREE.MathUtils.degToRad(this._camera.fov * 0.5);
    const distance = halfSizeModel / Math.tan(halfFov);

    const newPosition = new THREE.Vector3().copy(
      direction.multiplyScalar(distance).add(centerBox),
    );

    // this._camera.position.copy(newPosition);
    // this._controls.target.copy(centerBox);

    //애니메이션 라이브러리 gsap
    //카메라 위치변경
    gsap.to(this._camera.position, {
      duration: 1.5,
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
    });

    //this._controls.target.copy(centerBox);
    // console.log(this._controls);
    // console.log(this._controls.target);
    // 타겟위치변경
    gsap.to(this._controls.target, {
      duration: 0.5,
      x: centerBox.x,
      y: centerBox.y,
      z: centerBox.z,
      onUpdate: () => {
        //애니메이션 수행중에 깜빡거리는 현상 방지
        this._camera.lookAt(
          this._controls.target.x,
          this._controls.target.y,
          this._controls.target.z,
        );
      },
    });
  }

  //zoomout 함수
  _zoomOut(object3d: any, viewAngle: number) {
    // console.log('zoomfit object3d: ', object3d);
    //box 는 객체를 담는 최소크기 박스
    const box = new THREE.Box3().setFromObject(object3d);
    //box를통해 얻을 수있는 가장 긴 모서리 길이
    const sizeBox = box.getSize(new THREE.Vector3()).length();
    //box 중심점 ;; 카메라가 바라보는 곳으로 설정하면 좋음
    const centerBox = box.getCenter(new THREE.Vector3());

    const direction = new THREE.Vector3(0, 1, 0);
    direction.applyAxisAngle(
      new THREE.Vector3(1, 0, 0),
      THREE.MathUtils.degToRad(viewAngle),
    );

    const halfSizeModel = sizeBox * 0.5;
    const halfFov = THREE.MathUtils.degToRad(this._camera.fov * 0.5);
    const distance = halfSizeModel / Math.tan(halfFov);

    const newPosition = new THREE.Vector3().copy(
      direction.multiplyScalar(distance).add(centerBox),
    );

    // this._camera.position.copy(newPosition);
    // this._controls.target.copy(centerBox);

    //애니메이션 라이브러리 gsap
    //카메라 위치변경
    gsap.to(this._camera.position, {
      duration: 1.5,
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
    });

    //this._controls.target.copy(centerBox);
    // console.log(this._controls);
    // console.log(this._controls.target);
    // 타겟위치변경
    gsap.to(this._controls.target, {
      duration: 0.5,
      x: centerBox.x,
      y: centerBox.y,
      z: centerBox.z,
      onUpdate: () => {
        //애니메이션 수행중에 깜빡거리는 현상 방지
        this._camera.lookAt(
          this._controls.target.x,
          this._controls.target.y,
          this._controls.target.z,
        );
      },
    });
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    console.log('camera');
    camera.position.set(15, 10, 15);
    camera.getWorldDirection(new THREE.Vector3(0, 0, 0));
    // camera.lookAt(target);

    // const cameraHelper = new THREE.CameraHelper(camera);
    // this._scene.add(cameraHelper);

    // console.log('setupcamera:', this._model);  //undefined
    // const camera = this._model.children[1];
    this._camera = camera;
  }

  _addPointLight(x: number, y: number, z: number, helperColr: number) {
    const color = 0xffffff;
    const intensity = 1.5;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this._scene.add(ambientLight);

    this._addPointLight(50, 20, 50, 0xff0000);
    this._addPointLight(-50, 20, 50, 0xffff00);
    this._addPointLight(-50, 20, -50, 0x00ff00);
    this._addPointLight(50, 20, -50, 0x0000ff);

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

  _previousDirectionOffset = 0;

  //초기 속도
  _speed = 0;
  _maxSpeed = 0;
  _acceleration = 0;

  _bOnTheGround = false; //모델이 바닥위에 있는지 여부체크
  _fallingAcceleration = 0;
  _fallingSpeed = 0;

  resize() {
    const width = this._canvasContainer.clientWidth;
    const height = this._canvasContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}

// window.onload = function () {
//   new App();
// };
