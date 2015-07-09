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

## How to use it

Initialize the Toggles in any way you want.

### Options/settings

#### Grouping Toggles together

To create a ToggleGroup, use the data-group="your-group-name" here on every Toggle you want to include in the group.

When you have a ToggleGroup where there should -always- be a Toggle active (e.g. a tab control) use the data-group-default attribute.

### Target Toggles with a Trigger

By default we use the href-element, as most of the time you'll want to use an anchor. On elements which don't have an href, use the ARIA-controls attribute with the ID of the Toggle you want to target as its value.

#### Target multiple Toggles with one Trigger

Simply use the ARIA-controls attribute with a space separated list of ID's of the Toggles you want to target.

### States

As said before, a Toggle can be on or off. We call this an activated or a deactivated state. These states can be set in three ways:

#### ARIA-hidden

The ARIA-hidden attribute must contain a boolean. This determines if an element is hidden from the user - not only in a visual way, but also when using other means of navigation.

#### ARIA-disabled

The ARIA-disabled attribute must contain a boolean. This determines if an element is perceivable, but not editable or otherwise operable.

#### Default

When the above scenarios don't match your requirements, this is the default. We use a simple data-state attribute. This has no semantic value.