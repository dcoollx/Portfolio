//this uses three js to create a 3d menu
import * as THREE from 'three' ;

export default class Menu{
  constructor(){
    this.camera;
    this.scene;
    this.raycaster;
    let theta = 0;
    this.renderer;
    this.geometry;
    this.material;
    this.objects =[];
    this.main;
    this.init();
    this.hookUpEvents();
    this.animate = ()=> {
     /*  theta += 0.1;
      this.camera.position.x = 100* Math.sin(THREE.Math.degToRad(theta));
      this.camera.position.y = 100* Math.sin(THREE.Math.degToRad(theta));
      //this.camera.position.z = 100* Math.cos(THREE.Math.degToRad(theta));
      this.camera.lookAt(this.scene.position);
      this.camera.updateMatrixWorld(); */
 
     
   
      this.objects[0].rotation.x += 0.0001;
      this.objects[0].rotation.y += 0.0002;
   
      this.renderer.render( this.scene, this.camera );
      window.requestAnimationFrame( this.animate );
    };
    //this.animate();

  }
  init() {
    let parent ={width: document.getElementById('target').getBoundingClientRect().width, height:document.getElementById('target').getBoundingClientRect().height};
 
    this.camera = new THREE.PerspectiveCamera( 70, parent.width/parent.height, 0.01, 10 );
    this.camera.position.z = 1;
 
    this.scene = new THREE.Scene();
 
    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new THREE.MeshBasicMaterial({color:0xffffff});
    this.main = new THREE.Mesh( this.geometry, this.material );
    this.main.color = new THREE.Color(0x000000);
    this.objects.push(this.main);
    for(let x =1;x<=100;x++){
      this.objects.push(new THREE.Mesh( this.geometry, this.material ));
      this.objects[x].position.x = (Math.random()*10)-5;
      this.objects[x].position.z = (Math.random()*10)-5;
      this.objects[x].position.y = (Math.random()*10)-5;
    }
    //this.raycaster = new THREE.raycaster();
 
    
    this.objects.forEach((o)=>{  this.scene.add(o);});
    this.main.add(this.camera);
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(parent.width,parent.height );
    //this.renderer.setClearColor(0xFF0000);
    document.getElementById('target').appendChild( this.renderer.domElement );//needs to be changed to parent canvas
 
  }
 
  animate() {
 
    window.requestAnimationFrame( this.animate() );
 
   this.object[0].rotation.x += 0.01;
   this.object[0].rotation.y += 0.02;
 
    this.renderer.render( this.scene, this.camera );
 
  }
  handleWindowResize(){
    window.addEventListener('resize',(e)=>{
      let parent ={width: document.getElementById('target').getBoundingClientRect().width, height:document.getElementById('target').getBoundingClientRect().height};
      this.renderer.setSize(parent.width,parent.height );
      this.camera.aspect.setSize(parent.width/parent.height);
    },false);
  }
  hookUpEvents(){
    this.handleWindowResize();
  }
  
}