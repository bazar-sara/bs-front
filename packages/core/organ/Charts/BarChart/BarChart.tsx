import { BarChart, type BarChartProps } from '@mui/x-charts/BarChart';

type FsBarChartProps = BarChartProps;

function FsBarChart({
  width = 350,
  height = 300,
  xAxis = [
    {
      id: 'barCategories',
      data: ['bar A', 'bar B', 'bar C'],
      scaleType: 'band',
    },
  ],
  skipAnimation = false,
  ...rest
}: FsBarChartProps) {
  return (
    <BarChart
      width={width}
      height={height}
      xAxis={xAxis}
      skipAnimation={skipAnimation}
      {...rest}
    />
  );
}

export default FsBarChart;
