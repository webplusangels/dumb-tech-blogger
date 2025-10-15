// 3D Logo Loader
let currentAnimationId = null
let currentRenderer = null

export async function init3DLogo(container) {
  if (!container) return

  // Stop previous animation and cleanup
  if (currentAnimationId) {
    cancelAnimationFrame(currentAnimationId)
    currentAnimationId = null
  }
  if (currentRenderer) {
    currentRenderer.dispose()
    currentRenderer = null
  }

  const modelPath = container.getAttribute("data-model")
  const rotationSpeed = parseFloat(container.getAttribute("data-rotation-speed") || "8")
  const canvas = container.querySelector(".page-title-3d-canvas")
  const fallbackImg = container.querySelector(".page-title-3d-fallback")

  if (!canvas || !modelPath) return

  try {
    // Import Three.js (resolved via import map)
    const THREE = await import("three")
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js")

    // Setup scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })

    currentRenderer = renderer

    renderer.setSize(100, 100)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 5, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    camera.position.z = 3

    // Load model
    let model = null
    const loader = new GLTFLoader()

    console.log("3D Logo: Loading model from", modelPath)

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene

        // Center and scale
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim

        model.scale.set(scale, scale, scale)
        model.position.sub(center.multiplyScalar(scale))
        scene.add(model)

        // Show 3D, hide fallback
        setTimeout(() => {
          canvas.classList.add("loaded")
          if (fallbackImg) fallbackImg.classList.add("hidden")
          console.log("3D Logo: Loaded successfully")
        }, 100)
      },
      (progress) => {
        console.log(
          "3D Logo: Loading progress",
          Math.round((progress.loaded / progress.total) * 100) + "%",
        )
      },
      (error) => {
        console.error("3D Logo: Failed to load model", error)
        console.error("3D Logo: Model path was", modelPath)
        canvas.style.display = "none"
      },
    )

    // Animation
    function animate() {
      currentAnimationId = requestAnimationFrame(animate)
      if (model) {
        model.rotation.y += (rotationSpeed * Math.PI) / 180 / 60
      }
      renderer.render(scene, camera)
    }
    animate()
  } catch (error) {
    console.error("3D Logo: Failed to initialize", error)
    canvas.style.display = "none"
  }
}
