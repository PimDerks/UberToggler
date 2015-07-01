var TriggerFactory = (function(){

    'use strict';

    var exports = function(){
    };

    exports.prototype = {

        create: function(nodes){

            [].slice.apply(nodes).forEach(function(node){

                var name = trigger.nodeName.toLowerCase();
                switch(name){
                    case 'select':
                        new TriggerSelect(node);
                        return;
                    case 'input':
                        new TriggerInput(node);
                        return;
                    default:
                        new Trigger(node);
                        return;
                }

            });

        }

    };

    return exports;

}());