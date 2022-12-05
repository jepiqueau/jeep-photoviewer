import { Component, Prop, h, State, Element, Watch, Method, Host,
         Event, EventEmitter } from '@stencil/core';
import {Point, Rect } from '../../../interfaces/interfaces';

@Component({
tag: 'jeep-photo-zoom',
styleUrl: 'jeep-photo-zoom.css',
shadow: true,
})
export class JeepPhotoZoom {
  @Element() el!: HTMLJeepPhotoZoomElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The photo url
   */
  @Prop({
    attribute: "url",
    reflect: true
  }) url: string;

  /**
   * The maximum zoom scale
   */
  @Prop({
    attribute: "maxzoomscale",
    reflect: true
  }) maxzoomscale: number = 3;

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerUrl: string;
  @State() innerMaxZoomScale: number;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('url')
  parseUrl(newValue: string) {
    this.innerUrl = newValue;
  }

  @Watch('maxzoomscale')
  parseMaxZooScale(newValue: number) {
    this.innerMaxZoomScale = newValue;
  }

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when the close button was clicked
   */
   @Event({eventName:'jeepPhotoZoomOneTap'}) onPhotoZoomOneTap!: EventEmitter<void>;


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
  setPhoto(): Promise<void> {
    return Promise.resolve(this._setPhoto());
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _element: any;
  _window: Window | any;
  _photoEl: HTMLDivElement;
  _imageEl: HTMLImageElement;
  _tapedTwice: boolean = false;
  _tapedTime: any = null;
  _tapNum: number = 0;
  _timerStart: boolean = false;
  _imageNatural: Rect = {};
  _view: Rect = {};
  _imageInView: Rect = {};
  _curZoomScale: number;
  _maxZoomScale: number;
  _curPan: Point = {};
  _startPoint: Point = {};
  _movePoint: Point = {};
  _centerPoint: Point = {};
  _lastPoint: Point = {};
  _doubleTouch: Boolean = false;
  _touchStart = false;
  _touchMove = false;


  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }

