/*!
 *  Liquid Slider
 *  Copyright 2012 Kevin Batdorf
 *  http://liquidslider.com
 *  MIT license
 *  Updated version using foundation framework NPM friendly
 *  Copyright 2020 Michael Dibbets
 *  MIT license
 */

var $ = require('jquery');
require('jquery.easing');
require('jquery-touchswipe');
require('@tschallacka/jquery.oc.foundation');
var Base = require("@tschallacka/oc.foundation.base");

/**
 * Set here your default application name.
 * Any capital letter will be replaced by lowercase and a - will be inserted 
 * in between.
 * ApplicationForBearTraps turns into application-for-bear-traps and 
 * this script will tag elements with the attributes <div data-application-for-bear-traps>
 *
 * The formatted name will be stored in the variable  `appID` 
 * the jQuery selector will be stored in the variable `appDataHandler`
 */
var APPNAME = 'LiquidSlider';
var LiquidSlider = function (element, options) 
{  
    
  options = $.extend({}, LiquidSlider.DEFAULTS, element && $.data(element), typeof options == 'object' && options);
    
	Base.call(this, APPNAME, element, options);
}; 
LiquidSlider.prototype = Object.create(Base.prototype); 
LiquidSlider.prototype.constructor = LiquidSlider;

/**
 * ================================================================================================================
 *            ****                       edit below this line                             ****
 * ================================================================================================================
 */

LiquidSlider.DEFAULTS = {
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
    
    /**
     * @var preload function|null
    preload: null,
    /**
     * @var onload function|null
     */
    onload: null,
    /**
     * @var pretransition function|null
     */
    pretransition: null,
    /**
     * @var callback function|null
     */
    callback: null,

    preloader: false,
    swipe: true,
    swipeArgs: undefined,
    removeGlobalNoJsMarker: true
  }

/**
 * Bind jQuery event handlers here. 
 * @var type is the event type('on') or ('off') for binding and unbinding events
 * this.$el[type]('click',this.proxy(this.something));
 * 
 * this.bind('click',this.$el,this.something);
 * this.bind('click',this.$el,'.some-subclass',this.somethingelse);
 */
LiquidSlider.prototype.handlers = function(type) 
{
    this.bind('mouseenter',this.$sliderWrap, this.mouseEnter);
    this.bind('mouseleave', this.$sliderWrap, this.mouseLeave);
           
    this.options.swipe && this.registerTouch();
     
    this.bind('click', this.$sliderWrap, this.stopOrStartAutoSlide)
    this.options.dynamicTabs && this.bind('click', this.navigation, 'li', this.handleNavigationClick);
    this.options.dynamicArrows && this.bind('click', this.$sliderWrap, '.ls-nav-left-arrow, .ls-nav-right-arrow', this.onArrowClick);
    this.bind('focus', this.$window, this.onWindowFocus);
    this.bind('blur', this.$window, this.stopAutoSlide);
    this.bind('resize orientationchange', this.$window, this.onScreenChange);
    this.options.keyboardNavigation  && this.bind('keydown', this.$document, this.onKeyDown);
    this.options.mobileNavigation && this.bind('change', this.dropdownSelect, this.mobileMenuChange);
    if(this.options.preload) {
       this.options.preload.call(this);
    }
    else {
      this.bind('load', this.$window, this.finalize);
    }
};

/**
 * This code is called when the application is initialised. Initialise variables here.
 * This is called BEFORE the event handlers are bound.
 * For automatically cleaning variables you can define variables with
 * this.alloc('foobar',42)
 * will be the same as this.foobar = 42;
 * only difference is that the alloc'ed variable will be cleand up automatically on destroy
 * whilst the foobar needs a this.foobar=null in the destroy function.
 */
