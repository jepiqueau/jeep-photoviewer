import { Component, Prop, h, State, Element, Watch, Method, Host,
         Event, EventEmitter } from '@stencil/core';
import { shareUrl, closeUrl, minimizeUrl, fullscreenUrl} from '../../../utils/svg-utils'
@Component({
tag: 'jeep-photo-buttons',
styleUrl: 'jeep-photo-buttons.css',
shadow: true,
})
export class JeepPhotoButtons {
  @Element() el!: HTMLJeepPhotoButtonsElement;

  //************************
  //* Property Definitions *
  //************************

  /**
   * Share button visible
   */
  @Prop({
    attribute: "sharevisible",
    reflect: true
  }) share: string;

  /**
   * Mode "fullscreen" / "normal"
   */
  @Prop({
      attribute: "viewmode",
      reflect: true
  }) viewmode: string;

  //*****************************
  //* State Definitions         *
  //*****************************

  @State() innerShare: string;
  @State() innerViewmode: string;
  @State() visible: boolean;
  @State() mode: string;


  //*****************************
  //* Watch on Property Changes *
  //*****************************

  @Watch('share')
  parseShare(newValue: string) {
    this.innerShare = newValue;
  }

  @Watch('viewmode')
  parseViewmode(newValue: string) {
    this.innerViewmode = newValue;
  }

  //*********************
  //* Event Definitions *
  //*********************

  /**
   * Emitted when the close button was clicked
   */
  @Event({eventName:'jeepPhotoButtonsClose'}) onPhotoButtonsClose!: EventEmitter<void>;
  /**
   * Emitted when the fullscreen mode button was clicked
   */
  @Event({eventName:'jeepPhotoRequestFullscreen'}) onPhotoRequestFullscreen!: EventEmitter<void>;
  /**
   * Emitted when the minimize mode button was clicked
   */
  @Event({eventName:'jeepPhotoRequestMinimize'}) onPhotoRequestMinimize!: EventEmitter<void>;
  /**
   * Emitted when the share button was clicked
   */
   @Event({eventName:'jeepPhotoButtonsShare'}) onPhotoButtonsShare!: EventEmitter<void>;

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
   * Set the Photo Buttons.
   */
  @Method()
  setPhotoButtons(): Promise<void> {
    return Promise.resolve(this._setPhotoButtons());
  }
  /**
   * Set the Navigation Visibility (visible/hidden)
   */
  @Method()
  setJeepPhotoButtonsVisibility(state:boolean): Promise<void> {
    if(state) {
        this._photoButtonsEl.classList.remove('hidden');
        this.visible = true;
    } else {
        this._photoButtonsEl.classList.add('hidden');
        this.visible = false;
    }
    return;
  }

  //**********************************
  //* Internal Variables Declaration *
  //**********************************
  _element: any;
  _window: Window | any;
  _photoButtonsEl: HTMLDivElement;
  _shareEl: HTMLDivElement;
  _modeEl: HTMLDivElement;
  _closeEl: HTMLDivElement;
  _modeUrl: string;


  //*******************************
  //* Component Lifecycle Methods *
  //*******************************

  async componentWillLoad() {
    this._window = window;
    await this.init();
  }

  async componentDidLoad() {
    await this.setPhotoButtons();
  }


  //******************************
  //* Private Method Definitions *
  //******************************

  private async _init(): Promise<void> {
    this._element = this.el.shadowRoot;
    this.parseShare(this.share ? this.share : "visible");
    this.parseViewmode(this.viewmode ? this.viewmode : "normal");
    if(this.innerViewmode === "fullscreen") {
      this.mode = "minimize";
      this._modeUrl = minimizeUrl;
    } else {
      this.mode = "fullscreen";
      this._modeUrl = fullscreenUrl;
    }
    return;
  }
  private async _setPhotoButtons(): Promise<void> {
    this._photoButtonsEl = this._element.querySelector('.photobuttons-container');
    if(this.innerShare === "visible") {
      this._shareEl =  this._photoButtonsEl.querySelector('.share-button');
      this._shareEl.style.setProperty("background-image",`${shareUrl}`);
    }
    this._modeEl =  this._photoButtonsEl.querySelector('.mode-button');
    this._closeEl =  this._photoButtonsEl.querySelector('.close-button');
    this._modeEl.style.setProperty("background-image",`${this._modeUrl}`);
    this._closeEl.style.setProperty("background-image",`${closeUrl}`);
    return;
  }
  private _handleClick(button: string) {
    switch (button) {
      case "share" : {
            this.onPhotoButtonsShare.emit();
        break;
      }
      case "close" : {
        this.onPhotoButtonsClose.emit();
        break;
      }
      case "mode" : {
        if(this.mode === "fullscreen") {
          this._modeUrl = minimizeUrl;
          this._modeEl.style.setProperty("background-image",`${this._modeUrl}`);
          this.onPhotoRequestFullscreen.emit();
          this.mode = "minimize";
        } else {
          this._modeUrl = fullscreenUrl;
          this._modeEl.style.setProperty("background-image",`${this._modeUrl}`);
          this.onPhotoRequestMinimize.emit();
          this.mode = "fullscreen";
        }

        break;
      }

    }
  }
  //*************************
  //* Rendering JSX Element *
  //*************************

  render() {
    let toRender: any[] = [];
    if(this.innerShare === "visible") {
      toRender = [...toRender,
        <div class="share-button" onClick={() => this._handleClick("share")}>
        </div>
      ]
    }
    toRender = [...toRender,
      <div class="mode-button" onClick={() => this._handleClick("mode")}>
      </div>
    ]
    toRender = [...toRender,
      <div class="close-button" onClick={() => this._handleClick("close")}>
      </div>
    ]
  return (
      <Host>
        <div class="photobuttons-container">
          <div class="wrapper">
            {toRender}
          </div>
        </div>
      </Host>
    )
  }

}
