import React, { FC } from "react";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { sma } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const OhlcChart = fitWidth(({ initialData, width, ratio }) => {
  const margin = { left: 80, right: 80, top: 30, bottom: 50 };
  const height = 400;

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );

  const sma50Provider = sma()
    .options({ windowSize: 50 })
    .merge((d, c) => {
      d.sma50 = c;
    })
    .accessor((d) => d.sma50);

  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
    sma50Provider(initialData)
  );

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
        yExtents={[(d) => [d.high, d.low]]}
        padding={{ top: 10, bottom: 20 }}
      >
        <LineSeries
          yAccessor={sma50Provider.accessor()}
          stroke={"rgb(255, 158, 84)"}
        />
        <CurrentCoordinate
          yAccessor={sma50Provider.accessor()}
          fill={"rgb(255, 158, 84)"}
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

        <CandlestickSeries
          fill={(d) =>
            d.close > d.open ? "rgb(74, 255, 128)" : "rgb(255,1,1)"
          }
        />
        <EdgeIndicator
          itemType="last"
          orient="right"
          edgeAt="right"
          rectWidth={90}
          yAccessor={(d) => d.close}
          fill={(d) =>
            d.close > d.open ? "rgb(74, 255, 128)" : "rgb(255, 1, 1)"
          }
        />

        <OHLCTooltip origin={[-40, 0]} />
      </Chart>
      <CrossHairCursor strokeDasharray="LongDashDot" />
    </ChartCanvas>
  );
});

export { OhlcChart };
