// src/client/sensors.ts
export interface Orientation {
    /** Yaw 0–360 ° */
    alpha: number;
    /** Pitch –180 … 180 ° */
    beta: number;
    /** Roll  –90 … 90 ° */
    gamma: number;
  }
  
  type Callback = (o: Orientation) => void;
  
  export class MotionSensor {
    private cb?: Callback;
  
    async start(cb: Callback) {
      this.cb = cb;
  
      // iOS ≥ 13 benötigt zwingend eine Permission-Abfrage, die von
      // einem User-Gesture (z. B. Button-Klick) ausgelöst werden muss.:contentReference[oaicite:0]{index=0}
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        const res = await (DeviceOrientationEvent as any).requestPermission();
        if (res !== "granted") throw new Error("Sensor permission denied");
      }
  
      window.addEventListener("deviceorientation", this.handle, true);
    }
  
    stop() {
      window.removeEventListener("deviceorientation", this.handle, true);
    }
  
    // ---------- intern ----------
    private handle = (e: DeviceOrientationEvent) => {
        console.log("event", e.alpha, e.beta, e.gamma);   // 👈 Debug
      if (!this.cb) return;
      this.cb({
        alpha: e.alpha ?? 0,
        beta: e.beta ?? 0,
        gamma: e.gamma ?? 0,
      });
    };
  }
  