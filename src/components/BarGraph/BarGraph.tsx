import styles from "./BarGraph.module.css";
import data from "../data"

const SVG_WIDTH = 995;
const SVG_HEIGHT = 400;

const russianMonthAbbreviations: Record<string, string> = {
  "January": "Янв",
  "February": "Фев",
  "March": "Март",
  "April": "Апр",
  "May": "Май",
  "June": "Июнь",
  "July": "Июль",
  "August": "Авг",
  "September": "Сен",
  "October": "Окт",
  "November": "Нояб",
  "December": "Дек",
};

type BarGraphProps = {
  period: string
}

export function BarGraph({ period }: BarGraphProps) {

  const currData = (period: string) => {
    const graphYear: Record<string, number> = data.periods[0].graph.year;
    const graphHalfYear: Record<string, number> = data.periods[0].graph.half_year;
    const graphMonth: Record<string, number> = data.periods[0].graph.month;

    if (period === "year") {
      const currData: [string, number][] = Object.entries(graphYear).map(([englishMonth, value]) => [russianMonthAbbreviations[englishMonth], value]);
      return currData;
    }
    else if (period === "month") {
      const currData: [string, number][] = Object.entries(graphMonth).map(([string, value]) => [string, value]);
      return currData;
    }
    else {
      const currData: [string, number][] = Object.entries(graphHalfYear).map(([englishMonth, value]) => [russianMonthAbbreviations[englishMonth], value]);
      return currData;
    }
  }

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 30;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = 6900; /* для корректного отображения по прототипу */
  const dataYMin = 0;
  const dataYRange = dataYMax - dataYMin;

  const yTicks = [`10 000`, `5 000`, `2 000`, `1 000`, `500`, 0]

  const barPlotWidth = period === "year" ? 63 + 16 : period === "month" ? 11 + 16 : 139 + 16;

  return (
    <div className={styles.container}>
      <svg width={SVG_WIDTH} height={SVG_HEIGHT}>

        {/* ось X */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="transparent"
        />

        {/* ось Y */}
        <line
          x1={x0}
          y1={y0}
          x2={x0}
          y2={y0 + yAxisLength}
          stroke="transparent"
        />

        {Array.from({ length: yTicks.length }).map((_, index) => {
          const y = y0 + index * (yAxisLength / yTicks.length);

          const yValue = yTicks[index];
          // равномерные тики по Y оси
          // Math.round(dataYMax - index * (dataYRange / yTicks.length))
          return (
            <g key={index}>
              <line
                x1={x0}
                y1={y}
                x2={x0 - 5}
                y2={y}
                stroke="transparent"
              />
              <text x={x0 - 50} y={y + 50} textAnchor="start" className={styles.text}>
                {yValue}
              </text>
            </g>
          );
        })}

        {/* Столбы диаграммы*/}
        {currData(period).map(([day, dataY], index) => {
          const x = x0 + index * barPlotWidth;

          const yRatio = (dataY - dataYMin) / dataYRange;

          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;

          const sidePadding = period === "year" ? 63 : period === "month" ? 11 : 139;

          const barXAxis = period === "month" ? (x + sidePadding / 2 + 50) : (x + sidePadding / 2);
          const textXAxis = period === "month" ? (x + barPlotWidth / 2 + 50) : (x + barPlotWidth / 2);

          return (
            <g key={index}>
              <rect
                className={styles.bar}
                x={barXAxis}
                y={y}
                width={barPlotWidth - sidePadding}
                height={height}
                rx="4"
              />

              <g className={styles.value_container}>
                <rect
                  x={textXAxis - 25}
                  y={y - 30}
                  className={styles.value_box}
                  rx="6"
                >
                </rect>

                <text
                  x={textXAxis}
                  y={y - 12}
                  textAnchor="middle"
                  className={styles.value_text}>
                  {dataY}
                </text>
              </g>

              <text x={textXAxis} y={xAxisY + 25} textAnchor="middle" className={styles.text}>
                {day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
