var Toggle = (function(){

    var exports = function(element, options){

        this._element = element;
        this._options = options;

        this._initialize();

    };

    exports.prototype = {

        _initialize: function(){
            console.log('Toggle initialized on element: ' + this._element);
        }

    };

    return exports;

}())