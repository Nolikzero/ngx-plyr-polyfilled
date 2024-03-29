/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import Plyr from 'plyr/dist/plyr.polyfilled';
export class DefaultPlyrDriver {
    /**
     * @param {?} params
     * @return {?}
     */
    create(params) {
        console.log('DefaultPlyrDriver - 3');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1wbHlyLWRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wbHlyLyIsInNvdXJjZXMiOlsibGliL3BseXItZHJpdmVyL2RlZmF1bHQtcGx5ci1kcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUd4QixNQUFNLE9BQU8saUJBQWlCOzs7OztJQUU1QixNQUFNLENBQUMsTUFBOEI7UUFDbkMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxNQUFvQztRQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLE1BQStCO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBseXIgZnJvbSAncGx5cic7XG5pbXBvcnQgeyBQbHlyRHJpdmVyLCBQbHlyRHJpdmVyQ3JlYXRlUGFyYW1zLCBQbHlyRHJpdmVyRGVzdHJveVBhcmFtcywgUGx5ckRyaXZlclVwZGF0ZVNvdXJjZVBhcmFtcyB9IGZyb20gJy4vcGx5ci1kcml2ZXInO1xuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFBseXJEcml2ZXIgaW1wbGVtZW50cyBQbHlyRHJpdmVyIHtcblxuICBjcmVhdGUocGFyYW1zOiBQbHlyRHJpdmVyQ3JlYXRlUGFyYW1zKSB7XG4gICAgcmV0dXJuIG5ldyBQbHlyKHBhcmFtcy52aWRlb0VsZW1lbnQsIHBhcmFtcy5vcHRpb25zKTtcbiAgfVxuXG4gIHVwZGF0ZVNvdXJjZShwYXJhbXM6IFBseXJEcml2ZXJVcGRhdGVTb3VyY2VQYXJhbXMpIHtcbiAgICBwYXJhbXMucGx5ci5zb3VyY2UgPSBwYXJhbXMuc291cmNlO1xuICB9XG5cbiAgZGVzdHJveShwYXJhbXM6IFBseXJEcml2ZXJEZXN0cm95UGFyYW1zKSB7XG4gICAgcGFyYW1zLnBseXIuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==
