/*
 * Waterfront backdrop: uses four local CC0 Kenney GLB assets.
 * The scene is intentionally low-poly and decorative; portfolio content never depends on WebGL.
 */
import * as THREE from "./assets/vendor/three.module.js";
import { GLTFLoader } from "./assets/vendor/GLTFLoader.js";

const canvas = document.getElementById("waterfront-scene");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactLayout = window.matchMedia("(max-width: 760px)");

if (canvas && !reducedMotion.matches && !compactLayout.matches && "WebGLRenderingContext" in window) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x303052, 0.015);

  const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 110);
  camera.position.set(0, 3.6, 15);

  const horizon = new THREE.Group();
  scene.add(horizon);

  const hemi = new THREE.HemisphereLight(0x71506f, 0x101c35, 1.65);
  scene.add(hemi);
  const sunset = new THREE.DirectionalLight(0xffb878, 2.8);
  sunset.position.set(-8, 8, 5);
  scene.add(sunset);
  const cyanFill = new THREE.PointLight(0x76bdf3, 5.5, 25, 2);
  cyanFill.position.set(6, 2, 4);
  scene.add(cyanFill);
  const violetFill = new THREE.PointLight(0xc77c78, 7, 30, 2);
  violetFill.position.set(-7, 2, 3);
  scene.add(violetFill);

  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(92, 46, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x173257, transparent: true, opacity: 0.52, depthWrite: false })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -3.4;
  water.position.z = -11;
  scene.add(water);

  const waterLines = new THREE.Group();
  for (let index = 0; index < 11; index += 1) {
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(28 - index * 1.1, 0.025),
      new THREE.MeshBasicMaterial({ color: 0xffb878, transparent: true, opacity: 0.15, depthWrite: false })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.set(2, -3.34, -8 - index * 1.55);
    waterLines.add(line);
  }
  scene.add(waterLines);

  const makeBuilding = (x, height, width, depth) => {
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: 0x71506f, emissive: 0x303052, emissiveIntensity: 0.7, roughness: 0.66, metalness: 0.22 })
    );
    building.position.set(x, height / 2 - 3.2, -20 - Math.abs(x) * 0.08);
    horizon.add(building);

    const windowBand = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.78, height * 0.14, depth + 0.018),
      new THREE.MeshBasicMaterial({ color: 0xffb878, transparent: true, opacity: 0.27 })
    );
    windowBand.position.copy(building.position);
    windowBand.position.y += height * 0.14;
    horizon.add(windowBand);
  };

  [-10, -7.8, -5.8, -3.7, -1.4, 0.6, 2.4, 4.1, 6.2, 8.6, 11].forEach((x, index) => {
    makeBuilding(x, 3.2 + (index % 4) * 1.45, 1.15 + (index % 2) * 0.55, 1.2);
  });

  const sunDisc = new THREE.Mesh(
    new THREE.CircleGeometry(1.42, 32),
    new THREE.MeshBasicMaterial({ color: 0xffd29d, transparent: true, opacity: 0.62, depthWrite: false })
  );
  sunDisc.position.set(-5.6, 1.9, -22);
  scene.add(sunDisc);

  const haze = new THREE.Mesh(
    new THREE.PlaneGeometry(34, 13),
    new THREE.MeshBasicMaterial({ color: 0xc77c78, transparent: true, opacity: 0.09, depthWrite: false })
  );
  haze.position.set(0, 0.3, -23.5);
  scene.add(haze);

  const loader = new GLTFLoader();
  const loadAsset = (url) => new Promise((resolve) => loader.load(url, (gltf) => resolve(gltf.scene), undefined, () => resolve(null)));

  const tintAsset = (model, color, opacity = 1) => {
    model.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      child.material = child.material.clone();
      child.material.color.lerp(new THREE.Color(color), 0.5);
      child.material.transparent = opacity < 1;
      child.material.opacity = opacity;
      child.material.roughness = 0.82;
    });
  };

  Promise.all([
    loadAsset("assets/scene/kenney-building-a.glb"),
    loadAsset("assets/scene/kenney-building-e.glb"),
    loadAsset("assets/scene/kenney-palm.glb"),
    loadAsset("assets/scene/kenney-road.glb")
  ]).then(([buildingA, buildingE, palm, road]) => {
    [buildingA, buildingE].forEach((model, index) => {
      if (!model) return;
      tintAsset(model, index ? 0x71506f : 0x303052, 0.94);
      for (let copy = 0; copy < 4; copy += 1) {
        const tower = model.clone(true);
        const side = copy % 2 ? 1 : -1;
        tower.scale.setScalar(0.55 + copy * 0.07);
        tower.position.set(side * (6.5 + copy * 1.65), -3.2, -18 - copy * 1.2);
        tower.rotation.y = side * (0.14 + copy * 0.04);
        horizon.add(tower);
      }
    });

    if (road) {
      tintAsset(road, 0x101c35, 0.96);
      road.scale.set(3.8, 0.8, 3.8);
      road.position.set(3.4, -3.25, -8.6);
      road.rotation.y = -0.33;
      scene.add(road);
    }

    if (palm) {
      tintAsset(palm, 0x303052, 0.96);
      [[-7.4, -2.95, -8.2, 0.7], [-5.6, -3.05, -9.6, 0.52], [8.5, -3.0, -9.4, 0.64]].forEach(([x, y, z, scale]) => {
        const tree = palm.clone(true);
        tree.scale.setScalar(scale);
        tree.position.set(x, y, z);
        tree.rotation.y = x * 0.08;
        horizon.add(tree);
      });
    }
  });

  let pointerX = 0;
  let pointerY = 0;
  const resize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX / window.innerWidth - 0.5;
    pointerY = event.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  resize();

  const clock = new THREE.Clock();
  const render = () => {
    const time = clock.getElapsedTime();
    horizon.rotation.y += (pointerX * 0.055 - horizon.rotation.y) * 0.025;
    horizon.position.y = 0.92 + Math.sin(time * 0.22) * 0.09;
    camera.position.x += (pointerX * 0.8 - camera.position.x) * 0.018;
    camera.position.y += (3.6 - pointerY * 0.32 - camera.position.y) * 0.018;
    waterLines.position.x = Math.sin(time * 0.16) * 0.08;
    haze.material.opacity = 0.08 + Math.sin(time * 0.1) * 0.015;
    sunDisc.material.opacity = 0.58 + Math.sin(time * 0.18) * 0.035;
    camera.lookAt(0, -1.1, -11);
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  };
  render();
}
