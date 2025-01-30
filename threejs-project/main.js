import * as THREE from 'three';

// 씬 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // 검은색 배경 추가

// 카메라 생성                                                                                                                                                      
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// 렌더러 생성
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ 
  canvas,
  antialias: true // 안티앨리어싱 추가
});
renderer.setPixelRatio(window.devicePixelRatio); // 픽셀 비율 설정
renderer.setSize(window.innerWidth, window.innerHeight);

// 정사각형(큐브) 생성
const geometry = new THREE.BoxGeometry(2, 2, 2);

// 큐브 면 material
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shininess: 100,
  specular: 0x004400,
  flatShading: false
});

// 와이어프레임 material
const wireframeMaterial = new THREE.LineBasicMaterial({
  color: 0x000000,
  linewidth: 2
});

// 큐브 면과 와이어프레임 생성
const cube = new THREE.Mesh(geometry, material);
const wireframe = new THREE.LineSegments(
  new THREE.EdgesGeometry(geometry),
  wireframeMaterial
);

// 큐브와 와이어프레임을 그룹으로 묶기
const cubeGroup = new THREE.Group();
cubeGroup.add(cube);
cubeGroup.add(wireframe);
scene.add(cubeGroup);

// 조명 수정
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 환경광 강도 증가
scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 1.5, 100); // 포인트 라이트 강도 증가
light.position.set(5, 5, 5);
scene.add(light);

// 두 번째 조명 추가
const light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(-5, -5, -5);
scene.add(light2);

// 애니메이션
function animate() {
  requestAnimationFrame(animate);
  
  cubeGroup.rotation.x += 0.007;
  cubeGroup.rotation.y += 0.007;
  
  renderer.render(scene, camera);
}
animate();

// 반응형 처리
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});