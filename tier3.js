(()=>{
  const canvas=document.getElementById('tier3Canvas');
  if(!canvas||matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  // Keep the existing hero functional if WebGL/Three.js is unavailable.
  const loadThree=()=>new Promise((resolve,reject)=>{
    if(window.THREE)return resolve(window.THREE);
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/three@0.185.0/build/three.min.js';
    s.async=true;
    s.onload=()=>window.THREE?resolve(window.THREE):reject(new Error('Three.js unavailable'));
    s.onerror=reject;
    document.head.appendChild(s);
  });

  loadThree().then(THREE=>{
    const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
    renderer.setClearColor(0x000000,0);

    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(38,1,.1,100);
    camera.position.set(0,0,16);

    const root=new THREE.Group();
    root.position.x=2.5;
    scene.add(root);

    const workflows=[
      {id:'lead-discovery',title:'LEAD DISCOVERY',detail:'Find opportunities',x:-5,y:2.25,z:.2},
      {id:'ai-research',title:'AI RESEARCH',detail:'Understand every lead',x:-2.35,y:.55,z:0},
      {id:'ai-scoring',title:'AI SCORING',detail:'Prioritize what matters',x:.55,y:1.75,z:.15,score:'92'},
      {id:'human-approval',title:'HUMAN APPROVAL',detail:'You stay in control',x:3.25,y:.15,z:.05},
      {id:'automated-outreach',title:'AUTOMATED OUTREACH',detail:'Execute at scale',x:5.65,y:1.45,z:.25}
    ];

    const cardGroup=new THREE.Group();
    root.add(cardGroup);
    const raycaster=new THREE.Raycaster();
    const pointer=new THREE.Vector2(99,99);
    const cards=[];

    function cardTexture(item){
      const c=document.createElement('canvas');
      c.width=720;c.height=360;
      const ctx=c.getContext('2d');
      ctx.clearRect(0,0,c.width,c.height);
      ctx.fillStyle='rgba(5,20,36,.92)';
      ctx.strokeStyle='rgba(25,217,255,.7)';
      ctx.lineWidth=3;
      const r=28;
      ctx.beginPath();ctx.roundRect(8,8,c.width-16,c.height-16,r);ctx.fill();ctx.stroke();
      ctx.fillStyle='#19d9ff';ctx.font='900 34px Arial';ctx.letterSpacing='2px';ctx.fillText(item.title,38,78);
      ctx.fillStyle='#b9d0e3';ctx.font='500 25px Arial';ctx.fillText(item.detail,38,125);
      if(item.score){
        ctx.fillStyle='#f7fbff';ctx.font='900 86px Arial';ctx.fillText(item.score,38,235);
        ctx.fillStyle='#19d9ff';ctx.font='700 22px Arial';ctx.fillText('CONFIDENCE / PRIORITY',42,282);
      }else{
        ctx.fillStyle='rgba(25,217,255,.22)';ctx.fillRect(38,178,300,2);
        ctx.fillStyle='#7fa9c6';ctx.font='700 18px Arial';ctx.fillText('AI AUTOMATION NODE',38,225);
      }
      const texture=new THREE.CanvasTexture(c);
      texture.colorSpace=THREE.SRGBColorSpace;
      return texture;
    }

    workflows.forEach(item=>{
      const geometry=new THREE.PlaneGeometry(2.9,1.45);
      const material=new THREE.MeshBasicMaterial({map:cardTexture(item),transparent:true,depthWrite:false,side:THREE.DoubleSide});
      const mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(item.x,item.y,item.z);
      mesh.userData=item;
      cardGroup.add(mesh);cards.push(mesh);
    });

    // Subtle orbital environment.
    const particleCount=520;
    const positions=new Float32Array(particleCount*3);
    for(let i=0;i<particleCount;i++){
      const a=Math.random()*Math.PI*2;
      const radius=5+Math.random()*7;
      positions[i*3]=Math.cos(a)*radius;
      positions[i*3+1]=(Math.random()-.5)*6;
      positions[i*3+2]=(Math.random()-.5)*5;
    }
    const particleGeometry=new THREE.BufferGeometry();
    particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const particleMaterial=new THREE.PointsMaterial({color:0x7cecff,size:.025,transparent:true,opacity:.6,sizeAttenuation:true});
    root.add(new THREE.Points(particleGeometry,particleMaterial));

    // Workflow connections are intentionally data-driven from node positions.
    const lineMaterial=new THREE.LineBasicMaterial({color:0x19d9ff,transparent:true,opacity:.28});
    for(let i=0;i<workflows.length-1;i++){
      const a=workflows[i],b=workflows[i+1];
      const curve=new THREE.CatmullRomCurve3([
        new THREE.Vector3(a.x,a.y,.05),
        new THREE.Vector3((a.x+b.x)/2,(a.y+b.y)/2+.55,.02),
        new THREE.Vector3(b.x,b.y,.05)
      ]);
      const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)),lineMaterial.clone());
      line.userData={index:i};root.add(line);
    }

    // One moving intelligence signal per workflow edge.
    const signals=[];
    for(let i=0;i<workflows.length-1;i++){
      const a=workflows[i],b=workflows[i+1];
      const curve=new THREE.CatmullRomCurve3([
        new THREE.Vector3(a.x,a.y,.22),
        new THREE.Vector3((a.x+b.x)/2,(a.y+b.y)/2+.55,.2),
        new THREE.Vector3(b.x,b.y,.22)
      ]);
      const dot=new THREE.Mesh(new THREE.SphereGeometry(.09,10,10),new THREE.MeshBasicMaterial({color:0xffffff}));
      root.add(dot);signals.push({dot,curve,offset:i/workflows.length});
    }

    const resize=()=>{
      const w=canvas.clientWidth||window.innerWidth,h=canvas.clientHeight||window.innerHeight;
      renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
    };
    resize();window.addEventListener('resize',resize,{passive:true});

    let targetX=0,targetY=0,active=null;
    const move=e=>{
      const rect=canvas.getBoundingClientRect();
      pointer.x=((e.clientX-rect.left)/rect.width)*2-1;
      pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;
      targetX=(pointer.x-.2)*.28;targetY=pointer.y*.12;
    };
    canvas.addEventListener('pointermove',move,{passive:true});
    canvas.addEventListener('pointerleave',()=>{pointer.set(99,99);targetX=.0;targetY=0;},{passive:true});

    let clock=0;
    const animate=()=>{
      clock+=.008;
      root.rotation.y+=(targetX-root.rotation.y)*.035;
      root.rotation.x+=(targetY-root.rotation.x)*.035;
      cardGroup.children.forEach((card,i)=>{
        card.position.y=workflows[i].y+Math.sin(clock*1.2+i)*.055;
        card.rotation.z=Math.sin(clock*.7+i)*.012;
      });
      particleGeometry.attributes.position.needsUpdate=true;
      particleMaterial.opacity=.42+Math.sin(clock*1.5)*.08;

      raycaster.setFromCamera(pointer,camera);
      const hit=raycaster.intersectObjects(cards,false)[0]?.object||null;
      if(hit!==active){
        if(active)active.scale.setScalar(1);
        active=hit;
        if(active)active.scale.setScalar(1.035);
        canvas.style.cursor=active?'pointer':'default';
      }
      signals.forEach((s,i)=>{
        const p=(clock*.055+s.offset)%1;
        s.dot.position.copy(s.curve.getPointAt(p));
        const pulse=.85+Math.sin(clock*6+i)*.25;
        s.dot.scale.setScalar(pulse);
      });
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    };
    animate();
  }).catch(()=>{
    // The existing CSS intelligence field remains as the graceful fallback.
    canvas.style.display='none';
  });
})();
