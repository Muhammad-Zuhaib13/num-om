import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Props as ChartProps } from 'react-apexcharts';
import { colorTheme } from 'common/colorTheme';
import { useTheme } from '@mui/material/styles';
import AnalyticsDataCard from 'components/cards/statistics/AnalyticsDataCard';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const DashboardOverviewChart = ({ areaChartData }: any) => {
  const theme = useTheme();

  const areaChartOptions = {
    chart: {
      id: 'new-stack-chart',
      sparkline: {
        enabled: true
      },
      height: 100,
      type: 'area',
      toolbar: {
        show: false
      },
      offsetX: -1
    },
    plotOptions: {
      bar: {
        borderRadius: 0
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5
          }
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    tooltip: {
      x: {
        show: false
      }
    },
    grid: {
      show: false
    },
    colors:
      areaChartData?.variantChart == 'green'
        ? //@ts-ignore
          [theme?.palette?.chart?.lightgreen]
        : areaChartData?.variantChart == 'red'
        ? //@ts-ignore

          [theme?.palette?.chart?.lightred]
        : //@ts-ignore

          [theme?.palette?.chart?.lightblue]
  };

  const [options, setOptions] = useState<ChartProps>(areaChartOptions);

  const [series] = useState([
    {
      name: 'Orders',
      data: areaChartData?.chartData
    }
  ]);

  return (
    <AnalyticsDataCard
      title={areaChartData?.title}
      count={areaChartData?.count}
      percentage={areaChartData?.precentage}
      variant={areaChartData?.variantCard}
    >
      <ReactApexChart options={options} series={series} type="area" height={100} width={'99%'} />
    </AnalyticsDataCard>
  );
};

export default DashboardOverviewChart;
