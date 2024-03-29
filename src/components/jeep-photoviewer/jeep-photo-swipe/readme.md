# jeep-photo-zoom



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                        | Type     | Default |
| --------------- | --------------- | ---------------------------------- | -------- | ------- |
| `thresholdX`    | `thresholdx`    | The swipe threshold in x direction | `number` | `100`   |
| `thresholdY`    | `thresholdy`    | The swipe threshold in y direction | `number` | `100`   |
| `timeThreshold` | `timethreshold` | The swipe timeThreshold            | `number` | `200`   |


## Events

| Event            | Description                                     | Type                           |
| ---------------- | ----------------------------------------------- | ------------------------------ |
| `jeepPhotoSwipe` | Emitted when the user is making a swipe gesture | `CustomEvent<IJeepSwipeEvent>` |


## Methods

### `handleMouseDown(e: any) => Promise<void>`

handleMouseDown

#### Parameters

| Name | Type  | Description |
| ---- | ----- | ----------- |
| `e`  | `any` |             |

#### Returns

Type: `Promise<void>`



### `handleMouseUp(e: any) => Promise<void>`

handleMouseEUp

#### Parameters

| Name | Type  | Description |
| ---- | ----- | ----------- |
| `e`  | `any` |             |

#### Returns

Type: `Promise<void>`



### `handleTouchEnd(e: TouchEvent) => Promise<void>`

handleTouchEnd

#### Parameters

| Name | Type         | Description |
| ---- | ------------ | ----------- |
| `e`  | `TouchEvent` |             |

#### Returns

Type: `Promise<void>`



### `handleTouchStart(e: any) => Promise<void>`

handleTouchStart

#### Parameters

| Name | Type  | Description |
| ---- | ----- | ----------- |
| `e`  | `any` |             |

#### Returns

Type: `Promise<void>`



### `init() => Promise<void>`

Method initialize

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [jeep-photo-hscroll](../jeep-photo-hscroll)

### Graph
```mermaid
graph TD;
  jeep-photo-hscroll --> jeep-photo-swipe
  style jeep-photo-swipe fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
