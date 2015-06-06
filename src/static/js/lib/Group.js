var Group = (function(){

    'use strict';

    var exports = function (id){

        this._id = id;
        this._toggles = [];

        this._initialize();

    };

    exports.prototype = {

        _initialize: function(){

            this._manager = Manager.getInstance();
            this._mediator = Mediator.getInstance();
            this._onToggleBind = this._onToggle.bind(this);
            this._mediator.subscribe('toggle', this._onToggleBind);

        },

        _onToggle: function(e){
            var toggle = e.toggle;

            if(this.containsToggle(toggle) && e.active){
                this._closeAllExcept(toggle);
            };

        },

        /**
         * Register a toggle
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         * @public
         */

        register:function(Toggle){

            // add
            this._toggles.push(Toggle);

        },
        
        getId: function(){
            return this._id;
        },
        
        getToggles: function(){
            return this._toggles;  
        },

        containsToggle: function(Toggle){
            return this._toggles.indexOf(Toggle) > -1;
        },

        /**
         * Remove a toggle
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         * @public
         */

        remove:function(Toggle) {

            var _this = this;
            
            this._toggles.forEach(function(t, i){

                if (t == Toggle) {
                    _this._toggles.splice(i, 1);
                    return;
                }
                
            });

        },

        /**
         * Close all toggles.
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         * @private
         */

        _closeAll:function(){

            this._toggles.forEach(function(t){
                t.deactivate();
            });

        },

        /**
         * Close all toggles except the given Toggle.
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
         */

        _closeAllExcept:function(Toggle){

            this._toggles.forEach(function(t){
                if (t !== Toggle) {
                    t.deactivate();
                }
            });

        },

        /**
         * Get the amount of items.
         *
         * @memberof ToggleGroup
         * @return {Number} The number of items.
         * @public
         */

        getAmount:function(){
            return this._toggles.length;
        },

        /**
         * Unload.
         *
         * @class ToggleGroup
         * @method _unload
         */

        unload:function() {

            // Empty array
            this._toggles = [];

        }

    };

    return exports;

}());