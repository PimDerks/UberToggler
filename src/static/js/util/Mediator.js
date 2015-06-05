var Mediator = (function(window, undefined) {

    function Mediator() {
        this._topics = {};
    }

    Mediator.prototype = {

        subscribe: function(topic, callback){
            if(!this._topics.hasOwnProperty(topic)){
                this._topics[topic] = [];
            }

            this._topics[topic].push(callback);
            return true;
        },

        unsubscribe: function(topic, callback){
            if(!this._topics.hasOwnProperty(topic)){
                return false;
            }

            var _this = this;
            this._topics[topic].forEach(function(t, index){
                if(t === callback){
                    _this._topics[t].splice(index, 1);
                    return true;
                }
            });

            //for(var i = 0, len = this._topics[topic].length; i < len; i++ ) {
            //    if(this._topics[topic][i] === callback){
            //        this._topics[topic].splice(i, 1);
            //        return true;
            //    }
            //}

            return false;
        },

        publish: function mediatorPublish(){
            var args = Array.prototype.slice.call(arguments);
            var topic = args.shift();

            if(!this._topics.hasOwnProperty(topic)){
                return false;
            }

            this._topics[topic].forEach(function(t){
                t.apply(undefined, args);
            });

            //for(var i = 0, len = this._topics[topic].length; i < len; i++){
            //    this._topics[topic][i].apply(undefined, args);
            //}

            return true;
        }

    };

    var _instance = null;

    return {
        getInstance:function(){
            if (!_instance){
                _instance = new Mediator();
            }
            return _instance;
        }
    };

})(window);