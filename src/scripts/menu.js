//this uses three js to create a 3d menu
import * as THREE from 'three' ;
import { TweenMax } from 'gsap';

export default class Menu{
  constructor(){
    this.mobile = document.body.clientHeight > document.body.clientWidth;// true if on mobile 
    this.camera;
    this.mainLight;
    this.scene;
    this.raycaster;
    this.buzzWords = [
      'Agile',
      'JavaScript',
      'HTML5',
      'CSS3',
      '</>',
      'React.js',
      'Frontend',
      'SQL',
      'Express.js',
      'Node.js',
      'jQuery',
      'Mocha',
      'Jest',
      'Design',
      'Server',
      'Front-end',
    ];
    this.colors = [
      0x131862,
      0x2E4482,
      0xFF0000,
      0x005500,
      0x0000FF,
      0x546BAB,
      0x87889C,
      0xBEA9DE
    ];
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
    //this.scene.background = new THREE.Color( 'darkgrey');//#1a323e
    this.mainLight = new THREE.PointLight();
    //let crossLight = new THREE.PointLight();
    //var ambLigh2 = new THREE.PointLight(0xffffff,1);
    this.scene.add(this.mainLight);//,ambLigh2,crossLight);//ambLigh2
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
    for(let x =1;x<=1000;x++){//generates random boxes currently set to 75
      var geometry = new THREE.BoxGeometry( 0.008, 0.008, 0.008 );
      var material = new THREE.MeshBasicMaterial({color:this.colors[Math.floor(Math.random() * (this.colors.length + 1))]});
      //let label = this.createLabel(this.buzzWords[x % this.buzzWords.length], Math.floor(Math.random()* 26));
      let obj = new THREE.Mesh( geometry, material );
      //obj.add(label);
      obj.material.transparent = true;
      this.objects.push(obj);
      this.objects[x].position.x = (Math.random()*10)-5;
      this.objects[x].position.z = (Math.random()*10)-5;
      this.objects[x].position.y = (Math.random()*10)-5;
    }
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
 
    
    this.objects.forEach((o)=>{  this.scene.add(o);});
    this.main.add(this.camera);// attaches camera to main object.
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha:true } );
    this.renderer.setSize(parent.width,parent.height );
    //this.renderer.setClearColor(0xFF0000);
    document.getElementById('target').appendChild( this.renderer.domElement );//needs to be changed to parent canvas
 
  }
  /**
  * 
  * @param  {...string} names
  * @returns {Array} buttons -objects with those names added 
  */
  createLabel(word, font=26){
    const canvas = this.makeLabels(word,font);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    const labelMat = new THREE.SpriteMaterial({map:texture, transparent:true});
    return new THREE.Sprite(labelMat);
  }
  createButtons(...names){

    this.buttons = names.map((name)=>{
      //label
      const label = this.createLabel(name);

      //button geometry
      let geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      let material = new THREE.MeshPhongMaterial({color:0xffffff});
      let btn = new THREE.Mesh( geometry, material );
      btn.add(label);
      label.position.z = .1;
      label.scale.set(0.2,0.05,0.2);
      btn.buttonName = name;//name appended to object to signify that is is a button
      this.scene.add(btn);
      //add bobble animation

      //TweenMax.from(btn.rotation,10,{x:0.1,y:0.1,repeat:true});
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
        //b.children[0].position.set(0,0.05,0.3);
      });
    }else{
      this.buttons.forEach((b, index)=>{
        b.position.set(((index-((this.buttons.length-(index*2))*2))*.1/2),0,0);
        // stack in a grid
      });
    }

  }
  makeLabels(name, fontSize=26){
    const ctx = document.createElement('canvas').getContext('2d');
    let baseWidth = 140;
    const borderSize =2;
    const font = `${fontSize}px bold sans-serif`;
    ctx.font = font;
    const width = baseWidth + (borderSize*2);
    const height = 26 +  (borderSize*2);
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    //set up canvas
    ctx.font = font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    //const scaleFactor = Math.min(1, baseWidth / width);
    ctx.translate(width / 2, height / 2);
    //ctx.scale(scaleFactor, 1);
    //need to re-set up canvas after resizing
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'red';
    ctx.fillText(name, borderSize, borderSize);
 
    return ctx.canvas;
    
  } 
  animate() {
 
    window.requestAnimationFrame( this.animate() );
 
 
    this.renderer.render( this.scene, this.camera );
 
  }
  handleWindowResize(){
    window.addEventListener('resize',(e)=>{
      // eslint-disable-next-line no-console
      console.log('resizing');
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
        let prevColor = object.material.color;
        if(!intersects.includes(object)){
          object.material.color.set(prevColor);
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