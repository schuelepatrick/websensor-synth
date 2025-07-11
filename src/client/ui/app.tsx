// src/client/ui/App.tsx
import { useEffect, useState } from "react";
import { MotionSensor, type Orientation } from "../sensors";
import Horizon from "./horizon";

export default function App() {
  const [ori, setOri] = useState<Orientation | null>(null);

  useEffect(() => {
    const sensor = new MotionSensor();
    const start = async () => {
      try {
        await sensor.start(setOri);
      } catch (e) {
        alert((e as Error).message);
      }
    };
    document.getElementById("start")!.addEventListener("click", start);
    return () => sensor.stop();
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "2rem" }}>
      <button id="start">Start Sensors</button>

      {ori && (
        <>
          <Horizon ori={ori} size={220} />

          <p style={{ fontFamily: "monospace" }}>
            α: {ori.alpha.toFixed(1)}° β: {ori.beta.toFixed(1)}° γ:{" "}
            {ori.gamma.toFixed(1)}°
          </p>
        </>
      )}
    </main>
  );
}
