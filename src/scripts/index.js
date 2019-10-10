import '../css/main.css';
import '../css/grid.css';
import me from '../img/me.jpg';
import Menu from '../scripts/menu';
import { TweenMax } from 'gsap';
import siema from 'siema';

document.getElementById('me').src = me;
let buttons = [];


let menu = new Menu();
buttons = menu.createButtons('about_me','my_skills','my_life','my_projects','contact_me');
menu.animate();
//document.getElementById('hamb').addEventListener('click',()=>);
window.menu = menu;//testing purposes
let hello = document.getElementById('welcome');
TweenMax.from(hello,5,{opacity:0});
TweenMax.from(menu.mainLight,6,{intensity:0});
TweenMax.from(menu.main.rotation,5,{x:'+=2',delay:3});
TweenMax.from(menu.main.rotation,5,{y:'+=2',delay:7});
TweenMax.from(menu.main.position,5,{x:5,delay:7}); 
buttons.forEach(b=>{
  TweenMax.from(b.position,5,{x:Math.random()*10,y:Math.random()*10,delay:7});
});
TweenMax.to(hello,3,{opacity:0,delay:7});

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