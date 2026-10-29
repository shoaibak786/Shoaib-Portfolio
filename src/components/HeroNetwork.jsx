import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroNetwork — refined constellation background
 * - Crisp nodes (sharp core + faint halo), hubs get a hairline ring
 * - Mostly quiet, neutral network; lime appears only where you interact
 * - Cursor "energizes" nearby nodes and links; clicks send a ripple through the network
 * - A soft ambient ripple runs every few seconds so it feels alive without a cursor
 * - Quieter behind the hero text, depth-faded, pauses off-screen, respects reduced motion
 */

const LIME = new THREE.Color(0xc5ff4a);
const NEUTRAL = new THREE.Color(0xb9c4b9);

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aEnergy;
  attribute float aAlpha;
  attribute vec3 aColor;
  uniform float uScale;
  uniform vec3 uAccent;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vEnergy;
  varying float vHub;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float dist = -mv.z;
    float depth = clamp((13.5 - dist) / 6.5, 0.0, 1.0);
    vEnergy = aEnergy;
    vHub = step(0.08, aSize);
    vColor = mix(aColor, uAccent, aEnergy);
    vAlpha = aAlpha * mix(0.35, 1.0, depth);
    gl_PointSize = aSize * 3.0 * (1.0 + aEnergy * 0.8) * uScale / dist;
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vEnergy;
  varying float vHub;
  void main() {
    float r = length(gl_PointCoord - 0.5) * 2.0;
    if (r > 1.0) discard;
    float core = 1.0 - smoothstep(0.30, 0.36, r);
    float halo = pow(1.0 - r, 3.0) * (0.2 + 0.6 * vEnergy);
    float ring = vHub * (smoothstep(0.54, 0.58, r) - smoothstep(0.62, 0.66, r)) * (0.3 + 0.5 * vEnergy);
    gl_FragColor = vec4(vColor, (core + halo + ring) * vAlpha);
  }
