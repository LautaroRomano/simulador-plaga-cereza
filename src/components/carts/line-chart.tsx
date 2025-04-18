"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function LineChart({ data }: { data: { x: number; y: number }[] }) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartData = data.length
      ? data.map((point) => ({ x: point.x, y: point.y ?? 0 }))
      : Array.from({ length: 11 }, (_, i) => ({ x: i, y: i === 0 ? 0 : 0 }));

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Población",
            data: chartData,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Tiempo (semanas)",
            },
            min: 0,
            max: 10,
            ticks: {
              stepSize: 2,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: false,
              text: "Población",
            },
            min: 0,
            max: 1000,
            ticks: {
              stepSize: 500,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: data.length > 0,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}