LiquidSlider.prototype.init = function() 
{console.log('removed', this.options);
  if(this.options.removeGlobalNoJsMarker) {
      $('.no-js').removeClass('no-js');
  }
  else if(this.$el.hasClass('no-js')) {
      this.$el.removeClass('no-js');
  }
  
  // Variable for the % sign if needed (responsive), otherwise px
  this.alloc('pSign', (this.options.responsive) ? '%' : 'px');
  this.alloc('useCSS', false);
  this.alloc('prevPanel', null);
  this.alloc('nextPanel', null);
  this.alloc('loaded', false);
  this.alloc('noAnimation', false);
  this.alloc('noPosttransition', false);
  this.alloc('animateCSS', false);
  this.alloc('cloneJumperTimeout', 0);
  this.alloc('navigation', null);
  this.alloc('dropdown', null);
  this.alloc('dropdownSelect', null);
  this.alloc('totalNavWidth', null);
  this.alloc('leftArrow', null);
  this.alloc('rightArrow', null);
  this.alloc('autoSlideTimeout', 0);
  this.alloc('$window', $(window));
  this.alloc('$document', $(document));
  this.alloc('$preloader', $('<div class="ls-preloader"></div>'));
  this.alloc('panelContainerClass','panel-container');
  this.alloc('panelContainer', '<div class="' + this.panelContainerClass + '"></div>');
  this.alloc('$panelContainer', null);
  this.alloc('$sliderWrap', null);
  this.alloc('resizingTimeout', 0);
  this.alloc('swipeDir', null);
  this.alloc('$allPanels', null);
  this.alloc('panelClass', '.ls-panel:not(.clone)');
  this.alloc('$panelClass', null);
  this.alloc('wrappedTheParent', false);
  this.alloc('totalSliderWidth', null);
  this.alloc('$clones', null);
  this.alloc('panelCount', null);
  this.alloc('panelCountTotal', null);
  this.alloc('panelWidth', null);
  this.alloc('totalWidth', null);
  this.alloc('slideDistance', null);
  this.alloc('dynamicTabsElement', null);
  this.alloc('easing', {
    easeOutCubic: 'cubic-bezier(.215,.61,.355,1)',
    easeInOutCubic: 'cubic-bezier(.645,.045,.355,1)',
    easeInCirc: 'cubic-bezier(.6,.04,.98,.335)',
    easeOutCirc: 'cubic-bezier(.075,.82,.165,1)',
    easeInOutCirc: 'cubic-bezier(.785,.135,.15,.86)',
    easeInExpo: 'cubic-bezier(.95,.05,.795,.035)',
    easeOutExpo: 'cubic-bezier(.19,1,.22,1)',
    easeInOutExpo: 'cubic-bezier(1,0,0,1)',
    easeInQuad: 'cubic-bezier(.55,.085,.68,.53)',
    easeOutQuad: 'cubic-bezier(.25,.46,.45,.94)',
    easeInOutQuad: 'cubic-bezier(.455,.03,.515,.955)',
    easeInQuart: 'cubic-bezier(.895,.03,.685,.22)',
    easeOutQuart: 'cubic-bezier(.165,.84,.44,1)',
    easeInOutQuart: 'cubic-bezier(.77,0,.175,1)',
    easeInQuint: 'cubic-bezier(.755,.05,.855,.06)',
    easeOutQuint: 'cubic-bezier(.23,1,.32,1)',
    easeInOutQuint: 'cubic-bezier(.86,0,.07,1)',
    easeInSine: 'cubic-bezier(.47,0,.745,.715)',
    easeOutSine: 'cubic-bezier(.39,.575,.565,1)',
    easeInOutSine: 'cubic-bezier(.445,.05,.55,.95)',
    easeInBack: 'cubic-bezier(.6,-.28,.735,.045)',
    easeOutBack: 'cubic-bezier(.175,.885,.32,1.275)',
    easeInOutBack: 'cubic-bezier(.68,-.55,.265,1.55)'
  });
  
  
  // jQuery or CSS3 ?
  this.determineAnimationType();

  // Disable some stuff when not responsive
  if (!this.options.responsive) {
    this.options.mobileNavigation = false;
    this.options.hideArrowsWhenMobile = false;
  }
  
  // If using animate.css, add the class here and disable other options.
  if (this.options.slideEaseFunction === 'animate.css') {
    if (!this.useCSS) {
      this.options.slideEaseFunction = this.options.slideEaseFunctionFallback;
    } else {
      this.options.continuous = false;
      this.animateCSS = true;
    }
  }

  // Build the tabs and navigation
  this.build();

  // Fix width
  if (!this.options.responsive && this.options.dynamicArrows) {
    this.$sliderWrap.width(
      this.$el.outerWidth(true) +
      this.leftArrow.outerWidth(true) +
      this.rightArrow.outerWidth(true)
    );
  }
  // Set the slider as loaded (almost)
  this.loaded = true;  
}

/**
 * This code is called when the application is being destroyed/cleaned up.
 * Deinitialise/null your variables here.
 * This is called AFTER the event handlers are unbound.
 * and BEFORE the variables that were set in alloc() are unbound.
 */
LiquidSlider.prototype.destroy = function() 
{
    this.$panelClass
        .children()
        .filter('.panel-wrapper')
        .contents()
        .unwrap();
    if(this.wrappedTheParent) {
        this.$el.unwrap();
    }
    else {
        this.$sliderWrap.css('width','');
    }
    this.$panelContainer.css('margin-left', '');
    this.$allPanels.removeClass('ls-panel');
    
    this.leftArrow && this.leftArrow.remove();
    this.rightArrow && this.rightArrow.remove();
    this.dropdown && this.dropdown.remove();
    this.dynamicTabsElement && this.dynamicTabsElement.remove();
    this.$el.removeData('liquidSlider');
    
}

