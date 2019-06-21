import '../css/main.css';
import '../css/grid.css';
//import quiz from '../img/quizzSS_thumbnail.png';

import Menu from '../scripts/menu';
import { TweenMax } from 'gsap';

let menu = new Menu();
menu.animate();
window.menu = menu;//testing purposes
let hello = document.getElementById('welcome');
TweenMax.from(hello,5,{opacity:0});
TweenMax.from(menu.main.rotation,5,{x:'+=2',delay:3});
TweenMax.from(menu.main.rotation,5,{y:'+=2',delay:7});
TweenMax.from(menu.main.position,5,{x:5,delay:7}); 