define(['lib/Factory'], function(Factory){

    'use strict';

    // initialize toggles
    [].slice.call(document.querySelectorAll('.toggle')).forEach(function(el){
        new Factory(el, el.dataset.options ? JSON.parse(el.dataset.options) : null);
    });

});