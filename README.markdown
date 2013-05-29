[Liquid Slider](http://liquidslider.com)
============
A Responsive jQuery HTML Content Slider

[Download](https://github.com/KevinBatdorf/liquidslider/zipball/master)

[Custom Build](http://liquidslider.com/custom-build)

[Demo Page](http://liquidslider.com)


Features
--------

New: Now with swipe support

Fully Responsive to Screen Widths  
Updates Height After Page Loads  
Available Functions to Adjust Height After AJAX Load  
CSS3 Transitions for Mobile Devices  
Dynamic Mobile Style Navigation (Select Box)  
Hide Arrows on Mobile  

Dynamic Tabs & Arrows  
Callback Functions After Panel Slide  
Dynamic Preloader Per Panel (per panel not available when mobile)  
Pause on Hover  
Hide First and Last Arrows Conditionally  

Auto Play Controls  
Keyboard Navigation  

Continuous Sliding (not on mobile)  
Cross Linking  


How to Use
-----------

See [here](http://liquidslider.com/examples/) for further details and examples.

Install the slider in the head after jQuery and other scripts.

```javascript
    <link rel="stylesheet" type="text/css" media="screen" href="./css/liquid-slider.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="./js/jquery.easing.1.3.js"></script>
    <script src="./js/jquery.touchSwipe.min.js"></script>
    <script src="./js/jquery.liquid-slider.min.js"></script>  
    $(function(){
      $('#slider-id').liquidSlider();
    });
```

Where the slider-id matches the id of the content, as follows:

```html
      <div class="liquid-slider"  id="slider-id">
          <section>
            <h2 class="title">Slide 1</h2>
            <p>Content</p>
          </section>
          <section>
            <h2 class="title">Slide 2</h2>
            <p>Content</p>
          </section>
      </div>
```

Add as many slides as you like within the `<div class="liquid-slider id="slider-id"></div>`

One slide can be inside any element such as a section or a div:   
```html
    <section>
      <h2 class="title">A Slide</h2>
      <p>Content</p>
    </section>
```

Default Settings
----------------
Default settings vary on custom builds

```javascript
                  autoHeight: true,
               autoHeightMin: 0,
      autoHeightEaseDuration: 1500,
      autoHeightEaseFunction: "easeInOutExpo",

           slideEaseDuration: 1500,
              fadeInDuration:1000,
             fadeOutDuration: 1000,
           slideEaseFunction: "easeInOutExpo",
         callforwardFunction: null,
            callbackFunction: null,

                   autoSlide: false,
         autoSliderDirection: 'right',
           autoSlideInterval: 7000,
           autoSlideControls: false,
          autoSlideStartText: 'Start',
           autoSlideStopText: 'Stop',
    autoSlideStopWhenClicked: true,
       autoSlidePauseOnHover: true,

                  continuous: true,

               dynamicArrows: true,
      dynamicArrowsGraphical: false,
        dynamicArrowLeftText: "&#171; left",
       dynamicArrowRightText: "right &#187;",
              hideSideArrows: false,
      hideSideArrowsDuration: 750,
                 hoverArrows: true,
          hoverArrowDuration: 250,


                 dynamicTabs: true,
            dynamicTabsAlign: "left",
         dynamicTabsPosition: "top",
            firstPanelToLoad: 1,
          panelTitleSelector: "h2.title",
               navElementTag: "div",
                  crossLinks: false,
           
                 hashLinking: false,
                   hashNames: true,
              hashCrossLinks: false,
           hashTitleSelector: "h2.title",
            hashTagSeparator: '/',
                     hashTLD: '.html',
                     
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
         hideArrowsThreshold: 481,
              useCSSMaxWidth: 1030,
                       swipe: true

                   preloader: true,
    preloaderFadeOutDuration: 250,
           preloaderElements: 'img,video,iframe,object'

```
    
    
    
    
Documentation
-------------

Documentation is [here](http://liquidslider.com/documentation)

Submit bugs [here](https://github.com/kevinbatdorf/liquidslider/issues)

Maintained by [Kevin Batdorf](http://twitter.com/#!/kevinbatdorf)



Versions
--------
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
- Fixes a bug when using crosslinks on multible sliders wont apply the current class properly.

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
