/* tier3.js — MachineBaseAI Three.js AI Workflow Universe
 * Cinematic 3D hero: floating workflow cards, animated intelligence signals,
 * mouse parallax, hover + click-to-scroll interaction.
 * Primary renderer: WebGL 2 via Three.js 0.185.0.
 * Graceful fallback: CSS Intelligence Field.
 */
(() => {
  const canvas = document.getElementById('tier3Canvas');
  const hero = canvas?.closest('.hero');
  if (!canvas || !hero) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    hero.dataset.tier3 = 'reduced-motion';
    return;
  }

  hero.dataset.tier3 = 'booting';

  const workflows = [
    { id: 'lead-discovery', title: 'LEAD DISCOVERY', icon: '◉', detail: 'Find high-value opportunities.', x: -5, y: 2.25, z: 0.2 },
    { id: 'ai-research', title: 'AI RESEARCH', icon: '◈', detail: 'Understand every opportunity.', x: -2.35, y: 0.55, z: 0 },
    { id: 'ai-scoring', title: 'AI SCORING', icon: '', detail: 'Prioritize what matters.', score: '92', x: 0.55, y: 1.75, z: 0.15 },
    { id: 'human-approval', title: 'HUMAN APPROVAL', icon: '✓', detail: 'You stay in control.', x: 3.25, y: 0.15, z: 0.05 },
    { id: 'automated-outreach', title: 'AUTOMATED OUTREACH', icon: '→', detail: 'Execute at scale.', x: 5.65, y: 1.45, z: 0.25 }
  ];

  const loadThree = () => new Promise((resolve, reject) => {
    if (window.THREE) return resolve(window.THREE);
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.min.js';
    s.async = true;
    s.onload = () => window.THREE ? resolve(window.THREE) : reject(new Error('THREE unavailable'));
    s.onerror = () => reject(new Error('Three.js CDN failed to load'));
    document.head.appendChild(s);
  });

  loadThree().then(THREE => {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (error) {
      throw new Error(`WebGL renderer initialization failed: ${error?.message || error}`);
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    hero.dataset.tier3 = 'webgl';
    canvas.setAttribute('data-renderer', 'three-webgl2');
    console.info('[MachineBaseAI] Tier 3 renderer: WebGL active');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 22);

    const root = new THREE.Group();
    root.position.x = 2.5;
    scene.add(root);

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function cardTexture(item) {
      const c = document.createElement('canvas');
      c.width = 720;
      c.height = 360;
      const ctx = c.getContext('2d');
      if (!ctx) throw new Error('2D canvas context unavailable');

      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = 'rgba(5,20,36,.92)';
      ctx.strokeStyle = 'rgba(25,217,255,.7)';
      ctx.lineWidth = 3;
      const r = 28;
      ctx.beginPath();
      ctx.roundRect(8, 8, c.width - 16, c.height - 16, r);
      ctx.fill();
      ctx.stroke();

      const highlight = ctx.createLinearGradient(8, 8, 8, 60);
      highlight.addColorStop(0, 'rgba(25,217,255,.12)');
      highlight.addColorStop(1, 'rgba(25,217,255,0)');
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.roundRect(8, 8, c.width - 16, 52, [r, r, 0, 0]);
      ctx.fill();

      if (item.icon) {
        ctx.save();
        ctx.globalAlpha = 0.13;
        ctx.fillStyle = '#19d9ff';
        ctx.font = '900 110px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(item.icon, c.width - 28, 118);
        ctx.restore();
        ctx.textAlign = 'left';
      }

      ctx.fillStyle = '#19d9ff';
      ctx.font = '900 34px Arial';
      ctx.letterSpacing = '2px';
      ctx.fillText(item.title, 38, 78);
      ctx.fillStyle = '#b9d0e3';
      ctx.font = '500 25px Arial';
      ctx.letterSpacing = '0px';
      ctx.fillText(item.detail, 38, 125);

      if (item.score) {
        ctx.fillStyle = '#f7fbff';
        ctx.font = '900 86px Arial';
        ctx.fillText(item.score, 38, 240);
        ctx.fillStyle = '#19d9ff';
        ctx.font = '700 21px Arial';
        ctx.letterSpacing = '1px';
        ctx.fillText('CONFIDENCE / PRIORITY', 42, 287);
      } else {
        const grad = ctx.createLinearGradient(38, 0, 338, 0);
        grad.addColorStop(0, 'rgba(25,217,255,.35)');
        grad.addColorStop(1, 'rgba(25,217,255,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(38, 182, 300, 1.5);
        ctx.fillStyle = '#7fa9c6';
        ctx.font = '700 18px Arial';
        ctx.letterSpacing = '1.5px';
        ctx.fillText('AI AUTOMATION NODE', 38, 228);
      }

      const texture = new THREE.CanvasTexture(c);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    const cardGroup = new THREE.Group();
    root.add(cardGroup);
    const cards = [];
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(99, 99);

    workflows.forEach(item => {
      const geometry = new THREE.PlaneGeometry(2.9, 1.45);
      const material = new THREE.MeshBasicMaterial({ map: cardTexture(item), transparent: true, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(item.x, item.y, item.z);
      mesh.userData = { workflow: item };
      cardGroup.add(mesh);
      cards.push(mesh);
    });

    const PARTICLE_COUNT = 520;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 7;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x7cecff, size: 0.025, transparent: true, opacity: 0.55, sizeAttenuation: true });
    root.add(new THREE.Points(particleGeometry, particleMaterial));

    const connectionCurves = [];
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x19d9ff, transparent: true, opacity: 0.25 });
    for (let i = 0; i < workflows.length - 1; i++) {
      const a = workflows[i], b = workflows[i + 1];
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(a.x, a.y, 0.05),
        new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2 + 0.55, 0.02),
        new THREE.Vector3(b.x, b.y, 0.05)
      ]);
      connectionCurves.push(curve);
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)), lineMaterial.clone()));
    }

    const signals = [];
    connectionCurves.forEach((curve, i) => {
      const a = workflows[i], b = workflows[i + 1];
      const sigCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(a.x, a.y, 0.22),
        new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2 + 0.55, 0.20),
        new THREE.Vector3(b.x, b.y, 0.22)
      ]);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      root.add(dot);
      signals.push({ dot, curve: sigCurve, offset: i / workflows.length });
    });

    let targetX = 0, targetY = 0, activeCard = null;
    const onPointerMove = e => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = (pointer.x - 0.2) * 0.28;
      targetY = pointer.y * 0.12;
    };
    const onPointerLeave = () => {
      pointer.set(99, 99);
      targetX = 0;
      targetY = 0;
    };
    const onClick = () => {
      if (activeCard) document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
    canvas.addEventListener('click', onClick);

    let clock = 0;
    let introT = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      clock += 0.008;

      if (introT < 1) {
        introT = Math.min(1, introT + 0.004);
        const t = introT;
        const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        camera.position.z = 22 - 6 * ease;
      }

      root.rotation.y += (targetX - root.rotation.y) * 0.035;
      root.rotation.x += (targetY - root.rotation.x) * 0.035;
      cardGroup.children.forEach((card, i) => {
        card.position.y = workflows[i].y + Math.sin(clock * 1.2 + i) * 0.055;
        card.rotation.z = Math.sin(clock * 0.7 + i) * 0.012;
      });
      particleMaterial.opacity = 0.42 + Math.sin(clock * 1.5) * 0.08;
      signals.forEach((s, i) => {
        const p = (clock * 0.055 + s.offset) % 1;
        s.dot.position.copy(s.curve.getPointAt(p));
        s.dot.scale.setScalar(0.85 + Math.sin(clock * 6 + i) * 0.25);
      });

      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(cards, false)[0]?.object ?? null;
      if (hit !== activeCard) {
        activeCard?.scale.setScalar(1);
        activeCard = hit;
        activeCard?.scale.setScalar(1.055);
        canvas.style.cursor = activeCard ? 'pointer' : 'default';
      }
      renderer.render(scene, camera);
    };

    animate();
  }).catch(error => {
    hero.dataset.tier3 = 'fallback';
    canvas.setAttribute('data-renderer', 'fallback-css');
    console.warn('[MachineBaseAI] Tier 3 WebGL unavailable; CSS Intelligence Field fallback active.', error);
  });
})();
