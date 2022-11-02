import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'; // fps 표시하기위 한 모듈
//충돌 감지 를 위한 모듈들
import { Octree } from 'three/examples/jsm/math/Octree.js';
import { Capsule } from 'three/examples/jsm/math/Capsule.js';
import { Mesh } from 'three';
import { gsap } from 'gsap';

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

export class HomeCanvas {
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
  _cars: any;

  _previousTime: any;
  _requestId: any;

  constructor() {
    // const divContainer = document.querySelector('#webgl-container');
    // this._divContainer = divContainer;
    console.log('!');
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

    // this._setupOctree();
    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();
    this._setupPicking();
    this._setupClick();
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

    //애니메이션 update
    if (this._mixer) {
      // console.log('mixer');  //mixer는 charecter.glb의 animation
      const deltaTime = time - this._previousTime; //이전프레임과 현재프레임 간의 시간차이
      this._mixer.update(deltaTime);

      //카메라 각도 조정
      const angleCameraDirectionAxixsY =
        Math.atan2(
          this._camera.position.x - this._model.position.x,
          this._camera.position.z - this._model.position.z,
        ) + Math.PI;

      //모델 회전 후 각도
      const rotateQuarternion = new THREE.Quaternion();
      rotateQuarternion.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        angleCameraDirectionAxixsY,
        //  + this._directionOffset(),
      );

      //실제 회전
      this._model.quaternion.rotateTowards(
        rotateQuarternion,
        THREE.MathUtils.degToRad(5),
      );

      //모뎅 이동 방향 = 카메라 방향
      const walkDirection = new THREE.Vector3();
      this._camera.getWorldDirection(walkDirection);

      //하늘 땅으로 이동 x
      // walkDirection.y = 0;
      walkDirection.y = this._bOnTheGround ? 0 : -1; // 땅위에있으면 0 땅위가 아니라고 판단되면 y축으로 -1로이동(추락)
      walkDirection.normalize();

      // //키보드 입력에 대해 각도 회전
      // walkDirection.applyAxisAngle(
      //   new THREE.Vector3(0, 1, 0),
      //   this._directionOffset(),
      // );

      //캐릭터 부드럽게 이동하기 위해
      if (this._speed < this._maxSpeed) this._speed += this._acceleration;
      else this._speed -= this._acceleration * 2;

      //추락 속도
      if (!this._bOnTheGround) {
        this._fallingAcceleration += 1;
        this._fallingSpeed += Math.pow(this._fallingAcceleration, 2);
      } else {
        this._fallingAcceleration = 0;
        this._fallingSpeed = 0;
      }

      const velocity = new THREE.Vector3(
        walkDirection.x * this._speed,
        walkDirection.y * this._fallingSpeed,
        walkDirection.z * this._speed,
      );
      const deltaPosition = velocity.clone().multiplyScalar(deltaTime);

      // //이동 거리 계산
      // const moveX = walkDirection.x * (this._speed * deltaTime);
      // const moveZ = walkDirection.z * (this._speed * deltaTime);

      // //계산된 거리만큼 이동
      // this._model.position.x += moveX;
      // this._model.position.z += moveZ;

      // 이전에는 모델을 직접 움직였지만, 충돌 감지를 위해 캡슐이동후 모델을 그안에 넣는 형식으로 변환
      this._model._capsule.translate(deltaPosition);

      //충돌 검사
      const result = this._worldOctree.capsuleIntersect(this._model._capsule);
      if (result) {
        //충돌
        this._model._capsule.translate(
          result.normal.multiplyScalar(result.depth),
        );
        this._bOnTheGround = true;
      } else {
        //충돌 x
        this._bOnTheGround = false;
      }

      // 변경전 모델의 위치저장
      const previousPosition = this._model.position.clone();
      const capsuleHeight =
        this._model._capsule.end.y -
        this._model._capsule.start.y +
        this._model._capsule.radius * 2; //캡슐높이
      // 모델의 위치를 캡슐에 맞춤
      this._model.position.set(
        this._model._capsule.start.x,
        this._model._capsule.start.y -
          this._model._capsule.radius +
          capsuleHeight / 2,
        this._model._capsule.start.z,
      );

      // //카메라 위치도 모뎅 이동만큼 이동
      // this._camera.position.x += moveX;
      // this._camera.position.z += moveZ;

      //카메라도 캡슐에 맞춰
      this._camera.position.x -= previousPosition.x - this._model.position.x;
      this._camera.position.z -= previousPosition.z - this._model.position.z;

      //
      this._controls.target.set(
        this._model.position.x,
        this._model.position.y,
        this._model.position.z,
      );
    }
    this._previousTime = time;
  }

  _setupOctree(model: any) {
    this._worldOctree = new Octree();
    this._worldOctree.fromGraphNode(model);
    console.dir(this._worldOctree);
  }

  _setupControls() {
    this._controls = new OrbitControls(this._camera, this._canvasContainer);

    //캐릭터 카메라 중앙에 변경
    this._controls.target.set(0, 100, 0);

    //orbicontrol shift 기능 없애기
    this._controls.enablePan = false;

    //마우스 회전 부드럽게
    this._controls.enableDamping = true;

    const stats = Stats();
    this._canvasContainer.appendChild(stats.dom);
    this._fps = stats;

    //키눌렀을 때 애니메이션
    this._pressedKeys = {};

    document.addEventListener('keydown', (event) => {
      this._pressedKeys[event.key.toLowerCase()] = true;
      this._processAniamtion();
    });

    //키 눌렀다 떼질때 이벤트
    document.addEventListener('keyup', (event) => {
      this._pressedKeys[event.key.toLowerCase()] = false;
      this._processAniamtion();
    });
  }

  //애니메이션 지정하는 함수
  _processAniamtion() {
    const previousAnimationAction = this._currentAnimationAction;
    if (
      this._pressedKeys['w'] ||
      this._pressedKeys['a'] ||
      this._pressedKeys['s'] ||
      this._pressedKeys['d']
    ) {
      if (this._pressedKeys['shift']) {
        this._currentAnimationAction = this._animationMap['Run'];
        // this._speed = 350;
        this._maxSpeed = 350;
        this._acceleration = 3;
      } else {
        this._currentAnimationAction = this._animationMap['Walk'];
        // this._speed = 80;
        this._maxSpeed = 80;
        this._acceleration = 3;
      }
    } else {
      this._currentAnimationAction = this._animationMap['Idle'];
      this._speed = 0;
      this._maxSpeed = 0;
      this._acceleration = 0;
    }

    if (previousAnimationAction !== this._currentAnimationAction) {
      previousAnimationAction.fadeOut(0.5);
      this._currentAnimationAction.reset().fadeIn(0.5).play();
    }
  }

  _setupModel() {
    // const planeGeometry = new THREE.PlaneGeometry(1000, 1000);          // 바닥면 생성
    // const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x878787 });
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // plane.rotation.x = -Math.PI/2;

    // this._scene.add(plane);
    // plane.receiveShadow = true;  // 평며은 그림자받기만

    // //바닥평면을 옥트리객체에 추가
    // this._worldOctree.fromGraphNode(plane);
    const cars: any = [];
    const loader = new GLTFLoader();

    loader.load('space.glb', (gltf) => {
      const model = gltf.scene;

      this._scene.add(model);

      model.traverse((child) => {
        // model은 그림자 생성 true
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.name = 'box';
        }
      });

      this._setupOctree(model);
      console.log(dumpObject(model, [], true, '').join('\n'));
    });

    // 디버깅
    // loader.load("./data/character.glb", (gltf) => {
    //     const model = gltf.scene;
    //     this._scene.add(model);
    //     console.dir(model)
    // }
    // )

    loader.load('character.glb', (gltf) => {
      const model: any = gltf.scene;

      this._scene.add(model);
      console.dir(model);

      model.traverse((child: any) => {
        // model은 그림자 생성 true
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
        }
      });

      //애니메이션 정보 갖고오기
      const animationClips = gltf.animations; //THREE.AnimationCLip []
      const mixer = new THREE.AnimationMixer(model);
      const animationMap: any = {};
      animationClips.forEach((clip) => {
        const name = clip?.name;
        console.log(name);
        animationMap[name] = mixer.clipAction(clip); //THREE.AnimationAction
      });

      //캐릭터에 idel 애니메이션
      this._mixer = mixer;
      this._animationMap = animationMap;
      this._currentAnimationAction = this._animationMap['Idle'];
      this._currentAnimationAction.play();

      const box = new THREE.Box3().setFromObject(model);
      model.position.y = (box.max.y - box.min.y) / 2;

      //캡슐을 정하기
      const height = box.max.y - box.min.y; // 캐릭터 높이
      const diameter = box.max.z - box.min.z; // 반지름
      model._capsule = new Capsule(
        new THREE.Vector3(0, diameter / 2, 0),
        new THREE.Vector3(0, height - diameter / 2, 0),
        diameter / 2,
      );

      const axisHelper = new THREE.AxesHelper(1000);
      this._scene.add(axisHelper);

      //모델 바운딩 박스
      const boxHelper = new THREE.BoxHelper(model);
      this._scene.add(boxHelper);
      this._boxHelper = boxHelper;
      this._model = model;
      this._model.name = 'car';
      cars.push(model);

      // //상자하나 생성
      // const boxG = new THREE.BoxGeometry(100, diameter-5, 100);
      // const boxM = new THREE.Mesh(boxG, planeMaterial);
      // boxM.receiveShadow = true;
      // boxM.castShadow = true;
      // boxM.position.set(150, 0, 0);
      // this._scene.add(boxM);

      // //상자 장애물로 지정
      // this._worldOctree.fromGraphNode(boxM);
    });

    // scene에 있는 모든 3dobj 검사

    this._cars = cars;
    console.log(cars);
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

  _setupClick() {
    const raycaster2 = new THREE.Raycaster();
    this._canvasContainer.addEventListener(
      'dblclick',
      this._setupModal.bind(this),
    );
    this._raycaster2 = raycaster2;
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

    // scene에 있는 모든 3dobj 검사
    // const cars: any = [];
    // this._scene.traverse((obj3d: any) => {
    //   if (obj3d.name === 'car') {
    //     cars.push(obj3d);
    //   }
    // });
    // this._cars = cars;
    // console.log(cars);

    // 모든 3d 돌면서 더블클릭된 객체 zoomfit
    for (let i = 0; i < this._cars.length; i++) {
      const car = this._cars[i];
      const targets = this._raycaster.intersectObject(car);
      if (targets.length > 0) {
        this._zoomFit(car, 90);
        setTimeout(() => {
          this._setupModal();
        }, 1500);
        // this._controls.enabled = true;
        return;
      } else {
        const box = this._scene.getObjectByName('box');
        this._removeModal();
        setTimeout(() => {
          this._zoomFit(box, 90);
        }, 100);
      }
    }
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
      5000,
    );
    console.log('camera');
    camera.position.set(0, 100, 500);
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

    this._addPointLight(500, 150, 500, 0xff0000);
    this._addPointLight(-500, 150, 500, 0xffff00);
    this._addPointLight(-500, 150, -500, 0x00ff00);
    this._addPointLight(500, 150, -500, 0x0000ff);

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.2);
    shadowLight.position.set(200, 500, 200);
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
    shadowLight.shadow.camera.top = shadowLight.shadow.camera.right = 700;
    shadowLight.shadow.camera.bottom = shadowLight.shadow.camera.left = -700;
    shadowLight.shadow.camera.near = 100;
    shadowLight.shadow.camera.far = 900;
    shadowLight.shadow.radius = 5;
    const shadowCameraHelper = new THREE.CameraHelper(
      shadowLight.shadow.camera,
    );
    this._scene.add(shadowCameraHelper);
  }

  _previousDirectionOffset = 0;

  //키조작에 따른 모델 각 조정값
  // _directionOffset() {
  //   const pressedKeys = this._pressedKeys;
  //   let directionOffset = 0;

  //   if (pressedKeys['w']) {
  //     if (pressedKeys['a']) {
  //       directionOffset = Math.PI / 4;
  //     } else if (pressedKeys['d']) {
  //       directionOffset = -Math.PI / 4;
  //     }
  //   } else if (pressedKeys['s']) {
  //     if (pressedKeys['a']) {
  //       directionOffset = Math.PI / 4 + Math.PI / 2;
  //     } else if (pressedKeys['d']) {
  //       directionOffset = -Math.PI / 4 - Math.PI / 2;
  //     } else {
  //       directionOffset = Math.PI;
  //     }
  //   } else if (pressedKeys['a']) {
  //     directionOffset = Math.PI / 2;
  //   } else if (pressedKeys['d']) {
  //     directionOffset = -Math.PI / 2;
  //   } else {
  //     directionOffset = this._previousDirectionOffset; //이동후 캐릭터 회전 없애기
  //   }

  //   this._previousDirectionOffset = directionOffset;
  //   return directionOffset;
  // }

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
