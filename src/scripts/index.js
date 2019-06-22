import '../css/main.css';
import '../css/grid.css';
//import quiz from '../img/quizzSS_thumbnail.png';
import THREE from 'three';
import Menu from '../scripts/menu';
import { TweenMax } from 'gsap';

let buttons = [];


let menu = new Menu();
buttons = menu.createButtons('about_me');//,'my_skillz','my_life','my_projects','contact_me');
menu.animate();
window.menu = menu;//testing purposes
let hello = document.getElementById('welcome');
/* TweenMax.from(hello,5,{opacity:0});
TweenMax.from(menu.mainLight,6,{intensity:0});
TweenMax.from(menu.main.rotation,5,{x:'+=2',delay:3});
TweenMax.from(menu.main.rotation,5,{y:'+=2',delay:7});
TweenMax.from(menu.main.position,5,{x:5,delay:7}); */ 
//move location center after animation