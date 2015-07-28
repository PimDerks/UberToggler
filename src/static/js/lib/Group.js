define(['util/Mediator'], function(Mediator){

    'use strict';

    var exports = function (id){

        this._id = id;
        this._toggles = [];

        this._initialize();

    };

    exports.prototype = {

        /**
         * Initialize this group.
         *
         * @private
         */

        _initialize: function(){

            this._mediator = Mediator.getInstance();
            this._onToggleBind = this._onToggle.bind(this);
            this._mediator.subscribe('toggle', this._onToggleBind);

        },

        /**
         * Respond to the toggle-event.
         *
         * @param e
         * @private
         */

        _onToggle: function(e){

            var toggle = e.toggle;

            if(this.containsToggle(toggle)){

                if(e.active){
                    this._closeAllExcept(toggle);
                } else if(!this.getActiveToggle() && this._default){
                    this._default.activate();
                }

            }

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

            // check if default
            if(Toggle.getElement().dataset.groupDefault){
                this._default = Toggle;
            };

        },

        /**
         * Get the ID of this group.
         *
         * @returns {*}
         */

        getId: function(){
            return this._id;
        },

        /**
         * Get all Toggles in this group.
         *
         * @returns {Array}
         */

        getToggles: function(){
            return this._toggles;  
        },

        /**
         * Check if one of the Toggles in this group is active.
         *
         * @returns {boolean}
         */

        hasActiveToggle: function(){
            return this._toggles.filter(function(t){
                return t.isActive();
            }).length > 0;
        },

        /**
         * Get the currently active Toggle.
         *
         * @returns {Object}
         */

        getActiveToggle: function(){
            var active = this._toggles.filter(function(t){
                return t.isActive();
            });

            return active[0] || false;
        },

        /**
         * Keep track of the currently active Toggle.
         *
         * @param Toggle
         */

        setActiveToggle: function(Toggle){
            this._activeToggle = Toggle;
        },

        /**
         * Check if the passed in Toggle is contained in this group.
         *
         * @param Toggle
         * @returns {boolean}
         */

        containsToggle: function(Toggle){
            return this._toggles.indexOf(Toggle) > -1;
        },

        /**
         * Remove a toggle
         *
         * @memberof ToggleGroup
         * @param {Object} Toggle
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
         * @param {Object} Toggle
         * @private
         */

        _closeAll:function(){

            this._toggles.forEach(function(t){
                if(t.isActive()){
                    t.deactivate();
                }
            });

        },

        /**
         * Close all toggles except the given Toggle.
         * @param {Object} Toggle
         * @private
         */

        _closeAllExcept:function(Toggle){

            this._toggles.forEach(function(t){

                // deactivate
                if (t !== Toggle && t.isActive()) {
                    t.deactivate();
                }

            });

            this.setActiveToggle(Toggle);

        },

        /**
         * Get the amount of items.
         
         * @return {Number} The number of items.
         */

        getAmount:function(){
            return this._toggles.length;
        },

        /**
         * Unload.
         *
         * @method unload
         */

        unload:function() {

            // Empty array
            this._toggles = [];

        }

    };

    return exports;

});