LiquidSlider.prototype.build = function() 
{
  let isAbsolute = null, 
      clonedCount = null, 
      $parent = this.$el.parent();
  
  // Wrap the entire slider unless it exists already
  if (!$parent.hasClass('ls-wrapper')) {
    this.wrappedTheParent = true;
    $parent = $('<div>');
    $parent.addClass('ls-wrapper');
    this.$el.wrap($parent);
  }
  
  this.$sliderWrap = this.$el.parent();
  
  
  // Add the preloader
  this.options.preloader && this.addPreloader();

  // Add the .panel class to the individual panels
  
  this.$el.children().addClass('ls-panel');
  
  this.$panelClass = this.$el.find(this.panelClass);
  
  // Wrap all panels in a div, and wrap inner content in a div
  this.$panelClass.wrapAll(this.panelContainer);
  this.$panelContainer = this.$panelClass.closest('.' + this.panelContainerClass);
  this.$panelClass.wrapInner('<div class="panel-wrapper"></div>');
  
  // Build hash links
  this.options.hashLinking && this.buildHashTags();

  // If using fade transition, add the class here and disable other options.
  if (this.options.slideEaseFunction === 'fade') {
    this.$panelClass.addClass('fade');
    this.options.continuous = false;
    this.fade = true;
  }

  // Build navigation tabs
  if (this.options.dynamicTabs) {
    this.addNavigation();
  } else {
    this.options.mobileNavigation = false;
  }

  // Build navigation arrows or disable features
  if (this.options.dynamicArrows) {
    this.addArrows();
  } else {
    this.options.hoverArrows = false;
    this.options.hideSideArrows = false;
    this.options.hideArrowsWhenMobile = false;
  }

  /**
   * Create a container width to allow for a smooth float right.
   * Won't calculate arrows if positioned absolute
   */
  isAbsolute = (this.leftArrow && this.leftArrow.css('position') === 'absolute') ? 0 : 1;

  // Set slider width
  this.totalSliderWidth = this.$el.outerWidth(true) + 
                            (this.options.dynamicArrows ?
                                    this.leftArrow.outerWidth(true) * isAbsolute +
                                    this.rightArrow.outerWidth(true) * isAbsolute
                                    : 0
                            );
  
  this.$sliderWrap.width(this.totalSliderWidth);
    
  // Align navigation tabs
  this.options.dynamicTabs && this.alignNavigation();

  /*
   * There is no need to use continuous if arrow navigation is hidden on sides.
   * If you want to use autoslide and still want hideSideArrows, use the API
   */
  this.options.hideSideArrows && (this.options.continuous = false);

  // Clone panels if continuous is enabled
  if (this.options.continuous) {
    this.$panelContainer.prepend(this.$panelContainer.children().last().clone().addClass('clone'));
    this.$panelContainer.append(this.$panelContainer.children().eq(1).clone().addClass('clone'));
  }
  this.$allPanels = this.$el.find('.ls-panel');
  this.$clones = this.$el.find('.clone');
  clonedCount = this.options.continuous ? 2 : 0;

  // Count the number of panels and get the combined width
  this.panelCount = this.$panelClass.length;
  this.panelCountTotal = this.fade ? 1 : this.panelCount + clonedCount;
  this.panelWidth = this.$panelClass.outerWidth();
  this.totalWidth = this.panelCountTotal * this.panelWidth;

  // Apply the width to the panel container
  this.$panelContainer.css({width: this.totalWidth+'px'});
  
  // How far should we slide?
  this.slideDistance = (this.options.responsive ? 100 : this.$el.outerWidth());
  
  if (this.useCSS && this.options.responsive) {
    this.totalWidth = 100 * this.panelCountTotal;
    this.slideDistance = 100 / this.panelCountTotal;
  }

  // Make responsive
  this.options.responsive && this.makeResponsive();

  // Apply starting position
  this.prepareTransition(this.getFirstPanelIndex(), true);

  // Update the class
  this.updateClass();
  if(this.$el.attr('id')) {
    this.$sliderWrap.addClass( this.$el.attr('id') + '-wrapper');    
  }  
};

LiquidSlider.prototype.stopOrStartAutoSlide = function(e) 
{
    if (this.options.forceAutoSlide) {
      this.startAutoSlide(true);
    } else if (this.options.autoSlide) {
      this.stopAutoSlide();
    }
}

LiquidSlider.prototype.determineAnimationType = function() 
{       /** BEGIN DEAD CODE? **/
    let animationstring = 'animation',
        keyframeprefix = '',
        /** END DEAD CODE? **/
        domPrefixes = 'Webkit Moz O ms Khtml'.split(/\s/),
        pfx = '',
        elem = this.$el.get(0);

  /* Decide whether or not to use CSS transitions or jQuery.
   * Code taken from:
   * https://developer.mozilla.org/en-US/docs/CSS/CSS_animations/Detecting_CSS_animation_support
   */
  
  if (elem.style.animationName) this.useCSS = true;
  
  if (!this.useCSS) {
    for (let i = 0; i < domPrefixes.length; i++) {
      pfx = domPrefixes[i];
      if (elem.style[pfx + 'AnimationName'] !== undefined) {
        /** BEGIN DEAD CODE? **/
        animationstring = pfx + 'Animation';
        keyframeprefix = '-' + pfx.toLowerCase() + '-';
        /** END DEAD CODE? **/
        
        this.useCSS = true;
        break;
      }
    }
  }
  (document.documentElement.clientWidth > this.options.useCSSMaxWidth) && (this.useCSS = false);
};

LiquidSlider.prototype.configureCSSTransitions = function(slide, height) 
{
  let slideTransition,
      heightTransition,
      sFunction,
      hFunction;

  // Penner equations in attempt to match jQuery Easing
  
  // Set some defaults
  sFunction = this.easing[this.options.slideEaseFunction] || this.options.slideEaseFunction;
  hFunction = this.easing[this.options.heightEaseFunction] || this.options.heightEaseFunction;

  // Build a CSS class depending on the type of transition
  if (this.useCSS) {
    slideTransition = 'all ' + (slide || this.options.slideEaseDuration) + 'ms ' + sFunction;
    heightTransition = 'all ' + (height || this.options.heightEaseDuration) + 'ms ' + hFunction;

    // Build the width transition rules
    this.$panelContainer.css(this.getTransitionCSS(slideTransition));

    // Build the height transition rules
    if (this.options.autoHeight) {
      this.$el.css(this.getTransitionCSS(heightTransition));
    }
  }
};

LiquidSlider.prototype.getTransitionCSS = function(transition) 
{
    return this.getGenericBrowserPrefixCSSRules('transition', transition);  
}

LiquidSlider.prototype.getTransformCSS = function(transform) 
{
    return this.getGenericBrowserPrefixCSSRules('transform', transform);  
}


LiquidSlider.prototype.getGenericBrowserPrefixCSSRules = function(type, value)
{
    let options = ['webkit', 'moz', 'ms', 'o', ''], 
        obj = {};
        
    options.forEach((item) => {
        let dash = (item ? '-' : '');
        let key = dash + item + dash + type;
        obj[key] = value;
    });
    return obj;
}

LiquidSlider.prototype.transitionFade = function() 
{
  this.$panelClass.eq(this.nextPanel).fadeTo(this.options.fadeInDuration, 1.0).css('z-index', 1);
  this.$panelClass.eq(this.prevPanel).fadeTo(this.options.fadeOutDuration, 0).css('z-index', 0);
  this.callback(this.options.callback, true);
};


LiquidSlider.prototype.mouseEnter = function(e) 
{
    this.options.hoverArrows && this.hideShowArrows(this.options.fadeInDuration, true, true, false);
    this.options.pauseOnHover && clearTimeout(this.autoSlideTimeout);}

