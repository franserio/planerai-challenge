import { BarChart, axisClasses } from "@mui/x-charts"
import { memo } from "react"
import { TransformedData } from "../types"
import { Grid, capitalize } from "@mui/material"

type ChartProps = {
  dataset: TransformedData[]
}

const chartSetting = {
  yAxis: [
    {
      label: 'quantity (units)',
    },
  ],
  width: 800,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'rotate(-90deg) translate(0px, -20px)',
    },
  },
};

const valueFormatter = (value: number) => `${value} units`;

const Chart = memo(({ dataset }: ChartProps) => {
  const series = []
  for (const key in dataset[0]) {
    if (key === "day") continue
    series.push({ dataKey: key, label: capitalize(key), valueFormatter })
  }

  return (
    <Grid container md={8} justifyContent={'center'}>
      < BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={series}
        legend={{
          direction: "column"
        }}
        tooltip={{ trigger: "axis" }}
        {...chartSetting}
      />
    </Grid>
  )
})

export default Chart