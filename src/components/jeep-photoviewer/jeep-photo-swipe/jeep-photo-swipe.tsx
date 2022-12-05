import { Component, h, Prop, EventEmitter, Event, Watch, Element, State, Method, Host} from '@stencil/core';
import { Point } from '../../../interfaces/interfaces';

import { IJeepSwipeEvent} from "../../../interfaces/interfaces";


@Component({
tag: 'jeep-photo-swipe',
styleUrl: 'jeep-photo-swipe.css',
shadow: true,
})
export class JeepPhotoSwipe{
  @Element() el!: HTMLJeepPhotoSwipeElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The swipe timeThreshold
   */
  @Prop({
    attribute: "timeThreshold",
    reflect: true
  }) timeThreshold: number = 100;

  /**
   * The swipe threshold in x direction
   */
  @Prop({
    attribute: "thresholdX",
    reflect: true
  }) thresholdX: number = 30;

    /**
   * The swipe threshold in y direction
   */
     @Prop({
      attribute: "thresholdY",
      reflect: true
    }) thresholdY: number = 30;

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerTimeThreshold: number;
  @State() innerThresholdX: number;
  @State() innerThresholdY: number;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('timeThreshold')
  parseTimeThreshold(newValue: number) {
    this.innerTimeThreshold = newValue;
  }

  @Watch('thresholdX')
  parseThresholdX(newValue: number) {
    this.innerThresholdX = newValue;
  }

  @Watch('thresholdY')
  parseThresholdY(newValue: number) {
    this.innerThresholdY = newValue;
  }

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when the user is making a swipe gesture
   */
   @Event({eventName:'jeepSwipeEvent'}) onPhotoSwipe!: EventEmitter<IJeepSwipeEvent>;



  //**********************
  //* Method Definitions *
  //**********************

  /**
   * Method initialize
   */
   @Method()
   async init(): Promise<void> {
      return await this._init();
   }
  /**
   * Set the Photo.
   */
  @Method()
  async handleTouchStart (e: TouchEvent) {
    this._startPoint.x = e.touches[0].clientX; //This is where touchstart coordinates are stored
    this._startPoint.y = e.touches[0].clientY;;
    this._time = setInterval(() => { //Let's see how long the swipe lasts.
      this._totalTime += 10;
    }, 10);
  }
  @Method()
  async handleTouchEnd(e: TouchEvent) {
    this._endPoint.x = e.changedTouches[0].clientX;
    this._endPoint.y = e.changedTouches[0].clientY;
    // Let's stop calculating time and free up resources.
    clearInterval(this._time);
    if (this._totalTime >= this.innerTimeThreshold) {
      let res = this._getSwipeDirection(this._startPoint, this._endPoint, this.innerThresholdX, this.innerThresholdY);
      this.onPhotoSwipe.emit(res);
    }
    this._totalTime = 0;
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _element: any;
  _window: Window | any;
  _photoEl: HTMLDivElement;
  _startPoint: Point = {};
  _endPoint: Point = {};
  _time: NodeJS.Timer;
  _totalTime : number = 0;


  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }

/*  async componentDidLoad() {
    await this.setPhoto();
  }
*/
  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this.parseTimeThreshold(this.timeThreshold? this.timeThreshold : 100);
    this.parseThresholdX(this.thresholdX ? this.thresholdX : 30);
    this.parseThresholdY(this.thresholdY ? this.thresholdY : 30);
    return;
  }
  private _getSwipeDirection = (startPoint, endPoint, thresholdX, thresholdY): IJeepSwipeEvent => {
    var swipeDirection: IJeepSwipeEvent = { up: false, right: false, down: false, left: false };
    if (startPoint.x > endPoint.x && startPoint.x - endPoint.x >= thresholdX)
      swipeDirection.left = true;
    else if (startPoint.x < endPoint.x && endPoint.x - startPoint.x >= thresholdX)
      swipeDirection.right = true;

    if (startPoint.y < endPoint.y && endPoint.y - startPoint.y >= thresholdY)
      swipeDirection.down = true
    else if (startPoint.y > endPoint.y && startPoint.y - endPoint.y >= thresholdY)
      swipeDirection.up = true;

    return swipeDirection;
  }

  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {

    return (
      <Host>
      <div class="swipe-container" onTouchStart={(e) => this.handleTouchStart(e)} onTouchEnd={(e) => this.handleTouchEnd(e)}>
        <slot />
      </div>
      </Host>
    )
  }

}
