/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { IJeepSwipeEvent, Image, JeepPhotoViewerResult, ViewerOptions } from "./interfaces/interfaces";
export { IJeepSwipeEvent, Image, JeepPhotoViewerResult, ViewerOptions } from "./interfaces/interfaces";
export namespace Components {
    interface JeepPhotoButtons {
        /**
          * Close button visible
         */
        "closebutton": string;
        /**
          * From component
         */
        "fromcomponent": string;
        /**
          * Method initialize
         */
        "init": () => Promise<void>;
        /**
          * Set the Navigation Visibility (visible/hidden)
         */
        "setJeepPhotoButtonsVisibility": (state: boolean) => Promise<void>;
        /**
          * Set the Photo Buttons.
         */
        "setPhotoButtons": () => Promise<void>;
        /**
          * Share button visible
         */
        "share": string;
        /**
          * Mode "fullscreen" / "normal"
         */
        "viewmode": string;
    }
    interface JeepPhotoHscroll {
        /**
          * The Image List
         */
        "imageList": Image[];
        /**
          * Method initialize
         */
        "init": () => Promise<void>;
        /**
          * The photoviewer mode ('gallery':'one':'slider')
         */
        "mode": string;
        /**
          * The photoviewer options
         */
        "options": ViewerOptions;
        /**
          * The selected position
         */
        "position": number;
        /**
          * Set the Carousel.
         */
        "setCarousel": () => Promise<void>;
    }
    interface JeepPhotoShare {
        /**
          * Method initialize
         */
        "init": () => Promise<void>;
        /**
          * Set the Share.
         */
        "setShare": () => Promise<void>;
        /**
          * The text to share
         */
        "stext": string;
        /**
          * The photo title to share
         */
        "stitle": string;
        /**
          * The photo url to share
         */
        "surl": string;
    }
    interface JeepPhotoSwipe {
        /**
          * handleMouseDown
         */
        "handleMouseDown": (e: any) => Promise<void>;
        /**
          * handleMouseEUp
         */
        "handleMouseUp": (e: any) => Promise<void>;
        /**
          * handleTouchEnd
         */
        "handleTouchEnd": (e: TouchEvent) => Promise<void>;
        /**
          * handleTouchStart
         */
        "handleTouchStart": (e: any) => Promise<void>;
        /**
          * Method initialize
         */
        "init": () => Promise<void>;
        /**
          * The swipe threshold in x direction
         */
        "thresholdX": number;
        /**
          * The swipe threshold in y direction
         */
        "thresholdY": number;
        /**
          * The swipe timeThreshold
         */
        "timeThreshold": number;
    }
    interface JeepPhotoZoom {
        /**
          * Method initialize
         */
        "init": () => Promise<void>;
        /**
          * The maximum zoom scale
         */
        "maxzoomscale": number;
        /**
          * Set the Photo.
         */
        "setPhoto": () => Promise<void>;
        /**
          * The photo url
         */
        "url": string;
    }
    interface JeepPhotoviewer {
        "closePhotoHScroll": () => Promise<void>;
        /**
          * The Image List
         */
        "imageList": Image[];
        /**
          * Method initialize
         */
        "init": () => Promise<void>;
        /**
          * The photoviewer mode ("gallery","slider","one")
         */
        "mode": string;
        /**
          * The photoviewer options
         */
        "options": ViewerOptions;
        /**
          * The photoviewer image index for mode ("slider","one")
         */
        "startFrom": number;
    }
}
export interface JeepPhotoButtonsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJeepPhotoButtonsElement;
}
export interface JeepPhotoHscrollCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJeepPhotoHscrollElement;
}
export interface JeepPhotoShareCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJeepPhotoShareElement;
}
export interface JeepPhotoSwipeCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJeepPhotoSwipeElement;
}
export interface JeepPhotoZoomCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJeepPhotoZoomElement;
}
export interface JeepPhotoviewerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLJeepPhotoviewerElement;
}
declare global {
    interface HTMLJeepPhotoButtonsElement extends Components.JeepPhotoButtons, HTMLStencilElement {
    }
    var HTMLJeepPhotoButtonsElement: {
        prototype: HTMLJeepPhotoButtonsElement;
        new (): HTMLJeepPhotoButtonsElement;
    };
    interface HTMLJeepPhotoHscrollElement extends Components.JeepPhotoHscroll, HTMLStencilElement {
    }
    var HTMLJeepPhotoHscrollElement: {
        prototype: HTMLJeepPhotoHscrollElement;
        new (): HTMLJeepPhotoHscrollElement;
    };
    interface HTMLJeepPhotoShareElement extends Components.JeepPhotoShare, HTMLStencilElement {
    }
    var HTMLJeepPhotoShareElement: {
        prototype: HTMLJeepPhotoShareElement;
        new (): HTMLJeepPhotoShareElement;
    };
    interface HTMLJeepPhotoSwipeElement extends Components.JeepPhotoSwipe, HTMLStencilElement {
    }
    var HTMLJeepPhotoSwipeElement: {
        prototype: HTMLJeepPhotoSwipeElement;
        new (): HTMLJeepPhotoSwipeElement;
    };
    interface HTMLJeepPhotoZoomElement extends Components.JeepPhotoZoom, HTMLStencilElement {
    }
    var HTMLJeepPhotoZoomElement: {
        prototype: HTMLJeepPhotoZoomElement;
        new (): HTMLJeepPhotoZoomElement;
    };
    interface HTMLJeepPhotoviewerElement extends Components.JeepPhotoviewer, HTMLStencilElement {
    }
    var HTMLJeepPhotoviewerElement: {
        prototype: HTMLJeepPhotoviewerElement;
        new (): HTMLJeepPhotoviewerElement;
    };
    interface HTMLElementTagNameMap {
        "jeep-photo-buttons": HTMLJeepPhotoButtonsElement;
        "jeep-photo-hscroll": HTMLJeepPhotoHscrollElement;
        "jeep-photo-share": HTMLJeepPhotoShareElement;
        "jeep-photo-swipe": HTMLJeepPhotoSwipeElement;
        "jeep-photo-zoom": HTMLJeepPhotoZoomElement;
        "jeep-photoviewer": HTMLJeepPhotoviewerElement;
    }
}
declare namespace LocalJSX {
    interface JeepPhotoButtons {
        /**
          * Close button visible
         */
        "closebutton"?: string;
        /**
          * From component
         */
        "fromcomponent"?: string;
        /**
          * Emitted when the close button was clicked
         */
        "onJeepPhotoButtonsClose"?: (event: JeepPhotoButtonsCustomEvent<{component: string}>) => void;
        /**
          * Emitted when the share button was clicked
         */
        "onJeepPhotoButtonsShare"?: (event: JeepPhotoButtonsCustomEvent<void>) => void;
        /**
          * Emitted when the fullscreen mode button was clicked
         */
        "onJeepPhotoRequestFullscreen"?: (event: JeepPhotoButtonsCustomEvent<void>) => void;
        /**
          * Emitted when the minimize mode button was clicked
         */
        "onJeepPhotoRequestMinimize"?: (event: JeepPhotoButtonsCustomEvent<void>) => void;
        /**
          * Share button visible
         */
        "share"?: string;
        /**
          * Mode "fullscreen" / "normal"
         */
        "viewmode"?: string;
    }
    interface JeepPhotoHscroll {
        /**
          * The Image List
         */
        "imageList"?: Image[];
        /**
          * The photoviewer mode ('gallery':'one':'slider')
         */
        "mode"?: string;
        /**
          * Emitted when swipe gestures in Gallery mode
         */
        "onJeepPhotoHscrollClose"?: (event: JeepPhotoHscrollCustomEvent<void>) => void;
        /**
          * Emitted when successful or when an error occurs or a message has to be sent
         */
        "onJeepPhotoHscrollResult"?: (event: JeepPhotoHscrollCustomEvent<JeepPhotoViewerResult>) => void;
        /**
          * Emitted when the zoom is active or not
         */
        "onJeepPhotoZoom"?: (event: JeepPhotoHscrollCustomEvent<{isZoom: boolean}>) => void;
        /**
          * The photoviewer options
         */
        "options"?: ViewerOptions;
        /**
          * The selected position
         */
        "position"?: number;
    }
    interface JeepPhotoShare {
        /**
          * Emitted when the close button was clicked
         */
        "onJeepPhotoShareCompleted"?: (event: JeepPhotoShareCustomEvent<JeepPhotoViewerResult>) => void;
        /**
          * The text to share
         */
        "stext"?: string;
        /**
          * The photo title to share
         */
        "stitle"?: string;
        /**
          * The photo url to share
         */
        "surl"?: string;
    }
    interface JeepPhotoSwipe {
        /**
          * Emitted when the user is making a swipe gesture
         */
        "onJeepPhotoSwipe"?: (event: JeepPhotoSwipeCustomEvent<IJeepSwipeEvent>) => void;
        /**
          * The swipe threshold in x direction
         */
        "thresholdX"?: number;
        /**
          * The swipe threshold in y direction
         */
        "thresholdY"?: number;
        /**
          * The swipe timeThreshold
         */
        "timeThreshold"?: number;
    }
    interface JeepPhotoZoom {
        /**
          * The maximum zoom scale
         */
        "maxzoomscale"?: number;
        /**
          * Emitted when the close button was clicked
         */
        "onJeepPhotoZoomOneTap"?: (event: JeepPhotoZoomCustomEvent<void>) => void;
        /**
          * The photo url
         */
        "url"?: string;
    }
    interface JeepPhotoviewer {
        /**
          * The Image List
         */
        "imageList"?: Image[];
        /**
          * The photoviewer mode ("gallery","slider","one")
         */
        "mode"?: string;
        /**
          * Emitted when successful or when an error occurs or a message to be sent
         */
        "onJeepPhotoViewerResult"?: (event: JeepPhotoviewerCustomEvent<JeepPhotoViewerResult>) => void;
        /**
          * The photoviewer options
         */
        "options"?: ViewerOptions;
        /**
          * The photoviewer image index for mode ("slider","one")
         */
        "startFrom"?: number;
    }
    interface IntrinsicElements {
        "jeep-photo-buttons": JeepPhotoButtons;
        "jeep-photo-hscroll": JeepPhotoHscroll;
        "jeep-photo-share": JeepPhotoShare;
        "jeep-photo-swipe": JeepPhotoSwipe;
        "jeep-photo-zoom": JeepPhotoZoom;
        "jeep-photoviewer": JeepPhotoviewer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "jeep-photo-buttons": LocalJSX.JeepPhotoButtons & JSXBase.HTMLAttributes<HTMLJeepPhotoButtonsElement>;
            "jeep-photo-hscroll": LocalJSX.JeepPhotoHscroll & JSXBase.HTMLAttributes<HTMLJeepPhotoHscrollElement>;
            "jeep-photo-share": LocalJSX.JeepPhotoShare & JSXBase.HTMLAttributes<HTMLJeepPhotoShareElement>;
            "jeep-photo-swipe": LocalJSX.JeepPhotoSwipe & JSXBase.HTMLAttributes<HTMLJeepPhotoSwipeElement>;
            "jeep-photo-zoom": LocalJSX.JeepPhotoZoom & JSXBase.HTMLAttributes<HTMLJeepPhotoZoomElement>;
            "jeep-photoviewer": LocalJSX.JeepPhotoviewer & JSXBase.HTMLAttributes<HTMLJeepPhotoviewerElement>;
        }
    }
}
