import styles from "./BarGraph.module.css";
import data from "../data"

const SVG_WIDTH = 995;
const SVG_HEIGHT = 400;
const yOffset = 250;

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

  function logTransform(value: number) {
    return Math.log(value + 1);
  }

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 30;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const yTicks = [10000, 5000, 2000, 1000, 500];
  const logTicks = yTicks.map(logTransform);

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

        {/* Тики на оси Y */}
        {yTicks.map((yValue, index) => {
          const logValue = logTransform(yValue);

          const y = xAxisY - ((logValue / logTicks[logTicks.length - 1]) * yAxisLength) + yOffset;

          return (
            <g key={index}>
              <text x={x0 - 50} y={y + 5} textAnchor="start" className={styles.text}>
                {yValue}
              </text>
            </g>
          );
        })}

        {/* Столбы диаграммы */}
        {currData(period).map(([day, dataY], index) => {
          const sidePadding = period === "year" ? 63 : period === "month" ? 11 : 139;

          const x = x0 + index * barPlotWidth;

          const barXAxis = period === "month" ? (x + sidePadding / 2 + 50) : (x + sidePadding / 2);
          const textXAxis = period === "month" ? (x + barPlotWidth / 2 + 50) : (x + barPlotWidth / 2);

          const logDataY = logTransform(dataY);
          const y = xAxisY - ((logDataY / logTicks[logTicks.length - 1]) * yAxisLength) + yOffset;
          const height = xAxisY - y;


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
