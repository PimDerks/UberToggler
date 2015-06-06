var Trigger = (function(){

    'use strict';

    var _parent = Toggle;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    p._initialize = function(){

        _parent.prototype._initialize.call(this);

        this._onClickBind = this._onClick.bind(this);
        this._element.addEventListener('click', this._onClickBind);

        this._targets = this._getTargetIDs();

    };

    p._onChange = function(){

        this._mediator.publish('toggle', {
            toggle: this,
            id: this.getId(),
            active: this.isActive(),
            targets: this._targets
        });

    };

    p._getTargetIDs = function(){

        var result = [];

        if(this._element.nodeName.toLowerCase() === 'a'){
            var href = this._element.getAttribute('href');
            href ? result.push(href.replace('#','')) : null;
        }

        if(this._element.getAttribute('aria-controls')){
            var targets = this._element.getAttribute('aria-controls').split(' ');
            targets.forEach(function(t){
                if(result.indexOf(t) === -1) {
                    result.push(t);
                }
            });
        }

        return result;
    };

    p._onClick = function(e){
        this.toggle();
    };

    p.eventMatch = function(e){

        var matches = [];

        if(e.targets){
            matches = this._targets.filter(function(t){
                return e.targets.indexOf(t) !== -1;
            });

            return matches.length > 0;

        } else {
            return this._targets.indexOf(e.toggle.getId()) > -1;
        }

    };

    return exports;

}());