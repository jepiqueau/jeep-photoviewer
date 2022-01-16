import { Component, Prop, h, State, Element, Watch, Method, Host,
         Listen, Event, EventEmitter } from '@stencil/core';
import { Image, ViewerOptions, JeepPhotoViewerResult } from '../../interfaces/interfaces';
import { placeholderUrl } from '../../utils/svg-utils';

@Component({
  tag: 'jeep-photoviewer',
  styleUrl: 'jeep-photoviewer.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class JeepPhotoviewer {
  @Element() el!: HTMLJeepPhotoviewerElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The Image List
   */
  @Prop({
    attribute: "pvimages",
    reflect: true
  }) imageList: Image[];

  /**
   * The photoviewer options
   */
  @Prop({
    attribute: "pvoptions",
    reflect: true
  }) options: ViewerOptions;

  /**
   * The photoviewer mode ("gallery","slider","one")
   */
  @Prop({
    attribute: "pvmode",
    reflect: true
  }) mode: string;

  /**
   * The photoviewer image index for mode ("slider","one")
   */
  @Prop({
    attribute: "pvstartfrom",
    reflect: true
  }) startFrom: number;

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerImageList: Image[];
  @State() innerOptions: ViewerOptions;
  @State() innerMode: string;
  @State() innerStartFrom: number;
  @State() showHScroll: boolean = false;
  @State() close: boolean = false;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('imageList')
  parseImageList(newValue: Image[]) {
    this.innerImageList = newValue;
  }

  @Watch('options')
  parseOptions(newValue: ViewerOptions) {
    this.innerOptions = newValue;
  }

  @Watch('mode')
  parseMode(newValue: string) {
    const expMode: string[] = ["one","gallery","slider"]
    const val: string = expMode.includes(newValue) ? newValue : "one";
    this.innerMode = val;
  }
  @Watch('startFrom')
  parseStartFrom(newValue: number) {
    const val = newValue < 0 || newValue > this.innerImageList.length ? 0 : newValue;
    this.innerStartFrom = val;
  }

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when successful or when an error occurs or a message to be sent
   */
   @Event({eventName:'jeepPhotoViewerResult'}) onPhotoViewerResult!: EventEmitter<JeepPhotoViewerResult>;


  //*******************************
  //* Listen to Event Definitions *
  //*******************************
  @Listen('resize', { target: 'window' })
  handleWindowResize() {
    this._windowResize();
  }

  @Listen('jeepPhotoButtonsClose')
  async handleJeepPhotoButtonsClose(event: CustomEvent) {
    if(this.innerMode === "gallery") {
      if(event.detail.component === "jeep-photo-hscroll") {
        this.close = false;
        await this.closePhotoHScroll();
      } else {
        this.close = true;
        this.onPhotoViewerResult.emit({result: true});
      }
    }
    if(this.innerMode === "one" || this.innerMode === "slider") {
      this.close = true;
    }
  }

  @Listen('jeepPhotoHscrollResult')
  handleJeepPhotoHscrollResult(event: CustomEvent) {
    if(event.detail) {
      this.onPhotoViewerResult.emit(event.detail);
    }
  }
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

  @Method()
  closePhotoHScroll(): Promise<void> {
    return Promise.resolve(this._closeHScroll());
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _element: any;
  _window: Window | any;
  _selPos: number;

  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }

  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this.parseImageList(this.imageList ? this.imageList : null);
    this.parseOptions(this.options ? this.options : null);
    this.parseMode(this.mode ? this.mode : "one");
    this.parseStartFrom(this.startFrom ? this.startFrom : 0);
    this._setProperties();
    return;
  }
  private async _windowResize() {
    this._setProperties();
  }
  private _setProperties() {
    if(this.innerImageList == null || this.innerImageList.length == 0) {
      this.onPhotoViewerResult.emit({result: false,
        message: "You must provide an image or an image array"});
    }
    if(this.innerMode === "gallery") {
      var spanCount = this.options != null && this.options.spancount
                                              ? this.options.spancount : 3;
      if(this._window.innerWidth > this._window.innerHeight) spanCount += 1;
    } else if(this.innerMode === "slider") {
      spanCount = 1;
      this._selPos = this.innerStartFrom;
      this.showHScroll = true;
    } else if(this.innerMode === "one") {
      spanCount = 1;
      this._selPos = this.innerStartFrom;
      this.showHScroll = true;
    } else {
      this.onPhotoViewerResult.emit({result: false,
        message: "mode must be in ['one', 'gallery', 'slider']"});
    }
    const boxWidth: string = (100 / spanCount).toFixed(4);
    var tempColumns = ``
    for(let i: number = 0; i < spanCount; i++) {
      tempColumns += `auto `;
    }
    tempColumns = tempColumns.substring(0,tempColumns.length - 1);
    this.el.style.setProperty('--gallery-box-width',`${boxWidth}vw`);
    this.el.style.setProperty('--gallery-template-columns',`${tempColumns}`);

  }

  private _handleClick(boxId: string) {
    this._selPos = Number(boxId.substr(boxId.lastIndexOf("-")+1));
    this.showHScroll = true;
  }
  private async _closeHScroll(): Promise<void> {
    this.showHScroll = false;
    return;
  }

  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {
    let toRender: any[] = [];

    if(this.innerImageList != null && this.innerImageList.length > 0) {
      for (var i:number = 0; i<this.innerImageList.length; i++) {
        const placeHolderStyle = {"background-image": `${placeholderUrl}`};
        const elStyle = {"background-image": `url(${this.innerImageList[i].url})`};
        const boxId = `gallery-box-${i}`;
        if(this.innerMode === "gallery") {
          toRender = [...toRender,
            <div class="placeholder" style={placeHolderStyle}>
              <div id={boxId} class="image" onClick={() => this._handleClick(boxId)} style={elStyle}><img /></div>
            </div>
          ]
        } else {
          toRender = [...toRender,
            <div class="placeholder" style={placeHolderStyle}>
              <div id={boxId} class="image" style={elStyle}><img /></div>
            </div>
          ]
        }
      }
    }
    return (
      <Host>
        {!this.close
        ?
          <div class="photoviewer-container">
            {this.showHScroll
            ?
              <jeep-photo-hscroll position={this._selPos} imageList={this.innerImageList}
                options={this.innerOptions} mode={this.innerMode}></jeep-photo-hscroll>
            :
              <div class="wrapper">
              {toRender}
              <jeep-photo-buttons share="false" viewmode="normal" closebutton="yes"
                fromcomponent="jeep-photoviewer"></jeep-photo-buttons>
              </div>
            }
          </div>
        :
          null
        }
      </Host>
    )
  }
}
