define(['lib/Toggle'], function(Toggle){

    'use strict';

    var _parent = Toggle;

    var exports = function(element, options){

        _parent.call(this, element, options);

    };

    var p = exports.prototype = Object.create(_parent.prototype);

    /**
     * Initialize this Trigger.
     *
     * @private
     */

    p._initialize = function(){

        // Listen to toggle-event
        this._onToggleBind = this._onToggle.bind(this);
        this._mediator.subscribe('toggle', this._onToggleBind);

        // Get targets
        this._targets = this._getTargetIDs();

        // Bind events
        this._bindEvents();

        // register without delay
        this.register();

        // set initial state
        var state = this.getTargetState();
        state ? this.activate() : this.deactivate();

    };

    p.getTargetState = function(){
        var id = this._targets[0],
            toggle = this._manager.getToggleById(id);
        if(toggle){
            return toggle.isActive();
        } else {
            return false;
        }
    };

    p.isTrigger = function(){
        return true;
    };

    p._bindEvents = function(){

        // Bind events
        this._onClickBind = this._onClick.bind(this);
        this._element.addEventListener('click', this._onClickBind);

    };

    /**
     * Sync parent.
     *
     * @param e
     * @private
     */

    p._onToggle = function(e){

        if(this.eventMatch(e)){
            _parent.prototype._sync.call(this, e.active);
        }

    };

    /**
     * Returns an array of the ID's of the Toggles this Trigger targets.
     *
     * @returns {Array}
     * @private
     */

    p._getTargetIDs = function(){

        var result = [];

        // Get ID from href in case the trigger is anchor
        if(this._element.nodeName.toLowerCase() === 'a'){
            var href = this._element.getAttribute('href');
            href ? result.push(href.replace('#','')) : null;
        }

        // Add targets from aria-controls attribute
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

    /**
     * Handle clicks on this element.
     *
     * @param e
     * @private
     */

    p._onClick = function(e){

        // Let the world know
        this._mediator.publish('trigger', {
            toggle: this,
            id: this.getId(),
            active: this.isActive(),
            targets: this._targets
        });

    };

    /**
     * Check if the Toggle event thrown should have an effect on this trigger.
     *
     * @param e
     * @returns {boolean}
     */

    p.eventMatch = function(e){

        var matches = [];

        if(this._element.id === e.id) {
            return false;
        }

        // If the Event has an array of targets, check if those targets match the targets of this trigger.
        if(e.targets){
            matches = this._targets.filter(function(t){
                return e.targets.indexOf(t) !== -1;
            });

            return matches.length > 0;

        // No targets property, check if the Toggle which was toggled is the target of this trigger.
        } else {
            return this._targets.indexOf(e.toggle.getId()) > -1;
        }

    };

    return exports;

});