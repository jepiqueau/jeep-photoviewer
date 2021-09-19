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

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerImageList: Image[];
  @State() innerOptions: ViewerOptions;
  @State() showHScroll: boolean = false;

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

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when an error occurs or a message to be sent
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
  async handleJeepPhotoButtonsClose() {
    await this.closePhotoHScroll();
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
    this._setProperties();
    return;
  }
  private async _windowResize() {
    this._setProperties();
  }
  private _setProperties() {
    console.log(`jeep-phtoviewer this.innerImageList.length ${this.innerImageList.length}`);

    if(this.innerImageList.length > 1) {
      var spanCount = this.options != null && this.options.spancount
                                              ? this.options.spancount : 3;
      if(this._window.innerWidth > this._window.innerHeight) spanCount += 1;
    } else {
      spanCount = 1;
    }
    const boxWidth = (100 / spanCount).toFixed(4);
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
        if(this.innerImageList.length > 1) {
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
          this.showHScroll = true;
        }
      }

    }
    return (
      <Host>
      <div class="photoviewer-container">
        {this.showHScroll
        ?
          <jeep-photo-hscroll position={this._selPos} imageList={this.innerImageList}
            options={this.innerOptions}></jeep-photo-hscroll>
        :
          <div class="wrapper">
          {toRender}
          </div>
        }
      </div>
      </Host>
    )
  }
}
