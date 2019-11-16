import '../css/main.css';
import '../css/grid.css';
import me from '../img/me.jpg';
import Menu from '../scripts/menu';
import { TweenMax, Bounce } from 'gsap';
import spacedMockup from '../../src/img/spaced_moc_high.jpg';
import corkMockup from '../../src/img/corkboard_mockup.jpg';
import symptomMockup from '../../src/img/symptracker_mockup.jpg';
import irrMap from '../../src/img/settings.png';
import pageLock from '../../src/img/112154-web-navigation-line-craft/112154-web-navigation-line-craft/png/padlock.png';
import quizzApp from '../../src/img/112154-web-navigation-line-craft/112154-web-navigation-line-craft/png/new-file.png';
import $ from 'jquery';
import mini from './secondary';

function slide(element, direction = 'left'){
  let options = {};
  element.style.position = 'relative';
  options[direction] = '-25px';
  TweenMax.from(element.style[direction],5,options);
}


//hambuger button
window.onload = (e) =>{
  //once loaded remove loading screen
  console.log('loaded');
  document.getElementById('loading').style.display='none';
  allAnimations();
};
let mainNav =document.getElementsByTagName('nav')[0];
let hamb = document.getElementById('hamb');
hamb.addEventListener('click',(e)=>{
  mainNav.style.display = 'grid';
});
mainNav.addEventListener('focusout',(e)=>{
  if(!window.matchMedia('(min-width:760px)').matches)//we are not in desktop mode
  {
    mainNav.style.display = 'none';
  }
});
//set images to reference for webpack;
document.getElementById('me').src = me;
$('#spaced').css('background-image',`url(${spacedMockup})`);
$('#corkboard').css('background-image',`url(${corkMockup})`);
$('#symptom').css('background-image',`url(${symptomMockup})`);
$('#irrMap').css('background-image',`url(${irrMap})`);
$('#pageLock').css('background-image',`url(${pageLock})`);
$('#pageLock').css('background-image',`url(${pageLock})`);
$('#quizzApp').css('background-image',`url(${quizzApp})`);
let buttons = [];


let menu = new Menu();
//let mini1 = new mini(document.getElementById('about_me_animation')); 
//buttons = menu.createButtons('about_me','my_skills','my_life','my_projects','contact_me');
menu.animate();
//animations
window.menu = menu;//testing purposes
function allAnimations(){
  let hello = document.getElementById('welcome_card');
  TweenMax.from(hello,3,{opacity:0, left:'0px'});
  TweenMax.to(hello,3,{opacity:0, left:'0px',delay:4});
  TweenMax.from(document.getElementById('animated_nav'),3,{opacity:0, right:'0px',delay:7});
  TweenMax.to(document.getElementById('animated_nav'),3,{opacity:0, top:'0px',delay:10});
  TweenMax.from(document.getElementById('welcome'),3,{opacity:0,delay:13});
  TweenMax.from(menu.mainLight,6,{intensity:0});
  TweenMax.from(menu.main.rotation,5,{x:'+=2',delay:3});
  TweenMax.from(menu.main.rotation,5,{y:'+=2',delay:7});
  TweenMax.from(menu.main.position,5,{x:5,delay:7});
  TweenMax.from(document.getElementById('continue_btn'),3,{opacity:0,delay:16}) 
  /* buttons.forEach(b=>{
  TweenMax.from(b.position,5,{x:Math.random()*10,y:Math.random()*10,delay:7});
}); */
  //TweenMax.to(hello,3,{opacity:0,delay:7});
  TweenMax.to(menu.main.rotation,5000,{x:360,delay:10,repeat:-1});
}



//move location center after animation
window.showDiscription = function showDiscription(e){
  e.preventDefault();
  console.log('mouse over');
  e.target.getChildElement.style.display='block';
};

let divs = document.getElementsByClassName('project');
for(let x = 0; x < divs.length;x++){
  divs[x].addEventListener('mouseover',(e)=>{
    e.preventDefault();
    e.target.childNodes.forEach(div=>{
      if(String(div.className).includes('desc')){
        div.style.display = 'block';
      }
    });
  });
  divs[x].addEventListener('mouseleave',(e)=>{
    e.preventDefault();
    e.target.childNodes.forEach(div=>{
      if(String(div.className).includes('desc')){
        div.style.display = 'none';
      }
    });
  });
}