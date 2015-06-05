# Roadmap

## Functionalities

* A toggle has an on/off state.
* A trigger controls at least 1 toggle, but is a toggle itself as well (like a light switch).
* A trigger can control multiple toggles as well.
* Toggles can form groups, which can be used for functionality like tabs, accordions etc. where only 1 toggle can be active at a time.
* Clicking outside of toggle deactivates it (optional).
* When a toggle is activated its triggers get updated as well.
* A toggle can listen to hash-changes (optional, should probably be default when trigger is an anchor)
* A toggle can update the hash when activated (optional, should probably be default when trigger is an anchor)
* A trigger will usually be an anchor or a button, but inputs (e.g. radio buttons, checkboxes, select) will also be supported.
* A "collapse" child class which inherits the main Toggle logic, but adds height/width measurements to allow CSS animation.

## Ideas

* Use ARIA-states instead of classes?
  * aria-hidden for hiding content, not perceivable
  * aria-disabled for visible content, but not usable/editable
* Use ARIA-properties for linking triggers to toggles?
  * An anchor has an href, targetting the toggle
  * A button hasn't got an anchor, we can use aria-controls="foo baz bar" for that.
  * For multiple toggles on an anchor, we can merge the href with the aria-controls attribute.
  * Or maybe we should just use the aria-controls attribute IF it's available, as it would duplicate the href-element either way.
* Only allow anchors/buttons to be triggers?
* Set tabindex automatically on triggers?
* Other ways of enabling a toggle
  * Cursor near
  * In view (scroll position)
  * Trigger selected (checkbox/radio)
  * Trigger has value (other inputs)
  * Selected value of a select.
  * Hash

## Learning

* Create CoffeeScript and/or TypeScript versions of the library to finally get some experience with those libraries.
* Create modules to work with RequireJS/CommonJS.
* Use Bower/NPM.
* Add unit test/end-to-end test (Mocha? Jasmine?)