function init(){

    // get toggles
    var toggles = document.querySelectorAll('.toggle');

    // initialize toggles
    [].slice.call(toggles).forEach(function(toggle){
        new Toggle(toggle, {});
    });

};

document.addEventListener('DOMContentLoaded', init, false);