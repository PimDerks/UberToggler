var Toggle = (function(){

    'use strict';

    var exports = function(element, options){

        // bounce
        if(!element){
            throw "No element passed in";
        }

        if(!element.id){
            throw "An element must have a unique ID to be a toggle";
        }

        this._element = element;
        this._options = options;

        this._mediator = Mediator.getInstance();

        this._manager = Manager.getInstance();

        this._initialize();

    };

    exports.prototype = {

        /**
         * Initialize Toggle.
         *
         * @private
         */

        _initialize: function(){

            // Listen to toggle-event
            this._onTriggerBind = this._onTrigger.bind(this);
            this._mediator.subscribe('trigger', this._onTriggerBind);

            // register
            this._manager.register(this);

            // set initial state
            this._isActive = false;

            // deactivate by default for now
            this.deactivate();

        },

        /**
         * Let the world know this Toggle's state has changed.
         *
         * @private
         */

        _onStateChange: function(){

            this._mediator.publish('toggle', {
                toggle: this,
                id: this.getId(),
                active: this.isActive()
            });

        },

        /**
         * Get the ID of this Toggle.
         *
         * @returns {string}
         */

        getId: function(){
            return this._element.id;
        },

        /**
         * Get the element of this Toggle.
         *
         * @returns {Element}
         */

        getElement: function(){
            return this._element;
        },

        /**
         * Get the group of this Toggle, if available.
         *
         * @returns {Function}
         */

        getGroup: function(){
            return this._element.dataset.group;
        },

        /**
         * Activate this Toggle.
         */

        activate: function(){
            this._element.classList.add('activated');
            this._element.classList.remove('deactivated');
            this._isActive = true;
            this._onStateChange();
        },

        /**
         *  Deactivate this Toggle.
         */

        deactivate: function(){
            this._element.classList.remove('activated');
            this._element.classList.add('deactivated');
            this._isActive = false;
            this._onStateChange();
        },

        /**
         * Check if this Toggle is active.
         *
         * @returns {boolean|*}
         */

        isActive: function(){
            return this._isActive;
        },

        /**
         * Reverse the state of this Toggle.
         */

        toggle: function(){
            this.isActive() ? this.deactivate() : this.activate();
        },

        /**
         * Check if this Toggle should respond to a toggle-event thrown.
         * @param e
         * @returns {boolean}
         */

        eventMatch: function(e){

            if(e.id === this._element.id){
                return false;
            }

            if(e.targets){
                return e.targets.indexOf(this.getId()) > -1;
            }

            return false;

        },

        /**
         * Respond to a toggle-event.
         *
         * @param e
         * @private
         */

        _onTrigger: function(e){

            if(this.getGroup() && this.isActive()){
                return;
            }

            if(this.eventMatch(e)){
                this.toggle();
            }

        },

        /**
         * Sync the state of this Toggle with the given parameter.
         *
         * @param active
         * @private
         */

        _sync: function(active){

            if(active !== this.isActive()){
                this.toggle();
            }

        }

    };

    return exports;

}());