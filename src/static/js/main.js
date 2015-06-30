function init(){

    // get toggles
    var toggles = document.querySelectorAll('.toggle'),
        triggers = document.querySelectorAll('.trigger'),
        inputs = document.querySelectorAll('input'),
        selects = document.querySelectorAll('select');

    var TogglesInitialized = [],
        TriggersInitialized = [],
        TriggerInputsInitialized = [],
        TriggerSelectsInitialized = [];

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

    // initialize selects
    [].slice.call(selects).forEach(function(select){
        var trigger = new TriggerSelect(select, select.dataset.options ? JSON.parse(select.dataset.options) : null);
        TriggerSelectsInitialized.push(trigger);
    });


};

document.addEventListener('DOMContentLoaded', init, false);