LiquidSlider.prototype.mouseLeave = function(e) 
{
    this.options.hoverArrows && this.hideShowArrows(this.options.fadeOutDuration, true, false, true);
    (this.options.pauseOnHover && this.options.autoSlide) && this.startAutoSlide(true);
}

LiquidSlider.prototype.setNextPanel = function(direction) 
{
  if (direction === this.nextPanel) return;
  
  this.prevPanel = this.nextPanel;

  if (this.loaded) {
    if (typeof direction === 'number') {
      this.nextPanel = direction;
    } else {

      // "left" = -1; "right" = 1;
      this.nextPanel += (~~(direction === 'right') || -1);

      // If not continuous, slide back at the last or first panel
      this.options.continuous || 
          (this.nextPanel = (this.nextPanel < 0) ? this.panelCount - 1 : (this.nextPanel % this.panelCount));
    }
    if (this.fade || this.animateCSS) {
      this.prepareTransition(this.nextPanel);
    } else {
      this.verifyPanel();
    }
  }
};

LiquidSlider.prototype.getFirstPanelIndex = function() 
{
  let output;

  // is there a hash tag?
  if (this.options.hashLinking) {
    output = $.inArray(this.convertRegex(window.location.hash), this.hashLinks);

    // Default to panel 1 if mistyped
    if (output === -1) output = 0;
  }
  return (output) ? output : this.options.firstPanelToLoad - 1;
};

/**
 * Searches for the title class and returns the formatted hashtag
 *
 * @param <String> searchTerm
 * @param <Number> input
 * @return <String>
 */
LiquidSlider.prototype.getFromPanel = function(searchTerm, panelNumber) 
{
  return this.convertRegex(this.$panelClass.find(searchTerm).eq(panelNumber).text());
};

/**
 * Removes unwanted characters for browser hash
 *
 * @param <Number> input
 * @return <String>
 */
LiquidSlider.prototype.convertRegex = function(input) 
{
  return $.trim(input)
          .replace(/[^\w -]+/g,'')
          .replace(/ +/g,'-')
          .toLowerCase();
};

/**
 * Updates all classes for current nav and panels
 *
 * @param <Object> crosslink
 */
LiquidSlider.prototype.updateClass = function(crosslink) 
{
  let nextPanel = this.sanitizeNumber(this.nextPanel);
  if (this.options.dynamicTabs) {
    this.$sliderWrap.find('> .ls-nav .tab' + nextPanel)
        .addClass('current')
        .siblings()
        .removeClass('current');
  }

  // Add it to cloned panels
  this.$panelClass.eq(nextPanel - 1 )
      .addClass('currentPanel')
      .siblings()
      .removeClass('currentPanel');

  
  if (this.options.continuous && ((this.nextPanel === -1) || (this.nextPanel === this.panelCount))) {
    this.$clones.addClass('currentPanel');
  } else {
    this.$clones.removeClass('currentPanel');
  }

  // Crosslinks
  // <a href="#2" onclick="api.setNextPanel(1);api.updateClass($(this))">slide 1</a>
  if (crosslink) {
    this.$el.find('.ls-current').removeClass('ls-current');
    crosslink.addClass('ls-current');
  }
};

/**
 * Returns the panel number 1 based instead of 0 based
 *
 * @param <Number> panel
 * @return <Number>
 */
LiquidSlider.prototype.sanitizeNumber = function(panel) {
  

  switch (true) {
    case (panel >= this.panelCount):
      return 1;
    case (panel <= -1):
      return this.panelCount;
    default:
      return panel + 1;
  }
};

LiquidSlider.prototype.finalize = function() 
{
  // Adjust the height again
  let height = this.options.autoHeight ? this.getHeight() : this.getHighestPanel(this.nextPanel);
  this.options.autoHeight && this.adjustHeight(true, height);
  this.options.autoSlide  && this.autoSlide();
  this.options.preloader  && this.removePreloader();
  this.onload();
};

/**
 * Runs after each slide transition completes
 *
 * @param <Function> callbackFn
 * @param <Bool> isFade
 */
LiquidSlider.prototype.callback = function(callbackFn, isFade) 
{
  if (callbackFn && this.loaded) {
    let proxy = this.proxy(callbackFn);
    // Looks for the end of a transition with CSS, otherwise jQuery
    if (this.useCSS && typeof isFade !== 'undefined') {
      this.$panelContainer.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', proxy);
    } else {
      setTimeout(proxy, this.options.slideEaseDuration + 50);
    }
  }
};

LiquidSlider.prototype.onload = function() 
{
  if(this.options.onload) {
    let onload = this.proxy(this.options.onload);
    onload();
  }  
};

/**
 * Prepares the slider for transition, giving the dev the option to
 * not animate, and override the pre and callback hooks
 *
 * @param <Number> nextPanel
 * @param <Bool> noAnimation
 * @param <Bool> noPretransition
 * @param <Bool> noPosttransition
 */
LiquidSlider.prototype.prepareTransition = function(nextPanel, noAnimation, noPretransition, noPosttransition) 
{
  // Override panel
  this.nextPanel = nextPanel || 0;

  // Option to not update classes, etc
  noPretransition || this.pretransition();

  // stores some variables, then sends to pretransition hook
  this.noAnimation = noAnimation;
  
  this.noPosttransition = noPosttransition;
  
  if (!this.loaded || noPretransition || !this.options.pretransition) {
    this.transition();
  } else {
    let pretrans = this.proxy(this.options.pretransition);
    pretrans(this.proxy(this.transition));
  }
};

LiquidSlider.prototype.pretransition = function() 
{
  this.options.hashLinking       && this.updateHashTags();
  this.options.mobileNavigation  && this.dropdownSelect.val('tab' + (this.nextPanel + 1));
  this.options.hideSideArrows    && this.hideShowArrows();
  this.updateClass();
};

