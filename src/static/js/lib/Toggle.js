define(['lib/Manager', 'util/Mediator', 'util/FocusContain'], function(Manager, Mediator, FocusContain){

    'use strict';

    var exports = function(element, options){

        // bounce
        if(!element){
            throw "No element passed in";
        }

        this._element = element;
        this._options = options;

        this._setId();
        this._id = this.getId();

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

            if(this._options.focusContain){
                this._focusContain = new FocusContain(this._element);
            }

            // Listen to toggle-event
            this._onTriggerBind = this._onTrigger.bind(this);
            this._mediator.subscribe('trigger', this._onTriggerBind);

            // Listen to hashchange
            this._onHashChangeBind = this._onHashChange.bind(this);
            window.addEventListener('hashchange', this._onHashChangeBind, false);

            // Listen to click event on body
            if(this._element.dataset.outside){

                if(this._element.dataset.outside === 'both' || this._element.dataset.outside === 'click') {
                    this._onBodyClickBind = this._onBodyClick.bind(this);
                    document.body.addEventListener('click', this._onBodyClickBind);
                }

                if(this._element.dataset.outside === 'mouse') {

                    this._onMouseEnterBind = this._onMouseEnter.bind(this);
                    this._element.addEventListener('mouseenter', this._onMouseEnterBind);

                    this._onMouseLeaveBind = this._onMouseLeave.bind(this);
                    this._element.addEventListener('mouseleave', this._onMouseLeaveBind);

                }

            }

            // Register
            var _this = this;
            setTimeout(function(){
                _this.register();
            });

        },

        _startMouseTimer: function(delay){

            if(!delay){
                delay = 500;
            }

            var context = this;

            // start timer
            this._mouseTimer = setTimeout(function(){
                context.deactivate();
            }, delay);

        },

        _onMouseEnter: function(){
            if(this._mouseTimer){
                clearTimeout(this._mouseTimer);
            }
        },

        _onMouseLeave: function(e){
            this._startMouseTimer();
        },

        _onBodyClick: function(e){

            // target click
            var target = e.target;

            // get triggers related to this toggle
            var triggers = this._manager.getTriggersForToggle(this),
                elements = [this._element],
                inside = false;

            // add elements of triggers to 'elements' array
            triggers.forEach(function(t){
                elements.push(t.getElement());
            });

            var isChildOf = function (element, parentElement) {
                var parent = element;
                do {

                    if (parent && parent === parentElement) {
                        return true;
                    }

                    if (parent == document.documentElement) {
                        break;
                    }

                    // jshint -W084
                } while (parent = parent.parentNode);
                return false;
            };

            // check if click is on toggle or on triggers
            elements.forEach(function(el){

                if(isChildOf(target, el) && !inside){
                    inside = true;
                };

            });

            if(!inside && this.isActive()){
                this.deactivate();
            }

        },

        _onHashChange: function(e){
            var hash = window.location.hash.replace('#', ''),
                oldHash = e.oldURL.substr(e.oldURL.indexOf('#')).replace('#', '');

            if(hash === this.getId()){
                this.isActive() ? null : this.activate();
            }

            if(oldHash === this.getId()){
                this.isActive() ? this.deactivate() : null;
            }

        },

        isTrigger: function(){
            return false;
        },

        register: function(){

            // register
            this._manager.add(this);

            // get initial state
            this._isActive = this._getState();

            // set initial state
            this.isActive() ? this.activate() : this.deactivate();

        },

        _hasActiveHash: function(){
            var hash = window.location.hash.replace('#','');
            return hash === this.getId();
        },

        _hasActiveTrigger: function(){

            // check if one of the triggers for this toggle is active
            var triggers = this._manager.getTriggersForToggle(this),
                active = false;

            // loop through all triggers
            triggers.forEach(function(t){
                if(!active){
                    active = t.isActive();
                }
            });

            return active;

        },

        _getState: function(){

            // first check if one of the triggers is active
            if(this._hasActiveTrigger() || this._hasActiveHash()){
                return true;
            // check if aria-hidden is available
            } else if(this._element.getAttribute('aria-hidden')){
                return this._element.getAttribute('aria-hidden') === "false";
                // check if aria-disabled is available
            } else if(this._element.getAttribute('aria-disabled')){
                return this._element.getAttribute('aria-disabled') === "false";
                // default
            } else {
                return this._element.getAttribute('data-active') === "true";
            }

            // default
            return false;

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

            this._setState();

        },

        /**
         * Get the ID of this Toggle.
         *
         * @returns {string}
         */

        getId: function(){
            return this._id;
        },

        /**
         * Set the ID of this Toggle.
         * @private
         */

        _setId: function(){
            var id = this._element.id;
            if(!id){
                id = Math.random().toString(36).substring(7);
                this._element.setAttribute('id', id);
            }

            this._id = id;
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

            if(this._focusContain) {
                this._focusContain.enable();
            }

            if(this._element.dataset.outside === 'mouse' || this._element.dataset.outside === 'both'){
                this._startMouseTimer(1000);
            }

        },

        /**
         *  Deactivate this Toggle.
         */

        deactivate: function(){
            this._element.classList.remove('activated');
            this._element.classList.add('deactivated');
            this._isActive = false;
            this._onStateChange();

            if(this._focusContain) {
                this._focusContain.disable();
            }

        },

        /**
         * Set the state of this toggle.
         * @private
         */

        _setState: function(){

            // check if aria-hidden is available
            if(this._element.getAttribute('aria-hidden')){
                this._element.setAttribute('aria-hidden', !this.isActive());
            // check if aria-disabled is available
            } else if(this._element.getAttribute('aria-disabled')){
                this._element.setAttribute('aria-disabled', !this.isActive());
            // default
            } else {
                this._element.setAttribute('data-active', this.isActive());
            }

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

        toggle: function(e){

            var activate = this.isActive();
            if(e && e.force){
                activate = e.active;
            }

            activate ? this.deactivate() : this.activate();

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

            if(this.getGroup() && this.isActive() && this.eventMatch(e)){
                return;
            }

            if(this.eventMatch(e)){
                this.toggle(e);
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

});