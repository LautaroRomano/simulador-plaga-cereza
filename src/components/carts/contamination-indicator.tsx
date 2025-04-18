"use client";

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function ContaminationIndicator({ level }: { level: string }) {
  return (
    <div className="w-full max-w-[200px]">
      <div className="flex h-6 rounded-md overflow-hidden">
        <div
          className={`w-1/3 ${
            level === "low" ? "ring-2 ring-black ring-inset" : ""
          } bg-green-500`}
        ></div>
        <div
          className={`w-1/3 ${
            level === "medium" ? "ring-2 ring-black ring-inset" : ""
          } bg-yellow-500`}
        ></div>
        <div
          className={`w-1/3 ${
            level === "high" ? "ring-2 ring-black ring-inset" : ""
          } bg-red-500`}
        ></div>
      </div>
    </div>
  );
}
