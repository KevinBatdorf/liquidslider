/*!
 *  Liquid Slider
 *  Copyright 2012 Kevin Batdorf
 *  http://liquidslider.com
 *  MIT license
 *  Updated version using foundation framework NPM friendly
 *  Copyright 2020 Michael Dibbets
 *  MIT license
 */
var Base = require("@tschallacka/oc.foundation.base");
var $ = window.$ = window.jQuery = require('jquery');
var LiquidSlider = require('./jquery.liquidslider.npm.js');

// Should show an error in console.
LiquidSlider.bindTojQuery($);

document.addEventListener("DOMContentLoaded", () => {
  let slider9 = document.getElementById('slider-9');
  if(slider9) {
    //let LiquidSlider = require('liquid-slider'),
    let slider_nine = new LiquidSlider(slider9, {
      autoHeight:true,
      slideEaseFunction:'animate.css',
      slideEaseDuration:1000,
      heightEaseDuration:1000,
      animateIn:"rotateInUpRight",
      animateOut:"rotateOutUpLeft"     
    });
  }
  
  let $destroyable = $('#destroyable_from_npm');
  
  if($destroyable.length > 0) {
    let slider_destroy = new LiquidSlider($destroyable, {
      autoHeight:true,
      slideEaseFunction:'animate.css',
      slideEaseDuration:1000,
      heightEaseDuration:1000,
      animateIn:"rollIn",
      animateOut:"rollOut"     
    });
    $destroyable.on('what_can_i_say_except_delete_this', () => {
      slider_destroy.sysDestroy();
      setTimeout(()=>{$destroyable.fadeOut('slow');}, 3000);
    });
  }
  
  $(document).trigger('render');
});