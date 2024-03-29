import Plyr from 'plyr/dist/plyr.polyfilled';
import { Component, ElementRef, NgZone, Renderer2, Input, ViewChild, Output, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DefaultPlyrDriver {
    /**
     * @param {?} params
     * @return {?}
     */
    create(params) {
        console.log('DefaultPlyrDriver - 1');
        return new Plyr(params.videoElement, params.options);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    updateSource(params) {
        params.plyr.source = params.source;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    destroy(params) {
        params.plyr.destroy();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlyrComponent {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(elementRef, ngZone, renderer) {
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
        player => !!player)))));
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
    /**
     * @return {?}
     */
    get player() {
        return this.playerChange.getValue();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.subscriptions.push(this.plyrInit.pipe(first()).subscribe((/**
         * @param {?} player
         * @return {?}
         */
        (player) => {
            /** @type {?} */
            const reinitTriggers = [changes.plyrOptions, changes.plyrPlaysInline, changes.plyrCrossOrigin].filter((/**
             * @param {?} t
             * @return {?}
             */
            t => !!t));
            if (reinitTriggers.length) {
                if (reinitTriggers.some((/**
                 * @param {?} t
                 * @return {?}
                 */
                t => !t.firstChange))) {
                    this.initPlyr(true);
                }
            }
            else {
                this.updatePlyrSource(player);
            }
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyPlayer();
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        s => s.unsubscribe()));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initPlyr();
    }
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    initPlyr(force = false) {
        if (force || !this.player) {
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.destroyPlayer();
                this.driver = this.plyrDriver || new DefaultPlyrDriver();
                this.ensureVideoElement();
                /** @type {?} */
                const newPlayer = this.driver.create({
                    videoElement: this.videoElement,
                    options: this.plyrOptions,
                });
                this.updatePlyrSource(newPlayer);
                this.playerChange.next(newPlayer);
            }));
        }
    }
    /**
     * @private
     * @param {?} plyr
     * @return {?}
     */
    updatePlyrSource(plyr) {
        this.driver.updateSource({
            videoElement: this.videoElement,
            plyr,
            source: {
                type: this.plyrType,
                title: this.plyrTitle,
                sources: this.plyrSources,
                poster: this.plyrPoster,
                tracks: this.plyrTracks,
            },
        });
    }
    // see https://stackoverflow.com/a/53704102/1990451
    /**
     * @private
     * @template T
     * @param {?} name
     * @return {?}
     */
    createLazyEvent(name) {
        return (/** @type {?} */ (this.plyrInit.pipe(switchMap((/**
         * @return {?}
         */
        () => new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        observer => this.on(name, (/**
         * @param {?} data
         * @return {?}
         */
        (data) => this.ngZone.run((/**
         * @return {?}
         */
        () => observer.next(data))))))))))));
    }
    /**
     * @private
     * @return {?}
     */
    destroyPlayer() {
        if (this.player) {
            Array.from(this.events.keys()).forEach((/**
             * @param {?} name
             * @return {?}
             */
            name => this.off(name)));
            this.driver.destroy({
                plyr: this.player,
            });
            this.videoElement = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    get hostElement() {
        return this.elementRef.nativeElement;
    }
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    /**
     * @private
     * @return {?}
     */
    ensureVideoElement() {
        /** @type {?} */
        const videoElement = this.hostElement.querySelector('video');
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
    }
    /**
     * @private
     * @param {?} name
     * @param {?} handler
     * @return {?}
     */
    on(name, handler) {
        this.events.set(name, handler);
        this.player.on((/** @type {?} */ (name)), handler);
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    off(name) {
        this.player.off((/** @type {?} */ (name)), this.events.get(name));
        this.events.delete(name);
    }
}
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
PlyrComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PlyrModule {
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

export { DefaultPlyrDriver, PlyrComponent, PlyrModule };
//# sourceMappingURL=ngx-plyr.js.map