`;

const smooth = (t) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};

export default function HeroNetwork() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    const N = isMobile ? 400 : 600;
    const LINK = isMobile ? 1.2 : 1;
    const CURSOR_R = 2.8;
    const MAX_SEG = N * 8 + 60;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 10;
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const bounds = { w: 8, h: tanHalf * camera.position.z };

    // ---- Node data ----
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    const base = new Float32Array(N * 3);
    const energy = new Float32Array(N);
    const fade = new Float32Array(N);
    const baseAlpha = new Float32Array(N);
    const aSize = new Float32Array(N);
    const aColor = new Float32Array(N * 3);
    const aAlpha = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * bounds.w;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * bounds.h;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * 2.2;

      const bx = (Math.random() - 0.5) * 0.01;
      const by = (Math.random() - 0.5) * 0.01;
      const bz = (Math.random() - 0.5) * 0.004;
      base.set([bx, by, bz], i * 3);
      vel.set([bx, by, bz], i * 3);

      const hub = Math.random() < 0.12;
      const accentNode = Math.random() < (hub ? 0.55 : 0.18);
     aSize[i] = hub ? 0.06 + Math.random() * 0.02 : 0.024 + Math.random() * 0.014;
      const c = accentNode ? LIME : NEUTRAL;
      aColor.set([c.r, c.g, c.b], i * 3);
      baseAlpha[i] = accentNode ? 0.95 : 0.8;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    pGeo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    pGeo.setAttribute("aColor", new THREE.BufferAttribute(aColor, 3));
    pGeo.setAttribute("aEnergy", new THREE.BufferAttribute(energy, 1).setUsage(THREE.DynamicDrawUsage));
    pGeo.setAttribute("aAlpha", new THREE.BufferAttribute(aAlpha, 1).setUsage(THREE.DynamicDrawUsage));

    const pMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: { uScale: { value: 900 }, uAccent: { value: LIME.clone() } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pGeo, pMat);
    points.frustumCulled = false;

    // ---- Links ----
    const linePos = new Float32Array(MAX_SEG * 6);
    const lineCol = new Float32Array(MAX_SEG * 6);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
    lGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3).setUsage(THREE.DynamicDrawUsage));
    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lGeo, lMat);
    lines.frustumCulled = false;

    const group = new THREE.Group();
    group.add(lines, points);
    scene.add(group);

    // ---- Sizing ----
    const buf = new THREE.Vector2();
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bounds.h = tanHalf * camera.position.z;
      bounds.w = bounds.h * camera.aspect;
      renderer.getDrawingBufferSize(buf);
      pMat.uniforms.uScale.value = buf.y / (2 * tanHalf);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // ---- Interaction ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const ripples = [];
    const clock = new THREE.Clock();

    const toWorld = (e) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.tx = nx * bounds.w;
      mouse.ty = ny * bounds.h;
      if (!mouse.active) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.active = Math.abs(nx) <= 1 && Math.abs(ny) <= 1;
    };
    const onMove = (e) => toWorld(e);
    const onDown = (e) => {
      toWorld(e);
      if (mouse.active) ripples.push({ x: mouse.tx, y: mouse.ty, t0: clock.getElapsedTime(), amp: 1 });
    };
    const onUp = (e) => {
      if (e.pointerType === "touch") mouse.active = false;
    };
    const onLeave = () => { mouse.active = false; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(el);

    let nextAmbient = 2.5;

    // ---- Frame step ----
    const step = (t) => {
      const offY = window.scrollY * 0.004;
      group.position.y = offY;

      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;

      if (!reduceMotion && t > nextAmbient) {
        ripples.push({
          x: (Math.random() * 2 - 1) * bounds.w * 0.8,
          y: (Math.random() * 2 - 1) * bounds.h * 0.7,
          t0: t,
          amp: 0.5,
        });
        nextAmbient = t + 5 + Math.random() * 3;
      }
      for (let r = ripples.length - 1; r >= 0; r--) {
        if (t - ripples[r].t0 > 2.2) ripples.splice(r, 1);
      }

      const bx = bounds.w * 1.08;
      const by = bounds.h * 1.08;

      for (let i = 0; i < N; i++) {
        const k = i * 3;

        // drift
        pos[k] += vel[k];
        pos[k + 1] += vel[k + 1];
        pos[k + 2] += vel[k + 2];
        if (pos[k] > bx || pos[k] < -bx) { vel[k] *= -1; base[k] *= -1; pos[k] = Math.max(-bx, Math.min(bx, pos[k])); }
        if (pos[k + 1] > by || pos[k + 1] < -by) { vel[k + 1] *= -1; base[k + 1] *= -1; pos[k + 1] = Math.max(-by, Math.min(by, pos[k + 1])); }
        if (pos[k + 2] > 2.2 || pos[k + 2] < -2.2) { vel[k + 2] *= -1; base[k + 2] *= -1; }

        // energy target: cursor + ripples
        const sx = pos[k];
        const sy = pos[k + 1] + offY;
        let target = 0;

        if (mouse.active) {
          const d = Math.hypot(sx - mouse.x, sy - mouse.y);
          target = smooth(1 - d / CURSOR_R);
        }
        for (let r = 0; r < ripples.length; r++) {
          const rp = ripples[r];
          const age = t - rp.t0;
          const d = Math.hypot(sx - rp.x, sy - (rp.y));
          const front = age * 4.4;
          const w = (d - front) / 0.75;
          const e = rp.amp * Math.max(0, 1 - age / 2.2) * Math.exp(-w * w);
          if (e > target) target = e;
        }
        energy[i] += (target - energy[i]) * 0.14;

        // quieter behind hero text (left side on desktop)
        const f = isMobile ? 0.6 : 0.42 + 0.58 * smooth((pos[k] / bounds.w + 0.1) / 0.9);
        fade[i] = f;
        aAlpha[i] = baseAlpha[i] * f;
      }
      pGeo.attributes.position.needsUpdate = true;
      pGeo.attributes.aEnergy.needsUpdate = true;
      pGeo.attributes.aAlpha.needsUpdate = true;

      // links
      let seg = 0;
      for (let i = 0; i < N; i++) {
        const ix = pos[i * 3], iy = pos[i * 3 + 1], iz = pos[i * 3 + 2];
        for (let j = i + 1; j < N; j++) {
          if (seg >= MAX_SEG) break;
          const dx = ix - pos[j * 3];
          const dy = iy - pos[j * 3 + 1];
          const dz = iz - pos[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d >= LINK) continue;

          const tt = 1 - d / LINK;
          const e = Math.max(energy[i], energy[j]);
          const depth = smooth((3.5 + (iz + pos[j * 3 + 2]) * 0.5) / 6.5);
          const a =
            Math.pow(tt, 1.4) *
            (0.17 + 0.75 * e) *
            ((fade[i] + fade[j]) * 0.5) *
            (0.35 + 0.65 * depth);

          const r = (NEUTRAL.r + (LIME.r - NEUTRAL.r) * e) * a;
          const g = (NEUTRAL.g + (LIME.g - NEUTRAL.g) * e) * a;
          const b = (NEUTRAL.b + (LIME.b - NEUTRAL.b) * e) * a;

          const o = seg * 6;
          linePos[o] = ix; linePos[o + 1] = iy; linePos[o + 2] = iz;
          linePos[o + 3] = pos[j * 3]; linePos[o + 4] = pos[j * 3 + 1]; linePos[o + 5] = pos[j * 3 + 2];
          lineCol[o] = r; lineCol[o + 1] = g; lineCol[o + 2] = b;
          lineCol[o + 3] = r; lineCol[o + 4] = g; lineCol[o + 5] = b;
          seg++;
        }
      }
      lGeo.setDrawRange(0, seg * 2);
      lGeo.attributes.position.needsUpdate = true;
      lGeo.attributes.color.needsUpdate = true;
    };

    let frame;
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      step(clock.getElapsedTime());
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      step(0);
      renderer.render(scene, camera);
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      io.disconnect();
      pGeo.dispose(); lGeo.dispose(); pMat.dispose(); lMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-0 w-screen -translate-x-1/2"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 70%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, #000 14%, #000 70%, transparent)",
      }}
    />
  );
}
