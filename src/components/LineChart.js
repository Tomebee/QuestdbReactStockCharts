import React, { FC } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { HoverTooltip } from "react-stockcharts/lib/tooltip";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const LineChart = fitWidth(({ initialData, width, ratio }) => {
  const margin = { left: 80, right: 80, top: 30, bottom: 50 };
  const height = 400;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(initialData);

  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];
  return (
    <ChartCanvas
      height={height}
      width={width}
      ratio={ratio}
      margin={margin}
      seriesName="MSFT"
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart
        id={1}
        yExtents={[(d) => [d.btc_close]]}
        padding={{ top: 10, bottom: 20 }}
      >
        <LineSeries
          yAccessor={(d) => d.btc_close}
          stroke={"rgb(255, 158, 84)"}
        />
        <XAxis axisAt="bottom" orient="bottom" />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
        />
        <MouseCoordinateY
          at="right"
          orient="right"
          rectWidth={90}
          displayFormat={format(".2f")}
        />

        <YAxis axisAt="right" orient="right" ticks={5} />
        <HoverTooltip
          yAccessor={(d) => d.btc_close}
          tooltipContent={({ currentItem, xAccessor }) => ({
            x: timeFormat("%Y-%m-%d")(xAccessor(currentItem)),
            y: [
              {
                label: "BTC",
                value: currentItem.btc_close,
                stroke: "rgb(255, 158, 84)",
              },
              {
                label: "SPX",
                value: currentItem.spx_close,
                stroke: "rgb(64,15,125)",
              },
            ],
          })}
          fontSize={15}
        />
      </Chart>
      <Chart
        id={2}
        yExtents={[(d) => [d.spx_close]]}
        padding={{ top: 10, bottom: 20 }}
      >
        <LineSeries yAccessor={(d) => d.spx_close} stroke={"rgb(64,15,125)"} />
        <XAxis axisAt="bottom" orient="bottom" />
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat("%Y-%m-%d")}
        />
        <MouseCoordinateY
          at="right"
          orient="right"
          rectWidth={90}
          displayFormat={format(".2f")}
        />

        <YAxis axisAt="left" orient="left" ticks={5} />
      </Chart>
      <CrossHairCursor strokeDasharray="LongDashDot" />
    </ChartCanvas>
  );
});

export { LineChart };
