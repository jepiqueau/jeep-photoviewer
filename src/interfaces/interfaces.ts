export interface Image {
  /**
   * image url
   */
   url: string;
   /**
    * image title optional
    */
   title?: string;
 }
export interface ViewerOptions {
  /**
   * display the share button (default true)
   */
  share?: boolean;
  /**
   * display the image title if any (default true)
   */
  title?: boolean;
  /**
   * transformer Android "zoom", "depth" or "none" (default "zoom")
   */
  transformer?: string;
  /**
   * Grid span count (default 3)
   */
  spancount?: number;
  /**
   * Max Zoom Scale (default 3)
   */
  maxzoomscale?: number;
  /**
   * Compression Quality for Sharing Image range [0-1] (default 0.8)
   */
  compressionquality?: number;
  /**
   * Background Color
   * ["white", "ivory", "lightgrey", "darkgrey", "grey", "dimgrey", "black"]
   * (default "black")
   */
   backgroundcolor?: string;
}
export interface Point {
  /**
   * Point X coordinate
   */
  x?: number;
  /**
   * Point Y coordinate
   */
  y?: number;
}
export interface Rect {
  /**
   * Rectangle Left position
   */
  left?: number;
  /**
   * Rectangle Top position
   */
  top?: number;
  /**
   * Rectangle Width
   */
  width?: number;
  /**
   * Rectangle Height
   */
  height?: number;
}
export interface JeepPhotoViewerResult {
  /**
   * Result returned
   */
  result?: boolean;
  /**
   * Result message returned
   */
  message?: string;
  /**
   * Result Image index at closing returned
   */
  imageIndex?: number;
}
export interface IJeepSwipeEvent {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

