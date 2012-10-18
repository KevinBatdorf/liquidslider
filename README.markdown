[Liquid Slider](http://liquidslider.kevinbatdorf.com)
============
A Responsive jQuery HTML Content Slider

[Download](https://github.com/KevinBatdorf/liquidslider/zipball/master)


Features
--------

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

Continuous Sliding (not mobile)  
Cross Linking  


How to Use
-----------

See [here](http://liquidslider.kevinbatdorf.com) for further details.

Install the slider in the head after jQuery.

```javascript
    <script src="./js/jquery-1.8.0.min.js"></script>
    <script src="./js/jquery-ui-1.8.20.custom.min.js"></script>  
    <script src="./js/jquery.liquid-slider.0.1.min.js"></script>  
    (function(){
        $('#slider-id').liquidSlider();
      });
```

Where the slider-id matches the id of the content, as follows:

```html
      <div class="liquid-slider"  id="slider-id">
          <section>
            <h2 class="title">Panel 1</h2>
            <p>Content</p>
          </section>
          <section>
            <h2 class="title">Panel 2</h2>
            <p>Content</p>
          </section>
      </div>
```

Add as many panels as you like within the `<div class="liquid-slider id="slider-id"></div>`

One Panel:   
```html
    <section>
      <h2 class="title">Panel</h2>
      <p>Content</p>
    </section>
```

Default Settings
----------------
```javascript
                  autoHeight: true,
               autoHeightMin: 0,
      autoHeightEaseDuration: 1500,
      autoHeightEaseFunction: "easeInOutExpo",
           slideEaseDuration: 1500,
           slideEaseFunction: "easeInOutExpo",
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
              hashCrossLinks: true,
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
              useCSSMaxWidth: 1030,

                   preloader: true,
    preloaderFadeOutDuration: 250,
           preloaderElements: 'img,video,iframe,object'

                topScrolling: false,
        topScrollingDuration: 1500,
          topScrollingOnLoad: false,
     topScrollingExtraPixels: 0
```
    
    
    
    
Documentation
-------------

Documentation is [here](http://liquidslider.kevinbatdorf.com/#/documentation.html)

Submit bugs [here](https://github.com/kevinbatdorf/liquidslider/issues)

Maintained by [Kevin Batdorf](http://twitter.com/#!/kevinbatdorf)


### Very Special Thanks to:
Niall Doherty, the original creater of the Coda Slider.

