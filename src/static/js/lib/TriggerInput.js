define(['lib/Trigger'], function(Trigger){

    'use strict';

    var _parent = Trigger;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    p._getState = function(){
        return this._element.value != '';
    };

    p._onChange = function(){

        // Let the world know
        this._mediator.publish('trigger', {
            toggle: this,
            id: this.getId(),
            active: this._element.value == '',
            targets: this._targets,
            force: true
        });

    };

    p._onKeyDown = function(e){

        var context = this;

        // set to end of queue so value is in input
        setTimeout(context._onChangeBind);

    };

    p.activate = function(){

        _parent.prototype.activate.call(this);
        this._element.value != '';

    };

    p.deactivate = function(){

        _parent.prototype.deactivate.call(this);
        this._element.value == '';

    };

    p._bindEvents = function(){

        // custom events
        this._onChangeBind = this._onChange.bind(this);
        this._element.addEventListener('change', this._onChangeBind);

        this._onKeyDownBind = this._onKeyDown.bind(this);
        this._element.addEventListener('keydown', this._onKeyDownBind);

    };

    return exports;

});