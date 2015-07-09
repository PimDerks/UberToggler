# UberToggler
Generic toggle component. 

## How it works

1. Initialize all Toggles
2. When Toggles are initialized, find Triggers for each Toggle
3. When a Trigger is triggered, it throws a trigger-event
4. All Toggles listen to the trigger-event.
5. When the trigger-event contains a Toggle in its targets-property, the Toggle changes its state.
6. When a Toggle changes its state, it throws a Toggle event.
7. Triggers listen for the Toggle event. This makes sure that Toggle and Triggers are always in sync.