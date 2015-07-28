var assert = require("assert"),
    requirejs = require("requirejs");

requirejs.config({
    baseUrl: '../src/static/js/',
    nodeRequire: require
});

var Toggle = requirejs("./../src/static/js/lib/Toggle.js"),
    Trigger = requirejs("./../src/static/js/lib/Trigger.js"),
    Factory = requirejs("./../src/static/js/lib/Factory.js"),
    TriggerInput = requirejs("./../src/static/js/lib/TriggerInput.js"),
    TriggerLink = requirejs("./../src/static/js/lib/TriggerLink.js"),
    TriggerSelect = requirejs("./../src/static/js/lib/TriggerSelect.js"),
    Group = requirejs("./../src/static/js/lib/TriggerSelect.js"),
    Manager = requirejs("./../src/static/js/lib/Manager.js");

describe('Group', function() {

    it('should only allow one Toggle to be active at a given time');

    it('should indicate if a Toggle is included in the Group');

    it('should remove a Toggle from the Group');

    it('should return the amount of Toggles in the Group')

});

describe('Manager', function() {

    it('should allow a Toggle to be registered');

    it('should allow a Toggle to be removed');

    it('should find Triggers for a Toggle');

    it('should create Triggers for a Toggle');

    it('should create a Group when a Toggle is part of a Group which does not yet exist');

    it('should use an existing Group when a Toggle is part of a Group which already exists');

    it('should return a Group when it matches the ID passed into the getToggleGroupById-method');

    it('should exist only once'); // singleton

});

describe('Toggle', function() {

    it('should register to the Manager');

    it('should set an initial state');

    it('should return an element when the getElement-method is called');

    it('should activate when the activate-method is called');

    it('should deactivate when the deactivate-method is called');

    it('should listen to the Trigger-event');

});

describe('Trigger', function() {

    it('should change its state when clicked');

    it('should publish a Trigger-event clicked');

    it('should return an array of IDs when the private _getTargetIDs-method is called');

});

describe('TriggerFactory', function() {

    it('should create a TriggerInput when an input is passed in to the create-method');

    it('should create a TriggerLink when a link is passed in to the create-method');

    it('should create a TriggerSelect when a select is passed in to the create-method');

    it('should create a Trigger when an element other than an input, link or select is passed in to the create-method');

    it('should exist only once'); // singleton

});

describe('TriggerInput', function() {

    it('should become activated when its value changes');

    it('should publish a Trigger-event when its value changes');

});

describe('TriggerLink', function() {

    it('should publish a Trigger-event when clicked');

});

describe('TriggerSelect', function() {

    it('should become activated when its value changes');

    it('should publish a Trigger-event when its value changes');

});