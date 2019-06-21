import '../css/main.css';
import '../css/grid.css';
//import quiz from '../img/quizzSS_thumbnail.png';

import Menu from '../scripts/menu';
import { TweenMax } from 'gsap';

let menu = new Menu();
menu.animate();
window.menu = menu;//testing purposes
let hello = document.getElementById('welcome');
//TweenMax.from(hello,10,{opacity:0});
//TweenMax.from(menu.main.position,5,{x:5,delay:3}); 