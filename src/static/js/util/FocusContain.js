define(function() {

    'use strict';

    var FocusContain = function (element) {
        this._element = element;
        this._initialize();
    };

    var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

    function $$(selector, context) {
        return [].slice.call((context || document).querySelectorAll(selector));
    }

    FocusContain.prototype = {

        _initialize: function () {
            this._maintainFocusBind = this._maintainFocus.bind(this);
            this._onKeyDownBind = this._onKeyDown.bind(this);
        },

        _bind: function (unbind) {
            var method = unbind ? 'removeEventListener' : 'addEventListener';
            document.body[method]('focus', this._maintainFocusBind, true);
            document.body[method]('keydown', this._onKeyDownBind, true);
        },

        _onKeyDown: function (e) {
            if (this.isActive() && e.which === 9) {
                this._trapTabKey(this._element, e);
            }
        },

        _getFocusableElements: function () {

            return $$(focusableElements.join(','), this._element).filter(function (child) {
                return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
            });

        },

        _setFocusToFirstElement: function () {
            var focusableChildren = this._getFocusableElements();
            if (focusableChildren.length) {
                focusableChildren[0].focus();
            }
        },

        _maintainFocus: function (e) {
            if (this.isActive() && !this._element.contains(event.target)) {
                this._setFocusToFirstElement();
            }
        },

        _trapTabKey: function (node, event) {

            var focusableChildren = this._getFocusableElements(node);
            var focusedItemIndex = focusableChildren.indexOf(document.activeElement);

            if (event.shiftKey && focusedItemIndex === 0) {
                focusableChildren[focusableChildren.length - 1].focus();
                event.preventDefault();
            } else if (!event.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
                focusableChildren[0].focus();
                event.preventDefault();
            }

        },

        isActive: function () {
            return this._active;
        },

        enable: function () {
            this._active = true;
            this._focusedBeforeDialog = document.activeElement;
            this._bind();
            this._setFocusToFirstElement();
        },

        disable: function () {
            this._active = false;
            this._bind(true);

            if (this._focusedBeforeDialog) {
                this._focusedBeforeDialog.focus();
            }
        }

    };

    return FocusContain;

});