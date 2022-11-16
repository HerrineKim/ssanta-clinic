/* eslint-disable no-undef */
// import { throws } from 'assert';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import gsap from 'gsap';

import axios from 'axios';

interface Item {
  itemImg: string;
  price: string;
  // 아이템이름??
  nickname: string;
}

export class RoomThree {
  _divContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;
  _mixer: any;
  _clock: any;
  _orbitControls: any;
  _raycaster: any;
  _scenenumber: number;
  _model: any;
  _close: any;
  _tree: any;
  _items: any;
  _scene2: any;

  _showcase: any;
  _isZoom: any;

  _position: any;
  _inven: any;
  _isTreeModal: boolean;
  _check: any;
  _treeaddres: string;
  _isSave: boolean;

  constructor(items: number[], tree: string) {
    this._treeaddres = tree;
    this._scenenumber = 1;
    this._isTreeModal = false;
    this._isSave = false;
    this._items = items;
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
    const scene2 = this._scene;
    this._scene2 = scene2;

    this._setupControls();
    this._setupPicking();
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
      const axesHelper = new THREE.AxesHelper(20);
      scene.add(axesHelper);
      this._scene = scene;
    }
  }
  _setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();

    this._clock = new THREE.Clock();
    // requestAnimationFrame(this.render.bind(this));
  }

  update() {
    const delta = this._clock.getDelta();
    this._orbitControls.update();
    if (this._mixer) this._mixer.update(delta);
  }
  update2() {
    // console.log('updaete2');
    this._orbitControls.update();
  }

  // render() {
  //   if (this._scenenumber === 1) {
  //     // console.log(this._camera.position);
  //     this._renderer.render(this._scene, this._camera);
  //     this.update();
  //     // console.log('!');

  //     requestAnimationFrame(this.render.bind(this));
  //   } else {
  //     // inven scene
  //     this._renderer.render(this._scene2, this._camera);
  //     this.update2();

  //     requestAnimationFrame(this.render.bind(this));
  //   }
  // }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
  _setupCamera() {
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000,
    // );
    // const aspect = window.innerWidth / window.innerHeight;
    // const camera = new THREE.OrthographicCamera(
    //   -10 * aspect,
    //   10 * aspect,
    //   10,
    //   -10,
    //   1,
    //   1000,
    // );
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
    this._divContainer.addEventListener('wheel', this._setupRotate.bind(this));
  }
  _setupLight() {
    const ambientLight = new THREE.AmbientLight(0xfff8ea, 1);
    this._scene.add(ambientLight);
    // const color1 = '#5F02B0';
    // const color2 = '#BC9DD7';
    // const color3 = '#CCA333';
    // const intensity = 0.5;
    // const light1 = new THREE.PointLight(color1, intensity);
    // const light2 = new THREE.PointLight(color1, intensity);
    // const light3 = new THREE.PointLight(color3, 1.5);
    // light1.position.set(0.0, 3.595, 4.786);
    // light2.position.set(4.241, 3.184, 0);
    // light3.position.set(-0.22, 1.178, 4.743);
    // this._scene.add(light1);
    // this._scene.add(light2);
    // this._scene.add(light3);
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
    const inven: any[] = [];
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
    // x button load
    loader.load('/room/close.glb', (gltf) => {
      count += 1;
      const model: any = gltf.scene;
      this._close = model;

      // model.position.set(10, 5, -4.5);

      // model.name = 'close';
    });
    // check load
    loader.load('/room/check.glb', (gltf) => {
      count += 1;
      const model: any = gltf.scene;
      this._check = model;

      // model.position.set(10, 5, -4.5);

      // model.name = 'close';
    });

    loader.load(`${this._treeaddres}`, (gltf) => {
      count += 1;
      const tree: any[] = [];
      const model: any = gltf.scene;
      console.log('tree:', model);
      // model.traverse((child: any) => {
      //   if (child instanceof THREE.Group) {
      //     // console.log(child, child.name);
      //     group.push(child);
      //   }
      // });
      // model.position.set(5, 0, -4.5);
      model.name = 'tree';
      model.traverse((child: THREE.Object3D) => {
        tree.push(child);
        child.name = 'tree';
      });
      this._scene.add(model);
      inven.push(model);
      // console.log('loadtree inven:', inven);
      // console.log('treegltf:', model);
      this._tree = tree;
      this._inven = inven;
    });

    loader.load('/room/showcase.glb', (gltf) => {
      count += 1;
      const model: any = gltf.scene;
      // this._scene.add(model);
      // console.log('showcase:', model);
      model.position.setZ(model.position.z + 1);
      this._showcase = model;
      inven.push(model);
      // console.log('loadshowcase inven:', inven);
      this._inven = inven;
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
          model.scale.set(0.01, 0.01, 0.01);
          const position = this._position[`${index}`];
          // model.position.set(0, 0, 0);
          model.position.set(position[0], position[1], position[2]);
          items.push(model);
          // this._scene.add(model);
        });
      }
    });
    const itemCount = this._items.length;
    this._items = items;

    const loadPage = setInterval(() => {
      console.log('로딩중');
      // console.log(count);
      // console.log(itemCount);
      if (count === itemCount + 5) {
        const loading = document.querySelector(
          '#room-canvas .loading',
        ) as HTMLElement | null;

        if (loading !== null) {
          loading.style.display = 'none';
        }

        clearInterval(loadPage);
      }
    }, 1000);
  }
  _setupControls() {
    if (this._scenenumber === 1) {
      this._orbitControls = new OrbitControls(this._camera, this._divContainer);

      // //orbicontrol shift 기능 없애기
      // this._orbitControls.enablePan = false;
      // this._orbitControls.minDistance = 30;
      // this._orbitControls.maxDistance = 80;
      // this._orbitControls.maxPolarAngle = (Math.PI * 2) / 5;
      // // this._orbitControls.minPolarAngle = 0;
      // this._orbitControls.maxAzimuthAngle = 0.1 * Math.PI;
      // this._orbitControls.minAzimuthAngle = -1.5 * Math.PI;

      //마우스 회전 부드럽게
      this._orbitControls.enableDamping = true;

      console.log('setoucontrols111');
    } else {
      // 트리 위주로 돌릴 수 있게
      // 드래그앤 드롭
      this._orbitControls.enabled = false;
      console.log('setupcontrols222');
    }
  }
  _onClick(event: any) {
    console.log('click!!!');
    function saveArrayBuffer(buffer: any) {
      const file = new Blob([buffer], { type: 'application/octet-stream' });
      console.log('saveArray:', file);
      return file;
    }

    // let glbFile: Blob;

    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
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
    if (this._scenenumber === 1) {
      // console.log('scenenumber1 _camera:', this._camera);
      // 모든 3d 돌면서 더블클릭된 객체 zoomfit
      // console.log('click함수 실행:', this._group);    클릭한것 검사

      // 원래 버전
      // const targets = this._raycaster.intersectObjects(this._group);
      // console.log('click!!', this._model);
      const targets = this._raycaster.intersectObject(this._model);
      // console.log('raycaaster target:', targets);

      if (targets.length > 0) {
        // console.log(targets);
        // console.log('scenenumber 1');
        if (targets[0].object.parent.name === 'advaent_calendar') {
          console.log('달력');
          this._setupCalendar();
        } else {
          this._removeCalendar();
        }
      } else {
        console.log('아무것도업슴');
        this._removeCalendar();
      }

      const trees = this._raycaster.intersectObjects(this._tree);
      if (trees.length > 0) {
        let object = trees[0].object;
        while (object.parent) {
          object = object.parent;
          if (object instanceof THREE.Group) {
            break;
          }
        }
        console.log('parent:', object);
        this._isTreeModal = true;
        console.log('onclick inven:', this._inven);
        this._zoomInven(this._inven, 90);
      }
    } else {
      // scenenumber == 2 일때
      const exporter = new GLTFExporter();

      // console.log('scenenumber2 _camera:', this._camera);
      // console.log('onclick2');
      // drag & drop 구현

      // x누르면 다시 돌아가는거 구현
      // console.log('close:', this._close);
      // console.log('raycaster:', this._raycaster);
      const closeTarget = this._raycaster.intersectObject(this._close);
      const treeTarget = this._raycaster.intersectObjects(this._tree);
      const checkTarget = this._raycaster.intersectObject(this._check);
      // object = treeTarget[0].object;
      // while (object.parent) {
      //   object = object.parent;
      //   if (object instanceof THREE.Group && object.name === 'tree') {
      //     break;
      //   }
      // }
      const formData = new FormData();
      const TOKEN = localStorage.getItem('jwt') || '';
      if (checkTarget.length > 0) {
        this._isSave = true;
        let glbFile: Blob;
        exporter.parse(
          this._tree[0],
          (result) => {
            console.log('result:', result);
            glbFile = saveArrayBuffer(result);
            formData.append('glbfile', glbFile);
            console.log('result : ', glbFile);

            axios({
              url: 'http://localhost:8080/api/tree',
              method: 'post',
              data: formData,
              headers: {
                Authorization: TOKEN,
              },
            }).then((res) => {
              this._isSave = false;
              console.log(res);
            });
          },
          function (error) {
            console.log(error);
          },
          { binary: true },
        );
      }

      if (closeTarget.length > 0) {
        // scene1으롣 돌아가기

        // 백에 glb 보내기
        this._scene2.remove(this._check);

        this._scene2.remove(this._showcase);
        this._scene2.remove(...this._items);
        this._scene2.remove(this._close);
        // 나중에 any 지우기
        this._dragControls.forEach((control: any) => {
          control.deactivate();
        });

        this._scenenumber = 1;

        // this._setupControls();
        setTimeout(() => {
          this._zoomFit(this._model, 60);
        }, 100);
      }
      // if (itemTarget.length > 0) {
      //   this._setupDrag(itemTarget[0]);
      // }
      console.log('treetarget:', treeTarget);
      // console.log('itemTarget:', itemTarget);
    }
  }
  changeSave() {
    this._isSave = false;
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

  _zoomInven(object3d: any[], viewAngle: number) {
    console.log(object3d);
    const positions: any[] = [];

    this._items.forEach((child: any) => {
      positions.push(child.position);
    });
    // console.log('zoomfit object3d: ', object3d);
    //box 는 객체를 담는 최소크기 박스
    const box1 = new THREE.Box3().setFromObject(object3d[0]);
    const box2 = new THREE.Box3().setFromObject(object3d[1]);
    const box = new THREE.Box3().union(box1);
    box.union(box2);
    console.log('zoominven box', box);
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
    // this._orbitControls.target.copy(centerBox);

    //애니메이션 라이브러리 gsap
    //카메라 위치변경
    gsap.to(this._camera.position, {
      duration: 1.5,
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
    });

    //this._orbitControls.target.copy(centerBox);
    // console.log(this._orbitControls);
    // console.log(this._orbitControls.target);
    // 타겟위치변경
    gsap.to(this._orbitControls.target, {
      duration: 0.5,
      x: centerBox.x,
      y: centerBox.y,
      z: centerBox.z,
      onUpdate: () => {
        //애니메이션 수행중에 깜빡거리는 현상 방지
        this._camera.lookAt(
          this._orbitControls.target.x,
          this._orbitControls.target.y,
          this._orbitControls.target.z,
        );
      },
    });
    setTimeout(() => {
      //showcase만 add하게 로딩 시간에 따라 순서변경
      this._scene2.add(this._showcase);
      this._scene2.add(...this._items);
      this._scene2.add(this._close);
      this._scene2.add(this._check);
      this._scenenumber = 2;
      this._setupControls();

      this._setupDrag();
    }, 1500);
  }
  _dragControls: any[] = [];
  _setupDrag() {
    // console.log('items:', this._items);
    // console.log('tree:', this._tree);
    const positions = this._position;
    const tree = this._tree;
    let items = this._items;
    // console.log(items);
    // const raycaster = this._raycaster;

    items.forEach((child: any, index: any) => {
      child.name = index;
      const controls = new DragControls(
        [child],
        this._camera,
        this._renderer.domElement,
      );
      controls.transformGroup = true;

      controls.addEventListener('dragstart', function (event) {
        // child.position.z = 1.5;
        // 이미 걸려있는 것 처리
        const targets = controls.getRaycaster().intersectObjects(tree);
        let object;
        if (targets.length > 0) {
          console.log('이미 걸려있음');
          object = targets[0].object;
          while (object.parent) {
            object = object.parent;
            if (object instanceof THREE.Group && object.name === 'tree') {
              break;
            }
          }
        }
        console.log('dragstart!!!!!!!!!!!!!', event.object, targets, object);
        // 장식품이 트리에 붙어있는 것일때
        if (event.object.parent === object) {
          console.log('parent = event.object');
          event.object.removeFromParent();
        }
        // if (
        //   1 <= parseInt(event.object.name) &&
        //   parseInt(event.object.name) <= 8
        // ) {
        //   event.object.children[0].children[0].material.emissive.set(0xaaaaaa);
        // } else {
        //   event.object.children[0].material.emissive.set(0xaaaaaa);
        // }
      });

      controls.addEventListener('dragend', (event) => {
        const targets = controls.getRaycaster().intersectObjects(tree);
        console.log('dragend targets:', targets);
        // if (
        //   1 <= parseInt(event.object.name) &&
        //   parseInt(event.object.name) <= 8
        // ) {
        //   event.object.children[0].children[0].material.emissive.set(0x000000);
        // } else {
        //   event.object.children[0].material.emissive.set(0x000000);
        // }

        //drag가 끝났을 때 raycaster로 tree와 만나는지 판단
        // console.log('world position:', event.object.getWorldPosition());

        if (targets.length > 0) {
          if (targets[0].object.name === 'tree') {
            //만난다면 장식품을 tree에 붙이고 종속시킴
            console.log('tree 장식!', event.object, targets);
            event.object.position.setX(targets[0].point.x);
            event.object.position.setY(targets[0].point.y);
            event.object.position.setZ(targets[0].point.z);
            let object = targets[0].object;
            while (object.parent) {
              object = object.parent;
              if (object instanceof THREE.Group) {
                break;
              }
            }

            items = items.filter((obj: any) => obj !== event.object);
            object.attach(event.object);
            this._items = items;
          } else {
            // 나눌 필요 있음
            // event.object.removeFromParent();
            console.log('tree가 아닌것 raycast');
            event.object.position.setX(positions[child.name][0]);
            event.object.position.setY(positions[child.name][1]);
            event.object.position.setZ(positions[child.name][2]);
          }
        } else {
          // event.object.removeFromParent();
          console.log('remove object:', event.object);
          console.log('target.length === 0');
          // console.log('else event:', event);
          console.log(child, positions[child.name][0]);
          event.object.position.setX(positions[child.name][0]);
          event.object.position.setY(positions[child.name][1]);
          event.object.position.setZ(positions[child.name][2]);
          console.log(event.object.position);
        }

        //tree와 만나지 않는다면 다시 원래 위치로 돌려보냄
      });
      // ###########  item 에서 삭제되면 앞으로 한칸씩 밀리는 거였다.
      // => 해결해야한다.
      controls.addEventListener('drag', function (event) {
        // console.log('drag position:', position);
        // console.log(child.position);
        // console.log(event.object.position);
        event.object.position.z = child.position.z; // This will prevent moving z axis, but will be on 0 line. change this to your object position of z axis.
      });
      this._dragControls.push(controls);
    });
    // this._tree = tree;

    // this._items = items;
  }

  _zoomFit(object3d: any, viewAngle: number) {
    // this._orbitControls.minDistance = 0;
    // this._orbitControls.maxDistance = Infinity;
    // this._orbitControls.maxPolarAngle = Math.PI / 2;
    // // this._orbitControls.minPolarAngle = 0;
    // this._orbitControls.maxAzimuthAngle = Infinity;
    // this._orbitControls.minAzimuthAngle = Infinity;

    // console.log('zoomfit object3d: ', object3d);
    //box 는 객체를 담는 최소크기 박스
    const box = new THREE.Box3().setFromObject(object3d);
    //box를통해 얻을 수있는 가장 긴 모서리 길이
    // const sizeBox = box.getSize(new THREE.Vector3()).length();
    //box 중심점 ;; 카메라가 바라보는 곳으로 설정하면 좋음
    const centerBox = box.getCenter(new THREE.Vector3());

    const direction = new THREE.Vector3(0, 1, 0);

    direction.applyAxisAngle(
      new THREE.Vector3(0, 0, 1),
      THREE.MathUtils.degToRad(viewAngle),
    );

    // const halfSizeModel = sizeBox * 0.5;
    // const halfFov = THREE.MathUtils.degToRad(this._camera.fov * 0.5);
    // const distance = halfSizeModel / Math.tan(halfFov);

    // const newPosition = new THREE.Vector3().copy(
    //   direction.multiplyScalar(distance).add(centerBox),
    // );

    // this._camera.position.copy(newPosition);
    // this._orbitControls.target.copy(centerBox);

    //애니메이션 라이브러리 gsap
    //카메라 위치변경
    // camera.position.set(7.382013649990576, 5.62568011018224, 7.322713694518906);
    gsap.to(this._camera.position, {
      duration: 1.5,
      x: 7.382013649990576,
      y: 5.62568011018224,
      z: 7.322713694518906,
    });

    //this._orbitControls.target.copy(centerBox);
    // console.log(this._orbitControls);
    // console.log(this._orbitControls.target);
    // 타겟위치변경
    gsap.to(this._orbitControls.target, {
      duration: 0.5,
      x: centerBox.x,
      y: centerBox.y,
      z: centerBox.z,
      onUpdate: () => {
        //애니메이션 수행중에 깜빡거리는 현상 방지
        this._camera.lookAt(
          this._orbitControls.target.x,
          this._orbitControls.target.y,
          this._orbitControls.target.z,
        );
      },
    });
  }
  _setupRotate(event: any) {
    if (this._scenenumber === 2) {
      event.preventDefault();
      // console.log('rotate', this._tree, this._tree[0]);
      this._tree[0].rotateY(event.deltaY * 0.0005);
    }
  }
}
