/// <reference lib="dom" />          // <- DOM-Types für TS

import { test, expect, mock } from "bun:test";
import { MotionSensor } from "../src/client/sensors";

/* --- DeviceOrientationEvent-Polyfill (wie zuvor) --- */
class FakeDeviceOrientationEvent extends Event {
  alpha?: number;
  beta?: number;
  gamma?: number;
  constructor(t: string, init: DeviceOrientationEventInit = {}) {
    super(t);
    Object.assign(this, init);
  }
  static async requestPermission() {
    return "granted";
  }
}
(globalThis as any).DeviceOrientationEvent =
  FakeDeviceOrientationEvent as any;
/* --------------------------------------------------- */

test("calls callback with orientation values", async () => {
    const sensor = new MotionSensor();
    const cb = mock(() => {});
  
    await sensor.start(cb as any);
    window.dispatchEvent(
      new DeviceOrientationEvent("deviceorientation", {
        alpha: 10,
        beta: -20,
        gamma: 5,
      }),
    );
  
    expect(cb).toHaveBeenCalledWith({ alpha: 10, beta: -20, gamma: 5 });
    sensor.stop();
  });
  