var TriggerLink = (function(){

    'use strict';

    var _parent = Trigger;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    p._initialize = function(){
        _parent.prototype._initialize.call(this);
    };

    /**
     * Handle clicks on this element.
     *
     * @param e
     * @private
     */

    p._onClick = function(e){

        // Cancel default event
        e.preventDefault();
        e.stopPropagation();

        // Set hash
        var href = this._isActive ? '' : this._element.getAttribute('href');

        if(history.pushState && href) {
            history.pushState(null, null, href);
        }
        else {
            location.hash = href;
        }

        // Let the world know
        this._mediator.publish('trigger', {
            toggle: this,
            id: this.getId(),
            active: this.isActive(),
            targets: this._targets
        });

    };

    p._bindEvents = function(){

        // Bind events
        this._onClickBind = this._onClick.bind(this);
        this._element.addEventListener('click', this._onClickBind);

    };

    return exports;

}());