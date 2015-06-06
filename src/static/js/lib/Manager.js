var Manager = (function(){

    'use strict';

    /**
     * ToggleManager constructor.
     *
     * @class ToggleManager
     * @constructor
     */

    var ToggleManager = function () {

        this._toggles = [];
        this._groups = [];
        this._triggers = [];

    };

    ToggleManager.prototype = {

        /**
         * Register toggle
         *
         * @method register
         * @param {Object} Toggle object.
         */

        register:function(Toggle) {

            // add to togglers
            this._toggles.push(Toggle);

            // look for groups
            this._manageGroup(Toggle);

        },

        /**
         * Unregister toggle
         *
         * @param {Object} Toggle object.
         */

        remove:function(Toggle) {

            // check if part of group
            var group = Toggle.getGroup();
            if (group) {

                // check if group exists
                if (this._groups[group]) {
                    this._groups[group].remove(Toggle);
                }

            }

            // remove from this._toggles
            var _this = t;
            this._toggles.forEach(function(t, i){
                if (t === Toggle) {
                    _this._toggles.splice(i, 1);
                }
            });

        },

        /**
         * Manage group
         *
         * @param {Object} Toggle object.
         * @private
         */

        _manageGroup:function(Toggle){

            // check if part of group
            var group = Toggle.getGroup();
            if (group) {

                // check if group exists, if not create
                if (!this._groups[group]) {
                    this._groups[group] = new Group(group);
                }

                // register in group
                this._groups[group].register(Toggle);

            }

        },

        /**
         * Get toggle by Id
         *
         * @param {String} Id of toggle to get
         * @return {Object}
         */

        getToggleById:function(id){

            var result = this._toggles.filter(function(t){
                return t.getId() === id;
            });

            return result[0];

        },

        /**
         * Get togglegroup by Id
         *
         * @memberof ToggleManager
         * @param {String} Id of toggle to get
         * @return {Object}
         * @public
         */

        getToggleGroupById:function(id){

            for (var group in this._groups) {
                if (group === id) {
                    return this._groups[group];
                }
            }
            return false;

        }

    };

    var _instance = null;

    return {
        getInstance:function(){
            if (!_instance){_instance = new ToggleManager();}
            return _instance;
        }
    };

}());