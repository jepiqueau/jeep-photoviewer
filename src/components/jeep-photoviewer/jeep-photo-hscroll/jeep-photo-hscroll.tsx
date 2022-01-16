import { Component, Prop, h, State, Element, Watch, Method, Host,
         Listen, Event, EventEmitter } from '@stencil/core';
import { Image, ViewerOptions, JeepPhotoViewerResult} from '../../../interfaces/interfaces';

@Component({
tag: 'jeep-photo-hscroll',
styleUrl: 'jeep-photo-hscroll.css',
shadow: true,
})
export class JeepPhotoHscroll {
  @Element() el!: HTMLJeepPhotoHscrollElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * The selected position
   */
  @Prop({
    attribute: "selposition",
    reflect: true
  }) position: number;

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
   * The photoviewer mode ('gallery':'one':'slider')
   */
  @Prop({
    attribute: "pvmode",
    reflect: true
  }) mode: string;

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerImageList: Image[];
  @State() innerOptions: ViewerOptions;
  @State() innerPosition: number;
  @State() innerMode: string;
  @State() buttonsVisibility: boolean;
  @State() isFullscreen: boolean;
  @State() photoZoom: boolean;
  @State() share: string;
  @State() shareShow: boolean = false;
  @State() titleShow: boolean = true;
  @State() maxZoomScale: number;
  @State() currentIndex: number;

  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('position')
  parsePosition(newValue: number) {
    this.innerPosition = newValue;
  }

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
    this.innerMode = newValue;
  }

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when successful or when an error occurs or a message has to be sent
   */
   @Event({eventName:'jeepPhotoHscrollResult'}) onPhotoHscrollResult!: EventEmitter<JeepPhotoViewerResult>;


  @Listen('resize', { target: 'window' })
  async handleWindowResize() {
    this._currentPosition = this.currentIndex * this._window.innerWidth;
    await this._scrollToPosition(this.currentIndex);

  }
  @Listen('jeepPhotoButtonsClose')
  async handleJeepPhotoButtonsClose() {
      if(this.isFullscreen) {
        await this._fullscreenExit();
      }
      this.currentIndex = this._getCurrentPhotoIndex();
      this.onPhotoHscrollResult.emit({result: true, imageIndex: this.currentIndex});
  }
  @Listen('jeepPhotoButtonsShare')
  async handleJeepPhotoButtonsShare() {
    this.shareShow = true;
    this._shareUrl = this.innerImageList[this.currentIndex].url;
    this._shareTitle = this.innerImageList[this.currentIndex].title;
    this._shareText = "Share API Demo";
  }
  @Listen('jeepPhotoShareCompleted')
  async handleJeepPhotoShareCompleted(event: CustomEvent) {
    if(event.detail) {
      if(event.detail.result) {
        this.onPhotoHscrollResult.emit({result: true,
                                        message: "Photo has been shared successfully"});
      } else {
        this.onPhotoHscrollResult.emit({result: false,
                                        message: `Error: ${event.detail.message}`});
      }
    } else {
      this.onPhotoHscrollResult.emit({result: false,
                                      message: "Error: No message returned"});
    }
    this.shareShow = false;
  }

  @Listen('jeepPhotoRequestFullscreen')
  async handleJeepPhotoFullscreenRequest() {
    await this._fullscreenRequest(document.documentElement);
  }

  @Listen('jeepPhotoRequestMinimize')
  async handleJeepPhotoMinimizeRequest() {
    const index = this._getCurrentPhotoIndex();
    await this._fullscreenExit();
    this.currentIndex = index;
  }

  @Listen('jeepPhotoZoomOneTap')
  async handleJeepPhotoZoomOneTap() {
    this._photoZoomOneTap = true;
    this.buttonsVisibility = !this.buttonsVisibility;
    this.photoZoom = false;
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
  /**
   * Set the Carousel.
   */
  @Method()
  setCarousel(): Promise<void> {
    return Promise.resolve(this._setCarousel());
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _element: any;
  _window: Window | any;
  _carouselEl: HTMLDivElement;
  _tapped: boolean = false;
  _tappedTime: any = null;
  _tapNum: number = 0;
  _timerStart: boolean = false;
  _currentPosition: number;
  _photoZoomOneTap: boolean = false;
  _widthFullscreen: number;
  _previousScrollWidth: number;
  _ticking: boolean = false;
  _isScrollListener: boolean = false;
  _shareUrl: string = "";
  _shareTitle: string = "";
  _shareText: string = "";


  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }

  async componentDidLoad() {
    await this.setCarousel();
  }

  async componentDidRender() {
    if(this._photoZoomOneTap) {
      await this.setCarousel();
      this._photoZoomOneTap = false;
    }
  }

  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this.parsePosition(this.position ? this.position : null);
    this.parseImageList(this.imageList ? this.imageList : null);
    this.parseOptions(this.options ? this.options : null);
    this.parseMode(this.mode ? this.mode : "one");
    this.buttonsVisibility = true;
    this.isFullscreen = false;
    this.photoZoom = false;
    this.share = "visible";
    this.share = this.innerOptions!= null
                        && Object.keys(this.innerOptions).includes("share")
                        ? this.innerOptions.share ? "visible" : "hidden"
                        : "visible";
    this.titleShow = this.innerOptions!= null
                        && Object.keys(this.innerOptions).includes("title")
                        ? this.innerOptions.title : true;
    this.maxZoomScale = this.innerOptions!= null && this.innerOptions.maxzoomscale
                                      ? this.innerOptions.maxzoomscale : 3.0;
    this.currentIndex = this.innerPosition;
    this._widthFullscreen = this._window.innerWidth;
    return;
  }
  private async _setCarousel(): Promise<void> {
    this._carouselEl = this._element.querySelector(`.carousel`);
    await this._scrollToPosition(this.currentIndex);
    this._currentPosition = this.currentIndex * this._window.innerWidth;
    this._previousScrollWidth = this._carouselEl.scrollWidth;
    this._carouselEl.classList.remove('hidden')
    if(!this._isScrollListener) {
      this._isScrollListener = true;
      this._carouselEl.addEventListener('scroll', () => {
        if (!this._ticking) {
          setTimeout(async () => {
            if(this._carouselEl.scrollWidth === this._previousScrollWidth) {
              const index = this._getCurrentPhotoIndex();
              if(index !== this.currentIndex) {
                this.currentIndex = index;
              }
            }
            this._ticking = false;
          },500);
          this._ticking = true;
        }

      },false);
    }
    return;
  }

  private async _scrollToPosition(index: number): Promise<void>  {
      this._currentPosition = index * this._window.innerWidth;
      if(this._carouselEl) this._carouselEl.scrollTo(this._currentPosition,0);
      return;
  }

  private _getCurrentPhotoIndex(): number {
    let index: number = 0;
    this._currentPosition = Number(this._carouselEl.scrollLeft);
    if(Math.abs(this._carouselEl.scrollWidth/this.innerImageList.length - this._window.innerWidth) <= 2) {
      // slide constant width
      index = Math.round(this._currentPosition/this._window.innerWidth);
    }
    return index;
  }

  private async _fullscreenRequest(elem:any): Promise<void> {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else {
      this.onPhotoHscrollResult.emit({result: false,
                                      message: "Error: Fullscreen API is not supported."});
    }
    this.isFullscreen = true;
    return;
  }
  private async _fullscreenExit(): Promise<void> {
    let doc:any = document
    if (doc && doc.exitFullscreen) {
        doc.exitFullscreen();
    } else if (doc && doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    } else if (doc && doc.mozExitFullscreen) {
        doc.mozExitFullscreen();
    } else if (doc && doc.msExitFullscreen) {
        doc.msExitFullscreen();
    } else {
      this.onPhotoHscrollResult.emit({result: false,
                                      message: "Error: Fullscreen API is not supported."});
    }
    this.isFullscreen = false;
    return;
  }
  private _handleClick() {
    if(this.innerMode === "gallery" || this.innerMode === "slider") {
      this.currentIndex = this._getCurrentPhotoIndex();
      this._currentPosition = this.currentIndex * this._window.innerWidth;
    } else {
      this.currentIndex = this.innerPosition;
    }
    this.buttonsVisibility = !this.buttonsVisibility;
    // launch the zoom in out
    this.photoZoom = true;
    return;
  }
  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {
    let toRenderImg: any[] = [];
    if(this.innerImageList != null && this.innerImageList.length > 0) {
      const classTitle = this.titleShow ? "carousel-title" : "carousel-title hidden";
      if(this.innerMode === "gallery" || this.innerMode === "slider") {
        for (var i:number = 0; i<this.innerImageList.length; i++) {
          toRenderImg = [...toRenderImg,
            <div class="carousel-item" onClick={() => this._handleClick()}>
              <img src={this.innerImageList[i].url}
                  alt={this.innerImageList[i].title}
                  class="carousel-image"></img>
                  <p class={classTitle}>{this.innerImageList[i].title}</p>
            </div>
          ]
        }
      }
      if(this.innerMode === "one") {
        toRenderImg = [...toRenderImg,
          <div class="carousel-item" onClick={() => this._handleClick()}>
            <img src={this.innerImageList[this.innerPosition].url}
                alt={this.innerImageList[this.innerPosition].title}
                class="carousel-image"></img>
                <p class={classTitle}>{this.innerImageList[this.innerPosition].title}</p>
          </div>
        ]
      }
    }
//    const closeMode: string = this.innerImageList.length === 1 ? "no" : "yes";
    let toRender: any[] = [];
    if(this.buttonsVisibility) {
      const mode: string = this.isFullscreen ? "fullscreen" : "normal";
      toRender = [...toRender,
        <jeep-photo-buttons share={this.share} viewmode={mode} closebutton="yes"
         fromcomponent="jeep-photo-hscroll"></jeep-photo-buttons>
      ]
    }
    let toRenderShare: any[] = [];
    if(this.shareShow) {
      toRenderShare = [...toRenderShare,
        <jeep-photo-share surl={this._shareUrl} stitle={this._shareTitle} stext={this._shareText}></jeep-photo-share>
      ]
    }
    return (
      <Host>
        <div class="hscroll-container">
          <div class="wrapper">
            { this.photoZoom
            ?
              <jeep-photo-zoom url={this.innerImageList[this.currentIndex].url}
                               maxzoomscale= {this.maxZoomScale}>
              </jeep-photo-zoom>
            :
              <div>
                <div class="carousel hidden">
                  {toRenderImg}
                </div>
                {toRender}
                {toRenderShare}
              </div>
            }
          </div>
        </div>
      </Host>
    )
  }

}
