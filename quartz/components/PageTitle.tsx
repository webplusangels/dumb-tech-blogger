import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface PageTitleOptions {
  logo?: string // Path to logo image (e.g., "/static/logo.png")
  logo3d?: string // Path to 3D model (GLTF or GLB format, e.g., "/static/logo.glb")
  logoFallback?: string // Path to fallback image when 3D fails (e.g., "/static/icon.png")
  rotationSpeed?: number // Rotation speed in degrees per second (default: 10)
}

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  // Check if logo option is provided
  const opts = (PageTitle as any).opts as PageTitleOptions | undefined
  const logo = opts?.logo
  const logo3d = opts?.logo3d
  const logoFallback = opts?.logoFallback
  const rotationSpeed = opts?.rotationSpeed ?? 10

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {logo3d ? (
          <div
            class="page-title-3d-container"
            data-model={baseDir + logo3d}
            data-rotation-speed={rotationSpeed}
            data-fallback={logoFallback ? baseDir + logoFallback : ""}
          >
            {logoFallback && (
              <img src={baseDir + logoFallback} alt={title} class="page-title-3d-fallback" />
            )}
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
  position: relative;
}

.page-title-3d-fallback {
  position: absolute;
  width: 100px;
  height: 100px;
  object-fit: contain;
  z-index: 1;
  transition: opacity 0.3s ease-in-out;
}

.page-title-3d-fallback.hidden {
  opacity: 0;
  pointer-events: none;
}

.page-title-3d-canvas {
  width: 100px;
  height: 100px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.page-title-3d-canvas.loaded {
  opacity: 1;
}
`

PageTitle.afterDOMLoaded = `
// Add import map for Three.js
if (!document.querySelector('script[type="importmap"]')) {
  const importMap = document.createElement('script');
  importMap.type = 'importmap';
  importMap.textContent = JSON.stringify({
    imports: {
      'three': 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
      'three/addons/': 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/'
    }
  });
  document.head.prepend(importMap);
}

(async () => {
  try {
    // Use relative path to work with baseUrl
    const baseUrl = document.querySelector('base')?.href || window.location.origin + '/';
    const scriptPath = new URL('static/logo-3d.js', baseUrl).href;
    const { init3DLogo } = await import(scriptPath);
    
    function initLogo() {
      const container = document.querySelector('.page-title-3d-container');
      if (container) {
        const canvas = container.querySelector('.page-title-3d-canvas');
        const fallback = container.querySelector('.page-title-3d-fallback');
        
        // Reset states
        if (canvas) {
          canvas.classList.remove('loaded');
        }
        if (fallback) {
          fallback.classList.remove('hidden');
        }
        
        init3DLogo(container);
      }
    }
    
    // Initialize on first load
    initLogo();
    
    // Re-initialize on navigation
    document.addEventListener('nav', initLogo);
  } catch (error) {
    console.error('3D Logo: Failed to load module', error);
  }
})();
`

export default ((opts?: PageTitleOptions) => {
  const component = PageTitle
  ;(component as any).opts = opts
  return component
}) satisfies QuartzComponentConstructor