LiquidSlider.prototype.getTransitionMargin = function() 
{
  return -(this.nextPanel * this.slideDistance) -
    (this.slideDistance * ~~(this.options.continuous));
};

LiquidSlider.prototype.transition = function() 
{
   let marginLeft = this.getTransitionMargin();
  
  if (this.animateCSS && this.loaded) {
    this.transitionOutAnimateCSS();
    return false;
  }

  // Only slide if we are going to a new panel
  if ((marginLeft + this.pSign) !== this.$panelContainer.css('margin-left') || (marginLeft !== -100)) {

    // Adjust the height
    (this.options.autoHeight && !this.animateCSS) && this.adjustHeight(true, this.getHeight());

    // SLIDE!
    switch (true) {
      case this.fade:
        this.transitionFade();
        break;
      case this.animateCSS:
        this.transitionInAnimateCSS(marginLeft);
        break;
      case this.useCSS:
        this.transitionCSS(marginLeft, this.noAnimation);
        break;
      default:
        this.transitionjQuery(marginLeft, this.noAnimation);
        break;
    }
  }
  this.noPosttransition || this.callback(this.options.callback);
};

// TODO run these together
// TODO this seems buggy in the demo
LiquidSlider.prototype.transitionOutAnimateCSS = function() 
{
  
  this.$panelClass.removeClass(this.options.animateIn + ' animated');
  this.$panelClass.eq(this.prevPanel).addClass('animated ' + this.options.animateOut);
  // callback with undefined fade, seems hacky way to do stuff...
  // TODO: fix the hacky way to do stuff with self documenting logic...
  this.callback(this.transitionInAnimateCSS, undefined);
};

// TODO run these together
LiquidSlider.prototype.transitionInAnimateCSS = function() 
{
  this.options.autoHeight && this.adjustHeight(false, this.getHeight());
  this.transitionCSS(this.getTransitionMargin(), !this.loaded);
  this.$panelClass.removeClass(this.options.animateOut + ' animated');
  this.$panelClass.eq(this.nextPanel).addClass('animated ' + this.options.animateIn);
  // callback with undefined fade, seems hacky way to do stuff...
  // TODO: fix the hacky way to do stuff with self documenting logic...
  this.callback(this.options.callback, undefined);
};

LiquidSlider.prototype.transitionCSS = function(marginLeft, noAnimation) 
{
  noAnimation && this.configureCSSTransitions('0', '0');
  
  this.$panelContainer.css(this.getTransformCSS('translate3d(' + marginLeft + this.pSign + ', 0, 0)'));

  // Reset transitions
  if (noAnimation) {
    this.callback(this.configureCSSTransitions);
  } else {
    this.configureCSSTransitions();
  }
};

LiquidSlider.prototype.transitionjQuery = function(marginLeft, noAnimation) 
{
  let margin = marginLeft + this.pSign;
  if (noAnimation) {
    this.$panelContainer.css('margin-left', margin);
  } else {
    this.$panelContainer.animate({
      'margin-left': margin
    }, {
      easing: jQuery.easing.hasOwnProperty(this.options.slideEaseFunction) ? this.options.slideEaseFunction : this.options.slideEaseFunctionFallback,
      duration: this.options.slideEaseDuration,
      queue: false
    });
  }
};

/**
 * Returns the height of the upcoming panel,
 * but allows the dev to specify a minimum
 *
 * @param <Number> height
 */
LiquidSlider.prototype.getHeight = function(height) {
  

  height = height || this.$panelClass.eq(this.sanitizeNumber(this.nextPanel) - 1).outerHeight(true);

  // Allows a minimum height in the settings to override
  height = (height < this.options.minHeight) ? this.options.minHeight : height;
  return height;
};

/**
 * Looks for the highest panel in the entire slider
 *
 * @param <Number> height
 */
LiquidSlider.prototype.getHighestPanel = function() 
{
      let height,
      highest = 0;

  this.$panelClass.each(function(index, elem) {
    height = $(elem).outerHeight(true);
    highest = (height > highest) ? height : highest;
  });
  if (this.options.autoHeight) return highest;
};

/**
 * Basically checks if we need to jump panels
 * at the end of a transition while using the
 * continuous option (verify we are in the right place)
 */
LiquidSlider.prototype.verifyPanel = function() 
{
    let clickable = false;

  // Continuous slide requires careful clicking
  if (this.options.continuous) {

    // If they click beyond, run it through again.
    switch (true) {

      // Clicking too far right
      case (this.nextPanel > this.panelCount):
        this.nextPanel = this.panelCount;
        this.setNextPanel(this.panelCount);
        break;

      // Clicking too far left
      case (this.nextPanel < -1):
        this.nextPanel = -1;
        this.setNextPanel(-1);
        break;

      // Clicking to a cloned panel
      case clickable || ((this.nextPanel === this.panelCount) || (this.nextPanel === -1)):

        // If on a cloned panel, return to the intended panel
        this.prepareTransition(this.nextPanel);
        this.updateClass();
        clearTimeout(this.cloneJumperTimeout);
        this.cloneJumperTimeout = setTimeout(this.proxy(this.jumpClones), this.options.slideEaseDuration + 50);
        break;

      // The default transition
      default:
        clickable = true;
        this.prepareTransition(this.nextPanel);
        break;
    }
  } else {

    // Non-continuous just needs to stay in bounds
    if (this.nextPanel === this.panelCount) {
      this.nextPanel = 0;
    } else if (this.nextPanel === -1) {
      this.nextPanel = (this.panelCount - 1);
    }
    this.prepareTransition(this.nextPanel);
  }
};

