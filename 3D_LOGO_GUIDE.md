# 3D Logo Setup Guide

## Quick Start: Adding a 3D Logo

### Step 1: Get a 3D Model

#### Option A: Convert STL to GLB Online

1. Visit https://products.aspose.app/3d/conversion/stl-to-glb
2. Upload your STL file
3. Download the converted GLB file

#### Option B: Create in Blender

1. Open Blender
2. Create or import your model
3. File → Export → glTF 2.0 (.glb/.gltf)
4. Choose GLB format (binary, smaller file size)
5. Export with these settings:
   - Format: GLB
   - Include: Only selected objects
   - Geometry: Apply Modifiers
   - Compression: Enabled

#### Option C: Use Free Models

- **Sketchfab**: https://sketchfab.com/3d-models (filter by downloadable)
- **Poly Haven**: https://polyhaven.com/models
- **Free3D**: https://free3d.com/3d-models/glb

### Step 2: Optimize Your Model

**Important**: Keep file size small for fast loading!

#### Recommended Tools:

- **glTF-Transform**: Command-line tool for optimization

  ```bash
  npm install -g @gltf-transform/cli
  gltf-transform optimize input.glb output.glb
  ```

- **Online Tools**:
  - https://gltf.report/ (analyze and optimize)
  - https://products.aspose.app/3d/viewer/glb (preview)

#### Optimization Tips:

- Remove unnecessary materials
- Reduce polygon count
- Remove animations (if not needed)
- Compress textures
- Target file size: < 500KB

### Step 3: Add to Your Site

1. **Save the model**:

   ```
   quartz/static/logo.glb
   ```

2. **Update configuration** in `quartz.layout.ts`:

   ```typescript
   export const sharedPageComponents: SharedLayout = {
     head: Component.Head(),
     header: [
       Component.PageTitle({
         logo3d: "static/logo.glb",
         rotationSpeed: 10, // Adjust speed (default: 10 deg/sec)
       }),
       Component.Darkmode(),
     ],
     // ... rest of config
   }
   ```

3. **Rebuild**:

   ```bash
   npx quartz build --serve
   ```

4. **Test**: Visit http://localhost:8080

### Step 4: Adjust Settings

#### Rotation Speed Examples:

```typescript
rotationSpeed: 5 // Very slow, subtle rotation
rotationSpeed: 10 // Default, noticeable but calm
rotationSpeed: 20 // Moderate speed
rotationSpeed: 30 // Fast rotation
rotationSpeed: 60 // Very fast (not recommended)
```

## Troubleshooting

### Model Not Showing?

1. Check browser console for errors (F12)
2. Verify file path is correct: `static/logo.glb`
3. Ensure file is in `quartz/static/` folder
4. Check file size (should be < 5MB)
5. Test GLB file at https://gltf.report/

### Model Too Big/Small?

The model is auto-scaled to fit 80x80px display area. If it looks wrong:

1. Open in Blender
2. Scale the object (S key)
3. Apply scale transformation (Ctrl+A → Scale)
4. Re-export

### Model Position Offset?

The model is auto-centered. If it's still off:

1. In Blender: Select object → Object → Set Origin → Origin to Geometry
2. Re-export

### Performance Issues?

1. Reduce polygon count in Blender (Decimate modifier)
2. Remove textures if not needed
3. Use glTF-Transform optimizer
4. Consider using a simpler model

## Example Models

### Simple Cube (Minimal Example)

Create in Blender:

1. Delete default cube
2. Add → Mesh → Cube
3. Scale slightly (S → 0.8)
4. Add material with metallic finish
5. Export as GLB

### Extruded Logo (From 2D Image)

1. Import SVG or PNG as plane
2. Convert to mesh
3. Add Solidify modifier (extrude)
4. Apply modifier
5. Export as GLB

### Spinning Icon

Use a simple icon model:

- Low poly count (< 1000 triangles)
- Single material
- No textures for smallest file size

## Advanced Tips

### Custom Lighting (Advanced)

The 3D viewer uses:

- Ambient light (0.8 intensity)
- Directional light (0.5 intensity, from top-right)

To adjust, modify `PageTitle.tsx` afterDOMLoaded script.

### Custom Camera Position

Default camera is at `z: 3`. To adjust, modify the script in `PageTitle.tsx`:

```javascript
camera.position.z = 5 // Move camera further
```

### Adding Animations

If your GLB has animations, you can enable them by modifying the script:

```javascript
const mixer = new THREE.AnimationMixer(model)
gltf.animations.forEach((clip) => {
  mixer.clipAction(clip).play()
})
// Then update mixer in animate loop
```

## Resources

- **Three.js Documentation**: https://threejs.org/docs/
- **GLTF Spec**: https://www.khronos.org/gltf/
- **Blender Tutorials**: https://www.blender.org/support/tutorials/
- **glTF-Transform CLI**: https://gltf-transform.donmccurdy.com/
