"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app = require('application');
var Platform = require('platform');
var absolute_layout_1 = require('ui/layouts/absolute-layout');
var stack_layout_1 = require('ui/layouts/stack-layout');
var button_1 = require('ui/button');
var label_1 = require('ui/label');
var AnimationModule = require('ui/animation');
var gestures = require('ui/gestures');
var enums_1 = require('ui/enums');
var color_1 = require('color');
var LayoutParams;
if (app.android) {
    LayoutParams = android.view.WindowManager.LayoutParams;
}
else {
    LayoutParams = {};
}
var Slide = (function (_super) {
    __extends(Slide, _super);
    function Slide() {
        _super.apply(this, arguments);
    }
    return Slide;
}(stack_layout_1.StackLayout));
exports.Slide = Slide;
var direction;
(function (direction) {
    direction[direction["none"] = 0] = "none";
    direction[direction["left"] = 1] = "left";
    direction[direction["right"] = 2] = "right";
})(direction || (direction = {}));
var cancellationReason;
(function (cancellationReason) {
    cancellationReason[cancellationReason["user"] = 0] = "user";
    cancellationReason[cancellationReason["noPrevSlides"] = 1] = "noPrevSlides";
    cancellationReason[cancellationReason["noMoreSlides"] = 2] = "noMoreSlides";
})(cancellationReason || (cancellationReason = {}));
var SlideContainer = (function (_super) {
    __extends(SlideContainer, _super);
    function SlideContainer() {
        _super.call(this);
        this.direction = direction.none;
        this.setupDefaultValues();
        //this.constructView(true);
    }
    Object.defineProperty(SlideContainer.prototype, "pageIndicators", {
        get: function () {
            return this._pageIndicators;
        },
        set: function (value) {
            this._pageIndicators = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "indicatorsColor", {
        get: function () {
            return this._indicatorsColor;
        },
        set: function (value) {
            this._indicatorsColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "pagerOffset", {
        get: function () {
            return this._pagerOffset;
        },
        set: function (value) {
            this._pagerOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "hasNext", {
        get: function () {
            return !!this.currentPanel.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "hasPrevious", {
        get: function () {
            return !!this.currentPanel.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "interval", {
        get: function () {
            return this._interval;
        },
        set: function (value) {
            this._interval = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "loop", {
        get: function () {
            return this._loop;
        },
        set: function (value) {
            this._loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "disablePan", {
        get: function () {
            return this._disablePan;
        },
        set: function (value) {
            this._disablePan = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "androidTranslucentStatusBar", {
        get: function () {
            return this._androidTranslucentStatusBar;
        },
        set: function (value) {
            this._androidTranslucentStatusBar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "androidTranslucentNavBar", {
        get: function () {
            return this._androidTranslucentNavBar;
        },
        set: function (value) {
            this._androidTranslucentNavBar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "velocityScrolling", {
        get: function () {
            return this._velocityScrolling;
        },
        set: function (value) {
            this._velocityScrolling = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "pageWidth", {
        get: function () {
            return this._pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "angular", {
        get: function () {
            return this._angular;
        },
        set: function (value) {
            this._angular = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "android", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "ios", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "currentIndex", {
        get: function () {
            return this.currentPanel.index;
        },
        enumerable: true,
        configurable: true
    });
    SlideContainer.prototype.setupDefaultValues = function () {
        this._loaded = false;
        if (this._loop == null) {
            this.loop = false;
        }
        this.transitioning = false;
        this._pageWidth = Platform.screen.mainScreen.widthDIPs;
        if (this._interval == null) {
            this.interval = 0;
        }
        if (this._disablePan == null) {
            this.disablePan = false;
        }
        if (this._velocityScrolling == null) {
            this._velocityScrolling = false;
        }
        if (this._angular == null) {
            this.angular = false;
        }
        if (this._pageIndicators == null) {
            this._pageIndicators = false;
        }
        if (this.indicatorsColor == null) {
            this.indicatorsColor = "#fff";
        }
        if (this._pagerOffset == null) {
            this._pagerOffset = "88%";
        }
    };
    SlideContainer.prototype.constructView = function (constructor) {
        var _this = this;
        if (constructor === void 0) { constructor = false; }
        this.on(absolute_layout_1.AbsoluteLayout.loadedEvent, function (data) {
            if (!_this._loaded) {
                _this._loaded = true;
                if (_this.angular === true && constructor === true) {
                    return;
                }
            }
        });
    };
    SlideContainer.prototype.constructSlide = function() {
      var _this = this;
      if (app.android && _this.androidTranslucentStatusBar === true || _this._androidTranslucentNavBar === true && Platform.device.sdkVersion >= '19') {
          var window_1 = app.android.startActivity.getWindow();
          if (_this._androidTranslucentStatusBar === true) {
              window_1.addFlags(LayoutParams.FLAG_TRANSLUCENT_STATUS);
          }
          if (_this._androidTranslucentNavBar === true) {
              window_1.addFlags(LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
          }
      }
      var slides_1 = [];
      _this.eachLayoutChild(function (view) {
          if (view instanceof stack_layout_1.StackLayout) {
              absolute_layout_1.AbsoluteLayout.setLeft(view, _this.pageWidth);
              view.width = _this.pageWidth;
              view.height = '100%';
              slides_1.push(view);
          }
      });
      if (_this.pageIndicators) {
          var iColor = _this.indicatorsColor;
          if (!color_1.Color.isValid(iColor)) {
              iColor = '#fff';
          }
          _this._footer = _this.buildFooter(slides_1.length, 0, iColor);
          _this.insertChild(_this._footer, _this.getChildrenCount());
      }
      _this.currentPanel = _this.buildSlideMap(slides_1);
      _this.currentPanel.panel.translateX = -_this.pageWidth;
      if (_this.disablePan === false) {
          _this.applySwipe(_this.pageWidth);
      }
      app.on(app.orientationChangedEvent, function (args) {
          setTimeout(function () {
              _this._pageWidth = Platform.screen.mainScreen.widthDIPs;
              _this.eachLayoutChild(function (view) {
                  if (view instanceof stack_layout_1.StackLayout) {
                      absolute_layout_1.AbsoluteLayout.setLeft(view, _this.pageWidth);
                      view.width = _this.pageWidth;
                  }
              });
              if (_this.disablePan === false) {
                  _this.applySwipe(_this.pageWidth);
              }
              var topOffset = Platform.screen.mainScreen.heightDIPs - 105;
              if (_this.pageIndicators) {
                  _this._footer.marginTop = '88%';
              }
              _this.currentPanel.panel.translateX = -_this.pageWidth;
          }, 100);
      });
    }
    SlideContainer.prototype.carousel = function (isenabled, time) {
        var _this = this;
        if (isenabled) {
            this.timer_reference = setInterval(function () {
                if (typeof _this.currentPanel.right !== "undefined") {
                    _this.nextSlide();
                }
                else {
                    clearTimeout(_this.timer_reference);
                }
            }, time);
        }
        else {
            clearTimeout(this.timer_reference);
        }
    };
    SlideContainer.prototype.rebindSlideShow = function () {
        if (this.timer_reference != null) {
            this.stopSlideshow();
            this.startSlideshow();
        }
    };
    SlideContainer.prototype.stopSlideshow = function () {
        this.carousel(false, 0);
    };
    SlideContainer.prototype.startSlideshow = function () {
        if (this.interval !== 0) {
            this.carousel(true, this.interval);
        }
    };
    SlideContainer.prototype.nextSlide = function () {
        var _this = this;
        if (!this.hasNext) {
            this.triggerCancelEvent(cancellationReason.noMoreSlides);
            return;
        }
        this.direction = direction.left;
        this.transitioning = true;
        this.triggerStartEvent();
        this.showRightSlide(this.currentPanel).then(function () {
            _this.triggerChangeEventLeftToRight();
            _this.setupPanel(_this.currentPanel.right);
        });
    };
    SlideContainer.prototype.previousSlide = function () {
        var _this = this;
        if (!this.hasPrevious) {
            this.triggerCancelEvent(cancellationReason.noPrevSlides);
            return;
        }
        this.direction = direction.right;
        this.transitioning = true;
        this.triggerStartEvent();
        this.showLeftSlide(this.currentPanel).then(function () {
            _this.triggerChangeEventRightToLeft();
            _this.setupPanel(_this.currentPanel.left);
        });
    };
    SlideContainer.prototype.resetAndroidTranslucentFlags = function () {
        if (this._androidTranslucentStatusBar === true) {
            var window_2 = app.android.startActivity.getWindow();
            window_2.clearFlags(LayoutParams.FLAG_TRANSLUCENT_STATUS);
        }
        if (this._androidTranslucentNavBar === true) {
            window.clearFlags(LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        }
    };
    SlideContainer.prototype.setupPanel = function (panel) {
        this.direction = direction.none;
        this.transitioning = false;
        this.currentPanel.panel.off('pan');
        this.currentPanel = panel;
        if (this.disablePan === false) {
            this.applySwipe(this.pageWidth);
        }
        if (this.pageIndicators) {
            this.setActivePageIndicator(this.currentPanel.index);
        }
        this.rebindSlideShow();
    };
    SlideContainer.prototype.applySwipe = function (pageWidth) {
        var _this = this;
        var previousDelta = -1;
        var endingVelocity = 0;
        var startTime, deltaTime;
        this.currentPanel.panel.on('pan', function (args) {
            if (args.state === gestures.GestureStateTypes.began) {
                startTime = Date.now();
                previousDelta = 0;
                endingVelocity = 250;
                _this.triggerStartEvent();
            }
            else if (args.state === gestures.GestureStateTypes.ended) {
                deltaTime = Date.now() - startTime;
                if (_this.velocityScrolling) {
                    endingVelocity = (args.deltaX / deltaTime) * 100;
                }
                if (args.deltaX > (pageWidth / 3) || (_this.velocityScrolling && endingVelocity > 32)) {
                    if (_this.hasPrevious) {
                        _this.transitioning = true;
                        _this.showLeftSlide(_this.currentPanel, args.deltaX, endingVelocity).then(function () {
                            _this.setupPanel(_this.currentPanel.left);
                            _this.triggerChangeEventLeftToRight();
                        });
                    }
                    else {
                        _this.triggerCancelEvent(cancellationReason.noPrevSlides);
                    }
                    return;
                }
                else if (args.deltaX < (-pageWidth / 3) || (_this.velocityScrolling && endingVelocity < -32)) {
                    if (_this.hasNext) {
                        _this.transitioning = true;
                        _this.showRightSlide(_this.currentPanel, args.deltaX, endingVelocity).then(function () {
                            _this.setupPanel(_this.currentPanel.right);
                            _this.triggerChangeEventRightToLeft();
                            if (!_this.hasNext) {
                                _this.notify({
                                    eventName: SlideContainer.finishedEvent,
                                    object: _this
                                });
                            }
                        });
                    }
                    else {
                        _this.triggerCancelEvent(cancellationReason.noMoreSlides);
                    }
                    return;
                }
                if (_this.transitioning === false) {
                    _this.triggerCancelEvent(cancellationReason.user);
                    _this.transitioning = true;
                    _this.currentPanel.panel.animate({
                        translate: { x: -_this.pageWidth, y: 0 },
                        duration: 200,
                        curve: enums_1.AnimationCurve.easeOut
                    });
                    if (_this.hasNext) {
                        _this.currentPanel.right.panel.animate({
                            translate: { x: 0, y: 0 },
                            duration: 200,
                            curve: enums_1.AnimationCurve.easeOut
                        });
                        if (app.ios)
                            _this.currentPanel.right.panel.translateX = 0;
                    }
                    if (_this.hasPrevious) {
                        _this.currentPanel.left.panel.animate({
                            translate: { x: -_this.pageWidth * 2, y: 0 },
                            duration: 200,
                            curve: enums_1.AnimationCurve.easeOut
                        });
                        if (app.ios)
                            _this.currentPanel.left.panel.translateX = -_this.pageWidth;
                    }
                    if (app.ios)
                        _this.currentPanel.panel.translateX = -_this.pageWidth;
                    _this.transitioning = false;
                }
            }
            else {
                if (!_this.transitioning
                    && previousDelta !== args.deltaX
                    && args.deltaX != null
                    && args.deltaX < 0) {
                    if (_this.hasNext) {
                        _this.direction = direction.left;
                        _this.currentPanel.panel.translateX = args.deltaX - _this.pageWidth;
                        _this.currentPanel.right.panel.translateX = args.deltaX;
                    }
                }
                else if (!_this.transitioning
                    && previousDelta !== args.deltaX
                    && args.deltaX != null
                    && args.deltaX > 0) {
                    if (_this.hasPrevious) {
                        _this.direction = direction.right;
                        _this.currentPanel.panel.translateX = args.deltaX - _this.pageWidth;
                        _this.currentPanel.left.panel.translateX = -(_this.pageWidth * 2) + args.deltaX;
                    }
                }
                if (args.deltaX !== 0) {
                    previousDelta = args.deltaX;
                }
            }
        });
    };
    SlideContainer.prototype.showRightSlide = function (panelMap, offset, endingVelocity) {
        if (offset === void 0) { offset = this.pageWidth; }
        if (endingVelocity === void 0) { endingVelocity = 32; }
        var animationDuration;
        if (this.velocityScrolling) {
            var elapsedTime = Math.abs(offset / endingVelocity) * 100;
            animationDuration = Math.max(Math.min(elapsedTime, 100), 64);
        }
        else {
            animationDuration = 300;
        }
        var transition = new Array();
        transition.push({
            target: panelMap.right.panel,
            translate: { x: -this.pageWidth, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        transition.push({
            target: panelMap.panel,
            translate: { x: -this.pageWidth * 2, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    SlideContainer.prototype.showLeftSlide = function (panelMap, offset, endingVelocity) {
        if (offset === void 0) { offset = this.pageWidth; }
        if (endingVelocity === void 0) { endingVelocity = 32; }
        var animationDuration;
        if (this.velocityScrolling) {
            var elapsedTime = Math.abs(offset / endingVelocity) * 100;
            animationDuration = Math.max(Math.min(elapsedTime, 100), 64);
        }
        else {
            animationDuration = 300;
        }
        var transition = new Array();
        transition.push({
            target: panelMap.left.panel,
            translate: { x: -this.pageWidth, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        transition.push({
            target: panelMap.panel,
            translate: { x: 0, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    SlideContainer.prototype.buildFooter = function (pageCount, activeIndex, iColor) {
        if (pageCount === void 0) { pageCount = 5; }
        if (activeIndex === void 0) { activeIndex = 0; }
        var footerInnerWrap = new stack_layout_1.StackLayout();
        footerInnerWrap.height = 50;
        this.setwidthPercent(footerInnerWrap, 100);
        absolute_layout_1.AbsoluteLayout.setLeft(footerInnerWrap, 0);
        absolute_layout_1.AbsoluteLayout.setTop(footerInnerWrap, 0);
        footerInnerWrap.orientation = 'horizontal';
        footerInnerWrap.verticalAlignment = 'top';
        footerInnerWrap.horizontalAlignment = 'center';
        var i = 0;
        while (i < pageCount) {
            footerInnerWrap.addChild(this.createIndicator(iColor));
            i++;
        }
        var activeIndicator = footerInnerWrap.getChildAt(0);
        activeIndicator.className = 'slide-indicator-active';
        activeIndicator.opacity = 0.9;
        footerInnerWrap.marginTop = this._pagerOffset;
        return footerInnerWrap;
    };
    SlideContainer.prototype.setwidthPercent = function (view, percentage) {
        view.width = percentage + '%';
    };
    SlideContainer.prototype.newFooterButton = function (name) {
        var button = new button_1.Button();
        button.id = 'btn-info-' + name.toLowerCase();
        button.text = name;
        this.setwidthPercent(button, 100);
        return button;
    };
    SlideContainer.prototype.buildSlideMap = function (views) {
        var slideMap = [];
        views.forEach(function (view, index) {
            slideMap.push({
                panel: view,
                index: index,
            });
        });
        slideMap.forEach(function (mapping, index) {
            if (slideMap[index - 1] != null)
                mapping.left = slideMap[index - 1];
            if (slideMap[index + 1] != null)
                mapping.right = slideMap[index + 1];
        });
        if (this.loop) {
            slideMap[0].left = slideMap[slideMap.length - 1];
            slideMap[slideMap.length - 1].right = slideMap[0];
        }
        this.startSlideshow();
        return slideMap[0];
    };
    SlideContainer.prototype.triggerStartEvent = function () {
        this.notify({
            eventName: SlideContainer.startEvent,
            object: this,
            eventData: {
                currentIndex: this.currentPanel.index
            }
        });
    };
    SlideContainer.prototype.triggerChangeEventLeftToRight = function () {
        this.notify({
            eventName: SlideContainer.changedEvent,
            object: this,
            eventData: {
                direction: direction.left,
                newIndex: this.currentPanel.index,
                oldIndex: this.currentPanel.index + 1
            }
        });
    };
    SlideContainer.prototype.triggerChangeEventRightToLeft = function () {
        this.notify({
            eventName: SlideContainer.changedEvent,
            object: this,
            eventData: {
                direction: direction.right,
                newIndex: this.currentPanel.index,
                oldIndex: this.currentPanel.index - 1
            }
        });
    };
    SlideContainer.prototype.triggerCancelEvent = function (cancelReason) {
        this.notify({
            eventName: SlideContainer.cancelledEvent,
            object: this,
            eventData: {
                currentIndex: this.currentPanel.index,
                reason: cancelReason
            }
        });
    };
    SlideContainer.prototype.createIndicator = function (indicatorColor) {
        var indicator = new label_1.Label();
        indicator.backgroundColor = new color_1.Color(indicatorColor);
        indicator.opacity = 0.4;
        indicator.width = 10;
        indicator.height = 10;
        indicator.marginLeft = 2.5;
        indicator.marginRight = 2.5;
        indicator.marginTop = 0;
        indicator.borderRadius = 5;
        return indicator;
    };
    SlideContainer.prototype.setActivePageIndicator = function (index) {
        this._footer.eachLayoutChild(function (view) {
            if (view instanceof label_1.Label) {
                view.opacity = 0.4;
                view.className = 'slide-indicator-inactive';
            }
        });
        var activeIndicator = this._footer.getChildAt(index);
        activeIndicator.className = 'slide-indicator-active';
        activeIndicator.opacity = 0.9;
    };
    SlideContainer.startEvent = "start";
    SlideContainer.changedEvent = "changed";
    SlideContainer.cancelledEvent = "cancelled";
    SlideContainer.finishedEvent = "finished";
    return SlideContainer;
}(absolute_layout_1.AbsoluteLayout));
exports.SlideContainer = SlideContainer;
//# sourceMappingURL=nativescript-slides.js.map