LiquidSlider.prototype.jumpClones = function() 
{
    if (this.nextPanel === this.panelCount) {
      this.prepareTransition(0, true, true, true);
    } else if (this.nextPanel === -1) {
      this.prepareTransition(this.panelCount - 1, true, true, true);
    }
}

/**
 * This will add the navigation to the slider.
 * navClass isn't use internally, but may be used
 * with the API (untested)
 *
 * @param <String> navClass
 */
LiquidSlider.prototype.addNavigation = function(navClass) 
{
  let nav = this.options.navElementTag;
  let $navigation = this.navigation = $('<ul>');
  let dynamicTabsElm = this.dynamicTabsElement = $('<' + nav + ' class="ls-nav">');
  dynamicTabsElm.append(this.navigation);

  // Add basic frame
  if (this.options.dynamicTabsPosition === 'bottom') {
    this.$el.after(dynamicTabsElm);
  } else {
    this.$el.before(dynamicTabsElm);
  }

  // Add responsive navigation
  if (this.options.mobileNavigation) {
    let selectBoxDefault = (this.options.mobileNavDefaultText) ?
                              '<option disabled="disabled" selected="selected">' +
                              this.options.mobileNavDefaultText +
                              '</option>' : null;
    this.dropdown = $('<div class="ls-select-box"></div>');
    this.dropdownSelect = $('<select class="nav-select" name="navigation">' +
                       selectBoxDefault  +
                       '</select>');
    this.dropdown.append(this.dropdownSelect);      
    // cache elements
    this.navigation.before(this.dropdown);
  }
  let inside = this.proxy(this.getNavInsides);
  let $panelTitles = this.$el.find(this.options.panelTitleSelector);
  let includeTitle = this.options.includeTitle;

  $panelTitles.each((index, element) => {
        
    let displayindex = index + 1
    if (this.options.mobileNavigation) {
      let $option = $('<option value="tab' + (index + 1) + '">' + element.innerText + '</option>');
      $option.data('nav-tab', index);
      this.dropdownSelect.append($option);
    }
        
    let $tab = $('<li class="ls-nav-tab tab' +
                         (index + 1) +
                         '"><a class="' +
                         ( navClass || '') +
                         '" href="#' +
                         (index + 1) +
                         '">' +
                         inside(element) +
                         '</a></li>');
    $tab.data('ls-nav-tab', index)                    
    $navigation.append($tab);
        
    if(!includeTitle) {
      $(element).remove();
    }
  });
  
};

/**
 * Returns the title that will be used,
 * supports html or a string.
 *
 * @param <Element> input
 * @return <String or Element>
 */
LiquidSlider.prototype.getNavInsides = function(input) 
{
  return (this.options.dynamicTabsHtml) ? $(input).html() : $(input).text();
};

LiquidSlider.prototype.alignNavigation = function() 
{
  
  let arrow = (this.options.dynamicArrowsGraphical) ? '-arrow' : '',
  BASE_TEN = 10;

  // Set the alignment, adjusting for margins
  if (this.options.dynamicTabsAlign !== 'center') {
    if (!this.options.responsive) {
      let margin_size = this.$el.css('margin-' + this.options.dynamicTabsAlign);
      let calculated_width = this.$sliderWrap.find('.ls-nav-' +
                                                    this.options.dynamicTabsAlign +
                                                    arrow
                                                  ).outerWidth(true) + parseInt(margin_size, BASE_TEN);
      this.navigation.css(
        'margin-' + this.options.dynamicTabsAlign,       
        calculated_width
      );
    }
    
    this.navigation.css('float', this.options.dynamicTabsAlign);
  }
  this.totalNavWidth = this.navigation.outerWidth(true);
  
  if (this.options.dynamicTabsAlign === 'center') {

    // Get total width of the navigation tabs and center it
    let totalwidth = 0;
    this.navigation.find('li a').each(function(index, element) {
      totalwidth += $(element).outerWidth(true);
    });
    this.totalNavWidth = totalwidth;
    this.navigation.css('width', totalwidth + 1);
  }
};

LiquidSlider.prototype.handleNavigationClick = function(e) {
    e.preventDefault();
    this.setNextPanel($.data(e.currentTarget, 'ls-nav-tab'));
    return false;
};
/**
 * This will add the arrows to the slider.
 * arrowClass isn't use internally, but may be used
 * with the API (untested)
 *
 * @param <String> arrowClass
 */
LiquidSlider.prototype.addArrows = function(arrowClass) 
{
  let arrow = this.options.dynamicArrowsGraphical ? "-arrow " : ' ';
  this.$sliderWrap.addClass("arrows");

  if (this.options.dynamicArrowsGraphical) {
    this.options.dynamicArrowLeftText = '';
    this.options.dynamicArrowRightText = '';
  }
  this.leftArrow = $('<div class="ls-nav-left' +
                      arrow +
                      (arrowClass || '') +
                      '"><a href="#">' +
                      this.options.dynamicArrowLeftText +
                      '</a></div>');
   this.leftArrow.data('ls-navigate','left');
   this.rightArrow = $('<div class="ls-nav-right' +
                       arrow +
                       (arrowClass || '') +
                       '"><a href="#">' +
                       this.options.dynamicArrowRightText +
                       '</a></div>');
  this.rightArrow.data('ls-navigate','right');
  // Build the arrows
  this.$el.before(this.leftArrow);
  this.$el.after(this.rightArrow);

  
  this.leftArrow.css('visibility', "hidden").addClass('ls-hidden');
  this.rightArrow.css('visibility', "hidden").addClass('ls-hidden');
  
  /** TODO: clear up the funny business with undefined via
    * something logical and self documenting in purpose. 
    */    
  if (!this.options.hoverArrows) this.hideShowArrows(undefined, true, true, false);
};

