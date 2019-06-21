//this uses three js to create a 3d menu
import * as THREE from 'three' ;
import {TweenMax} from 'gsap/TweenMax';

export default class Menu{
  constructor(){
    this.camera;
    this.scene;
    this.raycaster;
    this.renderer;
    this.geometry;
    this.material;
    this.objects =[];
    this.main;
    this.rotationSpeed = 0.002;
    this.init();
    this.hookUpEvents();
    this.animate = ()=> {  
   
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
    //this.scene.background = new THREE.Color('#1a323e');
 
    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    var ambLight = new THREE.PointLight();
    this.scene.add(ambLight);
    this.material = new THREE.MeshStandardMaterial({color:0xffffff});
    this.main = new THREE.Mesh( this.geometry, this.material );
    this.main.material.color.set(0xFF0000);
    this.objects.push(this.main);
    for(let x =1;x<=50;x++){
      this.objects.push(new THREE.Mesh( this.geometry, this.material ));
      this.objects[x].position.x = (Math.random()*10)-5;
      this.objects[x].position.z = (Math.random()*10)-5;
      this.objects[x].position.y = (Math.random()*10)-5;
    }
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
 
    
    this.objects.forEach((o)=>{  this.scene.add(o);});
    //this.main.add(this.camera);// attaches camera to main object.
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(parent.width,parent.height );
    //this.renderer.setClearColor(0xFF0000);
    document.getElementById('target').appendChild( this.renderer.domElement );//needs to be changed to parent canvas
 
  }
 
  animate() {
 
    window.requestAnimationFrame( this.animate() );
 
 
    this.renderer.render( this.scene, this.camera );
 
  }
  handleWindowResize(){
    document.body.addEventListener('resize',(e)=>{
      let parent ={width: document.getElementById('target').getBoundingClientRect().width, height:document.getElementById('target').getBoundingClientRect().height};
      this.renderer.setSize(parent.width,parent.height );
      this.camera.setSize(parent.width/parent.height);
      this.camera.updateProjectionMatrix();
    },false);
  }
  handleMouseMove(){
    window.addEventListener('click',(e)=>{
      e.preventDefault();
      var mouse = new THREE.Vector2();
      mouse.x = (e.clientX/window.innerWidth)*2-1;
      mouse.y = -(e.clientY/window.innerHeight)*2+1;
      console.log(mouse);
      this.raycaster.setFromCamera(mouse,this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);
      //console.log(intersects);
      intersects.forEach((o)=>{
        o.object.material.color.set(0xffFFFF);
       console.log(o);
      });
      //this.rotationSpeed += 0.00001;//need tweenMax for this
    });
  }
  hookUpEvents(){
    this.handleWindowResize();
    this.handleMouseMove();
  }
  
}