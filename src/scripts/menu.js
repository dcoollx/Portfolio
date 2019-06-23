//this uses three js to create a 3d menu
import * as THREE from 'three' ;
import $ from 'jquery';
import {TweenMax} from 'gsap/TweenMax';

export default class Menu{
  constructor(){
    this.mobile = document.body.clientHeight > document.body.clientWidth;// true if on mobile 
    this.camera;
    this.mainLight;
    this.scene;
    this.raycaster;
    this.renderer;
    this.geometry;
    this.material;
    this.objects =[];
    this.buttons = [];
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
    this.mainLight = new THREE.PointLight();
    let crossLight = new THREE.PointLight();
    var ambLigh2 = new THREE.PointLight(0xffffff,1);
    this.scene.add(this.mainLight,ambLigh2,crossLight);//ambLigh2
    this.mainLight.position.z = 20;
    this.mainLight.position.x = 10;
    //
    this.main = new THREE.Mesh( this.geometry, this.material );
    // box that follows camera
    this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    this.material = new THREE.MeshBasicMaterial({color:0xffffff});
    this.main = new THREE.Mesh( this.geometry, this.material );
    this.main.material.transparent = true;
    this.main.material.opacity = 0.0;
    this.main.material.color.set(0xFF0000);
    this.objects.push(this.main);
    for(let x =1;x<=50;x++){
      var geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      var material = new THREE.MeshStandardMaterial({color:0xffffff});
      this.objects.push(new THREE.Mesh( geometry, material ));
      this.objects[x].position.x = (Math.random()*10)-5;
      this.objects[x].position.z = (Math.random()*10)-5;
      this.objects[x].position.y = (Math.random()*10)-5;
    }
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
 
    
    this.objects.forEach((o)=>{  this.scene.add(o);});
    this.main.add(this.camera);// attaches camera to main object.
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize(parent.width,parent.height );
    //this.renderer.setClearColor(0xFF0000);
    document.getElementById('target').appendChild( this.renderer.domElement );//needs to be changed to parent canvas
 
  }
  /**
  * 
  * @param  {...string} names
  * @returns {Array} buttons -objects with those names added 
  */
  createButtons(...names){

    this.buttons = names.map((name)=>{
      //label
      const canvas = this.makeLabels(name);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      const labelMat = new THREE.SpriteMaterial({map:texture, transparent:true});
      const label = new THREE.Sprite(labelMat);

      //button geometry
      let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      let material = new THREE.MeshPhongMaterial({color:0xffffff});
      let btn = new THREE.Mesh( geometry, material );
      btn.add(label);
      label.position.z = .3;
      label.scale.set(0.2,0.05,0.2);
      btn.buttonName = name;//name appended to object to signify that is is a button
      this.scene.add(btn);
      return btn;
    });
    this.objects.push(...this.buttons);//add all new buttons to objects
    this.arrangeButtons();
    return this.buttons;
  }
  arrangeButtons(){
    if(this.mobile){
      this.buttons.forEach((b,index)=>{
        // widen them and stack veritcally
        b.position.set(0,((index-((this.buttons.length-(index*2))*2))*.1/2),0); //3/5*x - 3 = 0
        b.children[0].position.set(0,0.05,0.3);
        console.log(b.position);
      });
    }else{
      this.buttons.forEach((b, index)=>{
        b.position.set(((index-((this.buttons.length-(index*2))*2))*.1/2),0,0);
        // stack in a grid
      });
    }

  }
  makeLabels(name){
    const ctx = document.createElement('canvas').getContext('2d');
    const borderSize =2;
    const font = '26px bold sans serif';
    ctx.font = font;
    const width = ctx.measureText(name).width + (borderSize*2);
    const height = 26 +  (borderSize*2);
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    //set up canvas
    ctx.font = font;
    ctx.textBaseline = 'top';
    //need to re-set up canvas after resizing
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillText(name, borderSize, borderSize);
 
    return ctx.canvas;
    
  } 
  animate() {
 
    window.requestAnimationFrame( this.animate() );
 
 
    this.renderer.render( this.scene, this.camera );
 
  }
  handleWindowResize(){
    window.addEventListener('resize',(e)=>{
      console.log('resizeing');
      this.mobile = document.body.clientHeight > document.body.clientWidth;// true if on mobile
      let parent ={width: document.getElementById('target').getBoundingClientRect().width, height:document.getElementById('target').getBoundingClientRect().height};
      this.renderer.setSize(parent.width,parent.height );
      this.camera.aspect = parent.width/parent.height;
      this.camera.updateProjectionMatrix();
      this.mobile = document.body.clientHeight > document.body.clientWidth;
      this.arrangeButtons();
    },false);
  }
  handleMouseMove(){
    this.renderer.domElement.addEventListener('click',(e)=>{
      e.preventDefault();
      var mouse = new THREE.Vector2();
      mouse.x = (e.clientX/window.innerWidth)*2-1;
      mouse.y = -(e.clientY/window.innerHeight)*2+1;
      //console.log(mouse);
      this.raycaster.setFromCamera(mouse,this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);
      intersects.forEach((obj)=>{
        if(obj.object.buttonName){
          window.location.assign('#' + obj.object.buttonName);
        }else{
          obj.object.material.color.set(0xFF0000);
        }
      });
    });




    window.addEventListener('mousemove',(e)=>{
      e.preventDefault();
      var mouse = new THREE.Vector2();
      mouse.x = (e.clientX/window.innerWidth)*2-1;
      mouse.y = -(e.clientY/window.innerHeight)*2+1;
      this.raycaster.setFromCamera(mouse,this.camera);
      var intersects = this.raycaster.intersectObjects(this.scene.children);
      this.objects.forEach((object)=>{
        if(!intersects.includes(object)){
          object.material.color.set(0xffffff);
        }
      });
      intersects.forEach((o)=>{
        o.object.material.color.set(0x00ffff);
      });
      this.camera.fov = 90;
      //this.rotationSpeed += 0.00001;//need tweenMax for this
    });
  }
  hookUpEvents(){
    this.handleWindowResize();
    this.handleMouseMove();
  }
  
}