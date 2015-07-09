# UberToggler
Generic toggle component. 

## What does it consist of?

### Toggle
In its simplest form a Toggle is something which can be on or off, like a light.

### Trigger
A Trigger is a Toggle which also can change the state of another Toggle or multiple Toggles. Think of it as a
lightswitch: the switch itself can be on or off, but the light it triggers can be on or off as well.

Almost anything can be a Trigger: a link, a button, an input-element. Anything which you can bind a JavaScript-event to
can be used as a Trigger. It is recommended to use only focusable elements though! A TriggerFactory is used to determine which
type of Trigger gets created, base on its node-type.

#### Trigger

The default Trigger.

#### Trigger Input

Used for radio-inputs and checkboxes.

#### Trigger Select

Used for select-lists.

#### Trigger Link

Used for anchors.


### Toggle Group
A Toggle Group is a group of Toggles. In a Toggle Group only one Toggle can be active at a given time. You can
use this to create components like accordions, tabs, dropdownmenus etc. etc.

## How it works

1. Initialize all Toggles
2. When Toggles are initialized, find Triggers for each Toggle
3. When a Trigger is triggered, it throws a trigger-event
4. All Toggles listen to the trigger-event.
5. When the trigger-event contains a Toggle in its targets-property, the Toggle changes its state.
6. When a Toggle changes its state, it throws a Toggle event.
7. Triggers listen for the Toggle event. This makes sure that Toggle and Triggers are always in sync.