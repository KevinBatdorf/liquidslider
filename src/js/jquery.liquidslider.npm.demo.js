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

// will allow binding to data-liquid-slider tagged containers.
Base.bindToRender(LiquidSlider);

document.addEventListener("DOMContentLoaded", () => {
  let slider9 = document.getElementById('slider-9');
  if(slider9) {
    //let LiquidSlider = require('liquid-slider'),
    let slider_nine = new LiquidSlider(slider9, {
      autoHeight:false,
      slideEaseFunction:'animate.css',
      slideEaseDuration:1000,
      heightEaseDuration:1000,
      animateIn:"rotateInUpRight",
      animateOut:"rotateOutUpLeft"     
    });
  }
});