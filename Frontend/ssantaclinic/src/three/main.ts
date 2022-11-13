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
import { throws } from 'assert';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import ShopAlert from '../components/shop';

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
  _inven: any;
  _scene2: any;

  _previousTime: any;
  _requestId: any;
  _isTreeModal: boolean;
  _tree: any;
  _items: any[];

  _showcase: any[];
  _close: any;
  // _snow: boolean;
  _shop: THREE.Object3D[];
  _game1: THREE.Object3D[];
  _game2: THREE.Object3D[];
  _game3: THREE.Object3D[];
  _game4: THREE.Object3D[];
  _letter: THREE.Object3D[];
  _home: THREE.Object3D[];
  _isZoom: boolean;
  _isShop: boolean;
  _isHome: boolean;
  _isGame1: boolean;
  _isGame2: boolean;
  _isGame3: boolean;
  _isGame4: boolean;
  _isLetter: boolean;

  _arrow: any;

  // 보여줘야하는 scene 이어떤건지 결정
  // 1이 기본, 2가 트리꾸미는 scene
  _scenenumber = 1;

  constructor(items: number[]) {
    //(9, 0, -4.5);  오른쪽, 위, 앞

    this._items = items;
    this._isAlert = false;
    this._isZoom = false;
    this._isShop = false;
    this._isHome = false;
    this._isGame1 = false;
    this._isGame2 = false;
    this._isGame3 = false;
    this._isGame4 = false;
    this._isLetter = false;
    this._isTreeModal = false;
    this._shop = [];
    this._game1 = [];
    this._game2 = [];
    this._game3 = [];
    this._game4 = [];
    this._letter = [];
    this._home = [];
    this._showcase = [];

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

    const scene2 = scene;
    this._scene2 = scene2;

    this._setupControls();
    this._setupPicking();

    window.onresize = this.resize.bind(this);
    this.resize();
  }

  render(time: number) {
    // console.log('!!!!');
    if (this._scenenumber === 1) {
      // console.log(this._camera.position);
      this._renderer.render(this._scene, this._camera);
      this.update(time);
      // console.log('!');

      requestAnimationFrame(this.render.bind(this));
    } else {
      // inven scene
      this._renderer.render(this._scene2, this._camera);
      this.update2(time);

      requestAnimationFrame(this.render.bind(this));
    }
  }

  update2(time: number) {
    time *= 0.001;
    // console.log('updaete2');
    this._controls.update();
  }

  update(time: number) {
    time *= 0.001; // second unit

    this._controls.update();
    // console.log(this._controls.PolarAngle, this._controls.minPolarAngle);
    // console.log(this._controls);
    // if (this._snow) {
    //   if (this._mixer) {
    //     // console.log('mixer');  //mixer는 charecter.glb의 animation
    //     const deltaTime = time - this._previousTime; //이전프레임과 현재프레임 간의 시간차이
    //     this._mixer.update(deltaTime);
    //   }
    // }

    // 모델이 움직일때마다 모델박스 바껴야 하므로
    // if (this._boxHelper) {
    //   this._boxHelper.update();
    // }

    this._fps.update();

    this._previousTime = time;
  }

  _setupOctree(model: any) {
    this._worldOctree = new Octree();
    this._worldOctree.fromGraphNode(model);
    console.dir(this._worldOctree);
  }

  // scene 1을 위한 controls
  _setupControls() {
    if (this._scenenumber === 1) {
      this._controls = new OrbitControls(this._camera, this._canvasContainer);

      //orbicontrol shift 기능 없애기
      this._controls.enablePan = false;
      this._controls.minDistance = 30;
      this._controls.maxDistance = 80;
      this._controls.maxPolarAngle = (Math.PI * 2) / 5;
      // this._controls.minPolarAngle = 0;
      this._controls.maxAzimuthAngle = 0.1 * Math.PI;
      this._controls.minAzimuthAngle = -1.5 * Math.PI;

      //마우스 회전 부드럽게
      this._controls.enableDamping = true;

      const stats = Stats();
      this._canvasContainer.appendChild(stats.dom);
      this._fps = stats;
      console.log('setoucontrols111');
    } else {
      // 트리 위주로 돌릴 수 있게
      // 드래그앤 드롭
      this._controls.enabled = false;
      // this._controls.minDistance = 0.3;
      console.log('setupcontrols222');
    }
  }

  _setupModel() {
    const group: any = [];
    const loader = new GLTFLoader();
    const items: any = [];
    let count = 0;

    let showcase2: THREE.Mesh | null;
    let showcase1: THREE.Mesh | null;
    // 안눌러도 되는 맵 로드
    loader.load('main/santa2.glb', (gltf) => {
      count += 1;
      // console.log(gltf);
      // console.log(gltf.scene);
      const m = gltf.scene;
      m.traverse((child) => {
        try {
          if (
            1 <= parseInt(child.name) &&
            parseInt(child.name) <= 55 &&
            child.type !== 'Object3D'
          ) {
            items.push(child);
          }
        } catch (error) {
          console.log(error);
        }
        if (child.name.includes('showcase2') && child instanceof THREE.Mesh) {
          showcase2 = child;
          this._showcase.push(showcase2);
        }
        if (child.name.includes('showcase1') && child instanceof THREE.Mesh) {
          showcase1 = child;
          this._showcase.push(showcase1);
        }
      });
      this._items = items;
      // console.log(showcase1, showcase2);
      // console.log(m);
      const originModel = gltf.scene;
      const model = gltf.scene.children[0];
      console.log('LOAD model:', model);
      this._model = model;
      this._scene.add(originModel);

      model.traverse((child) => {
        // console.log(child);
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.name === 'shop') {
          if (child.parent) {
            this._shop.push(child.parent);
          }
        } else if (child.name === 'game1') {
          this._game1.push(child);
        } else if (child.name === 'game2') {
          this._game2.push(child);
        } else if (child.name === 'game3') {
          this._game3.push(child);
        } else if (child.name === 'game4') {
          this._game4.push(child);
        } else if (child.name === 'letter') {
          this._letter.push(child);
        } else if (child.name === 'home') {
          this._home.push(child);
        }
        // console.log('mesh', child.name);
      });

      // console.log(dumpObject(model, [], true, '').join('\n'));
      group.push(model);
    });

    // x button load
    loader.load('main/shopclose.glb', (gltf) => {
      count += 1;
      const model: any = gltf.scene;

      this._close = model;
      this._scene2.add(model);
      model.name = 'close';
    });

    // arrow
    loader.load('main/arrow.glb', (gltf) => {
      count += 1;
      const model: any = gltf.scene;
      this._arrow = model;

      model.name = 'arrow';
    });

    // 전역변수 설정
    // this._items = items;
    // this._inven = inven;

    // scene에 있는 모든 3dobj 검사
    const loadPage = setInterval(() => {
      console.log('로딩중');
      console.log(count);
      if (count === 3) {
        const loading = document.querySelector(
          '.loading',
        ) as HTMLElement | null;

        if (loading !== null) {
          loading.style.display = 'none';
        }

        clearInterval(loadPage);
      }
    }, 1000);

    this._group = group;
    console.log(group);
  }

  _setupPicking() {
    // raycaster로 뭘 눌렀는지 판단해야함

    console.log('setpupicking');
    const raycaster = new THREE.Raycaster();

    this._canvasContainer.addEventListener('click', this._onClick.bind(this));
    this._raycaster = raycaster;
    // this._canvasContainer.addEventListener(
    //   'wheel',
    //   this._setupRotate.bind(this),
    // );
  }

  //클릭 함수
  _onClick(event: any) {
    console.log('click!!!');

    const width = this._canvasContainer.clientWidth;
    const height = this._canvasContainer.clientHeight;

    const xy = {
      x: (event.offsetX / width) * 2 - 1,
      y: -(event.offsetY / height) * 2 + 1,
    };

    this._raycaster.setFromCamera(xy, this._camera);
    if (this._scenenumber === 1) {
      // console.log('scenenumber1 _camera:', this._camera);
      // 모든 3d 돌면서 더블클릭된 객체 zoomfit
      // console.log('click함수 실행:', this._group);    클릭한것 검사
      const arrowTarget = this._raycaster.intersectObject(this._arrow);
      if (arrowTarget.length > 0) {
        this._scenenumber = 2;
        this._zoomInven(this._showcase, 70);
        return;
      }
      this._scene.remove(this._arrow);

      // 원래 버전
      // const targets = this._raycaster.intersectObjects(this._group);
      console.log('click!!', this._model);
      const targets = this._raycaster.intersectObject(this._model);
      console.log('raycaaster target:', targets);
      // const target = this._raycaster.intersectObject(this._group[11]);
      // console.log('target : ', target);
      // console.log('targets: ', targets);

      this._removeMemory();
      this._removeHomeAlert();
      this._removeTetris();
      this._removeWit();

      if (targets.length > 0) {
        if (targets[0].object.name === 'shop') {
          // this._zoomInven(this._showcase, 70);
          this._zoomFit(targets[0].object.parent, 75);
          setTimeout(() => {
            // this._setupAlert();
            this._scene.add(this._arrow);
          }, 1500);
        } else if (targets[0].object.name === 'home') {
          console.log('home!!!!!!!!');
          this._zoomFit(targets[0].object.parent, 60);
          setTimeout(() => {
            this._setupHomeAlert();
          }, 1500);
        } else if (targets[0].object.name.includes('game1')) {
          console.log('game1!!!!!!!!!!!!!!');
          this._zoomFit(targets[0].object.parent, 80);
          setTimeout(() => {
            this._setupTetris();
          }, 1500);
        } else if (targets[0].object.name.includes('game2')) {
          console.log('game2!!!!!!!!!!!!!!');
          this._zoomFit(targets[0].object.parent, 80);
          setTimeout(() => {
            this._setupWit();
          }, 1500);
        }
        // else if (targets[0].object.name.includes('game3')) {
        //   console.log('game3!!!!!!!!!!!!!!');
        //   this._zoomFit(targets[0].object.parent, 80);
        // }
        else if (targets[0].object.name.includes('game4')) {
          console.log('game4!!!!!!!!!!!!!!');
          this._zoomFit(targets[0].object.parent, 60);
          console.log(targets[0].object.parent);
          setTimeout(() => {
            this._setupMemory();
          }, 1500);
        } else if (targets[0].object.name.includes('playground')) {
          console.log('ground!!!!!!!!!!!!!!');
          this._zoomFit(targets[0].object.parent, 60);
        } else if (targets[0].object.name.includes('letter')) {
          console.log('letter!!!!!!!!!!!!!!');
          this._zoomFit(targets[0].object.parent, 60);
          console.log(targets[0].object.parent);
          setTimeout(() => {
            this._setupLetter();
          }, 1500);
        } else {
          if (this._isAlert) {
            this._removeAlert();
            this._removeHomeAlert();
            this._removeMemory();
          }

          this._scenenumber = 1;

          this._removeModal();
          if (this._isZoom) {
            setTimeout(() => {
              // this._setupControls();
              this._zoomOut(60);
            }, 100);
          }
        }
      } else {
        this._scenenumber = 1;
        if (this._isAlert) {
          this._removeAlert();
          this._removeHomeAlert();
          this._removeMemory();
        }

        this._removeModal();
        if (this._isZoom) {
          setTimeout(() => {
            // this._setupControls();
            this._zoomOut(60);
          }, 100);
        }
      }

      // const targets2 = this._raycaster.intersectObjects(this._tree);
      // if (targets2.length > 0) {
      //   let object = targets2[0].object;
      //   while (object.parent) {
      //     object = object.parent;
      //     if (object instanceof THREE.Group) {
      //       break;
      //     }
      //   }
      //   console.log('parent:', object);
      //   this._isTreeModal = true;
      //   this._zoomInven(this._inven, 90);
      // }
    } else if (this._scenenumber === 2) {
      console.log('scenenumber 22222222');
      // scenenumber == 2 일때
      const itemTarget = this._raycaster.intersectObjects(this._items);
      console.log(itemTarget);
      if (itemTarget.length > 0) {
        this._setupAlert(itemTarget[0].object.name);
      } else {
        this._removeAlert();
      }

      const closeTarget = this._raycaster.intersectObject(this._close);
      if (closeTarget.length > 0) {
        this._scenenumber = 1;
        // this._setupControls();
        console.log(this._shop);
        // setTimeout(() => {
        //   this._zoomFit(this._shop[0].parent, 60);
        // }, 100);
        setTimeout(() => {
          this._zoomOut(60);
        }, 100);
      }
    } else {
      // const exporter = new GLTFExporter();
      // object = treeTarget[0].object;
      // while (object.parent) {
      //   object = object.parent;
      //   if (object instanceof THREE.Group && object.name === 'tree') {
      //     break;
      //   }
      // }
      // const itemTarget = this._raycaster.intersectObjects(this._items);
      // const formData = new FormData();
      // const TOKEN = localStorage.getItem('jwt') || '';
      // if (closeTarget.length > 0) {
      //   // scene1으롣 돌아가기
      //   let glbFile: Blob;
      //   exporter.parse(
      //     this._tree[0],
      //     function (result) {
      //       console.log('result:', result);
      //       glbFile = saveArrayBuffer(result);
      //       formData.append('glbfile', glbFile);
      //       console.log('result : ', glbFile);
      //       axios({
      //         url: 'http://localhost:8080/api/tree',
      //         method: 'post',
      //         data: formData,
      //         headers: {
      //           Authorization: TOKEN,
      //         },
      //       }).then((res) => {
      //         console.log(res);
      //       });
      //     },
      //     function (error) {
      //       console.log(error);
      //     },
      //     { binary: true },
      //   );
      //   this._scene2.remove(this._showcase);
      //   this._scene2.remove(...this._items);
      //   this._scene2.remove(this._close);
      //   this._dragControls.forEach((control) => {
      //     control.deactivate();
      //   });
      //   this._scenenumber = 1;
      //   this._setupControls();
      //   setTimeout(() => {
      //     this._zoomFit(this._model, 60);
      //   }, 100);
      // }
      // if (itemTarget.length > 0) {
      //   this._setupDrag(itemTarget[0]);
      // }
      // console.log('treetarget:', treeTarget);
      // console.log('itemTarget:', itemTarget);
    }
  }

  // _setupRotate(event: any) {
  //   if (this._scenenumber === 2) {
  //     event.preventDefault();
  //     // console.log('rotate', this._tree[0]);
  //     this._tree[0].rotateY(event.deltaY * 0.0005);
  //   }
  // }

  // _setupTreeModal() {
  //   const treeModal = document.querySelector(
  //     '.treemodal',
  //   ) as HTMLElement | null;
  //   if (treeModal !== null) {
  //     treeModal.style.display = 'flex';
  //   }
  //   this._isTreeModal = true;
  // }
  _dragControls: any[] = [];
  // _setupDrag() {
  //   console.log('items:', this._items);
  //   console.log('tree:', this._tree);
  //   const positions = this._position;
  //   const tree = this._tree;
  //   let items = this._items;
  //   // const raycaster = this._raycaster;

  //   items.forEach((child, index) => {
  //     // console.log('item child:', child);
  //     child.name = index;
  //     const controls = new DragControls(
  //       [child],
  //       this._camera,
  //       this._renderer.domElement,
  //     );
  //     controls.transformGroup = true;

  //     controls.addEventListener('dragstart', function (event) {
  //       const targets = controls.getRaycaster().intersectObjects(tree);
  //       let object;
  //       if (targets.length > 0) {
  //         object = targets[0].object;
  //         while (object.parent) {
  //           object = object.parent;
  //           if (object instanceof THREE.Group && object.name === 'tree') {
  //             break;
  //           }
  //         }
  //       }
  //       console.log('dragstart!!!!!!!!!!!!!', event.object, targets, object);
  //       // 장식품이 트리에 붙어있는 것일때
  //       if (event.object.parent === object) {
  //         console.log('parent = event.object');
  //         event.object.removeFromParent();
  //       }
  //       event.object.children[0].children[0].material.emissive.set(0xaaaaaa);
  //     });

  //     controls.addEventListener('dragend', (event) => {
  //       const targets = controls.getRaycaster().intersectObjects(tree);
  //       console.log('dragend targets:', targets);
  //       event.object.children[0].children[0].material.emissive.set(0x000000);

  //       //drag가 끝났을 때 raycaster로 tree와 만나는지 판단
  //       // console.log('world position:', event.object.getWorldPosition());

  //       if (targets.length > 0) {
  //         if (targets[0].object.name === 'tree') {
  //           //만난다면 장식품을 tree에 붙이고 종속시킴
  //           console.log('tree 장식!', event.object, targets);
  //           event.object.position.setX(targets[0].point.x);
  //           event.object.position.setY(targets[0].point.y);
  //           event.object.position.setZ(targets[0].point.z);
  //           let object = targets[0].object;
  //           while (object.parent) {
  //             object = object.parent;
  //             if (object instanceof THREE.Group) {
  //               break;
  //             }
  //           }

  //           items = items.filter((obj) => obj !== event.object);
  //           object.attach(event.object);
  //           this._items = items;
  //         } else {
  //           // 나눌 필요 있음
  //           // event.object.removeFromParent();
  //           console.log('tree가 아닌것 raycast');
  //           event.object.position.setX(positions[child.name][0]);
  //           event.object.position.setY(positions[child.name][1]);
  //           event.object.position.setZ(positions[child.name][2]);
  //         }
  //       } else {
  //         // event.object.removeFromParent();
  //         console.log('remove object:', event.object);
  //         console.log('target.length === 0');
  //         // console.log('else event:', event);
  //         console.log(positions[child.name][0]);
  //         event.object.position.setX(positions[child.name][0]);
  //         event.object.position.setY(positions[child.name][1]);
  //         event.object.position.setZ(positions[child.name][2]);
  //         console.log(event.object.position);
  //       }

  //       //tree와 만나지 않는다면 다시 원래 위치로 돌려보냄
  //     });

  //     controls.addEventListener('drag', function (event) {
  //       // console.log('drag position:', position);
  //       event.object.position.z = child.position.z; // This will prevent moving z axis, but will be on 0 line. change this to your object position of z axis.
  //     });
  //     this._dragControls.push(controls);
  //   });
  //   // this._tree = tree;

  //   // this._items = items;
  // }

  // _removeTreeModal() {
  //   this._scene.remove(this._showcase);
  //   this._scene.remove(...this._items);
  // }
  _removeAlert() {
    const shop = document.getElementById('shop');
    if (shop !== null) {
      const root = ReactDOM.createRoot(shop);
      console.log('unmount');
      root.unmount();
    }
  }
  _setupAlert(itemId: string) {
    console.log('setupalert');
    const item = parseInt(itemId);
    const e = React.createElement;
    const shop = document.getElementById('shop');
    if (shop !== null) {
      console.log(shop);
      const root = ReactDOM.createRoot(shop);

      root.render(e(ShopAlert, [{ item: item }], null));
    }
  }

  _removeHomeAlert() {
    const home = document.querySelector('.home') as HTMLElement | null;

    if (home !== null) {
      home.style.display = 'none';
    }
    this._isAlert = false;
  }

  _setupHomeAlert() {
    const home = document.querySelector('.home') as HTMLElement | null;

    if (home !== null) {
      console.log('alert');
      home.style.display = 'flex';
    }
    this._isAlert = true;
  }
  // 순발력
  _setupWit() {
    this._isGame2 = true;
    const memoryAlert = document.querySelector(
      '.witAlert',
    ) as HTMLElement | null;
    // console.log(alert);
    if (memoryAlert !== null) {
      console.log('memoryAlert');
      memoryAlert.style.display = 'flex';
    }
    this._isAlert = true;
  }
  _removeWit() {
    const memoryAlert = document.querySelector(
      '.witAlert',
    ) as HTMLElement | null;
    // console.log(memoryAlert);
    if (memoryAlert !== null) {
      memoryAlert.style.display = 'none';
    }
    this._isAlert = false;
  }

  // 기억력게임
  _setupMemory() {
    this._isZoom = true;

    this._isGame4 = true;

    const memoryAlert = document.querySelector(
      '.memoryAlert',
    ) as HTMLElement | null;
    // console.log(alert);
    if (memoryAlert !== null) {
      console.log('memoryAlert');
      memoryAlert.style.display = 'flex';
    }
    this._isAlert = true;
  }
  _removeMemory() {
    const memoryAlert = document.querySelector(
      '.memoryAlert',
    ) as HTMLElement | null;
    // console.log(memoryAlert);
    if (memoryAlert !== null) {
      memoryAlert.style.display = 'none';
    }
    this._isAlert = false;
  }

  // 테트리스
  _setupTetris() {
    console.log('setuptetris');
    const tetrisAlert = document.querySelector(
      '.tetrisAlert',
    ) as HTMLElement | null;
    console.log(tetrisAlert);
    if (tetrisAlert !== null) {
      console.log('tetrisAlert');
      tetrisAlert.style.display = 'flex';
    }
    this._isAlert = true;
  }
  _removeTetris() {
    const tetrisAlert = document.querySelector(
      '.tetrisAlert',
    ) as HTMLElement | null;
    // console.log(memoryAlert);
    if (tetrisAlert !== null) {
      tetrisAlert.style.display = 'none';
    }
  }
  // 편지
  _setupLetter() {
    this._isZoom = true;

    this._isLetter = true;

    const letterAlert = document.querySelector(
      '.letterAlert',
    ) as HTMLElement | null;
    // console.log(alert);
    if (letterAlert !== null) {
      console.log('편지');
      letterAlert.style.display = 'flex';
    }
    this._isAlert = true;
  }
  _removeLetter() {
    const letterAlert = document.querySelector(
      '.letterAlert',
    ) as HTMLElement | null;
    // console.log(memoryAlert);
    if (letterAlert !== null) {
      console.log('letterAlert');
      letterAlert.style.display = 'none';
    }
    this._isAlert = false;
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
    this._isZoom = true;
    this._controls.minDistance = 0;
    this._controls.maxDistance = Infinity;
    this._controls.maxPolarAngle = Math.PI / 2;
    // this._controls.minPolarAngle = 0;
    this._controls.maxAzimuthAngle = Infinity;
    this._controls.minAzimuthAngle = Infinity;

    // console.log('zoomfit object3d: ', object3d);
    //box 는 객체를 담는 최소크기 박스
    const box = new THREE.Box3().setFromObject(object3d);
    //box를통해 얻을 수있는 가장 긴 모서리 길이
    const sizeBox = box.getSize(new THREE.Vector3()).length();
    //box 중심점 ;; 카메라가 바라보는 곳으로 설정하면 좋음
    const centerBox = box.getCenter(new THREE.Vector3());

    const direction = new THREE.Vector3(0, 1, 0);

    // console.log(object3d);
    const newVec = new THREE.Vector3(0, 0, 0);
    if (object3d.name === 'game2' || object3d.name === 'game4') {
      newVec.z = 1;
    } else if (object3d.name.includes('letter')) {
      newVec.x = -1;
    } else if (object3d.name.includes('shop')) {
      newVec.x = 1;
    } else if (object3d.children[0].name === 'home') {
      newVec.x = 1;
      newVec.z = -1;
    } else if (object3d.name === 'game1') {
      newVec.x = 1;
      // newVec.z = -1;
    }
    // else if (object3d.name === 'game3') {
    //   newVec.x = -1;
    //   newVec.z = 1;
    // }
    else if (object3d.name === 'playground') {
      newVec.x = -1;
      newVec.z = 1;
    }
    // } else if (object3d.position.x > 0 && object3d.position.z < 0) {
    //   newVec.x = 1;
    // } else if (object3d.position.x > 0 && object3d.position.z < 0) {
    //   newVec.x = 1;
    // }
    direction.applyAxisAngle(newVec, THREE.MathUtils.degToRad(viewAngle));

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

  _zoomInven(object3d: any[], viewAngle: number) {
    // zoom 조건
    this._controls.minDistance = 0;
    this._controls.maxDistance = Infinity;
    this._controls.maxPolarAngle = Math.PI / 2;
    // this._controls.minPolarAngle = 0;
    this._controls.maxAzimuthAngle = Infinity;
    this._controls.minAzimuthAngle = Infinity;

    // console.log('zoomfit object3d: ', object3d);
    //box 는 객체를 담는 최소크기 박스
    const box1 = new THREE.Box3().setFromObject(object3d[0]);
    const box2 = new THREE.Box3().setFromObject(object3d[1]);
    const box3 = new THREE.Box3().setFromObject(object3d[2]);
    const box4 = new THREE.Box3().setFromObject(object3d[3]);
    const box = new THREE.Box3().union(box1);
    box.union(box2);
    box.union(box3);
    box.union(box4);
    //box를통해 얻을 수있는 가장 긴 모서리 길이
    const sizeBox = box.getSize(new THREE.Vector3()).length();
    //box 중심점 ;; 카메라가 바라보는 곳으로 설정하면 좋음
    const centerBox = box.getCenter(new THREE.Vector3());

    const direction = new THREE.Vector3(0, 1, 0);
    direction.applyAxisAngle(
      new THREE.Vector3(1, 0, -0.5),
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
    setTimeout(() => {
      this._scenenumber = 2;
      this._setupControls();
    }, 1500);
  }

  //zoomout 함수
  _zoomOut(viewAngle: number) {
    // this._scenenumber = 1;
    this._isZoom = false;
    this._controls.minDistance = 30;
    this._controls.maxDistance = 80;
    this._controls.maxPolarAngle = (Math.PI * 2) / 5;
    // this._controls.minPolarAngle = 0;
    this._controls.maxAzimuthAngle = 0.1 * Math.PI;
    this._controls.minAzimuthAngle = -1.5 * Math.PI;

    gsap.to(this._camera.position, {
      duration: 1.5,
      x: -40,
      y: 29,
      z: -46,
    });

    //this._controls.target.copy(centerBox);
    // console.log(this._controls);
    // console.log(this._controls.target);
    // 타겟위치변경
    gsap.to(this._controls.target, {
      duration: 0.5,
      x: 0,
      y: 0,
      z: 0,
      onUpdate: () => {
        //애니메이션 수행중에 깜빡거리는 현상 방지
        this._camera.lookAt(
          this._controls.target.x,
          this._controls.target.y,
          this._controls.target.z,
        );
      },
    });
    setTimeout(() => {
      this._scenenumber = 1;
      this._setupControls();
    }, 1500);
  }

  _setupCamera() {
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    console.log('camera');
    camera.position.set(-40, 29, -46);
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
    const ambientLight = new THREE.AmbientLight(0xfff8ea, 1);
    this._scene.add(ambientLight);

    // this._addPointLight(50, 20, 50, 0xff0000);
    // this._addPointLight(-50, 20, 50, 0xffff00);
    // this._addPointLight(-50, 20, -50, 0x00ff00);
    // this._addPointLight(50, 20, -50, 0x0000ff);

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
  // _speed = 0;
  // _maxSpeed = 0;
  // _acceleration = 0;

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
