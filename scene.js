import * as T from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
export function createScene(host){
 const scene=new T.Scene();scene.background=new T.Color('#edf0e6');
 const camera=new T.PerspectiveCamera(38,1,.1,100);camera.position.set(7,10,12);
 const renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1;host.appendChild(renderer.domElement);
 const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=10;controls.maxDistance=24;controls.maxPolarAngle=Math.PI*.46;controls.minPolarAngle=.08;controls.saveState();
 scene.add(new T.HemisphereLight(0xffffff,0xb7bda2,2.3));const light=new T.DirectionalLight(0xfff9ed,3.2);light.position.set(-5,10,5);light.castShadow=true;light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-8,right:8,top:8,bottom:-8});light.shadow.bias=-.0005;light.shadow.normalBias=.025;scene.add(light);
 const mat=(color,roughness=.8)=>new T.MeshStandardMaterial({color,roughness});
 const material={rice:mat('#fff5d6'),chicken:mat('#ce8e4c'),grill:mat('#925b30'),stem:mat('#91ab56'),green:mat('#488243'),green2:mat('#5c964b'),potato:mat('#e7c987'),carrot:mat('#ed913b')};
 const sphere=new T.SphereGeometry(1,18,12), floret=new T.IcosahedronGeometry(1,1), cylinder=new T.CylinderGeometry(1,1,1,20);
 function mesh(geometry,material,parent,x,y,z,sx,sy,sz){const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const ground=mesh(new T.PlaneGeometry(200,200),mat('#edf0e6'),scene,0,-.23,0,1,1,1);ground.rotation.x=-Math.PI/2;ground.castShadow=false;
 const profile=[[0,0],[2.75,0],[3.05,.03],[3.35,.15],[3.7,.25],[3.95,.28],[4,.22],[3.85,.1],[3.3,-.07],[2.8,-.12],[0,-.12]].map(([x,y])=>new T.Vector2(x,y));
 const plate=new T.Mesh(new T.LatheGeometry(profile,96),mat('#fdfcf7',.35));plate.castShadow=true;plate.receiveShadow=true;scene.add(plate);
 const rim=new T.Mesh(new T.TorusGeometry(3.8,.015,8,96),mat('#dfdfcd'));rim.rotation.x=Math.PI/2;rim.position.y=.265;scene.add(rim);
 const models={};let seed=42;function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 const placements={rice:[-1.3,-.9],chicken:[1,-.75],broccoli:[-.7,1.25],potato:[1.45,1.15],carrot:[-1.9,.5]};
 for(const [id,pos] of Object.entries(placements)){
  const group=new T.Group();group.position.set(pos[0],.06,pos[1]);scene.add(group);models[id]=group;
  if(id==='rice'){
   mesh(sphere,material.rice,group,0,.23,0,.76,.27,.65);
   for(let i=0;i<180;i++){const a=random()*Math.PI*2,r=Math.sqrt(random()),x=Math.cos(a)*r*.76,z=Math.sin(a)*r*.64,y=.08+Math.sqrt(1-r*r)*.45;const grain=mesh(sphere,material.rice,group,x,y,z,.035,.035,.09);grain.rotation.y=random()*Math.PI;}
  }else if(id==='chicken'){
   const piece=mesh(sphere,material.chicken,group,0,.23,0,.73,.25,.53);piece.rotation.y=-.35;
   for(let i=0;i<5;i++){const stripe=mesh(sphere,material.grill,group,-.42+i*.2,.455,0,.02,.012,.32-Math.abs(i-2)*.025);stripe.rotation.y=-.35;}
  }else if(id==='broccoli'){
   for(let i=0;i<5;i++){const a=i*2.4,x=Math.cos(a)*.4,z=Math.sin(a)*.4;mesh(cylinder,material.stem,group,x,.23,z,.065,.4,.065);for(let j=0;j<7;j++){const b=j*2.4;mesh(floret,j%2?material.green:material.green2,group,x+Math.cos(b)*.15,.43+random()*.13,z+Math.sin(b)*.15,.19,.17,.19);}}
  }else if(id==='potato'){
   for(let i=0;i<4;i++){const a=i*2.4;const p=mesh(sphere,material.potato,group,Math.cos(a)*.34,.22,Math.sin(a)*.34,.3,.22,.27);p.rotation.y=a;}
  }else{
   for(let i=0;i<9;i++){const a=i*2.4,r=.1+Math.sqrt(i/9)*.36;const c=mesh(cylinder,material.carrot,group,Math.cos(a)*r,.08+Math.floor(i/5)*.13,Math.sin(a)*r,.19,.13,.19);c.rotation.x=random()*.15;}
  }
  group.visible=false;
 }
 function resize(){const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(host);resize();
 renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
 function zoom(factor){const offset=camera.position.clone().sub(controls.target);offset.multiplyScalar(factor).clampLength(controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(offset);controls.update();}
 return {update(portions){for(const [id,g] of Object.entries(models)){g.visible=!!portions[id];g.scale.setScalar(Math.cbrt((portions[id]||100)/100));}},zoom,rotate(){const v=camera.position.clone().sub(controls.target);v.applyAxisAngle(new T.Vector3(0,1,0),Math.PI/8);camera.position.copy(controls.target).add(v);controls.update();},reset(){controls.reset();}};
}
