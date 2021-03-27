import { Component, Prop, h, State, Element, Watch, Method, Host,
         Event, EventEmitter } from '@stencil/core';
import {JeepPhotoViewerResult } from '../../../interfaces/interfaces';

@Component({
tag: 'jeep-photo-share',
styleUrl: 'jeep-photo-share.css',
shadow: true,
})
export class JeepPhotoShare {
  @Element() el!: HTMLJeepPhotoShareElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The photo url to share
   */
  @Prop({
    attribute: "surl",
    reflect: true
  }) surl: string = null;

  /**
   * The photo title to share
   */
  @Prop({
    attribute: "stitle",
    reflect: true
  }) stitle: string = null;

  /**
   * The text to share
   */
   @Prop({
    attribute: "stext",
    reflect: true
  }) stext: string = null;

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerUrl: string;
  @State() innerTitle: string;
  @State() innerText: string;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('surl')
  parseUrl(newValue: string) {
    this.innerUrl = newValue;
  }

  @Watch('stitle')
  parseTitle(newValue: string) {
    this.innerTitle = newValue;
  }

  @Watch('stext')
  parseText(newValue: string) {
    this.innerText = newValue;
  }

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when the close button was clicked
   */
   @Event({eventName:'jeepPhotoShareCompleted'}) onPhotoShareCompleted!: EventEmitter<JeepPhotoViewerResult>;


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
   * Set the Share.
   */
  @Method()
  setShare(): Promise<void> {
    return Promise.resolve(this._setShare());
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _element: any;
  _window: Window | any;


  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }

  async componentDidLoad() {
    await this.setShare();
  }

  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this.parseUrl(this.surl? this.surl : null);
    this.parseTitle(this.stitle ? this.stitle : null);
    this.parseText(this.stext ? this.stext : null);
    return;
  }
  private async _setShare(): Promise<void> {
    if(navigator.share) {
      navigator.share({
        title: this.innerTitle,
        url: this.innerUrl,
        text: this.innerText
      })
      .then(() => {
        this.onPhotoShareCompleted.emit({result: true});
      })
      .catch((error) => {
        this.onPhotoShareCompleted.emit({result: false, message: error});
      })
    } else {
      const msg = "Share not implemented on this browser";
      this.onPhotoShareCompleted.emit({result: false, message: msg});
    }
  }
  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {

    return (
      <Host>
      </Host>
    )
  }

}
