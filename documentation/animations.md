# Muhammad Aqil Khan Portfolio Platform — Animation & 3D Engineering Specification

---

## 1. Animation Engine Architecture

The animation system integrates three performance-oriented motion tiers:
1. **Lenis**: Virtual momentum smooth-scrolling engine synchronizing scroll velocity into GSAP ticker frames.
2. **GSAP (GreenSock) & ScrollTrigger**: Hardware-accelerated CSS transform/opacity tweens with contextual lifecycle bounding.
3. **Three.js & React Three Fiber (R3F)**: Interactive WebGL 3D geometric scene rendering with camera lerp physics and device pixel ratio capping.

---

## 2. Reduced Motion & Accessibility

- Monitored via the reactive `useReducedMotion()` hook.
- When `prefers-reduced-motion: reduce` is detected:
  - GSAP timelines short-circuit entrance translation distances (`y: 0`, `opacity: 1`).
  - Lenis smooth-scrolling disables momentum smoothing, reverting to instantaneous native scrolling.
  - Three.js rotation and float speed are neutralized to 0.

---

## 3. WebGL Capping & Degradation

In [`CanvasContainer.jsx`](file:///c:/Users/Atticus/OneDrive/Desktop/Web%20Dev/My%20Web%20Navtacc/NAVTTC/Projects/Aqil%20khan%20porfolio%201/client/src/three/components/CanvasContainer.jsx):
- Canvas DPR is strictly capped at `dpr={[1, 1.5]}` to prevent GPU thermal throttling on high-density retina displays.
- Automated WebGL context detection: if `WebGLRenderingContext` is unavailable, a stylized CSS radial monogram visual renders seamlessly.
- Context lifecycle: `gsap.context()` encapsulates all section timelines with automatic `ctx.revert()` invocation during component unmounts, preventing orphaned scroll listeners or memory retention.
