var TriggerSelect = (function(){

    'use strict';

    var _parent = Trigger;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

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

        // Let the world know
        this._mediator.publish('trigger', {
            toggle: this,
            id: this.getId(),
            active: this._element.checked,
            targets: this._getTargetIDs()
        });

    };

    p.activate = function(){
        _parent.prototype.activate.call(this);
        //this._element.checked = true;
    };

    p.deactivate = function(){
        _parent.prototype.deactivate.call(this);
        //this._element.checked = false;
    };

    p._bindEvents = function(){

        // custom events
        this._onChangeBind = this._onChange.bind(this);
        this._element.addEventListener('change', this._onChangeBind);

    };

    return exports;

}());