  async componentDidLoad() {
    await this.setPhoto();
  }

  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this.parseUrl(this.url? this.url : null);
    this.parseMaxZooScale(this.maxzoomscale ? this.maxzoomscale : 3);
    this._curZoomScale = 1.0;
    this._curPan = {x:0,y:0};
    this._lastPoint = {x: this._window.innerWidth / 2, y: this._window.innerHeight / 2}
    return;
  }
  private async _setPhoto(): Promise<void> {
    this._photoEl = this._element.querySelector('.zoom-item');
    // Define Listeners
    this._photoEl.addEventListener("touchstart", this._startHandler.bind(this));
    this._photoEl.addEventListener("touchmove", this._moveHandler.bind(this));
    this._photoEl.addEventListener("touchend", this._endHandler.bind(this));
    this._photoEl.addEventListener('mousedown', this._startHandler.bind(this));
    this._photoEl.addEventListener('mousemove', this._moveHandler.bind(this));
    this._photoEl.addEventListener('mouseup', this._endHandler.bind(this));
    await this.setImage();
    this._imageEl = this._photoEl.querySelector('.zoom-image');
    // View Size
    this._view = {left: 0, top: 0, width: this._window.innerWidth,
                  height: this._window.innerHeight};
    // Image Natural Size
    this._imageNatural = {left: 0, top: 0, width: this._imageEl.naturalWidth,
                          height: this._imageEl.naturalHeight};
    // Image in View
    this._imageInView = this._calculateImageInView();
    // Set the maximum scale
    this._maxZoomScale = this._calculateMaxZooScale();
    // Set host properties
    this._setHostProperties(this._curZoomScale, this._curPan);
    // Set the lastPoint to the View center
    this._lastPoint.x = this._imageInView.width / 2;
    this._lastPoint.y = this._imageInView.height / 2;
    return;
  }
  private async setImage(): Promise<void> {
    return new Promise((resolve) => {
      var img = new Image();
      img.onload = () => {
        this._photoEl.append(img);
        resolve();
      }
      img.src = this.innerUrl;
      img.className = 'zoom-image'
    })
  }
  private _setHostProperties(scale: number, pan: Point) {
    const transform = `scale(${scale}) translateX(${pan.x}px) translateY(${pan.y}px)`;
    this.el.style.setProperty('--zoom-left',`${this._imageInView.left}px`);
    this.el.style.setProperty('--zoom-top',`${this._imageInView.top}px`);
    this.el.style.setProperty('--zoom-width',`${this._imageInView.width}px`);
    this.el.style.setProperty('--zoom-height',`${this._imageInView.height}px`);
    this.el.style.setProperty('--zoom-transform', `${transform}`)
  }
  private _calculateImageInView(): Rect {
    let imageRect: Rect = {} as Rect;
    const scale = Math.max(
      this._imageNatural.width  / this._view.width,
      this._imageNatural.height / this._view.height
    );
    imageRect.width = this._imageNatural.width / scale;
    imageRect.height = this._imageNatural.height / scale;
    imageRect.left = Math.max(0,(this._view.width - imageRect.width) / 2);
    imageRect.top = Math.max(0,(this._view.height - imageRect.height) / 2);
    return imageRect;
  }
  private _calculateMaxZooScale(): number {
    return Math.max(this.innerMaxZoomScale,
                    Math.max(this._view.width / this._imageInView.width,
                    this._view.height / this._imageInView.height));
  }
  private _getTouchPoint(event): Point {
    let point: Point = {};
    if(event.targetTouches) {
        // Touch Events
        point.x = event.targetTouches[0].clientX;
        point.y = event.targetTouches[0].clientY;
      } else {
        // Mouse event
        point.x = event.clientX;
        point.y = event.clientY;
      }
    return point;
  }

  //******************************
  //* Handling Gesture Events    *
  //******************************

  private _startHandler(event) {
    event.preventDefault();
	  this._startPoint = this._getTouchPoint(event);
    if(!this._tapedTwice) {
      this._tapedTwice = true;
      this._tapedTime = setTimeout( () => {
        this._touchStart = true;
        this._tapNum = 1;
        this._endHandler();
      }, 300 );
		  return false;
    }
    //action on double tap goes below
    this._tapNum = 2;
    this._lastPoint = {x: this._startPoint.x, y: this._startPoint.y};

	  clearTimeout(this._tapedTime);
	  this._touchStart = true;
  }

  private _moveHandler(event) {
    if( this._tapedTwice ) {
    this._movePoint = this._getTouchPoint(event);
    this._touchMove = true;
    const deltaPoint = {x: this._lastPoint.x - this._movePoint.x ,
                        y: this._lastPoint.y - this._movePoint.y}
    this._curPan.x += deltaPoint.x * (this._maxZoomScale - 1) / this._maxZoomScale;
    this._curPan.y += deltaPoint.y * (this._maxZoomScale - 1) / this._maxZoomScale;
    this._lastPoint = this._movePoint;
    this._setHostProperties(this._maxZoomScale,this._curPan);
    this._touchStart = false;
    }
  }

  private _endHandler() {
    if(this._touchStart && this._tapNum > 0) {
      if(this._tapNum === 2) {
        if(!this._touchMove) {
         this._handleDoubleTap(this._startPoint)
        } else {
          this._tapNum = 0;
          this._tapedTwice = false;
          this._touchStart = false;
          this._touchMove = false
          this._curZoomScale = 1;
          this._curPan = {x: 0, y: 0};
          this._setHostProperties(this._curZoomScale,this._curPan);
        }
      } else if(this._tapNum === 1) {
        this._curZoomScale = 1;
        this._handleSingleTap();
        this._tapNum = 0;
        this._tapedTwice = false;
        this._touchStart = false;
      }
   }
  }

  private _handleSingleTap() {
    this.onPhotoZoomOneTap.emit();
 }

  private _handleDoubleTap(pt: any) {
    if (this._curZoomScale === 1) {
      this._curZoomScale = this._maxZoomScale;
      this._curPan.x = (this._view.width / 2 - pt.x) * (this._curZoomScale - 1) / this._curZoomScale
      this._curPan.y = (this._view.height / 2 -pt.y) * (this._curZoomScale - 1) / this._curZoomScale
      this._setHostProperties(this._curZoomScale,this._curPan);
    } else {
      this._curZoomScale = 1;
      this._curPan = {x: 0, y: 0};
      this._setHostProperties(this._curZoomScale,this._curPan);
    }
    return;
  }
  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {

    return (
      <Host>
        <div class="zoom-container">
          <div class="wrapper">
            <div class="zoom-item">
            </div>
          </div>
        </div>
      </Host>
    )
  }

}

/*
              <img src={this.innerUrl} id="zoom-image" class="zoom-image"></img>

*/
