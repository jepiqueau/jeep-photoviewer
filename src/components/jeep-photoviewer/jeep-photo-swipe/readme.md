# jeep-photo-zoom



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                        | Type     | Default |
| --------------- | --------------- | ---------------------------------- | -------- | ------- |
| `thresholdX`    | `thresholdx`    | The swipe threshold in x direction | `number` | `30`    |
| `thresholdY`    | `thresholdy`    | The swipe threshold in y direction | `number` | `30`    |
| `timeThreshold` | `timethreshold` | The swipe timeThreshold            | `number` | `100`   |


## Events

| Event            | Description                                     | Type                           |
| ---------------- | ----------------------------------------------- | ------------------------------ |
| `jeepSwipeEvent` | Emitted when the user is making a swipe gesture | `CustomEvent<IJeepSwipeEvent>` |


## Methods

### `handleTouchEnd(e: TouchEvent) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `handleTouchStart(e: TouchEvent) => Promise<void>`

Set the Photo.

#### Returns

Type: `Promise<void>`



### `init() => Promise<void>`

Method initialize

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [jeep-photoviewer](..)

### Graph
```mermaid
graph TD;
  jeep-photoviewer --> jeep-photo-swipe
  style jeep-photo-swipe fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
