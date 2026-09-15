import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Custom GLSL Shaders for Everest-Grade Procedural Mountain Terrain
const terrainVertexShader = `
  uniform float uTime;
  uniform float uElevation;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  // 2D Simplex Noise implementation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal Brownian Motion (FBM) for mountain ridges and sharp rock crags
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.55;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * abs(snoise(st * frequency));
      st *= 2.05;
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Center-peaked mountain ridge envelope
    float distFromCenter = length(pos.xy) / 90.0;
    float mountainMask = exp(-distFromCenter * distFromCenter * 2.8);

    // Compute sharp ridge elevation
    float height = fbm(pos.xy * 0.038) * 32.0 * mountainMask;
    
    // Add central Everest summit crest
    float spine = 1.0 - abs(pos.x * 0.05);
    if (spine > 0.0) {
      height += pow(spine, 2.2) * 14.0 * mountainMask;
    }

    pos.z += height;
    vElevation = pos.z;
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const terrainFragmentShader = `
  uniform vec3 uColorRock;
  uniform vec3 uColorRidge;
  uniform vec3 uColorGold;
  uniform vec3 uColorCyan;
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    // Base mountain obsidian shading
    float normElevation = clamp(vElevation / 38.0, 0.0, 1.0);
    vec3 baseColor = mix(uColorRock, uColorRidge, normElevation * 0.85);

    // Topographic contour lines (Everest elevation maps)
    float contourFrequency = 0.42;
    float contour = fract(vElevation * contourFrequency);
    float line = smoothstep(0.04, 0.0, abs(contour - 0.5));

    // Glow accents: Gold at high altitudes, Cyan at mid-range icefalls
    vec3 contourColor = mix(uColorCyan, uColorGold, normElevation);
    vec3 finalColor = baseColor + (contourColor * line * 0.85);

    // Subtle edge grid pulse
    float grid = (step(0.985, fract(vUv.x * 60.0)) + step(0.985, fract(vUv.y * 60.0))) * 0.12;
    finalColor += uColorCyan * grid;

    // Atmospheric depth fog calculation
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep(40.0, 150.0, depth);
    vec3 fogColor = vec3(0.05, 0.05, 0.06); // Matches #0D0D0F

    gl_FragColor = vec4(mix(finalColor, fogColor, fogFactor), 1.0);
  }
`;

export const AscentTerrain3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0d0f, 0.015);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      800
    );

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Mountain Terrain Mesh (Horizontal Plane rotated -90 deg on X)
    const geometry = new THREE.PlaneGeometry(160, 160, 160, 160);
    const material = new THREE.ShaderMaterial({
      vertexShader: terrainVertexShader,
      fragmentShader: terrainFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uElevation: { value: 1.0 },
        uColorRock: { value: new THREE.Color(0x0a0b0e) }, // Deep obsidian
        uColorRidge: { value: new THREE.Color(0x222631) }, // Charcoal rock
        uColorGold: { value: new THREE.Color(0xd4af37) },  // Luxury gold contour
        uColorCyan: { value: new THREE.Color(0x00f0ff) },  // Laser cyan contour
      },
      wireframe: false,
    });

    const terrainMesh = new THREE.Mesh(geometry, material);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.position.y = -6;
    scene.add(terrainMesh);

    // Spline Camera Flight Path (Lukla 2,860m -> Everest Summit 8,848m)
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 12, 60),    // 0%: Runway / Lukla Valley
      new THREE.Vector3(-14, 20, 26),  // 25%: Base Camp Ridge
      new THREE.Vector3(16, 32, -10),  // 50%: Khumbu Icefall
      new THREE.Vector3(-8, 44, -45),  // 75%: South Col Ridge
      new THREE.Vector3(0, 56, -75),   // 100%: Summit Overlook
    ]);

    const targetPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 10, 25),
      new THREE.Vector3(-4, 18, -6),
      new THREE.Vector3(4, 28, -38),
      new THREE.Vector3(0, 38, -68),
      new THREE.Vector3(0, 50, -110),
    ]);

    // Scroll progress handler
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollProgressRef.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mouse Sway Handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const currentCamPos = new THREE.Vector3(0, 12, 60);
    const currentLookAt = new THREE.Vector3(0, 10, 25);
    const clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Continuously read scroll progress for instantaneous 60fps response
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scrollProgressRef.current += (targetProgress - scrollProgressRef.current) * 0.08;
      const progress = scrollProgressRef.current;

      // Sample positions along spline curves
      const desiredCamPos = cameraPath.getPointAt(progress);
      const desiredLookAt = targetPath.getPointAt(progress);

      // Add mouse parallax sway
      desiredCamPos.x += mouseRef.current.x * 2.5;
      desiredCamPos.y -= mouseRef.current.y * 1.5;

      // Smooth lerp camera movement (silky cinema feel)
      currentCamPos.lerp(desiredCamPos, 0.055);
      currentLookAt.lerp(desiredLookAt, 0.055);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.82 }}
    />
  );
};
