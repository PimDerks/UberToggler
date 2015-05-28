# Roadmap

## Functionalities

* Multiple targets.
* Clicking outside of toggle deactivates it (optional).
* When a toggle is activated its triggers get updates as well.
* Listen to hash-changes (optional).
* Update hash when toggle is activated (optional).
* Group toggles together for functionality like tabs, accordions etc.
* Allow inputs to be triggers (e.g. radio buttons, checkboxes, select).
* A "Collapse" child class which inherits the main Toggle logic, but adds height/width measurements to allow CSS animation.

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

## Learning

* Create CoffeeScript and/or TypeScript versions of the library to finally get some experience with those libraries.
* Create modules to work with RequireJS/CommonJS.
* Use Bower/NPM.

