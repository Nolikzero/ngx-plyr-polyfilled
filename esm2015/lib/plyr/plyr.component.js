/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import Plyr from 'plyr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DefaultPlyrDriver } from '../plyr-driver/default-plyr-driver';
export class PlyrComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx5ci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGx5ci8iLCJzb3VyY2VzIjpbImxpYi9wbHlyL3BseXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQWdCLEtBQUssRUFBRSxNQUFNLEVBQXdCLE1BQU0sRUFBRSxTQUFTLEVBQWdCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBU3ZFLE1BQU0sT0FBTyxhQUFhOzs7Ozs7SUEyRXhCLFlBQ1UsVUFBc0MsRUFDdEMsTUFBYyxFQUNkLFFBQW1CO1FBRm5CLGVBQVUsR0FBVixVQUFVLENBQTRCO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBNUVyQixpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFPLElBQUksQ0FBQyxDQUFDO1FBTS9DLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBSWxCLGFBQVEsR0FBbUIsT0FBTyxDQUFDOztRQW1CbEMsYUFBUSxHQUFHLG1CQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFzQixDQUFDOztRQUdwRixpQkFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFD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TUFBTTs0QkFDTixNQUFNO3dCQUNOLE1BQU07OEJBR04sTUFBTTs7Ozs7OztJQWpFUCxxQ0FBdUQ7Ozs7O0lBTXZELCtCQUEyQjs7SUFFM0IsbUNBQWdDOztJQUVoQyxpQ0FBNEM7O0lBRTVDLGtDQUEyQjs7SUFFM0IsbUNBQTRCOztJQUU1QixvQ0FBb0M7O0lBRXBDLG1DQUFrQzs7SUFFbEMsb0NBQW1DOztJQUVuQyx3Q0FBa0M7O0lBRWxDLHdDQUFrQzs7Ozs7SUFFbEMsMkJBQTBEOztJQUcxRCxpQ0FBOEY7O0lBRzlGLHFDQUEwRDs7SUFDMUQsb0NBQXdEOztJQUN4RCxpQ0FBa0Q7O0lBQ2xELGtDQUFvRDs7SUFDcEQsdUNBQThEOztJQUM5RCx5Q0FBa0U7O0lBQ2xFLG9DQUF3RDs7SUFDeEQsbUNBQXNEOztJQUN0RCx1Q0FBOEQ7O0lBQzlELGtDQUFvRDs7SUFDcEQsNENBQXdFOztJQUN4RSwyQ0FBc0U7O0lBQ3RFLDRDQUF3RTs7SUFDeEUsNkNBQTBFOztJQUMxRSwyQ0FBc0U7O0lBQ3RFLDJDQUFzRTs7SUFDdEUsMENBQW9FOztJQUNwRSxrQ0FBb0Q7O0lBR3BELHNDQUE0RDs7SUFDNUQsdUNBQThEOztJQUM5RCwyQ0FBc0U7O0lBQ3RFLDBDQUFvRTs7SUFDcEUsb0NBQXdEOztJQUN4RCwyQ0FBc0U7O0lBQ3RFLG9DQUF3RDs7SUFDeEQsb0NBQXdEOztJQUN4RCxvQ0FBd0Q7O0lBQ3hELHNDQUE0RDs7SUFDNUQsa0NBQW9EOztJQUdwRCx3Q0FBZ0U7Ozs7O0lBRWhFLHNDQUEyQzs7Ozs7SUFFM0MsK0JBQTJCOzs7OztJQUUzQixxQ0FBdUM7Ozs7O0lBR3JDLG1DQUE4Qzs7Ozs7SUFDOUMsK0JBQXNCOzs7OztJQUN0QixpQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE5nWm9uZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2UsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFBseXIgZnJvbSAncGx5cic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVmYXVsdFBseXJEcml2ZXIgfSBmcm9tICcuLi9wbHlyLWRyaXZlci9kZWZhdWx0LXBseXItZHJpdmVyJztcbmltcG9ydCB7IFBseXJEcml2ZXIgfSBmcm9tICcuLi9wbHlyLWRyaXZlci9wbHlyLWRyaXZlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BseXIsIFtwbHlyXScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgdGVtcGxhdGVVcmw6ICcuL3BseXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wbHlyLmNvbXBvbmVudC5jc3MnXSxcbiAgZXhwb3J0QXM6ICdwbHlyJ1xufSlcbmV4cG9ydCBjbGFzcyBQbHlyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgcGxheWVyQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQbHlyPihudWxsKTtcblxuICBnZXQgcGxheWVyKCk6IFBseXIge1xuICAgIHJldHVybiB0aGlzLnBsYXllckNoYW5nZS5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBldmVudHMgPSBuZXcgTWFwKCk7XG5cbiAgQElucHV0KCkgcGx5ckRyaXZlcjogUGx5ckRyaXZlcjtcblxuICBASW5wdXQoKSBwbHlyVHlwZTogUGx5ci5NZWRpYVR5cGUgPSAndmlkZW8nO1xuXG4gIEBJbnB1dCgpIHBseXJUaXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBseXJQb3N0ZXI6IHN0cmluZztcblxuICBASW5wdXQoKSBwbHlyU291cmNlczogUGx5ci5Tb3VyY2VbXTtcblxuICBASW5wdXQoKSBwbHlyVHJhY2tzOiBQbHlyLlRyYWNrW107XG5cbiAgQElucHV0KCkgcGx5ck9wdGlvbnM6IFBseXIuT3B0aW9ucztcblxuICBASW5wdXQoKSBwbHlyQ3Jvc3NPcmlnaW46IGJvb2xlYW47XG5cbiAgQElucHV0KCkgcGx5clBsYXlzSW5saW5lOiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ3YnLCB7IHN0YXRpYzogZmFsc2UgfSkgcHJpdmF0ZSB2cjogRWxlbWVudFJlZjtcblxuICAvLyBuZ3gtcGx5ciBldmVudHNcbiAgQE91dHB1dCgpIHBseXJJbml0ID0gdGhpcy5wbGF5ZXJDaGFuZ2UucGlwZShmaWx0ZXIocGxheWVyID0+ICEhcGxheWVyKSkgYXMgRXZlbnRFbWl0dGVyPFBseXI+O1xuXG4gIC8vIHN0YW5kYXJkIG1lZGlhIGV2ZW50c1xuICBAT3V0cHV0KCkgcGx5clByb2dyZXNzID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3Byb2dyZXNzJyk7XG4gIEBPdXRwdXQoKSBwbHlyUGxheWluZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwbGF5aW5nJyk7XG4gIEBPdXRwdXQoKSBwbHlyUGxheSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwbGF5Jyk7XG4gIEBPdXRwdXQoKSBwbHlyUGF1c2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncGF1c2UnKTtcbiAgQE91dHB1dCgpIHBseXJUaW1lVXBkYXRlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWV1cGRhdGUnKTtcbiAgQE91dHB1dCgpIHBseXJWb2x1bWVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgndm9sdW1lY2hhbmdlJyk7XG4gIEBPdXRwdXQoKSBwbHlyU2Vla2luZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzZWVraW5nJyk7XG4gIEBPdXRwdXQoKSBwbHlyU2Vla2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3NlZWtlZCcpO1xuICBAT3V0cHV0KCkgcGx5clJhdGVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncmF0ZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckVuZGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2VuZGVkJyk7XG4gIEBPdXRwdXQoKSBwbHlyRW50ZXJGdWxsU2NyZWVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2VudGVyZnVsbHNjcmVlbicpO1xuICBAT3V0cHV0KCkgcGx5ckV4aXRGdWxsU2NyZWVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2V4aXRmdWxsc2NyZWVuJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ2FwdGlvbnNFbmFibGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhcHRpb25zZW5hYmxlZCcpO1xuICBAT3V0cHV0KCkgcGx5ckNhcHRpb25zRGlzYWJsZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2FwdGlvbnNkaXNhYmxlZCcpO1xuICBAT3V0cHV0KCkgcGx5ckxhbmd1YWdlQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xhbmd1YWdlY2hhbmdlJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ29udHJvbHNIaWRkZW4gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY29udHJvbHNoaWRkZW4nKTtcbiAgQE91dHB1dCgpIHBseXJDb250cm9sc1Nob3duID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRyb2xzc2hvd24nKTtcbiAgQE91dHB1dCgpIHBseXJSZWFkeSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyZWFkeScpO1xuXG4gIC8vIEhUTUw1IGV2ZW50c1xuICBAT3V0cHV0KCkgcGx5ckxvYWRTdGFydCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2Fkc3RhcnQnKTtcbiAgQE91dHB1dCgpIHBseXJMb2FkZWREYXRhID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xvYWRlZGRhdGEnKTtcbiAgQE91dHB1dCgpIHBseXJMb2FkZWRNZXRhZGF0YSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2FkZWRtZXRhZGF0YScpO1xuICBAT3V0cHV0KCkgcGx5clF1YWxpdHlDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgncXVhbGl0eWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckNhblBsYXkgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2FucGxheScpO1xuICBAT3V0cHV0KCkgcGx5ckNhblBsYXlUaHJvdWdoID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhbnBsYXl0aHJvdWdoJyk7XG4gIEBPdXRwdXQoKSBwbHlyU3RhbGxlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzdGFsbGVkJyk7XG4gIEBPdXRwdXQoKSBwbHlyV2FpdGluZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd3YWl0aW5nJyk7XG4gIEBPdXRwdXQoKSBwbHlyRW1wdGllZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbXB0aWVkJyk7XG4gIEBPdXRwdXQoKSBwbHlyQ3VlQ2hhbmdlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2N1ZWNoYW5nZScpO1xuICBAT3V0cHV0KCkgcGx5ckVycm9yID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2Vycm9yJyk7XG5cbiAgLy8gWW91VHViZSBldmVudHNcbiAgQE91dHB1dCgpIHBseXJTdGF0ZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdzdGF0ZWNoYW5nZScpO1xuXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIGRyaXZlcjogUGx5ckRyaXZlcjtcblxuICBwcml2YXRlIHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+LFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3AgaW4ga2V5b2YgUGx5ckNvbXBvbmVudF0/OiBTaW1wbGVDaGFuZ2U7IH0pIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnBseXJJbml0LnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKChwbGF5ZXI6IFBseXIpID0+IHtcbiAgICAgIGNvbnN0IHJlaW5pdFRyaWdnZXJzID0gW2NoYW5nZXMucGx5ck9wdGlvbnMsIGNoYW5nZXMucGx5clBsYXlzSW5saW5lLCBjaGFuZ2VzLnBseXJDcm9zc09yaWdpbl0uZmlsdGVyKHQgPT4gISF0KTtcblxuICAgICAgaWYgKHJlaW5pdFRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICBpZiAocmVpbml0VHJpZ2dlcnMuc29tZSh0ID0+ICF0LmZpcnN0Q2hhbmdlKSkge1xuICAgICAgICAgIHRoaXMuaW5pdFBseXIodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGx5clNvdXJjZShwbGF5ZXIpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmluaXRQbHlyKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHlyKGZvcmNlID0gZmFsc2UpIHtcbiAgICBpZiAoZm9yY2UgfHwgIXRoaXMucGxheWVyKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHRoaXMuZGVzdHJveVBsYXllcigpO1xuXG4gICAgICAgIHRoaXMuZHJpdmVyID0gdGhpcy5wbHlyRHJpdmVyIHx8IG5ldyBEZWZhdWx0UGx5ckRyaXZlcigpO1xuXG4gICAgICAgIHRoaXMuZW5zdXJlVmlkZW9FbGVtZW50KCk7XG5cbiAgICAgICAgY29uc3QgbmV3UGxheWVyID0gdGhpcy5kcml2ZXIuY3JlYXRlKHtcbiAgICAgICAgICB2aWRlb0VsZW1lbnQ6IHRoaXMudmlkZW9FbGVtZW50LFxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMucGx5ck9wdGlvbnMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUGx5clNvdXJjZShuZXdQbGF5ZXIpO1xuXG4gICAgICAgIHRoaXMucGxheWVyQ2hhbmdlLm5leHQobmV3UGxheWVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUGx5clNvdXJjZShwbHlyOiBQbHlyKSB7XG4gICAgdGhpcy5kcml2ZXIudXBkYXRlU291cmNlKHtcbiAgICAgIHZpZGVvRWxlbWVudDogdGhpcy52aWRlb0VsZW1lbnQsXG4gICAgICBwbHlyLFxuICAgICAgc291cmNlOiB7XG4gICAgICAgIHR5cGU6IHRoaXMucGx5clR5cGUsXG4gICAgICAgIHRpdGxlOiB0aGlzLnBseXJUaXRsZSxcbiAgICAgICAgc291cmNlczogdGhpcy5wbHlyU291cmNlcyxcbiAgICAgICAgcG9zdGVyOiB0aGlzLnBseXJQb3N0ZXIsXG4gICAgICAgIHRyYWNrczogdGhpcy5wbHlyVHJhY2tzLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTM3MDQxMDIvMTk5MDQ1MVxuICBwcml2YXRlIGNyZWF0ZUxhenlFdmVudDxUIGV4dGVuZHMgUGx5ci5QbHlyRXZlbnQ+KG5hbWU6IFBseXIuU3RhbmRhcmRFdmVudCB8IFBseXIuSHRtbDVFdmVudCB8IFBseXIuWW91dHViZUV2ZW50KTogRXZlbnRFbWl0dGVyPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wbHlySW5pdC5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHRoaXMub24obmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSkpKVxuICAgICkgYXMgRXZlbnRFbWl0dGVyPFQ+O1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95UGxheWVyKCkge1xuICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgQXJyYXkuZnJvbSh0aGlzLmV2ZW50cy5rZXlzKCkpLmZvckVhY2gobmFtZSA9PiB0aGlzLm9mZihuYW1lKSk7XG5cbiAgICAgIHRoaXMuZHJpdmVyLmRlc3Ryb3koe1xuICAgICAgICBwbHlyOiB0aGlzLnBsYXllcixcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaG9zdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLy8gdGhpcyBtZXRob2QgaXMgcmVxdWlyZWQgYmVjYXVzZSB0aGUgcGx5ciBpbnNlcnRzIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBlbGVtZW50IG9uIGRlc3Ryb3lcbiAgLy8gc28gd2UgY2F0Y2ggdGhlIGNsb25lIGVsZW1lbnQgcmlnaHQgaGVyZSBhbmQgcmV1c2UgaXRcbiAgcHJpdmF0ZSBlbnN1cmVWaWRlb0VsZW1lbnQoKSB7XG4gICAgY29uc3QgdmlkZW9FbGVtZW50ID0gdGhpcy5ob3N0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuXG4gICAgaWYgKHZpZGVvRWxlbWVudCkge1xuICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSB2aWRlb0VsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgdGhpcy52aWRlb0VsZW1lbnQuY29udHJvbHMgPSB0cnVlO1xuXG4gICAgICBpZiAodGhpcy5wbHlyQ3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgdGhpcy52aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjcm9zc29yaWdpbicsICcnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucGx5clBsYXlzSW5saW5lKSB7XG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5ob3N0RWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb24obmFtZTogc3RyaW5nLCBoYW5kbGVyOiBhbnkpIHtcbiAgICB0aGlzLmV2ZW50cy5zZXQobmFtZSwgaGFuZGxlcik7XG4gICAgdGhpcy5wbGF5ZXIub24obmFtZSBhcyBhbnksIGhhbmRsZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBvZmYobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5wbGF5ZXIub2ZmKG5hbWUgYXMgYW55LCB0aGlzLmV2ZW50cy5nZXQobmFtZSkpO1xuICAgIHRoaXMuZXZlbnRzLmRlbGV0ZShuYW1lKTtcbiAgfVxuXG59XG4iXX0=