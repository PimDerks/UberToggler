function init(){

    // get toggles
    var toggles = document.querySelectorAll('.toggle'),
        triggers = document.querySelectorAll('.trigger');

    var TogglesInitialized = [],
        TriggersInitialized = [];

    // initialize toggles
    [].slice.call(toggles).forEach(function(toggle){
        var toggle = new Toggle(toggle, toggle.dataset.options ? JSON.parse(toggle.dataset.options) : null);
        TogglesInitialized.push(toggle);
    });

    // initialize triggers
    [].slice.call(triggers).forEach(function(trigger){
        var trigger = new Trigger(trigger, trigger.dataset.options ? JSON.parse(trigger.dataset.options) : null);
        TriggersInitialized.push(trigger);
    });

};

document.addEventListener('DOMContentLoaded', init, false);