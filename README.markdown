# Liquid Slider 

## A Responsive jQuery HTML Content Slider

[Download](https://github.com/KevinBatdorf/liquidslider/zipball/master)

[Demo Page](http://kevinbatdorf.github.io/liquidslider)

I'm on Twitter: [@Kevin Batdorf](http://twitter.com/#!/kevinbatdorf)

How to Use
-----------

1. Download the files to your working directory.
2. Link files in the header and footer.
3. Structure your html in a manner similar to below:

```html
<head>
  <link rel="stylesheet" href="./dist/css/liquid-slider.css">
</head>

<section class="liquid-slider" id="main-slider">
  <div>
    <h2 class="title">Slide 1</h2>
    <p>Content</p>
  </div>
  <div>
    <h2 class="title">Slide 2</h2>
    <p>Content</p>
  </div>
</section>

<footer>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js"></script>
  <script src="./dist/js/jquery.liquid-slider.min.js"></script>
</footer>
```

4. Initialize the content slider somewhere after the script.

```javascript
$(function(){
  $('#main-slider').liquidSlider();
});
```

If you would like to edit a setting, do so like this:

```javascript
$(function(){
  $('#main-slider').liquidSlider({
    setting: value,
    setting: value
  });
});
```

Default Settings
----------------

```javascript
autoHeight: true,
minHeight: 0,
heightEaseDuration: 1500,
heightEaseFunction: 'easeInOutExpo',

slideEaseDuration: 1500,
slideEaseFunction: 'easeInOutExpo',
slideEaseFunctionFallback: 'swing',
animateIn: 'bounceInRight',
animateOut: 'bounceOutRight',
continuous: true,
fadeInDuration: 500,
fadeOutDuration: 500,

autoSlide: false,
autoSlideDirection: 'right',
autoSlideInterval: 6000,
forceAutoSlide: false,
pauseOnHover: false,

dynamicArrows: true,
dynamicArrowsGraphical: true,
dynamicArrowLeftText: '&#171; left',
dynamicArrowRightText: 'right &#187;',
hideSideArrows: false,
hideSideArrowsDuration: 750,
hoverArrows: true,
hoverArrowDuration: 250,

dynamicTabs: true,
dynamicTabsHtml: true,
includeTitle: true,
panelTitleSelector: '.title',
dynamicTabsAlign: 'left',
dynamicTabsPosition: 'top',
navElementTag: 'div',

firstPanelToLoad: 1,
crossLinks: false,
hashLinking: false,
hashTitleSelector: '.title',

keyboardNavigation: false,
leftKey: 39,
rightKey: 37,
panelKeys: {
  1: 49,
  2: 50,
  3: 51,
  4: 52
},

responsive: true,
mobileNavigation: true,
mobileNavDefaultText: 'Menu',
mobileUIThreshold: 0,
hideArrowsWhenMobile: true,
hideArrowsThreshold: 0,
useCSSMaxWidth: 3000,

preload: function() {
  this.finalize();
},
onload: function() {},
pretransition: function() {
  this.transition();
},
callback: function() {},

preloader: false,
swipe: true,
swipeArgs: undefined
```


Versions
--------
Version 2.1
- Fixes currentPanel bug
- Switches to a new (better?) modular strategy
- Switches license to MIT
- Improves coding style
- Sets focus/blur for autoslide
- Fixes class for cross links
- sanaziteNumber() -> sanitizeNumber() spelling fix
- Fixes autoSlide pauseOnHover bug 

Version 2.0.12
- Adds currentPanel class to the current panel

Version 2.0.11
- Had to revert a autoslide bug fix

Version 2.0.10
- Fixes how RegEx works (hashLinking)
- Fixes a bug when dynamic arrows is disabled (@joeworkman)
- Adds a fallback for animate.css when css not supported (@joeworkman)
- Fixes autoslide bug (@joeworkman)

Version 2.0.9
- Fixes a few of the problems with cross links

Version 2.0.8
- Changes the way the slider builds with fade

Version 2.0.7
- Fixes swipe bug

Version 2.0.6
- Fixes mobile width

Version 2.0.5
- Updates touchSwipe and allows user to add options (not documented though)

Version 2.0.4
- Changes how the slider downgrades to IE

Version 2.0.3
- Fixes a bug that didn't call pretransition when using animate.css

Version 2.0.2
- Fixes a bug that loses menu names in select box when includeTitle:false

Version 2.0.1
- Fixes auto height on resize bug

Version 2.0.0
- Completely rebuilt from the ground up
- New API
- Faster, smaller, more flexible
- Many, many new features

Version 1.3.7
- Overhauls the cross linking functionality
- Removes the hashCrossLinks setting.
- Contributed by @joeworkman

Version 1.3.6
- Fixes autoslide bug and callback functionality
- Updates website on jquery repository

Version 1.3.5
- Prepares code for new site launch
- Fixes a bug when hover arrows is disabled

Version 1.3.4
- Fixes a bug when using fade transitions
- Allows crossLinks to control multiple sliders

Version 1.3.3
- Fixes an autoslide bug

Version 1.3.2
- Fixes a hashLinking bug

Version 1.3.1
- Fixes a bug when using fade and swipe

Version 1.3.0
- Fixes how the current class is applied when nesting sliders

Version 1.2.9
- Fixes and updates the TouchSwipe settings and script

Version 1.2.8
- Fixes the way the preloader works when continuous is off

Version 1.2.7
- Fixes some bugs

Version 1.2.6
- Fixes a few minor bugs.
- Organizes code for upcoming custom build

Version 1.2.4 - 1.2.5
- Pushes new version # to jQuery repository.

Version 1.2.3
- Fixes a bug when using crosslinks on multiple sliders wont apply the current class properly.

Version 1.2.2
- Fixes a bug where keyboard navigation fails.

Version 1.2.1
- Removes the depreciated $.browser() call.
- Fixes a bug when using hashNames that started the slider on the wrong panel.

Version 1.2.0
- Adapts a new semantic versioning system
- Adds touch functionality via touchSwipe (thanks @appzuka for recommending this plugin)
- Removes jQuery and included only the link to the CDN
- Replaces jQueryUI easing with the much lighter jQuery Easing plugin.
