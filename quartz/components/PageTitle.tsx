import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface PageTitleOptions {
  logo?: string // Path to logo image (e.g., "/static/logo.png")
  logo3d?: string // Path to 3D model (GLTF or GLB format, e.g., "/static/logo.glb")
  rotationSpeed?: number // Rotation speed in degrees per second (default: 10)
}

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  // Check if logo option is provided
  const opts = (PageTitle as any).opts as PageTitleOptions | undefined
  const logo = opts?.logo
  const logo3d = opts?.logo3d
  const rotationSpeed = opts?.rotationSpeed ?? 10

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {logo3d ? (
          <div
            class="page-title-3d-container"
            data-model={baseDir + logo3d}
            data-rotation-speed={rotationSpeed}
          >
            <canvas class="page-title-3d-canvas" width="100" height="100"></canvas>
          </div>
        ) : logo ? (
          <img src={baseDir + logo} alt={title} class="page-title-logo" />
        ) : (
          title
        )}
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.page-title-logo {
  max-height: 2.5rem;
  height: auto;
  width: auto;
  max-width: 200px;
}

.page-title-3d-container {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title-3d-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
`

PageTitle.afterDOMLoaded = `
// Load Three.js and GLTFLoader using importmap for 3D model support
const container3d = document.querySelector('.page-title-3d-container');
if (container3d) {
  const modelPath = container3d.getAttribute('data-model');
  const rotationSpeed = parseFloat(container3d.getAttribute('data-rotation-speed') || '10');
  const canvas = container3d.querySelector('.page-title-3d-canvas');
  
  console.log('3D Logo: Loading model from', modelPath);
  
  // Create import map for Three.js
  const importMap = document.createElement('script');
  importMap.type = 'importmap';
  importMap.textContent = JSON.stringify({
    imports: {
      'three': 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
      'three/addons/': 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/'
    }
  });
  document.head.appendChild(importMap);
  
  // Create and load the script
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = \`
    (async () => {
      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
        
        console.log('3D Logo: Modules loaded successfully');
        
        const canvas = document.querySelector('.page-title-3d-canvas');
        if (!canvas) {
          console.error('3D Logo: Canvas not found');
          return;
        }
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
          canvas, 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance'
        });
        
        renderer.setSize(100, 100);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        
        // Enhanced lighting for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);
        
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight1.position.set(5, 5, 5);
        scene.add(directionalLight1);
        
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);
        
        camera.position.z = 3;
        
        let model = null;
        const loader = new GLTFLoader();
        
        console.log('3D Logo: Starting to load model...');
        
        loader.load(
          '\${modelPath}',
          (gltf) => {
            console.log('3D Logo: Model loaded successfully');
            model = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            
            model.scale.set(scale, scale, scale);
            model.position.sub(center.multiplyScalar(scale));
            
            scene.add(model);
            console.log('3D Logo: Model added to scene and animating');
          },
          (progress) => {
            if (progress.total > 0) {
              const percent = (progress.loaded / progress.total * 100).toFixed(0);
              console.log('3D Logo: Loading progress ' + percent + '%');
            }
          },
          (error) => {
            console.error('3D Logo: Error loading model', error);
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#888';
              ctx.font = '9px sans-serif';
              ctx.fillText('Load Failed', 10, 40);
            }
          }
        );
        
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          if (model) {
            model.rotation.y += (\${rotationSpeed} * Math.PI / 180) / 60;
          }
          renderer.render(scene, camera);
        };
        animate();
        
      } catch (err) {
        console.error('3D Logo: Failed to load Three.js modules', err);
        const canvas = document.querySelector('.page-title-3d-canvas');
        const ctx = canvas?.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#888';
          ctx.font = '10px sans-serif';
          ctx.fillText('3D Error', 15, 40);
        }
      }
    })();
  \`;
  
  document.head.appendChild(script);
}
`

export default ((opts?: PageTitleOptions) => {
  const component = PageTitle
  ;(component as any).opts = opts
  return component
}) satisfies QuartzComponentConstructor
