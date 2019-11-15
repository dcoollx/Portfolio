import * as THREE from 'three' ;
import { TweenMax } from 'gsap';

export default class smallMenu{
  constructor(canvas){

    this.target = canvas;
    this.camera;
    this.light = new THREE.AmbientLight({color:0xfffff});
    this.renderer = new THREE.WebGLRenderer( { antialias: true,alpha:true } );
    this.renderer.setSize(parent.width,parent.height );
    this.init();
  }
  init(){
    let parent ={width: this.target.getBoundingClientRect().width, height:this.target.getBoundingClientRect().height};
 
    this.camera = new THREE.PerspectiveCamera( 70, parent.width/parent.height, 0.01, 10 );
    this.camera.position.z = 1;
 
    this.scene = new THREE.Scene();
    this.light = new THREE.PointLight();
    this.scene.add(this.light);//ambLigh2
    //
    this.main = new THREE.Mesh( this.geometry, this.material );
    // box that follows camera
    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new THREE.MeshBasicMaterial({color:0xffffff});
    this.main = new THREE.Mesh( this.geometry, this.material );
    this.main.material.transparent = true;
    this.main.material.opacity = 0.0;
    this.main.material.color.set(0xFF0000); 
    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
    this.renderer.setSize(parent.width,parent.height );
    //this.renderer.setClearColor(0xFF0000);
    this.target.appendChild( this.renderer.domElement );//needs to be changed to parent canvas
 
  }
  

}