/**
 * Handles when arrows will show and whether
 * to hide both, show both, etc.
 * Also allows override of the fade speed
 *
 * @param <Number> speed
 * @param <Bool> forceVisibility
 * @param <Bool> showBoth
 * @param <Bool> hideBoth
 */
LiquidSlider.prototype.hideShowArrows = function(speed, forceVisibility, showBoth, hideBoth) 
{
    let leftArrow = this.leftArrow,
        rightArrow = this.rightArrow;
        
  if (!showBoth && (hideBoth || (this.sanitizeNumber(this.nextPanel) === 1))) {
       this.hideArrow(leftArrow);
  } else if (showBoth || leftArrow.hasClass('ls-hidden')) {
       this.showArrow(leftArrow, forceVisibility);
  }
  if (!showBoth && (hideBoth || (this.sanitizeNumber(this.nextPanel) === this.panelCount))) {
    this.hideArrow(rightArrow);
  } else if (showBoth || rightArrow.hasClass('ls-hidden')) {
        this.showArrow(rightArrow, forceVisibility);
  }
};

LiquidSlider.prototype.hideArrow = function(arrow, forceVisibility) 
{
    let fadeOut = (typeof speed !== 'undefined') ? speed : this.options.fadeOutDuration,
    visibility = forceVisibility ? "visible" : "hidden";
    arrow.stop().fadeTo(fadeOut, 0, () => {
        arrow.css('visibility', visibility)
             .addClass('ls-hidden');
    });
}

LiquidSlider.prototype.showArrow = function(arrow)
{
    let fadeIn = (typeof speed !== 'undefined') ? speed : this.options.fadeInDuration;
    arrow.stop()
         .css('visibility', "visible")
         .fadeTo(fadeIn, 1)
         .removeClass('ls-hidden');
}
LiquidSlider.prototype.onArrowClick = function(e) {
  e.preventDefault();
  console.log(e.currentTarget);
  this.setNextPanel($.data(e.currentTarget, 'ls-navigate'));
  return false;
}
LiquidSlider.prototype.registerArrows = function() 
{
  
};

/**
 * Provides options for adjusting the height,
 * including the ability to use different easing,
 * speed and height.
 *
 * @param <Number> noAnimation
 * @param <Bool> height
 * @param <Bool> easing
 * @param <Bool> duration
 */
LiquidSlider.prototype.adjustHeight = function(noAnimation, height, easing, duration) 
{
  if (noAnimation || this.useCSS) {
    noAnimation && this.configureCSSTransitions('0', '0');
    this.$el.height(height);
    noAnimation && this.configureCSSTransitions();
    return;
  }
  
  this.$el.animate({
    'height': height + 'px'
  }, {
    easing: jQuery.easing.hasOwnProperty(easing || _this.options.heightEaseFunction) ? easing || this.options.heightEaseFunction : this.options.slideEaseFunctionFallback,
    duration: duration || this.options.heightEaseDuration,
    queue: false
  });
};

LiquidSlider.prototype.autoSlide = function() {
  

  // Can't set the autoSlide slower than the easing ;-)
  if (this.options.autoSlideInterval < this.options.slideEaseDuration) {
    this.options.autoSlideInterval = (this.options.slideEaseDuration > this.options.heightEaseDuration) ?
                                      this.options.slideEaseDuration : this.options.heightEaseDuration;
  }

  // Only run the autoslide if the tab is in focus
  this.autoSlideTimeout = !document.hasFocus() ? undefined : setTimeout(this.proxy(this.slideNext), this.options.autoSlideInterval);

  // Register a focus and blur event to reset autoslide
  
};

LiquidSlider.prototype.slideNext = function() 
{
    // Slide left or right
    this.setNextPanel(this.options.autoSlideDirection);
    this.autoSlide();
}

LiquidSlider.prototype.onWindowFocus = function(e) {
    this.startAutoSlide(true);
}

LiquidSlider.prototype.stopAutoSlide = function() {
  this.options.autoSlide = false;
  clearTimeout(this.autoSlideTimeout);
};

/**
 * Starts the autoslide. reset will keep from
 * too many timers running
 *
 * @param <Bool> reset
 */
LiquidSlider.prototype.startAutoSlide = function(reset) 
{
  this.options.autoSlide = true;
  reset || this.setNextPanel(this.options.autoSlideDirection);
  this.autoSlide(clearTimeout(this.autoSlideTimeout));
};

LiquidSlider.prototype.buildHashTags = function() 
{ 
  this.hashLinks = [];
  this.$el.find(this.options.hashTitleSelector).each(this.proxy(this.updateHashTags));
};
LiquidSlider.prototype.appendHashLink = function(index, element) 
{
    this.hashLinks.push(this.convertRegex(element.innerText));
}

LiquidSlider.prototype.updateHashTags = function() 
{
  window.location.hash = this.hashLinks[this.sanitizeNumber(this.nextPanel) - 1];
};

LiquidSlider.prototype.registerKeyboard = function() 
{ 
};

LiquidSlider.prototype.onKeyDown = function(event) 
{
    var key = event.keyCode || event.which;
    if (event.target.type !== 'textarea' && event.target.type !== 'textbox') {

      // Off the autoSlider
      this.options.forceAutoSlide      || this.stopAutoSlide();
      (key === this.options.leftKey)   && this.setNextPanel('right');
      (key === this.options.rightKey)  && this.setNextPanel('left');
     
      let setNext = this.proxy(this.setNextPanel);
      // Set each panel key
      $.each(this.options.panelKeys, function(index, keycode) {
        (key === keycode) && setNext(index - 1);
      });
    }
}

LiquidSlider.prototype.addPreloader = function() 
{
  this.$sliderWrap.append(this.$preloader);
};

