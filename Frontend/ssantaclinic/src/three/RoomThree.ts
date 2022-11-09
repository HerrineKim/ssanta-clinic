/* eslint-disable no-undef */
import { throws } from 'assert';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

import axios from 'axios';

export class RoomThree {
  _divContainer: any;
  _renderer: any;
  _scene: any;
  _camera: any;
  _mixer: any;
  _clock: any;
  _orbitControls: any;
  _raycaster: any;
  _scenenumber: any;
  _model: any;
  _close: any;
  _tree: any;
  _items: any;
  _scene2: any;
  _dragControls: any;
  _showcase: any;
  _isZoom: any;
  _controls: any;

  constructor() {
    this._setupThreeJs();
    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();
    this._setupEvents();
    this._setupPicking();
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
      this._scene = scene;
    }
  }
  _setupCamera() {
    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000,
    // );
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(
      -10 * aspect,
      10 * aspect,
      10,
      -10,
      1,
      1000,
    );

    camera.position.set(
      5.296593567175951,
      5.924396820350731,
      4.516279656418997,
    );
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
    new GLTFLoader().load('/room/my_room.glb', (gltf) => {
      const model = gltf.scene;
      this._scene.add(model);
      const children: any[] = [];
      model.traverse((child) => {
        children.push(child);
      });
      console.log(children);

      // const clips = gltf.animations;
      // const mixer = new THREE.AnimationMixer(model);
      // const clip = THREE.AnimationClip.findByName(clips, '');
      // const action = mixer.clipAction(clip);
      // action.play();

      // this._mixer = mixer;
    });
  }
  _setupControls() {
    this._orbitControls = new OrbitControls(this._camera, this._divContainer);
  }
  _onClick(event: any) {
    console.log('click!!!');
    function saveArrayBuffer(buffer: any) {
      const file = new Blob([buffer], { type: 'application/octet-stream' });
      console.log('saveArray:', file);
      return file;
    }

    let glbFile: Blob;

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
      console.log('click!!', this._model);
      const targets = this._raycaster.intersectObject(this._model);
      console.log('raycaaster target:', targets);
      // const target = this._raycaster.intersectObject(this._group[11]);
      // console.log('target : ', target);
      // console.log('targets: ', targets);
      if (targets.length > 0) {
        console.log('scenenumber 1');
      } else {
        console.log('아무것도업슴');
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

      console.log('asdfasdf', this._tree);
      // object = treeTarget[0].object;
      // while (object.parent) {
      //   object = object.parent;
      //   if (object instanceof THREE.Group && object.name === 'tree') {
      //     break;
      //   }
      // }

      const itemTarget = this._raycaster.intersectObjects(this._items);
      const formData = new FormData();
      // console.log('closeTarget:', closeTarget);
      const TOKEN = localStorage.getItem('jwt') || '';
      if (closeTarget.length > 0) {
        // scene1으롣 돌아가기
        let glbFile: Blob;
        exporter.parse(
          this._tree[0],
          function (result) {
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
              console.log(res);
            });
          },
          function (error) {
            console.log(error);
          },
          { binary: true },
        );

        // 백에 glb 보내기

        this._scene2.remove(this._showcase);
        this._scene2.remove(...this._items);
        this._scene2.remove(this._close);
        // 나중에 any 지우기
        this._dragControls.forEach((control: any) => {
          control.deactivate();
        });

        this._scenenumber = 1;
        this._setupControls();
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
  _setupRotate(event: any) {
    if (this._scenenumber === 2) {
      event.preventDefault();
      // console.log('rotate', this._tree[0]);
      this._tree[0].rotateY(event.deltaY * 0.0005);
    }
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
    this._renderer.render(this._scene, this._camera);
    this.update();

    requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}
