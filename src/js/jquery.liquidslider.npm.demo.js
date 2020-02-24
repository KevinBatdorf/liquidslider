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
var liquidSlider = require('./jquery.liquidslider.npm.js');

// Should show an error in console.
liquidSlider.bindTojQuery($);

// will allow binding to data-liquid-slider tagged containers.
Base.bindToRender(liquidSlider);