LiquidSlider.prototype.removePreloader = function() {
 
  this.$preloader.fadeTo('slow', 0, this.proxy(this.afterFadingPreloader));
};

LiquidSlider.prototype.afterFadingPreloader = function() 
{
   this.$preloader.remove(); 
}

LiquidSlider.prototype.makeResponsive = function() 
{
  // Adjust widths and add classes to make responsive
  this.$sliderWrap
      .addClass('ls-responsive')
      .css({
        'max-width': this.$panelClass.first().width(),
        'width': '100%'
      });

  // Update widths
  this.$panelContainer.css('width', 100 * this.panelCountTotal + this.pSign);
  this.$allPanels.css('width', 100 / this.panelCountTotal + this.pSign);

  // convert to pixels (Probably not needed anymore, and causing issues in chrome)
  // jQuery(_this.sliderId + ' .ls-panel').css('width', this.$el.outerWidth(true));

  // Cache the padding for add/removing arrows
  if (this.options.hideArrowsWhenMobile) {
    this.leftWrapperPadding = this.$sliderWrap.css('padding-left');
    this.rightWrapperPadding = this.$sliderWrap.css('padding-right');
  }

  // Set events and fire on browser resize
  this.responsiveEvents();
  
};

LiquidSlider.prototype.onScreenChange = function(e) 
{
    this.responsiveEvents();

    clearTimeout(this.resizingTimeout);
    this.resizingTimeout = setTimeout(this.proxy(this.adjustAfterScreenHeightChange), 500);
}

LiquidSlider.prototype.adjustAfterScreenHeightChange = function() 
{
    var height = (this.options.autoHeight) ? this.getHeight() : this.getHighestPanel(this.nextPanel);
    this.adjustHeight(false, height);
    // convert to pixels (Probably not needed anymore, and causing issues in chrome)
    // jQuery(_this.sliderId + ' .ls-panel').css('width', this.$el.outerWidth(true));
}

LiquidSlider.prototype.responsiveEvents = function() 
{  
   let mobileNavChangeOver = (this.options.hideArrowsThreshold || this.options.mobileUIThreshold || (this.totalNavWidth + 10));
   if(this.$el.width() > this.$window.width()) {
       this.$el.css('width', '100%');
   }
   else {
       this.$el.css('width','');
   }
  // Test the width while resising

  if (this.$el.outerWidth() < mobileNavChangeOver) {
    if (this.options.mobileNavigation) {
      this.$el.addClass('ls-mobile');
      this.navigation.css('display', 'none');
      this.dropdown.css('display', 'block');
      this.dropdownSelect.css('display', 'block');

      // Update the navigation
      this.dropdownSelect.val(this.options.mobileNavDefaultText);
    }
    if (this.options.dynamicArrows) {
      if (this.options.hideArrowsWhenMobile) {
        this.leftArrow.remove().length = 0;
        this.rightArrow.remove().length = 0;
      } else if (!this.options.dynamicArrowsGraphical) {

        // If using text arrows, let's move them to the top
        this.leftArrow.css('margin-' + this.options.dynamicTabsPosition, '0');
        this.rightArrow.css('margin-' + this.options.dynamicTabsPosition, '0');
      }
    }
  } else {
    if (this.options.mobileNavigation) {
      this.$el.removeClass('ls-mobile');
      this.navigation.css('display', 'block');
      this.dropdown.css('display', 'none');
      this.dropdownSelect.css('display', 'none');
    }
    if (this.options.dynamicArrows) {
      if (this.options.hideArrowsWhenMobile &&(!this.leftArrow.length || !this.rightArrow.length)) {
        this.addArrows();
        this.registerArrows();
      } else if (!this.options.dynamicArrowsGraphical && this.options.mobileNavigation) {

        // Reposition the text arrows
        this.leftArrow.css('margin-' + this.options.dynamicTabsPosition, this.navigation.css('height'));
        this.rightArrow.css('margin-' + this.options.dynamicTabsPosition, this.navigation.css('height'));
      }
    }
  }
  
  // While resizing, set the width to 100%
  this.$sliderWrap.css('width', '100%');
  this.loaded && this.$allPanels.width(100 / this.panelCountTotal + this.pSign);

  
};

LiquidSlider.prototype.mobileMenuChange = function(e) 
{
   let target = e.currentTarget;
   let $option = $(target.options[target.selectedIndex]);
   this.setNextPanel($option.data('nav-tab'));
}

LiquidSlider.prototype.registerTouch = function() 
{
  let args = this.options.swipeArgs || {
    fallbackToMouseEvents: false,
    allowPageScroll: 'vertical',
    swipe: this.proxy(this.swiperNoSwiping)
  };
  this.$allPanels.swipe(args);
};

LiquidSlider.prototype.swiperNoSwiping = function(e, dir) 
{
    if (dir === 'up' || dir === 'down') return false;

    // Reverse the swipe direction
    this.swipeDir = (dir === 'left') ? 'right' : 'left';
    this.setNextPanel(this.swipeDir);
}

module.exports = LiquidSlider;

LiquidSlider.bindTojQuery = function(jQueryInstance) 
{
   let instance = new LiquidSlider();
   if(!jQueryInstance.fn.liquidSlider) {
       jQueryInstance.fn.liquidSlider = function(options) 
       {         
         return this.each(function(index, elem) 
         {
           if(!$.data(elem, 'liquidSlider') && !$.data(elem, instance.oc)) {
            let slider = new LiquidSlider(elem, options);
            $.data(elem, 'liquidSlider', slider);
           }
           else {
               console.error(elem);
               throw new Error('liquid slider is already bound to this object');
           }
         });
       }
    }
    else {
        console.error('liquid slider is already bound to this jQuery instance');
    }
}
LiquidSlider.bindTojQuery($);