var TriggerFactory = (function(){

    'use strict';

    var exports = function(){
        this._manager = Manager.getInstance();
    };

    exports.prototype = {

        create: function(nodes){

            var _this = this;

            [].slice.apply(nodes).forEach(function(node){

                var name = node.nodeName.toLowerCase();

                // check if this node is already a trigger
                if(node.id && _this._manager.getToggleById(node.id)){
                    return;
                }

                switch(name){
                    case 'select':
                        new TriggerSelect(node);
                        return;
                    case 'input':
                        new TriggerInput(node);
                        return;
                    case 'a':
                        new TriggerLink(node);
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