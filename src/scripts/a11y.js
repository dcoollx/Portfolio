import $ from 'jquery';
export default function rem(){

  console.log('adding a11y fixes');
  $('button[onclick*="window.open("]').attr({role:'link'});
  $('#animated_nav').attr({'aria-hidden':true, tabindex:-1, role:'presentation'}).find('a, button').attr({'aria-hidden':true, tabindex:-1, role:'presentation'});
  $('button.skill').attr({role:'presentation', tabindex:-1});
  $('.skip-to-main, button  ').on('keydown',(e)=>{
    if(e.keyCode === 32 || e.keyCode === 13){
      $(e.currentTarget).click();
    }
  });
  $('.skip-to-main').on('click',()=>{
    $('main').focus();
  });
  $('hr').attr({'aria-hidden':true,role:'presentations',tabindex:-1});

}
