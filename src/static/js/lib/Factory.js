define(['lib/Toggle', 'lib/TriggerSelect', 'lib/TriggerInput', 'lib/TriggerLink', 'lib/Trigger', 'lib/Manager'], function(Toggle, TriggerSelect, TriggerInput, TriggerLink, Trigger, Manager){

    'use strict';

    var exports = function(element, options){
        this._element = element;
        this._options = options;
        this._manager = Manager.getInstance();
        this._initialize();
    };

    exports.prototype = {

        _initialize: function(){

            // create toggle
            this._toggle = this._create(this._element, this._options);

            // find triggers
            if(this._toggle) {
                this._createTriggersForToggle(this._toggle);
            }

        },

        getToggle: function(){
            return this._toggle;
        },

        _create: function(node, opts){

            var name = node.nodeName.toLowerCase(),
                toggle;

            // check if this node is already a trigger
            if(node.id && this._manager.getToggleById(node.id)){
                return;
            }

            switch(name){
                case 'select':
                    toggle = new TriggerSelect(node);
                    break;
                case 'input':
                    toggle = new TriggerInput(node);
                    break;
                case 'a':
                    toggle = new TriggerLink(node);
                    break;
                default:
                    if(node.hasAttribute('href') || node.hasAttribute('aria-controls')) {
                        toggle = new Trigger(node);
                        break;
                    }
                    toggle = new Toggle(node);
                    break;
            }

            return toggle;

        },

        /**
         * Finds triggers for the given Toggle.
         *
         * @param Toggle
         * @private
         */

        _createTriggersForToggle: function(Toggle){

            var id = Toggle.getId(),
                triggers = document.querySelectorAll('[href="#' + id + '"], [aria-controls~="' + id + '"]:not(option)');

            // create new toggles
            [].slice.apply(triggers).forEach(function(t){
                new exports(t);
            });

        }

    };

    return exports;

});