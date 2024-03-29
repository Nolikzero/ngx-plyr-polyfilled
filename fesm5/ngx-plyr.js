import { Component, ElementRef, NgZone, Renderer2, Input, ViewChild, Output, NgModule } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, switchMap, filter } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DefaultPlyrDriver = /** @class */ (function () {
    function DefaultPlyrDriver() {
    }
    /**
     * @param {?} params
     * @return {?}
     */
    DefaultPlyrDriver.prototype.create = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        console.log('DefaultPlyrDriver - 2');
        return new window['Plyr'](params.videoElement, params.options);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DefaultPlyrDriver.prototype.updateSource = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        params.plyr.source = params.source;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DefaultPlyrDriver.prototype.destroy = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        params.plyr.destroy();
    };
    return DefaultPlyrDriver;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PlyrComponent = /** @class */ (function () {
    function PlyrComponent(elementRef, ngZone, renderer) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.playerChange = new BehaviorSubject(null);
        this.events = new Map();
        this.plyrType = 'video';
        // ngx-plyr events
        this.plyrInit = (/** @type {?} */ (this.playerChange.pipe(filter((/**
         * @param {?} player
         * @return {?}
         */
        function (player) { return !!player; })))));
        // standard media events
        this.plyrProgress = this.createLazyEvent('progress');
        this.plyrPlaying = this.createLazyEvent('playing');
        this.plyrPlay = this.createLazyEvent('play');
        this.plyrPause = this.createLazyEvent('pause');
        this.plyrTimeUpdate = this.createLazyEvent('timeupdate');
        this.plyrVolumeChange = this.createLazyEvent('volumechange');
        this.plyrSeeking = this.createLazyEvent('seeking');
        this.plyrSeeked = this.createLazyEvent('seeked');
        this.plyrRateChange = this.createLazyEvent('ratechange');
        this.plyrEnded = this.createLazyEvent('ended');
        this.plyrEnterFullScreen = this.createLazyEvent('enterfullscreen');
        this.plyrExitFullScreen = this.createLazyEvent('exitfullscreen');
        this.plyrCaptionsEnabled = this.createLazyEvent('captionsenabled');
        this.plyrCaptionsDisabled = this.createLazyEvent('captionsdisabled');
        this.plyrLanguageChange = this.createLazyEvent('languagechange');
        this.plyrControlsHidden = this.createLazyEvent('controlshidden');
        this.plyrControlsShown = this.createLazyEvent('controlsshown');
        this.plyrReady = this.createLazyEvent('ready');
        // HTML5 events
        this.plyrLoadStart = this.createLazyEvent('loadstart');
        this.plyrLoadedData = this.createLazyEvent('loadeddata');
        this.plyrLoadedMetadata = this.createLazyEvent('loadedmetadata');
        this.plyrQualityChange = this.createLazyEvent('qualitychange');
        this.plyrCanPlay = this.createLazyEvent('canplay');
        this.plyrCanPlayThrough = this.createLazyEvent('canplaythrough');
        this.plyrStalled = this.createLazyEvent('stalled');
        this.plyrWaiting = this.createLazyEvent('waiting');
        this.plyrEmptied = this.createLazyEvent('emptied');
        this.plyrCueChange = this.createLazyEvent('cuechange');
        this.plyrError = this.createLazyEvent('error');
        // YouTube events
        this.plyrStateChange = this.createLazyEvent('statechange');
        this.subscriptions = [];
    }
    Object.defineProperty(PlyrComponent.prototype, "player", {
        get: /**
         * @return {?}
         */
        function () {
            return this.playerChange.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    PlyrComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this.subscriptions.push(this.plyrInit.pipe(first()).subscribe((/**
         * @param {?} player
         * @return {?}
         */
        function (player) {
            /** @type {?} */
            var reinitTriggers = [changes.plyrOptions, changes.plyrPlaysInline, changes.plyrCrossOrigin].filter((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return !!t; }));
            if (reinitTriggers.length) {
                if (reinitTriggers.some((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return !t.firstChange; }))) {
                    _this.initPlyr(true);
                }
            }
            else {
                _this.updatePlyrSource(player);
            }
        })));
    };
    /**
     * @return {?}
     */
    PlyrComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyPlayer();
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return s.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    PlyrComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initPlyr();
    };
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    PlyrComponent.prototype.initPlyr = /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (force || !this.player) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this.destroyPlayer();
                _this.driver = _this.plyrDriver || new DefaultPlyrDriver();
                _this.ensureVideoElement();
                /** @type {?} */
                var newPlayer = _this.driver.create({
                    videoElement: _this.videoElement,
                    options: _this.plyrOptions,
                });
                _this.updatePlyrSource(newPlayer);
                _this.playerChange.next(newPlayer);
            }));
        }
    };
    /**
     * @private
     * @param {?} plyr
     * @return {?}
     */
    PlyrComponent.prototype.updatePlyrSource = /**
     * @private
     * @param {?} plyr
     * @return {?}
     */
    function (plyr) {
        this.driver.updateSource({
            videoElement: this.videoElement,
            plyr: plyr,
            source: {
                type: this.plyrType,
                title: this.plyrTitle,
                sources: this.plyrSources,
                poster: this.plyrPoster,
                tracks: this.plyrTracks,
            },
        });
    };
    // see https://stackoverflow.com/a/53704102/1990451
    // see https://stackoverflow.com/a/53704102/1990451
    /**
     * @private
     * @template T
     * @param {?} name
     * @return {?}
     */
    PlyrComponent.prototype.createLazyEvent =
    // see https://stackoverflow.com/a/53704102/1990451
    /**
     * @private
     * @template T
     * @param {?} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        return (/** @type {?} */ (this.plyrInit.pipe(switchMap((/**
         * @return {?}
         */
        function () { return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) { return _this.on(name, (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.ngZone.run((/**
         * @return {?}
         */
        function () { return observer.next(data); })); })); })); })))));
    };
    /**
     * @private
     * @return {?}
     */
    PlyrComponent.prototype.destroyPlayer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.player) {
            Array.from(this.events.keys()).forEach((/**
             * @param {?} name
             * @return {?}
             */
            function (name) { return _this.off(name); }));
            this.driver.destroy({
                plyr: this.player,
            });
            this.videoElement = null;
        }
    };
    Object.defineProperty(PlyrComponent.prototype, "hostElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    /**
     * @private
     * @return {?}
     */
    PlyrComponent.prototype.ensureVideoElement =
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var videoElement = this.hostElement.querySelector('video');
        if (videoElement) {
            this.videoElement = videoElement;
        }
        else {
            this.videoElement = this.renderer.createElement('video');
            this.videoElement.controls = true;
            if (this.plyrCrossOrigin) {
                this.videoElement.setAttribute('crossorigin', '');
            }
            if (this.plyrPlaysInline) {
                this.videoElement.setAttribute('playsinline', '');
            }
            this.renderer.appendChild(this.hostElement, this.videoElement);
        }
    };
    /**
     * @private
     * @param {?} name
     * @param {?} handler
     * @return {?}
     */
    PlyrComponent.prototype.on = /**
     * @private
     * @param {?} name
     * @param {?} handler
     * @return {?}
     */
    function (name, handler) {
        this.events.set(name, handler);
        this.player.on((/** @type {?} */ (name)), handler);
    };
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    PlyrComponent.prototype.off = /**
     * @private
     * @param {?} name
     * @return {?}
     */
    function (name) {
        this.player.off((/** @type {?} */ (name)), this.events.get(name));
        this.events.delete(name);
    };
    PlyrComponent.decorators = [
        { type: Component, args: [{
                    selector: 'plyr, [plyr]',
                    // tslint:disable-line
                    template: "",
                    exportAs: 'plyr',
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    PlyrComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 }
    ]; };
    PlyrComponent.propDecorators = {
        plyrDriver: [{ type: Input }],
        plyrType: [{ type: Input }],
        plyrTitle: [{ type: Input }],
        plyrPoster: [{ type: Input }],
        plyrSources: [{ type: Input }],
        plyrTracks: [{ type: Input }],
        plyrOptions: [{ type: Input }],
        plyrCrossOrigin: [{ type: Input }],
        plyrPlaysInline: [{ type: Input }],
        vr: [{ type: ViewChild, args: ['v', { static: false },] }],
        plyrInit: [{ type: Output }],
        plyrProgress: [{ type: Output }],
        plyrPlaying: [{ type: Output }],
        plyrPlay: [{ type: Output }],
        plyrPause: [{ type: Output }],
        plyrTimeUpdate: [{ type: Output }],
        plyrVolumeChange: [{ type: Output }],
        plyrSeeking: [{ type: Output }],
        plyrSeeked: [{ type: Output }],
        plyrRateChange: [{ type: Output }],
        plyrEnded: [{ type: Output }],
        plyrEnterFullScreen: [{ type: Output }],
        plyrExitFullScreen: [{ type: Output }],
        plyrCaptionsEnabled: [{ type: Output }],
        plyrCaptionsDisabled: [{ type: Output }],
        plyrLanguageChange: [{ type: Output }],
        plyrControlsHidden: [{ type: Output }],
        plyrControlsShown: [{ type: Output }],
        plyrReady: [{ type: Output }],
        plyrLoadStart: [{ type: Output }],
        plyrLoadedData: [{ type: Output }],
        plyrLoadedMetadata: [{ type: Output }],
        plyrQualityChange: [{ type: Output }],
        plyrCanPlay: [{ type: Output }],
        plyrCanPlayThrough: [{ type: Output }],
        plyrStalled: [{ type: Output }],
        plyrWaiting: [{ type: Output }],
        plyrEmptied: [{ type: Output }],
        plyrCueChange: [{ type: Output }],
        plyrError: [{ type: Output }],
        plyrStateChange: [{ type: Output }]
    };
    return PlyrComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PlyrModule = /** @class */ (function () {
    function PlyrModule() {
    }
    PlyrModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        PlyrComponent,
                    ],
                    exports: [
                        PlyrComponent,
                    ]
                },] }
    ];
    return PlyrModule;
}());

export { DefaultPlyrDriver, PlyrComponent, PlyrModule };
//# sourceMappingURL=ngx-plyr.js.map
