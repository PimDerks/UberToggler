define(['lib/Toggle', 'lib/TriggerSelect', 'lib/TriggerChoice', 'lib/TriggerInput', 'lib/TriggerLink', 'lib/Trigger', 'lib/Manager'], function(Toggle, TriggerSelect, TriggerChoice, TriggerInput, TriggerLink, Trigger, Manager){

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

        _create: function(node, options){

            var name = node.nodeName.toLowerCase(),
                toggle;

            // check if this node is already a trigger
            if(node.id && this._manager.getToggleById(node.id)){
                return;
            }

            switch(name){
                case 'select':
                    toggle = new TriggerSelect(node, options);
                    break;
                case 'input':
                    switch(node.type){
                        case 'radio':
                        case 'checkbox':
                            toggle = new TriggerChoice(node, options);
                            break;
                        default:
                            toggle = new TriggerInput(node, options);
                            break;
                    }
                    break;
                case 'a':
                    toggle = new TriggerLink(node, options);
                    break;
                default:
                    if(node.hasAttribute('href') || node.hasAttribute('aria-controls')) {
                        toggle = new Trigger(node, options);
                        break;
                    }
                    toggle = new Toggle(node, options);
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