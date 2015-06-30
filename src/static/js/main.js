function init(){

    // get toggles
    var toggles = document.querySelectorAll('.toggle'),
        triggers = document.querySelectorAll('.trigger'),
        inputs = document.querySelectorAll('input');

    var TogglesInitialized = [],
        TriggersInitialized = [],
        TriggerInputsInitialized = [];

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

    // initialize inputs
    [].slice.call(inputs).forEach(function(input){
        var trigger = new TriggerInput(input, input.dataset.options ? JSON.parse(input.dataset.options) : null);
        TriggerInputsInitialized.push(trigger);
    });


};

document.addEventListener('DOMContentLoaded', init, false);