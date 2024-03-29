/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import Plyr from 'plyr/dist/plyr.polyfilled';
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
        console.log('DefaultPlyrDriver - 4');
        return new Plyr(params.videoElement, params.options);
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
export { DefaultPlyrDriver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1wbHlyLWRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1wbHlyLyIsInNvdXJjZXMiOlsibGliL3BseXItZHJpdmVyL2RlZmF1bHQtcGx5ci1kcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUd4QjtJQUFBO0lBY0EsQ0FBQzs7Ozs7SUFaQyxrQ0FBTTs7OztJQUFOLFVBQU8sTUFBOEI7UUFDbkMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELHdDQUFZOzs7O0lBQVosVUFBYSxNQUFvQztRQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsbUNBQU87Ozs7SUFBUCxVQUFRLE1BQStCO1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVILHdCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGx5ciBmcm9tICdwbHlyJztcbmltcG9ydCB7IFBseXJEcml2ZXIsIFBseXJEcml2ZXJDcmVhdGVQYXJhbXMsIFBseXJEcml2ZXJEZXN0cm95UGFyYW1zLCBQbHlyRHJpdmVyVXBkYXRlU291cmNlUGFyYW1zIH0gZnJvbSAnLi9wbHlyLWRyaXZlcic7XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0UGx5ckRyaXZlciBpbXBsZW1lbnRzIFBseXJEcml2ZXIge1xuXG4gIGNyZWF0ZShwYXJhbXM6IFBseXJEcml2ZXJDcmVhdGVQYXJhbXMpIHtcbiAgICByZXR1cm4gbmV3IFBseXIocGFyYW1zLnZpZGVvRWxlbWVudCwgcGFyYW1zLm9wdGlvbnMpO1xuICB9XG5cbiAgdXBkYXRlU291cmNlKHBhcmFtczogUGx5ckRyaXZlclVwZGF0ZVNvdXJjZVBhcmFtcykge1xuICAgIHBhcmFtcy5wbHlyLnNvdXJjZSA9IHBhcmFtcy5zb3VyY2U7XG4gIH1cblxuICBkZXN0cm95KHBhcmFtczogUGx5ckRyaXZlckRlc3Ryb3lQYXJhbXMpIHtcbiAgICBwYXJhbXMucGx5ci5kZXN0cm95KCk7XG4gIH1cblxufVxuIl19
