var Toggle = (function(){

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

        this._manager = Mediator.getInstance();

        this._active = false;

        this._initialize();

    };

    exports.prototype = {

        _initialize: function(){

            this._onToggleBind = this._onToggle.bind(this);
            this._manager.subscribe('toggle', this._onToggleBind);

        },

        _onChange: function(){
            this._manager.publish('toggle', {
                toggle: this,
                id: this.getId(),
                active: this.isActive()
            });
        },

        getId: function(){
            return this._element.id;
        },

        getElement: function(){
            return this._element;
        },

        activate: function(){
            this._element.classList.add('activated');
            this._element.classList.remove('deactivated');
            this._isActive = true;
            this._onChange();
        },

        deactivate: function(){
            this._element.classList.remove('activated');
            this._element.classList.add('deactivated');
            this._isActive = false;
            this._onChange();
        },

        isActive: function(){
            return this._isActive;
        },

        toggle: function(){
            this.isActive() ? this.deactivate() : this.activate();
        },

        _onToggle: function(e){
            if(e.targets){
                if(e.targets.indexOf(this.getId()) > -1){
                    this._sync(e.active);
                }
            }
        },

        _sync: function(active){

            if(active && !this.isActive()){
                this.activate();
            }

            if(!active && this.isActive()){
                this.deactivate();
            }

        }

    };

    return exports;

}());