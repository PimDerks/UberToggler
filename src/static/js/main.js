function init(){

    // get toggles
    var toggles = document.querySelectorAll('.toggle');

    var TogglesInitialized = [];

    // initialize toggles
    [].slice.call(toggles).forEach(function(toggle){
        var toggle = new Toggle(toggle, toggle.dataset.options ? JSON.parse(toggle.dataset.options) : null);
        TogglesInitialized.push(toggle);
    });

};

document.addEventListener('DOMContentLoaded', init, false);