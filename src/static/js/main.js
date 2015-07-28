define(['lib/Factory'], function(Factory){

    'use strict';

    // get toggles
    var toggles = document.querySelectorAll('.toggle');

    var TogglesInitialized = [];

    // initialize toggles
    [].slice.call(toggles).forEach(function(el){
        var toggle = new Factory(el, el.dataset.options ? JSON.parse(toggle.dataset.options) : null);
        TogglesInitialized.push(toggle);
    });

    // register each toggle
    TogglesInitialized.forEach(function(toggle){
        toggle.getToggle().register();
    });

});