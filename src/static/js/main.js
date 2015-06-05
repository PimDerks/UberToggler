function init(){

    // get toggles
    var toggles = document.querySelectorAll('.toggle'),
        triggers = document.querySelectorAll('.trigger');

    var TogglesInitialized = [],
        TriggersInitialized = [];

    // initialize toggles
    [].slice.call(toggles).forEach(function(toggle){
        TogglesInitialized.push(new Toggle(toggle, {}));
    });

    // initialize triggers
    [].slice.call(triggers).forEach(function(trigger){
        TriggersInitialized.push(new Trigger(trigger, {}));
    });

};

document.addEventListener('DOMContentLoaded', init, false);