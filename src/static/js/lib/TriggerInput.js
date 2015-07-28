define(['lib/Trigger'], function(Trigger){

    'use strict';

    var _parent = Trigger;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    p._getState = function(){
        return this._element.checked;
    };

    p._onChange = function(){

        // Let the world know
        this._mediator.publish('trigger', {
            toggle: this,
            id: this.getId(),
            active: this.isActive(),
            targets: this._targets
        });

    };

    p.activate = function(){

        _parent.prototype.activate.call(this);
        this._element.checked = true;

    };

    p.deactivate = function(){

        _parent.prototype.deactivate.call(this);
        this._element.checked = false;

    };

    p._bindEvents = function(){

        // custom events
        this._onChangeBind = this._onChange.bind(this);
        this._element.addEventListener('change', this._onChangeBind);

    };

    return exports;

});