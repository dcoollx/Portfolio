//this uses three js to create a 3d menu
import * as THREE from 'three' ;

export default class Menu{
  constructor(){
    this.camera;
    this.scene;
    this.renderer;
    this.geometry;
    this.material;
    this.mesh;
    this.init();
    this.animate = ()=> {
 
     
   
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
   
      this.renderer.render( this.scene, this.camera );
      window.requestAnimationFrame( this.animate );
    };
    //this.animate();

  }
  init() {
    let parent ={width: document.getElementById('target').getBoundingClientRect().width, height:document.getElementById('target').getBoundingClientRect().height}
 
    this.camera = new THREE.PerspectiveCamera( 70, parent.width/parent.height, 0.01, 10 );
    this.camera.position.z = 1;
 
    this.scene = new THREE.Scene();
 
    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new THREE.MeshNormalMaterial();
 
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.mesh );
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(parent.width,parent.height );
    document.getElementById('target').appendChild( this.renderer.domElement );//needs to be changed to parent canvas
 
  }
 
  animate() {
 
    window.requestAnimationFrame( this.animate() );
 
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
 
    this.renderer.render( this.scene, this.camera );
 
  }
  
}