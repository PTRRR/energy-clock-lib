/**
 * Import statements for required dependencies
 */
import { Application } from "pixi.js";
import { Layer } from "./Layer";
import { Values } from "../types";
import { RadialChart, RadialChartOptions } from "./RadialChart";

/**
 * A Clock class that extends PIXI.Application to create a canvas-based clock visualization
 * @extends Application
 */
export class Clock extends Application {
  /** The main scene layer that contains all visual elements */
  private scene: Layer;

  /**
   * Initializes the clock application by setting up the canvas and main scene
   * @async
   * @returns {Promise<void>}
   */
  async initialize() {
    await this.init({
      background: "#000000",
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
    });
    document.body.appendChild(this.canvas);
    this.scene = new Layer();
    this.scene.position.set(this.center.x, this.center.y);
    this.stage.addChild(this.scene);
  }

  /**
   * Gets the current width of the application screen
   * @returns {number} The width in pixels
   */
  get width() {
    return this.screen.width;
  }

  /**
   * Gets the current height of the application screen
   * @returns {number} The height in pixels
   */
  get height() {
    return this.screen.height;
  }

  /**
   * Gets the center coordinates of the application screen
   * @returns {{ x: number, y: number }} An object containing the x and y coordinates of the center
   */
  get center() {
    return {
      x: this.width / 2,
      y: this.height / 2,
    };
  }

  /**
   * Adds a new layer to the main scene
   * @param {Layer} layer - The layer to be added
   * @returns {this} Returns the Clock instance for method chaining
   */
  addLayer(layer: Layer) {
    this.scene.addChild(layer);
    return this;
  }

  /**
   * Creates and adds a new RadialChart to the clock
   * @param {Values} values - The values to be displayed in the radial chart
   * @param {RadialChartOptions} [options] - Optional configuration options for the radial chart
   * @returns {this} Returns the Clock instance for method chaining
   */
  addRadialChart(values: Values, options?: RadialChartOptions) {
    const radialChart = new RadialChart(values, options);
    this.addLayer(radialChart);
    return this;
  }
}
