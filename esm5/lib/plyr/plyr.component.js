/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import Plyr from 'plyr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DefaultPlyrDriver } from '../plyr-driver/default-plyr-driver';
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
export { PlyrComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.playerChange;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.events;
    /** @type {?} */
    PlyrComponent.prototype.plyrDriver;
    /** @type {?} */
    PlyrComponent.prototype.plyrType;
    /** @type {?} */
    PlyrComponent.prototype.plyrTitle;
    /** @type {?} */
    PlyrComponent.prototype.plyrPoster;
    /** @type {?} */
    PlyrComponent.prototype.plyrSources;
    /** @type {?} */
    PlyrComponent.prototype.plyrTracks;
    /** @type {?} */
    PlyrComponent.prototype.plyrOptions;
    /** @type {?} */
    PlyrComponent.prototype.plyrCrossOrigin;
    /** @type {?} */
    PlyrComponent.prototype.plyrPlaysInline;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.vr;
    /** @type {?} */
    PlyrComponent.prototype.plyrInit;
    /** @type {?} */
    PlyrComponent.prototype.plyrProgress;
    /** @type {?} */
    PlyrComponent.prototype.plyrPlaying;
    /** @type {?} */
    PlyrComponent.prototype.plyrPlay;
    /** @type {?} */
    PlyrComponent.prototype.plyrPause;
    /** @type {?} */
    PlyrComponent.prototype.plyrTimeUpdate;
    /** @type {?} */
    PlyrComponent.prototype.plyrVolumeChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrSeeking;
    /** @type {?} */
    PlyrComponent.prototype.plyrSeeked;
    /** @type {?} */
    PlyrComponent.prototype.plyrRateChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrEnded;
    /** @type {?} */
    PlyrComponent.prototype.plyrEnterFullScreen;
    /** @type {?} */
    PlyrComponent.prototype.plyrExitFullScreen;
    /** @type {?} */
    PlyrComponent.prototype.plyrCaptionsEnabled;
    /** @type {?} */
    PlyrComponent.prototype.plyrCaptionsDisabled;
    /** @type {?} */
    PlyrComponent.prototype.plyrLanguageChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrControlsHidden;
    /** @type {?} */
    PlyrComponent.prototype.plyrControlsShown;
    /** @type {?} */
    PlyrComponent.prototype.plyrReady;
    /** @type {?} */
    PlyrComponent.prototype.plyrLoadStart;
    /** @type {?} */
    PlyrComponent.prototype.plyrLoadedData;
    /** @type {?} */
    PlyrComponent.prototype.plyrLoadedMetadata;
    /** @type {?} */
    PlyrComponent.prototype.plyrQualityChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrCanPlay;
    /** @type {?} */
    PlyrComponent.prototype.plyrCanPlayThrough;
    /** @type {?} */
    PlyrComponent.prototype.plyrStalled;
    /** @type {?} */
    PlyrComponent.prototype.plyrWaiting;
    /** @type {?} */
    PlyrComponent.prototype.plyrEmptied;
    /** @type {?} */
    PlyrComponent.prototype.plyrCueChange;
    /** @type {?} */
    PlyrComponent.prototype.plyrError;
    /** @type {?} */
    PlyrComponent.prototype.plyrStateChange;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.driver;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.videoElement;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    PlyrComponent.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx5ci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGx5ci8iLCJzb3VyY2VzIjpbImxpYi9wbHlyL3BseXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQWdCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBR3ZFO0lBaUZFLHVCQUNVLFVBQXNDLEVBQ3RDLE1BQWMsRUFDZCxRQUFtQjtRQUZuQixlQUFVLEdBQVYsVUFBVSxDQUE0QjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTVFckIsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBTyxJQUFJLENBQUMsQ0FBQztRQU0vQyxXQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUlsQixhQUFRLEdBQW1CLE9BQU8sQ0FBQzs7UUFtQmxDLGFBQVEsR0FBRyxtQkFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxFQUFSLENBQVEsRUFBQyxDQUFDLEVBQXNCLENBQUM7O1FBR3BGLGlCQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFD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RDs7SUFDeEQsb0NBQXdEOztJQUN4RCxvQ0FBd0Q7O0lBQ3hELHNDQUE0RDs7SUFDNUQsa0NBQW9EOztJQUdwRCx3Q0FBZ0U7Ozs7O0lBRWhFLHNDQUEyQzs7Ozs7SUFFM0MsK0JBQTJCOzs7OztJQUUzQixxQ0FBdUM7Ozs7O0lBR3JDLG1DQUE4Qzs7Ozs7SUFDOUMsK0JBQXNCOzs7OztJQUN0QixpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2UsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFBseXIgZnJvbSAncGx5cic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVmYXVsdFBseXJEcml2ZXIgfSBmcm9tICcuLi9wbHlyLWRyaXZlci9kZWZhdWx0LXBseXItZHJpdmVyJztcbmltcG9ydCB7IFBseXJEcml2ZXIgfSBmcm9tICcuLi9wbHlyLWRyaXZlci9wbHlyLWRyaXZlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BseXIsIFtwbHlyXScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgdGVtcGxhdGVVcmw6ICcuL3BseXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wbHlyLmNvbXBvbmVudC5jc3MnXSxcbiAgZXhwb3J0QXM6ICdwbHlyJ1xufSlcbmV4cG9ydCBjbGFzcyBQbHlyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgcGxheWVyQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQbHlyPihudWxsKTtcblxuICBnZXQgcGxheWVyKCk6IFBseXIge1xuICAgIHJldHVybiB0aGlzLnBsYXllckNoYW5nZS5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBldmVudHMgPSBuZXcgTWFwKCk7XG5cbiAgQElucHV0KCkgcGx5ckRyaXZlcjogUGx5ckRyaXZlcjtcblxuICBASW5wdXQoKSBwbHlyVHlwZTogUGx5ci5NZWRpYVR5cGUgPSAndmlkZW8nO1xuXG4gIEBJbnB1dCgpIHBseXJUaXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBseXJQb3N0ZXI6IHN0cmluZztcblxuICBASW5wdXQoKSBwbHlyU291cmNlczogUGx5ci5Tb3VyY2VbXTtcblxuICBASW5wdXQoKSBwbHlyVHJhY2tzOiBQbHlyLlRyYWNrW107XG5cbiAgQElucHV0KCkgcGx5ck9wdGlvbnM6IFBseXIuT3B0aW9ucztcblxuICBASW5wdXQoKSBwbHlyQ3Jvc3NPcmlnaW46IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcGx5clBsYXlzSW5saW5lOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ3YnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSB2cjogRWxlbWVudFJlZjtcblxuICAvLyBuZ3gtcGx5ciBldmVudHNcbiAgQE91dHB1dCgpIHBseXJJbml0ID0gdGhpcy5wbGF5ZXJDaGFuZ2UucGlwZShmaWx0ZXIocGxheWVyID0+ICEhcGxheWVyKSkgYXMgRXZlbnRFbWl0dGVyPFBseXI+O1xuXG4gIC8vIHN0YW5kYXJkIG1lZGlhIGV2ZW50c1xuICBAT3V0cHV0KCkgcGx5clByb2dyZXNzID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3Byb2dyZXNzJyk7XG4gIEBPdXRwdXQoKSBwbHlyUGxheWluZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwbGF5aW5nJyk7XG4gIEBPdXRwdXQoKSBwbHlyUGxheSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwbGF5Jyk7XG4gIEBPdXRwdXQoKSBwbHlyUGF1c2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGF1c2UnKTtcbiAgQE91dHB1dCgpIHBseXJUaW1lVXBkYXRlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWV1cGRhdGUnKTtcbiAgQE91dHB1dCgpIHBseXJWb2x1bWVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgndm9sdW1lY2hhbmdlJyk7XG4gIEBPdXRwdXQoKSBwbHlyU2Vla2luZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzZWVraW5nJyk7XG4gIEBPdXRwdXQoKSBwbHlyU2Vla2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3NlZWtlZCcpO1xuICBAT3V0cHV0KCkgcGx5clJhdGVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmF0ZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckVuZGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2VuZGVkJyk7XG4gIEBPdXRwdXQoKSBwbHlyRW50ZXJGdWxsU2NyZWVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2VudGVyZnVsbHNjcmVlbicpO1xuICBAT3V0cHV0KCkgcGx5ckV4aXRGdWxsU2NyZWVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2V4aXRmdWxsc2NyZWVuJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ2FwdGlvbnNFbmFibGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhcHRpb25zZW5hYmxlZCcpO1xuICBAT3V0cHV0KCkgcGx5ckNhcHRpb25zRGlzYWJsZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2FwdGlvbnNkaXNhYmxlZCcpO1xuICBAT3V0cHV0KCkgcGx5ckxhbmd1YWdlQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xhbmd1YWdlY2hhbmdlJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ29udHJvbHNIaWRkZW4gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY29udHJvbHNoaWRkZW4nKTtcbiAgQE91dHB1dCgpIHBseXJDb250cm9sc1Nob3duID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRyb2xzc2hvd24nKTtcbiAgQE91dHB1dCgpIHBseXJSZWFkeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyZWFkeScpO1xuXG4gIC8vIEhUTUw1IGV2ZW50c1xuICBAT3V0cHV0KCkgcGx5ckxvYWRTdGFydCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2Fkc3RhcnQnKTtcbiAgQE91dHB1dCgpIHBseXJMb2FkZWREYXRhID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xvYWRlZGRhdGEnKTtcbiAgQE91dHB1dCgpIHBseXJMb2FkZWRNZXRhZGF0YSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2FkZWRtZXRhZGF0YScpO1xuICBAT3V0cHV0KCkgcGx5clF1YWxpdHlDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncXVhbGl0eWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckNhblBsYXkgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2FucGxheScpO1xuICBAT3V0cHV0KCkgcGx5ckNhblBsYXlUaHJvdWdoID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhbnBsYXl0aHJvdWdoJyk7XG4gIEBPdXRwdXQoKSBwbHlyU3RhbGxlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzdGFsbGVkJyk7XG4gIEBPdXRwdXQoKSBwbHlyV2FpdGluZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd3YWl0aW5nJyk7XG4gIEBPdXRwdXQoKSBwbHlyRW1wdGllZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbXB0aWVkJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ3VlQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2N1ZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckVycm9yID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2Vycm9yJyk7XG5cbiAgLy8gWW91VHViZSBldmVudHNcbiAgQE91dHB1dCgpIHBseXJTdGF0ZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzdGF0ZWNoYW5nZScpO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIGRyaXZlcjogUGx5ckRyaXZlcjtcblxuICBwcml2YXRlIHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+LFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3AgaW4ga2V5b2YgUGx5ckNvbXBvbmVudF0/OiBTaW1wbGVDaGFuZ2U7IH0pIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnBseXJJbml0LnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKChwbGF5ZXI6IFBseXIpID0+IHtcbiAgICAgIGNvbnN0IHJlaW5pdFRyaWdnZXJzID0gW2NoYW5nZXMucGx5ck9wdGlvbnMsIGNoYW5nZXMucGx5clBsYXlzSW5saW5lLCBjaGFuZ2VzLnBseXJDcm9zc09yaWdpbl0uZmlsdGVyKHQgPT4gISF0KTtcblxuICAgICAgaWYgKHJlaW5pdFRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICBpZiAocmVpbml0VHJpZ2dlcnMuc29tZSh0ID0+ICF0LmZpcnN0Q2hhbmdlKSkge1xuICAgICAgICAgIHRoaXMuaW5pdFBseXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGx5clNvdXJjZShwbGF5ZXIpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmluaXRQbHlyKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHlyKGZvcmNlID0gZmFsc2UpIHtcbiAgICBpZiAoZm9yY2UgfHwgIXRoaXMucGxheWVyKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuXG4gICAgICAgIHRoaXMuZHJpdmVyID0gdGhpcy5wbHlyRHJpdmVyIHx8IG5ldyBEZWZhdWx0UGx5ckRyaXZlcigpO1xuXG4gICAgICAgIHRoaXMuZW5zdXJlVmlkZW9FbGVtZW50KCk7XG5cbiAgICAgICAgY29uc3QgbmV3UGxheWVyID0gdGhpcy5kcml2ZXIuY3JlYXRlKHtcbiAgICAgICAgICB2aWRlb0VsZW1lbnQ6IHRoaXMudmlkZW9FbGVtZW50LFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMucGx5ck9wdGlvbnMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUGx5clNvdXJjZShuZXdQbGF5ZXIpO1xuXG4gICAgICAgIHRoaXMucGxheWVyQ2hhbmdlLm5leHQobmV3UGxheWVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUGx5clNvdXJjZShwbHlyOiBQbHlyKSB7XG4gICAgdGhpcy5kcml2ZXIudXBkYXRlU291cmNlKHtcbiAgICAgIHZpZGVvRWxlbWVudDogdGhpcy52aWRlb0VsZW1lbnQsXG4gICAgICBwbHlyLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6IHRoaXMucGx5clR5cGUsXG4gICAgICAgIHRpdGxlOiB0aGlzLnBseXJUaXRsZSxcbiAgICAgICAgc291cmNlczogdGhpcy5wbHlyU291cmNlcyxcbiAgICAgICAgcG9zdGVyOiB0aGlzLnBseXJQb3N0ZXIsXG4gICAgICAgIHRyYWNrczogdGhpcy5wbHlyVHJhY2tzLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTM3MDQxMDIvMTk5MDQ1MVxuICBwcml2YXRlIGNyZWF0ZUxhenlFdmVudDxUIGV4dGVuZHMgUGx5ci5QbHlyRXZlbnQ+KG5hbWU6IFBseXIuU3RhbmRhcmRFdmVudCB8IFBseXIuSHRtbDVFdmVudCB8IFBseXIuWW91dHViZUV2ZW50KTogRXZlbnRFbWl0dGVyPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wbHlySW5pdC5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHRoaXMub24obmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSkpKVxuICAgICkgYXMgRXZlbnRFbWl0dGVyPFQ+O1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95UGxheWVyKCkge1xuICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmV2ZW50cy5rZXlzKCkpLmZvckVhY2gobmFtZSA9PiB0aGlzLm9mZihuYW1lKSk7XG5cbiAgICAgIHRoaXMuZHJpdmVyLmRlc3Ryb3koe1xuICAgICAgICBwbHlyOiB0aGlzLnBsYXllcixcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaG9zdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLy8gdGhpcyBtZXRob2QgaXMgcmVxdWlyZWQgYmVjYXVzZSB0aGUgcGx5ciBpbnNlcnRzIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBlbGVtZW50IG9uIGRlc3Ryb3lcbiAgLy8gc28gd2UgY2F0Y2ggdGhlIGNsb25lIGVsZW1lbnQgcmlnaHQgaGVyZSBhbmQgcmV1c2UgaXRcbiAgcHJpdmF0ZSBlbnN1cmVWaWRlb0VsZW1lbnQoKSB7XG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdGhpcy5ob3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuXG4gICAgaWYgKHZpZGVvRWxlbWVudCkge1xuICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSB2aWRlb0VsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgdGhpcy52aWRlb0VsZW1lbnQuY29udHJvbHMgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5wbHlyQ3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgdGhpcy52aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjcm9zc29yaWdpbicsICcnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGx5clBsYXlzSW5saW5lKSB7XG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5ob3N0RWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb24obmFtZTogc3RyaW5nLCBoYW5kbGVyOiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50cy5zZXQobmFtZSwgaGFuZGxlcik7XG4gICAgdGhpcy5wbGF5ZXIub24obmFtZSBhcyBhbnksIGhhbmRsZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBvZmYobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5wbGF5ZXIub2ZmKG5hbWUgYXMgYW55LCB0aGlzLmV2ZW50cy5nZXQobmFtZSkpO1xuICAgIHRoaXMuZXZlbnRzLmRlbGV0ZShuYW1lKTtcbiAgfVxuXG59XG4iXX0=