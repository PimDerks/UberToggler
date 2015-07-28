define(['lib/Trigger'], function(Trigger){

    'use strict';

    var _parent = Trigger;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    p._initialize = function(){
        _parent.prototype._initialize.call(this);
        this._onChange();
    };

    /**
     * Returns an array of the ID's of the Toggles this Trigger targets.
     *
     * @returns {Array}
     * @private
     */

    p._getTargetIDs = function(){

        var result = [];

        var option = this._element.children[this._element.selectedIndex];

        // Add targets from aria-controls attribute of selected option
        if(option.getAttribute('aria-controls')){
            var targets = option.getAttribute('aria-controls').split(' ');
            targets.forEach(function(t){
                if(result.indexOf(t) === -1) {
                    result.push(t);
                }
            });
        }

        return result;
    };

    p._onChange = function(){

        var ids = this._getTargetIDs();

        // Let the world know
        this._mediator.publish('trigger', {
            toggle: this,
            id: this.getId(),
            active: ids.length > 0,
            targets: ids
        });

    };

    p._bindEvents = function(){

        // custom events
        this._onChangeBind = this._onChange.bind(this);
        this._element.addEventListener('change', this._onChangeBind);

    };

    return exports;

});