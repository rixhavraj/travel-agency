"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    // 2. CAMERA SETUP
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. CREATING HOLOGRAPHIC GEOMETRY
    // A. Central Icosahedron Wireframe Cage
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icosahedronMat = new THREE.MeshBasicMaterial({
      color: 0xccff00, // Neon Lime
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const icosahedronMesh = new THREE.Mesh(icosahedronGeo, icosahedronMat);
    scene.add(icosahedronMesh);

    // B. Inner Core Point Particle Light
    const innerGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // C. Outer Orbiting Ring 01
    const torusGeo1 = new THREE.TorusGeometry(2.3, 0.02, 8, 48);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Neon Purple
      transparent: true,
      opacity: 0.6,
    });
    const torusMesh1 = new THREE.Mesh(torusGeo1, torusMat1);
    torusMesh1.rotation.x = Math.PI / 4;
    scene.add(torusMesh1);

    // D. Outer Orbiting Ring 02 (Orthogonal)
    const torusGeo2 = new THREE.TorusGeometry(2.6, 0.015, 8, 48);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Chrome/White
      transparent: true,
      opacity: 0.4,
    });
    const torusMesh2 = new THREE.Mesh(torusGeo2, torusMat2);
    torusMesh2.rotation.y = Math.PI / 4;
    scene.add(torusMesh2);

    // E. 3D Cloud Particles Network
    const particlesCount = 80;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Scatter points inside a spherical radius of 3.5
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 3.5;

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Create a fine canvas point texture programmatically
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const pointTexture = new THREE.CanvasTexture(pCanvas);

    const particlesMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pointTexture,
      transparent: true,
      color: 0xccff00,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(particlesGeo, particlesMat);
    scene.add(pointCloud);

    // 5. MOUSE INTERACTION LISTENER
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate normal position relative to container center (-0.5 to 0.5)
      mouseRef.current.x = (e.clientX - rect.left) / width - 0.5;
      mouseRef.current.y = (e.clientY - rect.top) / height - 0.5;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // 6. ANIMATION RENDERING LOOP
    let animationFrameId: number;

    const animate = () => {
      // Rotation rates
      icosahedronMesh.rotation.y += 0.005;
      icosahedronMesh.rotation.x += 0.002;

      innerMesh.rotation.y -= 0.01;

      torusMesh1.rotation.y += 0.008;
      torusMesh2.rotation.x -= 0.006;
      
      pointCloud.rotation.y += 0.002;

      // Smooth camera drag target based on mouse position
      const targetX = mouseRef.current.x * 2.5;
      const targetY = -mouseRef.current.y * 2.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. RESPONSIVE RESIZING
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 8. LIFECYCLE CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      
      // Dispose materials and geometry to prevent WebGL memory leaks
      icosahedronGeo.dispose();
      icosahedronMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      torusGeo1.dispose();
      torusMat1.dispose();
      torusGeo2.dispose();
      torusMat2.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      pointTexture.dispose();
      
      renderer.dispose();
      try {
        container.removeChild(renderer.domElement);
      } catch(e) {}
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden" 
    />
  );
}
