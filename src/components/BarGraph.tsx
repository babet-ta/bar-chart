// type BarGraphProps = {
//   id: string
//   title: string
//   complete: Boolean
// }

// { id, title, complete }: BarGraphProps

// export function BarGraph() {
//   return (
//     <p>
//       Hi!
//     </p>
//   )
// }

import React from "react";
import "./BarGraph.module.css";

const SVG_WIDTH = 915;
const SVG_HEIGHT = 280;

const data: [string, number][] = [
  ["Июль", 10000],
  ["Авг", 5100],
  ["Сен", 4600],
  ["Окт", 3500],
  ["Ноя", 7400],
  ["Дек", 2000],
];

export function BarGraph() {
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY),
    -Infinity
  );
  const dataYMin = data.reduce(
    (currMin, [_, dataY]) => Math.min(currMin, dataY),
    Infinity
  );
  const dataYRange = dataYMax - dataYMin;

  const numYTicks = 6;

  const barPlotWidth = 139 + 16;

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>

      {/* X axis */}
      <line
        x1={x0}
        y1={xAxisY}
        x2={x0 + xAxisLength}
        y2={xAxisY}
        stroke="transparent"
      />

      {/* Y axis */}
      <line
        x1={x0}
        y1={y0}
        x2={x0}
        y2={y0 + yAxisLength}
        stroke="transparent"
      />

      {Array.from({ length: numYTicks }).map((_, index) => {
        const y = y0 + index * (yAxisLength / numYTicks);

        const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));

        return (
          <g key={index}>
            <line
              x1={x0}
              y1={y}
              x2={x0 - 5}
              y2={y}
              stroke="transparent"
            />
            <text x={x0 - 50} y={y + 5} textAnchor="start">
              {yValue}
            </text>
          </g>
        );
      })}

      {/* Bar plots */}
      {data.map(([day, dataY], index) => {
        const x = x0 + index * barPlotWidth;

        const yRatio = (dataY - dataYMin) / dataYRange;

        const y = y0 + (1 - yRatio) * yAxisLength;
        const height = yRatio * yAxisLength;

        const sidePadding = 139;

        return (
          <g key={index}>
            <rect
              x={x + sidePadding / 2}
              y={y}
              width={barPlotWidth - sidePadding}
              height={height}
              rx="4"
              fill="#000AFF"
            />
            <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
              {day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
