var Trigger = (function(){

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
        this._manager.publish('toggle', {
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

        return result;
    };

    p._onClick = function(e){
        this.toggle();
    };

    return exports;

}());